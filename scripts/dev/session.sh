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


chat_prompt() {
  echo "PEP TALK / PEPTIDE-TRUTH — CHAT BOOTSTRAP PROMPT"
  echo
  echo "You are inheriting an in-flight repo. BEFORE proposing any changes, you MUST:"
  echo "1) Read the repo feeder + execution rules + UI specs + status files listed below (in order)."
  echo "2) Restate (a) what is disallowed, (b) what is the active next task, (c) what is deferred."
  echo "3) Propose ONE scoped plan with a clear stop point and verification gates."
  echo "4) Output bashable steps only. No manual editing instructions."
  echo
  echo "HARD RULES"
  echo "- No medical advice, no dosing, no protocols, no 'should I take X'."
  echo "- No scope drift beyond authoritative docs."
  echo "- If build fails after edits: STOP and fix."
  echo "- Avoid phantom changes; keep git status clean."
  echo "- Respect no-divider docs (no '---' lines) per docs conformance."
  echo
  echo "READ IN ORDER"
  echo "- docs/README_FEEDER.md"
  echo "- docs/README_EXECUTION.md"
  echo "- docs/ui/Master_UI_and_Content_Polish.md"
  echo "- docs/ui/PDP_Contextual_Considerations.md"
  echo "- docs/_status/current_state.md"
  echo "- docs/_status/next_task.md"
  echo "- docs/_status/parking_lot.md"
  echo "- docs/_status/build_best_practices.md"
  echo
  echo "REPO STATE (for context)"
  echo "- Branch: $(git branch --show-current)"
  echo "- HEAD:   $(git --no-pager log -1 --oneline)"
  echo
  echo "WORKING TREE"
  if [ -n "$(git status --porcelain)" ]; then
    echo "NOT CLEAN:"
    git status --short
  else
    echo "CLEAN"
  fi
  echo
  echo "LAST 8 COMMITS"
  git --no-pager log -8 --oneline || true
  echo
  echo "CURRENT STATE (docs/_status/current_state.md)"
  sed -n '1,260p' docs/_status/current_state.md 2>/dev/null || true
  echo
  echo "NEXT TASK (docs/_status/next_task.md)"
  sed -n '1,260p' docs/_status/next_task.md 2>/dev/null || true
  echo
  echo "PARKING LOT (docs/_status/parking_lot.md)"
  sed -n '1,260p' docs/_status/parking_lot.md 2>/dev/null || true
  echo
  echo "END OF PROMPT"
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
  chat-prompt) chat_prompt ;;
  *)
    cat <<'TXT'
Usage
- ./scripts/dev/session.sh hydrate
- ./scripts/dev/session.sh preflight
- ./scripts/dev/session.sh postflight
- ./scripts/dev/session.sh task:new <slug>
- ./scripts/dev/session.sh chat-prompt
TXT
    exit 1
    ;;
esac
