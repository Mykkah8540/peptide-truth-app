#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"
TAX_FP = ROOT / "content" / "_taxonomy" / "interaction_classes_v1.json"

def die(msg: str) -> None:
    raise SystemExit(msg)

def load_json(fp: Path) -> Any:
    return json.loads(fp.read_text(encoding="utf-8"))

def dump_json(fp: Path, obj: Any) -> None:
    fp.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def ensure_list_unique(xs: list[str]) -> list[str]:
    seen = set()
    out = []
    for x in xs:
        x = x.strip()
        if not x:
            continue
        if x in seen:
            continue
        seen.add(x)
        out.append(x)
    return out

def main() -> None:
    ap = argparse.ArgumentParser(description="Add an interactions.drug_classes slug to selected peptide JSON files.")
    ap.add_argument("--class", dest="clazz", required=True, help="Drug class slug (must exist in interaction_classes_v1.json drug_classes).")
    ap.add_argument("--targets", required=True, help="Path to JSON object map of {slug: true} (or array of slugs).")
    ap.add_argument("--apply", action="store_true", help="Write changes. Without this flag, runs dry-run.")
    args = ap.parse_args()

    tax = load_json(TAX_FP)
    drug_classes = tax.get("drug_classes") or []
    allowed = set()
    for item in drug_classes:
        if isinstance(item, str):
            allowed.add(item)
        elif isinstance(item, dict) and isinstance(item.get("slug"), str):
            allowed.add(item["slug"])
    if args.clazz not in allowed:
        die(f"Unknown drug class '{args.clazz}'. Add it to {TAX_FP} under drug_classes first.")

    targets_fp = Path(args.targets)
    targets_doc = load_json(targets_fp)

    if isinstance(targets_doc, dict):
        slugs = [k for k, v in targets_doc.items() if bool(v)]
    elif isinstance(targets_doc, list):
        slugs = [str(x) for x in targets_doc]
    else:
        die("--targets must be a JSON object map or list")

    if not slugs:
        die("No targets provided (empty targets list).")

    changed = 0
    skipped = 0
    missing = 0

    for slug in slugs:
        fp = PEPTIDES_DIR / f"{slug}.json"
        if not fp.exists():
            print(f"MISS: {slug} (no file {fp})")
            missing += 1
            continue

        data = load_json(fp)
        interactions = data.get("interactions")
        if interactions is None:
            interactions = {}
            data["interactions"] = interactions
        if not isinstance(interactions, dict):
            die(f"{slug}: interactions must be an object")

        drug_classes = interactions.get("drug_classes")
        if drug_classes is None:
            drug_classes = []
            interactions["drug_classes"] = drug_classes
        if not isinstance(drug_classes, list):
            die(f"{slug}: interactions.drug_classes must be a list")

        before = list(map(str, drug_classes))
        after = ensure_list_unique(before + [args.clazz])

        if before == after:
            print(f"SKIP: {slug} (already has '{args.clazz}')")
            skipped += 1
            continue

        interactions["drug_classes"] = after

        if args.apply:
            dump_json(fp, data)
            print(f"APPLY: {slug} (added '{args.clazz}')")
        else:
            print(f"DRY:   {slug} (would add '{args.clazz}')")

        changed += 1

    print(f"\nSUMMARY: changed={changed} skipped={skipped} missing={missing} apply={args.apply}")

if __name__ == "__main__":
    main()
