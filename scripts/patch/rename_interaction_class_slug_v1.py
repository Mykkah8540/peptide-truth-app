#!/usr/bin/env python3
import argparse
import json
from pathlib import Path
from typing import Any, Dict, List

ROOT = Path(__file__).resolve().parents[2]
ENTITIES_FP = ROOT / "content" / "_index" / "entities_v1.json"
PEPTIDES_DIR = ROOT / "content" / "peptides"

def load_json(fp: Path) -> Any:
    return json.loads(fp.read_text(encoding="utf-8"))

def save_json(fp: Path, data: Any) -> None:
    fp.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def governed_slugs() -> List[str]:
    d = load_json(ENTITIES_FP)
    items = d.get("peptides") if isinstance(d, dict) else []
    out = []
    if isinstance(items, list):
        for it in items:
            if isinstance(it, dict) and isinstance(it.get("slug"), str) and it["slug"].strip():
                out.append(it["slug"].strip())
    # de-dupe preserve order
    seen=set(); uniq=[]
    for s in out:
        if s in seen: continue
        seen.add(s); uniq.append(s)
    return uniq

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--from-slug", required=True)
    ap.add_argument("--to-slug", required=True)
    ap.add_argument("--apply", action="store_true")
    args = ap.parse_args()

    src = args.from_slug.strip()
    dst = args.to_slug.strip()
    if not src or not dst:
        raise SystemExit("ERROR: slugs must be non-empty")

    slugs = governed_slugs()

    scanned = 0
    changed = 0
    hits = 0
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

        inter = doc.get("interactions")
        if not isinstance(inter, dict):
            continue

        dc = inter.get("drug_classes")
        if not isinstance(dc, list) or not dc:
            continue

        before = list(dc)
        if src in dc:
            hits += 1
            dc = [dst if x == src else x for x in dc]
            # de-dupe preserve order
            seen=set(); nd=[]
            for x in dc:
                if x in seen: continue
                seen.add(x); nd.append(x)
            inter["drug_classes"] = nd

        if inter.get("drug_classes") != before:
            doc["interactions"] = inter
            changed += 1
            if args.apply:
                save_json(fp, doc)

    mode = "APPLY" if args.apply else "DRY-RUN"
    print(f"{mode}: scanned={scanned} peptides_with_src={hits} files_changed={changed} warnings={warnings}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
