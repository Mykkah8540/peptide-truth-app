#!/usr/bin/env python3
"""
Validator for Explore-by-Category index:
  content/_index/categories_v1.json

Hard requirements:
- Version and shape correctness
- Categories match peptide taxonomy order and labels
- Every peptide slug exists in entities index and includes the category key in its taxonomy_keys
- Every blend slug exists in blends registry
- Blend membership in categories is consistent with mapping + blend taxonomy_keys
- Counts are correct
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any, Dict, List, Set, Tuple


REPO_ROOT = Path(__file__).resolve().parents[2]
CONTENT_DIR = REPO_ROOT / "content"

CATEGORIES_INDEX_PATH = CONTENT_DIR / "_index" / "categories_v1.json"
PEPTIDE_CATEGORIES_PATH = CONTENT_DIR / "_taxonomy" / "peptide_categories_v1.json"
ENTITIES_INDEX_PATH = CONTENT_DIR / "_index" / "entities_v1.json"
BLENDS_INDEX_PATH = CONTENT_DIR / "blends" / "_index.json"


ISO_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def _load_json(path: Path) -> Any:
    if not path.exists():
        raise FileNotFoundError(f"Missing required file: {path}")
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def _expect_list_of_dicts(obj: Any, key: str, path: Path) -> List[Dict[str, Any]]:
    if not isinstance(obj, dict) or key not in obj:
        raise ValueError(f"Expected top-level object with '{key}' in {path}")
    val = obj[key]
    if not isinstance(val, list) or any(not isinstance(x, dict) for x in val):
        raise ValueError(f"Expected '{key}' to be a list[object] in {path}")
    return val  # type: ignore[return-value]


def _extract_peptide_vocab(peptide_taxonomy: Any) -> List[Tuple[str, str]]:
    classes = _expect_list_of_dicts(peptide_taxonomy, "peptide_classes", PEPTIDE_CATEGORIES_PATH)
    out: List[Tuple[str, str]] = []
    for c in classes:
        k = c.get("key")
        lbl = c.get("label")
        if not isinstance(k, str) or not isinstance(lbl, str):
            raise ValueError(f"Invalid peptide taxonomy entry in {PEPTIDE_CATEGORIES_PATH}: {c}")
        out.append((k, lbl))
    return out


def _entities_peptides_map(entities_index: Any) -> Dict[str, Dict[str, Any]]:
    if not isinstance(entities_index, dict):
        raise ValueError(f"Invalid JSON root in {ENTITIES_INDEX_PATH}")
    peptides = entities_index.get("peptides", [])
    if not isinstance(peptides, list) or any(not isinstance(x, dict) for x in peptides):
        raise ValueError(f"Invalid 'peptides' list in {ENTITIES_INDEX_PATH}")
    out: Dict[str, Dict[str, Any]] = {}
    for p in peptides:
        slug = p.get("slug")
        if isinstance(slug, str):
            out[slug] = p
    return out


def _blends_registry_slugs(blends_index: Any) -> Set[str]:
    if not isinstance(blends_index, dict):
        raise ValueError(f"Invalid JSON root in {BLENDS_INDEX_PATH}")
    blends = blends_index.get("blends", [])
    if not isinstance(blends, list) or any(not isinstance(x, dict) for x in blends):
        raise ValueError(f"Invalid 'blends' list in {BLENDS_INDEX_PATH}")
    slugs: Set[str] = set()
    for b in blends:
        s = b.get("slug")
        if isinstance(s, str):
            slugs.add(s)
    return slugs


def _blends_registry_map(blends_index: Any) -> Dict[str, Dict[str, Any]]:
    blends = _expect_list_of_dicts(blends_index, "blends", BLENDS_INDEX_PATH)
    out: Dict[str, Dict[str, Any]] = {}
    for b in blends:
        slug = b.get("slug")
        if isinstance(slug, str):
            out[slug] = b
    return out


def _assert(condition: bool, msg: str) -> None:
    if not condition:
        raise ValueError(msg)


def main() -> int:
    categories_idx = _load_json(CATEGORIES_INDEX_PATH)
    peptide_taxonomy = _load_json(PEPTIDE_CATEGORIES_PATH)
    entities_idx = _load_json(ENTITIES_INDEX_PATH)
    blends_idx = _load_json(BLENDS_INDEX_PATH)

    _assert(isinstance(categories_idx, dict), f"Invalid JSON root in {CATEGORIES_INDEX_PATH}")

    version = categories_idx.get("version")
    _assert(version == "v1", f"{CATEGORIES_INDEX_PATH}: expected version 'v1', got {version!r}")

    updated_at = categories_idx.get("updated_at")
    _assert(isinstance(updated_at, str) and ISO_DATE_RE.match(updated_at), f"{CATEGORIES_INDEX_PATH}: invalid updated_at")

    mapping = categories_idx.get("mapping")
    _assert(isinstance(mapping, dict), f"{CATEGORIES_INDEX_PATH}: missing/invalid mapping object")
    pk2bk = mapping.get("peptide_key_to_blend_keys")
    _assert(isinstance(pk2bk, dict), f"{CATEGORIES_INDEX_PATH}: mapping.peptide_key_to_blend_keys missing/invalid")

    categories = categories_idx.get("categories")
    _assert(isinstance(categories, list) and all(isinstance(x, dict) for x in categories), f"{CATEGORIES_INDEX_PATH}: invalid categories")

    vocab = _extract_peptide_vocab(peptide_taxonomy)  # ordered list of (key,label)
    vocab_keys = [k for k, _ in vocab]
    vocab_map = {k: lbl for k, lbl in vocab}

    # Ensure exact category ordering and labels match taxonomy
    idx_keys = [c.get("key") for c in categories]
    _assert(idx_keys == vocab_keys, f"{CATEGORIES_INDEX_PATH}: category keys/order must match peptide taxonomy exactly")

    for c in categories:
        k = c.get("key")
        lbl = c.get("label")
        _assert(isinstance(k, str), f"{CATEGORIES_INDEX_PATH}: category missing key")
        _assert(lbl == vocab_map.get(k), f"{CATEGORIES_INDEX_PATH}: category label mismatch for '{k}'")

        mapped = c.get("mapped_blend_taxonomy_keys", [])
        _assert(isinstance(mapped, list) and all(isinstance(x, str) for x in mapped), f"{CATEGORIES_INDEX_PATH}: invalid mapped_blend_taxonomy_keys for '{k}'")

        expected_mapped = pk2bk.get(k, [])
        _assert(mapped == expected_mapped, f"{CATEGORIES_INDEX_PATH}: mapped_blend_taxonomy_keys mismatch for '{k}'")

        counts = c.get("counts", {})
        _assert(isinstance(counts, dict), f"{CATEGORIES_INDEX_PATH}: missing counts for '{k}'")
        for ck in ("peptides", "blends", "total"):
            _assert(isinstance(counts.get(ck), int), f"{CATEGORIES_INDEX_PATH}: counts.{ck} must be int for '{k}'")

        items = c.get("items", {})
        _assert(isinstance(items, dict), f"{CATEGORIES_INDEX_PATH}: missing items for '{k}'")
        peptides_list = items.get("peptides", [])
        blends_list = items.get("blends", [])
        _assert(isinstance(peptides_list, list) and all(isinstance(x, dict) for x in peptides_list), f"{CATEGORIES_INDEX_PATH}: invalid items.peptides for '{k}'")
        _assert(isinstance(blends_list, list) and all(isinstance(x, dict) for x in blends_list), f"{CATEGORIES_INDEX_PATH}: invalid items.blends for '{k}'")

        _assert(counts["peptides"] == len(peptides_list), f"{CATEGORIES_INDEX_PATH}: counts.peptides mismatch for '{k}'")
        _assert(counts["blends"] == len(blends_list), f"{CATEGORIES_INDEX_PATH}: counts.blends mismatch for '{k}'")
        _assert(counts["total"] == len(peptides_list) + len(blends_list), f"{CATEGORIES_INDEX_PATH}: counts.total mismatch for '{k}'")

    # Validate peptide slugs exist and contain category key in taxonomy_keys
    entities_pep = _entities_peptides_map(entities_idx)

    for c in categories:
        cat_key = c["key"]
        peptides_list = c["items"]["peptides"]
        for p in peptides_list:
            _assert(p.get("kind") == "peptide", f"{CATEGORIES_INDEX_PATH}: peptide item kind must be 'peptide' in '{cat_key}'")
            slug = p.get("slug")
            _assert(isinstance(slug, str), f"{CATEGORIES_INDEX_PATH}: peptide item missing slug in '{cat_key}'")
            _assert(slug in entities_pep, f"{CATEGORIES_INDEX_PATH}: peptide slug '{slug}' not found in entities index")
            tkeys = p.get("taxonomy_keys", [])
            _assert(isinstance(tkeys, list) and all(isinstance(x, str) for x in tkeys), f"{CATEGORIES_INDEX_PATH}: peptide taxonomy_keys invalid for '{slug}'")
            _assert(cat_key in tkeys, f"{CATEGORIES_INDEX_PATH}: peptide '{slug}' missing category key '{cat_key}' in taxonomy_keys")

    # Validate blends exist and category membership is consistent with mapping + blend taxonomy_keys
    blend_slugs = _blends_registry_slugs(blends_idx)
    blends_map = _blends_registry_map(blends_idx)

    for c in categories:
        cat_key = c["key"]
        expected_blend_tax_keys = set(c["mapped_blend_taxonomy_keys"])
        blends_list = c["items"]["blends"]

        for b in blends_list:
            _assert(b.get("kind") == "blend", f"{CATEGORIES_INDEX_PATH}: blend item kind must be 'blend' in '{cat_key}'")
            slug = b.get("slug")
            _assert(isinstance(slug, str), f"{CATEGORIES_INDEX_PATH}: blend item missing slug in '{cat_key}'")
            _assert(slug in blend_slugs, f"{CATEGORIES_INDEX_PATH}: blend slug '{slug}' not found in blends registry")

        # Recompute expected blends list (by registry taxonomy_keys) and compare to file list
        expected_blends: List[str] = []
        if expected_blend_tax_keys:
            for slug, entry in blends_map.items():
                tax_keys = entry.get("taxonomy_keys", [])
                if isinstance(tax_keys, list) and any(isinstance(x, str) and x in expected_blend_tax_keys for x in tax_keys):
                    expected_blends.append(slug)
        expected_blends = sorted(set(expected_blends))

        actual_blends = sorted({b["slug"] for b in blends_list if isinstance(b.get("slug"), str)})

        _assert(
            actual_blends == expected_blends,
            f"{CATEGORIES_INDEX_PATH}: blends list mismatch for '{cat_key}'. expected={expected_blends} actual={actual_blends}",
        )

    counts = categories_idx.get("counts", {})
    _assert(isinstance(counts, dict), f"{CATEGORIES_INDEX_PATH}: missing counts")
    _assert(counts.get("categories") == len(categories), f"{CATEGORIES_INDEX_PATH}: counts.categories mismatch")
    _assert(counts.get("peptide_classes") == len(categories), f"{CATEGORIES_INDEX_PATH}: counts.peptide_classes mismatch")

    print("CATEGORY INDEX VALIDATION PASSED")
    print(f"Categories: {len(categories)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
