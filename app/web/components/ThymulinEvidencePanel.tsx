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
    id: "thymulin-zinc-dependence",
    claim: "Thymulin biological activity requires zinc and is impaired by zinc deficiency",
    tier: "strong",
    tierLabel: "Strong",
    body:
      "The zinc-dependence of thymulin activity is one of the best-characterized aspects of thymic immunology. Biologically active thymulin exists as a zinc\u2013peptide complex (FTS-Zn). Studies in both animals and humans have demonstrated that zinc deficiency abolishes measurable thymulin activity in serum, and that zinc repletion in deficient individuals restores detectable thymulin bioactivity. This is mechanistically characterized at the structural level \u2014 zinc coordinates to specific residues in the nonapeptide and is required for receptor binding. The evidence for this relationship is robust, replicated, and not in dispute.",
    sources:
      "Dardenne M et al., Proc Natl Acad Sci USA 1982 (first characterization of zinc-thymulin relationship); Prasad AS (zinc and immunity reviews); Mocchegiani E et al. (thymulin-zinc in aging).",
  },
  {
    id: "thymulin-thymic-biology",
    claim: "Thymulin is a genuine thymic hormone that regulates T-cell maturation",
    tier: "strong",
    tierLabel: "Strong",
    body:
      "Thymulin\u2019s identity as a thymic epithelial cell product and its role in T-cell differentiation are established facts of immunology. Endogenous thymulin promotes the maturation of thymocytes into functional T-cell subsets, including acquisition of T-cell receptor expression and MHC restriction. Thymulin-deficient states (e.g., post-thymectomy models) show impaired T-cell repertoire development. These observations are mechanistically validated and form the basis of the rationale for exogenous thymulin research.",
    sources:
      "Bach JF, Dardenne M et al. (thymulin original characterization, 1972\u20131985); Savino W et al. (thymic hormones and T-cell development review, multiple publications).",
  },
  {
    id: "thymulin-aging-decline",
    claim: "Serum thymulin activity declines with age in parallel with thymic involution",
    tier: "moderate",
    tierLabel: "Moderate",
    body:
      "Cross-sectional and longitudinal studies show that circulating thymulin activity peaks in childhood, declines through adulthood, and reaches near-undetectable levels in older adults \u2014 closely following the timeline of thymic involution. This age-related decline is associated with immunosenescence markers: reduced naive T-cell output, contracted T-cell receptor diversity, and impaired responses to new antigens. The correlation is consistent and biologically plausible. The moderate designation reflects the observational nature of the association \u2014 thymulin decline is part of a broader aging-immune picture, not proven to be the primary driver of immunosenescence.",
    sources:
      "Mocchegiani E et al., Mech Ageing Dev (multiple papers 1990s\u20132010s); Savino W et al., Nature Immunology 2002.",
  },
  {
    id: "thymulin-animal-immune",
    claim: "Exogenous thymulin restores immune markers in animal models of immunodeficiency or aging",
    tier: "moderate",
    tierLabel: "Moderate",
    body:
      "Rodent studies \u2014 primarily in thymectomized, aged, or immunodeficient mice \u2014 consistently show that exogenous thymulin administration restores or enhances T-cell subset ratios, proliferative responses to mitogens, and NK cell activity. The animal model evidence is internally consistent and forms the pharmacological rationale for human trials. The moderate designation reflects that rodent immunology differs substantially from human immunology, and translation from mouse models to human benefit has historically been unreliable in this field.",
    sources:
      "Dardenne M et al. (thymectomized mouse restoration studies); Safieh-Garabedian B et al. (thymulin immune modulation animal studies).",
  },
  {
    id: "thymulin-antinociception",
    claim: "Thymulin or thymulin analogues exert antinociceptive (pain-reducing) effects",
    tier: "moderate",
    tierLabel: "Moderate",
    body:
      "A body of work from Safieh-Garabedian, Quintanar-Stephano, and collaborators has documented antinociceptive effects of thymulin and its analogues in rodent pain models, including inflammatory pain, neuropathic pain, and hyperalgesia. The proposed mechanism involves immune modulation at peripheral sites \u2014 shifting macrophage and T-cell polarization toward anti-inflammatory phenotypes that reduce prostaglandin and cytokine production at pain sites \u2014 rather than direct CNS opioid receptor engagement. These are intriguing findings. The evidence base remains preclinical; no human pain trials are registered or published.",
    sources:
      "Safieh-Garabedian B et al., multiple publications in Pain, Neuroimmunomodulation (2000s\u20132020s); Quintanar-Stephano A et al.",
  },
  {
    id: "thymulin-human-clinical",
    claim: "Exogenous thymulin injection produces measurable immune or clinical benefit in humans",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "There are no published phase 2 or 3 randomized controlled trials of exogenous thymulin administration in humans as of early 2026. Early phase feasibility work exists but has not progressed to confirmatory trials with validated clinical endpoints. The absence of human evidence is the defining limitation of the thymulin evidence landscape. Claims about specific dosing protocols, injection frequencies, or clinical benefits for human use are not supported by the published literature.",
    sources: "No phase 2/3 RCT data identified; ClinicalTrials.gov search yields no completed registered human thymulin intervention trials.",
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

export default function ThymulinEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Thymulin\u2019s evidence splits sharply: the basic biology is well-established (zinc dependence,
        thymic origin, T-cell regulatory role, age-related decline), but the clinical translation
        to exogenous human injection is absent. Animal model immune and pain data are intriguing but
        unvalidated in humans. This is a compound with a strong scientific rationale and a weak
        clinical evidence base.
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
