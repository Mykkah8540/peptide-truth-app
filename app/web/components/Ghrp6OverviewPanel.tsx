/**
 * Ghrp6OverviewPanel — decision-oriented overview for GHRP-6.
 * Key frame: the most appetite-stimulating GHRP — "hunger bomb" in community parlance.
 * Cortisol + prolactin elevation same as GHRP-2. Extreme appetite is the defining distinguisher
 * vs GHRP-2. Eating disorder history is an explicit caution. Community has moved to ipamorelin.
 */

const STAT_CARDS = [
  {
    value: "Extreme",
    label: "appetite stimulation",
    sub: "GHRP-6 is known for the most intense hunger stimulation of any GHRP — the 'hunger bomb' descriptor in community use accurately reflects the ghrelin receptor effect at this compound's potency",
    note: "The appetite effect is not manageable by timing the injection (as with ipamorelin). It's intense, early, and a real practical challenge for anyone not intentionally pursuing aggressive caloric surplus.",
  },
  {
    value: "Non-selective",
    label: "cortisol + prolactin elevation",
    sub: "like GHRP-2, GHRP-6 elevates cortisol and prolactin alongside GH — the non-selective GHRP profile that ipamorelin was designed to replace",
    note: "Cortisol is catabolic. Running GHRP-6 for recovery or muscle goals means contending with a documented catabolic counter-pressure that ipamorelin avoids.",
  },
  {
    value: "Potent",
    label: "acute GH release",
    sub: "strong acute GH pulse — GHRP-6 produces robust GH release; the limitation is selectivity (cortisol/prolactin) and the extreme appetite that makes caloric control difficult",
    note: "High GH release with extreme appetite stimulation is not a favorable tradeoff for most enhancement goals. Body composition outcomes depend on net caloric management, not just GH elevation.",
  },
];

const FIT_YES = [
  "You have aggressive lean mass or bulking goals and need help driving caloric intake — GHRP-6's extreme appetite stimulation is an asset in this specific context",
  "You understand the cortisol and prolactin tradeoffs and have a specific reason to use GHRP-6 rather than ipamorelin",
  "You have no diabetes, prediabetes, or insulin resistance — GH + cortisol create compounded glucose-raising effects",
  "You have no history of eating disorders or binge eating — extreme appetite stimulation from GHRP-6 is a real risk for anyone with disordered eating patterns",
  "You have no active or recent cancer diagnosis — IGF-1 mitogenic concern applies identically to GHRP-6",
];

const FIT_NO = [
  "You have eating disorder history or a history of binge eating — GHRP-6's extreme hunger stimulation is a real trigger risk; this is explicitly listed as a caution and is non-negotiable",
  "Your goal is fat loss or caloric restriction — extreme appetite stimulation actively fights caloric control; this combination makes GHRP-6 counterproductive for weight management goals",
  "You want the GH pulse without the appetite or cortisol burden — ipamorelin provides similar GH release with manageable appetite and no cortisol elevation",
  "You have diabetes, prediabetes, or insulin resistance — GH + cortisol creates a compounded glucose-raising mechanism more significant than with ipamorelin alone",
  "You have obesity — extreme appetite stimulation in the context of obesity management goals creates direct conflict with the intervention's purpose",
  "You have an active cancer diagnosis — IGF-1 is mitogenic; oncology clearance required",
  "You're pregnant, breastfeeding, or an adolescent — hard stop",
];

const TIMELINE = [
  {
    phase: "Weeks 1–4",
    heading: "Appetite surge is the dominant early signal — not subtle",
    body: "GHRP-6's appetite stimulation is intense and begins within days. Users describe overwhelming hunger shortly after injection — this is the ghrelin receptor working at full potency. Water retention, standard early GH response, and cortisol effects (mood, sleep) may all be present simultaneously. If you're not prepared for the appetite signal, it is disruptive. Managing caloric intake is the primary practical challenge from day one.",
  },
  {
    phase: "Months 1–3",
    heading: "Net body composition depends entirely on caloric management",
    body: "GHRP-6's body composition outcomes — positive or negative — are largely determined by whether caloric intake is managed relative to the appetite stimulation. GH/IGF-1 promotes anabolism; cortisol promotes catabolism; extreme hunger drives caloric surplus. The net outcome in body composition is highly individual and depends on the user's ability to manage intake against a very strong hunger signal. Attribution is difficult even with consistent protocols.",
  },
  {
    phase: "Long-term",
    heading: "Unstudied and with additional variables",
    body: "Same as all GH-axis compounds: long-term, continuous use in healthy adults is not characterized. GHRP-6 adds the dimension of sustained extreme appetite stimulation and chronic cortisol/prolactin elevation — neither of which is characterized for long-term use in healthy adults. The community cycling convention applies. If your appetite management has been a consistent challenge during the cycle, that's a signal the compound may not fit your goals.",
  },
];

const COMPARISON = [
  {
    name: "GHRP-6",
    badge: "Research-grade",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Receptor", value: "Ghrelin receptor (GHSR1a) — same as GHRP-2 and ipamorelin" },
      { label: "Appetite", value: "Extreme — the 'hunger bomb' GHRP; more intense than GHRP-2 or ipamorelin" },
      { label: "Cortisol / prolactin", value: "Elevated — similar to GHRP-2; meaningfully more than ipamorelin" },
      { label: "Eating disorder risk", value: "Explicitly flagged — extreme appetite stimulation is a trigger risk" },
      { label: "Who still uses it", value: "Aggressive bulking protocols; some research contexts; largely replaced by ipamorelin" },
    ],
    highlight: true,
  },
  {
    name: "GHRP-2",
    badge: "Research-grade",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Receptor", value: "Ghrelin receptor — same as GHRP-6" },
      { label: "Appetite", value: "Moderate — ghrelin effect present; less extreme than GHRP-6" },
      { label: "Cortisol / prolactin", value: "Elevated — similar to GHRP-6" },
      { label: "Key distinction from GHRP-6", value: "Less extreme appetite; GHRP-2 is slightly more manageable but less studied" },
      { label: "Why it was replaced", value: "Same cortisol/prolactin selectivity problem as GHRP-6; ipamorelin solved this" },
    ],
    highlight: false,
  },
  {
    name: "Ipamorelin",
    badge: "Community standard",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Receptor", value: "Ghrelin receptor — same as GHRP-6" },
      { label: "Appetite", value: "Moderate — manageable with timing (especially bedtime injection)" },
      { label: "Cortisol / prolactin", value: "Low — the 'selective' GHRP; designed to avoid GHRP-2/GHRP-6 limitations" },
      { label: "Why it replaced GHRP-6", value: "Same GH mechanism without the appetite, cortisol, and prolactin burden" },
      { label: "Community status", value: "Current standard GHRP for enhancement protocols" },
    ],
    highlight: false,
  },
];

export default function Ghrp6OverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The GH compound that causes extreme hunger — useful for aggressive bulking, a problem for everything else.
        </div>
        <div className="reta-overview__headline-sub">
          GHRP-6 is an injectable GH-stimulating compound with a defining characteristic: intense hunger. Not &ldquo;I could use a snack&rdquo; — users describe strong cravings within 30 minutes of injecting. For people trying to eat aggressively in a bulking phase, that hunger effect can be genuinely useful. For everyone else, it&apos;s the main reason ipamorelin — which produces similar GH effects without the appetite storm — became the standard.
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
      <div className="reta-overview__section-label">GHRP-6 vs GHRP-2 vs Ipamorelin</div>
      <div className="reta-overview__compare-note">
        All three hit the ghrelin receptor. GHRP-6 has the most extreme appetite effect of the three. GHRP-2 has similar cortisol/prolactin profile with less appetite. Ipamorelin was developed specifically to provide similar GH release with manageable appetite and minimal cortisol/prolactin elevation.
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
