/**
 * KisspeptinOverviewPanel — decision-oriented overview for Kisspeptin.
 * Key frame: the upstream master regulator of the reproductive axis.
 * Kisspeptin → GnRH → LH/FSH → testosterone/estrogen. Clinical fertility
 * use (IVF trigger) is real and established. Community use for testosterone
 * optimization is mechanistically logical but clinically limited evidence.
 * Continuous dosing paradoxically suppresses — pulsatile pattern is essential.
 */

const STAT_CARDS = [
  {
    value: "GPR54 / KISS1R",
    label: "receptor — hypothalamic neurons expressing KNDy neurons activate GnRH pulse release",
    sub: "Kisspeptin (encoded by the KISS1 gene) is a neuropeptide family including KP-10, KP-13, KP-14, and KP-54 — all derived from a common precursor. The biologically active forms bind GPR54 (also called KISS1R) on hypothalamic GnRH neurons. This binding triggers a burst of GnRH release into the pituitary portal circulation. KP-10 (10 amino acids) and KP-54 (54 amino acids) are the most studied forms.",
    note: "The hypothalamic kisspeptin neurons are called KNDy neurons (expressing Kisspeptin, Neurokinin B, and Dynorphin). These neurons are the central pacemaker of pulsatile GnRH release — which drives the downstream LH/FSH pulses that drive testosterone and estrogen production. Kisspeptin is not a testosterone booster — it is the upstream regulator of the system that produces testosterone. The distinction matters for what to expect.",
  },
  {
    value: "GnRH → LH cascade",
    label: "the downstream pathway — GnRH → pituitary → LH + FSH → gonads → testosterone/estrogen",
    sub: "Kisspeptin → GnRH (hypothalamic) → LH + FSH (anterior pituitary) → testosterone/estrogen + spermatogenesis/folliculogenesis (gonads). The cascade requires an intact hypothalamic-pituitary-gonadal (HPG) axis. Kisspeptin optimizes a functional axis — it does not rescue a suppressed one (e.g., post-TRT axis recovery requires the entire axis to respond, which is impaired by long-term testosterone suppression of GnRH).",
    note: "The pulsatile nature of GnRH release is essential. Kisspeptin drives GnRH pulses. GnRH pulses drive LH pulses. LH pulses drive testosterone production. Continuous (non-pulsatile) administration of kisspeptin or GnRH agonists actually suppresses the axis — this is how leuprolide and other GnRH agonists achieve medical castration for prostate cancer or endometriosis: continuous stimulation desensitizes the receptor. The same paradox applies to kisspeptin.",
  },
  {
    value: "IVF trigger",
    label: "clinical use — kisspeptin-54 as oocyte maturation trigger in IVF cycles",
    sub: "The most advanced clinical evidence for kisspeptin is as an alternative trigger for final oocyte maturation in IVF. KP-54 (kisspeptin-54) triggers an LH surge that induces oocyte maturation — similar to hCG trigger but with a different mechanism. Clinical trials have demonstrated successful IVF outcomes with kisspeptin trigger. This is published, peer-reviewed human data (Dhillo et al., Imperial College London studies). This use case is clinically monitored in an IVF setting.",
    note: "The IVF trigger application is meaningful human evidence but is a specific, clinically supervised single-dose application — not the ongoing dosing pattern of community use. The kisspeptin dose, timing, and monitoring in IVF are carefully controlled. Community use for testosterone optimization involves ongoing, repeated dosing in a different context — the clinical trigger evidence does not directly validate ongoing community injection protocols.",
  },
  {
    value: "Investigational",
    label: "regulatory status — no FDA approval for any indication; IVF trigger in clinical development",
    sub: "Kisspeptin has no FDA approval for any indication. The IVF trigger application is in clinical development (primarily by Kisspeptin/Ferring development pathway and academic groups in the UK). Community access is through gray-market peptide suppliers with highly variable quality. The research peptide is not the same formulation as clinical KP-54 used in IVF trials.",
    note: "Source quality is particularly important for kisspeptin — the active forms are specific lengths (KP-10 or KP-54); degraded or truncated peptide is inactive. Community products are frequently sold without identification of which kisspeptin form they contain. 'Kisspeptin' as a product may contain KP-10, KP-54, or a degraded mixture — the clinical evidence is form-specific.",
  },
];

const FIT_YES = [
  "You have hypogonadotropic hypogonadism (low LH/FSH, low testosterone) and are working with an endocrinologist — kisspeptin mechanisms are directly relevant to this condition",
  "You are post-TRT and attempting axis recovery — kisspeptin targets the hypothalamic level where TRT-induced suppression occurs; it is mechanistically relevant though not well-studied specifically for this use case",
  "You are in an IVF cycle under physician supervision where kisspeptin trigger is being used — this is the most evidence-supported application",
  "You understand the pulsatile dosing requirement — continuous kisspeptin suppresses rather than stimulates the axis; this constraint is non-negotiable and poorly understood in community use",
];

const FIT_NO = [
  "You are using exogenous testosterone — exogenous testosterone provides profound negative feedback at the hypothalamic level; adding kisspeptin works against the axis suppression created by TRT, but the axis recovery requires stopping TRT, not just adding kisspeptin on top",
  "You have estrogen-sensitive conditions (estrogen-receptor-positive breast cancer, endometriosis, uterine fibroids) — kisspeptin drives estrogen production in females; stimulating further estrogen in the context of estrogen-sensitive pathology is contraindicated",
  "You have PCOS — kisspeptin stimulates LH, and PCOS is characterized by LH hypersecretion; further LH stimulation may worsen the LH/FSH ratio dysregulation",
  "You expect testosterone levels comparable to TRT — kisspeptin optimizes the natural axis; it cannot produce the supraphysiological testosterone levels that TRT creates",
  "You do not understand the pulsatile dosing requirement — using kisspeptin continuously will suppress the axis, not optimize it; this is the most commonly misunderstood aspect of community use",
];

const TIMELINE = [
  {
    phase: "Minutes to hours",
    heading: "Acute LH pulse — measurable within 60 minutes of injection",
    body: "Kisspeptin produces a measurable LH pulse within 30-60 minutes of subcutaneous injection in healthy volunteers — this is documented in multiple clinical studies. The LH pulse is followed by testosterone rise over several hours. This acute LH response is the most reliably demonstrated effect. Whether repeated dosing produces sustained testosterone elevation depends on dosing frequency and receptor desensitization dynamics.",
  },
  {
    phase: "Days to weeks",
    heading: "Sustained elevation — dependent on pulsatile pattern",
    body: "Sustaining testosterone optimization from kisspeptin requires pulsatile administration — mimicking the natural GnRH pulsatility. Dosing too frequently causes receptor downregulation and paradoxical axis suppression. The optimal pulsatile interval is not well-established for community use; it is context-specific and population-specific. Clinical studies have used varying protocols without consensus on the optimal pattern for ongoing testosterone support.",
  },
  {
    phase: "Long-term",
    heading: "The axis optimization ceiling — and the key limitation",
    body: "Kisspeptin cannot produce testosterone levels above the physiological maximum that the testicular Leydig cells can generate in response to LH. For a healthy male with normal testicular function and LH responsiveness, kisspeptin optimization might increase testosterone to the upper range of physiological normal — not supraphysiological. For males with primary hypogonadism (testicular failure), kisspeptin does not help because the downstream gonadal responders are impaired.",
  },
];

const COMPARISON = [
  {
    name: "Kisspeptin",
    badge: "Hypothalamic neuropeptide / Investigational",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GPR54/KISS1R → GnRH pulse → LH/FSH → testosterone/estrogen" },
      { label: "Evidence", value: "IVF trigger (Phase 2/3); hypogonadism studies (small); community use (anecdotal)" },
      { label: "Pulsatile requirement", value: "Essential — continuous dosing suppresses, not stimulates" },
      { label: "Testosterone ceiling", value: "Physiological maximum — cannot exceed natural Leydig cell capacity" },
      { label: "Status", value: "Investigational — no FDA approval; IVF development ongoing" },
    ],
    highlight: true,
  },
  {
    name: "Gonadorelin (GnRH)",
    badge: "GnRH analog / Rx in compounding",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GnRH receptor → LH/FSH → testosterone/estrogen (one step downstream of kisspeptin)" },
      { label: "Evidence", value: "Well-characterized as diagnostic tool; used in TRT adjunct protocols (compounded)" },
      { label: "Pulsatile requirement", value: "Same constraint — continuous GnRH agonists suppress (leuprolide, triptorelin)" },
      { label: "Testosterone ceiling", value: "Same as kisspeptin — physiological maximum" },
      { label: "Status", value: "Compounded Rx in some practices; pharmaceutical available (Factrel)" },
    ],
    highlight: false,
  },
  {
    name: "Enclomiphene",
    badge: "Selective ER modulator / Emerging Rx",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Blocks estrogen negative feedback at hypothalamus → raises endogenous LH/FSH → testosterone" },
      { label: "Evidence", value: "Phase 3 data for hypogonadism; more human evidence than kisspeptin for testosterone optimization" },
      { label: "Pulsatile requirement", value: "Not required — daily oral dosing; no continuous suppression paradox" },
      { label: "Testosterone ceiling", value: "Physiological maximum — same constraint" },
      { label: "Status", value: "Approved in some countries; used off-label in US under physician supervision" },
    ],
    highlight: false,
  },
];

export default function KisspeptinOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The hypothalamic master switch for reproductive hormones — with real IVF evidence and a pulsatile dosing requirement that most community users get wrong.
        </div>
        <div className="reta-overview__headline-sub">
          Kisspeptin is the upstream regulator of the hypothalamic-pituitary-gonadal (HPG) axis — it drives GnRH pulses, which drive LH and FSH, which drive testosterone and estrogen production. The most established clinical evidence is as an IVF trigger (KP-54 replacing hCG for oocyte maturation). Community use targets testosterone optimization and post-TRT axis recovery. The defining constraint: continuous kisspeptin suppresses the axis rather than stimulating it, because receptor desensitization mirrors the GnRH agonist paradox. Pulsatile administration is not optional — it is the mechanism.
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
      <div className="reta-overview__section-label">Kisspeptin vs Gonadorelin vs Enclomiphene</div>
      <div className="reta-overview__compare-note">
        Three approaches to axis-level testosterone support. Kisspeptin acts most upstream (hypothalamic), gonadorelin one step downstream (GnRH directly), enclomiphene removes negative feedback rather than directly stimulating. All have the physiological testosterone ceiling. Enclomiphene has the most human evidence for testosterone optimization; gonadorelin has compounding pharmacy access in the US.
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
