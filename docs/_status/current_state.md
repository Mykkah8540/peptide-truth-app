# Pep-Talk Project – Current State
Last updated: 2026-01-20 (UTC)

## 1. Project Phase
Phase 4 – Search & Routing

## 2. What Is COMPLETE
- [x] Topics ingestion (11 topics)
- [x] Topic pages generated and validated
- [x] Entities index includes topics
- [x] Search routes include topic routes
- [x] Index rebuild pipeline passes
- [x] Deterministic search resolver routes topics (topic:<slug>)

## 3. What Is PARTIALLY COMPLETE
- [ ] De-dupe candidate list for the "sleep and circadian" path (currently returns duplicate category route)
- [ ] Decide UX when both a Topic and a Category match (ranking/selection rules)

## 4. What Is NOT STARTED
- Safety page surfacing in search
- App UI integration (mobile / desktop)

## 5. CURRENT BLOCKER (ONLY ONE)
None.

## 6. NEXT SINGLE ACTION
Fix the duplicate category candidate for "sleep and circadian", then decide the Topic vs Category precedence rule and implement it.

## 7. Files Expected to Change Next
- scripts/search/resolve_query.py
- app search UI layer

## 8. Hard Constraints
- Constitution v1 is authoritative
- No dosing endorsement language
- Deterministic ordering only
