/**
 * NadPlusOverviewPanel — decision-oriented overview for the NAD+ PDP.
 * Answers: What is this? Why do people care? Is it right for me? What should I expect?
 */

const STAT_CARDS = [
  {
    value: "~50%",
    label: "NAD+ decline by age 60",
    sub: "vs. levels in your 20s",
    note: "Tissue studies — not all tissues equal",
  },
  {
    value: "OTC",
    label: "globally available",
    sub: "no prescription needed",
    note: "IV infusion requires clinical setting",
  },
  {
    value: "30+",
    label: "human studies",
    sub: "mostly small, short-duration",
    note: "No large RCTs yet — mechanism outpaces proof",
  },
];

const FIT_YES = [
  "You're interested in longevity biology and want to address age-related cellular energy decline",
  "You're experiencing fatigue or cognitive fog and are open to an OTC option with a plausible mechanism",
  "You understand the evidence is mechanistically strong but clinically thin — and you're okay with that",
  "You're exploring IV infusion for a more direct route and can tolerate an uncomfortable initial experience",
  "You're building a longevity stack and want a foundational molecule rather than an acute effect",
];

const FIT_NO = [
  "You expect dramatic, fast results — NAD+ works subtly and cumulatively, if it works at all for you",
  "You're currently on PARP inhibitor chemotherapy (olaparib, niraparib, rucaparib) — this is a direct clinical conflict",
  "You have an active cancer diagnosis — NAD+'s role in tumor metabolism is under active investigation",
  "You want validated clinical endpoints — large RCTs confirming longevity or cognitive outcomes don't exist yet",
  "You're already taking NMN or NR at therapeutic doses — stacking all three is redundant, not additive",
];

const TIMELINE = [
  {
    phase: "Weeks 1–4",
    heading: "Orientation — route matters",
    body: "IV infusion: expect significant flushing and pressure sensations, especially early. Slow the drip rate — this makes it manageable. Oral: no acute effects are typical. This isn't a drug that announces itself. The mechanism is cellular and cumulative.",
  },
  {
    phase: "Months 1–3",
    heading: "Subjective window",
    body: "If NAD+ is doing something you can feel, energy and cognitive clarity tend to be the first signals — though highly variable. Most users describe effects as 'subtle' or 'hard to attribute.' This is where expectations need to stay calibrated: absence of dramatic effect isn't evidence of failure.",
  },
  {
    phase: "Long-term",
    heading: "The real rationale",
    body: "The strongest argument for NAD+ supplementation isn't what you'll feel next month — it's maintaining cellular repair capacity, sirtuin signaling, and mitochondrial efficiency over years. That's a hard outcome to measure in a personal experiment, which is part of why the clinical evidence is still thin.",
  },
];

const COMPARISON = [
  {
    name: "NAD+ (direct)",
    badge: "OTC",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "How taken", value: "IV infusion or high-dose oral" },
      { label: "Bioavailability (oral)", value: "Uncertain — gut degrades much of it", note: "IV bypasses this" },
      { label: "Evidence quality", value: "Mechanism: strong. Outcomes: thin." },
      { label: "Cost", value: "IV: expensive ($100–300/session). Oral: moderate." },
      { label: "Access", value: "IV requires clinic. Oral: widely available." },
    ],
    highlight: true,
  },
  {
    name: "NMN",
    badge: "OTC",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "How taken", value: "Oral capsule or sublingual" },
      { label: "Bioavailability (oral)", value: "Better than NAD+ — converts to NAD+ intracellularly" },
      { label: "Evidence quality", value: "Somewhat better human data than direct NAD+" },
      { label: "Cost", value: "Moderate — widely available" },
      { label: "Access", value: "OTC supplement" },
    ],
    highlight: false,
  },
  {
    name: "NR (Nicotinamide Riboside)",
    badge: "OTC",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "How taken", value: "Oral capsule" },
      { label: "Bioavailability (oral)", value: "Confirmed to raise blood NAD+ in humans" },
      { label: "Evidence quality", value: "Most human bioavailability data of the three" },
      { label: "Cost", value: "Moderate — branded products (Tru Niagen)" },
      { label: "Access", value: "OTC supplement" },
    ],
    highlight: false,
  },
];

export default function NadPlusOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          NAD+ declines with age. The science is real. The human outcome data is still catching up.
        </div>
        <div className="reta-overview__headline-sub">
          Strong mechanistic rationale. Thin clinical trial data. OTC access. The gap between those things is what you&apos;re navigating.
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
      <div className="reta-overview__section-label">NAD+ vs its precursors</div>
      <div className="reta-overview__compare-note">
        NMN and NR don&apos;t replace NAD+ directly — they convert to it inside cells. These three are often compared because people want to know which to take. The answer is genuinely unsettled.
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
                  {"note" in row && row.note && (
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
