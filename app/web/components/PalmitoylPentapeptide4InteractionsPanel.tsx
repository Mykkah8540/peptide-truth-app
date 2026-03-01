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
    name: "Retinoids (tretinoin, retinol)",
    tier: "watch" as const,
    body:
      "Retinoids and signal peptides are mechanistically complementary\u2014both target collagen " +
      "remodeling via different pathways. The combination is widely used in clinical practice. " +
      "The watch is for barrier impact: retinoids increase skin sensitivity and may alter " +
      "stratum corneum integrity, which could change peptide penetration unpredictably. " +
      "Introduce together gradually and monitor for irritation.",
  },
  {
    name: "AHAs / BHAs (glycolic, salicylic acid)",
    tier: "watch" as const,
    body:
      "Alpha- and beta-hydroxy acids exfoliate the stratum corneum, theoretically improving " +
      "peptide penetration. However, significant pH disruption from AHAs may also affect " +
      "peptide stability. Use in alternating routines rather than simultaneously unless " +
      "formulation is designed for co-delivery. No serious safety concern\u2014watch for " +
      "cumulative irritation.",
  },
  {
    name: "Palmitoyl tripeptide-1 (Matrixyl 3000 combination)",
    tier: "low" as const,
    body:
      "The intended commercial pairing. Palmitoyl pentapeptide-4 (KTTKS) and palmitoyl " +
      "tripeptide-1 target complementary collagen synthesis pathways\u2014industry studies " +
      "claim synergistic benefit. No safety concern. This is the most studied combination " +
      "context for this ingredient and represents its primary intended use.",
  },
  {
    name: "Topical corticosteroids",
    tier: "watch" as const,
    body:
      "Corticosteroids are catabolic in skin\u2014they suppress collagen synthesis and can " +
      "cause dermal atrophy with prolonged use. Concurrent use with pro-collagen peptides " +
      "creates an opposing mechanism. No direct pharmacokinetic interaction, but the " +
      "therapeutic logic is contradictory. Avoid layering unless under dermatologist " +
      "guidance for a specific indication.",
  },
  {
    name: "Botulinum toxin (Botox)",
    tier: "low" as const,
    body:
      "Botulinum toxin acts on neuromuscular junctions to reduce dynamic wrinkle formation; " +
      "palmitoyl pentapeptide-4 targets fibroblast collagen synthesis. These are independent " +
      "mechanisms with no pharmacokinetic overlap. Many patients use both. No interaction " +
      "concern. Timing relative to injection sites is irrelevant for topical peptide application.",
  },
  {
    name: "Vitamin C (ascorbic acid, ascorbyl derivatives)",
    tier: "low" as const,
    body:
      "Vitamin C is a required cofactor in collagen hydroxylation and is commonly combined " +
      "with signal peptides in anti-aging formulations. No antagonism. The combination is " +
      "mechanistically logical. Stability considerations (ascorbic acid degrades rapidly at " +
      "high pH) are formulation concerns rather than safety issues.",
  },
];

export default function PalmitoylPentapeptide4InteractionsPanel() {
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
