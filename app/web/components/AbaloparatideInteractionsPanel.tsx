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
    id: "loop-diuretics",
    name: "Loop diuretics",
    aliases: ["furosemide", "Lasix", "bumetanide", "torsemide"],
    category: "Diuretics",
    tier: "watch",
    summary:
      "Loop diuretics increase urinary calcium excretion (hypercalciuria). Combined with abaloparatide-driven calcium mobilization from bone, this can amplify hypercalciuria and increase nephrolithiasis risk.",
    mitigation: [
      "Monitor urine calcium and serum calcium at baseline and after initiation.",
      "Assess kidney stone history before combining.",
      "Ensure adequate hydration.",
    ],
  },
  {
    id: "thiazide-diuretics",
    name: "Thiazide diuretics",
    aliases: ["hydrochlorothiazide", "HCTZ", "chlorthalidone", "indapamide"],
    category: "Diuretics",
    tier: "watch",
    summary:
      "Thiazides reduce renal calcium excretion, which may compound abaloparatide-driven hypercalcemia. Unlike loop diuretics, thiazides cause calcium retention — the combination with a PTH1R agonist can produce clinically significant hypercalcemia.",
    mitigation: [
      "Monitor serum calcium levels more frequently during combination therapy.",
      "Patients with baseline hypercalcemia should avoid this combination.",
      "Review indication for thiazide — if used for nephrolithiasis, reconsider alongside abaloparatide.",
    ],
  },
  {
    id: "active-vitamin-d",
    name: "Active vitamin D analogues",
    aliases: ["calcitriol", "Rocaltrol", "doxercalciferol", "paricalcitol", "alfacalcidol"],
    category: "Vitamins & supplements",
    tier: "watch",
    summary:
      "Calcitriol and its analogues increase intestinal calcium absorption. Combined with PTH1R-mediated calcium mobilization from abaloparatide, additive hypercalcemia is a real risk, particularly in patients already near the upper limit of normal serum calcium.",
    mitigation: [
      "Avoid combining unless clinically necessary and closely monitored.",
      "Check serum calcium within 4–6 weeks of starting combination.",
      "Standard vitamin D3 (cholecalciferol) at usual supplementation doses poses much lower risk than active analogues.",
    ],
  },
  {
    id: "calcium-supplements",
    name: "Calcium supplements",
    aliases: ["calcium carbonate", "calcium citrate", "Tums", "Os-Cal"],
    category: "Vitamins & supplements",
    tier: "low",
    summary:
      "Post-injection, abaloparatide causes a transient rise in serum calcium. Taking calcium supplements around the same time as the injection may compound this transient peak. Timing separation mitigates the concern.",
    mitigation: [
      "Take calcium supplements at a different time of day from abaloparatide injection.",
      "Standard supplementation (500–1000 mg/day) is generally appropriate; avoid high doses.",
      "Routine calcium monitoring applies regardless of supplement use.",
    ],
  },
  {
    id: "bisphosphonates",
    name: "Bisphosphonates",
    aliases: ["alendronate", "Fosamax", "risedronate", "zoledronic acid", "ibandronate"],
    category: "Osteoporosis agents",
    tier: "low",
    summary:
      "Bisphosphonates are used sequentially after abaloparatide (not concurrently) to consolidate BMD gains. Concurrent use is not standard and may blunt the anabolic response. The sequential model (abaloparatide then bisphosphonate) is the evidence-supported approach.",
    mitigation: [
      "Do not use concurrently without specialist oversight.",
      "Plan sequential therapy at the outset — abaloparatide phase followed by antiresorptive transition.",
      "The ATOM study supports alendronate as the follow-on agent.",
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

export default function AbaloparatideInteractionsPanel() {
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
        The primary interaction concerns with abaloparatide center on calcium metabolism. Drugs that
        affect calcium excretion (diuretics) or absorption (active vitamin D analogues) can amplify
        hypercalcemia or hypercalciuria. Bisphosphonates are used sequentially, not concurrently.
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
