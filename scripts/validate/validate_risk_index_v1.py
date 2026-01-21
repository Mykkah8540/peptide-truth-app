#!/usr/bin/env python3
"""
Validate content/_index/risk_index_v1.json

Guarantees:
- version == v1
- every entity has route/kind/slug
- risk_score is int 1..10
- safety_links entries are safety_ids present in content/safety/_safety_index.json (if file exists)
"""

from __future__ import annotations
import json
import sys
from pathlib import Path


def die(msg: str, code: int = 1) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    raise SystemExit(code)


def load_json(p: Path):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        die(f"Failed to parse JSON: {p} ({e})")


def main() -> int:
    root = Path(".").resolve()
    risk_path = root / "content" / "_index" / "risk_index_v1.json"
    safety_path = root / "content" / "safety" / "_safety_index.json"

    if not risk_path.exists():
        die(f"Missing: {risk_path} (run scripts/index/build_risk_index.py)")

    data = load_json(risk_path)
    if data.get("version") != "v1":
        die("risk_index_v1.json must have version == 'v1'")

    ents = data.get("entities")
    if not isinstance(ents, list) or not ents:
        die("risk_index_v1.json must contain non-empty entities[]")

    allowed = None
    if safety_path.exists():
        s = load_json(safety_path)
        pages = s.get("pages", [])
        allowed = set()
        if isinstance(pages, list):
            for p in pages:
                if isinstance(p, dict) and isinstance(p.get("safety_id"), str):
                    allowed.add(p["safety_id"])

    for i, e in enumerate(ents):
        if not isinstance(e, dict):
            die(f"entities[{i}] must be object")
        for k in ("route", "kind", "slug", "risk"):
            if k not in e:
                die(f"entities[{i}] missing '{k}'")

        r = e.get("risk")
        if not isinstance(r, dict):
            die(f"entities[{i}].risk must be object")
        score = r.get("risk_score")
        if not isinstance(score, int) or not (1 <= score <= 10):
            die(f"entities[{i}] risk_score must be int 1..10 (got {score})")

        links = e.get("safety_links", [])
        if links is None:
            links = []
        if not isinstance(links, list):
            die(f"entities[{i}].safety_links must be list")
        if allowed is not None:
            for sid in links:
                if sid not in allowed:
                    die(f"entities[{i}] unknown safety_id in safety_links: {sid}")

    print("RISK INDEX VALIDATION PASSED")
    print(f"Entities: {len(ents)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
