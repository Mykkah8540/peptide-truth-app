/**
 * HCGOverviewPanel — decision-oriented overview for hCG.
 * Key frame: LH mimetic at Leydig cells; fertility and TRT-adjunct use are
 * established clinical applications with real evidence. The key distinction:
 * hCG acts at gonadal level (bypassing pituitary), while gonadorelin acts
 * at pituitary level. FSH is not stimulated by hCG — a meaningful difference
 * for spermatogenesis.
 */

const STAT_CARDS = [
  {
    value: "LH receptor (LHCGR)",
    label: "mechanism — hCG binds LH receptor on Leydig cells (males) and granulosa/theca cells (females)",
    sub: "Human chorionic gonadotropin (hCG) is a glycoprotein hormone that binds and activates the LH/CG receptor (LHCGR) — the same receptor that LH activates. In males, this directly stimulates Leydig cell testosterone production and maintains testicular volume. In females, it triggers the LH surge required for ovulation and supports the corpus luteum. hCG is produced by the placenta during pregnancy (the basis of pregnancy tests) and is available as an injectable medication (Pregnyl, Novarel) with established clinical uses.",
    note: "The LH mimetic action is pharmacologically well-characterized — hCG has a substantially longer half-life than endogenous LH (half-life ~24-36 hours for hCG vs. ~20 minutes for LH), making it more practical for clinical use. This long half-life is a meaningful advantage over gonadorelin's short-duration pituitary stimulation.",
  },
  {
    value: "FSH not stimulated",
    label: "key limitation — hCG stimulates Leydig cells but does NOT replace FSH; spermatogenesis requires both LH and FSH",
    sub: "hCG stimulates Leydig cell testosterone production — this is robust. What hCG does not do: stimulate FSH secretion. Complete spermatogenesis requires both LH (for testosterone from Leydig cells) and FSH (for Sertoli cell support of spermatogenesis). For testicular volume preservation during TRT in males who do not need fertility, hCG's LH action is sufficient. For males needing fertility restoration, hCG alone may not be sufficient — FSH supplementation (with FSH injections or gonadorelin to stimulate endogenous FSH) may also be needed.",
    note: "This FSH limitation is why some fertility specialists prefer gonadorelin over hCG for fertility preservation during TRT — gonadorelin stimulates both LH and FSH from the pituitary, while hCG only provides LH-like stimulation at the gonadal level. For testicular volume preservation without fertility goals, hCG is typically adequate.",
  },
  {
    value: "Multiple clinical uses",
    label: "established applications — TRT adjunct, male hypogonadism, fertility treatment, cryptorchidism",
    sub: "hCG has multiple established clinical uses with real evidence: (1) TRT adjunct for testicular volume preservation and maintenance of intratesticular testosterone, (2) hypogonadotropic hypogonadism treatment (where LH is deficient), (3) ovulation induction in anovulatory women, (4) final oocyte maturation trigger in IVF, (5) cryptorchidism treatment in prepubertal males. The evidence base spans decades of clinical use in reproductive medicine.",
    note: "The TRT adjunct application is the most common community use. Exogenous testosterone suppresses LH (via feedback), causing Leydig cell atrophy and reduced intratesticular testosterone. hCG provides the LH-like signal that bypasses this suppression, maintaining testicular volume and intratesticular testosterone. The typical protocol is hCG 500-1500 IU every 3-4 days alongside TRT.",
  },
  {
    value: "FDA-approved",
    label: "regulatory status — approved for specific indications; available as Pregnyl, Novarel; compounding also available",
    sub: "hCG is FDA-approved for: hypogonadotropic hypogonadism in males, prepubertal cryptorchidism, induction of ovulation in anovulatory infertile females, and as part of ART protocols. Pharmaceutical preparations (Pregnyl, Novarel, Ovidrel) are injectable. Compounded hCG is also used. Community access to hCG outside approved indications (TRT adjunct without a formal hypogonadism diagnosis) is off-label use. 'hCG diet' products — oral hCG for weight loss — have no evidence and the FDA has issued warnings against them.",
    note: "The distinction between legitimate pharmaceutical hCG (Pregnyl, Novarel) and 'hCG diet' products is important. The former is a legitimate pharmaceutical with established pharmacology; the latter is unsupported by evidence and has been the subject of FDA warnings. Any oral hCG product has no bioavailability for the intact glycoprotein — the evidence-based applications are all injectable.",
  },
];

const FIT_YES = [
  "You are on TRT and want to maintain testicular volume and intratesticular testosterone — hCG as TRT adjunct is the most common and well-supported use case",
  "You have hypogonadotropic hypogonadism (low LH, low testosterone with intact testes) — hCG is an established treatment with clinical evidence",
  "You are a male planning fertility preservation during or after TRT — hCG maintains spermatogenic potential; may need FSH supplementation for complete fertility restoration",
  "You are in an IVF protocol where hCG is used as a trigger for final oocyte maturation — this is an established clinical application under physician supervision",
];

const FIT_NO = [
  "You want to stimulate FSH as well as LH — hCG does not stimulate FSH; gonadorelin (GnRH) or FSH injection are needed for FSH stimulation",
  "You have hormone-sensitive cancer — prostate cancer, testicular cancer, certain female hormone-sensitive cancers; testosterone stimulation is contraindicated",
  "You have a history of precocious puberty — hCG stimulates sex steroids and is contraindicated",
  "You are considering oral hCG products for weight loss (hCG diet) — no evidence; FDA has issued warnings; injectable hCG does not produce weight loss outside extreme caloric restriction protocols",
];

const TIMELINE = [
  {
    phase: "Hours to days",
    heading: "Testosterone rise — Leydig cell stimulation produces measurable response within 24-72 hours",
    body: "Following hCG injection, Leydig cells respond within 24-72 hours with increased testosterone synthesis. Peak testosterone typically occurs 24-48 hours post-injection. The longer half-life of hCG (vs. LH) means the Leydig cell stimulation persists for 2-3 days, making every-3-4-day dosing practical for maintaining stimulus.",
  },
  {
    phase: "Weeks",
    heading: "Testicular volume preservation — Leydig cell mass maintained with ongoing stimulation",
    body: "Testicular atrophy from TRT-induced LH suppression develops over weeks to months. hCG supplementation prevents this by maintaining Leydig cell stimulation throughout TRT. Existing atrophy may partially reverse with hCG treatment, but recovery is incomplete if atrophy is severe and long-standing. Starting hCG early in TRT (preventing atrophy) is more effective than starting after significant atrophy has developed.",
  },
  {
    phase: "Long-term",
    heading: "Ongoing TRT support — dosing flexibility based on testosterone and fertility goals",
    body: "Long-term hCG use alongside TRT is clinically established. Monitoring includes testosterone levels (to confirm Leydig cell response), estradiol (aromatization of hCG-stimulated testosterone is common and can require aromatase inhibitor management), and semen parameters if fertility is a goal. Protocols vary — some use low-dose daily hCG, others use higher doses every 3-4 days.",
  },
];

const COMPARISON = [
  {
    name: "hCG",
    badge: "LH mimetic / FDA-approved",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Mechanism", value: "Direct LHCGR activation on Leydig cells — bypasses pituitary; long half-life (~24-36h)" },
      { label: "FSH stimulation", value: "None — does not stimulate FSH; Sertoli cell support requires separate FSH stimulation" },
      { label: "Evidence", value: "FDA-approved; decades of reproductive medicine data; TRT adjunct use well-characterized" },
      { label: "Estrogen risk", value: "Significant — hCG-stimulated testosterone aromatizes; estradiol monitoring required" },
      { label: "Status", value: "FDA-approved (Pregnyl, Novarel); Rx required; compounding also available" },
    ],
    highlight: true,
  },
  {
    name: "Gonadorelin (GnRH)",
    badge: "GnRH analog / Compounding Rx",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Pituitary GnRH receptor → LH + FSH release — acts upstream; pulsatile requirement" },
      { label: "FSH stimulation", value: "Yes — gonadorelin stimulates both LH and FSH; advantage for spermatogenesis" },
      { label: "Evidence", value: "GnRH mechanism textbook; pump protocols established; twice-daily injection extrapolated" },
      { label: "Estrogen risk", value: "Lower — gonadorelin-stimulated testosterone from physiological axis; aromatization is normal" },
      { label: "Status", value: "Compounding pharmacy Rx; not FDA-approved for TRT adjunct indication" },
    ],
    highlight: false,
  },
  {
    name: "Enclomiphene / Clomiphene",
    badge: "SERM / Oral alternative",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Blocks estrogen negative feedback → raises endogenous LH + FSH → testicular stimulation" },
      { label: "FSH stimulation", value: "Yes — raises both LH and FSH by removing estrogen feedback" },
      { label: "Evidence", value: "Phase 3 data for enclomiphene in hypogonadism; more human RCT data than gonadorelin for testosterone" },
      { label: "Estrogen risk", value: "Variable — clomiphene raises estrogen through increased testosterone aromatization; enclomiphene less estrogenic" },
      { label: "Status", value: "Clomiphene: off-label; Enclomiphene: approved in some countries, off-label US; oral dosing" },
    ],
    highlight: false,
  },
];

export default function HCGOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The original TRT adjunct — direct Leydig cell stimulation with FDA-approved status and decades of reproductive medicine data. The FSH limitation matters if fertility is the goal.
        </div>
        <div className="reta-overview__headline-sub">
          hCG acts directly on Leydig cells as an LH mimetic, bypassing the pituitary — making it effective even when TRT has suppressed LH secretion. The evidence base for testicular preservation during TRT, hypogonadotropic hypogonadism, and fertility treatment is established and pharmaceutical-grade. The key limitation: hCG does not stimulate FSH, which means it maintains Leydig cell testosterone production but not the Sertoli cell support required for complete spermatogenesis. For testicular volume, hCG is sufficient. For fertility restoration, FSH supplementation or an alternative is often also needed.
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
      <div className="reta-overview__section-label">hCG vs Gonadorelin vs Enclomiphene</div>
      <div className="reta-overview__compare-note">
        Three approaches to maintaining testicular function alongside TRT. hCG acts directly on Leydig cells (LH-like) — no FSH. Gonadorelin stimulates pituitary LH + FSH — better for fertility but pulsatile constraint. Enclomiphene raises both LH and FSH by removing estrogen feedback — oral, but doesn&apos;t work well alongside active TRT. Choose based on fertility goals and TRT context.
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
