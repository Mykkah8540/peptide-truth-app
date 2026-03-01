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
    id: "hypotension",
    heading: "Symptomatic hypotension \u2014 most common adverse effect of nesiritide",
    tier: "watch",
    body:
      "Nesiritide produces potent vasodilation by raising cGMP in vascular smooth muscle. Symptomatic " +
      "hypotension (systolic BP drop \u226520 mmHg with symptoms) occurred in approximately 4% of patients " +
      "in the ASCEND-HF trial \u2014 roughly double the placebo rate. Hypotension can be prolonged given " +
      "nesiritide\u2019s 18-minute half-life, and may limit dosing. Patients with low baseline blood pressure " +
      "or those on multiple vasodilators are at highest risk.",
    context:
      "Nesiritide is administered IV in monitored hospital settings precisely because of this risk. " +
      "Blood pressure monitoring is required throughout infusion. If you are receiving nesiritide, " +
      "notify your care team immediately if you feel lightheaded, dizzy, or faint.",
  },
  {
    id: "renal",
    heading: "Renal function worsening \u2014 raised by ASCEND-HF and meta-analysis",
    tier: "watch",
    body:
      "A 2005 meta-analysis (Sackner-Bernstein et al., JAMA) suggested nesiritide increased the risk " +
      "of worsening renal function and 30-day mortality. While ASCEND-HF (2011) did not confirm a " +
      "statistically significant renal signal, it also did not fully resolve the concern. " +
      "Nesiritide-induced hypotension can reduce renal perfusion, and ADHF patients often have " +
      "baseline renal impairment. Creatinine and urine output monitoring is standard practice.",
    context:
      "If you or a family member is receiving nesiritide in the hospital, renal function labs (creatinine, " +
      "BUN) should be monitored. This is standard of care in ADHF management. Discuss with your " +
      "cardiologist whether the vasodilatory benefit outweighs renal risk in your specific case.",
  },
  {
    id: "biomarker-safety",
    heading: "BNP as a biomarker \u2014 no safety concern from measurement",
    tier: "low",
    body:
      "Measuring BNP or NT-proBNP is a standard blood draw. There is no safety concern associated " +
      "with the test itself. Interpretation context matters: BNP can be elevated by obesity, renal " +
      "failure, pulmonary hypertension, and other non-heart-failure causes, so values must be " +
      "interpreted in clinical context rather than in isolation.",
    context:
      "A high BNP is a signal to investigate, not a diagnosis on its own. Age, kidney function, " +
      "and body weight all influence BNP levels. NT-proBNP uses different cutoffs by age. " +
      "Your clinician will interpret the result in context of your full clinical picture.",
  },
];

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

export default function BrainNatriureticPeptideSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Safety considerations here apply to nesiritide (recombinant BNP) as a clinical therapeutic agent.
        BNP as a diagnostic biomarker carries no safety concern. There is no community-use safety dimension.
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
