/**
 * KisspeptinEvidencePanel — honest evidence for Kisspeptin.
 * Key frame: IVF trigger has the strongest human data. Hypogonadism
 * has small but real studies. The pulsatile mechanism is well-established
 * in neuroendocrinology. Community testosterone optimization has minimal
 * dedicated evidence. The continuous-suppression paradox is mechanistically clear.
 */

const SIGNALS = [
  {
    label: "IVF oocyte maturation trigger — kisspeptin-54 Phase 2 data",
    value: "Phase 2 human RCT — most rigorous kisspeptin evidence",
    note: "KP-54 (kisspeptin-54) has been studied as a trigger for final oocyte maturation in IVF, replacing the conventional hCG trigger. Clinical trials from the Dhillo group at Imperial College London demonstrated successful oocyte maturation and live birth rates with kisspeptin trigger. This is real peer-reviewed human data from controlled IVF cycles. The evidence supports the clinical use of kisspeptin-54 in this specific, supervised context — it does not validate ongoing repeated dosing for testosterone optimization.",
    tier: "moderate",
  },
  {
    label: "Acute LH pulse induction in healthy volunteers — mechanistically confirmed",
    value: "Well-established in multiple human studies",
    note: "Subcutaneous injection of KP-10 or KP-54 in healthy volunteers consistently produces a measurable LH pulse within 30-60 minutes, followed by sex steroid elevation (testosterone in males, estradiol in females). This acute pharmacological effect is documented across multiple research groups. It confirms that the kisspeptin → GnRH → LH pathway is pharmacologically accessible through exogenous kisspeptin administration in healthy individuals.",
    tier: "strong",
  },
  {
    label: "Hypogonadotropic hypogonadism treatment — small studies in males",
    value: "Small pilot studies — mechanistically rational, not adequately powered",
    note: "A small number of clinical studies have administered repeated kisspeptin dosing to males with hypogonadotropic hypogonadism (low LH, low testosterone due to hypothalamic/pituitary failure rather than testicular failure). These studies showed testosterone elevation with pulsatile administration. The studies are small, the dosing protocols vary, and they do not represent the general community use case (healthy males seeking testosterone optimization above their baseline).",
    tier: "moderate",
  },
  {
    label: "Continuous kisspeptin → axis suppression — the desensitization paradox",
    value: "Mechanistically established — the defining constraint of community use",
    note: "Continuous GPR54 stimulation produces receptor desensitization and downregulation, reducing GnRH pulse amplitude and frequency — paradoxically suppressing the axis rather than stimulating it. This is the same mechanism by which continuous GnRH agonists (leuprolide, triptorelin) achieve medical castration for prostate cancer or endometriosis: constant stimulation eventually exhausts the system. Community protocols that dose kisspeptin daily or multiple times daily may be achieving axis suppression rather than optimization.",
    tier: "none",
  },
  {
    label: "Post-TRT axis recovery — community use case with minimal dedicated evidence",
    value: "Mechanistically plausible — no dedicated human RCTs",
    note: "Post-TRT axis recovery is the most common community use case for kisspeptin. The logic: exogenous testosterone suppresses the HPG axis at the hypothalamic level (reducing GnRH → LH → FSH → testosterone signaling); kisspeptin addresses this at the hypothalamic level by stimulating GnRH again. The mechanism is rational. Small clinical studies and case reports support this application. A dedicated RCT for post-TRT axis recovery using kisspeptin does not exist.",
    tier: "moderate",
  },
  {
    label: "Testosterone optimization in healthy males — community use with essentially no dedicated evidence",
    value: "No human RCTs for this specific application",
    note: "Using kisspeptin to push testosterone above baseline in healthy eugonadal males (normal LH, normal testosterone) has essentially no clinical trial data. The mechanism works at the hypothalamic level — but a healthy axis is already producing near-maximal GnRH pulses for that individual. Whether kisspeptin can meaningfully increase testosterone above the individual's physiological set point, without continuous receptor desensitization, is not established.",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "KP-54",     label: "IVF trigger form — most evidence; KP-10 for acute LH pulse studies",                    note: "Different kisspeptin forms have different clinical applications; community products often don't specify which form they contain" },
  { stat: "~60 min",   label: "time to LH peak after subcutaneous injection — acute pharmacology well-characterized",    note: "The acute LH response is the most reliably demonstrated effect across multiple research groups" },
  { stat: "Pulsatile", label: "dosing requirement — continuous administration suppresses rather than stimulates",          note: "This is the most important and most underappreciated pharmacological constraint of kisspeptin community use" },
  { stat: "0",         label: "published RCTs for testosterone optimization in healthy eugonadal males",                  note: "The primary community use case has no dedicated trial evidence; extrapolated from hypogonadism studies" },
];

const MECHANISMS = [
  {
    receptor: "GPR54 / KISS1R — hypothalamic GnRH neurons",
    label: "The upstream reproductive axis trigger — and the desensitization paradox",
    tier: "strong",
    body: "Kisspeptin binds GPR54 (KISS1R) on hypothalamic KNDy neurons, triggering a GnRH burst. This is the most upstream pharmacological access point for the reproductive axis. The desensitization constraint: GPR54 is a G-protein coupled receptor that downregulates with continuous stimulation — reducing GnRH pulse amplitude and frequency. This is why continuous kisspeptin administration produces axis suppression. Pulsatile delivery — mimicking the body's own ~60-120 minute GnRH pulse interval — avoids sustained receptor occupancy and maintains axis responsiveness. Clinical protocols (IVF trigger, hypogonadism studies) use this constraint explicitly. Community use often ignores it.",
    evidence: "GPR54 as kisspeptin receptor: established molecular pharmacology. KNDy neuron physiology: established in neuroendocrinology. Pulsatile GnRH requirement: established (basis of gonadorelin pump therapy for hypogonadism). Kisspeptin-induced LH pulse in humans: multiple clinical studies. Desensitization with continuous kisspeptin: demonstrated in animals; inferred from the GnRH agonist paradox in humans.",
  },
  {
    receptor: "Negative feedback interaction — estrogen and testosterone modulation of kisspeptin neurons",
    label: "Sex steroids regulate kisspeptin — which means exogenous steroids affect kisspeptin sensitivity",
    tier: "moderate",
    body: "Kisspeptin neurons are regulated by estrogen and testosterone negative feedback — high sex steroid levels suppress kisspeptin neuron activity, reducing GnRH pulses. This is normal physiology. In TRT users, high exogenous testosterone creates profound negative feedback on kisspeptin neurons — making them less responsive. Adding kisspeptin to this environment attempts to stimulate a suppressed system from above. The logic is mechanistically sound but the practical effectiveness depends on how deeply suppressed the axis is and how long suppression has lasted — neither of which is characterized for the post-TRT community use case.",
    evidence: "Sex steroid negative feedback on kisspeptin neurons: established neuroendocrinology. Testosterone-induced kisspeptin neuron suppression: animal and human studies. Kisspeptin effectiveness in TRT-suppressed males: not directly studied in adequately powered trials.",
  },
];

const GAPS = [
  "Optimal pulsatile dosing interval for testosterone optimization: not established — clinical studies use pumps or frequent injections; the community subcutaneous injection protocol does not replicate pulsatile GnRH pump delivery",
  "Post-TRT axis recovery: no dedicated RCT; the most clinically relevant community use case has the least direct clinical evidence",
  "Testosterone optimization in healthy eugonadal males: no RCT; it is unknown whether kisspeptin can meaningfully raise testosterone above physiological baseline without desensitization",
  "Kisspeptin form in research-grade products: often unspecified — KP-10 and KP-54 have different half-lives and potencies; community products frequently don't specify which form is supplied",
  "Long-term continuous vs. pulsatile outcomes: the desensitization paradox is established mechanistically; the practical community dosing threshold between stimulating and suppressing is not characterized",
  "Female use for LH/estrogen optimization: mechanistically distinct; estrogen-sensitive conditions are a contraindication; essentially no dedicated female community use evidence",
];

const OBSERVED = [
  "Post-TRT axis restart is the most common community application — most users report using kisspeptin after stopping TRT, alongside or instead of hCG/clomid protocols",
  "Acute LH response is reported by users who measure LH blood levels — this is the one measurable acute outcome that community users can verify",
  "Pulsatile dosing is increasingly discussed in informed community circles — but many users still dose continuously without understanding the desensitization paradox",
  "The 'nothing noticeable' report is common — particularly for eugonadal males trying to optimize above baseline; the axis may already be near its physiological ceiling",
  "Combination with gonadorelin is common in community use — different mechanism (GnRH vs. kisspeptin) but similar pulsatile constraint applies to both",
];

export default function KisspeptinEvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — real mechanism, clinical fertility data, extrapolated testosterone use</div>
        <div className="reta-evidence__trial-header">
          The kisspeptin mechanism is among the best-characterized in reproductive neuroendocrinology — it is a genuine discovery in the field (KISS1 gene was identified in the early 2000s as the critical upstream reproductive axis regulator). The IVF trigger evidence is real and clinically meaningful. The community testosterone optimization use case extrapolates from hypogonadism studies without dedicated evidence. The pulsatile constraint is the most underappreciated pharmacological fact in community use — it is not a dosing preference, it is a mechanistic requirement.
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
          Kisspeptin is unusual among community-used peptides: the mechanism is scientifically well-established, the clinical evidence for the IVF application is real, and the community use case is mechanistically rational — but the specific community application (testosterone optimization) has minimal dedicated evidence and a critical pharmacological constraint that most users underappreciate.
        </div>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">The mechanism — well-characterized neuroendocrinology with a critical pulsatility constraint</div>
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
          Community reports from hormone-focused users, primarily males using kisspeptin for post-TRT axis recovery or testosterone optimization.
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
