"use client";

import { useState, useMemo } from "react";

/**
 * NeuropeptideSInteractionsPanel — interaction intelligence for Neuropeptide S.
 * Key frame: no characterized interactions because no human data exists.
 * Interactions are theoretical, based on mechanism overlap with CNS pathways.
 * Primary watches: anxiolytics, stimulants, and wakefulness agents.
 */

type Tier = "flag" | "watch" | "low";

type Entry = {
  name: string;
  tier: Tier;
  detail: string;
  why: string;
  action: string;
};

const ENTRIES: Entry[] = [
  // ── WATCHES ──
  {
    name: "Anxiolytics \u2014 benzodiazepines (diazepam, alprazolam, clonazepam)",
    tier: "watch",
    detail: "Overlapping CNS anxiolytic targets \u2014 unstudied combination",
    why: "NPS promotes anxiolysis via NPSR1 activation in animal models. Benzodiazepines produce anxiolysis and sedation via GABA-A receptor potentiation. The combination of a purported anxiolytic peptide with a pharmaceutical anxiolytic creates additive CNS inhibitory potential via different mechanisms. In animal models, NPS combined with anxiolytics has not been systematically studied. The combined effect profile in humans is completely uncharacterized.",
    action: "Do not combine without physician guidance. If on benzodiazepines for an anxiety condition, NPS is not an appropriate add-on given the absence of any interaction data and the overlapping anxiolytic targets.",
  },
  {
    name: "SSRIs and SNRIs (sertraline, fluoxetine, escitalopram, venlafaxine)",
    tier: "watch",
    detail: "Serotonergic anxiolytics \u2014 interaction profile completely uncharacterized",
    why: "SSRIs and SNRIs modulate serotonergic signaling for anxiety and depression management. NPSR1 activation has documented downstream effects on monoamine neurotransmitter systems in animal models, including serotonin pathway interactions. The combination is unstudied, and NPS\u2019 paradoxical dose-dependent effects on anxiety circuits could interact unpredictably with ongoing serotonergic medication.",
    action: "If on SSRIs or SNRIs for anxiety or depression: the interaction profile of adding NPS is completely unknown. Do not add without physician guidance.",
  },
  {
    name: "Buspirone (5-HT1A partial agonist anxiolytic)",
    tier: "watch",
    detail: "Serotonergic anxiolytic \u2014 overlapping CNS target landscape",
    why: "Buspirone acts on 5-HT1A receptors for anxiety management and also has dopaminergic effects. NPS\u2019 downstream neurochemical interactions include monoaminergic circuits. The combination is unstudied and the mechanistic overlap creates theoretical concern.",
    action: "No evidence basis for combination use. If on buspirone for anxiety, adding NPS creates an uncharacterized interaction on top of an already uncharacterized compound.",
  },
  {
    name: "Stimulants and wakefulness agents (modafinil, armodafinil, amphetamines)",
    tier: "watch",
    detail: "NPS promotes wakefulness \u2014 additive CNS stimulation theoretical",
    why: "NPS promotes wakefulness in animal models via NPSR1-mediated arousal circuit activation. Modafinil, armodafinil, and amphetamines also promote wakefulness via different CNS mechanisms (dopamine and norepinephrine). The combination creates theoretical additive CNS stimulatory load \u2014 excess wakefulness, potential anxiety amplification (stimulants can worsen anxiety; NPS has paradoxical anxiogenic potential at some doses). This is mechanistically plausible, not documented.",
    action: "Avoid combining. If using wakefulness agents for a clinical indication (narcolepsy, shift work sleep disorder), adding an uncharacterized CNS compound creates unpredictable interaction.",
  },
  {
    name: "Selank (anxiolytic peptide)",
    tier: "watch",
    detail: "Two anxiolytic-mechanism peptides with different CNS targets \u2014 unstudied combination",
    why: "Selank and NPS are both discussed in the context of anxiolytic peptides, but they work via entirely different mechanisms (Selank: GABAergic + enkephalinase; NPS: NPSR1). Combining two CNS-active peptides without any characterization of their combination in humans adds complexity to an already uncharacterized landscape. The combination is not studied and the benefit-risk of combining is undefined.",
    action: "No established rationale for combining. If using Selank for anxiolytic purposes, adding NPS does not have any evidence basis.",
  },

  // ── LOWS ──
  {
    name: "Standard supplements (magnesium, vitamin D, omega-3)",
    tier: "low",
    detail: "No CNS receptor overlap \u2014 no plausible interaction mechanism",
    why: "Standard supplements operate on metabolic and micronutrient pathways with no documented interaction with NPSR1 signaling.",
    action: "No specific concern from supplement interactions. The concern with NPS is the compound itself, not supplement combinations.",
  },
  {
    name: "Standard medications without CNS overlap (statins, antihypertensives, metformin)",
    tier: "low",
    detail: "Non-CNS mechanism \u2014 no plausible pharmacodynamic interaction with NPSR1",
    why: "Medications without CNS receptor activity do not have a plausible mechanism for pharmacodynamic interaction with NPSR1 agonism.",
    action: "No specific interaction concern from this class. Pharmacokinetic interactions are theoretically possible but not characterized.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.06)",  border: "rgba(158,56,0,0.22)",  dot: "#9e3800", label: "Flag",        labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.05)",  border: "rgba(124,82,0,0.18)",  dot: "#7c5200", label: "Watch",       labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.04)", border: "rgba(21,100,58,0.15)", dot: "#155e38", label: "Low concern", labelColor: "#155e38" },
};

const TIER_ORDER: Tier[] = ["flag", "watch", "low"];
const TIER_HEADING: Record<Tier, string> = {
  flag:  "Flags \u2014 stop and consult before combining",
  watch: "Worth watching \u2014 monitor and use judgment",
  low:   "Low concern \u2014 proceed with standard awareness",
};

export default function NeuropeptideSInteractionsPanel() {
  const [filter, setFilter] = useState<Tier | "all">("all");
  const [committed, setCommitted] = useState<Tier | "all">("all");

  const filtered = useMemo(
    () => (committed === "all" ? ENTRIES : ENTRIES.filter((e) => e.tier === committed)),
    [committed],
  );

  const tiersPresent = TIER_ORDER.filter((t) => filtered.some((e) => e.tier === t));

  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        Neuropeptide S has no characterized interactions in humans because no human data exists. All interactions listed here are theoretical, based on NPSR1 mechanism overlap with CNS pathways. The primary concerns are other anxiolytic compounds (overlapping CNS targets) and wakefulness agents (additive arousal stimulation). The most important interaction consideration is that NPS itself is uncharacterized \u2014 adding any other CNS-active compound on top of that amplifies the uncertainty.
      </div>

      <div className="reta-interactions__filter-bar">
        {(["all", ...TIER_ORDER] as const).map((t) => (
          <button
            key={t}
            className={`reta-interactions__filter-btn${(filter === t) ? " reta-interactions__filter-btn--active" : ""}`}
            onClick={() => { setFilter(t); setCommitted(t); }}
          >
            {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tiersPresent.map((tier) => {
        const entries = filtered.filter((e) => e.tier === tier);
        const cfg = TIER_STYLE[tier];
        return (
          <div key={tier} className="reta-interactions__group">
            <div
              className="reta-interactions__group-heading"
              style={{ color: cfg.labelColor, borderLeft: `3px solid ${cfg.dot}` }}
            >
              {TIER_HEADING[tier]}
            </div>
            <div className="reta-interactions__entries">
              {entries.map((e) => (
                <div
                  key={e.name}
                  className="reta-interactions__entry"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                >
                  <div className="reta-interactions__entry-top">
                    <div className="reta-interactions__entry-name">{e.name}</div>
                    <span
                      className="reta-interactions__entry-badge"
                      style={{ color: cfg.labelColor, borderColor: cfg.border }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <div className="reta-interactions__entry-detail">{e.detail}</div>
                  <div className="reta-interactions__entry-why">{e.why}</div>
                  <div className="reta-interactions__entry-action">{e.action}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="reta-interactions__footer">
        The interaction list for NPS is short because the compound itself is uncharacterized \u2014 not because the interactions are well-studied and found to be safe. The absence of documented interactions reflects absence of data, not absence of risk. For practical purposes: if you are considering NPS because you want an anxiolytic peptide, Selank has a real human evidence base and documented interaction profile. NPS does not.
      </div>

    </div>
  );
}
