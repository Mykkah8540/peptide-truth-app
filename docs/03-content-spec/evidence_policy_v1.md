# Evidence Policy v1 (Authoritative)

Purpose:
Make the app defensible, auditable, and consistently truthful.

## 1) Evidence Objects
Every evidence item must be stored with:
- id (unique within a peptide record)
- title
- source_type (pubmed / pmc / doi / clinicaltrials / label / guideline / other)
- source_id (PMID, PMCID, DOI, NCT, label identifier)
- url (canonical when available)
- published_date (YYYY-MM-DD when known)
- evidence_grade (regulatory_label, rct_meta, rct, human_interventional, human_observational, animal, in_vitro, mechanistic_only)
- notes (limitations, conflicts, quality notes)

## 2) Claims Must Link to Evidence
Rule:
- Any meaningful claim should reference evidence IDs.
- If no evidence exists, the claim must be labeled hypothesis/unknown with evidence_grade mechanistic_only.

## 3) Confidence Labels (Required on Claims)
- high: replicated human evidence or strong label/guideline support
- moderate: human evidence exists but limited/heterogeneous
- low: weak human evidence or primarily observational/indirect
- hypothesis: mechanistic plausibility without human confirmation
- unknown: insufficient information to conclude

## 4) What Counts as "Human Evidence"
- rct_meta, rct, human_interventional, human_observational
- Anecdotes, forums, influencer claims do NOT count as evidence items.

## 5) Updating the Library
Triggers for a PDP update + changelog entry:
- status category changes (e.g., investigational -> approved)
- new major trials/meta-analyses
- label warnings or safety advisories
- new interaction signals of high consequence

Every update must:
- add/modify evidence items
- update risk score if necessary
- append changelog with date + summary + evidence_refs

## 6) Youth / Developmental Special Rule
If developmental_risk is true OR plausibly relevant:
- PDP must include a Developmental Risk Block
- Claims should explicitly state absence of adolescent data when true
- Risk score must include D escalation per Risk Model v1

