/**
 * IpamorelinOverviewPanel — decision-oriented overview for Ipamorelin.
 * Key frame: GHRP-class (ghrelin receptor agonist) — different arm of GH regulation from CJC-1295.
 * "Selective" vs older GHRPs is real but shouldn't be read as low systemic impact.
 * Appetite stimulation is a distinctive and commonly reported effect.
 * GH-axis considerations (glucose, cancer, adolescent) apply identically to CJC-1295.
 */

const STAT_CARDS = [
  {
    value: "GHRP",
    label: "ghrelin receptor agonist",
    sub: "stimulates GH release via the ghrelin receptor — the pituitary arm complementary to CJC-1295's hypothalamic GHRH signal",
    note: "Does not add exogenous GH — amplifies endogenous GH pulse release by mimicking ghrelin signaling",
  },
  {
    value: "Selective",
    label: "relative GHRP profile",
    sub: "lower cortisol and prolactin elevation compared to older GHRPs (GHRP-2, GHRP-6) — the basis for the 'milder' label",
    note: "Selective relative to other GHRPs — not selective relative to no GH-axis intervention. GH/IGF-1 axis effects still apply.",
  },
  {
    value: "CJC+Ipa",
    label: "the canonical stack",
    sub: "ipamorelin + CJC-1295 is the most common community GH-axis protocol — synergistic because they hit different receptors",
    note: "The stack amplifies GH release more than either alone; all GH-axis considerations apply to the combined endocrine load",
  },
];

const FIT_YES = [
  "You have recovery, sleep quality, or body composition goals and understand they operate through cumulative GH/IGF-1 physiology — not acute effects",
  "You have no diabetes, prediabetes, or insulin resistance — ghrelin receptor agonism affects appetite and can alter glucose regulation",
  "You don't have untreated or unstable sleep apnea — GH elevation and fluid retention can worsen sleep-disordered breathing",
  "You have no active or recent cancer diagnosis — the GH/IGF-1 mitogenic concern applies to ipamorelin exactly as it does to CJC-1295",
  "You understand 'selective' means lower cortisol/prolactin vs older GHRPs — not a lower-risk compound than GH-axis peptides generally",
];

const FIT_NO = [
  "You have diabetes, prediabetes, or insulin resistance — GH secretagogues can worsen glucose control in susceptible users",
  "You have untreated or poorly controlled sleep apnea — GH elevation and fluid shifts can meaningfully worsen OSA",
  "You have an active cancer diagnosis or are in active treatment — IGF-1 is mitogenic; oncology clearance required before starting",
  "You're pregnant, breastfeeding, or an adolescent — endocrine axis perturbation during development is a hard stop",
  "You expect the 'selective' label to mean this is safe to run continuously long-term — no long-term safety data exists for any GH secretagogue in healthy adults",
  "You're adding ipamorelin on top of CJC-1295 without accounting for additive GH-axis load — the stack requires the same safety gates as each compound alone",
];

const TIMELINE = [
  {
    phase: "Weeks 1–4",
    heading: "Appetite shift and water retention — the first signals",
    body: "Ghrelin receptor agonism reliably increases appetite — this is not a side effect to push through, it's a mechanistic consequence. Water retention and mild puffiness (especially in the face and hands) are common in the first few weeks. These are early GH responses. GH/IGF-1 effects on body composition take weeks to accumulate — don't judge efficacy at week 2.",
  },
  {
    phase: "Months 1–3",
    heading: "The honest evaluation window",
    body: "Recovery quality, sleep depth, and progressive training response are the primary signals during this window. Attribution is the persistent challenge — ipamorelin is almost always used alongside CJC-1295, nutrition protocols, and structured training. If something is improving, isolating what's driving it requires that you've kept other variables consistent.",
  },
  {
    phase: "Long-term",
    heading: "No safety map exists for sustained use",
    body: "Long-term, continuous GH secretagogue use in healthy adults is not characterized in clinical trials — for ipamorelin or any GHRP. The community convention of cycling (8–12 weeks on, break off) reflects reasonable caution, not documented safety data. If you're running it continuously for months without a break, you're outside the reference experience base.",
  },
];

const COMPARISON = [
  {
    name: "Ipamorelin",
    badge: "Research-grade",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Receptor", value: "Ghrelin receptor (GHSR) — pituitary GH release arm" },
      { label: "Cortisol / prolactin", value: "Low relative to other GHRPs — the 'selective' distinction" },
      { label: "Appetite effect", value: "Yes — ghrelin receptor agonism increases hunger" },
      { label: "Stack with CJC-1295", value: "Synergistic — different receptor mechanisms, additive GH effect" },
      { label: "Primary concern", value: "Glucose, cancer history, sleep apnea, adolescent endocrine risk" },
    ],
    highlight: true,
  },
  {
    name: "CJC-1295 (no DAC)",
    badge: "Research-grade",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Receptor", value: "GHRH receptor (hypothalamic signal arm) — different from ipamorelin" },
      { label: "Cortisol / prolactin", value: "Neutral — no significant effect" },
      { label: "Appetite effect", value: "Minimal direct appetite effect (no ghrelin pathway)" },
      { label: "Stack with ipa", value: "Complementary — the canonical combination" },
      { label: "Primary concern", value: "Glucose, cancer history, DAC vs no-DAC confusion, adolescent risk" },
    ],
    highlight: false,
  },
  {
    name: "GHRP-2 / GHRP-6",
    badge: "Research-grade",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Receptor", value: "Ghrelin receptor — same family as ipamorelin" },
      { label: "Cortisol / prolactin", value: "Elevated — meaningfully more than ipamorelin" },
      { label: "Appetite effect", value: "Strong — especially GHRP-6" },
      { label: "GH release", value: "Strong — often more potent acutely than ipamorelin" },
      { label: "Why people choose ipa instead", value: "Cleaner side effect profile; less cortisol/prolactin" },
    ],
    highlight: false,
  },
];

export default function IpamorelinOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A selective GH secretagogue — but the GH-axis considerations are identical to CJC-1295.
        </div>
        <div className="reta-overview__headline-sub">
          Ipamorelin hits the ghrelin receptor, not the GHRH receptor — that&apos;s what makes it complement CJC-1295 rather than duplicate it. &ldquo;Selective&rdquo; means cleaner than older GHRPs, not low-impact on the GH axis.
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
      <div className="reta-overview__section-label">Ipamorelin vs CJC-1295 vs older GHRPs</div>
      <div className="reta-overview__compare-note">
        Ipamorelin&apos;s &ldquo;selectivity&rdquo; is real and relative — it produces less cortisol and prolactin elevation than GHRP-2 or GHRP-6. That&apos;s why it became the community standard GHRP. It doesn&apos;t mean the GH-axis considerations disappear — they&apos;re the same as CJC-1295.
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
