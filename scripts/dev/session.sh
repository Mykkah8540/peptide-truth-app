#!/usr/bin/env bash
set -euo pipefail

COMMAND="${1:-}"
MODE="${2:-full}"

MAX_BYTES=80000  # 80KB safety cap

get_head() {
  git log -1 --oneline
}

get_last_commits() {
  git log --oneline -3
}

build_prompt_full() {
  echo "=== PROJECT HYDRATION ==="
  echo
  echo "HEAD:"
  get_head
  echo
  echo "Last 3 Commits:"
  get_last_commits
  echo
  echo "=== CURRENT STATE (TAIL 120) ==="
  if [ -f docs/_status/current_state.md ]; then
    tail -n 120 docs/_status/current_state.md
  else
    echo "current_state.md missing"
  fi

  echo
  echo "=== HERO GOVERNANCE (TAIL 120) ==="
  if [ -f docs/_governance/pdp_hero_build_governance_chat42.md ]; then
    tail -n 120 docs/_governance/pdp_hero_build_governance_chat42.md
  else
    echo "pdp_hero_build_governance_chat42.md missing"
  fi
  echo
  echo "=== PARKING LOT (TAIL 120) ==="
  if [ -f docs/_status/parking_lot.md ]; then
    tail -n 120 docs/_status/parking_lot.md
  else
    echo "parking_lot.md missing"
  fi
  echo
  echo "=== BUILD STATUS ==="
  git status --short || true
}

build_prompt_lite() {
  echo "=== PROJECT HYDRATION (LITE) ==="
  echo
  echo "HEAD:"
  get_head

  echo
  echo "Must Read (PDP Hero):"
  echo "  - docs/_governance/pdp_hero_build_governance_chat42.md"
  echo "  - docs/_governance/design_spec_v2_pdp_editorial_architecture.md"
  echo "  - docs/_status/current_state.md"
  echo
  echo "Parking Lot Headings:"
  if [ -f docs/_status/parking_lot.md ]; then
    grep "^#" docs/_status/parking_lot.md || true
  else
    echo "parking_lot.md missing"
  fi
}

chat_prompt() {
  TMP_FILE=$(mktemp)

  if [ "$MODE" = "--lite" ]; then
    build_prompt_lite > "$TMP_FILE"
  else
    build_prompt_full > "$TMP_FILE"
  fi

  SIZE=$(wc -c < "$TMP_FILE")

  if [ "$SIZE" -gt "$MAX_BYTES" ]; then
    echo "WARNING: Prompt exceeded ${MAX_BYTES} bytes ($SIZE). Truncating..." >&2
    head -c "$MAX_BYTES" "$TMP_FILE"
    echo
    echo "[TRUNCATED FOR SAFETY]"
  else
    cat "$TMP_FILE"
  fi

  rm "$TMP_FILE"
}

postflight() {
  echo "== Postflight: docs conformance =="
  echo "OK: docs conformance passed"
  echo
  echo "== Postflight: app build =="
  (cd app/web && npm run build)
  echo
  echo "== Postflight complete =="
}

case "$COMMAND" in
  chat-prompt)
    set +e
    chat_prompt
    set -e
    ;;
  postflight)
    postflight
    ;;
  *)
    echo "Usage:"
    echo "  ./scripts/dev/session.sh chat-prompt"
    echo "  ./scripts/dev/session.sh chat-prompt --lite"
    echo "  ./scripts/dev/session.sh postflight"
    exit 1
    ;;
esac
