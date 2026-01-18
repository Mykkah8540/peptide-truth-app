-- Peptide Truth App - Schema v1 (PostgreSQL)
-- Authoritative SQL. Apply via migration or direct execution in dev.

BEGIN;

-- Extensions (optional; safe)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===== ENUMS =====
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'peptide_status_enum') THEN
    CREATE TYPE peptide_status_enum AS ENUM (
      'approved_human',
      'investigational_human',
      'preclinical',
      'theoretical_unmanufactured'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'confidence_enum') THEN
    CREATE TYPE confidence_enum AS ENUM ('high','moderate','low','hypothesis','unknown');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'evidence_grade_enum') THEN
    CREATE TYPE evidence_grade_enum AS ENUM (
      'rct_meta',
      'rct',
      'human_interventional',
      'human_observational',
      'animal',
      'in_vitro',
      'mechanistic_only',
      'regulatory_label'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'claim_type_enum') THEN
    CREATE TYPE claim_type_enum AS ENUM (
      'overview',
      'use_case',
      'mechanism',
      'effect_benefit',
      'effect_neutral',
      'effect_adverse',
      'risk',
      'contraindication',
      'monitoring',
      'dosing_range_observed',
      'time_dynamics',
      'developmental_risk',
      'interaction_summary'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'population_group_enum') THEN
    CREATE TYPE population_group_enum AS ENUM (
      'general',
      'adolescent',
      'young_adult',
      'pregnancy',
      'lactation',
      'female',
      'male',
      'renal_impairment',
      'hepatic_impairment',
      'cardiovascular_disease',
      'psychiatric_vulnerability',
      'autoimmune_disease',
      'cancer_history',
      'athlete_high_training_load'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'interaction_target_type_enum') THEN
    CREATE TYPE interaction_target_type_enum AS ENUM ('drug_class','supplement_class','peptide');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'interaction_archetype_enum') THEN
    CREATE TYPE interaction_archetype_enum AS ENUM (
      'additive_agonism',
      'synergistic_amplification',
      'antagonism',
      'sensitization',
      'desensitization',
      'compensation_stacking',
      'masking',
      'threshold_crossing',
      'timing_mismatch',
      'distribution_mismatch',
      'clearance_competition',
      'enzyme_transporter_modulation',
      'organ_load_stacking',
      'immune_modulation_collision'
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'severity_enum') THEN
    CREATE TYPE severity_enum AS ENUM ('minimal','mild','moderate','high','critical');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'likelihood_enum') THEN
    CREATE TYPE likelihood_enum AS ENUM ('unlikely','possible','likely','very_likely');
  END IF;
END $$;

-- ===== CORE TABLES =====

CREATE TABLE IF NOT EXISTS peptides (
  id                BIGSERIAL PRIMARY KEY,
  canonical_name    TEXT NOT NULL,
  short_name        TEXT,
  description       TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT peptides_canonical_name_uniq UNIQUE (canonical_name)
);

CREATE TABLE IF NOT EXISTS peptide_aliases (
  id            BIGSERIAL PRIMARY KEY,
  peptide_id    BIGINT NOT NULL REFERENCES peptides(id) ON DELETE CASCADE,
  alias         TEXT NOT NULL,
  alias_type    TEXT, -- e.g. "code_name", "common", "legacy"
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT peptide_aliases_alias_uniq UNIQUE (alias),
  CONSTRAINT peptide_aliases_peptide_alias_uniq UNIQUE (peptide_id, alias)
);

CREATE TABLE IF NOT EXISTS peptide_structures (
  id                BIGSERIAL PRIMARY KEY,
  peptide_id        BIGINT NOT NULL REFERENCES peptides(id) ON DELETE CASCADE,
  amino_acid_seq    TEXT,     -- e.g. "H-Ala-Gly-..."
  sequence_oneletter TEXT,    -- e.g. "AG..."
  molecular_formula TEXT,
  molecular_weight  NUMERIC(12,5),
  structure_image_url TEXT,   -- optional: store external reference
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT peptide_structures_peptide_uniq UNIQUE (peptide_id)
);

-- Status history is versioned. jurisdiction can be "US", "EU", etc, or NULL for general.
CREATE TABLE IF NOT EXISTS peptide_status_history (
  id              BIGSERIAL PRIMARY KEY,
  peptide_id      BIGINT NOT NULL REFERENCES peptides(id) ON DELETE CASCADE,
  status          peptide_status_enum NOT NULL,
  jurisdiction    TEXT, -- optional, e.g. 'US', 'EU', 'GLOBAL'
  effective_from  DATE NOT NULL,
  effective_to    DATE, -- NULL means "current"
  rationale       TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT peptide_status_history_valid_range CHECK (effective_to IS NULL OR effective_to >= effective_from)
);

-- Evidence items (papers, labels, reviews, etc.)
CREATE TABLE IF NOT EXISTS evidence_items (
  id                BIGSERIAL PRIMARY KEY,
  title             TEXT NOT NULL,
  source_type       TEXT NOT NULL, -- e.g. 'pubmed', 'doi', 'fda_label', 'ema_label', 'preprint'
  source_id         TEXT,          -- PMID/DOI/URL key
  url               TEXT,
  published_date    DATE,
  evidence_grade    evidence_grade_enum NOT NULL,
  notes             TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT evidence_items_source_uniq UNIQUE (source_type, source_id)
);

-- Claims are the atomic knowledge units. They can be tied to a peptide and (optionally) a population group.
CREATE TABLE IF NOT EXISTS claims (
  id                BIGSERIAL PRIMARY KEY,
  peptide_id        BIGINT NOT NULL REFERENCES peptides(id) ON DELETE CASCADE,
  claim_type        claim_type_enum NOT NULL,
  title             TEXT, -- short header for UI
  claim_text        TEXT NOT NULL,
  population_group  population_group_enum NOT NULL DEFAULT 'general',
  confidence        confidence_enum NOT NULL DEFAULT 'unknown',
  evidence_grade    evidence_grade_enum NOT NULL DEFAULT 'mechanistic_only',
  tags              TEXT[], -- optional quick tags
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS claim_evidence_links (
  id              BIGSERIAL PRIMARY KEY,
  claim_id        BIGINT NOT NULL REFERENCES claims(id) ON DELETE CASCADE,
  evidence_item_id BIGINT NOT NULL REFERENCES evidence_items(id) ON DELETE CASCADE,
  relationship    TEXT NOT NULL DEFAULT 'supports', -- supports/refutes/neutral
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT claim_evidence_links_uniq UNIQUE (claim_id, evidence_item_id)
);

-- Risk scores are versioned per peptide; keep history, never overwrite.
CREATE TABLE IF NOT EXISTS risk_scores (
  id                   BIGSERIAL PRIMARY KEY,
  peptide_id           BIGINT NOT NULL REFERENCES peptides(id) ON DELETE CASCADE,
  risk_score           INT NOT NULL,
  severity             severity_enum NOT NULL DEFAULT 'moderate',
  likelihood           likelihood_enum NOT NULL DEFAULT 'possible',
  evidence_grade       evidence_grade_enum NOT NULL DEFAULT 'mechanistic_only',
  developmental_risk   BOOLEAN NOT NULL DEFAULT FALSE,
  unknowns_penalty     BOOLEAN NOT NULL DEFAULT TRUE,
  rationale            TEXT NOT NULL,
  effective_from       DATE NOT NULL DEFAULT CURRENT_DATE,
  effective_to         DATE,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT risk_scores_score_range CHECK (risk_score >= 1 AND risk_score <= 10),
  CONSTRAINT risk_scores_valid_range CHECK (effective_to IS NULL OR effective_to >= effective_from)
);

-- Population risk flags (structured) for quick UI callouts and filtering.
CREATE TABLE IF NOT EXISTS population_risk_flags (
  id                BIGSERIAL PRIMARY KEY,
  peptide_id        BIGINT NOT NULL REFERENCES peptides(id) ON DELETE CASCADE,
  population_group  population_group_enum NOT NULL,
  risk_level        severity_enum NOT NULL DEFAULT 'moderate',
  summary           TEXT NOT NULL,
  mechanistic_basis TEXT,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT population_risk_flags_uniq UNIQUE (peptide_id, population_group)
);

-- Reference tables for interaction targets
CREATE TABLE IF NOT EXISTS drug_classes (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT NOT NULL UNIQUE,
  description   TEXT
);

CREATE TABLE IF NOT EXISTS supplement_classes (
  id            BIGSERIAL PRIMARY KEY,
  name          TEXT NOT NULL UNIQUE,
  description   TEXT
);

-- Interaction model: one record per peptide interaction edge.
-- Targets can be drug class, supplement class, or another peptide.
CREATE TABLE IF NOT EXISTS peptide_interactions (
  id                    BIGSERIAL PRIMARY KEY,
  peptide_id            BIGINT NOT NULL REFERENCES peptides(id) ON DELETE CASCADE,
  target_type           interaction_target_type_enum NOT NULL,
  target_drug_class_id  BIGINT REFERENCES drug_classes(id) ON DELETE CASCADE,
  target_supp_class_id  BIGINT REFERENCES supplement_classes(id) ON DELETE CASCADE,
  target_peptide_id     BIGINT REFERENCES peptides(id) ON DELETE CASCADE,

  archetype             interaction_archetype_enum NOT NULL,
  severity              severity_enum NOT NULL DEFAULT 'moderate',
  likelihood            likelihood_enum NOT NULL DEFAULT 'possible',
  evidence_grade        evidence_grade_enum NOT NULL DEFAULT 'mechanistic_only',

  summary               TEXT NOT NULL,
  mechanistic_detail    TEXT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT peptide_interactions_target_chk CHECK (
    (target_type = 'drug_class' AND target_drug_class_id IS NOT NULL AND target_supp_class_id IS NULL AND target_peptide_id IS NULL)
 OR (target_type = 'supplement_class' AND target_supp_class_id IS NOT NULL AND target_drug_class_id IS NULL AND target_peptide_id IS NULL)
 OR (target_type = 'peptide' AND target_peptide_id IS NOT NULL AND target_drug_class_id IS NULL AND target_supp_class_id IS NULL)
  ),

  CONSTRAINT peptide_interactions_no_self CHECK (
    target_type <> 'peptide' OR target_peptide_id <> peptide_id
  )
);

-- Changelog for peptide records and interpretations
CREATE TABLE IF NOT EXISTS peptide_changelog (
  id            BIGSERIAL PRIMARY KEY,
  peptide_id    BIGINT NOT NULL REFERENCES peptides(id) ON DELETE CASCADE,
  change_type   TEXT NOT NULL, -- e.g. status_change, risk_update, new_evidence, correction
  summary       TEXT NOT NULL,
  detail        TEXT,
  evidence_item_id BIGINT REFERENCES evidence_items(id) ON DELETE SET NULL,
  changed_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_claims_peptide_id ON claims(peptide_id);
CREATE INDEX IF NOT EXISTS idx_claims_type ON claims(claim_type);
CREATE INDEX IF NOT EXISTS idx_claims_population ON claims(population_group);

CREATE INDEX IF NOT EXISTS idx_status_peptide_id ON peptide_status_history(peptide_id);
CREATE INDEX IF NOT EXISTS idx_risk_peptide_id ON risk_scores(peptide_id);
CREATE INDEX IF NOT EXISTS idx_interactions_peptide_id ON peptide_interactions(peptide_id);

COMMIT;
