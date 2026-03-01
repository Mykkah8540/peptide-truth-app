/**
 * PentagastrinSafetyPanel — proactive safety intelligence for Pentagastrin.
 * Key frame: well-characterized short-lived GI adverse effects in diagnostic context.
 * No community use means the safety framing is clinical rather than self-administration.
 * Overall: low concern profile for its intended diagnostic use under supervision.
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
    id: "gi-adverse-effects",
    heading: "Nausea, flushing, abdominal cramping \u2014 common in diagnostic testing",
    tier: "watch",
    body: "Pentagastrin\u2019s GI adverse effects are well-characterized and expected in the diagnostic testing context. Nausea is the most common (50\u201370% of subjects), typically mild and brief. Flushing, abdominal cramping, and a feeling of urgency occur less frequently. These effects peak within the 15\u201330 minutes of the test window and resolve rapidly as the compound clears. They are managed in the diagnostic setting with appropriate monitoring but do not typically require treatment.",
    context: "In the supervised diagnostic context, these adverse effects are anticipated, monitored, and self-limiting. The clinical setup accounts for them. In any theoretical self-administration context (which does not exist for this compound), they would represent predictable discomfort without the ability to measure the intended diagnostic endpoint \u2014 defeating the purpose.",
  },
  {
    id: "short-duration",
    heading: "Short-lived effects \u2014 rapid clearance after diagnostic administration",
    tier: "low",
    body: "Pentagastrin is cleared rapidly after IV or SC administration. The pharmacological effect window is 30\u201360 minutes for gastric acid stimulation. Calcitonin stimulation is measured within the first 1\u20135 minutes (IV) or 10\u201320 minutes (SC). There is no prolonged effect, no accumulation with single-dose diagnostic use, and no long-term pharmacological burden from the compound in the diagnostic setting.",
    context: "The short duration is a pharmacological design feature for a diagnostic agent: you want a controlled stimulation window, not sustained effects. This characteristic is irrelevant for therapeutic framing (since there is no therapeutic application).",
  },
  {
    id: "no-community-use",
    heading: "No community use exists \u2014 safety framing is diagnostic-context only",
    tier: "low",
    body: "Unlike most compounds in this database, pentagastrin has no community use ecosystem to evaluate. The safety considerations documented here are from the clinical diagnostic setting under physician supervision. There is no self-administration track record to assess, no gray-market product quality concern (since the compound is not sought from research peptide suppliers), and no enhancement-framing adverse effect profile to characterize.",
    context: "The absence of community use is itself the most relevant safety fact for most people reading this entry: there is nothing to evaluate here from an individual decision-making perspective because there is no decision being contemplated.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

const RED_LINES = [
  {
    signal: "Self-administration outside a supervised diagnostic testing setting",
    action: "There is no therapeutic or enhancement rationale for pentagastrin self-administration. If you have encountered a protocol or claim suggesting pentagastrin use for a non-diagnostic purpose, that claim has no pharmacological basis.",
  },
  {
    signal: "Suspected gastrinoma or Zollinger-Ellison syndrome undergoing pentagastrin testing",
    action: "Ensure testing is performed under gastroenterologist supervision with baseline acid output measurement, appropriate nasogastric tube placement, and monitoring for hyperacid-related complications. The pentagastrin acid stimulation test in ZE syndrome patients can produce extreme acid secretion responses requiring medical management.",
  },
  {
    signal: "Receiving pentagastrin calcitonin stimulation and results are unexpectedly abnormal",
    action: "Relay results to your endocrinologist immediately. An exaggerated calcitonin rise on pentagastrin stimulation is a significant finding that requires formal evaluation for MTC and C-cell hyperplasia within a multidisciplinary endocrine oncology context.",
  },
];

export default function PentagastrinSafetyPanel() {
  return (
    <div className="reta-safety">

      <div>
        <div className="reta-safety__section-label">What actually happens \u2014 and the real risk hierarchy</div>
        <div className="reta-safety__effects">
          {SAFETY_ITEMS.map((item) => {
            const st = TIER_STYLE[item.tier];
            return (
              <div
                key={item.id}
                className="reta-safety__effect"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-safety__effect-top">
                  <div className="reta-safety__effect-name">{item.heading}</div>
                  <span
                    className="reta-safety__effect-badge"
                    style={{ color: st.labelColor, borderColor: st.border }}
                  >
                    {st.label}
                  </span>
                </div>
                <div className="reta-safety__effect-note">{item.body}</div>
                <div className="reta-safety__effect-detail">{item.context}</div>
              </div>
            );
          })}
        </div>
      </div>

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

      <div className="reta-safety__proportion">
        <div className="reta-safety__proportion-heading">Risk in proportion</div>
        <p>
          Pentagastrin has one of the lowest risk profiles in this database in its appropriate context: a single-dose diagnostic agent with short-lived, well-characterized GI adverse effects administered under physician supervision. The risk-benefit calculation for its intended diagnostic use is favorable \u2014 it produces transient nausea in exchange for clinically valuable physiological measurements.
        </p>
        <p>
          The safety section for pentagastrin is short because there is very little to say: no chronic use, no community self-administration, no enhancement framing, no long-term adverse effect profile to characterize. The compound\u2019s trajectory is toward obsolescence in its specific diagnostic niche, replaced by genetic testing. It is included in this database as a pharmacological record, not as a compound requiring active safety decision-making by individuals.
        </p>
      </div>

    </div>
  );
}
