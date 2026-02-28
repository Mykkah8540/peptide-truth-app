"use client";

/**
 * FiveAmino1MQInteractionsPanel — interaction intelligence for 5-Amino-1MQ.
 * Key frame: SAM and NAD+ pathway effects create theoretical interactions
 * with methylation-dependent drugs and NAD+ supplements. No characterized
 * pharmacological interactions exist — all are mechanism-based speculation.
 */

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
    id: "cancer-treatments",
    name: "Cancer treatments — chemotherapy, targeted therapy",
    aliases: ["chemotherapy", "chemo", "cancer treatment", "targeted therapy", "oncology", "PARP inhibitor", "olaparib"],
    category: "Cancer Treatment",
    tier: "flag",
    summary: "NNMT's complex role in cancer cell metabolism makes any NNMT inhibitor inappropriate during cancer treatment without oncology guidance. Some cancer cells upregulate NNMT to support their survival — inhibiting NNMT in cancer cells could theoretically be anti-tumorigenic or could disrupt cancer cell metabolic adaptation in unpredictable ways. PARP inhibitors depend on NAD+ as a substrate; 5-Amino-1MQ raises NAD+ which could theoretically affect PARP inhibitor activity.",
    mitigation: [
      "Active cancer treatment: do not use 5-Amino-1MQ without oncology guidance — NNMT's role in cancer cell metabolism and its interaction with specific therapies is not characterized",
      "On PARP inhibitors (olaparib, rucaparib, niraparib): 5-Amino-1MQ raises NAD+, which is PARP's substrate — the interaction is theoretically significant; avoid without explicit oncology guidance",
    ],
  },
  {
    id: "same-nad-supplements",
    name: "NAD+ precursors — NMN, NR, niacin (high dose)",
    aliases: ["NMN", "nicotinamide mononucleotide", "NR", "nicotinamide riboside", "niacin", "nicotinic acid", "NAD+", "nad plus"],
    category: "Supplements",
    tier: "watch",
    summary: "Mechanistic overlap — both approaches raise NAD+, via different upstream mechanisms. 5-Amino-1MQ raises NAD+ by reducing its consumption (NNMT inhibition); NMN/NR add NAD+ precursors. Using both simultaneously creates additive NAD+ elevation. The downstream effects of stacking these approaches are not characterized. High-dose niacin raises NAD+ but also suppresses nicotinamide methylation naturally — adding 5-Amino-1MQ could create complex nicotinamide pathway interactions.",
    mitigation: [
      "The combination of NNMT inhibition + NAD+ precursor supplementation is mechanistically redundant and the additive metabolic effect is not characterized",
      "If stacking: start one at a time and evaluate before adding the other — the combined effect on NAD+ and methylation metabolism is unknown",
      "High-dose niacin specifically: niacin naturally reduces nicotinamide methylation flux; adding 5-Amino-1MQ creates complex pathway interaction — avoid this combination",
    ],
  },
  {
    id: "same-methionine",
    name: "Methionine / SAMe supplementation",
    aliases: ["methionine", "SAMe", "S-adenosylmethionine", "SAM-e", "methylation support"],
    category: "Supplements",
    tier: "watch",
    summary: "5-Amino-1MQ raises SAM by blocking NNMT's consumption of it. SAMe supplements directly add SAM. The combination raises SAM through two mechanisms simultaneously. Elevated SAM can drive excessive methylation — the consequences of SAM excess in specific tissues are not well characterized. There are theoretical concerns about excessive DNA and histone methylation with very high SAM.",
    mitigation: [
      "Do not combine 5-Amino-1MQ with SAMe supplementation — both raise SAM; the additive effect on methylation is unknown and potentially problematic",
      "If on methylation support protocols (MTHFR-related, high-dose B vitamins for homocysteine): discuss the SAM-raising effect of 5-Amino-1MQ with your physician",
    ],
  },
  {
    id: "metformin",
    name: "Metformin",
    aliases: ["metformin", "Glucophage", "Glumetza", "Fortamet"],
    category: "Medications",
    tier: "watch",
    summary: "Metformin activates AMPK by inhibiting complex I of the mitochondrial electron transport chain. 5-Amino-1MQ raises NAD+ which can activate sirtuins and AMPK via a different mechanism. Both target overlapping metabolic pathways. The combination may have additive metabolic effects, but is not characterized. Metformin also affects one-carbon metabolism — the SAM effects of 5-Amino-1MQ could interact with this.",
    mitigation: [
      "No established dangerous interaction, but both compounds affect overlapping metabolic pathways",
      "If combining: monitor blood glucose more carefully — overlapping metabolic effects could amplify glucose-lowering",
      "Notify your prescribing physician about 5-Amino-1MQ use if on metformin",
    ],
  },
  {
    id: "glp1-agonists",
    name: "GLP-1 receptor agonists (semaglutide, tirzepatide, liraglutide)",
    aliases: ["semaglutide", "Ozempic", "Wegovy", "tirzepatide", "Mounjaro", "Zepbound", "liraglutide", "GLP-1 agonist"],
    category: "Medications",
    tier: "watch",
    summary: "Mechanistically distinct — GLP-1 agonists work via appetite suppression and GI motility; 5-Amino-1MQ works via NNMT inhibition and adipocyte metabolism. No direct pharmacological interaction. Community users increasingly combine these on the theory of additive weight loss from different mechanisms. The combination is entirely unstudied; whether the effects are additive, redundant, or have unexpected interactions is unknown.",
    mitigation: [
      "No established pharmacological interaction between GLP-1 agonists and 5-Amino-1MQ",
      "The combination is increasingly common in community use on the additive mechanism hypothesis — this is unstudied; proceed with awareness that the combined metabolic effect is not characterized",
    ],
  },
  {
    id: "alcohol",
    name: "Alcohol",
    aliases: ["alcohol", "ethanol", "drinking", "beer", "wine", "spirits"],
    category: "Lifestyle",
    tier: "watch",
    summary: "Alcohol affects NAD+/NADH balance — ethanol metabolism produces NADH, depleting the NAD+ pool. 5-Amino-1MQ raises NAD+. The interaction is potentially counteracting: alcohol consuming NAD+ while 5-Amino-1MQ attempts to preserve it. Alcohol also affects liver methylation metabolism. The combined effect on liver NAD+ and SAM is not characterized.",
    mitigation: [
      "Alcohol and 5-Amino-1MQ interact through overlapping NAD+ and liver methylation pathways — the interaction is not characterized but is mechanistically real",
      "Chronic heavy alcohol use combined with NNMT inhibition creates complex liver metabolic perturbation — avoid this combination",
    ],
  },
  {
    id: "vitamin-b3",
    name: "B vitamins — particularly B3 (niacin, nicotinamide) and B12",
    aliases: ["vitamin B3", "niacin", "nicotinamide", "nicotinic acid", "vitamin B12", "B vitamins", "methylcobalamin"],
    category: "Supplements",
    tier: "low",
    summary: "Nicotinamide (niacinamide) is the substrate of NNMT — the same molecule 5-Amino-1MQ is preventing NNMT from consuming. Supplementing nicotinamide alongside 5-Amino-1MQ both provides more NAD+ precursor and gives NNMT more substrate to be inhibited. The interaction is mechanistically layered. B12 (methylcobalamin) supports methylation and homocysteine metabolism — potentially relevant given 5-Amino-1MQ's SAM-raising effects.",
    mitigation: [
      "Nicotinamide (niacinamide) supplementation alongside 5-Amino-1MQ: low-dose nicotinamide is unlikely to be harmful; very high doses add complexity to an already-complex pathway",
      "B12 for methylation support: generally low concern, but the full methylation interaction with 5-Amino-1MQ is not characterized",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function FiveAmino1MQInteractionsPanel() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return INTERACTIONS.filter((e) => {
      const matchCat = activeCat === "All" || e.category === activeCat;
      if (!matchCat) return false;
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) ||
        e.aliases.some((a) => a.toLowerCase().includes(q)) ||
        e.summary.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
      );
    });
  }, [query, activeCat]);

  return (
    <div className="reta-interactions">

      {/* ── Context note ── */}
      <div className="reta-interactions__context">
        5-Amino-1MQ has no characterized pharmacological interactions — all interactions listed here are mechanism-based reasoning from what is known about the NNMT/NAD+/SAM pathway. Cancer treatment is the primary flag (particularly PARP inhibitors). NAD+ precursor stacking (NMN/NR + 5-Amino-1MQ) and SAMe supplementation are worth avoiding given the redundant and uncharacterized metabolic effects. For most other medications, notify your physician and monitor.
      </div>

      {/* ── Search + filter ── */}
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

      {/* ── Results ── */}
      <div className="reta-interactions__list">
        {results.length === 0 ? (
          <div className="reta-interactions__empty">No interactions found for that search.</div>
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
