# Search Routing Spec v1 (Authoritative)

Goal
Search should feel intelligent without being biased:
- Return peptides + topics
- Also route “safety intent” queries to Safety Pages
- Provide filter suggestions (status/risk/developmental) as optional chips

## 1) Safety Intent Detection (Keyword Routing)
If query includes any of these keywords, show Safety Pages at top (above peptides/topics):

A) Adolescents / Development
Keywords:
- teen, teens, teenager, adolescent, high school, puberty, under 18, youth
Route:
- safety_adolescents_development
Suggested filter chips:
- Developmental risk = ON
- Status = Approved only (optional)

B) Endocrine / Hormones
Keywords:
- hormone, endocrine, thyroid, igf, growth hormone, testosterone, estrogen, puberty
Route:
- safety_endocrine_axes
Suggested filter chips:
- Topic = Hormonal & Endocrine
- Evidence grade >= human_observational (optional)

C) Interactions
Keywords:
- interaction, combine, stack, mixing, contraindication, drug interaction, supplement interaction
Route:
- safety_interactions
Suggested filter chips:
- Risk range = 4–10 (optional)

D) Evidence / Proof
Keywords:
- evidence, studies, pubmed, rct, proof, placebo, meta analysis, clinical trial
Route:
- safety_evidence_grades
Suggested filter chips:
- Evidence grade >= human_interventional (optional)

E) Risk Score
Keywords:
- risk score, safety score, dangerous, safe, side effects, adverse
Route:
- safety_risk_scoring
Suggested filter chips:
- Risk range selector (1–3 / 4–6 / 7–10)

## 2) UI Behavior
- Show a “Safety Panel” above results when routing triggers.
- The panel includes:
  - Safety page title + 1 sentence summary
  - A “Read” button
  - Optional suggested filter chips (user-controlled)

## 3) Neutrality Rule
- Routing never blocks access to peptides.
- Routing never ranks peptides as “best.”
- Routing improves comprehension and safety.

## 4) No-Instruction Rule
- If user searches for “dose”, “protocol”, “cycle”, “reconstitution”, route them to:
  - Evidence policy + “observed exposure ranges” explanation
  - Not instructions
