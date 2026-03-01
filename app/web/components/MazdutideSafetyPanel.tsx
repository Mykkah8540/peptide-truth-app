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
    id: "maz-gi",
    heading: "GI effects (nausea, vomiting)",
    tier: "watch",
    body:
      "Nausea, vomiting, and reduced appetite are expected \u2014 they are a class effect of GLP-1 receptor agonism that mazdutide shares with semaglutide and tirzepatide. The glucagon component may modestly amplify GI effects through its own motility actions. Phase 2/3 data report GI adverse events in roughly 20\u201335% of participants, consistent with the GLP-1 class profile.",
    context:
      "Typical GLP-1 class management applies: start low, titrate slowly, dose with food. Not a reason to stop unless severe or persistent.",
  },
  {
    id: "maz-glucose",
    heading: "Glucose dysregulation (dual receptor offset)",
    tier: "watch",
    body:
      "GLP-1R agonism lowers blood glucose; GCGR agonism raises it. Mazdutide\u2019s net glucose effect is modest improvement, but the dual receptor dynamic is pharmacologically distinct from pure GLP-1 agonists. Individuals on insulin or sulfonylureas face amplified hypoglycemia risk from the GLP-1 component; the glucagon component may blunt but not eliminate this risk.",
    context:
      "If using insulin or secretagogues concurrently, monitor glucose closely. The offset does not make mazdutide safe to combine with aggressive insulin regimens without adjustment.",
  },
  {
    id: "maz-thyroid",
    heading: "Thyroid C-cell concern (GLP-1 class warning)",
    tier: "watch",
    body:
      "GLP-1 receptor agonists carry a class warning for thyroid C-cell tumors (medullary thyroid carcinoma, MTC) based on rodent carcinogenicity data. No human signal has emerged across the GLP-1 class, but the warning applies to mazdutide as a GLP-1R agonist. Contraindicated in individuals with personal or family history of MTC or MEN2.",
    context:
      "Standard GLP-1 class contraindication. Not unique to mazdutide, not yet validated as a human clinical risk, but cannot be dismissed.",
  },
  {
    id: "maz-no-fda",
    heading: "No complete global safety dataset",
    tier: "low",
    body:
      "Because mazdutide is not FDA-approved and has no Western regulatory review, the post-market safety signal that emerges from large real-world exposure (millions of patients) does not exist. All available safety data are from controlled Chinese Phase 2/3 trials with limited duration and population breadth.",
    context:
      "This is a structural uncertainty, not a specific detected harm. It means unknown unknowns remain. Anyone accessing mazdutide outside clinical trial channels is accepting this uncertainty explicitly.",
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

export default function MazdutideSafetyPanel() {
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
