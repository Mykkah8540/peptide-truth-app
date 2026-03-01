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
    id: "snap8-topical-safety",
    claim: "Topical Snap-8 is safe and well-tolerated on intact human skin",
    tier: "strong",
    tierLabel: "Strong",
    body:
      "Multiple cosmetic stability and dermal tolerability assessments \u2014 including repeat insult patch tests and in-use consumer studies \u2014 consistently show that Snap-8 at standard cosmetic concentrations (2\u201310%) causes no significant irritation, sensitization, or phototoxicity. Regulatory bodies in the EU and US have not flagged it as a concern ingredient. The peptide\u2019s skin-safety profile is about as clean as cosmetic ingredients come, which is why it appears in hundreds of commercial formulations.",
    sources: "EU Cosmetics Regulation SCCS assessments; manufacturer safety dossiers (Lipotec/Lubrizol).",
  },
  {
    id: "snap8-wrinkle-appearance",
    claim: "Topical Snap-8 visibly reduces expression line depth",
    tier: "moderate",
    tierLabel: "Moderate",
    body:
      "Industry-sponsored profilometry studies report 16\u201326% reductions in wrinkle depth after 28\u201360 days of twice-daily application in small cohorts (10\u201330 subjects). The signal is real enough to persist across several manufacturer\u2019s own evaluations, but these are not independent, peer-reviewed, placebo-controlled trials. Comparator data against well-formulated moisturizers (which also reduce wrinkle depth through hydration alone) are absent. The cosmetic benefit is plausible but the effect size is uncertain.",
    sources: "Lipotec technical data sheets; Snap-8 ingredient monographs cited in cosmetic dermatology reviews.",
  },
  {
    id: "snap8-snare-mechanism",
    claim: "Snap-8 inhibits SNARE-complex assembly at the neuromuscular junction via topical delivery",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "The SNARE hypothesis requires the peptide to traverse the stratum corneum, the viable epidermis, the dermis, and a lipid bilayer to reach the cytosol of motor nerve terminals. No published human or animal study has demonstrated transdermal delivery of Snap-8 (or Argireline) to neuromuscular junctions at pharmacologically relevant concentrations. In vitro SNARE-binding data exist but do not speak to topical bioavailability. This claimed mechanism is scientifically interesting but experimentally unverified.",
    sources: "Gab\u00e1s-Rivera et al. (in vitro Argireline SNARE binding); no in vivo transdermal delivery studies identified.",
  },
  {
    id: "snap8-injectable",
    claim: "Snap-8 has clinical benefit when injected subcutaneously or intradermally",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "Snap-8 has no approved injectable formulation and no clinical trial data for injected routes. The ingredient is classified and regulated as a cosmetic additive, not a pharmaceutical. Any claims about injected Snap-8 fall entirely outside the evidence base and outside the regulatory envelope for this compound.",
    sources: "No published clinical data; ingredient is cosmetic-only per regulatory classifications.",
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

export default function Snap8EvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Snap-8\u2019s evidence base lives almost entirely within the cosmetics industry. The topical safety
        data are robust; the efficacy and mechanism claims are not. There are no pharmaceutical-grade
        clinical trials, no regulatory drug approvals, and no injectable use cases with any evidence
        behind them.
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
