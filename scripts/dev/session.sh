#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [ -z "${ROOT}" ]; then
  echo "Not in a git repo"
  exit 1
fi
cd "${ROOT}"

cmd="${1:-}"

hydrate() {
  echo "== Hydration order =="
  cat <<'TXT'
Read in order
- docs/README_FEEDER.md
- docs/README_EXECUTION.md
- docs/ui/Master_UI_and_Content_Polish.md
- docs/ui/PDP_Contextual_Considerations.md
- docs/_status/current_state.md
- docs/_status/next_task.md
- docs/_status/parking_lot.md
- docs/_status/build_best_practices.md
TXT
  echo
  echo "== Current state =="
  sed -n '1,220p' docs/_status/current_state.md || true
  echo
  echo "== Next task =="
  sed -n '1,220p' docs/_status/next_task.md || true
}

preflight() {
  echo "== Preflight: clean tree =="
  if [ -n "$(git status --porcelain)" ]; then
    git status --short
    echo
    echo "FAIL: working tree not clean"
    exit 1
  fi

  echo
  echo "== Preflight: docs conformance =="
  python3 scripts/validators/docs_conformance.py

  echo
  echo "== Preflight: app build =="
  npm -C app/web run build

  echo
  echo "== Preflight: indexes =="
  python3 scripts/index/rebuild_all_indexes.py

  echo
  echo "OK: preflight passed"
}

postflight() {
  echo "== Postflight: docs conformance =="
  python3 scripts/validators/docs_conformance.py

  echo
  echo "== Postflight: app build =="
  npm -C app/web run build

  echo
  echo "== Postflight: indexes =="
  python3 scripts/index/rebuild_all_indexes.py

  echo
  echo "== Postflight: status and diff =="
  git status --short
  echo
  git diff --stat
  echo
  echo "OK: postflight complete"
}

task_new() {
  slug="${1:-}"
  if [ -z "${slug}" ]; then
    echo "Usage: $0 task:new <slug>"
    exit 1
  fi
  if [ -n "$(git status --porcelain)" ]; then
    echo "FAIL: working tree must be clean before starting a new task"
    git status --short
    exit 1
  fi

  date_str="$(date +%Y-%m-%d)"
  cat > docs/_status/next_task.md <<EOF
# Next Task
Only one task may be active at a time.

Slug
${slug}

Owner
Micah

Date
${date_str}

Goal
Fill this in.

Spec anchors
- docs/ui/Master_UI_and_Content_Polish.md
- docs/_status/build_best_practices.md

Scope
Allowed
- fill this in

Forbidden
- fill this in

Plan
Step 1
Step 2
Step 3

Verification
- npm -C app/web run build
- python3 scripts/index/rebuild_all_indexes.py

Stop point
Fill this in.

Rollback plan
- git restore -SW .
EOF

  echo "WROTE: docs/_status/next_task.md"
  echo
  echo "== Next task preview =="
  sed -n '1,220p' docs/_status/next_task.md
}

case "${cmd}" in
  hydrate) hydrate ;;
  preflight) preflight ;;
  postflight) postflight ;;
  task:new) shift; task_new "${1:-}" ;;
  *)
    cat <<'TXT'
Usage
- ./scripts/dev/session.sh hydrate
- ./scripts/dev/session.sh preflight
- ./scripts/dev/session.sh postflight
- ./scripts/dev/session.sh task:new <slug>
TXT
    exit 1
    ;;
esac
