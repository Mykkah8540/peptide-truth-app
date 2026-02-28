/**
 * HexarelinSafetyPanel — proactive safety intelligence for Hexarelin.
 * Key frame: same GH-axis flags as GHRP-2 (glucose, cancer, allergy); cortisol/prolactin
 * non-selective profile. Two hexarelin-specific dimensions:
 * - Tachyphylaxis: the safety/efficacy implication of receptor downregulation
 * - CD36 cardiac receptor: unique among GHRPs; cardiovascular history is elevated concern
 */

const SIDE_EFFECTS = [
  {
    name: "Glucose dysregulation — compounded by cortisol",
    detail: "GH counter-regulation to insulin plus cortisol's glucose-raising effect — same double mechanism as GHRP-2",
    frequency: "Population-specific — significant risk in prediabetes/insulin resistance",
    timing: "Develops over weeks of sustained use",
    tier: "flag",
    note: "Same compounded mechanism as GHRP-2: GH counter-regulation to insulin AND cortisol glucocorticoid glucose effect. Both are documented. Metabolic monitoring is essential. The tachyphylaxis attenuation of GH over time may reduce this somewhat — but the cortisol effect is independent of GH and may persist.",
  },
  {
    name: "Cancer history — IGF-1 growth signal concern",
    detail: "IGF-1 is mitogenic — same concern as all GH-axis compounds",
    frequency: "Population-specific — not a general side effect",
    timing: "Mechanistically relevant throughout use",
    tier: "flag",
    note: "Same flag as CJC-1295, ipamorelin, GHRP-2, GHRP-6 — active cancer or active treatment requires oncology clearance.",
  },
  {
    name: "Severe allergic reaction",
    detail: "Hives, facial swelling, throat tightness, difficulty breathing",
    frequency: "Rare",
    timing: "Rapid onset if it occurs",
    tier: "flag",
    note: "As with any injectable peptide. Know the signs before starting.",
  },
  {
    name: "Cardiovascular symptoms — elevated concern with CD36 activity",
    detail: "Chest pain, fainting, severe shortness of breath — plus hexarelin's unique CD36 cardiac receptor binding",
    frequency: "Rare in healthy adults; meaningful uncertainty in cardiovascular disease",
    timing: "Can occur during or after injection",
    tier: "watch",
    note: "Hexarelin's CD36 binding is unique among GHRPs. In heart failure models, CD36 activity was cardioprotective. In healthy adults or people with cardiac disease (other than heart failure), the implications are uncharacterized. Anyone with cardiac history should treat this as a flag, not a watch.",
  },
  {
    name: "Cortisol elevation — catabolic counter-pressure",
    detail: "Documented cortisol elevation — catabolic, affects glucose, sleep, and mood",
    frequency: "Expected pharmacologically with hexarelin",
    timing: "Follows GH pulse during active use",
    tier: "watch",
    note: "Same as GHRP-2 — cortisol is catabolic and opposes the anabolic GH signal. For recovery and muscle goals, this counter-pressure is clinically meaningful. Mood disruption and sleep interference can follow cortisol elevation. Unlike the GH response, cortisol elevation may persist even as the GH response desensitizes.",
  },
  {
    name: "Prolactin elevation",
    detail: "Documented prolactin elevation — can affect sexual function, libido, and mood",
    frequency: "Expected pharmacologically — non-selective GHRP profile",
    timing: "Present during active use",
    tier: "watch",
    note: "Same as GHRP-2. If on prolactin-affecting medications, this interaction warrants attention. Chronic prolactin elevation can affect libido, sexual function, and mood.",
  },
  {
    name: "Tachyphylaxis — efficacy loss with continuous use",
    detail: "GH response attenuates faster with hexarelin than any other GHRP — within 4–8 weeks of continuous use",
    frequency: "Expected — pharmacologically documented with hexarelin",
    timing: "Progressive attenuation beginning within weeks of continuous use",
    tier: "watch",
    note: "Tachyphylaxis is a safety and efficacy issue simultaneously. From a safety lens: as the GH response desensitizes, the cortisol and CD36 effects may persist while the GH benefit diminishes — creating an unfavorable benefit/risk ratio for continuous use. Cycling off (4–6 weeks minimum) restores receptor sensitivity.",
  },
  {
    name: "Water retention / edema",
    detail: "Mild puffiness — standard GH response",
    frequency: "Common, especially early",
    timing: "Usually early; typically resolves or attenuates with tachyphylaxis",
    tier: "low",
    note: "Standard GH-axis compound response. Manageable. Significant or persistent swelling warrants dose reduction.",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; labelColor: string; label: string }> = {
  low:   { bg: "rgba(21,100,58,0.06)",  border: "rgba(21,100,58,0.15)",  labelColor: "#155e38", label: "Low concern" },
  watch: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.16)",   labelColor: "#7c5200", label: "Worth watching" },
  flag:  { bg: "rgba(158,56,0,0.07)",   border: "rgba(158,56,0,0.18)",   labelColor: "#9e3800", label: "Stop signal" },
};

const PLAYBOOK = [
  {
    icon: "🔄",
    title: "Tachyphylaxis management — cycling is not optional",
    body: "Hexarelin's receptor desensitization is the primary practical management challenge. The GH response attenuates faster than any other GHRP — continuous protocols lose the primary pharmacological benefit within weeks. The solution is structured cycling: 4–8 weeks on, 4–6 weeks off. There is no dose escalation that reverses receptor downregulation meaningfully. If you're not planning to cycle, hexarelin is the wrong compound.",
    flags: [
      "Plan your cycle structure before starting — on/off timing must be predetermined",
      "Loss of water retention and appetite effects can signal tachyphylaxis is progressing — the GH response is attenuating",
      "Do not dose-escalate to compensate for perceived attenuation — this amplifies cortisol and CD36 effects without restoring GH response",
      "Minimum off period to restore receptor sensitivity: 4–6 weeks — do not shortcut this",
    ],
  },
  {
    icon: "❤️",
    title: "Cardiac history — CD36 is a hexarelin-specific consideration",
    body: "Hexarelin's CD36 receptor binding is the most pharmacologically unique aspect of its safety profile. CD36 has been studied in cardiac biology — hexarelin showed cardioprotective effects in heart failure animal models. What this means for healthy adults or for people with cardiac disease other than heart failure is genuinely unknown. The appropriate stance: any cardiac history (arrhythmias, CAD, significant hypertension) is a reason to consult a physician before starting, not to proceed without information.",
    flags: [
      "Known cardiac disease, arrhythmias, or significant cardiovascular history: consult physician before starting",
      "Chest pain, palpitations, or fainting during use: stop immediately and seek evaluation",
      "On cardiovascular medications: discuss with prescribing physician — CD36 and GH interactions are uncharacterized with cardiac drugs",
      "CD36 binding persists even as GH response desensitizes — the cardiac dimension doesn't attenuate with tachyphylaxis",
    ],
  },
  {
    icon: "📊",
    title: "Metabolic baseline — same concern as GHRP-2",
    body: "Hexarelin creates the same compounded glucose-raising mechanism as GHRP-2: GH counter-regulation to insulin AND cortisol glucocorticoid glucose effect. Baseline fasting glucose before starting is essential for anyone with metabolic history. The tachyphylaxis note: cortisol elevation may persist even as the GH response desensitizes — so the glucose concern doesn't necessarily diminish on the same timeline as the GH effect.",
    flags: [
      "Baseline fasting glucose or HbA1c before starting — essential if any metabolic history",
      "On diabetes medications: do not add hexarelin without physician supervision",
      "Monitor for glucose dysregulation symptoms: unusual thirst, frequent urination, unexplained fatigue",
      "Fasting glucose rising: stop and evaluate",
    ],
  },
  {
    icon: "🎗️",
    title: "Cancer history — same flag as all GH-axis compounds",
    body: "Same stop-and-consult requirement as CJC-1295, ipamorelin, GHRP-2, GHRP-6, and all GH-axis compounds. Active cancer or recent treatment requires oncology discussion before starting.",
    flags: [
      "Active cancer diagnosis: stop immediately — oncology clearance required",
      "Cancer in remission (last 2–3 years): consult your oncologist",
      "High hereditary cancer risk: personal risk/benefit assessment with a provider",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Active cancer diagnosis or currently in cancer treatment",
    action: "Stop immediately. IGF-1 is a direct mitogen. Do not use without oncology clearance.",
  },
  {
    signal: "Chest pain, fainting, palpitations, or severe shortness of breath",
    action: "Stop immediately and seek medical evaluation. Cardiovascular symptoms appear in GHRP safety documentation — hexarelin's CD36 activity adds an additional cardiac dimension.",
  },
  {
    signal: "Known cardiovascular disease or cardiac conditions — before starting",
    action: "Do not start without physician clearance. CD36 receptor binding creates a hexarelin-specific cardiac consideration that doesn't apply to other GHRPs.",
  },
  {
    signal: "Fasting glucose noticeably elevated or symptoms of glucose dysregulation",
    action: "Stop and check glucose. The compounded GH + cortisol glucose mechanism makes metabolic worsening real.",
  },
  {
    signal: "Hives, facial swelling, throat tightness, or difficulty breathing",
    action: "Stop immediately. Anaphylaxis protocol — emergency services if severe.",
  },
  {
    signal: "Pregnant, planning pregnancy, or possibly pregnant",
    action: "Stop immediately. No safety data for GH-axis compounds during pregnancy.",
  },
  {
    signal: "Adolescent use",
    action: "Stop. GH secretagogue use during adolescent development is a hard stop.",
  },
];

export default function HexarelinSafetyPanel() {
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
          Hexarelin&apos;s safety profile has two hexarelin-specific dimensions beyond the standard GH-axis concerns: tachyphylaxis (the GH response attenuates faster than other GHRPs — cycling is mechanistically required, not optional) and CD36 cardiac receptor binding (unique among GHRPs — cardiovascular history is elevated concern). Cortisol and prolactin concerns are the same as GHRP-2.
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
          Hexarelin is a pharmacologically characterized GHRP with two distinguishing features: highest GH potency and fastest receptor desensitization of the GHRP class. For a metabolically healthy adult with no cardiac history and a well-structured cycling protocol: the safety profile is manageable. The GH potency advantage is real — for the weeks before tachyphylaxis attenuates it.
        </p>
        <p>
          For most sustained GH-axis goals, ipamorelin provides a more practical compound: sustained response without tachyphylaxis, no cortisol burden, no CD36 ambiguity. Hexarelin&apos;s use case, if it exists in modern protocols, is short-cycle peak GH pulse amplitude — not ongoing protocols. The question before starting: does your goal actually require hexarelin&apos;s peak potency, or does ipamorelin with CJC-1295 get you there more sustainably?
        </p>
      </div>

    </div>
  );
}
