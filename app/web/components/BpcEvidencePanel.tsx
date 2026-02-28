/**
 * BpcEvidencePanel — honest, layered evidence for BPC-157.
 * The story: rich preclinical history, consistent animal findings, almost no human RCT data.
 * Mechanism is plausible and multi-pathway. Human translation is the open question.
 */

const SIGNALS = [
  {
    label: "Tendon / ligament healing (animal)",
    value: "Consistent signal",
    note: "multiple animal models — rats, rabbits; not replicated in human RCT",
    tier: "moderate",
  },
  {
    label: "GI healing / gastric protection (animal)",
    value: "Consistent signal",
    note: "strong preclinical GI model data — inflammatory bowel, ulcer, fistula",
    tier: "moderate",
  },
  {
    label: "Angiogenesis / VEGF upregulation",
    value: "Mechanistically supported",
    note: "animal + cell models; plausible pathway for tissue repair",
    tier: "moderate",
  },
  {
    label: "Nitric oxide / NOS pathway",
    value: "Mechanistically supported",
    note: "animal models; anti-inflammatory + vasodilatory effects observed",
    tier: "moderate",
  },
  {
    label: "Human RCT outcomes (any indication)",
    value: "No published data",
    note: "one Phase I registered (NCT02637284, 2015) — outcomes not published",
    tier: "none",
  },
  {
    label: "Long-term human safety",
    value: "No data",
    note: "completely unstudied — genuine unknown, not a risk estimate",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "30+",  label: "years of preclinical research",  note: "first published animal studies ~1990s" },
  { stat: "1",    label: "registered human Phase I trial",  note: "NCT02637284 — safety/PK study, 2015; outcomes not published" },
  { stat: "0",    label: "published human RCTs",           note: "no placebo-controlled human outcome trial exists" },
  { stat: "2025", label: "sports medicine review published", note: "PMC12313605 — first major orthopedic review; highlights evidence gaps" },
];

const MECHANISMS = [
  {
    receptor: "Angiogenesis / VEGF",
    label: "New blood vessels in damaged tissue",
    tier: "moderate",
    body: "BPC-157 consistently promotes angiogenesis — the formation of new blood vessels — in animal wound healing and tendon repair models. VEGF (vascular endothelial growth factor) upregulation is one of the proposed mechanisms. Blood vessel growth into damaged tissue is a prerequisite for effective healing. This is a plausible and mechanistically coherent pathway. It hasn't been confirmed in controlled human tissue.",
    evidence: "Animal wound healing, tendon, and GI models. Cell-level VEGF upregulation studies. No human tissue confirmation.",
  },
  {
    receptor: "Nitric oxide / NOS",
    label: "Anti-inflammatory and vasodilatory signaling",
    tier: "moderate",
    body: "Nitric oxide synthase (NOS) upregulation is another consistently observed effect in BPC-157 animal studies. The nitric oxide pathway plays roles in inflammation modulation, vasodilation, and tissue repair signaling. This may explain some of the anti-inflammatory and gut-protective effects seen in animal GI models. NOS effects are also proposed as a mechanism for blood pressure and circulation-adjacent responses.",
    evidence: "Multiple animal models. Mechanistically coherent. Human NOS pathway effects: not directly studied for BPC-157.",
  },
  {
    receptor: "Growth factor modulation",
    label: "Tissue repair environment support",
    tier: "moderate",
    body: "Beyond VEGF, BPC-157 appears to modulate multiple growth factor pathways relevant to repair — including effects on EGF (epidermal growth factor) and observations in tendon fibroblast signaling. The cumulative picture is a peptide that may help create a better local tissue environment for repair rather than acting as a single-pathway drug. Whether this mechanism operates in humans the same way as in animal models is the open question.",
    evidence: "Animal models and cell culture. Fibroblast signaling studies. Human translation: unstudied.",
  },
];

const GAPS = [
  "No published human RCT exists for any indication — tendon, GI, or otherwise",
  "The one registered Phase I safety/PK study (NCT02637284, 2015) has not published outcomes",
  "Whether animal tissue healing findings translate to human biology is not established",
  "Optimal route (oral vs injectable), dose, and duration for any human use case are unknown",
  "Long-term safety in humans is not studied — completely unknown, not estimated as low",
  "Contamination and purity in real-world research-grade supply chains are not regulated or verified at the source",
];

const OBSERVED = [
  "Injectable BPC-157 is widely reported for tendon and soft tissue recovery in training communities — results are highly variable, attribution is difficult",
  "Oral BPC-157 for reflux and GI irritation is among the most common self-reported use cases — faster subjective feedback than injectable",
  "Stacking with TB-500 (Thymosin β4) is a standard recovery protocol in the community — the two compounds are seen as complementary, not redundant",
  "Sourcing quality is consistently flagged as the dominant variable in community discussions — third-party testing is emphasized by experienced users",
  "Most community protocols involve cycling (on/off periods of 4–8 weeks) rather than continuous use — this reflects the absence of long-term safety data",
];

export default function BpcEvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — what exists and what doesn&apos;t</div>
        <div className="reta-evidence__trial-header">
          30+ years of animal research. One registered human Phase I trial (NCT02637284, 2015) with no published outcomes. A 2025 sports medicine review (PMC12313605) described the preclinical evidence and explicitly noted evidence gaps. There is no published placebo-controlled human clinical trial for BPC-157 for any indication.
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
          The animal evidence is extensive and consistent across multiple tissue types. The human evidence is essentially absent. Those two facts coexist — neither cancels the other.
        </div>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">The three mechanism pathways — what we know and from where</div>
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
          These are patterns from community reports and anecdotal accounts. They don&apos;t have the rigor of trials — but they reflect real experience from real use, which the trials don&apos;t capture.
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
