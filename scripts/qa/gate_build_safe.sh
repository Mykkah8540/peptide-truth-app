#!/usr/bin/env bash
set -u

LOG="/tmp/peptalk_build.log"
: > "$LOG"

echo "== RUNNING: npm -C app/web run build =="
( npm -C app/web run build ) > "$LOG" 2>&1
code=$?

echo
echo "BUILD_EXIT_CODE=$code"
echo "---- tail (last 80 lines) ----"
tail -n 80 "$LOG" || true
echo "------------------------------"

# Print a deterministic OK/FAIL marker without exiting non-zero (prevents terminal death)
if [[ $code -eq 0 ]] && rg -q "Compiled successfully" "$LOG" && ! rg -q "Build error occurred" "$LOG"; then
  echo "BUILD_OK=1"
else
  echo "BUILD_OK=0"
fi

echo
echo "== VALIDATING: interactions reverse index =="
( python3 scripts/validate/validate_interactions_to_peptides_index_v1.py ) >> "$LOG" 2>&1
vcode=$?
if [[ $vcode -eq 0 ]] && rg -q "VALIDATION PASSED" "$LOG"; then
  echo "REVINDEX_OK=1"
else
  echo "REVINDEX_OK=0"
fi  # PEP_TALK__GATE_VALIDATE_REVINDEX_V1


exit 0
