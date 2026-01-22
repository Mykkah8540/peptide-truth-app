#!/usr/bin/env python3
from __future__ import annotations

import json
from collections import Counter
from pathlib import Path
from typing import Any, Dict, List, Tuple


REPO_ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = REPO_ROOT / "content" / "peptides"
OUT_DIR = REPO_ROOT / "data" / "reports"
OUT_DIR.mkdir(parents=True, exist_ok=True)


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def extract(doc: Dict[str, Any]) -> Tuple[List[Any], List[Any], List[Any]]:
    # Schema-v1: interactions live at TOP-LEVEL only
    inter = doc.get("interactions") if isinstance(doc.get("interactions"), dict) else {}
    return (
        inter.get("drug_classes") or [],
        inter.get("supplement_classes") or [],
        inter.get("peptides") or [],
    )


def to_slugs(v: Any) -> List[str]:
    if not isinstance(v, list):
        return []
    out: List[str] = []
    for item in v:
        if isinstance(item, str):
            out.append(item)
        elif isinstance(item, dict) and isinstance(item.get("slug"), str):
            out.append(item["slug"])
    return out

def main() -> int:
    peptide_files = sorted([p for p in PEPTIDES_DIR.glob("*.json") if not p.name.startswith("_")])
    totals = Counter()
    drug_counts = Counter()
    supp_counts = Counter()

    missing: List[str] = []
    examples: List[Dict[str, Any]] = []

    for fp in peptide_files:
        doc = load_json(fp)
        d_raw, s_raw, p_raw = extract(doc)
        d = to_slugs(d_raw)
        s = to_slugs(s_raw)
        p = to_slugs(p_raw)

        any_present = bool(d or s or p)

        totals["peptides_total"] += 1
        totals["peptides_with_any_interactions"] += int(any_present)
        totals["drug_items_total"] += len(d)
        totals["supp_items_total"] += len(s)
        totals["peptide_items_total"] += len(p)

        for slug in d:
            drug_counts[slug] += 1
        for slug in s:
            supp_counts[slug] += 1

        if not any_present:
            missing.append(fp.stem)
        elif len(examples) < 10:
            examples.append({"slug": fp.stem, "drug_classes": d[:5], "supplement_classes": s[:5], "peptides": p[:5]})

    report = {
        "schema_version": "interactions_coverage_report_v1",
        "totals": dict(totals),
        "top_drug_classes": drug_counts.most_common(25),
        "top_supplement_classes": supp_counts.most_common(25),
        "missing_interactions_slugs": missing,
        "examples": examples,
    }

    out_path = OUT_DIR / "interactions_coverage_report_v1.json"
    out_path.write_text(json.dumps(report, indent=2, sort_keys=False) + "\n", encoding="utf-8")

    print("OK: wrote", out_path)
    print("Totals:", dict(totals))
    print("Missing interactions:", len(missing))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
