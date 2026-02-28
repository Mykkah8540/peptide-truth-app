/**
 * Igf1EvidencePanel — honest, layered evidence for IGF-1.
 * Key frame: clinical evidence is from pediatric IGF-1 deficiency contexts.
 * Enhancement use evidence is essentially absent — small studies, bodybuilding lore,
 * and mechanistic inference. The safety evidence (hypoglycemia, mitogenic risk) is
 * stronger than the efficacy evidence for healthy adult enhancement.
 */

const SIGNALS = [
  {
    label: "Anabolic effect in IGF-1 deficiency — pediatric and GH-insensitive contexts",
    value: "Strong — for the approved indication",
    note: "Mecasermin (Increlex) is FDA-approved for growth in severe primary IGF-1 deficiency with documented clinical efficacy. This is the evidence base. It does not translate directly to healthy adult enhancement contexts where IGF-1 levels are already in normal range.",
    tier: "strong",
  },
  {
    label: "Muscle protein synthesis enhancement in healthy adults",
    value: "Limited — small studies, no large RCTs",
    note: "Small studies suggest exogenous IGF-1 can increase muscle protein synthesis and lean mass in healthy adults. The evidence is not robust: sample sizes are small, durations are short, and most was not designed for enhancement contexts. The anabolic signal is mechanistically plausible but clinically uncharacterized at community-typical doses.",
    tier: "moderate",
  },
  {
    label: "Recovery acceleration — tendon, ligament, tissue repair",
    value: "Preclinical signal — limited human evidence",
    note: "Animal models show IGF-1 promotes tendon and cartilage repair. Local injection studies suggest enhanced healing in animal injury models. Human clinical evidence for enhancement-style recovery use is extremely limited. The mechanism is plausible; the clinical translation to healthy adults is not established.",
    tier: "moderate",
  },
  {
    label: "Cancer risk — mitogenic association in epidemiological and preclinical data",
    value: "Real concern — epidemiological and mechanistic",
    note: "Higher circulating IGF-1 levels in epidemiological studies are associated with increased risk of breast, prostate, colorectal, and lung cancers. IGF-1 promotes cancer cell proliferation in vitro via IGF-1R signaling. The causal relationship for exogenous injectable IGF-1 in healthy adults is not established — but the mechanism is real and the precautionary weight is significant.",
    tier: "none",
  },
  {
    label: "Hypoglycemia — acute, documented, life-threatening at elevated doses",
    value: "Well-documented adverse effect",
    note: "IGF-1 cross-reacts with insulin receptors, producing glucose lowering effects. Severe hypoglycemia from exogenous IGF-1 is documented in the clinical literature and community experience. It is dose-related and more severe with higher doses, fasted state use, and concurrent diabetes medications.",
    tier: "none",
  },
  {
    label: "Organ hypertrophy and acromegalic features with prolonged use",
    value: "Documented with sustained GH/IGF-1 elevation",
    note: "Prolonged elevated IGF-1 (as seen in acromegaly — GH-secreting tumors) causes jaw growth, nose widening, hand/foot enlargement, cardiac hypertrophy, and carpal tunnel. Whether enhancement-community IGF-1 doses and durations produce clinically significant organ changes is understudied — but the mechanism is the same pathophysiology as acromegaly.",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "Peds",   label: "FDA-approved indication: severe primary IGF-1 deficiency in children",    note: "Increlex (mecasermin) clinical data is pediatric — not healthy adult enhancement" },
  { stat: "~0",     label: "large RCTs for healthy adult enhancement use",                             note: "The enhancement evidence base consists primarily of small studies, case series, and mechanistic inference — not powered clinical trials" },
  { stat: "Real",   label: "hypoglycemia risk — documented in clinical and community use",              note: "Severe hypoglycemia from exogenous IGF-1 is not theoretical; documented hospitalizations exist in non-medical use" },
  { stat: "Epi",    label: "cancer association — epidemiological, not causal-proven but mechanistic",  note: "Higher natural IGF-1 correlates with cancer risk in prospective studies; IGF-1R is a validated cancer drug target" },
];

const MECHANISMS = [
  {
    receptor: "IGF-1 receptor (IGF-1R) — the primary anabolic and mitogenic pathway",
    label: "The double-edged mechanism: anabolism and cell proliferation are the same signal",
    tier: "moderate",
    body: "The IGF-1 receptor (IGF-1R) is a receptor tyrosine kinase structurally similar to the insulin receptor. When activated, it triggers the PI3K/AKT/mTOR pathway (promoting protein synthesis and cell survival) and the RAS/MAPK/ERK pathway (promoting cell proliferation). These are the same pathways that drive anabolic muscle growth and cancer cell proliferation — IGF-1R doesn't distinguish. Muscle cells and cancer cells both respond to IGF-1R signaling with increased growth and survival. This is the fundamental pharmacological tension: the anabolic mechanism IS the mitogenic mechanism.",
    evidence: "IGF-1R signaling: well-characterized in cancer biology and endocrinology. PI3K/AKT/mTOR pathway: validated therapeutic target in both anabolic and oncological contexts. IGF-1R expression in muscle: documented. IGF-1R expression in cancer: established; IGF-1R inhibitors are active cancer drug targets.",
  },
  {
    receptor: "Insulin receptor cross-reactivity — hypoglycemia mechanism",
    label: "Structural similarity to insulin produces direct glucose-lowering at high concentrations",
    tier: "moderate",
    body: "IGF-1 and insulin are structurally homologous — both evolved from a common ancestral gene. At physiological concentrations, IGF-1 primarily binds IGF-1R and has minimal insulin receptor activity. At pharmacological concentrations from exogenous injection, IGF-1 binds insulin receptors and produces direct glucose-lowering effects — the same mechanism as insulin. This insulin receptor cross-reactivity is the basis for IGF-1's hypoglycemia risk. Unlike exogenous GH (which is counter-regulatory and raises glucose), exogenous IGF-1 directly lowers glucose through the insulin receptor pathway.",
    evidence: "IGF-1/insulin structural homology: established molecular biology. Insulin receptor cross-reactivity at pharmacological concentrations: documented in receptor pharmacology research. Hypoglycemia from exogenous IGF-1: documented in clinical literature and case reports.",
  },
  {
    receptor: "GH/IGF-1 axis feedback bypass",
    label: "Why GH secretagogues are mechanistically different — and why it matters",
    tier: "moderate",
    body: "Natural IGF-1 production operates under feedback control: GH release is pulsatile and regulated by GHRH and somatostatin. The liver's IGF-1 production responds to GH but is also modulated by nutritional status, insulin, and other signals. The net result: natural IGF-1 is regulated by multiple feedback mechanisms that prevent prolonged excess. Exogenous IGF-1 bypasses all of this — it produces direct receptor activation regardless of what the GH axis would otherwise be signaling. GH secretagogues (ipamorelin, CJC-1295) work through the GH signal, preserving feedback control and the pulsatile pattern. Exogenous IGF-1 has no such self-limiting mechanism.",
    evidence: "GH/IGF-1 axis feedback: established endocrinology. Somatostatin regulation: characterized in pituitary and hypothalamic physiology. Comparison with GH secretagogues: pharmacological distinction, not directly trialed in comparative human studies.",
  },
];

const GAPS = [
  "Large RCTs in healthy adults for any enhancement purpose: absent — the evidence base for healthy adult use is fundamentally thin",
  "Optimal dose and cycle length for safety in enhancement contexts: completely uncharacterized — community protocols are convention, not evidence",
  "Long-term organ effects (cardiac hypertrophy, jaw/facial bone changes) at community-typical doses and durations: not studied",
  "Cancer risk in healthy adults with normal IGF-1 from exogenous supplementation: epidemiological associations exist for natural IGF-1 levels, but causal chain for exogenous injection is not established",
  "Recovery enhancement evidence in injured healthy adults: animal models exist; human evidence is very limited",
  "Interaction with GH secretagogues: combined use is common in the community but pharmacodynamic interactions are not formally characterized",
];

const OBSERVED = [
  "Hypoglycemia within 30-60 minutes of injection is the most commonly reported acute safety event — 'always eat before injecting' is universal community guidance, not a preference",
  "Carpal tunnel symptoms (hand numbness, tingling, weakness) are reported frequently — driven by fluid retention and IGF-1R activity in nerve tissue around the wrist",
  "Users who combine IGF-1 with GH secretagogues or exogenous GH report additive anabolic effects but also additive side effects — the combination is poorly characterized from a safety standpoint",
  "Jaw and facial bone changes are reported by long-term users of GH/IGF-1 compounds — users who stop reporting changes typically have used these compounds over years, not weeks",
  "Source quality variation is a major practical safety issue — community reports of hypoglycemia often come from incorrectly dosed products (concentration errors) as much as from correct dosing of a high-dose protocol",
  "Significant anxiety about cancer risk is commonly reported among longer-term users — consistent with the mechanistic concern; users who proceed past initial research often do so with explicit acceptance of the unknown cancer risk",
];

export default function Igf1EvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — strong safety concerns, thin enhancement evidence</div>
        <div className="reta-evidence__trial-header">
          The honest IGF-1 evidence picture: the clinical data is from pediatric IGF-1 deficiency — a real and well-characterized indication. The evidence for healthy adult enhancement use is essentially absent in terms of powered RCTs. What is well-documented: the safety concerns (hypoglycemia mechanism, mitogenic association, organ hypertrophy with sustained elevation). The safety evidence is stronger than the efficacy evidence for enhancement use. This asymmetry is the most important framing for anyone evaluating this compound.
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
          The evidence for harm is stronger than the evidence for benefit in enhancement contexts. That asymmetry is the central fact to hold.
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
          These are patterns from community reports and anecdotal accounts. Given the thin clinical evidence base for enhancement use, community experience carries more relative weight here — but also reflects selection bias from people who chose to proceed despite the known risks.
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
