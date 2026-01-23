#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import re

repo = Path(__file__).resolve().parents[2]
target = repo / "scripts" / "reports" / "report_interactions_coverage_v1.py"
if not target.exists():
    raise SystemExit(f"ERROR: missing {target}")

s = target.read_text("utf-8")

marker = "PEP_TALK__COUNT_INTERACTIONS_PRESENT_V6"
if marker in s:
    print("OK: already patched")
    raise SystemExit(0)

lines = s.splitlines()

# Find where any_present is computed (first assignment)
any_idx = None
for i, line in enumerate(lines):
    if re.search(r"\bany_present\s*=", line):
        any_idx = i
        break
if any_idx is None:
    raise SystemExit("ERROR: could not locate any_present assignment")

indent = re.match(r"^\s*", lines[any_idx]).group(0)

# Remove the existing any_present computation block until we hit the totals updates.
end = any_idx + 1
while end < len(lines):
    l = lines[end]
    if 'totals["peptides_total"]' in l or 'totals["peptides_with_any_interactions"]' in l:
        break
    # stop early if we hit blank line (common in older versions)
    if l.strip() == "":
        break
    end += 1

replacement = [
    f"{indent}# {marker}",
    f"{indent}# Interactions are considered 'present' if the top-level `interactions` dict exists.",
    f"{indent}intr = doc.get('interactions', None)",
    f"{indent}any_present = isinstance(intr, dict)",
    "",
]

lines = lines[:any_idx] + replacement + lines[end:]
target.write_text("\n".join(lines) + "\n", encoding="utf-8")
print("OK: patched", target)
