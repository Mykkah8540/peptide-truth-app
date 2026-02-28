/**
 * Igf1OverviewPanel — decision-oriented overview for IGF-1 (Insulin-like Growth Factor 1).
 * Key frame: this is not a wellness peptide. It's a powerful growth factor that can cause
 * hypoglycemia, promote cancer growth, and cause irreversible organ/tissue changes.
 * Prescription use: severe primary IGF-1 deficiency in children (Increlex/Mecasermin).
 * Enhancement use is high-risk, poorly studied, and has serious safety considerations.
 */

const STAT_CARDS = [
  {
    value: "IGF-1R",
    label: "receptor — powerful anabolic and mitogenic growth signaling",
    sub: "IGF-1 binds the IGF-1 receptor (IGF-1R), which is structurally similar to the insulin receptor. Activation drives protein synthesis, cell growth, anti-apoptosis (cell survival), and glucose uptake — strong anabolic effects throughout the body, not targeted to muscle",
    note: "The IGF-1R is expressed broadly — muscle, bone, liver, brain, heart, kidneys. 'Anabolic' means growth everywhere. This is the mechanism behind both the potential benefit and the primary concerns: cancer cell growth, organ hypertrophy, and tissue overgrowth are all IGF-1R-mediated effects.",
  },
  {
    value: "Hypoglycemia",
    label: "the most acute safety concern — insulin-receptor cross-reactivity",
    sub: "IGF-1 has structural similarity to insulin and binds insulin receptors at high concentrations — producing hypoglycemia (low blood sugar). Severe hypoglycemia from IGF-1 is a documented acute risk that can cause loss of consciousness, seizure, and cardiac arrhythmia",
    note: "This is not a theoretical concern. Hypoglycemia from injectable IGF-1 has caused hospitalizations and deaths in non-medical enhancement use. Unlike insulin, IGF-1's hypoglycemic effects have a longer duration due to its longer half-life. Glucose monitoring and eating before injection are basic risk mitigation, not optional practices.",
  },
  {
    value: "Mitogenic",
    label: "growth signal — promotes proliferation of all cells, including cancer cells",
    sub: "IGF-1 is a mitogen — it promotes cell division and proliferation across cell types. Elevated IGF-1 levels are associated with increased risk of several cancers (breast, prostate, colorectal, lung) in epidemiological studies. This is the reason cancer history is a hard stop for any GH/IGF-1 raising compound",
    note: "The cancer association is epidemiological (elevated natural IGF-1 correlates with cancer risk) and preclinical (IGF-1 promotes cancer cell proliferation in vitro). The causal chain for exogenous injectable IGF-1 and cancer initiation vs promotion in healthy adults is not precisely established — but the mechanism is real and the precautionary principle applies.",
  },
  {
    value: "Rx only",
    label: "prescription: severe primary IGF-1 deficiency in children",
    sub: "Increlex (mecasermin) is FDA-approved for severe primary IGF-1 deficiency and primary IGF-1 deficiency with GH insensitivity in pediatric patients. Off-label enhancement use is outside any approved framework, and compounded or research-grade IGF-1 lacks pharmaceutical quality control",
    note: "The FDA indication is pediatric and specific — it doesn't extrapolate to healthy adult enhancement use. The clinical evidence base for IGF-1 in healthy adults or as a performance enhancer is extremely limited. Most enhancement-community use operates well outside any evidence-supported framework.",
  },
];

const FIT_YES = [
  "You have documented severe primary IGF-1 deficiency (Laron syndrome or confirmed GH insensitivity) with endocrinology supervision — Increlex/mecasermin is the appropriate clinical context for this compound",
  "You understand this is not a wellness or optimization peptide — the risk/benefit ratio for healthy adults pursuing enhancement is unfavorable compared to GH secretagogues (ipamorelin, CJC-1295) that work indirectly through natural feedback",
  "You have full oncology clearance and no cancer history, no family history of IGF-1-sensitive cancers (breast, prostate, colorectal), and no elevated PSA or other concerning markers",
  "You have established glucose monitoring in place before first injection and understand hypoglycemia is an acute risk requiring immediate response capability",
  "You have physician oversight with regular labs — IGF-1 levels, glucose, HbA1c, and tumor markers are appropriate monitoring given the mechanism",
];

const FIT_NO = [
  "You have any personal history of cancer — IGF-1 is a direct mitogenic signal; this is the hardest of hard stops regardless of remission status",
  "You have a strong family history of IGF-1-sensitive cancers (breast, prostate, colorectal) without oncology consultation — the mitogenic risk applies to cancer promotion, not just initiation",
  "You have diabetes or insulin resistance — the insulin-receptor cross-reactivity from IGF-1 creates unpredictable hypoglycemia risk that is especially dangerous on a background of glucose dysregulation",
  "You are looking for a safer or more efficient alternative to GH secretagogues — GH secretagogues (ipamorelin + CJC-1295, sermorelin, MK-677) work through the natural GH/IGF-1 axis with feedback regulation intact; exogenous IGF-1 bypasses this regulation entirely",
  "You are pregnant, breastfeeding, or an adolescent — growth axis manipulation during development is a hard stop; IGF-1 is particularly dangerous in this context",
  "You are sourcing from gray-market research chemical suppliers — IGF-1 purity, concentration, and sterility are critical given the hypoglycemia risk; impure or incorrectly dosed product is a direct life safety issue",
];

const TIMELINE = [
  {
    phase: "Before first dose",
    heading: "Baseline glucose, IGF-1 levels, and oncology clearance — do these first",
    body: "Before any IGF-1 administration: fasting glucose and HbA1c to characterize your baseline glucose regulation; baseline IGF-1 level (your natural level, not on exogenous IGF-1); cancer screening appropriate for your age and family history; physician oversight. These aren't optional steps — they're the minimum safety baseline for a compound with acute hypoglycemia risk and cancer-related safety concerns. Skipping them is how people get hurt.",
  },
  {
    phase: "Weeks 1–4",
    heading: "Hypoglycemia is the immediate risk — the early period requires highest vigilance",
    body: "Injectable IGF-1 begins producing detectable anabolic and glucose-lowering effects within days. The hypoglycemia risk is highest during initial dosing before the user understands their individual response. Eating a carbohydrate-containing meal 20-30 minutes before injection is standard practice — not a suggestion. Some users carry glucose tablets or glucose gel. Symptoms of hypoglycemia (shakiness, sweating, confusion, rapid heart rate, impaired coordination) can progress to loss of consciousness faster than with dietary hypoglycemia because of IGF-1's longer active duration.",
  },
  {
    phase: "Weeks 4–12",
    heading: "Anabolic effects accumulate — but so do longer-term organ growth concerns",
    body: "The enhancement community uses IGF-1 primarily for muscle and recovery goals. Any observed changes over this period occur alongside systemic IGF-1R activation — in cardiac tissue, kidneys, jaw and facial bones, and other organs. Hands and feet tingling or swelling (carpal tunnel from fluid retention and nerve compression) are commonly reported. Jaw growth is a concern with prolonged use (acromegalic features from sustained GH/IGF-1 elevation). These effects are not reversible after significant exposure — this is the timeline where long-term consequence evaluation matters.",
  },
];

const COMPARISON = [
  {
    name: "IGF-1 (exogenous)",
    badge: "Direct growth factor — high risk",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Direct IGF-1R agonism — bypasses GH/IGF-1 axis feedback regulation entirely" },
      { label: "Hypoglycemia risk", value: "High — insulin receptor cross-reactivity; acute hypoglycemia is documented" },
      { label: "Mitogenic risk", value: "Direct — IGF-1R activation promotes cancer cell proliferation" },
      { label: "Evidence for enhancement", value: "Extremely limited — clinical data is pediatric IGF-1 deficiency only" },
      { label: "Regulatory status", value: "Prescription only (Increlex); research-grade has no quality controls" },
    ],
    highlight: true,
  },
  {
    name: "Ipamorelin + CJC-1295",
    badge: "GH secretagogue stack",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Stimulates natural GH release → body raises IGF-1 via liver feedback" },
      { label: "Hypoglycemia risk", value: "Low — indirect IGF-1 raise; GH is counter-regulatory to insulin" },
      { label: "Mitogenic concern", value: "Present but modulated by feedback regulation — IGF-1 raise is tempered by natural axis" },
      { label: "Evidence for enhancement", value: "Limited human data; mechanism well-characterized; significant community use history" },
      { label: "Regulatory status", value: "Research-grade; some access via compounding pharmacy (sermorelin)" },
    ],
    highlight: false,
  },
  {
    name: "Growth Hormone (HGH)",
    badge: "Exogenous GH",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Exogenous GH → liver produces IGF-1; some direct GH receptor effects" },
      { label: "Hypoglycemia risk", value: "Low to moderate — GH is actually counter-regulatory to insulin" },
      { label: "Mitogenic concern", value: "Similar to GH secretagogues — IGF-1 mediated; partially regulated by feedback" },
      { label: "Evidence for enhancement", value: "More studied than IGF-1 for enhancement; bodybuilding use history is long" },
      { label: "Regulatory status", value: "Prescription only (FDA: growth disorders); significant gray market" },
    ],
    highlight: false,
  },
];

export default function Igf1OverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A powerful growth factor prescribed for rare pediatric deficiencies — not a wellness compound.
        </div>
        <div className="reta-overview__headline-sub">
          IGF-1 is a naturally occurring growth factor your liver produces in response to growth hormone. Injecting it exogenously bypasses every feedback loop your body uses to regulate how much growth signaling is appropriate. The enhancement community uses it for muscle and recovery goals. The problem: IGF-1 signals growth everywhere — muscle, bone, organ tissue, and cancer cells don&apos;t distinguish. Hypoglycemia (from insulin receptor cross-reactivity) is the immediate life-safety risk. Mitogenic cancer concern is the long-term risk. GH secretagogues (ipamorelin + CJC-1295) achieve similar anabolic goals by working through the natural axis with feedback regulation intact — a substantially different risk profile. If you&apos;re considering IGF-1, first understand why that comparison matters.
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
      <div className="reta-overview__section-label">IGF-1 vs GH Secretagogues vs Exogenous HGH</div>
      <div className="reta-overview__compare-note">
        The key comparison: exogenous IGF-1 bypasses the GH/IGF-1 axis feedback regulation entirely, while GH secretagogues (ipamorelin, CJC-1295, sermorelin) work through the natural axis with feedback intact. That difference matters for hypoglycemia risk, mitogenic risk, and the ability of the body to self-regulate. Exogenous GH sits between them — less risky than direct IGF-1 injection, but still bypasses some natural regulation.
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
