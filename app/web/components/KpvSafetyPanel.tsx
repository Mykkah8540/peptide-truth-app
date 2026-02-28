/**
 * KpvSafetyPanel — safety calibration for KPV (Lys-Pro-Val).
 * Key frame: active cancer is the most important flag (MC1R partial agonism
 * in a cancer context warrants caution). The oral delivery route has
 * limited systemic absorption concerns. Injectable route creates systemic
 * MC1R exposure that is not characterized in humans.
 */

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
    id: "cancer",
    heading: "Active cancer — MC1R partial agonism in a cancer context warrants caution",
    tier: "flag",
    body: "MC1R (melanocortin 1 receptor) is expressed on melanocytes and some tumor cell types including melanoma. Alpha-MSH and its analogs have complex relationships with melanoma — MC1R activation on melanocytes promotes melanin production and may influence melanocyte proliferation. While KPV is a partial agonist (lower intrinsic efficacy than full alpha-MSH), the implications of sustained MC1R partial agonism in individuals with active melanoma, melanocyte dysplasia, or elevated melanoma risk are not characterized. Additionally, cancer patients on immunosuppressive therapies (chemotherapy, targeted agents, immunotherapy) represent a population where an anti-inflammatory peptide with immune-modulating properties creates unpredictable interactions with the treatment regimen.",
    context: "Anyone with active cancer — particularly melanoma, skin cancers with MC1R expression, or cancer involving the gastrointestinal tract — should not use KPV without oncologist guidance. The MC1R partial agonism creates an uncharacterized signal in a cancer context. Cancer patients on active treatment have complex immune states where additional immunomodulatory compounds require oncologist review.",
  },
  {
    id: "immunosuppressive-therapy",
    heading: "Immunosuppressive therapy for IBD or autoimmune disease — mechanistic overlap creates uncertain interaction",
    tier: "watch",
    body: "IBD is commonly treated with immunosuppressive medications — corticosteroids (prednisone, budesonide), thiopurines (azathioprine, 6-mercaptopurine), biologics (anti-TNF: infliximab, adalimumab; anti-integrin: vedolizumab; anti-IL-12/23: ustekinumab). KPV's anti-inflammatory mechanism (NF-κB inhibition, MC1R-mediated immune modulation) operates through pathways that overlap with or are distinct from these medications. The interaction is not pharmacokinetic but pharmacodynamic — additive immunosuppression, altered therapeutic response, or interference with treatment monitoring are theoretical concerns that have not been studied.",
    context: "On any immunosuppressive therapy for IBD or autoimmune disease: discuss KPV use with the gastroenterologist or rheumatologist. The interaction risk is primarily that additional anti-inflammatory mechanisms may obscure disease activity assessments or create unexpected combined immunosuppression. KPV should not replace established IBD therapy — if considering it as adjunct, physician awareness and monitoring are required.",
  },
  {
    id: "oral-formulation-variability",
    heading: "Oral formulation quality — not all oral KPV preparations are equivalent for GI delivery",
    tier: "watch",
    body: "The IBD research rationale for KPV specifically involves optimized delivery to inflamed colonic tissue — studies have used nanoparticle encapsulation, hydrogel systems, and colonic-release capsules. Simple oral KPV powder in gelatin capsules may or may not achieve comparable colonic bioavailability. Gray-market KPV formulations are unlikely to replicate the optimized delivery systems used in research. The efficacy difference between a research-grade colonic-release formulation and a standard oral capsule is unknown but potentially significant for the IBD indication.",
    context: "If using oral KPV for IBD, understand that the formulation matters — research evidence used optimized delivery systems. Standard peptide capsules from gray-market sources may have significantly different colonic bioavailability. This does not make oral capsules useless — some evidence suggests free KPV achieves some efficacy — but the efficacy comparison to research formulations is unknown.",
  },
  {
    id: "systemic-injection-unknowns",
    heading: "Subcutaneous injection route — systemic MC1R exposure not characterized in humans",
    tier: "watch",
    body: "While animal studies have used subcutaneous KPV injection, this route bypasses the targeted GI delivery rationale and produces systemic peptide exposure. Systemic MC1R partial agonism in humans at injection doses has not been studied. Pigmentation effects (MC1R on melanocytes), HPA axis effects (MC1R and MC1R-adjacent signaling on stress axis), and immune system effects at systemic concentrations differ from local GI mucosal effects. The injection route is not specifically supported by the IBD evidence base and creates a different pharmacological exposure than the research literature.",
    context: "If using injectable KPV rather than oral: understand that the evidence base for IBD specifically supports oral delivery to GI tissue. Injectable KPV has different distribution, receptor exposure, and effects that are not validated. Pigmentation changes (tan skin response, mole darkening) would be a signal of MC1R activation and should prompt dose reconsideration.",
  },
  {
    id: "systemic-absorption-oral",
    heading: "Systemic absorption from oral KPV — generally low; not a primary safety concern",
    tier: "low",
    body: "For oral KPV used for GI indications, systemic absorption is expected to be limited — the mechanism relies on local colonic delivery rather than systemic circulation. Limited systemic absorption means limited systemic MC1R effects from the oral route. This is generally a safety advantage of the oral delivery rationale. However, if very high oral doses are used (exceeding what is locally absorbed in the colon), some systemic exposure may occur.",
    context: "The limited systemic absorption from oral KPV is a feature, not a bug — it means the safety concerns about systemic MC1R effects are less applicable to the oral route. Use doses consistent with those studied in animal models (scaled appropriately) rather than escalating doses that might push systemic exposure.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function KpvSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        KPV&apos;s safety profile is incompletely characterized due to the absence of human studies. The primary safety flag is active cancer — particularly melanoma — because MC1R partial agonism in a cancer context is not characterized. For oral use in IBD, the limited systemic absorption reduces concern about systemic MC1R effects. Injectable use creates systemic exposure that is uncharacterized in humans. Immunosuppressive drug interactions are a practical watch item for the IBD population most likely to use this compound. There are no documented human adverse events from KPV, but the evidence base for absence of harm is thin.
      </div>
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
