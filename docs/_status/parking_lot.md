# Parking Lot

Deferred ideas and open questions. Nothing here is approved for build unless promoted into an authoritative spec.

---

## PDP (Deferred — v3 Standard is complete)

The following were previously parked and are now **DONE** — removed from this list:

- Hero redesign (frosted glass, 3-col grid) ✅
- Editorial hierarchy system (tabs, section weight) ✅
- "Things to Consider" functional repair (ghost typeahead, Enter-to-search) ✅
- Jump links on all PDPs ✅
- Community CTA ✅

---

## Remaining Deferred Items

### Phase B — Generic Data-Driven Panels

After 3–5 peptides have Phase A panel clones, abstract into generic `<OverviewPanel peptide={data} />` etc. Eliminates per-peptide component files. See `pdp_scaling_playbook.md` for the migration path. Not started.

### Start Here Bullets — JSON-Driven

Currently hardcoded in `page.tsx` per-peptide. Future: add `start_here: string[]` (3 items) to peptide JSON so they're data-driven. Low priority until 5+ peptides are on v3.

### Molecule Accent Visuals

Subtle scientific molecule graphics as design accents. Concept only — must be non-gimmick, ultra-restrained. Deferred until v3 propagation is well underway.

### Stack Community

Implement stack-level UGC if/when the DB + API contract is expanded. Currently UGC supports `peptide | blend` only. Deferred.

### Phase 2 UX Enhancements (blocked until Phase A scaling is stable)

- Right-rail experiments
- State-based adaptive PDP
- Advanced widgets
- Persona-based content forks
- Analytics integration

---

## Content

### Interaction Data Enrichment

Many peptides have sparse `interactions` fields in their JSON. As we scale v3 to each peptide, the `InteractionsPanel` needs a minimum of 15–20 entries per peptide. Content task, not engineering.

### Evidence Ledger Completeness

`p.evidence[]` is populated for some peptides, sparse for others. Not blocking v3 scaling (EvidencePanel uses hardcoded trial data per peptide), but eventual goal is full evidence ledger across all 92.
