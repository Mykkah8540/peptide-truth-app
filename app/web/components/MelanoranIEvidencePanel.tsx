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
    id: "mt1-mechanism",
    claim: "MC1R mechanism and melanin synthesis",
    tier: "strong",
    tierLabel: "Strong",
    body:
      "Melanotan-I\u2019s mechanism is well-characterized: it is a potent, selective MC1R agonist that stimulates melanocytes to produce eumelanin (dark/brown melanin) via the cAMP-PKA-MITF pathway. This is not disputed science \u2014 the mechanism is the basis for the FDA-approved drug afamelanotide. The peptide does what it is claimed to do at the receptor level.",
    sources:
      "Hadley & Dorr, Peptides (2006); Langan et al., JAMA Dermatology (2014); afamelanotide FDA label (Scenesse, 2019).",
  },
  {
    id: "mt1-epp",
    claim: "Afamelanotide (MT-I) for erythropoietic protoporphyria",
    tier: "strong",
    tierLabel: "Strong",
    body:
      "Afamelanotide is FDA-approved for increasing pain-free light exposure time in adults with EPP. The pivotal trials (Phase 3, Clinuvel) showed statistically significant and clinically meaningful increases in time spent in sunlight and reduced phototoxic pain episodes. This is the strongest clinical evidence base for the molecule \u2014 it is an FDA-validated indication.",
    sources:
      "Langendonk et al., NEJM (2015); FDA approval NDA 210496 (Scenesse, 2019); Clinuvel Phase 3 trial data.",
  },
  {
    id: "mt1-tanning",
    claim: "Tanning and photoprotection in photodermatoses",
    tier: "moderate",
    tierLabel: "Moderate",
    body:
      "Beyond EPP, afamelanotide has been studied in polymorphous light eruption (PLE), solar urticaria, and actinic prurigo \u2014 conditions where UV sensitivity causes harm. Trial data show tanning and reduced phototoxicity. The evidence quality is moderate because these are smaller trials in specific patient populations, not the general cosmetic tanning population.",
    sources:
      "Harms et al., J Eur Acad Dermatol Venereol (2009); Grattan et al., Br J Dermatol (2013); Clinuvel pipeline data.",
  },
  {
    id: "mt1-cosmetic",
    claim: "Safe cosmetic tanning in the general population",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "There is no evidence that MT-I/afamelanotide is safe for cosmetic tanning in people without a photodermatosis. The FDA-approved REMS exists specifically because MC1R stimulation in individuals with dysplastic nevi or MC1R risk alleles requires dermatology surveillance. Research peptide MT-I bypasses all of this risk management. \u201cI want a tan\u201d is not an evidence-supported indication.",
    sources:
      "FDA Scenesse REMS (2019); Noonan et al., JAMA Dermatology (2006) \u2014 editorial on off-label melanocortin tanning risks.",
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

export default function MelanoranIEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Melanotan-I has a well-established mechanism and an FDA-approved pharmaceutical form
        (afamelanotide/Scenesse) with genuine clinical evidence for EPP. The evidence gap is
        specifically for cosmetic tanning use in healthy people without a photodermatosis \u2014
        where the risk-benefit calculation looks very different.
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
