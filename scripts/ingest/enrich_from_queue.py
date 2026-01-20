#!/usr/bin/env python3
from __future__ import annotations

import csv
import json
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
QUEUE = ROOT / "content" / "peptides" / "_queue.csv"
PEPTIDES_DIR = ROOT / "content" / "peptides"

# Only these fields are propagated from queue -> peptide JSON.
# We keep this deliberately narrow to avoid drifting into medical claims.
QUEUE_FIELDS = [
    "canonical_name",
    "slug",
    "status_category",
    "needs_prescription",
    "priority",
    "notes",
    "aliases",
    "primary_topics",
    "adolescent_flag",
    "developmental_systems",
]

def die(msg: str, code: int = 1) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    raise SystemExit(code)

def load_json(p: Path) -> dict[str, Any]:
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        die(f"Failed to parse JSON: {p} ({e})")
    return {}

def dump_json(p: Path, data: dict[str, Any]) -> None:
    p.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def parse_bool(s: str) -> bool | None:
    v = (s or "").strip().lower()
    if v == "":
        return None
    if v in ("true", "t", "yes", "y", "1"):
        return True
    if v in ("false", "f", "no", "n", "0"):
        return False
    die(f"Invalid boolean: {s!r}")
    return None

def parse_list_pipe(s: str) -> list[str]:
    v = (s or "").strip()
    if not v:
        return []
    parts = [x.strip() for x in v.split("|")]
    return [x for x in parts if x]

def ensure_dict(parent: dict[str, Any], key: str) -> dict[str, Any]:
    obj = parent.get(key)
    if obj is None:
        obj = {}
        parent[key] = obj
    if not isinstance(obj, dict):
        die(f"Expected object at key '{key}'")
    return obj

def ensure_list(parent: dict[str, Any], key: str) -> list[Any]:
    obj = parent.get(key)
    if obj is None:
        obj = []
        parent[key] = obj
    if not isinstance(obj, list):
        die(f"Expected list at key '{key}'")
    return obj

def main() -> int:
    if not QUEUE.exists():
        die(f"Missing queue file: {QUEUE}")

    with QUEUE.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        missing = [c for c in QUEUE_FIELDS if c not in (reader.fieldnames or [])]
        if missing:
            die(f"Queue missing columns: {missing}")
        rows = list(reader)

    updated = 0
    skipped = 0
    warnings: list[str] = []

    for r in rows:
        slug = (r.get("slug") or "").strip()
        if not slug:
            continue

        json_path = PEPTIDES_DIR / f"{slug}.json"
        if not json_path.exists():
            warnings.append(f"Missing peptide JSON for slug '{slug}'")
            continue

        data = load_json(json_path)
        pep = data.get("peptide")
        if not isinstance(pep, dict):
            warnings.append(f"Invalid peptide object in {json_path}")
            continue

        changed = False

        # canonical_name (optional)
        cname = (r.get("canonical_name") or "").strip()
        if cname:
            if pep.get("canonical_name") != cname:
                pep["canonical_name"] = cname
                changed = True

        # status.category (optional)
        status_cat = (r.get("status_category") or "").strip()
        if status_cat:
            status = ensure_dict(pep, "status")
            if status.get("category") != status_cat:
                status["category"] = status_cat
                changed = True

        # needs_prescription (optional boolean)
        np = parse_bool(r.get("needs_prescription") or "")
        if np is not None and pep.get("needs_prescription") != np:
            pep["needs_prescription"] = np
            changed = True

        # meta fields (optional)
        meta = ensure_dict(pep, "meta")

        priority = (r.get("priority") or "").strip()
        if priority and meta.get("priority") != priority:
            meta["priority"] = priority
            changed = True

        notes = (r.get("notes") or "").strip()
        if notes and meta.get("notes_seed") != notes:
            meta["notes_seed"] = notes
            changed = True

        adolescent_flag = (r.get("adolescent_flag") or "").strip()
        if adolescent_flag and meta.get("adolescent_flag") != adolescent_flag:
            meta["adolescent_flag"] = adolescent_flag
            changed = True

        dev_systems = parse_list_pipe(r.get("developmental_systems") or "")
        if dev_systems:
            if meta.get("developmental_systems") != dev_systems:
                meta["developmental_systems"] = dev_systems
                changed = True

        # aliases (optional) -> peptide.aliases
        aliases = parse_list_pipe(r.get("aliases") or "")
        if aliases:
            if pep.get("aliases") != aliases:
                pep["aliases"] = aliases
                changed = True

        # topics.primary (optional) -> peptide.topics.primary
        topics = parse_list_pipe(r.get("primary_topics") or "")
        if topics:
            topics_obj = ensure_dict(pep, "topics")
            primary = topics_obj.get("primary")
            if not isinstance(primary, list):
                topics_obj["primary"] = []
                primary = topics_obj["primary"]
            if primary != topics:
                topics_obj["primary"] = topics
                changed = True

        if changed:
            data["peptide"] = pep
            dump_json(json_path, data)
            updated += 1
        else:
            skipped += 1

    print(f"ENRICH FROM QUEUE OK: updated={updated} skipped={skipped} warnings={len(warnings)}")
    if warnings:
        for w in warnings:
            print(f"WARNING: {w}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
