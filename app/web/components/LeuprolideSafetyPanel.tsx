/**
 * LeuprolideSafetyPanel — safety calibration for Leuprolide (Lupron).
 * Key frame: the adverse effect profile is the adverse effect profile of sex hormone
 * deprivation — real, clinically substantial, and well-characterized. The testosterone
 * flare at initiation is the most acute clinical risk in prostate cancer. Bone density
 * loss and cardiovascular risk accumulate with prolonged ADT duration.
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
    id: "testosterone-flare",
    heading: "Testosterone flare at initiation — acute prostate cancer disease progression risk",
    tier: "flag",
    body: "In the first 5-10 days after leuprolide injection, endogenous LH and testosterone transiently surge before receptor desensitization suppresses them. In men with advanced prostate cancer, this testosterone flare can acutely worsen disease — precipitating bone pain crises, spinal cord compression from metastases, and urinary obstruction. This is the most acutely dangerous aspect of leuprolide initiation. The flare is a predictable pharmacological consequence, not an idiosyncratic reaction.",
    context: "Standard clinical management: anti-androgen co-treatment (bicalutamide 50 mg/day, flutamide, or nilutamide) started 1-2 weeks before or at the time of first leuprolide injection, continued through the flare period (typically 4 weeks). In men with high metastatic burden or symptoms of impending spinal cord compression, the flare risk is sufficiently serious that an alternative approach (GnRH antagonist like degarelix, which does not cause flare, or surgical orchiectomy) should be considered. Never start leuprolide in prostate cancer without understanding and managing the flare.",
  },
  {
    id: "osteoporosis",
    heading: "Bone density loss — osteoporosis with prolonged sex hormone suppression",
    tier: "flag",
    body: "Sex hormones (testosterone and estrogen) are essential for bone mineral density maintenance. Leuprolide-induced sex hormone suppression causes predictable bone density loss — approximately 2-3% per year of lumbar spine bone mineral density during ADT in men. Fracture risk increases with duration of ADT. In women on leuprolide for endometriosis, similar bone density loss occurs with treatment duration over 6 months. This is a real, documented, dose-dependent adverse effect with measurable clinical consequences (vertebral and non-vertebral fracture risk).",
    context: "For prostate cancer ADT: baseline DEXA scan before starting, repeat every 1-2 years during therapy. Calcium (1200 mg/day) and vitamin D (800-1000 IU/day) supplementation as standard. Consider bisphosphonates (zoledronic acid, alendronate) or denosumab for men at high fracture risk or with established bone density loss. Weight-bearing exercise is protective. For endometriosis: duration limitation to 6 months for initial treatment; add-back hormone therapy (low-dose estrogen/progestogen) reduces bone loss without losing therapeutic effect on endometriosis.",
  },
  {
    id: "cardiovascular-risk",
    heading: "Cardiovascular risk — ADT increases risk of cardiac events, metabolic syndrome",
    tier: "watch",
    body: "Androgen deprivation therapy with GnRH agonists increases cardiovascular risk in men with prostate cancer. Population studies show increased rates of myocardial infarction, stroke, and sudden cardiac death with prolonged ADT. The mechanism involves testosterone-deprivation effects on lipid metabolism (increased LDL, decreased HDL), insulin resistance, body composition changes (fat mass increase, muscle mass decrease), and endothelial function impairment. The FDA added a label warning for increased cardiovascular risk with GnRH agonists in 2010. The absolute risk magnitude is debated but the signal is consistent across multiple large observational studies.",
    context: "Before starting: cardiovascular risk assessment (existing cardiac disease, hypertension, diabetes, smoking history). Baseline lipid panel, fasting glucose/HbA1c. Diet and exercise counseling before and during ADT. Men with high baseline cardiovascular risk or recent cardiac events warrant cardiology evaluation. The cardiovascular risk tradeoff is managed by oncologists — the cancer mortality benefit typically outweighs cardiovascular risk in advanced prostate cancer. For non-cancer indications, this risk must be weighed.",
  },
  {
    id: "metabolic-effects",
    heading: "Metabolic syndrome and insulin resistance — body composition changes with ADT",
    tier: "watch",
    body: "Testosterone deprivation causes predictable metabolic changes: increased fat mass (particularly visceral fat), decreased lean muscle mass, insulin resistance, dyslipidemia (unfavorable LDL/HDL ratio). These changes typically develop over months of ADT and contribute to the cardiovascular risk increase. Weight gain of 2-4 kg is common during the first year of ADT. Men with pre-existing metabolic syndrome or type 2 diabetes may experience worsening glycemic control during leuprolide treatment.",
    context: "Resistance exercise training has the best evidence for mitigating ADT-associated muscle loss and metabolic effects — multiple RCTs show preservation of muscle mass, improved insulin sensitivity, and reduced fatigue with structured exercise programs during ADT. For men with diabetes: HbA1c monitoring every 3 months during ADT; dose adjustments of antidiabetic medications may be needed. Low-glycemic diet and caloric management support metabolic health during sex hormone suppression.",
  },
  {
    id: "hot-flashes",
    heading: "Hot flashes — most common adverse effect; 50-80% of men and women on ADT",
    tier: "watch",
    body: "Vasomotor symptoms (hot flashes) are the most frequently reported adverse effect of leuprolide. In men on ADT for prostate cancer, 50-80% report hot flashes; many rate them as significantly bothersome. The mechanism parallels menopausal hot flashes — rapid decline in sex hormone levels disrupts hypothalamic thermoregulation. Episodes can occur multiple times daily, disrupt sleep, and significantly affect quality of life. Hot flashes typically begin within weeks of ADT initiation and persist throughout treatment.",
    context: "Behavioral: layering, cool environments, avoidance of triggers (spicy food, alcohol, caffeine). Pharmacological options with evidence: venlafaxine 75 mg/day (most studied in men with ADT); gabapentin (effective but sedation); low-dose medroxyprogesterone or megestrol acetate (effective but theoretical cancer concerns limit use in hormone-sensitive cancer). Acupuncture has reasonable evidence in this population. Cyproterone (not available in US) is highly effective in Europe. For non-cancer uses (endometriosis): add-back therapy significantly reduces hot flash frequency.",
  },
  {
    id: "depression-cognition",
    heading: "Mood and cognitive effects — depression and cognitive changes with sex hormone suppression",
    tier: "watch",
    body: "Testosterone plays roles in mood regulation and cognitive function in men. Leuprolide-induced testosterone suppression has been associated with depressive symptoms, emotional lability, and self-reported cognitive impairment ('chemo brain' equivalent) in multiple observational studies. Controlled data are mixed — some studies show significant cognitive and mood effects, others show minimal impairment. The effects may be more pronounced in men with pre-existing mood disorders or cognitive vulnerability.",
    context: "Baseline depression screening (PHQ-9) before starting ADT. Monitoring for depressive symptoms during treatment. For men with pre-existing depression or anxiety: psychiatric co-management during ADT. Exercise has evidence for mood benefit during ADT. The reversibility of cognitive effects after testosterone recovery is uncertain — some studies suggest partial recovery, others suggest lasting effects with prolonged suppression.",
  },
  {
    id: "depot-irreversibility",
    heading: "Depot formulation irreversibility — committed to months of hormone suppression per injection",
    tier: "watch",
    body: "Unlike daily-injected peptides that can be stopped, leuprolide depot commits the patient to 1, 3, 4, or 6 months of hormone suppression per injection. Once injected, the depot cannot be removed or deactivated. If adverse effects emerge or circumstances change, the suppression continues until the depot is exhausted. This irreversibility is a fundamental pharmacokinetic consideration that distinguishes leuprolide from shorter-acting interventions.",
    context: "Clinical implication: leuprolide requires deliberate decision-making and physician oversight before injection. For community use, this irreversibility makes any self-administration particularly ill-advised — being locked into months of chemical castration based on a community protocol is a serious clinical risk. In prostate cancer management, the long depot interval is a feature (adherence); in other contexts, shorter-acting alternatives or GnRH antagonists (monthly injections, more reversible in practice) may be preferable.",
  },
  {
    id: "injection-site",
    heading: "Injection site — depot formulation tolerability",
    tier: "low",
    body: "Leuprolide depot is administered as a deep subcutaneous or intramuscular injection. Injection site reactions (pain, induration, local inflammation) are common but generally mild and resolve within days. The depot formulation involves a polymer microsphere matrix — the injection technique is more complex than standard subcutaneous peptide injection and typically requires healthcare provider administration.",
    context: "Standard injection site care applies. Rotate injection sites. The depot formulation should be administered by a healthcare provider due to the complex reconstitution and injection technique required for the polymer microsphere preparation.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function LeuprolideSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Leuprolide&apos;s safety profile is the safety profile of medically induced sex hormone deprivation — real, well-characterized, and clinically substantial. The testosterone flare at initiation is the most acute risk in prostate cancer (anti-androgen cover is required). Bone density loss and cardiovascular risk accumulate with ADT duration and require active monitoring and management. Hot flashes affect the majority of patients. The depot formulation&apos;s irreversibility is a fundamental consideration — once injected, hormone suppression continues for months regardless of adverse effects. Physician oversight is not optional for this compound.
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
