/**
 * ThymosinBeta4FullEvidencePanel — calibrated evidence for Thymosin Beta-4 Full.
 * Key frame: G-actin sequestration and ILK mechanism is well-characterized;
 * dry eye has NDA-level evidence; cardiac repair has Phase 2 pilot data.
 * Animal repair data is extensive. No healthy adult performance data.
 * Community protocols are extrapolated from medical condition evidence.
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
    id: "actin-ilk-mechanism",
    claim: "Thymosin Beta-4 sequesters G-actin and activates ILK, driving cell migration and survival signaling",
    tier: "strong",
    tierLabel: "Strong — foundational mechanism; extensively characterized in cell biology",
    body: "The molecular mechanisms of full thymosin beta-4 are among the best-characterized of any endogenous repair peptide. The G-actin sequestration function (Tβ4 binds G-actin monomers via the LKKTET motif to regulate the G/F-actin ratio) has been established in structural biology, biochemistry, and cell biology. ILK activation by Tβ4 drives AKT/PKB survival signaling, cell migration, and angiogenesis — this cascade is documented in multiple cell line and animal models. The Ac-SDKP fragment released from Tβ4 by prolyl oligopeptidase has characterized anti-fibrotic and angiogenic effects. This mechanistic foundation is not in question.",
    sources: "Safer & Nachmias 1994 (actin sequestration); Bock-Marquette et al. 2004 (ILK mechanism in cardiac repair — Nature); Sosne et al. (corneal epithelial mechanisms); Goldstein et al. (Ac-SDKP and angiogenesis)",
  },
  {
    id: "dry-eye-phase2",
    claim: "Topical full Tβ4 improves dry eye disease symptoms and corneal healing in Phase 2 human trials",
    tier: "strong",
    tierLabel: "Strong — Phase 2 RCT data; NDA filing stage; the most clinically mature application",
    body: "RegeneRx's RGN-259 (topical thymosin beta-4 eye drops) reached Phase 2 clinical trials for dry eye disease and neurotrophic keratopathy. The Phase 2b ARISE studies (1 and 2) showed statistically significant improvements in dry eye symptoms, corneal staining, and tear film parameters vs placebo. The mechanism — Tβ4 promotes corneal epithelial cell migration, adhesion, and wound closure — is well-matched to the dry eye disease pathophysiology (impaired corneal surface integrity). This is the most clinically advanced application of full thymosin beta-4 and the only indication with NDA-relevant evidence.",
    sources: "RegeneRx ARISE-1 and ARISE-2 Phase 2 trials (ClinicalTrials.gov NCT02049554, NCT02592005); Sosne et al. corneal healing studies; Goldstein & Bhatt review (thymosin beta-4 in ocular disease)",
  },
  {
    id: "cardiac-repair-pilot",
    claim: "Full Tβ4 promotes cardiac repair and functional recovery after myocardial infarction in animal models and Phase 2 pilot",
    tier: "moderate",
    tierLabel: "Moderate — strong animal data; Phase 2 pilot (safety/feasibility); not a powered efficacy trial",
    body: "The TOPCARE-AMI pilot study (RegeneRx, completed around 2014) examined intracoronary full Tβ4 administration after acute myocardial infarction. The pilot (approximately 40 patients) showed safety and feasibility data, with exploratory efficacy signals in cardiac MRI parameters (infarct size, ejection fraction) at 3 and 12 months. The animal model evidence supporting cardiac repair is stronger: multiple rodent and large animal MI models show improved cardiomyocyte survival, reduced infarct scar size, and improved ejection fraction with Tβ4 treatment. The mechanism (ILK-AKT cardiomyocyte survival + epicardial progenitor cell mobilization + angiogenesis) is well-characterized from the Bhatt lab and others.",
    sources: "Bock-Marquette et al. 2004 (Nature — ILK cardiac mechanism); Smart et al. 2007 (epicardial progenitor mobilization); TOPCARE-AMI pilot (RegeneRx, NCT01594893 — 40 patient Phase 2 pilot); Ellison et al. 2011 (cardiac repair review)",
  },
  {
    id: "skeletal-muscle-repair",
    claim: "Full Tβ4 promotes skeletal muscle repair and recovery from injury in animal models",
    tier: "moderate",
    tierLabel: "Moderate — animal model data; not replicated in human controlled trials",
    body: "In rodent models of skeletal muscle injury (crush injury, cardiotoxin injection, volumetric muscle loss), full Tβ4 treatment accelerates muscle fiber regeneration, reduces fibrosis, and improves functional recovery. The mechanism involves satellite cell migration, myoblast differentiation, and anti-fibrotic effects via Ac-SDKP-mediated TGF-β pathway modulation. These effects overlap with TB-500 but full Tβ4 provides additional mechanistic breadth through ILK activation. The animal model evidence is consistent across multiple labs, but human data is absent for musculoskeletal applications.",
    sources: "Bock-Marquette et al. 2004 (skeletal muscle component); Huang et al. (muscle repair); Gharaibeh et al. (satellite cell mobilization); Tβ4 musculoskeletal repair animal model literature",
  },
  {
    id: "wound-healing-human",
    claim: "Full Tβ4 improves wound healing in human subjects",
    tier: "moderate",
    tierLabel: "Moderate — small Phase 2 human data (pressure ulcers, stasis ulcers); not community-relevant dosing",
    body: "Beyond dry eye disease, full Tβ4 has been examined in human wound healing studies — specifically pressure ulcers and venous stasis ulcers (also RegeneRx). Small Phase 1/2 studies showed safety and some efficacy signals for accelerated wound closure in these chronic wound models. The evidence is limited and the populations (chronic wounds in medical patients) are different from community use contexts. The wound healing human evidence is the second most mature clinical application after dry eye, but the data is modest.",
    sources: "RegeneRx RGN-137 (topical Tβ4 for pressure ulcers — Phase 2); RegeneRx wound healing program; Tβ4 wound healing human study literature",
  },
  {
    id: "healthy-performance",
    claim: "Full Tβ4 enhances athletic performance, muscle mass, or recovery in healthy adults",
    tier: "none",
    tierLabel: "None — no evidence; all performance claims are extrapolated from medical repair context",
    body: "There are no studies of full thymosin beta-4 in healthy adults for performance enhancement, muscle hypertrophy, or recovery optimization. The entire evidence base — animal models of injury repair, human trials in cardiac and corneal disease patients — is in the context of tissue damage or pathology. Extrapolating tissue repair efficacy in injured/diseased tissue to performance enhancement in healthy tissue involves assumptions that are not supported by data. The angiogenesis and cell migration promotion mechanisms that drive tissue repair do not translate directly to performance in intact healthy tissue.",
    sources: "Absence of any healthy adult performance studies for full Tβ4 in any form; community use is extrapolated from animal injury models and medical condition evidence",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",         labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",       labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence",    labelColor: "#9e3800" },
};

export default function ThymosinBeta4FullEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Full thymosin beta-4 has the most advanced human clinical data of any thymosin compound: Phase 2 trials in dry eye disease (NDA-stage evidence), a Phase 2 pilot in cardiac repair, and Phase 1/2 wound healing data. The mechanism (G-actin sequestration, ILK activation, VEGF/angiogenesis) is well-characterized. The gap between this clinical evidence and community use is significant: all human data is in medical conditions (dry eye, cardiac ischemia, chronic wounds), delivered by clinical routes (topical, intracoronary), at clinically defined doses. Subcutaneous community use for healthy adult applications has zero direct evidence.
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
