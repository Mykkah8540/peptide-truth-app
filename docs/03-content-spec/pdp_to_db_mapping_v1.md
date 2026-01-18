# PDP → DB Mapping v1 (Authoritative)

Purpose:
Ensure every Peptide Detail Page (PDP) section maps to structured database fields.
This prevents narrative drift, enables search/filtering, and supports versioning.

Rule:
- UI may reorder display, but **data must remain structured** under these mappings.
- No “important” content should live only in prose without a claim/evidence/risk structure.

---

## 1) PDP Sections (Canonical) and Storage Targets

## Section 1 — Identity & Status (Above the fold)
### PDP Content
- Canonical name
- Aliases
- Current status category (and jurisdiction if applicable)
- Status “last updated”

### DB Mapping
- peptides.canonical_name
- peptide_aliases.alias (+ alias_type)
- peptide_status_history (derive current row where effective_to IS NULL)
- peptide_status_history.effective_from (status last updated)
- peptide_status_history.jurisdiction

---

## Section 2 — At-a-Glance Safety Summary (Above the fold)
### PDP Content
- Risk score (1–10)
- One-paragraph plain-English risk rationale
- High-level “who should be extra cautious” callouts

### DB Mapping
- risk_scores (current row where effective_to IS NULL)
  - risk_scores.risk_score
  - risk_scores.rationale
  - risk_scores.severity
  - risk_scores.likelihood
  - risk_scores.evidence_grade
  - risk_scores.developmental_risk
- population_risk_flags (for callouts)

---

## Section 3 — Mechanism of Action
### PDP Content
- Target receptors/pathways
- Mechanistic summary
- What is established vs hypothetical

### DB Mapping
- claims
  - claim_type = mechanism
  - claim_text = mechanism narrative
  - confidence + evidence_grade
- claim_evidence_links → evidence_items

---

## Section 4 — Observed Human Effects (Benefits / Neutral / Adverse)
### PDP Content
- Human-only outcomes and endpoints
- Effect size notes (when known)
- Timeline (when known)

### DB Mapping
- claims (multiple rows)
  - claim_type = effect_benefit / effect_neutral / effect_adverse
  - population_group = general OR specific group if study limited
  - confidence + evidence_grade = human category
- claim_evidence_links → evidence_items

---

## Section 5 — Preclinical Effects (Animal / In-vitro)
### PDP Content
- Animal outcomes
- In-vitro outcomes
- Explicit “may not translate” language

### DB Mapping
- claims (multiple rows)
  - claim_type = effect_benefit / effect_neutral / effect_adverse
  - evidence_grade = animal / in_vitro / mechanistic_only
  - confidence set accordingly
- claim_evidence_links → evidence_items

---

## Section 6 — Proposed / Hypothesized Effects
### PDP Content
- Plausible human effects inferred from mechanism or early signals
- Explicit uncertainty labeling

### DB Mapping
- claims
  - claim_type = overview OR use_case (if framed as speculative)
  - confidence = hypothesis or unknown
  - evidence_grade = mechanistic_only / animal / in_vitro
- claim_evidence_links → evidence_items (if any)

---

## Section 7 — Time Dynamics
### PDP Content
- Onset / duration / persistence
- Tolerance / sensitization signals
- “What changes over time” conceptually

### DB Mapping
- claims
  - claim_type = time_dynamics
  - confidence + evidence_grade
- claim_evidence_links → evidence_items

---

## Section 8 — Risks & Adverse Effects
### PDP Content
- Short-term risks
- Serious risks
- Known adverse effects
- Unknowns that matter

### DB Mapping
- claims (multiple)
  - claim_type = risk
  - claim_type = contraindication (when applicable)
  - population_group used if risk applies to a specific group
- population_risk_flags (for structured high-risk groups)
- claim_evidence_links → evidence_items

---

## Section 9 — Interactions (Drug / Supplement / Peptide)
### PDP Content
- Interaction warnings
- Mechanistic collisions
- “Stack risk” summary without instructions

### DB Mapping
- peptide_interactions (multiple)
  - target_type + target_*_id
  - archetype
  - severity/likelihood/evidence_grade
  - summary + mechanistic_detail
- claims
  - claim_type = interaction_summary (optional narrative wrapper)
- claim_evidence_links → evidence_items

---

## Section 10 — Pre-existing Condition Map
### PDP Content
- Condition-specific cautions
- Physiologic explanations
- Highlight contraindications

### DB Mapping
- population_risk_flags (where a condition maps to population_group enums like renal_impairment, hepatic_impairment, cardiovascular_disease, psychiatric_vulnerability, autoimmune_disease, cancer_history)
- claims
  - claim_type = contraindication / risk / monitoring
  - population_group set as relevant

---

## Section 11 — Developmental / Adolescent Risk Block
### PDP Content
- Why adolescents differ
- Irreversibility / setpoint framing
- Specific axis risks (endocrine, growth, neurodevelopment)
- Explicit absence of adolescent data when true

### DB Mapping
- risk_scores.developmental_risk = true (current)
- population_risk_flags
  - population_group = adolescent
  - risk_level + summary + mechanistic_basis
- claims
  - claim_type = developmental_risk
  - population_group = adolescent
  - confidence + evidence_grade

---

## Section 12 — Evidence Ledger (Sources)
### PDP Content
- Study list
- Regulatory labels
- Notes on study quality and limitations

### DB Mapping
- evidence_items
- claim_evidence_links
- claims.evidence_grade + confidence (as summary labels)

---

## Section 13 — Versioning & Changelog
### PDP Content
- What changed and why
- Dates of changes
- Evidence triggering change

### DB Mapping
- peptide_changelog
  - change_type
  - summary
  - detail
  - evidence_item_id (optional)
  - changed_at
- peptide_status_history effective_from/effective_to changes
- risk_scores effective_from/effective_to changes

---

## 2) Required “Atomic Units” Rule

Any meaningful statement must be represented as at least one of:
- a claim (claims table)
- a risk score version (risk_scores)
- an interaction edge (peptide_interactions)
- a population flag (population_risk_flags)
- an evidence item (evidence_items)

Prose is allowed, but only as a wrapper around structured entries.

---

## 3) API View (Conceptual Output Shape)

A peptide PDP served by API should include:
- peptide: identity + aliases + structure
- status: current + history
- risk: current + history + population flags
- claims: grouped by section and tagged with evidence links
- interactions: grouped by target type
- evidence: de-duplicated ledger
- changelog: chronological

No procedural instructions are returned.
Observed study exposure ranges are descriptive only, labeled, and linked to evidence.
