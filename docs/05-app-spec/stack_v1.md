# Stack V1 (Contract + UX Rules)

Date: 2026-02-03
Scope: Canonical representation of a "stack" as a first-class object in Pep-Talk.

A "stack" is a curated combination of peptides (and optionally blends) that are commonly discussed together for a shared goal, with an emphasis on compounding benefit without compounding risk.

No dosing. No protocols. No schedules. No instructions. Educational only.

## Goals

- Make stacks feel like a single synergistic object (not a document dump)
- Provide a clean, minimal exploration UX
- Make each peptide/blend clickable to its PDP
- Provide safety context in a compact, non-alarming way
- Enable future expansion: UGC stacks, ranking, saving/forking, suggestions

## Non-goals (explicitly out of scope for V1)

- No dosing or protocol guidance
- No database persistence for curated stacks
- No user accounts, no syncing, no auth changes
- No ranking algorithm
- No auto-conflict engine beyond basic informational cautions
- No vendor or affiliate logic

## Data Contract: stack_v1

Stacks are stored as JSON under:
content/stacks/*.json

Each file contains a single stack object.

### Required fields

- schema_version: "stack_v1"
- stack_id: string (stable id)
- slug: string (used in URLs)
- title: string
- summary: string (synergy description; 1–4 sentences)
- goals: string[] (short, human-readable goal tags)
- peptides: string[] (canonical peptide slugs, matching /peptide/[slug])

### Optional fields

- blends: string[] (canonical blend slugs, matching /blend/[slug])
- cautions: string[] (compact safety context statements; informational, not alarming)
- goes_well_with: string[] (optional suggestions; peptide or blend slugs)

## UX Rules (Stacks)

- Treat the stack as a single unit: title, goal tags, synergy summary
- Show members as a tight, clean cluster of clickable pills/cards
- Cautions must be short, neutral, and rare (only when meaningful)
- "Goes well with" is optional and should never feel prescriptive
- Avoid repeating PDP content; stacks are for overview and navigation
- Never display raw JSON or debug metadata

## Future hooks (intended evolution)

- Saved stacks in My Peps (local first; later account sync)
- UGC stack submissions (moderated like community notes)
- "Top stacks" lists (editorial + community)
- Conflict/risk overlay (rule-based + interaction context)

