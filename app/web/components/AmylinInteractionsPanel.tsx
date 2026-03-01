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
    id: "amylin-insulin",
    name: "Insulin (all formulations)",
    aliases: ["lispro", "aspart", "glulisine", "regular insulin", "glargine", "detemir", "degludec"],
    category: "Diabetes medication",
    tier: "flag",
    summary:
      "Pramlintide slows gastric emptying and blunts postprandial glucagon, flattening glucose entry. When paired with full prandial insulin doses, the mismatch produces hypoglycemia — often within 1–3 hours of the meal. The FDA label mandates a 50% reduction in prandial insulin at initiation with subsequent dose titration guided by glucose monitoring.",
    mitigation: [
      "Reduce all prandial (mealtime) insulin by 50% when starting pramlintide.",
      "Use continuous glucose monitoring (CGM) or frequent fingerstick monitoring during the first 4 weeks.",
      "Do not use pramlintide if the patient has hypoglycemia unawareness or erratic meal schedules.",
      "Basal insulin doses typically do not require adjustment.",
    ],
  },
  {
    id: "amylin-oral-meds",
    name: "Time-sensitive oral medications",
    aliases: ["antibiotics", "analgesics", "oral contraceptives", "cyclosporine"],
    category: "Oral medications",
    tier: "watch",
    summary:
      "Amylin receptor activation significantly delays gastric emptying, reducing the rate of absorption for any orally administered drug that requires timely GI transit. Medications with narrow therapeutic windows, time-sensitive dosing (e.g., antibiotics, analgesics), or absorption-dependent efficacy are affected.",
    mitigation: [
      "Take time-sensitive oral medications at least 1 hour before or 2 hours after pramlintide injection.",
      "Review all oral medications for absorption sensitivity with a pharmacist at pramlintide initiation.",
      "Medications with wide therapeutic windows (e.g., vitamins, most supplements) are unlikely to be clinically affected.",
    ],
  },
  {
    id: "amylin-agis",
    name: "Alpha-glucosidase inhibitors",
    aliases: ["acarbose", "miglitol", "voglibose", "Precose", "Glyset"],
    category: "Diabetes medication",
    tier: "watch",
    summary:
      "Alpha-glucosidase inhibitors (AGIs) reduce postprandial glucose by blocking intestinal carbohydrate digestion. Combined with pramlintide, both agents slow carbohydrate entry simultaneously via different mechanisms. The additive effect on gastric emptying and carbohydrate absorption may increase GI symptoms (bloating, flatulence, diarrhea) and risk of hypoglycemia when insulin is also present.",
    mitigation: [
      "Monitor closely for additive hypoglycemia if insulin is co-administered.",
      "Assess GI tolerability — the combination may be poorly tolerated in patients sensitive to either agent alone.",
      "Consider whether both agents are necessary; the combination is rarely used in clinical practice.",
    ],
  },
  {
    id: "amylin-glp1",
    name: "GLP-1 receptor agonists",
    aliases: ["semaglutide", "liraglutide", "dulaglutide", "exenatide", "tirzepatide", "Ozempic", "Wegovy", "Victoza"],
    category: "Incretin therapy",
    tier: "low",
    summary:
      "GLP-1 agonists and amylin agonists both slow gastric emptying and reduce food intake, but via distinct pathways (GLP-1R in hypothalamus vs. amylin receptor in area postrema). Additive nausea and gastric slowing are expected. The combination is actively being developed as CagriSema (cagrilintide + semaglutide), which demonstrates superior weight loss to either alone — so the pharmacodynamic overlap is being intentionally harnessed.",
    mitigation: [
      "Expect additive nausea and gastric emptying delay — dose-titrate carefully if combining.",
      "CagriSema combination is experimental; do not attempt to replicate with pramlintide + GLP-1 outside supervised clinical care.",
      "No specific contraindication, but GI tolerability monitoring is essential.",
    ],
  },
  {
    id: "amylin-supplements",
    name: "Standard supplements",
    aliases: ["magnesium", "vitamin D", "omega-3", "zinc", "creatine"],
    category: "Supplements",
    tier: "low",
    summary:
      "Common dietary supplements have no known pharmacological interaction with amylin receptor agonism. The primary consideration is absorption timing for fat-soluble vitamins (D, E, K, A) and minerals, which could theoretically be affected by slowed gastric emptying, though the clinical significance is negligible.",
    mitigation: [
      "No specific restrictions for standard supplements.",
      "Consider taking fat-soluble vitamins with the meal least affected by pramlintide dosing if concerned about absorption.",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function AmylinInteractionsPanel() {
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
        The dominant interaction risk with pramlintide (the approved amylin analogue) is
        hypoglycemia from insulin mismatch. A secondary consideration is slowed absorption of
        orally co-administered medications due to delayed gastric emptying.
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
