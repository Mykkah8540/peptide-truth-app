/**
 * SS31SafetyPanel — safety calibration for SS-31 (Elamipretide).
 * Key frame: generally well-tolerated in clinical trials; cardiac patients
 * should have physician oversight; D-amino acid synthesis quality is the
 * primary community-specific concern.
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
    id: "cardiac-disease",
    heading: "Active heart disease — clinical trial evidence is in supervised settings",
    tier: "flag",
    body: "The HARP trial evidence was generated in hospitalized HFpEF patients under continuous monitoring with IV infusion. Community self-management of heart failure or other active cardiac conditions using subcutaneous SS-31 without cardiologist involvement is not appropriate. Cardiac disease management requires medical supervision regardless of which therapies are used.",
    context: "If you have heart failure, cardiomyopathy, or active cardiac disease: SS-31 may be relevant to your care — but this requires cardiologist involvement and ideally participation in a clinical trial context, not community self-management.",
  },
  {
    id: "d-amino-acid-quality",
    heading: "Product authenticity — SS-31 requires D-amino acids; L-amino acid versions are pharmacologically different",
    tier: "watch",
    body: "SS-31 (D-Arg-Dmt-Lys-Phe-NH₂) contains two D-amino acids (D-arginine, D-phenylalanine) and an N-methylated tyrosine (2',6'-dimethyltyrosine / Dmt). D-amino acids resist protease degradation, enabling the peptide to reach mitochondria intact. Many community peptide suppliers lack the specialized synthesis capability for D-amino acid incorporation. A product using L-Arg and L-Phe (standard amino acids) would have dramatically shorter half-life and reduced mitochondrial targeting. The pharmacological effect could be negligible.",
    context: "Request a certificate of analysis with mass spectrometry confirming the D-amino acid incorporation. Without this verification, there is no way to know if the product contains the correct stereoisomers. This is not a standard purity concern — it is an identity concern about the specific stereochemistry of the compound.",
  },
  {
    id: "injection-site",
    heading: "Injection site reactions — reported in clinical trials",
    tier: "watch",
    body: "Injection site reactions (pain, erythema, nodule formation) were among the most common adverse events reported in the elamipretide clinical trials with subcutaneous administration. The reactions were generally mild to moderate and did not require dose reduction or discontinuation in most cases. This is a more significant local reaction profile than smaller, simpler peptides.",
    context: "Use proper subcutaneous injection technique with site rotation. Monitor injection sites for progressive reactions (worsening over multiple doses, nodule formation, significant erythema). These reactions may be more pronounced with community products that have different formulations than clinical-grade elamipretide.",
  },
  {
    id: "renal-monitoring",
    heading: "Renal function monitoring in the context of underlying kidney disease",
    tier: "watch",
    body: "The renal evidence for SS-31 is in the context of ischemic kidney disease — where SS-31 is potentially protective. In community use for healthy individuals, no specific renal concern is established. However, given SS-31's concentration in kidney mitochondria and the absence of long-term safety data in healthy subjects, baseline renal function assessment is prudent for ongoing use.",
    context: "Baseline creatinine and estimated GFR before starting SS-31; monitor periodically during extended use. This is a precautionary measure given the kidney's role in clearing the compound and its high renal mitochondrial concentration — not a documented adverse effect in healthy subjects.",
  },
  {
    id: "unknown-long-term",
    heading: "Long-term safety in healthy subjects — not characterized",
    tier: "low",
    body: "The clinical trial data is from disease populations treated for weeks to months. Long-term safety of SS-31 in healthy subjects used for months to years for performance or longevity is not established. No toxicological red flags have emerged from the clinical data, but the safety database for this context is absent.",
    context: "The absence of known serious adverse effects in clinical trials is reassuring but not a full safety profile for long-term community use. Cycle use rather than continuous indefinite administration is the prudent community convention given the unknowns.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function SS31SafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        SS-31 has been generally well-tolerated in clinical trials — no dose-limiting toxicities and manageable injection site reactions. The primary safety consideration for community use is not the compound&apos;s intrinsic toxicity; it is the product quality issue (D-amino acid stereochemistry verification) and the appropriate caution required if using with active cardiac disease. Healthy individuals using SS-31 for performance or longevity purposes have a different and less-characterized risk/benefit profile than clinical trial patients.
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
