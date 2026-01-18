# Ingestion Workflow (v1)

This project stores peptide content in structured JSON first, then (later) ingests into PostgreSQL.

Principles:
- Single source of truth: the JSON record for each peptide
- Every material claim must be supported by evidence items (or explicitly labeled as hypothesis/unknown)
- No procedural instructions on sourcing, reconstitution, administration, or dosing protocols
- Dosing is stored ONLY as descriptive "observed exposure ranges" from studies, with citations

## Folder conventions

- content/peptides/<slug>.json
  Canonical peptide records (the truth source for content).
- content/sources/
  Bibliography stubs, PDFs/links list, and source metadata (optional in v1).
- scripts/validate/
  Validation scripts to prevent schema drift.
- scripts/export/
  Later: JSON -> DB seed, JSON -> API fixtures, JSON -> PDP markdown generation.

## Create a new peptide record (v1)

1) Copy the template:
   - scripts/ingest/peptide_template.json
2) Save as:
   - content/peptides/<slug>.json
3) Run validation:
   - python3 scripts/validate/validate_peptide_json.py content/peptides/<slug>.json

## Slug rules
- lowercase
- hyphen-separated
- no spaces
- examples: bpc-157, tb-500, retatrutide, semaglutide

## Minimum required fields (v1)
- peptide.canonical_name
- peptide.status.category
- peptide.status.human_use_note
- peptide.risk.current_score
- peptide.risk.rationale
- peptide.sections.overview (claim)
- peptide.evidence[] (at least 1 item if any strong claim is made)

Validation enforces required fields.
