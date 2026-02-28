"use client";

/**
 * SS31InteractionsPanel — interaction intelligence for SS-31.
 * Key frame: limited pharmacological interactions due to mitochondrial targeting;
 * the main concerns are additive effects with other antioxidants and cardiac
 * medications. No clinical drug interaction studies exist for community use.
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
    id: "cardiac-medications",
    name: "Cardiac medications — beta-blockers, ACE inhibitors, ARBs, diuretics",
    aliases: ["beta-blocker", "metoprolol", "carvedilol", "lisinopril", "enalapril", "losartan", "furosemide", "spironolactone", "ACE inhibitor", "ARB", "heart failure medication"],
    category: "Cardiac Medications",
    tier: "watch",
    summary: "SS-31's cardiac energy efficiency effects may interact with cardiac medications by altering the hemodynamic baseline in which these drugs act. In the HARP trial, patients continued background heart failure medications — the combination was tested clinically and generally tolerated. For community users with cardiac disease self-managing with SS-31 alongside cardiac medications: the combination has clinical trial precedent but requires physician oversight to monitor for unexpected hemodynamic changes.",
    mitigation: [
      "Active cardiac disease: SS-31 + cardiac medications should involve cardiologist oversight — do not self-manage cardiac conditions",
      "The HARP trial used SS-31 on background of standard HFpEF therapy — clinical precedent for the combination exists in supervised settings",
    ],
  },
  {
    id: "nad-precursors",
    name: "NAD+ precursors — NMN, NR",
    aliases: ["NMN", "nicotinamide mononucleotide", "NR", "nicotinamide riboside", "NAD+"],
    category: "Supplements",
    tier: "watch",
    summary: "NAD+ precursors raise NAD+ to support mitochondrial energy metabolism via sirtuin and PARP pathway activation. SS-31 improves mitochondrial function via cardiolipin protection and ETC efficiency. These are complementary mitochondrial support mechanisms — no adverse interaction expected. The combination is used in longevity protocols on the theory of additive mitochondrial benefit.",
    mitigation: [
      "No adverse interaction between SS-31 and NAD+ precursors",
      "The combination is mechanistically complementary; no concerning pathway overlap identified",
    ],
  },
  {
    id: "coq10",
    name: "CoQ10 / Ubiquinol / MitoQ",
    aliases: ["CoQ10", "coenzyme Q10", "ubiquinol", "MitoQ", "mitochondria-targeted antioxidant"],
    category: "Supplements",
    tier: "watch",
    summary: "CoQ10 is an ETC complex II cofactor and antioxidant; MitoQ is a mitochondria-targeted CoQ10 analog. SS-31 addresses cardiolipin peroxidation; CoQ10/MitoQ addresses ETC electron shuttling. Both support mitochondrial function through overlapping but distinct mechanisms. The combination is mechanistically additive in theory — no adverse interaction. Whether the additive benefit is meaningful in practice is not established.",
    mitigation: [
      "No adverse interaction between SS-31 and CoQ10/MitoQ",
      "Both target mitochondrial function via different mechanisms — potentially complementary in a mitochondrial support protocol",
    ],
  },
  {
    id: "humanin-mots-c",
    name: "Humanin / MOTS-c",
    aliases: ["humanin", "MOTS-c", "mitokine"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "Humanin and MOTS-c are mitokines with signaling-based mitochondrial protective mechanisms. SS-31 is a membrane-targeting antioxidant peptide. The mechanisms are distinct and potentially complementary. No adverse interaction between these compounds in the mitochondrial support context is expected. The combination is used in advanced longevity protocols.",
    mitigation: [
      "No adverse interaction between SS-31 and humanin or MOTS-c",
      "The combination provides multiple mitochondrial support mechanisms simultaneously — mechanistically complementary",
    ],
  },
  {
    id: "general-antioxidants",
    name: "High-dose general antioxidants (vitamin C, vitamin E, N-acetylcysteine)",
    aliases: ["vitamin C", "ascorbic acid", "vitamin E", "tocopherol", "NAC", "N-acetylcysteine", "antioxidant"],
    category: "Supplements",
    tier: "low",
    summary: "SS-31 is a targeted mitochondrial antioxidant; general antioxidants act systemically. Very high-dose systemic antioxidants (particularly vitamin C and E in high doses) have been shown to blunt some beneficial adaptations to exercise by interfering with ROS signaling required for mitochondrial biogenesis. This concern applies to general antioxidants but not specifically to SS-31's targeted mechanism. No specific interaction between SS-31 and moderate-dose antioxidants is identified.",
    mitigation: [
      "No specific adverse interaction between SS-31 and standard-dose antioxidants",
      "High-dose vitamin C and E supplementation around exercise may blunt training adaptations via ROS signaling interference — a concern for antioxidants generally, not specifically SS-31",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function SS31InteractionsPanel() {
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
        SS-31&apos;s mitochondrial targeting means it has limited systemic pharmacological interactions. Cardiac medications warrant physician oversight due to the cardiac disease context, not because of dangerous drug interactions. NAD+ precursors, CoQ10, humanin, and MOTS-c are all mechanistically complementary with no adverse interactions. No clinical drug interaction studies exist for community use contexts.
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
