/**
 * IGF1LR3EvidencePanel — calibrated evidence for IGF-1 LR3.
 * Key frame: the mechanism is established; cell culture and animal data are
 * real; human clinical trials do not exist. The prolonged hypoglycemia risk
 * is directly demonstrated from the pharmacokinetics.
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
    id: "igf1r-mechanism",
    claim: "IGF-1 LR3 binds and activates IGF-1R with IGFBP-resistant pharmacokinetics",
    tier: "strong",
    tierLabel: "Strong — established pharmacology; used as research reagent",
    body: "The molecular pharmacology of IGF-1 LR3 is well-established. The arginine substitution at position 3 dramatically reduces IGFBP binding affinity while maintaining IGF-1R binding. IGF-1 LR3 is used as a standard research reagent precisely because its IGFBP resistance allows sustained IGF-1R activation in cell culture studies without rapid sequestration by binding proteins. The half-life (~20-30 hours in animal models, longer than native IGF-1's minutes) is a characterized pharmacokinetic property.",
    sources: "Francis et al. 1992 (original LR3 characterization); GroPep Ltd product characterization data; published cell biology literature using IGF-1 LR3 as reagent",
  },
  {
    id: "anabolic-cell-animal",
    claim: "IGF-1 LR3 promotes muscle protein synthesis and hypertrophy in cell culture and animals",
    tier: "strong",
    tierLabel: "Strong — cell and animal data; mechanism well-characterized",
    body: "Cell culture studies consistently show IGF-1 LR3 stimulates protein synthesis, reduces protein degradation, and promotes myoblast proliferation and differentiation via Akt/mTOR pathway activation. Animal studies (rodents) show muscle hypertrophy with intramuscular or systemic IGF-1 LR3 administration. The anabolic mechanism is well-characterized. This is the evidential basis for the community use case. The gap: human RCT data for this purpose does not exist.",
    sources: "Barton-Davis et al. 1998 (mouse IGF-1 overexpression); cell biology literature; IGF-1R/mTOR signaling literature",
  },
  {
    id: "glucose-lowering",
    claim: "IGF-1 LR3 causes sustained, prolonged hypoglycemia",
    tier: "strong",
    tierLabel: "Strong — directly follows from pharmacokinetics; documented risk",
    body: "IGF-1 lowers blood glucose by stimulating GLUT4 translocation in skeletal muscle — an insulin-independent glucose uptake mechanism. With a half-life of ~20-30 hours, IGF-1 LR3's glucose-lowering effect persists far longer than native IGF-1. Community reports of severe hypoglycemia from IGF-1 LR3 are consistent with this pharmacokinetic reality. This is not a speculative risk — it is a direct pharmacological consequence of the IGFBP-resistant, long-half-life design.",
    sources: "IGF-1 hypoglycemia mechanism (Rizza et al.); LR3 pharmacokinetics data; community safety case reports",
  },
  {
    id: "cancer-igf1r",
    claim: "IGF-1 receptor activation promotes cancer cell survival and proliferation",
    tier: "strong",
    tierLabel: "Strong — validated oncological target; extensive cancer biology literature",
    body: "IGF-1R overexpression is documented in prostate, breast, colorectal, lung, and other cancers. IGF-1R signaling activates PI3K/Akt/mTOR (survival) and MAPK/ERK (proliferation) in cancer cells. Multiple anti-IGF-1R antibodies and small molecules have been developed as cancer treatments. The IGF-1R pathway is a validated oncological target — not a theoretical concern. Observational epidemiology consistently links elevated circulating IGF-1 with increased cancer risk (prostate, breast, colorectal).",
    sources: "Pollak et al. 2004 (Nature Rev Cancer); multiple anti-IGF-1R oncology trials; epidemiological IGF-1/cancer risk meta-analyses",
  },
  {
    id: "human-muscle-hypertrophy",
    claim: "IGF-1 LR3 injection produces muscle hypertrophy in healthy humans",
    tier: "none",
    tierLabel: "None — no human RCTs published",
    body: "No randomized controlled trials have examined IGF-1 LR3 injection for muscle hypertrophy in healthy humans. Community evidence is entirely anecdotal. Whether the cell culture and animal data translates to human muscle hypertrophy under community injection protocols is unestablished. The absence of clinical development is relevant — the risk/benefit profile has not been considered acceptable for pharmaceutical development.",
    sources: "Absence of published human RCT data for IGF-1 LR3 injection",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  strong:   { bg: "rgba(21,100,58,0.05)",  border: "rgba(21,100,58,0.13)",  label: "Strong",      labelColor: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.17)",   label: "Moderate",    labelColor: "#7c5200" },
  none:     { bg: "rgba(158,56,0,0.06)",   border: "rgba(158,56,0,0.18)",   label: "No evidence", labelColor: "#9e3800" },
};

export default function IGF1LR3EvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        IGF-1 LR3&apos;s pharmacology is well-characterized — the mechanism is established science, not speculation. The hypoglycemia risk directly follows from the pharmacokinetics and is similarly well-characterized. The cancer concern is validated oncological science. The gap: human clinical trials for bodybuilding use do not exist, and no pharmaceutical development pathway is pursuing this compound because the sustained free IGF-1R activation profile is not considered acceptable for drug development.
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
