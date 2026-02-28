/**
 * Ghrp2EvidencePanel — honest, layered evidence for GHRP-2.
 * Key frame: GHRP-2 has meaningful human GH data from research contexts —
 * it established the ghrelin receptor agonism proof of concept.
 * The cortisol/prolactin elevation is also well-documented.
 * Enhancement outcome data: absent. Same gap as ipamorelin, with worse tradeoff profile.
 */

const SIGNALS = [
  {
    label: "GH release in humans",
    value: "Confirmed",
    note: "GHRP-2 reliably stimulates GH release in human studies — the ghrelin receptor mechanism is established; this is the compound that proved the concept works in humans",
    tier: "strong",
  },
  {
    label: "Cortisol elevation",
    value: "Confirmed",
    note: "cortisol elevation following GHRP-2 administration is documented in human pharmacology studies — this is not a theoretical concern; it is a characterized pharmacological effect",
    tier: "strong",
  },
  {
    label: "Prolactin elevation",
    value: "Confirmed",
    note: "prolactin elevation alongside GH release is documented for GHRP-2 — part of the non-selective profile that distinguishes it from ipamorelin",
    tier: "strong",
  },
  {
    label: "IGF-1 elevation",
    value: "Mechanistically expected",
    note: "GH elevation drives IGF-1 — downstream pathway established; GHRP-2-specific IGF-1 data less characterized than CJC-1295 or MK-677",
    tier: "moderate",
  },
  {
    label: "Body composition / recovery outcomes",
    value: "Not established",
    note: "no controlled trial on body composition or recovery outcomes in enhancement context — same gap as ipamorelin, with the additional cortisol catabolic counter-pressure",
    tier: "none",
  },
  {
    label: "Long-term safety in healthy adults",
    value: "No data",
    note: "completely unstudied for sustained enhancement use — and the chronic cortisol/prolactin elevation question is an additional uncharacterized variable",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "GH+",    label: "release confirmed in human pharmacology studies",  note: "GHRP-2 established the ghrelin receptor → GH release mechanism in humans; this is real pharmacology data" },
  { stat: "CORT+",  label: "cortisol elevation also confirmed",                 note: "the cortisol signal isn't a theoretical risk — it's a characterized pharmacological effect in human studies" },
  { stat: "0",      label: "enhancement-context outcome RCTs",                  note: "no controlled trial on body composition, recovery, or performance outcomes" },
  { stat: "< Ipa",  label: "clinical desirability vs ipamorelin",               note: "ipamorelin was developed precisely because GHRP-2's cortisol/prolactin profile was a clinical limitation — the field moved on" },
];

const MECHANISMS = [
  {
    receptor: "Ghrelin receptor (GHSR1a)",
    label: "GH pulse release — the non-selective ghrelin arm",
    tier: "strong",
    body: "GHRP-2 binds the ghrelin receptor (GHSR1a) and stimulates pituitary GH release — the same receptor as ipamorelin and GHRP-6. The mechanism is established and the GH release is real. The key distinction is what else GHRP-2 does at this receptor: unlike ipamorelin (which was optimized for selectivity), GHRP-2 produces significant off-target effects — particularly cortisol and prolactin elevation. This non-selective profile is not accidental; it reflects the pharmacological difference between GHRP-2 (a first-generation GHRP) and ipamorelin (designed for improved selectivity). Both produce GH. GHRP-2 produces more collateral endocrine activation.",
    evidence: "Ghrelin receptor pharmacology established. GH release: confirmed in human studies. Cortisol and prolactin elevation: documented as pharmacological effects. Enhancement outcomes: inferred.",
  },
  {
    receptor: "Cortisol / HPA axis activation",
    label: "The non-selective burden — catabolic counter-pressure",
    tier: "strong",
    body: "GHRP-2's cortisol elevation is documented, not theoretical. Cortisol is a glucocorticoid — it promotes catabolism (protein breakdown), glucose mobilization, and suppression of anabolic processes. Running GHRP-2 for recovery or muscle goals means running a catabolic hormone alongside the anabolic GH signal. The net effect on body composition is less favorable than ipamorelin for these goals. Additionally, cortisol independently raises blood glucose, compounding the GH counter-regulatory glucose effect. Chronic HPA axis stimulation from GHRP-2 adds an endocrine burden that ipamorelin doesn't carry.",
    evidence: "Cortisol elevation from GHRP-2: documented in human pharmacology. HPA axis interaction: established physiology. Net body composition impact of GH + cortisol: mechanistically unfavorable for anabolism; not directly trialed for GHRP-2.",
  },
  {
    receptor: "GH → IGF-1 axis",
    label: "Downstream anabolic pathway — same as other GH-axis compounds",
    tier: "moderate",
    body: "GH elevation from GHRP-2 drives hepatic IGF-1 synthesis — identical downstream pathway to ipamorelin and CJC-1295. IGF-1 is the primary mediator of GH's anabolic effects. The cancer history concern applies identically. In GHRP-2's case, the IGF-1 anabolic signal must be weighed against the cortisol catabolic counter-pressure — the net body composition effect is mechanistically less favorable than from a selective GHRP.",
    evidence: "GH/IGF-1 physiology established. GHRP-2-specific IGF-1 data: less characterized than CJC-1295. Body composition net effect with cortisol counter-pressure: mechanistically expected to be less favorable than ipamorelin.",
  },
];

const GAPS = [
  "Enhancement-context outcome data is absent — body composition and recovery claims are mechanistically inferred, and the cortisol catabolic counter-pressure is an additional uncharacterized variable",
  "Net body composition effect of GH + cortisol from GHRP-2 vs GH alone from ipamorelin: not directly compared in human trials",
  "Chronic cortisol elevation from sustained GHRP-2 use in healthy adults: pharmacological implications not characterized",
  "Long-term safety of sustained ghrelin receptor agonism with non-selective GHRP profile: not studied",
  "Cancer risk from IGF-1 elevation: same gap as ipamorelin; GHRP-2-specific data absent",
  "Why researchers moved to ipamorelin: the cortisol/prolactin limitation was the driver — but the comparative enhancement outcome data was never generated",
];

const OBSERVED = [
  "GHRP-2 is described in community use as producing stronger but 'dirtier' GH release than ipamorelin — the cortisol effect is perceived as a real tradeoff",
  "Community has largely moved to ipamorelin for enhancement protocols — GHRP-2 appears in older protocols and occasional research-context use",
  "Mood and sleep disruption are sometimes reported — consistent with cortisol elevation; this is less common in ipamorelin community reports",
  "Some users combine GHRP-2 with CJC-1295 (the same CJC+ipa rationale) — but the cortisol tradeoff makes this a less favorable combination than CJC+ipamorelin",
  "The 'non-selective' label in community discussion accurately captures the practical issue: GHRP-2 works, but ipamorelin works with less collateral activation",
];

export default function Ghrp2EvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — real GH data, documented cortisol, no outcome trials</div>
        <div className="reta-evidence__trial-header">
          GHRP-2&apos;s human pharmacology is real — GH release is confirmed, cortisol elevation is confirmed, prolactin elevation is confirmed. The compound works mechanistically. The honest picture is that the enhancement-context outcome data is absent (same gap as ipamorelin), and the cortisol/prolactin profile adds an additional limitation. The clinical field moved to ipamorelin specifically because of the GHRP-2 selectivity problem.
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
          GH release: confirmed. Cortisol elevation: confirmed. Both facts together mean GHRP-2 produces the GH-axis benefit alongside a documented catabolic counter-pressure. Ipamorelin was designed to fix this. The enhancement outcome data was never generated for either compound — the field moved on from GHRP-2 before that happened.
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
