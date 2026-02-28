# PDP Scaling Playbook
Status: Active — Phase 8 (Template Propagation)
Goal: Apply the v3 PDP design to all 92 peptides, starting from the Retatrutide benchmark.

---

## The Two-Phase Generalization Path

### Phase A — Per-Peptide Panel Files (Immediate, Parallel-Workable)
Clone the Reta panel components for a new peptide, replacing hardcoded data with peptide-specific content. Works now with zero architectural changes. Best for flagship peptides where rich, curated content is the goal.

### Phase B — Data-Driven Generic Panels (Future, After 3–5 Peptides Are Done)
Once patterns stabilize across a few clones, abstract the panels into generic data-driven components (`<OverviewPanel peptide={data} />` etc.) that read from JSON. Remove the `isRetatrutide` gate entirely. All 92 peptides share the same rendering path.

**Start with Phase A. Migrate to Phase B once patterns are clear.**

---

## Phase A: Adding a New Peptide to v3 (Step by Step)

### Prerequisites
- The peptide's JSON exists: `content/peptides/<slug>.json` with a populated `peptide` key
- Vials generated and placed: `app/web/public/vials/peptide/<slug>.png` (+ `-sm.png`)
- Build is clean and validators pass before you start

---

### Step 1 — Extend the `isRetatrutide` Gate (or replace with slug list)

In `app/web/app/peptide/[slug]/page.tsx`, the gate is currently:
```tsx
const isRetatrutide = slug === "retatrutide";
```

For each new v3 peptide, add it to a set:
```tsx
const V3_SLUGS = new Set(["retatrutide", "semaglutide", "tirzepatide"]);
const isV3 = V3_SLUGS.has(slug);
```

Then replace all `isRetatrutide` references with `isV3`. Once ALL peptides are migrated (Phase B complete), delete the gate entirely.

---

### Step 2 — Create the Four Panel Components

Clone the Reta panels as starting templates. One component per panel, named after the peptide:

```
app/web/components/<PeptideName>OverviewPanel.tsx
app/web/components/<PeptideName>EvidencePanel.tsx
app/web/components/<PeptideName>SafetyPanel.tsx
app/web/components/<PeptideName>InteractionsPanel.tsx
```

Example for Semaglutide:
```
SemaglutideOverviewPanel.tsx
SemaglutideEvidencePanel.tsx
SemaglutideSafetyPanel.tsx
SemaglutideInteractionsPanel.tsx
```

**Each panel component is a server component** (no `"use client"`) except `InteractionsPanel` which needs client-side search state.

---

### Step 3 — Populate Panel Data

The panels have hardcoded data arrays. Replace the Reta-specific data with the new peptide's data.

#### OverviewPanel data to replace:
- `STAT_CARDS[]` — 2–4 key stats (weight loss %, study duration, cohort size, vs placebo)
- `FIT_YES[]` — 4–6 "tends to benefit" items
- `FIT_NO[]` — 4–6 "tends to struggle" items
- `TIMELINE[]` — 3 phase descriptions (early, mid, sustained)
- `COMPARISON[]` — This peptide vs 2 alternatives, 4–5 metrics

#### EvidencePanel data to replace:
- `SIGNALS[]` — 6 signal tiles with `tier: "strong" | "moderate" | "none"`
- `TRIAL_STATS[]` — 4 stat cards from the key study + citation
- `MECHANISMS[]` — 3 mechanism cards (proven / reinforcement / uncertain)
- `GAPS[]` — 6 honest gap bullets
- `OBSERVED[]` — 5 real-world observation bullets

#### SafetyPanel data to replace:
- `SIDE_EFFECTS[]` — 6 items with `tier: "low" | "watch" | "flag"`
- `PLAYBOOK[]` — 5 mitigation cards (protein/hydration/GI/training/sleep or relevant equivalents)
- `RED_LINES[]` — 6 stop-now signals with specific actions
- Closing "Risk in proportion" paragraph

#### InteractionsPanel data to replace:
- `INTERACTIONS[]` — Full interaction list for this peptide
  - Each entry: `{ id, name, aliases[], category, tier, summary, mitigation[] }`
  - Categories: `"medications" | "stimulants" | "supplements" | "recreational" | "peptides"`
  - Tier: `"flag" | "watch" | "low"`
  - Aim for 20–40 entries covering the most relevant drug classes, supplements, and peptide combinations
- `CATEGORY_LABELS` map — may stay the same (same 5 categories)

---

### Step 4 — Author the Support Pack (MANDATORY)

Every v3 PDP **must** have a `SupportPack` in `app/web/lib/supportLayer.ts`. The "For You" tab is incomplete without it. A page that ships without a support layer is a broken page.

**Author the pack before wiring the page:**

1. Open `app/web/lib/supportLayer.ts`

2. Add a detection function for the peptide's family (or add the slug to an existing one):

```ts
function isGHFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return ["ipamorelin", "cjc-1295", "sermorelin", "mk-677"].includes(s);
}
```

3. Author a `SUPPORT_<FAMILY>` constant:

```ts
const SUPPORT_GH: SupportPack = {
  id: "support_gh_secretagogue_v1",
  title: "Support layer: ...",
  subtitle: "...",
  bullets: [
    // 6 practical anchors specific to this peptide's risk profile
    // Cover: timing, hydration/nutrition needs, interaction checks,
    // realistic expectations, how to evaluate effect, what's commonly missed
  ],
  redFlags: [
    // 3–5 stop-now signals specific to this compound
  ],
};
```

4. Add a dispatch branch in `getSupportPack()`:

```ts
if (isGHFamily(entity)) return SUPPORT_GH;
```

**Support pack content principles:**

- Tone: protective, practical — Big Brother voice ("this is what people miss"), not clinical
- Each bullet: one concrete, specific anchor — not generic advice
- Red flags: compound-specific stop signals, not boilerplate
- No prescriptive language ("you should", "take X") — descriptive, supportive framing only

---

### Step 5 — Wire in page.tsx

In the `isV3` branch of `page.tsx`, swap the import references:

```tsx
// Add imports for new peptide
import SemaglutideOverviewPanel from "@/components/SemaglutideOverviewPanel";
import SemaglutideEvidencePanel from "@/components/SemaglutideEvidencePanel";
import SemaglutideSafetyPanel from "@/components/SemaglutideSafetyPanel";
import SemaglutideInteractionsPanel from "@/components/SemaglutideInteractionsPanel";
```

Then in the tab content, use a conditional:
```tsx
const OverviewPanel = slug === "semaglutide" ? SemaglutideOverviewPanel : RetaOverviewPanel;
// ... same pattern for other panels
```

Or (cleaner once you have 3+), build a `PANEL_MAP`:
```tsx
const PANEL_MAP: Record<string, { Overview: ..., Evidence: ..., Safety: ..., Interactions: ... }> = {
  retatrutide: { Overview: RetaOverviewPanel, ... },
  semaglutide: { Overview: SemaglutideOverviewPanel, ... },
};
const panels = PANEL_MAP[slug] ?? PANEL_MAP["retatrutide"];
```

---

### Step 5 — Update Hero Content

The hero reads from the peptide's JSON (`p.canonical_name`, `p.status.category`, `p.topics.primary`, `riskHit.risk.evidence_grade`). These are data-driven and work automatically if the JSON is populated.

The only hero element that needs manual update per peptide is the Start Here strip bullets. These are currently hardcoded in `page.tsx`:
```tsx
<li>Investigational incretin drug being studied for weight and metabolic outcomes.</li>
```

Consider moving these to the peptide's JSON as a `start_here` array (3 bullets), or keep them in the panel file as a named export for now.

---

### Step 6 — Add Vial Images

Place the generated PNG files:
```
app/web/public/vials/peptide/<slug>.png      (400×400 square, transparent)
app/web/public/vials/peptide/<slug>-sm.png   (140×210 portrait, transparent)
```

See `vial_image_spec.md` for full generation guide.

---

### Step 7 — Verify

```bash
cd app/web && npm run build
python3 scripts/validate/validate_pdp_contract_v1.py
```

Then manually check:
- Hero renders correctly (vial, title, glass card, jump links)
- All 5 tabs switch correctly
- Interactions search works
- Considerations search works
- Community section below tabs
- Mobile: tab bar scrolls, swipe hint visible, layout stacks correctly
- Hash navigation: `#evidence`, `#safety`, `#interactions`, `#considerations` activate correct tabs

---

## Phase B: Generic Data-Driven Panels (Future)

Once 3–5 peptides have Phase A clones, the repeated structure becomes obvious. At that point:

1. Extract all data arrays into the peptide's JSON (or a separate `panels/<slug>.ts` data file)
2. Create generic components: `OverviewPanel`, `EvidencePanel`, `SafetyPanel`, `InteractionsPanel` — each accepting typed props
3. Remove `isV3` gate and `PANEL_MAP` — `page.tsx` imports generic panels unconditionally
4. Delete all per-peptide panel files

The Reta-specific panel files (`Reta*Panel.tsx`) become the reference implementation for building the generic versions.

---

## Content Priority Queue

Order for Phase A clones (based on search volume and completeness of existing JSON):

| Priority | Slug | Category | Notes |
|---|---|---|---|
| 1 | `semaglutide` | GLP-1 / weight | Most searched, rich evidence |
| 2 | `tirzepatide` | GLP-1+GIP / weight | Direct Reta comparator |
| 3 | `bpc-157` | Healing / recovery | High community interest |
| 4 | `tb-500` | Healing / recovery | Often stacked with BPC-157 |
| 5 | `ipamorelin` | Growth hormone | Popular, well-studied |
| 6 | `cjc-1295` | Growth hormone | Stacked with ipamorelin |
| 7 | `mk-677` | GH secretagogue | Oral, very popular |
| 8 | `sermorelin` | Growth hormone | Prescription, clinical |
| 9 | `ghk-cu` | Skin / anti-aging | Growing interest |
| 10 | `selank` | Cognitive | Anxiety / nootropic interest |

---

## Architectural Rules for Scaling

- **One peptide per PR** — do not batch multiple peptides in a single commit
- **Validators must pass** before every commit
- **Build must be green** before every push
- **Non-v3 peptides are untouched** — the non-v3 branch in `page.tsx` remains exactly as-is
- **No schema changes** — all new content goes in panel components or JSON, never in the DB schema
- **No global CSS changes** — all v3 CSS is already in place; only add peptide-specific overrides if truly needed (rare)
- **Constitution and tone charter apply to all panel content** — especially the dual-lane clinical/observed separation
