/**
 * LanreotideOverviewPanel — decision-oriented overview for Lanreotide (Somatuline Depot).
 * Key frame: FDA-approved somatostatin analogue for acromegaly and GEP-NETs.
 * Same drug class as octreotide but longer-acting (monthly SC injection).
 * Community interest: SSTR2 agonism that reduces GH/IGF-1 — counterproductive
 * in peptide community context where GH secretagogues are typically the goal.
 */

const STAT_CARDS = [
  {
    value: "SSTR2/5",
    label: "somatostatin receptor agonist \u2014 suppresses GH, IGF-1, and secretory hormones",
    sub: "Lanreotide is a synthetic somatostatin analogue \u2014 a cyclic octapeptide that mimics the hormone somatostatin. It binds somatostatin receptors (primarily SSTR2 and SSTR5) with high affinity. Activation of these receptors suppresses growth hormone (GH) secretion from the pituitary, reduces liver IGF-1 production, inhibits TSH, glucagon, insulin, and VIP secretion, and reduces exocrine pancreatic and gastrointestinal secretions. The net effect is a broad suppression of growth and secretory activity.",
    note: "Somatostatin itself has a very short half-life (minutes) and is not pharmacologically useful. Lanreotide (and octreotide) are engineered analogues with extended receptor binding and metabolic stability. Lanreotide Depot\u2019s extended-release formulation (aqueous gel for deep SC injection) achieves therapeutic plasma concentrations for 28\u201342 days from a single injection \u2014 this is the key clinical advantage over octreotide (which requires multiple daily SC injections or a different monthly depot formulation).",
  },
  {
    value: "Acromegaly",
    label: "primary FDA-approved indication \u2014 GH excess from pituitary adenoma",
    sub: "Acromegaly is a condition of pathological GH excess, almost always from a GH-secreting pituitary adenoma. Chronic GH and IGF-1 elevation causes progressive soft tissue and bone growth (enlarged hands, feet, jaw, facial features), cardiovascular complications, diabetes, hypertension, and increased cancer risk. Lanreotide suppresses GH secretion from the adenoma and reduces circulating IGF-1 toward normal. Treatment goals are GH <1 ng/mL (random) or IGF-1 within age-adjusted normal range.",
    note: "Lanreotide in acromegaly is used as: primary medical therapy (when surgery is not feasible or declined), adjuvant therapy after incomplete surgical resection, or bridge therapy while awaiting radiation effect. First-generation acromegaly guidelines recommend SSA (somatostatin analogue) as first-line medical therapy. Response rates for normalizing IGF-1 are approximately 30\u201360% \u2014 better for smaller tumors with high SSTR2 expression. The primary alternative medical agents are pegvisomant (GH receptor antagonist) and cabergoline (dopamine agonist).",
  },
  {
    value: "GEP-NETs",
    label: "gastroenteropancreatic neuroendocrine tumors \u2014 antisecretory and antiproliferative",
    sub: "Lanreotide is FDA-approved for unresectable, well or moderately differentiated, locally advanced or metastatic gastroenteropancreatic neuroendocrine tumors (GEP-NETs) to improve progression-free survival. The CLARINET trial demonstrated significantly longer progression-free survival with lanreotide vs placebo in patients with intestinal, pancreatic, and unknown primary NETs. Lanreotide also controls the hormonal secretion that causes carcinoid syndrome (flushing, diarrhea) from serotonin-secreting NETs.",
    note: "The CLARINET trial (Caplin ME et al., NEJM 2014) was a landmark: 101 patients randomized to lanreotide depot 120mg vs placebo \u2014 progression-free survival not reached in the lanreotide group vs 18 months with placebo (HR 0.47; p<0.001). This was the first trial to demonstrate antiproliferative benefit of an SSA in GEP-NETs using a rigorous event-driven endpoint. The trial changed guideline recommendations for SSA use in stable, low-to-intermediate grade NETs.",
  },
  {
    value: "Community",
    label: "community interest \u2014 SSTR2 agonism reduces GH/IGF-1, counterproductive in peptide context",
    sub: "Lanreotide has generated some interest in the peptide and anti-aging community because of its mechanism: SSTR2 agonism that reduces GH and IGF-1. The relevant observation is that pharmacological somatostatin signaling is what GH secretagogues try to work around (ipamorelin and other GHRPs overcome somatostatin tone). Some longevity researchers have proposed that intermittent SSA therapy might modulate IGF-1 and GH in ways that are beneficial for longevity, following the logic that lower IGF-1 in some models correlates with longevity.",
    note: "The community interest framing is almost entirely opposite to the typical peptide community goal: most community peptide users are using GH secretagogues to RAISE GH and IGF-1. Using lanreotide would suppress both. The potential longevity angle (lower GH/IGF-1 = longer healthspan in some model organisms) is speculative in humans and not a validated clinical strategy. If you are using GH secretagogues and are prescribed lanreotide for an indication like NETs, these are pharmacologically opposed mechanisms \u2014 discuss with your prescriber.",
  },
];

const FIT_YES = [
  "You have been diagnosed with acromegaly and surgery is not an option, was incomplete, or your IGF-1 remains elevated after surgery \u2014 lanreotide or octreotide LAR are first-line medical therapy in this context",
  "You have a gastroenteropancreatic neuroendocrine tumor (GEP-NET) and your oncologist has recommended lanreotide for tumor control (progression-free survival) or symptom control (carcinoid syndrome)",
  "You are interested in understanding somatostatin analogue pharmacology as part of learning about the GH/IGF-1 axis regulation \u2014 lanreotide is the best example of a long-acting SSTR2/5 agonist",
  "You are a patient currently on lanreotide and want to understand what drug interactions and monitoring requirements apply to your treatment",
];

const FIT_NO = [
  "You are considering lanreotide to \u201coptimize\u201d GH and IGF-1 in an enhancement context \u2014 lanreotide suppresses GH and IGF-1; this is the opposite of the typical enhancement goal and would counteract any GH secretagogue use",
  "You are using ipamorelin, CJC-1295, sermorelin, or any other GH secretagogue \u2014 lanreotide would pharmacologically oppose these compounds; the combination is incoherent unless under specialist guidance for a specific clinical indication",
  "You are pursuing a longevity-through-lower-IGF-1 strategy based on animal model data \u2014 the human evidence for this approach is insufficient to recommend lanreotide for that purpose; caloric restriction research suggests different mechanisms for IGF-1 modulation that are better evidenced",
  "You have a history of cholelithiasis (gallstones) without recent imaging or gastroenterological oversight \u2014 somatostatin analogues reduce gallbladder motility and promote gallstone formation; pre-existing gallstone disease requires monitoring",
  "You have diabetes or glucose management concerns without endocrinology oversight \u2014 lanreotide has complex bidirectional glucose effects and complicates diabetes management",
];

const TIMELINE = [
  {
    phase: "Before first injection",
    heading: "Baseline GH/IGF-1, gallbladder ultrasound, and glucose evaluation",
    body: "Before starting lanreotide: baseline GH and IGF-1 levels (for monitoring response in acromegaly), fasting glucose and HbA1c (lanreotide alters glucose homeostasis), and gallbladder ultrasound (to document pre-existing gallstone disease, since SSTR2 agonism reduces gallbladder motility and promotes cholelithiasis). Cardiac evaluation (EKG) is reasonable in acromegaly patients who may have pre-existing cardiomyopathy. Thyroid function in patients who may have concomitant TSH suppression.",
  },
  {
    phase: "First months of therapy",
    heading: "GI side effects are front-loaded; glucose effects can go either direction",
    body: "GI symptoms (nausea, loose stools, steatorrhea, flatulence) are most prominent in the first weeks and typically improve as the gut adapts to reduced secretin, pancreatic enzyme, and intestinal motility. Glucose monitoring is important in the first months: somatostatin analogues reduce insulin secretion (raising glucose) but also reduce GH (improving insulin sensitivity) \u2014 net effect is variable. In acromegaly, where GH-induced insulin resistance was present, glucose can improve; in NETs or non-acromegaly contexts, worsening glucose is more common. IGF-1 monitoring at 3 months guides dose adjustment in acromegaly.",
  },
  {
    phase: "Long-term maintenance",
    heading: "Periodic gallbladder monitoring, continued glucose tracking, and tumor surveillance",
    body: "Long-term lanreotide therapy requires: periodic gallbladder ultrasound (annually or if symptoms develop) given the cholelithiasis risk from chronic gallbladder hypomotility; glucose monitoring (lanreotide-induced glycemic changes are sustained); tumor imaging at appropriate intervals (for GEP-NETs, typically CT/MRI every 3\u20136 months depending on tumor grade and stability). IGF-1 monitoring in acromegaly every 3\u20136 months once stable to confirm ongoing suppression.",
  },
];

const COMPARISON = [
  {
    name: "Lanreotide Depot (Somatuline)",
    badge: "Monthly deep SC injection \u2014 aqueous gel",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.09)",
    rows: [
      { label: "Dosing", value: "60\u2013120 mg deep SC every 28 days; auto-gel formulation \u2014 no reconstitution needed" },
      { label: "Administration", value: "Self-administered SC injection or by healthcare provider; large injection volume" },
      { label: "SSTR selectivity", value: "High affinity for SSTR2 and SSTR5; less SSTR3" },
      { label: "Key trials", value: "CLARINET (GEP-NETs, PFS endpoint); multiple acromegaly RCTs" },
      { label: "Formulation advantage", value: "Ready-to-use aqueous gel; no reconstitution; stable at room temperature for short periods" },
    ],
    highlight: true,
  },
  {
    name: "Octreotide LAR (Sandostatin LAR)",
    badge: "Monthly IM injection \u2014 microsphere depot",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Dosing", value: "10\u201330 mg IM every 28 days; requires reconstitution before injection" },
      { label: "Administration", value: "IM injection by healthcare provider required (gluteal); microsphere formulation requires proper technique" },
      { label: "SSTR selectivity", value: "High affinity for SSTR2 and SSTR5; similar to lanreotide" },
      { label: "Key trials", value: "PROMID (GEP-NETs, earlier trial with TTP endpoint); multiple acromegaly RCTs" },
      { label: "Distinction", value: "Longer clinical track record; IM vs SC route; requires healthcare provider administration" },
    ],
    highlight: false,
  },
  {
    name: "Pasireotide (Signifor LAR)",
    badge: "Broader SSTR coverage \u2014 second-generation SSA",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Dosing", value: "40\u201360 mg IM every 28 days; second-generation SSA" },
      { label: "SSTR selectivity", value: "High affinity for SSTR1, 2, 3, and 5 \u2014 broader coverage than lanreotide/octreotide" },
      { label: "Efficacy in acromegaly", value: "Higher IGF-1 normalization rates than first-gen SSAs (~25\u201335% vs 20\u201330% for lanreotide/octreotide)" },
      { label: "Key safety concern", value: "Significantly higher rate of hyperglycemia/diabetes than first-gen SSAs \u2014 due to SSTR5 inhibition of insulin secretion" },
      { label: "Clinical use", value: "Second-line for acromegaly inadequately controlled on first-gen SSAs; not approved for NETs" },
    ],
    highlight: false,
  },
];

export default function LanreotideOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A long-acting somatostatin analogue that suppresses GH, IGF-1, and tumor secretion \u2014 the pharmacological opposite of a GH secretagogue.
        </div>
        <div className="reta-overview__headline-sub">
          Lanreotide (Somatuline Depot) is a synthetic cyclic octapeptide that mimics somatostatin \u2014 the hormone that inhibits growth hormone release. By activating SSTR2 and SSTR5 receptors, it suppresses GH secretion, reduces IGF-1, and can slow the growth of somatostatin receptor-expressing tumors. It is FDA-approved for acromegaly (GH excess from pituitary adenoma) and GEP-NETs (gastroenteropancreatic neuroendocrine tumors). A single deep subcutaneous injection every 28 days maintains therapeutic drug levels \u2014 a practical advance over multiple daily injections. For anyone in the peptide community using GH secretagogues: lanreotide is what your peptides are working against. It&apos;s the pharmacological brake on the GH axis.
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
      <div className="reta-overview__section-label">Is this relevant to your situation?</div>
      <div className="reta-overview__fit">
        <div className="reta-overview__fit-col reta-overview__fit-col--yes">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">&#x2713;</span> Relevant if&hellip;
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_YES.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="reta-overview__fit-col reta-overview__fit-col--no">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">&#x2717;</span> Not the right frame if&hellip;
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_NO.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="reta-overview__section-label">What to expect at each stage of therapy</div>
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
      <div className="reta-overview__section-label">Somatostatin analogue comparison</div>
      <div className="reta-overview__compare-note">
        Lanreotide and octreotide LAR are first-generation SSAs with similar SSTR selectivity (SSTR2/5), similar efficacy profiles in acromegaly and NETs, and similar safety profiles. The key practical difference is formulation: lanreotide is a ready-to-use aqueous gel for deep SC injection; octreotide LAR is a microsphere formulation requiring reconstitution for IM injection. Pasireotide is a second-generation SSA with broader SSTR coverage and higher efficacy but a substantially higher risk of hyperglycemia.
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
