#!/usr/bin/env bash
set -u

LOG="/tmp/peptalk_fill_missing_interactions_v3.log"
: > "$LOG"
exec > >(tee -a "$LOG") 2>&1

echo "=== RUN_FILL_MISSING_INTERACTIONS_SAFE_V3 ==="
echo "DATE_UTC: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "PWD: $(pwd)"
echo "HEAD: $(git rev-parse --short HEAD 2>/dev/null || echo '?')"
echo "BRANCH: $(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo '?')"

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

PLAN="/tmp/peptalk_missing_interactions_plan_v3.csv"
cat > "$PLAN" <<'CSV'
# peptide_slug,interaction_class_slug
5-amino-1mq,diabetes-glucose-lowering
ara-290,immune-modulation-infection-risk
bpc-157-arginate,immune-modulation-infection-risk
cgrp,cardiovascular-physiology-context
follistatin-344,endocrine-axis-modulation-context
humanin,neuropeptide-cns-context
motilin,neuropeptide-cns-context
nad-plus,endocrine-axis-modulation-context
palmitoyl-pentapeptide-4,immune-modulation-infection-risk
peg-mgf,endocrine-axis-modulation-context
pentagastrin,neuropeptide-cns-context
prolactin-releasing-peptide,endocrine-axis-modulation-context
secretin,neuropeptide-cns-context
shlp-2,neuropeptide-cns-context
ss-31,neuropeptide-cns-context
thymosin-beta-4-full,immune-modulation-infection-risk
thymulin,immune-modulation-infection-risk
ziconotide,neuropeptide-cns-context
CSV

echo
echo "PLAN_WRITTEN=$PLAN"
echo "PLAN_LINES=$(wc -l < "$PLAN" | tr -d ' ')"
echo "PLAN_HEAD:"
head -n 50 "$PLAN" || true

# Safety: show actual current missing slugs using validator-like logic
step "print_current_missing_slugs" python3 - <<'PY'
import json
from pathlib import Path
repo = Path(".").resolve()
peptides_dir = repo/"content"/"peptides"
missing = []
for fp in sorted(peptides_dir.glob("*.json")):
    slug = fp.stem
    if slug.startswith("_"):
        continue
    try:
        doc = json.loads(fp.read_text(encoding="utf-8"))
    except Exception:
        continue
    it = doc.get("interactions")
    ok = False
    if isinstance(it, dict):
        for k in ("drug_classes","supplement_classes","peptides"):
            v = it.get(k)
            if isinstance(v, list) and len(v) > 0:
                ok = True
                break
    if not ok:
        missing.append(slug)
print("MISSING_COUNT", len(missing))
print("MISSING_SLUGS", missing)
PY

# Apply via your existing applier by copying to the v1 plan path it reads
step "copy_plan_for_applier" bash -lc "cp -f '$PLAN' /tmp/peptalk_missing_interactions_plan_v1.csv"
step "apply_plan_to_peptides" python3 scripts/qa/apply_missing_interactions_plan_v1.py

# Rebuild + reports + snapshot + validators + build gate
step "rebuild_reverse_index" python3 scripts/index/rebuild_interactions_to_peptides_index_v1.py
step "coverage_report" python3 scripts/reports/report_interactions_coverage_v1.py
step "snapshot_md" python3 scripts/reports/dump_interactions_snapshot_v1.py
step "validate_interactions" python3 scripts/validate/validate_peptide_interactions_v1.py
if [[ -x scripts/qa/gate_build_safe.sh ]]; then
  step "web_build_gate" ./scripts/qa/gate_build_safe.sh
fi

echo
echo "=== DONE ==="
echo "LOG=$LOG"
echo "TIP: grep -n \"missing_interactions\" -n docs/_snapshots/interactions_v1_snapshot.md"
exit 0
