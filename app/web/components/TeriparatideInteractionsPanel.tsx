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
    id: "teri-active-vitamin-d",
    name: "Active vitamin D analogues (calcitriol, alphacalcidol, doxercalciferol)",
    aliases: ["calcitriol", "rocaltrol", "alphacalcidol", "one-alpha", "doxercalciferol", "hectorol", "active vitamin d"],
    category: "Calcium metabolism",
    tier: "watch",
    summary:
      "Teriparatide increases intestinal calcium absorption and renal calcium reabsorption as part of its PTH pharmacology. Active vitamin D analogues (calcitriol and its predecessors) independently drive calcium absorption from the gut via vitamin D receptor-mediated mechanisms. The combination creates an additive hypercalcemia risk that is clinically significant. Standard-dose cholecalciferol (vitamin D3) at supplementation levels (1,000\u20132,000 IU/day) has a much lower risk profile than active vitamin D analogues.",
    mitigation: [
      "If active vitamin D analogues are required (e.g., for hypoparathyroidism, CKD-mineral bone disease), reduce doses and monitor serum and urinary calcium more frequently.",
      "Avoid initiating high-dose active vitamin D supplementation during teriparatide treatment without specific clinical indication.",
      "Check serum 25-OH vitamin D at baseline; if deficient, replete with standard cholecalciferol \u2014 not active analogues \u2014 under monitoring.",
    ],
  },
  {
    id: "teri-digoxin",
    name: "Digoxin (Lanoxin)",
    aliases: ["digoxin", "lanoxin", "cardiac glycoside", "digitalis"],
    category: "Cardiac glycoside",
    tier: "watch",
    summary:
      "Teriparatide-induced hypercalcemia, even when mild and transient, can sensitize the myocardium to digoxin toxicity. Digoxin has a narrow therapeutic window and its toxicity risk increases significantly with elevated serum calcium. Hypercalcemia and digoxin toxicity share overlapping symptoms (nausea, arrhythmia, visual disturbances), making clinical differentiation important. This is not a pharmacokinetic interaction \u2014 it is a pharmacodynamic interaction mediated by calcium\u2019s effect on digitalis binding.",
    mitigation: [
      "Monitor serum calcium and digoxin levels more frequently during teriparatide initiation.",
      "If hypercalcemia is detected in a patient on digoxin, pause teriparatide and reassess.",
      "Coordinate with cardiology if the patient has complex digoxin management requirements.",
    ],
  },
  {
    id: "teri-bisphosphonates-concurrent",
    name: "Bisphosphonates (alendronate, zoledronic acid, risedronate) \u2014 concurrent use",
    aliases: ["alendronate", "fosamax", "zoledronic acid", "reclast", "zometa", "risedronate", "actonel", "bisphosphonate"],
    category: "Antiresorptive \u2014 bisphosphonate",
    tier: "watch",
    summary:
      "Concurrent use of teriparatide and bisphosphonates is not recommended during the teriparatide course. The DATA trial (Denosumab And Teriparatide Administration) and earlier studies suggest that pre-loading with bisphosphonates may blunt the anabolic response to teriparatide \u2014 particularly at the hip. The anabolic and antiresorptive mechanisms work through distinct pathways, and some evidence suggests they partially antagonize each other when given simultaneously rather than sequentially. This is mechanistically distinct from the post-teriparatide sequencing context, where bisphosphonates are not only acceptable but required.",
    mitigation: [
      "Do not combine teriparatide with bisphosphonates during the active treatment course except under specialist guidance.",
      "Patients transitioning from bisphosphonates to teriparatide should have their prescriber assess for residual antiresorptive effect and optimal timing.",
      "After teriparatide completion, initiate a bisphosphonate promptly to preserve BMD gains \u2014 this is the correct sequential use.",
    ],
  },
  {
    id: "teri-denosumab",
    name: "Denosumab (Prolia, Xgeva)",
    aliases: ["denosumab", "prolia", "xgeva", "rank-l inhibitor"],
    category: "Antiresorptive \u2014 RANK-L inhibitor",
    tier: "watch",
    summary:
      "Like bisphosphonates, denosumab is the preferred antiresorptive agent to follow teriparatide (not run concurrently). Data from the DATA trial specifically evaluated combined teriparatide + denosumab: the combination produced additive BMD gains greater than either drug alone, particularly at the femoral neck \u2014 making it an exception to the \u201cdon\u2019t combine\u201d rule under specialist supervision. However, the sequential model (teriparatide first, denosumab second) remains the standard-of-care approach. Note: discontinuing denosumab without a follow-on bisphosphonate causes rebound bone loss, a risk that exists independently of teriparatide.",
    mitigation: [
      "Sequential use (teriparatide then denosumab) is standard of care and appropriate.",
      "Combination teriparatide + denosumab may be considered under specialist guidance for very high fracture risk patients.",
      "When stopping denosumab after teriparatide, ensure transition to bisphosphonate to prevent rebound bone loss.",
    ],
  },
  {
    id: "teri-thiazide-diuretics",
    name: "Thiazide diuretics (hydrochlorothiazide, chlorthalidone, indapamide)",
    aliases: ["hydrochlorothiazide", "hctz", "chlorthalidone", "indapamide", "thiazide", "microzide"],
    category: "Diuretic",
    tier: "watch",
    summary:
      "Thiazide diuretics reduce urinary calcium excretion (they are actually used therapeutically to prevent calcium oxalate kidney stones). Combined with teriparatide\u2019s tendency to increase calcium absorption, thiazides may augment the risk of hypercalcemia and hypercalciuria paradox: serum calcium could rise if urinary clearance is impaired while gut absorption is stimulated. The interaction is pharmacodynamic and most relevant in patients with borderline or elevated baseline calcium.",
    mitigation: [
      "Monitor serum and urinary calcium more closely if the patient is on thiazide diuretics.",
      "Consider adjusting calcium supplementation downward in patients on both thiazides and teriparatide.",
    ],
  },
  {
    id: "teri-loop-diuretics",
    name: "Loop diuretics (furosemide, bumetanide, torsemide)",
    aliases: ["furosemide", "lasix", "bumetanide", "bumex", "torsemide", "demadex", "loop diuretic"],
    category: "Diuretic",
    tier: "low",
    summary:
      "Loop diuretics increase urinary calcium excretion, which may partially counteract the calcium-retaining effect of teriparatide. This interaction is generally low concern from a hypercalcemia standpoint \u2014 loop diuretics are sometimes used to manage hypercalcemia in other settings. However, the calcium-wasting effect of loop diuretics combined with the increased calcium demand of active bone formation may affect the completeness of the anabolic response. Adequate calcium and vitamin D intake should be confirmed.",
    mitigation: [
      "Ensure adequate calcium supplementation (1,000\u20131,200 mg/day elemental calcium from diet and supplements) is maintained when loop diuretics are co-administered.",
      "Monitor serum calcium; hypocalcemia is a theoretical concern with high-dose loop diuretics in this context.",
    ],
  },
  {
    id: "teri-glucocorticoids-ongoing",
    name: "Systemic glucocorticoids (prednisone, prednisolone, dexamethasone, methylprednisolone)",
    aliases: ["prednisone", "prednisolone", "dexamethasone", "methylprednisolone", "cortisone", "hydrocortisone systemic", "steroid"],
    category: "Glucocorticoid",
    tier: "low",
    summary:
      "The combination of teriparatide with ongoing systemic glucocorticoid therapy is not only acceptable but represents the primary clinical indication for teriparatide in glucocorticoid-induced osteoporosis (GIO). Glucocorticoids suppress osteoblast function and increase osteoblast apoptosis, which teriparatide is specifically designed to overcome. The Saag et al. 2007 trial was conducted in patients on stable glucocorticoid therapy, and teriparatide outperformed alendronate in that population. The anabolic mechanism is particularly well-suited to GIO\u2019s pathophysiology.",
    mitigation: [
      "Continue indicated glucocorticoid therapy as clinically required \u2014 teriparatide is not a reason to change glucocorticoid dosing.",
      "Monitor serum calcium, as glucocorticoids can modulate calcium absorption and the net calcium effect with teriparatide varies.",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag: {
    bg: "rgba(158,56,0,0.06)",
    border: "rgba(158,56,0,0.22)",
    dot: "#9e3800",
    label: "Stop signal",
    labelColor: "#9e3800",
  },
  watch: {
    bg: "rgba(124,82,0,0.05)",
    border: "rgba(124,82,0,0.18)",
    dot: "#7c5200",
    label: "Worth watching",
    labelColor: "#7c5200",
  },
  low: {
    bg: "rgba(21,100,58,0.04)",
    border: "rgba(21,100,58,0.15)",
    dot: "#155e38",
    label: "Low concern",
    labelColor: "#155e38",
  },
};

export default function TeriparatideInteractionsPanel() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return INTERACTIONS;
    return INTERACTIONS.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.aliases.some((a) => a.toLowerCase().includes(q)) ||
        e.category.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="reta-interactions">
      <div className="reta-interactions__search">
        <input
          type="text"
          className="reta-interactions__input"
          placeholder="Search a drug, supplement, or category\u2026"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search interactions"
        />
      </div>
      <div className="reta-interactions__list">
        {filtered.length === 0 && (
          <div className="reta-interactions__empty">
            No interactions found for \u201c{query}\u201d. That doesn\u2019t mean none exist \u2014 it means
            this database doesn\u2019t have a specific entry.
          </div>
        )}
        {filtered.map((entry) => {
          const st = TIER_STYLE[entry.tier];
          return (
            <div
              key={entry.id}
              className="reta-interactions__entry"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-interactions__entry-top">
                <div className="reta-interactions__entry-left">
                  <span className="reta-interactions__dot" style={{ background: st.dot }} />
                  <div>
                    <div className="reta-interactions__entry-name">{entry.name}</div>
                    {entry.aliases.length > 0 && (
                      <div className="reta-interactions__entry-aliases">{entry.aliases.join(", ")}</div>
                    )}
                  </div>
                </div>
                <div
                  className="reta-interactions__entry-tier"
                  style={{ color: st.labelColor, borderColor: st.border }}
                >
                  {st.label}
                </div>
              </div>
              <div className="reta-interactions__entry-summary">{entry.summary}</div>
              {entry.mitigation.length > 0 && (
                <ul className="reta-interactions__entry-mitigation">
                  {entry.mitigation.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
