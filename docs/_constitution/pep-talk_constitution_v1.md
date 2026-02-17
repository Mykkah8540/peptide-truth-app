# Pep-Talk Product Constitution (v1)

Status: Authoritative
Visibility: Internal / Private
Owner & Final Authority: Micah Carroll
Last Updated: 2026-01-19

---

NOTE:
This file is the constitutional source of truth for Pep-Talk.
All product, UI, data, and AI decisions must conform to it.
Public users never see this file.

---

# Pep-Talk Product Constitution (v1)

**Status:** Authoritative  
**Visibility:** Internal / Private  
**Owner & Final Authority:** Micah Carroll  
**Last Updated:** 2026-01-19  

---

## 0. Purpose of This Document

This document is the **constitutional source of truth** for the Pep-Talk project.

All decisions related to:
- Data structure
- Taxonomy
- UI / UX
- Search behavior
- AI assistance
- Feature scope
- Governance
- Validation rules
- Ethical boundaries

**must conform to this constitution**.

If any future feature, design, automation, or AI behavior conflicts with this document, **the feature is wrong — not the constitution**.

This file is **never exposed to end users**.  
It exists to ensure Pep-Talk remains coherent, trustworthy, and best-in-class over time.

---

## 1. What Pep-Talk Is

Pep-Talk is a **neutral, evidence-aware, structured knowledge system** for:

- Bioactive peptides  
- Peptide-adjacent compounds  
- Commercially known peptide blends  
- Mechanistic and categorical understanding  

Pep-Talk is:
- A **reference**
- A **learning system**
- A **navigation engine**
- A **discovery platform**

Pep-Talk is **not**:
- A clinic
- A prescribing tool
- A protocol generator
- A dosing guide
- A medical authority

---

## 2. Core Philosophy

### 2.1 Trust Over Persuasion
Pep-Talk never persuades, sells, promotes, or optimizes for engagement at the cost of truth.

Clarity > hype  
Structure > anecdotes  
Evidence > influencer knowledge  

### 2.2 Neutrality
Pep-Talk does not:
- Recommend usage
- Advocate stacks
- Suggest dosing
- Optimize outcomes

Pep-Talk **describes reality as accurately as possible**, including uncertainty.

---

## 3. Core User Archetypes (Guaranteed)

Pep-Talk must **always** support all of the following users:

### 3.1 The Explorer
- Has curiosity
- May not know peptide names
- Wants to browse by category
- Wants exposure to new concepts

### 3.2 The Informed Seeker
- Knows a peptide name (e.g., “Retatrutide”)
- Wants structured, accurate information
- Wants context, not hype

### 3.3 The Organizer
- Wants to favorite peptides
- Wants to build personal stacks (conceptual)
- Wants to compare or group entities
- Wants to save and share information

### 3.4 The Professional / Research-Oriented User
- Wants clean structure
- Wants evidence references
- Wants taxonomy consistency
- Wants non-opinionated framing

---

## 4. Core User Journeys (Guaranteed)

Pep-Talk **must** support all of the following journeys without friction.

### 4.1 Search-First Journey
User:
- Searches a peptide or compound by name
- Lands on a clean, authoritative entity page
- Can immediately understand:
  - What it is
  - Where it fits
  - What is known
  - What is uncertain

### 4.2 Category-First Exploration
User:
- Browses by category (e.g. Recovery, Performance, Skin, Metabolic, Immune)
- Discovers peptides and blends naturally
- Can drill down progressively without overload

### 4.3 Learning Expansion
User:
- Starts with one peptide
- Sees related peptides, categories, or blends
- Expands understanding without being pushed

### 4.4 Organization & Sharing
User:
- Favorites entities
- Creates personal stacks (non-prescriptive)
- Shares links or summaries with others

---

## 5. Taxonomy Is Sacred

Taxonomy is **not cosmetic** — it is foundational.

Rules:
- All taxonomy keys must be centrally defined
- No free-text categorization
- No UI-only categories
- No hidden or ad-hoc groupings

If a concept cannot be expressed cleanly in taxonomy, the taxonomy must be evolved — not bypassed.

---

## 6. Peptides vs Blends (Hard Boundary)

### 6.1 Peptides
- Single molecular entities
- Have their own evidence, risk, and classification
- Stand alone

### 6.2 Blends
- Represent **reported combinations**, not recommendations
- May include unresolved or unavailable components
- Are always secondary to their component peptides
- Must clearly indicate uncertainty and composition gaps

Pep-Talk **never implies efficacy** from a blend’s existence.

---

## 7. Evidence & Uncertainty Rules

Every entity must:
- Reference evidence sources where possible
- Clearly indicate evidence grade
- Explicitly surface uncertainty

Unknown ≠ hidden  
Speculative ≠ implied fact  

---

## 8. Risk Framing

Risk is:
- Descriptive
- Contextual
- Non-alarmist

Pep-Talk does not scare users, but it does not protect them from reality.

---

## 9. UI / UX Non-Negotiables

### 9.1 Mobile-First
Pep-Talk is primarily a **phone app**.

All UI decisions must assume:
- One-handed use
- Vertical navigation
- Fast scanning
- Minimal cognitive load

### 9.2 Best-in-Class Navigation
Users must always know:
- Where they are
- How they got there
- Where they can go next

No dead ends.  
No hidden pathways.

### 9.3 Visual Tone
- Calm
- Clean
- Modern
- Trustworthy
- Scientific but not clinical

Ugly or confusing UI invalidates the product — regardless of data quality.

---

## 10. Search Is a Core Feature (Not an Add-On)

Search must:
- Be fast
- Be forgiving
- Surface relevant entities
- Support synonyms and partial knowledge
- Help users *find*, not just *match*

Search failure is product failure.

---

## 11. Personalization Without Manipulation

Users may:
- Favorite entities
- Save stacks
- Organize knowledge

Pep-Talk must **never**:
- Push engagement loops
- Optimize for addiction
- Use dark patterns

---

## 12. AI Behavior (When Present)

If AI is used:
- It must reference structured data
- It must respect uncertainty
- It must never hallucinate confidence
- It must never override taxonomy or evidence

AI assists navigation and understanding — **not authority**.

---

## 13. Governance & Change Control

All changes must:
- Pass validation gates
- Preserve backward compatibility where possible
- Be explainable in terms of this constitution

If a future contributor disagrees with this constitution:
- They may propose changes
- They may not bypass it

Final authority rests with **Micah Carroll**.

---

## 14. Success Definition

Pep-Talk is successful when:
- Users trust it
- Professionals respect it
- Beginners understand it
- It scales without losing integrity

Growth without trust is failure.

---

## 15. Closing Statement

Pep-Talk is built to outlast trends, influencers, and hype cycles.

It is designed to be:
- Calm in a noisy space
- Structured in a chaotic domain
- Honest where others speculate

This constitution exists so the product **never forgets why it exists**.

---



## Architectural References

The following documents define the canonical runtime wiring and data contracts of the application:

- docs/_architecture/pdp_plumbing_map_v1.md  
  Authoritative PDP, search, synonym, risk, support, comments, and UGC plumbing map.


## Governance References

The following documents are governance-critical and must be treated as non-driftable unless explicitly revised under a deliberate governance change:

- docs/_governance/pdp_contract_v1.md
- docs/_governance/pdp_editorial_doctrine.md
- docs/_governance/design_spec_v2_pdp_editorial_architecture.md
- docs/_governance/pdp_hero_v2_spec.md
- docs/_governance/pdp_hero_build_governance_chat42.md
