#!/usr/bin/env python3
"""
One-command rebuild for Peptide Truth content indexes + validation gates.

Order matters:
1) Rebuild peptide search index (source: peptide JSON)
2) Validate peptide taxonomy keys usage (governance + peptide JSON)
3) Validate blend JSON files
4) Validate blends registry ↔ stubs consistency
5) Build unified entities index (peptides + blends)
6) Validate unified entities index

This script is deterministic and should be safe to run repeatedly.
"""

from __future__ import annotations
import subprocess
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]


def run(cmd: list[str]) -> None:
    print("\n$", " ".join(cmd))
    subprocess.check_call(cmd, cwd=str(ROOT))


def main() -> int:
    # 1) Rebuild peptide search index (do not apply queue; just rebuild index)
    # If your generate_from_queue.py supports --rebuild-search-index without queue changes,
    # it's the canonical hook. It currently rebuilds the index even when queue is empty.
    run(["python3", "scripts/ingest/generate_from_queue.py", "--apply", "--rebuild-search-index"])

    # 2) Taxonomy validation (peptides + blends + governance)
    run(["python3", "scripts/validate/validate_taxonomy_keys.py"])

    # 3) Validate blend JSON stubs
    # Validate every blend json file (excluding _index.json + README)
    blends_dir = ROOT / "content" / "blends"
    for p in sorted(blends_dir.glob("*.json")):
        if p.name.startswith("_"):
            continue
        run(["python3", "scripts/validate/validate_blend_json.py", str(p)])

    # 4) Validate blends registry consistency
    run(["python3", "scripts/validate/validate_blends_registry_consistency.py"])

    # 5) Build unified entities index
    run(["python3", "scripts/index/build_entities_index.py"])

    # 6) Validate unified entities index
    run(["python3", "scripts/validate/validate_entities_index.py"])

    print("\nOK: rebuild_all_indexes completed successfully.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
