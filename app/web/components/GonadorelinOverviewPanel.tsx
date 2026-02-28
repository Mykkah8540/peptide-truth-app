/**
 * GonadorelinOverviewPanel — decision-oriented overview for Gonadorelin.
 * Key frame: GnRH itself — one step downstream of kisspeptin.
 * Compounding pharmacy access makes this the most practically available
 * axis restoration tool in TRT clinic protocols. Pulsatile requirement
 * is the same as kisspeptin but the clinical evidence is better established.
 */

const STAT_CARDS = [
  {
    value: "GnRH",
    label: "gonadotropin-releasing hormone — the hypothalamic signal that drives LH and FSH from the pituitary",
    sub: "Gonadorelin is synthetic GnRH (gonadotropin-releasing hormone), a decapeptide naturally produced by hypothalamic neurons. It binds GnRH receptors on pituitary gonadotroph cells, triggering release of LH (luteinizing hormone) and FSH (follicle-stimulating hormone). LH drives testosterone production in Leydig cells; FSH drives spermatogenesis and folliculogenesis. Gonadorelin is the active principle; leuprolide, triptorelin, and nafarelin are long-acting GnRH analogs with modified sequences.",
    note: "Gonadorelin is native GnRH — short half-life (~2-8 minutes), which is a feature, not a bug. The short half-life makes pulsatile dosing practical and avoids the receptor desensitization that long-acting GnRH analogs exploit to suppress the axis. This is why gonadorelin is used for axis support in TRT protocols while long-acting GnRH agonists are used for medical castration — same target, opposite effects from dosing pattern.",
  },
  {
    value: "TRT adjunct",
    label: "primary community use — maintaining testicular function and fertility during testosterone therapy",
    sub: "The dominant community and compounding pharmacy use of gonadorelin is as an adjunct to testosterone replacement therapy (TRT). Exogenous testosterone suppresses the HPG axis — the pituitary stops sending LH signals, Leydig cells atrophy, intratesticular testosterone falls, and testicular volume decreases. Gonadorelin provides periodic LH-like stimulation to maintain Leydig cell function, intratesticular testosterone, and spermatogenesis during TRT.",
    note: "hCG has historically been the standard TRT adjunct for this purpose (it directly mimics LH at the Leydig cell level). The FDA's discontinuation of compounded hCG (2020) drove many TRT clinics toward gonadorelin as the alternative. Gonadorelin is not equivalent to hCG — it works one step upstream (pituitary stimulation vs. direct Leydig cell stimulation). The effectiveness for fertility and testicular function preservation during TRT is clinically established for hCG; the gonadorelin evidence for this specific application is more limited.",
  },
  {
    value: "Pulsatile",
    label: "dosing requirement — the same axis physics as kisspeptin; pulsatile stimulates, continuous suppresses",
    sub: "Gonadorelin has a plasma half-life of approximately 2-8 minutes. Pulsatile administration (every 60-120 minutes, or via pump) mimics endogenous GnRH pulsatility and maintains pituitary responsiveness. Continuous administration (or long-acting analogs like leuprolide) causes GnRH receptor downregulation and loss of LH/FSH secretion — medically exploited for castration in prostate cancer and endometriosis treatment. Community dosing (twice daily subcutaneous injection) does not perfectly replicate physiological pulsatility but attempts to approximate it.",
    note: "The clinical gold standard for gonadorelin-mediated axis stimulation is pulsatile pump delivery (the GnRH pump) — used in hypogonadotropic hypogonadism treatment. Subcutaneous injection 2-3 times daily is a practical approximation. Whether twice-daily injection provides adequate pulsatile stimulation or causes partial receptor desensitization is not definitively established for the community dosing pattern.",
  },
  {
    value: "Compounded Rx",
    label: "regulatory status — FDA-approved pharmaceutical; widely available through compounding pharmacies",
    sub: "Gonadorelin has FDA approval as a diagnostic agent (Factrel) and for treating hypothalamic amenorrhea (Lutrepulse, pump delivery). Compounding pharmacies prepare gonadorelin for TRT adjunct use — this is the route most community users access it. The compounded formulation is not FDA-evaluated for TRT adjunct indications. Gonadorelin 100 mcg twice daily is the most common community/clinic protocol.",
    note: "The compounding pharmacy access makes gonadorelin meaningfully different from most other compounds on this site — it is accessible through legitimate medical channels (physician prescription + compounding pharmacy), not just gray-market research peptide suppliers. This is a significant practical distinction for quality and regulatory status.",
  },
];

const FIT_YES = [
  "You are on TRT and want to maintain testicular size, function, and fertility potential during therapy — gonadorelin provides periodic axis stimulation that partially preserves Leydig cell activity",
  "You are post-TRT attempting axis recovery — gonadorelin provides direct GnRH stimulus to restart pituitary LH/FSH secretion; most effective when the pituitary is responsive (not severely atrophied from long suppression)",
  "You have access through a compounding pharmacy and physician prescription — this is the preferable access route vs. research peptide suppliers",
  "You understand the pulsatile requirement — twice-daily injection is the practical approximation; more frequent dosing or pump delivery more closely replicates physiological pulsatility",
];

const FIT_NO = [
  "You are on long-acting GnRH agonist therapy (leuprolide, triptorelin) — gonadorelin targets the same receptor that is being continuously desensitized; adding gonadorelin has no meaningful effect in this context",
  "You have sex hormone-sensitive conditions (prostate cancer, ER-positive breast cancer, endometriosis) — gonadorelin drives sex steroid production; these conditions are exacerbated by sex steroids",
  "You have primary hypogonadism (testicular failure, Klinefelter syndrome) — gonadorelin cannot help if the downstream responders (Leydig cells, pituitary) are not functional; works for hypothalamic/pituitary failure, not testicular failure",
  "You expect gonadorelin to replace hCG equivalently — the mechanisms are different (pituitary stimulation vs. direct Leydig cell stimulation); gonadorelin is more physiological but requires an intact pituitary-testicular connection",
  "You are using continuous or high-frequency dosing under the assumption that more is better — more frequent gonadorelin dosing risks GnRH receptor downregulation and paradoxical axis suppression",
];

const TIMELINE = [
  {
    phase: "Minutes to hours",
    heading: "Acute LH and FSH pulse — measurable within 30-60 minutes",
    body: "Gonadorelin injection produces a measurable LH pulse within 30-60 minutes — this is the basis of the GnRH stimulation test used diagnostically to assess pituitary function. In males on TRT, this LH pulse reaches the testes and stimulates Leydig cells. The acuity of response depends on pituitary responsiveness, which can be blunted by long-term TRT-induced suppression.",
  },
  {
    phase: "Weeks to months",
    heading: "Testicular function preservation — the main outcome for TRT users",
    body: "With twice-daily gonadorelin during TRT, the goal is maintaining testicular size, intratesticular testosterone, and Leydig cell viability. The evidence for hCG in this role is well-established; the evidence for gonadorelin in the same role is more limited but mechanistically sound. Most users report maintained testicular volume compared to TRT without any adjunct. Spermatogenesis preservation requires FSH stimulation — gonadorelin provides this; hCG does not (hCG directly stimulates LH receptors, not FSH).",
  },
  {
    phase: "After TRT cessation",
    heading: "Axis recovery — timeline depends on depth and duration of suppression",
    body: "Post-TRT axis recovery with gonadorelin support depends on how suppressed the pituitary-testicular axis is and how long it was suppressed. The hypothalamus recovers first (endogenous GnRH returns), followed by pituitary responsiveness, followed by Leydig cell testosterone production. Recovery can take weeks to months; long-duration TRT users may take 6-12 months for full recovery. Gonadorelin during this period provides external GnRH stimulus while endogenous function restores.",
  },
];

const COMPARISON = [
  {
    name: "Gonadorelin",
    badge: "GnRH / Compounded Rx",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GnRH receptor → LH + FSH release from pituitary → testosterone + FSH effects" },
      { label: "Access", value: "Compounding pharmacy (Rx) — legitimate medical channel" },
      { label: "Pulsatile req.", value: "Required — half-life 2-8 min; twice-daily injection is approximation" },
      { label: "vs. hCG", value: "More physiological (via pituitary); hCG acts directly on Leydig cells; both are TRT adjuncts" },
      { label: "Fertility", value: "Supports both LH (testosterone) and FSH (spermatogenesis) pathways" },
    ],
    highlight: true,
  },
  {
    name: "hCG",
    badge: "LH analog / Rx (compounding limited)",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "LH receptor agonist at Leydig cells — bypasses pituitary, directly stimulates testes" },
      { label: "Access", value: "Prescription; compounded hCG availability reduced post-2020 FDA guidance" },
      { label: "Pulsatile req.", value: "Longer half-life (~36 hours) — less frequent dosing needed" },
      { label: "vs. gonadorelin", value: "Direct Leydig cell stimulation; does not drive FSH (no pituitary engagement)" },
      { label: "Fertility", value: "Maintains testosterone/testicular function; FSH supplementation separate if needed" },
    ],
    highlight: false,
  },
  {
    name: "Kisspeptin",
    badge: "Hypothalamic / Investigational",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GPR54 → GnRH pulse → LH/FSH (one step upstream of gonadorelin)" },
      { label: "Access", value: "Research peptide — no compounding pharmacy access; gray market only" },
      { label: "Pulsatile req.", value: "Same constraint — continuous dosing desensitizes GPR54" },
      { label: "vs. gonadorelin", value: "More upstream; theoretically more physiological; less clinical evidence in TRT context" },
      { label: "Fertility", value: "Drives GnRH → LH + FSH cascade; same downstream as gonadorelin" },
    ],
    highlight: false,
  },
];

export default function GonadorelinOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          Synthetic GnRH — the most practically accessible axis restoration tool in TRT medicine, available through compounding pharmacies.
        </div>
        <div className="reta-overview__headline-sub">
          Gonadorelin is synthetic gonadotropin-releasing hormone (GnRH) — the decapeptide that triggers LH and FSH release from the pituitary. Its primary community and clinical use is as a TRT adjunct: maintaining testicular function and fertility potential while on exogenous testosterone. The FDA&apos;s 2020 guidance restricting compounded hCG pushed many TRT clinics toward gonadorelin as the replacement. The pulsatile requirement is the same physics as kisspeptin — the short half-life is a feature that makes physiological pulsatility possible; continuous administration produces the same axis suppression that long-acting GnRH agonists exploit for medical castration.
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
      <div className="reta-overview__section-label">Gonadorelin vs hCG vs Kisspeptin</div>
      <div className="reta-overview__compare-note">
        Three axis restoration tools at different levels. Gonadorelin acts at the pituitary (GnRH receptor); hCG acts directly at the Leydig cell (LH receptor); kisspeptin acts one step upstream (hypothalamus). Gonadorelin is the most practically accessible through compounding pharmacies.
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
