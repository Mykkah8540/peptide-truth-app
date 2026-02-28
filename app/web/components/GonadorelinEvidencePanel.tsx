/**
 * GonadorelinEvidencePanel — honest evidence for Gonadorelin.
 * Key frame: GnRH pharmacology is textbook endocrinology — the mechanism
 * is not in question. The evidence gap is specifically gonadorelin as TRT
 * adjunct vs. hCG; the latter has more human outcome data. Pulsatile
 * pump delivery for hypogonadism is established; twice-daily SC injection
 * is a clinical approximation without the same evidence base.
 */

const SIGNALS = [
  {
    label: "LH and FSH stimulation — GnRH pharmacology is established endocrinology",
    value: "Mechanistically established — textbook pituitary physiology",
    note: "GnRH (gonadorelin) stimulating LH and FSH secretion from pituitary gonadotrophs is established endocrinology. The GnRH receptor, its signaling pathway, and the downstream LH/FSH response are among the most thoroughly characterized in reproductive medicine. This is not in scientific dispute. The questions are practical: does a specific dosing regimen provide adequate pulsatile stimulation to maintain the intended downstream effects?",
    tier: "strong",
  },
  {
    label: "Pulsatile GnRH pump for hypogonadotropic hypogonadism — clinical evidence",
    value: "Established clinical evidence for pump delivery — not for injection protocols",
    note: "Pulsatile GnRH pump delivery (Lutrepulse) for hypogonadotropic hypogonadism and hypothalamic amenorrhea has established clinical evidence, including fertility outcomes in both males and females. This is the reference evidence for gonadorelin efficacy. It uses pump delivery (every 60-120 minutes) — not twice-daily subcutaneous injection. The translation from pump to injection protocol is a clinically important assumption that is not separately validated in adequately powered trials.",
    tier: "strong",
  },
  {
    label: "Gonadorelin as TRT adjunct (preserving testicular function) — limited evidence",
    value: "Clinically used but limited specific evidence vs. hCG historical standard",
    note: "hCG was the historical clinical standard for maintaining testicular function and fertility during TRT. It has established evidence for this application. Gonadorelin replaced hCG in many clinics after the 2020 FDA compounding guidance, on the basis of its GnRH mechanism, not new comparative trials. The specific human evidence for gonadorelin at typical community doses (100 mcg twice daily) for testicular preservation during TRT is limited — it is a mechanistically-driven clinical practice, not an evidence-driven one in the same way hCG was.",
    tier: "moderate",
  },
  {
    label: "Post-TRT axis recovery — small studies and case series",
    value: "Limited evidence; individual variation is high",
    note: "Gonadorelin for post-TRT axis recovery has limited formal trial data. The mechanism (stimulating a pituitary that has been suppressed by TRT) is sound. Practical outcomes depend on depth and duration of suppression, individual pituitary responsiveness, and Leydig cell viability. Anecdotal and case series data support the approach but adequately powered comparative trials do not exist.",
    tier: "moderate",
  },
  {
    label: "Continuous GnRH agonist use — axis suppression, not stimulation",
    value: "Established clinical mechanism — the paradox is clinically exploited",
    note: "Continuous GnRH agonist administration causes GnRH receptor downregulation and loss of LH/FSH secretion. This is clinically exploited for prostate cancer treatment (leuprolide, triptorelin), endometriosis, and central precocious puberty. The paradox is well-established and directly relevant to community dosing: too-frequent gonadorelin injection risks producing the same receptor desensitization as continuous agonist therapy.",
    tier: "none",
  },
  {
    label: "Gonadorelin vs. hCG for fertility during TRT — not directly compared in RCTs",
    value: "Evidence gap — mechanistically distinct; comparative data limited",
    note: "Gonadorelin (pituitary → LH + FSH → testes) and hCG (direct Leydig cell stimulation, no FSH) have different mechanisms with implications for fertility: hCG preserves testosterone and testicular volume but does not drive FSH (needed for spermatogenesis); gonadorelin drives both LH and FSH pathways. Whether gonadorelin produces superior fertility outcomes vs. hCG during TRT has not been established in adequately powered comparative trials.",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "~2-8 min", label: "plasma half-life of gonadorelin — the mechanism behind pulsatile requirement",        note: "Short half-life makes pulsatile dosing possible; it also means twice-daily injection creates long periods without GnRH receptor stimulation" },
  { stat: "Pump",     label: "evidence standard for clinical efficacy — pump delivery, not injection protocol",      note: "Lutrepulse clinical evidence is pump-based; clinic injection protocols extrapolate from this without comparative trials" },
  { stat: "hCG gap",  label: "comparative evidence vs. hCG for TRT adjunct — not directly compared in RCTs",        note: "hCG has more historical evidence as TRT adjunct; gonadorelin replaced it on mechanistic grounds after FDA guidance, not superiority data" },
  { stat: "60-120",   label: "minutes between endogenous GnRH pulses — the physiological pulsatile interval",        note: "Twice-daily injection does not replicate physiological pulsatility; it provides two large pulses spaced 12 hours apart" },
];

const MECHANISMS = [
  {
    receptor: "GnRH receptor (GnRHR) on pituitary gonadotrophs — the central axis control point",
    label: "Pulsatile stimulation maintains LH/FSH secretion; continuous stimulation causes desensitization",
    tier: "strong",
    body: "Gonadorelin binds the GnRH receptor (a GPCR) on pituitary gonadotrophs. Pulsatile stimulation (allowing receptor recovery between pulses) maintains gene expression for LH and FSH subunits, maintaining secretory capacity. Continuous stimulation produces receptor internalization and downregulation, reducing the gonadotroph's responsiveness and ultimately eliminating LH/FSH secretion — the clinical basis of GnRH agonist therapy for castration. The frequency and amplitude of GnRH pulses also differentially regulate LH vs. FSH secretion: lower frequency pulses favor FSH; higher frequency favor LH. This frequency-dependent differential is not replicable with twice-daily injection.",
    evidence: "GnRH receptor pharmacology: established textbook endocrinology. Pulsatile vs. continuous GnRH effects: clinically established (GnRH pump for amenorrhea; GnRH agonist for castration). Gonadorelin twice-daily injection LH/FSH response: limited formal characterization at community doses.",
  },
  {
    receptor: "LH → Leydig cells → testosterone; FSH → Sertoli cells → spermatogenesis",
    label: "Gonadorelin drives both testosterone and spermatogenesis pathways — hCG drives only testosterone",
    tier: "strong",
    body: "LH released by pituitary gonadotrophs binds LH receptors on testicular Leydig cells, stimulating testosterone synthesis. FSH released by the same gonadotrophs binds FSH receptors on Sertoli cells, supporting sperm maturation and spermatogenesis. Gonadorelin stimulates both pathways through pituitary engagement. hCG mimics LH at the Leydig cell level — it drives testosterone but not FSH production (FSH is not produced by the Leydig cell). For fertility preservation during TRT, the FSH pathway matters: gonadorelin preserves it; hCG does not without separate FSH supplementation.",
    evidence: "LH-Leydig cell-testosterone axis: established endocrinology. FSH-Sertoli-spermatogenesis axis: established reproductive biology. Gonadorelin FSH stimulation during TRT: mechanistically expected but not well-characterized in community dosing protocols.",
  },
];

const GAPS = [
  "Gonadorelin 100 mcg twice daily (community standard) vs. hCG for testicular preservation during TRT: not compared in adequately powered trials; gonadorelin replaced hCG on mechanistic grounds",
  "Optimal injection frequency for pulsatile stimulation without desensitization: not established; twice-daily may cause partial receptor desensitization; pump delivery is more effective but impractical",
  "Post-TRT axis recovery outcomes with gonadorelin vs. SERMs or combined protocols: not systematically compared",
  "Long-term gonadorelin use safety at typical clinic doses: limited data; most characterization is from pump-based clinical use in defined patient populations",
  "Gonadorelin effectiveness when pituitary responsiveness is substantially blunted by long-duration TRT: not characterized at community doses",
];

const OBSERVED = [
  "Maintained testicular volume during TRT is the most commonly reported experience — considered a proxy for functional testicular preservation",
  "LH and testosterone response after stopping TRT appears to normalize faster in users who maintained gonadorelin during TRT vs. no adjunct — community observation, not controlled data",
  "Some users report injection site discomfort and brief hot flashes after injection — consistent with the acute LH/FSH pulse",
  "The switch from hCG to gonadorelin in clinic protocols has been contentious — some users report preferring hCG; the comparative subjective experience is not standardized",
  "Monitoring LH and FSH 30-60 minutes post-injection is used by some community members to confirm pituitary response — the most accessible way to verify that the pulsatile response is occurring",
];

export default function GonadorelinEvidencePanel() {
  return (
    <div className="reta-evidence">

      {/* ── Evidence at a glance ── */}
      <div>
        <div className="reta-evidence__section-label">Evidence at a glance</div>
        <div className="reta-evidence__signals">
          {SIGNALS.map((s) => {
            const st = TIER_STYLE[s.tier];
            return (
              <div
                key={s.label}
                className="reta-evidence__signal"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-evidence__signal-top">
                  <span className="reta-evidence__signal-dot" style={{ color: st.dot }}>●</span>
                  <span className="reta-evidence__signal-value" style={{ color: st.text }}>{s.value}</span>
                </div>
                <div className="reta-evidence__signal-label">{s.label}</div>
                <div className="reta-evidence__signal-note">{s.note}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Evidence landscape ── */}
      <div>
        <div className="reta-evidence__section-label">The evidence landscape — established mechanism, practice-driven clinical adoption</div>
        <div className="reta-evidence__trial-header">
          The GnRH mechanism is not in question — it is textbook endocrinology. The clinical uncertainty is specific: does gonadorelin at community injection doses (100 mcg twice daily) provide adequate pulsatile stimulation for the intended outcomes, or does it produce partial receptor desensitization? And is it equivalent to hCG for testicular preservation during TRT? The evidence base supports the mechanism; the specific clinic injection protocol extrapolates from pump delivery evidence without direct comparative validation.
        </div>
        <div className="reta-evidence__trial-stats">
          {TRIAL_STATS.map((s) => (
            <div key={s.stat} className="reta-evidence__trial-stat">
              <div className="reta-evidence__trial-stat-value">{s.stat}</div>
              <div className="reta-evidence__trial-stat-label">{s.label}</div>
              <div className="reta-evidence__trial-stat-note">{s.note}</div>
            </div>
          ))}
        </div>
        <div className="reta-evidence__trial-callout">
          Gonadorelin replaced hCG in TRT clinic protocols not because of superiority evidence, but because hCG compounding access was restricted. The clinical practice change preceded the comparative evidence.
        </div>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">The mechanism — pituitary axis control and the pulsatility physics</div>
        <div className="reta-evidence__mechanisms">
          {MECHANISMS.map((m) => {
            const st = TIER_STYLE[m.tier];
            return (
              <div
                key={m.receptor}
                className="reta-evidence__mechanism"
                style={{ borderTop: `3px solid ${st.dot}` }}
              >
                <div className="reta-evidence__mechanism-receptor" style={{ color: st.dot }}>
                  {m.receptor}
                </div>
                <div className="reta-evidence__mechanism-label">{m.label}</div>
                <div className="reta-evidence__mechanism-body">{m.body}</div>
                <div className="reta-evidence__mechanism-evidence">{m.evidence}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Honest gaps ── */}
      <div>
        <div className="reta-evidence__section-label">What the evidence doesn&apos;t cover</div>
        <ul className="reta-evidence__gaps">
          {GAPS.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </div>

      {/* ── Real-world observations ── */}
      <div className="reta-evidence__observed-block">
        <div className="reta-evidence__observed-heading">
          What people actually report
          <span className="reta-evidence__observed-badge">Observed — not clinical evidence</span>
        </div>
        <div className="reta-evidence__observed-sub">
          Community reports from TRT users using gonadorelin as an adjunct or for post-TRT axis recovery.
        </div>
        <ul className="reta-evidence__observed-list">
          {OBSERVED.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
        <a className="reta-evidence__community-link" href="#community">
          Read community experiences →
        </a>
      </div>

    </div>
  );
}
