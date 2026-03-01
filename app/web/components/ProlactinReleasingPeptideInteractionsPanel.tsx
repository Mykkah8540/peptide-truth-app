"use client";

import { useState, useMemo } from "react";

const INTERACTIONS = [
  {
    tier: "watch" as const,
    cls: "Prolactin-affecting drugs",
    examples: "Antipsychotics (haloperidol, risperidone, olanzapine), dopamine agonists (cabergoline, bromocriptine), metoclopramide, domperidone",
    why: "PrRP\u2019s naming reflects its potential to modulate prolactin secretion via hypothalamic pathways. Antipsychotics raise prolactin by blocking dopamine D2 receptors; dopamine agonists lower prolactin by enhancing dopaminergic inhibition of the pituitary. Adding a compound with uncertain prolactin-modulating effects to either class creates unpredictable neuroendocrine interactions. No human data characterizes this combination.",
  },
  {
    tier: "watch" as const,
    cls: "GLP-1 receptor agonists",
    examples: "Semaglutide (Ozempic, Wegovy), liraglutide (Victoza, Saxenda), tirzepatide (Mounjaro, Zepbound)",
    why: "GLP-1/PrRP dual agonist conjugates are in pharmaceutical development specifically because these two pathways are proposed to be additive or synergistic for appetite suppression and weight loss. Combining a standalone GLP-1 agonist with standalone PrRP mimics a dual agonist without the controlled pharmacology of the conjugate. Effects could be additive for nausea, appetite suppression, or other neuroendocrine effects. No human combination data exists.",
  },
  {
    tier: "low" as const,
    cls: "Standard supplements",
    examples: "Vitamins, minerals, fish oil, general wellness supplements",
    why: "No known mechanistic interaction between PrRP\u2019s GPR10 pathway and standard dietary supplements. Interaction risk is low.",
  },
  {
    tier: "low" as const,
    cls: "Standard medications (non-neuroendocrine)",
    examples: "Statins, antihypertensives, antibiotics, NSAIDs",
    why: "PrRP acts via central neuropeptide receptors. No pharmacokinetic or pharmacodynamic interaction with systemically acting medications outside the neuroendocrine axis is expected based on mechanism.",
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

export default function ProlactinReleasingPeptideInteractionsPanel() {
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
          PrRP\u2019s interaction profile is dominated by two areas: <strong>prolactin-affecting medications</strong> (dopamine agonists and antipsychotics, given PrRP\u2019s potential neuroendocrine effects) and <strong>GLP-1 receptor agonists</strong> (because pharmaceutical GLP-1/PrRP conjugates are in development, making standalone combination pharmacologically significant). All assessments are mechanistically inferred \u2014 no human clinical interaction studies exist.
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
          <strong>All PrRP interaction analysis is mechanistically inferred \u2014 no human clinical pharmacokinetic or interaction studies exist.</strong> The GLP-1 agonist combination is the most pharmacologically significant given the active pharmaceutical pipeline. Anyone on prolactin-modulating medications should disclose PrRP use to their prescriber.
        </p>
      </div>

    </div>
  );
}
