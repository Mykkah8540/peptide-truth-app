#!/usr/bin/env python3
import json
from pathlib import Path
import sys
import re

ROOT = Path(__file__).resolve().parents[2]
TAX_FP  = ROOT / "content" / "_taxonomy" / "interaction_classes_v1.json"
IDX_FP  = ROOT / "content" / "_index" / "interactions_v1.json"

SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")

def die(msg: str):
    print("VALIDATION FAILED:", msg)
    sys.exit(1)

def load(fp: Path):
    try:
        return json.loads(fp.read_text(encoding="utf-8"))
    except Exception as e:
        die(f"Could not read/parse {fp}: {e}")

def validate_taxonomy(doc):
    if doc.get("schema_version") != "interaction_classes_v1":
        die("interaction_classes_v1.json schema_version must be 'interaction_classes_v1'")

    for section in ["drug_classes", "supplement_classes"]:
        arr = doc.get(section)
        if not isinstance(arr, list) or not arr:
            die(f"{section} must be a non-empty list")

        seen = set()
        for i, it in enumerate(arr):
            if not isinstance(it, dict):
                die(f"{section}[{i}] must be an object")
            slug = it.get("slug")
            title = it.get("title")
            if not isinstance(slug, str) or not SLUG_RE.match(slug):
                die(f"{section}[{i}].slug invalid: {slug!r}")
            if slug in seen:
                die(f"Duplicate slug in {section}: {slug}")
            seen.add(slug)
            if not isinstance(title, str) or not title.strip():
                die(f"{section}[{i}].title required")
            aka = it.get("aka", [])
            if aka is not None and not isinstance(aka, list):
                die(f"{section}[{i}].aka must be a list (or omitted)")

def validate_index(doc):
    if doc.get("schema_version") != "interactions_index_v1":
        die("interactions_v1.json schema_version must be 'interactions_index_v1'")
    for key in ["by_drug_class_name", "by_supplement_class_name", "by_peptide_name"]:
        m = doc.get(key)
        if not isinstance(m, dict):
            die(f"{key} must be an object")
        # values must be list[str]
        for name, slugs in m.items():
            if not isinstance(name, str) or not name.strip():
                die(f"{key} contains empty name key")
            if not isinstance(slugs, list):
                die(f"{key}[{name!r}] must be a list")
            for s in slugs:
                if not isinstance(s, str) or not s.strip():
                    die(f"{key}[{name!r}] contains non-string slug")

def main():
    if not TAX_FP.exists():
        die(f"Missing taxonomy file: {TAX_FP}")
    if not IDX_FP.exists():
        die(f"Missing index file: {IDX_FP}")

    tax = load(TAX_FP)
    idx = load(IDX_FP)

    validate_taxonomy(tax)
    validate_index(idx)

    print("INTERACTION CLASSES + INDEX VALIDATION PASSED")
    print(f"Taxonomy: {TAX_FP.relative_to(ROOT)}")
    print(f"Index:    {IDX_FP.relative_to(ROOT)}")

if __name__ == "__main__":
    main()
