/**
 * Mk677SafetyPanel — proactive safety intelligence for MK-677 (Ibutamoren).
 * Key frame: same GH-axis flags as injectable GHRPs but amplified by sustained exposure.
 * MK-677-specific additions:
 * - Carpal tunnel / peripheral neuropathy (dose-dependent, documented in trials)
 * - Heart failure / edema as explicit concern (in who_should_be_cautious from JSON)
 * - Glucose concern amplified: sustained GH elevation vs pulsatile
 * - No injection-site risks, but oral bioavailability means no "dose titration by timing"
 */

const SIDE_EFFECTS = [
  {
    name: "Glucose dysregulation — amplified by sustained GH elevation",
    detail: "Sustained GH counter-regulation to insulin — more persistent than pulsatile injectable GHRPs",
    frequency: "Population-specific — significant risk in prediabetes/insulin resistance; relevant in metabolically healthy adults at higher doses/longer duration",
    timing: "Develops over weeks; may worsen with sustained use",
    tier: "flag",
    note: "GH counter-regulation to insulin is more persistent with MK-677 than with injectable GHRPs — the 24hr half-life means there's no 'off window' where insulin sensitivity recovers. If you have any metabolic history, baseline glucose monitoring isn't optional. In clinical trials, glucose tolerance worsening was documented even in elderly study populations.",
  },
  {
    name: "Cancer history — IGF-1 growth signal concern",
    detail: "IGF-1 elevation: confirmed in RCTs — mitogenic concern applies as with all GH-axis compounds",
    frequency: "Population-specific — not a general side effect",
    timing: "Mechanistically relevant throughout sustained use; potentially amplified by sustained (vs pulsatile) IGF-1 exposure",
    tier: "flag",
    note: "Same flag as CJC-1295, ipamorelin, sermorelin — active cancer or active treatment requires oncology clearance. Sustained IGF-1 elevation from MK-677's long half-life may be mechanistically more concerning than pulsatile exposure from injectable GHRPs, though this distinction hasn't been directly trialed.",
  },
  {
    name: "Heart failure and edema — specific clinical concern",
    detail: "Significant fluid retention risk in people with heart failure or edema-prone conditions",
    frequency: "Population-specific — clinically significant in heart failure; common as mild edema in healthy adults",
    timing: "Develops early with GH/fluid retention; can progress with continued use",
    tier: "flag",
    note: "This is more explicitly a concern for MK-677 than for short-acting injectable GHRPs due to sustained GH and fluid retention. Heart failure was specifically flagged in the clinical use context. If you have heart failure, significant edema, or fluid-retention-prone conditions, MK-677 is contraindicated without physician clearance.",
  },
  {
    name: "Carpal tunnel / peripheral neuropathy",
    detail: "Hand tingling, numbness, or carpal tunnel symptoms — dose-dependent, documented in RCTs",
    frequency: "Moderate — documented in clinical trials; more common at higher doses",
    timing: "Typically develops within weeks of starting or dose increase; often dose-dependent",
    tier: "watch",
    note: "This is MK-677's most distinctive common side effect vs other GH-axis compounds. It's mechanistically related to GH-driven fluid retention causing nerve compression. In trials, it was dose-dependent and often improved with dose reduction. Persistent or worsening symptoms warrant dose reduction or discontinuation.",
  },
  {
    name: "Appetite stimulation — persistent throughout the day",
    detail: "Strong, sustained hunger and cravings — ghrelin receptor agonism throughout the day",
    frequency: "Very common — mechanistically expected and persistent with a 24hr compound",
    timing: "Begins within days; ongoing throughout the cycle",
    tier: "watch",
    note: "This is more practically significant with MK-677 than with ipamorelin — the 24hr half-life means appetite stimulation is continuous, not time-limited to hours after injection. For lean mass goals with adequate caloric intake, it can be managed. For anyone with fat loss or caloric restriction goals, persistent appetite stimulation is a real headwind that requires active management.",
  },
  {
    name: "Water retention / edema",
    detail: "Fluid retention — common, can be significant with sustained GH exposure",
    frequency: "Very common; often more pronounced than with injectable GHRPs",
    timing: "Early onset; may persist throughout use rather than resolving as with shorter-acting compounds",
    tier: "watch",
    note: "Fluid retention from MK-677 can be more persistent than the 'weeks 1-4' edema pattern of injectable GHRPs — the sustained GH elevation means the fluid mechanism doesn't attenuate as clearly. If edema is significant or not improving, dose reduction is appropriate.",
  },
  {
    name: "Vivid dreams / sleep disruption",
    detail: "Vivid or intense dreams; some users report disrupted sleep despite the sleep quality claim",
    frequency: "Common — reported across community and some trial data",
    timing: "Typically within the first week; often settles; some users report persistent disruption",
    tier: "watch",
    note: "The sleep architecture effect from MK-677 appears to be real — GH is involved in slow-wave sleep regulation. But the community signal is mixed: many users report improved sleep depth; others report vivid dreams that become disruptive. This is worth monitoring, especially in the first 2-4 weeks.",
  },
  {
    name: "Fatigue / lethargy",
    detail: "Non-specific fatigue, especially early or at higher doses",
    frequency: "Moderate",
    timing: "Often early; can improve with time or dose adjustment",
    tier: "low",
    note: "Consistent with the early GH response profile. Usually manageable. If lethargy is significant and persistent, reassess dose.",
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
    title: "Metabolic baseline — more critical here than with injectable GHRPs",
    body: "GH counter-regulation to insulin is more persistent with MK-677 than with injectable GHRPs — the 24-hour half-life means sustained glucose counter-regulation without recovery windows. In clinical trials, glucose tolerance worsening was documented even in elderly study populations. For healthy adults: baseline fasting glucose is the minimum responsible check before starting. For anyone with metabolic history: this isn't a conversation to skip.",
    flags: [
      "Baseline fasting glucose or HbA1c before starting — this matters more with MK-677 than with ipamorelin or CJC-1295 due to sustained exposure",
      "On diabetes medications: do not add MK-677 without physician supervision",
      "Monitor for glucose symptoms: unusual thirst, frequent urination, blurry vision, unexplained fatigue",
      "Fasting glucose rising noticeably from baseline: stop and evaluate — don't push through worsening metabolic signals",
    ],
  },
  {
    icon: "›",
    title: "Carpal tunnel monitoring — MK-677's most distinctive watchpoint",
    body: "Hand tingling, numbness, or carpal tunnel symptoms are documented in MK-677 clinical trials as dose-dependent side effects — more commonly reported with MK-677 than with any injectable GHRP. The mechanism is GH-driven fluid retention causing nerve compression at the wrist. Most cases are dose-dependent and improve with reduction. Persistent symptoms — especially if bilateral or accompanied by strength loss — warrant dose reduction or discontinuation.",
    flags: [
      "Hand tingling or numbness in the first weeks: track whether it's improving or worsening with time",
      "Bilateral carpal tunnel symptoms or grip strength reduction: reduce dose or stop",
      "Don't interpret tingling as 'just the compound working' — it's a nerve compression signal that warrants attention",
      "If you have pre-existing carpal tunnel syndrome: MK-677 is higher risk for symptom worsening",
    ],
  },
  {
    icon: "›",
    title: "Appetite management — active, sustained, and non-optional",
    body: "Ghrelin receptor activation from MK-677 drives continuous appetite stimulation — not the post-injection pulse of ipamorelin. The bedtime-injection strategy that mitigates appetite for ipamorelin doesn't apply to an oral compound with a 24-hour half-life. If your goals require caloric control (fat loss, body recomposition), the appetite signal from MK-677 is a persistent headwind requiring deliberate management. This isn't a 'push through' situation — it's a mechanistic reality that determines whether MK-677 fits your current goal.",
    flags: [
      "Plan your caloric strategy before starting, not after appetite increases",
      "If appetite stimulation is counterproductive for your current goals: reconsider whether MK-677 is the right compound",
      "Hunger is not a sign of efficacy — it's the ghrelin receptor working as expected; don't over-eat in response",
      "If appetite becomes disruptive after 2–3 weeks and doesn't settle: dose reduction or discontinuation is appropriate",
    ],
  },
  {
    icon: "›",
    title: "Edema and cardiac status — explicit concern",
    body: "MK-677's sustained GH elevation produces more persistent fluid retention than short-acting injectable GHRPs. For healthy adults, mild early edema is common and manageable. For anyone with heart failure, compromised cardiac function, or edema-prone conditions, the fluid retention from sustained GH stimulation is a real clinical concern — not a theoretical one. Heart failure was specifically identified as a caution in MK-677's clinical context.",
    flags: [
      "Heart failure or ejection fraction concerns: do not start MK-677 without explicit cardiologist clearance",
      "Significant edema that isn't improving after 4 weeks: reduce dose or stop",
      "Rapid weight gain with swelling (not appetite-driven): stop and evaluate — could reflect fluid overload",
      "Shortness of breath or chest tightness with edema: stop immediately and seek evaluation",
    ],
  },
  {
    icon: "›",
    title: "Cancer history — identical concern, potentially amplified exposure",
    body: "Same cancer history gate as all GH-axis compounds. IGF-1 elevation from MK-677 is documented in RCTs — confirmed, not just inferred. The sustained nature of MK-677's IGF-1 elevation (vs pulsatile) may be mechanistically more concerning than injectable GHRPs for cancer proliferation, though this hasn't been directly studied.",
    flags: [
      "Active cancer diagnosis: stop immediately — do not use without oncology clearance",
      "Cancer in remission (last 2–3 years): consult your oncologist before starting",
      "High hereditary cancer risk: personal risk/benefit assessment with a provider",
      "Hormone-sensitive cancers: particular attention warranted — IGF-1 axis interactions are direct",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Heart failure symptoms or significant edema worsening",
    action: "Stop immediately. GH-driven fluid retention from a sustained compound is a real cardiac concern. Seek evaluation — don't reduce dose and continue.",
  },
  {
    signal: "Active cancer diagnosis or currently in cancer treatment",
    action: "Stop immediately. IGF-1 elevation from MK-677 is confirmed in RCTs — not just mechanistically inferred. Do not use during active cancer treatment without explicit oncology clearance.",
  },
  {
    signal: "Fasting glucose noticeably elevated or symptoms of glucose dysregulation",
    action: "Stop and check glucose. Sustained GH counter-regulation to insulin is more persistent than with injectable GHRPs — don't push through worsening metabolic signals.",
  },
  {
    signal: "Bilateral hand tingling, numbness, or grip strength loss",
    action: "Stop or significantly reduce dose. Bilateral carpal tunnel symptoms suggest systemic GH-driven nerve compression — this is a dose-reduction or stop signal.",
  },
  {
    signal: "Significant shortness of breath, chest pain, or rapid unexplained weight gain",
    action: "Stop immediately and seek medical evaluation. These could represent fluid overload, especially in anyone with cardiac history.",
  },
  {
    signal: "Pregnant, planning pregnancy, or possibly pregnant",
    action: "Stop immediately. No safety data for GH-axis compounds during pregnancy.",
  },
  {
    signal: "Adolescent use",
    action: "Stop. GH secretagogue use during adolescent development carries real risks to endocrine and growth setpoints. Hard stop.",
  },
];

export default function Mk677SafetyPanel() {
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
          MK-677&apos;s safety profile shares the GH-axis flags of injectable GHRPs with three amplifications: glucose concern is greater (sustained vs pulsatile GH), carpal tunnel is a documented dose-dependent risk unique to MK-677, and heart failure / edema is an explicit caution. The oral route removes injection-site risks but doesn&apos;t reduce the endocrine load.
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
          MK-677 is broadly used in community contexts — the oral route, the absence of needles, and the documented human trial data make it accessible and relatively well-characterized compared to most gray-market compounds. For a metabolically healthy adult with no cancer history, no cardiac issues, and no pre-existing edema or carpal tunnel: the risk profile is manageable with appropriate monitoring.
        </p>
        <p>
          The four variables that most determine individual risk: metabolic status (glucose), cancer history, cardiac/edema status, and carpal tunnel predisposition. The glucose concern is amplified vs injectable GHRPs due to sustained GH elevation — monitoring is more important here, not less.
        </p>
      </div>

    </div>
  );
}
