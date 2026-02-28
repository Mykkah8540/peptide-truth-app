/**
 * NadPlusSafetyPanel — proactive safety intelligence for NAD+.
 * NAD+ is generally well-tolerated. IV infusion has its own distinct profile from oral.
 * Key concern: PARP-related conflict with certain cancer therapies.
 */

const SIDE_EFFECTS = [
  {
    name: "IV infusion flushing",
    detail: "Intense warmth, pressure, racing heart, anxiety sensations",
    frequency: "Very common during IV",
    timing: "During infusion — resolves quickly when rate is slowed",
    tier: "watch",
    note: "Route-specific. Slowing the infusion rate almost always resolves it. Expected, not dangerous.",
  },
  {
    name: "Nausea / headache",
    detail: "Particularly at high oral doses",
    frequency: "Common at higher doses",
    timing: "Usually dose-dependent — improves with lower doses or splitting doses",
    tier: "watch",
    note: "Start low and titrate up over 1–2 weeks. Taking with food helps significantly.",
  },
  {
    name: "GI discomfort",
    detail: "Stomach upset, cramping, loose stools",
    frequency: "Occasional at high oral doses",
    timing: "Usually resolves — or triggered by specific formulations",
    tier: "low",
    note: "Taking with food reduces GI impact. Some formulations tolerate better than others.",
  },
  {
    name: "Infusion site reactions",
    detail: "Discomfort, bruising, local irritation from IV access",
    frequency: "Common with IV route",
    timing: "Manageable with proper technique",
    tier: "low",
    note: "IV route specific. Proper insertion and site rotation reduce this.",
  },
  {
    name: "PARP inhibitor conflict",
    detail: "Direct conflict if on olaparib, niraparib, rucaparib, or similar cancer drugs",
    frequency: "Relevant if on oncology therapy",
    timing: "Not a side effect — a clinical contraindication",
    tier: "flag",
    note: "PARP inhibitors work by depleting NAD+ in tumor cells. NAD+ supplementation works in the opposite direction. This needs a clinical conversation before starting.",
  },
  {
    name: "Allergic reactions",
    detail: "Hives, swelling, difficulty breathing (rare)",
    frequency: "Rare",
    timing: "Typically rapid onset if it occurs",
    tier: "flag",
    note: "As with any supplement or IV therapy. Know the signs and have a plan if doing IV infusion.",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; labelColor: string; label: string }> = {
  low:   { bg: "rgba(21,100,58,0.06)",  border: "rgba(21,100,58,0.15)",  labelColor: "#155e38", label: "Low concern" },
  watch: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.16)",   labelColor: "#7c5200", label: "Worth watching" },
  flag:  { bg: "rgba(158,56,0,0.07)",   border: "rgba(158,56,0,0.18)",   labelColor: "#9e3800", label: "Stop signal" },
};

const PLAYBOOK = [
  {
    icon: "🪴",
    title: "IV infusion rate — your main lever",
    body: "Flushing during IV NAD+ is the #1 reported experience and the main reason people don't continue. It's not dangerous — it's the body responding to the rapid systemic increase in NAD+ metabolism. The solution is simple: slow the drip. A 500mg infusion that causes intense flushing at 90 minutes can often be made comfortable at 2–3 hours. The discomfort is real. It's also manageable.",
    flags: [
      "Communicate your comfort level to the provider — this is the standard variable to adjust",
      "First-time IV NAD+ is typically slower to let you calibrate",
      "Hydration before infusion reduces intensity of side effects",
    ],
  },
  {
    icon: "💧",
    title: "Hydrate before IV infusion",
    body: "Arriving well-hydrated to an IV infusion session reduces the intensity of flushing and general side effects. It also makes vein access easier. This is standard IV practice and especially important with NAD+ given the vascular response.",
    flags: [
      "Drink 500–750ml of water in the 2 hours before your appointment",
      "Avoid caffeine in the hours before — it increases heart rate and dehydration",
      "IV vitamin C before NAD+ is sometimes used by clinics — ask your provider about their protocol",
    ],
  },
  {
    icon: "🥗",
    title: "Oral dosing — start low, go slow",
    body: "Oral NAD+ supplements have much lower side effect profiles than IV. That said, starting at full therapeutic doses can cause nausea and GI upset. Building up over 1–2 weeks allows your system to adapt and makes it much easier to identify your personal tolerance.",
    flags: [
      "Start at 250–500mg/day orally and build to target dose over 2 weeks",
      "Always take with food — significantly reduces GI side effects",
      "If nausea persists, try splitting the dose morning and evening",
    ],
  },
  {
    icon: "🔬",
    title: "Cancer therapy — check before you start",
    body: "If you are currently on PARP inhibitor cancer therapy (olaparib, niraparib, rucaparib, talazoparib), NAD+ supplementation directly conflicts with the mechanism of your treatment. PARP inhibitors work by blocking PARP enzymes, which depletes NAD+ in cancer cells. Supplementing NAD+ may counteract this. This is not a 'talk to your doctor eventually' situation — it's a 'do not start without oncology consultation' situation.",
    flags: [
      "PARP inhibitor names: olaparib (Lynparza), niraparib (Zejula), rucaparib (Rubraca), talazoparib (Talzenna)",
      "Active cancer diagnosis in general warrants oncology consultation before any NAD+ supplementation",
      "This includes precursors (NMN, NR) — same mechanism concern applies",
    ],
  },
  {
    icon: "📋",
    title: "Expectations — this is a subtle intervention",
    body: "NAD+ supplementation is not a dramatic-effect compound. The mechanism is real. The clinical outcome evidence is still building. Most users who are disappointed expected something acute and felt nothing. Most users who are satisfied are playing a long game — supporting cellular health they can't directly measure. Going in with calibrated expectations is the main preparation you can do.",
    flags: [
      "Give it 60–90 days before evaluating — if there's a perceptible effect, that's when it typically emerges",
      "Don't expect to 'feel' anything in the first week — this isn't that kind of supplement",
      "Track energy, sleep quality, and cognitive clarity subjectively — these are the most commonly reported benefit domains",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Chest pain or significant heart palpitations during IV infusion",
    action: "Stop the infusion immediately. This is beyond the expected flushing response. Seek medical evaluation.",
  },
  {
    signal: "Signs of allergic reaction — hives, swelling, throat tightness, difficulty breathing",
    action: "Stop immediately and treat as anaphylaxis if severe. IV infusion settings should have epinephrine available.",
  },
  {
    signal: "Currently on PARP inhibitor chemotherapy",
    action: "Do not start NAD+ supplementation without explicit oncology consultation. This is a direct mechanism conflict.",
  },
  {
    signal: "Active cancer diagnosis of any kind",
    action: "The role of NAD+ in tumor cell energy metabolism means this needs to be cleared with your oncologist before starting.",
  },
  {
    signal: "Worsening fatigue, not improving",
    action: "Supplement fatigue is real. If you feel worse after 4+ weeks, stop and evaluate — something else may be the issue.",
  },
  {
    signal: "Something feels meaningfully off from your normal baseline",
    action: "Trust that signal. Supplements that aren't working for your body will tell you if you pay attention.",
  },
];

export default function NadPlusSafetyPanel() {
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
          NAD+ is among the gentler interventions when taken orally. IV is a different experience. The key variables are route, rate, and preparation — all manageable.
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
          NAD+ supplementation is generally well-tolerated. Oral is the gentler route — GI effects at high doses are manageable with food and titration. IV is more effective but demands preparation: hydrate, slow the drip, know that flushing is expected and manageable, not dangerous.
        </p>
        <p>
          The most significant risk is specific and rare: conflict with PARP inhibitor cancer therapy. If that's not relevant to your situation, the safety profile is favorable relative to most longevity interventions. The bigger question is whether it&apos;s working — not whether it&apos;s safe.
        </p>
      </div>

    </div>
  );
}
