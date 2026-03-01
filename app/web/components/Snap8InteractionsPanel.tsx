"use client";
import { useState, useMemo } from "react";

type Tier = "flag" | "watch" | "low";

interface Entry {
  id: string;
  name: string;
  aliases: string[];
  category: string;
  tier: Tier;
  summary: string;
  mitigation: string[];
}

const INTERACTIONS: Entry[] = [
  {
    id: "snap8-botulinum-toxin",
    name: "Botulinum toxin (Botox, Dysport, Xeomin, Daxxify)",
    aliases: ["botox", "dysport", "xeomin", "daxxify", "neuromodulator"],
    category: "Neuromodulator",
    tier: "low",
    summary:
      "Both Snap-8 and botulinum toxin target neuromuscular signaling, but their mechanisms are distinct: botulinum toxin cleaves SNARE proteins intracellularly after receptor-mediated endocytosis; Snap-8 is claimed to competitively inhibit SNARE assembly extracellularly \u2014 and only topically. There is no pharmacokinetic interaction because Snap-8 does not reach the neuromuscular junction via topical application. Using both is cosmetically common and poses no recognized pharmacological risk. The marketed rationale of \u201cextending\u201d Botox results with Snap-8 topicals is unproven but not dangerous.",
    mitigation: [],
  },
  {
    id: "snap8-retinoids",
    name: "Retinoids (tretinoin, retinol, adapalene, tazarotene)",
    aliases: ["tretinoin", "retin-a", "retinol", "adapalene", "differin", "tazarotene"],
    category: "Topical cosmeceutical / Rx topical",
    tier: "watch",
    summary:
      "Retinoids, particularly prescription-strength tretinoin, significantly disrupt the stratum corneum barrier and can increase penetration of co-applied ingredients. In theory this could increase Snap-8 dermal delivery. In practice, clinically meaningful systemic absorption remains extremely unlikely even with a compromised barrier, but the combination does raise the plausibility of skin irritation when both are applied in the same routine (retinoid-induced dryness/sensitivity plus peptide formulation excipients).",
    mitigation: [
      "Apply retinoids and peptide serums at separate times of day (retinoids at night; peptides in the morning) to minimize concurrent barrier disruption.",
      "Introduce them gradually if combining in the same skincare routine.",
    ],
  },
  {
    id: "snap8-alpha-hydroxy-acids",
    name: "Alpha-hydroxy acids (glycolic, lactic, mandelic)",
    aliases: ["aha", "glycolic acid", "lactic acid", "mandelic acid", "chemical exfoliant"],
    category: "Chemical exfoliant",
    tier: "watch",
    summary:
      "AHAs exfoliate the stratum corneum and lower skin surface pH, which may alter peptide stability and marginally increase transdermal flux. The primary concern is compounding irritation: AHAs sensitize the skin and a peptide serum applied immediately after may sting or cause reactive erythema in sensitive skin types. No specific pharmacological interaction exists.",
    mitigation: [
      "Allow skin to fully dry and pH to normalize (10\u201320 minutes) before applying Snap-8 over AHAs.",
      "Reduce application frequency of AHAs if persistent irritation develops.",
    ],
  },
  {
    id: "snap8-other-signal-peptides",
    name: "Other signal peptides (Argireline, Leuphasyl, Matrixyl, SYN-AKE)",
    aliases: ["argireline", "acetyl hexapeptide", "leuphasyl", "matrixyl", "palmitoyl", "syn-ake"],
    category: "Cosmetic peptide",
    tier: "low",
    summary:
      "Cosmetic peptides are frequently layered in multi-peptide serums. Snap-8 combined with Argireline (acetyl hexapeptide-8) is particularly common, marketed as additive SNARE inhibition. No pharmacological interaction concern exists; the main consideration is formula compatibility (pH, solubility) which the manufacturer handles. From a skin-safety standpoint, stacking multiple peptides is well-tolerated in the vast majority of users.",
    mitigation: [],
  },
  {
    id: "snap8-topical-steroids",
    name: "Topical corticosteroids",
    aliases: ["hydrocortisone", "betamethasone", "triamcinolone", "clobetasol", "steroid cream"],
    category: "Topical corticosteroid",
    tier: "watch",
    summary:
      "Long-term topical corticosteroid use causes skin atrophy, thinning, and barrier dysfunction. Applying Snap-8 over chronically steroid-thinned skin could produce more irritation than on intact skin, and the already-compromised barrier would offer less protection. No direct drug\u2013drug interaction; this is a skin-condition consideration.",
    mitigation: [
      "Avoid applying cosmetic actives directly over areas of active topical steroid treatment.",
      "Allow skin recovery time between topical steroid courses before resuming active cosmetic regimens.",
    ],
  },
  {
    id: "snap8-no-systemic-interactions",
    name: "Oral medications (all classes)",
    aliases: ["prescription drugs", "medications", "pharmaceuticals", "systemic drugs"],
    category: "Systemic pharmacology",
    tier: "low",
    summary:
      "Snap-8 applied topically does not reach systemic circulation at concentrations that would interact with any oral medication. There are no known or theoretical pharmacokinetic interactions between topical Snap-8 and any class of oral drug. This interaction category is included to explicitly close the question: the answer is no meaningful interaction risk.",
    mitigation: [],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag: {
    bg: "rgba(158,56,0,0.06)",
    border: "rgba(158,56,0,0.22)",
    dot: "#9e3800",
    label: "Stop signal",
    labelColor: "#9e3800",
  },
  watch: {
    bg: "rgba(124,82,0,0.05)",
    border: "rgba(124,82,0,0.18)",
    dot: "#7c5200",
    label: "Worth watching",
    labelColor: "#7c5200",
  },
  low: {
    bg: "rgba(21,100,58,0.04)",
    border: "rgba(21,100,58,0.15)",
    dot: "#155e38",
    label: "Low concern",
    labelColor: "#155e38",
  },
};

export default function Snap8InteractionsPanel() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return INTERACTIONS;
    return INTERACTIONS.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.aliases.some((a) => a.toLowerCase().includes(q)) ||
        e.category.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="reta-interactions">
      <div className="reta-interactions__search">
        <input
          type="text"
          className="reta-interactions__input"
          placeholder="Search a drug, supplement, or category\u2026"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search interactions"
        />
      </div>
      <div className="reta-interactions__list">
        {filtered.length === 0 && (
          <div className="reta-interactions__empty">
            No interactions found for \u201c{query}\u201d. That doesn\u2019t mean none exist \u2014 it means
            this database doesn\u2019t have a specific entry.
          </div>
        )}
        {filtered.map((entry) => {
          const st = TIER_STYLE[entry.tier];
          return (
            <div
              key={entry.id}
              className="reta-interactions__entry"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-interactions__entry-top">
                <div className="reta-interactions__entry-left">
                  <span className="reta-interactions__dot" style={{ background: st.dot }} />
                  <div>
                    <div className="reta-interactions__entry-name">{entry.name}</div>
                    {entry.aliases.length > 0 && (
                      <div className="reta-interactions__entry-aliases">{entry.aliases.join(", ")}</div>
                    )}
                  </div>
                </div>
                <div
                  className="reta-interactions__entry-tier"
                  style={{ color: st.labelColor, borderColor: st.border }}
                >
                  {st.label}
                </div>
              </div>
              <div className="reta-interactions__entry-summary">{entry.summary}</div>
              {entry.mitigation.length > 0 && (
                <ul className="reta-interactions__entry-mitigation">
                  {entry.mitigation.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
