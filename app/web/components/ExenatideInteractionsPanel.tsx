"use client";

/**
 * ExenatideInteractionsPanel — interaction intelligence for Exenatide (Byetta / Bydureon).
 * Key frame: insulin and sulfonylurea hypoglycemia risk are the most clinically important
 * interactions; gastric emptying delay creates drug absorption interactions for orally
 * administered compounds with narrow therapeutic windows. Well-characterized as an
 * FDA-approved drug with defined drug interaction profile.
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
    id: "insulin",
    name: "Insulin — all formulations (basal, bolus, premix)",
    aliases: ["insulin", "basal insulin", "bolus insulin", "glargine", "Lantus", "detemir", "Levemir", "degludec", "Tresiba", "lispro", "aspart", "glulisine", "Humalog", "NovoLog", "Apidra", "NPH", "regular insulin"],
    category: "Medications",
    tier: "flag",
    summary: "Exenatide amplifies insulin-mediated glucose lowering by suppressing glucagon and slowing gastric emptying. When combined with insulin therapy, the additive effect on glucose lowering creates meaningful hypoglycemia risk — the FDA added a dedicated interaction warning. The AMIGO trial data showed that hypoglycemia was substantially more common in patients on background insulin therapy. This does not mean the combination is contraindicated (many T2D patients use both), but it requires proactive insulin dose reduction when initiating exenatide.",
    mitigation: [
      "Reduce the insulin dose by 20% or as directed by the prescribing physician when adding exenatide to an existing insulin regimen",
      "Monitor blood glucose more frequently in the first 4 weeks of combined therapy — hypoglycemia is most common during initiation",
      "Have a fast-acting glucose source available during the adjustment period",
      "If on basal insulin only: consider reducing basal dose first; the risk is highest with bolus/prandial insulin combinations",
    ],
  },
  {
    id: "sulfonylureas",
    name: "Sulfonylureas — glipizide, glyburide, glimepiride, glipizide XL",
    aliases: ["sulfonylurea", "glipizide", "glyburide", "glimepiride", "Glucotrol", "DiaBeta", "Micronase", "Amaryl", "chlorpropamide", "tolbutamide"],
    category: "Medications",
    tier: "flag",
    summary: "Sulfonylureas stimulate insulin secretion in a glucose-independent manner — unlike exenatide, they drive insulin release regardless of blood glucose level. Combining a sulfonylurea with exenatide (which also promotes insulin secretion and slows gastric emptying) increases hypoglycemia risk significantly. In the AMIGO trials, patients on sulfonylurea backgrounds experienced more hypoglycemia than any other background therapy group. The standard clinical approach is to reduce sulfonylurea dose when adding exenatide.",
    mitigation: [
      "Reduce the sulfonylurea dose by approximately 50% when initiating exenatide — the prescribing physician should guide exact dose",
      "Monitor blood glucose more frequently in the first 4-8 weeks of combined therapy",
      "Consider whether the sulfonylurea is still needed once exenatide is established — some patients can reduce or discontinue sulfonylureas with adequate glycemic control on exenatide alone",
      "If hypoglycemia occurs: treat appropriately, report to physician, and discuss further dose adjustment",
    ],
  },
  {
    id: "warfarin",
    name: "Warfarin (Coumadin) — anticoagulant with narrow therapeutic window",
    aliases: ["warfarin", "Coumadin", "anticoagulant", "blood thinner", "INR", "coumarin"],
    category: "Medications",
    tier: "watch",
    summary: "Exenatide slows gastric emptying, which delays the absorption of orally administered drugs including warfarin. Delayed warfarin absorption can transiently reduce warfarin levels and affect INR. Post-marketing reports of altered INR in exenatide users have been documented. Given that warfarin has a narrow therapeutic window (too low → thrombosis; too high → bleeding), any interaction that shifts its pharmacokinetics warrants closer INR monitoring during exenatide initiation.",
    mitigation: [
      "Monitor INR more frequently (weekly) for the first 4 weeks after starting exenatide in patients on warfarin",
      "Administer warfarin at least 1 hour before the exenatide injection to minimize the impact of gastric emptying delay on absorption — though the gastric emptying effect extends beyond the injection window",
      "Report significant INR changes to the anticoagulation clinic or prescribing physician",
      "No dose adjustment of warfarin is preemptively recommended — adjust based on monitored INR response",
    ],
  },
  {
    id: "oral-contraceptives",
    name: "Oral contraceptives and other time-sensitive oral medications",
    aliases: ["oral contraceptive", "birth control pill", "OCP", "ethinyl estradiol", "norethindrone", "levonorgestrel", "time-sensitive oral medication", "narrow therapeutic window drug"],
    category: "Medications",
    tier: "watch",
    summary: "Exenatide's gastric emptying delay affects the absorption of all orally administered medications to some extent. For medications with time-sensitive absorption profiles or narrow therapeutic windows, this matters. Oral contraceptives are specifically mentioned in the exenatide prescribing information — peak concentrations can be delayed and reduced. FDA labeling recommends taking oral contraceptives at least 1 hour before exenatide (or 4 hours after) to minimize the pharmacokinetic interaction.",
    mitigation: [
      "Take oral contraceptives at least 1 hour before the exenatide injection — or 4 hours after — to minimize the gastric emptying interaction",
      "For other time-sensitive oral medications (antibiotics, antiepileptics with narrow windows, thyroid medications): take at least 1 hour before exenatide injection",
      "Discuss with prescribing physician for any oral medication where peak concentration timing is critical to the therapeutic effect",
    ],
  },
  {
    id: "other-glp1",
    name: "Other GLP-1 receptor agonists — semaglutide, liraglutide, dulaglutide, tirzepatide",
    aliases: ["semaglutide", "Ozempic", "Wegovy", "Rybelsus", "liraglutide", "Victoza", "Saxenda", "dulaglutide", "Trulicity", "tirzepatide", "Mounjaro", "Zepbound", "GLP-1 agonist", "GLP-1 analog"],
    category: "Medications",
    tier: "flag",
    summary: "Combining two GLP-1 receptor agonists is contraindicated — there is no clinical benefit and the combination would produce additive GI toxicity (severe nausea, vomiting) and an uncharacterized pharmacological interaction at the GLP-1R. Exenatide and any other GLP-1 agonist should not be used simultaneously. This includes the dual GLP-1/GIP agonist tirzepatide, which activates the GLP-1R. If switching from exenatide to another GLP-1 agonist, appropriate washout and titration guidance from the prescribing physician should be followed.",
    mitigation: [
      "Do not combine exenatide with any other GLP-1 receptor agonist (semaglutide, liraglutide, dulaglutide, albiglutide, tirzepatide) — this is a contraindicated combination",
      "When switching between GLP-1 agonists: follow the prescribing physician's guidance; the transition does not require a specific washout period but titration of the new agent should follow its standard protocol",
    ],
  },
  {
    id: "metformin",
    name: "Metformin — first-line T2D medication",
    aliases: ["metformin", "Glucophage", "Glucophage XR", "metformin XR", "biguanide"],
    category: "Medications",
    tier: "low",
    summary: "Metformin is the most commonly co-prescribed medication with exenatide in T2D management. The combination was studied in the AMIGO-2 trial. Metformin does not promote insulin secretion and has a different mechanism (hepatic glucose production reduction), so hypoglycemia risk is not increased. The combination is considered standard of care in T2D and is both safe and complementary. No dose adjustment of either drug is required for the combination.",
    mitigation: [
      "No specific safety concern with metformin + exenatide — this is the most common therapeutic combination in T2D",
      "No dose adjustment required for either drug based on the combination alone",
    ],
  },
  {
    id: "sglt2",
    name: "SGLT-2 inhibitors — empagliflozin, dapagliflozin, canagliflozin",
    aliases: ["SGLT-2", "empagliflozin", "Jardiance", "dapagliflozin", "Farxiga", "canagliflozin", "Invokana", "ertugliflozin", "Steglatro", "gliflozin"],
    category: "Medications",
    tier: "low",
    summary: "SGLT-2 inhibitors (which lower blood glucose by promoting urinary glucose excretion) are commonly used alongside GLP-1 agonists in T2D management. The combination has been studied and is considered safe — both drugs work through complementary, non-overlapping mechanisms. Hypoglycemia risk is low with this combination (neither drug is an insulin secretagogue). The FDA-approved triple combination of metformin + GLP-1 agonist + SGLT-2 inhibitor is used in guidelines for T2D management.",
    mitigation: [
      "No significant adverse interaction between exenatide and SGLT-2 inhibitors",
      "The combination is used in clinical practice and T2D treatment guidelines; no dose adjustment required based on the combination",
      "Monitor for dehydration — both exenatide (GI side effects) and SGLT-2 inhibitors (osmotic diuresis) can cause volume depletion, which may be additive in the first weeks of combined therapy",
    ],
  },
  {
    id: "alcohol",
    name: "Alcohol",
    aliases: ["alcohol", "ethanol", "drinking", "beer", "wine", "spirits"],
    category: "Lifestyle",
    tier: "watch",
    summary: "Alcohol can cause hypoglycemia, particularly in a fasted state, by inhibiting hepatic gluconeogenesis. This is particularly relevant when exenatide is combined with insulin or sulfonylureas — the three-way interaction (alcohol + exenatide + sulfonylurea/insulin) significantly increases hypoglycemia risk. Additionally, alcohol can worsen nausea, which is already the primary side effect of exenatide initiation.",
    mitigation: [
      "Avoid alcohol on exenatide initiation days — nausea is highest in the first weeks and alcohol worsens it significantly",
      "If on exenatide + sulfonylurea or exenatide + insulin: be aware that alcohol can cause significant hypoglycemia, especially if drinking without eating",
      "Do not skip meals when combining alcohol with exenatide regimens that include insulin or sulfonylureas",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function ExenatideInteractionsPanel() {
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
        Exenatide has a well-documented, FDA-reviewed interaction profile as an approved drug. The most important interactions are: insulin and sulfonylureas (hypoglycemia — dose reduction required); other GLP-1 agonists (contraindicated combination); and drugs with narrow therapeutic windows where gastric emptying delay affects oral absorption (warfarin, oral contraceptives). Metformin and SGLT-2 inhibitors are safe co-medications. All interactions are based on clinical data, not theoretical extrapolation.
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
