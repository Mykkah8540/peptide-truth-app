"use client";

/**
 * LeuprolideInteractionsPanel — interaction intelligence for Leuprolide (Lupron).
 * Key frame: anti-androgens are standard co-medication at initiation (flare management);
 * QTc-prolonging medications interact through ADT-associated QTc lengthening;
 * antidiabetic medications may need dose adjustment due to insulin resistance;
 * bisphosphonates are bone-protective co-medication. Gonadorelin has opposite mechanism.
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
    id: "anti-androgens",
    name: "Anti-androgens — bicalutamide (Casodex), flutamide, nilutamide, enzalutamide",
    aliases: ["bicalutamide", "Casodex", "flutamide", "Eulexin", "nilutamide", "Nilandron", "enzalutamide", "Xtandi", "anti-androgen", "androgen receptor blocker"],
    category: "Medications",
    tier: "flag",
    summary: "Anti-androgens are standard co-medication with leuprolide at initiation in prostate cancer — specifically to blunt the testosterone flare that occurs in the first 5-10 days after injection. Without anti-androgen cover, the testosterone flare can worsen prostate cancer (bone pain crises, spinal cord compression risk in metastatic disease). Bicalutamide 50 mg/day started 1-2 weeks before or concurrently with first leuprolide injection is the most common flare management protocol. This is a deliberate, prescribed combination — it is not an adverse interaction but a required component of safe initiation.",
    mitigation: [
      "Anti-androgen cover at leuprolide initiation is standard of care in prostate cancer — do not start leuprolide without this protocol or explicit physician decision to omit it",
      "Bicalutamide 50 mg/day is the most commonly used cover agent; continue for the first 4 weeks of leuprolide treatment",
      "For men with high disease burden or high risk of flare consequences (impending spinal cord compression): consider GnRH antagonist (degarelix) instead of leuprolide — degarelix does not cause flare",
      "In non-cancer indications (endometriosis, gender-affirming care): the testosterone flare is less clinically consequential; anti-androgen cover is not routinely required",
    ],
  },
  {
    id: "gonadorelin",
    name: "Gonadorelin (native GnRH) — opposite mechanism; combining is pharmacologically irrational",
    aliases: ["gonadorelin", "GnRH", "gonadotropin-releasing hormone", "Factrel", "Lutrepulse"],
    category: "Medications",
    tier: "flag",
    summary: "Gonadorelin (pulsatile native GnRH) and leuprolide have mechanistically opposite functional effects: gonadorelin stimulates LH/FSH release when given pulsatile; leuprolide suppresses LH/FSH through continuous receptor desensitization. Combining them creates conflicting signals at the same receptor. No rational clinical indication exists for combining these two compounds. Any community reasoning that suggests combining gonadorelin with leuprolide for PCT reflects a fundamental misunderstanding of the mechanism.",
    mitigation: [
      "Do not combine gonadorelin and leuprolide — the mechanisms are functionally opposite and the combination has no rational basis",
      "If the goal is HPG axis stimulation (PCT, fertility), gonadorelin (pulsatile) is one relevant tool; leuprolide is contraindicated for this purpose",
      "Community protocols combining these compounds are pharmacologically incoherent; consult with an endocrinologist for appropriate HPG axis management",
    ],
  },
  {
    id: "qtc-prolonging",
    name: "QTc-prolonging medications — antipsychotics, certain antibiotics, antiarrhythmics",
    aliases: ["QT prolongation", "QTc", "haloperidol", "quetiapine", "antipsychotic", "azithromycin", "clarithromycin", "ciprofloxacin", "fluoroquinolone", "amiodarone", "sotalol", "antiarrhythmic", "ondansetron", "methadone"],
    category: "Medications",
    tier: "watch",
    summary: "Androgen deprivation therapy with leuprolide prolongs the QTc interval — the FDA added a class warning for GnRH agonists in 2010. Baseline QTc prolongation from leuprolide combined with other QTc-prolonging medications creates additive risk for potentially life-threatening arrhythmias (torsades de pointes). The ADT-associated QTc prolongation is modest but real, and the additive risk with other QTc-prolonging agents is clinically meaningful in patients with underlying cardiac disease or multiple QTc-prolonging medications.",
    mitigation: [
      "Review all medications for QTc-prolonging potential before starting leuprolide — CredibleMeds QTc risk database is a useful reference",
      "Baseline ECG before starting ADT, particularly in men with known cardiac disease or on multiple QTc-prolonging medications",
      "Electrolyte monitoring (potassium, magnesium) — hypokalemia and hypomagnesemia potentiate QTc prolongation and should be corrected",
      "For men on antipsychotics or antiarrhythmics: explicit cardiology consultation on QTc monitoring during ADT",
    ],
  },
  {
    id: "antidiabetic",
    name: "Antidiabetic medications — insulin, metformin, GLP-1 agonists, SGLT-2 inhibitors, sulfonylureas",
    aliases: ["insulin", "metformin", "GLP-1", "semaglutide", "liraglutide", "SGLT-2", "empagliflozin", "dapagliflozin", "sulfonylurea", "glipizide", "glimepiride", "diabetes medication", "blood sugar"],
    category: "Medications",
    tier: "watch",
    summary: "Leuprolide ADT causes insulin resistance and impaired glucose metabolism — documented in multiple studies. In men with pre-existing type 2 diabetes or metabolic syndrome, this insulin resistance worsens glycemic control. Antidiabetic medication doses that were adequate before ADT may become insufficient. Conversely, if ADT is stopped (temporary break, end of treatment), insulin sensitivity recovers and previously adjusted doses may cause hypoglycemia.",
    mitigation: [
      "HbA1c and fasting glucose before starting ADT; repeat every 3 months during treatment in men with diabetes",
      "Anticipate insulin resistance increase — antidiabetic medication dose escalation may be needed within weeks to months of ADT initiation",
      "If stopping ADT: monitor for hypoglycemia as insulin sensitivity recovers — antidiabetic medication dose reduction may be required",
      "GLP-1 agonists may provide dual benefit (metabolic benefit and potential cardioprotection) in men with diabetes on ADT — discuss with endocrinologist",
    ],
  },
  {
    id: "bisphosphonates",
    name: "Bisphosphonates — zoledronic acid (Zometa), alendronate (Fosamax), risedronate, denosumab",
    aliases: ["bisphosphonate", "zoledronic acid", "Zometa", "alendronate", "Fosamax", "risedronate", "Actonel", "denosumab", "Prolia", "Xgeva", "bone density", "osteoporosis medication"],
    category: "Medications",
    tier: "watch",
    summary: "Bisphosphonates and denosumab are bone-protective co-medications commonly prescribed alongside leuprolide ADT to mitigate ADT-associated bone density loss. This is a deliberate therapeutic combination — not an adverse interaction. In men with ADT-associated osteopenia or osteoporosis, or with bone metastases, zoledronic acid or denosumab is standard. Monitoring for hypocalcemia is required when combining bone-protective agents with ADT — calcium and vitamin D supplementation should accompany bisphosphonate use.",
    mitigation: [
      "Bisphosphonate or denosumab co-prescription is appropriate and standard in men with established bone density loss during ADT or at high fracture risk",
      "Calcium (1200 mg/day) and vitamin D (800-1000 IU/day) supplementation should accompany bisphosphonate therapy — do not use bisphosphonates without adequate calcium and vitamin D",
      "Monitor serum calcium and renal function with IV zoledronic acid; oral bisphosphonates (alendronate) require adequate renal function",
      "Osteonecrosis of the jaw is a rare but serious bisphosphonate adverse effect — dental evaluation before starting is recommended",
    ],
  },
  {
    id: "warfarin",
    name: "Warfarin and anticoagulants",
    aliases: ["warfarin", "Coumadin", "anticoagulant", "blood thinner", "INR"],
    category: "Medications",
    tier: "watch",
    summary: "ADT can affect warfarin metabolism and anticoagulant response through hormone-related changes in coagulation factor production and possibly CYP2C9 activity. INR fluctuations have been reported in men on warfarin starting or stopping ADT. More broadly, ADT-associated cardiovascular risk means anticoagulation management in men with atrial fibrillation or other indications for anticoagulation requires attention during ADT transitions.",
    mitigation: [
      "More frequent INR monitoring when starting or stopping leuprolide in men on warfarin — check INR within 2 weeks of ADT initiation",
      "Warfarin dose adjustment may be needed — direction of change is not consistently predictable",
      "Consider direct oral anticoagulants (DOACs) as an alternative — they have more predictable pharmacokinetics and do not require INR monitoring",
    ],
  },
  {
    id: "calcium-vitamin-d",
    name: "Calcium and Vitamin D supplements",
    aliases: ["calcium", "vitamin D", "calcium carbonate", "calcium citrate", "cholecalciferol", "D3"],
    category: "Supplements",
    tier: "low",
    summary: "Calcium and vitamin D supplementation is standard co-management with leuprolide ADT for bone density protection. These are not an adverse interaction — they are essential supportive care. ADT-associated bone density loss is mitigated (though not fully prevented) by adequate calcium and vitamin D intake. Supplementation should begin at ADT initiation, not after bone density loss is established.",
    mitigation: [
      "Calcium 1200 mg/day (total diet + supplement) and vitamin D 800-1000 IU/day are standard recommendations during leuprolide ADT",
      "No adverse interaction — this is standard supportive care",
      "Vitamin D 25-OH level should be checked before starting; many men are deficient and require higher replacement doses initially",
    ],
  },
  {
    id: "exercise-rehabilitation",
    name: "Exercise — resistance training, aerobic exercise during ADT",
    aliases: ["exercise", "resistance training", "weight training", "aerobic", "cardio", "physical activity"],
    category: "Lifestyle",
    tier: "low",
    summary: "Structured exercise during leuprolide ADT has the strongest evidence of any behavioral intervention for mitigating ADT adverse effects. Resistance training reduces muscle mass loss, preserves bone density, improves insulin sensitivity, and reduces fatigue. Aerobic exercise improves cardiovascular fitness and further supports metabolic health. Multiple RCTs confirm the benefit of exercise programs during ADT.",
    mitigation: [
      "Structured resistance exercise (3x/week) during ADT has RCT-level evidence for muscle mass preservation, bone density, and fatigue reduction",
      "Aerobic exercise (150 min/week moderate intensity) adds cardiovascular fitness and metabolic benefit",
      "Exercise is not a drug interaction — it is the best-evidence behavioral mitigation for ADT adverse effects and should be actively encouraged",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function LeuprolideInteractionsPanel() {
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
        Leuprolide&apos;s interactions fall into two categories: intended co-medications (anti-androgens for flare, bisphosphonates for bone, calcium/vitamin D) and risk interactions (QTc-prolonging medications, antidiabetic dose adjustments, warfarin INR changes). Anti-androgen cover at initiation is not optional in prostate cancer — it is required clinical management. Gonadorelin has the opposite mechanism and combining is pharmacologically irrational.
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
