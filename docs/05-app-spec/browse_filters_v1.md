# Browse Filters Spec v1 (Authoritative)

Goal
Allow users to explore the peptide library and topic pages using consistent filters.

## 1) Universal Filters (Available on Explore + Topic pages)
- Status category:
  - approved_human
  - investigational_human
  - preclinical
  - theoretical_unmanufactured
- Risk score range:
  - 1–3 (low)
  - 4–6 (moderate)
  - 7–10 (high)
- Developmental risk:
  - show only developmental_risk = true
  - exclude developmental_risk = true
- Evidence grade:
  - regulatory_label
  - rct_meta
  - rct
  - human_interventional
  - human_observational
  - animal
  - in_vitro
  - mechanistic_only

## 2) Optional Filters (Phase 6+)
- Route observed in studies (descriptive):
  - topical / oral / subcutaneous / intravenous / intranasal / other
- Population relevance:
  - cardiovascular_disease
  - renal_impairment
  - hepatic_impairment
  - psychiatric_vulnerability
  - autoimmune_disease
  - cancer_history
  - pregnancy/lactation

## 3) Filter Behavior Rules
- Filters do not change canonical truth; they only change visibility in lists.
- Filter selections persist during the session.
- Filters are always resettable via a single "Clear" action.
- Alphabetical ordering remains within the filtered result set.

## 4) Safety UX Rule for Filters
If user filters to:
- High risk (7–10) OR Developmental risk only
Show a neutral banner:
"These entries carry higher consequence or uncertainty. Review risk rationale and evidence before drawing conclusions."

