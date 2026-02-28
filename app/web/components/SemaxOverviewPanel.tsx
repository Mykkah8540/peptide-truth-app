/**
 * SemaxOverviewPanel — decision-oriented overview for Semax.
 * Key frame: Russian ACTH(4-7)PGP analog. BDNF upregulation + dopaminergic/serotonergic
 * activation. Cognitive enhancement + neuroprotection framing. More stimulatory than selank.
 * Not FDA-approved. Evidence: Russian clinical data for stroke recovery / cognitive contexts.
 * Intranasal primary route. Often combined with Selank for anxiety balance.
 */

const STAT_CARDS = [
  {
    value: "BDNF upregulation",
    label: "the primary neuroprotective mechanism",
    sub: "semax upregulates brain-derived neurotrophic factor (BDNF) — a key protein for neuronal survival, synaptic plasticity, and learning; this is the most mechanistically supported basis for cognitive and neuroprotective effects",
    note: "BDNF is the most studied neurotrophin and has a strong evidence base for cognitive function, mood, and neurological recovery. Semax's ability to upregulate BDNF is documented in animal models and supported by Russian clinical data. The magnitude of BDNF effect in healthy adult humans at community doses is less precisely characterized.",
  },
  {
    value: "Stimulatory",
    label: "cognitive activation profile",
    sub: "semax has a more activating/stimulatory profile than selank — dopaminergic and serotonergic pathway activation alongside BDNF; cognitive enhancement, focus, and energy improvement are the reported primary effects",
    note: "This stimulatory profile is why semax is often paired with selank (which is calming) in community protocols. Semax alone can produce anxiety or mild agitation in anxiety-prone individuals — the activation signal is real. For someone with baseline anxiety, selank co-use as a buffer is a pragmatic combination.",
  },
  {
    value: "Russian-approved",
    label: "not FDA-approved — used clinically in Russia for stroke recovery",
    sub: "semax has regulatory approval in Russia for cognitive impairment and stroke recovery contexts; it is not FDA-approved; the clinical evidence base is from Russian medical research with the same geographic concentration limitation as selank",
    note: "Russian regulatory approval means this is real medicine in that context — not purely experimental. It also means the evidence standard differs from FDA approval. The stroke/neurological recovery context provides the strongest clinical signal; healthy adult enhancement extrapolation is less precisely supported.",
  },
];

const FIT_YES = [
  "You want cognitive activation — focus, mental energy, faster information processing — alongside potential neuroprotective support",
  "You have high cognitive demands (studying, creative work, demanding professional context) and are looking for a cognitive enhancer with BDNF mechanism",
  "You're not anxiety-prone — semax's stimulatory profile can worsen anxiety; calm baseline recommended, or co-use with Selank as a buffer",
  "You're not on psychiatric medications — the dopaminergic, serotonergic, and BDNF interactions with psychiatric medications are insufficiently characterized",
  "You're not pregnant, breastfeeding, or an adolescent — hard stop; neurodevelopmental effects not studied",
  "You understand the evidence is from Russian clinical literature without FDA-level independent replication for enhancement use",
];

const FIT_NO = [
  "You have baseline anxiety or anxiety disorder — semax's stimulatory/activating profile can worsen anxiety; selank is better suited to anxiety-primary goals",
  "You're on psychiatric medications (antidepressants, antipsychotics, mood stabilizers) — dopaminergic, serotonergic, and BDNF pathway interactions create meaningful uncertainty",
  "You want anxiety reduction specifically — semax targets cognitive activation, not anxiety reduction; selank is the right choice for the anxiolytic goal",
  "You're pregnant, breastfeeding, or an adolescent — hard stop",
  "You want FDA-level evidence for cognitive enhancement — no FDA-approved compound exists specifically for cognitive enhancement in healthy adults; semax's evidence base is Russian clinical data, not Western RCTs",
];

const TIMELINE = [
  {
    phase: "Minutes after intranasal administration",
    heading: "Fast onset — cognitive activation begins quickly via nasal mucosal route",
    body: "Like selank, semax administered intranasally reaches CNS tissue quickly. The dopaminergic and serotonergic activation contributes to an early-onset alertness and focus effect. Community users describe the cognitive activation as beginning within 10–30 minutes. The BDNF upregulation effect is slower — BDNF acts on synaptic plasticity mechanisms that develop over hours to days, not minutes.",
  },
  {
    phase: "Hours to days",
    heading: "Two timescales: acute activation and cumulative BDNF effect",
    body: "Semax operates on two timescales. Acutely: dopaminergic/serotonergic activation produces the focus and energy effect within the session. Cumulatively: BDNF upregulation builds over days to weeks of use, supporting synaptic plasticity and potentially longer-lasting cognitive improvement. The distinction matters for outcome expectations — acute effects are session-based; BDNF effects are cumulative and may take weeks to manifest meaningfully.",
  },
  {
    phase: "Long-term",
    heading: "BDNF accumulation and cycling considerations",
    body: "Russian clinical use contexts often involve defined course lengths (weeks to months) rather than indefinite use. Long-term continuous use in healthy adults is not characterized in Western research. The BDNF effect can persist beyond the active use period — one proposed advantage of semax for neuroplasticity goals. Whether indefinite cycling is necessary or whether defined courses with breaks are more appropriate is not established for enhancement use.",
  },
];

const COMPARISON = [
  {
    name: "Semax",
    badge: "Russian-approved (investigational in West)",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Mechanism", value: "ACTH(4-7)PGP analog — BDNF upregulation + dopaminergic/serotonergic activation" },
      { label: "Effect profile", value: "Cognitive activation, focus, energy — stimulatory; neuroprotective via BDNF" },
      { label: "Anxiety interaction", value: "Can worsen anxiety — stimulatory profile; often paired with selank" },
      { label: "Evidence", value: "Russian clinical literature for stroke recovery / cognitive impairment; enhancement extrapolated" },
      { label: "Route", value: "Intranasal primarily" },
    ],
    highlight: true,
  },
  {
    name: "Selank",
    badge: "Investigational (Russian)",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GABAergic modulation + enkephalinase inhibition — anxiolytic" },
      { label: "Effect profile", value: "Anxiety reduction without sedation — calming; cognitive clarity secondary" },
      { label: "Anxiety interaction", value: "Reduces anxiety — specifically anxiolytic; often combined with semax" },
      { label: "Evidence", value: "Russian clinical literature for anxiety; same evidence quality as semax" },
      { label: "Route", value: "Intranasal primarily" },
    ],
    highlight: false,
  },
  {
    name: "General BDNF-supporting approaches",
    badge: "Better-characterized evidence",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Examples", value: "Exercise (particularly HIIT), cold exposure, quality sleep, omega-3 (EPA/DHA)" },
      { label: "BDNF effect", value: "Documented in human studies — exercise-induced BDNF elevation is among the most robust findings in neuroplasticity" },
      { label: "Evidence base", value: "Western RCT-level evidence in some cases — better replication than semax" },
      { label: "Risk profile", value: "Minimal to none — no CNS medication interactions, no nasal irritation" },
      { label: "vs semax", value: "Less acute activation signal; more evidence for the BDNF component; applicable regardless of semax use" },
    ],
    highlight: false,
  },
];

export default function SemaxOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A Russian cognitive enhancer in nasal spray form — focus, alertness, possible brain protection. More stimulating than calming.
        </div>
        <div className="reta-overview__headline-sub">
          Semax is a cognitive enhancer in nasal spray form, developed in Russia, that increases alertness, focus, and mental energy — think of it as the more stimulating counterpart to Selank. It also supports the formation of new neural connections over time, which is why it&apos;s discussed for both short-term focus sessions and longer cognitive optimization goals. It&apos;s used medically in Russia for stroke recovery and cognitive impairment, giving it real clinical grounding. Enhancement use in healthy adults extrapolates from that context. One important note: Semax&apos;s stimulating effect can worsen anxiety if you&apos;re prone to it — which is why it&apos;s often paired with Selank as a balancing compound.
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
      <div className="reta-overview__section-label">Semax vs Selank vs general BDNF approaches</div>
      <div className="reta-overview__compare-note">
        Semax and Selank are Russian CNS peptides often used together. Semax is stimulatory (cognitive activation, BDNF); Selank is calming (anxiolytic). For cognitive enhancement goals, exercise-induced BDNF elevation has a stronger and better-characterized evidence base than semax — the comparison isn&apos;t to discredit semax, but to frame it honestly.
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
