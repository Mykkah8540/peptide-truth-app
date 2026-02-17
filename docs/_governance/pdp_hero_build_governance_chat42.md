# PDP Hero Build Governance (Chat 42)
Status: Authoritative
Applies to: Retatrutide benchmark PDP first (Phase 1), then controlled propagation
Last updated: 2026-02-17
Owner: Micah
Doctrine: Stability-first, governance-first, human-first

## Purpose
This document freezes the “Gold Standard PDP” plan into a governed build sequence.
It exists to prevent drift, prevent patch chaos, and ensure we ship a true editorial PDP that feels calm, confident, and human.

This is not a brainstorm.
This is not a backlog.
This is the build law for Hero + Phase 1 PDP architecture.

## North Star
We are building a world-class, regulation-resilient, human-first educational system that makes peptide research understandable and emotionally safe.

The PDP is the trust engine.
It must feel:
Calm
Intentional
Layered
Human
Crisp
Confident (without hype)
Structured (without becoming a dashboard)

It must not feel:
Like a medical journal
Like a vendor landing page
Like a scoring system
Like a protocol engine
Like a safety spectacle

## Audience Reality
The viewer is a thoughtful adult human who may be:
Tired
Overwhelmed
Curious
Quietly researching
Skeptical
Looking for clarity without fear or hype

The first 10 seconds must deliver:
What this is
What it’s known for (plain language)
How mature the evidence is (posture, not detail)
A calm signal that we are educational only
A clear path to community context
No pressure to act

## Non-Negotiable Constraints
No dosing
No protocols
No prescriptive recommendations

No numeric safety scores
No /10
No letter grades
No spectacle psychology

No schema drift
No new tables
No contract changes

No global refactors
No global CSS redesign
No touching .pt-card globally

No multi-file mutation scripts
No regex JSX surgery
No blind deletion

One structural slice per commit
Build must remain green
Validators must remain green
Repo is truth, not chat

## Phase Model to Completion
We build in phases, in order.
No reordering phases.
No skipping gates.

### Phase 0: Stabilization and Truth Lock
Goal: eliminate ambiguity and prevent drift.

Includes:
Confirm HEAD + clean working tree
Run PDP contract validator (counts are truth)
Confirm risk index generation and validators
Print and map current Retatrutide render tree
Identify duplication hazards before edits begin

Exit criteria:
Clean git status before and after
Validators pass
Build passes
Render tree understood
Duplication hazards explicitly identified

### Phase 1: Hero Finalization (Authority Layer)
Goal: hero becomes the page anchor and trust signal.

Hero must deliver in <10 seconds:
Identity
Maturity posture (non-numeric)
1–2 sentence orientation
Community anchor CTA with context
Technical details collapsed

Includes:
Overview integrated into hero (no duplicated overview block)
Aliases + AA sequence are collapsed and non-dominant
Safety detail does not live in hero
CTA is not isolated and includes framing that community is observational and governed

Exit criteria:
Hero communicates identity + maturity instantly
No duplication
No technical dominance above the fold
CTA is contextualized, not floating
Page feels calm and confident at top

### Phase 2: Narrative Spine Purity
Goal: lock the emotional and cognitive flow.

Phase 1 spine order (locked):
1 Hero (Primary)
2 What People Discuss & Why (Secondary emotional hook)
3 Support Layer (Mechanism/Context)
4 Things to Consider (Utility)
5 Interactions
6 Safety (Unified)
7 Evidence (Collapsed by default)
8 Community
9 Subtle Disclaimer

Includes:
Remove conceptual duplication
Ensure utility does not compete with primary
Ensure section order matches emotional flow

Exit criteria:
Flow feels inevitable, not additive
No duplicate conceptual zones
No “container pile” feeling

### Phase 3: Safety Reframe (Trust Layer)
Goal: safety is proportional and structured, never dominant.

Model:
Safety is posture + flags
Not score
Not grade
Not spectacle

Includes:
Unified safety section with hierarchy
Primary summary open
Secondary and tertiary details collapsible
No puke wall
No fear framing
Conditional rendering only when meaningful flags exist

Exit criteria:
Safety does not emotionally dominate
No scoring anywhere
Safety feels mature, calm, specific

### Phase 4: Evidence Reframe (Authority Without Overload)
Goal: evidence supports authority without feeling empty or defensive.

Includes:
Evidence posture statement always present
Evidence detail collapsed by default
No “empty table” energy
No false precision
Evidence placed after safety, not before

Exit criteria:
Sparse evidence still feels honest and useful
Advanced readers can expand depth
Evidence never leads emotionally

### Phase 5: Community Elevation (Differentiation Layer)
Goal: community is meaningful, warm, and governance-safe.

Includes:
Community is not administrative UI
Community is not buried
Community preview is visible and human
Clear framing: community is observational, not canonical truth

Exit criteria:
Community feels alive and relevant
Never implies advice
Does not replace evidence
Does not hijack the page

### Phase 6: Visual Architecture Systemization
Goal: convert benchmark styling into a reusable editorial system.

Includes:
Finalize Primary / Secondary / Utility weight classes
Primary sections are not card-dominant
Zone system achieves depth without box repetition
No global design system refactor

Exit criteria:
Layered depth achieved
Primary sections breathe
Page no longer feels like stacked documentation

### Phase 7: Execution Hardening (Engineering Discipline)
Goal: ensure clean, reproducible builds and prevent terminal chaos.

Rules:
One file per change when possible
Show context before editing
Small atomic patches only
Run validators before committing
Run build after structural edits
No patch mega-blocks
No heredoc bloat
No drift into unrelated tasks

Exit criteria:
No patch corruption
No phantom diffs
Repeatable clean runs

### Phase 8: Template Propagation (After Benchmark is Complete)
Goal: roll gold standard across all PDPs safely.

Includes:
Controlled propagation from Retatrutide benchmark
Validate no regressions
Re-run validators
Ensure no duplication leaks to other pages

Exit criteria:
All peptide PDPs follow the gold standard
All gates green
No content contract drift

### Phase 9: Phase 2 Enhancements (Explicitly Deferred)
Not allowed until Phases 0–8 are complete:
Right rail experiments
State-based adaptive PDP
Tabbed persona forks
Over-interactive UX
Advanced widgets and navigation experiments
“Things to consider” feature repairs beyond minimal correctness

## “Done” Definition for Phase 1
Phase 1 is done only if all are true:
Hero is calm and authoritative
Overview lives in hero without duplication
Aliases + AA sequence are collapsed and non-dominant
No numeric scoring anywhere
Safety is proportional and not dumped into hero
Evidence is demoted and collapsed by default
Community is visible and warm, with governance framing
Site disclaimer is present, subtle, non-feature
No schema drift
No global refactors
Build passes
Validators pass
Git status is clean

## Drift Detection
If any of the following happens, work stops and resets to Phase 0:
A proposal introduces new stateful branching UI
A change touches global .pt-card behavior
A change requires multi-file mutation scripts
A change introduces schema changes
A change duplicates sections (overview/evidence/safety)
A patch is applied without printing context first
A build or validator fails and we keep editing anyway

## Operational Guardrails
Repo is truth.
Validator output is truth for counts.
Documentation is subordinate to validator output.
Retatrutide is the benchmark, not the template until Phase 8.
No architecture work proceeds without honoring this phase sequence.
