# README_FEEDER
Chat Onboarding and Execution Feeder

This file is a behavioral contract.
Every new chat must ingest this file before any work begins.

## What This Project Is
Pep Talk is a consumer-facing educational platform about peptides and related compounds.

We design for reality:
- Users are already consuming peptides across legal and ethical spectrums
- Many users are desperate, burned out, chronically ill, or failed by traditional medicine
- Ethics lectures do not help these users
- Ignoring this reality is irresponsible
- Giving instructions would also be irresponsible

Pep Talk exists in the gap:
- Educate without instructing
- Clarify without endorsing
- Empower without prescribing
- Respect lived experience without becoming authority

## What Pep Talk Is Not
Hard NOs
- medical advice
- recommendations
- protocols
- dosing, timing, or schedules
- safety gatekeeping or eligibility checks
- a marketplace
- hype platform
- popularity contest

## Authority Hierarchy
1) docs/README_EXECUTION.md
2) docs/ui specs
3) docs/_status files
4) code is lowest authority

Rules
- If code conflicts with docs, docs win
- If something exists in code but is not explicitly allowed in docs, it is legacy and must be removed

## How We Work
Locked operating model
- The assistant generates bashable steps or deterministic scripts
- Micah runs commands
- Micah does not manually edit files as part of normal execution
- If a command requires a directory, the command includes cd
- One task at a time with a clear stop point
- Debug as we go, validate each step, then proceed
- Avoid chat bloat and VS Code overload

## Mandatory Start Sequence For Any New Chat
The assistant must start by reading these files in order
- docs/README_FEEDER.md
- docs/README_EXECUTION.md
- docs/ui/Master_UI_and_Content_Polish.md
- docs/ui/PDP_Contextual_Considerations.md
- docs/_status/current_state.md
- docs/_status/parking_lot.md

No code changes until it can restate:
- what is disallowed
- what is currently being built next
- what is deferred

## PDP Non-Negotiables
- PDPs are a reading experience, not a dashboard
- Mobile is first-class
- No sticky hero containers
- No sticky sidebars
- No nested scroll regions
- Everything reachable on short screens

## Parking Lot Discipline
Ideas live only in:
- docs/_status/parking_lot.md

Nothing in the parking lot is built unless promoted into an authoritative spec.

## Stop Conditions
Stop immediately if:
- build fails after edits
- scope drifts beyond the spec
- phantom changes appear in git status
- a change implies advice, protocols, dosing, timing, or suitability


## PDP rebuild artifacts (authoritative)
- docs/ui/PDP_Delete_List.md
- docs/ui/PDP_Rebuild_Checklist.md
## VS Code Terminal Stability and Hydration Lite (LOCKED)

Purpose
Keep new chats from crashing VS Code or bloating output. Hydration must be lightweight by default.

Rules
- Every command block MUST start with an explicit cd (repo root or $HOME), so copy/paste is deterministic.
- Prefer python3, never python.
- Avoid large terminal dumps. Do not print hundreds of lines across many files during “hydration.”
- If deeper proof is required, read only the minimum excerpt needed to verify wiring.

Hydration Lite (default)
Use this instead of dumping many files:
- Show repo state (branch, HEAD, clean tree)
- Show 30–80 lines max per file excerpt
- Prefer targeted grep/rg to prove facts

Recommended hydration commands
cd "$(git rev-parse --show-toplevel)"

git rev-parse --abbrev-ref HEAD
git rev-parse HEAD
git status --short

# Prove what matters without dumping entire docs
sed -n '1,120p' docs/README_FEEDER.md
sed -n '1,160p' docs/README_EXECUTION.md
sed -n '1,200p' docs/_status/current_state.md
sed -n '1,220p' docs/_status/next_task.md

# Targeted proof beats scrolling
rg -n "NEXT SINGLE ACTION|UGC production hardening" docs/_status/current_state.md docs/_status/next_task.md -S

VS Code crash triage (when terminal exits with code 1/127)
- First suspect: VS Code workspace terminal overrides forcing zsh.
- Check workspace settings: <repo>/.vscode/settings.json
- NOTE: .vscode is gitignored by design. Fixes here are local-only and should NOT be committed.

Minimum local fix
- Remove terminal.integrated.* overrides from the workspace settings OR set User settings to bash.
- If scripts fail with “python: command not found,” use python3.

Stop condition
If VS Code terminal becomes unstable:
- STOP heavy hydration
- Switch to Hydration Lite
- Force bash in VS Code User settings until stable
