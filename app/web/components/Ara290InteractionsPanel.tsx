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
    id: "ara290-antidiabetics",
    name: "Insulin and antidiabetic drugs",
    aliases: ["insulin", "metformin", "glipizide", "glyburide", "sitagliptin", "empagliflozin", "canagliflozin", "Januvia", "Jardiance"],
    category: "Diabetes medication",
    tier: "watch",
    summary:
      "ARA-290 may have glucose-lowering properties through IRR-mediated improvements in peripheral insulin sensitivity, though this effect is inconsistently reported and not well-characterized across patient populations. If genuine, the combination with insulin or insulin secretagogues (sulfonylureas) could increase hypoglycemia risk. SGLT-2 inhibitors and GLP-1 agonists have lower intrinsic hypoglycemia risk, but any additional glucose lowering from ARA-290 would be additive.",
    mitigation: [
      "Monitor blood glucose more frequently when starting ARA-290 if you are on insulin or sulfonylureas.",
      "Be prepared to reduce insulin doses if consistent glucose-lowering is observed.",
      "The effect magnitude is uncertain; do not assume clinically significant glucose lowering will occur in all individuals.",
      "SGLT-2 inhibitors and GLP-1 agonists carry lower hypoglycemia risk but continue monitoring.",
    ],
  },
  {
    id: "ara290-esas",
    name: "Erythropoiesis-stimulating agents (ESAs)",
    aliases: ["epoetin alfa", "darbepoetin", "Epogen", "Procrit", "Aranesp", "EPO"],
    category: "Hematopoietic agents",
    tier: "watch",
    summary:
      "ARA-290 does not bind the EpoR homodimer and does not compete with ESAs at the hematopoietic receptor. However, combining ARA-290 (targeting IRR) with full-length EPO or darbepoetin (targeting both EpoR homodimer and IRR) in a research context introduces mechanistic overlap at the tissue-protective receptor. The clinical significance is unknown, and no interaction studies have been performed. Combined use in research contexts (e.g., anemia of chronic disease plus neuropathy) warrants hemodynamic and hematologic monitoring.",
    mitigation: [
      "No established interaction protocol exists; this is a theoretical concern based on shared receptor biology.",
      "Monitor hematocrit and hemoglobin if combining with ESAs to detect additive effects.",
      "ARA-290 does not provide the same hematopoietic endpoint as ESAs and should not be used as an EPO substitute.",
    ],
  },
  {
    id: "ara290-supplements",
    name: "Standard supplements",
    aliases: ["vitamin D", "omega-3", "magnesium", "zinc", "NAC", "alpha-lipoic acid"],
    category: "Supplements",
    tier: "low",
    summary:
      "No pharmacological interactions between ARA-290 and common dietary supplements have been identified. Some supplements (alpha-lipoic acid, B-vitamins, omega-3) are used for their own neuroprotective or anti-inflammatory properties; mechanistic overlap with ARA-290&apos;s IRR-mediated anti-inflammatory effects is theoretically additive but has no clinical interaction data.",
    mitigation: [
      "No specific restrictions for standard supplements.",
      "Alpha-lipoic acid and B12, commonly used for peripheral neuropathy, are unlikely to interact adversely.",
      "Disclose all supplements to any clinical trial investigator if participating in ARA-290 research.",
    ],
  },
  {
    id: "ara290-anti-inflammatory",
    name: "Anti-inflammatory drugs",
    aliases: ["NSAIDs", "ibuprofen", "naproxen", "prednisone", "methylprednisolone", "dexamethasone"],
    category: "Anti-inflammatory",
    tier: "low",
    summary:
      "ARA-290 exerts anti-inflammatory effects through IRR-mediated pathways (macrophage M2 polarization, reduced pro-inflammatory cytokine production). NSAIDs and corticosteroids act through complementary mechanisms (COX inhibition and glucocorticoid receptor respectively). No established drug-drug interactions exist. Mechanistic complementarity is plausible but unvalidated in combined human use.",
    mitigation: [
      "No specific contraindications or dose adjustments required.",
      "If using corticosteroids for sarcoidosis management (the primary studied condition), ARA-290 does not appear to interact adversely based on limited trial data.",
      "Monitor for additive GI effects only if combining NSAIDs with other medications that stress the GI tract.",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function Ara290InteractionsPanel() {
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
      <div className="reta-interactions__context">
        ARA-290&apos;s interaction profile is largely theoretical given the limited clinical
        dataset. The most practically relevant concern is potential glucose-lowering in patients
        on antidiabetic therapy. No severe pharmacokinetic interactions have been identified, but
        the absence of data should not be confused with confirmed safety.
      </div>
      <div className="reta-interactions__controls">
        <input
          className="reta-interactions__search"
          placeholder="Search drug, supplement, or compound&hellip;"
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
