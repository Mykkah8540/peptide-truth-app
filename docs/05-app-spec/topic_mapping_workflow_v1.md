# Topic Mapping Workflow v1 (Tight Process)

Goal
Keep topic browsing powerful without bias or drift.

## Mapping rules
- A peptide can map to multiple topics.
- Mapping requires a rationale that describes user interest or biological relevance.
- Mapping must include a confidence + evidence_grade.
- Mapping is not a recommendation.

## Minimal workflow (repeatable)
1) Add or update peptide JSON in content/peptides/<slug>.json
2) Add mapping entry in content/topics/topic_peptide_map_v1.json
3) Commit with a message that includes the topic id(s) and peptide slug(s)

## Quality rules
- Avoid "hype" rationales
- Do not claim benefits without evidence links
- If mapping is based mainly on online popularity, label confidence low and evidence accordingly

