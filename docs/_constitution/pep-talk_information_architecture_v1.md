# Pep-Talk Information Architecture (IA v1)

Status: Authoritative (sub-constitutional)
Visibility: Internal / Private
Owner & Final Authority: Micah Carroll
Last Updated: 2026-01-19

This document defines the structure of the Pep-Talk product: entities, navigation, core screens, and guaranteed user journeys. UI and backend must conform.

## 1) Core Product Goal

Pep-Talk is the source-of-truth reference app for bioactive peptides and peptide-adjacent bioactives, including real-world blend/stack products.
It must support:
- High-intent lookup (user knows a peptide/blend name).
- Curiosity-driven exploration (user browses categories and discovers new items).
- Decision support (comparisons, safety framing, evidence references, and goal-oriented stack building).
- Sharing (clean, credible, readable views that export well).

## 2) Primary Entity Types

### 2.1 Entity: Peptide (single compound)
Canonical content unit. Backed by evidence list and section claims.

### 2.2 Entity: Blend (named product-like mix)
A curated object referencing components (resolved + unresolved), plus descriptive claims with evidence refs.

### 2.3 Future Entity Types (reserved)
Not required now, but IA must not block:
- Pathway / Mechanism (e.g., GLP-1, amylin, melanocortin, GHRH)
- Goal (fat loss, recovery, sleep, libido, immune modulation, skin)
- Protocol object (NOT prescribing; used for “reported use patterns” with evidence + disclaimers)
- Evidence item library (deduped cross-entity citations)

## 3) Navigation Model (Mobile-first)

Bottom tab bar (5 tabs max):

1) Home
2) Search
3) Explore
4) Stacks
5) Favorites (or Profile if we need account-based features)

Rules:
- Search and Explore are NOT the same. Search is direct intent; Explore is discovery.
- Stacks must be first-class (not buried).
- Favorites must be one tap away (or integrated into Profile if account is required).

## 4) Core Screens (Minimum v1)

### 4.1 Home (Personalized + Jump-off)
- Continue where you left off
- Recently viewed
- Trending / newly added entities (editorial, not hype)
- Suggested categories (Explore shortcuts)
- “Build a Stack” shortcut

### 4.2 Search (Direct intent)
- Single search bar with:
  - Typeahead suggestions
  - “Did you mean” spell correction
  - Results grouped by Entity Type: Peptides / Blends
- Result cards show:
  - Name
  - Entity type badge
  - Taxonomy chips (1–2)
  - Status category (approved / investigational / preclinical / theoretical)
- Tapping result goes to Entity Detail

### 4.3 Explore (Categorical discovery)  ✅ REQUIRED JOURNEY
Explore supports “I want to learn what exists”:
- Category grid (taxonomy keys):
  - Metabolic / Weight
  - Regenerative / Repair
  - Immune / Inflammation
  - Endocrine / Hormonal
  - Sexual Health / Reproduction
  - Antimicrobial / Innate Defense
  - Mitochondrial / Longevity
  - Neurocognitive / Mood
  - Cosmetic / Topical
  - Muscle / Performance
- Each category view:
  - Filter chips (entity kind, status category, delivery context)
  - Sort (evidence strength, risk score, alphabetic)
  - Mixed list: peptides + blends (clearly labeled)

### 4.4 Entity Detail (Peptide or Blend)
Shared structure with type-specific sections.

Top of screen:
- Name + badges (type, status category)
- Quick actions:
  - Favorite (heart)
  - Add to Stack
  - Share
- “Key takeaways” preview (short, non-prescriptive)

Tabs/sections:
1) Overview (what it is, why studied) + evidence refs
2) Claims (benefits/risks) with confidence + population group + evidence links
3) Safety & Risk (score 1–10 + rationale + unknowns)
4) Mechanism (plain language; no overclaims)
5) Evidence (list; open PubMed/label links)
6) For blends only:
   - Components (resolved) + unresolved components
   - “Appears in blends” crosslinks where relevant

### 4.5 Favorites
- List of favorited entities (peptides + blends)
- Filters and sort
- One-tap “Add all to stack draft” (optional)

### 4.6 Stacks (First-class)
Stacks are user-owned collections and can be goal-driven.

Stack types:
- Manual stack (user adds items)
- Generated stack (wizard creates a draft based on goals + constraints)

Stack object includes:
- Name
- Goal tags
- Entities (peptides/blends)
- Notes (user editable)
- Share/export view (clean summary + links back to detail screens)

Stack generator v1 (non-prescriptive):
- Inputs:
  - Primary goal (choose 1)
  - Secondary goal (optional)
  - Risk tolerance slider (conservative → aggressive framing, not dosing)
  - Constraints (avoid endocrine, avoid sexual, avoid injectables, etc.)
- Output:
  - “Draft stack” with explanations + evidence confidence
  - Warnings + unknowns emphasized
  - User must confirm before saving

## 5) Core User Journeys (Guaranteed)

1) Direct lookup:
- User searches “Retatrutide” → lands on Retatrutide detail → reads overview, risk, evidence → favorites or adds to stack.

2) Explore categorically (discovery): ✅ REQUIRED
- User taps Explore → selects “Regenerative / Repair” → browses peptides/blends → filters to investigational_human → opens GHK-Cu → sees blends that include it.

3) Build a stack:
- User taps Stacks → “Generate” → picks goal “recovery” → sees draft + rationale + confidence + warnings → saves.

4) Save & return:
- User favorites items, revisits from Home/Recents/Favorites.

5) Share:
- User shares an entity or stack as a clean summary link/image.

## 6) Search Relevance Requirements (v1)

Search must support:
- Exact name matches
- Partial matches
- Synonyms/aliases (PT-141 vs Bremelanotide)
- Hyphen/spacing normalization (BPC-157 vs BPC 157)
- Return blends when searching component peptides and vice versa:
  - If user searches “BPC-157”, show BPC-157 plus blends containing it (as secondary group).

## 7) Data + Taxonomy Alignment Rules

- Taxonomy keys are the canonical exploration system.
- Governance checklist is canonical scope tracking.
- Blends registry is canonical list of blends; blend stubs must exist for each registry entry.
- Peptide JSON may contain meta.appears_in_blends (computed).

## 8) Non-Negotiables

- Mobile-first UI and tap targets
- Fast navigation, minimal depth
- Evidence and uncertainty are visible (no hype)
- Clear separation: descriptive reference vs any suggestion of protocol

