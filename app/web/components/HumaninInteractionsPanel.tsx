"use client";

/**
 * HumaninInteractionsPanel — interaction intelligence for Humanin.
 * Key frame: JAK2/STAT3 activation creates overlap with certain medications;
 * the mitochondrial/metabolic effects create theoretical interactions with
 * metabolic drugs. No clinical pharmacokinetic interaction data exists.
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
    id: "jak-inhibitors",
    name: "JAK inhibitors (ruxolitinib, tofacitinib, baricitinib, upadacitinib)",
    aliases: ["JAK inhibitor", "ruxolitinib", "Jakafi", "tofacitinib", "Xeljanz", "baricitinib", "Olumiant", "upadacitinib", "Rinvoq"],
    category: "Medications",
    tier: "flag",
    summary: "Mechanistic conflict — humanin activates JAK2/STAT3 signaling for its protective effects; JAK inhibitors block JAK kinases (including JAK2) to reduce inflammatory signaling. Using both simultaneously creates direct mechanistic opposition: humanin activates the pathway that JAK inhibitors are blocking. In inflammatory disease contexts (rheumatoid arthritis, myelofibrosis, ulcerative colitis) where JAK inhibitors are prescribed, the reason for suppressing JAK signaling is clinical — adding humanin to reactivate the pathway undermines the treatment.",
    mitigation: [
      "On JAK inhibitors for any indication: do not combine with humanin without discussing with your prescribing physician — humanin activates the pathway JAK inhibitors are suppressing",
      "The combination is not characterized pharmacologically, but the mechanistic conflict is direct",
    ],
  },
  {
    id: "cancer-jak-stat3",
    name: "Cancer treatments — particularly in STAT3-dependent cancers",
    aliases: ["cancer", "chemotherapy", "STAT3", "targeted therapy", "oncology", "lymphoma", "hepatocellular carcinoma"],
    category: "Cancer Treatment",
    tier: "flag",
    summary: "STAT3 is a known oncogene pathway component — constitutively activated in multiple cancer types. Humanin activates STAT3 for its protective signaling. In cancer treatment contexts where STAT3 inhibition or downstream pathway suppression is relevant (certain lymphomas, hepatocellular carcinoma, some breast cancer subtypes), exogenous STAT3 activation from humanin is potentially counter-therapeutic. Cancer treatment is a hard stop for humanin use without oncology guidance.",
    mitigation: [
      "Any active cancer treatment: do not use humanin without oncology guidance",
      "For STAT3-dependent cancer types specifically, the JAK2/STAT3 activation from humanin is directly counter-therapeutic",
    ],
  },
  {
    id: "metformin",
    name: "Metformin",
    aliases: ["metformin", "Glucophage", "Glumetza"],
    category: "Medications",
    tier: "watch",
    summary: "Both humanin and metformin have insulin-sensitizing effects with different mechanisms. Humanin improves insulin sensitivity through JAK2/STAT3-mediated hepatic effects; metformin through AMPK and complex I inhibition. Both also affect mitochondrial function. The combination may have additive metabolic effects. No direct pharmacological interaction is established, but the overlapping metabolic pathway effects warrant awareness.",
    mitigation: [
      "No established dangerous interaction, but both compounds affect overlapping metabolic pathways",
      "If combining: monitor glucose levels more carefully — additive insulin sensitization could lower blood glucose more than either alone",
      "Notify prescribing physician about humanin use if on metformin",
    ],
  },
  {
    id: "nad-precursors",
    name: "NAD+ precursors — NMN, NR",
    aliases: ["NMN", "nicotinamide mononucleotide", "NR", "nicotinamide riboside", "NAD+"],
    category: "Supplements",
    tier: "watch",
    summary: "Both humanin and NAD+ precursors target mitochondrial function and aging biology through different mechanisms. Humanin signals via surface receptors to activate protective programs; NMN/NR raise NAD+ to support mitochondrial energy metabolism and sirtuin activity. These are mechanistically distinct and potentially complementary approaches. No adverse interaction is expected. The combination is used in longevity-focused protocols.",
    mitigation: [
      "No adverse interaction between humanin and NAD+ precursors",
      "The combination is mechanistically complementary (receptor signaling vs. metabolic fuel); no concerning overlap identified",
    ],
  },
  {
    id: "mots-c",
    name: "MOTS-c",
    aliases: ["MOTS-c", "mitochondria-derived peptide", "mitokine"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "Humanin and MOTS-c are sibling mitokines from the same mitochondrial genome region. MOTS-c has a more metabolic focus (AMPK activation, glucose uptake in skeletal muscle); humanin is more neuroprotection-focused (JAK2/STAT3, anti-apoptosis). The combination provides two mitokine pathways simultaneously. No adverse interaction is expected and the mechanisms are complementary. Whether the combination produces additive benefit over either alone is not established.",
    mitigation: [
      "No adverse interaction between humanin and MOTS-c",
      "The combination is mechanistically complementary and increasingly used in longevity protocols — neither has established human efficacy independently, so the combination remains investigational",
    ],
  },
  {
    id: "insulin",
    name: "Insulin (exogenous)",
    aliases: ["insulin", "exogenous insulin", "Lantus", "Humalog", "Novolog", "basal insulin", "bolus insulin"],
    category: "Medications",
    tier: "watch",
    summary: "Humanin has insulin-sensitizing effects in rodent models — it reduces the insulin requirement for glucose disposal. Combined with exogenous insulin, humanin could increase insulin sensitivity and risk hypoglycemia at insulin doses calibrated without humanin. This is particularly relevant for type 1 diabetics or insulin-dependent type 2 diabetics on fixed insulin dosing.",
    mitigation: [
      "On exogenous insulin: monitor glucose more carefully when starting humanin — increased insulin sensitivity could cause unexpected hypoglycemia at your current insulin dose",
      "Discuss humanin use with your endocrinologist before starting if on insulin",
    ],
  },
  {
    id: "antioxidants",
    name: "Antioxidant supplements — CoQ10, alpha-lipoic acid, vitamin E/C",
    aliases: ["CoQ10", "coenzyme Q10", "alpha-lipoic acid", "ALA", "vitamin E", "vitamin C", "antioxidant"],
    category: "Supplements",
    tier: "low",
    summary: "Humanin has antioxidant and mitochondrial protective properties in addition to its receptor signaling. Standard antioxidant supplements support mitochondrial function through complementary mechanisms. No adverse interaction expected. The combination is reasonable in a mitochondrial health protocol.",
    mitigation: [
      "No adverse interaction between humanin and antioxidant supplements",
      "Standard mitochondrial support supplements are compatible",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function HumaninInteractionsPanel() {
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
        Humanin&apos;s interactions derive primarily from JAK2/STAT3 activation (conflict with JAK inhibitors; cancer treatment concern) and metabolic insulin-sensitizing effects (additive with metformin and insulin). No clinical pharmacokinetic interaction data exists — all interactions are mechanism-based. MOTS-c and NAD+ precursors are compatible and complementary.
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
