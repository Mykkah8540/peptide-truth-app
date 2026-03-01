/**
 * OctreotideOverviewPanel — decision-oriented overview for Octreotide (Sandostatin).
 * Key frame: FDA-approved synthetic somatostatin analogue with strong evidence base.
 * Approved for acromegaly, carcinoid syndrome, VIPomas. Off-label: variceal bleeding.
 * Community interest framing (GH suppression for longevity) is counterproductive context.
 */

const STAT_CARDS = [
  {
    value: "FDA-approved",
    label: "acromegaly, carcinoid syndrome, VIPomas \u2014 this is real medicine",
    sub: "Octreotide (Sandostatin) is an 8-amino-acid cyclic peptide that is the original synthetic somatostatin analogue. It binds SSTR2, SSTR3, and SSTR5 receptors to suppress GH/IGF-1, serotonin, and other secreted hormones. FDA-approved for three distinct indications with strong RCT evidence. Sandostatin LAR (monthly depot) is the primary long-acting formulation.",
    note: "This is the most important framing distinction: octreotide is genuine medicine, not a community research peptide. If you have acromegaly, carcinoid syndrome, or a VIPoma, octreotide is a core treatment option \u2014 not an enhancement compound. If you are considering it for longevity or GH modulation outside these indications, the framing is fundamentally different.",
  },
  {
    value: "SSTR2/3/5",
    label: "receptor selectivity \u2014 more potent and longer-acting than somatostatin",
    sub: "Endogenous somatostatin (SRIF-14) inhibits GH, TSH, insulin, glucagon, and multiple GI hormones but has a very short half-life (1\u20133 minutes). Octreotide\u2019s cyclic structure dramatically extends half-life (1.5\u20132 hours for immediate-release SC injection) and increases SSTR2 affinity relative to endogenous somatostatin. This is the pharmacological achievement that made octreotide clinically useful.",
    note: "The receptor selectivity profile matters: SSTR2 is the primary receptor for GH suppression and anti-tumor effects. SSTR3 and SSTR5 contribute to GI hormone and gastric acid suppression. Understanding which receptor drives which effect is relevant for interpreting why octreotide works in its approved indications.",
  },
  {
    value: "Sandostatin LAR",
    label: "monthly depot \u2014 the standard long-term formulation",
    sub: "Sandostatin LAR (long-acting release) is an injectable microsphere depot formulation delivering octreotide over 28 days. It\u2019s the standard formulation for chronic management of acromegaly and carcinoid syndrome. Immediate-release octreotide SC is used for acute management (variceal bleeding, acute carcinoid crisis) and dose titration.",
    note: "The community interest context involves immediate-release octreotide, not the LAR formulation. The LAR formulation is a physician-managed, clinic-administered depot injection \u2014 not a community self-administration context.",
  },
];

const FIT_YES = [
  "You have acromegaly and are under physician management \u2014 octreotide is a first-line or adjuvant treatment with strong RCT evidence for GH/IGF-1 normalization",
  "You have carcinoid syndrome (diarrhea, flushing) from a neuroendocrine tumor \u2014 octreotide is the standard symptom control option with FDA approval",
  "You have a VIPoma with secretory diarrhea \u2014 octreotide is FDA-approved for this indication",
  "You have esophageal variceal bleeding and are in a hospital setting \u2014 octreotide IV reduces portal pressure and bleeding; off-label use with RCT support",
  "Your GEP-NET is being managed with physician oversight \u2014 octreotide has demonstrated anti-tumor activity (PROMID trial)",
];

const FIT_NO = [
  "You want to suppress endogenous GH for longevity or anti-aging framing \u2014 suppressing GH/IGF-1 chronically in a GH-normal person has no established benefit and potential harms (metabolic effects, glucose dysregulation)",
  "You are using GH secretagogues (CJC-1295, ipamorelin, GHRP-2) and want to add octreotide \u2014 this is direct pharmacological opposition; octreotide blocks GH release at the pituitary SSTR2 while secretagogues stimulate it",
  "You want to reduce IGF-1 for longevity without a clinical indication \u2014 the evidence for IGF-1 reduction improving longevity in humans is not established",
  "You are self-administering without physician oversight for an unapproved indication \u2014 octreotide requires monitoring for glucose, gallstones, and cardiac effects",
  "You are pregnant, breastfeeding, or an adolescent without a clinical indication \u2014 hard stop",
];

const TIMELINE = [
  {
    phase: "Immediate-release SC \u2014 onset within 30 minutes",
    heading: "Fast-acting GH/hormone suppression for acute management",
    body: "SC octreotide produces measurable GH and IGF-1 suppression within 30 minutes. In variceal bleeding, IV octreotide reduces portal pressure within minutes. The immediate-release formulation is used for acute episodes, titration, and situations requiring rapid effect. In carcinoid crisis (acute flushing, hypotension, bronchospasm from tumor serotonin release), IV octreotide is the emergency management.",
  },
  {
    phase: "Months on LAR \u2014 biochemical control",
    heading: "GH and IGF-1 normalization in acromegaly",
    body: "In acromegaly, 6 months of Sandostatin LAR achieves GH normalization (GH < 2.5 \u00b5g/L) in approximately 50\u201360% of patients and IGF-1 normalization in 50\u201370%. The response rate depends on tumor SSTR2 expression density. Higher SSTR2 expression (verified by octreotide scintigraphy or Ga-68 DOTATATE PET) predicts better response. Symptom control (headache, sweating, ring size) often precedes biochemical normalization.",
  },
  {
    phase: "Long-term \u2014 monitoring requirements",
    heading: "Gallstones, glucose, and cardiac monitoring are ongoing requirements",
    body: "Long-term octreotide use requires monitoring for cholesterol gallstones (SSTR2-mediated gallbladder stasis; 15\u201320% rate), glucose effects (bidirectional: can impair insulin secretion, can also reduce glucagon), and bradycardia (class effect). Annual gallbladder ultrasound is standard in chronic management. For acromegaly patients, GH and IGF-1 monitoring drives dose adjustment. These are physician-managed endpoints \u2014 not self-monitoring parameters.",
  },
];

const COMPARISON = [
  {
    name: "Octreotide (Sandostatin)",
    badge: "FDA-approved",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Class", value: "First-generation SSA \u2014 8-AA cyclic peptide; SSTR2/3/5 agonist" },
      { label: "Approved indications", value: "Acromegaly, carcinoid syndrome, VIPomas (FDA-approved)" },
      { label: "Formulation", value: "Immediate-release SC injection; Sandostatin LAR monthly depot" },
      { label: "GH suppression efficacy", value: "~50\u201360% GH normalization in acromegaly at 6 months" },
      { label: "Key monitoring", value: "Gallstones, glucose effects, bradycardia" },
    ],
    highlight: true,
  },
  {
    name: "Lanreotide (Somatuline)",
    badge: "FDA-approved",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Class", value: "Second-generation SSA \u2014 different 8-AA cyclic peptide; SSTR2/5 selectivity" },
      { label: "Approved indications", value: "Acromegaly, GEP-NETs, carcinoid syndrome (FDA-approved)" },
      { label: "Formulation", value: "Somatuline Depot \u2014 deep SC injection every 28 days" },
      { label: "vs Octreotide", value: "Same class, similar efficacy profile; different formulation convenience; lanreotide Depot is patient self-injectable vs clinic-injected LAR" },
      { label: "Key monitoring", value: "Same class effect: gallstones, glucose, bradycardia" },
    ],
    highlight: false,
  },
  {
    name: "Pasireotide (Signifor)",
    badge: "FDA-approved",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Class", value: "Third-generation SSA \u2014 broader SSTR profile (SSTR1/2/3/5)" },
      { label: "Approved indications", value: "Acromegaly (after failure of other SSAs); Cushing\u2019s disease" },
      { label: "vs Octreotide", value: "Higher GH/IGF-1 suppression in octreotide-resistant acromegaly; significantly higher hyperglycemia rate (pasireotide strongly inhibits insulin secretion)" },
      { label: "Key monitoring", value: "Hyperglycemia is a major concern \u2014 more severe than with octreotide/lanreotide" },
    ],
    highlight: false,
  },
];

export default function OctreotideOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The original somatostatin analogue \u2014 FDA-approved medicine for real endocrine conditions. Community GH-suppression framing gets the pharmacology backwards.
        </div>
        <div className="reta-overview__headline-sub">
          Octreotide (Sandostatin) is FDA-approved for acromegaly, carcinoid syndrome, and VIPomas \u2014 real endocrine and neuroendocrine conditions where GH/IGF-1 suppression or GI hormone control is the therapeutic goal. It works by binding somatostatin receptors (SSTR2, SSTR3, SSTR5) to suppress GH release, slow GI motility, and reduce secretory hormone output. The monthly depot formulation (Sandostatin LAR) is the cornerstone of long-term management. Community interest in octreotide for longevity or IGF-1 suppression ignores that GH secretagogue use and octreotide are pharmacological opposites: you cannot usefully pursue GH optimization and GH suppression simultaneously.
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
            <span className="reta-overview__fit-icon">&#x2713;</span> Fits your situation if&hellip;
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_YES.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="reta-overview__fit-col reta-overview__fit-col--no">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">&#x2717;</span> Look elsewhere if&hellip;
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
      <div className="reta-overview__section-label">Octreotide vs Lanreotide vs Pasireotide</div>
      <div className="reta-overview__compare-note">
        The somatostatin analogue (SSA) class has three generations with different receptor profiles and formulations. Octreotide was first; lanreotide is the main competitor with a different formulation convenience advantage; pasireotide is the broader-receptor option for octreotide-resistant acromegaly at the cost of higher hyperglycemia risk. For the acromegaly indication, the choice between octreotide and lanreotide is often driven by formulation preferences and monitoring context.
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
