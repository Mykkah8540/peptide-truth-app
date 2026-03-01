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
    id: "survo-weight-loss",
    claim: "Survodutide produces clinically meaningful weight loss in adults with obesity",
    tier: "moderate",
    tierLabel: "Moderate",
    body:
      "Phase 2 randomized controlled data (BI\u2019s SYNCHRONIZE-1 precursor studies, 46 weeks) showed weight loss of approximately 14\u201319% from baseline at higher doses, with a dose-response relationship. These figures are competitive with semaglutide 2.4 mg and overlap with tirzepatide\u2019s lower-dose range. Phase 3 SYNCHRONIZE trials were enrolling as of 2025\u20132026; confirmatory efficacy data at scale are pending. The moderate designation reflects robust phase 2 signal but absent phase 3 confirmation and no head-to-head data versus approved agents.",
    sources:
      "Boehringer Ingelheim/Zealand phase 2 SYNCHRONIZE precursor RCT data; ClinicalTrials.gov NCT identifiers for SYNCHRONIZE program.",
  },
  {
    id: "survo-liver-fat",
    claim: "Survodutide significantly reduces liver fat in MASH/NASH",
    tier: "moderate",
    tierLabel: "Moderate",
    body:
      "In a phase 2 MASH trial, survodutide produced statistically significant reductions in liver fat fraction measured by MRI-PDFF, with a meaningful proportion of patients achieving MASH resolution on histology without worsening of fibrosis \u2014 the composite endpoint now required by the FDA for MASH approval. The liver signal appeared stronger than what has been reported with GLP-1 monotherapy at similar doses, consistent with the glucagon receptor\u2019s role in hepatic lipid oxidation. Phase 3 histology data are the pivotal question; the moderate designation reflects compelling phase 2 data but not yet phase 3 confirmation.",
    sources:
      "Rinella et al. (2023) MASH phase 2 data; Boehringer Ingelheim press releases 2023\u20132024; NEJM Evidence and Lancet publications of phase 2 MASH results.",
  },
  {
    id: "survo-glp1-mechanism",
    claim: "GLP-1 receptor agonism drives appetite suppression and improved glycemic control",
    tier: "strong",
    tierLabel: "Strong",
    body:
      "The GLP-1 receptor agonism component of survodutide\u2019s mechanism is well-established pharmacology \u2014 the same mechanism validated across semaglutide, liraglutide, dulaglutide, and others. Survodutide\u2019s GLP-1R affinity and functional agonism have been characterized in receptor binding studies. The appetite-suppressive and insulinotropic effects attributable to GLP-1R agonism are not in dispute; the drug is built on a validated pharmacological foundation.",
    sources:
      "Class-level evidence from GLP-1R agonist pharmacology literature; survodutide receptor characterization data from Zealand Pharma/Boehringer Ingelheim.",
  },
  {
    id: "survo-gcgr-additive",
    claim: "Glucagon receptor agonism adds incremental metabolic benefit beyond GLP-1 alone",
    tier: "moderate",
    tierLabel: "Moderate",
    body:
      "The glucagon receptor component is pharmacologically validated in preclinical models and consistent with human glucagon physiology: glucagon increases energy expenditure, promotes lipolysis, and drives hepatic fatty acid oxidation. Whether these mechanisms translate to additive clinical benefit \u2014 beyond what dose-matched GLP-1 agonism achieves \u2014 is the key hypothesis being tested in phase 3. The liver fat data are the strongest clinical signal for glucagon\u2019s independent contribution. The additive energy expenditure effect in humans is plausible but not definitively quantified.",
    sources:
      "Jall et al., Nature Metabolism 2017 (dual GLP-1/GCGR preclinical); Patel et al. (GCGR agonism and hepatic lipid); survodutide phase 2 weight/liver data.",
  },
  {
    id: "survo-cardiovascular",
    claim: "Survodutide reduces major adverse cardiovascular events (MACE)",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "No dedicated cardiovascular outcomes trial (CVOT) for survodutide has reported results as of early 2026. GLP-1 receptor agonists as a class have demonstrated MACE reduction in high-risk populations, but this cannot be assumed to automatically extend to a dual GLP-1R/GCGR agonist, particularly given glucagon\u2019s effects on heart rate and potentially on glucose. Cardiovascular outcomes data are required by regulators for approval in at-risk populations and remain pending.",
    sources:
      "No published CVOT data for survodutide; class-level GLP-1R CVOT data (LEADER, SUSTAIN-6, SELECT) not directly applicable.",
  },
  {
    id: "survo-fda-approval",
    claim: "Survodutide is FDA-approved",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "Survodutide is investigational. It is not FDA-approved for any indication as of early 2026. Phase 3 trials are ongoing. Any use outside of a clinical trial is off-label use of an unregistered investigational compound, with no regulatory oversight of formulation, dosing, or safety monitoring.",
    sources:
      "FDA drug approvals database (no survodutide entry); ClinicalTrials.gov SYNCHRONIZE program status.",
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

export default function SurvodutideEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Survodutide\u2019s evidence base is at the phase 2\u2013phase 3 boundary: the mechanistic rationale
        is sound, the early efficacy data are promising, and phase 3 confirmatory results are
        forthcoming. Its strongest differentiated signal is the liver fat reduction data, which
        distinguishes it from pure GLP-1 agents. No approval, no CVOT data, no long-term safety
        record yet.
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
