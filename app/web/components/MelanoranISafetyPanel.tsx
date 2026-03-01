type Tier = "flag" | "watch" | "low";

interface SafetyItem {
  id: string;
  heading: string;
  tier: Tier;
  body: string;
  context: string;
}

const SAFETY_ITEMS: SafetyItem[] = [
  {
    id: "mt1-melanoma",
    heading: "Melanoma risk \u2014 MC1R agonism and nevi surveillance",
    tier: "flag",
    body:
      "MC1R agonism stimulates melanocyte activity. In individuals with dysplastic nevi, high nevus count (>50 moles), personal or family history of melanoma, or MC1R risk alleles (fair skin, red hair phenotype), this stimulation may accelerate melanocyte proliferation in existing lesions. This is why the FDA-approved afamelanotide program requires a REMS with mandatory dermatology surveillance. The research peptide community provides none of this screening or monitoring.",
    context:
      "If you have dysplastic nevi, a personal or family history of melanoma, or significant photodamage, MT-I/afamelanotide without dermatology monitoring is a meaningful risk. This is not a theoretical concern \u2014 it is the regulatory rationale for the Scenesse REMS.",
  },
  {
    id: "mt1-nausea",
    heading: "Nausea and flushing",
    tier: "watch",
    body:
      "Nausea and facial/skin flushing are among the most common adverse effects of afamelanotide in clinical trials \u2014 reported in 10\u201330% of EPP patients depending on trial and dose. These typically occur in the hours following implant/injection and resolve. Community users injecting non-pharmaceutical-grade MT-I may experience the same.",
    context:
      "Usually self-limiting and manageable. Not a reason to stop unless severe or accompanied by other symptoms. Slower titration (lower starting doses) reduces severity.",
  },
  {
    id: "mt1-pigment",
    heading: "Skin pigmentation changes and nevi changes",
    tier: "watch",
    body:
      "MT-I causes diffuse skin darkening \u2014 that is its intended effect. Less expectedly, it can also alter existing nevi (moles), making them darker or changing their character. In the EPP trial program, new nevi and nevi changes were reported as adverse events requiring dermatology evaluation. These changes are not inherently malignant, but they require professional assessment to distinguish benign from concerning.",
    context:
      "Any new moles, changes in existing moles, or asymmetric pigmentation changes during MT-I use should be evaluated by a dermatologist. This is not optional \u2014 it is the core reason the FDA-approved version exists within a REMS framework.",
  },
  {
    id: "mt1-cardiovascular",
    heading: "Cardiovascular and sexual side effects (lower than MT-II)",
    tier: "low",
    body:
      "MT-I\u2019s selectivity for MC1R means it does not substantially activate MC4R (the receptor responsible for melanotan-II\u2019s sexual arousal and erectile effects) or MC3R. Cardiovascular effects and spontaneous erections that are common with MT-II are significantly reduced or absent with MT-I. This is a genuine pharmacological difference, not just marketing.",
    context:
      "MT-I is the safer choice relative to MT-II from a cardiovascular/sexual side effect standpoint. This does not eliminate the melanoma surveillance concern.",
  },
];

const TIER_STYLE: Record<
  Tier,
  { bg: string; border: string; label: string; labelColor: string }
> = {
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

export default function MelanoranISafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__list">
        {SAFETY_ITEMS.map((item) => {
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
