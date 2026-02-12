#!/usr/bin/env python3
from __future__ import annotations

import sys
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PARKING = ROOT / "docs/_status/parking_lot.md"
TASK_LOG = ROOT / "docs/_status/task_log.md"

def die(msg: str) -> None:
    print(f"FAIL: {msg}")
    raise SystemExit(1)

def read_lines(p: Path) -> list[str]:
    if not p.exists():
        die(f"Missing file: {p.relative_to(ROOT)}")
    return p.read_text(encoding="utf-8").splitlines()

def write_lines(p: Path, lines: list[str]) -> None:
    p.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")

def ensure_header(lines: list[str]) -> list[str]:
    if lines and lines[0].strip().startswith("#"):
        return lines
    return ["# Parking Lot", "", *lines]

def cmd_add(text: str) -> None:
    if not text.strip():
        die("parking:add requires non-empty text")
    lines = ensure_header(read_lines(PARKING))
    stamp = datetime.now().strftime("%Y-%m-%d")
    item = f"- {text.strip()} (added {stamp})"
    lines.append(item)
    write_lines(PARKING, lines)
    print("OK: added to parking_lot")
    print(item)

def cmd_done(match: str) -> None:
    if not match.strip():
        die("parking:done requires match text (substring)")
    lines = read_lines(PARKING)
    before = lines[:]
    out = []
    removed = []
    for ln in lines:
        if ln.strip().startswith("- ") and match.lower() in ln.lower():
            removed.append(ln)
            continue
        out.append(ln)
    if not removed:
        die(fNo
