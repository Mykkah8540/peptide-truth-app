#!/usr/bin/env python3
from __future__ import annotations

import csv
import json
from pathlib import Path
from typing import Any, Dict, List, Tuple

REPO_ROOT = Path(__file__).resolve().parents[2]

TAXONOMY = REPO_ROOT / "content" / "_taxonomy" / "interaction_classes_v1.json"
PLAN = Path("/tmp/peptalk_missing_interactions_plan_v1.csv")

PEPTIDES_DIR = REPO_ROOT / "content" / "peptides"

def read_json(p: Path) -> Any:
    return json.loads(p.read_text(encoding="utf-8"))

def write_json(p: Path, obj: Any) -> None:
    p.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def load_class_titles() -> Dict[str, str]:
    if not TAXONOMY.exists():
        return {}
    doc = read_json(TAXONOMY)
    out: Dict[str, str] = {}
    for key in ("drug_classes", "supplement_classes", "peptide_classes"):
        arr = doc.get(key)
        if isinstance(arr, list):
            for it in arr:
                if not isinstance(it, dict):
                    continue
                slug = str(it.get("slug") or "").strip()
                title = str(it.get("title") or it.get("name") or slug).strip()
                if slug:
                    out[slug] = title
    return out

def normalize_entry(class_slug: str, title_by_slug: Dict[str, str]) -> Dict[str, Any]:
    # Keep minimal, schema-friendly fields; InteractionsSection supports name + slug/interaction_slug.
    title = title_by_slug.get(class_slug, class_slug)
    return {
        "name": title,
        "interaction_slug": class_slug,
        # Optional fields supported elsewhere; leave empty unless you want to populate later.
        # "risk_note": "",
        # "confidence": "low",
        # "evidence_grade": "low",
        # "notes": "",
    }

def ensure_list(x: Any) -> List[Any]:
    return x if isinstance(x, list) else []

def main() -> None:
    if not PLAN.exists():
        raise SystemExit(f"PLAN_MISSING: {PLAN}")

    title_by_slug = load_class_titles()

    rows: List[Tuple[str, str]] = []
    for r in csv.reader(PLAN.read_text(encoding="utf-8").splitlines()):
        if not r:
            continue
        if r[0].strip().startswith("#"):
            continue
        if len(r) != 2:
            raise SystemExit(f"BAD_PLAN_ROW: {r}")
        peptide_slug = r[0].strip()
        class_slug = r[1].strip()
        if peptide_slug and class_slug:
            rows.append((peptide_slug, class_slug))

    changed = 0
    missing_files = 0
    already = 0

    for peptide_slug, class_slug in rows:
        fp = PEPTIDES_DIR / f"{peptide_slug}.json"
        if not fp.exists():
            missing_files += 1
            continue

        doc = read_json(fp)
        if not isinstance(doc, dict):
            continue

        interactions = doc.get("interactions")
        if not isinstance(interactions, dict):
            interactions = {}
            doc["interactions"] = interactions

        drug_classes = ensure_list(interactions.get("drug_classes"))
        # De-dupe by interaction_slug/slug
        want = class_slug.strip()
        have = set()
        for it in drug_classes:
            if isinstance(it, dict):
                s = str(it.get("interaction_slug") or it.get("slug") or "").strip()
                if s:
                    have.add(s)

        if want in have:
            already += 1
            interactions["drug_classes"] = drug_classes
            continue

        drug_classes.append(normalize_entry(want, title_by_slug))
        interactions["drug_classes"] = drug_classes
        write_json(fp, doc)
        changed += 1

    print("OK")
    print(json.dumps({
        "plan_rows": len(rows),
        "changed_files": changed,
        "already_had_tag": already,
        "missing_peptide_files": missing_files,
    }, indent=2))

if __name__ == "__main__":
    main()
