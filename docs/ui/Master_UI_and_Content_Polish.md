# Pep Talk
# Master UI, Content, and Governance Blueprint
## Exhaustive, migration-grade specification (decisions + reasoning + copy + file-level instructions)
### File target: `docs/ui/Master_UI_and_Content_Polish.md`

This document is the canonical “master blueprint” for **everything** designed and decided in this chat:
**what it is, what it says, what it replaces, structure, rules, policies, infrastructure implications, code/DB/RLS expectations, and exact flows**.

This is intentionally prescriptive and verbose. If a future change conflicts with this document, **this document wins**.


## 0. Core reality and product stance

### 0.1 Reality we are designing around
People are already consuming peptides. They are doing so across a spectrum:
- legally
- semi-legally
- questionably
- ignorantly
- experimentally
- desperately
- casually

Pretending this isn’t happening is irresponsible.
Giving instructions would also be irresponsible.

Pep Talk exists “in the gap”: to deliver clarity with restraint.

### 0.2 What Pep Talk is
Pep Talk is a **science-backed, consumer-facing educational reference** that helps people understand:
- what a peptide is
- what it’s been studied for
- how it works (mechanism/signaling level, scaled to reader depth)
- what systems it may interact with
- what common interactions/contraindications are known (high-level, common-sense, well-documented)

Pep Talk is designed to serve multiple knowledge levels:
- brand new / curious browsing
- knows peptides but not mechanisms
- advanced users who want deeper technical detail

Pep Talk is not trying to become “the medical solution.” It is **consumer education**.

### 0.3 What Pep Talk is not (explicit non-goals)
Pep Talk is NOT:
- a medical platform
- a prescribing authority
- a protocol library
- a dosing/scheduling guide
- a supplier marketplace
- an influencer/social platform
- a popularity contest (likes/trending/leaderboards)

If a feature trends toward any of the above, it violates this blueprint.

### 0.4 Regulation-proof content principle (internal law)
Pep Talk content must remain accurate whether peptides are:
- unregulated
- regulated
- restricted
- prescription-only
- removed from consumer markets

**If a sentence wouldn’t survive that future, it doesn’t ship.**

This prevents rewrites and protects trust.

#### How regulation-proofing applies by section
**Peptide pages**
- They explain:
  - what the molecule is
  - how it signals
  - what systems it interacts with
  - what research has explored
- They never imply:
  - accessibility
  - appropriateness
  - timing
  - action
- The peptide exists whether or not it’s available.

**Wellness Paths**
- They remain system-first:
  - sleep regulation
  - inflammation signaling
  - metabolic pathways
- Peptides are framed as “one category of compounds discussed in this area.”
- If peptides disappeared tomorrow, the page still stands.

**Resources**
- Strongest place to educate on:
  - how science evolves
  - why early research isn’t final
  - how uncertainty exists
  - why regulation often follows behavior
- Not predicting regulation; explaining why uncertainty exists.

**Commercial Blends**
- Not legitimizing blends; explaining why they exist in the market.
- Becomes:
  - consumer literacy
  - historical context
  - market analysis
- If blends vanish, explanation still matters.

**Stacks & community content**
- Treated as:
  - theoretical constructs
  - mechanistic ideas
  - community discussion artifacts
- Not “plans,” “solutions,” or “recommendations.”
- Timeless framing.

### 0.5 Quiet positioning line (brand anchor)
Somewhere in About/Philosophy (Manifesto-lite), this should exist:

> Science evolves. Regulation follows. Curiosity doesn’t stop in the meantime.  
> Pep Talk exists to help people understand what’s being discussed — responsibly and without hype — while the conversation continues to change.

### 0.6 Ethical stance (why this is right)
Acknowledges reality without endorsing behavior.
- People are consuming peptides across legal/ethical spectra.
- Ignoring it is irresponsible.
- Giving instructions is also irresponsible.
- Standing in the gap with clarity and restraint is the only adult option.


## 1. Global messaging (final copy) and what it replaces

### 1.1 Final headline system (approved)
**Tagline (global):**
**Understand peptides — without the hype.**

**Subline (global):**
**Science-backed education for curious humans at every level.**

**Ethical anchor (global / philosophy surfaces):**
**We don’t tell you what to do. We help you understand what’s happening.**

### 1.2 What this replaces (explicit)
Replace/remove wherever found:
- “A governed, educational peptide reference. No protocols, dosing, or instructions.”
- any repeated, fear-based disclaimers sprayed across pages
- jargon-first statements that “mean nothing” to average users, e.g. “peptides are biologically active”

**Replacement posture:** calm confidence + consumer clarity. Governance is enforced structurally, not emotionally.

### 1.3 Disclaimer placement rule (locked)
Disclaimers exist in the **disclaimer area** only.
Do not scare users mid-exploration with defensive language.


## 2. IA and content strategy (what exists, what we’re moving to)

### 2.1 Primary pillars (locked)
- **Peptides** (PDPs)
- **Resources** (education library)
- **Commercial Blends** (supplier-available combos; market literacy + science)
- **Stacks**
  - Pep Talk curated stacks
  - Approved community stacks
- **Wellness Paths** (noob-first discovery categories)

### 2.2 Depth modes (framing)
Depth is a feature:
- “noob path” is uncluttered
- deeper technical detail is opt-in
- never forced

### 2.3 Gender and population nuance
Where biologically relevant:
- call out that signaling can vary across genders and individuals
- do not overclaim; keep it contextual
- ensure tone remains consumer-readable
- do not imply medical decision-making


## 3. Section-by-section: CURRENT STATE → TARGET STATE (prescriptive)

### 3.1 Peptide PDPs
#### Current state (common failure modes)
- Copy can drift toward clinical/legal disclaimers or jargon.
- Pages can feel like they are “about use” instead of “about understanding.”
- Community area (if present) tends to die at the bottom without CTA.

#### Target state
Peptide PDPs are **education-first** and “regulation-proof.”
They must:
- explain what it is, what it does (mechanism), what research shows (high-level)
- explicitly avoid implying action, timing, appropriateness, accessibility
- invite community experience at the bottom **with a strong CTA** (see Section 6)

#### Replace/insert requirements
- Remove jargon-only lines (e.g., “biologically active”).
- Replace with plain language explanations.
- Add “Community” anchor in-page nav (#community).

#### File-level instructions (expected)
- PDP route: `app/peptides/[slug]/page.tsx` (or equivalent in your repo)
- Add/insert: Community section component mount
- Add/insert: quick-nav anchor link to `#community`
- Ensure disclaimer remains centralized (not repeated here)


### 3.2 Wellness Paths
#### Current state
- Risk becoming “symptom → solution” funnels if not framed system-first.

#### Target state
Wellness Paths are **system-first educational lenses**.
They should:
- define the biological domain (sleep regulation, inflammation signaling, etc.)
- present peptides as one category among many discussed in the space
- remain valid even if peptides become regulated or unavailable

#### File-level instructions
- `app/wellness/[path]/page.tsx` (or equivalent)
- Ensure intros and headings use system-first language
- Avoid “this fixes X” language, avoid “best peptide for X”


### 3.3 Resources
#### Current state
- Can be incomplete/fragmented; lacks explicit narrative on how science evolves.

#### Target state
Resources become the “science literacy engine.”
They explicitly teach:
- how evidence evolves
- why early research isn’t final
- how regulation and consumer behavior interact
- how to read claims critically

#### File-level instructions
- `app/resources/*`
- Resources should reference peptides/blends/stacks without implying use


### 3.4 Commercial Blends (PDP-style, supplier-available combo products)
#### The problem to solve
Blends exist and users consume them. We need to explain them without endorsing them.

#### Target state
Commercial Blend pages are **market literacy artifacts**.
They explain:
- what they are
- why suppliers combine peptides
- what “compounding effects” means conceptually
- what each component peptide does (anchored to peptide PDP)
They do NOT:
- recommend
- legitimize
- imply superiority
- guide acquisition

#### Mandatory content structure for blend pages
Every blend page must include:
1) **What this blend is**
2) **Why blends like this exist**
3) **What science suggests vs what is hypothesized**
4) **Component peptides** (each anchored to peptide PDP)
5) **Combined effects (conceptual)** — framed as “discussion” and “hypothesis”
6) **What this page is not doing** (soft boundary statement; not fear-based)

#### File-level instructions
- `app/blends/[slug]/page.tsx` (or equivalent)
- Ensure each component peptide links to peptide PDP
- Ensure no CTA implies action or purchase


### 3.5 Stacks (curated + community)
#### Product distinction (locked)
- **Blends** = commercially pre-combined products
- **Stacks** = user-assembled conceptual combinations

#### Target state
Stacks must be framed as:
- theoretical constructs
- mechanistic ideas
- community discussion artifacts
Not plans, not solutions, not recommendations.

#### Explore Stacks architecture
Explore Stacks is two-lane:
1) **Pep Talk stacks** (curated/suggested)
2) **Community stacks** (approved submissions)

#### File-level instructions
- `app/stacks/*`
- Stacks submission flow (see Section 7)
- Community stacks section must show “approved” label; no hype sorting


## 4. Community knowledge: the whole scope (comments + stacks) — everything decided

### 4.1 Core principle (locked)
We are NOT here to tamp down real-world knowledge.
We are here to block **authority cosplay** (prescribing, instructing, guaranteeing).

Experience is welcome. Directives and protocols are not.


## 5. Peptide PDP Community Comments (full design + rules + auth + moderation)

### 5.1 What it is
A **page-local** comment feed on each peptide PDP where users share personal experience.

### 5.2 What it is NOT
- Not a stack builder
- Not a crowdsourced truth engine
- Not content that propagates into other sections
- Not “approved knowledge,” just community experience

### 5.3 Page-local only rule (hard lock)
Community peptide comments:
- live ONLY on that peptide page
- do not populate elsewhere
- do not create stacks
- do not change peptide content
- do not feed “recommended” anything

### 5.4 Public read + auth write (locked)
- Anyone can read comments (public read).
- Only authenticated users can post.

### 5.5 Edit/Delete (locked)
Authors can edit and delete their own comments.
Prefer soft-delete.

### 5.6 Moderation posture for peptide comments (light-touch)
- Do not censor experience language.
- Block/flag directive/protocol language.

### 5.7 Required UI copy (final, verbatim)
**Section title:** Join the Conversation

**Intro:**  
People respond differently to the same peptide.  
Share what you noticed — your experience helps build clarity for others.

**Primary CTA button:** Add your experience

**Empty state title:** Be the first to share your experience

**Empty state body:** If you’ve explored this peptide, even a short note helps others learn.

**Form placeholder:** What did you notice? Keep it personal — avoid giving directions to others.

**Helper text:** Personal experience is welcome. Please avoid instructions, schedules, or directives.

**Experience framing note:**  
The comments below reflect individual perspectives and individual experiential knowledge. People’s responses can vary, so these experiences are best understood as personal observations rather than universal outcomes.

### 5.8 Placement rules
- Add PDP nav link to `#community`
- Place section after educational content
- Add secondary CTA near end of page

### 5.9 Authentication UX rules
- Logged out: read-only + “Sign in to add your experience”
- Logged in: composer + edit/delete on own comments

### 5.10 Data model + RLS (must-have)
**Table:** `peptide_comments`
- id, peptide_id, user_id, content, created_at, updated_at, deleted_at, removed, flagged, flags
Constraints and indexes:
- index(peptide_id, created_at desc)
- char_length(content) <= 2000
RLS:
- public select (excluding removed/deleted)
- auth insert
- author update
- author soft delete via update

### 5.11 Server actions and error posture
- return `{ ok: true/false }` (no throwing)
- validate content
- revalidate PDP path after mutation

### 5.12 UI component boundaries
- section wrapper (server) + form (client)
- only modify PDP to mount component + add nav anchor


## 6. Community Stacks (UGC) — submission, validation, review, publication

### 6.1 Submission requirements (locked)
Fields:
- Stack name
- Wellness path dropdown (ties to model)
- Add peptides (max 6)
- Description
- Submitted by

### 6.2 Review flow (locked)
States:
- pending
- approved
- rejected
- needs_revision
Flow:
- submit → inbox/queue
- approve → published into Community Stacks
- reject → notify
- revision → notify and allow resubmit

### 6.3 Regex policy (final intent)
Hard block:
- dosing numbers
- schedules
- “protocol”
- “optimal”
- “guaranteed”
- “you should”
Allow experience:
- “fixed my” when personal
- “best stack” when personal

### 6.4 Explore stacks split (locked)
- Pep Talk stacks
- Approved community stacks

No trending/likes/hype sorting.


## 7. Guardrails: upgrade without breaking everything (locked)

- Additive-only changes
- No route changes
- No paywall changes
- No refactors
- No new global dependencies
- No dead UI affordances
- All actions return `{ ok: true/false }`


## 8. Chronological implementation order (dependency-aware)

A) DB/RLS  
B) server actions + validators  
C) UI components  
D) wire into PDP + nav anchor  
E) QA gates + build green


## 9. Acceptance criteria (definition of “done”)

- Global tagline updated, old “governed reference” copy removed
- Peptide PDP comments:
  - public read
  - auth post
  - author edit/delete
  - CTA + empty state + framing note
  - no propagation into stacks
- Stacks:
  - curated + approved community split
  - submissions reviewed
  - regex blocks directives/protocols/dosing
- Build green, no regressions


## 10. Final product law (never drift)
Pep Talk allows curiosity.
Pep Talk allows experience.
Pep Talk prevents authority cosplay.

END.
