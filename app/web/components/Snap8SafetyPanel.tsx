type Tier = "flag" | "watch" | "low";

interface SafetyItem {
  id: string;
  heading: string;
  tier: Tier;
  body: string;
  context: string;
}

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag: {
    bg: "rgba(158,56,0,0.07)",
    border: "rgba(158,56,0,0.20)",
    label: "Stop signal",
    labelColor: "#9e3800",
  },
  watch: {
    bg: "rgba(124,82,0,0.06)",
    border: "rgba(124,82,0,0.17)",
    label: "Worth watching",
    labelColor: "#7c5200",
  },
  low: {
    bg: "rgba(21,100,58,0.05)",
    border: "rgba(21,100,58,0.13)",
    label: "Low concern",
    labelColor: "#155e38",
  },
};

const ITEMS: SafetyItem[] = [
  {
    id: "snap8-contact-sensitivity",
    heading: "Contact sensitization (topical)",
    tier: "watch",
    body:
      "Like all peptide-containing cosmetics, Snap-8 formulations carry a theoretical risk of contact sensitization in susceptible individuals \u2014 particularly those with compromised skin barrier function, eczema, or known peptide allergies. Sensitization to one peptide cosmetic can occasionally generalize to others. The overall incidence is low, but the watch designation applies because sensitization, once established, is permanent.",
    context:
      "Patch-test before widespread use if you have a history of cosmetic allergies. Discontinue if redness, itching, or swelling develops and persists beyond 24 hours of first application.",
  },
  {
    id: "snap8-periorbital-caution",
    heading: "Periorbital use with compromised skin barrier",
    tier: "watch",
    body:
      "Snap-8 is frequently marketed for the eye area. The periorbital skin is thinner than facial skin elsewhere, and absorption (while still minimal) is relatively higher. In individuals with periorbital eczema, rosacea, or broken skin, there is a greater likelihood of irritant or allergic response, and a marginally higher theoretical systemic exposure through mucosal adjacency.",
    context:
      "Avoid direct application to the eyelid margin or directly below the lash line if skin is inflamed or compromised. Standard cosmetic placement (outer canthus, under-eye zone on intact skin) carries low risk.",
  },
  {
    id: "snap8-systemic-absorption",
    heading: "Systemic absorption and neuromuscular effects",
    tier: "low",
    body:
      "The theoretical concern \u2014 that a SNARE-complex inhibitor reaching the bloodstream could impair neuromuscular transmission broadly \u2014 is not practically realized with topical application. Studies on similar peptides (Argireline, Leuphasyl) show negligible transdermal flux under standard formulation conditions. There is no clinical report of systemic neuromuscular adverse events from topical SNARE-targeting cosmetics.",
    context:
      "Not a realistic safety concern for topical use. Would only become relevant in the (currently hypothetical) scenario of injected delivery or severely compromised skin barrier over large body surface area.",
  },
  {
    id: "snap8-pregnancy",
    heading: "Use during pregnancy or breastfeeding",
    tier: "low",
    body:
      "No reproductive toxicity data exist for Snap-8 specifically. Given negligible systemic absorption from topical use and the general principle that cosmetic peptides do not reach the fetus via the transdermal route, the risk is considered low in standard cosmetic use. However, the absence of dedicated safety data means precautionary avoidance is a defensible personal choice.",
    context:
      "No contraindication per regulatory standards; individual risk tolerance may vary. No specific flag from major regulatory bodies.",
  },
  {
    id: "snap8-no-injectable-safety",
    heading: "Injectable use \u2014 no safety data",
    tier: "flag",
    body:
      "Snap-8 is not formulated, sterilized, or tested for injectable use. Injecting a topical cosmetic peptide carries real risks: contamination, immune reaction, granuloma formation, and exposure to excipients (preservatives, solvents) not designed for parenteral delivery. There is zero clinical safety data for injected Snap-8. This is not a gray area.",
    context:
      "Do not inject topical cosmetic formulations. If you encounter claims promoting injected Snap-8 as a \u201ctopical Botox alternative,\u201d treat those claims with appropriate skepticism and distance.",
  },
];

export default function Snap8SafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Snap-8\u2019s safety story is overwhelmingly positive for its intended use \u2014 topical cosmetic
        application on intact skin. The only genuine stop signal applies to injectable use, which has
        no legitimate basis for this compound. The watch items below are standard precautions for any
        active cosmetic ingredient.
      </div>
      <div className="reta-safety__list">
        {ITEMS.map((item) => {
          const st = TIER_STYLE[item.tier];
          return (
            <div
              key={item.id}
              className="reta-safety__entry"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-safety__entry-top">
                <div className="reta-safety__entry-heading">{item.heading}</div>
                <div
                  className="reta-safety__entry-tier"
                  style={{ color: st.labelColor, borderColor: st.border }}
                >
                  {st.label}
                </div>
              </div>
              <div className="reta-safety__entry-body">{item.body}</div>
              <div className="reta-safety__entry-context">{item.context}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
