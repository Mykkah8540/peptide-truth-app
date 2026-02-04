#!/usr/bin/env python3
import json
from pathlib import Path
from typing import Any, Dict, List

BATCH = [
  "sermorelin","bradykinin","dsip","ara-290","mots-c","oxytocin","aod-9604","shlp-2",
  "cjc-1295","humanin","retatrutide","semaglutide","tirzepatide","atrial-natriuretic-peptide",
  "ghk-cu","substance-p",
]

REPO = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = REPO / "content" / "peptides"

def load_json(fp: Path) -> Dict[str, Any]:
    return json.loads(fp.read_text())

def save_json(fp: Path, obj: Dict[str, Any]) -> None:
    fp.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n")

def ensure_sections(obj: Dict[str, Any]) -> Dict[str, Any]:
    pep = obj.get("peptide")
    if not isinstance(pep, dict):
        pep = {}
        obj["peptide"] = pep
    sec = pep.get("sections")
    if not isinstance(sec, dict):
        sec = {}
        pep["sections"] = sec
    return sec

def first_block(blocks: Any) -> Dict[str, Any] | None:
    if isinstance(blocks, list) and blocks and isinstance(blocks[0], dict):
        return blocks[0]
    return None

def add_title_if_missing(blocks: Any, title: str) -> bool:
    b = first_block(blocks)
    if not b:
        return False
    # If schema uses "title" in other sections (it does), keep it consistent.
    if "title" in b and str(b.get("title") or "").strip():
        return False
    # Only apply if it's a text block (avoid weird shapes)
    if "text" not in b:
        return False
    b["title"] = title
    return True

def main() -> int:
    changed_files = 0
    for slug in BATCH:
        fp = PEPTIDES_DIR / f"{slug}.json"
        if not fp.exists():
            continue
        obj = load_json(fp)
        sec = ensure_sections(obj)

        changed = False
        if add_title_if_missing(sec.get("use_cases"), "Use cases (real-world)"):
            changed = True
        if add_title_if_missing(sec.get("interaction_summary"), "Interaction summary"):
            changed = True

        if changed:
            save_json(fp, obj)
            changed_files += 1

    print(f"Updated first-block titles for batch 17. Files changed: {changed_files}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
