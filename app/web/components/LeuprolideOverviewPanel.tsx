/**
 * LeuprolideOverviewPanel — decision-oriented overview for Leuprolide (Lupron).
 * Key frame: the original GnRH agonist depot; same mechanism class as triptorelin but
 * with a broader FDA-approved indication set. Continuous GnRH stimulation causes
 * receptor desensitization → LH/FSH suppression → chemical castration.
 * Community confusion about PCT use is pharmacologically backward — this compound
 * suppresses the axis, it does not stimulate it.
 */

const STAT_CARDS = [
  {
    value: "GnRH receptor (continuous)",
    label: "mechanism — paradoxical axis suppression through continuous receptor stimulation → desensitization",
    sub: "Leuprolide is a synthetic GnRH analog that binds to pituitary GnRH receptors with higher affinity than native GnRH. When administered as a depot (continuous release), it desensitizes and downregulates GnRH receptors, ultimately suppressing LH and FSH secretion. This leads to testosterone suppression to castrate levels in men (< 50 ng/dL) and estrogen suppression in women. The initial days of administration cause a transient hormonal flare (LH/FSH/testosterone spike) before sustained suppression takes over — a critical pharmacological nuance with clinical consequences.",
    note: "The paradox is essential to understand: leuprolide is a GnRH agonist that ultimately acts as a functional antagonist at the gonadal axis. Pulsatile native GnRH stimulates the axis; continuous exogenous GnRH agonist suppresses it. Anyone reasoning that leuprolide would 'stimulate' testosterone or LH production has the mechanism backward. This is the most common source of community error.",
  },
  {
    value: "1-6 month depot formulations",
    label: "duration — multiple sustained-release depot durations available (Lupron Depot 1, 3, 4, 6 months)",
    sub: "Leuprolide is available in multiple sustained-release depot formulations delivering continuous exposure for 1, 3, 4, or 6 months depending on the indication and product. This depot duration is clinically essential — it means a single injection commits the patient to weeks to months of sex hormone suppression. Unlike short-acting peptides, leuprolide depot cannot be stopped once injected. The pharmacological effect persists until the depot is exhausted and the receptor recovers. This is a slow, sustained intervention with no reversibility once initiated.",
    note: "The depot duration is the critical clinical differentiator from short-acting GnRH agonists or antagonists. For prostate cancer management, long depot intervals improve adherence. For any off-label community use, the depot duration is a serious consideration — you cannot 'undo' a 3-month depot injection if unwanted effects emerge. The pharmacokinetics are fundamentally different from the peptides that get injected daily.",
  },
  {
    value: "FDA-approved (Lupron)",
    label: "regulatory status — multiple FDA-approved indications: prostate cancer, endometriosis, uterine fibroids, precocious puberty, IVF",
    sub: "Leuprolide (marketed as Lupron, Lupron Depot) is one of the most thoroughly FDA-approved GnRH agonists in clinical practice. Approved indications include: advanced prostate cancer (palliative androgen deprivation therapy); endometriosis (pain reduction); uterine fibroids (preoperative management); central precocious puberty; and used off-label as part of IVF protocols (pituitary downregulation for controlled ovarian hyperstimulation). This is not an investigational compound — it has a well-characterized clinical pharmacology profile built over decades.",
    note: "The FDA-approval breadth reflects the utility of sex hormone suppression across multiple conditions. The prostate cancer indication is the primary and most prominent use — androgen deprivation therapy (ADT) is a cornerstone of advanced prostate cancer management. The depth of the clinical evidence base for leuprolide far exceeds any peptide compound in the community optimization space.",
  },
  {
    value: "Hot flashes / bone loss",
    label: "primary adverse effects — sex hormone suppression consequences: vasomotor symptoms, osteoporosis, metabolic effects",
    sub: "The adverse effect profile of leuprolide is essentially the adverse effect profile of sex hormone deprivation. In men: hot flashes (most common; 50-80% of patients), decreased libido and erectile dysfunction, gynecomastia, muscle loss, fat redistribution, bone density loss (osteoporosis risk with prolonged use), insulin resistance, and mood changes. In women: menopausal symptoms (hot flashes, vaginal dryness), bone density loss, mood changes. These are the expected consequences of chemical castration and are dose-dependent on the duration of hormone suppression.",
    note: "The adverse effect burden of leuprolide for community use would be the full ADT adverse effect profile — which is clinically substantial. Hot flashes, bone density loss, metabolic syndrome, and sexual dysfunction are the realities of prolonged sex hormone suppression. This is not a compound being used for optimization; it is a compound causing medically intentional hormone suppression for serious conditions.",
  },
];

const FIT_YES = [
  "You have advanced prostate cancer and are receiving physician-prescribed androgen deprivation therapy — leuprolide is the clinical standard of care for this indication with extensive evidence",
  "You have endometriosis with pain and other treatments have been insufficient — physician-prescribed leuprolide has FDA-approved evidence for endometriosis pain reduction",
  "You are undergoing gender-affirming hormone therapy and a provider has determined GnRH agonist therapy is appropriate for your protocol — this is an established clinical use under physician oversight",
  "You are being evaluated for central precocious puberty and a pediatric endocrinologist has recommended leuprolide — this is an FDA-approved indication with substantial evidence",
  "You are part of an IVF protocol and your reproductive endocrinologist is using leuprolide for pituitary downregulation — this is an established assisted reproduction use",
];

const FIT_NO = [
  "You are considering leuprolide for PCT (post-cycle therapy) after anabolic steroid use — this is pharmacologically backward; leuprolide suppresses the HPG axis and testosterone, it does not stimulate recovery",
  "You believe leuprolide will 'stimulate' LH, FSH, or testosterone production — continuous GnRH agonist causes receptor downregulation and axis suppression, the opposite of the recovery goal",
  "You are considering any community self-injection of leuprolide without physician oversight — the depot formulations commit you to months of sex hormone suppression that cannot be reversed; this requires clinical management",
  "You are managing prostate cancer without an oncologist — leuprolide ADT requires monitoring for cardiovascular risk, bone density management, metabolic effects, and disease response; community-only use is clinically dangerous",
  "You expect short-acting effects — leuprolide depot injections last 1-6 months; there is no equivalent short-acting community protocol for this compound",
];

const TIMELINE = [
  {
    phase: "Days 1-7 (initial flare)",
    heading: "Testosterone flare — transient spike before suppression",
    body: "In the first days after leuprolide injection, there is a paradoxical transient increase in LH, FSH, and testosterone (in men) or estrogen (in women) before the receptor downregulation takes effect. This 'flare' is clinically significant in prostate cancer — it can temporarily worsen disease (bone pain, urinary obstruction) in the days before suppression occurs. In prostate cancer management, short-term anti-androgen co-medication (bicalutamide, flutamide) is standard protocol to cover the flare period. This flare phase is one reason leuprolide requires physician management.",
  },
  {
    phase: "Weeks 2-4 (suppression)",
    heading: "Castrate-level suppression established — LH, FSH, testosterone fall",
    body: "After the initial flare resolves, the GnRH receptor desensitization takes hold and LH/FSH suppression is established. Testosterone in men falls to castrate levels (< 50 ng/dL, often < 20 ng/dL) within 2-4 weeks. In women, estrogen suppression is similarly rapid. Hot flashes typically begin during this phase. Bone density changes begin gradually. The full adverse effect profile of sex hormone deprivation becomes apparent over weeks to months.",
  },
  {
    phase: "Months (depot duration)",
    heading: "Sustained hormone suppression — ADT adverse effect burden accumulates",
    body: "For the full duration of the depot (1, 3, 4, or 6 months depending on formulation), hormone suppression is maintained. The ADT adverse effect burden accumulates with duration: bone density loss increases with each month of suppression, metabolic effects (insulin resistance, fat redistribution) develop, cardiovascular risk rises with prolonged ADT. Cancer-focused management includes bone density monitoring (DEXA scans), cardiovascular risk assessment, and supportive interventions (calcium/vitamin D, exercise, bisphosphonates for bone protection).",
  },
  {
    phase: "After depot completion",
    heading: "Recovery — slow axis reactivation over months after depot exhaustion",
    body: "After the depot is exhausted, the GnRH receptor gradually resensitizes and the HPG axis slowly recovers. Testosterone recovery in men takes 3-18+ months depending on duration of suppression, age, and individual axis reserve. Some men do not recover full testosterone levels, particularly after prolonged ADT. In prostate cancer management, recovery is typically not the goal. In other applications (endometriosis, fibroids), hormone recovery is expected after cessation.",
  },
];

const COMPARISON = [
  {
    name: "Leuprolide (Lupron)",
    badge: "GnRH agonist depot / FDA-approved",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Continuous GnRH agonism → receptor desensitization → LH/FSH suppression → chemical castration" },
      { label: "Duration", value: "Depot: 1, 3, 4, or 6 months per injection — sustained, non-reversible within depot window" },
      { label: "FDA status", value: "Approved for prostate cancer, endometriosis, uterine fibroids, precocious puberty" },
      { label: "Axis effect", value: "SUPPRESSES HPG axis — not a stimulant; PCT use is pharmacologically backward" },
      { label: "Primary concern", value: "Testosterone flare at initiation (requires anti-androgen cover in prostate cancer); irreversibility once injected" },
    ],
    highlight: true,
  },
  {
    name: "Triptorelin",
    badge: "GnRH agonist depot / FDA-approved",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Same class as leuprolide — continuous GnRH agonism → LH/FSH suppression; same pharmacological principle" },
      { label: "Duration", value: "Depot: monthly and 3-month formulations; similar depot duration profile to leuprolide" },
      { label: "FDA status", value: "FDA-approved for prostate cancer (Trelstar); similar indication overlap with leuprolide" },
      { label: "Axis effect", value: "SUPPRESSES HPG axis — identical mechanism class error for PCT or testosterone stimulation" },
      { label: "Differentiation", value: "Narrower FDA indication set than leuprolide; longer-established use, similar efficacy in head-to-head comparisons" },
    ],
    highlight: false,
  },
  {
    name: "Gonadorelin (native GnRH)",
    badge: "GnRH agonist pulsatile / different use case",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.08)",
    rows: [
      { label: "Mechanism", value: "Pulsatile GnRH receptor activation → LH/FSH stimulation (opposite functional outcome to depot leuprolide)" },
      { label: "Duration", value: "Short-acting — requires pulsatile administration (pump or frequent injection) to maintain axis stimulation" },
      { label: "FDA status", value: "FDA-approved for specific diagnostic and fertility applications; not approved for testosterone optimization" },
      { label: "Axis effect", value: "STIMULATES HPG axis when given pulsatile — the mechanism that community PCT users incorrectly attribute to GnRH agonists like leuprolide" },
      { label: "Key distinction", value: "The pulsatile-vs-continuous difference is the entire explanation for why gonadorelin stimulates and leuprolide suppresses the axis" },
    ],
    highlight: false,
  },
];

export default function LeuprolideOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The original GnRH agonist depot — FDA-approved for chemical castration in prostate cancer; continuous GnRH agonism suppresses the axis, it does not stimulate it; PCT use is pharmacologically backward.
        </div>
        <div className="reta-overview__headline-sub">
          Leuprolide (Lupron) is a synthetic GnRH agonist that has been in clinical use for decades. Paradoxically, continuous GnRH receptor stimulation leads to receptor desensitization and downregulation — ultimately suppressing LH, FSH, and sex hormone production. This is the pharmacological mechanism underlying androgen deprivation therapy for prostate cancer: testosterone falls to castrate levels within weeks of depot injection. The same mechanism makes leuprolide useful for endometriosis, uterine fibroids, precocious puberty, and IVF protocols. Community users who believe GnRH agonists like leuprolide or triptorelin will stimulate testosterone recovery after steroid cycles have the mechanism exactly backward. The compound that stimulates the axis pulsatile is gonadorelin — the distinction between pulsatile stimulation and continuous suppression is the central educational point for this class.
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
      <div className="reta-overview__section-label">Leuprolide vs Triptorelin vs Gonadorelin</div>
      <div className="reta-overview__compare-note">
        Leuprolide and triptorelin are both GnRH agonist depots that suppress the HPG axis through continuous receptor desensitization — same class, similar mechanisms, similar adverse effect profiles. Gonadorelin (native GnRH) stimulates the axis when given pulsatile, which is the mechanistically opposite outcome. The pulsatile-vs-continuous distinction explains why community PCT reasoning about GnRH agonists is pharmacologically backward.
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
