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
    id: "teri-osteosarcoma",
    heading: "Osteosarcoma (black box warning) \u2014 cumulative 2-year lifetime limit",
    tier: "flag",
    body:
      "Teriparatide carries an FDA black box warning for osteosarcoma risk based on rat studies where high-dose, lifetime exposure produced dose-dependent osteosarcomas. The cumulative lifetime limit is 2 years (counted together with abaloparatide). Critically, post-marketing pharmacovigilance across millions of patient-years has not established a clear excess osteosarcoma incidence in humans, and a 15-year voluntary surveillance program (TERIPARATIDE OSTEOSARCOMA SURVEILLANCE STUDY) did not find a signal above background rates. The risk in humans remains unquantified but is considered low at approved doses and durations. The regulatory limit is precautionary.",
    context:
      "Do not exceed the 2-year cumulative lifetime limit. Teriparatide is contraindicated in patients at elevated baseline risk for osteosarcoma: Paget\u2019s disease of bone, unexplained alkaline phosphatase elevations, prior skeletal radiation, or open epiphyses. Skeletal metastases or primary bone malignancy are absolute contraindications.",
  },
  {
    id: "teri-hypercalcemia",
    heading: "Hypercalcemia",
    tier: "watch",
    body:
      "Teriparatide stimulates bone formation and also increases intestinal calcium absorption and renal calcium reabsorption \u2014 effects inherited from native PTH pharmacology. Mild, transient hypercalcemia is common (reported in approximately 11% of patients at the 20 mcg dose in trials). Severe or symptomatic hypercalcemia (fatigue, confusion, nausea, constipation, kidney stones) is less common but requires dose assessment. Pre-existing hypercalcemia or hypercalcemic disorders are contraindications.",
    context:
      "Serum calcium and 24-hour urinary calcium should be checked at baseline and periodically during treatment. If albumin-corrected calcium exceeds approximately 10.6 mg/dL persistently, or if symptomatic hypercalcemia occurs, contact your provider. Avoid high-dose vitamin D supplementation without monitoring during teriparatide use.",
  },
  {
    id: "teri-orthostatic-hypotension",
    heading: "Transient orthostatic hypotension (post-injection)",
    tier: "watch",
    body:
      "Orthostatic hypotension occurring within a few hours of injection was observed in clinical trials \u2014 particularly with early doses. The mechanism is not fully characterized but may involve PTH-mediated vasodilation. Patients may experience lightheadedness, dizziness, or palpitations when standing quickly after injection. This effect tends to diminish after the first few weeks of treatment. Injection site sitting or lying down for 15\u201330 minutes after initial doses is a recommended precaution.",
    context:
      "Administer teriparatide in a setting where the patient can sit or lie down for the first few doses. Caution patients to rise slowly after injection. This is especially relevant in the elderly, in patients on antihypertensives, or in those with autonomic neuropathy.",
  },
  {
    id: "teri-urolithiasis",
    heading: "Nephrolithiasis (kidney stones)",
    tier: "watch",
    body:
      "PTH increases urinary calcium excretion in some patients, which raises the theoretical risk of calcium-containing kidney stones. Clinical trial data showed urolithiasis in approximately 2.8% of teriparatide patients versus 1.4% of placebo in the primary RCT \u2014 a signal that did not reach statistical significance but warrants attention. Pre-existing nephrolithiasis is a relative contraindication; active nephrolithiasis is generally considered a contraindication.",
    context:
      "Baseline urinary calcium excretion should be assessed. Adequate hydration (2\u20133 liters/day) should be maintained. Patients with a prior history of calcium oxalate or calcium phosphate stones warrant closer monitoring or specialist input.",
  },
  {
    id: "teri-nausea-cramps",
    heading: "Nausea and leg cramps",
    tier: "low",
    body:
      "Nausea and leg cramps are among the most commonly reported side effects in teriparatide clinical trials and post-marketing experience. Both are generally mild and transient. Nausea tends to occur within a few hours of injection and often resolves after the first few weeks. Leg cramps may persist throughout treatment in some patients but are not a reason to discontinue in the absence of more serious symptoms.",
    context:
      "Nausea: administer injection in the evening if morning-dose nausea is problematic; mild antiemetics (ginger, over-the-counter options) may help during the initial weeks. Leg cramps: adequate hydration and magnesium intake may reduce frequency; consult provider if severe or affecting sleep.",
  },
  {
    id: "teri-bone-loss-on-stop",
    heading: "Rapid bone loss upon discontinuation without follow-on antiresorptive therapy",
    tier: "flag",
    body:
      "This is not a side effect in the traditional sense \u2014 it is the expected biology of a drug that stimulates active bone turnover. When teriparatide is stopped, the anabolic stimulus is removed and the bone remodeling cycle shifts toward resorption. Studies show that bone density gains are substantially lost within 12\u201318 months of stopping teriparatide if no antiresorptive follow-on is prescribed. Completing the teriparatide course without transitioning to a bisphosphonate or denosumab effectively reverses the treatment benefit.",
    context:
      "Transition to an antiresorptive agent (typically alendronate, zoledronic acid, or denosumab) should be planned and initiated shortly after the final teriparatide dose. Do not allow a treatment gap. This sequencing is a standard-of-care requirement, not an optional add-on.",
  },
  {
    id: "teri-paget",
    heading: "Paget\u2019s disease of bone (contraindication)",
    tier: "flag",
    body:
      "Teriparatide is contraindicated in patients with Paget\u2019s disease of bone because the disease involves dysregulated, high-turnover bone remodeling; adding an anabolic stimulus to this background carries a disproportionate theoretical risk of malignant transformation. Unexplained elevated alkaline phosphatase \u2014 a marker of Paget\u2019s and high bone turnover states \u2014 should be investigated before starting teriparatide.",
    context:
      "Baseline alkaline phosphatase and clinical assessment for Paget\u2019s features are part of pre-treatment evaluation. Do not initiate teriparatide if Paget\u2019s is active or suspected.",
  },
];

export default function TeriparatideSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Teriparatide is an FDA-approved pharmaceutical with a well-characterized safety profile built
        from decades of clinical use. The osteosarcoma black box warning and the post-discontinuation
        bone loss risk are the two clinically most important considerations. Routine monitoring of
        serum calcium, urinary calcium, and renal function is standard of care. The GI and
        orthostatic effects are largely transient.
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
