# Topic List UI Spec v1 (Authoritative)

Goal
Make "Browse by Topic" a robust, enjoyable experience that drives exploration ("reach function") while staying neutral and safety-forward.

## 1) Topic List Screen Layout
- Top bar:
  - Search input (search peptides + topics)
  - Shortcut chips: "Low risk", "Approved", "Developmental caution", "Strong human evidence"
- Main:
  - Topic cards grid (2 columns mobile, 3–4 tablet/desktop)
  - Each card shows:
    - Icon
    - Title
    - One-line description
    - Optional: "Commonly searched peptides" count (later)
- Bottom:
  - Link to Methodology (Evidence policy + Risk scoring)

## 2) Sorting
Default sort = order field in _topics_index.json (curated)
Alternate sorts (optional):
- Alphabetical
- Most viewed (future analytics)
- Recently updated (future)

## 3) Topic Card Microcopy Rules
- Plain language, biology-first
- No "best peptide" language
- No marketing tone

## 4) Empty States / Edge Cases
- If a topic has no mapped peptides yet:
  Show topic anyway with a message on the topic page:
  "This topic is live. Mappings are being added with evidence and risk context."

## 5) Safety UX Integration
- If user has "Developmental caution" chip enabled:
  - Show a banner:
    "Adolescents are still developing long-term regulatory systems. Treat uncertainty as risk."
- Topic cards remain available; filters only affect lists within topic pages.

