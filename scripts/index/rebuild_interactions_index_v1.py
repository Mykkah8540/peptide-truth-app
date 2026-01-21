#!/usr/bin/env python3
import json
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"
OUT_DIR = ROOT / "content" / "_index"
OUT_FP = OUT_DIR / "interactions_v1.json"

def norm(s: str) -> str:
    return " ".join((s or "").strip().split())

def main():
    drug_map = defaultdict(list)        # name -> [peptide_slug...]
    supp_map = defaultdict(list)        # name -> [peptide_slug...]
    pep_map  = defaultdict(list)        # name -> [peptide_slug...]

    total_peptides = 0
    peptides_with_any = 0

    for fp in sorted(PEPTIDES_DIR.glob("*.json")):
        total_peptides += 1
        slug = fp.stem
        try:
            doc = json.loads(fp.read_text(encoding="utf-8"))
        except Exception:
            continue

        peptide = (doc or {}).get("peptide", {}) or {}
        interactions = (peptide.get("interactions") or {}) if isinstance(peptide, dict) else {}
        if not isinstance(interactions, dict):
            continue

        hit_any = False

        for key, target in [
            ("drug_classes", drug_map),
            ("supplement_classes", supp_map),
            ("peptides", pep_map),
        ]:
            items = interactions.get(key)
            if not isinstance(items, list):
                continue
            for it in items:
                if not isinstance(it, dict):
                    continue
                name = norm(it.get("name", ""))
                if not name:
                    continue
                hit_any = True
                target[name].append(slug)

        if hit_any:
            peptides_with_any += 1

    # De-dupe + sort slugs
    def finalize(d):
        out = {}
        for name, slugs in d.items():
            out[name] = sorted(set(slugs))
        return dict(sorted(out.items(), key=lambda kv: kv[0].lower()))

    out = {
        "schema_version": "interactions_index_v1",
        "generated_at": "2026-01-21",
        "stats": {
            "total_peptides": total_peptides,
            "peptides_with_any_interactions": peptides_with_any,
            "drug_class_terms": len(drug_map),
            "supplement_class_terms": len(supp_map),
            "peptide_terms": len(pep_map),
        },
        "by_drug_class_name": finalize(drug_map),
        "by_supplement_class_name": finalize(supp_map),
        "by_peptide_name": finalize(pep_map),
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUT_FP.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"OK: wrote {OUT_FP.relative_to(ROOT)}")
    print("STATS:", out["stats"])

if __name__ == "__main__":
    main()
