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
    id: "maz-weight",
    claim: "Weight loss in Phase 2/3 trials",
    tier: "moderate",
    tierLabel: "Moderate",
    body:
      "Phase 2 and Phase 3 data from Chinese regulatory trials show approximately 10\u201313% body weight reduction at 24 weeks. These are real, clinically meaningful numbers \u2014 but the trials are conducted entirely within China, use Chinese regulatory endpoints, and have not been published in major Western peer-reviewed journals with full data transparency. The international generalizability is genuinely uncertain.",
    sources: "Innovent Biologics Phase 2/3 trial data; Chinese NDA submission (2023\u20132024).",
  },
  {
    id: "maz-liver",
    claim: "Liver fat reduction (NAFLD/MASH benefit)",
    tier: "moderate",
    tierLabel: "Moderate",
    body:
      "Mazdutide\u2019s glucagon receptor component drives hepatic fat oxidation directly \u2014 this is the mechanistic basis for NAFLD benefit beyond what GLP-1 alone provides. Phase 2 data show meaningful MRI-PDFF reductions in liver fat. This is a genuine differentiator from GLP-1-only agents, but the evidence base is still pre-approval-stage and limited to the Chinese trial population.",
    sources: "IBI362 Phase 2 NAFLD substudy data (Innovent); GCGR mechanism literature.",
  },
  {
    id: "maz-mechanism",
    claim: "GLP-1/GCGR dual agonism mechanism",
    tier: "moderate",
    tierLabel: "Moderate",
    body:
      "The mechanistic rationale for GLP-1/glucagon co-agonism is well-supported by basic science and animal models: GLP-1R agonism suppresses appetite and stimulates insulin; GCGR agonism increases hepatic fat oxidation and energy expenditure. The glucose effects partially offset (GLP-1 lowers glucose, glucagon raises it \u2014 net effect is modest glucose improvement). This mechanism is shared by several pipeline agents, validating the class concept even as individual drug outcomes vary.",
    sources:
      "Day et al., Nature Chemical Biology (2009); Pocai et al., Diabetes (2009); Coskun et al., JCI (2008).",
  },
  {
    id: "maz-fda",
    claim: "FDA-approved use",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "Mazdutide has no FDA approval, no IND pathway announced in the US, and no global regulatory approval outside China\u2019s NMPA. There is no legitimate route to obtain it in the United States. Any \u201cresearch peptide\u201d sold under this name is unregulated and not pharmaceutical-grade.",
    sources: "FDA Orange Book; clinicaltrials.gov (no US IND as of 2025).",
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

export default function MazdutideEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Mazdutide\u2019s evidence base is real but geographically narrow \u2014 all meaningful
        trial data comes from China\u2019s regulatory process. The mechanistic rationale for
        GLP-1/glucagon co-agonism is solid; the clinical outcome data is promising but not yet
        globally validated.
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
