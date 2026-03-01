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
    id: "mt1-photosensitizers",
    name: "Photosensitizing drugs",
    aliases: [
      "tetracyclines",
      "doxycycline",
      "amiodarone",
      "fluoroquinolones",
      "ciprofloxacin",
      "hydrochlorothiazide",
      "voriconazole",
    ],
    category: "Photosensitizing medications",
    tier: "watch",
    summary:
      "Photosensitizing drugs increase UV-induced skin damage. MT-I\u2019s purpose is to provide photoprotection through melanin production \u2014 but during the lag period before adequate melanin is synthesized, individuals taking photosensitizing medications may experience paradoxically worsened photosensitivity. Additionally, increased melanin can mask early signs of UV damage that photosensitizing drugs amplify.",
    mitigation: [
      "Avoid significant sun exposure during the first weeks of MT-I use, especially if on photosensitizing medications.",
      "Sunscreen use is complementary, not replaced by MT-I-induced melanin.",
      "Discuss with the prescriber of the photosensitizing drug if you are considering MT-I.",
    ],
  },
  {
    id: "mt1-mt2",
    name: "Melanotan-II",
    aliases: ["MT-II", "melanotan 2"],
    category: "Melanocortin peptides",
    tier: "watch",
    summary:
      "Combining MT-I and MT-II adds MC1R stimulation from both agents (additive melanin effects) while MT-II independently hits MC3R, MC4R, and MC5R. There is no established clinical rationale for combining them, and doing so increases the total melanocortin receptor stimulation burden with unpredictable dose-response curves. The additive effect on MC1R means more nevi stimulation than either agent alone.",
    mitigation: [
      "Do not combine MT-I and MT-II.",
      "If switching between them, allow adequate washout time.",
      "The combination provides no demonstrated benefit over either alone at appropriate doses.",
    ],
  },
  {
    id: "mt1-standard-meds",
    name: "Standard medications",
    aliases: ["statins", "antihypertensives", "SSRIs", "PPIs", "antihistamines"],
    category: "General medications",
    tier: "low",
    summary:
      "No pharmacokinetic interactions between MT-I and standard medications are documented. MT-I is a peptide administered subcutaneously \u2014 it does not go through hepatic CYP metabolism, so the usual drug-drug interaction pathways for small molecule drugs do not apply.",
    mitigation: [
      "No specific precautions for standard medication combinations.",
      "Disclose MT-I use to your prescribers so they have a complete picture of your pharmacological exposures.",
    ],
  },
  {
    id: "mt1-sunscreens",
    name: "Sunscreens",
    aliases: ["SPF", "mineral sunscreen", "chemical sunscreen", "zinc oxide", "titanium dioxide"],
    category: "Topical photoprotection",
    tier: "low",
    summary:
      "Sunscreens and MT-I-induced melanin are complementary photoprotective mechanisms. MT-I provides endogenous melanin-based photoprotection; sunscreens block UV at the skin surface. Using both together is rational and provides better protection than either alone. There is no interaction concern.",
    mitigation: [
      "Continue using sunscreen even when using MT-I \u2014 melanin production from MT-I does not replicate SPF-rated UV blocking.",
      "Particularly important in fair-skinned individuals and during initial MT-I use before melanin levels increase.",
    ],
  },
];

const TIER_STYLE: Record<
  Tier,
  { bg: string; border: string; dot: string; label: string; labelColor: string }
> = {
  flag: {
    bg: "rgba(158,56,0,0.07)",
    border: "rgba(158,56,0,0.20)",
    dot: "#9e3800",
    label: "Stop signal",
    labelColor: "#9e3800",
  },
  watch: {
    bg: "rgba(124,82,0,0.06)",
    border: "rgba(124,82,0,0.17)",
    dot: "#7c5200",
    label: "Worth watching",
    labelColor: "#7c5200",
  },
  low: {
    bg: "rgba(21,100,58,0.05)",
    border: "rgba(21,100,58,0.13)",
    dot: "#155e38",
    label: "Low concern",
    labelColor: "#155e38",
  },
};

export default function MelanoranIInteractionsPanel() {
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
            No interactions found for \u201c{query}\u201d. That doesn\u2019t mean none exist \u2014 it means this database doesn\u2019t have a specific entry.
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
                  <span
                    className="reta-interactions__dot"
                    style={{ background: st.dot }}
                  />
                  <div>
                    <div className="reta-interactions__entry-name">{entry.name}</div>
                    {entry.aliases.length > 0 && (
                      <div className="reta-interactions__entry-aliases">
                        {entry.aliases.join(", ")}
                      </div>
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
