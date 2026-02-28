/**
 * BpcOverviewPanel — decision-oriented overview for BPC-157.
 * Answers: What is this? Why do people care? Is it right for my situation? What should I expect?
 * Key frame: strong preclinical signal, thin human evidence, sourcing risk is the dominant variable.
 */

const STAT_CARDS = [
  {
    value: "15",
    label: "amino acids",
    sub: "pentadecapeptide — partial sequence from gastric protein BPC",
    note: "Fully synthetic — stable salt form (BPC-157 acetate) used in research",
  },
  {
    value: "30+ yrs",
    label: "of preclinical research",
    sub: "hundreds of animal models across multiple tissue types",
    note: "Human clinical trial data: sparse. One Phase I study registered.",
  },
  {
    value: "0",
    label: "regulatory approvals",
    sub: "unapproved for human use globally",
    note: "FDA flagged compounding safety risks. Research-grade only — no pharmaceutical standard.",
  },
];

const FIT_YES = [
  "You're focused on injury recovery (tendon, ligament, soft tissue) and conventional approaches have plateaued",
  "You have persistent GI issues (reflux, gut irritation) and are open to supplementing alongside medical care",
  "You understand the evidence base is mostly preclinical and accept that clinical certainty doesn't exist yet",
  "You're sourcing from a supplier that provides independent third-party certificate of analysis (CoA) — not random vendors",
  "You've set a clear hypothesis: a specific outcome, over a defined timeframe, that you'll actually evaluate",
];

const FIT_NO = [
  "You expect pharmaceutical-grade efficacy with clinical certainty — the human evidence doesn't support that position",
  "You're sourcing from unverified vendors — contamination and mislabeling are the primary real-world risk",
  "You're pregnant, breastfeeding, or an adolescent — developmental risk is explicitly flagged due to high uncertainty",
  "You're on prescription immunomodulators (biologics, methotrexate) for autoimmune disease — interaction unknowns are real",
  "You're stacking multiple unverified compounds simultaneously — compounding uncertainty without compounding benefit",
  "You expect it to structurally repair acute serious injuries — the mechanism is about tissue environment, not surgical correction",
];

const TIMELINE = [
  {
    phase: "Weeks 1–4",
    heading: "Orientation — route choice matters here",
    body: "Oral route (for GI targeting) tends to produce faster subjective feedback, if any — effects often described within weeks. Injectable route for structural goals (tendon, soft tissue) is slower — this is about tissue biology, not acute pharmacology. The first weeks are about tolerability assessment and sourcing validation, not outcome measurement.",
  },
  {
    phase: "Months 1–3",
    heading: "The honest evaluation window",
    body: "If BPC-157 is doing something for your specific goal, this is when you'd start to notice it. Soft tissue comfort and recovery trajectory are the primary signals for injury use. GI symptom patterns are the signal for gut use. The challenge: BPC-157 is almost always used alongside rest, rehab, and other interventions — attribution is genuinely difficult.",
  },
  {
    phase: "Long-term",
    heading: "Genuinely unknown territory",
    body: "No human data exists on sustained BPC-157 use. This isn't a hedged statement — it's a literal absence of data. People who use it long-term are running a personal experiment without a reference map. Most community protocols involve cycling (on/off periods) rather than continuous use, primarily for this reason.",
  },
];

const COMPARISON = [
  {
    name: "BPC-157 (injectable)",
    badge: "Research-grade",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Primary use case", value: "Systemic healing — tendon, soft tissue, joint" },
      { label: "Route", value: "Subcutaneous injection" },
      { label: "Onset", value: "Gradual — weeks to months" },
      { label: "GI targeting", value: "Indirect — systemic distribution" },
      { label: "Evidence for this use", value: "Animal models (strong); humans (sparse)" },
    ],
    highlight: true,
  },
  {
    name: "BPC-157 (oral)",
    badge: "Research-grade",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Primary use case", value: "GI-targeted healing — reflux, gut irritation" },
      { label: "Route", value: "Oral capsule or liquid" },
      { label: "Onset", value: "Faster subjective GI feedback than injectable" },
      { label: "GI targeting", value: "Direct — survives gastric passage (theoretical)" },
      { label: "Evidence for this use", value: "Animal GI models (strong); systemic bioavailability disputed" },
    ],
    highlight: false,
  },
  {
    name: "TB-500 / Thymosin β4",
    badge: "Research-grade",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Primary use case", value: "Healing, inflammation modulation, tissue repair" },
      { label: "Route", value: "Subcutaneous injection" },
      { label: "Onset", value: "Similar — gradual, weeks" },
      { label: "Mechanism", value: "Actin regulation + anti-inflammatory (distinct from BPC)" },
      { label: "Stack relationship", value: "Commonly used alongside BPC-157 — complementary, not redundant" },
    ],
    highlight: false,
  },
];

export default function BpcOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          One of the most discussed recovery peptides — and one of the least proven in humans.
        </div>
        <div className="reta-overview__headline-sub">
          Strong animal data. Sparse human trials. Real-world risk lives in the sourcing and supply chain, not the compound itself.
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
      <div className="reta-overview__section-label">BPC-157 vs its common comparators</div>
      <div className="reta-overview__compare-note">
        Route choice within BPC-157 matters as much as the compound itself. The oral vs injectable distinction is about what you&apos;re targeting, not about dosing.
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
