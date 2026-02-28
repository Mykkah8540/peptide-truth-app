/**
 * SermorelinSafetyPanel — proactive safety intelligence for Sermorelin.
 * Key frame: GH-axis compound with same systemic considerations as CJC-1295,
 * plus two sermorelin-specific additions:
 * - Thyroid disease caution: GH/thyroid axis interacts bidirectionally
 * - Prescription context: legitimate access path exists; gray-market still carries identity/purity risk
 */

const SIDE_EFFECTS = [
  {
    name: "Glucose dysregulation",
    detail: "GH counter-regulation to insulin — worsened glucose control in susceptible users",
    frequency: "Population-specific — significant risk in prediabetes/insulin resistance; lower in metabolically healthy adults",
    timing: "Develops over weeks of sustained GH elevation",
    tier: "flag",
    note: "Same mechanism as CJC-1295 and ipamorelin: GH is counter-regulatory to insulin. If you have any metabolic history, baseline glucose monitoring is the minimum responsible check before starting. In GHD treatment, glucose monitoring is standard practice.",
  },
  {
    name: "Cancer history — IGF-1 growth signal concern",
    detail: "IGF-1 is mitogenic — same concern as all GHRH analogs, same mechanism, same recommendation",
    frequency: "Population-specific — not a general side effect",
    timing: "Mechanistically relevant throughout sustained use",
    tier: "flag",
    note: "Active cancer or active treatment: stop and consult oncologist. Sermorelin's FDA history in GHD doesn't change the IGF-1 mitogenic concern — cancer patients were excluded from GHD trials for this reason.",
  },
  {
    name: "Severe allergic reaction",
    detail: "Hives, facial swelling, throat tightness, difficulty breathing",
    frequency: "Rare",
    timing: "Rapid onset if it occurs",
    tier: "flag",
    note: "As with any injectable peptide. Know the signs before starting. Prescription-context sermorelin from a compounding pharmacy should have purity documentation — gray-market versions carry the same contaminant risk as any unregulated injectable.",
  },
  {
    name: "Thyroid function interaction",
    detail: "GH elevation can affect T4/T3 conversion and TSH dynamics; untreated thyroid disease adds uncontrolled variable",
    frequency: "Population-specific — most relevant in those with thyroid disease",
    timing: "Develops with sustained GH elevation over weeks",
    tier: "watch",
    note: "This is the most sermorelin-specific caution beyond the standard GH-axis flags. Untreated thyroid disease was explicitly listed as a reason for caution in the original clinical context. Thyroid function should be established and stable before starting any GHRH analog.",
  },
  {
    name: "Water retention / edema",
    detail: "Mild puffiness, especially face, hands, feet — early GH response",
    frequency: "Common, especially weeks 1–4",
    timing: "Usually early; typically resolves as the body adapts",
    tier: "watch",
    note: "Expected GH-axis response. Same as CJC-1295. Mild edema is manageable. Significant or persistent swelling warrants dose reduction or stopping.",
  },
  {
    name: "Injection site reactions",
    detail: "Redness, bruising, soreness at injection site; infection rare with proper technique",
    frequency: "Common (mild)",
    timing: "Immediate to 24 hours",
    tier: "watch",
    note: "Standard subcutaneous injectable profile. Prescription-route sermorelin via compounding pharmacy typically comes with preparation guidance. Sterile technique and site rotation resolve most issues.",
  },
  {
    name: "Flushing",
    detail: "Transient warmth or redness, especially in face — listed in sermorelin's clinical profile",
    frequency: "Moderate — noted in the clinical pharmacology literature",
    timing: "Shortly after injection; often fades with time",
    tier: "low",
    note: "One of sermorelin's more distinctive common side effects — noted in clinical documentation more than for CJC-1295. Typically brief and manageable. Persistent or severe flushing warrants dose reduction.",
  },
  {
    name: "Headache / nausea",
    detail: "Non-specific, typically mild — listed in sermorelin clinical safety profile",
    frequency: "Moderate — especially early or at higher doses",
    timing: "Shortly after administration; often fades with time",
    tier: "low",
    note: "Consistent with the clinical safety data from GHD use. Usually resolves with dose reduction or as the body adapts. Persistent or severe headache — especially with visual changes — warrants prompt evaluation.",
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
    title: "Metabolic baseline — glucose check before starting",
    body: "GH counter-regulation to insulin is established endocrine physiology — not a sermorelin-specific side effect. Sermorelin amplifies GH release through the GHRH receptor; the downstream metabolic consequence (reduced insulin sensitivity) is the same as CJC-1295 or ipamorelin. In clinical GHD treatment, glucose monitoring is standard practice. For enhancement use: get a baseline fasting glucose before starting if you have any metabolic history. If using through a physician protocol, this is likely already included — verify with your prescriber.",
    flags: [
      "Baseline fasting glucose or HbA1c before starting — especially if you have metabolic history",
      "On diabetes medications: do not add sermorelin without medical supervision",
      "Monitor for glucose dysregulation symptoms: unusual thirst, frequent urination, unexplained fatigue",
      "Fasting glucose rising noticeably from baseline: stop and evaluate",
    ],
  },
  {
    icon: "🦋",
    title: "Thyroid check — sermorelin-specific consideration",
    body: "GH elevation affects thyroid hormone metabolism — GH can influence T4-to-T3 conversion and TSH dynamics. Untreated thyroid disease was included as a caution in sermorelin's clinical context. Adding a GHRH analog when thyroid function is unchecked or unstable introduces an uncontrolled variable. Thyroid status should be established and stable before starting. If you're already on thyroid medication, a discussion with your prescribing physician is appropriate before adding sermorelin.",
    flags: [
      "Untreated or undiagnosed thyroid disease: address before starting — don't add a GH-axis compound to an unstable thyroid status",
      "On levothyroxine or liothyronine: discuss with prescribing physician before starting",
      "Watch for thyroid symptoms emerging or changing during a cycle: fatigue, cold intolerance, unexplained weight changes",
      "Physician protocols typically include thyroid function labs — use them",
    ],
  },
  {
    icon: "💊",
    title: "Prescription pathway vs gray market — use the legitimate route",
    body: "Sermorelin is unique among GH-axis peptides discussed in enhancement contexts: it has a real prescription pathway through compounding pharmacies in some jurisdictions. If you're going to use sermorelin, using the legitimate route provides meaningful benefits: known purity, CoA from the pharmacy, physician oversight with labs, and access to the full clinical context from GHD treatment. Gray-market sermorelin exists and carries all the same sourcing risks as any unregulated injectable — product identity, purity, and dosing consistency are all uncertain outside regulated manufacturing.",
    flags: [
      "Prescription route: verify the compounding pharmacy's USP compliance and CoA practices before filling",
      "Gray-market sermorelin: same sourcing rules as any unregulated injectable — get a CoA, don't inject without one",
      "Physician protocols include labs (IGF-1, glucose, thyroid) that gray-market use typically lacks — those labs are meaningful anchors",
      "If you can access the prescription route, the risk-management advantage is real",
    ],
  },
  {
    icon: "🎗️",
    title: "Cancer history — identical concern to all GHRH analogs",
    body: "Sermorelin's FDA history in GHD doesn't change the cancer history concern — cancer patients were excluded from GHD trials precisely because of the IGF-1 mitogenic concern. Active cancer, recent treatment, or high hereditary cancer risk requires oncology discussion before starting any GHRH analog, including sermorelin.",
    flags: [
      "Active cancer diagnosis: stop immediately — do not use without oncology clearance",
      "Cancer in remission (last 2–3 years): consult your oncologist before starting",
      "High hereditary cancer risk: personal risk/benefit assessment with a provider",
      "Hormone-sensitive cancers: particular attention warranted — IGF-1 axis interactions are direct",
    ],
  },
  {
    icon: "💉",
    title: "Injection technique and timing",
    body: "Standard subcutaneous injection protocol. Bedtime timing is the convention — aligns with the body's primary GH pulse window. Sermorelin's shorter half-life (~90 min) vs CJC-1295 means some protocols use twice-daily dosing; follow the protocol guidance from your prescribing physician or source documentation.",
    flags: [
      "New needle and syringe every injection — never re-use",
      "Alcohol swab on vial septum and injection site before every use",
      "Proper SC insertion at 45° into a pinched skin fold; rotate sites",
      "Reconstituted: refrigerate, use within the timeframe specified by your compounding pharmacy or source",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Active cancer diagnosis or currently in cancer treatment",
    action: "Stop immediately. IGF-1 is a direct mitogen. Sermorelin's FDA history in GHD is not a safety clearance for cancer patients — they were excluded from those trials for this reason.",
  },
  {
    signal: "Fasting glucose noticeably elevated or symptoms of glucose dysregulation",
    action: "Stop and check glucose. GH-driven glucose effects are real — don't push through worsening metabolic symptoms.",
  },
  {
    signal: "Untreated or unstable thyroid disease identified",
    action: "Stop and address thyroid status first. Running a GHRH analog with uncontrolled thyroid function adds an uncharacterized variable to an already complex endocrine interaction.",
  },
  {
    signal: "Hives, facial swelling, throat tightness, or difficulty breathing",
    action: "Stop immediately. Anaphylaxis protocol — epinephrine if available, emergency services if severe.",
  },
  {
    signal: "Severe persistent headache, especially with visual changes",
    action: "Stop and seek evaluation. Persistent severe headache is listed in sermorelin's clinical safety profile as warranting prompt attention.",
  },
  {
    signal: "Pregnant, planning pregnancy, or possibly pregnant",
    action: "Stop immediately. No safety data for GH-axis compounds during pregnancy.",
  },
  {
    signal: "Adolescent use",
    action: "Stop. GH secretagogue use during adolescent development carries real risks to endocrine setpoints. Hard stop.",
  },
];

export default function SermorelinSafetyPanel() {
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
          Sermorelin&apos;s risk profile is similar to CJC-1295 with two sermorelin-specific additions: thyroid function interaction (worth checking before starting) and the prescription pathway consideration (if you can use the legitimate route, the risk-management advantage is real). Metabolic baseline, cancer history gate, and cycling awareness are identical to any GH-axis compound.
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
          Sermorelin&apos;s FDA history makes it the most clinically validated GH-axis compound discussed in enhancement contexts — but that validation is in GH-deficient patients, not healthy adults. For a metabolically healthy adult with no cancer history, stable thyroid function, and a verified source (or legitimate prescription route): the risk profile is manageable with appropriate monitoring.
        </p>
        <p>
          The three variables that most determine individual risk: metabolic status (glucose), cancer history, and thyroid function. Address all three before starting — not during. The prescription pathway advantage is real: physician oversight, lab monitoring, and compounding pharmacy quality control meaningfully improve the risk-management picture if you can access it.
        </p>
      </div>

    </div>
  );
}
