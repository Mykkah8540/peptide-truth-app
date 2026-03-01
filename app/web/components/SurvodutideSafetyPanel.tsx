type Tier = "flag" | "watch" | "low";

interface SafetyItem {
  id: string;
  heading: string;
  tier: Tier;
  body: string;
  context: string;
}

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
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

const ITEMS: SafetyItem[] = [
  {
    id: "survo-gi",
    heading: "Gastrointestinal side effects (nausea, vomiting, diarrhea)",
    tier: "watch",
    body:
      "GI adverse events are the most common side effects of survodutide, consistent with the class effect of GLP-1 receptor agonism and compounded by the glucagon receptor arm. Nausea was the most frequently reported adverse event in phase 2 trials, with rates exceeding those seen in GLP-1 monotherapy trials at equivalent dose steps. Dose-escalation protocols in the SYNCHRONIZE trials were specifically structured to manage GI tolerability. Vomiting and diarrhea occur less frequently but are clinically significant when persistent, particularly in the context of oral medication absorption.",
    context:
      "GI effects are largely transient and peak during dose escalation. Eating smaller meals, avoiding high-fat foods, and dose-escalation adherence all reduce severity. If vomiting is severe or persistent (more than 24\u201348 hours), hold the dose and contact your prescriber.",
  },
  {
    id: "survo-thyroid",
    heading: "Thyroid C-cell tumors (class warning)",
    tier: "flag",
    body:
      "GLP-1 receptor agonists carry a class-level black box warning for thyroid C-cell tumors based on rodent carcinogenicity studies. Whether this risk translates to humans has not been established, but the regulatory class warning stands and applies to survodutide as a GLP-1R agonist. Survodutide is contraindicated in patients with a personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia type 2 (MEN2) \u2014 consistent with the class.",
    context:
      "Screening for personal or family history of MTC or MEN2 is required before initiating any GLP-1 receptor agonist. Report any neck mass, dysphagia, hoarseness, or difficulty swallowing to your provider promptly.",
  },
  {
    id: "survo-pancreatitis",
    heading: "Pancreatitis",
    tier: "flag",
    body:
      "Acute pancreatitis is a class-level concern for GLP-1 receptor agonists. Cases have been reported in post-marketing data for approved GLP-1 agents. The causal relationship is not definitively established \u2014 obesity itself is a major pancreatitis risk factor \u2014 but the regulatory flag exists. Survodutide\u2019s glucagon component may add a separate consideration, as hyperglucagonemia has been implicated in exocrine pancreatic stress in some models.",
    context:
      "Stop survodutide immediately if you develop severe, persistent abdominal pain (especially radiating to the back), nausea, and vomiting that suggest pancreatitis. Do not restart without medical evaluation. History of pancreatitis is a relative contraindication.",
  },
  {
    id: "survo-hyperglycemia",
    heading: "Glucagon-mediated hyperglycemia",
    tier: "watch",
    body:
      "Glucagon receptor agonism stimulates hepatic glucose production via glycogenolysis and gluconeogenesis. In healthy subjects and in obesity without insulin deficiency, the concurrent GLP-1-mediated insulin augmentation offsets this effect, and net hyperglycemia is generally not observed at therapeutic doses. However, in patients with type 2 diabetes on insulin or sulfonylureas, or with impaired insulin reserve (e.g., long-standing T2DM), the glucagon arm can tip the balance toward hyperglycemia. This is a distinct safety dimension not shared by pure GLP-1 agonists.",
    context:
      "Glucose monitoring is especially important for patients with T2DM during survodutide initiation and dose escalation. Fasting glucose and HbA1c should be tracked. Adjust co-administered diabetes medications with prescriber guidance.",
  },
  {
    id: "survo-hypoglycemia",
    heading: "Hypoglycemia (with insulin or secretagogues)",
    tier: "watch",
    body:
      "Survodutide as monotherapy has a low hypoglycemia risk \u2014 it does not stimulate insulin release in a glucose-independent manner. However, when combined with insulin or insulin secretagogues (sulfonylureas, meglitinides), the GLP-1-mediated augmentation of insulin release adds to the background risk of hypoglycemia. This is a class effect of all GLP-1R agonists.",
    context:
      "Dose reduction of insulin or secretagogues is typically warranted upon initiating survodutide in patients with T2DM. Monitor blood glucose closely during the first 4\u20138 weeks. Ensure patients understand hypoglycemia recognition and management.",
  },
  {
    id: "survo-heart-rate",
    heading: "Elevated resting heart rate",
    tier: "watch",
    body:
      "GLP-1 receptor agonists as a class increase resting heart rate by approximately 2\u20135 bpm on average, through a direct cardiac effect. Glucagon independently increases heart rate and myocardial contractility. The combination in survodutide may produce a more pronounced chronotropic effect than pure GLP-1 agonists, though clinical trial data on heart rate changes are not yet fully published for the full dose range.",
    context:
      "Monitoring resting heart rate is advisable, especially in patients with pre-existing tachyarrhythmias, atrial fibrillation, or structural heart disease. Report sustained unexplained tachycardia to your provider.",
  },
  {
    id: "survo-investigational",
    heading: "Investigational compound \u2014 no long-term safety record",
    tier: "flag",
    body:
      "Survodutide has no FDA approval and no post-market surveillance data. The longest phase 2 exposure is approximately 46 weeks in controlled trial settings with careful monitoring and exclusion of high-risk populations. Long-term safety signals \u2014 including cardiovascular outcomes, oncologic risk, and effects of sustained dual receptor agonism \u2014 are unknown. Use outside of a clinical trial represents unsupervised self-experimentation with an unregistered compound.",
    context:
      "This is not a gray area: sourcing survodutide outside a clinical trial means obtaining an unregulated, unverified compound with no guaranteed purity, dose accuracy, or sterility. The risk-to-benefit calculus changes dramatically outside of trial conditions.",
  },
];

export default function SurvodutideSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Survodutide shares most of its safety concerns with the GLP-1 receptor agonist class \u2014 GI
        effects, thyroid warning, pancreatitis \u2014 with an added dimension from glucagon receptor
        agonism: potential hyperglycemia, more pronounced heart rate effects, and a more complex
        interaction profile in patients with T2DM. It is investigational, with no long-term safety
        data available outside clinical trials.
      </div>
      <div className="reta-safety__list">
        {ITEMS.map((item) => {
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
