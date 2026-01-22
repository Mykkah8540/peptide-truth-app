#!/usr/bin/env python3
import argparse
import json
from pathlib import Path
from typing import Any, Dict, List, Tuple

ROOT = Path(__file__).resolve().parents[2]
ENTITIES_FP = ROOT / "content" / "_index" / "entities_v1.json"
PEPTIDES_DIR = ROOT / "content" / "peptides"

def load_json(fp: Path) -> Any:
    return json.loads(fp.read_text(encoding="utf-8"))

def save_json(fp: Path, data: Any) -> None:
    fp.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def ensure_interactions_shape(d: Dict[str, Any]) -> Dict[str, List[Any]]:
    inter = d.get("interactions")
    if not isinstance(inter, dict):
        inter = {}
    out = {
        "drug_classes": inter.get("drug_classes") if isinstance(inter.get("drug_classes"), list) else [],
        "supplement_classes": inter.get("supplement_classes") if isinstance(inter.get("supplement_classes"), list) else [],
        "peptides": inter.get("peptides") if isinstance(inter.get("peptides"), list) else [],
    }
    return out

def merge_lists(a: List[Any], b: List[Any]) -> List[Any]:
    # De-dupe while preserving order; supports str/dict entries
    seen = set()
    out = []
    for x in a + b:
        key = None
        if isinstance(x, str):
            key = ("s", x.strip())
        elif isinstance(x, dict):
            # common forms: {"slug":...} or {"name":...}
            key = ("d", x.get("slug") or x.get("name") or json.dumps(x, sort_keys=True))
        else:
            key = ("o", json.dumps(x, sort_keys=True, default=str))
        if key in seen:
            continue
        seen.add(key)
        out.append(x)
    return out

def governed_peptide_slugs() -> List[str]:
    d = load_json(ENTITIES_FP)
    items = d.get("peptides") if isinstance(d, dict) else []
    out = []
    if isinstance(items, list):
        for it in items:
            if isinstance(it, dict) and isinstance(it.get("slug"), str) and it["slug"].strip():
                out.append(it["slug"].strip())
            elif isinstance(it, str) and it.strip():
                out.append(it.strip())
    # de-dupe preserve order
    seen=set(); uniq=[]
    for s in out:
        if s in seen: continue
        seen.add(s); uniq.append(s)
    return uniq

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="Write changes. Without this, dry-run.")
    args = ap.parse_args()

    slugs = governed_peptide_slugs()

    scanned = 0
    moved = 0
    merged = 0
    already_ok = 0
    no_nested = 0
    warnings = 0

    for slug in slugs:
        fp = PEPTIDES_DIR / f"{slug}.json"
        if not fp.exists():
            warnings += 1
            continue
        try:
            doc = load_json(fp)
        except Exception:
            warnings += 1
            continue
        if not isinstance(doc, dict):
            warnings += 1
            continue

        scanned += 1

        top_exists = isinstance(doc.get("interactions"), dict)
        nested_exists = isinstance(doc.get("peptide"), dict) and isinstance(doc["peptide"].get("interactions"), dict)

        if not nested_exists and top_exists:
            # ensure shape but don't force write unless needed
            inter = ensure_interactions_shape(doc)
            if doc.get("interactions") == inter:
                already_ok += 1
                continue
            doc["interactions"] = inter
            if args.apply:
                save_json(fp, doc)
            already_ok += 1
            continue

        if not nested_exists and not top_exists:
            no_nested += 1
            continue

        # build normalized top + nested
        top_inter = ensure_interactions_shape(doc)
        nested_inter = ensure_interactions_shape({"interactions": doc["peptide"]["interactions"]})

        # If top was empty and nested has content, count as moved
        # If both have content, count as merged
        did_merge = False
        for k in ("drug_classes", "supplement_classes", "peptides"):
            a = top_inter.get(k, [])
            b = nested_inter.get(k, [])
            if b and not a:
                # moving content up
                pass
            if a and b:
                did_merge = True
            top_inter[k] = merge_lists(a, b)

        doc["interactions"] = top_inter
        # remove nested interactions
        try:
            del doc["peptide"]["interactions"]
        except Exception:
            pass

        if did_merge:
            merged += 1
        else:
            moved += 1

        if args.apply:
            save_json(fp, doc)

    mode = "APPLY" if args.apply else "DRY-RUN"
    print(f"{mode}: scanned={scanned} moved={moved} merged={merged} already_ok={already_ok} no_interactions_anywhere={no_nested} warnings={warnings}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
