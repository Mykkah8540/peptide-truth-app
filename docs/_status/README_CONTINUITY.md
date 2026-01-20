Pep-Talk Chat Continuity Protocol

- The repository is the source of truth, not the chat.
- docs/_status/current_state.md must be read at the start of every chat.
- Only one blocker may be worked at a time.
- Before ending a chat:
  - Update current_state.md
  - Ensure python3 scripts/index/rebuild_all_indexes.py passes
  - Explicitly declare the project safe to continue
