# PDP Rebuild Checklist (Acceptance Criteria)

This file is authoritative.
A PDP is not “done” until it passes every item below.

## 1) Governance and Safety
- No dosing, timing, protocols, cycles, reconstitution guidance
- No “you should” language anywhere in PDP copy
- No suitability/eligibility statements (“right for you”, “safe/unsafe”)
- No hype language (“best”, “optimal”, “guaranteed”)
- No acquisition/purchase framing

## 2) Required Sections (Peptide PDP)
- Education-first core explanation (consumer readable)
- Evidence posture:
  - what is known
  - what is unclear/limited
  - why experiences vary
- “Things to Consider for Your Situation” tool is present and conforms to:
  - docs/ui/PDP_Contextual_Considerations.md
- Community comments section is present and conforms to:
  - docs/ui/Master_UI_and_Content_Polish.md (Join the Conversation copy, CTA, rules)

## 3) Layout / UX
- Mobile reads as one clean scroll (no dead ends)
- No sticky hero containers
- No sticky sidebars
- No nested scroll regions
- Desktop layout uses space meaningfully (no dead right rail)
- Community does not “die at the bottom” (clear CTA + empty state)

## 4) Linking / Navigation
- In-page anchor exists for Community (e.g., #community) if specified by the blueprint
- Any component peptide links (for blends) point to peptide PDPs
- No route changes are made for copy changes

## 5) Build & Validation Gates
- npm -C app/web run build passes
- Index/validator pipeline passes if applicable:
  - python3 scripts/index/rebuild_all_indexes.py
- git status --short is clean after commit
