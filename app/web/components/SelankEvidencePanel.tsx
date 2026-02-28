/**
 * SelankEvidencePanel — honest, layered evidence for Selank.
 * Key frame: mechanistically grounded, evidence from Russian clinical tradition.
 * GABAergic modulation and enkephalinase inhibition are the documented mechanisms.
 * Anxiety reduction: supported in Russian clinical studies; limited Western RCT replication.
 * Safety profile: favorable in available data. Long-term: not characterized.
 */

const SIGNALS = [
  {
    label: "Anxiolytic effect (Russian clinical data)",
    value: "Supported — limited Western replication",
    note: "Russian clinical studies report anxiolytic effects in anxiety disorder populations — consistent with the proposed mechanism; independent Western RCT replication is limited; the evidence is real but from a single clinical tradition",
    tier: "moderate",
  },
  {
    label: "GABAergic modulation mechanism",
    value: "Mechanistically documented",
    note: "Selank modulates GABAergic signaling — enhancing inhibitory tone in a manner distinct from benzodiazepines (which are direct GABA-A positive allosteric modulators); the specific receptor subunit interactions are partially characterized in pharmacology research",
    tier: "moderate",
  },
  {
    label: "Enkephalinase inhibition (endogenous opioid effect)",
    value: "Documented in pharmacology research",
    note: "Selank inhibits enkephalinase (aminopeptidase that breaks down enkephalins), raising endogenous enkephalin levels; enkephalins are endogenous opioid peptides involved in mood, pain, and anxiety modulation — this mechanism contributes to the anxiolytic profile",
    tier: "moderate",
  },
  {
    label: "Cognitive enhancement effects",
    value: "Reported — less characterized than anxiolytic",
    note: "Community reports and some Russian data suggest cognitive improvement (memory, focus) alongside anxiolytic effects; the mechanistic basis (BDNF, enkephalin, and serotonin pathway interactions) is plausible; clinical evidence is less developed than for the anxiolytic indication",
    tier: "moderate",
  },
  {
    label: "Anxiety relief without sedation (vs benzodiazepines)",
    value: "Supported in available data",
    note: "The absence of significant sedation at anxiolytic doses is consistently reported across Russian studies and community experience — a differentiating feature vs benzodiazepines that is mechanistically consistent with the non-direct GABA-A agonism",
    tier: "moderate",
  },
  {
    label: "Long-term safety and efficacy in Western populations",
    value: "Not established",
    note: "Long-term safety beyond the Russian trial periods is not characterized; Western population RCT data is absent; the safety profile appears favorable in available evidence but the evidence base has real geographic and methodological limitations",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "RU",     label: "clinical studies from Russian Institute of Molecular Genetics",   note: "Selank was developed and studied primarily within the Russian clinical research system; the evidence base reflects this specific tradition" },
  { stat: "GABA+",  label: "GABAergic modulation confirmed in pharmacology research",         note: "Mechanism is grounded in documented receptor pharmacology — not hypothetical" },
  { stat: "ENK+",   label: "enkephalinase inhibition — endogenous opioid peptide effect",    note: "Second mechanism layer: raising enkephalin levels adds an endogenous opioid-adjacent calming signal" },
  { stat: "0",      label: "FDA-level RCTs or large Western independent replications",        note: "No Phase III or FDA-equivalent trials; no large-scale independent replication outside Russian research tradition" },
];

const MECHANISMS = [
  {
    receptor: "GABA-A receptor modulation — anxiolytic without direct agonism",
    label: "Inhibitory tone enhancement — different pathway than benzodiazepines",
    tier: "moderate",
    body: "Selank is a synthetic heptapeptide (Thr-Lys-Pro-Arg-Pro-Gly-Pro) derived from tuftsin. Its primary proposed anxiolytic mechanism involves modulating GABA-A receptor signaling, enhancing inhibitory tone in anxiety-relevant brain circuits. Critically, this appears to operate via a different mechanism than benzodiazepines — benzodiazepines are direct positive allosteric modulators of GABA-A (binding the benzodiazepine site and broadly potentiating chloride influx). Selank's GABA-A interaction appears more modulatory and less directly sedating. This mechanistic distinction is the proposed basis for the anxiolytic-without-sedation profile. The precise receptor subunit specificity is partially characterized — it's not as pharmacologically detailed as the benzodiazepine receptor pharmacology.",
    evidence: "Tuftsin-derived peptide pharmacology: documented. GABA-A modulation: supported in pharmacology research. Mechanistic distinction from benzodiazepines: plausible based on receptor interaction pattern. Clinical anxiolytic magnitude: documented in Russian studies; Western replication limited.",
  },
  {
    receptor: "Enkephalinase (aminopeptidase N) inhibition — endogenous opioid peptide pathway",
    label: "Raising endogenous enkephalins — calming signal via opioid peptide system",
    tier: "moderate",
    body: "Enkephalins are endogenous opioid peptides involved in mood modulation, pain processing, and anxiety regulation. Enkephalinase (also called aminopeptidase N or CD13) is the enzyme that breaks down enkephalins. Selank inhibits enkephalinase, reducing enkephalin breakdown and therefore raising endogenous enkephalin levels. This provides an additional calming/anxiolytic signal through the opioid peptide system — not via mu-opioid receptor stimulation (like morphine) but via raising the endogenous opioid peptide tone. This is a second pharmacological layer complementing the GABAergic mechanism. The interaction of raised enkephalins with GABAergic signaling creates a multi-pathway anxiolytic effect.",
    evidence: "Enkephalinase inhibition by selank: documented in pharmacology research. Enkephalin levels: raised in animal models. Clinical contribution to anxiolytic effect: inferred from mechanism; specifically quantified contribution in humans not separately established.",
  },
  {
    receptor: "Serotonergic and BDNF pathways — secondary neurochemical effects",
    label: "Mood and cognitive effects — consistent with reported profile",
    tier: "moderate",
    body: "Selank has documented effects on serotonin metabolism and brain-derived neurotrophic factor (BDNF) in animal models. Serotonin is a primary anxiety and mood neurotransmitter. BDNF supports neuronal health, learning, and mood regulation. These secondary effects are mechanistically consistent with the cognitive improvement and mood stability reported alongside the anxiolytic effect. They're less precisely characterized than the GABA and enkephalin mechanisms.",
    evidence: "Serotonin pathway effects: documented in animal pharmacology. BDNF: suggested in preclinical data. Human clinical significance of these secondary pathways: less precisely established than the primary anxiolytic mechanisms.",
  },
];

const GAPS = [
  "Large Western independent RCTs: absent — the evidence base is substantially from Russian clinical research tradition",
  "Head-to-head comparison with FDA-approved anxiolytics in randomized conditions: not available",
  "Dose-response relationship in Western populations: not characterized — effective dose ranges are extrapolated from Russian study data",
  "Long-term safety and efficacy beyond trial periods: not established",
  "CNS interaction profile with common Western psychiatric medications (SSRIs, SNRIs): not systematically studied",
  "Cognitive enhancement outcomes in healthy adults without anxiety: anecdotally reported; not formally trialed",
];

const OBSERVED = [
  "The 'anxi-smart' framing is community-standard — reduced anxiety with maintained or improved mental clarity is the most consistently reported effect quality",
  "Selank is frequently combined with Semax in community protocols — Semax for cognitive activation, Selank for anxiolytic balance; the stack is described as synergistic by many users",
  "Nasal irritation with repeated use is the most commonly mentioned minor adverse effect — consistent with intranasal peptide use",
  "Some users report a subtle mood lift alongside the anxiolytic effect — consistent with the serotonergic and enkephalin mechanisms",
  "Tolerance has not been commonly reported in community experience — consistent with the proposed non-benzodiazepine mechanism",
  "Russian biohacking and research communities have longer use histories with selank than Western communities — the evidence gap reflects geography, not necessarily lack of effect",
];

export default function SelankEvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — mechanistically grounded, regionally concentrated</div>
        <div className="reta-evidence__trial-header">
          Selank&apos;s evidence is better than &ldquo;no human data&rdquo; but not as strong as FDA-level RCTs. The mechanism is pharmacologically grounded — GABA modulation and enkephalinase inhibition are documented mechanisms with established anxiolytic rationale. Russian clinical studies show anxiety reduction with a favorable tolerability profile. The honest limitation is that this evidence hasn&apos;t been replicated in large, independent Western trials. The gap is geographic and institutional — not necessarily a signal that the effect isn&apos;t real.
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
          Mechanism: documented and pharmacologically grounded. Anxiolytic effects: supported in Russian clinical data. Non-sedating profile: consistent across literature and community. Western RCT replication: absent. These facts coexist honestly.
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
