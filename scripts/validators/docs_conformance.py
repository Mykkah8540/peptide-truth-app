#!/usr/bin/env python3
from __future__ import annotations
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

REQUIRED = [
    "docs/README_FEEDER.md",
    "docs/README_EXECUTION.md",
    "docs/ui/Master_UI_and_Content_Polish.md",
    "docs/ui/PDP_Contextual_Considerations.md",
    "docs/ui/PDP_Delete_List.md",
    "docs/ui/PDP_Rebuild_Checklist.md",
    "docs/_status/current_state.md",
    "docs/_status/parking_lot.md",
    "docs/_status/build_best_practices.md",
    "docs/_status/README_CONTINUITY.md",
    "docs/_status/roadmap.md",
    "docs/_status/next_task.md",
    "docs/_status/task_log.md",
    "docs/_status/TASK_TEMPLATE.md",
    "docs/05-app-spec/routes_and_nav_contract.md",
]

NO_DIVIDER_DOCS = [
    "docs/README_FEEDER.md",
    "docs/README_EXECUTION.md",
    "docs/_status/build_best_practices.md",
    "docs/_status/README_CONTINUITY.md",
    "docs/_status/next_task.md",
    "docs/_status/roadmap.md",
    "docs/ui/Master_UI_and_Content_Polish.md",
    "docs/ui/PDP_Contextual_Considerations.md",
]

DIVIDER_RE = re.compile(r"^\s*---\s*$", re.M)

def fail(msg: str) -> None:
    print(f"FAIL: {msg}")
    sys.exit(1)

def read_text(rel: str) -> str:
    p = ROOT / rel
    return p.read_text(encoding="utf-8")

def main() -> None:
    missing = [p for p in REQUIRED if not (ROOT / p).exists()]
    if missing:
        fail("Missing required files:\n" + "\n".join(f"- {m}" for m in missing))

    divider_hits = []
    for rel in NO_DIVIDER_DOCS:
        txt = read_text(rel)
        for m in DIVIDER_RE.finditer(txt):
            line_no = txt[:m.start()].count("\n") + 1
            divider_hits.append(f"{rel}:{line_no}")
    if divider_hits:
        fail("Divider lines found in no-divider docs:\n" + "\n".join(f"- {h}" for h in divider_hits))

    feeder = read_text("docs/README_FEEDER.md")
    paths = sorted(set(re.findall(r"\bdocs/[A-Za-z0-9_\-./]+\.md\b", feeder)))
    missing_refs = [p for p in paths if not (ROOT / p).exists()]
    if missing_refs:
        fail("docs/README_FEEDER.md references missing files:\n" + "\n".join(f"- {m}" for m in missing_refs))

    print("OK: docs conformance passed")

if __name__ == "__main__":
    main()
