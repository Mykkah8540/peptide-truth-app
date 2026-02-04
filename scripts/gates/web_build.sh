#!/usr/bin/env bash
set +e
set +u
set +o pipefail

cd "${1:-$(pwd)}" || exit 1

mkdir -p /tmp/pt_logs
LOG="/tmp/pt_logs/pt_build_$(date +%Y%m%d_%H%M%S).log"

echo "== BUILD (log: $LOG) =="
npm -C app/web run build 2>&1 | tee "$LOG"
BUILD_EXIT_CODE=${PIPESTATUS[0]}
echo "BUILD_EXIT_CODE=$BUILD_EXIT_CODE"

echo
echo "== GIT STATUS =="
git status --porcelain

if [ "$BUILD_EXIT_CODE" -ne 0 ]; then
  echo
  echo "---- tail log ----"
  tail -n 80 "$LOG"
fi

exit "$BUILD_EXIT_CODE"
