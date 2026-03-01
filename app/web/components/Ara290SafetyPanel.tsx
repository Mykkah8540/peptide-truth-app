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
    id: "ara290-limited-data",
    heading: "Limited human safety data",
    tier: "watch",
    body:
      "ARA-290&apos;s entire human safety record comes from a handful of small trials enrolling fewer than 200 patients total. No large-scale Phase 3 safety study exists. Long-term safety (beyond 28-day trial periods) is uncharacterized. Rare adverse events would not be detectable in trials of this size, and the incidence of events seen in larger populations is unknown.",
    context:
      "This is a structural limitation of the research base, not a specific signal. The absence of major adverse events in small trials is reassuring but not definitive. Anyone using ARA-290 outside a clinical trial is accepting uncertainty about safety that cannot be quantified from published data.",
  },
  {
    id: "ara290-hypoglycemia",
    heading: "Potential hypoglycemia",
    tier: "watch",
    body:
      "Some ARA-290 studies have reported glucose-lowering effects, potentially through improved peripheral insulin sensitivity via IRR-mediated pathways in metabolic tissues. In patients with diabetes on insulin or oral hypoglycemics, this could contribute to hypoglycemia. The magnitude and consistency of this effect across patients is not well-characterized.",
    context:
      "Patients with diabetes who are using insulin, sulfonylureas, or other glucose-lowering agents should monitor blood glucose more frequently if using ARA-290. The effect may be variable and context-dependent; not all trials have reported consistent glucose changes.",
  },
  {
    id: "ara290-research-quality",
    heading: "Research compound quality and sourcing",
    tier: "watch",
    body:
      "ARA-290 is not manufactured to pharmaceutical GMP standards for community use. Research-grade peptides from commercial suppliers vary in purity, sterility, and peptide content. Endotoxin contamination, incorrect sequence, and degradation products are documented quality issues with non-pharmaceutical peptide sources. The trial formulation (IV, pharmaceutical-grade) is not equivalent to community subcutaneous use of research peptides.",
    context:
      "Subcutaneous vs. IV administration may affect bioavailability and local tolerability. The published trials used IV administration; subcutaneous pharmacokinetics in humans are not characterized. Community sourcing from research chemical suppliers provides no assurance of the quality standards used in trials.",
  },
  {
    id: "ara290-no-epo-effect",
    heading: "No erythropoietic effect (by design)",
    tier: "low",
    body:
      "ARA-290 was engineered specifically to avoid binding the EpoR homodimer responsible for red blood cell production. In vitro and in vivo studies confirm no hematopoietic stimulation &mdash; no increase in hematocrit, hemoglobin, or reticulocytes. This distinguishes it from EPO analogues used in doping, which carry cardiovascular risks from blood viscosity increases.",
    context:
      "The absence of erythropoietic effect is a genuine differentiating feature. Athletes considering EPO for performance enhancement should note that ARA-290 does not provide VO2max benefit via hematocrit elevation. Its only potential performance-relevant effects would be through nerve repair or anti-inflammatory mechanisms, which are speculative in athletic contexts.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function Ara290SafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        ARA-290 has no identified catastrophic safety signals in small trials, but its safety
        profile is simply too underpowered to characterize. The dominant risks are those inherent
        to any unregulated research peptide: unknown long-term effects, uncertain product quality,
        and no established dosing framework for community use.
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
