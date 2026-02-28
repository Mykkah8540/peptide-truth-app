"use client";

/**
 * PramlintideInteractionsPanel — interaction intelligence for Pramlintide.
 * Key frame: insulin is the defining interaction (mandatory dose reduction).
 * Gastric motility and oral drug absorption are the second tier.
 * The interaction profile is pharmaceutical-grade characterized.
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
    name: "Insulin — all types (rapid-acting, intermediate, long-acting)",
    aliases: ["insulin", "Humalog", "Novolog", "Apidra", "Lantus", "Levemir", "Tresiba", "NPH", "rapid-acting insulin", "basal insulin"],
    category: "Diabetes Medications",
    tier: "flag",
    summary: "The defining interaction — pramlintide was designed as an insulin adjunct but its mechanism (gastric emptying delay + glucagon suppression) dramatically increases hypoglycemia risk if insulin doses are not adjusted. The FDA label mandates 50% reduction of all rapid-acting insulin when initiating pramlintide in type 1 diabetes. Clinical trials showed 3-fold increased severe hypoglycemia without this adjustment. This is a pharmacological interaction requiring clinical management, not avoidance.",
    mitigation: [
      "Type 1 diabetes: reduce all rapid-acting (meal) insulin by 50% when starting pramlintide; titrate back based on CGM or blood glucose monitoring",
      "Type 2 diabetes: more gradual dose adjustment needed; work with prescribing physician on insulin titration protocol",
      "Do not mix pramlintide and insulin in the same syringe; inject in separate sites",
      "CGM is strongly advisable when initiating pramlintide + insulin; the glucose dynamics change significantly",
    ],
  },
  {
    id: "sulfonylureas",
    name: "Sulfonylureas (glipizide, glimepiride, glyburide)",
    aliases: ["sulfonylurea", "glipizide", "Glucotrol", "glimepiride", "Amaryl", "glyburide", "DiaBeta", "Micronase"],
    category: "Diabetes Medications",
    tier: "flag",
    summary: "Sulfonylureas stimulate insulin secretion independently of glucose — they create a background hypoglycemia risk that adds to pramlintide's glucose-lowering effects. The combination of sulfonylurea-driven insulin secretion plus pramlintide's gastric slowing and glucagon suppression increases hypoglycemia risk. Dose adjustment of the sulfonylurea is typically required.",
    mitigation: [
      "On sulfonylureas: discuss dose reduction with physician before starting pramlintide",
      "Monitor glucose more frequently when combining pramlintide with any insulin secretagogue",
      "Sulfonylurea-pramlintide combination requires clinical management — not self-initiation",
    ],
  },
  {
    id: "glp1-agonists",
    name: "GLP-1 receptor agonists (semaglutide, tirzepatide, liraglutide)",
    aliases: ["semaglutide", "Ozempic", "Wegovy", "tirzepatide", "Mounjaro", "liraglutide", "Victoza", "GLP-1", "GLP-1 agonist"],
    category: "Diabetes Medications",
    tier: "watch",
    summary: "Mechanistically complementary — GLP-1 agonists and pramlintide have additive gastric emptying delay effects. Both slow gastric emptying; the combination produces more pronounced slowing than either alone. GI side effects (nausea, vomiting) are expected to be worse in combination. The combination also provides additive glucose lowering and appetite suppression. This is the amylin + GLP-1 combination concept underlying CagriSema.",
    mitigation: [
      "The combination of GLP-1 agonist + pramlintide is being explored based on the CagriSema concept — additive gastric slowing means more GI side effects; titrate carefully",
      "If combining: start both at lowest doses and titrate slowly; the combined gastric emptying effect is more pronounced than either alone",
      "Monitor glucose carefully — additive glucose-lowering effects require insulin dose adjustment if also on insulin",
    ],
  },
  {
    id: "oral-medications-timing",
    name: "Oral medications requiring precise absorption timing",
    aliases: ["oral medication", "antibiotic", "immunosuppressant", "cyclosporine", "tacrolimus", "levothyroxine", "digoxin", "warfarin"],
    category: "Medications",
    tier: "watch",
    summary: "Pramlintide slows gastric emptying, which delays the absorption of oral medications taken at the same time. For medications with narrow therapeutic windows (immunosuppressants, digoxin, anticoagulants, thyroid medications) or where peak concentration timing matters, delayed absorption can affect efficacy or safety.",
    mitigation: [
      "Take time-sensitive oral medications at least 1 hour before or 2 hours after pramlintide injection",
      "For medications with narrow therapeutic windows (immunosuppressants, digoxin, warfarin, levothyroxine): discuss timing coordination with prescribing physician or pharmacist",
      "Do not administer oral medications simultaneously with pramlintide if absorption timing matters",
    ],
  },
  {
    id: "anticholinergics",
    name: "Anticholinergic medications (affecting gastric motility)",
    aliases: ["anticholinergic", "scopolamine", "hyoscine", "oxybutynin", "tolterodine", "atropine", "diphenhydramine"],
    category: "Medications",
    tier: "watch",
    summary: "Anticholinergic medications slow gastrointestinal motility through a different mechanism (muscarinic receptor blockade). Combined with pramlintide's amylin receptor-mediated gastric slowing, the combination produces additive gastric emptying delay. This worsens nausea and may cause significant GI complications.",
    mitigation: [
      "Avoid combining pramlintide with anticholinergic medications if possible",
      "If concurrent use is unavoidable, monitor for worsening GI symptoms (nausea, bloating, constipation) and discuss with physician",
    ],
  },
  {
    id: "metformin",
    name: "Metformin",
    aliases: ["metformin", "Glucophage", "Glumetza"],
    category: "Diabetes Medications",
    tier: "low",
    summary: "Metformin works through insulin-sensitization (AMPK, hepatic glucose output reduction) — a mechanism distinct from pramlintide's post-meal amylin effects. No direct pharmacological interaction. The combination is standard clinical practice in type 2 diabetes (metformin + insulin ± pramlintide). No dose adjustments required for metformin when starting pramlintide.",
    mitigation: [
      "No dose adjustment needed for metformin when adding pramlintide",
      "The combination is clinically used in type 2 diabetes management — no adverse interaction characterized",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function PramlintideInteractionsPanel() {
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
        Pramlintide&apos;s interaction profile is well-characterized from Phase 3 clinical trials. Insulin is the defining interaction requiring mandatory dose adjustment — not avoidance, but managed co-administration. GLP-1 agonists are additive and mechanistically complementary. Gastric motility effects create a broad interaction with oral drug absorption timing.
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
