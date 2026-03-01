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
    id: "maz-insulin",
    name: "Insulin and insulin secretagogues",
    aliases: ["sulfonylureas", "glipizide", "glimepiride", "glyburide", "insulin glargine", "insulin lispro"],
    category: "Antidiabetic agents",
    tier: "watch",
    summary:
      "Mazdutide\u2019s GLP-1 component lowers blood glucose through enhanced insulin secretion and reduced glucagon \u2014 combined with exogenous insulin or sulfonylureas, this creates additive hypoglycemia risk. The GCGR component partially offsets glucose lowering but does not eliminate the combined risk when aggressive insulin dosing is in use.",
    mitigation: [
      "Reduce insulin or secretagogue dose before starting mazdutide.",
      "Monitor fasting and postprandial glucose frequently during titration.",
      "Have a fast-acting glucose source accessible.",
      "Work with a prescriber to adjust the regimen \u2014 do not self-manage this combination.",
    ],
  },
  {
    id: "maz-glp1",
    name: "Other GLP-1 receptor agonists",
    aliases: ["semaglutide", "liraglutide", "dulaglutide", "exenatide", "tirzepatide"],
    category: "GLP-1 class",
    tier: "watch",
    summary:
      "Combining mazdutide with another GLP-1 receptor agonist provides no additive benefit on the GLP-1 pathway (receptor saturation) while stacking GI adverse effects and increasing the risk of pancreatitis and other class-related toxicities. There is no rationale for dual GLP-1 agonist therapy.",
    mitigation: [
      "Do not combine mazdutide with any other GLP-1 agonist.",
      "Allow adequate washout before switching agents \u2014 at least 5 half-lives.",
      "Tirzepatide and retatrutide have their own GCGR components; stacking with mazdutide is pharmacologically irrational.",
    ],
  },
  {
    id: "maz-metformin",
    name: "Metformin",
    aliases: ["glucophage"],
    category: "Antidiabetic agents",
    tier: "low",
    summary:
      "Metformin is commonly co-prescribed with GLP-1 agonists in type 2 diabetes management. No pharmacokinetic interaction is expected. The combination is generally well-tolerated, though additive GI side effects (nausea, diarrhea) are possible during titration.",
    mitigation: [
      "Take mazdutide and metformin with food to reduce GI overlap.",
      "Titrate mazdutide slowly if already on metformin.",
      "Monitor for additive GI effects \u2014 typically transient.",
    ],
  },
  {
    id: "maz-supplements",
    name: "Standard supplements",
    aliases: ["multivitamin", "vitamin D", "omega-3", "magnesium", "zinc"],
    category: "Supplements",
    tier: "low",
    summary:
      "No meaningful interactions expected between mazdutide and standard supplement use. GLP-1-class agents may slow gastric emptying, which can affect absorption timing for oral supplements but rarely causes clinical problems.",
    mitigation: [
      "Take supplements separately from the injection timing if concerned about absorption.",
      "No specific supplement contraindications for mazdutide are identified.",
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

export default function MazdutideInteractionsPanel() {
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
