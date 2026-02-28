/**
 * IGF1LR3SafetyPanel — safety calibration for IGF-1 LR3.
 * Key frame: two hard stops (cancer, diabetes/significant insulin resistance)
 * and a hypoglycemia risk profile that is worse than regular IGF-1 due to
 * the extended half-life. This is a high-risk compound by community peptide standards.
 */

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
    id: "cancer",
    heading: "Any cancer history — IGF-1R is a validated oncological growth signal",
    tier: "flag",
    body: "IGF-1 receptor is overexpressed and drives growth in prostate, breast, colorectal, lung, and multiple other cancer types. Administering IGF-1 LR3 — a sustained IGF-1R activator — in someone with active or prior cancer is contraindicated. Unlike native IGF-1 (which is regulated by IGFBPs), LR3's IGFBP resistance means the receptor is activated continuously for 20-30 hours per injection. This is not an acceptable risk profile for anyone with cancer history.",
    context: "Any cancer history is a permanent hard stop for IGF-1 LR3. Age-appropriate cancer screening (PSA for males, breast screening, colorectal) before any initial use is mandatory, not optional. Positive screening results require oncology consultation before proceeding.",
  },
  {
    id: "diabetes-insulin-resistance",
    heading: "Diabetes and significant insulin resistance — additive glucose-lowering creates severe hypoglycemia risk",
    tier: "flag",
    body: "IGF-1 LR3 lowers blood glucose through GLUT4 translocation in skeletal muscle. In someone already on insulin or insulin secretagogues (sulfonylureas), the additive glucose-lowering effects can produce severe hypoglycemia that persists for hours due to LR3's extended half-life. Diabetes with medication is a hard stop. Pre-diabetes or significant insulin resistance (HOMA-IR >2.5) should be evaluated carefully before considering any IGF-1 compound.",
    context: "Fasting glucose and HbA1c are required baseline labs. Insulin-using diabetes is an absolute contraindication. Pre-diabetes warrants physician discussion before proceeding — the glucose-lowering risk is proportional to baseline metabolic status.",
  },
  {
    id: "hypoglycemia-protocol",
    heading: "Hypoglycemia protocol — extended half-life means risk persists for 12-24+ hours post-injection",
    tier: "flag",
    body: "The extended half-life of IGF-1 LR3 (~20-30 hours) creates a prolonged hypoglycemia risk window that extends far beyond the injection event itself. Unlike regular IGF-1 where the glucose-lowering effect resolves within 1-2 hours, IGF-1 LR3's glucose suppression persists into the evening, overnight, and the following day. Injecting in a fasted state is the highest-risk scenario. Community protocols require eating a carbohydrate-containing meal before or immediately after injection.",
    context: "Mandatory protocol: eat a full meal 20-30 minutes before injection; have fast-acting glucose on hand for the next 24 hours; do not inject when planning prolonged fasting, intense exercise, or alcohol consumption; never inject alone on first use. These are not preferences — they are safety requirements given the pharmacokinetics.",
  },
  {
    id: "acromegaly-effects",
    heading: "Acromegaly-like effects with prolonged high-dose use — joint and soft tissue changes",
    tier: "watch",
    body: "Sustained supraphysiological IGF-1R activation from repeated IGF-1 LR3 dosing can produce features resembling acromegaly: joint pain and swelling, soft tissue growth (including internal organs), coarsening of facial features, carpal tunnel syndrome. Acromegaly from endogenous GH excess is associated with increased cardiovascular mortality. Whether community IGF-1 LR3 doses produce acromegaly-equivalent IGF-1R stimulation is unknown, but the mechanism is the same.",
    context: "Joint pain, hand/feet swelling, jaw changes, or organ-related symptoms during IGF-1 LR3 use warrant stopping and medical evaluation. These are not minor side effects — they indicate sustained supraphysiological IGF-1R activation.",
  },
  {
    id: "product-quality",
    heading: "Product quality — no pharmaceutical standard; concentration errors directly affect hypoglycemia severity",
    tier: "watch",
    body: "IGF-1 LR3 has no pharmaceutical production standard — it is manufactured as a research reagent with variable quality control. Concentration errors (labeled 1 mg/mL, actual 2 mg/mL) directly translate to hypoglycemia severity. A 2× concentration error at an already-significant dose could produce severe, life-threatening hypoglycemia. Third-party CoA with mass spectrometry concentration verification is essential — not optional — for this compound.",
    context: "Do not use IGF-1 LR3 without a verified third-party CoA that includes both identity (mass spec) and concentration verification. The difference between 50 mcg and 100 mcg is the difference between manageable glucose lowering and an emergency room visit.",
  },
  {
    id: "cardiac",
    heading: "Cardiac effects — IGF-1 has cardiac growth effects at supraphysiological levels",
    tier: "low",
    body: "IGF-1 promotes cardiomyocyte growth. At physiological levels this is beneficial (cardiac development, hypertrophic response to exercise). At sustained supraphysiological levels, pathological cardiac hypertrophy similar to acromegaly may develop. Community doses and durations are likely below the threshold for significant cardiac structural change, but the mechanism exists for long-term high-dose use.",
    context: "Cardiac evaluation (echocardiogram) is advisable for any extended IGF-1 LR3 use at doses producing significant systemic IGF-1 elevation. Not a concern for short cycles at moderate doses in otherwise healthy individuals.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function IGF1LR3SafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        IGF-1 LR3 is among the higher-risk compounds in the community peptide space. Three stop signals: cancer history (validated oncological growth target), diabetes/significant insulin resistance (additive severe hypoglycemia), and the mandatory hypoglycemia protocol required by the extended half-life pharmacokinetics. This is not a compound where casual community use is appropriate — the risk profile requires genuine informed management.
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
