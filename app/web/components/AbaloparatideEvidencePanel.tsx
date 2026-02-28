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
    id: "vertebral-fracture",
    claim: "Reduces vertebral fracture risk in postmenopausal osteoporosis",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "The ACTIVE trial (N=2,463, 18 months, NEJM 2016) demonstrated that abaloparatide reduced new morphometric vertebral fractures by 86% vs. placebo (0.58% vs. 4.22%, p<0.001). This was the primary endpoint of the pivotal RCT that supported FDA approval. Teriparatide also reduced vertebral fractures in the same trial.",
    sources: "Miller PD et al., NEJM 2016; FDA approval data 2017.",
  },
  {
    id: "pth1r-mechanism",
    claim: "PTH1R RG-conformation selectivity underlies anabolic bias",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "Abaloparatide preferentially stabilizes the RG conformation of PTH1R, producing shorter receptor occupancy and reduced cAMP signaling duration compared to teriparatide. This pharmacological distinction is well-characterized in receptor biochemistry and is proposed to underlie the anabolic-to-catabolic signaling balance. The mechanistic basis is robustly established; clinical translation of the distinction is supported but less definitively quantified.",
    sources:
      "Hattersley G et al., Endocrinology 2016; Bhatt P et al., JBMR 2020.",
  },
  {
    id: "nonvertebral-fracture",
    claim: "Reduces non-vertebral fracture risk vs. placebo",
    tier: "moderate",
    tierLabel: "Moderate evidence",
    body:
      "In the ACTIVE trial, abaloparatide reduced major non-vertebral fractures vs. placebo (2.7% vs. 4.7%, p=0.049). This endpoint reached statistical significance but the absolute risk reduction is modest and the trial was not primarily powered for this outcome. Confidence interval approaches the threshold of significance.",
    sources: "Miller PD et al., NEJM 2016 (supplementary data).",
  },
  {
    id: "sequential-therapy",
    claim: "Sequential abaloparatide then alendronate consolidates bone density gains",
    tier: "moderate",
    tierLabel: "Moderate evidence",
    body:
      "The ATOM extension study showed that transitioning from abaloparatide to alendronate for 24 months produced further increases in BMD at spine and hip. The evidence supports sequential therapy as standard practice, though direct fracture-endpoint data for the sequential phase are limited compared to the primary ACTIVE RCT.",
    sources:
      "Bone HG et al., J Clin Endocrinol Metab 2018 (ATOM extension).",
  },
  {
    id: "community-enhancement",
    claim: "Enhancement or bodybuilding benefit",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "There is no published evidence, case series, or pharmacological rationale for abaloparatide use in athletic performance, muscle building, or general wellness contexts. The compound acts specifically on bone via PTH1R and its approved use is strictly within osteoporosis management.",
    sources: "No relevant literature identified.",
  },
];

const TIER_STYLE: Record<
  Tier,
  { bg: string; border: string; label: string; labelColor: string }
> = {
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

export default function AbaloparatideEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Abaloparatide has a robust FDA-approval evidence base for osteoporosis fracture prevention.
        The pivotal ACTIVE RCT provides the strongest data. Evidence outside the approved indication
        — particularly any enhancement or off-label use — does not exist.
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
