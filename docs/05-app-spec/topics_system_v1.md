# Topics System v1 (App Spec)

Purpose
Topics create a robust “browse experience” so users can explore by goal or concern (muscle recovery, skin health, etc.) while preserving the core truth model:
One alphabetical peptide library where status and risk are always visible.

Core UX Rules
1) Topics are navigation, not recommendations.
2) Every topic page must show status and risk badges next to every peptide.
3) Topic pages must separate human evidence from preclinical evidence.
4) Topic pages must include safety language for adolescents when relevant.

Primary UI
A) Browse by Topic screen
- Card grid of topics
- Each card shows title + one-line description
- A search bar sits above topic cards (search across peptides + topics)

B) Topic page
Above the fold
- Topic title
- What this topic means (short, biology-first)
- Who should be extra cautious (short bullet list)
- A filter pill row: status, risk range, evidence grade, developmental risk

Main body
- Peptide groups (each group alphabetized)
- For each peptide list item: Name, status badge, risk score, developmental flag, short “why it’s here”
- A “Learn the tradeoffs” section: benefit claims cannot appear without risk context

Bottom
- Evidence notes (why data changes)
- Methodology link (risk model + evidence policy)

Data Sources
- content/topics/_topics_index.json defines the topic menu
- content/topics/topic_peptide_map_v1.json defines associations
- Topic pages can be generated later from mappings + peptide JSON truth files

Safety and Neutrality Guardrails
- No stacking guidance and no procedural instructions
- Observed exposure ranges in studies can be shown only on peptide PDPs, descriptively, with “not instructions” language
- Adolescents: topic pages must include a caution callout when peptides in that topic have developmental risk flags

Search Integration
Search must return:
- Peptides (name/alias)
- Topics (title)
- Safety concepts (adolescents, endocrine, liver, etc.) as “safety articles” later

Versioning
- Any topic taxonomy or mapping change must be committed with a changelog note
- Mappings require a rationale field to prevent silent bias
