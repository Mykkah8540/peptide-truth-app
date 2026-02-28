/**
 * SemaxEvidencePanel — honest, layered evidence for Semax.
 * Key frame: BDNF upregulation mechanistically documented. Russian clinical data
 * for stroke/cognitive recovery. Cognitive enhancement in healthy adults: extrapolated.
 * Dopaminergic/serotonergic activation: documented in animal models + supported by human reports.
 */

const SIGNALS = [
  {
    label: "BDNF upregulation",
    value: "Documented in animal models; human data supported",
    note: "Semax-induced BDNF upregulation is documented in animal models and supported by Russian clinical data — BDNF elevation is the most pharmacologically grounded component of semax's proposed cognitive and neuroprotective mechanism",
    tier: "moderate",
  },
  {
    label: "Cognitive effects in stroke / neurological recovery (Russian data)",
    value: "Supported — Russian clinical context",
    note: "Russian clinical studies show cognitive benefit in stroke recovery and neurological impairment contexts — real clinical data from the approved indication context; methodology and independence vary",
    tier: "moderate",
  },
  {
    label: "Dopaminergic and serotonergic pathway activation",
    value: "Documented in animal and pharmacology research",
    note: "Semax produces measurable dopamine and serotonin pathway activation in animal models — consistent with the stimulatory and mood-activating effects reported by users; human neurotransmitter quantification data is less detailed",
    tier: "moderate",
  },
  {
    label: "Cognitive enhancement in healthy adults (off-label enhancement)",
    value: "Not established by RCT",
    note: "No controlled trial on cognitive enhancement in healthy adults without neurological impairment — the community enhancement use is extrapolated from the stroke/neurological recovery context and the mechanistic data",
    tier: "none",
  },
  {
    label: "Neuroprotection effects",
    value: "Mechanistically plausible; not RCT-confirmed in healthy adults",
    note: "BDNF upregulation is a plausible neuroprotective mechanism — BDNF is involved in neuronal survival. Whether semax produces clinically meaningful neuroprotection in healthy adults without neurological impairment is not established",
    tier: "none",
  },
  {
    label: "Long-term safety in healthy adult enhancement use",
    value: "Not characterized",
    note: "Long-term use in healthy adults for enhancement is not studied in Western research; Russian clinical use provides some longer-term data in patient populations but not healthy adult enhancement contexts",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "BDNF+",   label: "upregulation documented — the strongest mechanism signal",                    note: "Animal model data strong; human BDNF quantification partially characterized in Russian literature" },
  { stat: "RU Clin", label: "Russian clinical approval for stroke / cognitive impairment contexts",         note: "Approved medicine in Russia; evidence base from that clinical tradition" },
  { stat: "DA/5HT+", label: "dopaminergic and serotonergic activation — consistent with reported effects", note: "Animal model data supporting the stimulatory and mood-activating clinical profile" },
  { stat: "0",       label: "Western RCTs in healthy adult cognitive enhancement",                         note: "No Phase III or independent Western controlled trial for enhancement use in healthy adults" },
];

const MECHANISMS = [
  {
    receptor: "BDNF / TrkB signaling pathway — neuroprotection and neuroplasticity",
    label: "The core mechanism: BDNF upregulation supports synaptic plasticity and neuronal health",
    tier: "moderate",
    body: "Semax is a heptapeptide (Met-Glu-His-Phe-Pro-Gly-Pro) derived from the ACTH(4-7) sequence with a C-terminal Pro-Gly-Pro added for metabolic stability. ACTH(4-7) is the active fragment for cognitive and neuroprotective effects — the sequence has known interactions with neuropeptide signaling in the brain. Semax's most pharmacologically documented effect is upregulation of BDNF (brain-derived neurotrophic factor) and its receptor TrkB. BDNF is critical for neuronal survival, synaptic plasticity, long-term potentiation (memory formation), and mood regulation. In Russian clinical use, the BDNF mechanism is the proposed basis for cognitive improvement in stroke recovery. In healthy adults, BDNF upregulation is proposed to support learning efficiency, working memory, and long-term cognitive health. The magnitude of BDNF effect in healthy adults at community doses is less precisely established than in patient populations.",
    evidence: "BDNF upregulation: documented in animal models and supported in Russian clinical data. TrkB pathway: established neuroscience. Cognitive benefit in stroke recovery: supported by Russian clinical studies. Cognitive enhancement in healthy adults: extrapolated from mechanism and patient-population data.",
  },
  {
    receptor: "Dopaminergic and serotonergic systems — acute cognitive activation",
    label: "Stimulatory profile: dopamine and serotonin pathway activation",
    tier: "moderate",
    body: "Semax produces measurable effects on dopamine and serotonin metabolism in animal models — consistent with the acute stimulatory and focus-enhancing effects reported by users. Dopamine is central to motivation, executive function, and working memory. Serotonin modulates mood, cognitive flexibility, and anxiety. The combination of dopaminergic and serotonergic activation alongside BDNF upregulation produces the characteristic semax effect: acute cognitive activation (dopamine/serotonin) with cumulative neuroplastic support (BDNF). This stimulatory component is also why semax can worsen anxiety in anxiety-prone individuals — dopaminergic activation can increase anxious arousal in some people.",
    evidence: "Dopaminergic/serotonergic effects: documented in animal pharmacology. Acute stimulatory profile in humans: consistent with community reports and the mechanistic data. Anxiety-worsening in susceptible individuals: consistent with dopaminergic stimulation mechanism.",
  },
  {
    receptor: "VEGF and anti-inflammatory effects — additional neuroprotective signals",
    label: "Secondary neuroprotective mechanisms — vascular and inflammatory",
    tier: "moderate",
    body: "Russian research on semax documents effects on vascular endothelial growth factor (VEGF) and neuroinflammatory pathways — additional proposed neuroprotective mechanisms beyond BDNF. VEGF supports cerebrovascular health; anti-inflammatory effects in neural tissue could contribute to neurological recovery. These secondary mechanisms are more robustly studied in the stroke/ischemia context than in healthy adults. In healthy enhancement use, their significance is speculative.",
    evidence: "VEGF effects: documented in Russian pharmacology research. Anti-inflammatory CNS effects: documented in stroke/ischemia models. Significance in healthy adult enhancement: not established.",
  },
];

const GAPS = [
  "Western independent RCTs for cognitive enhancement in healthy adults: absent — evidence is entirely from Russian clinical tradition plus animal models",
  "BDNF magnitude in healthy humans at community doses: not precisely quantified outside Russian clinical contexts",
  "Head-to-head comparison with exercise-induced BDNF elevation: never studied; exercise produces robust BDNF with strong Western RCT evidence",
  "Long-term cognitive outcomes from semax use in healthy adults: not studied",
  "CNS medication interaction profile: incompletely characterized — dopaminergic/serotonergic interactions with antidepressants, stimulants, and antipsychotics not formally studied",
  "Dose-response relationship in Western populations: not established; community doses are extrapolated from Russian clinical data",
];

const OBSERVED = [
  "The stimulatory cognitive activation effect is the most consistently reported acute finding — described as faster thinking, clearer focus, improved word retrieval",
  "Selank + Semax is the most commonly reported combination — anxiety balance (Selank) with cognitive activation (Semax); described as synergistic for cognitive goals",
  "Anxiety worsening at higher doses or in anxiety-prone individuals is consistently reported — consistent with the dopaminergic stimulation mechanism",
  "Some users report the BDNF effect manifesting as improved learning retention over multi-week use — slower-onset cumulative effect distinct from the acute activation",
  "Nasal irritation with repeated intranasal use is the most consistently mentioned minor adverse effect",
  "Russian-speaking biohacking communities have more extensive experience with semax than Western communities — the compound is better-characterized in that cultural context",
];

export default function SemaxEvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — mechanism strong, Western RCTs absent</div>
        <div className="reta-evidence__trial-header">
          Semax has a pharmacologically grounded mechanism (BDNF upregulation, dopaminergic/serotonergic activation) and clinical evidence from Russian medicine where it&apos;s used for stroke and cognitive impairment recovery. The enhancement use case extrapolates from that clinical data and the mechanistic research. The Western RCT gap is the same one that affects selank — it reflects geography and research tradition, not necessarily an absence of effect.
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
          BDNF upregulation: documented. Cognitive benefit in stroke/neurological recovery: supported by Russian clinical data. Acute stimulatory/activation effect: mechanistically consistent and community-confirmed. Cognitive enhancement in healthy adults: extrapolated. These facts coexist honestly.
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
