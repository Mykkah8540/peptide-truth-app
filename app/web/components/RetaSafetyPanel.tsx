/**
 * RetaSafetyPanel — proactive safety intelligence for Retatrutide.
 * Not a warning label. A support framework: what goes wrong, how to prevent it,
 * and clear lines for when to stop. Big Brother Principle — protective, not paternal.
 */

// What actually happens — honest frequency and severity
const SIDE_EFFECTS = [
  {
    name: "GI effects",
    detail: "Nausea, constipation, vomiting",
    frequency: "Very common",
    timing: "Peaks weeks 1–4, usually settles",
    tier: "watch",
    note: "Dose-dependent. Slower titration helps significantly.",
  },
  {
    name: "Lean mass loss",
    detail: "Muscle loss if protein or training slip",
    frequency: "Real risk",
    timing: "Gradual — easy to miss until it matters",
    tier: "watch",
    note: "Preventable with adequate protein and resistance training.",
  },
  {
    name: "Dehydration",
    detail: "From reduced food + fluid intake",
    frequency: "Underrated",
    timing: "Can develop faster than expected",
    tier: "watch",
    note: "Food contains water. When you eat less, you get less water from diet.",
  },
  {
    name: "Fatigue / energy dip",
    detail: "Especially in early titration",
    frequency: "Common",
    timing: "Often calorie-deficit related, not the drug itself",
    tier: "low",
    note: "Usually improves. Protein and sleep are the main levers.",
  },
  {
    name: "Injection site reactions",
    detail: "Redness, mild bruising, irritation",
    frequency: "Common",
    timing: "Manageable",
    tier: "low",
    note: "Rotate sites. Room-temperature injection reduces discomfort.",
  },
  {
    name: "Pancreatitis",
    detail: "Severe, persistent abdominal pain",
    frequency: "Rare",
    timing: "Stop and seek care immediately if it occurs",
    tier: "flag",
    note: "GLP-1 class signal. Rare but real. Know the symptom: severe upper abdominal pain that radiates to the back.",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; labelColor: string; label: string }> = {
  low:   { bg: "rgba(21,100,58,0.06)",  border: "rgba(21,100,58,0.15)",  labelColor: "#155e38", label: "Low concern" },
  watch: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.16)",   labelColor: "#7c5200", label: "Worth watching" },
  flag:  { bg: "rgba(158,56,0,0.07)",   border: "rgba(158,56,0,0.18)",   labelColor: "#9e3800", label: "Stop signal" },
};

// The mitigation playbook — what you actually do
const PLAYBOOK = [
  {
    icon: "›",
    title: "Protein — the #1 thing people miss",
    body: "When appetite crashes, protein is the first to drop. That's when lean mass loss starts. Most people need 0.7–1g per lb of goal body weight daily. Shakes become practical here — not because they're optimal, but because hitting protein targets through food alone is hard when you're not hungry.",
    flags: ["Aim for 0.7–1g/lb goal body weight", "Prioritize protein at every meal — even small ones", "Track it for the first few weeks to calibrate"],
  },
  {
    icon: "›",
    title: "Hydration — more complicated than just drinking water",
    body: "Food contains a lot of water — usually 20–30% of daily intake. When you eat significantly less, you lose that source. Add GI symptoms that cause more fluid loss, and dehydration can sneak up fast. Electrolytes matter too, especially if nausea is significant.",
    flags: ["Target: light yellow urine — not clear, not dark", "Electrolytes (sodium, potassium, magnesium) if nausea is persistent", "Constipation is often dehydration + less fiber — address both"],
  },
  {
    icon: "›",
    title: "Managing GI side effects",
    body: "Nausea is dose-dependent and typically peaks during the titration phase (weeks 1–4), then settles for most people. The goal is to make it through titration, not to push through maximally uncomfortable doses. Most GI issues are manageable with behavior changes.",
    flags: [
      "Smaller meals more frequently — easier on a sensitive stomach",
      "Cold or room-temperature foods often tolerated better than hot",
      "Avoid greasy, spicy, high-fat meals — they amplify nausea",
      "Constipation: fiber + water + movement. Magnesium glycinate is commonly used.",
      "If vomiting prevents keeping anything down — reduce dose or pause",
    ],
  },
  {
    icon: "›",
    title: "Training — protect what you have",
    body: "Resistance training is the main lever for preserving lean mass during aggressive weight loss. Don't try to train as if you're fully fed when you're running a steep caloric deficit — that's a path to poor recovery and overreach. Reduce volume intelligently, keep intensity honest.",
    flags: [
      "Resistance training 2–4x/week is more important than cardio volume",
      "Don't compound the deficit with excessive cardio",
      "If performance and recovery are dropping significantly, adjust nutrition before reducing training",
    ],
  },
  {
    icon: "›",
    title: "Sleep — often overlooked",
    body: "Inadequate sleep elevates cortisol, increases muscle catabolism, and shifts body composition toward fat retention during weight loss. It's not glamorous but it's real. Poor sleep undermines the protein and training effort.",
    flags: ["7–9 hours matters more during active weight loss", "Cortisol from poor sleep directly works against body composition goals"],
  },
];

// When to stop — clear red lines, no softening
const RED_LINES = [
  {
    signal: "Severe, persistent abdominal pain",
    action: "Stop and seek medical care — pancreatitis risk. Especially if pain radiates to the back.",
  },
  {
    signal: "Can't keep fluids down",
    action: "Stop dosing. Dehydration becomes a serious issue fast. Get medical support.",
  },
  {
    signal: "Persistent lightheadedness or fainting",
    action: "Reduce dose or pause. Could be dehydration, hypoglycemia, or cardiovascular signal.",
  },
  {
    signal: "Side effects escalating over time — not settling",
    action: "Not normal. This should get better, not worse. Reassess with someone who knows this drug.",
  },
  {
    signal: "Chest pain or heart palpitations",
    action: "Stop and seek medical care. Not an expected side effect.",
  },
  {
    signal: "Something feels meaningfully off from your normal baseline",
    action: "Trust that signal. Slow down. Investigate before continuing.",
  },
];

export default function RetaSafetyPanel() {
  return (
    <div className="reta-safety">

      {/* ── Section: What actually happens ── */}
      <div>
        <div className="reta-safety__section-label">What actually happens — and how often</div>
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
          Most of what goes wrong on Retatrutide is predictable and preventable. These are the levers that matter most — in rough order of impact.
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
          These aren&apos;t &ldquo;maybe call your doctor&rdquo; situations. They&apos;re stop-now signals.
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
          GI side effects are common and manageable for most people — they peak early and settle. Lean mass loss is real but preventable with protein and training. Pancreatitis is rare but warrants knowing the signal. Long-term effects are genuinely unknown — this is Phase 2 data.
        </p>
        <p>
          The biggest risk for most people isn&apos;t dramatic — it&apos;s quietly under-eating protein, under-hydrating, and losing muscle they didn&apos;t mean to lose. The mitigation is boring and it works.
        </p>
      </div>

    </div>
  );
}
