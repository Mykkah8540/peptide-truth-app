/**
 * Tb500OverviewPanel — decision-oriented overview for TB-500.
 * Key frame: TB-500 is a market name for a Tβ4-related fragment.
 * Evidence is largely inferred from full thymosin beta-4 biology — not direct TB-500 human data.
 * Cancer history caution is elevated. Sourcing confusion is the defining real-world variable.
 */

const STAT_CARDS = [
  {
    value: "Tβ4 frag.",
    label: "mechanistic origin",
    sub: "marketed as a thymosin beta-4 fragment (typically the actin-binding domain)",
    note: "Tβ4 and TB-500 are not identical — most evidence comes from full Tβ4 biology, not TB-500 as sold",
  },
  {
    value: "30+ yrs",
    label: "of Tβ4 preclinical research",
    sub: "extensive animal data on thymosin beta-4 biology across multiple tissue types",
    note: "Human trial data for TB-500 specifically: essentially absent — evidence is inferred, not direct",
  },
  {
    value: "0",
    label: "regulatory approvals globally",
    sub: "unapproved peptide in all major jurisdictions",
    note: "No pharmaceutical standard, no approved formulation or dose — research-grade only",
  },
];

const FIT_YES = [
  "You're focused on soft tissue, tendon, or recovery goals and have plateaued with conventional approaches",
  "You understand the evidence is inferred from Tβ4 biology — not direct TB-500 human outcome trials",
  "You're using it as a complement to BPC-157, with complementary (not redundant) mechanisms in mind",
  "You're sourcing from suppliers that provide independent third-party certificates of analysis (CoA)",
  "You've set a clear, specific hypothesis with a defined evaluation window before starting",
];

const FIT_NO = [
  "You have an active cancer diagnosis or are in active cancer treatment — tissue-growth signaling creates meaningful oncology interaction uncertainty; stop and consult first",
  "You're on anticoagulants, antiplatelets, or have a diagnosed bleeding disorder — mechanism may create additive bleeding risk",
  "You're pregnant, breastfeeding, or an adolescent — developmental risk is flagged; no safety threshold exists",
  "You expect pharmaceutical-grade certainty — direct human evidence for TB-500 as sold is essentially nonexistent",
  "You're sourcing from unverified vendors — product identity confusion (Tβ4 vs. fragments vs. counterfeits) makes quality the dominant variable",
  "You're stacking multiple unverified compounds simultaneously without a system for tracking each separately",
];

const TIMELINE = [
  {
    phase: "Weeks 1–4",
    heading: "Orientation — tolerability and sourcing validation",
    body: "TB-500's mechanism (if active) is gradual, not acute. The first month is about confirming tolerability and that your source is what it claims to be. No legitimate outcome signal should be expected in week 1. Injectable protocols report subjective improvements over weeks — not days. Oral route is less clearly defined for TB-500 than for BPC-157.",
  },
  {
    phase: "Months 1–2",
    heading: "The honest evaluation window",
    body: "Soft tissue comfort, recovery trajectory, and joint mobility are the primary signals for TB-500 use. The attribution challenge is significant — TB-500 is almost always used alongside rehab, rest, BPC-157, or other interventions. If something is improving, knowing what's causing it requires that you've isolated your variables as much as possible.",
  },
  {
    phase: "Long-term",
    heading: "No safety map exists",
    body: "Long-term human data for TB-500 doesn't exist. This is a literal absence of information — not a calculated low-risk estimate. Community protocols typically cycle (4–8 weeks on, then off) by convention rather than by any documented safety rationale. If you're running it continuously, you're outside the reference experience base entirely.",
  },
];

const COMPARISON = [
  {
    name: "TB-500",
    badge: "Research-grade",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanistic origin", value: "Tβ4 fragment — actin regulation, anti-inflammatory, angiogenesis" },
      { label: "Primary use case", value: "Soft tissue, tendon, and joint recovery" },
      { label: "Route", value: "Subcutaneous injection (primary)" },
      { label: "Evidence base", value: "Inferred from Tβ4 biology — no direct TB-500 human RCT" },
      { label: "Unique caution", value: "Cancer history / active treatment — tissue-growth signaling concern" },
    ],
    highlight: true,
  },
  {
    name: "BPC-157",
    badge: "Research-grade",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanistic origin", value: "Gastric protein-derived pentadecapeptide" },
      { label: "Primary use case", value: "Tendon, soft tissue, GI healing" },
      { label: "Route", value: "Injectable (systemic) or oral (GI-targeted)" },
      { label: "Evidence base", value: "30+ yrs animal data; one registered Phase I; no published human RCT" },
      { label: "Unique caution", value: "Sourcing quality and NSAID feedback loop" },
    ],
    highlight: false,
  },
  {
    name: "BPC-157 + TB-500 stack",
    badge: "Community protocol",
    badgeColor: "#2c3e52",
    badgeBg: "rgba(44,62,82,0.08)",
    rows: [
      { label: "Rationale", value: "Complementary — BPC targets healing environment; TB-500 targets actin/inflammation" },
      { label: "Stack logic", value: "Not redundant — different mechanism pathways for the same recovery goal" },
      { label: "Common use", value: "Injury recovery, tendinopathy, return-to-training protocols" },
      { label: "Evidence", value: "No stack-specific human trial exists — stacking is community convention" },
      { label: "Quality risk", value: "Each unverified compound in the stack multiplies sourcing risk" },
    ],
    highlight: false,
  },
];

export default function Tb500OverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A recovery peptide with a borrowed evidence base and a product identity problem.
        </div>
        <div className="reta-overview__headline-sub">
          TB-500 is sold as a healing and recovery peptide, but here&apos;s the honest picture: most of what&apos;s known about how it works was discovered studying a related compound, not TB-500 directly. That borrowed evidence base shapes what this page can tell you — and what you should realistically expect. What&apos;s actually in the vial matters too.
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
      <div className="reta-overview__section-label">TB-500 vs BPC-157 vs the stack</div>
      <div className="reta-overview__compare-note">
        TB-500 and BPC-157 are complementary, not interchangeable. The stack is common in the community precisely because they hit different mechanisms for the same recovery goal.
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
