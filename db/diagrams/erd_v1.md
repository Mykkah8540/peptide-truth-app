# ERD v1 (Text)

peptides (1) ────< peptide_aliases (many)
peptides (1) ────< peptide_status_history (many)
peptides (1) ────< claims (many)
peptides (1) ────1 peptide_structures (1)
peptides (1) ────< risk_scores (many, versioned)
peptides (1) ────< population_risk_flags (many)
peptides (1) ────< peptide_changelog (many)
claims (many) ────< claim_evidence_links (many) >──── evidence_items (many)

peptides (1) ────< peptide_interactions (many)
peptide_interactions targets exactly one of:
  - drug_classes (1)
  - supplement_classes (1)
  - peptides (1)  [as target_peptide_id]

Notes:
- Status and risk scores are time-versioned (effective_from/effective_to).
- Claims are the primary knowledge unit and link to evidence.
- Interaction model is structured for filtering, safety display, and future graph queries.
