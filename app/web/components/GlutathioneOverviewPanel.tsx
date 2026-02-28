/**
 * GlutathioneOverviewPanel — decision-oriented overview for Glutathione.
 * Key frame: the body's master antioxidant — route of administration determines
 * everything about bioavailability and real-world effect. Oral standard form has
 * poor bioavailability; liposomal meaningfully better; IV delivers systemic levels.
 * The skin brightening claim is heavily marketed and weakly evidenced. NAC is the
 * more evidence-supported approach to raising intracellular GSH.
 */

const STAT_CARDS = [
  {
    value: "GSH",
    label: "tripeptide antioxidant — the cell's primary reducing agent",
    sub: "Glutathione (γ-L-glutamyl-L-cysteinyl-glycine) is a tripeptide synthesized endogenously in virtually every cell. It is the primary intracellular antioxidant, protecting against oxidative stress through the glutathione peroxidase (GPx) and glutathione S-transferase (GST) enzyme systems",
    note: "Glutathione is not a peptide in the enhancement-community sense — it's not injected for receptor-mediated effects. It is a fundamental cellular molecule. The wellness/supplement angle is about whether exogenous glutathione supplementation can meaningfully raise intracellular GSH levels, which turns entirely on route of administration and formulation.",
  },
  {
    value: "Route = everything",
    label: "oral standard form has poor bioavailability; liposomal is better; IV is clinical",
    sub: "Standard oral glutathione is broken down by gut enzymes before absorption. Liposomal encapsulation substantially improves oral bioavailability. IV glutathione bypasses gut degradation and delivers systemic levels. Nebulized/inhaled has pulmonary-specific delivery. The route determines what, if anything, actually reaches target tissues",
    note: "This is the most important fact to hold when evaluating glutathione products. A cheap oral capsule of standard glutathione and an IV infusion are not the same intervention. Most of the marketing for oral glutathione assumes IV-level effects. The route distinction is where the vast majority of expectation-setting errors happen in the wellness space.",
  },
  {
    value: "NAC first",
    label: "N-acetylcysteine — the more evidence-supported approach to raising intracellular GSH",
    sub: "N-acetylcysteine (NAC) is the rate-limiting precursor to glutathione synthesis. Oral NAC has substantially better bioavailability than oral glutathione; the cell synthesizes its own GSH from NAC. This is the established pharmacological approach for glutathione support in clinical medicine",
    note: "When the goal is intracellular glutathione support, NAC has better oral bioavailability, established clinical evidence (acetaminophen poisoning, NAC mucus thinning, some psychiatric evidence), and works via the cell's own synthetic machinery rather than depending on exogenous GSH absorption. This comparison belongs front and center when evaluating oral glutathione supplements.",
  },
  {
    value: "OTC / IV",
    label: "no prescription needed for oral/liposomal; IV is a clinical procedure",
    sub: "Oral and liposomal glutathione are widely available OTC. IV glutathione is administered in clinical settings and requires a healthcare provider. Inhaled/nebulized formulations are available but primarily studied in specific respiratory conditions",
    note: "The IV route is increasingly available in wellness clinics — not just hospitals. IV glutathione sessions for 'detox' and skin brightening are a significant commercial market. The evidence for these wellness indications is weak; the delivery is real but the marketed outcomes are not well-supported by clinical data.",
  },
];

const FIT_YES = [
  "You have a specific clinical context where glutathione has evidence — liver disease support, platinum-based chemotherapy peripheral neuropathy protection (with physician guidance), Parkinson's disease symptom management (limited evidence, physician supervised)",
  "You're using IV glutathione in a clinical setting where the route guarantees actual delivery — not as a replacement for physician management, but as an adjunct",
  "You're choosing liposomal oral form and understand this provides meaningfully better bioavailability than standard oral glutathione — and have calibrated expectations accordingly",
  "You understand that NAC is the more evidence-supported alternative for intracellular GSH support and have considered it as a first option",
];

const FIT_NO = [
  "You expect oral standard glutathione capsules to produce systemic antioxidant effects equivalent to IV — the bioavailability of standard oral glutathione is too poor to expect meaningful systemic GSH elevation",
  "Skin brightening is your primary goal and you're expecting dramatic results — the melanin inhibition mechanism for skin brightening via glutathione is real in vitro, but clinical evidence for consistent, significant skin tone change from any route is weak",
  "You have asthma or significant airway reactivity and are considering inhaled/nebulized glutathione — bronchospasm is a documented adverse effect in asthma patients from inhaled GSH",
  "You are expecting 'detox' effects in the sense of removing specific toxins — glutathione is not a detoxification agent in the way the marketing suggests; it is an antioxidant that supports the cell's natural protective systems",
  "You are pregnant or breastfeeding — safety data is insufficient; avoid unless clinically indicated and physician supervised",
];

const TIMELINE = [
  {
    phase: "Oral (standard or liposomal)",
    heading: "Slow, limited, bioavailability-dependent — weeks to months",
    body: "If oral glutathione is producing any effect on systemic GSH levels, it is through gradual accumulation rather than acute dosing. Liposomal form has meaningfully better bioavailability (~30-40% by some estimates vs. negligible for standard form). Evaluate any oral supplementation over 8-12 weeks minimum before drawing conclusions. The effect size is modest compared to IV.",
  },
  {
    phase: "IV sessions",
    heading: "Acute systemic delivery — effect within hours, not weeks",
    body: "IV glutathione (typically 600-1,200mg per session in wellness settings) delivers glutathione directly into circulation. Some people report skin brightening and 'glow' effects within or shortly after sessions — consistent with the melanin inhibition mechanism working acutely at IV-achieved concentrations. The frequency and duration of IV sessions for sustained effects is not well-standardized.",
  },
  {
    phase: "Long-term",
    heading: "No established maintenance protocol — evidence doesn't extend to long-term continuous use",
    body: "Long-term glutathione supplementation in healthy adults is not studied at the level required to establish a maintenance protocol. The body's own GSH synthesis is the primary determinant of intracellular glutathione levels — diet (sulfur-containing foods, cruciferous vegetables), sleep, and reduced oxidative load all matter. NAC as an ongoing supplement is more evidence-backed for sustained GSH support than continuous oral glutathione.",
  },
];

const COMPARISON = [
  {
    name: "Glutathione",
    badge: "Master antioxidant / tripeptide",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Direct GSH delivery — if it survives gut degradation and reaches cells" },
      { label: "Oral bioavailability", value: "Standard form: poor. Liposomal: meaningfully better (~30-40%)" },
      { label: "IV bioavailability", value: "100% — clinical delivery; not OTC" },
      { label: "Skin brightening", value: "Melanin inhibition mechanism is real in vitro; clinical evidence is weak" },
      { label: "Status", value: "OTC supplement (oral/liposomal); IV is a clinical procedure" },
    ],
    highlight: true,
  },
  {
    name: "N-Acetylcysteine (NAC)",
    badge: "GSH precursor / OTC",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Rate-limiting cysteine precursor for endogenous GSH synthesis; cell makes its own GSH" },
      { label: "Oral bioavailability", value: "Substantially better than oral glutathione — established clinical use" },
      { label: "Evidence", value: "Acetaminophen poisoning (IV): gold standard. Respiratory, psychiatric: some evidence" },
      { label: "Skin brightening", value: "Not a primary claim; the mechanism is upstream, not direct melanin inhibition" },
      { label: "Status", value: "OTC; IV form also used clinically" },
    ],
    highlight: false,
  },
  {
    name: "Alpha Lipoic Acid (ALA)",
    badge: "GSH recycler / antioxidant",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Recycles oxidized glutathione back to reduced form (GSH); antioxidant in its own right" },
      { label: "Oral bioavailability", value: "Good — ALA is well-absorbed; R-ALA is the more bioactive form" },
      { label: "Evidence", value: "Diabetic neuropathy: some clinical evidence. Antioxidant role: established mechanistically" },
      { label: "Skin brightening", value: "Some use in cosmetic contexts; less marketed than glutathione for this" },
      { label: "Status", value: "OTC supplement" },
    ],
    highlight: false,
  },
];

export default function GlutathioneOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The body&apos;s master antioxidant — what you actually get depends almost entirely on how you take it.
        </div>
        <div className="reta-overview__headline-sub">
          Glutathione is genuinely important in human cell biology — the primary intracellular antioxidant system. The wellness industry has built an enormous market around supplementing it. The problem: oral standard glutathione has poor bioavailability and most of it is degraded before reaching target tissues. Liposomal forms improve this substantially. IV delivers real systemic levels. The skin brightening claim (the most-marketed use) is weakly evidenced even at IV doses. If your goal is raising intracellular GSH via oral supplementation, N-acetylcysteine (NAC) is the more evidence-supported approach. This page is here to make that distinction clear.
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
      <div className="reta-overview__section-label">What to actually expect by route</div>
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
      <div className="reta-overview__section-label">Glutathione vs NAC vs Alpha Lipoic Acid</div>
      <div className="reta-overview__compare-note">
        All three influence the glutathione system — through different mechanisms. Glutathione is direct delivery; NAC is the precursor that lets the cell make its own; ALA recycles oxidized GSH back to active form. For most oral supplementation goals, NAC and ALA have better bioavailability and more established evidence than standard oral glutathione.
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
