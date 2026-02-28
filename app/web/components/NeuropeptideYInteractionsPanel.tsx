"use client";

/**
 * NeuropeptideYInteractionsPanel — interaction intelligence for Neuropeptide Y (NPY).
 * Key frame: antihypertensive medications face direct vasoconstriction opposition;
 * GLP-1 agonists face direct appetite-circuit opposition; sympathomimetics have
 * complex additive effects (NPY co-released with norepinephrine); melatonin has
 * circadian NPY interaction. All mechanism-based.
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
    id: "antihypertensives",
    name: "Antihypertensive medications — ACE inhibitors, ARBs, calcium channel blockers, beta-blockers, diuretics",
    aliases: ["antihypertensive", "blood pressure medication", "ACE inhibitor", "lisinopril", "enalapril", "ramipril", "ARB", "losartan", "valsartan", "irbesartan", "calcium channel blocker", "amlodipine", "diltiazem", "verapamil", "beta-blocker", "metoprolol", "atenolol", "carvedilol", "diuretic", "hydrochlorothiazide", "furosemide", "spironolactone"],
    category: "Medications",
    tier: "flag",
    summary: "NPY causes dose-dependent vasoconstriction via Y1R in vascular smooth muscle — this has been documented in human IV pharmacology studies. Antihypertensive medications work through vasodilation or reducing cardiac output/blood volume to lower blood pressure. NPY's vasoconstriction directly opposes the vasodilatory mechanisms of calcium channel blockers (amlodipine, diltiazem), ACE inhibitors (lisinopril, enalapril), and ARBs (losartan, valsartan). In a patient whose blood pressure requires active pharmacological management, NPY injection introduces a vasoconstrictor that counteracts the therapeutic mechanism — potentially causing dangerous blood pressure elevation in a patient specifically at risk from elevated blood pressure.",
    mitigation: [
      "Absolute contraindication — anyone on antihypertensive medication should not use NPY injection under any circumstances",
      "The vasoconstriction mechanism is documented in human pharmacology and directly opposes the antihypertensive mechanism",
      "Even a single NPY injection could cause acute blood pressure elevation in a patient on antihypertensives — the pharmacological opposition is immediate",
    ],
  },
  {
    id: "glp1-agonists",
    name: "GLP-1 receptor agonists — semaglutide, tirzepatide, liraglutide, exenatide, dulaglutide",
    aliases: ["semaglutide", "Ozempic", "Wegovy", "Rybelsus", "tirzepatide", "Mounjaro", "Zepbound", "liraglutide", "Victoza", "Saxenda", "exenatide", "Byetta", "Bydureon", "dulaglutide", "Trulicity", "GLP-1 agonist", "GLP-1 drug"],
    category: "Medications",
    tier: "flag",
    summary: "GLP-1 receptor agonists reduce appetite and produce weight loss partly by suppressing NPY/AGRP neurons in the hypothalamic arcuate nucleus. The NPY/AGRP neuron population is the primary hunger-driving circuit, and GLP-1 drugs reduce its activity. Exogenous NPY would stimulate the very neurons that GLP-1 drugs are suppressing — directly counteracting the appetite-reduction mechanism responsible for the weight loss outcome. This is direct pharmacological opposition at the appetite-circuit level: GLP-1 drugs suppressing NPY neuronal output, and exogenous NPY replacing that output. Users on semaglutide or tirzepatide who inject NPY would pharmacologically undermine their treatment.",
    mitigation: [
      "Anyone on any GLP-1 receptor agonist (semaglutide, tirzepatide, liraglutide, exenatide, dulaglutide, albiglutide) should not inject NPY",
      "The appetite-circuit opposition is direct — NPY stimulates the hunger neurons that GLP-1 drugs suppress; combining them defeats the primary therapeutic mechanism of GLP-1 therapy",
      "Disclose any NPY use to the physician managing GLP-1 therapy — it would explain unexpected lack of appetite suppression or weight loss",
    ],
  },
  {
    id: "sympathomimetics",
    name: "Sympathomimetics — epinephrine, norepinephrine, pseudoephedrine, amphetamines, cocaine",
    aliases: ["epinephrine", "adrenaline", "norepinephrine", "noradrenaline", "pseudoephedrine", "Sudafed", "amphetamine", "Adderall", "cocaine", "sympathomimetic", "decongestant", "catecholamine"],
    category: "Medications",
    tier: "flag",
    summary: "NPY is co-stored and co-released with norepinephrine from sympathetic nerve terminals. Both NPY and norepinephrine cause vasoconstriction — NPY via Y1R, norepinephrine via alpha-1 adrenergic receptors. Sympathomimetics (drugs that activate the sympathetic nervous system or mimic catecholamine effects) would produce additive cardiovascular effects with exogenous NPY: combined vasoconstriction from Y1R (NPY) and alpha-1 adrenergic receptors (sympathomimetics) produces greater blood pressure elevation and cardiovascular stress than either alone. Amphetamines cause norepinephrine release, which co-occurs with NPY release in sympathetic terminals — adding exogenous NPY on top of amphetamine-driven sympathetic activation is a significant cardiovascular risk.",
    mitigation: [
      "Do not combine NPY injection with any sympathomimetic medication — the vasoconstriction from both mechanisms is additive and the cardiovascular risk is significant",
      "Decongestants (pseudoephedrine, phenylephrine) are vasoconstrictors — their combination with NPY is medically contraindicated in anyone at cardiovascular risk",
      "Stimulant medications (amphetamines, methylphenidate) cause norepinephrine release; the cardiovascular interaction with NPY is complex and potentially dangerous",
    ],
  },
  {
    id: "appetite-suppressants",
    name: "Appetite-suppressing medications — phentermine, topiramate, naltrexone/bupropion, pramlintide",
    aliases: ["phentermine", "Adipex", "Lomaira", "topiramate", "Topamax", "naltrexone", "bupropion", "Contrave", "pramlintide", "Symlin", "appetite suppressant", "weight loss medication"],
    category: "Medications",
    tier: "watch",
    summary: "Appetite-suppressing medications work through various mechanisms to reduce caloric intake and body weight. NPY is among the most powerful appetite stimulators known. Combining NPY with any appetite suppressant creates pharmacological opposition: the appetite suppressant reducing hunger, NPY stimulating appetite via Y1R and Y5R. The net effect on appetite and food intake would be unpredictable — potentially reducing medication efficacy or requiring higher doses to overcome NPY-driven appetite stimulation. Pramlintide (amylin analog for T2D and obesity) works partly through the same hypothalamic circuits where NPY acts; the direct interaction is particularly relevant.",
    mitigation: [
      "Do not combine NPY with any appetite-suppressing medication — the appetite-stimulating mechanism of NPY directly opposes the therapeutic goal",
      "If on phentermine/topiramate (Qsymia) or naltrexone/bupropion (Contrave): NPY injection would counteract the appetite reduction these combinations are prescribed to produce",
    ],
  },
  {
    id: "melatonin",
    name: "Melatonin — circadian NPY interaction in the suprachiasmatic nucleus",
    aliases: ["melatonin", "sleep supplement", "circadian"],
    category: "Supplements",
    tier: "low",
    summary: "NPY-expressing neurons in the suprachiasmatic nucleus (SCN) — the brain's circadian pacemaker — modulate melatonin release and circadian rhythm synchronization. NPY in the SCN shifts the circadian phase and can modulate the melatonin rhythm. Exogenous NPY might theoretically affect circadian timing through SCN Y receptors, potentially interacting with melatonin's circadian entrainment effects. This interaction is mechanistically plausible but not well-characterized at community doses — it is low-concern compared to the cardiovascular and appetite concerns.",
    mitigation: [
      "No significant acute safety concern with melatonin and NPY — the circadian interaction is mechanistically plausible but low-priority compared to cardiovascular and appetite concerns",
      "Monitor sleep quality if using NPY — any circadian disruption (difficulty sleeping, shifted sleep timing) may reflect SCN NPY receptor interactions",
    ],
  },
  {
    id: "standard-supplements",
    name: "Standard supplements — magnesium, zinc, vitamin D, fish oil",
    aliases: ["magnesium", "zinc", "vitamin D", "fish oil", "omega-3", "multivitamin", "creatine"],
    category: "Supplements",
    tier: "low",
    summary: "Standard dietary supplements have no direct pharmacological interaction with the NPY/Y-receptor system. Magnesium, zinc, vitamin D, and omega-3 fatty acids do not engage Y receptors and have no known interference with NPY's peripheral or central pharmacological effects. The primary concerns for NPY remain the pharmacological ones (vasoconstriction, appetite stimulation) rather than supplement interactions.",
    mitigation: [
      "No significant adverse interaction between NPY and standard dietary supplements",
      "The primary safety considerations for NPY are pharmacological (cardiovascular, appetite) — not supplement-related",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function NeuropeptideYInteractionsPanel() {
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
        NPY&apos;s interaction profile is dominated by its two primary peripheral pharmacological actions: Y1R vasoconstriction (opposing antihypertensives and additive with sympathomimetics) and Y1/Y5 appetite stimulation (directly opposing GLP-1 agonists and appetite-suppressing medications). Sympathomimetics present the highest immediate cardiovascular risk through additive vasoconstriction. Melatonin and standard supplements are low-concern. All interactions are mechanism-based — no clinical drug interaction studies for exogenous NPY exist.
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
