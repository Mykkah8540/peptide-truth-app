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
    id: "champion",
    claim: "Carbetocin is non-inferior to oxytocin for PPH prevention after cesarean delivery",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "The CHAMPION trial (Lancet, 2018) \u2014 the largest RCT of uterotonic agents ever conducted " +
      "\u2014 randomized 29,645 women undergoing cesarean delivery across 23 countries to carbetocin " +
      "or oxytocin. Carbetocin met the pre-specified non-inferiority criterion for the primary " +
      "composite outcome (blood loss \u2265500 mL or use of additional uterotonic agents or bimanual " +
      "uterine massage). Rates of severe PPH (\u22651000 mL blood loss) were similar. The WHO " +
      "recommendation for carbetocin in cesarean delivery is based substantially on this trial.",
    sources: "Widmer et al., Lancet 2018 (CHAMPION trial); WHO recommendation on uterotonics 2018",
  },
  {
    id: "mechanism",
    claim: "Carbetocin\u2019s oxytocin receptor mechanism and pharmacokinetics are well characterized",
    tier: "strong",
    tierLabel: "Strong evidence",
    body:
      "Carbetocin is a cyclic analogue of oxytocin with a modified N-terminus (desamino) and a " +
      "C-terminal amide replacement that confers resistance to enzymatic degradation. It binds " +
      "oxytocin receptors (OTR) on uterine smooth muscle with similar affinity to oxytocin, " +
      "producing sustained tetanic contractions. Its half-life of ~40 minutes vs. ~3 minutes for " +
      "oxytocin is the key pharmacokinetic advantage, enabling single-dose administration in the " +
      "operating room without continuous infusion.",
    sources:
      "Engstr\u00f6m et al., Acta Obstet Gynecol Scand 1998; Su et al., Cochrane Review 2012; " +
      "Dansereau et al., Am J Obstet Gynecol 1999",
  },
  {
    id: "single-dose",
    claim: "Single-dose carbetocin is more practical than repeated oxytocin dosing for PPH prevention",
    tier: "moderate",
    tierLabel: "Moderate evidence",
    body:
      "Multiple smaller RCTs and a Cochrane systematic review (Su et al.) suggest that single IV " +
      "carbetocin reduces the need for additional uterotonic agents compared to single-dose oxytocin " +
      "in some settings, with fewer bolus doses required due to its longer duration of action. " +
      "Practical advantages in low-resource settings (no cold chain required for heat-stable " +
      "formulations) are under active investigation. Evidence is solid but heterogeneous across " +
      "delivery mode, dose, and population.",
    sources:
      "Su et al., Cochrane Database Syst Rev 2012; Tuncalp et al., Cochrane review 2012 (uterotonics); " +
      "Gallos et al., Lancet 2018 (uterotonic network meta-analysis)",
  },
  {
    id: "community",
    claim: "Carbetocin has use in wellness, social bonding, or community peptide contexts",
    tier: "none",
    tierLabel: "No evidence",
    body:
      "Despite carbetocin\u2019s membership in the oxytocin family, there is no scientific basis or " +
      "anecdotal report of community use for social bonding, mood, or performance purposes. " +
      "Carbetocin is not available through gray-market channels, is not discussed in community " +
      "peptide forums in this context, and has no pharmacological rationale for non-obstetric " +
      "use that would parallel the (already limited) oxytocin wellness literature.",
    sources: "No relevant literature",
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

export default function CarbetocinEvidencePanel() {
  return (
    <div className="reta-evidence">
      <div className="reta-evidence__context">
        Carbetocin evidence is narrowly focused on its obstetric indication \u2014 PPH prevention
        after cesarean delivery. It has excellent RCT data in that context. There is no community-use
        evidence dimension.
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
