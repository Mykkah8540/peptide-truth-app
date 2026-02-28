/**
 * HumaninSafetyPanel — safety calibration for Humanin.
 * Key frame: JAK2/STAT3 activation creates a theoretical cancer concern;
 * no established serious adverse effects; safety profile is largely
 * unknown because human data is absent.
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
    id: "cancer-jak-stat3",
    heading: "Active cancer — JAK2/STAT3 activation has cancer cell pro-survival implications",
    tier: "flag",
    body: "Humanin's primary protective mechanism involves JAK2/STAT3 signaling — a well-characterized pro-survival pathway. STAT3 is constitutively activated in many cancer types and drives cancer cell survival, proliferation, and immune evasion. Activating JAK2/STAT3 signaling in the context of active malignancy could theoretically support cancer cell survival in the same way it supports neuron survival. This is not a documented adverse effect — it is mechanistic reasoning from established cancer biology.",
    context: "Active cancer: avoid humanin or use only with oncology guidance that has specifically considered the STAT3 pathway context of the cancer type. The concern is greatest for cancer types with established STAT3-driven progression (hepatocellular carcinoma, some lymphomas, breast cancer subtypes). This is a caution, not a proven harm — but the mechanism is real.",
  },
  {
    id: "unknown-human-safety",
    heading: "Overall human safety profile — essentially uncharacterized",
    tier: "watch",
    body: "Because no human clinical trials have been conducted with exogenous humanin injection, the safety profile is not established. Adverse effects from subcutaneous humanin injection in humans — both common (injection site reactions, acute tolerability) and serious (systemic effects, organ function) — are not documented in a systematic way. Safety is extrapolated from: (1) rodent studies showing acceptable tolerability, (2) the fact that endogenous humanin is a normal component of human physiology.",
    context: "The absence of documented adverse effects is not evidence of safety — it reflects the absence of data. Community users who report tolerability are providing anecdotal safety data with no validated endpoints. Start at low doses, monitor basic function (liver enzymes, CBC if accessible), and report any unusual symptoms.",
  },
  {
    id: "native-vs-hng",
    heading: "Native humanin vs HNG (Gly14-humanin) — most preclinical data uses the analog",
    tier: "watch",
    body: "Most preclinical efficacy data uses HNG (Gly14-humanin), a synthetic analog that is approximately 1000× more potent than native humanin. Community products may contain native humanin, HNG, or an unlabeled mixture. If a product contains HNG at doses calibrated for native humanin, the effective potency could be dramatically higher than intended. Whether the safety profile of HNG differs from native humanin at equivalent biological activity levels is not established.",
    context: "When purchasing humanin, verify whether the product is native humanin (21 AA) or HNG. Dose calculations used in rodent studies are not directly transferable to humans regardless of which form is used.",
  },
  {
    id: "injection-site",
    heading: "Injection site reactions — standard peptide considerations",
    tier: "low",
    body: "As a 21-amino-acid peptide, humanin is small enough for standard solid-phase synthesis. Subcutaneous injection of correctly manufactured humanin would be expected to have standard peptide tolerability — injection site discomfort, potential localized reactions. No unusual injection site concerns beyond standard peptide practice.",
    context: "Standard subcutaneous injection technique applies. Rotate injection sites. If unusual reactions occur (persistent pain, nodules, significant swelling), stop use and evaluate.",
  },
  {
    id: "reproductive-effects",
    heading: "Reproductive and reproductive axis effects — not characterized",
    tier: "low",
    body: "Humanin is expressed in ovarian granulosa cells and has been studied in follicle biology. It appears to have anti-apoptotic effects in granulosa cells during follicular atresia. Whether exogenous humanin affects reproductive function, fertility, or reproductive hormones in humans is not established. The reproductive biology effects are not a primary safety concern but warrant awareness.",
    context: "Not a hard stop, but humanin's expression in reproductive tissues means its effects on reproductive function warrant monitoring if fertility is a current concern.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function HumaninSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Humanin&apos;s safety profile is largely unknown because human interventional data is absent. The primary theoretical concern is JAK2/STAT3 activation in a cancer context — this is a mechanistically real concern that warrants caution in anyone with active malignancy. The native vs HNG identity question matters for dose interpretation. For most healthy adults without cancer, humanin is more likely understudied than actively dangerous — but that distinction should not be conflated with established safety.
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
