/**
 * Cjc1295OverviewPanel — decision-oriented overview for CJC-1295.
 * Key frame: this is a GH-axis compound with actual human interventional data.
 * It changes endocrine physiology systemically — glucose, water balance, sleep, IGF-1.
 * The DAC vs no-DAC distinction is critical for understanding half-life and risk pattern.
 */

const STAT_CARDS = [
  {
    value: "GHRH",
    label: "analog class",
    sub: "growth hormone releasing hormone analog — amplifies endogenous GH pulses",
    note: "Does not add exogenous GH — works by extending the hypothalamic signal that triggers pituitary GH release",
  },
  {
    value: "2006",
    label: "human interventional study",
    sub: "PMID 16352683 — GH and IGF-1 elevations confirmed in healthy adults",
    note: "One of few peptides with published human endocrine evidence; enhancement outcomes and long-term safety remain unestablished",
  },
  {
    value: "DAC / no DAC",
    label: "two critically different variants",
    sub: "CJC-1295 with DAC: half-life of days; without DAC: hours — very different pharmacokinetics",
    note: "The variant determines dosing frequency, accumulation risk, and side effect pattern — confirm which you have before starting",
  },
];

const FIT_YES = [
  "You have recovery, sleep quality, or body composition goals and understand they operate through endocrine physiology — not acute pharmacology",
  "You have no diabetes, prediabetes, insulin resistance, or fasting glucose concerns — GH is counter-regulatory to insulin",
  "You have no active or recent cancer diagnosis — GH/IGF-1 is a mitogenic signaling axis",
  "You know which variant you have (DAC or no DAC) and what that means for dosing frequency",
  "You're sourcing from a verified supplier with third-party CoA, and not relying on community protocol alone for safety information",
];

const FIT_NO = [
  "You have diabetes, prediabetes, or insulin resistance — GH elevation can worsen glucose control; this is the most common metabolic risk",
  "You have an active cancer diagnosis, are in active treatment, or have a high-risk cancer history — GH/IGF-1 is directly mitogenic; oncology clearance is required",
  "You're pregnant, breastfeeding, or an adolescent — endocrine setpoint disruption during development is a hard stop",
  "You don't know whether your product is DAC or no-DAC — the dosing error risk from confusing the two is real",
  "You expect fast, dramatic body composition changes — this mechanism is cumulative and gradual, not acute",
  "You're stacking multiple GH-axis compounds simultaneously without understanding the additive endocrine load",
];

const TIMELINE = [
  {
    phase: "Weeks 1–4",
    heading: "Orientation — water retention and sleep changes come first",
    body: "The first responses to GH-axis stimulation are often water retention (mild edema, especially in hands and feet) and changes in sleep quality or depth. These are expected early effects, not red flags unless significant. Body composition changes operate through IGF-1, which takes weeks to accumulate. Don't judge efficacy at week 2.",
  },
  {
    phase: "Months 1–3",
    heading: "The honest evaluation window",
    body: "IGF-1 elevation is the downstream mediator of most body composition effects. It takes sustained GH elevation to meaningfully shift IGF-1. Recovery quality, sleep depth, and progressive training performance are the primary subjective signals during this window. Attribution remains difficult — CJC-1295 is almost always used alongside training programs, nutrition changes, and often other peptides.",
  },
  {
    phase: "Long-term",
    heading: "Unstudied territory — cycling is the community convention",
    body: "Long-term, continuous GH-axis stimulation in healthy adults is not characterized in clinical trials. The community convention of cycling (on/off periods of 8–12 weeks) isn't based on documented safety data — it reflects reasonable caution about continuous endocrine intervention. If you're running it continuously for 6+ months, you're outside the reference experience base.",
  },
];

const COMPARISON = [
  {
    name: "CJC-1295 (no DAC)",
    badge: "Research-grade",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Half-life", value: "~30 minutes (biologically active); extended effect via albumin binding" },
      { label: "Dosing frequency", value: "Daily or multiple times per week — shorter window" },
      { label: "GH release pattern", value: "Pulsatile — preserves natural GH pulse rhythm" },
      { label: "Common stack", value: "Ipamorelin — synergistic at different receptor levels" },
      { label: "Primary concern", value: "Glucose, edema, cancer history, adolescent endocrine risk" },
    ],
    highlight: true,
  },
  {
    name: "CJC-1295 with DAC",
    badge: "Research-grade",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Half-life", value: "~6–8 days — dramatically extended via drug affinity complex" },
      { label: "Dosing frequency", value: "Once or twice per week — but accumulates" },
      { label: "GH release pattern", value: "More continuous bleed — blunts natural pulsatility over time" },
      { label: "Accumulation risk", value: "Higher — mistakes take longer to resolve" },
      { label: "Identity risk", value: "Often mislabeled or confused with no-DAC in unregulated market" },
    ],
    highlight: false,
  },
  {
    name: "Ipamorelin",
    badge: "Research-grade",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GHRP / ghrelin mimetic — different receptor from CJC-1295" },
      { label: "Stack rationale", value: "Synergistic: CJC amplifies GHRH signal; ipa amplifies ghrelin-driven release" },
      { label: "Effect on cortisol", value: "Relatively selective — less cortisol/prolactin elevation than older GHRPs" },
      { label: "Combined GH effect", value: "Greater than either alone — additive, not just additive load" },
      { label: "Cancer concern", value: "Shared — GH/IGF-1 axis concern applies to the stack" },
    ],
    highlight: false,
  },
];

export default function Cjc1295OverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A growth hormone booster with real human evidence — and real consequences for your hormonal system.
        </div>
        <div className="reta-overview__headline-sub">
          CJC-1295 prompts your body to release more growth hormone — that&apos;s the goal, and it works. But this isn&apos;t a supplement that gently nudges natural function. It actually shifts how your hormonal system operates, which is why the safety picture here is more consequential than most research-grade peptides. Two versions exist — with and without DAC — that behave very differently. Know which one you&apos;re using, and know your metabolic baseline before you start.
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
      <div className="reta-overview__section-label">CJC-1295 no-DAC vs DAC vs Ipamorelin</div>
      <div className="reta-overview__compare-note">
        The DAC vs no-DAC distinction is not a minor formulation detail — it changes half-life from hours to days, altering dosing frequency, accumulation risk, and GH pulse pattern. The ipamorelin stack is the most common community protocol because the two peptides hit the GH axis from different receptor angles.
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
