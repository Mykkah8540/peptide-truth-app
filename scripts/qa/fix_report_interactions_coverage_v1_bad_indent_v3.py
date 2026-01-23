#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import re

repo = Path(__file__).resolve().parents[2]
target = repo / "scripts" / "reports" / "report_interactions_coverage_v1.py"
if not target.exists():
    raise SystemExit(f"ERROR: missing {target}")

s = target.read_text(encoding="utf-8").splitlines()

# 1) Remove the bad block we injected (marker + its try/except/pass block)
marker = "PEP_TALK__FORCE_OVERRIDE_COUNTS_V3"
out: list[str] = []
i = 0
while i < len(s):
    line = s[i]
    if marker in line:
        # skip marker line + up to next blank line after the block
        i += 1
        # eat a small known-ish block (try/except/pass plus optional blank)
        while i < len(s):
            if s[i].strip() == "":
                i += 1
                break
            i += 1
        continue
    out.append(line)
    i += 1

s = out

# 2) Find anchor print line and its indentation
anchor_idx = None
anchor_indent = ""
for i, line in enumerate(s):
    if 'print("Missing interactions:"' in line or "print('Missing interactions:'" in line:
        anchor_idx = i
        anchor_indent = re.match(r"^\s*", line).group(0)
        break

if anchor_idx is None:
    raise SystemExit('ERROR: could not find anchor print("Missing interactions:", ...)')

# 3) Insert properly-indented override block immediately BEFORE anchor
marker2 = "PEP_TALK__FORCE_OVERRIDE_COUNTS_V4"
if any(marker2 in line for line in s):
    print("OK: V4 already present; nothing to do")
    raise SystemExit(0)

inject = [
    f"{anchor_indent}# {marker2}",
    f"{anchor_indent}try:",
    f"{anchor_indent}    totals['peptides_with_any_interactions'] = _compute_peptides_with_any_interactions(repo_root)",
    f"{anchor_indent}except Exception:",
    f"{anchor_indent}    pass",
    f"{anchor_indent}",
]

s = s[:anchor_idx] + inject + s[anchor_idx:]
target.write_text("\n".join(s) + "\n", encoding="utf-8")
print("OK: fixed indentation + injected V4 override:", target)
