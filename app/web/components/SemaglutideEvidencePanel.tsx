/**
 * SemaglutideEvidencePanel — honest, layered evidence for Semaglutide.
 * Key frame: strongest evidence base of any weight loss drug — multiple large RCTs,
 * a cardiovascular outcome trial (SELECT), and years of post-market real-world data.
 * The evidence is genuinely strong. The honest gaps: cessation rebound, long-term
 * durability beyond 2 years, and comparative data vs tirzepatide at scale.
 */

const SIGNALS = [
  {
    label: "Weight loss — ~15% body weight reduction",
    value: "Strong — multiple Phase 3 RCTs",
    note: "STEP 1 (2.4mg, n=1,961, 68 weeks): ~14.9% weight loss vs ~2.4% placebo. Replicated across STEP 2 (T2D), STEP 3 (intensive behavioral), and STEP 5 (2-year). The weight loss signal is one of the most robustly replicated in pharmaceutical history.",
    tier: "strong",
  },
  {
    label: "Type 2 diabetes glycemic control",
    value: "Strong — SUSTAIN trial program",
    note: "Ozempic is approved for T2D glycemic control with a full Phase 3 program (SUSTAIN 1-10). HbA1c reductions of ~1.5-1.8% at therapeutic doses. One of the most comprehensively studied T2D drugs in the GLP-1 class.",
    tier: "strong",
  },
  {
    label: "Cardiovascular outcomes — SELECT trial",
    value: "Strong — reduced MACE in non-diabetic obese adults",
    note: "SELECT trial (n=17,604, median 34 months): semaglutide 2.4mg reduced major adverse cardiovascular events by 20% (HR 0.80, 95% CI 0.72-0.90) in adults with established CVD, overweight/obesity, without diabetes. First CV outcome trial for a weight loss drug in non-diabetic population.",
    tier: "strong",
  },
  {
    label: "Appetite suppression mechanism — hypothalamic GLP-1R",
    value: "Well-characterized mechanistically",
    note: "GLP-1 receptor activation in the hypothalamus and brainstem directly suppresses appetite and food intake. Semaglutide's extended half-life (weekly dosing possible) is from fatty acid and albumin-binding modifications. The mechanism is well-understood; the brain-gut-adipose axis effects are documented.",
    tier: "strong",
  },
  {
    label: "Thyroid C-cell tumor risk — animal signal",
    value: "Animal data only — uncertain human relevance",
    note: "Rodent studies showed dose-dependent thyroid C-cell adenomas and carcinomas with GLP-1 agonists. Human data has not replicated this signal, but thyroid cancer surveillance is ongoing and medullary thyroid carcinoma history remains a contraindication. The true human risk is not yet established.",
    tier: "none",
  },
  {
    label: "Weight maintenance after cessation",
    value: "Poor — significant regain documented",
    note: "STEP 1 extension: participants who stopped semaglutide regained ~2/3 of lost weight within 1 year. This is not a failure of the drug — it reflects obesity as a chronic disease requiring ongoing treatment. But it's the honest picture of what stopping looks like.",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "1,961", label: "participants in STEP 1 — the weight loss benchmark trial",     note: "68 weeks, semaglutide 2.4mg weekly vs placebo, adults with BMI ≥30 or ≥27 with comorbidity, without T2D" },
  { stat: "~15%",  label: "mean body weight reduction in STEP 1 (14.9% vs 2.4% placebo)", note: "The benchmark figure — the number every newer GLP-1 drug is compared against. Range: some lose 5%, some lose 25%+" },
  { stat: "17,604", label: "participants in SELECT CV outcomes trial",                     note: "Non-diabetic adults with established CVD and overweight/obesity; 20% reduction in MACE with semaglutide 2.4mg" },
  { stat: "2yr",   label: "STEP 5 long-term — maintained weight loss at 104 weeks",       note: "Two-year data shows ~15% sustained weight loss in compliant patients — durability is real with continued use" },
];

const MECHANISMS = [
  {
    receptor: "GLP-1 receptor (CNS + pancreas + GI tract)",
    label: "The primary axis: appetite, insulin, and gut motility — three effects from one receptor",
    tier: "strong",
    body: "GLP-1 receptors are expressed in the hypothalamus and brainstem (appetite/satiety centers), the pancreatic beta cells (insulin secretion), pancreatic alpha cells (glucagon suppression), and the vagus nerve/enteric nervous system (gastric emptying delay). Semaglutide is a GLP-1 receptor agonist with modifications to extend its half-life to ~1 week (fatty acid chain + albumin binding). When it binds hypothalamic GLP-1 receptors, it directly signals satiety and reduces food intake — this is the primary weight loss mechanism, distinct from any metabolic rate effect. The gastric emptying delay (reduced rate food leaves the stomach) adds to fullness but also drives the nausea.",
    evidence: "GLP-1 receptor: well-characterized — decades of endocrinology research. Semaglutide half-life extension: documented pharmacokinetics. Hypothalamic appetite suppression mechanism: established in preclinical and clinical research. Gastric emptying delay: measurable in scintigraphy studies.",
  },
  {
    receptor: "Incretin effect — pancreatic beta cell amplification",
    label: "Glucose-dependent insulin stimulation — smart glucose management",
    tier: "strong",
    body: "GLP-1 is an incretin hormone — it amplifies insulin secretion in response to glucose, but only when glucose is elevated. This glucose-dependence means insulin secretion is appropriate to the glucose load, not continuous. This is what makes GLP-1 drugs inherently less hypoglycemia-prone than insulin or sulfonylureas when used alone. The incretin mechanism also suppresses glucagon from alpha cells, reducing hepatic glucose output. Together: better glucose management with lower hypoglycemia risk than most T2D drugs.",
    evidence: "Incretin physiology: established endocrinology — GLP-1 discovery and incretin effect characterized in 1980s-90s. Glucose-dependent insulin secretion: validated in clinical pharmacology. Glucagon suppression: documented in clinical trials.",
  },
  {
    receptor: "GLP-1R (adipose and cardiovascular tissue)",
    label: "Direct cardiac and adipose effects — the basis for SELECT trial outcomes",
    tier: "moderate",
    body: "GLP-1 receptors are also expressed in cardiac tissue, endothelium, and adipose tissue. The SELECT trial demonstrated a 20% reduction in major adverse cardiovascular events that exceeds what could be explained by weight loss and glucose improvement alone — suggesting direct cardioprotective effects from GLP-1R activation. The mechanisms include anti-inflammatory effects, improved endothelial function, and direct myocardial GLP-1R signaling. These effects are less precisely characterized at the receptor level than the pancreatic and CNS mechanisms.",
    evidence: "SELECT trial: large RCT with significant CV outcome benefit. Direct cardioprotective mechanism: suggested by SELECT, supported by preclinical data on cardiac GLP-1R expression. Not as precisely mechanistically characterized as the CNS/pancreatic pathways.",
  },
];

const GAPS = [
  "Weight maintenance beyond 2 years: STEP 5 goes to 104 weeks; durability beyond 2 years in diverse real-world populations is extrapolated, not directly trialed",
  "Cessation strategies and maintenance dosing: what is the minimum effective dose for weight maintenance? No large trial directly answers this",
  "Comparative effectiveness vs tirzepatide in RCT conditions: no head-to-head weight loss trial has been published; network meta-analysis shows tirzepatide advantage but not from direct comparison",
  "Thyroid C-cell tumor risk in humans over decades: ongoing surveillance; the true human relevance of the rodent signal is not established",
  "Lean mass loss quantification: most trials measured total weight, not fat vs lean mass composition. The lean mass preservation question is inadequately characterized in RCT data",
  "Mental health effects: post-market reports and some signals from pharmacovigilance have raised questions about depression and suicidality; the relationship is not causally established and is actively being studied",
];

const OBSERVED = [
  "The 'food noise' reduction is the most consistently reported subjective effect — many users describe appetite suppression as a qualitative change in their relationship with food, not just reduced hunger",
  "Nausea clustering during escalation is extremely common — most people find it manageable by eating small, low-fat, low-sugar meals and avoiding lying down for 30-60 min post-injection",
  "Hair thinning (telogen effluvium) is reported by a significant minority — it's driven by rapid weight loss, not the drug directly, and resolves with stable weight",
  "Some users report reduced alcohol desire — a serotonergic and dopaminergic signal from GLP-1 receptor activity in brain reward circuits; observational studies are being conducted",
  "Protein intake neglect is the most common self-reported management failure — suppressed appetite makes it easy to accidentally skip protein; users who track protein fare better on lean mass preservation",
  "Injection site rotation is important but under-practiced — lipodystrophy (fat deposition irregularities) from repeated same-site injection is avoidable with proper rotation",
];

export default function SemaglutideEvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — the strongest in weight pharmacology</div>
        <div className="reta-evidence__trial-header">
          Semaglutide has the deepest evidence base of any currently approved weight loss medication. The STEP trial program produced multiple large Phase 3 RCTs. The SELECT trial added cardiovascular outcome evidence that no other weight drug has matched. Post-market real-world data now encompasses millions of patients. The honest caveats: long-term data beyond 2 years is limited, cessation causes significant weight regain, and comparative data vs tirzepatide comes from network meta-analysis rather than a head-to-head trial.
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
          The evidence is strong. The gaps are real. Both statements are true.
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
          These are patterns from community reports and post-market anecdotal accounts. They reflect real use experience that clinical trials don&apos;t fully capture.
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
