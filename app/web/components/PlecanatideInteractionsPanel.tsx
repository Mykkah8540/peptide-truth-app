"use client";

import { useState, useMemo } from "react";

const INTERACTIONS = [
  {
    tier: "low" as const,
    cls: "No meaningful drug interactions (systemic)",
    examples: "Essentially all systemic medications",
    why: "Plecanatide is not systemically absorbed. It does not interact with hepatic CYP enzymes, plasma protein binding, or renal elimination pathways. No clinically meaningful pharmacokinetic interactions exist with any systemically acting drug.",
  },
  {
    tier: "low" as const,
    cls: "Other GC-C agonists (linaclotide)",
    examples: "Linaclotide (Linzess)",
    why: "Plecanatide and linaclotide act on the same GC-C receptor. Combining them has no rational therapeutic basis and would likely produce additive diarrhea and dehydration risk. Do not combine two GC-C agonists.",
  },
  {
    tier: "low" as const,
    cls: "Laxatives and stool softeners",
    examples: "Polyethylene glycol (MiraLax), bisacodyl, senna, docusate, magnesium citrate",
    why: "Additive pharmacodynamic effect on bowel motility and fluid secretion. Combining plecanatide with stimulant laxatives or osmotic agents increases diarrhea and dehydration risk without additional therapeutic benefit. Use should be clinician-supervised if combining for refractory constipation.",
  },
];

const TIER_ORDER = { low: 0, watch: 1, flag: 2 } as const;
type Tier = keyof typeof TIER_ORDER;

const COLORS: Record<Tier, { bg: string; border: string; tag: string; tagBg: string; dot: string; label: string }> = {
  flag: { bg: "rgba(158,56,0,0.07)", border: "rgba(158,56,0,0.20)", tag: "#9e3800", tagBg: "rgba(158,56,0,0.10)", dot: "#9e3800", label: "Stop signal" },
  watch: { bg: "rgba(124,82,0,0.06)", border: "rgba(124,82,0,0.17)", tag: "#7c5200", tagBg: "rgba(124,82,0,0.10)", dot: "#7c5200", label: "Worth watching" },
  low: { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", tag: "#155e38", tagBg: "rgba(21,100,58,0.10)", dot: "#155e38", label: "Low concern" },
};

const FILTERS: { label: string; value: Tier | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Stop signal", value: "flag" },
  { label: "Worth watching", value: "watch" },
  { label: "Low concern", value: "low" },
];

export default function PlecanatideInteractionsPanel() {
  const [active, setActive] = useState<Tier | "all">("all");

  const filtered = useMemo(
    () => (active === "all" ? INTERACTIONS : INTERACTIONS.filter((i) => i.tier === active)),
    [active]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Framing */}
      <div style={{
        background: "rgba(255,255,255,0.80)", border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 14, padding: "16px 20px", boxShadow: "0 2px 8px rgba(15,26,46,0.07)",
      }}>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: "#334155", margin: 0 }}>
          Plecanatide has an unusually clean interaction profile for a pharmaceutical \u2014 because it is not systemically absorbed, essentially all pharmacokinetic interactions are irrelevant. The only clinically meaningful considerations are <strong>pharmacodynamic</strong>: additive GI secretory effects from combining with other laxatives or GC-C agonists.
        </p>
      </div>

      {/* Filter pills */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            style={{
              fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 20,
              border: active === f.value ? "1.5px solid #0f1a2e" : "1.5px solid rgba(15,26,46,0.15)",
              background: active === f.value ? "#0f1a2e" : "rgba(255,255,255,0.80)",
              color: active === f.value ? "#fff" : "#334155",
              cursor: "pointer", transition: "all 0.15s",
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Interaction entries */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((item) => {
          const c = COLORS[item.tier];
          return (
            <div key={item.cls} style={{
              background: c.bg, border: `1px solid ${c.border}`,
              borderRadius: 10, padding: "12px 14px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: c.dot, flexShrink: 0, display: "inline-block",
                }} />
                <span style={{ fontSize: 11, fontWeight: 700, background: c.tagBg, color: c.tag, borderRadius: 6, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{c.label}</span>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1e293b" }}>{item.cls}</span>
              </div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 6 }}><strong>Examples:</strong> {item.examples}</div>
              <p style={{ fontSize: 12.5, color: "#475569", margin: 0, lineHeight: 1.55 }}>{item.why}</p>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div style={{
        background: "rgba(15,26,46,0.04)", border: "1px solid rgba(15,26,46,0.10)",
        borderRadius: 12, padding: "14px 18px",
      }}>
        <p style={{ fontSize: 12.5, color: "#475569", margin: 0, lineHeight: 1.6 }}>
          <strong>Plecanatide has no clinically meaningful systemic drug interactions.</strong> The primary caution is pharmacodynamic \u2014 avoid combining with other GC-C agonists (linaclotide) or excessive laxative use without clinical guidance, as additive diarrhea and dehydration risk is the main practical concern.
        </p>
      </div>

    </div>
  );
}
