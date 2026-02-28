"use client";

/**
 * TriptorelinInteractionsPanel — interaction intelligence for Triptorelin.
 * Key frame: anti-androgens are required co-medication during initiation
 * (flare management); gonadorelin works at the same receptor in the
 * opposite direction; QTc-prolonging drugs interact with ADT-related
 * QTc prolongation.
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
    id: "anti-androgens-flare",
    name: "Anti-androgens — bicalutamide, enzalutamide, cyproterone acetate (flare management)",
    aliases: ["anti-androgen", "bicalutamide", "Casodex", "enzalutamide", "Xtandi", "cyproterone", "flutamide", "nilutamide", "apalutamide", "Erleada", "darolutamide", "Nubeqa"],
    category: "Medications",
    tier: "flag",
    summary: "In prostate cancer, anti-androgens are required co-medication during triptorelin initiation to block the testosterone flare at the androgen receptor level. Without anti-androgen cover, the initial testosterone surge (weeks 1-2 of triptorelin) is pharmacologically unopposed and can cause disease flare including spinal cord compression in patients with bone metastases. This is a clinical requirement, not a precaution — the standard of care for GnRH agonist initiation in prostate cancer includes anti-androgen flare cover for the first 2-4 weeks. This is the one context where the 'flag' status means required co-medication, not an interaction to avoid.",
    mitigation: [
      "Standard prostate cancer protocol: begin anti-androgen (bicalutamide 50 mg/day) 1 week before or concurrent with first triptorelin depot injection; continue for 4 weeks",
      "Patients with spinal metastases face the highest flare risk — anti-androgen cover is especially critical in this population",
      "Community use of triptorelin without access to appropriate anti-androgen cover is unsafe in any individual with known or suspected prostate disease",
    ],
  },
  {
    id: "gonadorelin",
    name: "Gonadorelin (GnRH, pulsatile GnRH analog)",
    aliases: ["gonadorelin", "GnRH", "Factrel", "Lutrepulse", "buserelin", "nafarelin", "histrelin"],
    category: "Peptide Stacks",
    tier: "flag",
    summary: "Gonadorelin and triptorelin work at the same GnRH receptor but produce opposite physiological effects — gonadorelin's pulsatile stimulation maintains LH/FSH secretion while triptorelin's continuous stimulation suppresses it. Combining them creates competing pharmacological actions at the same receptor, with unpredictable net axis effects. There is no rational pharmacological use case for combining a continuous GnRH agonist (triptorelin) with a pulsatile GnRH stimulator (gonadorelin).",
    mitigation: [
      "Do not combine triptorelin with gonadorelin — they work in pharmacologically opposite directions at the same receptor",
      "If the goal is axis maintenance or stimulation, use gonadorelin alone; if the goal is axis suppression, triptorelin alone achieves this",
      "Switching from triptorelin to gonadorelin requires waiting for depot exhaustion and axis recovery before pulsatile stimulation can be effective",
    ],
  },
  {
    id: "qtc-prolonging",
    name: "QTc-prolonging medications — antipsychotics, certain antibiotics, antiarrhythmics",
    aliases: ["QTc", "QT prolongation", "haloperidol", "risperidone", "quetiapine", "olanzapine", "antipsychotic", "azithromycin", "clarithromycin", "fluoroquinolone", "ciprofloxacin", "amiodarone", "sotalol", "methadone", "ondansetron"],
    category: "Medications",
    tier: "watch",
    summary: "Androgen deprivation therapy — the intended pharmacological effect of triptorelin — is associated with QTc interval prolongation. Testosterone deficiency increases cardiac repolarization time, and this QTc lengthening is documented across multiple GnRH agonist trials. Adding QTc-prolonging medications on top of ADT-induced QTc prolongation creates additive risk of dangerous arrhythmias (torsades de pointes, ventricular fibrillation). This interaction is pharmacovigilance-flagged in FDA labeling for GnRH agonists.",
    mitigation: [
      "FDA labeling for triptorelin includes a warning about QTc prolongation risk — inform all prescribers of triptorelin therapy before starting any new medication",
      "Avoid concurrent QTc-prolonging medications where alternatives exist — discuss with prescribing physician and cardiologist",
      "Baseline ECG and monitoring ECG during therapy are appropriate in patients on QTc-prolonging co-medications",
    ],
  },
  {
    id: "bisphosphonates",
    name: "Bisphosphonates — alendronate, zoledronic acid, denosumab (bone protection)",
    aliases: ["bisphosphonate", "alendronate", "Fosamax", "zoledronic acid", "Zometa", "Reclast", "risedronate", "Actonel", "ibandronate", "Boniva", "denosumab", "Prolia", "Xgeva", "RANKL inhibitor"],
    category: "Medications",
    tier: "watch",
    summary: "Bisphosphonates and denosumab are frequently co-prescribed with GnRH agonist therapy specifically to mitigate ADT-induced bone density loss. This is a pharmacologically rational combination — GnRH agonists cause bone loss, bisphosphonates/denosumab prevent it. The interaction to flag is that bisphosphonates have their own adverse effects (jaw osteonecrosis with dental procedures, atypical femur fractures with very long-term use, esophageal irritation with oral formulations) that require dental and bone health monitoring independent of the triptorelin use.",
    mitigation: [
      "Bisphosphonate or denosumab co-therapy with long-term triptorelin is appropriate bone protection — follow prescribing physician guidance",
      "Before starting bisphosphonate therapy: complete necessary dental work — osteonecrosis of the jaw risk with bisphosphonates is elevated in dental procedure contexts",
      "Calcium (1000-1200 mg/day) and vitamin D (800-1000 IU/day) should be adequate before adding bisphosphonates",
    ],
  },
  {
    id: "diabetes-medications",
    name: "Diabetes and insulin resistance medications — metformin, insulin, GLP-1 agonists",
    aliases: ["metformin", "insulin", "GLP-1", "semaglutide", "Ozempic", "liraglutide", "Victoza", "tirzepatide", "Mounjaro", "SGLT2", "empagliflozin", "Jardiance", "diabetes", "blood sugar"],
    category: "Medications",
    tier: "watch",
    summary: "Androgen deprivation therapy from triptorelin causes insulin resistance, increased fat mass (particularly visceral fat), and metabolic syndrome components — effects that worsen glycemic control in people with or without pre-existing diabetes. Someone on diabetes medications who then undergoes ADT will likely see their blood sugar management become more difficult, potentially requiring dose adjustments to diabetes medications. This is a documented ADT metabolic effect requiring monitoring and medication adjustment.",
    mitigation: [
      "Inform the diabetes care provider of triptorelin therapy — glycemic monitoring should be increased, and diabetes medication doses may need adjustment as ADT alters insulin sensitivity",
      "GLP-1 agonists may provide some metabolic benefit in the ADT context (weight management, insulin sensitization) — discuss with endocrinologist or prescribing physician",
      "Regular HbA1c monitoring during ADT in diabetic patients is standard of care",
    ],
  },
  {
    id: "standard-supplements",
    name: "Standard supplements — vitamins, minerals, protein, creatine",
    aliases: ["supplement", "vitamin D", "calcium", "vitamin", "protein", "creatine", "zinc", "magnesium"],
    category: "Supplements",
    tier: "low",
    summary: "Calcium (1000-1200 mg/day) and vitamin D (800-1000 IU/day) supplementation is specifically recommended during triptorelin therapy to partially mitigate bone density loss — these are beneficial co-supplements, not concerns. Creatine and protein supplementation during ADT may help partially preserve lean muscle mass that ADT erodes. No adverse interactions between triptorelin and standard supplements are established.",
    mitigation: [
      "Calcium and vitamin D supplementation is specifically recommended during GnRH agonist therapy — ensure adequate intake",
      "Resistance training plus protein supplementation during ADT can partially offset muscle mass loss — beneficial lifestyle and supplement combination",
      "No supplements replace the need for DEXA bone density monitoring during long-term triptorelin therapy",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function TriptorelinInteractionsPanel() {
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
        Triptorelin&apos;s most clinically important interaction is with anti-androgens — not an interaction to avoid, but a required co-medication for the testosterone flare during prostate cancer initiation. Gonadorelin works at the same receptor in the opposite direction and should not be combined. QTc-prolonging drugs interact with ADT-induced QTc prolongation. Bisphosphonates are rationally co-prescribed for bone protection. All interactions derive from the core pharmacology: months-long sex hormone suppression with downstream metabolic and cardiovascular consequences.
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
