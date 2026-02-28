/**
 * SermorelinOverviewPanel — decision-oriented overview for Sermorelin.
 * Key frame: the original GHRH analog — FDA-approved for pediatric GHD, now discontinued
 * in the US due to manufacturing issues (not safety). Prescription-context compound.
 * Same GH-axis considerations as CJC-1295 but different clinical history and evidence posture.
 * Shorter half-life than CJC-1295 no-DAC; requires more frequent dosing.
 */

const STAT_CARDS = [
  {
    value: "GHRH",
    label: "analog — the original",
    sub: "sermorelin is a 29-amino acid fragment of endogenous GHRH; it was the first GHRH analog to reach clinical use, approved for pediatric GH deficiency",
    note: "Discontinued in the US (manufacturing, not safety). CJC-1295 came later as a longer-acting version of the same mechanism.",
  },
  {
    value: "Rx",
    label: "prescription context",
    sub: "sermorelin requires a prescription in regulated markets — it sits differently from gray-market peptides like CJC-1295 in terms of regulatory status",
    note: "Availability through compounding pharmacies in some jurisdictions. Gray-market versions exist with the same sourcing risks as any unregulated injectable.",
  },
  {
    value: "~90 min",
    label: "half-life — short",
    sub: "significantly shorter half-life than CJC-1295 no-DAC (~30 min) — sermorelin typically requires daily or twice-daily dosing to maintain GH stimulation",
    note: "The short half-life means more frequent dosing but also more physiologic pulse patterning — closer to endogenous GHRH signaling.",
  },
];

const FIT_YES = [
  "You are in a prescription context (physician-supervised, compounding pharmacy) — sermorelin's regulatory history makes it easier to obtain legitimately than most gray-market GH-axis peptides",
  "You have recovery, sleep quality, or body composition goals and understand they operate through cumulative GH/IGF-1 physiology — not acute effects",
  "You have no diabetes, prediabetes, or insulin resistance — GH counter-regulation to insulin applies identically to sermorelin as to CJC-1295",
  "You don't have untreated or unstable sleep apnea — GH elevation and fluid retention can worsen sleep-disordered breathing with any GHRH analog",
  "You have no active or recent cancer diagnosis — the GH/IGF-1 mitogenic concern applies to sermorelin exactly as it does to CJC-1295",
  "You have untreated thyroid disease controlled — thyroid hormone affects GH physiology and vice versa; thyroid status should be established before starting",
];

const FIT_NO = [
  "You have diabetes, prediabetes, or insulin resistance — GH secretagogues can worsen glucose control; this applies to sermorelin as to all GHRH analogs",
  "You have untreated thyroid disease — thyroid function interacts with GH axis physiology; use without addressing thyroid status adds uncontrolled variables",
  "You have an active cancer diagnosis or are in active treatment — IGF-1 is mitogenic; oncology clearance required before starting any GHRH analog",
  "You're pregnant, breastfeeding, or an adolescent — endocrine axis perturbation during development is a hard stop",
  "You expect sermorelin to be 'like CJC-1295 but safer' — the GH-axis considerations are the same; the clinical history is different, not the systemic risk",
  "You're sourcing from the gray market without a CoA — sermorelin has a legitimate prescription pathway; if going that route, use it",
];

const TIMELINE = [
  {
    phase: "Weeks 1–4",
    heading: "Early GH-axis response — similar to CJC-1295",
    body: "Water retention and mild puffiness are common in the first few weeks — the standard early GH response. Sermorelin's shorter half-life means the pulse pattern is different from CJC-1295, but the downstream physiology (GH elevation → IGF-1 → fluid shifts, glucose effects) is the same. Don't judge efficacy here — the meaningful signal requires weeks of accumulated GH exposure.",
  },
  {
    phase: "Months 1–3",
    heading: "The honest evaluation window",
    body: "Recovery quality, sleep depth, and progressive training response are the signals worth watching. Sermorelin is typically used in the context of a physician-supervised protocol with labs — if that's your context, use the IGF-1 and fasting glucose labs to anchor your assessment rather than subjective feel alone. Attribution remains the persistent challenge, especially if using alongside nutrition and training protocols.",
  },
  {
    phase: "Long-term",
    heading: "No safety map for healthy adult use",
    body: "Sermorelin's clinical history is in GH-deficient pediatric and adult patients — that data doesn't map cleanly to healthy adult enhancement use. Long-term, continuous GH secretagogue stimulation in metabolically normal adults is not characterized. The community cycling convention (on/off protocols) reflects reasonable caution. If using without physician oversight, you're outside the reference experience base.",
  },
];

const COMPARISON = [
  {
    name: "Sermorelin",
    badge: "Prescription-context",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Receptor", value: "GHRH receptor — same as CJC-1295, original GHRH analog" },
      { label: "Half-life", value: "~90 min — requires daily or twice-daily dosing" },
      { label: "Regulatory history", value: "Was FDA-approved for pediatric GHD; discontinued (manufacturing, not safety)" },
      { label: "Prescription status", value: "Prescription-required; available via compounding pharmacy in some jurisdictions" },
      { label: "Primary concern", value: "Glucose, cancer history, thyroid status, adolescent endocrine risk" },
    ],
    highlight: true,
  },
  {
    name: "CJC-1295 (no DAC)",
    badge: "Gray-market",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Receptor", value: "GHRH receptor — same mechanism as sermorelin, longer-acting" },
      { label: "Half-life", value: "~30 min (no DAC) vs ~8 days (with DAC) — huge difference by variant" },
      { label: "Regulatory history", value: "Never FDA-approved; widely available gray-market" },
      { label: "Prescription status", value: "Not available by prescription; gray-market injectable" },
      { label: "Primary concern", value: "Glucose, cancer history, DAC vs no-DAC confusion, adolescent risk" },
    ],
    highlight: false,
  },
  {
    name: "Ipamorelin",
    badge: "Gray-market",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Receptor", value: "Ghrelin receptor (GHSR) — different arm of GH regulation from sermorelin" },
      { label: "Appetite effect", value: "Yes — ghrelin receptor agonism increases hunger" },
      { label: "Regulatory history", value: "Never approved; research compound only" },
      { label: "Stack with sermorelin?", value: "Complementary — ghrelin + GHRH receptor stacking produces additive GH release" },
      { label: "Primary concern", value: "Glucose, cancer history, sleep apnea, appetite stimulation" },
    ],
    highlight: false,
  },
];

export default function SermorelinOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The original prescription GH compound — decades of clinical history, now back through compounding pharmacies.
        </div>
        <div className="reta-overview__headline-sub">
          Sermorelin is the oldest compound in the prescription GH category — used clinically for decades before being discontinued for manufacturing reasons, not safety. It&apos;s now available again through compounding pharmacies and is popular in anti-aging and longevity clinics. The mechanism works the same way as CJC-1295: it prompts your pituitary to release GH naturally. The main practical differences are that it requires a prescription and has a shorter duration than some alternatives.
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
      <div className="reta-overview__section-label">Sermorelin vs CJC-1295 vs Ipamorelin</div>
      <div className="reta-overview__compare-note">
        Sermorelin and CJC-1295 hit the same receptor. The key differences are clinical history, regulatory status, and half-life — not mechanism or downstream risk profile. Ipamorelin is the complementary ghrelin-arm compound that can be stacked with either.
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
