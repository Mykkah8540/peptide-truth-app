"use client";

/**
 * DesmopressinInteractionsPanel — interaction intelligence for Desmopressin (DDAVP).
 * Key frame: SSRIs and NSAIDs cause additive hyponatremia risk (SIADH mechanism);
 * loop diuretics create volume unpredictability; carbamazepine/oxcarbazepine enhance
 * desmopressin effect; chlorpropamide potentiates antidiuresis. Heart failure medications
 * signal a contraindicated patient population.
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
    id: "ssris",
    name: "SSRIs — sertraline, fluoxetine, escitalopram, paroxetine, citalopram",
    aliases: ["SSRI", "sertraline", "Zoloft", "fluoxetine", "Prozac", "escitalopram", "Lexapro", "paroxetine", "Paxil", "citalopram", "Celexa", "antidepressant", "selective serotonin"],
    category: "Medications",
    tier: "flag",
    summary: "SSRIs can cause syndrome of inappropriate antidiuretic hormone secretion (SIADH) — a direct pharmacological effect of increased serotonin on hypothalamic vasopressin neurons, stimulating endogenous ADH release. When combined with exogenous desmopressin, two mechanisms for water retention are operating simultaneously: SSRI-driven endogenous ADH and exogenous desmopressin. This additive antidiuresis substantially increases hyponatremia risk. The SSRI-associated SIADH is most common in elderly patients and during the first weeks of SSRI initiation or dose increase. Multiple case reports of severe hyponatremia with desmopressin + SSRI combination exist.",
    mitigation: [
      "On any SSRI: sodium check before starting desmopressin, then at 7 days and 30 days after initiation",
      "Heightened fluid restriction vigilance — the combination amplifies hyponatremia risk beyond either alone",
      "For elderly patients on SSRIs: the combination of SSRI + desmopressin for nocturia warrants geriatric or nephrology consultation before prescribing",
      "If hyponatremia develops (Na+ < 135 mEq/L), consider whether SSRI dose can be reduced or switched to an agent with lower SIADH risk before adjusting desmopressin",
    ],
  },
  {
    id: "nsaids",
    name: "NSAIDs — ibuprofen, naproxen, diclofenac, indomethacin, aspirin (high dose)",
    aliases: ["NSAID", "ibuprofen", "Advil", "Motrin", "naproxen", "Aleve", "diclofenac", "Voltaren", "indomethacin", "Indocin", "aspirin", "anti-inflammatory"],
    category: "Medications",
    tier: "watch",
    summary: "NSAIDs enhance ADH action at the renal tubule by inhibiting prostaglandin synthesis — prostaglandins normally counteract ADH by reducing cAMP and aquaporin-2 expression. When prostaglandin inhibition removes this counterregulation, ADH (and desmopressin) has enhanced antidiuretic effect. The result is greater water retention per desmopressin dose, increasing hyponatremia risk. This is a pharmacodynamic interaction — both are acting on the same renal water transport system, with NSAIDs amplifying desmopressin's effect.",
    mitigation: [
      "Avoid regular NSAID use during desmopressin treatment — particularly indomethacin (the most potent prostaglandin inhibitor) and chronic daily use",
      "Occasional low-dose ibuprofen (e.g., for acute pain) may be acceptable with increased hydration awareness, but routine combined use is inadvisable",
      "Sodium monitoring is appropriate if NSAIDs are used regularly concurrent with desmopressin",
      "Acetaminophen (paracetamol) does not have this prostaglandin-mediated interaction and is the preferred analgesic/antipyretic during desmopressin treatment",
    ],
  },
  {
    id: "loop-diuretics",
    name: "Loop diuretics — furosemide (Lasix), torsemide, bumetanide",
    aliases: ["furosemide", "Lasix", "torsemide", "Demadex", "bumetanide", "Bumex", "loop diuretic", "water pill"],
    category: "Medications",
    tier: "watch",
    summary: "Loop diuretics increase urine output by blocking the Na-K-2Cl cotransporter in the loop of Henle. Desmopressin promotes water reabsorption at the collecting duct. Combining them creates competing mechanisms with unpredictable net effect on volume status and sodium. In heart failure patients prescribed furosemide for volume management, the presence of desmopressin signals a contraindicated patient population — these patients should not be receiving desmopressin at all due to the volume overload risk. The interaction itself is less important than what it implies about patient selection.",
    mitigation: [
      "Heart failure patients on loop diuretics are contraindicated for desmopressin — do not combine these for nocturia or other indications in this population",
      "For CDI patients who happen to require loop diuretics for a separate indication: complex volume management requiring nephrology or endocrinology coordination",
      "If a patient is on both medications without a clear clinical rationale: reassess the indication for desmopressin carefully",
    ],
  },
  {
    id: "carbamazepine",
    name: "Carbamazepine and oxcarbazepine — antiepileptic drugs that enhance ADH effect",
    aliases: ["carbamazepine", "Tegretol", "oxcarbazepine", "Trileptal", "Oxtellar", "antiepileptic", "anticonvulsant"],
    category: "Medications",
    tier: "watch",
    summary: "Carbamazepine and oxcarbazepine both independently cause SIADH by stimulating hypothalamic ADH release and potentiating ADH action at the renal tubule. When combined with desmopressin, the carbamazepine-enhanced antidiuretic state adds to desmopressin's exogenous antidiuretic effect, increasing hyponatremia risk substantially. Carbamazepine-associated hyponatremia is itself a well-recognized and clinically significant adverse effect — adding desmopressin amplifies this existing risk.",
    mitigation: [
      "On carbamazepine or oxcarbazepine: baseline sodium before starting desmopressin is essential; repeat at 7 days and monthly",
      "Consider whether the carbamazepine indication is appropriate (e.g., gabapentin or other alternatives without SIADH effect) before adding desmopressin",
      "Heightened fluid restriction vigilance — the combination creates higher hyponatremia risk than desmopressin alone",
    ],
  },
  {
    id: "chlorpropamide",
    name: "Chlorpropamide — sulfonylurea with potent ADH-potentiating effect",
    aliases: ["chlorpropamide", "Diabinese", "sulfonylurea"],
    category: "Medications",
    tier: "watch",
    summary: "Chlorpropamide, an older sulfonylurea antidiabetic agent, potentiates endogenous ADH action at the renal tubule — an effect used historically to treat partial CDI. When combined with desmopressin, chlorpropamide's ADH-potentiating effect amplifies desmopressin's antidiuretic action, increasing hyponatremia risk. Chlorpropamide is rarely used today given superior alternatives (metformin, newer sulfonylureas, GLP-1 agonists), but may still be encountered in older patients.",
    mitigation: [
      "If a patient is on chlorpropamide and desmopressin is being considered, sodium monitoring is essential",
      "Consider whether chlorpropamide can be switched to a modern antidiabetic agent without ADH-potentiating properties",
      "The chlorpropamide-ADH interaction was historically exploited therapeutically for partial CDI — this is now obsolete given desmopressin's availability",
    ],
  },
  {
    id: "tricyclics-snris",
    name: "Tricyclic antidepressants and SNRIs — duloxetine, venlafaxine, amitriptyline",
    aliases: ["tricyclic", "TCA", "amitriptyline", "Elavil", "nortriptyline", "SNRI", "duloxetine", "Cymbalta", "venlafaxine", "Effexor", "antidepressant"],
    category: "Medications",
    tier: "watch",
    summary: "Like SSRIs, tricyclic antidepressants and SNRIs can promote SIADH through serotonin-mediated or other central effects on hypothalamic ADH secretion. The risk is generally considered lower than SSRIs but is present, particularly in elderly patients. Combining desmopressin with any serotonergic or noradrenergic antidepressant warrants sodium monitoring.",
    mitigation: [
      "Sodium monitoring at baseline and 7-30 days after desmopressin initiation for patients on any antidepressant with SIADH potential",
      "Alert patients to hyponatremia symptoms (headache, nausea, confusion) and to seek sodium check promptly if these develop",
    ],
  },
  {
    id: "melatonin-sleep",
    name: "Melatonin and standard sleep supplements",
    aliases: ["melatonin", "sleep supplement", "magnesium", "L-theanine", "valerian"],
    category: "Supplements",
    tier: "low",
    summary: "No pharmacological interaction between desmopressin and melatonin or standard sleep supplements. Melatonin acts on MT1/MT2 circadian receptors with no overlap with V2 vasopressin receptors. For the nocturia indication, combining melatonin with desmopressin addresses different aspects of nighttime sleep disruption — melatonin for sleep quality/circadian timing, desmopressin for urine volume reduction. No adverse interaction expected.",
    mitigation: [
      "No adverse interaction between desmopressin and melatonin or standard sleep supplements",
      "Ensure fluid restriction is followed regardless of other supplements taken in the evening",
    ],
  },
  {
    id: "caffeine",
    name: "Caffeine — diuretic effect partially antagonizes desmopressin antidiuresis",
    aliases: ["caffeine", "coffee", "tea", "energy drink", "diuretic"],
    category: "Lifestyle",
    tier: "low",
    summary: "Caffeine has mild diuretic properties through adenosine receptor antagonism and mild natriuresis. While this does not create a dangerous interaction with desmopressin, high caffeine intake can partially counteract the antidiuretic effect, reducing desmopressin efficacy for enuresis or nocturia control. For nocturia management, avoiding caffeinated beverages in the evening hours is standard behavioral advice that complements desmopressin treatment.",
    mitigation: [
      "Avoid evening caffeine intake during desmopressin treatment for nocturia — caffeine's mild diuretic effect can reduce the antidiuretic benefit",
      "This is a behavioral optimization point, not a serious interaction; the primary concern is fluid restriction, not caffeine specifically",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function DesmopressinInteractionsPanel() {
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
        Desmopressin&apos;s interaction profile centers on additive hyponatremia risk: SSRIs (SIADH mechanism) are the most important drug-drug interaction; NSAIDs amplify the antidiuretic effect; carbamazepine causes independent SIADH and potentiates desmopressin. Loop diuretics in the same patient signals a potentially contraindicated patient population (heart failure). Standard sleep supplements have no adverse interaction. All interactions ultimately relate to the hyponatremia risk — the common pathway for concern.
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
