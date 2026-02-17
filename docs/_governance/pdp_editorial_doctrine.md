# PDP Editorial Doctrine  
Pep-Talk — Authoritative Governance Document  
Version: v1  
Status: Locked — Stability-First Doctrine Applies  

## 1. Why This Exists

Pep-Talk PDPs are not medical journals.  
They are not disclaimers.  
They are not dashboards.  
They are not hype blogs.  

They are:

Human-first educational pages for real people.

Real people arrive at a PDP because they are:

- Sick  
- Tired  
- Sore  
- Frustrated  
- Overwhelmed  
- Curious  
- Considering  
- Already experimenting  

They are not looking for jargon.
They are not looking for fear.
They are not looking for instructions.

They are looking for clarity.

This doctrine defines how we deliver that clarity without:
- Dosing
- Protocols
- Vendor bias
- Schema drift
- Visual chaos
- Academic overload

This document governs all PDP redesign work going forward.

No deviation without explicit spec revision.

## 2. Core Philosophy

### Human-First, Not Feature-First

We do not design by stacking sections.
We design by answering emotional and cognitive questions in order.

A PDP must answer, in this order:

1. What is this?
2. How strong is the evidence?
3. Why do people care?
4. What are the risks?
5. Where does this fit?
6. What tools help me interpret this?

That sequence is non-negotiable.

## 3. Structural Spine — Editorial Narrative Order

PDP Architecture v2 is:

Single-column  
Deterministic  
Mobile-first  
Narrative-driven  

No adaptive branching.
No decision-state UI.
No tabbed personality forks.
No interactive choose-your-path logic in Phase 1.

We rejected:
- State-based adaptive PDP models
- “I’m curious / considering / using” forks
- Dashboard-like posture
- Over-interactive experimentation

Reason:

Clarity beats novelty.

We are building authority, not novelty.

## Narrative Order Lock

Narrative order is fixed. A PDP must answer, in order:
1) What is this? (Hero + Overview)
2) How strong is the evidence? (Evidence Posture)
3) Why do people care? (Why People Discuss It)
4) What are the risks? (Safety & Red Flags)
5) Where does this fit? (Context + Interactions)
6) What tools help interpretation? (Utility modules)

Section class mapping is fixed:
- Primary: Hero, Overview, Evidence Posture
- Secondary: Why People Discuss It, Safety & Red Flags, Interactions, Evidence Detail
- Utility: Things-to-Consider module, optional widgets, optional anchors (Phase 2)

Phase 1 implementation boundary:
- CSS tokens + weight classes first (zero layout-break risk).
- No stateful decision-path UI (tabs/segmented/branching) in Phase 1 unless promoted into an approved spec.

## 4. Section Weight Model

Every PDP contains three visual weight layers.

### Primary Layer — Authority + Orientation

Open.  
Unboxed.  
Breathing room.  
Intellectual posture.

No `.pt-card`.

Primary sections:

1. Hero  
2. Overview  
3. Evidence Posture  

Primary establishes authority in under 10 seconds.

### Secondary Layer — Depth Without Dominance

Structured.  
Soft containers.  
Minimal borders.  
Consistent rhythm.

Secondary sections:

4. Why People Discuss It  
5. Safety & Red Flags  
6. Interactions  
7. Evidence Detail (expandable)  

Secondary informs without overwhelming.

### Utility Layer — Interpretive Tools

Subordinate.  
Visually quiet.  
Contextual.

Utility sections:

8. “Things to Consider for Your Situation”  
9. Protein & Hydration Widget (if relevant)  
10. Anchor Navigation (optional)  

Utility never competes with Hero.

## 5. Card Elimination Strategy

We are moving away from stacked-card dominance.

`.pt-card` is removed from:

- Hero
- Overview
- Evidence Posture

`.pt-card` remains (with reduced contrast) in:

- Secondary
- Utility

Not every section boxed.
Not every section elevated.

We introduce contrast zones:

Zone A — Open White (Primary)  
Zone B — Soft Elevated (Secondary)  
Zone C — Muted Background (Utility)

This creates depth without box repetition.

## 6. Hero Doctrine (Gold Standard)

Retatrutide defines the aesthetic benchmark.

Hero must include:

- Canonical name
- Status category
- Taxonomy context
- Evidence posture signal
- 1–2 sentence orientation line

Hero is not decorative.

No marketing language.
No hyperbole.
No fear.

It must:

Signal intellectual authority.
Be calm.
Be restrained.
Be confident.

## 7. Safety Repositioning

We do not lead with fear.

We do not use dramatic safety ratings.
We do not present risk scoring as spectacle.

Safety appears after:
- Overview
- Evidence posture

Safety is:

Clear  
Structured  
Proportional  
Non-alarmist  

Red flag accents are allowed.
Fear framing is not.

## 8. Evidence Philosophy

We separate:

Evidence Posture (signal)
from
Evidence Detail (citations)

Above the fold:

- High-level maturity
- Approval status
- Research density

Below the fold:

- Citation lists
- Expandable references

We do not overwhelm casual readers.
We do not hide depth from advanced readers.

## 9. Depth of Exploration

The PDP must support:

The sister  
The beginner  
The cautious  
The curious  
The biohacker  

But without fragmenting structure.

Depth is layered vertically.

Casual readers stop early.
Advanced readers scroll deeper.

No forks.
No tabs.
No alternate content stacks.

Just layered narrative.

## 10. Flow Into the PDP

Users arrive from:

Homepage  
Search  
Topic pages  
Interactions  
Stacks  

The first 10 seconds must:

Orient.
Stabilize.
Clarify.

Not overwhelm.

Primary layer accomplishes this.

Scrolling is voluntary depth expansion.

## 11. Tone Doctrine

Voice must be:

Educational  
Neutral  
Practical  
Human  
Accessible  

Avoid:

Medical intimidation  
Academic density  
Overconfidence  
Sales tone  
Alarmist tone  

Speak to a tired person at 9:30pm.
Not a research panel.

## 12. CSS Expression Doctrine

Design changes must be expressed safely.

No layout break risk.
No component mutation in Phase 1.
No schema drift.

CSS tokens introduced:

Editorial spacing tokens  
Section weight classes  
Contrast zone classes  

No JSX deletion until structure is locked.
No class removal without inspection.
No cascading deletions.

## 13. What This Is Not

Not a choose-your-path app.
Not a risk assessor.
Not a medical protocol tool.
Not a dashboard.
Not a biohacker playground.

This is clarity architecture.

## 14. Stability-First Enforcement

All changes must:

- Pass validators
- Pass build
- Avoid schema changes
- Be atomic commits
- Avoid multi-file mutation scripts
- Avoid JSX deletions without context inspection

No redesign code proceeds until:

Design Spec v2 is deterministic and approved.

## 15. Current Reality

We are in:

Scaffolding stage.

PT_PDP_POLISH_V1 and V2 are:

Visual refinements.
Not architecture.

True editorial hierarchy not yet implemented.

This document defines the direction.

## 16. Final Lock

This is the first intentional move toward a gold-standard editorial PDP system.

It must:

Be calm.
Be intelligent.
Be layered.
Be humane.
Be structured.
Be effortless.

We are not redesigning for novelty.

We are defining a new format for peptide education.

No drift.
No dilution.
No dashboard pivot.
No adaptive branching in Phase 1.

This doctrine governs all PDP architecture work.

END DOCUMENT
