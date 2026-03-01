const TIER_STYLE = {
  flag: {
    bg: "rgba(220,38,38,0.06)",
    border: "rgba(220,38,38,0.25)",
    label: "Stop",
    labelColor: "#b91c1c",
  },
  watch: {
    bg: "rgba(234,179,8,0.07)",
    border: "rgba(234,179,8,0.35)",
    label: "Watch",
    labelColor: "#92400e",
  },
  low: {
    bg: "rgba(34,197,94,0.06)",
    border: "rgba(34,197,94,0.25)",
    label: "Low Risk",
    labelColor: "#166534",
  },
};

const flags = [
  {
    tier: "low" as const,
    heading: "Direct toxicity (topical use)",
    body:
      "Palmitoyl pentapeptide-4 has one of the cleanest toxicity profiles of any cosmetic " +
      "active. Repeated-dose and acute toxicity studies\u2014required for cosmetic ingredient " +
      "approval in the EU and US\u2014show no significant adverse effects at concentrations " +
      "well above typical formulation levels (0.001\u20130.01%).",
  },
  {
    tier: "watch" as const,
    heading: "Contact sensitization",
    body:
      "Allergic contact sensitization is rare but has been reported. As with any peptide-based " +
      "cosmetic ingredient, individuals with known peptide hypersensitivity or reactive skin " +
      "should patch-test before use. The palmitoyl lipid tail is a theoretical sensitization " +
      "risk in people with existing fatty-acid sensitivities, though clinical reports are " +
      "uncommon.",
  },
  {
    tier: "watch" as const,
    heading: "Use on compromised or broken skin",
    body:
      "The compound is not studied for application to broken, inflamed, or significantly " +
      "compromised skin. Standard cosmetic guidance applies: avoid use on open wounds or " +
      "actively inflamed dermatitis. Enhanced penetration through disrupted barrier may " +
      "alter the risk profile, though serious adverse events from this scenario have not " +
      "been documented.",
  },
  {
    tier: "flag" as const,
    heading: "Injectable use",
    body:
      "Injectable use has not been studied in any capacity\u2014no preclinical toxicology, " +
      "no pharmacokinetics, no safety data. This compound was developed exclusively for " +
      "topical cosmetic use. Injecting a cosmetic peptide ingredient outside of its designed " +
      "route has no rational basis. Do not inject.",
  },
];

export default function PalmitoylPentapeptide4SafetyPanel() {
  return (
    <div className="reta-safety">
      <h2 className="reta-safety__heading">Safety</h2>
      <div className="reta-safety__list">
        {flags.map((f, i) => {
          const t = TIER_STYLE[f.tier];
          return (
            <div
              key={i}
              className="reta-safety__item"
              style={{ background: t.bg, border: `1px solid ${t.border}` }}
            >
              <div className="reta-safety__item-top">
                <span className="reta-safety__item-label" style={{ color: t.labelColor }}>
                  {t.label}
                </span>
                <span className="reta-safety__item-heading">{f.heading}</span>
              </div>
              <p className="reta-safety__item-body">{f.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
