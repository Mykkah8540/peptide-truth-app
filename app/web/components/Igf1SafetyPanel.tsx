/**
 * Igf1SafetyPanel — proactive safety intelligence for IGF-1.
 * Key frame: this is the highest-risk compound covered on this site for healthy adults.
 * Hypoglycemia: acute, documented, has caused hospitalizations and deaths in non-medical use.
 * Cancer risk: mechanistically real, precautionary weight is significant.
 * Hard stops: cancer history, diabetes, pediatric use, pregnancy.
 */

const SIDE_EFFECTS = [
  {
    name: "Hypoglycemia — the most acute life-safety risk",
    detail: "Dose-related blood glucose lowering via insulin receptor cross-reactivity; severe hypoglycemia (loss of consciousness, seizure) is documented",
    frequency: "Common at pharmacological doses; severity is dose-dependent and amplified by fasted state",
    timing: "Onset 15-60 minutes post-injection; duration can be prolonged due to IGF-1's longer half-life vs insulin",
    tier: "flag",
    note: "This is not a theoretical concern — severe hypoglycemia from exogenous IGF-1 has caused documented hospitalizations and fatalities in non-medical enhancement use. The IGF-1/insulin receptor cross-reactivity is a pharmacological fact at pharmacological doses. Eating a carbohydrate-containing meal 20-30 minutes before injection, having fast-acting glucose available (gel or tablets), and knowing your individual response before any solo or unsupervised use are minimum safety requirements.",
  },
  {
    name: "Cancer concern — mitogenic mechanism and epidemiological associations",
    detail: "IGF-1R activation promotes cancer cell proliferation; higher natural IGF-1 associated with breast, prostate, colorectal, and lung cancer risk in epidemiological studies",
    frequency: "Long-term risk — not acute; cancer history is a hard stop",
    timing: "Cumulative risk from sustained IGF-1 elevation; onset of associated cancers is years-scale",
    tier: "flag",
    note: "The cancer concern for exogenous IGF-1 is not about causing cancer from scratch in one cycle — it's about promoting growth of pre-existing cells with malignant potential and creating a long-term mitogenic environment. Anyone with cancer history should not use exogenous IGF-1 under any circumstances. Anyone with significant family history of IGF-1-sensitive cancers (breast, prostate, colorectal) should have explicit oncology clearance before considering this compound.",
  },
  {
    name: "Organ hypertrophy — cardiac, renal, jaw, soft tissue",
    detail: "IGF-1R activation in heart, kidneys, and bone tissue promotes organ growth; prolonged use produces acromegalic-type changes",
    frequency: "Long-term risk — cumulative with prolonged use; not reversible after significant exposure",
    timing: "Accumulates over weeks to months of sustained use",
    tier: "flag",
    note: "The same mechanism that drives anabolic effects in muscle also drives growth in cardiac tissue (cardiac hypertrophy), kidney tissue (organomegaly), and facial/jaw bones (acromegalic features). These changes are not muscle-specific — they are systemic. Cardiomegaly from IGF-1 is a different phenotype from beneficial exercise-induced cardiac hypertrophy and carries different cardiac risk. Jaw, nose, and facial feature changes from sustained IGF-1 elevation are not reversible.",
  },
  {
    name: "Carpal tunnel syndrome",
    detail: "Fluid retention and IGF-1R activity in nerve tissue around the wrist; hand numbness, tingling, weakness",
    frequency: "Common with sustained use; often resolves with dose reduction or cessation",
    timing: "Typically develops over weeks of use; usually reversible",
    tier: "watch",
    note: "One of the most commonly reported side effects in community experience. Driven by a combination of fluid retention (wrist tissue swelling compresses the median nerve) and direct IGF-1R effects on nerve tissue. Reducing dose or taking a break usually resolves it. Persistent or worsening carpal tunnel despite dose reduction warrants physician evaluation.",
  },
  {
    name: "Injection site reactions",
    detail: "Redness, swelling, pain, or lipohypertrophy at injection site",
    frequency: "Common; reduced with proper site rotation",
    timing: "Acute post-injection; lipohypertrophy is cumulative with repeated same-site injection",
    tier: "low",
    note: "Standard injectable peptide considerations: sterile technique, site rotation, subcutaneous injection into fat layer. Source quality matters acutely — impure research-grade IGF-1 carries injection site infection risk beyond standard injectable peptide risk.",
  },
  {
    name: "Headache and fatigue",
    detail: "Common particularly with higher doses; often related to glucose fluctuations",
    frequency: "Common early in use; often relates to sub-symptomatic glucose lowering",
    timing: "Often during active IGF-1 window",
    tier: "low",
    note: "Headache and fatigue on IGF-1 often signal sub-symptomatic hypoglycemia before full symptoms develop. Treat these as an early glucose signal — eat a carbohydrate-containing snack and monitor. Don't dismiss persistent headache or fatigue as normal adjustment.",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; labelColor: string; label: string }> = {
  low:   { bg: "rgba(21,100,58,0.06)",  border: "rgba(21,100,58,0.15)",  labelColor: "#155e38", label: "Low concern" },
  watch: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.16)",   labelColor: "#7c5200", label: "Worth watching" },
  flag:  { bg: "rgba(158,56,0,0.07)",   border: "rgba(158,56,0,0.18)",   labelColor: "#9e3800", label: "Stop signal" },
};

const PLAYBOOK = [
  {
    icon: "›",
    title: "Glucose management — the non-negotiable protocol before first use",
    body: "Before using IGF-1: get fasting glucose and HbA1c. During use: eat a meal containing carbohydrates 20-30 minutes before each injection. Keep fast-acting glucose (gel, tablets, juice) immediately accessible during the injection window and for 2-3 hours after. Know the symptoms of hypoglycemia: shakiness, sweating, rapid heart rate, confusion, impaired coordination, pale skin. Have a plan for what to do if symptoms occur — fast-acting carbohydrates immediately, contact someone if symptoms don't resolve, emergency services if loss of consciousness or inability to self-treat.",
    flags: [
      "Injecting fasted: highest hypoglycemia risk — do not inject without eating first",
      "Combining with insulin or sulfonylureas: hypoglycemia risk is severely amplified — requires physician management if this combination is used at all",
      "Symptoms of hypoglycemia developing: fast-acting glucose now, not after finishing the injection protocol",
      "Loss of consciousness or seizure: emergency services — do not wait",
    ],
  },
  {
    icon: "›",
    title: "Cancer history and cancer screening — the screening gate",
    body: "Cancer history of any kind is a hard stop for IGF-1. This is not nuanced — it applies to all cancers, not just IGF-1-sensitive ones, because the mitogenic signal from IGF-1R activation is broadly applicable. For people without cancer history who are nonetheless concerned about the mitogenic risk: baseline age-appropriate cancer screening (PSA for men, breast screening for women, colorectal screening by age) before starting is reasonable. Understand that this compound's long-term cancer risk in healthy adults is not studied — the precautionary weight sits with the user.",
    flags: [
      "Any personal cancer history: do not use IGF-1 — hard stop regardless of remission status",
      "Strong family history of breast, prostate, or colorectal cancer: explicit oncology consultation before proceeding",
      "Elevated PSA without evaluation: do not start IGF-1 until this is evaluated",
    ],
  },
  {
    icon: "›",
    title: "Source quality — critical in a way that exceeds most other peptides",
    body: "Concentration accuracy matters acutely for IGF-1 because dosing errors translate directly to hypoglycemia severity. A product labeled 1mg/ml that is actually 2mg/ml doubles the dose and doubles the hypoglycemia risk. Research-grade IGF-1 quality control is not regulated — concentration, purity, and sterility vary widely. Third-party certificate of analysis (CoA) is a minimum. Even with a CoA, the first injection should be observed with glucose monitoring and fast-acting glucose available.",
    flags: [
      "No third-party CoA available: do not inject",
      "Any uncertainty about concentration: assume higher concentration risk and dose conservatively",
      "Source changed: treat any new source as first use in terms of response monitoring",
    ],
  },
  {
    icon: "›",
    title: "Cycle length and the organ hypertrophy concern",
    body: "Prolonged continuous IGF-1 elevation is what produces acromegalic-type organ changes. The community convention of cycling exists partly for this reason — cycling off limits cumulative organ exposure. No safe cycle length is established by clinical evidence. Monitoring for carpal tunnel symptoms, changes in ring or shoe size (soft tissue swelling, bone changes), jaw or facial feature changes, and persistent fluid retention during and between cycles is appropriate. Cardiac monitoring (EKG, echocardiogram) for people using IGF-1 for extended periods is reasonable given the cardiac hypertrophy mechanism.",
    flags: [
      "Carpal tunnel symptoms (hand numbness, tingling, weakness) developing: dose reduction or cycle break",
      "Soft tissue or facial changes during use: stop and evaluate — these effects are not reliably reversible",
      "Cardiac symptoms (palpitations, shortness of breath, exercise intolerance) developing: stop and get cardiac evaluation",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Severe hypoglycemia symptoms: confusion, loss of coordination, loss of consciousness, seizure",
    action: "Call emergency services immediately. Fast-acting glucose to anyone who can self-administer. Do not wait for symptoms to resolve on their own — IGF-1's longer half-life than insulin means hypoglycemia can persist longer than expected.",
  },
  {
    signal: "Any personal cancer history",
    action: "Stop immediately and permanently. IGF-1 is a direct mitogenic signal — this is not a compound to use with cancer history under any circumstances, including remission.",
  },
  {
    signal: "Diabetes or significant insulin resistance",
    action: "Do not use IGF-1. The hypoglycemia risk from insulin receptor cross-reactivity is amplified on a background of glucose dysregulation. This is a pharmacological incompatibility, not a preference.",
  },
  {
    signal: "Pregnant, planning pregnancy, or breastfeeding",
    action: "Stop immediately. IGF-1 is a growth factor that acts on developmental biology — no safety data exists for pregnancy and developmental harm is a serious concern.",
  },
  {
    signal: "Cardiac symptoms developing: palpitations, chest pain, shortness of breath, exercise intolerance",
    action: "Stop IGF-1 and seek cardiac evaluation. Cardiac hypertrophy from IGF-1R activation in heart tissue is a documented concern — cardiac symptoms require evaluation before continuing.",
  },
  {
    signal: "Source without verifiable third-party CoA or concentration accuracy uncertain",
    action: "Do not inject. Concentration errors directly determine hypoglycemia severity — this is not a supply quality concern to rationalize around.",
  },
];

export default function Igf1SafetyPanel() {
  return (
    <div className="reta-safety">

      {/* ── Section: What actually happens ── */}
      <div>
        <div className="reta-safety__section-label">What actually happens — and the real risk hierarchy</div>
        <div className="reta-safety__effects">
          {SIDE_EFFECTS.map((se) => {
            const st = TIER_STYLE[se.tier];
            return (
              <div
                key={se.name}
                className="reta-safety__effect"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-safety__effect-top">
                  <div className="reta-safety__effect-name">{se.name}</div>
                  <span
                    className="reta-safety__effect-badge"
                    style={{ color: st.labelColor, borderColor: st.border }}
                  >
                    {st.label}
                  </span>
                </div>
                <div className="reta-safety__effect-detail">{se.detail}</div>
                <div className="reta-safety__effect-timing">{se.timing}</div>
                <div className="reta-safety__effect-note">{se.note}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Section: Mitigation playbook ── */}
      <div>
        <div className="reta-safety__section-label">The mitigation playbook</div>
        <div className="reta-safety__intro">
          IGF-1 requires a more serious safety protocol than any other peptide discussed on this site. The acute hypoglycemia risk, the mitogenic cancer concern, and the organ hypertrophy risk are not manageable through casual precautions — they require deliberate screening, monitoring, and response preparedness. The mitigation framework is: screen before starting, monitor during use, observe the hard stops without exception.
        </div>
        <div className="reta-safety__playbook">
          {PLAYBOOK.map((item) => (
            <div key={item.title} className="reta-safety__play">
              <div className="reta-safety__play-header">
                <span className="reta-safety__play-icon" aria-hidden="true">{item.icon}</span>
                <span className="reta-safety__play-title">{item.title}</span>
              </div>
              <div className="reta-safety__play-body">{item.body}</div>
              <ul className="reta-safety__play-flags">
                {item.flags.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section: Red lines ── */}
      <div className="reta-safety__redlines-block">
        <div className="reta-safety__section-label" style={{ opacity: 1, color: "#9e3800" }}>
          When to stop and get help
        </div>
        <div className="reta-safety__redlines-sub">
          These aren&apos;t &ldquo;maybe check in with your doctor&rdquo; situations. They&apos;re stop-now signals.
        </div>
        <div className="reta-safety__redlines">
          {RED_LINES.map((r, i) => (
            <div key={i} className="reta-safety__redline">
              <div className="reta-safety__redline-signal">{r.signal}</div>
              <div className="reta-safety__redline-action">{r.action}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Risk in proportion ── */}
      <div className="reta-safety__proportion">
        <div className="reta-safety__proportion-heading">Risk in proportion</div>
        <p>
          IGF-1 is the highest-risk compound reviewed on this site for healthy adult use. That statement is based on the pharmacology: acute hypoglycemia capable of causing loss of consciousness, a direct mitogenic mechanism with real cancer biology implications, and irreversible organ changes with prolonged use. These are not speculative concerns.
        </p>
        <p>
          The honest framing: people do use exogenous IGF-1 in enhancement contexts and do not all experience these harms. The harms are not certain outcomes — they are real risks at a probability that is difficult to quantify because healthy adult enhancement use is not studied. The evidence for benefit in healthy adults is thin; the evidence for the harm mechanisms is strong. That asymmetry should inform the risk/benefit evaluation clearly and honestly.
        </p>
        <p>
          If the goal is the anabolic and recovery effects attributed to IGF-1, GH secretagogue combinations (ipamorelin + CJC-1295, sermorelin) work through the natural GH/IGF-1 axis with feedback regulation intact — a substantially different risk profile worth evaluating first.
        </p>
      </div>

    </div>
  );
}
