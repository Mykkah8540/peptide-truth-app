/**
 * Ghrp2OverviewPanel — decision-oriented overview for GHRP-2.
 * Key frame: original research GHRP — more potent GH release than ipamorelin but
 * non-selective: produces meaningful cortisol and prolactin elevation that ipamorelin avoids.
 * Community has largely moved to ipamorelin for this reason. Still used in some protocols.
 * Same GH-axis safety considerations; cortisol elevation adds catabolic risk.
 */

const STAT_CARDS = [
  {
    value: "GHRP",
    label: "ghrelin receptor agonist — the original",
    sub: "GHRP-2 was one of the first synthetic GHRPs studied in humans — it established the proof of concept that ghrelin receptor agonism could stimulate GH release in clinical settings",
    note: "Ipamorelin was developed after GHRP-2 to preserve the GH release while eliminating the cortisol and prolactin elevation. That's the 'selective' distinction.",
  },
  {
    value: "Non-selective",
    label: "cortisol + prolactin elevation",
    sub: "GHRP-2 produces meaningful cortisol and prolactin elevation alongside GH release — the opposite of ipamorelin's profile; this is the primary reason the community moved away from it",
    note: "Cortisol is catabolic — directly counterproductive for muscle preservation and recovery goals. Running a catabolic hormone alongside GH undermines the primary reason most people use GH-axis compounds.",
  },
  {
    value: "Potent",
    label: "acute GH release",
    sub: "GHRP-2 tends to produce stronger acute GH pulses than ipamorelin at comparable doses — potency is not the limiting factor; selectivity is",
    note: "More potent GH release with more cortisol/prolactin is not a better tradeoff than moderate GH release without those side effects. This is why ipamorelin became the community standard.",
  },
];

const FIT_YES = [
  "You have a specific research or protocol context where GHRP-2 is indicated — most community enhancement use has moved to ipamorelin",
  "You understand 'non-selective' means cortisol and prolactin elevation alongside GH — not just different from ipamorelin in potency",
  "You have no diabetes, prediabetes, or insulin resistance — GH counter-regulation to insulin applies; cortisol adds additional glucose-raising effect",
  "You have no active or recent cancer diagnosis — IGF-1 mitogenic concern applies identically to GHRP-2",
  "You've considered ipamorelin first and have a specific reason to use GHRP-2 instead",
];

const FIT_NO = [
  "You want the GH pulse without the cortisol/prolactin burden — that's exactly what ipamorelin was designed to provide; use ipamorelin instead",
  "You have diabetes, prediabetes, or insulin resistance — GH + cortisol creates a compounded glucose-raising effect more significant than either alone",
  "Your primary goal is muscle preservation or recovery — cortisol is catabolic; running it alongside GH partially cancels the anabolic benefit",
  "You have elevated prolactin concerns or are on medications that affect prolactin — GHRP-2's prolactin elevation adds pharmacological complexity",
  "You have an active cancer diagnosis — IGF-1 is mitogenic; oncology clearance required",
  "You're pregnant, breastfeeding, or an adolescent — hard stop for all GH-axis compounds",
];

const TIMELINE = [
  {
    phase: "Weeks 1–4",
    heading: "GH effects plus cortisol/prolactin burden — not just water retention",
    body: "The early effects of GHRP-2 include the standard GH-axis responses (water retention, some appetite stimulation) plus the cortisol and prolactin effects that distinguish it from ipamorelin. Elevated cortisol during weeks 1–4 can manifest as mood changes, sleep disruption, and some water retention independent of the GH mechanism. Don't assess effectiveness at this stage — the GH/IGF-1 body composition effects accumulate over months.",
  },
  {
    phase: "Months 1–3",
    heading: "The cortisol tradeoff becomes the evaluation question",
    body: "If you're using GHRP-2 for muscle recovery or body composition, the cortisol elevation is working against you throughout this window. The GH/IGF-1 anabolic signal and the cortisol catabolic signal are running simultaneously — the net effect on body composition is less favorable than ipamorelin for these goals. Sleep quality monitoring is important: cortisol affects sleep architecture and elevated cortisol from GHRP-2 can worsen the recovery that the GH effect is trying to support.",
  },
  {
    phase: "Long-term",
    heading: "No safety map, compounded by cortisol/prolactin chronicity",
    body: "Long-term, continuous GH secretagogue use in healthy adults is unstudied — for GHRP-2 or any GHRP. Add sustained cortisol and prolactin elevation to that uncertainty and the risk profile is less characterized than ipamorelin. The community cycling convention reflects reasonable caution. If you're running GHRP-2 continuously for months without a break, you're outside the reference experience base on multiple dimensions.",
  },
];

const COMPARISON = [
  {
    name: "GHRP-2",
    badge: "Research-grade",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Receptor", value: "Ghrelin receptor (GHSR1a) — same as ipamorelin and GHRP-6" },
      { label: "Cortisol / prolactin", value: "Elevated — meaningfully more than ipamorelin; similar to GHRP-6" },
      { label: "GH potency", value: "Strong — often more potent acutely than ipamorelin" },
      { label: "Selectivity", value: "Non-selective — the cortisol/prolactin elevation is the defining limitation" },
      { label: "Why people still use it", value: "Research legacy; some protocols; higher acute GH in specific contexts" },
    ],
    highlight: true,
  },
  {
    name: "GHRP-6",
    badge: "Research-grade",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Receptor", value: "Ghrelin receptor — same family as GHRP-2" },
      { label: "Cortisol / prolactin", value: "Elevated — similar to GHRP-2" },
      { label: "Appetite", value: "Extreme hunger — stronger than GHRP-2; the 'hunger bomb' GHRP" },
      { label: "GH potency", value: "Strong acute GH release" },
      { label: "Key distinction from GHRP-2", value: "More extreme appetite; GHRP-6 is specifically known for overeating risk" },
    ],
    highlight: false,
  },
  {
    name: "Ipamorelin",
    badge: "Community standard",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Receptor", value: "Ghrelin receptor — same as GHRP-2/GHRP-6" },
      { label: "Cortisol / prolactin", value: "Low — the 'selective' GHRP; less cortisol/prolactin than GHRP-2 or GHRP-6" },
      { label: "Appetite", value: "Moderate — ghrelin receptor effect present but manageable with timing" },
      { label: "Why it replaced GHRP-2/GHRP-6", value: "Same GH release mechanism without the cortisol/prolactin burden" },
      { label: "Community status", value: "Current standard GHRP for enhancement protocols" },
    ],
    highlight: false,
  },
];

export default function Ghrp2OverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          An early injectable GH-stimulating compound — works, but also elevates stress hormones. Ipamorelin replaced it for a reason.
        </div>
        <div className="reta-overview__headline-sub">
          GHRP-2 was one of the first compounds developed to boost GH without injecting GH itself — and it works. The problem: it also elevates cortisol and prolactin, which are stress hormones most people aren&apos;t trying to raise. That side effect profile is exactly why ipamorelin was developed as a cleaner alternative. If you&apos;re researching injectable GH options, ipamorelin is almost certainly the better starting point.
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
      <div className="reta-overview__section-label">GHRP-2 vs GHRP-6 vs Ipamorelin</div>
      <div className="reta-overview__compare-note">
        All three hit the ghrelin receptor. GHRP-2 and GHRP-6 are the older, non-selective versions — they produce more cortisol and prolactin than ipamorelin. GHRP-6 additionally has the strongest appetite stimulation of any GHRP. Ipamorelin was developed to preserve the GH benefit while eliminating these tradeoffs.
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
