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

def load(fp: Path) -> Dict[str, Any]:
    return json.loads(fp.read_text())

def save(fp: Path, obj: Dict[str, Any]) -> None:
    fp.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n")

def strip_in_blocks(blocks: Any) -> int:
    if not isinstance(blocks, list):
        return 0
    changed = 0
    for b in blocks:
        if not isinstance(b, dict):
            continue
        for k in ["text"]:
            v = b.get(k)
            if isinstance(v, str) and v.strip().startswith("• "):
                b[k] = v.strip()[2:].strip()
                changed += 1
    return changed

def main() -> int:
    touched_files = 0
    total_changes = 0
    for slug in BATCH:
        fp = PEPTIDES_DIR / f"{slug}.json"
        if not fp.exists():
            continue
        obj = load(fp)
        sec = ((obj.get("peptide") or {}).get("sections") or {})
        before = total_changes
        total_changes += strip_in_blocks(sec.get("use_cases"))
        total_changes += strip_in_blocks(sec.get("interaction_summary"))
        if total_changes != before:
            save(fp, obj)
            touched_files += 1
    print(f"Batch17 bullet-glyph strip complete. Files changed: {touched_files}, edits: {total_changes}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
