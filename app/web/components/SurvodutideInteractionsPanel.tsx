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
    id: "survo-insulin",
    name: "Insulin (all types)",
    aliases: ["insulin glargine", "insulin degludec", "insulin lispro", "basal insulin", "bolus insulin", "tresiba", "lantus", "toujeo", "humalog", "novolog"],
    category: "Antidiabetic \u2014 insulin",
    tier: "watch",
    summary:
      "GLP-1R agonism augments glucose-dependent insulin secretion, which adds to exogenous insulin effects and significantly increases hypoglycemia risk. Survodutide\u2019s glucagon arm partially counteracts hypoglycemia under normal conditions, but this protection is not reliable at insulin doses calibrated before survodutide was added. Dose reduction of basal and/or bolus insulin is typically required when initiating survodutide.",
    mitigation: [
      "Reduce basal insulin dose by 10\u201320% when initiating survodutide; adjust further based on glucose monitoring.",
      "Increase self-monitoring frequency (at least daily fasting glucose) during the first 4\u20138 weeks.",
      "Ensure the patient can recognize and treat hypoglycemia; have fast-acting carbohydrates accessible.",
    ],
  },
  {
    id: "survo-sulfonylureas",
    name: "Sulfonylureas (glipizide, glimepiride, glyburide)",
    aliases: ["glipizide", "glucotrol", "glimepiride", "amaryl", "glyburide", "diabeta", "micronase", "sulfonylurea"],
    category: "Antidiabetic \u2014 insulin secretagogue",
    tier: "watch",
    summary:
      "Sulfonylureas stimulate insulin release in a glucose-independent manner. Combined with GLP-1R agonism, the additive insulinotropic effect raises hypoglycemia risk substantially. Survodutide\u2019s glucagon component provides some glucose-raising counterbalance but is not a reliable safeguard. This combination is the most common cause of medication-related hypoglycemia in the GLP-1 drug class.",
    mitigation: [
      "Reduce sulfonylurea dose by 25\u201350% when starting survodutide; further titrate based on glucose.",
      "Some prescribers choose to discontinue sulfonylureas entirely when adding a GLP-1R agonist if glycemic control allows.",
      "Patient education on hypoglycemia recognition is essential.",
    ],
  },
  {
    id: "survo-other-glp1",
    name: "Other GLP-1 receptor agonists (semaglutide, liraglutide, dulaglutide, exenatide)",
    aliases: ["semaglutide", "ozempic", "wegovy", "liraglutide", "victoza", "saxenda", "dulaglutide", "trulicity", "exenatide", "byetta", "bydureon"],
    category: "GLP-1 receptor agonist",
    tier: "flag",
    summary:
      "Combining survodutide with another GLP-1 receptor agonist has no established benefit and carries additive risks: GI toxicity, hypoglycemia (with co-medications), potential additive effects on the thyroid C-cell warning, and increased heart rate. There is no clinical trial data supporting dual GLP-1R agonist therapy. This combination has no legitimate clinical rationale and should be avoided.",
    mitigation: [
      "Do not combine survodutide with any other GLP-1 receptor agonist.",
      "If transitioning between agents, allow full washout based on each drug\u2019s pharmacokinetics before initiating the next.",
    ],
  },
  {
    id: "survo-metformin",
    name: "Metformin",
    aliases: ["glucophage", "fortamet", "glumetza", "riomet"],
    category: "Antidiabetic \u2014 biguanide",
    tier: "low",
    summary:
      "Metformin and GLP-1R agonists are commonly combined in T2DM management and are considered complementary: metformin reduces hepatic glucose production; GLP-1R agonism augments insulin secretion and suppresses appetite. There is no pharmacokinetic interaction. Survodutide\u2019s GCGR arm additionally suppresses hepatic glucose production via a separate pathway, which is additive to metformin\u2019s mechanism rather than antagonistic. Hypoglycemia risk with metformin alone (without insulin or secretagogues) is low.",
    mitigation: [],
  },
  {
    id: "survo-oral-meds-timing",
    name: "Oral medications with narrow therapeutic windows or time-sensitive absorption",
    aliases: ["warfarin", "levothyroxine", "digoxin", "cyclosporine", "tacrolimus", "oral contraceptives", "thyroid medication"],
    category: "Pharmacokinetics \u2014 gastric emptying delay",
    tier: "watch",
    summary:
      "GLP-1 receptor agonists delay gastric emptying, which can alter the absorption rate (and in some cases total bioavailability) of orally administered drugs. Medications with narrow therapeutic windows \u2014 where small changes in absorption timing translate to clinical consequences \u2014 are most affected. Relevant classes include anticoagulants, immunosuppressants, thyroid hormone replacement, cardiac glycosides, and drugs with a critical absorption window (e.g., enteric-coated formulations that must be delivered to the intestine).",
    mitigation: [
      "Take time-sensitive oral medications at a consistent time relative to survodutide dosing.",
      "For narrow therapeutic window drugs (warfarin, cyclosporine, tacrolimus, levothyroxine), increase monitoring of drug levels and clinical endpoints after survodutide initiation.",
      "Oral contraceptive efficacy is a specific concern; consider barrier methods during the first cycle of survodutide use or during significant dose escalation.",
    ],
  },
  {
    id: "survo-sglt2",
    name: "SGLT-2 inhibitors (empagliflozin, dapagliflozin, canagliflozin)",
    aliases: ["empagliflozin", "jardiance", "dapagliflozin", "farxiga", "canagliflozin", "invokana", "sglt2"],
    category: "Antidiabetic \u2014 SGLT-2 inhibitor",
    tier: "low",
    summary:
      "SGLT-2 inhibitors and GLP-1R agonists are frequently combined in cardiometabolic medicine and are considered complementary with distinct mechanisms. The combination with survodutide is theoretically favorable: SGLT-2 inhibitors reduce renal glucose reabsorption and have independent cardiovascular and renal benefits. There is no pharmacokinetic interaction. Hypoglycemia risk with the combination (absent insulin or sulfonylureas) is low. The glucagon arm of survodutide and SGLT-2 inhibitor-induced glucagonemia could theoretically add, but clinical significance is not established.",
    mitigation: [],
  },
  {
    id: "survo-antihypertensives",
    name: "Antihypertensives (especially heart-rate-affecting agents)",
    aliases: ["beta blocker", "metoprolol", "atenolol", "propranolol", "carvedilol", "diltiazem", "verapamil", "calcium channel blocker"],
    category: "Cardiovascular",
    tier: "watch",
    summary:
      "Survodutide increases resting heart rate through GLP-1R and GCGR agonism. Beta-blockers and non-dihydropyridine calcium channel blockers that control heart rate may partially counteract this effect or interact with heart rate management. More importantly, the glucagon arm may blunt the efficacy of beta-blockers in some cardiovascular contexts. Beta-blockers can also mask tachycardia as a symptom of hypoglycemia.",
    mitigation: [
      "Monitor resting heart rate at each clinical visit during survodutide dose escalation.",
      "Discuss with your cardiologist before initiating survodutide if you are on complex heart rate management regimens.",
    ],
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

export default function SurvodutideInteractionsPanel() {
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
