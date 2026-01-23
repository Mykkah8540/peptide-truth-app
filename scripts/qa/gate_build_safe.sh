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

exit 0
