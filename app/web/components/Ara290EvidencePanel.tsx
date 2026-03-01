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
    id: "ara290-sfn-sarcoidosis",
    claim: "Small fiber neuropathy improvement in sarcoidosis",
    tier: "moderate",
    tierLabel: "Moderate evidence",
    body:
      "A randomized, double-blind, placebo-controlled trial (Brines et al., 2014) enrolled 55 patients with sarcoidosis-associated small fiber neuropathy. ARA-290 (4 mg IV three times weekly for 28 days) significantly improved corneal nerve fiber density versus placebo (primary endpoint) and reduced neuropathic symptom scores (secondary endpoints). The trial was small but well-designed for a rare condition. Sarcoidosis-associated SFN has few treatment options, making this finding clinically notable despite limited sample size.",
    sources: "Brines et al., Molecular Medicine 2014; Drent et al., Sarcoidosis Vasc Diffuse Lung Dis 2013",
  },
  {
    id: "ara290-irr-mechanism",
    claim: "Tissue-protective EPO receptor (IRR) mechanistic basis",
    tier: "moderate",
    tierLabel: "Moderate evidence",
    body:
      "The IRR (innate repair receptor) concept &mdash; a heterodimer of EpoR and CD131 (beta-common receptor) that mediates tissue-protective EPO signaling independently of hematopoiesis &mdash; is supported by substantial preclinical evidence across rodent models of nerve injury, ischemia, and inflammation. ARA-290&apos;s selective binding profile (IRR without EpoR homodimer affinity) has been characterized biochemically. Translational confidence is moderate: the preclinical-to-human translation of neuroprotective EPO analogue effects has been mixed in other contexts (full-length EPO in stroke trials was negative).",
    sources: "Brines et al., PNAS 2004 (IRR concept); Leist et al., Science 2004",
  },
  {
    id: "ara290-fda",
    claim: "FDA approval or established clinical use",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "ARA-290 is not FDA-approved for any indication. No Phase 3 trials have been completed. The compound is not commercially available as a regulated pharmaceutical. All clinical data comes from small investigator-initiated trials. Regulatory filings for ARA-290 have not progressed to NDA or BLA submission as of the current date.",
    sources: "ClinicalTrials.gov ARA-290 registry; no FDA approval record",
  },
  {
    id: "ara290-enhancement",
    claim: "Enhancement, immune boosting, or general anti-inflammatory use",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "There are no published clinical data supporting ARA-290 use for general immune enhancement, athletic recovery, anti-aging, or non-neuropathy inflammatory conditions in humans. Preclinical anti-inflammatory effects through IRR-mediated macrophage polarization are documented in rodent models, but extrapolation to community enhancement protocols is unsupported. The compound&apos;s pharmacokinetics (half-life, oral bioavailability, subcutaneous absorption) in humans are not well-characterized outside trial conditions.",
    sources: "No published human trials outside sarcoidosis SFN and small diabetic neuropathy studies",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function Ara290EvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        ARA-290&apos;s evidence base is narrow but mechanistically interesting. The sarcoidosis SFN
        trial is the best human data available &mdash; small, but well-controlled for a rare
        disease with few options. The IRR concept underpinning ARA-290&apos;s design is credible
        preclinically. For any use beyond the specific neuropathy context studied, evidence
        is absent.
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
