"use client";

/**
 * AnpInteractionsPanel — interaction intelligence for Atrial Natriuretic Peptide (ANP).
 * Key frame: antihypertensive interactions are the most practically important flag
 * (additive hypotension with ANP vasodilation); diuretics and NSAIDs create
 * complementary and opposing effects on natriuresis. Most interactions derive
 * from the NPR-A vasodilation and RAAS-inhibition mechanism.
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
    id: "antihypertensives",
    name: "Antihypertensive medications — ACE inhibitors, ARBs, calcium channel blockers, beta-blockers, dihydropyridines",
    aliases: ["antihypertensive", "lisinopril", "enalapril", "ramipril", "perindopril", "losartan", "valsartan", "irbesartan", "candesartan", "amlodipine", "nifedipine", "metoprolol", "carvedilol", "atenolol", "ACE inhibitor", "ARB", "calcium channel blocker", "beta blocker", "blood pressure medication"],
    category: "Medications",
    tier: "flag",
    summary: "ANP vasodilates via NPR-A/cGMP-mediated vascular smooth muscle relaxation — the same functional endpoint as most antihypertensive medications, though through a different mechanism. Combining ANP (or any natriuretic peptide analog) with antihypertensive medications creates additive hypotension risk: the antihypertensive lowers blood pressure through its mechanism (RAAS inhibition, calcium channel blockade, cardiac output reduction), and ANP adds vasodilation and natriuresis on top. In clinical IV ANP use, this interaction produces symptomatic hypotension requiring infusion rate reduction. Even if native ANP subcutaneous injection were pharmacologically active (which it is not given the 2-minute half-life), this additive hypotension risk would be the critical flag.",
    mitigation: [
      "On antihypertensive medications: any pharmacologically active natriuretic peptide exposure (clinical context only — native ANP injection has no pharmacokinetic rationale) requires blood pressure monitoring for additive hypotension",
      "In clinical settings, natriuretic peptide infusion doses are reduced or antihypertensive doses adjusted when hypotension occurs — this titration requires continuous monitoring",
      "If exploring sacubitril/valsartan (Entresto) as the rational ANP-enhancing pharmacological approach — this is a prescription medication requiring physician oversight; antihypertensive dose adjustments are part of Entresto initiation protocols",
    ],
  },
  {
    id: "diuretics",
    name: "Diuretics — furosemide, thiazides, spironolactone, eplerenone",
    aliases: ["diuretic", "furosemide", "Lasix", "torsemide", "hydrochlorothiazide", "HCTZ", "chlorthalidone", "spironolactone", "Aldactone", "eplerenone", "Inspra", "amiloride", "loop diuretic", "thiazide", "potassium-sparing diuretic"],
    category: "Medications",
    tier: "watch",
    summary: "Diuretics and ANP both promote urinary sodium and water excretion — additive natriuresis and diuresis. The combination increases volume depletion risk: combined diuresis can reduce blood volume below the level where renal perfusion is maintained, causing pre-renal azotemia (elevated creatinine from reduced kidney blood flow). In clinical heart failure management, ANP analog infusion plus loop diuretics (furosemide) is sometimes used to overcome diuretic resistance — but only under careful monitoring of urine output, electrolytes, and renal function. Spironolactone and eplerenone (aldosterone antagonists) have overlapping RAAS-inhibiting effects with ANP's RAAS suppression, creating additive potassium retention risk.",
    mitigation: [
      "On diuretics: additive natriuresis and diuresis from ANP creates volume depletion risk — electrolyte and renal monitoring is required",
      "Spironolactone/eplerenone plus natriuretic peptide creates additive aldosterone suppression and potassium retention — hyperkalemia monitoring required",
      "In clinical heart failure contexts where this combination is used: the therapeutic benefit (overcoming diuretic resistance) outweighs the risk only under close monitoring — this is a medical management decision, not a community supplementation rationale",
    ],
  },
  {
    id: "nsaids",
    name: "NSAIDs — ibuprofen, naproxen, aspirin, celecoxib (blunt natriuretic effect)",
    aliases: ["NSAID", "ibuprofen", "Advil", "Motrin", "naproxen", "Aleve", "aspirin", "celecoxib", "Celebrex", "indomethacin", "anti-inflammatory", "COX inhibitor"],
    category: "Medications",
    tier: "watch",
    summary: "NSAIDs inhibit prostaglandin synthesis. Prostaglandins are required for full expression of ANP's natriuretic effect in the kidney — renal prostaglandins amplify natriuresis by promoting collecting duct sodium excretion. NSAID inhibition of renal prostaglandins blunts ANP's natriuretic response, reducing the therapeutic efficacy of natriuretic peptide therapy. This pharmacodynamic interaction is documented in clinical studies and is one reason NSAIDs are cautioned against in heart failure patients who rely on natriuretic peptide-mediated volume regulation. Aspirin (at high doses for anti-inflammatory use, not low-dose aspirin for antiplatelet) has similar prostaglandin-inhibiting effects.",
    mitigation: [
      "NSAIDs blunt natriuretic peptide effects in the kidney — if the goal is utilizing ANP's natriuretic mechanism, NSAID use counteracts it",
      "In heart failure: NSAIDs are generally contraindicated (they also promote sodium retention and reduce cardiac output) — avoid regardless of natriuretic peptide therapy",
      "Low-dose aspirin (81 mg antiplatelet) has minimal prostaglandin-blunting at the kidney level compared to full anti-inflammatory NSAID doses",
    ],
  },
  {
    id: "ace-inhibitors-arbs-raas",
    name: "ACE inhibitors and ARBs — RAAS suppression is additive with ANP's RAAS-inhibiting effects",
    aliases: ["ACE inhibitor", "lisinopril", "enalapril", "ramipril", "captopril", "perindopril", "ARB", "losartan", "valsartan", "irbesartan", "candesartan", "olmesartan", "telmisartan", "sacubitril", "Entresto", "RAAS"],
    category: "Medications",
    tier: "watch",
    summary: "ANP suppresses RAAS (reduces renin release, inhibits aldosterone synthesis). ACE inhibitors and ARBs also suppress RAAS through different mechanistic points (ACE inhibitors: reduce angiotensin II formation; ARBs: block AT1R). Combined RAAS suppression from ANP plus ACE inhibitor or ARB creates additive blood pressure reduction and additive potassium retention (reduced aldosterone from both pathways). Sacubitril/valsartan (Entresto) — the rational approach to enhancing endogenous natriuretic peptide effects — includes an ARB (valsartan) component specifically because RAAS suppression is expected to be additive. This is a managed combination at physician-titrated doses, not a community stacking rationale.",
    mitigation: [
      "ACE inhibitor or ARB use amplifies the RAAS-suppressing component of ANP pharmacology — hypotension and hyperkalemia risks are additive",
      "Sacubitril/valsartan (Entresto) deliberately combines ARB with neprilysin inhibition (protecting endogenous ANP) — the dose is physician-titrated precisely because of these additive effects",
      "Do not add any natriuretic peptide-augmenting approach on top of Entresto without cardiologist guidance — the RAAS suppression is already being managed pharmacologically",
    ],
  },
  {
    id: "standard-supplements",
    name: "Standard supplements — vitamins, minerals, heart-supportive supplements",
    aliases: ["supplement", "CoQ10", "magnesium", "potassium", "vitamin D", "omega-3", "fish oil", "taurine", "l-carnitine", "hawthorn"],
    category: "Supplements",
    tier: "low",
    summary: "Standard supplements do not have established pharmacokinetic interactions with ANP. Several supplements used in cardiac health contexts (CoQ10, omega-3, magnesium) have mild blood pressure-lowering effects that could theoretically add to natriuretic peptide vasodilation — but the clinical significance at typical supplement doses is minimal. Magnesium supplementation is generally beneficial for cardiovascular health and does not create problematic interactions. If natriuretic peptide levels are clinically elevated (as in heart failure), supplement interactions with endogenous ANP signaling are not a concern at standard supplement doses.",
    mitigation: [
      "No significant adverse interactions between ANP and standard supplements at typical doses",
      "In heart failure patients (where endogenous ANP is significantly elevated): standard supplements should be discussed with the cardiologist, though not specifically because of ANP interactions",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function AnpInteractionsPanel() {
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
        ANP&apos;s interactions all derive from its NPR-A mechanism — vasodilation and RAAS suppression. Antihypertensives create additive hypotension (the primary clinical flag in IV natriuretic peptide use). Diuretics create additive natriuresis and volume depletion risk. NSAIDs blunt the natriuretic effect via prostaglandin inhibition. ACE inhibitors and ARBs add to RAAS suppression. These interactions are documented from clinical IV carperitide and nesiritide use — they apply to any pharmacologically active natriuretic peptide exposure, which native ANP subcutaneous injection cannot produce given its 2-minute half-life.
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
