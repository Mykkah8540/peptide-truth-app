/**
 * Cjc1295DacEvidencePanel — calibrated evidence for CJC-1295 DAC.
 * Key frame: the 2006 Teichman trial (PMID 16352683) is the foundational human PK/PD study;
 * albumin-binding mechanism is well-characterized; dose-response is established.
 * Long-term efficacy for body composition outcomes, optimal steady-state dosing,
 * and comparative superiority over no-DAC have no direct evidence.
 */

type Tier = "strong" | "moderate" | "none";

interface Signal {
  id: string;
  claim: string;
  tier: Tier;
  tierLabel: string;
  body: string;
  sources: string;
}

const SIGNALS: Signal[] = [
  {
    id: "dac-pharmacokinetics",
    claim: "DAC modification extends CJC-1295 half-life to ~8 days via albumin binding; GH and IGF-1 remain elevated for 14 days after a single injection",
    tier: "strong",
    tierLabel: "Strong — established in the 2006 Teichman human dose-ranging trial; albumin binding mechanism characterized",
    body: "The 2006 Teichman et al. trial (PMID 16352683, J Clin Endocrinol Metab) is the foundational human evidence for CJC-1295 DAC pharmacokinetics and pharmacodynamics. The randomized, double-blind, placebo-controlled dose-escalation study administered single subcutaneous injections of DAC-GRF at 30, 60, 90, or 120 mcg/kg to healthy adults. Results showed: (1) mean GH concentration increased 2-10 fold above baseline depending on dose; (2) mean IGF-1 concentration increased 30-120% above baseline; (3) both GH and IGF-1 remained elevated for at least 6 days (GH) and 14 days (IGF-1) after a single injection. The albumin-binding mechanism (maleimido-proprionic acid reacting with Cys34 of albumin) was confirmed biochemically. The half-life of ~8 days was derived from the elimination phase of pharmacokinetic analysis.",
    sources: "Teichman et al. 2006 (J Clin Endocrinol Metab — PMID 16352683); DAC-GRF dose-ranging study; albumin binding mechanism characterization studies",
  },
  {
    id: "albumin-binding-chemistry",
    claim: "The DAC maleimide-albumin covalent bond is a well-characterized pharmaceutical chemistry technique for half-life extension",
    tier: "strong",
    tierLabel: "Strong — established pharmaceutical chemistry; thiol-maleimide reaction mechanism is well-understood",
    body: "The DAC modification uses a maleimidoproprionic acid (MPA) linker that undergoes thiol-maleimide conjugation with the free cysteine residue at position 34 of circulating albumin. This reaction is selective (Cys34 is the only free thiol in albumin under physiological conditions), rapid (reaches completion within minutes in plasma), and forms a stable thioether bond. The albumin half-life (~19 days) then governs the clearance of the conjugate. This chemistry is understood from pharmaceutical science, not just empirical pharmacokinetics — the mechanism is not in question.",
    sources: "Thiol-maleimide conjugation chemistry (pharmaceutical science); albumin Cys34 reactivity characterization; CJC-1295 DAC structure studies; Walker et al. (albumin drug conjugate half-life extension literature)",
  },
  {
    id: "dose-response-characterized",
    claim: "Dose-dependent GH and IGF-1 responses to CJC-1295 DAC are characterized in the 30-120 mcg/kg range",
    tier: "moderate",
    tierLabel: "Moderate — dose-response from a single human trial; extrapolation required for community dosing ranges",
    body: "The Teichman trial established dose-response relationships in the 30-120 mcg/kg range (approximately 2-8 mg for a 70 kg adult). Lower doses (30 mcg/kg) produced modest GH increases; higher doses (120 mcg/kg) produced larger, more sustained responses. Community dosing protocols typically use 1-2 mg per week — which maps roughly to the lower end of the trial dosing range for a 70 kg adult. The dose-response established in the single-dose trial provides a reference but does not characterize the accumulation pharmacokinetics at steady-state with weekly repeated dosing, which is the community use pattern.",
    sources: "Teichman et al. 2006 (dose-response data); community dosing protocol extrapolation; pharmacokinetic modeling from single-dose data",
  },
  {
    id: "body-composition",
    claim: "CJC-1295 DAC improves body composition (increased lean mass, reduced fat mass) in healthy adults",
    tier: "moderate",
    tierLabel: "Moderate — biologically plausible via IGF-1 elevation; no controlled body composition study published",
    body: "The sustained IGF-1 elevation produced by CJC-1295 DAC (30-120% above baseline in the Teichman trial) is expected to have anabolic and lipolytic effects via insulin-like growth factor 1 signaling — IGF-1 promotes muscle protein synthesis and fatty acid mobilization. This is biologically plausible and mechanistically consistent with the known effects of GH/IGF-1 axis activation. However, no controlled trial of CJC-1295 DAC (or no-DAC) for body composition outcomes has been published in healthy adults. Community evidence for body composition effects is anecdotal and uncontrolled.",
    sources: "IGF-1 anabolic effects (well-established physiology); extrapolation from GH therapy body composition literature; absence of controlled body composition studies for CJC-1295 DAC specifically",
  },
  {
    id: "dac-vs-nodac-superiority",
    claim: "CJC-1295 DAC produces superior body composition or performance outcomes compared to no-DAC CJC-1295",
    tier: "none",
    tierLabel: "None — no comparative study; different pharmacological profiles, not a better vs worse comparison",
    body: "No study has directly compared body composition outcomes between CJC-1295 DAC and no-DAC. The pharmacological comparison between continuous (DAC) and pulsatile (no-DAC) GH stimulation for performance or body composition is an active scientific question in GH physiology — and pulsatile GH secretion may have distinct anabolic advantages over continuous GH due to receptor sensitization/desensitization dynamics. The choice between DAC and no-DAC is appropriately framed as a pharmacological profile preference (continuous vs pulsatile), not as a superiority claim for either form.",
    sources: "GH pulsatility and anabolic signaling literature; absence of head-to-head body composition studies for DAC vs no-DAC CJC-1295",
  },
  {
    id: "long-term-safety",
    claim: "Long-term weekly CJC-1295 DAC use is safe and does not produce meaningful adverse effects",
    tier: "none",
    tierLabel: "None — no long-term safety study; the Teichman trial was a short-term single/two-dose PK study",
    body: "The Teichman trial is a pharmacokinetic dose-ranging study in healthy adults — it characterized the half-life, GH/IGF-1 response, and acute tolerability, and found no serious adverse events at the doses studied. However, it was not designed or powered to assess long-term safety. The well-established long-term adverse effects of GH excess — glucose intolerance, insulin resistance, carpal tunnel syndrome, edema, potential IGF-1-mediated mitogenesis — apply to any compound producing sustained GH/IGF-1 elevation, including CJC-1295 DAC at steady state. The long-term safety profile of community weekly dosing for months is not established in controlled data.",
    sources: "Teichman et al. 2006 (short-term safety data only); GH excess long-term effects literature (acromegaly, therapeutic GH); absence of long-term CJC-1295 DAC safety studies",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",         labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",       labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence",    labelColor: "#9e3800" },
};

export default function Cjc1295DacEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        CJC-1295 DAC has the most direct human pharmacokinetic evidence of any community GHRH analog — the 2006 Teichman trial (PMID 16352683) is a proper randomized dose-ranging study that established the 8-day half-life and dose-dependent GH/IGF-1 response in healthy adults. The albumin-binding mechanism is well-characterized from pharmaceutical chemistry. What the evidence does not establish: long-term safety at community dosing patterns, body composition outcomes in controlled studies, or comparative superiority over no-DAC CJC-1295. The gap between the strong pharmacokinetic evidence and the body composition/performance evidence claims is substantial.
      </div>
      <div className="reta-evidence__list">
        {SIGNALS.map((s) => {
          const st = TIER_STYLE[s.tier];
          return (
            <div
              key={s.id}
              className="reta-evidence__entry"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-evidence__entry-top">
                <div className="reta-evidence__entry-claim">{s.claim}</div>
                <div
                  className="reta-evidence__entry-tier"
                  style={{ color: st.labelColor, borderColor: st.border }}
                >
                  {s.tierLabel}
                </div>
              </div>
              <div className="reta-evidence__entry-body">{s.body}</div>
              <div className="reta-evidence__entry-sources">{s.sources}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
