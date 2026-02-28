/**
 * SermorelinEvidencePanel — honest, layered evidence for Sermorelin.
 * Key frame: strongest clinical history of any gray-market GH-axis peptide —
 * FDA approval for pediatric GHD means human pharmacology is real data, not inference.
 * BUT: that clinical history is in GH-deficient patients, not healthy adult enhancement users.
 * The gap between "works in GHD" and "benefit in metabolically normal adults" is the honest picture.
 */

const SIGNALS = [
  {
    label: "GH release in humans",
    value: "Confirmed",
    note: "sermorelin reliably stimulates GH release — established in the clinical pharmacology that supported FDA approval for pediatric GHD; the GHRH receptor mechanism is well-characterized",
    tier: "strong",
  },
  {
    label: "IGF-1 elevation",
    value: "Confirmed in GHD patients",
    note: "IGF-1 normalization is the primary endpoint of pediatric GHD treatment; data is in deficient patients — extrapolation to supranormal IGF-1 in healthy adults is the gap",
    tier: "moderate",
  },
  {
    label: "Body composition / lean mass in GHD",
    value: "Supported in GH-deficient adults",
    note: "adult GHD treatment literature documents lean mass improvement; this is replacing deficient GH — not the same as adding GH-axis stimulation in metabolically normal adults",
    tier: "moderate",
  },
  {
    label: "Body composition in healthy adults",
    value: "Not established",
    note: "no controlled trial exists for body composition outcomes in healthy adult enhancement context — mechanism is inferred from GHD data",
    tier: "none",
  },
  {
    label: "Recovery and sleep quality enhancement",
    value: "Mechanistically inferred",
    note: "GH physiology supports tissue repair and deep sleep; community reports consistent with mechanism; no controlled trial in healthy adults",
    tier: "none",
  },
  {
    label: "Long-term safety in healthy adults",
    value: "No data",
    note: "completely unstudied for sustained enhancement use — GHD treatment data does not transfer to continuous use in metabolically normal adults",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "FDA",    label: "approved for pediatric GHD (discontinued 2008)",     note: "sermorelin (Geref) was FDA-approved — the GHRH mechanism has regulatory validation in GH-deficient patients" },
  { stat: "GHD",   label: "patient base for human evidence",                     note: "virtually all meaningful clinical data is in GH-deficient children and adults — a fundamentally different physiological context from healthy adult enhancement" },
  { stat: "0",     label: "enhancement-context outcome RCTs",                    note: "no controlled trial on body composition, recovery, or performance outcomes in metabolically healthy adults" },
  { stat: "> CJC", label: "clinical pedigree vs CJC-1295",                       note: "sermorelin has regulatory and clinical history CJC-1295 lacks; but the enhancement-context evidence gap is the same for both" },
];

const MECHANISMS = [
  {
    receptor: "GHRH receptor (GHRHR)",
    label: "GH pulse release — the same mechanism as CJC-1295",
    tier: "strong",
    body: "Sermorelin is a 29-amino acid N-terminal fragment of endogenous GHRH — the minimal active sequence required for GHRHR binding. It binds the hypothalamic GHRH receptor and triggers pituitary somatotrophs to release GH. The mechanism is pharmacologically equivalent to CJC-1295; the difference is half-life (~90 min vs ~30 min for CJC no-DAC) and clinical history. Because sermorelin closely mimics endogenous GHRH signaling, the pulse pattern it generates is considered more physiologically 'native' than longer-acting analogs — though whether that distinction matters clinically in enhancement contexts is unknown.",
    evidence: "GHRH receptor pharmacology well-characterized. GH release in humans: confirmed. FDA approval history validates human pharmacology. Enhancement-outcome extrapolation: inferred from mechanism.",
  },
  {
    receptor: "GH → IGF-1 axis",
    label: "Downstream mediator of body composition effects",
    tier: "moderate",
    body: "GH elevation from sermorelin drives hepatic IGF-1 synthesis — identical downstream pathway to CJC-1295 and all GHRH analogs. IGF-1 is the primary mediator of GH's anabolic effects. The same IGF-1-mediated mechanism that makes GH-axis stimulation appealing for body composition is what creates the cancer history concern: IGF-1 is a direct mitogen. In GHD patients, sermorelin's IGF-1 normalization is well-documented. In supranormal healthy adult contexts, the degree of IGF-1 elevation and its implications are not characterized.",
    evidence: "GH/IGF-1 physiology well-established. Sermorelin IGF-1 data in GHD patients: documented. Supranormal IGF-1 in healthy adults: not characterized for sermorelin specifically.",
  },
  {
    receptor: "GH counter-regulation to insulin",
    label: "The metabolic risk — glucose and insulin sensitivity",
    tier: "moderate",
    body: "GH is physiologically counter-regulatory to insulin — a relationship established in endocrinology, not a drug-specific side effect. Sermorelin's GH-stimulating action carries the same glucose dysregulation risk as CJC-1295 or ipamorelin. In GHD patients with GH replacement, glucose monitoring is standard practice. In healthy adult enhancement use without lab monitoring, metabolic status before starting is the minimum responsible check. Diabetes, prediabetes, and insulin resistance all represent elevated risk.",
    evidence: "GH/insulin counter-regulation: established endocrine physiology. Glucose monitoring in GHD treatment: clinical standard. Sermorelin-specific glucose data in healthy adults: not characterized.",
  },
];

const GAPS = [
  "The entire meaningful evidence base is in GH-deficient patients — extrapolation to healthy adult enhancement is a fundamental gap, not just a study-size limitation",
  "No controlled enhancement-context outcome trial exists — body composition, recovery, and sleep claims are mechanistically inferred from GHD treatment data",
  "Long-term safety of sustained GHRH receptor stimulation in healthy adults: not characterized",
  "Dosing frequency and cycle length for enhancement outcomes are clinically unestablished — community conventions are not documented safety data",
  "Supranormal IGF-1 elevation in non-deficient adults: cancer risk not quantified",
  "Gray-market sermorelin product identity and purity have the same sourcing uncertainty as any unregulated injectable, despite sermorelin's prescription pathway",
];

const OBSERVED = [
  "Sleep quality improvement is consistently reported — consistent with GH pulse timing during slow-wave sleep; one of the most commonly cited effects in community protocols",
  "Water retention (mild puffiness, especially face) is reported early and typically resolves within the first cycle",
  "Sermorelin is described as more gradual in perceived effect than CJC-1295 or ipamorelin — consistent with the shorter half-life and more physiologic pulse pattern",
  "Prescription sermorelin through compounding pharmacy is the most commonly cited legitimate access route in community discussion",
  "Physician-supervised protocols typically include IGF-1 and fasting glucose labs — these are meaningful anchors that gray-market use typically lacks",
  "The 'old GHRH analog' framing often appears in community discussion — sermorelin's FDA history is frequently cited as evidence of legitimacy, though the GHD-to-enhancement extrapolation issue is often not addressed",
];

export default function SermorelinEvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — the GHD-to-healthy-adult gap</div>
        <div className="reta-evidence__trial-header">
          Sermorelin has the strongest regulatory and clinical history of any GH-axis compound discussed in enhancement contexts — FDA approval for pediatric GHD means the human pharmacology is real, not inferred. That&apos;s where the advantage ends. The entire evidence base is in GH-deficient patients. The enhancement-context extrapolation has the same evidentiary gap as CJC-1295 or ipamorelin, with a different starting point.
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
          The GHRH mechanism is confirmed. Sermorelin&apos;s FDA history means the pharmacology is real. The jump from &ldquo;works in GH-deficient patients&rdquo; to &ldquo;benefit in healthy adults&rdquo; is the honest gap — and it&apos;s not unique to sermorelin.
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
