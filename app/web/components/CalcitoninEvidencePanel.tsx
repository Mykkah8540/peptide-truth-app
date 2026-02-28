/**
 * CalcitoninEvidencePanel — calibrated evidence for Calcitonin.
 * Key frame: strong evidence for Paget's disease and acute hypercalcemia.
 * Moderate evidence for osteoporosis that was outweighed by a cancer signal —
 * leading to 2013 nasal spray withdrawal. No evidence for community enhancement use.
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
    id: "paget-disease",
    claim: "Calcitonin reduces bone turnover and relieves symptoms in Paget's disease",
    tier: "strong",
    tierLabel: "Strong — FDA-approved; well-established; decades of controlled evidence",
    body: "Paget's disease of bone is characterized by focal areas of accelerated, disorganized bone remodeling — osteoclast activity is the primary driver. Calcitonin's osteoclast-inhibiting mechanism is directly relevant. Multiple controlled studies and decades of clinical use have established that injectable calcitonin (salmon calcitonin 50-100 IU subcutaneous or IM, 3 times per week) reduces serum alkaline phosphatase (bone turnover marker) by 30-60% and improves bone pain in responsive patients. While bisphosphonates have become preferred for Paget's (more potent, longer duration of action, oral administration), calcitonin remains an FDA-approved option, particularly when bisphosphonates cannot be used.",
    sources: "Singer et al. 1980; multiple Paget's disease calcitonin trials; Meunier et al. comparative data vs bisphosphonates; FDA prescribing information for Miacalcin injection for Paget's disease",
  },
  {
    id: "hypercalcemia",
    claim: "Calcitonin rapidly lowers serum calcium in hypercalcemia of malignancy",
    tier: "strong",
    tierLabel: "Strong — FDA-approved; fastest onset calcium-lowering agent; well-established emergency use",
    body: "Hypercalcemia of malignancy is driven primarily by osteoclastic bone destruction from metastases or PTHrP-mediated osteoclast activation. IV and SC calcitonin is the fastest-acting pharmacological intervention for reducing serum calcium — effect begins within 2-4 hours, reaching nadir at 12-24 hours. In the acute management algorithm, calcitonin is used as a bridge therapy (for rapid initial calcium reduction) while IV bisphosphonates (zoledronic acid) or denosumab are administered to provide more durable calcium control (bisphosphonate effect takes 2-4 days). The combination of calcitonin for immediate effect + bisphosphonate for sustained effect is established clinical practice.",
    sources: "Bilezikian 1993 (NEJM — hypercalcemia of malignancy management); Mundy & Guise 1997; ASCO calcium lowering guidelines; FDA prescribing information for calcitonin hypercalcemia indication",
  },
  {
    id: "osteoclast-mechanism",
    claim: "Calcitonin inhibits osteoclast activity through the calcitonin receptor",
    tier: "strong",
    tierLabel: "Strong — mechanistic evidence well-established; receptor characterized; cell biology confirmed",
    body: "The calcitonin receptor (CALCR) is a class B GPCR highly expressed on osteoclasts. Receptor activation by calcitonin causes rapid (within minutes) retraction of the osteoclast ruffled border — the specialized membrane structure responsible for bone matrix acidification and resorption. cAMP signaling downstream of CALCR inhibits osteoclast motility, lysosomal acid secretion, and cathepsin K activity. These cellular effects are well-characterized in vitro and in vivo, providing a solid mechanistic basis for calcitonin's anti-resorptive activity. The mechanism is not disputed — only the clinical utility relative to alternatives.",
    sources: "Chambers et al. 1982 (original osteoclast calcitonin mechanism); Nicholson et al. 1986; calcitonin receptor signal transduction literature; CALCR structural studies",
  },
  {
    id: "osteoporosis-fracture",
    claim: "Calcitonin nasal spray reduces vertebral fracture risk in post-menopausal osteoporosis",
    tier: "moderate",
    tierLabel: "Moderate — fracture reduction evidence exists but is weaker than bisphosphonates; cancer signal led to withdrawal",
    body: "The PROOF study (Prevent Recurrence of Osteoporotic Fractures) — a large 5-year RCT — examined nasal calcitonin 200 IU/day vs placebo in post-menopausal women with osteoporosis. The 200 IU/day dose showed 36% reduction in vertebral fractures vs placebo at 5 years. However, the 100 IU and 400 IU dose groups did not show significant fracture reduction — a U-shaped dose-response that weakened confidence in the finding. Hip fracture reduction was not significantly demonstrated. The BMD improvement was modest (approximately 1-2% at lumbar spine vs placebo). Bisphosphonates show 47-70% vertebral fracture reduction and clear hip fracture data — the comparative picture strongly favors bisphosphonates.",
    sources: "Chesnut et al. 2000 (PROOF study — AJMR); Cranney et al. 2002 (Cochrane review osteoporosis calcitonin); Kanis et al. osteoporosis treatment comparison; FDA medical review of nasal spray data",
  },
  {
    id: "bone-pain",
    claim: "Calcitonin has analgesic effects in osteoporotic vertebral fracture pain",
    tier: "moderate",
    tierLabel: "Moderate — analgesic effect is real but mechanism unclear; not primarily an analgesic compound",
    body: "An interesting clinical observation across multiple studies is that calcitonin appears to have analgesic effects for acute vertebral fracture pain — separate from and faster than its anti-resorptive bone effects. Small controlled trials show significant pain reduction within days of calcitonin initiation after vertebral fractures. The mechanism is not fully characterized — central (opioid receptor interaction, spinal cord effects?) and peripheral mechanisms have been proposed. The analgesic effect is not robust enough to drive calcitonin use primarily as an analgesic, but it represents a pharmacological action beyond the osteoclast inhibition.",
    sources: "Pontiroli et al. 1994; multiple analgesic calcitonin studies in acute vertebral fracture; Pun et al. calcitonin pain data",
  },
  {
    id: "cancer-signal-osteoporosis",
    claim: "Calcitonin nasal spray is safe for long-term osteoporosis management",
    tier: "none",
    tierLabel: "Insufficient — 2013 FDA pooled analysis found higher malignancy rates in calcitonin-treated subjects",
    body: "The FDA's 2013 safety review pooled data from 21 randomized trials of calcitonin for osteoporosis. The analysis found a higher rate of malignancies in calcitonin-treated subjects (2.4% vs 1.9% in placebo) across diverse tumor types. The absolute excess risk was approximately 0.5% over the trial periods. No single cancer type predominated. The FDA advisory committee voted that the benefit-risk profile no longer supported the osteoporosis indication. The mechanistic basis for a cancer risk from calcitonin receptor activation is under investigation — CALCR is expressed in various tumor types and receptor activation could theoretically affect tumor biology. This is a documented regulatory safety finding, not a theoretical concern.",
    sources: "FDA Drug Safety Communication 2013 (calcitonin cancer signal); EMA 2012 review (similar finding); pooled analysis of 21 trials; Chesnut 2012 (re-analysis commentary)",
  },
  {
    id: "community-enhancement",
    claim: "Calcitonin improves bone density or athletic performance in healthy adults",
    tier: "none",
    tierLabel: "None — no evidence; cancer signal makes risk-benefit unfavorable for non-clinical use",
    body: "No clinical evidence exists for calcitonin producing meaningful bone density improvement in healthy adults without osteoporosis (normal bone remodeling is not a target), athletic performance enhancement, or recovery optimization. The anti-resorptive effect in normal physiology would primarily reduce bone remodeling — a process that is essential for bone repair and adaptation to mechanical load. Beyond the lack of efficacy evidence, the 2013 cancer signal creates an unfavorable risk-benefit for any non-medical use where the potential benefit is speculative.",
    sources: "No evidence base for community or enhancement use; cancer signal reference: FDA 2013 Safety Communication",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function CalcitoninEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Calcitonin&apos;s evidence story has a defined arc: strong evidence for Paget&apos;s disease and acute hypercalcemia (FDA-approved, well-established); moderate evidence for osteoporosis fracture reduction that was outweighed by a cancer signal in pooled trial data (2013 FDA withdrawal); and no evidence for community enhancement use. The osteoporosis withdrawal is the central regulatory fact that defines calcitonin&apos;s current clinical standing — it is a compound with real limitations in evidence-to-risk ratio for the indication it was most widely prescribed for.
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
