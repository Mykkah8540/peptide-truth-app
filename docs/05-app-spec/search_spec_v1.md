# Search Spec v1 (Authoritative)

Goal
Search is the primary entry point. It must be fast, forgiving, and truth-first:
- Users search by names/aliases/slang.
- Results must show status + risk immediately.
- Search must also surface Topics and Safety concepts.

## 1) Query Types
Search must support:
- Peptide canonical names (exact, partial)
- Aliases (exact, partial)
- Common misspellings (later: synonym dictionary)
- Topic titles (exact, partial)
- Safety concepts: "teen", "adolescent", "endocrine", "liver", "heart", "anxiety", "sleep"
  - These return Safety Pages (Phase 6) and also filter suggestions.

## 2) Result Types + Order
Results are grouped and ordered:
1) Peptides (most relevant first)
2) Topics
3) Safety Pages (Phase 6)
4) Evidence/Methodology pages (Risk Model, Evidence Policy)

Within each group, rank by:
- Exact match > prefix match > partial match
- Canonical name matches rank above alias matches
- If ties: lower risk NOT favored; neutrality (alphabetical tie-break)

## 3) Result Card Requirements (Peptides)
Every peptide result must show:
- Name (canonical)
- Alias snippet (if match was alias)
- Status badge (Approved / Investigational / Preclinical / Theoretical)
- Risk score (1–10)
- Developmental risk badge when true
- One-line truth summary (from a dedicated field later; v1 can be derived from overview)

Example:
AOD-9604
Investigational · Risk 4/10 · Developmental flag
“hGH fragment peptide marketed for fat loss; limited long-term human safety data”

## 4) Search UX Features
- Instant results as you type (debounced)
- Highlight matched text in name/alias
- Show "Did you mean" suggestions (Phase 6)
- Search history (local-only)
- Clear filters button if user filtered results

## 5) Safety Banner Trigger in Search
If query contains:
- teen / teenager / adolescent / high school / puberty
Then show an inline banner:
"Adolescents are not small adults. Many peptides affect long-term endocrine and neurodevelopmental setpoints."

No moralizing; factual and protective.

## 6) No-Instruction Rule
Search must never output procedural instructions.
Even if user types "dose", results must route to:
- observed exposure ranges (descriptive only) + risk context + evidence ledger

