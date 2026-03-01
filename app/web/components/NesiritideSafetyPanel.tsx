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
    id: "nes-hypotension",
    heading: "Hypotension \u2014 most common serious adverse effect",
    tier: "flag",
    body:
      "Symptomatic hypotension is the primary and most clinically serious adverse effect of nesiritide. ASCEND-HF reported symptomatic hypotension in 7.1% of nesiritide patients vs. 4.0% of placebo (p<0.001). The vasodilatory mechanism is the therapeutic benefit and the risk simultaneously \u2014 the same NPR-A/cGMP pathway that reduces preload and afterload can lower blood pressure to dangerous levels, particularly in patients with baseline systolic BP below 100 mmHg. Continuous blood pressure monitoring is mandatory during IV administration.",
    context:
      "Nesiritide is contraindicated when systolic BP is below 90 mmHg. Reduction or cessation of infusion typically reverses hypotension within 30\u201360 minutes given the drug\u2019s 18-minute half-life. This cannot be managed without monitoring equipment \u2014 there is no safe self-administration scenario.",
  },
  {
    id: "nes-renal",
    heading: "Renal function worsening",
    tier: "watch",
    body:
      "ASCEND-HF showed a non-significant trend toward worsening serum creatinine with nesiritide (worsening in 31.4% nesiritide vs. 29.5% placebo; p=0.11). While this did not reach statistical significance, an earlier meta-analysis (Sackner-Bernstein et al., JAMA 2005) suggested increased risk of worsening renal function. The concern is plausible mechanistically: vasodilation can reduce renal perfusion pressure in patients with borderline renal function. Cardiorenal syndrome patients are at particular risk.",
    context:
      "Monitor creatinine and BUN during nesiritide therapy. Avoid in patients with significant baseline renal impairment unless the clinical calculus clearly favors benefit. The ADHF management team must balance diuresis goals against renal function trends.",
  },
  {
    id: "nes-iv-incompatibility",
    heading: "IV incompatibility with co-infused drugs",
    tier: "watch",
    body:
      "Nesiritide is physically incompatible with several drugs commonly used in ADHF management when mixed in the same IV line. Confirmed incompatibilities include heparin (which binds nesiritide, reducing its activity), regular insulin, furosemide, enalaprilat, hydralazine, and bumetanide in the same line. These are not abstract theoretical interactions \u2014 they represent a practical medication safety issue in the ICU/CCU setting.",
    context:
      "Nesiritide must be administered through a dedicated IV line, or the line must be flushed thoroughly before and after co-administration of incompatible drugs. Review the prescribing information\u2019s compatibility table before any co-infusion.",
  },
  {
    id: "nes-arrhythmia",
    heading: "Arrhythmogenic risk",
    tier: "low",
    body:
      "Nesiritide does not have significant arrhythmogenic potential. The NPR-A/cGMP pathway does not directly affect cardiac electrical conduction. ASCEND-HF and prior trials did not show an excess of arrhythmic events. This is a meaningful reassurance in the ADHF setting, where patients are often at baseline arrhythmia risk from their underlying cardiomyopathy.",
    context:
      "The absence of arrhythmia risk is a relative advantage of nesiritide compared to inotropic agents (dobutamine, dopamine) used in severe ADHF \u2014 which carry proarrhythmic risk. This is one reason nesiritide retained a niche in patients who need vasodilation without inotropic support.",
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

export default function NesiritideSafetyPanel() {
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
