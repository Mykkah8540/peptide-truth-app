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
echo
echo "== VALIDATING: interactions reverse index =="
REVLOG="/tmp/peptalk_revindex.log"
: > "$REVLOG"

if ( python3 scripts/validate/validate_interactions_to_peptides_index_v1.py ) > "$REVLOG" 2>&1; then
  echo "REVINDEX_OK=1"
else
  echo "REVINDEX_OK=0"
  echo "---- revindex validator tail (last 120 lines) ----"
  tail -n 120 "$REVLOG" || true
  echo "--------------------------------------------------"
fi  # PEP_TALK__GATE_VALIDATE_REVINDEX_V1
exit 0
