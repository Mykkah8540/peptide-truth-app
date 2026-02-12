#!/usr/bin/env python3
from __future__ import annotations

import subprocess
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[2]

FILES = [
    ("Feeder (behavioral contract)", "docs/README_FEEDER.md"),
    ("Execution rules", "docs/README_EXECUTION.md"),
    ("UI spec: Master polish", "docs/ui/Master_UI_and_Content_Polish.md"),
    ("UI spec: PDP contextual considerations", "docs/ui/PDP_Contextual_Considerations.md"),
    ("Status: current_state", "docs/_status/current_state.md"),
    ("Status: next_task", "docs/_status/next_task.md"),
    ("Status: parking_lot", "docs/_status/parking_lot.md"),
]

def sh(cmd: list[str]) -> str:
    r = subprocess.run(cmd, cwd=str(ROOT), capture_output=True, text=True)
    return (r.stdout or "").rstrip()

def read(rel: str) -> str:
    p = ROOT / rel
    if not p.exists():
        return f"[MISSING FILE] {rel}"
    return p.read_text(encoding="utf-8").rstrip()

def main() -> None:
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    branch = sh(["git", "branch", "--show-current"])
    head = sh(["git", "--no-pager", "log", "-1", "--oneline"])
    last3 = sh(["git", "--no-pager", "log", "-3", "--oneline"])
    status = sh(["git", "status", "--short"])

    print("# NEW CHAT BOOTSTRAP PROMPT (AUTO-GENERATED)")
    print()
    print("You are continuing work on the Pep Talk / Peptide-Truth repo.")
    print("Follow repo governance. No drift. No chaos. Deterministic steps only.")
    print()
    print("Meta")
    print(f"- Generated: {ts}")
    print(f"- Branch: {branch}")
    print(f"- HEAD: {head}")
    print()
    print("Last 3 commits")
    print(last3 if last3 else "(none)")
    print()
    print("Working tree")
    print(status if status else "(clean)")
    print()
    print("Non-negotiable operating rules")
    print("- Read the hydration docs below in order before proposing changes.")
    print("- No changes unless they align with docs authority hierarchy.")
    print("- Provide bashable steps. Assume Micah will paste commands into terminal.")
    print("- Stop if build breaks, git becomes dirty unexpectedly, or scope drifts.")
    print()
    print("Hydration order (must ingest in this order)")
    for title, rel in FILES:
        print(f"- {rel}")
    print()
    print("Content to ingest now (verbatim sections)")
    for title, rel in FILES:
        print()
        print(f"## {title} ({rel})")
        print(read(rel))

    print()
    print("What you must do next")
    print("- Restate: what is disallowed; what is the active next task; what is deferred (parking lot).")
    print("- Then propose a single scoped plan with explicit stop point + verification gates.")
    print("- Only after that: provide the next commands.")

if __name__ == "__main__":
    main()
