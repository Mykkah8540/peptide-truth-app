#!/usr/bin/env python3
import json
import re
from pathlib import Path
from collections import defaultdict
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

ROOT = Path(__file__).resolve().parents[2]
ENTITIES_FP = ROOT / "content" / "_index" / "entities_v1.json"
PEPTIDES_DIR = ROOT / "content" / "peptides"
OUT_DIR = ROOT / "content" / "_index"
OUT_FP = OUT_DIR / "interactions_to_peptides_v1.json"

def load_json(fp: Path) -> Any:
    return json.loads(fp.read_text(encoding="utf-8"))

def save_json(fp: Path, data: Any) -> None:
    fp.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

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

def iter_tokens(items):
    if not isinstance(items, list):
        return
    for it in items:
        if isinstance(it, str):
            tok = it.strip()
        elif isinstance(it, dict):
            v = it.get("slug") or it.get("name") or ""
            tok = str(v).strip()
        else:
            continue
        if tok:
            yield tok

def main() -> int:
    ents = governed_peptide_entities()
    name_by_slug = {e["slug"]: (e.get("display_name") or e["slug"]) for e in ents}

    mapping = defaultdict(list)  # interaction_slug -> [{peptide_slug, peptide_name}...]

    scanned = 0
    peptides_with_any = 0

    for e in ents:
        slug = e["slug"]
        fp = PEPTIDES_DIR / f"{slug}.json"
        if not fp.exists():
            continue
        try:
            doc = load_json(fp)
        except Exception:
            continue
        if not isinstance(doc, dict):
            continue

        scanned += 1

        # ✅ Schema-v1: TOP-LEVEL ONLY
        inter = doc.get("interactions")
        if not isinstance(inter, dict):
            continue

        hit = False

        for token in iter_tokens(inter.get("drug_classes")):
            mapping[token].append({"peptide_slug": slug, "peptide_name": name_by_slug.get(slug, slug)})
            hit = True

        for token in iter_tokens(inter.get("supplement_classes")):
            mapping[token].append({"peptide_slug": slug, "peptide_name": name_by_slug.get(slug, slug)})
            hit = True

        for token in iter_tokens(inter.get("peptides")):
            mapping[token].append({"peptide_slug": slug, "peptide_name": name_by_slug.get(slug, slug)})
            hit = True

        if hit:
            peptides_with_any += 1

    # de-dupe + sort per key
    final = {}
    for k, rows in mapping.items():
        seen = set()
        uniq = []
        for r in rows:
            key = (r["peptide_slug"], r["peptide_name"])
            if key in seen:
                continue
            seen.add(key)
            uniq.append(r)
        uniq.sort(key=lambda x: (x["peptide_name"].lower(), x["peptide_slug"]))
        final[k] = uniq

    out = {
        "schema_version": "interactions_to_peptides_index_v1",
        "generated_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        "stats": {
            "total_governed_peptides": len(ents),
            "total_peptides_loaded": scanned,
            "peptides_with_any_interactions": peptides_with_any,
            "interaction_keys": len(final),
        },
        "mapping": final,
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    save_json(OUT_FP, out)
    print(f"OK: wrote {OUT_FP.relative_to(ROOT)} ({len(final)} interaction key(s))")
    print("STATS:", out["stats"])
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
