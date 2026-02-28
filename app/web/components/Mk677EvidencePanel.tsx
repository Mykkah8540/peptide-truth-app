/**
 * Mk677EvidencePanel — honest, layered evidence for MK-677 (Ibutamoren).
 * Key frame: MK-677 has more human clinical trial data than most gray-market GH-axis compounds
 * — it's been studied in elderly adults, GH-deficient adults, and catabolic conditions with RCTs.
 * The gap: those trials are in pathological/deficient populations; enhancement in healthy adults
 * is still not demonstrated by controlled trial. GH/IGF-1 elevation: confirmed. Benefit outcomes: inferred.
 */

const SIGNALS = [
  {
    label: "GH and IGF-1 elevation in humans",
    value: "Confirmed",
    note: "multiple RCTs document GH and IGF-1 elevation — MK-677 has more human trial data than ipamorelin or sermorelin; the ghrelin receptor mechanism is well-characterized",
    tier: "strong",
  },
  {
    label: "Lean mass / fat mass changes in elderly and GH-deficient adults",
    value: "Supported in specific populations",
    note: "RCTs in elderly adults show lean mass preservation and fat reduction with MK-677; the effect size is real in these populations — not just mechanistically inferred",
    tier: "moderate",
  },
  {
    label: "Sleep quality and deep sleep enhancement",
    value: "Supported (mixed)",
    note: "some controlled data suggests MK-677 increases slow-wave sleep — consistent with GH pulse timing; some users report vivid dreams or disrupted sleep rather than improvement",
    tier: "moderate",
  },
  {
    label: "Body composition in healthy young adults",
    value: "Not established",
    note: "lean mass and fat loss trials are in elderly, GHD, or catabolic populations — enhancement extrapolation to metabolically healthy young adults has not been trialed",
    tier: "none",
  },
  {
    label: "Bone density",
    value: "Supported in elderly trials",
    note: "bone density improvements documented in elderly trial contexts — not characterized for healthy adult enhancement; relevant population-specific finding",
    tier: "moderate",
  },
  {
    label: "Long-term safety in healthy adults",
    value: "No data",
    note: "entirely unstudied for sustained enhancement use in metabolically healthy adults — elderly and clinical trial data does not transfer",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "RCTs",    label: "in elderly and GH-deficient populations",   note: "MK-677 has more controlled human trial data than any injectable gray-market GH secretagogue — several RCTs including multi-year trials in elderly adults" },
  { stat: "Elderly", label: "primary studied population",                 note: "the populations with lean mass and fat evidence are elderly adults and GH-deficient patients — not healthy adults pursuing enhancement goals" },
  { stat: "0",       label: "enhancement-context RCTs in healthy adults", note: "no controlled trial exists for body composition or performance outcomes in metabolically healthy young adults" },
  { stat: "> Ipa",   label: "human evidence vs ipamorelin",               note: "MK-677 has more human trial data than ipamorelin; the population gap (elderly vs healthy adult) is the honest limitation, not absence of data" },
];

const MECHANISMS = [
  {
    receptor: "Ghrelin receptor (GHSR1a) — sustained activation",
    label: "Persistent GH pulse stimulation — the oral, long-acting ghrelin arm",
    tier: "strong",
    body: "MK-677 binds the ghrelin receptor (GHSR1a) — the same receptor as endogenous ghrelin and ipamorelin. The critical pharmacological difference is duration: MK-677's ~24-hour half-life means sustained receptor activation throughout the day, not the pulsatile stimulation of a short-acting injectable GHRP. This sustained ghrelin receptor engagement drives continuous GH secretion across multiple daily pulses rather than amplifying a single bedtime pulse. The downstream consequence: more total daily GH exposure, more persistent appetite stimulation, more sustained insulin counter-regulation, and more fluid retention than injectable GHRPs at comparable GH output.",
    evidence: "Ghrelin receptor mechanism well-characterized. GH/IGF-1 elevation in humans: documented in multiple RCTs. Sustained vs pulsatile GH pattern: pharmacologically established. Enhancement extrapolation: inferred from elderly/GHD data.",
  },
  {
    receptor: "GH → IGF-1 axis",
    label: "Downstream anabolic and mitogenic signaling",
    tier: "strong",
    body: "GH elevation — sustained in MK-677's case — drives hepatic IGF-1 synthesis. IGF-1 elevation is documented in MK-677 RCTs, not just mechanistically inferred. IGF-1 is the primary mediator of GH's effects on lean mass, fat, and bone — and is also a direct mitogen. The cancer history concern is the same as all GH-axis compounds; MK-677's sustained IGF-1 elevation (vs pulsatile) may be mechanistically more concerning for cancer proliferation than shorter-acting GHRPs, though this distinction hasn't been directly studied.",
    evidence: "GH/IGF-1 physiology well-established. IGF-1 elevation in humans: documented in MK-677 RCTs. Cancer risk from sustained IGF-1 elevation vs pulsatile: not directly compared.",
  },
  {
    receptor: "Ghrelin peripheral effects — appetite and fluid",
    label: "The practical tradeoffs: hunger, cravings, and water retention",
    tier: "moderate",
    body: "The ghrelin receptor is the 'hunger hormone' receptor. Persistent activation drives appetite stimulation throughout the day — not just post-injection. This is the most practically significant MK-677-specific effect. For lean mass goals with adequate caloric intake, it can be an asset. For fat loss, body recomposition, or anyone managing caloric intake, it's a persistent headwind. The ghrelin pathway also contributes to fluid retention via GH-mediated effects on kidney sodium handling — edema is common and more sustained than with injectable GHRPs.",
    evidence: "Appetite stimulation: consistent across trials. Fluid retention: documented. Carpal tunnel / peripheral neuropathy symptoms (likely GH-mediated nerve compression from fluid retention): reported in trials and community use; dose-dependent.",
  },
];

const GAPS = [
  "All meaningful lean mass and fat outcome data is from elderly adults and GH-deficient populations — enhancement extrapolation to healthy young adults is mechanistically plausible but not trialed",
  "Sustained vs pulsatile GH elevation: whether 24-hour continuous GH stimulation is more beneficial or more risky than pulsatile patterns is not characterized for enhancement outcomes",
  "Carpal tunnel / peripheral neuropathy: documented in trials as dose-dependent; long-term reversibility not established",
  "Cancer risk from sustained (vs pulsatile) IGF-1 elevation: mechanistically distinct question from injectable GHRPs; not directly studied",
  "Long-term glucose tolerance effects of sustained GH elevation in healthy adults: trials in elderly show some glucose effects; healthy adult data absent",
  "Ghrelin receptor desensitization with continuous long-term activation: relevant pharmacological question for sustained MK-677 use; not characterized",
];

const OBSERVED = [
  "Appetite increase is the most consistent early report — users describe persistent hunger and cravings, often throughout the day; caloric intake management is the primary practical challenge",
  "Vivid dreams are commonly reported within the first week — consistent with MK-677's effects on GH and sleep architecture; for most users this settles; some find it disruptive",
  "Water retention (face, hands, feet) is common early; carpal tunnel or hand tingling is frequently reported at higher doses — often responds to dose reduction",
  "Sleep quality improvement is reported by some users; disrupted sleep (vivid dreams, increased appetite/night waking) is reported by others — mixed community signal",
  "The 'oral GH secretagogue' appeal drives significant community use — MK-677 is often described as the entry point for GH-axis compounds due to the lack of injection requirement",
  "Glucose monitoring is less commonly practiced in MK-677 community use than the sustained GH elevation mechanistically warrants — a gap between practice and risk profile",
];

export default function Mk677EvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — more data than most GH-axis compounds, wrong population</div>
        <div className="reta-evidence__trial-header">
          MK-677 sits at the top of the GH-axis evidence hierarchy for gray-market compounds — it has actual RCT data, including multi-year trials. The honest limitation is population: those trials are in elderly adults and GH-deficient patients. The enhancement extrapolation to healthy adults is the same inferential jump as with less-studied compounds — just with a stronger mechanistic foundation.
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
          GH and IGF-1 elevation: confirmed. Lean mass changes in elderly: documented. Enhancement benefit in healthy young adults: mechanistically inferred, not trialed. Those statements coexist honestly.
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
