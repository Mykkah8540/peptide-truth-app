"use client";

/**
 * DSIPInteractionsPanel — interaction intelligence for DSIP.
 * Key frame: opioid receptor interactions are the most mechanistically important;
 * CNS depressant combinations are the most practically relevant safety concern.
 * Most interactions are mechanism-based — no clinical drug interaction studies exist.
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
    id: "opioids",
    name: "Opioid medications — prescription opioids, methadone, buprenorphine",
    aliases: ["opioid", "oxycodone", "hydrocodone", "morphine", "fentanyl", "methadone", "buprenorphine", "Suboxone", "Subutex"],
    category: "Medications",
    tier: "flag",
    summary: "DSIP has proposed opioid receptor interactions and demonstrated efficacy in opioid withdrawal states. Using DSIP concurrently with opioid medications creates uncharacterized opioid receptor overlap. The clinical evidence used DSIP during withdrawal (off opioids), not alongside opioid therapy. Whether DSIP modulates opioid receptor signaling in ways that affect opioid analgesia, tolerance, or dependence in active users is not established and cannot be safely predicted from available data.",
    mitigation: [
      "On any opioid medication (prescription pain management, methadone, buprenorphine): do not use DSIP without explicit discussion with the prescribing physician",
      "The opioid withdrawal evidence supports DSIP in the context of coming off opioids — not alongside ongoing opioid use",
      "If being managed for opioid use disorder: any investigational compound use should be disclosed to and approved by the addiction medicine provider",
    ],
  },
  {
    id: "benzodiazepines",
    name: "Benzodiazepines and z-drugs (alprazolam, diazepam, zolpidem, eszopiclone)",
    aliases: ["benzodiazepine", "alprazolam", "Xanax", "diazepam", "Valium", "lorazepam", "Ativan", "clonazepam", "Klonopin", "zolpidem", "Ambien", "eszopiclone", "Lunesta", "z-drug", "sleeping pill"],
    category: "Medications",
    tier: "watch",
    summary: "Both DSIP and benzodiazepines/z-drugs have CNS sedative effects in some studies (DSIP by sleep modulation; BZDs/z-drugs by GABA-A potentiation). Combining them theoretically risks additive CNS depression — excessive sedation, impaired coordination, respiratory depression in extreme cases. Whether DSIP's sedating effects in practice are strong enough to create a clinically significant combination risk is uncertain, but the theoretical interaction is present.",
    mitigation: [
      "On prescribed benzodiazepines or z-drugs: discuss with prescribing physician before adding DSIP",
      "Do not start DSIP on a night when you have also taken a sleep medication — characterize DSIP's individual effect separately first",
      "Avoid alcohol on DSIP dosing nights given the potential additive CNS depressant effects",
    ],
  },
  {
    id: "alcohol",
    name: "Alcohol",
    aliases: ["alcohol", "ethanol", "drinking", "beer", "wine", "spirits"],
    category: "Lifestyle",
    tier: "watch",
    summary: "Alcohol is a CNS depressant. DSIP has sleep-modulating and potentially mildly sedating effects. Combining alcohol with any sleep-affecting compound risks additive sedation and impairs sleep architecture (alcohol fragments sleep and suppresses REM). If DSIP produces any sedating effect, alcohol would be expected to potentiate it.",
    mitigation: [
      "Avoid alcohol on DSIP dosing nights — both practical (confounds sleep tracking) and safety reasons (additive CNS depression risk)",
      "Alcohol disrupts sleep architecture independently — combining with a sleep-targeting peptide makes it impossible to assess DSIP's effect",
    ],
  },
  {
    id: "cortisol-managing-drugs",
    name: "Cortisol / adrenal axis medications — hydrocortisone, prednisone, metyrapone",
    aliases: ["cortisol", "hydrocortisone", "prednisone", "corticosteroid", "metyrapone", "ketoconazole", "mifepristone", "adrenal insufficiency"],
    category: "Medications",
    tier: "watch",
    summary: "DSIP modulates ACTH and cortisol responses. Any medication that directly affects the HPA axis (corticosteroids, metyrapone for Cushing's, hydrocortisone for adrenal insufficiency) creates overlapping HPA axis effects. DSIP's HPA-normalizing effects combined with pharmaceutical HPA axis management could produce unpredictable cortisol disruption — too high or too low depending on the direction of the drug effects.",
    mitigation: [
      "On any HPA axis-modifying medication (corticosteroids, adrenal insufficiency treatment, Cushing's treatment): do not use DSIP without explicit endocrinology guidance",
      "The ACTH/cortisol modulation from DSIP is modest but could interfere with tightly managed HPA axis conditions",
    ],
  },
  {
    id: "selank-semax",
    name: "Other neuropeptides — Selank, Semax",
    aliases: ["Selank", "Semax", "neuropeptide", "anxiolytic peptide"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "Selank and Semax are Russian-developed neuropeptides with anxiolytic/nootropic effects. Combining multiple neuropeptides with overlapping CNS modulatory effects creates unpredictable combined action. No pharmacological data on DSIP combined with Selank or Semax exists. The combination is not characterized.",
    mitigation: [
      "Do not combine multiple CNS-active neuropeptides (DSIP + Selank/Semax) without establishing individual responses to each separately",
      "Combine one at a time and titrate — stacking multiple CNS modulators without established individual effects is inadvisable",
    ],
  },
  {
    id: "melatonin",
    name: "Melatonin",
    aliases: ["melatonin"],
    category: "Supplements",
    tier: "low",
    summary: "Melatonin affects sleep onset via MT1/MT2 circadian receptors — a different mechanism than DSIP's proposed sleep architecture modulation. No direct pharmacological interaction. Melatonin for sleep onset timing; DSIP targeting sleep depth/architecture — potentially complementary. No adverse interaction expected.",
    mitigation: [
      "No adverse interaction between DSIP and melatonin",
      "The combination may be used to address different aspects of sleep (timing via melatonin; depth/architecture via DSIP) — though the combined effect is not characterized",
    ],
  },
  {
    id: "magnesium",
    name: "Magnesium glycinate / threonate",
    aliases: ["magnesium", "magnesium glycinate", "magnesium threonate", "Magtein"],
    category: "Supplements",
    tier: "low",
    summary: "Magnesium supports GABA synthesis and has NMDA receptor-modulating sleep-supportive effects. No direct interaction with DSIP. Magnesium is a common base supplement for sleep quality and is compatible with DSIP use.",
    mitigation: [
      "No adverse interaction between DSIP and magnesium supplements",
      "Magnesium is a reasonable base for sleep support regardless of whether DSIP is also used",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function DSIPInteractionsPanel() {
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
        DSIP&apos;s interactions are primarily context-driven: opioid medications are a hard stop due to DSIP&apos;s opioid receptor associations; CNS depressants (benzodiazepines, alcohol) are worth watching for additive sedation; HPA axis medications interact through cortisol modulation. Melatonin and magnesium are compatible. No clinical drug interaction studies exist — all interactions are mechanism-based.
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
