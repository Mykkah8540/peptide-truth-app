#!/usr/bin/env bash
# Safe runner: logs everything; NEVER exits non-zero (prevents terminal death)
set -u

LOG="/tmp/peptalk_fill_missing_interactions.log"
: > "$LOG"

# tee EVERYTHING (stdout+stderr) into the log
exec > >(tee -a "$LOG") 2>&1

echo "=== RUN_FILL_MISSING_INTERACTIONS_SAFE_V1 ==="
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

# --- 1) Write deterministic plan (idempotent) ---
PLAN="/tmp/peptalk_missing_interactions_plan_v1.csv"
cat > "$PLAN" <<'CSV'
# peptide_slug,interaction_class_slug
# Start with the most "obvious" / high-signal mappings first (v1 coverage cleanup).
bivalirudin,anticoagulants-antiplatelets
eptifibatide,anticoagulants-antiplatelets
abaloparatide,endocrine-axis-modulation-context
calcitonin,endocrine-axis-modulation-context
teriparatide,endocrine-axis-modulation-context
desmopressin,endocrine-axis-modulation-context
carbetocin,endocrine-axis-modulation-context
lanreotide,endocrine-axis-modulation-context
octreotide,endocrine-axis-modulation-context
linaclotide,neuropeptide-cns-context
plecanatide,neuropeptide-cns-context
aln-apn-01,anti-infectives-antimicrobials
cathelicidin,immune-modulation-infection-risk
difelikefalin,neuropeptide-cns-context
adipotide,diabetes-glucose-lowering
agouti-related-peptide,diabetes-glucose-lowering
adamax,neuropeptide-cns-context
epitalon,neuropeptide-cns-context
dihexa,neuropeptide-cns-context
pnc-27,neuropeptide-cns-context
ghrp-2,endocrine-axis-modulation-context
ghrp-6,endocrine-axis-modulation-context
hexarelin,endocrine-axis-modulation-context
ipamorelin,endocrine-axis-modulation-context
sermorelin,endocrine-axis-modulation-context
tesamorelin,endocrine-axis-modulation-context
acetyl-hexapeptide-8,neuropeptide-cns-context
snap-8,neuropeptide-cns-context
palmitoyl-tripeptide-1,immune-modulation-infection-risk
palmitoyl-tetrapeptide-7,immune-modulation-infection-risk
glutathione,immune-modulation-infection-risk
nad,endocrine-axis-modulation-context
pt-141,neuropeptide-cns-context
vip,cardiovascular-physiology-context
bpc-157,immune-modulation-infection-risk
tb-500,immune-modulation-infection-risk
ll-37,immune-modulation-infection-risk
CSV

echo "PLAN_WRITTEN=$PLAN"
echo "PLAN_LINES=$(wc -l < "$PLAN" | tr -d ' ')"
echo

# --- 2) Apply plan to peptide JSONs ---
step "apply_plan_to_peptides" python3 scripts/qa/apply_missing_interactions_plan_v1.py

# --- 3) Rebuild reverse index (source of truth for interaction pages) ---
step "rebuild_reverse_index" python3 scripts/index/rebuild_interactions_to_peptides_index_v1.py

# --- 4) Coverage report + snapshot ---
step "coverage_report" python3 scripts/reports/report_interactions_coverage_v1.py
step "snapshot_md" python3 scripts/reports/dump_interactions_snapshot_v1.py

# --- 5) Validators ---
step "validate_interactions" python3 scripts/validate/validate_peptide_interactions_v1.py

# --- 6) Safe web build gate (never kills terminal) ---
if [[ -x scripts/qa/gate_build_safe.sh ]]; then
  step "web_build_gate" ./scripts/qa/gate_build_safe.sh
else
  echo "NOTE: scripts/qa/gate_build_safe.sh missing or not executable; skipping build gate."
fi

echo
echo "=== DONE ==="
echo "LOG=$LOG"
echo "TIP: tail -n 200 $LOG"
exit 0
