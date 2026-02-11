# README_CONTINUITY
Chat continuity pointer for Pep Talk

This file is intentionally short to prevent drift.
Canonical truth lives in:
- docs/README_FEEDER.md
- docs/README_EXECUTION.md
- docs/ui/Master_UI_and_Content_Polish.md
- docs/ui/PDP_Contextual_Considerations.md
- docs/_status/current_state.md
- docs/_status/parking_lot.md
- docs/_status/build_best_practices.md

## Mandatory new chat hydration
Every new chat must read these files in order:
1) docs/README_FEEDER.md
2) docs/README_EXECUTION.md
3) docs/ui/Master_UI_and_Content_Polish.md
4) docs/ui/PDP_Contextual_Considerations.md
5) docs/_status/current_state.md
6) docs/_status/parking_lot.md
7) docs/_status/build_best_practices.md

## Operating rules
- The assistant generates bashable steps or deterministic scripts
- Micah runs commands
- Micah does not manually edit files as part of normal execution
- If a command requires a directory, the command includes the cd
- One task at a time with a clear stop point
- Debug as we go, validate each step, then proceed
- If build fails after edits, stop and revert before continuing
