"use client";

import { useState, useMemo } from "react";

/**
 * PegMgfInteractionsPanel — interaction intelligence for PEG-MGF.
 * Key concerns: IGF-1 and insulin (growth factor/metabolic overlap),
 * anabolic steroids (community stacking; no safety data), IGF-1-axis peptides.
 * All interactions are theoretical — no human data exists.
 */

type Tier = "flag" | "watch" | "low";

type Entry = {
  name: string;
  tier: Tier;
  detail: string;
  why: string;
  action: string;
};

const ENTRIES: Entry[] = [
  // ── WATCHES ──
  {
    name: "Exogenous IGF-1 and IGF-1 LR3",
    tier: "watch",
    detail: "Direct IGF-1 pathway overlap \u2014 additive receptor activation with no safety characterization",
    why: "PEG-MGF and IGF-1 (or its long-acting analogue IGF-1 LR3) act on overlapping growth factor signaling pathways, both involving IGF-1R to varying degrees. Combining two IGF-1-axis compounds creates additive growth factor signaling with no data on what the combined receptor occupancy, downstream signaling intensity, or adverse effect profile looks like. The oncogenesis concern (IGF-1 pathway as a tumor growth driver) is amplified with combinations.",
    action: "Do not combine without a specific reason and full awareness of the combined IGF-1-axis risk. There is no evidence base for benefit from combining PEG-MGF with IGF-1 compounds, and the theoretical harm is additive.",
  },
  {
    name: "Insulin (exogenous, including rapid-acting analogues)",
    tier: "watch",
    detail: "Overlapping metabolic and growth factor pathways \u2014 hypoglycemia and growth signaling interaction",
    why: "Insulin and IGF-1 share structural homology, receptor cross-reactivity, and downstream signaling (PI3K/Akt). PEG-MGF\u2019s proposed IGF-1-axis activation overlaps with insulin\u2019s metabolic and growth-promoting effects. Community use often stacks PEG-MGF with insulin (a documented practice in bodybuilding communities). Exogenous insulin use without physician guidance carries severe hypoglycemia risk. Adding an uncharacterized IGF-1-axis compound to an existing insulin protocol adds additional unknown variables to an already high-risk practice.",
    action: "If using insulin: the hypoglycemia risk from insulin alone is already severe. Do not add PEG-MGF to an insulin protocol without complete characterization of both compounds independently. Community insulin use without medical supervision is itself a high-risk practice.",
  },
  {
    name: "Anabolic steroids (testosterone, nandrolone, trenbolone, oxandrolone, etc.)",
    tier: "watch",
    detail: "Community stacking practice \u2014 no safety data for combination; compounded risks",
    why: "PEG-MGF is frequently described in community contexts as a stack with anabolic steroids for muscle hypertrophy. Anabolic steroids have documented adverse effects (cardiovascular, hepatic, hormonal). Adding an uncharacterized IGF-1-axis compound to an anabolic steroid protocol adds: (1) unknown pharmacodynamic interaction with steroid-induced IGF-1 regulation, (2) compounded oncogenesis risk from steroid-driven hormone-sensitive tumor promotion combined with IGF-1-axis activation, (3) additive insulin resistance from both compound classes.",
    action: "This combination has no safety characterization. If on anabolic steroids (with or without medical oversight), PEG-MGF adds uncharacterized risk to an already pharmacologically complex and risk-bearing situation.",
  },
  {
    name: "GH secretagogues (CJC-1295, ipamorelin, GHRP-2) and GH",
    tier: "watch",
    detail: "GH elevates endogenous IGF-1; combining with PEG-MGF creates additional IGF-1-axis loading",
    why: "GH secretagogues and exogenous GH increase circulating IGF-1 (produced from hepatic GH signaling). This is the primary anabolic mechanism of GH-axis activation. Adding PEG-MGF to an already elevated IGF-1 environment from GH-axis compounds creates additional IGF-1-axis signaling from a second, locally acting source. The combined IGF-1 axis activation from GH/IGF-1 elevating compounds plus an IGF-1-axis peptide is not characterized and amplifies the oncogenesis concern.",
    action: "Be aware of the cumulative IGF-1 axis burden. If on GH secretagogues for legitimate reasons (physician-managed), adding PEG-MGF should be discussed with your physician.",
  },

  // ── LOWS ──
  {
    name: "Standard supplements (vitamins, minerals, omega-3, creatine)",
    tier: "low",
    detail: "No IGF-1 pathway overlap \u2014 no plausible pharmacodynamic interaction",
    why: "Standard supplements do not interact with the IGF-1 signaling pathway at pharmacologically relevant concentrations.",
    action: "No specific supplement interaction concern. The safety question with PEG-MGF is the compound itself.",
  },
  {
    name: "BPC-157 and TB-500",
    tier: "low",
    detail: "Tissue repair peptides \u2014 different mechanisms (BPC: NO/VEGF; TB-500: actin regulation)",
    why: "BPC-157 and TB-500 operate through different repair signaling pathways than the IGF-1 axis. No documented pharmacodynamic interaction with PEG-MGF\u2019s mechanism.",
    action: "No specific interaction concern from this combination. Each compound carries its own risk profile independently.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.06)",  border: "rgba(158,56,0,0.22)",  dot: "#9e3800", label: "Flag",        labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.05)",  border: "rgba(124,82,0,0.18)",  dot: "#7c5200", label: "Watch",       labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.04)", border: "rgba(21,100,58,0.15)", dot: "#155e38", label: "Low concern", labelColor: "#155e38" },
};

const TIER_ORDER: Tier[] = ["flag", "watch", "low"];
const TIER_HEADING: Record<Tier, string> = {
  flag:  "Flags \u2014 stop and consult before combining",
  watch: "Worth watching \u2014 monitor and use judgment",
  low:   "Low concern \u2014 proceed with standard awareness",
};

export default function PegMgfInteractionsPanel() {
  const [filter, setFilter] = useState<Tier | "all">("all");
  const [committed, setCommitted] = useState<Tier | "all">("all");

  const filtered = useMemo(
    () => (committed === "all" ? ENTRIES : ENTRIES.filter((e) => e.tier === committed)),
    [committed],
  );

  const tiersPresent = TIER_ORDER.filter((t) => filtered.some((e) => e.tier === t));

  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        PEG-MGF\u2019s interaction profile is shaped by its IGF-1-axis mechanism. No interactions are characterized in humans because no human data exists. All entries below are mechanism-based theoretical assessments. The primary concerns are other IGF-1-axis compounds (additive growth factor signaling), insulin (overlapping metabolic/growth pathways), and anabolic steroids (common community stacking practice that compounds risk from two pharmacologically complex, poorly characterized combinations). The oncogenesis concern from cumulative IGF-1-axis activation is the thread that connects the watch entries.
      </div>

      <div className="reta-interactions__filter-bar">
        {(["all", ...TIER_ORDER] as const).map((t) => (
          <button
            key={t}
            className={`reta-interactions__filter-btn${(filter === t) ? " reta-interactions__filter-btn--active" : ""}`}
            onClick={() => { setFilter(t); setCommitted(t); }}
          >
            {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tiersPresent.map((tier) => {
        const entries = filtered.filter((e) => e.tier === tier);
        const cfg = TIER_STYLE[tier];
        return (
          <div key={tier} className="reta-interactions__group">
            <div
              className="reta-interactions__group-heading"
              style={{ color: cfg.labelColor, borderLeft: `3px solid ${cfg.dot}` }}
            >
              {TIER_HEADING[tier]}
            </div>
            <div className="reta-interactions__entries">
              {entries.map((e) => (
                <div
                  key={e.name}
                  className="reta-interactions__entry"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                >
                  <div className="reta-interactions__entry-top">
                    <div className="reta-interactions__entry-name">{e.name}</div>
                    <span
                      className="reta-interactions__entry-badge"
                      style={{ color: cfg.labelColor, borderColor: cfg.border }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <div className="reta-interactions__entry-detail">{e.detail}</div>
                  <div className="reta-interactions__entry-why">{e.why}</div>
                  <div className="reta-interactions__entry-action">{e.action}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="reta-interactions__footer">
        The anabolic steroid stacking interaction is the most common real-world concern: PEG-MGF is frequently described in community sources as part of anabolic cycles. That combination has no safety characterization and creates compounded risk from multiple poorly characterized pharmacologies simultaneously. The interaction list is short because the compound itself is poorly characterized \u2014 not because interactions are safe.
      </div>

    </div>
  );
}
