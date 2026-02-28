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
    id: "epp-photoprotection",
    claim: "Reduces phototoxicity and increases pain-free sun exposure in EPP",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "Afamelanotide is FDA-approved based on phase III RCT data. Langendonk et al. (NEJM 2015) reported a pivotal European trial (n=93): afamelanotide-treated patients achieved significantly more hours of sun exposure without pain compared to placebo (the primary endpoint). A second phase III trial in the US confirmed the finding. This is the strongest evidence tier — regulatory-grade RCT data supporting a specific, clinically meaningful outcome in a well-defined patient population.",
    sources:
      "Langendonk JG et al., NEJM 2015;373:48-59; Balwani M et al., JAMA Dermatol 2017; FDA approval label 2019.",
  },
  {
    id: "mc1r-mechanism",
    claim: "MC1R agonism drives increased eumelanin synthesis and photoprotection",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "The mechanism of afamelanotide — MC1R agonism leading to increased eumelanin production — is well-characterized at the molecular, cellular, and clinical level. Melanin densitometry increases are measurable in treated patients, and the photoprotective effect of increased skin pigmentation is established photobiologically. The receptor pharmacology is robustly understood.",
    sources:
      "Nasti TH & Timares L, Photochem Photobiol 2015 (MC1R review); multiple melanocortin receptor pharmacology studies.",
  },
  {
    id: "melanin-independent-protection",
    claim: "Melanin-independent photoprotective mechanisms",
    tier: "moderate",
    tierLabel: "Moderate evidence",
    body:
      "Some data suggest afamelanotide may have photoprotective effects beyond melanin production, potentially including DNA repair enhancement, antioxidant effects, or anti-inflammatory pathways via MC1R downstream signaling. These mechanisms are biologically plausible and have been investigated in EPP trial data, but are not the primary established mechanism and the clinical magnitude of any melanin-independent contribution remains uncertain.",
    sources:
      "Böhm M et al., J Invest Dermatol 2005; Minder EI et al., Cell Mol Life Sci 2017.",
  },
  {
    id: "general-tanning",
    claim: "Safe and effective for general-population aesthetic tanning",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "Afamelanotide has not been studied in general healthy populations for aesthetic tanning purposes. Its clinical trials are exclusively in EPP, a disease population where the risk-benefit calculation is very different from a healthy person seeking a cosmetic tan. No regulatory body has approved or assessed afamelanotide for this use.",
    sources: "No trials in general population tanning identified. Off-label use outside EPP is not evidence-supported.",
  },
  {
    id: "performance-enhancement",
    claim: "Performance enhancement or community peptide use benefit",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "There is no published evidence for any performance enhancement, body composition, or wellness benefit from afamelanotide. Community melanotan use is distinct from pharmaceutical afamelanotide and typically involves MT-II (a different, non-selective melanocortin agonist). Afamelanotide specifically has no evidence base outside EPP photoprotection.",
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

export default function AfamelanotideEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Afamelanotide has strong, regulatory-grade evidence for its approved indication: EPP
        photoprotection. The MC1R mechanism is well characterized. Evidence for any use outside
        EPP — including general population tanning — does not exist. The strong evidence base for
        EPP should not be interpreted as endorsement of off-label use.
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
