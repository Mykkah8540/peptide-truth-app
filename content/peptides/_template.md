# Peptide PDP Template (Display Outline)

This file is a human-readable outline for how the app will present a peptide.
The canonical source of truth is the corresponding JSON record in content/peptides/.

Above the fold (most important first):
1) Name + aliases + status category (approved / investigational / preclinical / theoretical)
2) Risk score (1–10) + plain-English rationale
3) “Who should be extra cautious” (population flags)
4) High-confidence human evidence snapshot (if present)

Sections:
- Overview (what it is, what it’s not)
- Status & availability (regulatory + real-world reality note)
- Mechanism of action (known vs hypothesis)
- Human evidence (benefits / neutral / adverse)
- Preclinical evidence (animal / in-vitro)
- Hypothesized effects (clearly labeled)
- Time dynamics (onset/duration/tolerance signals)
- Risks & adverse effects
- Contraindications & pre-existing conditions
- Interactions (drug / supplement / peptide)
- Observed exposure ranges in studies (descriptive only; not instructions)
- Developmental / adolescent risk block (if triggered)
- Evidence ledger
- Changelog

Rules:
- No procedural instructions.
- Dosing/exposure content must be descriptive, evidence-linked, and clearly labeled “not instructions.”
- Adolescents get special clarity: long-term consequences and irreversibility emphasized when plausible.
