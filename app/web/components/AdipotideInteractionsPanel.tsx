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
    id: "nephrotoxic-drugs",
    name: "Nephrotoxic drugs",
    aliases: [
      "NSAIDs",
      "ibuprofen",
      "naproxen",
      "indomethacin",
      "aminoglycosides",
      "gentamicin",
      "tobramycin",
      "vancomycin",
      "contrast agents",
      "cisplatin",
      "cyclosporine",
      "tacrolimus",
    ],
    category: "Renal risk",
    tier: "flag",
    summary:
      "Adipotide has an established nephrotoxicity signal in primates. Any co-administration with drugs that independently reduce renal function — including NSAIDs (which reduce renal prostaglandin-mediated blood flow), aminoglycoside antibiotics, radiocontrast agents, or calcineurin inhibitors — represents additive renal injury risk. The combination could potentiate kidney damage to a clinically severe degree.",
    mitigation: [
      "This combination has no safety data and represents a high-risk unknown.",
      "If any nephrotoxic drug is being used, co-administration with adipotide should be avoided.",
      "Baseline renal function (creatinine, BUN, eGFR) should be documented before any adipotide use, and any nephrotoxic drug exposure should prompt discontinuation of adipotide.",
    ],
  },
  {
    id: "ace-arbs",
    name: "ACE inhibitors and ARBs",
    aliases: [
      "lisinopril",
      "enalapril",
      "ramipril",
      "losartan",
      "valsartan",
      "olmesartan",
      "irbesartan",
    ],
    category: "Renal risk",
    tier: "watch",
    summary:
      "ACE inhibitors and ARBs reduce intraglomerular pressure and are generally nephroprotective in chronic kidney disease. In the context of adipotide-induced acute vascular injury to the kidney, their net effect is uncertain. They may partially buffer renal injury but could also exacerbate hypotension in an acutely injured kidney. No interaction data exists.",
    mitigation: [
      "No evidence-based guidance is possible given the absence of human data.",
      "In a monitored clinical setting, ACE inhibitors or ARBs might theoretically be considered for renal protection — but this is speculative and not established.",
      "Close renal function monitoring (serial creatinine and urine output) would be the minimal required response to combination use.",
    ],
  },
  {
    id: "diuretics-renal",
    name: "Diuretics",
    aliases: ["furosemide", "Lasix", "hydrochlorothiazide", "HCTZ", "spironolactone", "torsemide"],
    category: "Renal risk",
    tier: "watch",
    summary:
      "Diuretics reduce circulating volume, which can reduce renal perfusion. In the context of adipotide-associated renal vascular injury, volume depletion may worsen ischemic kidney damage. Loop diuretics in particular can be nephrotoxic in volume-depleted states.",
    mitigation: [
      "Avoid concurrent use without close monitoring of volume status and renal function.",
      "Ensure adequate hydration during any adipotide use.",
      "If diuretics are prescribed for a legitimate indication, reconsider adipotide use entirely.",
    ],
  },
  {
    id: "supplements-unknown",
    name: "Standard supplements",
    aliases: ["creatine", "protein powder", "multivitamin", "omega-3", "zinc", "magnesium"],
    category: "Supplements",
    tier: "low",
    summary:
      "No pharmacological interaction data exists between adipotide and common supplements. Creatine supplementation transiently elevates serum creatinine (a renal biomarker used to monitor adipotide nephrotoxicity), which could complicate renal function monitoring.",
    mitigation: [
      "No interactions are established, but the absence of data is not an absence of risk.",
      "If monitoring renal function during adipotide use (which would be the minimum reasonable precaution), stop creatine supplementation to avoid biomarker confounding.",
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

export default function AdipotideInteractionsPanel() {
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
        Interaction data for adipotide is purely theoretical — derived from its known mechanism
        (renal vascular toxicity) rather than from any human pharmacokinetic or clinical study.
        The dominant concern is additive renal injury with nephrotoxic drugs or conditions. No
        interaction data from human use exists.
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
