#!/usr/bin/env python3
"""
Build Explore-by-Category browse index for Pep-Talk.

Output:
  content/_index/categories_v1.json

Inputs (authoritative):
  - content/_taxonomy/peptide_categories_v1.json
  - content/_taxonomy/blend_categories_v1.json
  - content/_governance/coverage_checklist_v1.json
  - content/_index/entities_v1.json
  - content/blends/_index.json

Design rules:
  - Categories are the peptide taxonomy keys (canonical Explore categories).
  - Category membership for peptides is derived from governance taxonomy_keys (fallback when entities index lacks taxonomy_keys).
  - Blends are included in peptide categories via a deterministic mapping from peptide category key -> blend taxonomy keys.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple


REPO_ROOT = Path(__file__).resolve().parents[2]
CONTENT_DIR = REPO_ROOT / "content"

PEPTIDE_CATEGORIES_PATH = CONTENT_DIR / "_taxonomy" / "peptide_categories_v1.json"
BLEND_CATEGORIES_PATH = CONTENT_DIR / "_taxonomy" / "blend_categories_v1.json"
GOVERNANCE_PATH = CONTENT_DIR / "_governance" / "coverage_checklist_v1.json"
ENTITIES_INDEX_PATH = CONTENT_DIR / "_index" / "entities_v1.json"
BLENDS_INDEX_PATH = CONTENT_DIR / "blends" / "_index.json"

OUTPUT_PATH = CONTENT_DIR / "_index" / "categories_v1.json"


# Deterministic mapping: peptide category key -> blend taxonomy keys to include
# (Blends may or may not exist for every peptide category; empty list is valid.)
PEPTIDE_KEY_TO_BLEND_KEYS: Dict[str, List[str]] = {
    "regenerative_repair": ["regenerative_blend"],
    "metabolic_weight": ["metabolic_weight_blend"],
    "endocrine_hormonal": ["gh_axis_blend"],
    "sexual_health_reproduction": ["sexual_health_blend"],
    "neurocognitive_mood": ["neurocognitive_blend"],
    "cosmetic_topical": ["cosmetic_blend"],
    # Explicitly empty mappings for categories where we are not defining a blend taxonomy yet
    "sleep_circadian": [],
    "immunomodulatory_inflammation": [],
    "antimicrobial_innate": [],
    "mitochondrial_longevity": [],
    "muscle_performance": [],
}


STATUS_SORT_ORDER = {
    "approved_human": 0,
    "investigational_human": 1,
    "preclinical": 2,
    "theoretical_unmanufactured": 3,
}


def _load_json(path: Path) -> Any:
    if not path.exists():
        raise FileNotFoundError(f"Missing required file: {path}")
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def _write_json(path: Path, obj: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(obj, f, indent=2, ensure_ascii=False)
        f.write("\n")


def _expect_list_of_dicts(obj: Any, key: str, path: Path) -> List[Dict[str, Any]]:
    if not isinstance(obj, dict) or key not in obj:
        raise ValueError(f"Expected top-level object with '{key}' in {path}")
    val = obj[key]
    if not isinstance(val, list) or any(not isinstance(x, dict) for x in val):
        raise ValueError(f"Expected '{key}' to be a list[object] in {path}")
    return val  # type: ignore[return-value]


def _extract_taxonomy_vocab_peptides(peptide_taxonomy: Any) -> List[Dict[str, str]]:
    """
    Returns ordered list of {key,label} for peptide categories.
    Expected: peptide_categories_v1.json has peptide_classes: [{key,label,...}, ...]
    """
    classes = _expect_list_of_dicts(peptide_taxonomy, "peptide_classes", PEPTIDE_CATEGORIES_PATH)
    out: List[Dict[str, str]] = []
    for c in classes:
        k = c.get("key")
        lbl = c.get("label")
        if not isinstance(k, str) or not isinstance(lbl, str):
            raise ValueError(f"Invalid peptide taxonomy entry in {PEPTIDE_CATEGORIES_PATH}: {c}")
        out.append({"key": k, "label": lbl})
    return out


def _extract_taxonomy_vocab_blends(blend_taxonomy: Any) -> List[str]:
    """
    Returns list of blend taxonomy keys.
    Expected: blend_categories_v1.json has blend_classes: [{key,label,...}, ...]
    """
    classes = _expect_list_of_dicts(blend_taxonomy, "blend_classes", BLEND_CATEGORIES_PATH)
    keys: List[str] = []
    for c in classes:
        k = c.get("key")
        if not isinstance(k, str):
            raise ValueError(f"Invalid blend taxonomy entry in {BLEND_CATEGORIES_PATH}: {c}")
        keys.append(k)
    return keys


@dataclass(frozen=True)
class PeptideCard:
    kind: str
    slug: str
    display_name: str
    status_category: Optional[str]
    taxonomy_keys: List[str]


@dataclass(frozen=True)
class BlendCard:
    kind: str
    slug: str
    display_name: str
    taxonomy_keys: List[str]
    components: List[str]
    components_unresolved: List[str]


def _build_governance_peptide_taxonomy_map(governance: Any) -> Dict[str, List[str]]:
    """
    Returns: slug -> taxonomy_keys
    """
    peptides = _expect_list_of_dicts(governance, "peptides", GOVERNANCE_PATH)
    out: Dict[str, List[str]] = {}
    for p in peptides:
        slug = p.get("slug")
        keys = p.get("taxonomy_keys", [])
        if not isinstance(slug, str):
            continue
        if not isinstance(keys, list) or any(not isinstance(k, str) for k in keys):
            raise ValueError(f"Invalid governance taxonomy_keys for peptide '{slug}' in {GOVERNANCE_PATH}")
        out[slug] = list(keys)
    return out


def _build_entities_maps(entities_index: Any) -> Tuple[Dict[str, Dict[str, Any]], Dict[str, Dict[str, Any]]]:
    """
    Returns:
      peptides_by_slug, blends_by_slug from content/_index/entities_v1.json
    """
    if not isinstance(entities_index, dict):
        raise ValueError(f"Invalid JSON root in {ENTITIES_INDEX_PATH}")

    peptides = entities_index.get("peptides", [])
    blends = entities_index.get("blends", [])

    if not isinstance(peptides, list) or any(not isinstance(x, dict) for x in peptides):
        raise ValueError(f"Invalid 'peptides' list in {ENTITIES_INDEX_PATH}")
    if not isinstance(blends, list) or any(not isinstance(x, dict) for x in blends):
        raise ValueError(f"Invalid 'blends' list in {ENTITIES_INDEX_PATH}")

    pep_map: Dict[str, Dict[str, Any]] = {}
    for p in peptides:
        slug = p.get("slug")
        if isinstance(slug, str):
            pep_map[slug] = p

    blend_map: Dict[str, Dict[str, Any]] = {}
    for b in blends:
        slug = b.get("slug")
        if isinstance(slug, str):
            blend_map[slug] = b

    return pep_map, blend_map


def _build_blends_registry_map(blends_index: Any) -> Dict[str, Dict[str, Any]]:
    if not isinstance(blends_index, dict):
        raise ValueError(f"Invalid JSON root in {BLENDS_INDEX_PATH}")
    blends = blends_index.get("blends", [])
    if not isinstance(blends, list) or any(not isinstance(x, dict) for x in blends):
        raise ValueError(f"Invalid 'blends' list in {BLENDS_INDEX_PATH}")
    out: Dict[str, Dict[str, Any]] = {}
    for b in blends:
        slug = b.get("slug")
        if isinstance(slug, str):
            out[slug] = b
    return out


def _make_peptide_card(
    slug: str,
    entities_pep: Dict[str, Any],
    gov_tax_keys: List[str],
) -> PeptideCard:
    display_name = entities_pep.get("display_name") or entities_pep.get("canonical_name") or slug
    if not isinstance(display_name, str):
        display_name = slug

    status_category = entities_pep.get("status_category")
    if status_category is not None and not isinstance(status_category, str):
        status_category = None

    taxonomy_keys = entities_pep.get("taxonomy_keys")
    if isinstance(taxonomy_keys, list) and all(isinstance(x, str) for x in taxonomy_keys) and taxonomy_keys:
        keys = list(taxonomy_keys)
    else:
        keys = list(gov_tax_keys)

    return PeptideCard(
        kind="peptide",
        slug=slug,
        display_name=display_name,
        status_category=status_category,
        taxonomy_keys=keys,
    )


def _make_blend_card(slug: str, registry_entry: Dict[str, Any]) -> BlendCard:
    display_name = registry_entry.get("display_name", slug)
    if not isinstance(display_name, str):
        display_name = slug

    taxonomy_keys = registry_entry.get("taxonomy_keys", [])
    if not isinstance(taxonomy_keys, list) or any(not isinstance(x, str) for x in taxonomy_keys):
        raise ValueError(f"Invalid taxonomy_keys for blend '{slug}' in {BLENDS_INDEX_PATH}")

    components = registry_entry.get("components", [])
    components_unresolved = registry_entry.get("components_unresolved", [])

    if not isinstance(components, list) or any(not isinstance(x, str) for x in components):
        raise ValueError(f"Invalid components for blend '{slug}' in {BLENDS_INDEX_PATH}")
    if not isinstance(components_unresolved, list) or any(not isinstance(x, str) for x in components_unresolved):
        raise ValueError(f"Invalid components_unresolved for blend '{slug}' in {BLENDS_INDEX_PATH}")

    return BlendCard(
        kind="blend",
        slug=slug,
        display_name=display_name,
        taxonomy_keys=list(taxonomy_keys),
        components=list(components),
        components_unresolved=list(components_unresolved),
    )


def _peptide_sort_key(card: PeptideCard) -> Tuple[int, str]:
    status = card.status_category or ""
    return (STATUS_SORT_ORDER.get(status, 99), card.display_name.lower())


def _blend_sort_key(card: BlendCard) -> str:
    return card.display_name.lower()


def main() -> int:
    peptide_taxonomy = _load_json(PEPTIDE_CATEGORIES_PATH)
    blend_taxonomy = _load_json(BLEND_CATEGORIES_PATH)
    governance = _load_json(GOVERNANCE_PATH)
    entities_index = _load_json(ENTITIES_INDEX_PATH)
    blends_index = _load_json(BLENDS_INDEX_PATH)

    peptide_vocab = _extract_taxonomy_vocab_peptides(peptide_taxonomy)  # ordered
    blend_vocab_keys = set(_extract_taxonomy_vocab_blends(blend_taxonomy))

    # Validate mapping keys exist in peptide vocab; allow some peptide categories to have no mapping entry.
    peptide_vocab_keys = {x["key"] for x in peptide_vocab}
    unknown_map_keys = set(PEPTIDE_KEY_TO_BLEND_KEYS.keys()) - peptide_vocab_keys
    if unknown_map_keys:
        raise ValueError(
            "PEPTIDE_KEY_TO_BLEND_KEYS contains keys not present in peptide taxonomy: "
            + ", ".join(sorted(unknown_map_keys))
        )

    # Validate mapped blend taxonomy keys exist in blend taxonomy
    mapped_blend_keys = {k for keys in PEPTIDE_KEY_TO_BLEND_KEYS.values() for k in keys}
    missing_blend_tax_keys = mapped_blend_keys - blend_vocab_keys
    if missing_blend_tax_keys:
        raise ValueError(
            "Blend taxonomy missing keys referenced by PEPTIDE_KEY_TO_BLEND_KEYS: "
            + ", ".join(sorted(missing_blend_tax_keys))
        )

    gov_pep_tax_map = _build_governance_peptide_taxonomy_map(governance)
    entities_pep_map, _entities_blend_map_unused = _build_entities_maps(entities_index)
    blends_registry_map = _build_blends_registry_map(blends_index)

    # Pre-build blend cards
    blend_cards: Dict[str, BlendCard] = {}
    for slug, entry in blends_registry_map.items():
        blend_cards[slug] = _make_blend_card(slug, entry)

    categories_out: List[Dict[str, Any]] = []

    for cat in peptide_vocab:
        cat_key = cat["key"]
        cat_label = cat["label"]

        # Determine which blend taxonomy keys map into this peptide category
        mapped_blend_tax_keys_for_cat = PEPTIDE_KEY_TO_BLEND_KEYS.get(cat_key, [])

        # Build peptide list: use governance taxonomy_keys membership as canonical
        peptide_cards: List[PeptideCard] = []
        for pep_slug, gov_keys in gov_pep_tax_map.items():
            if cat_key not in gov_keys:
                continue
            ent = entities_pep_map.get(pep_slug, {})
            peptide_cards.append(_make_peptide_card(pep_slug, ent, gov_keys))

        peptide_cards.sort(key=_peptide_sort_key)

        # Build blend list: include blends that have any mapped blend taxonomy key
        blends_for_cat: List[BlendCard] = []
        if mapped_blend_tax_keys_for_cat:
            mapped_set = set(mapped_blend_tax_keys_for_cat)
            for bc in blend_cards.values():
                if any(k in mapped_set for k in bc.taxonomy_keys):
                    blends_for_cat.append(bc)

        blends_for_cat.sort(key=_blend_sort_key)

        categories_out.append(
            {
                "key": cat_key,
                "label": cat_label,
                "mapped_blend_taxonomy_keys": list(mapped_blend_tax_keys_for_cat),
                "counts": {
                    "peptides": len(peptide_cards),
                    "blends": len(blends_for_cat),
                    "total": len(peptide_cards) + len(blends_for_cat),
                },
                "items": {
                    "peptides": [
                        {
                            "kind": c.kind,
                            "slug": c.slug,
                            "display_name": c.display_name,
                            "status_category": c.status_category,
                            "taxonomy_keys": c.taxonomy_keys,
                        }
                        for c in peptide_cards
                    ],
                    "blends": [
                        {
                            "kind": c.kind,
                            "slug": c.slug,
                            "display_name": c.display_name,
                            "taxonomy_keys": c.taxonomy_keys,
                            "components": c.components,
                            "components_unresolved": c.components_unresolved,
                        }
                        for c in blends_for_cat
                    ],
                },
            }
        )

    out_obj = {
        "version": "v1",
        "updated_at": date.today().isoformat(),
        "notes": "Deterministic Explore-by-Category index built from taxonomy + governance + entities + blends registry.",
        "mapping": {
            "peptide_key_to_blend_keys": PEPTIDE_KEY_TO_BLEND_KEYS,
        },
        "counts": {
            "categories": len(categories_out),
            "peptide_classes": len(categories_out),
        },
        "categories": categories_out,
    }

    _write_json(OUTPUT_PATH, out_obj)
    print(f"Wrote {OUTPUT_PATH} (categories={len(categories_out)})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
