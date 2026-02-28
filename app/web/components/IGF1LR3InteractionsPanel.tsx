"use client";

/**
 * IGF1LR3InteractionsPanel — interaction intelligence for IGF-1 LR3.
 * Key frame: insulin and insulin secretagogues are the primary dangerous
 * interactions (additive hypoglycemia with prolonged duration). Cancer
 * therapy context is a hard stop. GH peptides create additive IGF-1 exposure.
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
    id: "insulin",
    name: "Insulin (all types) and insulin secretagogues",
    aliases: ["insulin", "Humalog", "Novolog", "Lantus", "Levemir", "sulfonylurea", "glipizide", "glimepiride", "glyburide"],
    category: "Diabetes Medications",
    tier: "flag",
    summary: "The most dangerous interaction. IGF-1 LR3 lowers glucose via GLUT4 in skeletal muscle; insulin lowers glucose via multiple mechanisms. Both lowering blood glucose simultaneously produces additive, potentially severe hypoglycemia. The risk is amplified by IGF-1 LR3's 20-30 hour half-life — unlike short-acting insulin where the glucose-lowering window is predictable, LR3's effect persists throughout the day and overnight. Sulfonylureas cause continuous insulin secretion regardless of glucose level, adding to the hypoglycemia risk.",
    mitigation: [
      "On insulin for diabetes: IGF-1 LR3 is contraindicated — the additive hypoglycemia risk with extended LR3 duration is dangerous",
      "On sulfonylureas: same contraindication — sulfonylurea-driven insulin secretion is not glucose-responsive and adds to LR3's glucose-lowering effect throughout the long half-life window",
      "Non-diabetic users: still require post-meal carbohydrate consumption and glucose monitoring throughout the 24h post-injection period",
    ],
  },
  {
    id: "anti-igf1r-cancer",
    name: "Anti-IGF-1R cancer therapies (ganitumab, linsitinib, figitumumab)",
    aliases: ["anti-IGF-1R", "ganitumab", "linsitinib", "figitumumab", "IGF-1R antibody", "cancer therapy", "oncology"],
    category: "Cancer Treatment",
    tier: "flag",
    summary: "Anti-IGF-1R drugs block the receptor that IGF-1 LR3 activates. Using IGF-1 LR3 while on an anti-IGF-1R therapy directly antagonizes the cancer treatment — IGF-1 LR3 stimulates the exact receptor being blocked. Any cancer treatment context is a hard stop for IGF-1 LR3.",
    mitigation: [
      "Any cancer treatment context: IGF-1 LR3 is absolutely contraindicated — IGF-1R is a cancer treatment target",
      "Any personal cancer history: hard stop regardless of treatment status",
    ],
  },
  {
    id: "gh-peptides",
    name: "GH-axis peptides (ipamorelin, CJC-1295, sermorelin, GHRP-2/6, MK-677)",
    aliases: ["ipamorelin", "CJC-1295", "sermorelin", "GHRP-2", "GHRP-6", "MK-677", "growth hormone", "GH peptide", "GHRH", "GHRP"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "GH peptides stimulate pituitary GH release, which causes liver IGF-1 production. Combining exogenous IGF-1 LR3 with GH peptides produces both elevated free IGF-1 (from LR3) and elevated bound IGF-1 (from liver production in response to GH). The combined IGF-1 exposure is additive. The cancer concern and glucose-lowering risk both scale with total IGF-1 exposure. This combination amplifies both the intended muscle effects and the associated risks.",
    mitigation: [
      "GH peptide + IGF-1 LR3: additive IGF-1R activation; cancer history is a hard stop for the combination",
      "Combined glucose-lowering effects from GH (counter-regulatory) + IGF-1 (hypoglycemic) create complex glucose dynamics — monitor carefully",
      "If using both, the cancer risk profile of combined supraphysiological IGF-1 exposure warrants current cancer screening before starting",
    ],
  },
  {
    id: "anabolic-steroids",
    name: "Anabolic steroids / testosterone",
    aliases: ["testosterone", "TRT", "anabolic steroid", "trenbolone", "nandrolone", "oxandrolone", "SARM"],
    category: "Performance",
    tier: "watch",
    summary: "Anabolic steroids and IGF-1 LR3 activate different anabolic pathways that are additive at the muscle level. The combination is common in competitive bodybuilding. Anabolic steroids can increase liver IGF-1 production; combining with exogenous IGF-1 LR3 further amplifies IGF-1 axis activity. The combined cancer risk (androgen-dependent + IGF-1R pathway) is a meaningful additive concern for prostate, testicular, and certain other cancers.",
    mitigation: [
      "No specific acute pharmacological interaction, but the combined cancer risk profile (androgenic + IGF-1R) is additive",
      "PSA monitoring is particularly important for males combining androgens with IGF-1 LR3",
      "The combination amplifies the hypoglycemia consideration — androgens can affect insulin sensitivity",
    ],
  },
  {
    id: "alcohol",
    name: "Alcohol",
    aliases: ["alcohol", "ethanol", "drinking"],
    category: "Lifestyle",
    tier: "watch",
    summary: "Alcohol impairs the liver's ability to produce glucose (gluconeogenesis) and can mask hypoglycemia symptoms. Combined with IGF-1 LR3's prolonged glucose-lowering effect, alcohol consumption in the 24 hours post-injection significantly amplifies hypoglycemia risk and severity. This is a dangerous combination.",
    mitigation: [
      "Do not consume alcohol in the 24 hours following IGF-1 LR3 injection",
      "Alcohol impairs gluconeogenesis (the liver's glucose-production response to hypoglycemia) and masks symptoms — both effects amplify LR3's hypoglycemia risk",
    ],
  },
  {
    id: "metformin",
    name: "Metformin",
    aliases: ["metformin", "Glucophage"],
    category: "Diabetes Medications",
    tier: "low",
    summary: "Metformin reduces hepatic glucose production and improves insulin sensitivity. Combined with IGF-1 LR3's glucose-lowering effects, the combination could produce additive glucose lowering — though the effect is less acute than insulin co-administration. In non-insulin-using type 2 diabetes on metformin alone, the additive risk is lower but still warrants monitoring.",
    mitigation: [
      "On metformin alone (not insulin): monitor glucose more carefully when starting IGF-1 LR3 — additive glucose-lowering is possible",
      "Discuss with prescribing physician; metformin use does not eliminate the hypoglycemia concern, it reduces it relative to insulin co-administration",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function IGF1LR3InteractionsPanel() {
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
        IGF-1 LR3&apos;s interactions are dominated by two concerns: glucose-lowering additive effects (insulin, sulfonylureas, alcohol are all dangerous combinations) and cancer therapy context (any anti-IGF-1R therapy or active cancer is a hard stop). GH peptides and anabolic steroids amplify cumulative IGF-1 exposure and cancer risk.
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
