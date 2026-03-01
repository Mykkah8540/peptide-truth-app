/**
 * PegMgfEvidencePanel — honest evidence landscape for PEG-MGF.
 * Key frame: moderate preclinical evidence for MGF splice variant biology.
 * Zero human clinical data. The distinct "MGF receptor" is not confirmed.
 * PEGylation-specific data is even more limited than the MGF biology data.
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
    id: "mgf-splice-biology",
    claim: "MGF splice variant biology \u2014 satellite cell activation in preclinical models",
    tier: "moderate",
    tierLabel: "Moderate",
    body: "The IGF-1Ec splice variant (mechano growth factor, MGF) is expressed in skeletal muscle in response to mechanical loading and damage. In preclinical models, MGF expression promotes satellite cell proliferation and differentiation \u2014 the muscle stem cell response to injury. This is real muscle biology backed by legitimate molecular physiology research, primarily from the laboratory of Geoffrey Goldspink at UCL who originally characterized MGF.",
    sources: "Goldspink et al. series: IGF-1Ec splice variant identification and characterization in mechanically stimulated muscle. Yang and Goldspink 2002 (satellite cell work). McKoy et al. 1999. Rodent models of muscle injury and stretch: MGF expression profiles documented.",
  },
  {
    id: "peg-mgf-preclinical",
    claim: "PEG-MGF specifically in preclinical models",
    tier: "moderate",
    tierLabel: "Moderate",
    body: "PEG-MGF preclinical data is more limited than the broader MGF biology literature. Studies in rodent muscle injury models show systemic PEG-MGF injection can increase satellite cell markers and promote repair. However, the evidence base for PEG-MGF specifically (vs non-PEGylated MGF) is thinner \u2014 the PEGylation rationale is pharmacokinetic (half-life extension) rather than mechanistic, and the specific dose-response relationship in humans is extrapolated from animal models.",
    sources: "Deng et al. 2011 (PEG-MGF in mouse muscle injury model). Limited published studies specifically on PEG-MGF vs MGF comparison. Most MGF research uses direct intramuscular or ICV delivery \u2014 not the systemic injection route used in community protocols.",
  },
  {
    id: "distinct-receptor",
    claim: "Distinct MGF receptor \u2014 proposed mechanism separate from IGF-1R",
    tier: "none",
    tierLabel: "No evidence",
    body: "Community framing often presents MGF as acting via a distinct, separate \u201cMGF receptor\u201d \u2014 implying it has a fundamentally different mechanism from IGF-1. This distinct MGF receptor has not been conclusively identified or pharmacologically characterized. Current evidence suggests MGF effects are primarily mediated through IGF-1R (the same receptor as IGF-1) or through partially distinct downstream signaling cascades after IGF-1R activation, rather than through a wholly separate receptor. The \u201cdistinct receptor\u201d claim is used in marketing but is not supported by receptor pharmacology literature.",
    sources: "Receptor pharmacology: IGF-1Ec E-domain peptide interaction with IGF-1R documented. Proposed distinct PHOS receptor: Kravchenko et al. 2006 (rat; not replicated or confirmed as a bona fide MGF-specific receptor). Current consensus: IGF-1R is the primary mediator of MGF biological effects.",
  },
  {
    id: "human-clinical",
    claim: "Human clinical trials \u2014 any indication, any dose",
    tier: "none",
    tierLabel: "No evidence",
    body: "No human clinical trials of PEG-MGF exist. No published pharmacokinetic studies in humans. No dose-finding or safety studies. No evidence of clinical development in any indication. ClinicalTrials.gov lists no registered trials for PEG-MGF or mechano growth factor as an experimental intervention.",
    sources: "ClinicalTrials.gov: no registered trials. PubMed: no human administration studies. The compound has not entered human clinical development.",
  },
  {
    id: "bodybuilding-recovery",
    claim: "Muscle recovery, hypertrophy, or performance enhancement in humans",
    tier: "none",
    tierLabel: "No evidence",
    body: "No controlled evidence exists for PEG-MGF\u2019s claimed benefits in bodybuilding or recovery contexts in humans. Community reports are uncontrolled self-reports with significant placebo effect, confounding from other compounds in stacks (anabolic steroids, GH secretagogues), and no objective outcome measures. The biological plausibility (satellite cell activation post-exercise) does not substitute for evidence of actual human benefit.",
    sources: "No controlled trials. Community forums: anecdotal accounts without objective measurement. Plausibility ≠ evidence.",
  },
  {
    id: "peg-accumulation",
    claim: "PEG accumulation safety with chronic dosing",
    tier: "none",
    tierLabel: "No evidence",
    body: "PEG accumulation with repeated dosing has been flagged as a theoretical concern for PEGylated biologics in general. For pharmaceutical PEGylated drugs, this is characterized through clinical development. For PEG-MGF, there is no data on PEG body burden with chronic administration, no toxicology data from chronic use, and no characterization of what the PEG component does at any dose.",
    sources: "General PEG safety literature: Caliceti and Veronese 2003 (PEGylation review). PEG accumulation concerns: raised for high-molecular-weight PEG with repeated dosing. PEG-MGF-specific: no data.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function PegMgfEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        PEG-MGF sits in a common category for community peptides: legitimately interesting preclinical biology that has not been tested in humans. The MGF splice variant research is real science \u2014 Geoffrey Goldspink\u2019s work on mechanical load-induced IGF-1 splicing is foundational muscle physiology. The problem is the gap between \u201cthis is interesting biology in rodents\u201d and \u201cinjecting this in humans produces the claimed benefits safely\u201d. That gap is completely unbridged. The \u201cdistinct MGF receptor\u201d claim specifically is not supported by receptor pharmacology data and appears in marketing rather than science.
      </div>
      <div className="reta-evidence__list">
        {SIGNALS.map((s) => {
          const st = TIER_STYLE[s.tier];
          return (
            <div key={s.id} className="reta-evidence__entry" style={{ background: st.bg, border: `1px solid ${st.border}` }}>
              <div className="reta-evidence__entry-top">
                <div className="reta-evidence__entry-claim">{s.claim}</div>
                <div className="reta-evidence__entry-tier" style={{ color: st.labelColor, borderColor: st.border }}>{s.tierLabel}</div>
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
