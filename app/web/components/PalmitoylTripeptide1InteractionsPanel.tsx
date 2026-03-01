"use client";
import { useState, useMemo } from "react";

const TIER_STYLE = {
  stop: {
    bg: "rgba(220,38,38,0.06)",
    border: "rgba(220,38,38,0.25)",
    dot: "#dc2626",
    label: "Stop",
    labelColor: "#b91c1c",
  },
  watch: {
    bg: "rgba(234,179,8,0.07)",
    border: "rgba(234,179,8,0.35)",
    dot: "#ca8a04",
    label: "Watch",
    labelColor: "#92400e",
  },
  low: {
    bg: "rgba(34,197,94,0.06)",
    border: "rgba(34,197,94,0.25)",
    dot: "#16a34a",
    label: "Low Risk",
    labelColor: "#166534",
  },
};

const interactions = [
  {
    name: "Palmitoyl pentapeptide-4 (Matrixyl 3000)",
    tier: "low" as const,
    body:
      "The intended pairing. Palmitoyl tripeptide-1 and palmitoyl pentapeptide-4 together " +
      "constitute Matrixyl 3000, which is the primary studied context for both ingredients. " +
      "Industry data claims synergistic collagen stimulation via complementary receptor " +
      "binding profiles (GHK-derived vs. KTTKS-derived pathways). No safety concern. " +
      "This is standard intended use.",
  },
  {
    name: "Retinoids (tretinoin, retinol)",
    tier: "watch" as const,
    body:
      "Mechanistically complementary\u2014retinoids upregulate collagen synthesis via retinoic " +
      "acid receptors while GHK-based peptides operate via a different signaling pathway. " +
      "The watch is for barrier integrity: retinoids increase skin turnover and sensitivity, " +
      "which could modify peptide penetration and increase irritation risk. Use sequentially " +
      "or in alternating routines initially.",
  },
  {
    name: "AHAs / BHAs (glycolic, salicylic, lactic acid)",
    tier: "watch" as const,
    body:
      "Exfoliation theoretically enhances peptide delivery by thinning the stratum corneum. " +
      "However, low pH from AHAs may affect peptide stability in the same formulation. " +
      "No serious safety interaction\u2014cumulative barrier disruption is the primary concern. " +
      "Alternate use or use pH-separated formulations.",
  },
  {
    name: "Niacinamide",
    tier: "low" as const,
    body:
      "A common and well-tolerated combination in anti-aging formulations. Niacinamide " +
      "addresses skin tone, barrier reinforcement, and sebum regulation; palmitoyl " +
      "tripeptide-1 targets collagen synthesis. No mechanistic antagonism, no known " +
      "chemical incompatibility. Frequently co-formulated commercially without issue.",
  },
  {
    name: "Snap-8 and other signal peptides",
    tier: "low" as const,
    body:
      "Multiple signal peptides targeting different pathways (e.g., Snap-8 targeting " +
      "SNARE complex for expression-line relaxation) are routinely combined in premium " +
      "anti-aging formulations. No safety concern. Efficacy additivity is unproven " +
      "independently but is not implausible given different mechanisms of action.",
  },
  {
    name: "Topical corticosteroids",
    tier: "watch" as const,
    body:
      "Corticosteroids suppress collagen synthesis and can cause dermal atrophy\u2014the " +
      "opposite goal of palmitoyl tripeptide-1. The combination creates a mechanistic " +
      "conflict: one agent signals collagen production while the other suppresses it. " +
      "No pharmacokinetic interaction, but the therapeutic logic is contradictory. " +
      "Avoid concurrent use unless directed by a dermatologist for a specific indication.",
  },
];

export default function PalmitoylTripeptide1InteractionsPanel() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      interactions.filter(
        (i) =>
          i.name.toLowerCase().includes(q.toLowerCase()) ||
          i.body.toLowerCase().includes(q.toLowerCase())
      ),
    [q]
  );

  return (
    <div className="reta-interactions">
      <h2 className="reta-interactions__heading">Interactions</h2>
      <input
        className="reta-interactions__search"
        placeholder="Filter interactions..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="reta-interactions__list">
        {filtered.map((item, i) => {
          const t = TIER_STYLE[item.tier];
          return (
            <div
              key={i}
              className="reta-interactions__item"
              style={{ background: t.bg, border: `1px solid ${t.border}` }}
            >
              <div className="reta-interactions__item-top">
                <span className="reta-interactions__dot" style={{ background: t.dot }} />
                <span className="reta-interactions__item-label" style={{ color: t.labelColor }}>
                  {t.label}
                </span>
                <span className="reta-interactions__item-name">{item.name}</span>
              </div>
              <p className="reta-interactions__item-body">{item.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
