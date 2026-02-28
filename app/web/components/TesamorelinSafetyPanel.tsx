/**
 * TesamorelinSafetyPanel — proactive safety intelligence for Tesamorelin.
 * Key frame: same GH-axis flags (glucose, cancer, allergy). Two tesamorelin-specific
 * dimensions: arthralgia/myalgia documented in prescribing information (watch, manageable);
 * FDA approval means prescribing information safety data is more detailed than gray-market GHRPs.
 */

const SIDE_EFFECTS = [
  {
    name: "Glucose dysregulation — GH counter-regulation to insulin",
    detail: "GH counter-regulation to insulin — documented in prescribing information and trials",
    frequency: "Population-specific — flagged in prescribing information for diabetic patients",
    timing: "Develops over weeks of sustained use",
    tier: "flag",
    note: "Tesamorelin's prescribing information explicitly flags glucose dysregulation — the GH counter-regulatory mechanism applies the same as CJC-1295 and sermorelin. In the HIV trials, subjects with uncontrolled diabetes were excluded. For anyone with diabetes or prediabetes, baseline monitoring is essential.",
  },
  {
    name: "Cancer history — IGF-1 growth signal concern",
    detail: "IGF-1 is mitogenic — contraindicated in active malignancy per prescribing information",
    frequency: "Population-specific — not a general side effect",
    timing: "Mechanistically relevant throughout sustained use",
    tier: "flag",
    note: "Active malignancy is a contraindication in the tesamorelin prescribing information — stated explicitly. Same flag as CJC-1295, ipamorelin, and all GH-axis compounds. The FDA-approved indication comes with formal contraindication language that gray-market compounds don't have.",
  },
  {
    name: "Severe allergic reaction",
    detail: "Hives, facial swelling, throat tightness, difficulty breathing — listed in prescribing information",
    frequency: "Rare",
    timing: "Rapid onset if it occurs",
    tier: "flag",
    note: "As with any injectable peptide. The prescribing information includes hypersensitivity as a listed adverse event.",
  },
  {
    name: "Arthralgia — joint pain",
    detail: "Joint pain documented as one of the most common adverse events in tesamorelin Phase III trials",
    frequency: "Common in trial data — more prominent than with CJC-1295 or sermorelin community reports",
    timing: "Can develop within weeks; usually manageable with dose reduction",
    tier: "watch",
    note: "Arthralgia is the most distinctive clinical differentiation between tesamorelin and other GHRH analogs. It was documented consistently in Phase III trials and in the prescribing information. For most users, it's manageable — dose reduction or discontinuation resolved it in the trials. People with pre-existing joint disease or arthritis have higher baseline risk.",
  },
  {
    name: "Myalgia — muscle pain",
    detail: "Muscle pain or aches — documented in tesamorelin prescribing information",
    frequency: "Reported in trial data alongside arthralgia",
    timing: "Variable onset; typically manageable",
    tier: "watch",
    note: "Myalgia is listed alongside arthralgia in the tesamorelin adverse event profile. Same management approach: monitor, reduce dose if significant, discontinue if severe or not resolving.",
  },
  {
    name: "Water retention / edema",
    detail: "Fluid retention — standard GH-axis response, documented in trials",
    frequency: "Common, especially early",
    timing: "Usually early; typically resolves",
    tier: "low",
    note: "Standard GH-axis response. Documented in tesamorelin trials. Manageable. Significant or persistent swelling warrants dose reduction.",
  },
  {
    name: "Injection site reactions",
    detail: "Erythema, pruritus, pain at injection site — documented in prescribing information",
    frequency: "Common, especially early in use",
    timing: "Site rotation reduces frequency",
    tier: "low",
    note: "Listed in prescribing information as common injection site reactions. Standard injectable peptide management applies: rotate sites, maintain sterile technique.",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; labelColor: string; label: string }> = {
  low:   { bg: "rgba(21,100,58,0.06)",  border: "rgba(21,100,58,0.15)",  labelColor: "#155e38", label: "Low concern" },
  watch: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.16)",   labelColor: "#7c5200", label: "Worth watching" },
  flag:  { bg: "rgba(158,56,0,0.07)",   border: "rgba(158,56,0,0.18)",   labelColor: "#9e3800", label: "Stop signal" },
};

const PLAYBOOK = [
  {
    icon: "🦴",
    title: "Arthralgia and myalgia — tesamorelin's most distinctive clinical challenge",
    body: "Joint and muscle pain are the most prominent adverse events differentiating tesamorelin from other GHRH analogs in clinical data. In Phase III trials, arthralgia was among the most common adverse events. For most participants, it was manageable — dose reduction was the standard response. People with pre-existing joint disease (osteoarthritis, inflammatory arthritis) have higher baseline risk and should monitor more carefully. This is a watch, not a flag — but it's a real effect that distinguishes tesamorelin from CJC-1295 in clinical use.",
    flags: [
      "Baseline joint assessment before starting: note any pre-existing joint pain or arthritis",
      "New or worsening joint pain during use: monitor for progression",
      "Significant arthralgia that affects daily function: dose reduction or discontinuation",
      "Pre-existing arthritis or significant joint disease: discuss with physician before starting — higher baseline risk",
    ],
  },
  {
    icon: "📊",
    title: "Metabolic baseline — same gates as all GHRH analogs",
    body: "Tesamorelin's prescribing information explicitly flags glucose dysregulation — uncontrolled diabetes was an exclusion criterion in the Phase III trials. The GH counter-regulatory mechanism applies the same as CJC-1295: GH opposes insulin action and can worsen insulin resistance over time. Baseline fasting glucose is essential for anyone with metabolic history.",
    flags: [
      "Baseline fasting glucose or HbA1c before starting — explicitly important per prescribing information",
      "Uncontrolled diabetes: do not start — this is a prescribing information exclusion",
      "Controlled diabetes: physician supervision required before adding tesamorelin",
      "Monitor for glucose dysregulation symptoms: unusual thirst, frequent urination, fatigue",
    ],
  },
  {
    icon: "🎗️",
    title: "Cancer history — formal contraindication in prescribing information",
    body: "Active malignancy is a stated contraindication in the tesamorelin prescribing information — not just a caution. The IGF-1 mitogenic concern that applies to all GH-axis compounds has formal regulatory weight here. Same stop-and-consult requirement as CJC-1295 and ipamorelin — but with explicit prescribing information backing.",
    flags: [
      "Active cancer diagnosis: contraindicated per prescribing information — stop immediately",
      "Cancer in remission: consult your oncologist before starting",
      "High hereditary cancer risk: risk/benefit assessment with a provider",
    ],
  },
  {
    icon: "💉",
    title: "Prescription pathway — what the FDA approval means for access and monitoring",
    body: "Tesamorelin is a prescription drug (Egrifta). Legitimate access requires a physician who can prescribe for the approved indication or off-label. The prescription pathway means formal medical oversight — which includes baseline labs, monitoring, and the ability to adjust or discontinue. Off-label use via gray-market sources bypasses the prescription pathway; the safety data from the prescribing information applies regardless of how the compound is sourced.",
    flags: [
      "If using via a physician: the prescribing information's monitoring guidelines apply — follow them",
      "Baseline labs include: fasting glucose, IGF-1 levels (to assess GH response), and any relevant endocrine markers",
      "HIV antiretrovirals (if HIV-positive and on ART): drug interactions with GH-axis elevation are part of the prescribing context",
      "If sourcing outside the prescription pathway: the prescribing information safety data still applies",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Active cancer diagnosis or currently in cancer treatment",
    action: "Stop immediately. Active malignancy is a contraindication in the tesamorelin prescribing information. Do not use without oncology clearance.",
  },
  {
    signal: "Uncontrolled diabetes",
    action: "Do not start. Uncontrolled diabetes was an exclusion criterion in tesamorelin Phase III trials. Physician supervision required for any diabetes management with GHRH analogs.",
  },
  {
    signal: "Hives, facial swelling, throat tightness, or difficulty breathing",
    action: "Stop immediately. Anaphylaxis protocol — emergency services if severe. Listed in prescribing information as a hypersensitivity reaction.",
  },
  {
    signal: "Fasting glucose noticeably elevated or symptoms of glucose dysregulation",
    action: "Stop and check glucose. GH counter-regulation to insulin is documented in prescribing information — metabolic worsening is real.",
  },
  {
    signal: "Pregnant or planning pregnancy",
    action: "Stop immediately. Pregnancy is a contraindication in the tesamorelin prescribing information.",
  },
  {
    signal: "Adolescent use",
    action: "Stop. GH secretagogue use during adolescent development is a hard stop.",
  },
];

export default function TesamorelinSafetyPanel() {
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
          Tesamorelin&apos;s safety profile benefits from formal prescribing information — more detailed adverse event data than any gray-market GHRH analog. The tesamorelin-specific addition to the standard GH-axis profile is arthralgia and myalgia: joint and muscle pain documented in Phase III trials as the most prominent clinical differentiator from other GHRH analogs. The GH-axis flags (glucose, cancer, pregnancy) are identical to CJC-1295.
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
          Tesamorelin has the most well-characterized adverse event profile of any GHRH analog — formal prescribing information from Phase III trials. For a metabolically healthy adult without cancer history, uncontrolled diabetes, or significant joint disease: the safety profile is manageable. Arthralgia is real but typically dose-responsive.
        </p>
        <p>
          The FDA approval means the prescribing information contains safety information that gray-market compounds lack. This is an advantage for informed use — the adverse event profile is documented with RCT-level rigor. The core tradeoff vs CJC-1295: tesamorelin has better evidence for its specific approved indication and a better-documented safety profile, but higher arthralgia/myalgia burden and prescription-pathway access requirements.
        </p>
      </div>

    </div>
  );
}
