# NEXT TASK (Single Active Task)

Task: UGC production hardening (no feature creep)

Goal
Keep UGC working in dev and production with clear, deterministic behavior and improved operator visibility, without changing schemas or adding new feature surfaces.

In Scope
- Production reliability plan for TLS verification and connection behavior (dev vs prod) as already defined in current_state.md
- Confirm admin UGC UI marks seen_at and that counts align with DB truth
- Improve UGC error reporting and empty states (no new schemas)

Out of Scope
- Any new UGC schemas, new post types, ratings/likes, endorsements
- Any PDP layout refactors unrelated to UGC
- Any “Phase 2” contextual widgets, home landing concepts, analytics features, or any parking-lot items unless promoted to an authoritative spec

Success Criteria
- Gates pass (validators + app/web build)
- Admin UGC workflow remains end-to-end functional (submit → pending → approve → list approved; seen_at updates)
- Errors and empty states are clearer without introducing new contracts

Plan
1) Prove current wires and gates as documented in build_best_practices.md
2) Identify the smallest UGC hardening improvement that is purely robustness/UX (errors/empty states/admin truth alignment)
3) Implement one small change-set at a time, running gates after each
4) Stop after first scoped improvement + green gates + clean commit

Verification Gates
- git status --short clean (pre)
- validators pass
- cd app/web && npm run build passes
- git status --short shows only intended changes (post)

