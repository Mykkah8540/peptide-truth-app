/**
 * PramlintideEvidencePanel — calibrated evidence for Pramlintide.
 * Key frame: FDA-approved pharmaceutical with Phase 3 data is the baseline.
 * Weight management in non-diabetics and GLP-1 combination use are extrapolations.
 */

type Tier = "strong" | "moderate" | "none";

interface Signal {
  id: string;
  claim: string;
  tier: Tier;
  tierLabel: string;
  body: string;
  sources: string;
}

const SIGNALS: Signal[] = [
  {
    id: "postmeal-glucose-t1d",
    claim: "Pramlintide reduces post-meal glucose in type 1 diabetes",
    tier: "strong",
    tierLabel: "Strong — Phase 3 RCT data; FDA-approved indication",
    body: "Multiple Phase 3 RCTs in type 1 diabetes patients demonstrated that pramlintide as insulin adjunct significantly reduced post-meal glucose excursions compared to insulin alone. The mechanism is clear: gastric emptying delay and post-meal glucagon suppression reduce the rate and magnitude of glucose rise after meals. HbA1c reductions of approximately 0.4% were achieved. These are large, well-controlled trials (n=600-900 per trial) meeting pharmaceutical registration standards.",
    sources: "Weyer et al. 2001 (Diabetes Care); Ratner et al. 2002 (Diabetes Care); Marrero et al. 2003; FDA review of Symlin NDA",
  },
  {
    id: "postmeal-glucose-t2d",
    claim: "Pramlintide reduces post-meal glucose in insulin-using type 2 diabetes",
    tier: "strong",
    tierLabel: "Strong — Phase 3 RCT data; FDA-approved indication",
    body: "Phase 3 trials in insulin-treated type 2 diabetes patients showed consistent post-meal glucose reduction and HbA1c improvement with pramlintide adjunct therapy. Effects were similar in magnitude to type 1 data. The approved doses differ: 60-120 mcg for T2D vs. 15-60 mcg for T1D, reflecting different degrees of residual amylin secretion.",
    sources: "Hollander et al. 2003 (Diabetes Care); Riddle et al. 2004 (Diabetes Care); FDA Symlin prescribing information",
  },
  {
    id: "weight-loss-diabetic",
    claim: "Pramlintide produces modest weight loss in diabetic patients",
    tier: "strong",
    tierLabel: "Strong — consistent across trials; modest magnitude",
    body: "Across Phase 3 trials, pramlintide produced approximately 1-2 kg weight reduction over 26-52 weeks vs. no change or slight weight gain with insulin alone. The mechanism — reduced meal size from satiety signaling, reduced caloric intake — is real. The magnitude is modest relative to GLP-1 agonists. This effect is consistent and reproducible across trials.",
    sources: "Integrated Phase 3 data from Symlin NDA; Hollander 2003; Ratner 2002",
  },
  {
    id: "satiety-meal-size",
    claim: "Pramlintide reduces meal size and caloric intake",
    tier: "strong",
    tierLabel: "Strong — mechanistic and clinical data consistent",
    body: "Amylin receptor signaling in the hypothalamus and brainstem produces satiety and reduces meal size. Clinical trial data confirmed reduced caloric intake in pramlintide-treated patients. The satiety effect is a documented pharmacological action, not an incidental finding. Meal size reduction is the mechanism underlying both weight effects and improved post-meal glucose.",
    sources: "Chapman et al. amylin satiety studies; Hollander trial data on caloric intake; mechanistic amylin neuroscience literature",
  },
  {
    id: "weight-management-nondiabetic",
    claim: "Pramlintide produces clinically meaningful weight loss in non-diabetic obesity",
    tier: "moderate",
    tierLabel: "Moderate — limited data in non-diabetics; extrapolation from approved indication",
    body: "Small studies in obese non-diabetic subjects suggested pramlintide could reduce food intake and body weight. One Phase 2 trial in obese subjects showed ~3-4% body weight reduction with pramlintide alone. The community interest in pramlintide for weight management in non-diabetics is based on the amylin satiety mechanism and this limited data. The evidence base in non-diabetics is substantially thinner than in the approved diabetic indication.",
    sources: "Smith et al. 2007 (Obesity); pramlintide obesity Phase 2 data",
  },
  {
    id: "glp1-combination",
    claim: "Pramlintide + GLP-1 agonist combination produces greater weight loss than either alone",
    tier: "moderate",
    tierLabel: "Moderate — mechanistic rationale strong; limited human combination data",
    body: "The mechanistic rationale for pramlintide + GLP-1 combination is strong: complementary mechanisms (amylin: post-meal satiety + gastric slowing; GLP-1: pre-meal appetite + insulin secretion). The CagriSema concept (long-acting amylin analog + semaglutide) has Phase 3 data showing ~25% weight loss, validating the combination principle. For pramlintide specifically combined with semaglutide or other GLP-1s, the evidence is limited — extrapolated from the cagrilintide combination data and mechanism.",
    sources: "CagriSema SCALE STEP Phase 2 data (Novo Nordisk); mechanistic extrapolation from amylin/GLP-1 combination rationale",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function PramlintideEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Pramlintide has pharmaceutical-grade Phase 3 evidence for its approved indications — post-meal glucose reduction and modest weight loss in insulin-using diabetic patients. This is a meaningfully stronger evidence base than most compounds in the community peptide space. The extrapolations to non-diabetic weight management and GLP-1 combination use are mechanistically coherent but supported by thinner data.
      </div>
      <div className="reta-evidence__list">
        {SIGNALS.map((s) => {
          const st = TIER_STYLE[s.tier];
          return (
            <div
              key={s.id}
              className="reta-evidence__entry"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-evidence__entry-top">
                <div className="reta-evidence__entry-claim">{s.claim}</div>
                <div
                  className="reta-evidence__entry-tier"
                  style={{ color: st.labelColor, borderColor: st.border }}
                >
                  {s.tierLabel}
                </div>
              </div>
              <div className="reta-evidence__entry-body">{s.body}</div>
              <div className="reta-evidence__entry-sources">{s.sources}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
