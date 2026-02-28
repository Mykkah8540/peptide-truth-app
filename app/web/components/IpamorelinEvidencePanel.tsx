/**
 * IpamorelinEvidencePanel — honest, layered evidence for Ipamorelin.
 * Key frame: evidence is thinner than CJC-1295 for direct outcomes.
 * GH release in humans is documented; body comp and recovery benefits are inferred.
 * The "selective" claim vs other GHRPs is supported; the enhancement claims are not.
 */

const SIGNALS = [
  {
    label: "GH release in humans (interventional)",
    value: "Limited evidence",
    note: "human studies show GH elevation but are smaller and less definitive than the CJC-1295 2006 trial; GHRP class effect is established",
    tier: "moderate",
  },
  {
    label: "Selectivity vs older GHRPs (cortisol/prolactin)",
    value: "Supported",
    note: "ipamorelin produces less cortisol and prolactin elevation than GHRP-2/GHRP-6 in comparative studies — the 'selective' label has real basis",
    tier: "moderate",
  },
  {
    label: "IGF-1 elevation",
    value: "Mechanistically expected",
    note: "GH elevation drives IGF-1 synthesis; direct ipamorelin IGF-1 data is less characterized than CJC-1295's",
    tier: "moderate",
  },
  {
    label: "Body composition / lean mass changes",
    value: "Mechanistically inferred",
    note: "GH/IGF-1 pathway supports protein synthesis and lipolysis — direct body comp RCT for ipamorelin: absent",
    tier: "none",
  },
  {
    label: "Recovery and sleep quality",
    value: "Mechanistically inferred",
    note: "GH physiology supports tissue repair and deep sleep; community reports consistent with mechanism; no controlled trial",
    tier: "none",
  },
  {
    label: "Long-term safety in healthy adults",
    value: "No data",
    note: "completely unstudied for sustained non-medical use — not a calculated low-risk estimate",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "GHRP",   label: "class with human GH release data",     note: "ghrelin receptor agonist class is documented to stimulate GH; ipamorelin-specific large human trials are limited" },
  { stat: "2026",   label: "sports medicine review published",      note: "PMID 41490200 — injectable peptide therapy review; context for clinical framing, not ipamorelin-specific outcomes" },
  { stat: "0",      label: "enhancement outcome RCTs",              note: "no controlled trial on body composition, recovery, or performance outcomes for ipamorelin" },
  { stat: "< CJC",  label: "evidence vs CJC-1295",                 note: "CJC-1295 has a dedicated 2006 human interventional study (PMID 16352683); ipamorelin's human evidence base is thinner" },
];

const MECHANISMS = [
  {
    receptor: "Ghrelin receptor (GHSR1a)",
    label: "Pituitary GH pulse release — the ghrelin arm",
    tier: "moderate",
    body: "Ipamorelin binds the growth hormone secretagogue receptor (GHSR1a) — the same receptor that endogenous ghrelin activates. This triggers pituitary somatotrophs to release GH pulses. Unlike CJC-1295 (which acts at the hypothalamic level to extend GHRH signaling), ipamorelin acts directly at the pituitary. The two mechanisms are complementary: GHRH receptor + ghrelin receptor activation together produce greater GH release than either alone — the mechanistic rationale for the CJC+ipa stack. Ghrelin receptor agonism also has peripheral effects that matter clinically: it reliably increases appetite, which is why hunger stimulation is a consistent ipamorelin-specific finding.",
    evidence: "GHRP class mechanism well-established. Ipamorelin selectivity vs GHRP-2/GHRP-6 documented in comparative studies. Human GH release: confirmed. IGF-1 and downstream outcomes: largely inferred.",
  },
  {
    receptor: "Selectivity — cortisol / prolactin sparing",
    label: "What makes ipamorelin the community-preferred GHRP",
    tier: "moderate",
    body: "Ipamorelin's key distinction from older GHRPs is selectivity: it produces meaningfully less cortisol and prolactin elevation than GHRP-2 or GHRP-6 at comparable GH-releasing doses. Cortisol elevation from other GHRPs is a real concern because cortisol is catabolic — counterproductive for recovery and muscle preservation goals. Ipamorelin largely avoids this, which is why it replaced older GHRPs as the community default. This selectivity is relative and dose-dependent — it's not absolute prolactin/cortisol suppression.",
    evidence: "Comparative GHRP studies. Selectivity is mechanistically and clinically supported. The claim is specific: less cortisol/prolactin than GHRP-2/GHRP-6 — not absent.",
  },
  {
    receptor: "GH → IGF-1 axis",
    label: "Downstream mediator of body composition effects",
    tier: "moderate",
    body: "GH elevation — regardless of whether it's triggered by a GHRH analog or a GHRP — drives hepatic IGF-1 synthesis. IGF-1 is the primary mediator of GH's anabolic effects on muscle and fat. The same mechanism that makes GH axis stimulation appealing for body composition is what creates the cancer history concern: IGF-1 is mitogenic. This applies to ipamorelin identically to CJC-1295. The route to IGF-1 is different (ghrelin receptor vs GHRH receptor); the downstream endpoint and associated risk profile are the same.",
    evidence: "GH/IGF-1 physiology well-established. Ipamorelin-specific IGF-1 data: less characterized than CJC-1295. Body comp outcomes: inferred from mechanism.",
  },
];

const GAPS = [
  "No controlled enhancement-context outcome trial exists — body composition, recovery, and sleep claims are mechanistically inferred",
  "Ipamorelin-specific human evidence is thinner than CJC-1295 — the GHRP class effect is established, but ipamorelin-specific large trials are limited",
  "Long-term safety of sustained ghrelin receptor agonism in healthy adults: not characterized",
  "Optimal cycle length, dosing frequency, and evaluation window for any specific use case are clinically unestablished",
  "Cancer risk from prolonged IGF-1 elevation in non-clinical contexts: mechanistically real, not quantified for ipamorelin specifically",
  "The appetite and metabolic consequences of chronic ghrelin receptor agonism beyond short-term protocols are unstudied",
];

const OBSERVED = [
  "Appetite stimulation in the first few weeks is the most commonly reported early effect — consistent with ghrelin receptor agonism; often managed by timing injection away from meals or before sleep",
  "Sleep depth improvement is frequently reported — consistent with GH pulse timing during slow-wave sleep",
  "Water retention (mild puffiness, especially face) is common early; typically resolves within the first cycle",
  "CJC-1295 + ipamorelin is the dominant community stack — reported as synergistic for GH release with a cleaner side effect profile than older GHRP combinations",
  "Cycling protocols (8–12 weeks on / 4–6 weeks off) are the community convention — reflecting endocrine caution, not documented safety data",
  "Ipamorelin is consistently described as more tolerable than GHRP-2/GHRP-6 — the selective label tracks with real community experience",
];

export default function IpamorelinEvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — thinner than CJC-1295, stronger than BPC-157</div>
        <div className="reta-evidence__trial-header">
          Ipamorelin sits in a middle tier: more human evidence than purely animal compounds like BPC-157 or TB-500, but less directly documented than CJC-1295&apos;s 2006 human interventional study. GHRP-class GH release in humans is established. Ipamorelin-specific enhancement outcomes are not. That gap is the honest evidence picture.
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
          The GHRP mechanism is real. Ipamorelin&apos;s selectivity claim vs older GHRPs is supported. The body composition and recovery outcome claims are not directly trialed. Those statements coexist honestly.
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
