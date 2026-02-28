/**
 * DesmopressinOverviewPanel — decision-oriented overview for Desmopressin (DDAVP).
 * Key frame: the V2-selective vasopressin analog engineered to retain antidiuretic
 * and hemostatic activity while eliminating the cardiovascular vasoconstriction of
 * native vasopressin. FDA-approved for multiple conditions. Hyponatremia is the
 * primary safety concern — water restriction is required.
 */

const STAT_CARDS = [
  {
    value: "V2 receptor (renal) selective",
    label: "mechanism — selective V2 receptor agonism: aquaporin-2 upregulation, antidiuresis, von Willebrand factor release",
    sub: "Desmopressin (1-deamino-8-D-arginine vasopressin, DDAVP) is a synthetic analog of arginine vasopressin (AVP, antidiuretic hormone) with two structural modifications: 1-deamination at the N-terminus (increases potency, reduces degradation) and D-Arg8 substitution (eliminates V1a receptor affinity). The result is a compound with 10x the antidiuretic potency of native vasopressin at V2 receptors and essentially zero vasoconstrictor activity. V2 receptors in renal collecting ducts mediate aquaporin-2 upregulation and water reabsorption; V2 receptors in vascular endothelium mediate von Willebrand factor (vWF) and Factor VIII release. Both of these V2-mediated effects are preserved in desmopressin.",
    note: "The V2 selectivity is the fundamental pharmacological design feature. Native vasopressin activates both V1a (vascular smooth muscle — vasoconstriction, hypertension, cardiac effects) and V2 (antidiuresis, hemostasis). Desmopressin was engineered to eliminate the V1a cardiovascular effects while retaining the clinically useful V2 effects. This is why desmopressin can be used in pediatric enuresis without cardiovascular risk, while terlipressin (V1a/V2 non-selective) requires cardiac monitoring.",
  },
  {
    value: "Multiple FDA-approved indications",
    label: "regulatory status — approved for central DI, nocturnal enuresis, nocturia, von Willebrand disease Type 1, hemophilia A",
    sub: "Desmopressin has one of the broadest FDA-approval profiles in this category. Approved indications include: central diabetes insipidus (CDI) — the primary indication for polyuria/polydipsia due to inadequate ADH; primary nocturnal enuresis (bedwetting in children); nocturia in adults (Noctiva nasal spray approved 2017); von Willebrand disease Type 1 (hemostatic use pre-procedure or for bleeding); Hemophilia A with Factor VIII > 5% (hemostatic use). Available as intranasal spray/solution, oral tablets, and injectable formulations. The route of administration affects bioavailability significantly — intranasal bioavailability is 3-4% of subcutaneous/IV, oral bioavailability is lower still.",
    note: "The indication breadth reflects two distinct pharmacological utilities: antidiuretic (CDI, enuresis, nocturia) and hemostatic (vWD, hemophilia A). The hemostatic mechanism — vWF and Factor VIII release from endothelial cells — is entirely distinct from the antidiuretic mechanism but mediated by the same V2 receptor. Tachyphylaxis (diminishing response with repeated doses) occurs with the hemostatic effect more rapidly than the antidiuretic effect, limiting frequent use for bleeding management.",
  },
  {
    value: "Hyponatremia — primary safety concern",
    label: "risk — excessive water retention can dangerously lower serum sodium; elderly are most vulnerable",
    sub: "The antidiuretic effect of desmopressin — the intended therapeutic effect — also prevents excretion of free water. If fluid intake is not restricted appropriately, the retained water dilutes serum sodium, causing hyponatremia. Hyponatremia from desmopressin can range from asymptomatic (mild, Na+ 130-135 mEq/L) to life-threatening (severe, Na+ < 125 mEq/L with cerebral edema, seizures, death). The FDA added warnings about hyponatremia for the nocturia indication specifically, and the compound requires fluid restriction protocols. Elderly patients are at highest risk due to age-related impaired water handling and reduced thirst sensation.",
    note: "Hyponatremia from desmopressin is the most important practical safety point. The risk is highest in clinical contexts where fluid intake is not controlled: community use without sodium monitoring, high fluid intake around dosing, concomitant medications that promote SIADH (SSRIs, NSAIDs). The instruction 'restrict fluid intake for 8 hours after dosing' is not optional — it is the primary hyponatremia prevention protocol. Anyone using desmopressin without understanding and following fluid restriction is taking a real risk.",
  },
  {
    value: "Intranasal / oral / injectable",
    label: "formulations — route-dependent bioavailability (intranasal >> oral); nasal congestion impairs absorption",
    sub: "Desmopressin is available in multiple formulations: intranasal spray (Stimate for hemostasis at 1.5 mg/mL; DDAVP spray at 0.1 mg/mL for CDI/enuresis); intranasal solution for tube administration; oral tablets (0.1, 0.2 mg) and sublingual tablets (Minirin Melt); injectable (IV/SC, 4 mcg/mL). Intranasal bioavailability is approximately 3-4% of the IV dose but provides more predictable onset than oral. Oral bioavailability is < 1% but sufficient for ADH replacement with appropriate dosing. A critical clinical issue: nasal congestion (from URI, rhinitis) impairs intranasal absorption and can cause breakthrough CDI symptoms — during illness, switching to parenteral or oral formulations is required.",
    note: "Bioavailability differences between routes are clinically significant. For hemostatic use in procedures (where achieving a specific vWF level matters), the intranasal Stimate spray at 150 mcg/nostril (300 mcg total) provides a reliable response for vWD Type 1 — the high-concentration Stimate formulation (1.5 mg/mL) is required, not the standard DDAVP spray (0.1 mg/mL). Using the wrong formulation for the wrong indication is a practical safety issue.",
  },
];

const FIT_YES = [
  "You have central diabetes insipidus and your physician has prescribed desmopressin — this is the primary indication with robust FDA-approved evidence for controlling polyuria and polydipsia",
  "Your child has primary nocturnal enuresis (bedwetting) and other interventions have been inadequate — desmopressin is FDA-approved with evidence for short-term management; fluid restriction protocol must be followed",
  "You have von Willebrand disease Type 1 and your hematologist is using desmopressin for bleeding episodes or pre-procedure hemostatic coverage — this is an established FDA-approved hemostatic use",
  "You have nocturia significantly affecting sleep and quality of life, your physician has confirmed this is not due to heart failure or peripheral edema, and sodium/hydration are being monitored — Noctiva (FDA-approved desmopressin nasal spray for adult nocturia) is an option",
  "You have Hemophilia A with Factor VIII > 5% and your hematologist is using desmopressin as an alternative to factor replacement for minor procedures — this is an established use with appropriate monitoring",
];

const FIT_NO = [
  "You have heart failure, significant peripheral edema, or volume-overloaded states — V2-mediated water retention will worsen volume overload; desmopressin is contraindicated",
  "You are using desmopressin for athletic weight manipulation (cutting water weight) or as a masking agent for drug tests — this is explicitly banned by WADA and the deliberate antidiuretic effect creates real hyponatremia risk without monitoring",
  "You are elderly with baseline cognitive impairment or reduced thirst sensation and are planning community use without sodium monitoring — elderly patients are at highest hyponatremia risk; supervision is essential",
  "You have nephrogenic diabetes insipidus (kidney unresponsive to ADH due to V2 receptor mutation or renal disease) — desmopressin acts at V2 receptors; if the kidney is unresponsive to ADH, desmopressin will not work",
  "You have habitual polydipsia or psychogenic polydipsia — desmopressin with high voluntary fluid intake is a recipe for severe hyponatremia",
];

const TIMELINE = [
  {
    phase: "Minutes to 1-2 hours",
    heading: "Onset — antidiuretic effect begins within hours of intranasal dosing",
    body: "The antidiuretic effect of intranasal desmopressin begins within 30-60 minutes of administration and reaches peak effect at 1-2 hours. For CDI management, this rapid onset means the first dose effect on urine output is visible within hours. The hemostatic effect (vWF/Factor VIII release) peaks within 30-60 minutes of IV administration. Oral dosing has delayed onset due to lower bioavailability and slower absorption.",
  },
  {
    phase: "Hours 6-12 (fluid restriction window)",
    heading: "Antidiuresis maintained — fluid restriction critical during this window",
    body: "The antidiuretic effect of a standard intranasal dose persists for 8-12 hours. During this window, urine output is suppressed and any fluid intake is retained without normal excretion. Fluid restriction during this period (typically limiting intake to 240-500 mL after dosing) is the primary prevention strategy for hyponatremia. This is not a 'be careful' suggestion — it is the protocol that prevents dangerous water retention. Failing to restrict fluid intake during the antidiuresis window is the mechanism of desmopressin-associated hyponatremia.",
  },
  {
    phase: "Days to weeks (tachyphylaxis for hemostasis)",
    heading: "Hemostatic tachyphylaxis — diminishing response to repeated hemostatic doses",
    body: "For the hemostatic indication (vWD, hemophilia A), repeated desmopressin doses within 24-48 hours produce diminishing vWF/Factor VIII release — tachyphylaxis develops rapidly. This limits desmopressin to 2-3 consecutive hemostatic doses before response is exhausted and factor replacement products are needed instead. The antidiuretic response shows slower tachyphylaxis than the hemostatic response. This difference is clinically important for procedure planning in vWD patients.",
  },
  {
    phase: "Long-term",
    heading: "CDI management — long-term daily use is standard; monitoring protects against hyponatremia",
    body: "For central DI, desmopressin is used long-term (years to decades for congenital CDI). Regular sodium monitoring (every 3-6 months in stable patients) is standard. Dose adjustments to the minimum effective dose reduce hyponatremia risk. Patients with CDI who are well-managed with desmopressin live essentially normal lives. In children treated for enuresis, treatment is typically limited to 3-6 months with a trial off medication.",
  },
];

const COMPARISON = [
  {
    name: "Desmopressin (DDAVP)",
    badge: "V2-selective vasopressin analog / FDA-approved",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.08)",
    rows: [
      { label: "Receptor", value: "V2 selective — antidiuretic + hemostatic; no V1a vasoconstriction" },
      { label: "Indications", value: "CDI, enuresis, nocturia, von Willebrand Type 1, hemophilia A — 5 FDA-approved indications" },
      { label: "Primary risk", value: "Hyponatremia — requires fluid restriction protocol; elderly highest risk" },
      { label: "Cardiovascular", value: "Minimal — V2 selectivity eliminates vasoconstriction risk" },
      { label: "Formulations", value: "Intranasal, oral, injectable — route-dependent bioavailability" },
    ],
    highlight: true,
  },
  {
    name: "Vasopressin (native ADH)",
    badge: "V1a + V2 non-selective / clinical use (shock, CDI)",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.08)",
    rows: [
      { label: "Receptor", value: "V1a + V2 — antidiuretic + vasoconstriction; V1a activation causes cardiovascular effects" },
      { label: "Indications", value: "Vasodilatory shock (ICU); esophageal varices; CDI (less preferred than desmopressin for non-acute)" },
      { label: "Primary risk", value: "Vasoconstriction, hypertension, cardiac ischemia from V1a activation — not appropriate for outpatient use" },
      { label: "Cardiovascular", value: "Significant — V1a-mediated vasoconstriction makes it an intensive care medication" },
      { label: "Clinical context", value: "Hospital/ICU use primarily; desmopressin preferred for all outpatient antidiuretic indications" },
    ],
    highlight: false,
  },
  {
    name: "Terlipressin",
    badge: "V1a-predominant vasopressin analog / hepatorenal syndrome",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.08)",
    rows: [
      { label: "Receptor", value: "V1a-predominant — primarily vasoconstriction; splanchnic vasoconstriction for esophageal varices and hepatorenal" },
      { label: "Indications", value: "Hepatorenal syndrome Type 1 (FDA-approved Lucassin 2022); esophageal variceal bleeding" },
      { label: "Primary risk", value: "Cardiovascular — peripheral and splanchnic vasoconstriction; cardiac ischemia; requires monitoring" },
      { label: "Cardiovascular", value: "Significant — V1a effects require cardiac monitoring; opposite of desmopressin's V2 selectivity" },
      { label: "Clinical context", value: "Hospital setting; liver disease complications; no role in CDI, enuresis, or hemostasis indications" },
    ],
    highlight: false,
  },
];

export default function DesmopressinOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The V2-selective vasopressin analog — engineered to retain antidiuretic and hemostatic activity without vasopressin&apos;s cardiovascular effects; FDA-approved for five indications; hyponatremia from water retention is the central safety concern.
        </div>
        <div className="reta-overview__headline-sub">
          Desmopressin (DDAVP) is one of the most elegantly designed peptide drugs in clinical pharmacology. Two structural modifications to native vasopressin — N-terminal deamination and D-arginine substitution — completely eliminate V1a receptor activation (vasoconstriction, cardiac effects) while preserving and amplifying V2 receptor effects (antidiuresis, hemostasis). The result is a compound that can be safely used in children with bedwetting without cardiovascular risk, while native vasopressin requires intensive care monitoring. The antidiuretic effect is the double-edged sword: too much water retention with insufficient fluid restriction causes hyponatremia, the primary serious adverse effect. Understanding the fluid restriction protocol is not optional — it is the central safety behavior for everyone using desmopressin.
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="reta-overview__stats">
        {STAT_CARDS.map((s) => (
          <div key={s.value} className="reta-overview__stat">
            <div className="reta-overview__stat-value">{s.value}</div>
            <div className="reta-overview__stat-label">{s.label}</div>
            <div className="reta-overview__stat-sub">{s.sub}</div>
            <div className="reta-overview__stat-note">{s.note}</div>
          </div>
        ))}
      </div>

      {/* ── Fit matrix ── */}
      <div className="reta-overview__section-label">Is this the right call for you?</div>
      <div className="reta-overview__fit">
        <div className="reta-overview__fit-col reta-overview__fit-col--yes">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">✓</span> Fits your situation if…
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_YES.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="reta-overview__fit-col reta-overview__fit-col--no">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">✗</span> Look elsewhere if…
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_NO.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="reta-overview__section-label">What to actually expect</div>
      <div className="reta-overview__timeline">
        {TIMELINE.map((t, i) => (
          <div key={i} className="reta-overview__timeline-item">
            <div className="reta-overview__timeline-phase">{t.phase}</div>
            <div className="reta-overview__timeline-heading">{t.heading}</div>
            <div className="reta-overview__timeline-body">{t.body}</div>
          </div>
        ))}
      </div>

      {/* ── Comparison ── */}
      <div className="reta-overview__section-label">Desmopressin vs Vasopressin vs Terlipressin</div>
      <div className="reta-overview__compare-note">
        The vasopressin drug family differs fundamentally by receptor selectivity. Desmopressin is V2-selective and safe for outpatient use. Native vasopressin activates both V1a and V2 — the V1a effects (vasoconstriction, cardiac effects) make it an intensive care medication. Terlipressin is V1a-predominant, used for specific hepatic complications requiring splanchnic vasoconstriction. Receptor selectivity determines the entire clinical profile.
      </div>
      <div className="reta-overview__compare">
        {COMPARISON.map((col) => (
          <div
            key={col.name}
            className={`reta-overview__compare-col${col.highlight ? " reta-overview__compare-col--active" : ""}`}
          >
            <div className="reta-overview__compare-name">
              {col.name}
              <span
                className="reta-overview__compare-badge"
                style={{ color: col.badgeColor, background: col.badgeBg }}
              >
                {col.badge}
              </span>
            </div>
            {col.rows.map((row) => (
              <div key={row.label} className="reta-overview__compare-row">
                <div className="reta-overview__compare-row-label">{row.label}</div>
                <div className="reta-overview__compare-row-value">{row.value}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}
