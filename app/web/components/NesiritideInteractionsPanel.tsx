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
    id: "nes-vasodilators",
    name: "IV vasodilators",
    aliases: [
      "nitroglycerin",
      "nitroprusside",
      "hydralazine",
      "nicardipine",
      "clevidipine",
    ],
    category: "Vasodilatory agents",
    tier: "flag",
    summary:
      "Combining nesiritide with other IV vasodilators produces additive hypotension that can be rapid and severe. In the ADHF setting, patients frequently receive IV nitroglycerin or nitroprusside concurrently \u2014 this combination requires careful dose titration and continuous hemodynamic monitoring. The vasodilatory mechanisms are complementary (nitrates work via NO/cGMP; nesiritide via NPR-A/cGMP), making the additive effect pharmacologically predictable and clinically significant.",
    mitigation: [
      "Reduce the dose of the existing vasodilator before initiating nesiritide.",
      "Titrate nesiritide slowly with continuous blood pressure monitoring.",
      "Have IV saline bolus and vasopressor backup available if hypotension becomes severe.",
      "Target systolic BP goal \u2265100 mmHg during combined vasodilator therapy in ADHF.",
    ],
  },
  {
    id: "nes-loop-diuretics",
    name: "Loop diuretics",
    aliases: ["furosemide", "Lasix", "bumetanide", "torsemide", "ethacrynic acid"],
    category: "Diuretics",
    tier: "watch",
    summary:
      "Loop diuretics are used together with nesiritide in most ADHF management protocols \u2014 diuresis is the primary goal. However, the combination produces additive volume depletion and natriuresis, increasing the risk of hypotension, hypokalemia, hyponatremia, and worsening renal function. The IV incompatibility of furosemide and bumetanide with nesiritide in the same line is a separate, practical concern.",
    mitigation: [
      "Do NOT mix furosemide or bumetanide with nesiritide in the same IV line \u2014 physical incompatibility reduces nesiritide activity.",
      "Monitor electrolytes (potassium, sodium, magnesium) and creatinine with combined use.",
      "Titrate diuretic dose based on urine output and renal function trends.",
      "Assess volume status frequently \u2014 over-diuresis is a real risk.",
    ],
  },
  {
    id: "nes-ace-arb",
    name: "ACE inhibitors and ARBs",
    aliases: [
      "lisinopril",
      "enalapril",
      "ramipril",
      "losartan",
      "valsartan",
      "candesartan",
      "sacubitril/valsartan",
    ],
    category: "Renin-angiotensin system agents",
    tier: "watch",
    summary:
      "In ADHF, patients are often on background ACE inhibitor or ARB therapy (or sacubitril/valsartan for HFrEF). Adding nesiritide to an existing RAAS blockade increases hypotension risk \u2014 both pathways reduce afterload through different mechanisms. Enalaprilat (IV ACE inhibitor) is specifically incompatible with nesiritide in the same IV line. The combination is manageable but requires deliberate hemodynamic monitoring and dose adjustment.",
    mitigation: [
      "Consider holding or reducing ACE inhibitor/ARB dose when initiating nesiritide in the acute setting.",
      "Do NOT administer enalaprilat in the same IV line as nesiritide.",
      "Monitor blood pressure and renal function closely with combined RAAS blockade and nesiritide.",
      "Sacubitril/valsartan (Entresto) patients may have heightened natriuretic peptide sensitivity \u2014 use lower nesiritide starting doses.",
    ],
  },
  {
    id: "nes-hf-standard",
    name: "Standard heart failure medications",
    aliases: [
      "carvedilol",
      "metoprolol succinate",
      "spironolactone",
      "eplerenone",
      "digoxin",
      "ivabradine",
    ],
    category: "Heart failure pharmacotherapy",
    tier: "low",
    summary:
      "Background heart failure medications (beta-blockers, mineralocorticoid antagonists, digoxin) do not have significant pharmacokinetic interactions with nesiritide. Beta-blockers may blunt the compensatory heart rate response to nesiritide-induced vasodilation, but this is generally manageable in monitored settings. Digoxin toxicity risk is not directly increased by nesiritide, though the clinical context of ADHF (altered renal clearance) requires digoxin level monitoring independently.",
    mitigation: [
      "Continue background HF medications unless hemodynamic instability requires temporary dose reduction.",
      "Monitor digoxin levels in the ADHF setting given variable renal clearance.",
      "No dose adjustment of beta-blockers specifically required for nesiritide co-administration.",
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

export default function NesiritideInteractionsPanel() {
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
