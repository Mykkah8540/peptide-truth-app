# Pep-Talk Screen Spec (v1)

Status: Authoritative (sub-constitutional) — **SECTION 2.4 PARTIALLY SUPERSEDED**
Visibility: Internal / Private
Owner & Final Authority: Micah Carroll
Last Updated: 2026-01-19

> **NOTE on Section 2.4 (Entity Detail):** The PDP layout described in section 2.4 — including old tab labels (Overview/Claims/Safety & Risk/Mechanism/Evidence/Related) and "Risk score 1–10" — is superseded by the v3 tab system. See `docs/_governance/pdp_v3_standard.md` for the current PDP design. All other sections of this document (global nav, home, search, explore, favorites, stacks) remain authoritative.

This document defines the exact screens, navigation, and component blocks for Pep-Talk (mobile-first). It is the UI/UX contract for implementation.

## 1) Global Navigation

### 1.1 Bottom Tabs (5 max)
1) Home
2) Search
3) Explore
4) Stacks
5) Favorites

Rules:
- Tabs persist across main app screens.
- Each tab has a root screen and supports deep navigation within that tab stack.
- Back navigation returns to prior screen within the same tab stack.

### 1.2 Global Top Bar (pattern)
- Title (or Search input on Search screen)
- Right-side actions (contextual): Share, Favorite, More
- No clutter: max 2 icons in top bar at once unless in overflow menu.

### 1.3 Global Entity Chips / Badges (reusable UI elements)
- Entity Type Badge: Peptide / Blend / Bioactive (Non-Peptide) / Hormone Complex
- Status Badge: Approved Human / Investigational Human / Preclinical / Theoretical
- Taxonomy Chips (1–2 shown on cards; full list on detail)
- Risk Score Pill: 1–10 (always with label “Risk” and tap for explanation)

## 2) Core Screens (Required)

### 2.1 Home (Root)
Purpose: quick return, personalization, jump-off.

Components (top → bottom):
- Header: “Pep-Talk”
- Section: Continue
  - List of 1–5 recently viewed entities (peptides/blends)
- Section: Quick Actions (icon buttons)
  - Search
  - Explore Categories
  - Build a Stack
  - Favorites
- Section: Discovery (editorial)
  - “Newly Added” carousel (entities)
  - “Trending Searches” list (optional, not hype)
- Section: Category Shortcuts (grid 2x4)
  - shows 8 taxonomy categories; “All Categories” link

Empty states:
- If no recents: show Search + Explore call-to-action cards.

### 2.2 Search (Root)
Purpose: direct lookup.

Components:
- Search bar (autofocus optional)
- Suggestion panel (when empty):
  - Recent searches
  - Popular entities
  - “Browse by category” shortcut
- Typeahead results (as you type)
- Results page (on submit):
  - Section: Peptides (count + list)
  - Section: Blends (count + list)
  - Optional: “Related” (aliases/synonyms)

Result card fields:
- Name
- Type badge
- Status badge
- 1–2 taxonomy chips
- Optional microtext: primary known alias (PT-141 -> bremelanotide)

Search relevance rules:
- Exact match pinned
- Alias match next
- Partial/contains next
- If query matches component slug, include related blends section

Empty results:
- “No matches”
- Offer: “Did you mean…” suggestions
- Offer Explore categories + report missing term

### 2.3 Explore (Root) ✅ Required Journey
Purpose: categorical discovery.

Explore Root Components:
- Header: Explore
- Category grid (2 columns, full list)
  Taxonomy keys v1:
  - metabolic_weight
  - regenerative_repair
  - immunomodulatory_inflammation
  - endocrine_hormonal
  - sexual_health_reproduction
  - antimicrobial_innate
  - mitochondrial_longevity
  - neurocognitive_mood
  - cosmetic_topical
  - muscle_performance
  - other_misc

Category Listing Screen Components:
- Title: category label
- Filter row (chips):
  - Entity Kind: Peptide / Blend / All
  - Status: Approved / Investigational / Preclinical / Theoretical / All
  - Delivery context: systemic/local/topical/cns (optional if available)
- Sort dropdown:
  - Evidence strength (default for category)
  - Risk score
  - Alphabetical
- Results list (cards)

Empty state:
- “No items match filters” with clear reset filters button.

### 2.4 Entity Detail (Shared Layout)
Applies to Peptide and Blend with type-specific blocks.

Top block:
- Name
- Badges row: Entity Type + Status + Risk pill
- Action row:
  - Favorite toggle
  - Add to Stack
  - Share
- “Key Takeaways” (3 bullets max; no prescriptive directives; observational transparency allowed when lane-separated)

Content Tabs (or stacked sections with anchors; pick one pattern and stick to it):
A) Overview
B) Claims
C) Safety & Risk
D) Mechanism
E) Evidence
F) Related

Overview:
- 1–3 paragraphs
- Evidence refs (tap → Evidence tab, anchored)
- “Common names / aliases”

Claims:
- Two groups:
  - Potential benefits
  - Potential risks / adverse effects
Each claim card:
- claim_type badge (benefit/risk/neutral)
- text
- population_group tag
- confidence tag
- evidence grade label
- evidence refs list (tap to open source)

Safety & Risk:
- Risk score 1–10 + explanation
- severity, likelihood, evidence_grade
- rationale
- unknowns_penalty + developmental_risk
- “Who should be cautious” (non-prescriptive)

Mechanism:
- Plain-language summary
- Pathways/targets if known
- “What’s known vs unknown” box

Evidence:
- List of evidence items
- Each item displays:
  - title
  - source_type
  - evidence_grade
  - year/published_date if available
  - open link action
- Grouping optional: Regulatory / PubMed / Websites

Related:
- Appears in blends (if peptide.meta.appears_in_blends exists)
- Similar entities (same taxonomy keys)
- For blends: component entities list

Blend-specific section blocks:
- Components (resolved)
  - each component card links to peptide detail
- Components Unresolved
  - show missing slugs clearly; no links
- Blend registry metadata (if present): display_name, taxonomy_keys
- “What this blend is” (descriptive only)
- Evidence list for blend claims (separate from components)

### 2.5 Favorites (Root)
Purpose: saved items.

Components:
- Segmented control: All / Peptides / Blends / Stacks (optional)
- Sort: Recent / Alphabetical / Risk
- List of favorited entities
- Bulk actions (optional): add selected to stack

Empty state:
- “No favorites yet” with shortcuts to Search and Explore.

### 2.6 Stacks (Root)
Purpose: build, save, generate, share.

Stacks Root Components:
- Header: Stacks
- Primary CTA buttons:
  - Create Stack
  - Generate Stack (Wizard)
- List of stacks:
  - Stack name
  - Goal tags
  - # of items
  - last updated

Stack Detail Screen Components:
- Title + actions: Share / Edit
- Goal tags
- Items list (peptides/blends mixed)
- Notes section
- “Warnings / Unknowns” (auto-generated summary from included items’ risk framing)
- Button: Export Share View

Create Stack Flow:
- Name
- Goal tags
- Add items (opens Search overlay + Explore picker)

Generate Stack Wizard (v1, non-prescriptive):
Step 1: Pick primary goal
Step 2: Pick secondary goal (optional)
Step 3: Constraints toggles (avoid certain taxonomy areas)
Step 4: Risk tolerance slider (conservative ↔ aggressive framing)
Step 5: Draft result (explanations + confidence + warnings)
Step 6: Save as Stack

Share Views:
- Entity share view: name + key takeaways + risk + top evidence links
- Stack share view: name + goals + list + summarized cautions + references

## 3) Non-Negotiable UX Requirements

- Mobile-first spacing and typography
- Large tap targets (44px minimum)
- Fast perceived load: skeleton loaders, optimistic UI for favorites
- Clear empty states everywhere
- Zero hype language; clear uncertainty
- Any user-facing “generator” output must label uncertainty and avoid protocols

## 4) Implementation Notes (Engineering Contract)

- All lists must support:
  - pagination or virtualization
  - stable sort order
- Search index must be rebuilt by scripts/index/rebuild_all_indexes.py
- Entities index (content/_index/entities_v1.json) becomes the canonical list for UI navigation.
- Favorites + Stacks require persistent storage:
  - v1 local-only (device storage)
  - v2 optional accounts / sync

