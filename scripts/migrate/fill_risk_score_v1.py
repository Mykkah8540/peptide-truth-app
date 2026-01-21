#!/usr/bin/env python3
"""
Migration v1: Fill peptide.risk.risk_score from peptide.risk.current_score.

Rules:
- If risk_score already exists as int 1..10 -> leave it
- Else if current_score is int 1..10 -> copy to risk_score
- Else -> error (we don't invent numbers in v1)

Idempotent and deterministic.
"""

from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"


def die(msg: str, code: int = 1) -> None:
    raise SystemExit(f"ERROR: {msg}")


def load_json(p: Path) -> dict:
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        die(f"Failed to parse JSON: {p} ({e})")


def main() -> int:
    changed = 0
    skipped = 0
    errors = 0

    for p in sorted(PEPTIDES_DIR.glob("*.json")):
        if p.name.startswith("_"):
            continue

        d = load_json(p)
        pep = d.get("peptide")
        if not isinstance(pep, dict):
            print(f"ERROR: {p}: missing peptide object")
            errors += 1
            continue

        r = pep.get("risk")
        if not isinstance(r, dict):
            print(f"ERROR: {p}: missing peptide.risk object")
            errors += 1
            continue

        rs = r.get("risk_score")
        if isinstance(rs, int) and 1 <= rs <= 10:
            skipped += 1
            continue

        cs = r.get("current_score")
        if not (isinstance(cs, int) and 1 <= cs <= 10):
            print(f"ERROR: {p}: current_score invalid ({cs}) and risk_score missing")
            errors += 1
            continue

        r["risk_score"] = int(cs)
        pep["risk"] = r
        d["peptide"] = pep
        p.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        changed += 1

    print(f"OK: fill_risk_score_v1 complete. changed={changed} skipped={skipped} errors={errors}")
    if errors:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
