"use client";

/**
 * CagrilintideInteractionsPanel — interaction intelligence for Cagrilintide.
 * Key frame: semaglutide is the intended combination partner (CagriSema);
 * the insulin/sulfonylurea risk is the acute safety concern;
 * GI drug combinations can compound or mask symptoms.
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
    name: "Insulin (all types — basal, rapid-acting, premixed)",
    aliases: ["insulin", "basal insulin", "rapid insulin", "glargine", "detemir", "lispro", "aspart", "degludec", "lantus", "humalog", "novolog"],
    category: "Medications",
    tier: "flag",
    summary: "Direct hypoglycemia risk. Amylin analog cagrilintide slows gastric emptying (delaying glucose absorption) and suppresses postprandial glucagon — both mechanisms can amplify insulin-induced hypoglycemia, particularly postprandial. Native pramlintide carries a black-box warning for hypoglycemia when combined with insulin. Cagrilintide at higher doses (than pramlintide's short-acting profile) produces sustained gastric slowing that can shift the timing of glucose absorption unpredictably.",
    mitigation: [
      "Do not add cagrilintide to an insulin regimen without physician oversight — dose adjustments to insulin are required",
      "Pramlintide (the approved amylin analog) requires insulin dose reduction at initiation; the same logic applies to cagrilintide",
      "Monitor blood glucose more frequently during initiation and dose escalation",
    ],
  },
  {
    id: "sulfonylureas",
    name: "Sulfonylureas (glipizide, glyburide, glimepiride, glibenclamide)",
    aliases: ["sulfonylurea", "glipizide", "glyburide", "glimepiride", "glibenclamide", "Glucotrol", "DiaBeta", "Amaryl"],
    category: "Medications",
    tier: "flag",
    summary: "Hypoglycemia risk from combined glucose-lowering mechanisms. Sulfonylureas stimulate insulin secretion regardless of blood glucose level. Combined with cagrilintide's glucagon suppression and gastric slowing, the combination can produce additive glucose-lowering that causes hypoglycemia, particularly postprandial or in fasted states.",
    mitigation: [
      "Cagrilintide + sulfonylurea combination requires medical supervision and likely sulfonylurea dose reduction",
      "Self-addition of cagrilintide to an existing sulfonylurea regimen creates unmonitored hypoglycemia risk",
    ],
  },
  {
    id: "glp1-agonists",
    name: "GLP-1 receptor agonists (semaglutide, liraglutide, exenatide, dulaglutide)",
    aliases: ["semaglutide", "Ozempic", "Wegovy", "liraglutide", "Victoza", "Saxenda", "exenatide", "Byetta", "Bydureon", "dulaglutide", "Trulicity", "GLP-1 agonist"],
    category: "Medications",
    tier: "watch",
    summary: "CagriSema (cagrilintide + semaglutide) is the intended clinical combination — but the research-grade version is not the pharmaceutical formulation. The combination of amylin + GLP-1 gastric slowing amplifies GI effects relative to either alone. The Phase 2 combination used matched 2.4 mg doses titrated in parallel. Ad hoc combination without matched titration protocols amplifies the GI side effect burden.",
    mitigation: [
      "The CagriSema combination is mechanistically sound but the trial formulation is not replicable with research-grade compounds",
      "If already on semaglutide and adding cagrilintide: anticipate amplified GI effects and titrate cagrilintide slowly — the gastric slowing mechanisms compound",
      "Do not start at full dose of both simultaneously — the Phase 2 protocol titrated both compounds gradually over months",
    ],
  },
  {
    id: "metformin",
    name: "Metformin",
    aliases: ["metformin", "Glucophage", "Glumetza", "Fortamet"],
    category: "Medications",
    tier: "watch",
    summary: "Metformin's GI effects (nausea, diarrhea, GI discomfort) overlap with cagrilintide's GI mechanism. The combination does not create a dangerous pharmacological interaction but can compound GI side effects, making initiation more difficult. Metformin itself also has some appetite-modulating effects — the combined appetite suppression may be more pronounced than either alone.",
    mitigation: [
      "Extended-release metformin (Glucophage XR) has better GI tolerability than immediate-release — prefer this formulation if combining",
      "Take metformin with food if not already doing so — this reduces GI overlap with cagrilintide's gastric effects",
      "If GI side effects are severe on both, consider whether both are necessary at the same time during cagrilintide initiation",
    ],
  },
  {
    id: "oral-meds-narrow-ti",
    name: "Oral medications with narrow therapeutic index (thyroid hormone, warfarin, certain antibiotics)",
    aliases: ["levothyroxine", "Synthroid", "warfarin", "Coumadin", "cyclosporine", "narrow therapeutic index", "thyroid medication"],
    category: "Medications",
    tier: "watch",
    summary: "Gastric emptying delay from amylin receptor agonism affects the absorption kinetics of oral medications. Drugs with narrow therapeutic index (where small absorption changes matter) — thyroid hormone, warfarin, certain antibiotics — may have altered absorption timing when gastric emptying is slowed. This is a class-level concern established for GLP-1 agonists and applies to cagrilintide.",
    mitigation: [
      "Thyroid hormone (levothyroxine): take at least 30-60 minutes before any food or other medications — the gastric slowing from cagrilintide makes timing more critical",
      "Warfarin: monitor INR more frequently when starting or adjusting cagrilintide dose — absorption changes can alter anticoagulation levels",
      "Oral antibiotics for acute infections: take with awareness that absorption timing may be shifted",
    ],
  },
  {
    id: "antiemetics",
    name: "Antiemetics (ondansetron, promethazine, metoclopramide)",
    aliases: ["ondansetron", "Zofran", "promethazine", "Phenergan", "metoclopramide", "Reglan", "antiemetic", "anti-nausea"],
    category: "Medications",
    tier: "watch",
    summary: "Antiemetics may be used to manage cagrilintide's GI side effects. Metoclopramide is a prokinetic (it accelerates gastric emptying) — which would partially counteract cagrilintide's mechanism. Ondansetron manages nausea without affecting gastric motility. The choice of antiemetic matters mechanistically.",
    mitigation: [
      "Ondansetron (5-HT3 antagonist): reasonable for nausea management without mechanistic conflict",
      "Metoclopramide: counteracts the gastric slowing mechanism — this may help GI symptoms but undermines the satiety component of cagrilintide's effect",
      "Antiemetics are a temporary management tool; persistent nausea requiring antiemetics suggests the dose should be held, not masked",
    ],
  },
  {
    id: "alcohol",
    name: "Alcohol",
    aliases: ["alcohol", "ethanol", "beer", "wine", "spirits", "drinking"],
    category: "Lifestyle",
    tier: "watch",
    summary: "Alcohol and cagrilintide's gastric slowing mechanism interact poorly. Alcohol irritates the gastric mucosa; delayed gastric emptying prolongs stomach contact time with alcohol, potentially amplifying GI irritation and altering alcohol absorption timing. The caloric content of alcohol also works against weight loss goals.",
    mitigation: [
      "Moderate alcohol use during cagrilintide treatment amplifies GI discomfort — particularly during initiation",
      "The delayed gastric emptying can make alcohol effects feel different (delayed absorption, then more concentrated absorption) — drink more slowly than usual if drinking at all",
      "Heavy alcohol use is incompatible with the metabolic goals cagrilintide is used for",
    ],
  },
  {
    id: "protein-supplements",
    name: "Protein supplements (whey, casein, plant-based protein)",
    aliases: ["protein powder", "whey protein", "casein protein", "plant protein", "protein shake", "protein supplement"],
    category: "Supplements",
    tier: "low",
    summary: "No pharmacological interaction. Protein supplementation is a lean mass management tool that becomes more important, not less, during appetite suppression from cagrilintide. High protein intake supports preservation of lean mass during weight loss. The appetite suppression from cagrilintide makes hitting protein targets harder without supplementation.",
    mitigation: [
      "No adverse interaction between protein supplementation and cagrilintide",
      "Protein supplements are a practical strategy for hitting protein targets when appetite suppression makes whole-food protein intake difficult",
    ],
  },
  {
    id: "fiber-supplements",
    name: "Fiber supplements (psyllium, methylcellulose)",
    aliases: ["psyllium", "Metamucil", "methylcellulose", "Citrucel", "fiber supplement", "soluble fiber"],
    category: "Supplements",
    tier: "low",
    summary: "No direct pharmacological interaction. Fiber supplements can support GI regularity during amylin-induced gastric slowing. Constipation is a potential side effect of reduced gastric motility; adequate fiber and fluid intake supports bowel regularity.",
    mitigation: [
      "No adverse interaction between fiber supplements and cagrilintide",
      "Adequate hydration is essential when using fiber supplements alongside gastric slowing agents",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function CagrilintideInteractionsPanel() {
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
        Cagrilintide&apos;s primary interaction risks are with insulin and sulfonylureas (hypoglycemia from additive glucose-lowering) and with other GLP-1 agonists where the CagriSema combination amplifies GI effects. The gastric emptying delay affects oral medication absorption broadly — any narrow-therapeutic-index drug warrants awareness. These are the same class concerns as GLP-1 agonists with an amylin layer added.
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
