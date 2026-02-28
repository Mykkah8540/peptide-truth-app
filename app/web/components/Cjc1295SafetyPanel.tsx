/**
 * Cjc1295SafetyPanel — proactive safety intelligence for CJC-1295.
 * Key frame: this is a systemic endocrine compound — side effects operate through
 * GH/IGF-1 physiology. Glucose, edema, cancer history, and the DAC variant
 * are the variables that actually determine risk level for a given person.
 */

const SIDE_EFFECTS = [
  {
    name: "Glucose dysregulation",
    detail: "Elevated fasting glucose, worsened insulin sensitivity, potential HbA1c drift",
    frequency: "Population-specific — significant risk in prediabetes/insulin resistance; low in metabolically healthy adults",
    timing: "Develops over weeks of sustained GH/IGF-1 elevation",
    tier: "flag",
    note: "GH is counter-regulatory to insulin — this is established endocrine physiology, not a rare drug effect. If you have any metabolic history, monitor fasting glucose before and during use.",
  },
  {
    name: "Cancer history — IGF-1 growth signal concern",
    detail: "IGF-1 is mitogenic; sustained elevation creates theoretical growth promotion for existing or latent cancer cells",
    frequency: "Population-specific — not a general side effect",
    timing: "Mechanistically relevant throughout sustained use",
    tier: "flag",
    note: "Active cancer diagnosis or active treatment: stop and consult oncologist. High hereditary cancer risk: discuss with provider before starting. This is the same concern as TB-500 but with a stronger mechanistic basis — IGF-1 is a direct mitogen.",
  },
  {
    name: "Water retention / edema",
    detail: "Mild swelling, particularly hands and feet; facial puffiness",
    frequency: "Common, especially in weeks 1–4",
    timing: "Usually early; often resolves as the body adapts",
    tier: "watch",
    note: "GH drives sodium retention via IGF-1. Mild edema is expected and typically self-resolving. Significant or persistent swelling warrants dose reduction or stopping.",
  },
  {
    name: "DAC variant accumulation risk",
    detail: "Multi-day half-life means errors take days to resolve; overuse can lead to prolonged GH elevation",
    frequency: "Specific to DAC formulation; dosing protocol-dependent",
    timing: "Accumulates with each dose if not properly spaced",
    tier: "watch",
    note: "Confusing no-DAC protocols with a DAC product is a real and documented error in the community. Confirm which variant you have. With DAC: dose less frequently, start low, expect longer duration of effects.",
  },
  {
    name: "Flushing / warmth",
    detail: "Transient sensation of warmth or flushing shortly after injection",
    frequency: "Common, especially early",
    timing: "Typically within 30–60 minutes of administration; brief",
    tier: "low",
    note: "Expected with GH-axis stimulation. Usually transient and dose-related. Not a safety signal unless severe or accompanied by palpitations.",
  },
  {
    name: "Headache",
    detail: "Dose-related, typically mild",
    frequency: "Moderate — especially at higher doses",
    timing: "Shortly after administration",
    tier: "low",
    note: "Often resolves with dose reduction. Persistent or severe headache (not typical) warrants reassessment.",
  },
  {
    name: "Injection site reactions",
    detail: "Redness, bruising, or soreness at injection site",
    frequency: "Common (mild); infection rare with proper technique",
    timing: "Immediate to 24 hours",
    tier: "low",
    note: "Standard injectable peptide concerns. Sterile technique, site rotation, and proper SC insertion angle resolve most issues.",
  },
  {
    name: "Severe allergic reaction",
    detail: "Hives, facial swelling, throat tightness, difficulty breathing",
    frequency: "Rare",
    timing: "Rapid onset if it occurs",
    tier: "flag",
    note: "As with any injectable peptide. Know the signs. Have antihistamine accessible.",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; labelColor: string; label: string }> = {
  low:   { bg: "rgba(21,100,58,0.06)",  border: "rgba(21,100,58,0.15)",  labelColor: "#155e38", label: "Low concern" },
  watch: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.16)",   labelColor: "#7c5200", label: "Worth watching" },
  flag:  { bg: "rgba(158,56,0,0.07)",   border: "rgba(158,56,0,0.18)",   labelColor: "#9e3800", label: "Stop signal" },
};

const PLAYBOOK = [
  {
    icon: "📊",
    title: "Metabolic baseline — know your glucose status before starting",
    body: "CJC-1295 stimulates GH, which is counter-regulatory to insulin. In metabolically healthy adults, the body typically compensates. In people with prediabetes, insulin resistance, or type 2 diabetes, this physiological counter-regulation can meaningfully worsen glucose control. Getting a baseline fasting glucose — or knowing your most recent HbA1c — is not excessive caution. It's the minimum responsible check for a GH-axis compound.",
    flags: [
      "Baseline fasting glucose or HbA1c before starting — especially if you have any metabolic history",
      "If you're on metformin or other diabetes medications: do not add CJC-1295 without medical supervision",
      "Monitor for symptoms of poor glucose control: unusual thirst, frequent urination, fatigue, blurred vision",
      "If fasting glucose rises meaningfully (>10–15 mg/dL from baseline): stop and evaluate",
    ],
  },
  {
    icon: "🧬",
    title: "DAC vs no-DAC — this distinction matters more than most people realize",
    body: "CJC-1295 with DAC (drug affinity complex) and CJC-1295 without DAC are pharmacokinetically different compounds for practical purposes. The no-DAC version has an active window of hours and is typically dosed daily or multiple times per week. The DAC version has a half-life of approximately 6–8 days — meaning a single injection can affect GH/IGF-1 levels for over a week. Using a DAC product on a no-DAC dosing schedule results in progressive accumulation and prolonged GH elevation. This is one of the most common and impactful errors in community CJC-1295 use.",
    flags: [
      "Confirm which variant you have before starting — ask your supplier and verify via CoA if possible",
      "No-DAC: shorter window, daily or every-other-day dosing convention, faster return to baseline if stopping",
      "DAC: once or twice weekly dosing at most — start low and don't increase frequency before understanding your response",
      "If you're experiencing unexpectedly prolonged effects (edema, elevated GH effects days after dosing): consider that you may have a DAC product",
    ],
  },
  {
    icon: "🎗️",
    title: "Cancer history check — IGF-1 is a direct mitogen",
    body: "Insulin-like growth factor 1 (IGF-1) — the primary downstream mediator of CJC-1295's effects — is mitogenic. That means it promotes cell proliferation. In healthy people with no cancer, this is the mechanism behind anabolic effects. In people with active cancer, cancer in remission, or high hereditary cancer risk, sustained IGF-1 elevation creates a meaningful mechanistic concern. This is a stronger cancer-related concern than most research peptides because the mechanism is direct, not theoretical.",
    flags: [
      "Active cancer diagnosis: stop immediately — do not use while in active cancer treatment without oncology clearance",
      "Cancer remission in the last 2–3 years: consult your oncologist before starting",
      "High hereditary cancer risk (BRCA, Lynch syndrome, family history): personal risk/benefit assessment with a provider",
      "Hormone-sensitive cancers (breast, prostate): particular attention warranted — GH/IGF-1 axis interactions are more direct",
    ],
  },
  {
    icon: "💉",
    title: "Injection technique and timing",
    body: "CJC-1295 is typically injected subcutaneously. GH pulses are largest during the first few hours of slow-wave sleep — most community protocols time the injection at or close to bedtime to align with natural GH release. Sterile technique is non-negotiable regardless of timing.",
    flags: [
      "Bedtime injection aligns with natural GH pulse physiology — the most common community timing convention",
      "New needle and syringe every injection — never re-use",
      "Proper SC insertion at 45° into a pinched skin fold; rotate sites",
      "Reconstituted peptide: refrigerate, use within 30 days, discard if cloudy or precipitated",
    ],
  },
  {
    icon: "⏱️",
    title: "Cycling awareness — GH-axis compounds aren't designed for continuous use",
    body: "No clinical data exists on the long-term safety of sustained GH-axis stimulation in healthy non-GHD adults. The community convention of cycling (8–12 weeks on, 4–6 weeks off) is not based on published safety data — it reflects reasonable caution about continuous endocrine intervention. Running CJC-1295 continuously for 6+ months without a break places you outside the reference experience base entirely.",
    flags: [
      "Plan your cycle before starting: how long on, how long off",
      "Return-to-baseline check: GH/IGF-1 typically normalizes within 2–4 weeks of stopping (faster with no-DAC)",
      "Don't extend cycles based on 'feeling fine' — absence of acute symptoms isn't absence of downstream effects",
      "If combining with ipamorelin or other GH secretagogues: the additive GH load makes cycling more, not less, important",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Active cancer diagnosis or currently in cancer treatment",
    action: "Stop immediately. IGF-1 is a direct mitogen. Do not use CJC-1295 while in active cancer treatment without explicit oncology clearance.",
  },
  {
    signal: "Fasting glucose noticeably elevated or symptoms of glucose dysregulation (unusual thirst, fatigue, frequent urination)",
    action: "Stop CJC-1295 and check glucose. GH-driven glucose dysregulation is a real and documented metabolic effect — don't push through it.",
  },
  {
    signal: "Significant, persistent edema (hands, feet, face) not resolving after the first few weeks",
    action: "Stop and evaluate. Mild early edema is expected; significant or worsening edema suggests GH load is too high or you may have a DAC product on no-DAC timing.",
  },
  {
    signal: "Hives, facial swelling, throat tightness, or difficulty breathing",
    action: "Stop immediately. Anaphylaxis protocol — epinephrine if available, emergency services if severe.",
  },
  {
    signal: "Pregnant, planning pregnancy, or possibly pregnant",
    action: "Stop immediately. GH-axis manipulation during pregnancy: no safety data exists.",
  },
  {
    signal: "Adolescent use",
    action: "Stop. CJC-1295's endocrine effects on a developing GH axis during adolescence are unknown and potentially consequential for long-term setpoints. This is a hard stop.",
  },
];

export default function Cjc1295SafetyPanel() {
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
          CJC-1295&apos;s risks are concentrated in metabolic status (glucose), cancer history, and variant confusion (DAC vs no-DAC). Address these before starting — they determine your risk profile more than dosing precision does.
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
          CJC-1295 is a step up in risk complexity from BPC-157 or TB-500 — not because it&apos;s dramatically more dangerous, but because it actually changes endocrine physiology systemically. For a metabolically healthy adult with no cancer history and a verified source: the risk is manageable with appropriate monitoring. For someone with prediabetes, cancer history, or a DAC product used on no-DAC timing: the risk profile is meaningfully different.
        </p>
        <p>
          The most important safety actions are: know your metabolic baseline, confirm your variant, gate on cancer history, and plan your cycle before you start — not after.
        </p>
      </div>

    </div>
  );
}
