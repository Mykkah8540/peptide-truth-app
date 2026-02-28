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
    id: "primate-weight-loss",
    claim: "Significant adipose tissue reduction and weight loss in obese primates",
    tier: "moderate",
    tierLabel: "Moderate evidence",
    body:
      "Barnhart et al. (2011) demonstrated that adipotide treatment in obese Rhesus macaques produced approximately 11% body weight loss and 27% reduction in abdominal fat volume over 4 weeks. The effect was mechanistically plausible and histologically confirmed. However, this is a single primate study with n=10 treated animals. Primate-to-human translation is uncertain, and the same study documented nephrotoxicity that was not fully resolved. Moderate tier reflects real, replicated-in-kind mechanistic data in a relevant species, but with significant caveats around human translatability and safety.",
    sources: "Barnhart KF et al., Sci Transl Med. 2011;3(108):108ra112.",
  },
  {
    id: "human-efficacy",
    claim: "Weight loss or fat reduction efficacy in humans",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "No completed human clinical trial for adipotide has been published. No phase I dose-finding study with human endpoints has been reported. Community anecdotes of human use exist but constitute zero-quality evidence: uncontrolled, unblinded, no monitoring, unknown compound identity and purity. Human efficacy is entirely extrapolated from the 2011 primate study.",
    sources: "No published human trials identified as of early 2026.",
  },
  {
    id: "safe-human-profile",
    claim: "Acceptable human safety profile",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "The primate study documented nephrotoxicity — a mechanism-based concern given the pro-apoptotic payload and adipose vasculature targeting that imperfectly spares renal vasculature. No human safety data exists. No established safe dose, schedule, or monitoring protocol exists for humans. This is not simply a gap — the available primate data actively suggests a renal safety signal that has not been resolved.",
    sources: "Barnhart KF et al., Sci Transl Med. 2011 (nephrotoxicity data reported in same publication).",
  },
  {
    id: "approved-clinical",
    claim: "Any approved or active investigational clinical application",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "Adipotide does not have FDA approval for any indication. As of early 2026, no active IND-authorized human clinical trials are registered or published. The compound is in research-chemical status only.",
    sources: "ClinicalTrials.gov search; no registered active adipotide human trials identified.",
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

export default function AdipotideEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Adipotide&apos;s evidence base consists of a single primate study that produced striking efficacy
        results alongside a significant renal toxicity signal. No human evidence exists. The primate
        data is real but limited in scope, and the toxicity finding is an active safety concern, not
        a resolved one. Community interest outpaces the evidence by a very wide margin.
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
