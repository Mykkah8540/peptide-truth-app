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
      "Palmitoyl tripeptide-1 has a very low direct toxicity profile consistent with other " +
      "signal peptides approved for cosmetic use. Regulatory safety assessments for Matrixyl " +
      "3000 formulations\u2014which contain this ingredient\u2014have not identified significant " +
      "toxicity signals at concentrations used in commercial products.",
  },
  {
    tier: "watch" as const,
    heading: "Contact sensitization",
    body:
      "Sensitization potential is low but not zero. The GHK tripeptide fragment has a long " +
      "history of cosmetic use and is generally well tolerated. The palmitoyl modification " +
      "adds a fatty acid moiety that could theoretically sensitize susceptible individuals. " +
      "Patch testing is reasonable for individuals with a history of peptide or fatty-acid " +
      "cosmetic reactions.",
  },
  {
    tier: "watch" as const,
    heading: "Broken or compromised skin",
    body:
      "Standard cosmetic caution: the compound is not studied for use on actively inflamed, " +
      "broken, or post-procedure skin. Barrier disruption could alter penetration kinetics " +
      "and the risk profile, although serious events from topical use on compromised skin " +
      "have not been reported in the literature.",
  },
  {
    tier: "flag" as const,
    heading: "Injectable use",
    body:
      "No safety data, no pharmacokinetic data, and no rational clinical basis exists for " +
      "injecting palmitoyl tripeptide-1. It is a cosmetic topical ingredient. Injectable " +
      "use is not established and should not be attempted. This applies regardless of " +
      "concentration or route (subcutaneous, intradermal, or otherwise).",
  },
];

export default function PalmitoylTripeptide1SafetyPanel() {
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
