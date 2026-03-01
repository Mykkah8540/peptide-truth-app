# PDP v3 Standard — Site-Wide Design
Status: **Active Standard** (as of 2026-02-27)
Applies to: All peptide PDPs (Retatrutide is the built benchmark; all others to be migrated)
Supersedes: `pdp_hero_v2_spec.md`, `pdp_layout_v1.md`, `design_spec_v2_pdp_editorial_architecture.md` (all archived to `_vault/`)

---

## North Star

The PDP is the trust engine. It must feel calm, intentional, layered, human.

It must answer in the first 10 seconds:
1. What is this?
2. Will it actually do what I'm hoping for?
3. What do I need to know to be safe?
4. What's still unknown?

It must not feel like a medical journal, a vendor page, or a safety spectacle.

---

## Page Structure

```
<main .pt-benchmark>
  ├── Hero (.reta-hero-v2)                    — full-width gradient identity block
  ├── Body (.reta-body-tabs)
  │   ├── Start Here strip (.reta-start-strip) — 3 orientation bullets, always visible
  │   ├── Sticky tab unit (.reta-tabs__sticky-unit)
  │   │   ├── Tab bar (.reta-tabs__bar)         — frosted glass pill, sticky top: 60-70px
  │   │   │   └── Button row (.reta-tabs__bar-scroll) — horizontally scrollable
  │   │   └── Swipe hint (.reta-tabs__hint)     — mobile only, tab tongue below bar
  │   └── Tab panels (.reta-tabs__panel)
  │       ├── #overview   — what it is, who it fits, timeline, comparison
  │       ├── #evidence   — trial data, mechanisms, honest gaps, real-world observations
  │       ├── #safety     — side effect grid, mitigation playbook, red lines
  │       ├── #interactions — searchable + filterable 37-entry interaction map
  │       └── #considerations — contextual search (ghost typeahead + Enter to commit)
  └── Community (.reta-community)             — below tabs, always visible
```

---

## Hero Composition

### Layout (desktop: 3-column grid; mobile ≤999px: single column)
- **Col 1 (~190px):** VialImage (slug-specific PNG, falls back to `_generic.svg`)
- **Col 2 (1fr):** H1 canonical title + frame sentence + quick-jump nav + "For your situation" CTA
- **Col 3 (~320px):** Single frosted glass card (Status chip / Context chip / Evidence grade / Disclaimer)
- **Row 2 (spans cols 1–2):** "For your situation" pill button → `#considerations`

### Mobile hero addendum
- Small inline vial image (`<slug>-sm.png`, 70×105px portrait) appears left of H1 in title row
- Columns collapse to single stack; "For your situation" button becomes full-width

### Hero content rules
- H1: Playfair Display 900, ~clamp(44px, 5vw, 62px), `--reta-navy`
- Frame sentence: calm single-sentence orientation ("What it is, why people care, what to watch for…")
- No risk scores, no letter grades, no numeric scoring anywhere
- Evidence grade: use `evidenceGradeLabel()` from `lib/riskIndex` — one plain-language sentence

---

## Tab System

### Tab IDs and labels
| id | label | content |
|---|---|---|
| `overview` | Overview | Decision tool: stats, fit matrix, timeline, comparison |
| `evidence` | Evidence | 3-lane: signals, trial data, mechanism, gaps, observed |
| `safety` | Safety | Side effect grid, mitigation playbook, red lines |
| `interactions` | Interactions | Searchable 37-entry map with category filters |
| `considerations` | For You | Ghost typeahead contextual search + support layer |
| `community` | Community | Scroll anchor (content: null) → scrolls to community section |

### Tab behavior
- Client component (`PDPTabs.tsx`) with `useState` for active tab
- `history.replaceState` updates URL hash on click (no page reload, no scroll jump)
- `hashchange` listener: activates correct tab from URL hash (hero jump links work)
- Inactive panels: `display: none` via `.reta-tabs__panel--hidden` (in DOM for SEO)
- Community tab: `content: null` → triggers `scrollIntoView` instead of panel swap

### Sticky behavior
- `.reta-tabs__sticky-unit`: `position: sticky; top: 70px (desktop) / 60px (mobile); z-index: 40`
- Bar is NOT itself sticky — the wrapper is (avoids overflow clipping issues)
- Swipe hint: mobile-only tab tongue below bar, `border-radius: 0 0 14px 14px`, `background: rgba(15,26,46,0.10)`

---

## Design Language

### Color tokens
```css
--reta-navy:    #0f1a2e   /* headings, body text, active tab */
--reta-body-bg: #dce4ee   /* page background gradient base */
```

### Frosted glass cards (`.reta-g-card`)
```css
background: rgba(255, 255, 255, 0.74);
backdrop-filter: blur(24px) saturate(1.6);
border: 1px solid rgba(255, 255, 255, 0.52);
border-radius: 20px;
box-shadow: [3-layer shadow + inset highlight];
padding: 24px 28px;
```

### Tab bar (`.reta-tabs__bar`)
```css
background: rgba(255, 255, 255, 0.88);
border: 1px solid rgba(0, 0, 0, 0.08);
border-radius: 14px;
padding: 5px;
```

### Active tab button (`.reta-tabs__btn--active`)
```css
background: var(--reta-navy);
color: #ffffff;
box-shadow: 0 1px 4px rgba(15, 26, 46, 0.30);
```

### Signal tier system (used across Evidence, Safety, Interactions)
- `flag` → red/amber badge — stop and assess
- `watch` → amber badge — monitor
- `low` → green badge — minimal concern

### Page background (`.pt-benchmark`)
```css
background: var(--reta-body-bg) with dual radial gradients (cool blue/gray tones)
```

---

## Component Inventory

| Component | Type | Purpose |
|---|---|---|
| `PDPTabs.tsx` | Client | Tab switcher, hash routing, sticky bar |
| `RetaOverviewPanel.tsx` | Server | Stats, fit matrix (✓/✗), timeline, comparison table |
| `RetaEvidencePanel.tsx` | Server | Signal tiles, trial stats, mechanisms, gaps, observed |
| `RetaSafetyPanel.tsx` | Server | Side effects, mitigation playbook, red lines, proportion |
| `RetaInteractionsPanel.tsx` | Client | 37 entries, live search + category filter, tier badges |
| `PDPContextualConsiderations.tsx` | Client | Ghost typeahead, Enter-to-commit, consideration packs |
| `SupportLayerSection.tsx` | Server | Support pack rendering (from `lib/supportLayer`) |
| `VialImage.tsx` | Server | Slug-to-PNG with `_generic.svg` fallback |
| `BodyClass.tsx` | Client | Injects `reta-page` class on `<html>` for bg color |
| `PeptideCommentsSection.tsx` | Client | UGC community comments (Supabase-backed) |

---

## Panel Content Requirements

### Overview tab
Answers: "Will this work for me? How much vs alternatives?"
- **Stat cards:** 2–4 headline numbers (e.g., "~24% body weight lost", "~17% vs placebo")
- **Fit matrix:** ✓ column (who tends to benefit) + ✗ column (who tends to struggle), 4–6 per side
- **Timeline:** 3 phases (weeks 1–4, months 1–3, month 3+) with plain-language expectations
- **Comparison table:** Reta vs 2 alternatives, 4–5 metrics, active peptide column highlighted

#### Global PDP Fix Directives (enforced on every panel build)

These rules apply to ALL Overview panels. Violations must be fixed before commit.

1. **Lead with digestible information** — opener flows beginner → intermediate → advanced. The first sentence must be comprehensible to someone who knows nothing about the compound. Scientific depth belongs in the body, not the headline.

2. **Do not assume disease-driven intent** — optimization, performance, and wellness are the primary use cases. Clinical/disease indications exist but are secondary. The ✓ fit matrix must not open with a disease diagnosis (e.g., "You have HIV-associated lipodystrophy", "You have HSDD"). Lead with goals ("Your goal is reducing visceral fat", "You want increased sexual desire").

3. **Do not lead with FDA approval status** — FDA/regulatory context is factual but must not be the first or most prominent framing. Maintain neutral, research-focused positioning. FDA information belongs as the last stat card or in the body.

4. **Stat card ordering rule** — Mechanism/outcome stat goes first. FDA/regulatory/approval status stat goes last. When in doubt: what does it *do* before what category it belongs to.

5. **No emojis anywhere** — emoji Unicode characters (🔬💉🎯💊⚠️🤢❤️ etc.) are prohibited in all panel content. Iconography using plain text (✓ ✗ △ ›) is acceptable. The Safety PLAYBOOK `icon:` field uses "›" as the standard neutral glyph.

6. **Route of administration priority** — When listing or describing administration, injectable route comes first when available. "Injectable or nasal spray" not "nasal spray or injectable."

7. **No over-indexing on FDA disclaimers** — One clear, calm framing of regulatory context is sufficient. Repeating FDA-approval caveats throughout a panel violates the tone charter (anti-drift safeguard).

### Evidence tab
Answers: "What does the science actually say — and what's still missing?"
- **Signal tiles:** 6 tiles, each with `tier: "strong" | "moderate" | "none"`, 1 sentence each
- **Trial stats:** 4 headline numbers from the key study, with citation
- **Mechanism breakdown:** 3 cards (known proven / reinforcement / new/uncertain)
- **Gaps:** 6 bullets of honest "what we don't know yet"
- **Observed block:** 5 bullets of real-world patterns, clearly labeled "Observed — not clinical evidence"

### Safety tab
Answers: "How do I be safe on this? What do I watch for?"
- **Side effect grid:** 6 items with `tier: "low" | "watch" | "flag"`, incidence and note
- **Mitigation playbook:** 5 cards (protein, hydration, GI management, training, sleep), each with specific actions
- **Red lines:** 6 stop-now signals with actions — "call/go to ER, don't wait"
- **Risk proportion closer:** Calm framing of the realistic vs dramatic risks

### Interactions tab
Answers: "What does this interact with? How do I mitigate risk?"
- **37+ entries** organized as `Interaction[]` with `{ id, name, aliases[], category, tier, summary, mitigation[] }`
- **5 categories:** medications, stimulants, supplements, recreational, peptides
- **Live search:** filters across name, aliases, summary
- **Category chips:** show counts, highlight active filter

### Considerations tab ("For You")

Answers: "What applies specifically to my situation?"

- **Ghost typeahead search:** inline suggestion, Tab to complete, Enter to commit
- **43+ consideration packs** each with: `title, tags[], summary, body[], cautions[], callToAction`
- **Support layer — MANDATORY on every v3 PDP.** Rendered after search results via `SupportLayerSection`. Every peptide must have a corresponding `SupportPack` in `lib/supportLayer.ts`. If no specific pack exists for the peptide's category, author one before the page ships. No v3 PDP should ever have a blank "For You" tab with only the search tool and no support layer below it.

#### Support layer authoring rules

- Authored in `lib/supportLayer.ts` as a named constant (e.g., `SUPPORT_NAD`, `SUPPORT_GH`)
- Detection via a slug-list function (e.g., `isNadFamily()`, `isGHFamily()`)
- `getSupportPack()` dispatches to the correct pack — add a new `if` branch for each new family
- **Pack structure:** `title` (action-oriented), `subtitle` (context sentence), `bullets[]` (6 anchors — practical, specific, framed as supportive not prescriptive), `redFlags[]` (3–5 stop-now signals)
- Tone: Big Brother principle — protective, practical, not clinical. "This is what people miss" not "you must do X"
- Content: covers the *predictable* support failures for this peptide category (hydration, nutrition, timing, interaction checks, realistic expectations, how to evaluate)
- Red flags: concrete signals that warrant stopping or getting medical input — specific to this compound's risk profile

---

## CSS Block Map (globals.css)

| Block name | Lines (approx) | Purpose |
|---|---|---|
| Base styles | 1–127 | Resets, typography, root tokens |
| NavBar + dark mode | 128–145 | Nav styling |
| `PT_PDP_POLISH_V1` | 146–194 | Card tokens, hero polish |
| `PT_PDP_POLISH_V2` | 195–420 | Section weight, rail polish |
| `RETA_HERO_V2_GLASS + RETA_BODY_V2` | ~1053–1450 | Full reta hero + old body (partially superseded) |
| `PDP_JOURNEY_V1` | appended | CollapsibleSection animation, jump links, back-to-top |
| `VISUAL_POLISH_V1` | appended | Shadow system, glass fix, consider-btn |
| `VISUAL_POLISH_V2` | appended | Typography precision, Radix/Geist tokens |
| `TABS_V1` | appended | Tab bar, sticky unit, panels, Start Here strip |
| `OVERVIEW_V1` | appended | Overview panel layout |
| `EVIDENCE_V1` | appended | Evidence panel layout |
| `SAFETY_V1` | appended | Safety panel layout |
| `INTERACTIONS_V1` | appended | Interactions panel layout |

---

## Tone Rules (from Constitution — non-negotiable)

- **Informed, Empowered, Steadied** — the three emotional outcomes every page delivers
- **Big Brother principle:** protective intelligence, not paternal authority — "doctor friend" voice
- **Dual-Lane Truth:** clinical evidence and observed patterns always explicitly separated
- **No prescriptive language:** never "you should", "start at", "take X"
- **Observational transparency IS allowed:** study dose ranges, titration schedules, common patterns — always framed as descriptive, not instructive
- **No numeric risk scores, no letter grades, no spectacle framing**

---

## Non-Negotiable Technical Rules

- No schema drift (validators must pass before every commit)
- Build must be green before push
- One scoped change-set per commit
- No multi-file mutation scripts
- No blind JSX deletion
- Non-reta PDPs: untouched until migration is deliberately planned per playbook

---

## What Is Still `isRetatrutide`-Gated (to be generalized)

The following in `page.tsx` are currently gated to Retatrutide only:
- `reta-hero-v2` hero composition
- `BodyClass className="reta-page"` (page background)
- `reta-body-tabs` wrapper + Start Here strip
- `PDPTabs` with dedicated panel components
- `reta-community` class on community wrapper

**Generalization path:** See `pdp_scaling_playbook.md`.
