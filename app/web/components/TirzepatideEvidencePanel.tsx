/**
 * TirzepatideEvidencePanel — honest, layered evidence for Tirzepatide.
 * Key frame: novel dual GLP-1/GIP mechanism with significantly stronger weight loss than semaglutide.
 * SURMOUNT program is large and well-designed. SURPASS T2D program is comprehensive.
 * Honest gaps: newer than semaglutide, CV outcome trial (SURPASS-CVOT) results pending,
 * limited long-term cessation data, head-to-head vs semaglutide only in T2D context.
 */

const SIGNALS = [
  {
    label: "Weight loss — ~20-22% body weight reduction",
    value: "Strong — large Phase 3 SURMOUNT program",
    note: "SURMOUNT-1 (15mg, n=2,539, 72 weeks): ~22.5% mean body weight reduction vs ~2.5% placebo. One-third of participants achieved ≥25% weight loss — entering bariatric surgery territory. Replicated across SURMOUNT-2 (T2D), SURMOUNT-3, and SURMOUNT-4.",
    tier: "strong",
  },
  {
    label: "Type 2 diabetes — superior glycemic control vs semaglutide",
    value: "Strong — SURPASS-2 head-to-head",
    note: "SURPASS-2 (n=1,879): tirzepatide 5mg, 10mg, and 15mg all achieved significantly greater HbA1c reductions and weight loss vs semaglutide 1mg (approved T2D dose). The T2D data is direct-comparison evidence, not just vs placebo.",
    tier: "strong",
  },
  {
    label: "GIP receptor mechanism — the additive element",
    value: "Mechanistically documented, clinical contribution characterized",
    note: "GIPR agonism adds direct adipose tissue effects (lipolysis signaling, adiponectin), potentiates the GLP-1 insulin signal, and appears to reduce GLP-1-mediated nausea. The dual mechanism is the proposed basis for superior efficacy vs GLP-1 alone.",
    tier: "strong",
  },
  {
    label: "Nausea profile — lower than semaglutide at equivalent effect",
    value: "Consistently reported — mechanistically plausible",
    note: "Clinical trial and post-market data consistently show lower nausea rates with tirzepatide vs semaglutide at equivalent weight loss magnitude. The GIPR component appears to modulate GLP-1-mediated nausea — GIPR agonism in the gut may directly attenuate the emetic GLP-1 signal.",
    tier: "strong",
  },
  {
    label: "Cardiovascular outcomes — SURPASS-CVOT",
    value: "Trial ongoing — not yet reported",
    note: "The SURPASS-CVOT trial is evaluating cardiovascular outcomes with tirzepatide. Results have not been published as of 2025. The SELECT trial cardiovascular outcome data from semaglutide does not automatically extend to tirzepatide — it's a separate compound with overlapping but distinct pharmacology.",
    tier: "none",
  },
  {
    label: "Weight maintenance after cessation",
    value: "Significant regain documented — same pattern as semaglutide",
    note: "SURMOUNT-4: re-randomization to placebo after 36 weeks on tirzepatide produced ~14% weight regain over 52 weeks. The cessation rebound is real and similar to semaglutide — obesity as a chronic disease requiring ongoing treatment is the operative frame.",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "2,539",  label: "participants in SURMOUNT-1 — the weight loss benchmark trial",              note: "72 weeks, tirzepatide 5/10/15mg weekly vs placebo; adults with BMI ≥30 or ≥27 with comorbidity, without T2D" },
  { stat: "~22%",   label: "mean body weight reduction (15mg) in SURMOUNT-1",                           note: "22.5% at 15mg vs 2.5% placebo — and one-third of 15mg participants achieved ≥25% weight loss" },
  { stat: "1,879",  label: "participants in SURPASS-2 — head-to-head vs semaglutide 1mg",               note: "All three tirzepatide doses outperformed semaglutide 1mg on both HbA1c and weight loss — the only published head-to-head RCT between these two drugs" },
  { stat: "≥25%",   label: "weight loss achieved by 1 in 3 SURMOUNT-1 participants at 15mg",            note: "Crossing into territory previously associated with bariatric surgery outcomes — a meaningful clinical benchmark" },
];

const MECHANISMS = [
  {
    receptor: "GLP-1 receptor (CNS + pancreas + GI tract)",
    label: "Shared mechanism with semaglutide — the appetite, insulin, and satiety arm",
    tier: "strong",
    body: "Tirzepatide agonizes the GLP-1 receptor with equivalent pharmacological logic to semaglutide — hypothalamic satiety signaling, pancreatic insulin secretion (glucose-dependent), glucagon suppression, and gastric emptying delay. These are the same mechanisms that drive semaglutide's efficacy. What's different with tirzepatide is that the GLP-1 activity operates alongside concurrent GIPR agonism, which appears to produce synergistic effects rather than simply additive ones. The weekly dosing and fatty acid modification for extended half-life are structurally different from semaglutide but functionally similar.",
    evidence: "GLP-1 receptor pharmacology: identical foundational science as semaglutide. Tirzepatide GLP-1R activity: characterized in preclinical and clinical studies. Synergy with GIPR: supported by SURMOUNT outcomes exceeding GLP-1 monotherapy benchmarks.",
  },
  {
    receptor: "GIP receptor (adipose tissue + pancreas + CNS)",
    label: "The novel arm — direct adipose effects, amplified insulin signaling, attenuated nausea",
    tier: "strong",
    body: "GIP (glucose-dependent insulinotropic polypeptide) receptor agonism adds several pharmacological effects not present with GLP-1 alone: direct stimulation of lipolysis in adipose tissue, potentiation of GLP-1-stimulated insulin secretion (the incretin synergy), and an apparent attenuation of GLP-1-mediated nausea. The nausea attenuation is one of the most clinically relevant distinguishing features — GIPR activation in the gut may directly modulate the GLP-1 emetic signal. GIP receptor is also expressed in bone and brain, though these effects are less characterized in the clinical data.",
    evidence: "GIPR pharmacology: established incretin biology. Direct adipose effect: documented in preclinical and clinical biomarker data. Nausea attenuation: consistent across clinical trials and post-market reports. Mechanistic basis: plausible via GLP-1/GIP receptor signaling cross-talk; not fully elucidated at molecular level.",
  },
  {
    receptor: "Combined GLP-1R + GIPR — synergistic, not just additive",
    label: "The dual agonism effect — why tirzepatide beats GLP-1 monotherapy",
    tier: "strong",
    body: "The core question about tirzepatide is whether the superior weight loss outcomes are purely additive (GLP-1 effect + GIP effect) or synergistic (the combination produces more than the sum of parts). The evidence favors synergy: the weight loss magnitude exceeds what would be predicted from GLP-1 or GIP alone. The proposed mechanism involves complementary signaling in appetite-regulating hypothalamic neurons, and possibly GIPR-mediated changes in adipose tissue sensitivity that amplify the GLP-1R weight loss signal. The molecular details of the synergy are not fully characterized, but the clinical outcome signal is robust.",
    evidence: "Synergy vs additivity: supported by outcome data but not fully mechanistically explained. SURMOUNT outcomes exceed GLP-1 monotherapy predictions. Ongoing basic science research into hypothalamic GLP-1/GIP receptor co-expression and signaling.",
  },
];

const GAPS = [
  "Cardiovascular outcome trial: SURPASS-CVOT is ongoing — the CV benefit demonstrated for semaglutide in SELECT does not automatically extend to tirzepatide; this is a real evidence gap for tirzepatide specifically",
  "Long-term safety beyond 2-3 years: SURMOUNT program goes to 72 weeks; long-term effects beyond this period are extrapolated rather than directly studied",
  "Head-to-head weight loss vs semaglutide: SURPASS-2 compared T2D doses, not obesity doses; no published head-to-head at Wegovy/Zepbound equivalent doses",
  "Lean mass preservation data: SURMOUNT trials measured weight, not body composition systematically; the lean mass preservation question requires additional study",
  "Weight maintenance strategies and minimum effective dose: what is the lowest dose that maintains weight loss in people who responded to 15mg? Not established",
  "Mental health signals: same ongoing post-market pharmacovigilance questions as semaglutide; the causal relationship between GLP-1 class drugs and mental health outcomes is being actively studied",
];

const OBSERVED = [
  "Users switching from semaglutide frequently report the same or greater weight loss effect with meaningfully less nausea — consistent with the mechanistic prediction from GIPR co-agonism",
  "The first few weeks at each dose escalation point remain the most difficult tolerability period — nausea and GI discomfort typically improve within 1-2 weeks of each escalation",
  "Significant appetite suppression means some users struggle to meet protein targets — active protein tracking is the most commonly discussed mitigation strategy in communities",
  "Hair thinning (telogen effluvium) is reported at rates comparable to semaglutide — driven by rapid weight loss, not the drug; stabilizes as weight plateaus",
  "Some users report reduced cravings for alcohol and highly palatable food beyond the general appetite suppression — consistent with reward pathway GLP-1R effects",
  "Injection site reactions appear similar to semaglutide — mild redness and swelling are common; technique and rotation matter for reducing reactions",
];

export default function TirzepatideEvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — large, well-designed, and newer than semaglutide</div>
        <div className="reta-evidence__trial-header">
          The SURMOUNT and SURPASS trial programs are large and well-executed — tirzepatide&apos;s evidence base is genuinely strong, not marginal. The key context: it&apos;s newer. Semaglutide has 7+ years of post-market experience; tirzepatide&apos;s commercial use began in 2022. The cardiovascular outcome question (SURPASS-CVOT) remains open. The head-to-head weight loss data vs semaglutide is limited to the T2D dose comparison in SURPASS-2. These are gaps to hold alongside the strong efficacy signal.
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
          Efficacy: strong. Novel dual mechanism: documented. Cardiovascular outcomes: pending. Long-term real-world experience: still accumulating. These coexist honestly.
        </div>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">The mechanism pathways — what we know and what it means</div>
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
          These are patterns from community reports and post-market anecdotal accounts. They reflect real use experience that clinical trials don&apos;t fully capture.
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
