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
    id: "mot-prokinetics",
    name: "Prokinetic drugs",
    aliases: [
      "metoclopramide",
      "domperidone",
      "prucalopride",
      "cisapride",
      "mosapride",
    ],
    category: "GI motility agents",
    tier: "watch",
    summary:
      "Combining exogenous motilin (or MLNR agonism) with other prokinetic agents creates additive GI motility stimulation. The result is likely excessive GI cramping, urgency, and diarrhea. There is no clinical rationale for stacking prokinetics \u2014 if one agent is insufficient, the clinical response is typically to reassess the underlying diagnosis rather than add a second prokinetic.",
    mitigation: [
      "Do not combine motilin/MLNR agonists with metoclopramide, domperidone, or prucalopride.",
      "If using erythromycin for prokinesis, do not add another prokinetic concurrently.",
      "Additive motility effects increase electrolyte derangement risk from diarrhea \u2014 monitor electrolytes if diarrhea is significant.",
    ],
  },
  {
    id: "mot-erythromycin",
    name: "Erythromycin",
    aliases: ["E-mycin", "Ery-Tab", "Erythrocin"],
    category: "Macrolide antibiotic / MLNR agonist",
    tier: "watch",
    summary:
      "Erythromycin is itself an MLNR agonist \u2014 combining it with any other MLNR-active agent creates additive motilin receptor stimulation. Additionally, erythromycin at antibiotic doses carries QT prolongation risk, which is amplified by any other QT-prolonging agent in the regimen. This is an antibiotic property, not a motilin receptor property, but clinically relevant when erythromycin is used as a prokinetic.",
    mitigation: [
      "Do not combine erythromycin with other MLNR agonists.",
      "Check for baseline QT prolongation before using erythromycin as a prokinetic.",
      "Avoid combining erythromycin with other QT-prolonging drugs (antipsychotics, certain antiarrhythmics, azithromycin).",
    ],
  },
  {
    id: "mot-standard-meds",
    name: "Standard medications",
    aliases: ["antihypertensives", "statins", "antidepressants", "proton pump inhibitors"],
    category: "General medications",
    tier: "low",
    summary:
      "No pharmacokinetic interactions between exogenous motilin peptide and standard medications are expected. Motilin is a peptide \u2014 it is degraded by peptidases, not by hepatic CYP enzymes. The main interaction concern is pharmacodynamic (additive GI motility effects), not pharmacokinetic.",
    mitigation: [
      "No specific precautions for standard medication combinations.",
      "Monitor for additive GI effects if already on medications that affect gut motility.",
    ],
  },
  {
    id: "mot-supplements",
    name: "Supplements",
    aliases: ["magnesium", "vitamin C", "probiotic", "fiber supplements", "ginger"],
    category: "Supplements",
    tier: "low",
    summary:
      "No meaningful interactions between exogenous motilin and standard supplements. Some supplements (high-dose magnesium, fiber) independently affect GI motility \u2014 these additive effects are mild and unlikely to be clinically significant, but are worth considering in someone already experiencing GI effects.",
    mitigation: [
      "No specific supplement contraindications for motilin.",
      "Consider reducing high-dose magnesium or osmotic agents if experiencing GI cramping.",
    ],
  },
];

const TIER_STYLE: Record<
  Tier,
  { bg: string; border: string; dot: string; label: string; labelColor: string }
> = {
  flag: {
    bg: "rgba(158,56,0,0.07)",
    border: "rgba(158,56,0,0.20)",
    dot: "#9e3800",
    label: "Stop signal",
    labelColor: "#9e3800",
  },
  watch: {
    bg: "rgba(124,82,0,0.06)",
    border: "rgba(124,82,0,0.17)",
    dot: "#7c5200",
    label: "Worth watching",
    labelColor: "#7c5200",
  },
  low: {
    bg: "rgba(21,100,58,0.05)",
    border: "rgba(21,100,58,0.13)",
    dot: "#155e38",
    label: "Low concern",
    labelColor: "#155e38",
  },
};

export default function MotilinInteractionsPanel() {
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
            No interactions found for \u201c{query}\u201d. That doesn\u2019t mean none exist \u2014 it means this database doesn\u2019t have a specific entry.
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
                  <span
                    className="reta-interactions__dot"
                    style={{ background: st.dot }}
                  />
                  <div>
                    <div className="reta-interactions__entry-name">{entry.name}</div>
                    {entry.aliases.length > 0 && (
                      <div className="reta-interactions__entry-aliases">
                        {entry.aliases.join(", ")}
                      </div>
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
