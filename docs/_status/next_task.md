# NEXT TASK — Peptide-to-Peptide Interactions Audit

## Goal

Audit all 92 `{Compound}InteractionsPanel.tsx` files and ensure that cross-compound
interactions are represented symmetrically. If compound A lists compound B as an
interaction, compound B should list compound A.

## Background

The v3 panel build (batches 1–17) was a first-pass content build. Interactions panels
were authored per-compound with attention to drug classes, supplements, and same-class
peptides — but not with a systematic cross-reference check. The result is likely
asymmetric: Retatrutide's panel may mention BPC-157 but BPC-157's panel may not
mention Retatrutide (or may describe the interaction differently).

This matters because the stack builder and community use cases depend on bidirectional
interaction awareness.

## Approach

1. **Extract all peptide-to-peptide mentions** — scan all `InteractionsPanel.tsx` files
   for peptide names and slugs to build a directed mention graph.

2. **Identify gaps** — for each A→B mention, check whether B has an A entry.
   If not, flag as a gap.

3. **Fill gaps** — for each missing direction, add a correctly tiered interaction entry
   to the appropriate panel.

4. **Verify build is clean** after all edits.

## Out of Scope

- Changing existing interaction content (tiers, body text) unless factually wrong
- Drug/supplement interactions that aren't peptide-to-peptide
- Any schema or architecture changes

## Success Criteria

- For every peptide-to-peptide mention found in the corpus, the reverse direction exists
- Build passes clean
- No new TypeScript errors

## Verification Gates

1. `cd app/web && npm run build` — green
2. Spot-check 5–10 compound pairs that are known to interact
3. `git status --short` — only panel files changed
