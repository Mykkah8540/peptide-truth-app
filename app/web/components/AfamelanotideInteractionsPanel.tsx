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
    id: "photosensitizing-drugs",
    name: "Photosensitizing drugs",
    aliases: [
      "amiodarone",
      "tetracyclines",
      "doxycycline",
      "minocycline",
      "fluoroquinolones",
      "ciprofloxacin",
      "levofloxacin",
      "hydrochlorothiazide",
      "HCTZ",
      "chlorpromazine",
      "voriconazole",
      "St. John&apos;s Wort",
    ],
    category: "Photosensitivity",
    tier: "watch",
    summary:
      "In EPP patients using afamelanotide to reduce photosensitivity, co-administration of drugs that independently increase photosensitivity creates a mixed picture. The afamelanotide-driven melanin increase may partially compensate, but the net photosensitivity will depend on the relative magnitudes. In general-population use without EPP, photosensitizing drugs combined with afamelanotide-induced tanning do not have established safety data and create an uncertain risk profile.",
    mitigation: [
      "EPP patients should inform their dermatologist of all medications before starting afamelanotide.",
      "Photosensitizing drug courses (e.g., doxycycline for acne) during afamelanotide therapy should be discussed with a prescriber.",
      "Increased sun protection measures are appropriate when both photosensitizing drugs and afamelanotide are used concurrently.",
    ],
  },
  {
    id: "melanotan-analogues",
    name: "Melanotan analogues",
    aliases: [
      "Melanotan-I",
      "Melanotan-II",
      "MT-I",
      "MT-II",
      "PT-141",
      "bremelanotide",
      "setmelanotide",
    ],
    category: "Melanocortin compounds",
    tier: "watch",
    summary:
      "Melanotan-I, Melanotan-II, and related melanocortin agonists stimulate the same MC1R pathway as afamelanotide. Combining afamelanotide with any other melanocortin-active compound represents additive MC receptor stimulation with no established safety data. The interaction is pharmacologically logical but completely unstudied. Over-stimulation of MC1R could theoretically amplify hyperpigmentation, nausea, or other MC1R-mediated effects, and in the context of melanoma risk, additive agonist exposure is a concern.",
    mitigation: [
      "Do not combine afamelanotide with any other melanocortin receptor agonist.",
      "Community melanotan use (typically MT-II by injection) should not be combined with pharmaceutical afamelanotide implant use.",
      "If transitioning between agents, discuss the washout period with a knowledgeable physician.",
    ],
  },
  {
    id: "standard-medications",
    name: "Standard medications (non-photosensitizing)",
    aliases: [
      "statins",
      "metformin",
      "antihypertensives",
      "SSRIs",
      "SNRIs",
      "proton pump inhibitors",
      "antihistamines",
    ],
    category: "General medications",
    tier: "low",
    summary:
      "No pharmacokinetic drug-drug interactions have been characterized for afamelanotide with standard medications at therapeutic doses. The peptide undergoes rapid enzymatic degradation to amino acids; it is not a CYP450 substrate and is not expected to participate in typical small-molecule pharmacokinetic interactions.",
    mitigation: [
      "No specific precautions required for standard medications.",
      "Medication lists should be reviewed by a prescribing physician in the context of the full EPP management plan.",
    ],
  },
  {
    id: "sunscreens-photoprotection",
    name: "Sunscreens and photoprotective agents",
    aliases: [
      "SPF",
      "zinc oxide",
      "titanium dioxide",
      "avobenzone",
      "oxybenzone",
      "Mexoryl",
      "Heliocare",
      "Polypodium leucotomos",
    ],
    category: "Photoprotection",
    tier: "low",
    summary:
      "Sunscreens and other photoprotective agents are complementary to afamelanotide in EPP management. They act via different mechanisms (physical/chemical UV blockade vs. melanin-mediated absorption) and additive photoprotective benefit is expected with concurrent use. No adverse interaction has been identified.",
    mitigation: [
      "Continued use of broad-spectrum sunscreen is recommended even during afamelanotide treatment in EPP patients.",
      "Afamelanotide does not eliminate the need for conventional photoprotection.",
      "Polypodium leucotomos extract and other oral photoprotective supplements may be used concurrently without known interaction.",
    ],
  },
];

const TIER_STYLE: Record<
  Tier,
  { bg: string; border: string; label: string; labelColor: string }
> = {
  flag: {
    bg: "rgba(158,56,0,0.07)",
    border: "rgba(158,56,0,0.20)",
    label: "Stop signal",
    labelColor: "#9e3800",
  },
  watch: {
    bg: "rgba(124,82,0,0.06)",
    border: "rgba(124,82,0,0.17)",
    label: "Worth watching",
    labelColor: "#7c5200",
  },
  low: {
    bg: "rgba(21,100,58,0.05)",
    border: "rgba(21,100,58,0.13)",
    label: "Low concern",
    labelColor: "#155e38",
  },
};

const CATEGORIES = [
  "All",
  ...Array.from(new Set(INTERACTIONS.map((e) => e.category))),
];

export default function AfamelanotideInteractionsPanel() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return INTERACTIONS.filter((e) => {
      const matchesCat = activeCat === "All" || e.category === activeCat;
      const matchesQuery =
        q === "" ||
        e.name.toLowerCase().includes(q) ||
        e.aliases.some((a) => a.toLowerCase().includes(q)) ||
        e.summary.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, activeCat]);

  return (
    <div className="reta-interactions">
      <div className="reta-interactions__context">
        Afamelanotide&apos;s key interaction concerns are pharmacodynamic: photosensitizing drugs can
        partially counteract its photoprotective benefit in EPP, and other melanocortin agonists
        add unstudied receptor stimulation. Standard pharmacokinetic drug interactions are not
        a significant concern given the peptide&apos;s rapid enzymatic degradation.
      </div>
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
      <div className="reta-interactions__list">
        {results.length === 0 ? (
          <div className="reta-interactions__empty">
            No interactions found for that search.
          </div>
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
