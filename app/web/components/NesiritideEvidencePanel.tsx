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
    id: "nes-mechanism",
    claim: "NPR-A/cGMP vasodilation mechanism",
    tier: "strong",
    tierLabel: "Strong",
    body:
      "Nesiritide\u2019s mechanism is definitively established. It binds NPR-A, activating intracellular guanylyl cyclase and raising cGMP, which drives smooth muscle relaxation in arterial and venous walls. This produces measurable preload and afterload reduction, natriuresis, and modest diuresis. The mechanism is identical to endogenous BNP and is not disputed. Hemodynamic effects are consistently demonstrated in pharmacodynamic studies.",
    sources:
      "Colucci et al., NEJM (2000); O\u2019Connor et al., NEJM (2011); Sackner-Bernstein et al., JAMA (2005).",
  },
  {
    id: "nes-dyspnea",
    claim: "Dyspnea reduction in acute decompensated heart failure",
    tier: "strong",
    tierLabel: "Strong",
    body:
      "This is the FDA approval basis and is supported by the ASCEND-HF trial (n=7,141) \u2014 the largest nesiritide outcome trial ever conducted. ASCEND-HF showed a statistically significant but modest improvement in patient-reported dyspnea at 6 and 24 hours (absolute difference ~3\u20134% on a 5-point scale). The effect is real but small; NNT is approximately 14 for the 6-hour dyspnea endpoint. This is the clearest evidence nesiritide has.",
    sources:
      "O\u2019Connor et al., NEJM (2011) \u2014 ASCEND-HF trial; FDA NDA 20-920 (Natrecor approval, 2001).",
  },
  {
    id: "nes-hemodynamic",
    claim: "Short-term hemodynamic improvement in ADHF",
    tier: "moderate",
    tierLabel: "Moderate",
    body:
      "Nesiritide consistently lowers pulmonary capillary wedge pressure (PCWP) and reduces systemic vascular resistance \u2014 these hemodynamic endpoints are well-documented. The evidence is moderate rather than strong because: (1) hemodynamic improvement does not reliably translate to clinical outcomes, and (2) ASCEND-HF showed the hemodynamic benefits did not produce mortality or readmission benefit.",
    sources:
      "Mills et al., J Am Coll Cardiol (1999); Wang et al., J Card Fail (2008); ASCEND-HF hemodynamic substudy.",
  },
  {
    id: "nes-mortality",
    claim: "Mortality benefit in acute decompensated heart failure",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "ASCEND-HF explicitly showed no mortality benefit at 30 days (hazard ratio 0.98, 95% CI 0.80\u20131.19, p=0.88). There was also no reduction in 30-day heart failure readmission (hazard ratio 1.04, p=0.49). The hope that hemodynamic improvement would translate to survival benefit was not borne out in the definitive trial. This is why nesiritide\u2019s clinical use has declined substantially post-2011.",
    sources:
      "O\u2019Connor et al., NEJM (2011) \u2014 ASCEND-HF primary outcomes; Sackner-Bernstein et al., JAMA (2005) \u2014 earlier meta-analysis raising renal concerns.",
  },
  {
    id: "nes-community",
    claim: "Community / off-label self-administration use",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "Nesiritide has no plausible community use case. It requires continuous IV infusion, real-time hemodynamic monitoring, and blood pressure management that cannot be replicated outside of a hospital or infusion center setting. It is not absorbed subcutaneously in a clinically useful way. There is no evidence base for any self-administration use.",
    sources: "Clinical pharmacology: nesiritide IV prescribing information (Janssen).",
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

export default function NesiritideEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Nesiritide is one of the better-studied peptide drugs in this database \u2014 it was
        evaluated in a 7,141-patient trial (ASCEND-HF). The evidence picture is clear: genuine
        mechanism, modest symptom benefit, no mortality benefit, no community use case. The
        story here is a lesson in why hemodynamic endpoints don\u2019t always translate to
        outcomes.
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
