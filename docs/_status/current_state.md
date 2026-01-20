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

## 3. What Is PARTIALLY COMPLETE
- [ ] Deterministic search resolver does not yet route topics

## 4. What Is NOT STARTED
- Safety page surfacing in search
- App UI integration (mobile / desktop)

## 5. CURRENT BLOCKER (ONLY ONE)
Topics exist in content/_index/search_routes_v1.json as type:"topic",
but scripts/search/resolve_query.py only handles entity and category
routes, so topics do not deep-link.

## 6. NEXT SINGLE ACTION
Update resolve_query.py to treat topic routes as entity candidates
(kind:"topic"), then add a resolver validation test.

## 7. Files Expected to Change Next
- scripts/search/resolve_query.py
- scripts/validate/validate_query_resolver.py

## 8. Hard Constraints
- Constitution v1 is authoritative
- No dosing endorsement language
- Deterministic ordering only
