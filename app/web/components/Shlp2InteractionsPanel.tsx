"use client";

import { useState, useMemo } from "react";

const INTERACTIONS = [
  {
    tier: "watch" as const,
    cls: "Insulin and antidiabetic medications",
    examples: "Insulin (all forms), metformin, GLP-1 agonists (semaglutide, liraglutide), sulfonylureas, SGLT2 inhibitors",
    why: "SHLP-2 has demonstrated insulin-sensitizing effects in cell and animal models, likely through pathways that improve cellular glucose uptake. Adding an insulin-sensitizing agent to existing antidiabetic therapy creates a risk of additive hypoglycemic effects \u2014 particularly relevant for anyone on insulin or sulfonylureas where glucose lowering is already pharmacologically driven. The mechanism is unstudied in humans but mechanistically credible.",
  },
  {
    tier: "low" as const,
    cls: "Standard supplements and mitochondrial support agents",
    examples: "CoQ10, PQQ, NMN, NR, alpha-lipoic acid, magnesium, general vitamins",
    why: "SHLP-2 is frequently discussed in the context of mitochondrial optimization stacking alongside CoQ10, NMN/NR, and PQQ. These compounds operate through different mitochondrial pathways (electron transport chain support, NAD+ replenishment, antioxidant) vs. SHLP-2\u2019s MDP signaling. No pharmacological interactions are expected, though additive metabolic effects on glucose and energy metabolism are theoretically possible and not characterized.",
  },
  {
    tier: "low" as const,
    cls: "Standard medications (non-metabolic)",
    examples: "Antihypertensives, statins, antibiotics, antihistamines, standard analgesics",
    why: "SHLP-2 acts via mitochondrial-derived peptide signaling pathways that do not directly interact with standard pharmacological drug classes outside the metabolic/antidiabetic domain. No pharmacokinetic interactions are expected given the peptide\u2019s rapid proteolytic clearance.",
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

export default function Shlp2InteractionsPanel() {
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
          SHLP-2\u2019s primary interaction concern is <strong>insulin and antidiabetic medications</strong> \u2014 the putative insulin-sensitizing mechanism creates a plausible additive hypoglycemia risk in anyone on glucose-lowering therapy. Beyond that, the interaction profile is low-concern given the peptide\u2019s targeted mitochondrial-derived signaling pathway. All assessments are mechanistically inferred; no human interaction studies exist.
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
          <strong>All SHLP-2 interaction analysis is mechanistically inferred \u2014 no human clinical pharmacokinetic or interaction studies exist.</strong> The insulin/antidiabetic medication flag is the most actionable concern. Anyone on glucose-lowering therapy should review with a clinician before adding SHLP-2. Source quality is the most immediate practical risk for this compound.
        </p>
      </div>

    </div>
  );
}
