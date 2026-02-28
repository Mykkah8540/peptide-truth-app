"use client";

/**
 * OrexinAInteractionsPanel — interaction intelligence for Orexin-A (Hypocretin-1).
 * Key frame: orexin receptor antagonists (suvorexant, lemborexant) are the most
 * mechanistically important interaction — direct pharmacological opposition;
 * stimulants and modafinil produce additive wakefulness effects with complex
 * interaction; SSRIs/SNRIs have orexin system crosstalk; all mechanism-based.
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
    id: "orexin-antagonists",
    name: "Orexin receptor antagonists — suvorexant (Belsomra), lemborexant (Dayvigo)",
    aliases: ["suvorexant", "Belsomra", "lemborexant", "Dayvigo", "orexin antagonist", "dual orexin receptor antagonist", "DORA", "sleep medication"],
    category: "Medications",
    tier: "flag",
    summary: "Suvorexant and lemborexant are FDA-approved dual orexin receptor antagonists (DORAs) prescribed for insomnia. They work by blocking OX1R and OX2R, preventing endogenous orexin-A and orexin-B from activating the wakefulness circuits. Exogenous orexin-A administered alongside an orexin antagonist would directly compete at OX1R/OX2R — orexin-A (agonist) and suvorexant/lemborexant (antagonist) would compete for the same binding site. Depending on relative concentrations, the agonist could overcome the antagonist blockade or the antagonist could block the agonist's intended wakefulness effect. This is direct pharmacological opposition at the receptor level of a prescribed sleep medication.",
    mitigation: [
      "Do not use orexin-A while on suvorexant (Belsomra) or lemborexant (Dayvigo) — the pharmacological opposition defeats both the sleep medication's purpose and the wakefulness purpose of orexin-A",
      "If you are being prescribed an orexin antagonist for insomnia: disclose any orexin-A use to the prescribing physician — this is a clinically meaningful interaction",
      "If transitioning from an orexin antagonist to orexin-A (or vice versa): wait for the antagonist to clear (suvorexant half-life ~12 hours; lemborexant ~17-19 hours) before using orexin-A",
    ],
  },
  {
    id: "stimulants",
    name: "Stimulants — modafinil, armodafinil, amphetamine, methylphenidate",
    aliases: ["modafinil", "Provigil", "armodafinil", "Nuvigil", "amphetamine", "Adderall", "Dexedrine", "methylphenidate", "Ritalin", "Concerta", "stimulant", "ADHD medication"],
    category: "Medications",
    tier: "watch",
    summary: "Stimulants (modafinil, amphetamines, methylphenidate) and orexin-A share overlapping mechanisms in wakefulness promotion, though through different primary pathways. Modafinil works primarily through dopamine transporter inhibition with secondary effects on the orexin system; amphetamines cause monoamine release. Orexin-A activates the same aminergic arousal systems that stimulants enhance. Combining orexin-A with stimulants could produce additive or supra-additive wakefulness effects — excessive arousal, insomnia, anxiety, and cardiovascular effects (heart rate, blood pressure). The cardiovascular overlap is particularly relevant: both stimulants and orexin-A (via peripheral OX1R) increase heart rate and blood pressure.",
    mitigation: [
      "Do not combine orexin-A with prescription stimulants without physician oversight — additive cardiovascular effects (heart rate, blood pressure) are the primary concern",
      "If using modafinil or armodafinil for narcolepsy: adding orexin-A creates overlapping wakefulness mechanisms without characterized additive safety profile; discuss with the treating physician",
      "Monitor heart rate and blood pressure when combining any wakefulness-promoting compound with orexin-A",
    ],
  },
  {
    id: "antidepressants-ssnri",
    name: "SSRIs and SNRIs — sertraline, fluoxetine, escitalopram, venlafaxine, duloxetine",
    aliases: ["SSRI", "SNRI", "sertraline", "Zoloft", "fluoxetine", "Prozac", "escitalopram", "Lexapro", "venlafaxine", "Effexor", "duloxetine", "Cymbalta", "antidepressant", "serotonin reuptake inhibitor"],
    category: "Medications",
    tier: "watch",
    summary: "The serotonin system and the orexin system interact bidirectionally. Serotonin neurons in the dorsal raphe nucleus receive orexinergic input and are activated by OX1R/OX2R stimulation. SSRIs increase serotonergic tone by blocking serotonin reuptake. Combined orexin-A + SSRI/SNRI would enhance serotonin activity through two overlapping mechanisms — direct serotonin reuptake blockade (SSRI) and increased serotonin neuron firing (orexin-A via raphe activation). Additionally, SSRIs and SNRIs are prescribed for depression and anxiety, where the therapeutic goal is emotional stability; adding a pro-arousal compound like orexin-A in patients with anxiety or depression requires psychiatric judgment.",
    mitigation: [
      "Discuss with the prescribing psychiatrist before combining orexin-A with any antidepressant — the serotonergic interaction and the effects on anxiety and mood warrant physician oversight",
      "SSRI/SNRI treatment for anxiety: adding an arousal-promoting neuropeptide could worsen anxiety symptoms through increased sympathetic arousal",
      "No formal drug interaction data exists — this is mechanism-based; monitor for anxiety exacerbation, sleep disruption, and cardiovascular changes",
    ],
  },
  {
    id: "antipsychotics",
    name: "Antipsychotics — olanzapine, quetiapine, risperidone, haloperidol",
    aliases: ["antipsychotic", "olanzapine", "Zyprexa", "quetiapine", "Seroquel", "risperidone", "Risperdal", "haloperidol", "Haldol", "aripiprazole", "Abilify", "clozapine"],
    category: "Medications",
    tier: "flag",
    summary: "Antipsychotics are prescribed for schizophrenia, schizoaffective disorder, and bipolar disorder — conditions involving pathological hyperarousal and dopaminergic dysregulation. Orexin-A promotes arousal via multiple aminergic systems including dopamine (orexin activates dopamine neurons in the VTA). Antipsychotics block dopamine receptors (primarily D2R) as a core mechanism. Adding a dopamine-activating, arousal-promoting compound like orexin-A in patients on antipsychotics creates direct pharmacological opposition at the dopamine level — potentially overcoming the antipsychotic's therapeutic dopamine blockade. This is both a drug interaction concern and the reason patients with psychotic disorders are contraindicated for orexin-A (see safety panel).",
    mitigation: [
      "Anyone on antipsychotic medication should not use orexin-A — the mechanism directly opposes antipsychotic therapy at multiple levels (dopamine, arousal circuits)",
      "Disclose all peptide use to the prescribing psychiatrist — antipsychotic dosing is titrated carefully and any compound affecting dopaminergic or arousal systems is relevant",
      "The contraindication applies to both typical antipsychotics (haloperidol) and atypical antipsychotics (olanzapine, quetiapine, risperidone)",
    ],
  },
  {
    id: "narcolepsy-medications",
    name: "Narcolepsy medications — sodium oxybate (Xyrem/Lumryz), pitolisant (Wakix)",
    aliases: ["sodium oxybate", "Xyrem", "Lumryz", "gamma-hydroxybutyrate", "GHB", "oxybate", "pitolisant", "Wakix", "narcolepsy medication", "histamine H3 antagonist"],
    category: "Medications",
    tier: "watch",
    summary: "Sodium oxybate (Xyrem/Lumryz) is FDA-approved for narcolepsy with cataplexy — it works through GABA-B and GHB receptors to consolidate nighttime sleep, which reduces daytime sleepiness. Pitolisant (Wakix) is an H3 receptor inverse agonist that increases histamine release in the brain, promoting wakefulness via histaminergic arousal (the same histamine system that orexin activates via the tuberomammillary nucleus). Adding exogenous orexin-A to these medications creates overlapping wakefulness-promoting mechanisms with pitolisant and complex CNS interactions with sodium oxybate. These combinations are not characterized and should only occur under narcolepsy specialist supervision.",
    mitigation: [
      "Narcolepsy patients on any approved medication (sodium oxybate, pitolisant, modafinil) should not add orexin-A without specialist supervision — treatment of narcolepsy should be managed by a sleep medicine physician",
      "Orexin-A is being developed as a future narcolepsy treatment, but it is not currently approved; substituting it for established treatments without medical guidance is inadvisable",
    ],
  },
  {
    id: "sleep-aids",
    name: "Sleep aids — melatonin, benzodiazepines, z-drugs, diphenhydramine",
    aliases: ["melatonin", "benzodiazepine", "z-drug", "zolpidem", "Ambien", "eszopiclone", "Lunesta", "diphenhydramine", "Benadryl", "sleep aid", "sedative"],
    category: "Medications",
    tier: "watch",
    summary: "Sleep aids work by promoting sleep onset or maintenance through various mechanisms (melatonin: MT1/MT2 receptor circadian entrainment; benzodiazepines/z-drugs: GABA-A potentiation; diphenhydramine: H1 antihistamine sedation). Orexin-A promotes wakefulness by activating arousal systems including the histaminergic system. The pro-wakefulness mechanism of orexin-A and the sleep-promoting mechanisms of sleep aids are in direct opposition. Using orexin-A for daytime wakefulness while using a sleep aid for nighttime sleep is theoretically reasonable but the timing gap and potential residual effects of both compounds need to be managed carefully.",
    mitigation: [
      "Separate orexin-A (morning use only) and sleep aids (evening use) by sufficient time to avoid pharmacological overlap",
      "If using orexin-A impairs sleep quality despite timing separation: discontinue orexin-A — the wakefulness benefit does not justify disrupted nighttime sleep recovery",
      "Do not use benzodiazepines or z-drugs on the same day as orexin-A unless the sleep aid is specifically for nighttime use well after any orexin-A activity has cleared",
    ],
  },
  {
    id: "standard-supplements",
    name: "Standard supplements — caffeine, L-theanine, magnesium",
    aliases: ["caffeine", "coffee", "L-theanine", "theanine", "magnesium", "vitamin D", "fish oil", "omega-3"],
    category: "Supplements",
    tier: "low",
    summary: "Standard supplements have no direct pharmacological interaction with the orexin receptor system. Caffeine (adenosine receptor antagonist) produces wakefulness through a different mechanism than orexin — the two could theoretically produce additive wakefulness effects at high caffeine doses, but this is low-concern in the context of normal caffeine intake. L-theanine counteracts caffeine-induced anxiousness and has no orexin receptor interaction. Magnesium supports sleep quality and has no orexin receptor activity.",
    mitigation: [
      "No significant adverse interaction between orexin-A and standard supplements",
      "High caffeine intake combined with orexin-A could produce excessive cardiovascular arousal — monitor heart rate if combining",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function OrexinAInteractionsPanel() {
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
        Orexin-A&apos;s interaction profile is shaped by its wakefulness-promoting mechanism activating multiple aminergic arousal systems. The hardest interactions are: orexin receptor antagonists (suvorexant/Belsomra — direct pharmacological opposition) and antipsychotics (dopaminergic opposition in psychiatric patients who should not use orexin-A). Stimulants and SSRIs/SNRIs require caution for additive arousal and cardiovascular effects. Sleep aids need timing separation. Standard supplements are low-concern. All interactions are mechanism-based — no clinical drug interaction studies exist for orexin-A.
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
