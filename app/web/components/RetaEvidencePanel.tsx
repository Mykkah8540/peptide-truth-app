/**
 * RetaEvidencePanel — honest, layered evidence presentation for Retatrutide.
 * Three lanes: clinical trial data → mechanistic understanding → real-world patterns.
 * Makes thin evidence feel honest and rich rather than empty.
 */

// Evidence signal tiers — what level of evidence exists for each dimension
const SIGNALS = [
  {
    label: "Human trial weight loss",
    value: "Strong signal",
    note: "1 Phase 2 trial, 338 people",
    tier: "strong",
  },
  {
    label: "GLP-1 + GIP mechanism",
    value: "Well established",
    note: "proven via semaglutide & tirzepatide",
    tier: "strong",
  },
  {
    label: "Glucagon mechanism",
    value: "Supported",
    note: "animal models + mechanistic reasoning",
    tier: "moderate",
  },
  {
    label: "Long-term safety (>1 yr)",
    value: "No data yet",
    note: "Phase 3 ongoing",
    tier: "none",
  },
  {
    label: "Cardiovascular outcomes",
    value: "No data yet",
    note: "unlike sema & tirz",
    tier: "none",
  },
  {
    label: "Head-to-head vs. approved drugs",
    value: "None yet",
    note: "no direct comparator trial",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

// Key findings from the Phase 2 trial (Jastreboff et al., NEJM 2023)
const TRIAL_STATS = [
  { stat: "~24%",  label: "body weight lost",      note: "12 mg/wk at 48 weeks" },
  { stat: "~17%",  label: "body weight lost",      note: "8 mg/wk at 48 weeks" },
  { stat: "338",   label: "participants",           note: "adults with obesity, no T2D" },
  { stat: "~16%",  label: "stopped at highest dose", note: "GI side effects; nausea peaked early" },
];

// The three receptor components — what we know and from where
const MECHANISMS = [
  {
    receptor: "GLP-1",
    label: "The proven foundation",
    tier: "strong",
    body: "GLP-1 receptor agonism is one of the most studied mechanisms in metabolic medicine. Semaglutide and liraglutide have established it in humans across thousands of people. It slows gastric emptying, reduces appetite, and improves insulin response. This part of retatrutide isn't a question.",
    evidence: "Established via semaglutide (FDA 2021), liraglutide (FDA 2014), and 10+ years of human data.",
  },
  {
    receptor: "GIP",
    label: "The reinforcement",
    tier: "strong",
    body: "GIP agonism is proven through tirzepatide. It appears to amplify the GLP-1 effect — producing better weight loss than GLP-1 alone with a somewhat different side effect profile. Adding GIP is no longer experimental — it's the mechanism behind the most effective approved obesity drug available.",
    evidence: "Established via tirzepatide (FDA 2023, SURMOUNT-1: ~21% body weight at 72 weeks).",
  },
  {
    receptor: "Glucagon",
    label: "The new variable",
    tier: "moderate",
    body: "This is where retatrutide goes beyond everything before it. Glucagon agonism theoretically increases energy expenditure — turning up metabolic rate even while appetite is suppressed. It may counteract the metabolic adaptation (\"starvation mode\") that typically slows weight loss on GLP-1s. The Phase 2 results suggest this is doing something real. But the isolated contribution of glucagon in humans is not yet established.",
    evidence: "Mechanistic reasoning + animal models. Phase 2 results consistent with additive effect, but not isolated.",
  },
];

// What the evidence doesn't yet cover
const GAPS = [
  "No data beyond ~48 weeks — durability of weight loss is unknown",
  "No cardiovascular outcomes trial (semaglutide and tirzepatide have these; reta doesn't yet)",
  "No head-to-head against semaglutide or tirzepatide in the same trial",
  "No data on what happens when you stop — regain trajectory is unstudied",
  "Which patients respond best (and who doesn't) is not yet characterized",
  "The glucagon component's isolated contribution to outcomes is not established in humans",
];

// Real-world observed patterns — honest, framed as observation not evidence
const OBSERVED = [
  "Stronger appetite suppression than sema or tirz is frequently reported — 'food noise' drops more",
  "GI side effects hit harder early and are often described as more intense than tirzepatide",
  "Weight loss described as faster in the first 8–12 weeks vs. prior GLP-1 experience",
  "Supply and dosing accuracy concerns are real — still research-grade access, not commercial",
  "Some people report better energy and less fatigue than expected given the calorie deficit",
];

export default function RetaEvidencePanel() {
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

      {/* ── The human trial ── */}
      <div>
        <div className="reta-evidence__section-label">The one human trial — what it actually found</div>
        <div className="reta-evidence__trial-header">
          Phase 2 / Jastreboff et al., <em>NEJM</em> July 2023 — 48-week randomized dose-ranging study in 338 adults with obesity (no T2D). Highest quality data available. Phase 3 is ongoing.
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
          The weight-loss signal here is unusually strong for the class — but it's one trial, 338 people, 48 weeks. That's real data. It's not enough to make confident long-term claims.
        </div>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">How the three components stack up</div>
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
