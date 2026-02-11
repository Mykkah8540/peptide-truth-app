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
