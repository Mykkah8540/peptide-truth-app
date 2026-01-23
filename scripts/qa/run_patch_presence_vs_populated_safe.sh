#!/usr/bin/env bash
# NEVER exits non-zero; logs everything; avoids terminal death.
set -u

LOG="/tmp/peptalk_patch_presence_vs_populated.log"
: > "$LOG"

say() { echo "$*" | tee -a "$LOG"; }

step() {
  local name="$1"; shift
  say ""
  say "=== STEP: $name ==="
  say "+ $*"
  ( "$@" ) >> "$LOG" 2>&1
  say "STEP_EXIT_CODE=$?"
  return 0
}

say "=== RUN_PATCH_PRESENCE_VS_POPULATED_SAFE ==="
say "DATE_UTC: $(python3 - <<'PY'
from datetime import datetime, timezone
print(datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"))
PY
)"
say "PWD: $(pwd)"
say "HEAD: $(git rev-parse --short HEAD 2>/dev/null || true)"
say "BRANCH: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || true)"

# 1) Apply patch (pure file edit; fast)
step "patch_report_script" python3 - <<'PY'
from pathlib import Path
import re

p = Path("scripts/reports/report_interactions_coverage_v1.py")
s = p.read_text("utf-8")

marker = "PEP_TALK__PRESENCE_VS_POPULATED_V1"
if marker in s:
    print("OK: patch already applied")
    raise SystemExit(0)

if "def _compute_peptides_with_any_interactions" not in s:
    raise SystemExit("ERROR: expected helper _compute_peptides_with_any_interactions to exist")

# Ensure imports include json and Path (they should already, but be safe)
# If the file uses json already, skip.
if "import json" not in s:
    s = re.sub(r"(^from __future__ import annotations\s*\n)", r"\1\nimport json\n", s, flags=re.M) or s

# Insert populated helper right after existing presence helper's `return count`
anchor = re.search(r"(?s)(def _compute_peptides_with_any_interactions\(repo_root: Path\).*?^\s*return\s+count\s*\n)", s, re.M)
if not anchor:
    raise SystemExit("ERROR: could not locate end of _compute_peptides_with_any_interactions helper")

helper = f"""
# {marker}
def _compute_peptides_with_interactions_populated(repo_root: Path) -> int:
    \"\"\"Counts peptides where interactions exist AND at least one interaction item is present.\"\"\"
    peptides_dir = repo_root / "content" / "peptides"
    if not peptides_dir.exists():
        return 0

    count = 0
    for fp in sorted(peptides_dir.glob("*.json")):
        try:
            doc = json.loads(fp.read_text(encoding="utf-8"))
        except Exception:
            continue

        inter = doc.get("interactions")
        if not isinstance(inter, dict):
            continue

        drug = inter.get("drug_classes") or []
        supp = inter.get("supplement_classes") or []
        pep = inter.get("peptides") or []

        if (isinstance(drug, list) and len(drug) > 0) or (isinstance(supp, list) and len(supp) > 0) or (isinstance(pep, list) and len(pep) > 0):
            count += 1

    return count
"""

insert_at = anchor.end()
s = s[:insert_at] + "\n" + helper + s[insert_at:]

# Insert override block before the first "Missing interactions" print
lines = s.splitlines()

anchor_idx = None
for i, line in enumerate(lines):
    if 'print("Missing interactions:"' in line or "print('Missing interactions:'" in line:
        anchor_idx = i
        break
if anchor_idx is None:
    raise SystemExit('ERROR: could not find anchor print("Missing interactions:", ...)')

override_tag = marker + "__OVERRIDE_TOTALS"
if any(override_tag in l for l in lines):
    print("OK: override already present")
else:
    inject = [
        f"# {override_tag}",
        "try:",
        "    totals['peptides_with_any_interactions'] = _compute_peptides_with_any_interactions(repo_root)",
        "    totals['peptides_with_interactions_populated'] = _compute_peptides_with_interactions_populated(repo_root)",
        "except Exception:",
        "    pass",
        "",
        "try:",
        "    pt = int(totals.get('peptides_total') or 0)",
        "    pres = int(totals.get('peptides_with_any_interactions') or 0)",
        "    pop = int(totals.get('peptides_with_interactions_populated') or 0)",
        "    totals['missing_interactions_present'] = max(0, pt - pres)",
        "    totals['missing_interactions_populated'] = max(0, pt - pop)",
        "except Exception:",
        "    pass",
        "",
    ]
    lines = lines[:anchor_idx] + inject + lines[anchor_idx:]

p.write_text("\n".join(lines) + "\n", encoding="utf-8")
print("OK: patched", p)
PY

# 2) Compile check
step "py_compile" python3 -m py_compile scripts/reports/report_interactions_coverage_v1.py

# 3) Run report + snapshot
step "run_coverage_report" python3 scripts/reports/report_interactions_coverage_v1.py
step "run_snapshot" python3 scripts/reports/dump_interactions_snapshot_v1.py

# 4) Print key totals (fast, no build)
step "print_totals" python3 - <<'PY'
import json
from pathlib import Path
rep = json.loads(Path("data/reports/interactions_coverage_report_v1.json").read_text("utf-8"))
tot = rep.get("totals", {})
print("peptides_total:", tot.get("peptides_total"))
print("present:", tot.get("peptides_with_any_interactions"))
print("populated:", tot.get("peptides_with_interactions_populated"))
print("missing_present:", tot.get("missing_interactions_present"))
print("missing_populated:", tot.get("missing_interactions_populated"))
PY

say ""
say "=== DONE ==="
say "LOG=$LOG"
say "TIP: tail -n 200 $LOG"
exit 0
