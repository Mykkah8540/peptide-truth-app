#!/usr/bin/env python3
import json
import sys
from pathlib import Path
from typing import NoReturn

ROOT = Path(__file__).resolve().parents[2]

def fail(msg: str) -> NoReturn:
    print(f"VALIDATION FAILED: {msg}", file=sys.stderr)
    raise SystemExit(1)

def load_json(path: Path) -> dict:
    try:
        d = json.loads(path.read_text(encoding="utf-8"))
    except Exception as e:
        fail(f"Could not read/parse JSON {path}: {e}")
    if not isinstance(d, dict):
        fail(f"Root JSON must be an object: {path}")
    return d

def collect_allowed_taxonomy_keys(path: Path, list_key: str) -> set[str]:
    d = load_json(path)
    lst = d.get(list_key)
    if not isinstance(lst, list):
        fail(f"{path} must contain list {list_key}")
    out: set[str] = set()
    for item in lst:
        if not isinstance(item, dict):
            continue
        k = item.get("key")
        if isinstance(k, str) and k.strip():
            out.add(k.strip())
    return out

def main() -> int:
    syn_path = ROOT / "content" / "_taxonomy" / "search_synonyms_v1.json"
    pep_tax  = ROOT / "content" / "_taxonomy" / "peptide_categories_v1.json"
    blend_tax = ROOT / "content" / "_taxonomy" / "blend_categories_v1.json"
    pep_dir  = ROOT / "content" / "peptides"
    blends_reg = ROOT / "content" / "blends" / "_index.json"

    if not syn_path.exists():
        fail(f"Missing synonyms file: {syn_path}")
    if not pep_tax.exists():
        fail(f"Missing peptide taxonomy file: {pep_tax}")
    if not blend_tax.exists():
        fail(f"Missing blend taxonomy file: {blend_tax}")
    if not pep_dir.exists():
        fail(f"Missing peptides dir: {pep_dir}")
    if not blends_reg.exists():
        fail(f"Missing blends registry: {blends_reg}")

    syn = load_json(syn_path)

    # Collect known peptide slugs
    peptide_slugs = {p.stem for p in pep_dir.glob("*.json") if not p.name.startswith("_")}

    # Collect known blend slugs
    reg = load_json(blends_reg)
    blends = reg.get("blends")
    if not isinstance(blends, list):
        fail("content/blends/_index.json must contain blends list")
    blend_slugs = {b.get("slug") for b in blends if isinstance(b, dict) and isinstance(b.get("slug"), str)}
    blend_slugs = {s for s in blend_slugs if s and s.strip()}

    # Allowed taxonomy keys
    allowed_pep_keys = collect_allowed_taxonomy_keys(pep_tax, "peptide_classes")
    allowed_blend_keys = collect_allowed_taxonomy_keys(blend_tax, "blend_classes")

    # Validate entity_synonyms: each slug must exist as a peptide slug
    ent = syn.get("entity_synonyms", [])
    if not isinstance(ent, list):
        fail("entity_synonyms must be a list")
    for i, item in enumerate(ent):
        if not isinstance(item, dict):
            fail(f"entity_synonyms[{i}] must be an object")
        term = item.get("term")
        slugs = item.get("slugs")
        if not (isinstance(term, str) and term.strip()):
            fail(f"entity_synonyms[{i}] missing/empty term")
        if not isinstance(slugs, list) or not slugs:
            fail(f"entity_synonyms[{i}] must contain non-empty slugs[]")
        for s in slugs:
            if not isinstance(s, str) or not s.strip():
                fail(f"entity_synonyms[{i}] has invalid slug: {s!r}")
            if s not in peptide_slugs:
                fail(f"entity_synonyms[{i}] references unknown peptide slug {s}")

    # Validate category_synonyms: taxonomy_keys must exist in peptide taxonomy
    cat = syn.get("category_synonyms", [])
    if not isinstance(cat, list):
        fail("category_synonyms must be a list")
    for i, item in enumerate(cat):
        if not isinstance(item, dict):
            fail(f"category_synonyms[{i}] must be an object")
        term = item.get("term")
        keys = item.get("taxonomy_keys")
        if not (isinstance(term, str) and term.strip()):
            fail(f"category_synonyms[{i}] missing/empty term")
        if not isinstance(keys, list) or not keys:
            fail(f"category_synonyms[{i}] must contain non-empty taxonomy_keys[]")
        for k in keys:
            if not isinstance(k, str) or not k.strip():
                fail(f"category_synonyms[{i}] invalid taxonomy key: {k!r}")
            if k not in allowed_pep_keys:
                fail(f"category_synonyms[{i}] references unknown peptide taxonomy key {k}")

    # Validate blend_synonyms: each blend slug must exist in blends registry
    bs = syn.get("blend_synonyms", [])
    if not isinstance(bs, list):
        fail("blend_synonyms must be a list")
    for i, item in enumerate(bs):
        if not isinstance(item, dict):
            fail(f"blend_synonyms[{i}] must be an object")
        term = item.get("term")
        bslugs = item.get("blend_slugs")
        if not (isinstance(term, str) and term.strip()):
            fail(f"blend_synonyms[{i}] missing/empty term")
        if not isinstance(bslugs, list) or not bslugs:
            fail(f"blend_synonyms[{i}] must contain non-empty blend_slugs[]")
        for s in bslugs:
            if not isinstance(s, str) or not s.strip():
                fail(f"blend_synonyms[{i}] has invalid blend slug: {s!r}")
            if s not in blend_slugs:
                fail(f"blend_synonyms[{i}] references unknown blend slug {s}")

    print("SEARCH SYNONYMS VALIDATION PASSED")
    print(f"Peptides: {len(peptide_slugs)}  Blends: {len(blend_slugs)}")
    print(f"Entity synonym rows: {len(ent)}  Category synonym rows: {len(cat)}  Blend synonym rows: {len(bs)}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
