/**
 * Tb500EvidencePanel — honest, layered evidence for TB-500.
 * The critical frame: TB-500's evidence base is thymosin beta-4 biology — not TB-500 as sold.
 * Most studies are on full Tβ4 in animal models. Direct TB-500 human data: essentially zero.
 * The identity problem (what TB-500 actually is) is part of the evidence story.
 */

const SIGNALS = [
  {
    label: "Tβ4 wound healing / tissue repair (animal)",
    value: "Consistent signal",
    note: "extensive Tβ4 animal model data — TB-500 is a claimed fragment; whether it shares identical pharmacology is not confirmed",
    tier: "moderate",
  },
  {
    label: "Actin regulation / cell migration (Tβ4)",
    value: "Mechanistically established",
    note: "Tβ4's actin-binding domain (aa 17–23) is well-characterized in cell biology — this is the proposed basis for TB-500",
    tier: "moderate",
  },
  {
    label: "Anti-inflammatory signaling (Tβ4)",
    value: "Mechanistically supported",
    note: "animal models; NF-κB pathway involvement observed; proposed for tissue repair context",
    tier: "moderate",
  },
  {
    label: "Tendon / soft tissue healing (TB-500 specific)",
    value: "Limited — mostly inferred",
    note: "claims are largely extrapolated from Tβ4 biology; direct TB-500 tendon outcome data is sparse",
    tier: "low",
  },
  {
    label: "Human RCT outcomes (TB-500 specific)",
    value: "No published data",
    note: "no placebo-controlled human outcome trial for TB-500 as sold exists in published literature",
    tier: "none",
  },
  {
    label: "Long-term human safety",
    value: "No data",
    note: "completely unstudied — genuine unknown across all use patterns",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  low:      { bg: "rgba(60,80,120,0.06)",  border: "rgba(60,80,120,0.14)",  dot: "#3c5078", text: "#3c5078" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "30+",  label: "years of Tβ4 preclinical research",    note: "foundational thymosin beta-4 biology — TB-500 claims inherit this data, not directly generate it" },
  { stat: "1",    label: "relevant review publication",           note: "PMC4007404 (2014) — Tβ4 biology context; not a TB-500 clinical trial" },
  { stat: "0",    label: "published human RCTs for TB-500",       note: "no placebo-controlled human outcome trial for TB-500 as sold" },
  { stat: "???",  label: "product identity confidence",           note: "\"TB-500\" as a market name covers products of variable composition — what's in your vial is not standardized" },
];

const MECHANISMS = [
  {
    receptor: "Actin sequestration / G-actin binding",
    label: "Cell migration and wound closure",
    tier: "moderate",
    body: "Thymosin beta-4 is one of the most abundant intracellular actin-sequestering peptides. By binding G-actin, it regulates the availability of actin for polymerization — a process central to cell movement and migration. In wound healing models, this promotes the migration of cells (keratinocytes, endothelial cells, fibroblasts) into the injury site. TB-500 is described as containing the actin-binding domain of Tβ4 (amino acids 17–23). Whether the fragment functions identically to full Tβ4 in vivo is not directly established for TB-500 as sold.",
    evidence: "Cell biology and wound healing animal models. Actin-binding mechanism well-characterized for full Tβ4. TB-500 fragment-specific data: sparse.",
  },
  {
    receptor: "Anti-inflammatory / NF-κB pathway",
    label: "Inflammation modulation in tissue repair",
    tier: "moderate",
    body: "Tβ4 has been shown to inhibit NF-κB signaling — a central inflammatory pathway — in multiple animal and cell models. This may account for some of the anti-inflammatory effects attributed to TB-500 in community use. The anti-inflammatory mechanism complements the angiogenic and cell-migration effects, creating a coordinated tissue repair environment. Like all Tβ4-inferred mechanisms, direct confirmation for TB-500 as a fragment in humans doesn't exist.",
    evidence: "Animal models and cell culture. NF-κB inhibition observed with full Tβ4. TB-500 fragment: mechanistically plausible, not directly confirmed.",
  },
  {
    receptor: "Angiogenesis support",
    label: "Promoting blood vessel formation in damaged tissue",
    tier: "moderate",
    body: "Tβ4 promotes angiogenesis — the formation of new blood vessels — in wound healing and cardiac models. This complements BPC-157's VEGF-driven angiogenic effect, which is one reason the two are seen as mechanistically complementary rather than redundant. The angiogenic effect of TB-500 (as a fragment) is less directly characterized than BPC-157, where the VEGF pathway is better documented.",
    evidence: "Tβ4 animal models and cardiac/wound healing studies. Angiogenic effect inferred for TB-500 as fragment.",
  },
];

const IDENTITY_ISSUE = [
  "\"TB-500\" is a market name, not a pharmacological standard — different vendors supply different molecular compositions under the same name",
  "Tβ4 (thymosin beta-4) is the full 43-amino acid peptide; TB-500 is typically described as the 17–23 amino acid actin-binding fragment (LKKTETQ)",
  "The biology of full Tβ4 is extensively studied; the biology of the isolated TB-500 fragment is not separately characterized at the same depth",
  "What this means practically: any claim that cites Tβ4 research as evidence for TB-500 is citing indirect, inferred support — not direct evidence",
  "Third-party CoA verification is more important here than for most peptides, because identity confirmation is the first problem, not just purity",
];

const GAPS = [
  "No published human RCT exists for any indication using TB-500 as sold",
  "Whether TB-500 as a fragment shares identical pharmacology with full Tβ4 is not directly confirmed",
  "Optimal route, dose, frequency, and duration for any specific human use case: unknown",
  "Long-term human safety: completely unstudied — not estimated as low",
  "The cancer interaction concern (tissue growth signaling) is mechanistically raised but not characterized for TB-500 specifically",
  "Product identity in the unregulated market is inconsistent — CoA confirmation is a prerequisite, not a nice-to-have",
];

const OBSERVED = [
  "TB-500 is most commonly discussed alongside BPC-157 as a complementary stack — the community framing is that BPC creates the healing environment, TB-500 supports the actin/anti-inflammatory response",
  "Soft tissue and tendon recovery are the dominant reported use cases — similar to BPC-157, attribution is genuinely difficult",
  "Injectable subcutaneous use is the standard community protocol; oral TB-500 is less commonly discussed than oral BPC-157",
  "Cycling protocols (4–8 weeks on, break) are standard community convention — reflecting absence of long-term safety data rather than documented need",
  "Sourcing quality is consistently flagged as the most critical variable — even more so than BPC-157 because identity confusion is the additional layer",
];

export default function Tb500EvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — thymosin beta-4 biology is not the same as TB-500 evidence</div>
        <div className="reta-evidence__trial-header">
          30+ years of Tβ4 animal and cell biology. Zero published human RCTs for TB-500 as sold. One foundational Tβ4 review (PMC4007404, 2014) provides mechanistic context. TB-500's entire clinical rationale is borrowed from Tβ4 research — that borrowing is the most important thing to understand about this evidence base.
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
          The Tβ4 evidence is real and mechanistically coherent. TB-500 as sold is not Tβ4, and has not been studied independently at the same depth. Those two facts coexist.
        </div>
      </div>

      {/* ── The identity issue ── */}
      <div>
        <div className="reta-evidence__section-label">The identity problem — why this matters for how you read the evidence</div>
        <ul className="reta-evidence__gaps">
          {IDENTITY_ISSUE.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">The three mechanism pathways — what Tβ4 biology tells us</div>
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
