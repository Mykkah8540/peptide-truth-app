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
    id: "teri-vertebral-fracture",
    claim: "Teriparatide significantly reduces vertebral fracture risk in postmenopausal osteoporosis",
    tier: "strong",
    tierLabel: "Strong",
    body:
      "The landmark Neer et al. 2001 New England Journal of Medicine RCT randomized 1,637 postmenopausal women with prior vertebral fractures to teriparatide 20 mcg/day, 40 mcg/day, or placebo for a median of 19 months. The 20 mcg dose (the approved dose) reduced new vertebral fractures by approximately 65% and non-vertebral fractures by approximately 53% compared to placebo. This is one of the highest fracture reduction effect sizes reported in osteoporosis pharmacology. Post-marketing data across millions of patient-years have reinforced this signal.",
    sources:
      "Neer RM et al., N Engl J Med 2001;344:1434\u20131441; Black DM et al. (post-teriparatide studies); FDA prescribing information for Forteo.",
  },
  {
    id: "teri-bone-density",
    claim: "Teriparatide increases lumbar spine and hip bone mineral density",
    tier: "strong",
    tierLabel: "Strong",
    body:
      "Multiple RCTs and large prospective studies demonstrate consistent, clinically meaningful increases in lumbar spine BMD (typically 9\u201313% over 18\u201324 months) and smaller but significant increases at the femoral neck (2\u20133%). These gains exceed what is achievable with antiresorptive therapy alone and represent genuine new bone formation rather than suppression of remodeling. DXA confirmation of BMD gains is used in clinical practice to assess treatment response.",
    sources:
      "Neer et al. (2001); Body JJ et al., J Clin Endocrinol Metab 2002; Lindsay R et al., JAMA 2007.",
  },
  {
    id: "teri-anabolic-mechanism",
    claim: "Pulsatile PTH(1\u201334) stimulates osteoblast activity and new bone formation",
    tier: "strong",
    tierLabel: "Strong",
    body:
      "The mechanism of anabolic bone action via pulsatile PTH is well-characterized at the molecular and histological level. Intermittent PTH activates the PTH1R receptor on osteoblast precursors and mature osteoblasts, promoting cell proliferation, differentiation, and survival while transiently suppressing osteoclast activity. Bone biopsy data from clinical trials confirm increased osteoblast surface and new bone formation markers (P1NP elevation, BSAP). The distinction from continuous PTH exposure \u2014 which causes bone loss \u2014 is biochemically explained.",
    sources:
      "Jilka RL, Ann N Y Acad Sci 2007; Hodsman AB et al., Endocr Rev 2005; teriparatide histomorphometry substudies.",
  },
  {
    id: "teri-glucocorticoid",
    claim: "Teriparatide is effective in glucocorticoid-induced osteoporosis",
    tier: "moderate",
    tierLabel: "Moderate",
    body:
      "The Saag et al. (2007) trial directly compared teriparatide to alendronate in patients with glucocorticoid-induced osteoporosis (GIO). Teriparatide produced greater gains in lumbar spine BMD and fewer new vertebral fractures at 18 months. GIO is a specific clinical context where bone loss is driven partly by direct osteoblast suppression from glucocorticoids \u2014 making an anabolic agent particularly well-suited. Teriparatide is FDA-approved for this indication. Effect sizes in GIO are consistent with the general osteoporosis data, though the trial sample was smaller.",
    sources:
      "Saag KG et al., N Engl J Med 2007;357:2028\u20132039; FDA approval for GIO indication.",
  },
  {
    id: "teri-male-osteoporosis",
    claim: "Teriparatide is effective in osteoporosis in men",
    tier: "moderate",
    tierLabel: "Moderate",
    body:
      "Orwoll et al. (2003) conducted a randomized trial in men with osteoporosis showing significant BMD increases with teriparatide. FDA approval for male osteoporosis was granted. The dataset is smaller than the postmenopausal osteoporosis evidence base, and dedicated fracture endpoint power is lower. The mechanistic rationale is identical to women\u2019s data. Moderate rather than strong reflects the thinner dataset, not any contradiction in the evidence.",
    sources:
      "Orwoll ES et al., J Bone Miner Res 2003;18:9\u201317; FDA Forteo prescribing information.",
  },
  {
    id: "teri-muscle-performance",
    claim: "Teriparatide improves muscle strength or physical performance",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "Some online wellness communities discuss teriparatide in the context of muscle-building or recovery from musculoskeletal injury \u2014 sometimes citing PTH receptor expression in muscle tissue. The clinical trial evidence does not support any meaningful benefit on muscle mass, strength, or physical performance as a primary or secondary outcome. Teriparatide is bone-targeted; its use for off-label athletic or body composition purposes has no evidentiary foundation.",
    sources: "No published RCT data on muscle outcomes; off-label athletic use is undocumented.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong: {
    bg: "rgba(21,100,58,0.05)",
    border: "rgba(21,100,58,0.13)",
    label: "Strong",
    labelColor: "#155e38",
  },
  moderate: {
    bg: "rgba(124,82,0,0.06)",
    border: "rgba(124,82,0,0.17)",
    label: "Moderate",
    labelColor: "#7c5200",
  },
  none: {
    bg: "rgba(158,56,0,0.06)",
    border: "rgba(158,56,0,0.18)",
    label: "No evidence",
    labelColor: "#9e3800",
  },
};

export default function TeriparatideEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Teriparatide has one of the strongest evidence bases in osteoporosis pharmacology. The
        fracture reduction data from the Neer 2001 RCT are landmark results that have held up across
        decades of post-marketing use. The drug\u2019s anabolic mechanism is mechanistically validated at
        the cellular and histological level. Where evidence is moderate, it reflects smaller sample
        sizes in specific subpopulations, not contradictory findings.
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
