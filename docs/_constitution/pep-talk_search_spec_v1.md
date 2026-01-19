# Pep-Talk Search Relevance Spec (v1)

Status: Authoritative (sub-constitutional)
Visibility: Internal / Private
Owner & Final Authority: Micah Carroll
Last Updated: 2026-01-19

Purpose:
Search must feel instantaneous, obvious, and “smarter than the user” without hallucinating.
This spec defines: what search indexes, how it ranks, how it handles partial knowledge, and how it routes.

---

## 1) Core User Journeys (Guaranteed)

### J1 — “I know the name (or close to it)”
Example: “Retatrutide”, “bpc”, “tesa”, “PT141”
Expected outcome:
- Exact/near-exact entity appears at top
- One tap opens the entity detail page

### J2 — “I know the goal / category”
Example: “recovery”, “sleep”, “immune”, “fat loss”, “skin”
Expected outcome:
- Results show category cards (Explore shortcuts) + matching entities
- User can pivot into Explore lists for discovery

### J3 — “I know a blend/stack name”
Example: “GLOW”, “KLOW”, “CJC/IPA”
Expected outcome:
- Blend appears at top
- Blend detail shows components (resolved + unresolved) and related entities

### J4 — “I know a symptom / use-case phrase”
Example: “anxiety”, “libido”, “wound healing”, “melasma”
Expected outcome:
- Results show entities whose OVERVIEW/CLAIMS contain that phrase
- No clinical advice; just navigation to content

### J5 — “Explore categorically (Discovery)”
Expected outcome:
- Explore entry points are visible without searching
- Search also surfaces Explore categories when user types a category-ish term

---

## 2) Search Surface (UI Contract)

Search UI must provide 3 layers:

### 2.1 Instant Suggestions (typeahead)
- Appears after 1–2 characters
- Shows top 5 results
- Includes:
  - Entities (peptides/blends)
  - Categories (Explore shortcuts)
  - Alias suggestions (if available)

### 2.2 Full Results Page
- Grouped sections:
  1) Best Match
  2) Peptides
  3) Blends
  4) Categories (Explore)
  5) Text Matches (Overview/Claims)
- Each section shows “See all” when > N results

### 2.3 Zero-Result Handling
- Show:
  - “Did you mean…” suggestions (string similarity)
  - Category shortcuts
  - “Browse all peptides” and “Browse all blends”
- Never dead-end.

---

## 3) Data Inputs (Authoritative)

### 3.1 Entities list + basic metadata
- content/_index/entities_v1.json
Fields used:
- kind
- slug
- display_name
- taxonomy_keys

### 3.2 Peptide content for text search
- content/peptides/<slug>.json
Fields used for text matching:
- peptide.canonical_name
- peptide.meta.aliases (future)
- sections.overview[].text
- sections.claims[].text
- evidence[].title (low weight)

### 3.3 Blend content
- content/blends/_index.json
Fields used:
- display_name
- components
- components_unresolved
- taxonomy_keys
Plus blend stub text fields (if authored):
- overview.text
- claims[].text

### 3.4 Taxonomy vocabulary (category labels + synonyms)
- content/_taxonomy/peptide_categories_v1.json
- content/_taxonomy/blend_categories_v1.json
Plus Search Synonyms Dictionary (new file; see Section 8)

---

## 4) Ranking Rules (Deterministic)

### 4.1 Normalization (apply to query + candidate strings)
- lowercase
- trim
- collapse spaces
- remove punctuation except hyphen
- treat “+”, “/”, “&” as separators (for blends)
- normalize common tokens:
  - “pt 141” => “pt-141”
  - “ghkcu” => “ghk-cu”
  - “cjc ipa” => “cjc ipamorelin”
  - “tb500” => “tb-500”
  - “bpc157” => “bpc-157”
  - “nad+” => “nad plus” and “nad+”

### 4.2 Scoring Model (high-level)
Total score = max of these signals, with tie-breakers:

A) Exact slug match (highest)
- query == slug  => top result

B) Exact display_name match
- query == display_name normalized

C) Prefix match
- display_name startswith query
- slug startswith query

D) Token match
- all tokens present in any order

E) Alias match (when available)
- matches peptide.meta.aliases
- matches synonym dictionary

F) Category intent match
- query matches taxonomy label/synonym
- returns category card high in results (not above exact entity match)

G) Text match (overview/claims)
- query tokens appear in text fields
- weighted lower than name matches

### 4.3 Tie-breakers
1) Name match beats text match
2) Exact beats prefix beats token
3) Peptide beats blend when query looks like a single compound
4) Blend beats peptide when query includes separators (“/”, “+”, “stack”, “blend”)
5) If still tied: alphabetical by display_name

---

## 5) Blend-Aware Search Behavior

### 5.1 When query suggests a blend
If query contains:
- “/” or “+” or “stack” or “blend”
Then:
- prioritize blends section
- also show component peptides as secondary results

### 5.2 When user searches a component
If peptide has peptide.meta.appears_in_blends:
- show “Appears in blends” inline under the peptide search card (1–2 blends max)

### 5.3 Unresolved components
If blend has components_unresolved:
- show “Includes unresolved components: X, Y” but do not break the experience
- user can still favorite/share the blend

---

## 6) Category-Aware Search Behavior (Discovery)

### 6.1 Category cards
If query matches:
- taxonomy label (e.g., “Immune / Inflammation”)
- taxonomy key synonym (e.g., “immunity” -> immunomodulatory_inflammation)
Return:
- category card in Categories section
- top entities within that category (from entities_v1.json taxonomy_keys)

### 6.2 Category-first search intent
If query is short and category-ish (e.g., “sleep”, “skin”, “longevity”):
- show 1–2 category cards above text matches
- but never above an exact compound match

---

## 7) Safety / Trust Requirements (Search)

Search must never:
- generate new peptides/blends
- infer dosing
- offer protocols
- claim outcomes not present in the content JSON

Search may:
- surface existing content
- recommend navigation paths (“Browse by category”)
- show synonyms/aliases as suggestions

---

## 8) Required New Asset: Search Synonyms Dictionary (v1)

Create:
- content/_taxonomy/search_synonyms_v1.json

Purpose:
- Map common terms -> canonical entity slug(s) and/or taxonomy key(s)
- Improve “I know a little” queries

Shape:
{
  "version": "v1",
  "updated_at": "YYYY-MM-DD",
  "entity_synonyms": [
    { "term": "pt141", "slugs": ["bremelanotide"] },
    { "term": "pt-141", "slugs": ["bremelanotide"] },
    { "term": "tesa", "slugs": ["tesamorelin"] },
    { "term": "tb500", "slugs": ["tb-500"] },
    { "term": "nad+", "slugs": ["nad-plus"] }
  ],
  "category_synonyms": [
    { "term": "immunity", "taxonomy_keys": ["immunomodulatory_inflammation"] },
    { "term": "recovery", "taxonomy_keys": ["regenerative_repair"] },
    { "term": "sleep", "taxonomy_keys": ["sleep_recovery"] }
  ],
  "blend_synonyms": [
    { "term": "cjc/ipa", "blend_slugs": ["cjc-ipamorelin"] },
    { "term": "glow", "blend_slugs": ["glow"] }
  ]
}

Rule:
- synonyms are additive; they do not override exact matches

---

## 9) Implementation Notes (Engineering)

- Use entities_v1.json as the primary list to search over for names/slugs.
- Use peptide_search_index_v1 (existing) for text matching; if it only indexes peptides, add blend index later.
- Search must be fast on mobile:
  - pre-load index at app start
  - use in-memory search structures
  - debounce input (150–250ms)
- Every result must be a valid deep link:
  - peptide:<slug>
  - blend:<slug>
  - category:<taxonomy_key>

---

## 10) Acceptance Tests (v1)

Name searches:
- “bpc” => BPC-157 top
- “tb500” => TB-500 top
- “pt141” => Bremelanotide top with “aka PT-141” suggestion (via synonyms)
- “tesa” => Tesamorelin top
- “nad+” => NAD+ top

Blend searches:
- “glow” => GLOW blend top
- “cjc/ipa” => CJC-1295 / Ipamorelin blend top

Category searches:
- “immune” => category card + immune-related entities
- “sleep” => category card + DSIP etc.

Text searches:
- “anxiety” => Selank/Semax appear (if claims/overview include it)

Zero results:
- “retatrutode” (misspelling) => suggests “retatrutide” if present; otherwise category suggestions.

