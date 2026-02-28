/**
 * SomatostatinSafetyPanel — safety calibration for Somatostatin (SRIF).
 * Key frame: native somatostatin itself has low toxicity given its rapid clearance;
 * the safety concerns are class-effect considerations from SSTR pharmacology —
 * glucose paradox (inhibits both insulin and glucagon), gallstone risk (analog
 * class effect), bradycardia at high doses. Most concerns are relevant to analogs
 * more than native somatostatin due to half-life differences.
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
    id: "glucose-paradox",
    heading: "Hypoglycemia paradox — somatostatin inhibits both insulin AND glucagon; net glucose effect is complex and context-dependent",
    tier: "flag",
    body: "This is the most important safety concept for somatostatin pharmacology. Somatostatin inhibits both insulin secretion (which would raise blood glucose) and glucagon secretion (which would lower blood glucose, since glucagon raises glucose). The net effect on blood glucose depends on the baseline state, relative magnitude of each inhibition, and counter-regulatory responses. In euglycemic subjects during IV infusion, blood glucose often rises modestly (insulin inhibition dominates). However, if hypoglycemia is already present, somatostatin removes the glucagon counter-regulatory response — the physiological mechanism that rescues the brain from hypoglycemia. This creates the paradoxical risk: somatostatin used in the context of hypoglycemia can worsen it by removing the glucagon rescue signal.",
    context: "Anyone using insulin (type 1 or type 2 diabetes), sulfonylureas, or other hypoglycemic agents: the somatostatin pathway (via analogs) requires careful glucose monitoring and dose adjustment. The glucagon counter-regulatory impairment is why octreotide use in diabetics requires specialist oversight. Community use of any somatostatin compound alongside hypoglycemic medications requires explicit endocrinology discussion — this is not a theoretical risk, it is a documented pharmacological mechanism.",
  },
  {
    id: "gallstone-risk",
    heading: "Gallstone formation — impaired gallbladder motility; class effect of SSTR signaling",
    tier: "watch",
    body: "Somatostatin and its analogs inhibit cholecystokinin (CCK)-stimulated gallbladder contraction and reduce bile flow. This reduces gallbladder emptying, which leads to bile stasis and increased cholesterol crystal nucleation — the precursor to gallstone formation. Gallstone incidence increases significantly with long-acting analog use: approximately 20-30% of patients on long-term octreotide develop new gallstones or biliary sludge. For native somatostatin with a 90-second half-life, acute gallbladder effects would be transient and unlikely to cause stones. But this risk is the reference frame for understanding the class effect if considering any analog.",
    context: "For native somatostatin: the half-life makes gallstone risk from community dosing unlikely — any gallbladder motility inhibition would resolve within minutes of clearance. For octreotide or lanreotide (the analogs): baseline ultrasound before starting and periodic monitoring for gallbladder disease is standard of care. Ursodeoxycholic acid prophylaxis is sometimes used in high-risk patients on long-term analogs.",
  },
  {
    id: "bradycardia-cardiac",
    heading: "Bradycardia and cardiac effects — dose-dependent at high IV doses; relevant primarily for analog use",
    tier: "watch",
    body: "Somatostatin receptors are expressed in cardiac tissue. High-dose IV somatostatin infusion can produce bradycardia and prolonged P-R interval in some subjects. This is more relevant to pharmacological (IV) doses than to subcutaneous community dosing of native somatostatin (where the dose and duration are limited by the half-life). With long-acting analogs, clinically significant bradycardia is uncommon at standard doses but has been reported. The cardiac effect is worth noting as a class effect of SSTR signaling.",
    context: "For native somatostatin at community doses: cardiac effects are unlikely to be clinically significant given the brief exposure. For octreotide or other analogs: baseline ECG is reasonable in patients with existing cardiac disease or conduction abnormalities before starting. Any palpitations, bradycardia, or dizziness during analog therapy should be reported to the prescribing physician.",
  },
  {
    id: "rebound-surge",
    heading: "Rebound GH surge after stopping — a class pharmacodynamic effect",
    tier: "watch",
    body: "Cessation of somatostatin infusion or analog discontinuation can produce a rebound GH surge above baseline. This reflects the pulsatile GH architecture: somatostatin withdrawal is one of the physiological triggers for GH pulse initiation. A rebound surge after any somatostatin pathway intervention is expected pharmacologically. For native somatostatin with a 90-second half-life, the rebound would occur within minutes of any IV infusion stopping. For analogs, rebound can last days to weeks depending on the formulation.",
    context: "The rebound GH surge has implications for anyone using somatostatin pathway compounds for GH management — stopping is not simply returning to baseline, it can temporarily overshoot. This is a consideration for timing any breaks in analog therapy and should be planned with the treating physician, not self-managed.",
  },
  {
    id: "native-acute-toxicity",
    heading: "Native somatostatin acute toxicity — low, given rapid clearance",
    tier: "low",
    body: "Native somatostatin itself has low acute toxicity. The 90-second half-life means any adverse pharmacodynamic effect (glucose dysregulation, GI effects) is self-limiting — it resolves as the peptide is cleared. The peptide is small (14 AA cyclic), well-tolerated in IV infusion studies at physiology-relevant doses, and does not accumulate. The primary concerns are not acute toxicity from the peptide itself but the pharmacodynamic consequences of SSTR activation — which are transient for native somatostatin.",
    context: "The low acute toxicity of native somatostatin is somewhat reassuring for the peptide itself — but not a green light for community use, because the pharmacokinetic argument against meaningful efficacy by subcutaneous injection remains. You cannot dose your way to sustained effect with a 90-second half-life compound by increasing the bolus.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function SomatostatinSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Somatostatin&apos;s safety profile is dominated by its pharmacodynamics rather than toxicity. Native somatostatin itself has low acute toxicity given its rapid clearance. The critical safety concern is the glucose paradox: somatostatin inhibits both insulin and glucagon, creating complex glucose effects that become dangerous if glucagon&apos;s counter-regulatory role is impaired during hypoglycemia. Gallstone risk and bradycardia are class effects relevant primarily to long-acting analogs. For native somatostatin in community use, the safety concerns are less severe than for analogs — but the pharmacokinetic argument against efficacy remains unchanged.
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
