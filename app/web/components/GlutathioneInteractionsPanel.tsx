"use client";

/**
 * GlutathioneInteractionsPanel — interaction intelligence for Glutathione.
 * Key frame: chemotherapy is the most important interaction (antioxidant/pro-oxidant conflict).
 * NAC is redundant/additive. Alcohol depletes GSH. Most other interactions are low concern.
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
    id: "chemotherapy",
    name: "Chemotherapy (especially alkylating agents — cyclophosphamide, cisplatin)",
    aliases: ["chemotherapy", "chemo", "cisplatin", "carboplatin", "cyclophosphamide", "oxaliplatin", "alkylating agent", "cancer treatment"],
    category: "Cancer Treatment",
    tier: "flag",
    summary: "Complex — protective in some contexts, potentially interfering in others. IV glutathione has RCT evidence for protecting against platinum-induced peripheral neuropathy (a benefit). However, some chemotherapy agents (particularly alkylating agents) work by creating oxidative stress in cancer cells — antioxidant supplementation including glutathione could theoretically reduce their efficacy by protecting cancer cells from this oxidative damage. This is not a universal interaction; it is chemotherapy-regimen specific.",
    mitigation: [
      "Discuss all glutathione supplementation with your oncologist before and during active chemotherapy — the interaction depends on the specific drugs in your regimen",
      "IV glutathione before platinum chemotherapy (cisplatin, carboplatin, oxaliplatin) has some evidence for neuropathy protection — ask your oncologist about this specific use",
      "During non-platinum chemotherapy: do not self-supplement with glutathione without oncology guidance",
    ],
  },
  {
    id: "radiation-therapy",
    name: "Radiation therapy",
    aliases: ["radiation", "radiotherapy", "radiation therapy", "RT", "XRT"],
    category: "Cancer Treatment",
    tier: "flag",
    summary: "Same mechanism concern as some chemotherapy — radiation works partly through oxidative stress-induced cell death. Antioxidant supplementation during radiation could theoretically protect cancer cells from some of this effect. This is not resolved by clinical studies and warrants oncology guidance.",
    mitigation: [
      "Do not supplement with glutathione during active radiation therapy without radiation oncologist guidance",
      "The antioxidant/radiation interaction is an area of active research — ask your treating oncologist for current guidance specific to your situation",
    ],
  },
  {
    id: "nac",
    name: "N-Acetylcysteine (NAC)",
    aliases: ["NAC", "N-acetylcysteine", "acetylcysteine", "Mucomyst"],
    category: "Supplements",
    tier: "watch",
    summary: "Functionally overlapping — both serve to raise intracellular glutathione. NAC is a cysteine precursor that is converted to GSH intracellularly; glutathione provides direct (if bioavailability-limited) GSH. Using both simultaneously is largely redundant for most oral supplementation goals. The combination provides additive GSH support but not synergistic benefit — choose one primary approach.",
    mitigation: [
      "If using both NAC and glutathione, be aware that you're essentially targeting the same endpoint via two paths — not a dangerous combination, but likely redundant",
      "NAC + IV glutathione during clinical use: discuss with the overseeing physician — the combined load is higher than either alone",
    ],
  },
  {
    id: "alcohol",
    name: "Alcohol",
    aliases: ["alcohol", "ethanol", "drinking", "beer", "wine", "spirits"],
    category: "Lifestyle",
    tier: "watch",
    summary: "Alcohol directly depletes glutathione. Ethanol metabolism produces acetaldehyde and reactive oxygen species that consume GSH. Chronic alcohol use significantly depletes hepatic GSH stores — this is one mechanism of alcoholic liver disease. Using glutathione supplementation in the context of regular alcohol use is a logical but imperfectly evidenced strategy; stopping the alcohol is the more effective GSH support.",
    mitigation: [
      "Glutathione supplementation alongside alcohol use addresses the symptom (GSH depletion) but not the cause — reducing alcohol consumption is more effective than supplementing around it",
      "IV glutathione is sometimes used in hangover 'recovery' clinics — the rationale (replacing alcohol-depleted GSH) is mechanistically logical; the clinical benefit is not well-established",
    ],
  },
  {
    id: "immunosuppressants",
    name: "Immunosuppressants (cyclosporine, tacrolimus, azathioprine)",
    aliases: ["cyclosporine", "tacrolimus", "azathioprine", "mycophenolate", "immunosuppressant"],
    category: "Medications",
    tier: "watch",
    summary: "Glutathione is involved in the metabolism and elimination of some immunosuppressant drugs via glutathione S-transferase (GST) conjugation. Theoretically, very high IV glutathione doses could affect the metabolism of cyclosporine and similar drugs. At typical supplementation doses, this is likely not clinically significant — but transplant patients on these drugs warrant awareness.",
    mitigation: [
      "Transplant recipients on cyclosporine or tacrolimus: discuss IV glutathione with your transplant physician before use — the GST metabolism interaction is worth professional review",
      "Oral supplementation at typical doses: very low risk of clinically significant immunosuppressant interaction",
    ],
  },
  {
    id: "alpha-lipoic-acid",
    name: "Alpha Lipoic Acid (ALA)",
    aliases: ["ALA", "alpha lipoic acid", "lipoic acid", "R-ALA"],
    category: "Supplements",
    tier: "low",
    summary: "Complementary GSH system support. ALA recycles oxidized glutathione (GSSG) back to reduced glutathione (GSH) via thioredoxin reductase. Combining ALA with glutathione supplementation supports both the GSH pool and the GSH recycling system — a rational stack for antioxidant support goals. No adverse interaction.",
    mitigation: [
      "No adverse interaction between ALA and glutathione",
      "ALA + NAC is a well-established evidence-based antioxidant combination for liver support; adding glutathione supplementation provides incremental (though possibly redundant) GSH support",
    ],
  },
  {
    id: "vitamin-c",
    name: "Vitamin C (ascorbic acid)",
    aliases: ["vitamin C", "ascorbic acid", "ascorbate"],
    category: "Supplements",
    tier: "low",
    summary: "Synergistic antioxidant support. Vitamin C (ascorbate) can regenerate oxidized glutathione back to reduced GSH — they are part of the same antioxidant network. High-dose vitamin C has its own evidence base for certain conditions. No adverse interaction; the combination supports complementary antioxidant pathways.",
    mitigation: [
      "No adverse interaction between vitamin C and glutathione",
      "High-dose IV vitamin C in oncology contexts carries the same chemotherapy interaction caution as IV glutathione — discuss with oncologist if receiving cancer treatment",
    ],
  },
  {
    id: "selenium",
    name: "Selenium",
    aliases: ["selenium", "selenomethionine", "sodium selenite"],
    category: "Supplements",
    tier: "low",
    summary: "Glutathione peroxidase (GPx) requires selenium as an essential cofactor. Selenium deficiency reduces GPx activity and limits the effectiveness of the GSH antioxidant system. Adequate selenium supports the glutathione peroxidase pathway — the combination is nutritionally rational.",
    mitigation: [
      "No adverse interaction between selenium supplementation and glutathione",
      "If selenium deficiency is present, supplementing GSH without adequate selenium may limit GPx function",
    ],
  },
  {
    id: "protein-diet",
    name: "Dietary protein (cysteine, glycine, glutamate sources)",
    aliases: ["protein", "cysteine", "glycine", "whey protein", "high protein diet"],
    category: "Diet",
    tier: "low",
    summary: "Dietary protein provides the three amino acids (cysteine, glycine, glutamate) that the cell uses to synthesize glutathione. Adequate dietary protein, particularly sulfur-containing amino acids (cysteine from meat, eggs, legumes) is the primary nutritional support for GSH levels. Protein-sufficient diet + NAC is often more effective than glutathione supplementation alone.",
    mitigation: [
      "No adverse interaction",
      "For people with protein restriction or poor protein intake, dietary protein adequacy is a prerequisite for endogenous GSH support",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function GlutathioneInteractionsPanel() {
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
        Glutathione&apos;s most important interaction is with chemotherapy and radiation — the antioxidant/pro-oxidant conflict requires oncology guidance. For everyone else, the interaction profile is low-risk. NAC is functionally overlapping (choose one primary approach). Alcohol depletes GSH — supplementing around heavy alcohol use is less effective than reducing the alcohol.
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
