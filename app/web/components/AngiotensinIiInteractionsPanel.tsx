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
    id: "ang2-raas-inhibitors",
    name: "ACE inhibitors and ARBs",
    aliases: ["lisinopril", "enalapril", "ramipril", "losartan", "valsartan", "candesartan", "irbesartan", "Zestril", "Cozaar"],
    category: "RAAS agents",
    tier: "flag",
    summary:
      "ACE inhibitors block angiotensin-II production; ARBs block the AT1 receptor that angiotensin-II acts on. Prior chronic treatment with either class upregulates RAAS components (renin, ACE, angiotensin-II receptors) via feedback disinhibition. This upregulation may paradoxically increase angiotensin-II sensitivity in shock, but the net hemodynamic effect is unpredictable and requires careful dose titration.",
    mitigation: [
      "Document all pre-admission RAAS inhibitor use before initiating Giapreza.",
      "Expect potentially increased sensitivity to angiotensin-II in patients on chronic ACE inhibitors or ARBs — start at the lowest dose and titrate slowly.",
      "Do not attempt to &apos;override&apos; ARB blockade with high-dose angiotensin-II; the AT1 receptor will remain partially blocked.",
      "Renin levels at baseline can help characterize the degree of RAAS upregulation.",
    ],
  },
  {
    id: "ang2-catecholamines",
    name: "Norepinephrine and catecholamines",
    aliases: ["norepinephrine", "epinephrine", "dopamine", "phenylephrine", "vasopressin", "Levophed"],
    category: "Vasopressors",
    tier: "watch",
    summary:
      "Combination vasopressor therapy is standard in distributive shock; angiotensin-II is added specifically to allow catecholamine dose reduction. The combination has additive vasopressor effects and requires careful hemodynamic monitoring to avoid hypertension overshoot. The goal is catecholamine-sparing, not additive maximization.",
    mitigation: [
      "Titrate catecholamine doses down as angiotensin-II takes effect — this is the intended therapeutic goal.",
      "Maintain continuous arterial line monitoring during any vasopressor adjustments.",
      "Target MAP 65&ndash;75 mmHg; avoid MAP &gt; 90 mmHg.",
      "Have a vasopressor weaning protocol in place before initiating Giapreza.",
    ],
  },
  {
    id: "ang2-anticoagulants",
    name: "Heparin and anticoagulants",
    aliases: ["unfractionated heparin", "enoxaparin", "fondaparinux", "UFH", "Lovenox"],
    category: "Anticoagulants",
    tier: "watch",
    summary:
      "Concurrent anticoagulation with heparin or low-molecular-weight heparin is mandated by the Giapreza label due to the black box thrombosis risk. This is not a pharmacokinetic interaction — it is a required co-administration for safe use. Failure to provide VTE prophylaxis concurrent with angiotensin-II constitutes a prescribing error.",
    mitigation: [
      "Ensure VTE prophylaxis (UFH 5000 units SC BID or LMWH equivalents) is ordered before starting Giapreza.",
      "Confirm anticoagulation status is active at time of initiation.",
      "If full anticoagulation is required for another indication (e.g., AFib, PE), document that this also satisfies the Giapreza thrombosis prophylaxis requirement.",
      "Monitor for bleeding, particularly at catheter insertion sites, given dual vasopressor + anticoagulant use in critically ill patients.",
    ],
  },
  {
    id: "ang2-corticosteroids",
    name: "Corticosteroids",
    aliases: ["hydrocortisone", "dexamethasone", "methylprednisolone", "fludrocortisone", "Solu-Cortef"],
    category: "Corticosteroids",
    tier: "low",
    summary:
      "Hydrocortisone is commonly used alongside vasopressors in refractory septic shock (relative adrenal insufficiency). There is no direct pharmacological interaction between corticosteroids and angiotensin-II at the AT1 receptor. Corticosteroids may have additive hemodynamic benefit by sensitizing vascular smooth muscle to vasopressors generally, including angiotensin-II.",
    mitigation: [
      "No dose adjustment of angiotensin-II is required when corticosteroids are started or stopped.",
      "Monitor hemodynamics when corticosteroids are added — vasopressor requirements may decrease.",
      "Standard shock protocols (e.g., Surviving Sepsis Campaign) guide corticosteroid use; these are not modified by concomitant Giapreza use.",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function AngiotensinIiInteractionsPanel() {
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
        Angiotensin-II interactions are managed in an ICU context with continuous monitoring.
        The most important &mdash; mandatory anticoagulation for thrombosis prophylaxis &mdash;
        is a required co-administration, not a contraindication. Prior RAAS inhibitor use
        meaningfully affects sensitivity and requires careful dose titration.
      </div>
      <div className="reta-interactions__controls">
        <input
          className="reta-interactions__search"
          placeholder="Search drug, supplement, or compound&hellip;"
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
