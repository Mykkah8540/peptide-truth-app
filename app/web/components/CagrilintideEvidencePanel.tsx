/**
 * CagrilintideEvidencePanel — honest evidence for Cagrilintide.
 * Key frame: the evidence for cagrilintide alone is ~10% weight loss (Phase 2).
 * The interesting evidence is CagriSema (~25% Phase 2). Phase 3 is ongoing.
 * The amylin mechanism is pharmacologically established; the clinical outcome
 * data at scale is the gap that Phase 3 will address.
 */

const SIGNALS = [
  {
    label: "CagriSema ~25% weight loss at 32 weeks — Phase 2 SCALE STEP",
    value: "Phase 2 RCT — not yet Phase 3 confirmed",
    note: "The SCALE STEP Phase 2 trial (n=96) randomized participants to CagriSema (cagrilintide 2.4 mg + semaglutide 2.4 mg) vs. each monotherapy vs. placebo. CagriSema arm achieved approximately 25% body weight reduction at 32 weeks. This is meaningfully more than semaglutide alone (~15%) at the same timepoint. The caveat: Phase 2 sample sizes are not powered to detect the full safety profile, and Phase 2 results do not always replicate in Phase 3.",
    tier: "moderate",
  },
  {
    label: "Cagrilintide monotherapy ~10% weight loss — Phase 2",
    value: "Phase 2 — comparable to liraglutide class",
    note: "Cagrilintide monotherapy produces approximately 10% weight loss, placing it in the liraglutide tier of efficacy. This is meaningful but not the figure driving the compound's development — the combination outperformance is why the Phase 3 program exists. Monotherapy is not the primary clinical pathway.",
    tier: "moderate",
  },
  {
    label: "Glucagon suppression and gastric emptying slowing — amylin pharmacology",
    value: "Mechanistically established — class effect of amylin agonism",
    note: "Amylin receptor agonism (through the calcitonin receptor + RAMP1 or RAMP3 complex) suppresses postprandial glucagon secretion, slows gastric emptying, and signals satiety through the area postrema. These are established pharmacological effects of the amylin class, confirmed with pramlintide (the only approved amylin analog) in human T2D and T1D studies. Cagrilintide extends this mechanism with once-weekly dosing.",
    tier: "strong",
  },
  {
    label: "GI tolerability — nausea and gastrointestinal effects",
    value: "Documented — dose-dependent, similar to GLP-1 initiation",
    note: "Phase 2 data showed nausea, vomiting, and decreased appetite as the primary adverse effects, consistent with the gastric slowing mechanism. The tolerability profile required titration in trials. No novel safety signals emerged in Phase 2, but the sample size is insufficient to characterize rare events.",
    tier: "moderate",
  },
  {
    label: "Cardiovascular outcomes — not yet established",
    value: "No CVOT data for cagrilintide — Phase 3 will include CV endpoints",
    note: "GLP-1 agonists (semaglutide, liraglutide) have established cardiovascular outcome trial (CVOT) data showing MACE reduction. Cagrilintide does not have CVOT data. The REDEFINE Phase 3 program is expected to include cardiovascular endpoints, but this data does not yet exist. Community use precedes any cardiovascular evidence.",
    tier: "none",
  },
  {
    label: "Long-term weight maintenance after discontinuation",
    value: "Not characterized — extrapolated from GLP-1 class experience",
    note: "GLP-1 class data shows weight regain after discontinuation — this is expected for appetite-suppressing agents when the mechanism is removed. Whether CagriSema's combination mechanism alters the durability of weight loss after discontinuation is unknown. The Phase 2 follow-up period was insufficient to characterize post-treatment weight trajectory.",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "~96",    label: "SCALE STEP Phase 2 participants — small by Phase 3 standards",       note: "Phase 2 trials are designed to establish dose and early efficacy signals, not to power safety or rare event detection" },
  { stat: "~25%",   label: "CagriSema body weight reduction at 32 weeks — the headline figure",   note: "25% at 32 weeks exceeds semaglutide 2.4 mg alone (~15%) in the same timeframe; the additive amylin mechanism is the proposed explanation" },
  { stat: "Phase 3", label: "REDEFINE program status — ongoing; approval timeline uncertain",     note: "Phase 3 is where the combination's actual clinical profile (including cardiovascular endpoints, safety at scale) will be determined" },
  { stat: "0",       label: "approved indications for cagrilintide — no FDA or EMA approval",    note: "Community use precedes regulatory evaluation; the safety monitoring in trials is not replicated in self-administration" },
];

const MECHANISMS = [
  {
    receptor: "Amylin receptor complex (CALCR + RAMP1/3) — satiety and glucagon suppression",
    label: "Complementary to GLP-1 — different receptor, different brainstem signaling, additive satiety effect",
    tier: "strong",
    body: "The amylin receptor is formed by the calcitonin receptor (CALCR) combined with receptor activity-modifying proteins (RAMP1 or RAMP3). This complex is pharmacologically distinct from the GLP-1 receptor. Amylin agonism acts at the area postrema (a brainstem structure outside the blood-brain barrier) to signal satiety — a different neural pathway than GLP-1's hypothalamic and vagal signaling. The glucagon suppression mechanism limits post-meal glucose excursions without requiring GLP-1 receptor engagement. These distinct pathways explain why the combination exceeds monotherapy: the satiety signals add rather than compete.",
    evidence: "Amylin pharmacology: well-established from pramlintide clinical program and basic science. Cagrilintide CALCR/RAMP binding: confirmed in receptor pharmacology studies. Additive satiety mechanism with GLP-1: proposed from mechanistic understanding, consistent with Phase 2 results, not independently characterized at receptor level in the combination context.",
  },
  {
    receptor: "Gastric emptying slowing — overlapping with GLP-1 mechanism",
    label: "Both amylin and GLP-1 slow gastric emptying — the combination may amplify GI effects",
    tier: "moderate",
    body: "Both amylin and GLP-1 receptor agonists slow gastric emptying. In the CagriSema combination, two gastric slowing mechanisms act simultaneously. This contributes to satiety (food stays in the stomach longer) but also contributes to nausea and GI side effects. The Phase 2 tolerability data showed manageable GI effects with titration — but the overlap of mechanisms means GI tolerability is a real consideration in the combination that doesn't exist with either monotherapy alone.",
    evidence: "Gastric emptying slowing by amylin: established from pramlintide studies in T2D. Gastric emptying slowing by GLP-1: established from multiple GLP-1 agonist programs. Additive gastric slowing in CagriSema: observed in Phase 2 as GI side effects; not separately characterized pharmacokinetically.",
  },
];

const GAPS = [
  "Phase 3 CagriSema efficacy data: ongoing — Phase 2 results are encouraging but not confirmatory; the REDEFINE program will close this gap",
  "Cardiovascular outcomes: not established — GLP-1 class has CVOT data; cagrilintide/CagriSema does not yet",
  "Long-term weight maintenance after discontinuation: unknown — whether the dual mechanism changes post-treatment weight trajectory vs. GLP-1 alone is not studied",
  "Optimal dose combination in CagriSema: the Phase 2 dose (2.4 mg each) may not be the Phase 3 dose; dose optimization is ongoing",
  "Safety at scale: Phase 2 n=96 is insufficient to characterize rare adverse events; Phase 3 will provide the first meaningful safety signal data",
  "Community dosing protocols vs. trial dosing: research-grade cagrilintide is not the same formulation; pharmacokinetics may differ",
];

const OBSERVED = [
  "Community users combining research-grade cagrilintide with semaglutide report appetite suppression as the dominant experience — consistent with the combined mechanism",
  "GI side effects during initiation are consistently reported — the gastric slowing from both mechanisms creates a tolerability period that many users underestimate",
  "Weight loss rates in community reports vary widely, partly because research-grade dosing is unvalidated and purity is not assured",
  "The CagriSema concept is generating significant anticipation — some community members are combining before Phase 3 data exists, on the basis of Phase 2 results",
  "Source quality is a consistent community concern — research-grade cagrilintide purity is highly variable across suppliers",
];

export default function CagrilintideEvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — Phase 2 signal, Phase 3 pending</div>
        <div className="reta-evidence__trial-header">
          The ~25% CagriSema Phase 2 figure is the most compelling weight loss number in the clinical pipeline. It is also a Phase 2 number from 96 participants at 32 weeks — a different standard of evidence than what tirzepatide&apos;s ~22% is based on (Phase 3, n=2,539, 72 weeks). The mechanism is pharmacologically sound. The Phase 3 data will determine whether the Phase 2 signal holds. Community use is currently occurring ahead of this determination.
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
          Cagrilintide monotherapy (~10%) is less compelling than the combination. The compound&apos;s value proposition is mechanistic complementarity with semaglutide — evaluating it outside that context misses the clinical picture.
        </div>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">The mechanism — complementary, not redundant</div>
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
          Community reports from metabolic-focused users combining research-grade cagrilintide with semaglutide. Purity variability is high.
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
