#!/usr/bin/env python3
import json
from pathlib import Path
from typing import Any, Dict, List

ROOT = Path(__file__).resolve().parents[2]
ENTITIES_FP = ROOT / "content" / "_index" / "entities_v1.json"
PEPTIDES_DIR = ROOT / "content" / "peptides"

def load_json(fp: Path) -> Any:
    return json.loads(fp.read_text(encoding="utf-8"))

def governed_peptide_entities() -> List[Dict[str, Any]]:
    d = load_json(ENTITIES_FP)
    items = d.get("peptides") if isinstance(d, dict) else []
    if not isinstance(items, list):
        return []
    out = []
    for it in items:
        if isinstance(it, dict) and isinstance(it.get("slug"), str) and it["slug"].strip():
            out.append(it)
    return out

def is_token_ok(x: Any) -> bool:
    # Current pipeline tolerates list entries as str, and also dict {slug/name} in case any legacy remains.
    if isinstance(x, str) and x.strip():
        return True
    if isinstance(x, dict):
        v = x.get("slug") or x.get("name")
        return isinstance(v, str) and v.strip()
    return False

def main() -> int:
    ents = governed_peptide_entities()
    checked = 0
    with_any = 0
    errors = []

    for e in ents:
        slug = e["slug"]
        fp = PEPTIDES_DIR / f"{slug}.json"
        if not fp.exists():
            errors.append(f"Missing peptide JSON for slug={slug}: {fp}")
            continue
        try:
            doc = load_json(fp)
        except Exception as ex:
            errors.append(f"Unreadable JSON: {fp} ({ex})")
            continue
        if not isinstance(doc, dict):
            errors.append(f"Top-level is not object: {fp}")
            continue

        checked += 1

        # ✅ Schema-v1: interactions MUST be TOP-LEVEL
        inter = doc.get("interactions")
        if inter is None:
            continue
        if not isinstance(inter, dict):
            errors.append(f"interactions must be object when present: {fp}")
            continue

        dc = inter.get("drug_classes", [])
        sc = inter.get("supplement_classes", [])
        pc = inter.get("peptides", [])

        for key, val in [("drug_classes", dc), ("supplement_classes", sc), ("peptides", pc)]:
            if not isinstance(val, list):
                errors.append(f"interactions.{key} must be list: {fp}")
                continue
            for item in val:
                if not is_token_ok(item):
                    errors.append(f"Bad token in interactions.{key}: {fp} -> {repr(item)}")

        if (isinstance(dc, list) and len(dc) > 0) or (isinstance(sc, list) and len(sc) > 0) or (isinstance(pc, list) and len(pc) > 0):
            with_any += 1

    if errors:
        print("PEPTIDE INTERACTIONS VALIDATION FAILED")
        for e in errors[:200]:
            print("ERROR:", e)
        print(f"Errors: {len(errors)} (showing up to 200)")
        return 1

    print("PEPTIDE INTERACTIONS VALIDATION PASSED")
    print(f"Peptides checked: {checked}  With interactions present: {with_any}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
