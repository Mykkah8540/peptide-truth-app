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
    id: "osteosarcoma",
    heading: "Osteosarcoma (black box warning)",
    tier: "flag",
    body:
      "Abaloparatide carries an FDA black box warning for osteosarcoma risk based on rat studies showing dose- and duration-dependent osteosarcoma development. This class effect is shared with teriparatide. The human risk is not established quantitatively, but the warning mandates a cumulative lifetime limit of 2 years across all PTH/PTHrP analogues (abaloparatide + teriparatide combined). Use is contraindicated in patients with prior osteosarcoma, bone metastases, unexplained elevated alkaline phosphatase, Paget disease, or prior external beam radiation to the skeleton.",
    context:
      "The rat osteosarcoma signal emerged at doses and durations that exceeded clinical use levels. Epidemiological surveillance has not confirmed elevated osteosarcoma rates in humans on teriparatide (the longer-used agent), but the black box warning stands given the severity of the potential harm.",
  },
  {
    id: "hypercalcemia",
    heading: "Hypercalcemia and hypercalciuria",
    tier: "flag",
    body:
      "PTH1R activation drives calcium mobilization from bone and increases renal calcium reabsorption and intestinal calcium absorption. Hypercalcemia was observed in ACTIVE trial participants. Serum calcium should be monitored, particularly in patients with pre-existing hypercalcemia, nephrolithiasis, or those taking active vitamin D analogues or thiazides.",
    context:
      "Hypercalcemia was more common with abaloparatide than teriparatide in the ACTIVE trial. Patients should generally avoid taking calcium supplements or active vitamin D within a few hours of injection to reduce peak calcium excursion.",
  },
  {
    id: "orthostatic-hypotension",
    heading: "Orthostatic hypotension",
    tier: "watch",
    body:
      "Transient orthostatic hypotension has been reported, particularly in the hours after injection. Patients should administer the injection in a sitting or lying position and remain seated for at least 30–60 minutes post-dose to minimize fall risk.",
    context:
      "Incidence was reported in clinical trials but was generally mild and transient. Elderly patients or those on antihypertensives warrant additional monitoring.",
  },
  {
    id: "injection-site",
    heading: "Injection site reactions",
    tier: "watch",
    body:
      "Erythema, edema, bruising, and pain at the injection site are among the most commonly reported adverse effects. These are local reactions and do not typically require discontinuation.",
    context:
      "Rotating injection sites (periumbilical abdomen) and proper injection technique reduce the frequency and severity of these reactions.",
  },
  {
    id: "nausea-dizziness",
    heading: "Nausea and dizziness",
    tier: "low",
    body:
      "Nausea and dizziness were reported more frequently than placebo in the ACTIVE trial. These are generally mild, transient, and more common in the initial weeks of therapy.",
    context:
      "These symptoms often improve as patients adapt to the medication. Taking the injection at bedtime is a common practical strategy to minimize daytime symptoms.",
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

export default function AbaloparatideSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Abaloparatide&apos;s most serious concern is the class-level osteosarcoma black box warning, which
        drives the 2-year cumulative lifetime limit shared with teriparatide. Hypercalcemia is a
        mechanism-based risk requiring monitoring. Other adverse effects are common but generally
        manageable with technique adjustments.
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
