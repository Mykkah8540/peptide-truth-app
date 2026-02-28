/**
 * NadPlusEvidencePanel — honest, layered evidence for NAD+.
 * Three lanes: what the mechanism does → what small human studies show → what remains unknown.
 * Strong mechanistic foundation. Thin clinical trial data. Gaps stated clearly.
 */

const SIGNALS = [
  {
    label: "NAD+ declines with age (biology)",
    value: "Well established",
    note: "documented in human tissue across multiple studies",
    tier: "strong",
  },
  {
    label: "NAD+ role in ATP synthesis",
    value: "Textbook mechanism",
    note: "established biochemistry — not in dispute",
    tier: "strong",
  },
  {
    label: "Sirtuin / PARP pathway activation",
    value: "Mechanistically supported",
    note: "animal models + cell studies — human data growing",
    tier: "moderate",
  },
  {
    label: "Supplementation raises blood NAD+ levels",
    value: "Confirmed (NR/NMN)",
    note: "oral precursors show this; direct NAD+ oral bioavailability less clear",
    tier: "moderate",
  },
  {
    label: "Clinical longevity / cognitive outcomes",
    value: "No large RCT data",
    note: "small studies only — no validated endpoint trials",
    tier: "none",
  },
  {
    label: "Head-to-head: NAD+ vs NMN vs NR",
    value: "Not resolved",
    note: "no systematic human comparison trial",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "~500mg",  label: "NR dose studied",           note: "Martens et al. 2018 — older adults, 6-week RCT" },
  { stat: "+40%",    label: "blood NAD+ increase",        note: "NR supplementation confirmed to raise NAD+ in humans" },
  { stat: "20–30",   label: "human studies on NAD+ precursors", note: "small, short-duration — 2015–2024" },
  { stat: "~12 wk",  label: "longest trials to date",    note: "no long-duration RCTs yet" },
];

const MECHANISMS = [
  {
    receptor: "Mitochondrial energy",
    label: "The proven foundation",
    tier: "strong",
    body: "NAD+ (nicotinamide adenine dinucleotide) is the electron carrier in the mitochondrial oxidative phosphorylation chain — the process that generates ATP from food. Without adequate NAD+, cellular energy production falters. Age-related NAD+ depletion is documented and mechanistically significant. This isn't speculative biology — it's foundational biochemistry.",
    evidence: "Established across decades of metabolic biochemistry research. NAD+ depletion in aging tissue is well-documented in multiple species including humans.",
  },
  {
    receptor: "Sirtuin activation",
    label: "The anti-aging pathway",
    tier: "moderate",
    body: "Sirtuins (SIRT1–7) are NAD+-dependent deacetylases — enzymes that regulate gene expression, DNA repair, inflammation, and metabolism. They only function when NAD+ is available. Animal studies show sirtuin activation via NAD+ precursors improves longevity markers, muscle function, and metabolic health. Human evidence is growing but not definitive.",
    evidence: "Animal models: robust. Human studies: mostly biomarker-level, short duration. No large human RCT confirming longevity extension.",
  },
  {
    receptor: "PARP DNA repair",
    label: "The DNA integrity angle",
    tier: "moderate",
    body: "PARP-1 (poly ADP-ribose polymerase) is a key DNA repair enzyme that consumes NAD+ rapidly when DNA damage occurs. As NAD+ levels decline with age, DNA repair capacity may be impaired. This is a plausible mechanism for age-related genomic instability. The flip side: PARP inhibitor cancer drugs deliberately suppress PARP to kill tumor cells — meaning elevated NAD+ may conflict with cancer therapy.",
    evidence: "Mechanistic evidence: strong. Clinical demonstration in humans: limited. Cancer drug interaction is clinically established.",
  },
];

const GAPS = [
  "No large randomized controlled trials demonstrating clinical longevity, cognitive, or disease-prevention outcomes in humans",
  "Oral bioavailability of NAD+ itself is uncertain — most of it may be degraded in the gut before reaching cells",
  "Whether raising blood NAD+ actually raises intracellular NAD+ in target tissues (brain, muscle) remains unresolved",
  "Which form (direct NAD+, NMN, or NR) most effectively raises cellular NAD+ has not been systematically compared in humans",
  "Long-term supplementation effects beyond 12 weeks are largely unstudied in humans",
  "Theoretical cancer concern: NAD+ is required by tumor cells for energy and repair — the significance in humans is under active investigation",
];

const OBSERVED = [
  "IV NAD+ infusions are consistently described as uncomfortable — intense flushing, pressure, and anxiety sensations that resolve after infusion",
  "Energy and mental clarity improvements are frequently self-reported, but attribution is difficult given placebo potential",
  "Oral supplementation is almost universally described as 'subtle' — no acute signal, effects (if present) emerge over weeks",
  "NMN and NR precursors are widely preferred over direct NAD+ oral supplementation due to better bioavailability evidence",
  "Combining NAD+ or NMN with resveratrol is a popular self-experiment — claimed to potentiate sirtuin activation — but human data is thin",
];

export default function NadPlusEvidencePanel() {
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

      {/* ── Human study snapshot ── */}
      <div>
        <div className="reta-evidence__section-label">What human studies actually show</div>
        <div className="reta-evidence__trial-header">
          30+ small human trials on NAD+ precursors (primarily NR and NMN), 2015–2024 — mostly 4–12 weeks, 20–120 participants, focused on safety, bioavailability, and blood NAD+ elevation. No large RCTs on clinical outcomes. Martens et al. (Cell Metabolism, 2018) is among the most cited: 500mg NR raised blood NAD+ ~40% in older adults.
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
          Blood NAD+ going up is not the same as clinical outcomes improving. That gap is the honest story of where NAD+ research currently sits.
        </div>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">The three pathways — what we know and from where</div>
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
        <div className="reta-evidence__section-label">What the evidence doesn&apos;t cover yet</div>
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
