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
    id: "amylin-fibrillation",
    heading: "Amylin fibrillation / IAPP amyloid deposition",
    tier: "flag",
    body:
      "Human amylin (IAPP) spontaneously self-aggregates into amyloid fibrils under physiological temperature and pH. Injection of unformulated human amylin would risk amyloid deposition at the injection site and potentially systemic exposure to oligomeric species that are cytotoxic. This is not a theoretical concern: IAPP amyloid is a well-characterized pathological feature of T2DM pancreata and the mechanism of beta cell toxicity.",
    context:
      "Pramlintide avoids this risk via proline substitutions at positions 25, 28, and 29 that disrupt fibril formation. Any non-pramlintide amylin sourced from research suppliers carries this risk regardless of stated purity. There is no safe community protocol for human amylin injection.",
  },
  {
    id: "amylin-hypoglycemia",
    heading: "Hypoglycemia with insulin co-administration",
    tier: "flag",
    body:
      "Pramlintide slows gastric emptying, reducing the speed of carbohydrate absorption after meals. When taken with full prandial insulin doses calibrated to rapid glucose entry, the mismatch produces hypoglycemia. The FDA label requires a 50% reduction in prandial insulin at pramlintide initiation with subsequent titration.",
    context:
      "This is the most clinically significant safety event in pramlintide trials. Hypoglycemic episodes are most common in the first 4 weeks. Patients must be able to recognize and treat hypoglycemia and should not use pramlintide if hypoglycemia unawareness is present.",
  },
  {
    id: "amylin-nausea",
    heading: "Nausea and vomiting",
    tier: "watch",
    body:
      "Amylin receptor activation in the area postrema produces nausea as an on-target pharmacological effect. In pramlintide trials, nausea occurred in 28&ndash;48% of patients, with vomiting in 10&ndash;17%. The effect is dose-dependent and typically improves over 4&ndash;8 weeks of continued use.",
    context:
      "Dose titration protocols (starting at 15 mcg and escalating to 30&ndash;60 mcg over weeks) substantially reduce the incidence and severity of nausea. Abrupt initiation at full doses substantially increases dropout from nausea.",
  },
  {
    id: "amylin-gastric-emptying",
    heading: "Slowed gastric emptying and insulin timing",
    tier: "watch",
    body:
      "Pramlintide delays gastric emptying, which shifts the postprandial glucose peak later. Patients using rapid-acting insulin (lispro, aspart, glulisine) must adjust injection timing relative to meals to avoid early hypoglycemia followed by late hyperglycemia.",
    context:
      "Some clinicians recommend injecting rapid-acting insulin after the meal rather than before when initiating pramlintide. Continuous glucose monitoring (CGM) is strongly recommended during the adjustment period to identify the individual&apos;s glycemic pattern.",
  },
  {
    id: "amylin-weight-loss",
    heading: "Weight loss (pharmacological effect)",
    tier: "low",
    body:
      "Pramlintide produces modest but consistent weight loss (1&ndash;1.5 kg over 26 weeks in RCTs) via reduced caloric intake and delayed gastric emptying. This is generally considered a beneficial effect in most patients with T1DM and T2DM who are often overweight.",
    context:
      "In underweight patients or those with eating disorders, weight loss warrants monitoring. The magnitude is modest compared to GLP-1 agonists but additive when combined with GLP-1 therapy.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function AmylinSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        The most serious safety concern with amylin pharmacology is the fibrillation risk of
        unformulated human amylin &mdash; a categorical reason to avoid non-pramlintide sources.
        With pramlintide specifically, hypoglycemia from insulin mismatch is the dominant clinical
        risk, managed by mandatory insulin dose reduction at initiation.
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
