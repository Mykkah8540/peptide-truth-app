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
    id: "thymulin-immunocompromised",
    heading: "Use in immunocompromised patients \u2014 unknown and potentially significant risk",
    tier: "flag",
    body:
      "Thymulin modulates T-cell differentiation and immune polarization. In immunocompromised individuals \u2014 those on immunosuppressive therapy after organ transplant, patients with HIV, individuals receiving chemotherapy, or those with primary immunodeficiencies \u2014 immune modulation by an insufficiently characterized compound carries unpredictable risk. The concern is bidirectional: thymulin could theoretically destabilize a carefully managed immune state (e.g., tipping a transplant patient toward rejection or exacerbating graft-versus-host dynamics) or conversely overactivate an already dysregulated immune system. There are no human data to characterize these risks.",
    context:
      "Exogenous thymulin should not be used in immunocompromised patients outside of clinical trial conditions with appropriate oversight. This is not a theoretical precaution \u2014 immune-modulatory peptides in immunocompromised populations have produced unexpected adverse events in other research contexts.",
  },
  {
    id: "thymulin-autoimmune",
    heading: "Autoimmune disease \u2014 screen before use",
    tier: "flag",
    body:
      "Thymulin promotes T-cell differentiation and is involved in establishing immune self-tolerance in the thymus. Exogenous thymulin administration in individuals with active or subclinical autoimmune disease introduces the theoretical risk of amplifying autoreactive T-cell activity or shifting immune polarization in a direction that worsens autoimmune activity. Lupus, rheumatoid arthritis, multiple sclerosis, Hashimoto\u2019s thyroiditis, and type 1 diabetes are particular concerns. Conversely, some animal model data suggest regulatory immune effects, but these are not clinically validated and cannot be relied upon to predict human autoimmune response.",
    context:
      "Personal and family history of autoimmune disease should be thoroughly assessed before considering thymulin. Active autoimmune disease is a relative-to-absolute contraindication pending human safety data. Even subclinical autoimmune markers (positive ANA, anti-dsDNA, thyroid antibodies) warrant caution.",
  },
  {
    id: "thymulin-unknown-profile",
    heading: "Completely unknown long-term safety profile \u2014 no human trial data",
    tier: "flag",
    body:
      "The absence of clinical trial safety data is the most fundamental safety concern for thymulin. There is no established safe dose range, no dose-response safety curve, no pharmacokinetics data in humans, no maximum tolerated dose data, and no long-term exposure safety record. Claims about safe dosing protocols circulating in wellness communities are derived from animal studies or extrapolation \u2014 not from human clinical data. The risks are genuinely unknown, which is distinct from \u201crisk is low.\u201d Unknown risk is not the same as low risk.",
    context:
      "If considering thymulin for personal use, this is unambiguously experimental use of a compound with no human safety characterization. Decisions should be made with explicit acknowledgment of that fact, ideally with physician oversight and baseline immune function testing.",
  },
  {
    id: "thymulin-zinc-interference",
    heading: "Zinc metabolism interference \u2014 co-administration considerations",
    tier: "watch",
    body:
      "Because thymulin activity is zinc-dependent, co-administered zinc status matters. High-dose zinc supplementation (above approximately 40 mg/day elemental zinc) can paradoxically impair immune function through several mechanisms including copper depletion, interference with neutrophil function, and altered cytokine production. Zinc toxicity from supplementation can mimic or exacerbate the immunological picture thymulin is intended to address. The interplay between exogenous thymulin, endogenous thymulin activity, and zinc homeostasis is not characterized in humans.",
    context:
      "If using zinc to support thymulin activity, stay within the tolerable upper intake level (40 mg/day elemental zinc for adults). Monitor for signs of zinc excess: nausea, impaired taste, reduced copper levels, immune dysfunction. Baseline zinc and copper status is reasonable to assess.",
  },
  {
    id: "thymulin-injection-site",
    heading: "Injection site reactions and sterility concerns",
    tier: "watch",
    body:
      "Thymulin obtained outside clinical trials is typically from compounding pharmacies or grey-market research chemical suppliers without regulatory oversight. Purity, potency, and sterility cannot be guaranteed. Injection site reactions \u2014 redness, swelling, induration, abscess \u2014 are possible with any subcutaneous injection of unverified preparations. The peptide itself, if pure, is not expected to be particularly irritating at low doses, but excipient variation and contamination are real risks with unregulated products.",
    context:
      "Standard injection hygiene practices apply. Do not inject from multi-use vials without proper sterile handling. If purchasing from non-pharmaceutical sources, there is no guarantee of what is actually in the vial.",
  },
  {
    id: "thymulin-direct-toxicity",
    heading: "Direct peptide toxicity at therapeutic doses",
    tier: "low",
    body:
      "The thymulin nonapeptide itself, based on animal toxicology data, does not appear to have direct organ toxicity at the doses used in research settings. The peptide is small, rapidly cleared, and does not have known off-target receptor interactions that would predict direct harm. This is a low concern designation for the peptide\u2019s direct biochemical toxicity \u2014 distinct from the immune modulation uncertainty above, which is a separate and more significant consideration.",
    context:
      "Low direct toxicity does not mean low overall risk. The immune modulation uncertainty significantly outweighs the low direct toxicity signal for most patient contexts.",
  },
];

export default function ThymulinSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Thymulin\u2019s safety profile is characterized primarily by what we don\u2019t know. The absence of
        human clinical data means the key safety concerns are not about established adverse effects
        \u2014 they are about unpredictable immune consequences in immunocompromised or autoimmune patients,
        and the complete absence of a validated safe dosing range. The direct toxicity of the peptide
        itself appears low; the immune-modulatory uncertainty is the real concern.
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
