/**
 * RetaOverviewPanel — decision-oriented overview for the Retatrutide PDP.
 * Answers: Will this work? How much? Is it right for me? What should I expect?
 */

const STAT_CARDS = [
  {
    value: "~24%",
    label: "body weight lost",
    sub: "highest-dose cohort, 48 wks",
    note: "Phase 2 only",
  },
  {
    value: "3",
    label: "receptor targets",
    sub: "GLP-1 + GIP + glucagon",
    note: "vs. 2 for tirzepatide, 1 for semaglutide",
  },
  {
    value: "48 wk",
    label: "trial duration",
    sub: "Phase 2 complete",
    note: "Phase 3 ongoing — no long-term safety data yet",
  },
];

const FIT_YES = [
  "Your primary goal is significant fat loss — not minor weight management",
  "You've plateaued on semaglutide or tirzepatide and want a step up",
  "You can commit to adequate protein intake and some resistance training",
  "You're comfortable with investigational status and limited long-term data",
  "GI side effects are manageable — nausea often peaks in the first 4 weeks then settles",
];

const FIT_NO = [
  "You need a drug with proven cardiovascular outcomes data — sema and tirz have this, reta doesn't yet",
  "You haven't tried an established GLP-1 first — reta is typically a step up, not a first option",
  "You have a history of severe GI issues, pancreatitis, or medullary thyroid cancer",
  "You're pregnant, planning to become pregnant, or breastfeeding",
  "You can't access consistent supply — still research-grade, not commercial",
];

const TIMELINE = [
  {
    phase: "Weeks 1–4",
    heading: "Titration & adjustment",
    body: "GI side effects peak here — nausea, constipation, appetite drop. Don't judge the drug during this window. Focus on fluids, small meals, and not letting protein slip.",
  },
  {
    phase: "Months 1–3",
    heading: "Momentum builds",
    body: "Weight loss gains traction. The glucagon component may drive notably higher energy expenditure than single-agonist GLP-1s. Protein intake becomes critical — aim for 0.7–1g per lb of goal body weight.",
  },
  {
    phase: "Month 3+",
    heading: "Plateau & reality check",
    body: "Where the real picture emerges. Lean mass check, tolerability review, dose reassessment. Resistance training matters most here for protecting muscle and keeping the weight that comes off from being the wrong kind.",
  },
];

const COMPARISON = [
  {
    name: "Retatrutide",
    badge: "Investigational",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Peak trial weight loss", value: "~24%", note: "48 wk, Phase 2" },
      { label: "Receptors", value: "GLP-1 + GIP + Glucagon" },
      { label: "Approval status", value: "Phase 2 complete" },
      { label: "Cardiovascular outcomes data", value: "Not yet" },
      { label: "Access", value: "Research-grade" },
    ],
    highlight: true,
  },
  {
    name: "Tirzepatide",
    badge: "Approved",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Peak trial weight loss", value: "~21%", note: "72 wk, Phase 3" },
      { label: "Receptors", value: "GLP-1 + GIP" },
      { label: "Approval status", value: "FDA approved (Zepbound)" },
      { label: "Cardiovascular outcomes data", value: "Yes (SURMOUNT-MMO)" },
      { label: "Access", value: "Prescription" },
    ],
    highlight: false,
  },
  {
    name: "Semaglutide",
    badge: "Approved",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Peak trial weight loss", value: "~15%", note: "68 wk, Phase 3" },
      { label: "Receptors", value: "GLP-1" },
      { label: "Approval status", value: "FDA approved (Wegovy)" },
      { label: "Cardiovascular outcomes data", value: "Yes (SELECT trial)" },
      { label: "Access", value: "Prescription" },
    ],
    highlight: false,
  },
];

export default function RetaOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          Strongest weight-loss signal seen in any GLP-class trial to date.
        </div>
        <div className="reta-overview__headline-sub">
          Phase 2 data. Phase 3 and long-term outcomes still pending — numbers may shift.
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
      <div className="reta-overview__section-label">Head to head</div>
      <div className="reta-overview__compare-note">
        These trials used different durations, doses, and populations — not a direct apples-to-apples comparison. Use as ballpark, not precision.
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
                <div className="reta-overview__compare-row-value">
                  {row.value}
                  {row.note && (
                    <span className="reta-overview__compare-row-note"> — {row.note}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}
