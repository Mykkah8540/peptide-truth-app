/**
 * Cjc1295EvidencePanel — honest, layered evidence for CJC-1295.
 * Key distinction: CJC-1295 has actual human interventional data (PMID 16352683, 2006).
 * That establishes endocrine effects. Enhancement outcomes (body comp, recovery, sleep)
 * remain largely supported by mechanism inference — not direct controlled trials.
 */

const SIGNALS = [
  {
    label: "GH elevation in healthy adults (human)",
    value: "Confirmed",
    note: "PMID 16352683 (2006) — controlled human study; GH increases confirmed in dose-dependent fashion",
    tier: "strong",
  },
  {
    label: "IGF-1 elevation in healthy adults (human)",
    value: "Confirmed",
    note: "Same study — IGF-1 rises secondary to GH elevation; sustained for days (especially with DAC formulation)",
    tier: "strong",
  },
  {
    label: "Body composition changes (lean mass / fat)",
    value: "Mechanistically supported",
    note: "IGF-1 drives protein synthesis and lipolysis — body comp effects are inferred from GH/IGF biology, not direct RCT outcomes",
    tier: "moderate",
  },
  {
    label: "Recovery and sleep quality",
    value: "Mechanistically supported",
    note: "GH pulses are largest during slow-wave sleep; tissue repair is GH-dependent — recovery benefits inferred, not directly trialed",
    tier: "moderate",
  },
  {
    label: "Enhancement outcome RCTs (strength, body comp, performance)",
    value: "No published data",
    note: "No controlled enhancement-context outcome trial for CJC-1295 exists; endocrine changes are confirmed, downstream benefits are not",
    tier: "none",
  },
  {
    label: "Long-term safety in healthy adults",
    value: "Limited",
    note: "Short-term human study exists; long-term safety of sustained GH-axis stimulation in healthy non-GHD adults is not established",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "1",    label: "key human interventional study",    note: "PMID 16352683 (2006); n=~64 healthy adults; GH/IGF-1 changes confirmed across dose groups" },
  { stat: "2006", label: "year of key publication",           note: "nearly 20 years old; no major follow-up RCT in enhancement context has been published" },
  { stat: "0",    label: "enhancement outcome RCTs",          note: "no controlled trial on body composition, strength, or recovery outcomes for CJC-1295" },
  { stat: "2",    label: "pharmacokinetically distinct variants", note: "DAC and no-DAC formulations have dramatically different half-lives — most published data used the no-DAC formulation" },
];

const MECHANISMS = [
  {
    receptor: "GHRH receptor / hypothalamic-pituitary axis",
    label: "Amplified GH pulse release",
    tier: "strong",
    body: "CJC-1295 binds to the GHRH receptor on pituitary somatotrophs — the same receptor that endogenous GHRH activates. By acting as a stabilized analog, it extends the duration of GHRH signaling, resulting in larger GH pulses. The no-DAC formulation amplifies individual pulses while preserving the natural pulsatile GH rhythm. The DAC formulation creates sustained albumin-bound reservoir that bleeds GHRH signal continuously — blunting pulsatility over time in exchange for dosing convenience. This mechanistic difference has downstream consequences for IGF-1 accumulation, side effect pattern, and return-to-baseline kinetics.",
    evidence: "Human interventional study (PMID 16352683). GHRH receptor pharmacology well-characterized. DAC vs no-DAC pharmacokinetic distinction confirmed in study design.",
  },
  {
    receptor: "IGF-1 axis",
    label: "Downstream mediator of body composition effects",
    tier: "moderate",
    body: "GH elevation drives hepatic IGF-1 synthesis. IGF-1 is the primary mediator of GH's anabolic effects: it promotes skeletal muscle protein synthesis, stimulates satellite cell activation, and drives lipolysis in adipose tissue. In the 2006 study, IGF-1 remained elevated for days after CJC-1295 administration — particularly with the DAC formulation. This prolonged IGF-1 elevation is the mechanistic basis for body composition interest. It is also the mechanism through which cancer risk concerns arise: IGF-1 is mitogenic and promotes cell proliferation.",
    evidence: "Human interventional study (PMID 16352683). IGF-1 biology well-established. Body composition RCTs for CJC-1295 specifically: absent.",
  },
  {
    receptor: "Glucose / insulin counter-regulation",
    label: "The downstream metabolic variable to monitor",
    tier: "moderate",
    body: "GH is counter-regulatory to insulin — it promotes hepatic glucose production and reduces peripheral insulin sensitivity. This is a normal physiological relationship in GH physiology, but it becomes clinically relevant when GH is chronically elevated above baseline. People with normal glucose metabolism typically tolerate this well. People with prediabetes, insulin resistance, or diabetes may see meaningful glucose control changes. This is not a theoretical risk — it's an established consequence of GH-axis physiology that requires monitoring in susceptible individuals.",
    evidence: "GH/insulin counter-regulation is established endocrine physiology. Specific CJC-1295 glucose dysregulation in healthy adults: not directly characterized in the published trial.",
  },
];

const GAPS = [
  "No controlled enhancement-context outcome trial exists — body composition, strength, and recovery claims are mechanistically inferred",
  "The 2006 study (PMID 16352683) is the primary human reference — nearly 20 years old, with no major clinical follow-up",
  "Long-term safety of sustained GH-axis stimulation in healthy (non-GHD) adults is not characterized",
  "DAC formulation pharmacokinetics and safety profile in community use protocols are unstudied",
  "Optimal dose, timing, and cycle length for any enhancement use case are not clinically established",
  "Cancer risk from prolonged IGF-1 elevation in non-clinical enhancement contexts: mechanistically real, not quantified for this use case",
];

const OBSERVED = [
  "Sleep depth and quality improvement in the first 2–4 weeks is the most commonly reported early subjective effect — consistent with known GH physiology",
  "Water retention (mild hand/foot edema) in the first few weeks is frequently reported — typically resolves as the body adapts",
  "CJC-1295 + ipamorelin is the dominant community stack — the two peptides are understood to work through complementary receptor mechanisms for synergistic GH release",
  "Body composition changes (improved recovery, lean mass, fat reduction) are reported over months, not weeks — consistent with IGF-1 accumulation timeframe",
  "The DAC vs no-DAC confusion is a persistent real-world problem — community reports of unexpected long-duration effects often reflect DAC product being used on no-DAC protocols",
  "Cycling protocols of 8–12 weeks on / 4–6 weeks off are the community convention — not clinically validated, but reflects reasonable endocrine caution",
];

export default function Cjc1295EvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — endocrine effects confirmed; enhancement outcomes inferred</div>
        <div className="reta-evidence__trial-header">
          One key human interventional study (PMID 16352683, 2006) establishes that CJC-1295 elevates GH and IGF-1 in healthy adults — dose-dependently and durably. This puts CJC-1295 in a different evidential tier than BPC-157 or TB-500. What remains unconfirmed is whether those endocrine changes translate into the body composition, recovery, and performance outcomes that drive community interest.
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
          The endocrine effects are confirmed. The enhancement outcomes are not. The gap between those two statements is where most of the evidence conversation actually lives.
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
          These are patterns from community reports and anecdotal accounts. They don&apos;t have the rigor of trials — but they reflect real use experience, which the published trials don&apos;t capture.
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
