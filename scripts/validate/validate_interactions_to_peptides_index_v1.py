#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, Set


ROOT = Path(__file__).resolve().parents[2]
TAX_FP = ROOT / "content" / "_taxonomy" / "interaction_classes_v1.json"
REV_FP = ROOT / "content" / "_index" / "interactions_to_peptides_v1.json"


def load_json(fp: Path) -> Any:
    return json.loads(fp.read_text(encoding="utf-8"))


def canon_slugs(tax: Dict[str, Any]) -> Set[str]:
    out: Set[str] = set()
    for bucket in ("drug_classes", "supplement_classes"):
        items = tax.get(bucket, [])
        if not isinstance(items, list):
            continue
        for it in items:
            if not isinstance(it, dict):
                continue
            slug = it.get("slug")
            if isinstance(slug, str) and slug.strip():
                out.add(slug.strip())
    return out


def main() -> int:
    if not TAX_FP.exists():
        raise SystemExit(f"ERROR: missing taxonomy file: {TAX_FP}")
    if not REV_FP.exists():
        raise SystemExit(f"ERROR: missing reverse index file: {REV_FP}")

    tax = load_json(TAX_FP)
    rev = load_json(REV_FP)

    if not isinstance(rev, dict) or rev.get("schema_version") != "interactions_to_peptides_index_v1":
        raise SystemExit("ERROR: reverse index schema_version mismatch")

    mapping = rev.get("mapping")
    if not isinstance(mapping, dict):
        raise SystemExit("ERROR: reverse index missing/invalid mapping")

    canon = canon_slugs(tax)
    if not canon:
        raise SystemExit("ERROR: taxonomy has zero canonical slugs (unexpected)")

    bad_keys = []
    bad_rows = 0

    for k, rows in mapping.items():
        if not isinstance(k, str) or not k.strip():
            bad_keys.append(str(k))
            continue
        key = k.strip()
        if key not in canon:
            bad_keys.append(key)
            continue
        if not isinstance(rows, list):
            bad_rows += 1
            continue
        for r in rows:
            if not isinstance(r, dict):
                bad_rows += 1
                continue
            ps = r.get("peptide_slug")
            pn = r.get("peptide_name")
            if not (isinstance(ps, str) and ps.strip() and isinstance(pn, str) and pn.strip()):
                bad_rows += 1

    if bad_keys:
        sample = bad_keys[:25]
        raise SystemExit(
            "ERROR: reverse index contains non-canonical interaction keys "
            f"(count={len(bad_keys)}). Sample: {sample}"
        )
    if bad_rows:
        raise SystemExit(f"ERROR: reverse index contains invalid row(s): {bad_rows}")

    print("VALIDATION PASSED")
    print(f"Canonical slugs: {len(canon)}  Reverse index keys: {len(mapping)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
