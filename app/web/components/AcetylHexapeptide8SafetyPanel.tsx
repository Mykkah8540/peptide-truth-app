type Tier = "flag" | "watch" | "low";

interface SafetyItem {
  id: string;
  heading: string;
  tier: Tier;
  body: string;
  context: string;
}

const SAFETY_ITEMS: SafetyItem[] = [
  {
    id: "topical-tolerability",
    heading: "Topical skin tolerability",
    tier: "low",
    body:
      "AH8 is generally well-tolerated as a topical cosmetic ingredient. Contact dermatitis, allergic reactions, and significant irritation are uncommon in published cosmetic studies. It is considered safe for use in cosmetic formulations under normal conditions of use.",
    context:
      "As with any cosmetic active, individuals with sensitive skin or known peptide sensitivities may experience mild irritation. A patch test is a reasonable precaution for first use, particularly in high-concentration serums (typically 5–10% AH8 in commercial formulations).",
  },
  {
    id: "systemic-safety",
    heading: "Systemic safety from topical application",
    tier: "low",
    body:
      "There are no systemic safety concerns attributable to topical AH8. Given the expected minimal transdermal absorption through intact skin at cosmetic application volumes, systemic exposure is not expected to be pharmacologically relevant.",
    context:
      "This safety profile applies strictly to topical cosmetic use. If AH8 were ever used by injection — which is not an established or validated route — this assessment would not apply and no safety data would exist to guide risk.",
  },
  {
    id: "injection-risk",
    heading: "Risk profile if used by injection (not a recognized use)",
    tier: "watch",
    body:
      "AH8 is not formulated, validated, or studied for injection use. Topical cosmetic grades are not sterile and would carry infection risk if injected. The pharmacological effects of injected AH8 at any dose are completely unstudied. This is included as a watch item because community discussions sometimes conflate cosmetic peptide ingredients with injectable peptide protocols.",
    context:
      "No injectable formulation of AH8 exists. No safety data exists for any non-topical route. Any injection use would be entirely experimental with zero human safety data.",
  },
  {
    id: "botox-confusion",
    heading: "Risk from &quot;topical Botox&quot; marketing confusion",
    tier: "watch",
    body:
      "The framing of AH8 as a substitute for botulinum toxin injections may lead some users to delay or forgo evidence-based treatments, or to have unrealistic outcome expectations. This is a downstream clinical risk from misleading marketing rather than a direct pharmacological hazard.",
    context:
      "Users considering AH8 for management of dynamic expression lines should understand it is a cosmetic ingredient with modest surface-level evidence, not a substitute for medical procedures. The distinction matters for treatment planning.",
  },
];

const TIER_STYLE: Record<
  Tier,
  { bg: string; border: string; label: string; labelColor: string }
> = {
  flag: {
    bg: "rgba(158,56,0,0.07)",
    border: "rgba(158,56,0,0.20)",
    label: "Stop signal",
    labelColor: "#9e3800",
  },
  watch: {
    bg: "rgba(124,82,0,0.06)",
    border: "rgba(124,82,0,0.17)",
    label: "Worth watching",
    labelColor: "#7c5200",
  },
  low: {
    bg: "rgba(21,100,58,0.05)",
    border: "rgba(21,100,58,0.13)",
    label: "Low concern",
    labelColor: "#155e38",
  },
};

export default function AcetylHexapeptide8SafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        AH8 has a favorable safety profile for its actual use case: topical cosmetic application.
        There are no systemic safety concerns from this route. The &quot;watch&quot; items here are not
        pharmacological hazards of the ingredient itself, but downstream risks from marketing
        confusion or misapplication outside its intended cosmetic use.
      </div>
      <div className="reta-safety__list">
        {SAFETY_ITEMS.map((item) => {
          const st = TIER_STYLE[item.tier];
          return (
            <div
              key={item.id}
              className="reta-safety__entry"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-safety__entry-top">
                <div className="reta-safety__entry-heading">{item.heading}</div>
                <div
                  className="reta-safety__entry-tier"
                  style={{ color: st.labelColor, borderColor: st.border }}
                >
                  {st.label}
                </div>
              </div>
              <div className="reta-safety__entry-body">{item.body}</div>
              <div className="reta-safety__entry-context">{item.context}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
