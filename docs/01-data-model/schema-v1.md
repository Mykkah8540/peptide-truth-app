# Database Schema v1 (PostgreSQL)

Purpose: Create a durable “single source of truth” data foundation for a peptide knowledge platform.
Key design priorities:
- Peptide identity is canonical and stable.
- Status changes over time are versioned (no overwrites).
- Claims are separate from evidence; confidence is explicit.
- Risk scoring is explainable, versioned, and population-aware (including adolescents).
- Interactions are structured entities (drug/supplement/peptide).
- No procedural “how-to use” instructions. Dosing is stored ONLY as observed study ranges + metadata.

---

## Core Concepts

### Peptide
A canonical record with stable identifier and normalized name.

### Status History
A peptide can change status (approved → investigational, etc.). We store a timeline:
- status
- jurisdiction (optional)
- effective_from / effective_to
- rationale note

### Claims & Evidence
A “claim” is a statement (effect, risk, mechanism, etc.) with:
- claim_type (effect/risk/mechanism/contraindication/interaction_summary/etc.)
- population context (general/adolescent/etc.)
- confidence label
- links to evidence items (studies, reviews, labels)

### Risk Score
A versioned score 1–10 with explicit rationale:
- severity, likelihood, evidence_weight
- developmental_risk flag
- unknowns_penalty
- interaction_hot_zones flags

### Interactions
Structured records describing mechanistic overlap:
- interaction target category: drug_class, supplement_class, peptide
- interaction archetype: additive agonism, antagonism, timing mismatch, etc.
- severity/likelihood/evidence_grade

### Changelog
Every meaningful change is logged:
- what changed
- why
- when
- who (optional later)
- links to evidence

---

## Enumerations (enforced as PostgreSQL ENUMs)

- peptide_status_enum:
  - approved_human
  - investigational_human
  - preclinical
  - theoretical_unmanufactured

- confidence_enum:
  - high
  - moderate
  - low
  - hypothesis
  - unknown

- evidence_grade_enum:
  - rct_meta
  - rct
  - human_interventional
  - human_observational
  - animal
  - in_vitro
  - mechanistic_only
  - regulatory_label

- claim_type_enum:
  - overview
  - use_case
  - mechanism
  - effect_benefit
  - effect_neutral
  - effect_adverse
  - risk
  - contraindication
  - monitoring
  - dosing_range_observed
  - time_dynamics
  - developmental_risk
  - interaction_summary

- population_group_enum:
  - general
  - adolescent
  - young_adult
  - pregnancy
  - lactation
  - female
  - male
  - renal_impairment
  - hepatic_impairment
  - cardiovascular_disease
  - psychiatric_vulnerability
  - autoimmune_disease
  - cancer_history
  - athlete_high_training_load

- interaction_target_type_enum:
  - drug_class
  - supplement_class
  - peptide

- interaction_archetype_enum:
  - additive_agonism
  - synergistic_amplification
  - antagonism
  - sensitization
  - desensitization
  - compensation_stacking
  - masking
  - threshold_crossing
  - timing_mismatch
  - distribution_mismatch
  - clearance_competition
  - enzyme_transporter_modulation
  - organ_load_stacking
  - immune_modulation_collision

- severity_enum:
  - minimal
  - mild
  - moderate
  - high
  - critical

- likelihood_enum:
  - unlikely
  - possible
  - likely
  - very_likely

---

## Tables (High Level)

Identity
- peptides
- peptide_aliases
- peptide_structures

Status & Versioning
- peptide_status_history
- peptide_changelog

Claims & Evidence
- claims
- evidence_items
- claim_evidence_links

Risk & Flags
- risk_scores
- population_risk_flags

Interactions
- drug_classes
- supplement_classes
- peptide_interactions

---

## Guardrails (Hard Constraints)
- One canonical peptide name per peptide.
- Aliases cannot collide globally.
- Status history intervals cannot overlap for the same peptide+jurisdiction+status category timeline (enforced by application logic initially; can be strengthened later with exclusion constraints).
- Risk score must be 1–10.
- Claims require confidence and evidence grade; unknown is allowed.
- “Observed dosing ranges” must include units and route, and must be tagged descriptive-only.

---

## Future v2 (not in v1)
- Full-text search (tsvector)
- Vector embeddings for semantic search
- User accounts / saved stacks / bookmarks
- Admin moderation workflow
- Import pipeline jobs and audit logs
