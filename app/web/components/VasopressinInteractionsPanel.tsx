"use client";

/**
 * VasopressinInteractionsPanel — interaction intelligence for Vasopressin (ADH/AVP).
 * Key frame: antihypertensives are the most practically important flag (V1a
 * vasoconstriction opposes the antihypertensive mechanism); SSRIs and NSAIDs
 * create additive hyponatremia risk via independent mechanisms.
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
    name: "Antihypertensive medications — ACE inhibitors, ARBs, beta-blockers, calcium channel blockers",
    aliases: ["antihypertensive", "lisinopril", "enalapril", "ramipril", "losartan", "valsartan", "irbesartan", "amlodipine", "metoprolol", "atenolol", "carvedilol", "beta blocker", "calcium channel blocker", "ACE inhibitor", "ARB", "blood pressure"],
    category: "Medications",
    tier: "flag",
    summary: "Vasopressin V1a receptor activation causes vasoconstriction and blood pressure elevation. Antihypertensive medications work by reducing blood pressure through various mechanisms (ACE inhibitors/ARBs via RAAS, beta-blockers via cardiac output reduction, calcium channel blockers via vascular smooth muscle relaxation). Exogenous vasopressin directly opposes the antihypertensive mechanism — any dose of vasopressin will partially counteract blood pressure control. In individuals on antihypertensives for cardiovascular protection, this interaction creates uncontrolled blood pressure variability and increases cardiovascular event risk.",
    mitigation: [
      "On any antihypertensive medication for blood pressure control: do not use vasopressin without explicit physician guidance — V1a vasoconstriction directly counteracts the antihypertensive mechanism",
      "The interaction is pharmacodynamic (opposing mechanisms), not pharmacokinetic — the blood pressure conflict occurs regardless of drug levels",
      "If vasopressin is being considered for diabetes insipidus replacement, discuss with the prescribing physician — desmopressin (V2-selective) is preferred for DI and has significantly less V1a vasoconstriction",
    ],
  },
  {
    id: "nsaids",
    name: "NSAIDs — ibuprofen, naproxen, aspirin, celecoxib",
    aliases: ["NSAID", "ibuprofen", "Advil", "Motrin", "naproxen", "Aleve", "aspirin", "celecoxib", "Celebrex", "indomethacin", "anti-inflammatory"],
    category: "Medications",
    tier: "watch",
    summary: "NSAIDs inhibit prostaglandin synthesis via COX inhibition. Prostaglandins normally act as a counterbalance to vasopressin's V2-mediated water retention — they reduce aquaporin-2 expression and promote water excretion. NSAID inhibition of prostaglandin synthesis removes this counterbalance, potentiating vasopressin's antidiuretic effect and increasing hyponatremia risk. This interaction is mechanistically established and clinically documented — NSAID use alongside vasopressin analogs (desmopressin) is associated with hyponatremia cases.",
    mitigation: [
      "Avoid regular NSAID use while using vasopressin — the hyponatremia risk is additive",
      "If using NSAIDs for pain, discuss alternatives with a physician — acetaminophen does not carry the same prostaglandin-mediated potentiation of vasopressin's effect",
      "The interaction is most important for V2-mediated antidiuresis; occasional low-dose aspirin creates less risk than chronic NSAID use",
    ],
  },
  {
    id: "ssris-snris",
    name: "SSRIs and SNRIs — antidepressants associated with SIADH",
    aliases: ["SSRI", "SNRI", "fluoxetine", "Prozac", "sertraline", "Zoloft", "escitalopram", "Lexapro", "paroxetine", "Paxil", "citalopram", "venlafaxine", "Effexor", "duloxetine", "Cymbalta", "antidepressant"],
    category: "Medications",
    tier: "watch",
    summary: "SSRIs and SNRIs are independently associated with syndrome of inappropriate antidiuretic hormone secretion (SIADH) — they increase endogenous vasopressin release or sensitize V2 receptors, causing inappropriate water retention and dilutional hyponatremia. Adding exogenous vasopressin to SSRI-induced SIADH creates additive risk of clinically significant hyponatremia. This interaction is particularly important because SSRI use is common and the community overlap (seeking cognitive effects from vasopressin while on SSRIs for mood) is plausible.",
    mitigation: [
      "On any SSRI or SNRI: understand the additive hyponatremia risk before adding vasopressin",
      "Discuss with the prescribing physician — serum sodium monitoring before and during vasopressin use is warranted",
      "Watch for hyponatremia symptoms: nausea, headache, confusion, lethargy — seek medical evaluation promptly if these occur",
    ],
  },
  {
    id: "tricyclic-antidepressants",
    name: "Tricyclic antidepressants — amitriptyline, nortriptyline, clomipramine",
    aliases: ["tricyclic", "TCA", "amitriptyline", "Elavil", "nortriptyline", "Pamelor", "clomipramine", "imipramine", "desipramine"],
    category: "Medications",
    tier: "watch",
    summary: "Tricyclic antidepressants, like SSRIs, are associated with SIADH and hyponatremia through multiple mechanisms including direct effects on ADH secretion and renal V2 receptor sensitivity. The additive hyponatremia risk with exogenous vasopressin applies to TCAs as it does to SSRIs. Additionally, TCAs have anticholinergic and adrenergic effects that may interact unpredictably with vasopressin's cardiovascular V1a effects.",
    mitigation: [
      "On tricyclic antidepressants: hyponatremia risk is additive with vasopressin — physician guidance and sodium monitoring required",
      "The cardiovascular interaction potential (TCA-induced QTc prolongation + vasopressin vasoconstriction increasing cardiac afterload) warrants caution in those with cardiac conditions",
    ],
  },
  {
    id: "carbamazepine",
    name: "Carbamazepine and other SIADH-inducing drugs",
    aliases: ["carbamazepine", "Tegretol", "oxcarbazepine", "Trileptal", "vincristine", "cyclophosphamide", "chlorpropamide"],
    category: "Medications",
    tier: "watch",
    summary: "Carbamazepine and several other medications independently cause SIADH by increasing AVP release or enhancing renal V2 receptor sensitivity. Adding exogenous vasopressin to carbamazepine-induced SIADH creates compounding hyponatremia risk. Carbamazepine is commonly used for epilepsy, trigeminal neuralgia, and bipolar disorder — making this a clinically relevant interaction to flag.",
    mitigation: [
      "On carbamazepine or other SIADH-associated drugs: the hyponatremia risk is compounded with vasopressin",
      "Serum sodium monitoring is essential — the combination can produce rapid, clinically dangerous sodium drops",
      "Discuss alternative management with the prescribing neurologist or psychiatrist before adding vasopressin",
    ],
  },
  {
    id: "oxytocin",
    name: "Oxytocin — structural analog with overlapping but distinct receptor activity",
    aliases: ["oxytocin", "OT", "Pitocin"],
    category: "Peptide Stacks",
    tier: "watch",
    summary: "Oxytocin and vasopressin are structural analogs (two amino acid differences) that cross-react with each other's receptors at higher doses — vasopressin can activate oxytocin receptors, and oxytocin can activate V1 and V2 receptors, particularly at supraphysiological concentrations. Combining exogenous vasopressin and oxytocin creates unpredictable receptor cross-activation and combined cardiovascular effects. There is no established rationale for combining these peptides.",
    mitigation: [
      "Do not combine vasopressin and oxytocin without physician guidance — receptor cross-reactivity creates unpredictable combined effects",
      "The pharmacological differences between vasopressin and oxytocin are important precisely because they create different receptor profiles — combining them blurs these profiles",
    ],
  },
  {
    id: "standard-supplements",
    name: "Standard supplements — vitamins, minerals, adaptogens",
    aliases: ["supplement", "vitamin", "mineral", "adaptogen", "ashwagandha", "rhodiola", "magnesium", "zinc"],
    category: "Supplements",
    tier: "low",
    summary: "Standard supplements do not have established interactions with vasopressin at typical doses. Magnesium glycinate and other sleep/recovery supplements are compatible. Adaptogens (ashwagandha, rhodiola) with cortisol-modulating properties theoretically interact with V1b's HPA axis effects, but this is not characterized and the clinical significance is expected to be minimal.",
    mitigation: [
      "No significant adverse interactions between vasopressin and standard vitamin/mineral supplements",
      "If using adaptogenic herbs specifically for cortisol regulation, be aware of the V1b HPA axis modulation — but this is a theoretical concern at typical doses",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const CATEGORIES = ["All", ...Array.from(new Set(INTERACTIONS.map((e) => e.category)))];

export default function VasopressinInteractionsPanel() {
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
        Vasopressin&apos;s most important interactions are with antihypertensives (V1a vasoconstriction directly opposes blood pressure control) and with SIADH-inducing drugs (SSRIs, NSAIDs, carbamazepine) that compound hyponatremia risk via additive water retention mechanisms. All interactions are mechanism-based — no clinical drug interaction studies with community vasopressin use exist.
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
