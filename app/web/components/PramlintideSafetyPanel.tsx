/**
 * PramlintideSafetyPanel — safety calibration for Pramlintide.
 * Key frame: hypoglycemia with insulin is the primary safety issue and
 * requires mandatory dose adjustment. Gastroparesis is a contraindication.
 * The safety profile is pharmaceutical-grade known — not speculative.
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
    id: "hypoglycemia-insulin",
    heading: "Severe hypoglycemia with insulin — requires mandatory 50% insulin dose reduction at initiation",
    tier: "flag",
    body: "The most important safety issue with pramlintide is severe hypoglycemia when co-administered with insulin without appropriate dose adjustment. Pramlintide delays gastric emptying (slowing glucose absorption), suppresses post-meal glucagon (removing hypoglycemia counterregulation), and reduces food intake — all of which lower post-meal glucose and increase hypoglycemia risk when insulin doses remain unchanged. The FDA label requires reducing all rapid-acting insulin doses by 50% when starting pramlintide in type 1 diabetes.",
    context: "This is mandatory, not optional — the Phase 3 trials documented a 3-fold increase in severe hypoglycemia in type 1 diabetes patients who did not reduce insulin doses. If you are on insulin and starting pramlintide: reduce all rapid-acting insulin by 50% and reintroduce based on glucose monitoring. Do not self-initiate pramlintide + insulin without physician oversight.",
  },
  {
    id: "gastroparesis",
    heading: "Gastroparesis and significant gastric motility disorders — contraindicated",
    tier: "flag",
    body: "Pramlintide slows gastric emptying as part of its mechanism. In patients with gastroparesis (delayed gastric emptying from diabetic neuropathy or other causes), adding pramlintide compounds an already-impaired gastric function. This can cause severe nausea, vomiting, unpredictable glucose fluctuations, and complications from food remaining in the stomach. Gastroparesis is listed as a contraindication in the FDA label.",
    context: "If you have symptoms consistent with gastroparesis (early satiety, bloating, nausea after meals, food that feels like it stays in your stomach) discuss with your physician before starting pramlintide. Undiagnosed gastroparesis in diabetic patients is more common than often recognized.",
  },
  {
    id: "hypoglycemia-unawareness",
    heading: "Hypoglycemia unawareness — high-risk combination with pramlintide + insulin",
    tier: "flag",
    body: "Hypoglycemia unawareness (inability to recognize hypoglycemia symptoms due to blunted counterregulatory response) is particularly dangerous with pramlintide. Pramlintide's glucagon suppression reduces one of the main hyperglycemia counter-regulatory defenses. In type 1 diabetics with impaired counterregulation and hypoglycemia unawareness, the combination of insufficient insulin dose adjustment and blunted counterregulation creates high risk for severe unrecognized hypoglycemia.",
    context: "If you have documented hypoglycemia unawareness or recurrent severe hypoglycemia, pramlintide requires particularly careful management with physician oversight. CGM is strongly advisable in this context.",
  },
  {
    id: "nausea-gi",
    heading: "Nausea and GI side effects — common but typically transient",
    tier: "watch",
    body: "Nausea is the most common adverse effect of pramlintide, reported in 28-48% of patients in clinical trials. It is typically more severe in the first 4 weeks and then improves substantially. Vomiting, anorexia, and abdominal pain are also reported. The nausea relates to the gastric emptying delay mechanism. Dose titration (starting at lower doses) reduces the severity.",
    context: "Start at the lowest recommended dose and titrate up over weeks rather than starting at full dose. Eat smaller, lower-fat meals when initiating pramlintide — large or high-fat meals worsen nausea during gastric slowing. Nausea improving over 4-6 weeks is expected and should not prompt early discontinuation if glucose effects are beneficial.",
  },
  {
    id: "injection-site",
    heading: "Injection site — must not be mixed with insulin in the same syringe",
    tier: "watch",
    body: "Pramlintide must not be mixed with insulin in the same syringe — the combination alters both compounds' pharmacokinetics. It must be injected in a different body region from insulin at the same time. Pramlintide is injected before major meals (meals ≥250 kcal or containing ≥30g carbohydrates). The pre-meal timing is important for the gastric emptying effect to coincide with glucose absorption.",
    context: "Inject pramlintide in the abdomen or thigh — not in the same site as the meal-related insulin injection. Do not skip the meal after injecting pramlintide; the glucose-lowering effect is designed to match food intake.",
  },
  {
    id: "drug-interactions-gi",
    heading: "Drugs affecting gastric motility — pharmacokinetic interactions",
    tier: "low",
    body: "Pramlintide slows gastric emptying, which can delay the absorption of other oral medications. Drugs that require rapid absorption for effect (certain antibiotics, analgesics), drugs requiring precise timing of absorption (immunosuppressants), or other gastric motility agents may have altered pharmacokinetics when pramlintide is on board.",
    context: "Time-sensitive oral medications should be taken at least 1 hour before or 2 hours after pramlintide injection to avoid absorption delay. Discuss with pharmacist or physician if on medications with narrow therapeutic windows.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function PramlintideSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Pramlintide has a pharmaceutical-grade safety profile — known from large Phase 3 trials, not speculated. The primary safety issue is severe hypoglycemia with insulin, which requires mandatory 50% insulin dose reduction at initiation. Gastroparesis and hypoglycemia unawareness are contraindications. Nausea is common but transient. This is not a dangerous compound in absolute terms — it is a compound with a specific, manageable risk profile that requires appropriate clinical context.
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
