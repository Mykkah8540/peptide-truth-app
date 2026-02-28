/**
 * FiveAmino1MQSafetyPanel — safety intelligence for 5-Amino-1MQ.
 * Key frame: no human safety data exists. The safety profile is fundamentally
 * unknown. The SAM/methylation pathway perturbation is the most serious
 * theoretical concern. Liver and kidney function are the monitoring priorities.
 */

type Tier = "flag" | "watch" | "low";

interface SideEffect {
  id: string;
  name: string;
  tier: Tier;
  prevalence: string;
  mechanism: string;
  management: string[];
}

const SIDE_EFFECTS: SideEffect[] = [
  {
    id: "no-safety-data",
    name: "No human safety data — the defining safety concern",
    tier: "flag",
    prevalence: "Applies to all users — the compound has not been through Phase 1 safety trials",
    mechanism: "There are no published human safety trials for 5-Amino-1MQ. The safety profile — what adverse effects occur, at what doses, with what frequency, in what populations — is genuinely unknown. Community use is occurring without this data. This is not a minor gap to acknowledge and proceed past; it is a fundamental uncertainty that applies to the entire decision.",
    management: [
      "Understand that any adverse effect you experience may be caused by 5-Amino-1MQ, and there is no clinical framework to predict what these might be or how serious they could become",
      "If you choose to use: start at the low end of community dosing conventions and monitor for any unusual symptoms, with willingness to stop immediately",
      "Liver function testing before and during use is prudent given NNMT's high expression in liver tissue",
    ],
  },
  {
    id: "methylation-disruption",
    name: "SAM depletion reversal — potential methylation pathway effects",
    tier: "watch",
    prevalence: "Theoretical — mechanism-based concern; not characterized in humans",
    mechanism: "NNMT consumes SAM (S-adenosylmethionine) — the primary methyl donor for DNA methylation, histone methylation, and many metabolic methylation reactions. By inhibiting NNMT, 5-Amino-1MQ raises SAM. Raising SAM could affect DNA and histone methylation patterns — epigenetic changes. The consequences of acutely raising SAM through NNMT inhibition (as opposed to dietary methionine) are not characterized. Long-term epigenetic effects are an unknown.",
    management: [
      "If on medications that affect methylation (folate, B12, MTHFR-related supplementation): the interaction with 5-Amino-1MQ's SAM effects is unstudied",
      "Avoid simultaneously taking high doses of methionine or SAMe (S-adenosylmethionine supplement) — stacking SAM-raising interventions amplifies unknown effects",
    ],
  },
  {
    id: "liver-effects",
    name: "Liver effects — NNMT is highly expressed in liver",
    tier: "watch",
    prevalence: "Theoretical — not established in human data; warrants monitoring",
    mechanism: "NNMT is among the most highly expressed enzymes in normal human liver. Pharmacological NNMT inhibition in hepatic tissue could affect liver NAD+ metabolism, methylation patterns, and lipid handling. The liver is the primary metabolic organ for many of these pathways. Whether 5-Amino-1MQ produces hepatotoxicity or hepatic metabolic changes in humans is unknown.",
    management: [
      "Baseline liver function tests (ALT, AST, bilirubin) before starting — establishes a reference point",
      "Periodic liver function monitoring during sustained use",
      "Active liver disease (fatty liver disease, hepatitis, cirrhosis): avoid until human hepatic safety data exists",
    ],
  },
  {
    id: "cancer-nnmt-concern",
    name: "Cancer — NNMT has complex roles in cancer biology",
    tier: "watch",
    prevalence: "Theoretical — mechanism is bidirectional; not resolved by available data",
    mechanism: "NNMT is overexpressed in many cancer types (ovarian, colorectal, gastric, breast, others). In some cancer contexts, NNMT appears to support cancer cell survival by buffering against oxidative stress. Theoretically, NNMT inhibition could harm cancer cell metabolism — potentially anti-cancer. But this is not established, and cancer cells have complex metabolic adaptations that make this prediction unreliable. Active cancer is a reason to avoid any experimental compound with an uncharacterized metabolic interaction with cancer biology.",
    management: [
      "Active cancer: do not use — the NNMT/cancer cell interaction is unexplored; any experimental metabolic perturbation during cancer treatment should be avoided without oncology guidance",
      "Cancer history in remission: discuss with oncologist before use",
    ],
  },
  {
    id: "research-grade-quality",
    name: "Research chemical quality and identity concerns",
    tier: "watch",
    prevalence: "Structural risk — supply chain is less mature than for established peptides",
    mechanism: "5-Amino-1MQ is a small molecule quinolinium salt, not a peptide. Research chemical suppliers have variable synthesis and purification quality. Identity verification (confirming the product is actually 5-Amino-1MQ and not a structurally similar compound) requires NMR or LC-MS analysis. Dosing accuracy depends on accurate weighing from what may be a powder of uncertain purity. All of these quality factors are unregulated.",
    management: [
      "Use only suppliers with verifiable third-party CoA including NMR or LC-MS identity confirmation — HPLC purity alone does not confirm identity",
      "Accurate weighing is critical: milligram-scale doses require a calibrated milligram-precision scale",
      "Discard products with unusual color, odor, or consistency — novel quality signals in research chemicals can indicate degradation or wrong identity",
    ],
  },
  {
    id: "gi-effects",
    name: "GI effects — nausea and gut discomfort",
    tier: "low",
    prevalence: "Occasionally reported in community — typically dose-dependent",
    mechanism: "Some community users report GI discomfort, particularly at higher doses. Whether this is a direct effect of NNMT inhibition in GI tissue or a non-specific response is unknown. GI effects appear to be manageable with dose reduction.",
    management: [
      "Start at lower community dosing range and adjust based on tolerability",
      "Take with food if GI discomfort occurs",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const PLAYBOOK = [
  {
    heading: "Before starting: no safety data — establish a baseline",
    items: [
      "Liver function tests (ALT, AST, bilirubin, albumin): baseline before starting — NNMT's high liver expression makes hepatic monitoring prudent",
      "Basic metabolic panel: creatinine, glucose, electrolytes — general metabolic baseline given unknown effects",
      "Active cancer or cancer treatment: stop here; this is not an appropriate experimental compound in that context",
      "Liver disease, kidney disease: stop here; altered NNMT biology in diseased metabolic organs is not characterized",
    ],
  },
  {
    heading: "Start-low protocol for an unknown safety profile",
    items: [
      "Start at the low end of community dosing range — the absence of Phase 1 data means there is no validated 'safe' dose; starting low limits exposure while assessing tolerability",
      "Cycling rather than continuous use: community convention for this compound reflects appropriate caution given unknown long-term effects",
      "Monitor for: unusual fatigue, GI discomfort, mood changes, any signs of liver stress (jaundice, dark urine, right upper quadrant pain)",
    ],
  },
  {
    heading: "Ongoing monitoring",
    items: [
      "Liver function tests at 4-6 weeks of use and periodically thereafter",
      "Suspend use if any unexplained systemic symptoms develop — with no human safety data, attribution of new symptoms is difficult and erring toward stopping is appropriate",
    ],
  },
];

const RED_LINES = [
  "Active cancer or cancer treatment — NNMT's role in cancer cell metabolism is complex; do not use experimental NNMT inhibitors during cancer treatment without oncology guidance",
  "Active liver disease — NNMT's predominant hepatic expression makes liver disease a stop signal for this compound",
  "Jaundice, dark urine, or right upper quadrant pain — signs of potential hepatic stress; stop immediately and seek evaluation",
  "Pregnancy — no safety data; NAD+ and methylation pathway perturbations in pregnancy context are not characterized",
];

export default function FiveAmino1MQSafetyPanel() {
  return (
    <div className="reta-safety">

      {/* ── Context note ── */}
      <div className="reta-safety__context">
        5-Amino-1MQ has no published human safety data. The safety profile is fundamentally unknown — not merely incomplete. The decision to use this compound is a decision to be among the first humans to systematically evaluate its effects, without the safety monitoring framework that Phase 1 trials provide. The liver monitoring recommendation exists because the enzyme target (NNMT) is highly expressed in liver, not because liver toxicity has been documented.
      </div>

      {/* ── Side effects ── */}
      <div className="reta-safety__section-label">Side effects and risk profile</div>
      <div className="reta-safety__effects">
        {SIDE_EFFECTS.map((se) => {
          const st = TIER_STYLE[se.tier];
          return (
            <div
              key={se.id}
              className="reta-safety__effect"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-safety__effect-top">
                <div className="reta-safety__effect-name">{se.name}</div>
                <div className="reta-safety__effect-meta">
                  <span className="reta-safety__effect-prevalence">{se.prevalence}</span>
                  <span
                    className="reta-safety__effect-tier"
                    style={{ color: st.labelColor, borderColor: st.border }}
                  >
                    {st.label}
                  </span>
                </div>
              </div>
              <div className="reta-safety__effect-mechanism">{se.mechanism}</div>
              <ul className="reta-safety__effect-mgmt">
                {se.management.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* ── Playbook ── */}
      <div className="reta-safety__section-label">Safety playbook</div>
      <div className="reta-safety__playbook">
        {PLAYBOOK.map((block) => (
          <div key={block.heading} className="reta-safety__playbook-block">
            <div className="reta-safety__playbook-heading">{block.heading}</div>
            <ul className="reta-safety__playbook-list">
              {block.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Red lines ── */}
      <div className="reta-safety__redlines">
        <div className="reta-safety__redlines-heading">Stop signals — non-negotiable</div>
        <ul className="reta-safety__redlines-list">
          {RED_LINES.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
