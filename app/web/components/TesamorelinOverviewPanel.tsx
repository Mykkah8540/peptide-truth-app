/**
 * TesamorelinOverviewPanel — decision-oriented overview for Tesamorelin.
 * Key frame: the only FDA-approved GHRH analog currently on the US market (Egrifta).
 * Approved for HIV-associated lipodystrophy. RCT evidence for visceral fat in that
 * specific population. Off-label enhancement use extrapolates from HIV-lipodystrophy data.
 * GHRH mechanism same as CJC-1295 and sermorelin. Arthralgia/myalgia are distinctive.
 */

const STAT_CARDS = [
  {
    value: "FDA-approved",
    label: "for HIV-associated lipodystrophy",
    sub: "tesamorelin (Egrifta) is the only FDA-approved GHRH analog on the US market — approved specifically for excess visceral fat in HIV patients on antiretroviral therapy",
    note: "Approval is narrow and specific. The enhancement community uses tesamorelin off-label, extrapolating from HIV-lipodystrophy RCT data. The mechanism transfers; the outcome data doesn't. The FDA pathway means prescribing is available — not that off-label use has the same evidence base as the approved indication.",
  },
  {
    value: "RCT-supported",
    label: "visceral fat reduction (HIV population)",
    sub: "tesamorelin has controlled trial evidence for visceral fat reduction — the strongest specific-outcome evidence of any GHRH analog; in HIV-lipodystrophy patients, visceral fat reduction was statistically significant and clinically meaningful",
    note: "The RCT data is real and the strongest specific-outcome evidence of any GHRH analog. It's also population-specific — HIV patients with lipodystrophy on antiretrovirals. Whether the visceral fat mechanism transfers to healthy adults is plausible but not established in controlled conditions.",
  },
  {
    value: "GHRH receptor",
    label: "agonist — same as CJC-1295, sermorelin",
    sub: "tesamorelin acts on the GHRH receptor to stimulate pulsatile GH release — the same fundamental mechanism as CJC-1295 and sermorelin; GH/IGF-1 axis considerations apply identically",
    note: "Same mechanism means same safety gates: metabolic baseline, cancer history, thyroid therapy. Tesamorelin's distinctive clinical features vs CJC-1295 are the FDA approval, the visceral fat RCT data, and the arthralgia/myalgia side effect profile from the prescribing information.",
  },
];

const FIT_YES = [
  "You have HIV-associated lipodystrophy and excess visceral fat — this is the approved indication with RCT evidence",
  "You have access to a physician willing to prescribe for off-label use and you understand the on-label vs off-label evidence gap",
  "Your primary goal is visceral fat reduction and you accept that the supporting evidence is from an HIV population, not healthy adults",
  "You have no diabetes or uncontrolled diabetes — glucose dysregulation is a documented concern per the prescribing information",
  "You have no active or recent cancer diagnosis — IGF-1 mitogenic concern applies identically to all GHRH analogs",
  "You can monitor for arthralgia and myalgia — the most distinctive side effects from the clinical trials",
];

const FIT_NO = [
  "You want the most established community GHRH protocol — CJC-1295 with ipamorelin has more community use data for general GH augmentation",
  "You want a gray-market research compound — tesamorelin is a prescription drug; legitimate access requires a physician",
  "You have uncontrolled diabetes or significant insulin resistance — glucose dysregulation is flagged in the prescribing information",
  "You have an active cancer diagnosis — IGF-1 is mitogenic; oncology clearance required",
  "You have significant arthritis or joint disease — arthralgia is a documented and meaningful side effect",
  "You're pregnant, breastfeeding, or an adolescent — hard stop",
];

const TIMELINE = [
  {
    phase: "Weeks 1–12",
    heading: "Visceral fat reduction is the primary measurable outcome — assessed at 3 months in trials",
    body: "In the HIV-lipodystrophy RCTs, visceral fat reduction was measured at 26 weeks with significant changes observable by 12 weeks. Arthralgia, myalgia, and fluid retention are the most common early side effects per prescribing information. GH/IGF-1 elevation begins immediately. Water retention is the standard early GH response. If arthralgia or joint pain develops significantly, dose reduction or discontinuation was used in the trials.",
  },
  {
    phase: "Months 3–6",
    heading: "Peak visceral fat effect in the trial data",
    body: "The Phase III trials showed statistically significant visceral fat reduction at 26 weeks vs placebo. In healthy adults, whether the same trajectory applies is extrapolated — not proven. The GH/IGF-1 anabolic effects follow the same timeline as other GHRH analogs. Unlike hexarelin, tesamorelin doesn't have a significant tachyphylaxis problem — the GHRH receptor is more resistant to desensitization than the ghrelin receptor.",
  },
  {
    phase: "Long-term",
    heading: "Same uncertainty as all GH-axis compounds, plus post-discontinuation note",
    body: "Long-term continuous use in healthy adults is unstudied — same as CJC-1295 and sermorelin. One documented pattern from the HIV trials: visceral fat returned after discontinuation, suggesting ongoing use is needed to maintain the effect. Whether cycling protocols can preserve gains or whether continuous use is required for tesamorelin's fat effects is not characterized in off-label contexts.",
  },
];

const COMPARISON = [
  {
    name: "Tesamorelin",
    badge: "FDA-approved (Egrifta)",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Receptor", value: "GHRH receptor — same as CJC-1295 and sermorelin" },
      { label: "Regulatory status", value: "FDA-approved for HIV-associated lipodystrophy (Egrifta)" },
      { label: "Evidence", value: "RCT data for visceral fat in HIV-lipodystrophy — strongest specific-outcome evidence of any GHRH analog" },
      { label: "Distinctive side effects", value: "Arthralgia and myalgia — more prominent in tesamorelin trial data vs CJC-1295" },
      { label: "Access", value: "Prescription required; available via compounding pharmacy off-label" },
    ],
    highlight: true,
  },
  {
    name: "CJC-1295",
    badge: "Gray-market",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Receptor", value: "GHRH receptor — same mechanism as tesamorelin" },
      { label: "Regulatory status", value: "No approved indication; research-grade compound" },
      { label: "Evidence", value: "Human GH/IGF-1 elevation confirmed (2006); enhancement outcomes not trialed" },
      { label: "Distinctive features", value: "DAC variant for sustained release; no arthralgia prominence in community data" },
      { label: "Community status", value: "Primary community GHRH analog for GH augmentation protocols" },
    ],
    highlight: false,
  },
  {
    name: "Sermorelin",
    badge: "Prescription (compounding)",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Receptor", value: "GHRH receptor — same mechanism" },
      { label: "Regulatory status", value: "FDA-approved for pediatric GHD (discontinued), available via compounding" },
      { label: "Evidence", value: "Human GH release confirmed; GHD patient data; enhancement outcome data absent" },
      { label: "Distinctive features", value: "Shorter half-life than CJC-1295; prescription pathway via anti-aging clinics" },
      { label: "Community status", value: "Prescription-context GHRH analog; often paired with ipamorelin" },
    ],
    highlight: false,
  },
];

export default function TesamorelinOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The only FDA-approved GHRH analog — RCT evidence for visceral fat in HIV patients, same GH-axis mechanism as CJC-1295.
        </div>
        <div className="reta-overview__headline-sub">
          Tesamorelin (Egrifta) is unique among GHRH analogs: it&apos;s the only one with FDA approval and randomized controlled trial evidence — for visceral fat reduction in HIV-associated lipodystrophy. The enhancement community uses it off-label, extrapolating from this specific population. The mechanism is the same as CJC-1295; the evidence hierarchy is higher for the narrow approved indication, and no better for the general enhancement use case.
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
      <div className="reta-overview__section-label">Tesamorelin vs CJC-1295 vs Sermorelin</div>
      <div className="reta-overview__compare-note">
        All three act on the GHRH receptor to stimulate GH release. Tesamorelin has FDA approval and RCT data for its specific indication — no GHRH analog has this for general enhancement. CJC-1295 is the community standard for gray-market GH augmentation with the most modern community use data. Sermorelin occupies a prescription-context middle ground with a shorter half-life.
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
