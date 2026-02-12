# Build Best Practices
Execution helper for keeping Pep Talk on track

This file is process guidance only.
If it conflicts with docs/README_FEEDER.md, docs/README_EXECUTION.md, or docs/ui specs, this file loses.

## Purpose
Keep the build aligned, prevent drift, and avoid chat chaos.
Make execution deterministic and lightweight.

## How We Work
Option A (locked)
- The assistant generates bashable steps or deterministic scripts.
- Micah runs commands.
- Micah does not manually edit files as part of normal execution.
- If a command must be run from a directory, the command includes the cd.
- We work one task at a time with a clear stop point.
- We debug as we go: run, observe output, adjust, proceed.
- We do not rush ahead across multiple workstreams.
- We keep diffs tight to prevent chat bloat and VS Code instability.

Terminal and VS Code stability
- Prefer terminal commands over VS Code Source Control actions for heavy operations.
- Cap output using sed/head to avoid terminal overload.
- If VS Code shows massive phantom changes, stop and triage before doing anything else.

## One-Command Hydration Sequence
Every new chat must read these files in this order
- docs/README_FEEDER.md
- docs/README_EXECUTION.md
- docs/ui/Master_UI_and_Content_Polish.md
- docs/ui/PDP_Contextual_Considerations.md
- docs/_status/current_state.md
- docs/_status/parking_lot.md

## Global Guardrails
No
- instructions, protocols, dosing, timing schedules
- promises, guarantees, “fixed my,” “this will”
- suitability statements, eligibility checks, “right for you”
- fear-based disclaimers sprayed across pages
- hype sorting, rankings, likes, leaderboards

Yes
- consumer-facing, science-backed explanation
- depth is opt-in, never forced
- lived experience is welcome, authority cosplay is not
- regulation-proof framing: content must survive regulated, restricted, Rx-only, or removed markets

Quick scans
- Directive phrase scan:
  rg -n "protocol|dose|dosing|schedule|timing|cycle|reconstitution|you should|guaranteed|best|optimal" app/web docs

## Section Guidance and Acceptance Checks

### Global Messaging and Disclaimers
Best practice
- Use approved global copy from docs/ui/Master_UI_and_Content_Polish.md
- Disclaimers live in the disclaimer area only
- Remove repeated “governed reference / no protocols” language sprayed across UI

Acceptance checks
- No repeated disclaimers mid-page
- No jargon-only lines that mean nothing to average users

### Home and Landing Page
Best practice
- Route users by intent, not expertise
- Keep it uncluttered and delightful on mobile
- Depth system feels optional, not academic

Must do
- Clearly route to:
  - Peptides
  - Wellness Paths
  - Resources
  - Commercial Blends
  - Explore Stacks

Acceptance checks
- Mobile reads as one clean scroll
- No symptom to solution funnel language

### Peptide PDP
Best practice
- A reading experience, not a dashboard
- Visual balance on desktop: no dead right rail, no giant empty areas
- Depth via progressive disclosure: basics first, deeper modules opt-in
- Community does not die at the bottom

Must include
- “Things to Consider for Your Situation” per docs/ui/PDP_Contextual_Considerations.md
- Community comments section with strong CTA (“Join the Conversation”)

Acceptance checks
- No sticky hero containers
- No sticky sidebars
- No nested scroll regions
- Everything reachable on short screens

### Commercial Blend PDP
Best practice
- Market literacy artifact: what it is, why it exists, what’s known vs hypothesized
- Component peptides anchored to peptide PDPs
- Credit real science without inflating hype

Must include structure
- What this blend is
- Why blends like this exist
- What’s known vs hypothesized
- Component peptides (links)
- Combined effects framed as conceptual discussion
- Soft boundaries: what the page is not doing

Acceptance checks
- No superiority language: best, optimal, guaranteed
- No acquisition or purchase CTAs

### Stacks
Best practice
- Two-lane system:
  - Pep Talk curated stacks
  - Approved community stacks
- Stacks are theoretical constructs and discussion artifacts
- No ranking or hype sorting

Must include
- Community submission aligned to Wellness Paths taxonomy
- Approval gate before public listing
- Neutral sorting (newest, alphabetical)

Acceptance checks
- Explore Stacks is not a clone of blends
- Approved label exists for community stacks

### Wellness Paths
Best practice
- System-first framing
- Peptides are one category among many discussed in the space
- Tone exploratory and grounded

Acceptance checks
- Avoid best peptide for X
- Avoid this fixes X
- Pages still make sense if peptides were removed entirely

### Resources
Best practice
- Science literacy engine
- Teach how evidence works, why uncertainty exists, how claims should be read

Must include
- Short, readable guides:
  - How to read peptide claims
  - What early research means
  - Why experiences vary
  - Interactions and uncertainty
  - Regulation evolves without predicting

Acceptance checks
- Every resource teaches how to think, not what to do
- No calls to action implying use

### Community Comments (Peptides)
Best practice
- Invite experience, not instruction
- Light-touch moderation
- Block authority cosplay

Rules
- Public read, authenticated write
- Author can edit and delete their own comments
- Soft delete preferred

Acceptance checks
- UI copy invites experience but discourages directives
- No you should language in UI copy

### Things to Consider for Your Situation tool
Best practice
- Context explorer, not eligibility checker
- Opt-in depth, consumer-facing, regulation-proof

Rules
- No recommendations
- No suitability
- No risk scoring
- No safe or unsafe language
- Must follow response structure in docs/ui/PDP_Contextual_Considerations.md

## Execution Safety Checklist
Every task must include
- Spec section being implemented
- Files expected to change
- Explicit scope: what is not being touched
- Verification command
- Clear stop point

If any are missing, stop and rewrite the plan.
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
