#!/usr/bin/env python3
import json
import sys
from pathlib import Path
from typing import NoReturn, Set, Dict, Any

def fail(msg: str) -> NoReturn:
    print(f"VALIDATION FAILED: {msg}", file=sys.stderr)
    sys.exit(1)

def load_json(p: Path) -> Any:
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        fail(f"Could not read/parse JSON: {p} ({e})")

def collect_taxonomy_keys(taxonomy_path: Path, array_field: str) -> Set[str]:
    data = load_json(taxonomy_path)
    arr = data.get(array_field)
    if not isinstance(arr, list):
        fail(f"{taxonomy_path} missing or invalid '{array_field}' array")
    keys = set()
    for i, item in enumerate(arr):
        if not isinstance(item, dict):
            fail(f"{taxonomy_path}:{array_field}[{i}] must be object")
        k = item.get("key")
        if not isinstance(k, str) or not k.strip():
            fail(f"{taxonomy_path}:{array_field}[{i}].key must be non-empty string")
        if k in keys:
            fail(f"{taxonomy_path} duplicate key: {k}")
        keys.add(k)
    return keys

def collect_used_keys_from_peptides(peptides_dir: Path) -> Set[str]:
    used = set()
    for p in peptides_dir.glob("*.json"):
        if p.name.startswith("_"):
            continue
        data = load_json(p)
        pep = data.get("peptide")
        if not isinstance(pep, dict):
            continue
        # Optional future field: peptide.taxonomy_keys
        keys = pep.get("taxonomy_keys")
        if isinstance(keys, list):
            for k in keys:
                if isinstance(k, str) and k.strip():
                    used.add(k.strip())
    return used

def collect_used_keys_from_governance(governance_path: Path) -> Dict[str, Set[str]]:
    data = load_json(governance_path)
    out = {"peptides": set(), "blends": set()}

    peptides = data.get("peptides", [])
    if isinstance(peptides, list):
        for i, item in enumerate(peptides):
            if not isinstance(item, dict):
                continue
            keys = item.get("taxonomy_keys", [])
            if isinstance(keys, list):
                for k in keys:
                    if isinstance(k, str) and k.strip():
                        out["peptides"].add(k.strip())

    blends = data.get("blends", [])
    if isinstance(blends, list):
        for i, item in enumerate(blends):
            if not isinstance(item, dict):
                continue
            keys = item.get("taxonomy_keys", [])
            if isinstance(keys, list):
                for k in keys:
                    if isinstance(k, str) and k.strip():
                        out["blends"].add(k.strip())

    return out

def collect_used_keys_from_blends_index(blends_index_path: Path) -> Set[str]:
    data = load_json(blends_index_path)
    blends = data.get("blends", [])
    if not isinstance(blends, list):
        fail(f"{blends_index_path} missing or invalid 'blends' array")
    used = set()
    for i, b in enumerate(blends):
        if not isinstance(b, dict):
            continue
        keys = b.get("taxonomy_keys", [])
        if isinstance(keys, list):
            for k in keys:
                if isinstance(k, str) and k.strip():
                    used.add(k.strip())
    return used

def main():
    root = Path(".").resolve()

    peptide_tax_path = root / "content/_taxonomy/peptide_categories_v1.json"
    blend_tax_path  = root / "content/_taxonomy/blend_categories_v1.json"
    governance_path = root / "content/_governance/coverage_checklist_v1.json"
    blends_index_path = root / "content/blends/_index.json"
    peptides_dir = root / "content/peptides"

    if not peptide_tax_path.exists():
        fail(f"Missing taxonomy file: {peptide_tax_path}")
    if not blend_tax_path.exists():
        fail(f"Missing taxonomy file: {blend_tax_path}")
    if not governance_path.exists():
        fail(f"Missing governance file: {governance_path}")
    if not blends_index_path.exists():
        fail(f"Missing blends index file: {blends_index_path}")
    if not peptides_dir.exists():
        fail(f"Missing peptides dir: {peptides_dir}")

    allowed_peptide_keys = collect_taxonomy_keys(peptide_tax_path, "peptide_classes")
    allowed_blend_keys   = collect_taxonomy_keys(blend_tax_path, "blend_classes")

    used_from_gov = collect_used_keys_from_governance(governance_path)
    used_from_blends_index = collect_used_keys_from_blends_index(blends_index_path)
    used_from_peptides = collect_used_keys_from_peptides(peptides_dir)

    # Governance peptide taxonomy keys must exist in peptide taxonomy
    bad_gov_peptides = sorted(k for k in used_from_gov["peptides"] if k not in allowed_peptide_keys)
    if bad_gov_peptides:
        fail(f"Unknown peptide taxonomy_keys in governance: {bad_gov_peptides}")

    # Governance blend taxonomy keys must exist in blend taxonomy
    bad_gov_blends = sorted(k for k in used_from_gov["blends"] if k not in allowed_blend_keys)
    if bad_gov_blends:
        fail(f"Unknown blend taxonomy_keys in governance: {bad_gov_blends}")

    # Blend index taxonomy keys must exist in blend taxonomy
    bad_blend_index = sorted(k for k in used_from_blends_index if k not in allowed_blend_keys)
    if bad_blend_index:
        fail(f"Unknown blend taxonomy_keys in blends/_index.json: {bad_blend_index}")

    # Optional peptide JSON taxonomy_keys must exist in peptide taxonomy
    bad_peptide_json = sorted(k for k in used_from_peptides if k not in allowed_peptide_keys)
    if bad_peptide_json:
        fail(f"Unknown peptide taxonomy_keys in peptide JSON files: {bad_peptide_json}")

    print("TAXONOMY KEYS VALIDATION PASSED")
    print(f"Allowed peptide taxonomy keys: {len(allowed_peptide_keys)}")
    print(f"Allowed blend taxonomy keys: {len(allowed_blend_keys)}")
    print(f"Used peptide taxonomy keys (governance + peptides): {len(set(used_from_gov['peptides']) | used_from_peptides)}")
    print(f"Used blend taxonomy keys (governance + blend index): {len(set(used_from_gov['blends']) | used_from_blends_index)}")

if __name__ == "__main__":
    main()
