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
    id: "mot-gi",
    heading: "GI cramping and diarrhea",
    tier: "watch",
    body:
      "Motilin receptor agonism accelerates GI motility \u2014 that is the mechanism. The expected consequence is GI cramping, urgency, and diarrhea, particularly at higher doses or with rapid dose escalation. Erythromycin at prokinetic doses routinely causes these effects. Exogenous motilin peptide, if it reached the receptor, would produce the same. These effects are dose-dependent and pharmacologically predictable.",
    context:
      "Start at the lowest possible dose if experimenting with any MLNR agonist. Avoid use before situations requiring reliable GI control. Stay hydrated. GI cramping resolves with dose reduction or discontinuation.",
  },
  {
    id: "mot-no-peptide",
    heading: "No direct safety concern from the peptide itself",
    tier: "low",
    body:
      "There is no therapeutic use of exogenous motilin peptide \u2014 meaning there is also no accumulated human adverse event data. The peptide itself is rapidly degraded and would not be expected to produce systemic toxicity at the levels achievable via subcutaneous injection. The absence of safety data is not safety assurance; it reflects the absence of research, not the absence of risk.",
    context:
      "The main concern with research peptide motilin is not a specific known toxicity \u2014 it is the unknown unknowns from a completely untested exogenous use case, combined with the low plausibility of benefit.",
  },
  {
    id: "mot-erythromycin",
    heading: "Erythromycin prokinetic use \u2014 QT prolongation",
    tier: "low",
    body:
      "This safety entry is about erythromycin as a motilin receptor agonist, not about motilin itself. Erythromycin at therapeutic antibiotic doses can prolong the QT interval and increase arrhythmia risk \u2014 this is an antibiotic side effect, not a motilin receptor effect. Low-dose erythromycin used for prokinetic purposes carries lower QT risk than full antibiotic dosing, but the distinction matters clinically.",
    context:
      "If erythromycin is being used for gastroparesis management, cardiology or prescribing physician awareness is important for QT monitoring, particularly with baseline QT prolongation or concurrent QT-prolonging drugs.",
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

export default function MotilinSafetyPanel() {
  return (
    <div className="reta-safety">
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
