/**
 * AnpSafetyPanel — safety calibration for Atrial Natriuretic Peptide (ANP).
 * Key frame: hypotension is the primary dose-dependent adverse effect in
 * clinical IV use. Native ANP itself has negligible adverse effects given
 * the 2-minute half-life — but analogs (carperitide, nesiritide) have
 * documented clinical safety signals. Renal function monitoring required
 * with natriuretic peptide infusion.
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
    id: "hypotension",
    heading: "Hypotension — dose-dependent vasodilation; primary adverse effect in clinical ANP analog use",
    tier: "flag",
    body: "Hypotension is the principal adverse effect of natriuretic peptide therapy in clinical settings. NPR-A-mediated cGMP production in vascular smooth muscle produces vasodilation — a therapeutically intended effect in heart failure (reducing afterload and preload) that becomes an adverse effect when blood pressure drops below safe thresholds. In the nesiritide clinical experience, symptomatic hypotension occurred in 4-8% of patients at therapeutic doses, with higher rates at higher doses. Carperitide similarly produces hypotension as the dose-limiting adverse effect. In heart failure patients with already-impaired hemodynamic reserve, hypotension can precipitate organ hypoperfusion.",
    context: "Hypotension from natriuretic peptide analog infusion requires continuous blood pressure monitoring and IV infusion rate titration — clinical management requirements that are impossible outside of hospital settings. Community use of any natriuretic peptide compound (if it had any pharmacokinetic rationale, which native ANP does not) would occur without this monitoring infrastructure. Anyone with baseline hypotension, dehydration, or on medications that lower blood pressure faces compounded hypotension risk.",
  },
  {
    id: "renal-function",
    heading: "Renal function — natriuresis and vasodilation can impair renal perfusion at high doses",
    tier: "watch",
    body: "The nesiritide (BNP analog) safety controversy centered significantly on renal function — the ASCEND-HF trial and preceding meta-analyses suggested possible renal harm with nesiritide at higher doses in some patient populations. The proposed mechanism is that while natriuretic peptides improve kidney perfusion in some contexts, excessive vasodilation can reduce renal perfusion pressure (glomerular filtration requires adequate renal artery pressure). The combined effect of natriuresis (reducing fluid volume) and vasodilation (reducing perfusion pressure) may impair renal function in patients with pre-existing renal disease or those who are volume-depleted. This safety signal contributed to nesiritide's market withdrawal.",
    context: "In the clinical context of acute heart failure where these drugs were used, kidney function was monitored continuously. The renal safety concern is specifically relevant for: patients with pre-existing chronic kidney disease, patients who become volume-depleted from aggressive natriuresis, and patients with renal artery stenosis (where renal perfusion is pressure-dependent). These concerns apply to any pharmacologically active natriuretic peptide therapy.",
  },
  {
    id: "electrolyte-natriuresis",
    heading: "Electrolyte balance — sodium loss with natriuresis; potassium monitoring",
    tier: "watch",
    body: "Natriuresis (sodium excretion) from ANP/NPR-A activation reduces serum sodium if sodium intake is insufficient to replace losses. In clinical IV infusion contexts, electrolyte monitoring is continuous. Sustained natriuresis can also affect potassium balance — the relationship between natriuretic peptide effects and potassium handling is complex (aldosterone suppression by ANP's RAAS inhibition may actually increase potassium retention, but the natriuretic effect independently affects potassium). Electrolyte imbalance from natriuretic peptide therapy is a clinical monitoring concern.",
    context: "Any scenario where natriuretic peptide activity is pharmacologically augmented requires electrolyte monitoring. In a community context (where monitoring is absent), unchecked natriuresis creates risk of sodium and potassium imbalance. This concern is moot for native ANP injection (2-minute half-life precludes any pharmacological effect) but would apply to synthetic analogs or neprilysin inhibitors taken without physician supervision.",
  },
  {
    id: "native-anp-negligible",
    heading: "Native ANP itself — negligible adverse effects given the 2-minute half-life",
    tier: "low",
    body: "The paradoxical safety note for native ANP is that it is intrinsically quite safe from a community injection standpoint — not because of low biological activity, but because its pharmacokinetics make it essentially inactive when injected subcutaneously. The 2-3 minute half-life means that by the time any injected ANP could reach a receptor in meaningful concentration, it has been degraded. The adverse effects seen with carperitide and nesiritide occur because those compounds maintain pharmacological concentrations via continuous IV infusion — a pharmacokinetic situation that native ANP injection cannot replicate. Injecting native ANP is primarily a waste of money rather than a safety risk.",
    context: "This low-concern rating is specific to native ANP and is based on pharmacokinetic reasoning (too rapidly cleared to produce adverse effects from intermittent injection) rather than biological safety of the compound at active concentrations. Any analog with a longer half-life, or any scenario where ANP concentration is maintained, would require the hypotension and renal monitoring considerations above.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function AnpSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        ANP&apos;s safety profile is characterized from clinical IV infusion studies of carperitide and nesiritide. Hypotension is the primary dose-dependent adverse effect and requires continuous blood pressure monitoring under clinical conditions. Renal function concerns contributed to nesiritide&apos;s market withdrawal. The paradox for community use: native ANP has negligible adverse effects from subcutaneous injection not because it is safe at active concentrations, but because its 2-minute half-life precludes achieving active concentrations via this route. The safety concerns are real for natriuretic peptide therapy in general, but the pharmacokinetics of native ANP make community injection more pharmacologically inert than dangerous.
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
