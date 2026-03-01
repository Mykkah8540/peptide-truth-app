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
    id: "vasodilators",
    name: "Other vasodilators",
    aliases: ["nitroglycerin", "isosorbide", "nitroprusside", "hydralazine", "amlodipine"],
    category: "Cardiovascular",
    tier: "watch",
    summary:
      "Nesiritide causes potent vasodilation via cGMP. When combined with other vasodilatory agents \u2014 " +
      "nitrates (nitroglycerin, isosorbide mononitrate), nitroprusside, hydralazine, or calcium channel " +
      "blockers \u2014 there is additive blood pressure lowering. In ADHF patients who may already have " +
      "marginal perfusion pressure, this combination requires close hemodynamic monitoring and may " +
      "necessitate dose reduction of one or both agents.",
    mitigation: [
      "Concurrent vasodilator use with nesiritide requires continuous BP monitoring",
      "Dose reduction or temporary hold of nitrates may be needed if systolic BP falls below target",
      "This combination is sometimes intentional (multi-modal vasodilation in ADHF) but must be supervised",
    ],
  },
  {
    id: "ace-inhibitors",
    name: "ACE Inhibitors",
    aliases: ["enalapril", "lisinopril", "ramipril", "captopril", "perindopril"],
    category: "Cardiovascular",
    tier: "watch",
    summary:
      "ACE inhibitors are standard long-term therapy in heart failure with reduced ejection fraction " +
      "(HFrEF) and are often continued during ADHF hospitalization. When nesiritide is added, " +
      "additive vasodilation and hypotension risk increases. RAAS suppression also reduces the " +
      "compensatory neurohormonal response to nesiritide-induced vasodilation, potentially " +
      "amplifying blood pressure effects.",
    mitigation: [
      "Monitor blood pressure closely when nesiritide is initiated in ACE inhibitor\u2013maintained patients",
      "ACE inhibitors should generally be continued during ADHF hospitalization for their long-term benefit",
      "Temporary dose reduction or hold may be considered if hypotension is clinically limiting",
    ],
  },
  {
    id: "diuretics",
    name: "Loop diuretics",
    aliases: ["furosemide", "torsemide", "bumetanide", "Lasix"],
    category: "Cardiovascular",
    tier: "watch",
    summary:
      "Loop diuretics are first-line for volume overload in ADHF and are almost always co-administered " +
      "with nesiritide. Both agents promote natriuresis and volume depletion. The combination is " +
      "pharmacodynamically synergistic for decongestion, but additive volume depletion can precipitate " +
      "hypotension, renal function worsening, and electrolyte disturbances (hypokalemia, hyponatremia).",
    mitigation: [
      "Monitor fluid balance, weight, and electrolytes daily during combined nesiritide + diuretic therapy",
      "Renal function (creatinine, BUN) should be checked regularly given shared renal perfusion risk",
      "Potassium and magnesium replacement is commonly needed with high-dose loop diuretic use",
    ],
  },
  {
    id: "hf-medications",
    name: "Standard heart failure medications (non-acute)",
    aliases: ["carvedilol", "metoprolol", "sacubitril", "spironolactone", "eplerenone", "dapagliflozin"],
    category: "Cardiovascular",
    tier: "low",
    summary:
      "Guideline-directed medical therapy for heart failure (beta-blockers, sacubitril/valsartan, " +
      "aldosterone antagonists, SGLT2 inhibitors) does not have clinically significant pharmacokinetic " +
      "interactions with BNP as a biomarker. When BNP is used as a monitoring tool, it is important " +
      "to know that sacubitril/valsartan (entresto) raises BNP levels while lowering NT-proBNP \u2014 " +
      "this means BNP is not a reliable monitoring marker in patients on sacubitril.",
    mitigation: [
      "Use NT-proBNP (not BNP) for monitoring in patients taking sacubitril/valsartan \u2014 sacubitril " +
      "inhibits neprilysin, which degrades BNP, causing BNP levels to rise artificially",
      "No pharmacokinetic interactions with standard HF medications in the non-acute setting",
    ],
  },
  {
    id: "supplements",
    name: "Supplements with cardiovascular effects",
    aliases: ["CoQ10", "hawthorn", "magnesium", "fish oil", "omega-3"],
    category: "Supplements",
    tier: "low",
    summary:
      "No clinically significant interactions between standard cardiovascular supplements and BNP " +
      "physiology or nesiritide have been established. Magnesium deficiency is common in heart failure " +
      "patients on diuretics and should be monitored and repleted independently of BNP considerations.",
    mitigation: [
      "Magnesium levels should be monitored in heart failure patients on loop diuretics regardless of BNP status",
      "Supplement use does not meaningfully affect BNP interpretation or nesiritide pharmacology",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
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

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function BrainNatriureticPeptideInteractionsPanel() {
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
      <div className="reta-interactions__context">
        Interactions apply to nesiritide (recombinant BNP) as a clinical IV agent in ADHF, and to BNP
        as a biomarker where test interpretation is affected by concurrent medications. No community-use
        interaction context exists.
      </div>
      <div className="reta-interactions__controls">
        <input
          className="reta-interactions__search"
          placeholder="Search drug, supplement, or compound\u2026"
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
