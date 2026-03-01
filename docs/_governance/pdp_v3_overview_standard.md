# PDP v3 Overview Panel Standard
## The law for every OverviewPanel.tsx

This document defines the mandatory structure and content approach for every compound Overview panel. It supersedes any prior panel output that conflicts with it.

**If a panel was built under a different template, it must be rebuilt to this standard. No exceptions.**

---

## Why this exists

Every batch of panels built before this standard used a stat-card + fit-matrix + comparison-table structure that was designed for researchers and clinicians. It answers questions nobody actually asks when they land on a peptide page. The average person landing on a PDP is asking:

- "Could this help *me*?"
- "Why do people get excited about this?"
- "Am I being sold something or is this real?"

A table of receptor acronyms does not answer those questions. A disease-condition fit matrix does not answer those questions. This standard answers those questions.

---

## Mandatory Structure

Every OverviewPanel must contain these sections, in this order:

### 1. The Opener (1–3 sentences)
Plain English. What does this compound do or claim to do? What is the honest frame on community excitement vs. clinical reality? No receptor names. No pathway jargon. No FDA-first framing.

**Good:**
> "For fitness and hormone optimization, kisspeptin's excitement is mostly indirect and potential-based — not because it's a proven performance enhancer, but because it sits at the top of the body's own reproductive hormone system."

**Bad:**
> "Kisspeptin is the upstream regulator of the hypothalamic-pituitary-gonadal (HPG) axis — it drives GnRH pulses, which drive LH and FSH, which drive testosterone and estrogen production."

---

### 2. Three User Profiles

Write one block per profile. Each block contains:

#### a. Profile heading
Use the profile label (Profile 1, Profile 2, Profile 3) and a title that names the audience type and their lens.

Standard profiles for community-use compounds:
- **Profile 1 — The Average Person**: General wellness crowd. Non-athlete, non-expert. Health-curious, hormone-aware, wanting natural solutions.
- **Profile 2 — The Athlete**: Performance and recovery focused. Competitive but natural (or semi-natural). Cares about strength, recovery, body composition.
- **Profile 3 — The Biohacker**: Optimization-focused, systems thinker. Interested in upstream levers, longevity, stack interactions, endocrine precision.

Adapt labels when the compound category requires it:
- Cosmetic/topical peptides (GHK-Cu, Snap-8, Palmitoyl Pentapeptide-4): swap Athlete for "The Aesthetics-Focused User"
- Reference/clinical compounds with no community use (Bradykinin, ANP, Nesiritide): adapt to "Person coming from a clinical context," "Person who saw it mentioned online," "Research-curious person" — and be honest that there is no community use profile that makes sense
- Compounds with obvious gender specificity (Bremelanotide, Carbetocin, oxytocin-related): adapt profiles accordingly

#### b. What they think
One sentence in quotation marks. This is the relatable question or assumption this person brings to the page. Write it the way they'd actually say it — casual, honest.

**Good:** `"Could this help my hormones, energy, or libido naturally — without going on TRT?"`
**Bad:** `"I am seeking to optimize my endogenous testosterone production via hypothalamic pathway stimulation."`

#### c. Why they're excited
Numbered list. 2–4 reasons. Each reason has:
- A plain-English heading (bold)
- 2–4 sentences of plain-language explanation

Do NOT write reasons like "Mechanism of action includes GPCR activation." Write reasons like "It works upstream — stimulating the body's own system instead of replacing hormones."

The reasons must reflect what this specific profile *actually* cares about and how they'd frame it. An average person doesn't care about GnRH pulse intervals. An athlete cares about testosterone support without shutdown. A biohacker cares about upstream levers and stack interactions.

#### d. Reality check
2–4 sentences. Honest, grounded. What actually happens for this profile? What's the gap between their excitement and the current evidence? This is not fear-mongering — it is the "big brother" voice that steadies and informs.

**Good:** "For general wellness and body composition, effects are inconsistent in healthy individuals. Not a fat-loss drug, not a muscle-builder. Net: curiosity-driven excitement more than proven benefit."
**Bad:** "Clinical evidence for this application is limited to small-scale studies with heterogeneous methodologies and inadequate statistical power to draw definitive conclusions."

---

### 3. The Honest Bottom Line

Two columns:
- **What [compound] is NOT**: 4–6 bullet points. Plain statements about what this compound does not do, that people commonly assume it does.
- **What makes it interesting**: 3–5 bullet points. Honest, grounded reasons why there is legitimate attention on this compound.

---

## Component Code Structure

```tsx
export default function XxxOverviewPanel() {
  return (
    <div className="reta-overview">

      <p className="reta-overview__opener">
        [1-3 sentence plain-English opener]
      </p>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 1</div>
        <h3 className="reta-overview__profile-heading">The Average Person — [sub-label]</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;[What they actually ask]&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>[Reason heading]</strong><br />[Plain explanation]</li>
          <li><strong>[Reason heading]</strong><br />[Plain explanation]</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">[Honest, grounded net verdict]</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 2</div>
        <h3 className="reta-overview__profile-heading">The Athlete — [sub-label]</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;[What they actually ask]&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>[Reason heading]</strong><br />[Plain explanation]</li>
          <li><strong>[Reason heading]</strong><br />[Plain explanation]</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">[Honest, grounded net verdict]</p>
      </div>

      <div className="reta-overview__profile">
        <div className="reta-overview__profile-label">Profile 3</div>
        <h3 className="reta-overview__profile-heading">The Biohacker — [sub-label]</h3>
        <blockquote className="reta-overview__profile-think">&ldquo;[What they actually ask]&rdquo;</blockquote>
        <p className="reta-overview__profile-why-heading">Why they&rsquo;re excited</p>
        <ol className="reta-overview__profile-why">
          <li><strong>[Reason heading]</strong><br />[Plain explanation]</li>
          <li><strong>[Reason heading]</strong><br />[Plain explanation]</li>
        </ol>
        <p className="reta-overview__profile-check-heading">Reality check</p>
        <p className="reta-overview__profile-check">[Honest, grounded net verdict]</p>
      </div>

      <div className="reta-overview__bottom">
        <p className="reta-overview__bottom-heading">The honest bottom line</p>
        <div className="reta-overview__bottom-cols">
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What [Compound] is NOT</p>
            <ul className="reta-overview__bottom-list">
              <li>[Plain misconception statement]</li>
            </ul>
          </div>
          <div className="reta-overview__bottom-col">
            <p className="reta-overview__bottom-col-heading">What makes it interesting</p>
            <ul className="reta-overview__bottom-list">
              <li>[Honest reason]</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
```

**No STAT_CARDS array. No FIT_YES/FIT_NO arrays. No TIMELINE array. No COMPARISON array. No data structures at all — just JSX.**

---

## What NOT to do (the failure modes this replaces)

### Prohibited: Receptor acronyms as visible content
```
// BAD — stat card value
value: "GPR54 / KISS1R"

// BAD — headline text
"The hypothalamic master switch — KNDy neurons and pulsatile GnRH release"
```

### Prohibited: Disease-condition fit gating
```
// BAD — fit matrix item
"You have hypogonadotropic hypogonadism (low LH/FSH, low testosterone) and are working with an endocrinologist"

// GOOD — goals-based, plain English
"You want to support your natural testosterone without going on TRT"
```

### Prohibited: Mechanism-first openers
```
// BAD — opener
"BPC-157 is a pentadecapeptide partial sequence of body protection compound (BPC) found in gastric juice..."

// GOOD — outcome-first opener
"BPC-157 is the most popular injectable peptide in community use — primarily for injury recovery, gut health, and inflammation. The animal research is impressive. The human evidence is thin. Sourcing quality is the dominant variable."
```

### Prohibited: Academic jargon in plain-English positions
```
// BAD — reality check
"Clinical evidence for this application is limited to small-scale studies with heterogeneous methodologies and inadequate statistical power."

// GOOD — reality check
"The honest answer is: it works well in animals, inconsistently in people, and the studies that do exist are small. That doesn't mean it doesn't work — it means certainty is low."
```

---

## Special cases

### Compounds with no community use
For reference/pharmacology compounds (Bradykinin, ANP, Brain Natriuretic Peptide, Nesiritide, Endothelin-1, Angiotensin II, CGRP, Motilin, Substance P, VIP, Pentagastrin, Secretin, Somatostatin, Vasopressin-endogenous, etc.) where nobody is actually injecting this compound:

- Adapt profiles to reflect who actually encounters this page: e.g., someone researching side effects, a clinically-curious person, a pharmacology student
- Be clear upfront that this compound is not a community-use peptide
- The profiles are still "who reads this page and why" — they just have a different character
- Profile 1 might be "Someone who saw this named in a drug interaction" — Profile 3 might be "Pharmacology-curious person building system understanding"

### Purely clinical compounds (hospital drugs)
For compounds used only in clinical settings (Bivalirudin, Eptifibatide, Desmopressin, Teriparatide, etc.) where community self-use doesn't exist:

- The profiles reflect the person's *informational journey*, not a use decision
- Be direct that this isn't a community compound
- Still apply the plain-English approach — someone may be on one of these drugs and want to understand it, or they may be a caregiver

### Cosmetic/topical peptides
For skin compounds (Snap-8, Palmitoyl Pentapeptide-4, Palmitoyl Tripeptide-1, GHK-Cu in topical context):

- Profile 1: Skincare-curious person
- Profile 2: Aesthetics-focused user (may also be fitness-oriented)
- Profile 3: Anti-aging/longevity biohacker

---

## Language rules (non-negotiable)

1. Write at a 9th-grade reading level for the opener and profile sections
2. Plain English first. Technical terms only when unavoidable, and defined inline when used
3. Quotation marks in "What they think" should sound like a real person talking, not a case study
4. Reality checks must be honest but not harsh. The voice is a knowledgeable friend, not a scold
5. "Net:" summary at the end of each reality check is standard — gives the person the bottom line fast
6. No emoji (per charter Section 10.4) — Profile labels use text only
7. No FDA-first framing (per charter Section 10.2)
8. No disease-first gating in fit/profile framing (per charter Section 10.3)
