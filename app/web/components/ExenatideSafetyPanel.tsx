/**
 * ExenatideSafetyPanel — safety calibration for Exenatide (Byetta / Bydureon).
 * Key frame: 20-year post-marketing record; well-characterized safety profile;
 * class contraindications apply (pancreatitis, thyroid C-cell, MEN2);
 * hypoglycemia risk is medication-combination-dependent, not intrinsic.
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
    id: "pancreatitis",
    heading: "Prior pancreatitis or active pancreatic disease — class contraindication",
    tier: "flag",
    body: "GLP-1 receptor agonists as a class carry an FDA black box warning regarding pancreatitis risk. A post-marketing signal emerged for exenatide in 2007, leading to labeling updates. The absolute risk of pancreatitis in clinical trials is low and causality has been debated — T2D itself elevates pancreatitis risk. However, the standard clinical guidance is to contraindicate GLP-1 agonists in patients with a history of acute or chronic pancreatitis. The mechanistic basis (GLP-1R expression on pancreatic acinar cells, potential trophic effects) provides biological plausibility even if epidemiological causality is not definitively established.",
    context: "Any history of pancreatitis — acute or chronic — is a contraindication to exenatide. This is a class effect. If pancreatitis occurs while on exenatide, discontinue immediately and do not rechallenge. Report to prescribing physician. Do not use in patients with hypertriglyceridemia that is severe enough to cause pancreatitis risk.",
  },
  {
    id: "thyroid-men2",
    heading: "Medullary thyroid carcinoma history or MEN2 — class contraindication",
    tier: "flag",
    body: "GLP-1 receptor agonists carry an FDA class-wide contraindication for personal or family history of medullary thyroid carcinoma (MTC) or Multiple Endocrine Neoplasia type 2 (MEN2). In rodent studies, GLP-1R agonists caused dose-dependent and duration-dependent thyroid C-cell hyperplasia and MTC. The human relevance of the rodent thyroid C-cell signal is debated — human thyroid C-cells express fewer GLP-1 receptors than rodents — but the regulatory standard is to contraindicate use in patients with known MTC/MEN2 risk. This is a precautionary contraindication shared across all GLP-1 receptor agonists.",
    context: "Screen for personal or family history of medullary thyroid carcinoma or MEN2 before prescribing any GLP-1 agonist. If either is present, exenatide (and all other GLP-1 agonists) is contraindicated. Patients should be counseled to report any thyroid nodules, neck swelling, or dysphagia that develops during treatment.",
  },
  {
    id: "hypoglycemia",
    heading: "Hypoglycemia when combined with insulin or sulfonylureas — not intrinsic to exenatide alone",
    tier: "flag",
    body: "Exenatide in isolation has minimal hypoglycemia risk — the glucose-dependent mechanism of GLP-1R agonism means insulin secretion is activated only when blood glucose is elevated; the mechanism auto-corrects as glucose normalizes. However, when exenatide is combined with insulin or insulin secretagogues (sulfonylureas: glipizide, glyburide, glimepiride), the additive insulin-promoting effects can cause clinically significant hypoglycemia. In the AMIGO trials, hypoglycemia episodes were concentrated in the sulfonylurea co-treatment subgroups. This is a combination-dependent, not intrinsic, risk.",
    context: "If starting exenatide in a patient already on a sulfonylurea: consider reducing sulfonylurea dose by 50% at initiation. If starting exenatide in a patient on insulin: discuss insulin dose reduction protocol with the prescribing physician before initiating. Monitor blood glucose more frequently in the first 4 weeks of combined therapy. Have a plan for hypoglycemia management (fast-acting glucose source).",
  },
  {
    id: "kidney",
    heading: "Acute kidney injury — volume depletion from GI side effects, especially in CKD",
    tier: "watch",
    body: "Post-marketing reports identified acute kidney injury with exenatide, predominantly in the context of severe GI side effects (nausea, vomiting, diarrhea) causing dehydration and volume depletion. The kidney injury appears to be secondary — volume depletion reduces renal perfusion, which can cause pre-renal azotemia or acute tubular injury in patients with pre-existing renal impairment. Exenatide is also renally cleared, so patients with CKD have higher exenatide exposure. Bydureon labeling recommends caution in patients with eGFR 30-50 mL/min/1.73m² and avoidance in patients with eGFR <30.",
    context: "Patients with CKD Stage 3b or worse (eGFR <45): use with caution or consider alternative; exenatide clearance is reduced and GI side effects causing volume depletion are more dangerous with compromised renal reserve. All patients: maintain adequate hydration during the GI side effect phase of initiation. If significant vomiting or diarrhea occurs in the first weeks, monitor renal function and ensure adequate fluid intake.",
  },
  {
    id: "gi-side-effects",
    heading: "Nausea, vomiting, diarrhea — most common adverse effects; dose-dependent; usually improve",
    tier: "watch",
    body: "GI adverse effects are the most common reason for exenatide discontinuation. In the AMIGO trials, nausea occurred in 44% of patients on Byetta 10 mcg vs 18% on placebo; vomiting in 13% vs 4%. Byetta's twice-daily dosing produces peak-and-trough pharmacokinetics that drive higher rates of GI side effects compared to Bydureon's continuous release (nausea 26% with Bydureon vs 41% with Byetta in DURATION-1). Nausea is most severe in the first 4-8 weeks and decreases substantially over time as GLP-1R desensitization occurs in the gastrointestinal tract. Titrating from 5 mcg to 10 mcg after 4 weeks is the recommended approach for Byetta.",
    context: "Start Byetta at 5 mcg twice daily (morning and evening, at least 60 minutes before meals) and titrate to 10 mcg twice daily after 4 weeks if tolerated. Small, frequent meals; avoiding high-fat foods; and ensuring adequate hydration during the nausea phase improve tolerability. If nausea is severe or persistent beyond 8-10 weeks, switching to Bydureon (weekly) may improve tolerability. Persistent vomiting should prompt re-evaluation of the exenatide dose.",
  },
  {
    id: "injection-site-nodules",
    heading: "Injection site nodules — specific to Bydureon microsphere formulation",
    tier: "watch",
    body: "Bydureon uses a poly(lactic-co-glycolic acid) microsphere depot formulation that releases exenatide over 7 days. Injection site nodules (small, palpable lumps under the skin) occur in approximately 10-17% of patients using Bydureon — these are the residual microsphere polymer depot breaking down. The nodules are not harmful and resolve over several weeks, but they can be cosmetically bothersome and occasionally tender. Bydureon BCise (the auto-injector pen) has reduced but not eliminated this issue.",
    context: "Injection site rotation (abdomen, thigh, or upper arm — rotating between sites) reduces nodule frequency and tenderness. The nodules are the polymer microsphere depot — they resolve and do not indicate infection or adverse immune reaction. If a nodule is warm, red, or appears infected, evaluate for injection-site cellulitis (which is a standard subcutaneous injection complication, not Bydureon-specific).",
  },
  {
    id: "cardiovascular",
    heading: "Cardiovascular safety — EXSCEL: neutral; no harm, no benefit in high-risk T2D",
    tier: "low",
    body: "The EXSCEL cardiovascular outcomes trial enrolled 14,752 high-CV-risk T2D patients and showed a hazard ratio of 0.91 for MACE (non-significant superiority). Exenatide does not increase cardiovascular risk — it met non-inferiority in a rigorous outcomes trial. It also does not provide the significant CV risk reduction seen with semaglutide (SUSTAIN-6, SELECT). For patients whose primary concern is CV safety, exenatide is safe; for patients whose primary need is CV risk reduction, semaglutide is the superior GLP-1 choice.",
    context: "Exenatide does not pose cardiovascular risk based on EXSCEL data. Patients with established CV disease or high CV risk who are choosing among GLP-1 agonists should be aware that semaglutide has demonstrated significant CV benefit while exenatide has a neutral result — this may inform prescribing choice but does not mean exenatide is unsafe.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function ExenatideSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Exenatide has a 20-year post-marketing safety record — the longest of any GLP-1 agonist — and a well-characterized adverse effect profile. The hard contraindications are class-wide: pancreatitis history and MEN2/medullary thyroid carcinoma history. Hypoglycemia is a meaningful risk only when combined with insulin or sulfonylureas — not intrinsic to exenatide monotherapy. GI side effects are the most common reason for discontinuation and improve significantly over the first 8 weeks. Acute kidney injury is a secondary risk through GI-induced volume depletion, particularly relevant in patients with pre-existing CKD.
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
