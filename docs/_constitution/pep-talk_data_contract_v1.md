# Pep-Talk Data-to-UI Contract (v1)

Status: Authoritative (sub-constitutional)
Visibility: Internal / Private
Owner & Final Authority: Micah Carroll
Last Updated: 2026-01-19

Purpose:
This contract maps Pep-Talk JSON data → UI components deterministically so engineering never guesses.
If a field is missing, the app must follow the Missing Data Behavior rules in Section 4.

---

## 0) Canonical Sources (Read Order)

1) Unified Entities Index (navigation + discovery)
- File: content/_index/entities_v1.json
- Used for: Home lists, Explore listings, Search result groups, deep links, entity routing.

2) Peptide JSON (detail content)
- Directory: content/peptides/*.json (excluding underscore-prefixed files)
- Schema validator: scripts/validate/validate_peptide_json.py

3) Blends Registry + Blend JSON (detail + composition)
- Registry: content/blends/_index.json
- Blend stubs: content/blends/<slug>.json (excluding underscore-prefixed files)
- Validators:
  - scripts/validate/validate_blend_json.py
  - scripts/validate/validate_blends_registry_consistency.py

4) Governance (scope + completion metadata)
- File: content/_governance/coverage_checklist_v1.json
- Used for: internal QA/completeness dashboards only (not required for end-user UI v1).

---

## 1) Entity Routing (Single Source of Truth)

### 1.1 Route Keys
- entity.kind: "peptide" | "blend"
- entity.slug: string (URL-safe)

### 1.2 Entities Index Contract (content/_index/entities_v1.json)

Required top keys:
- version: string
- updated_at: string (YYYY-MM-DD)
- peptides: array
- blends: array
- counts: { peptides:int, blends:int, total:int }

Entity list entry minimal shape (peptides[] / blends[]):
- kind: "peptide" | "blend"
- slug: string
- display_name: string
- status_category: string (peptide only today; blends may be absent or "parked")
- entity_kind: string (peptide only today; blends via kind)
- taxonomy_keys: array[string]

UI usage:
- Search results group by kind using peptides[] and blends[]
- Explore results filter by taxonomy_keys
- Home “Newly Added” uses entities index ordering (or derived sort); if no timestamp, alphabetical fallback.

---

## 2) Peptide Detail Contract (content/peptides/<slug>.json)

### 2.1 Minimal required structure
Root:
- schema_version: "pdp_json_v1"
- peptide: object

peptide required keys (current validator):
- canonical_name: string
- status: object
- risk: object
- sections: object
- evidence: array

### 2.2 UI Field Mapping

#### A) Header Block (Entity Detail)
UI: Name
- peptide.canonical_name

UI: Status Badge
- peptide.status.category
  Allowed: approved_human | investigational_human | preclinical | theoretical_unmanufactured

UI: Risk Pill (1–10)
- peptide.risk.current_score (int 1–10)
Label always “Risk”
Tap opens Safety & Risk section anchored.

UI: Quick Chips (1–2)
- peptide.meta.taxonomy_keys (optional, if present) else governance taxonomy_keys derived for listing views
Note: taxonomy_keys are currently stored in governance/entities index; peptides JSON may not always contain taxonomy_keys. UI must rely on entities index for listing chips.

UI: Action Row
- Favorites/Stacks/Share are app-state features (not in JSON).

#### B) Overview Section
UI: Primary overview text
- peptide.sections.overview[0].text

UI: Overview evidence refs (anchor links)
- peptide.sections.overview[0].evidence_refs : array of evidence IDs (e.g., ["E1","E2"])

#### C) Claims Section
UI: Claims list (Benefits/Risks/Neutral grouped)
- peptide.sections.claims : array[claim]

Claim object:
- claim_type: string (benefit/risk/neutral/etc)
- text: string
- population_group: enum string
- confidence: enum string
- evidence_grade: enum string
- evidence_refs: array[string] (IDs)

Grouping rules:
- claim_type determines grouping; unknown claim_type goes to “Other”.

#### D) Safety & Risk Section
UI: Risk summary
- peptide.risk.current_score
- peptide.risk.severity
- peptide.risk.likelihood
- peptide.risk.evidence_grade
- peptide.risk.rationale
- peptide.risk.unknowns_penalty
- peptide.risk.developmental_risk

UI: Caution box (non-prescriptive)
- peptide.sections.cautions (if present) else derive a short non-prescriptive note from risk.rationale + unknowns_penalty

#### E) Mechanism Section
UI: Mechanism narrative
- peptide.sections.mechanism (if present)
Fallback: show “Mechanism not yet authored.”

#### F) Evidence Section
UI: Evidence items list
- peptide.evidence : array[evidence_item]

Evidence item required keys (validator):
- id: string (unique within peptide)
- title: string
- source_type: string
- source_id: string (PMID:xxxx or URL)
- evidence_grade: enum string

UI details:
- If source_id starts with "PMID:" show PubMed-style chip; otherwise treat as URL.

#### G) Related Section (Peptide)
UI: “Appears in blends”
- peptide.meta.appears_in_blends : array[string] (blend slugs)
If absent: hide block.

UI: “Similar”
- derived by matching taxonomy_keys in entities index.

### 2.3 Peptide Optional Meta Contract
peptide.meta (optional object):
- appears_in_blends: array[blend_slug]
- aliases: array[string] (optional future)
- taxonomy_keys: array[string] (optional future; not required today)

---

## 3) Blend Detail Contract

### 3.1 Sources
- Registry: content/blends/_index.json (blends list)
- Stub file: content/blends/<slug>.json

### 3.2 Blend Registry Entry (content/blends/_index.json)

Required per blend:
- slug: string
- display_name: string
- components: array[string] (resolved peptide slugs only)
- components_unresolved: array[string] (missing/not yet ingested components)
- taxonomy_keys: array[string]

UI usage:
- Detail header uses display_name
- Components list uses components
- Missing components shown from components_unresolved
- Explore + listing chips use taxonomy_keys

### 3.3 Blend Stub File (content/blends/<slug>.json)

Minimal expected structure (validator enforces):
- schema_version: "blend_json_v1" (or your chosen value per validator)
- blend: object

Blend object expected fields (general):
- slug
- display_name
- components
- components_unresolved
- taxonomy_keys
- overview.text
- overview.evidence_refs
- evidence (list like peptide evidence)

UI mapping mirrors peptide with these differences:
- Status badge: show “Blend” as entity type; no regulatory status unless explicitly included later.
- Claims: blend claims must reference blend evidence items (not component evidence).

---

## 4) Missing Data Behavior (Non-Negotiable)

General rule:
Never show broken UI. Prefer hiding sections with clear “Not yet authored” messaging.

### 4.1 Listing Views (Home/Search/Explore)
If taxonomy_keys missing for an entity:
- Show no chips
- Do not block display
- Explore category filtering relies on entities index; if entity lacks taxonomy keys in entities index, it will not appear in category lists.

### 4.2 Detail Views
If Overview text missing/empty:
- Show “Overview not yet authored.”
- Still show Evidence section.

If evidence_refs missing/empty:
- Show overview text but include “Evidence links not yet attached.”

If evidence list empty:
- Show “No evidence sources added yet.”
- Flag internally via governance (not user-facing).

If risk missing:
- This should never happen (validator), but if it does:
  - Hide risk pill and show “Risk not available” in Safety section.

If blend components empty but components_unresolved present:
- Show “Components pending ingestion” list and hide resolved components list.

### 4.3 Hard Errors (must fail build pipeline)
- Invalid taxonomy keys (validate_taxonomy_keys.py)
- Blend registry ↔ stubs mismatch (validate_blends_registry_consistency.py)
- Entities index invalid (validate_entities_index.py)
- Peptide JSON invalid (validate_peptide_json.py)
- Blend JSON invalid (validate_blend_json.py)

---

## 5) App-State Features (Not Stored in Content JSON v1)

These features must be implemented via local persistence (device storage) v1:
- Favorites
- Stacks (user-created)
- Recent views
- Share views (generated from content JSON + entities index)

Data model recommendations (v1 local-only):
- favorites: { entity_key -> timestamp }
  where entity_key = "<kind>:<slug>"
- stacks: array of
  - id (uuid)
  - name
  - goals: array[string]
  - items: array[entity_key]
  - notes: string
  - created_at / updated_at

---

## 6) Build Gate (Daily)
This contract assumes engineers run:
- python3 scripts/index/rebuild_all_indexes.py

