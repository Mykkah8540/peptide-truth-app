#!/usr/bin/env python3
from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any, Dict, List, Set, Tuple


REPO_ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = REPO_ROOT / "content" / "peptides"
TAXON_PATH = REPO_ROOT / "content" / "_taxonomy" / "interaction_classes_v1.json"


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def slug_set_from_taxonomy(tax: Dict[str, Any]) -> Tuple[Set[str], Set[str]]:
    drug: Set[str] = set()
    supp: Set[str] = set()

    for item in (tax.get("drug_classes") or []):
        if isinstance(item, dict) and isinstance(item.get("slug"), str):
            drug.add(item["slug"])

    for item in (tax.get("supplement_classes") or []):
        if isinstance(item, dict) and isinstance(item.get("slug"), str):
            supp.add(item["slug"])

    return drug, supp


def extract_interaction_lists(doc: Dict[str, Any]) -> Tuple[List[Any], List[Any], List[Any]]:
    node = doc.get("peptide") if isinstance(doc.get("peptide"), dict) else doc
    inter = node.get("interactions") if isinstance(node.get("interactions"), dict) else {}

    drug = inter.get("drug_classes") or []
    supp = inter.get("supplement_classes") or []
    peps = inter.get("peptides") or []

    return drug, supp, peps


def as_slug_list(v: Any) -> Tuple[List[str], List[str]]:
    slugs: List[str] = []
    errors: List[str] = []

    if not isinstance(v, list):
        return [], ["not-a-list"]

    for i, item in enumerate(v):
        if isinstance(item, str):
            slugs.append(item)
        elif isinstance(item, dict) and isinstance(item.get("slug"), str):
            slugs.append(item["slug"])
        else:
            errors.append(f"bad-item[{i}]:{type(item).__name__}")
    return slugs, errors


def main() -> int:
    if not TAXON_PATH.exists():
        print(f"ERROR: missing taxonomy: {TAXON_PATH}", file=sys.stderr)
        return 2

    tax = load_json(TAXON_PATH)
    drug_ok, supp_ok = slug_set_from_taxonomy(tax)

    peptide_files = sorted([p for p in PEPTIDES_DIR.glob("*.json") if p.name not in ("_index.json", "_search_index.json")])
    if not peptide_files:
        print(f"ERROR: no peptide files found in {PEPTIDES_DIR}", file=sys.stderr)
        return 2

    errors: List[str] = []
    checked = 0
    touched = 0

    for fp in peptide_files:
        doc = load_json(fp)
        drug_raw, supp_raw, peps_raw = extract_interaction_lists(doc)

        any_present = bool(drug_raw or supp_raw or peps_raw)
        checked += 1
        if not any_present:
            continue

        touched += 1

        drug_slugs, drug_parse_errs = as_slug_list(drug_raw)
        supp_slugs, supp_parse_errs = as_slug_list(supp_raw)

        if drug_parse_errs:
            errors.append(f"{fp.name}: interactions.drug_classes parse errors: {drug_parse_errs}")
        if supp_parse_errs:
            errors.append(f"{fp.name}: interactions.supplement_classes parse errors: {supp_parse_errs}")

        for s in drug_slugs:
            if s not in drug_ok:
                errors.append(f"{fp.name}: unknown drug_class slug '{s}' (not in taxonomy)")
        for s in supp_slugs:
            if s not in supp_ok:
                errors.append(f"{fp.name}: unknown supplement_class slug '{s}' (not in taxonomy)")

        # NOTE: peptide-peptide interactions are intentionally not validated here (would require peptide slug set + rules)

    if errors:
        print("PEPTIDE INTERACTIONS VALIDATION FAILED")
        for e in errors[:200]:
            print(" -", e)
        if len(errors) > 200:
            print(f" ... and {len(errors) - 200} more")
        return 1

    print("PEPTIDE INTERACTIONS VALIDATION PASSED")
    print(f"Peptides checked: {checked}  With interactions present: {touched}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
