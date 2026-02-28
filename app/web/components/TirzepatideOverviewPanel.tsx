/**
 * TirzepatideOverviewPanel — decision-oriented overview for Tirzepatide (Mounjaro / Zepbound).
 * Key frame: the first dual GLP-1/GIP agonist — meaningfully more weight loss than semaglutide.
 * ~20-22% body weight reduction in SURMOUNT-1 (15mg, 72 weeks).
 * The "twincretin" mechanism produces a more complete metabolic effect than GLP-1 alone.
 */

const STAT_CARDS = [
  {
    value: "GLP-1 + GIP",
    label: "dual receptor agonist — the twincretin mechanism",
    sub: "tirzepatide agonizes both the GLP-1 receptor (appetite, insulin, satiety) and the GIP receptor (direct adipose effect, insulin sensitization, less nausea than GLP-1 alone). The dual mechanism is why it produces more weight loss than semaglutide — two synchronized appetite and metabolic pathways, not one",
    note: "The GIP receptor adds a direct adipose tissue effect and appears to attenuate the nausea associated with GLP-1 agonism — tirzepatide users generally report less nausea than comparable semaglutide doses. The lower nausea rate is mechanistically explainable, not just anecdotal.",
  },
  {
    value: "~22%",
    label: "body weight reduction — SURMOUNT-1 (15mg, 72 weeks)",
    sub: "in SURMOUNT-1 (n=2,539, 72 weeks), 15mg tirzepatide achieved ~22.5% mean body weight reduction vs ~2.5% placebo — meaningfully greater than the ~15% benchmark from semaglutide's STEP 1 trial",
    note: "One-third of participants in SURMOUNT-1 achieved ≥25% weight loss at the 15mg dose — crossing into territory previously associated only with bariatric surgery. That ceiling is relevant context when deciding between semaglutide and tirzepatide for ambitious weight loss goals.",
  },
  {
    value: "Weekly",
    label: "subcutaneous injection — titration from 2.5mg to 15mg",
    sub: "tirzepatide starts at 2.5mg and titrates upward every 4 weeks toward the maintenance dose (5mg, 10mg, or 15mg). The auto-injector pen design is similar to semaglutide. Route is once-weekly subcutaneous injection only — no oral formulation is currently approved",
    note: "The titration schedule is how GI side effects are managed — do not accelerate it. Most people find nausea and GI tolerance more manageable with tirzepatide than with semaglutide at equivalent clinical effect.",
  },
  {
    value: "FDA ✓",
    label: "approved for T2D (Mounjaro) and obesity (Zepbound)",
    sub: "Mounjaro was approved for type 2 diabetes in 2022; Zepbound for chronic weight management in 2023. Tirzepatide is newer than semaglutide by several years — the evidence base is strong but the post-market long-term real-world experience is less extensive than semaglutide",
    note: "FDA approval means formal prescribing information including stated contraindications (thyroid C-cell tumor history, MEN2, pancreatitis history) and a required titration schedule — the same regulatory framework as semaglutide.",
  },
];

const FIT_YES = [
  "Your goal is meaningful weight loss and you want a step up from semaglutide — tirzepatide's ~22% vs semaglutide's ~15% is a meaningful clinical difference for people who want to maximize outcome",
  "You tried semaglutide and found the nausea difficult — the GIP component of tirzepatide appears to attenuate GLP-1-mediated nausea; tirzepatide users consistently report lower nausea rates than semaglutide at equivalent effect",
  "You have type 2 diabetes and are looking for a single drug that addresses both glycemic control and weight — tirzepatide demonstrates superior HbA1c reduction vs semaglutide in the SURPASS-2 head-to-head trial",
  "You have the metabolic profile where a ceiling of ~22% is meaningful — people with significant obesity-related metabolic dysfunction tend to see the largest absolute weight changes",
  "You can access Zepbound with insurance or Mounjaro for T2D — the FDA approval pathway and active commercial availability matters for access and cost",
  "You have no personal or family history of medullary thyroid carcinoma or MEN2 syndrome — same hard stop as semaglutide; the thyroid C-cell signal in animal studies applies to the entire class",
];

const FIT_NO = [
  "You have personal or family history of medullary thyroid carcinoma or MEN2 syndrome — same prescribing information contraindication as semaglutide; applies to the entire GLP-1 class",
  "You have a history of pancreatitis — GLP-1 drugs are associated with pancreatitis risk; personal history is a prescribing information contraindication for tirzepatide",
  "You want the deepest evidence base before committing to a compound — semaglutide has significantly more published trial data and post-market real-world experience than tirzepatide; tirzepatide is newer",
  "You are pregnant or planning pregnancy — must be discontinued before conception; animal reproductive toxicology data warrants caution",
  "You are on insulin or sulfonylureas without glucose monitoring in place — hypoglycemia risk when GLP-1 drugs are combined with insulin or sulfonylureas; glucose monitoring is required",
  "You have severe GI disease (severe gastroparesis, severe IBD, prior GI surgery) — the GI motility effects of tirzepatide require specific physician guidance in these populations",
];

const TIMELINE = [
  {
    phase: "Weeks 1–20",
    heading: "Titration phase — nausea is usually milder than semaglutide, but the protocol still matters",
    body: "Tirzepatide's titration starts at 2.5mg weekly and escalates to 5mg, then 10mg, then 15mg at 4-week intervals. Most people find nausea significantly less intense than with semaglutide — the GIP receptor co-agonism appears to reduce the severity of GLP-1-associated nausea. That said: nausea is still common in the first month and at escalation points. The protocol is non-negotiable — rushing the titration replicates the same tolerability problems semaglutide users encounter when they escalate too fast.",
  },
  {
    phase: "Months 3–9",
    heading: "The meaningful weight loss window — more consistent than semaglutide",
    body: "The ~22% average in SURMOUNT-1 was achieved over 72 weeks, but the most dramatic loss typically occurs in months 3-9 at or approaching maintenance dose. One-third of participants achieved ≥25% weight loss, crossing into bariatric surgery outcome territory. Protein intake is actively critical — at the degree of appetite suppression tirzepatide produces, some patients eat so little that lean mass loss becomes a real clinical concern without deliberate protein anchoring. Resistance training is non-optional for people pursuing fat loss rather than scale weight.",
  },
  {
    phase: "Long-term",
    heading: "Sustained outcomes — and the same cessation rebound question as semaglutide",
    body: "SURMOUNT-4 data (re-randomization to placebo after 36 weeks on tirzepatide) showed ~14% weight regain vs placebo within 52 weeks off drug — essentially the same cessation rebound pattern as semaglutide. This is a class effect, not a tirzepatide-specific problem. The cardiovascular outcome trials for tirzepatide (SURPASS-CVOT) are ongoing — the SELECT trial evidence for semaglutide doesn't automatically extend to tirzepatide yet. Long-term tirzepatide use is likely necessary for maintained weight loss in most people who respond well.",
  },
];

const COMPARISON = [
  {
    name: "Tirzepatide",
    badge: "GLP-1 + GIP / Current Leader",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Mechanism", value: "GLP-1R + GIPR dual agonist — twincretin, synergistic metabolic effect" },
      { label: "Weight loss", value: "~22% body weight — SURMOUNT-1 (15mg, n=2,539, 72 weeks)" },
      { label: "Nausea profile", value: "Lower than semaglutide — GIP component attenuates GLP-1 nausea" },
      { label: "T2D glycemic control", value: "Superior to semaglutide in SURPASS-2 head-to-head" },
      { label: "Key limitation", value: "Newer than semaglutide — less post-market real-world data; CV outcome trial pending" },
    ],
    highlight: true,
  },
  {
    name: "Semaglutide",
    badge: "GLP-1 RA / Benchmark",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GLP-1 receptor agonist — the single-receptor standard" },
      { label: "Weight loss", value: "~15% body weight — STEP 1 (2.4mg, n=1,961, 68 weeks)" },
      { label: "Nausea profile", value: "More common than tirzepatide — ~40-44% in Wegovy trials" },
      { label: "Evidence base", value: "Deepest of any approved weight drug — 7+ years of post-market data" },
      { label: "Key advantage", value: "SELECT CV outcome trial data; longer post-market safety record" },
    ],
    highlight: false,
  },
  {
    name: "Retatrutide",
    badge: "GLP-1 + GIP + Glucagon",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Triple agonism: GLP-1R + GIPR + GCGR — adds glucagon-driven energy expenditure" },
      { label: "Weight loss", value: "~24% body weight — Phase 2 only (n=338, 48 weeks)" },
      { label: "Nausea profile", value: "Phase 2 tolerability data — comparable to tirzepatide" },
      { label: "Approval status", value: "Phase 3 trials ongoing — not yet FDA-approved" },
      { label: "Key limitation", value: "No approved formulation; Phase 3 and long-term safety data pending" },
    ],
    highlight: false,
  },
];

export default function TirzepatideOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          More weight loss than semaglutide, with better nausea tolerance — the current best-in-class for most people.
        </div>
        <div className="reta-overview__headline-sub">
          Tirzepatide (Mounjaro for T2D, Zepbound for weight) hits two receptors instead of one — GLP-1 and GIP — and that dual activation produces ~22% body weight reduction vs semaglutide&apos;s ~15%. One-third of SURMOUNT-1 participants lost ≥25%, crossing into bariatric surgery territory. What most people don&apos;t expect: tirzepatide typically causes less nausea than semaglutide at equivalent clinical effect. The GIP receptor co-agonism appears to attenuate the nausea associated with GLP-1 receptor activation. The meaningful trade-off compared to semaglutide: it&apos;s newer, so the long-term real-world data is thinner — and the cardiovascular outcome trial results are still pending.
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
      <div className="reta-overview__section-label">Tirzepatide vs Semaglutide vs Retatrutide</div>
      <div className="reta-overview__compare-note">
        The GLP-1 class has a clear potency hierarchy: semaglutide (GLP-1 only, ~15%) → tirzepatide (GLP-1 + GIP, ~22%) → retatrutide (GLP-1 + GIP + glucagon, ~24%). Each step adds a receptor and more weight loss, but also less long-term evidence. Tirzepatide is the current sweet spot: substantially more effective than semaglutide, FDA-approved, and with enough post-market experience to feel established.
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
