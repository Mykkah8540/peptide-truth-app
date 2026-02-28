# Vial Image Specification
Status: Active
Purpose: Generate peptide vial images in ChatGPT (or any image tool) for use across all PDPs.

---

## Two Required Sizes Per Peptide

### 1. Main Vial — `<slug>.png`
- **Displayed size:** 112×112px (standard PDP hero) or 190×190px (benchmark/featured)
- **Source file size:** 400×400px (square canvas, transparent PNG)
- **Usage:** `VialImage` component — square crop, rounded 16px corners applied via CSS
- **Composition:** Vial centered in square frame with generous transparent padding on all sides. The vial itself should occupy ~60–70% of the frame height.

### 2. Small Vial — `<slug>-sm.png`
- **Displayed size:** 70×105px (portrait, mobile hero title row)
- **Source file size:** 140×210px @2x (transparent PNG)
- **Usage:** Inline `<img>` in mobile hero, sits left of the H1 title
- **Composition:** Portrait frame, vial fills ~85% of height, slight top-to-bottom perspective tilt

---

## Visual Style Guide

### The vial
- **Type:** Single pharmaceutical/research glass vial — tall cylindrical glass body with a rubber stopper/septum at the top and a crimped aluminum cap
- **Size:** ~2–3mL peptide research vial (compact, scientific, not oversized)
- **Glass:** Clear borosilicate glass — highly transparent with subtle realistic refraction/caustics
- **Stopper:** Gray or charcoal rubber septum
- **Cap:** Aluminum crimp cap — color varies per category (see below)
- **Label:** Simple, minimal — white label band around the lower half of the vial body. Black text for the peptide name (use the canonical name, not the slug). No QR codes, no barcodes, no excessive detail.
- **Fill level:** ~85% full with liquid (visible aqueous solution)

### Lighting
- Soft studio lighting — single key light from upper-left, subtle fill from right
- Subtle specular highlight running vertically along the glass body
- Gentle shadow cast beneath the vial onto a transparent surface
- No harsh shadows, no dramatic noir lighting
- Overall feel: clinical, clean, scientific — not pharmaceutical marketing

### Background
- **Fully transparent PNG** — no background color, no gradient, no surface
- The vial must composite cleanly onto the reta page's blue-gray gradient background (`#dce4ee`)

---

## Liquid Color by Category

Use the peptide's primary topic/category to determine liquid color:

| Category | Liquid color | Hex approx |
|---|---|---|
| Weight / GLP-1 / metabolic | Clear golden amber | `#e8c97a` |
| Growth hormone / muscle | Clear pale blue | `#a8d4f0` |
| Recovery / healing (BPC, TB) | Clear light green | `#a8e6b8` |
| Cognitive / nootropic | Clear violet | `#c4a8e8` |
| Sexual health / hormone | Clear warm rose | `#f0b8c0` |
| Skin / anti-aging / cosmetic | Clear pearl/white | `#f0ece4` |
| Immune / anti-inflammatory | Clear teal | `#8ed8d0` |
| Cardiovascular | Clear coral | `#f0a898` |
| Unknown / general | Clear pale gray | `#d8dce4` |

The liquid should be **translucent**, not opaque — light should pass through it.

---

## Prompt Template for ChatGPT

Use this as a starting point. Adjust the peptide name and liquid color:

```
Product photography of a single pharmaceutical peptide research vial on a transparent background.
The vial is a clear glass cylindrical container (~2mL) with a gray rubber stopper and a [COLOR] aluminum crimp cap.
The glass body is clear borosilicate with realistic light refraction.
The vial is ~85% filled with a clear [LIQUID COLOR DESCRIPTION] aqueous solution.
A minimal white label wraps the lower half of the glass body with "[PEPTIDE NAME]" printed in clean black sans-serif text.
Soft studio lighting from upper-left, gentle specular highlight along the glass, subtle transparent shadow below.
Scientific, clinical aesthetic — not pharmaceutical marketing.
Transparent PNG background.
Square composition 400×400px, vial centered occupying ~65% of frame height.
```

---

## Naming Convention

```
app/web/public/vials/peptide/<slug>.png      ← main square vial (400×400)
app/web/public/vials/peptide/<slug>-sm.png   ← small portrait vial (140×210)
```

Examples:
- `retatrutide.png` + `retatrutide-sm.png` ✅ already exists
- `semaglutide.png` → to be created
- `bpc-157.png` → to be created

The slug matches the peptide's JSON filename exactly (e.g., `bpc-157.json` → `bpc-157.png`).

---

## VialImage Fallback

If a PNG is missing, `VialImage.tsx` automatically falls back to:
```
/public/vials/peptide/_generic.svg
```

This means vials can be added incrementally — missing images never break the page.

---

## Priority Order for Generation

Start with high-traffic / flagship peptides first:

1. `semaglutide` — GLP-1, golden amber liquid
2. `tirzepatide` — GLP-1/GIP, golden amber liquid
3. `bpc-157` — healing, light green
4. `tb-500` — healing, light green
5. `ipamorelin` — growth hormone, pale blue
6. `cjc-1295` — growth hormone, pale blue
7. `sermorelin` — growth hormone, pale blue
8. `mk-677` — growth hormone secretagogue, pale blue
9. `ghk-cu` — anti-aging/skin, pearl
10. `selank` / `semax` — cognitive, violet

Then work through the full 92-peptide roster using the category color guide above.

---

## Quality Check

Before dropping a vial image into the repo:
- [ ] Background is fully transparent (not white, not gray)
- [ ] Vial is centered and not clipped at edges
- [ ] Liquid color matches the category table
- [ ] Label is legible at 112×112px display size
- [ ] No photographer watermarks, stock imagery artifacts, or UI chrome
- [ ] PNG file saved (not JPEG — transparency required)
