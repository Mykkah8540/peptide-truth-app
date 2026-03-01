"use client";

/**
 * LanreotideInteractionsPanel — interaction intelligence for lanreotide.
 * Key frame: cyclosporine absorption reduction, insulin/antidiabetic dosing,
 * bromocriptine combination for acromegaly. Limited CYP metabolism.
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
    id: "cyclosporine",
    name: "Cyclosporine (Sandimmune, Neoral, Gengraf)",
    aliases: ["cyclosporine", "cyclosporin", "Sandimmune", "Neoral", "Gengraf", "calcineurin inhibitor", "transplant immunosuppression"],
    category: "Immunosuppressants",
    tier: "watch",
    summary: "Somatostatin analogues reduce cyclosporine absorption from the GI tract, likely through reduced intestinal motility and altered bile flow affecting lymphatic absorption. Studies have shown cyclosporine blood levels can decrease by 30\u201350% when octreotide (same class as lanreotide) is co-administered. Since cyclosporine has a narrow therapeutic index (subtherapeutic levels risk rejection; supratherapeutic levels cause nephrotoxicity), this interaction has direct clinical consequence for transplant patients who develop a condition requiring SSA therapy.",
    mitigation: [
      "Monitor cyclosporine trough levels more frequently during lanreotide initiation, dose changes, and discontinuation",
      "Anticipate the need for cyclosporine dose increase when lanreotide is started \u2014 blood level monitoring guides the adjustment",
      "If lanreotide is discontinued, cyclosporine levels may rise as absorption normalizes \u2014 monitor and reduce dose accordingly",
      "Tacrolimus has a similar narrow therapeutic index; though the interaction with SSAs is less well-documented than with cyclosporine, monitoring is prudent",
    ],
  },
  {
    id: "insulin-antidiabetics",
    name: "Insulin and antidiabetic medications (metformin, sulfonylureas, GLP-1 agonists)",
    aliases: ["insulin", "metformin", "Glucophage", "sulfonylurea", "glipizide", "glyburide", "glimepiride", "GLP-1", "semaglutide", "liraglutide", "diabetes medication", "antidiabetic", "hypoglycemic"],
    category: "Glucose / Metabolic",
    tier: "watch",
    summary: "Lanreotide has bidirectional effects on glucose homeostasis that complicate diabetes management. In acromegaly patients, where GH-induced insulin resistance dominates, lanreotide\u2019s GH suppression typically improves insulin sensitivity \u2014 meaning antidiabetic medications (especially insulin) may need dose REDUCTION to avoid hypoglycemia. In non-acromegaly patients (e.g., NETs), lanreotide\u2019s insulin secretion inhibition more commonly WORSENS glucose, requiring antidiabetic medication dose INCREASE. The direction of adjustment depends on the clinical context.",
    mitigation: [
      "Increase glucose monitoring frequency (home glucose monitoring or CGM) during the first 3 months of lanreotide therapy",
      "In acromegaly: prepare for potential need to reduce insulin or sulfonylurea doses as GH suppression improves insulin sensitivity \u2014 hypoglycemia can develop",
      "In NETs or non-acromegaly contexts: prepare for potential worsening of glucose control and need to increase antidiabetic medication doses",
      "GLP-1 receptor agonists and SSAs both affect gastric motility and GI secretion; combined GI effects (nausea, delayed gastric emptying) may be additive",
      "Communicate lanreotide initiation to the endocrinologist managing diabetes \u2014 medication adjustment is predictable but requires monitoring",
    ],
  },
  {
    id: "bromocriptine",
    name: "Bromocriptine (Parlodel, Cycloset) and cabergoline (Dostinex)",
    aliases: ["bromocriptine", "Parlodel", "Cycloset", "cabergoline", "Dostinex", "dopamine agonist", "prolactinoma", "acromegaly co-treatment"],
    category: "Hormonal / Endocrine",
    tier: "watch",
    summary: "Dopamine agonists (bromocriptine, cabergoline) are used in combination with somatostatin analogues for acromegaly when SSA monotherapy produces incomplete GH/IGF-1 normalization. The combination is additive for GH suppression \u2014 dopamine agonists suppress GH secretion through D2 receptors on somatotroph cells. The interaction is pharmacodynamically complementary and intentional in clinical practice. However, combined use requires monitoring for dopamine agonist side effects (nausea, orthostatic hypotension, cardiac valve disease with long-term high-dose cabergoline) on top of SSA effects.",
    mitigation: [
      "The combination is used intentionally for acromegaly inadequately controlled on SSA alone \u2014 discuss goals and monitoring with your endocrinologist",
      "Additive nausea is common early in the combination; timing bromocriptine with food and starting at low doses reduces GI effects",
      "Long-term high-dose cabergoline: echocardiographic monitoring for cardiac valve disease is recommended (class effect from ergot dopamine agonists at high cumulative doses)",
      "Orthostatic hypotension from dopamine agonist addition: monitor blood pressure; instruct patient to rise slowly",
    ],
  },
  {
    id: "gh-secretagogues",
    name: "GH secretagogues (ipamorelin, CJC-1295, sermorelin, GHRP-2, GHRP-6)",
    aliases: ["ipamorelin", "CJC-1295", "sermorelin", "GHRP-2", "GHRP-6", "tesamorelin", "MK-677", "growth hormone releasing peptide", "GH secretagogue"],
    category: "GH / Growth Axis",
    tier: "watch",
    summary: "Pharmacological antagonism \u2014 lanreotide and GH secretagogues work in directly opposed directions on the GH axis. GH secretagogues stimulate GH release by activating GHRH receptors (CJC-1295, sermorelin) or ghrelin receptors (ipamorelin, GHRP-2, GHRP-6). Lanreotide suppresses GH release by activating SSTR2/5 receptors (same mechanism as endogenous somatostatin). Using both simultaneously is pharmacologically incoherent \u2014 they oppose each other at the pituitary level. The net GH effect would be unpredictable and likely negligible.",
    mitigation: [
      "Do not use GH secretagogues while on lanreotide for a clinical indication \u2014 they are mechanistically opposed",
      "If you are prescribed lanreotide for acromegaly or NETs, GH secretagogues actively work against the therapeutic goal of lanreotide therapy",
      "If you are using GH secretagogues for enhancement purposes and are separately prescribed lanreotide, inform your prescriber \u2014 the combination is not safe to self-manage",
    ],
  },
  {
    id: "warfarin",
    name: "Warfarin (Coumadin, Jantoven)",
    aliases: ["warfarin", "Coumadin", "Jantoven", "anticoagulant", "blood thinner", "INR"],
    category: "Anticoagulants",
    tier: "watch",
    summary: "Somatostatin analogues can alter GI absorption of drugs and affect hepatic CYP enzyme activity to a modest degree. Warfarin INR has been reported to change during octreotide (same class) therapy, likely through altered GI absorption of vitamin K-containing foods and changes in hepatic function. The interaction is not well-characterized mechanistically for lanreotide specifically, but warfarin\u2019s narrow therapeutic index and the potential for modest INR changes warrants increased monitoring during lanreotide initiation.",
    mitigation: [
      "Increase INR monitoring frequency during lanreotide initiation and any dose changes \u2014 weekly initially then bi-weekly until stable",
      "Dietary changes prompted by GI symptoms (low-fat diet, appetite changes) may alter vitamin K intake and independently affect INR",
      "Report any unusual bleeding or bruising to the prescriber \u2014 these should prompt INR check",
    ],
  },
  {
    id: "standard-supplements",
    name: "Standard supplements (vitamins, minerals, protein, omega-3)",
    aliases: ["vitamins", "vitamin D", "vitamin B12", "magnesium", "zinc", "fish oil", "omega-3", "protein powder", "multivitamin"],
    category: "Supplements",
    tier: "low",
    summary: "Standard nutritional supplements have no clinically relevant pharmacokinetic or pharmacodynamic interactions with lanreotide. Steatorrhea from reduced pancreatic enzyme secretion can impair absorption of fat-soluble vitamins (A, D, E, K) during SSA therapy \u2014 this is a nutritional concern, not a drug interaction. Fat-soluble vitamin supplementation or monitoring of vitamin D levels is reasonable in patients with persistent steatorrhea.",
    mitigation: [
      "No specific interactions between lanreotide and standard supplements",
      "If steatorrhea is present: consider fat-soluble vitamin (A, D, E, K) supplementation or monitoring \u2014 malabsorption can deplete these over time",
      "Vitamin B12 monitoring is reasonable in long-term SSA therapy \u2014 reduced gastric acid secretion (a class effect) can impair B12 absorption in some patients",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function LanreotideInteractionsPanel() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return INTERACTIONS.filter((e) => {
      const matchCat = activeCat === "All" || e.category === activeCat;
      if (!matchCat) return false;
      if (!q) return true;
      return e.name.toLowerCase().includes(q) || e.aliases.some((a) => a.toLowerCase().includes(q)) || e.summary.toLowerCase().includes(q) || e.category.toLowerCase().includes(q);
    });
  }, [query, activeCat]);

  return (
    <div className="reta-interactions">
      <div className="reta-interactions__context">
        Lanreotide has a limited CYP450 interaction profile \u2014 it is not a significant CYP inducer or inhibitor. The clinically important interactions are: cyclosporine absorption reduction (monitor trough levels), bidirectional glucose effects with antidiabetics (direction depends on baseline), and direct pharmacological opposition with GH secretagogues (do not combine). The combination with bromocriptine or cabergoline is intentional in acromegaly and additive.
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
              <div key={entry.id} className="reta-interactions__entry" style={{ background: st.bg, border: `1px solid ${st.border}` }}>
                <div className="reta-interactions__entry-top">
                  <div className="reta-interactions__entry-name">{entry.name}</div>
                  <div className="reta-interactions__entry-meta">
                    <span className="reta-interactions__entry-cat">{entry.category}</span>
                    <span className="reta-interactions__entry-tier" style={{ color: st.labelColor, borderColor: st.border }}>{st.label}</span>
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
