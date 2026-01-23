#!/usr/bin/env bash
set -u

LOG="/tmp/peptalk_fill_missing_interactions_v2.log"
: > "$LOG"
exec > >(tee -a "$LOG") 2>&1

echo "=== RUN_FILL_MISSING_INTERACTIONS_SAFE_V2 ==="
echo "DATE_UTC: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "PWD: $(pwd)"
echo "HEAD: $(git rev-parse --short HEAD 2>/dev/null || echo '?')"
echo "BRANCH: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '?')"
echo

step () {
  local name="$1"; shift
  echo
  echo "=== STEP: $name ==="
  echo "+ $*"
  ( "$@" )
  local code=$?
  echo "STEP_EXIT_CODE=$code"
  return 0
}

# 1) Generate plan v2
step "generate_plan_v2" python3 scripts/qa/generate_missing_interactions_plan_v2_auto.py

PLAN="/tmp/peptalk_missing_interactions_plan_v2.csv"
if [[ ! -s "$PLAN" ]]; then
  echo "PLAN_MISSING_OR_EMPTY=$PLAN"
else
  echo "PLAN_OK=$PLAN"
  echo "PLAN_LINES=$(wc -l < "$PLAN" | tr -d ' ')"
  echo
  echo "PLAN_HEAD:"
  head -n 30 "$PLAN" || true
fi

# 2) Apply plan (reuse Phase 1 applier by temporarily pointing it at PLAN path)
# We do this by copying the plan into the Phase 1 location the applier reads.
step "copy_plan_for_applier" bash -lc "cp -f '$PLAN' /tmp/peptalk_missing_interactions_plan_v1.csv"

step "apply_plan_to_peptides" python3 scripts/qa/apply_missing_interactions_plan_v1.py

# 3) Rebuild reverse index + reports/snapshot
step "rebuild_reverse_index" python3 scripts/index/rebuild_interactions_to_peptides_index_v1.py
step "coverage_report" python3 scripts/reports/report_interactions_coverage_v1.py
step "snapshot_md" python3 scripts/reports/dump_interactions_snapshot_v1.py

# 4) Validators + safe build
step "validate_interactions" python3 scripts/validate/validate_peptide_interactions_v1.py
if [[ -x scripts/qa/gate_build_safe.sh ]]; then
  step "web_build_gate" ./scripts/qa/gate_build_safe.sh
fi

echo
echo "=== DONE ==="
echo "LOG=$LOG"
echo "TIP: tail -n 200 $LOG"
exit 0
