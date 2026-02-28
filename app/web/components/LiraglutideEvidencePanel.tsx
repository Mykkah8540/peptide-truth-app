/**
 * LiraglutideEvidencePanel — honest evidence for Liraglutide.
 * Key frame: among the most evidence-rich GLP-1 agents, but its efficacy ceiling
 * (~5-8% weight loss) is substantially below semaglutide and tirzepatide. Strong
 * cardiovascular outcome data (LEADER) is the most distinctive asset.
 */

const SIGNALS = [
  {
    label: "Weight loss in obesity (Saxenda indication) — SCALE trials",
    value: "Established — FDA-approved, large RCTs",
    note: "SCALE Obesity & Prediabetes (n=3,731, 56 weeks, 3.0mg/day): ~5.9% placebo-adjusted weight reduction, ~8% total from baseline. About 63% achieved ≥5% weight loss vs 27% placebo. Real and clinically meaningful — but the 15% achieved by semaglutide and 22% by tirzepatide make this the defining comparison for anyone starting today.",
    tier: "strong",
  },
  {
    label: "T2D glycemic control (Victoza indication)",
    value: "Established — FDA-approved, multiple trials",
    note: "Liraglutide reduces HbA1c by approximately 1.1-1.6% in T2D. LEAD trial program (6 trials) established this. The T2D glycemic efficacy is well-characterized and was the original clinical case for liraglutide before the weight loss indication followed.",
    tier: "strong",
  },
  {
    label: "Cardiovascular outcomes in T2D — LEADER trial",
    value: "Established — the most distinctive asset",
    note: "LEADER trial (n=9,340, median 3.8 years): significant reduction in MACE (major adverse cardiovascular events) — 13% relative risk reduction, predominantly driven by cardiovascular death. This was the first GLP-1 trial to demonstrate a statistically significant mortality-relevant CV benefit. SELECT (semaglutide) has since shown similar findings in a non-diabetic CV risk population, but LEADER remains the defining CV outcome dataset for liraglutide specifically.",
    tier: "strong",
  },
  {
    label: "Thyroid C-cell safety — class-wide concern, boxed warning",
    value: "Class risk — warrants screening",
    note: "Rodent studies showed thyroid C-cell tumors (medullary thyroid carcinoma and C-cell hyperplasia) at high exposures — leading to the black box warning. Human epidemiological data has not demonstrated a significant MTC incidence increase, but the class-wide contraindication for MTC history and MEN2 stands because the mechanistic concern is real and the human long-term data is not sufficient to clear it.",
    tier: "none",
  },
  {
    label: "Pancreatitis — class-wide concern across GLP-1 agents",
    value: "Signal present — not clearly causal",
    note: "The pancreatitis signal with GLP-1 agonists has been examined in large datasets. Post-marketing pharmacovigilance and trial safety data show cases of acute pancreatitis with liraglutide and class agents. The causal relationship remains contested — GLP-1R is expressed in the pancreas, and mechanistic plausibility exists. History of pancreatitis is a precaution in prescribing information.",
    tier: "none",
  },
  {
    label: "Lean mass loss — appetite suppression without protein management",
    value: "Documented concern across GLP-1 class",
    note: "GLP-1-mediated appetite suppression reduces total caloric intake. Without deliberate protein anchoring and resistance training, lean mass is lost alongside fat. The lean mass loss concern applies to all GLP-1 agents; it's more pronounced with higher weight loss (semaglutide, tirzepatide) but still relevant for liraglutide's 5-8% weight loss range.",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "3,731",  label: "patients in SCALE Obesity (56 wks, Saxenda 3.0mg) — the primary weight trial",      note: "~8% total weight loss from baseline; ~5.9% placebo-adjusted" },
  { stat: "9,340",  label: "patients in LEADER (median 3.8 yrs) — cardiovascular outcome trial",                 note: "13% relative risk reduction in MACE; predominantly CV death benefit" },
  { stat: "~5-8%",  label: "weight loss — meaningfully lower than semaglutide (~15%) and tirzepatide (~22%)",   note: "The efficacy gap is the primary comparison point for anyone making a GLP-1 class decision" },
  { stat: "Daily",  label: "injection schedule — practical disadvantage vs. weekly agents",                      note: "Same injection frequency burden produces lower weight loss than weekly semaglutide or tirzepatide" },
];

const MECHANISMS = [
  {
    receptor: "GLP-1 receptor (GLP-1R) — central appetite and metabolic signaling",
    label: "Same receptor as semaglutide — different molecule, shorter half-life, lower potency",
    tier: "strong",
    body: "Liraglutide is a GLP-1R agonist structurally similar to native GLP-1 but with a fatty acid side chain that extends its half-life to ~13 hours (vs minutes for native GLP-1). This requires daily dosing. The receptor pharmacology is identical to semaglutide in principle — CNS satiety signaling via GLP-1R in the hypothalamus and brainstem, glucose-dependent insulin secretion, slowed gastric emptying. The differences are in half-life (13hr vs ~7 days for semaglutide), receptor binding affinity, and resulting efficacy.",
    evidence: "GLP-1R pharmacology: established. Liraglutide receptor affinity and PK: characterized. Comparison to semaglutide receptor binding: published in receptor pharmacology literature.",
  },
  {
    receptor: "Hypothalamic satiety pathways — appetite and food noise suppression",
    label: "The 'food noise' reduction is the mechanism patients report most distinctively",
    tier: "strong",
    body: "GLP-1R activation in the hypothalamus (arcuate nucleus, paraventricular nucleus) and brainstem suppresses appetite signaling. Patients consistently report that food preoccupation ('food noise') decreases — the constant mental chatter about food, cravings, and next meal planning that underlies overeating for many people. This is mechanistically distinct from willpower-based restriction. The reduction in food noise is real, pharmacological, and the most patient-reported quality-of-life benefit across the GLP-1 class.",
    evidence: "GLP-1R in CNS appetite regulation: established in rodent models and human neuroimaging studies. Patient-reported food noise suppression: consistently reported across GLP-1 class trials. Dose-response relationship for CNS effects: characterized.",
  },
];

const GAPS = [
  "Long-term weight maintenance after liraglutide discontinuation: SCALE extension data shows significant weight regain; the long-term trajectory is not favorable without continuation",
  "Direct comparison to semaglutide for weight loss in a head-to-head RCT at equivalent time periods: indirect comparisons show semaglutide superiority, but direct head-to-head with modern endpoints is limited",
  "Lean mass composition during weight loss: SCALE primary endpoints focused on total weight, not body composition; lean mass characterization is secondary",
  "Long-term thyroid safety: the rodent C-cell signal creates a surveillance obligation that is ongoing in post-marketing data; definitive human MTC risk assessment is not established",
  "Non-alcoholic fatty liver disease (NAFLD) outcomes: some evidence for GLP-1 class benefit in liver disease, but liraglutide-specific NASH data is limited compared to newer agents",
];

const OBSERVED = [
  "The food noise reduction is the most distinctively reported patient experience — 'I can think about something other than food' is the common framing; this matches the hypothalamic mechanism",
  "Nausea is the most common reason for titration delay or discontinuation — patients who slow the titration schedule often tolerate it better than those who follow the standard weekly escalation rigidly",
  "Weight loss plateaus in months 9-12 are common — consistent with SCALE trial data; this is pharmacological tolerance to the weight-suppressing effect at fixed dose, not treatment failure",
  "Daily injection burden is consistently cited as the primary adherence challenge compared to semaglutide — switching to weekly semaglutide for improved adherence and efficacy is a common clinical decision",
  "The cardiovascular benefit (LEADER) makes liraglutide specifically relevant for T2D patients with established cardiovascular disease — this group represents the clearest current indication for choosing liraglutide over non-CV-proven alternatives",
];

export default function LiraglutideEvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — strong foundation, lower efficacy ceiling than newer agents</div>
        <div className="reta-evidence__trial-header">
          Liraglutide has one of the stronger evidence bases in the GLP-1 class by volume of data and time — SCALE for obesity, LEAD program for T2D, LEADER for cardiovascular outcomes. The honest comparison is that newer weekly agents (semaglutide, tirzepatide) have surpassed it on the primary efficacy metric (weight loss) with equal or lower injection burden. If you&apos;re evaluating liraglutide today, LEADER CV data and a history of tolerance on the compound are the two strongest arguments for staying with or choosing it specifically.
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
          The efficacy gap between liraglutide (~5-8%) and semaglutide (~15%) and tirzepatide (~22%) is the central clinical comparison for anyone making a new GLP-1 class decision.
        </div>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">The mechanism — what we know</div>
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
          These are patterns from patient reports and clinical practice. Liraglutide has enough clinical use history that the patient experience picture is fairly consistent.
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
