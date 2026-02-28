/**
 * BpcSafetyPanel — proactive safety intelligence for BPC-157.
 * The key frame: side effects of the compound are mild and poorly characterized.
 * The dominant real-world risk is supply chain — contamination, mislabeling, purity.
 * Secondary: injection technique, and the specific population/drug interaction concerns.
 */

const SIDE_EFFECTS = [
  {
    name: "Sourcing / contamination risk",
    detail: "Impure product, mislabeled peptide, synthesis byproducts",
    frequency: "Real in unregulated market",
    timing: "Any — depends on supplier quality",
    tier: "flag",
    note: "This is the primary risk vector — not the compound itself. Third-party CoA before use is the mitigation.",
  },
  {
    name: "Severe allergic reaction",
    detail: "Hives, facial swelling, difficulty breathing",
    frequency: "Rare",
    timing: "Rapid onset if it occurs",
    tier: "flag",
    note: "As with any injectable peptide. Know the signs. Have antihistamine accessible.",
  },
  {
    name: "Injection site reactions",
    detail: "Redness, bruising, soreness, and — if technique or product is poor — infection",
    frequency: "Common (mild); infection is rare with proper sterile technique",
    timing: "Immediate to within 24–48 hours",
    tier: "watch",
    note: "Sterile prep, proper SC insertion, and site rotation resolve most of these. Escalating redness/warmth after 24 hrs warrants medical evaluation.",
  },
  {
    name: "Headache",
    detail: "Dose-related, generally mild",
    frequency: "Common at higher doses",
    timing: "Shortly after administration",
    tier: "low",
    note: "Often resolves with dose reduction. Hydration helps.",
  },
  {
    name: "Nausea / GI upset",
    detail: "Stomach discomfort, particularly at higher doses",
    frequency: "Occasional",
    timing: "Dose-dependent",
    tier: "low",
    note: "Ironic for a peptide often used for GI goals. Usually resolves. Oral route for GI may produce different pattern than injectable.",
  },
  {
    name: "Fatigue / 'off' feeling",
    detail: "Non-specific systemic feeling reported by some users",
    frequency: "Occasional",
    timing: "Variable — not clearly dose-dependent",
    tier: "low",
    note: "Often resolves. If persistent, stop and reassess — could reflect product quality issue.",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; labelColor: string; label: string }> = {
  low:   { bg: "rgba(21,100,58,0.06)",  border: "rgba(21,100,58,0.15)",  labelColor: "#155e38", label: "Low concern" },
  watch: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.16)",   labelColor: "#7c5200", label: "Worth watching" },
  flag:  { bg: "rgba(158,56,0,0.07)",   border: "rgba(158,56,0,0.18)",   labelColor: "#9e3800", label: "Stop signal" },
};

const PLAYBOOK = [
  {
    icon: "🔬",
    title: "Source quality — the highest-leverage variable",
    body: "For BPC-157, product quality is not a nice-to-have — it's the primary safety variable. An unregulated peptide market means no manufacturing standards, no purity guarantees, and no accountability for what's actually in the vial. The compound's own side effect profile is relatively mild; the impurities in poorly made product are not.",
    flags: [
      "Third-party certificate of analysis (CoA) from an independent lab — get this before purchase, not after",
      "Look for: amino acid sequence confirmation, purity percentage (aim for 98%+), heavy metal testing",
      "Established community reputation + transparent testing history matters more than price",
      "If a vendor doesn't provide or resists sharing a CoA, that is your answer",
    ],
  },
  {
    icon: "💉",
    title: "Injection technique — sterile is non-negotiable",
    body: "Subcutaneous injection is the primary route for systemic BPC-157 use. Done correctly, SC injection is straightforward. Done incorrectly or non-sterile, it introduces infection risk that has nothing to do with BPC-157 and everything to do with technique. Needle stick injury, contaminated vials, and re-used needles are all avoidable.",
    flags: [
      "New needle and syringe for every injection — never re-use",
      "Alcohol swab on the vial septum and injection site",
      "Proper SC insertion angle (45°) into a pinched skin fold",
      "Rotate injection sites to avoid tissue buildup",
      "Reconstituted peptide: refrigerate, use within 30 days, discard if cloudy or precipitates form",
    ],
  },
  {
    icon: "🎯",
    title: "Set a hypothesis — know what you're evaluating",
    body: "BPC-157 is frequently used without a clear framework for evaluation. The result is that people continue indefinitely because they 'feel like it might be helping' or stop early because they expected acute effects that aren't how this compound works. Before starting, decide: what specific outcome are you targeting, what's your evaluation window, and what would tell you it's not working.",
    flags: [
      "Specific goal: e.g., 'improve recovery time for left shoulder tendinopathy over 8 weeks'",
      "Baseline assessment: note current symptom level before starting so you have something to compare",
      "Planned evaluation date: 6–8 weeks minimum for injectable structural use",
      "Exit criteria: if nothing has changed at 10–12 weeks, that's meaningful data — not a reason to run another cycle immediately",
    ],
  },
  {
    icon: "💊",
    title: "NSAIDs and the feedback loop problem",
    body: "Many people use BPC-157 precisely because they want to get off NSAIDs for injury management. A less obvious risk: using BPC-157 for recovery while still relying on NSAIDs chronically masks the pain signal that tells you whether the underlying issue is actually healing. Pain is feedback. Removing it pharmacologically while simultaneously trying to support healing makes it genuinely difficult to know what's working.",
    flags: [
      "If using BPC-157 for injury recovery, reconsider chronic NSAID use during the evaluation period",
      "Acute NSAID use (single dose for temporary relief) is a different situation from daily use",
      "The goal is to understand your injury's actual trajectory — you need the feedback signal intact",
    ],
  },
  {
    icon: "⚠️",
    title: "Special population check",
    body: "Several populations face heightened uncertainty with BPC-157. For most users these don't apply — but they're worth an honest check before starting.",
    flags: [
      "Pregnant or breastfeeding: stop immediately — no safety data exists",
      "Adolescents: developmental uncertainty is explicitly flagged; the risk calculus is different for a developing system",
      "Active autoimmune disease on prescription immunomodulators: interaction unknowns are real — clinical consultation warranted",
      "Stacking multiple unverified peptides: each compound in an unregulated stack multiplies quality risk, not just pharmacological risk",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Increasing redness, warmth, swelling, or pus at an injection site after 24 hours",
    action: "This is infection until proven otherwise. Stop injecting at that site. Seek medical evaluation — injection site infections can escalate.",
  },
  {
    signal: "Hives, facial swelling, throat tightness, or difficulty breathing",
    action: "Stop immediately. This is anaphylaxis protocol. Epinephrine if available, emergency services if severe.",
  },
  {
    signal: "Persistent chest pain, fainting, or severe shortness of breath",
    action: "Stop and seek medical care. These are not expected effects — treat as serious until evaluated.",
  },
  {
    signal: "Pregnant, planning pregnancy, or possibly pregnant",
    action: "Stop immediately. No safety data exists. There is no acceptable risk threshold here.",
  },
  {
    signal: "Product does not have a verifiable third-party CoA",
    action: "Don't inject it. This isn't a red line mid-protocol — it's a gate before you start. Don't cross it.",
  },
  {
    signal: "Something feels meaningfully off from your normal baseline",
    action: "Stop and evaluate. Non-specific 'wrongness' can reflect product quality issues. Don't push through it.",
  },
];

export default function BpcSafetyPanel() {
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
          BPC-157&apos;s direct side effect profile is mild. The risk is almost entirely in sourcing, injection technique, and use context. These are all controllable variables.
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
          BPC-157&apos;s direct side effect profile is mild and well-tolerated by most users. The compound&apos;s own risk is low. What&apos;s not low is the risk profile of the market it exists in — unregulated, variable quality, no manufacturing accountability.
        </p>
        <p>
          The single highest-leverage safety action is verifying product quality before use, not managing side effects during use. Injection technique is second. Everything else is context-specific. If those two anchors are in place, the remaining risk is manageable and proportionate to the investigational status of the compound.
        </p>
      </div>

    </div>
  );
}
