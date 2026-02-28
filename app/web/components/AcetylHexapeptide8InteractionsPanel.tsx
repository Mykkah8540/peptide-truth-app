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
    id: "retinoids",
    name: "Retinoids",
    aliases: ["retinol", "tretinoin", "Retin-A", "adapalene", "tazarotene", "retinaldehyde"],
    category: "Skincare actives",
    tier: "low",
    summary:
      "No pharmacological interaction between topical AH8 and retinoids has been identified. Both are commonly used together in anti-aging skincare routines. Retinoids may transiently disrupt the skin barrier, which theoretically could alter peptide penetration, but no clinically relevant interaction has been demonstrated.",
    mitigation: [
      "No special precautions required for combining topical AH8 with retinoids.",
      "If experiencing retinoid-related skin irritation, simplifying the routine temporarily is reasonable but not required due to AH8 specifically.",
    ],
  },
  {
    id: "ahas-bhas",
    name: "AHAs and BHAs",
    aliases: ["glycolic acid", "lactic acid", "mandelic acid", "salicylic acid", "citric acid"],
    category: "Skincare actives",
    tier: "low",
    summary:
      "Chemical exfoliants (AHAs, BHAs) are frequently used in the same routines as AH8. No adverse interaction is established. Exfoliation may theoretically enhance superficial penetration of cosmetic peptides, but the clinical significance of this for AH8 efficacy is unstudied.",
    mitigation: [
      "No specific precautions required.",
      "Standard skincare layering practice applies: apply AH8 serum after water-based steps, before occlusive moisturizers.",
    ],
  },
  {
    id: "sunscreen",
    name: "Sunscreens",
    aliases: ["SPF", "UV filters", "zinc oxide", "avobenzone", "oxybenzone"],
    category: "Photoprotection",
    tier: "low",
    summary:
      "No interaction between AH8 and sunscreen ingredients has been identified. Both can be used in the same routine. Sunscreen use is generally recommended alongside any anti-aging skincare program.",
    mitigation: [
      "Apply sunscreen as the final step after other skincare products.",
      "No timing separation or sequencing restriction is required due to AH8.",
    ],
  },
  {
    id: "vitamin-c",
    name: "Vitamin C (L-ascorbic acid)",
    aliases: ["ascorbic acid", "L-ascorbic acid", "ascorbyl glucoside", "ascorbyl phosphate"],
    category: "Skincare actives",
    tier: "low",
    summary:
      "No pharmacological interaction between topical AH8 and vitamin C has been documented. Both are commonly combined in skincare formulations targeting fine lines and skin texture. Formulation pH compatibility should be considered (vitamin C formulations are often acidic; peptide stability varies with pH) but this is a formulation concern, not a safety concern.",
    mitigation: [
      "If using separate products, apply lower-pH vitamin C formulations first, then AH8 peptide serum.",
      "Look for products that have pre-combined these ingredients in a stable formulation if concerned about pH compatibility.",
    ],
  },
  {
    id: "niacinamide",
    name: "Niacinamide",
    aliases: ["nicotinamide", "vitamin B3"],
    category: "Skincare actives",
    tier: "low",
    summary:
      "Niacinamide and AH8 are frequently co-formulated in commercial products without reported adverse interactions. No pharmacological incompatibility is established.",
    mitigation: [
      "No precautions required. Standard routine layering applies.",
    ],
  },
];

const TIER_STYLE: Record<
  Tier,
  { bg: string; border: string; label: string; labelColor: string }
> = {
  flag: {
    bg: "rgba(158,56,0,0.07)",
    border: "rgba(158,56,0,0.20)",
    label: "Stop signal",
    labelColor: "#9e3800",
  },
  watch: {
    bg: "rgba(124,82,0,0.06)",
    border: "rgba(124,82,0,0.17)",
    label: "Worth watching",
    labelColor: "#7c5200",
  },
  low: {
    bg: "rgba(21,100,58,0.05)",
    border: "rgba(21,100,58,0.13)",
    label: "Low concern",
    labelColor: "#155e38",
  },
};

const CATEGORIES = [
  "All",
  ...Array.from(new Set(INTERACTIONS.map((e) => e.category))),
];

export default function AcetylHexapeptide8InteractionsPanel() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return INTERACTIONS.filter((e) => {
      const matchesCat = activeCat === "All" || e.category === activeCat;
      const matchesQuery =
        q === "" ||
        e.name.toLowerCase().includes(q) ||
        e.aliases.some((a) => a.toLowerCase().includes(q)) ||
        e.summary.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, activeCat]);

  return (
    <div className="reta-interactions">
      <div className="reta-interactions__context">
        Acetyl hexapeptide-8 is a topical cosmetic ingredient with no identified clinically
        significant interactions with other skincare actives. The interactions listed here are
        limited to cosmetic co-use considerations. No drug interactions exist because AH8 has
        no systemic pharmacokinetics from topical application.
      </div>
      <div className="reta-interactions__controls">
        <input
          className="reta-interactions__search"
          placeholder="Search drug, supplement, or compound…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="reta-interactions__cats">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`reta-interactions__cat${activeCat === cat ? " reta-interactions__cat--active" : ""}`}
              onClick={() => setActiveCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="reta-interactions__list">
        {results.length === 0 ? (
          <div className="reta-interactions__empty">
            No interactions found for that search.
          </div>
        ) : (
          results.map((entry) => {
            const st = TIER_STYLE[entry.tier];
            return (
              <div
                key={entry.id}
                className="reta-interactions__entry"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-interactions__entry-top">
                  <div className="reta-interactions__entry-name">{entry.name}</div>
                  <div className="reta-interactions__entry-meta">
                    <span className="reta-interactions__entry-cat">{entry.category}</span>
                    <span
                      className="reta-interactions__entry-tier"
                      style={{ color: st.labelColor, borderColor: st.border }}
                    >
                      {st.label}
                    </span>
                  </div>
                </div>
                <div className="reta-interactions__entry-summary">{entry.summary}</div>
                <ul className="reta-interactions__entry-mit">
                  {entry.mitigation.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
