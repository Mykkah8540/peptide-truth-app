/**
 * Tb500SafetyPanel — proactive safety intelligence for TB-500.
 * Key frame: real-world risks are sourcing/identity confusion, cancer history concern,
 * and injection technique — not primarily the compound's direct pharmacology.
 * Cancer caution is meaningfully higher than BPC-157 due to tissue-growth signaling.
 */

const SIDE_EFFECTS = [
  {
    name: "Sourcing / product identity risk",
    detail: "Mislabeled product, impure synthesis, variable fragment composition",
    frequency: "Real in unregulated market",
    timing: "Any — depends entirely on supplier",
    tier: "flag",
    note: "Unlike BPC-157, identity confusion is an additional layer — \"TB-500\" as a market name covers products of variable composition. Third-party CoA is the minimum gate.",
  },
  {
    name: "Severe allergic reaction",
    detail: "Hives, facial swelling, throat tightness, difficulty breathing",
    frequency: "Rare",
    timing: "Rapid onset if it occurs",
    tier: "flag",
    note: "As with any injectable peptide. Know the signs before starting. Have antihistamine accessible.",
  },
  {
    name: "Cancer history — tissue-growth signaling concern",
    detail: "Tβ4/TB-500 is involved in cell migration and tissue growth signaling pathways",
    frequency: "Population-specific, not a general side effect",
    timing: "Mechanistically relevant throughout use",
    tier: "flag",
    note: "This is not an acute side effect — it's a population-specific concern. Active cancer or recent treatment warrants oncology consultation before starting. This is the key risk asymmetry versus BPC-157.",
  },
  {
    name: "Injection site reactions",
    detail: "Redness, bruising, soreness; infection if technique or product is poor",
    frequency: "Common (mild); infection rare with proper sterile technique",
    timing: "Immediate to within 24–48 hours",
    tier: "watch",
    note: "Sterile prep, proper SC insertion angle, and site rotation resolve most of these. Escalating redness or warmth after 24 hrs warrants evaluation.",
  },
  {
    name: "Headache",
    detail: "Dose-related, generally mild",
    frequency: "Common at higher doses",
    timing: "Shortly after administration",
    tier: "low",
    note: "Often resolves with dose reduction. Consistent with other injectable peptides in the same class.",
  },
  {
    name: "Nausea / GI discomfort",
    detail: "Stomach discomfort, occasional",
    frequency: "Occasional",
    timing: "Dose-dependent",
    tier: "low",
    note: "Usually mild and transient. Typically resolves or improves with lower dose.",
  },
  {
    name: "Fatigue",
    detail: "Non-specific systemic feeling reported by some users",
    frequency: "Occasional",
    timing: "Variable",
    tier: "low",
    note: "Often resolves. If persistent, stop and reassess — could reflect product quality issue rather than the compound itself.",
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
    title: "Source quality and product identity — the highest-leverage variables",
    body: "For TB-500, product quality screening has two layers: purity (same as any peptide) and identity (unique to TB-500's market situation). \"TB-500\" is a market name applied to products that may vary in molecular composition, fragment length, or purity. A CoA that doesn't confirm the specific peptide sequence is less useful than one that does. This isn't paranoia — it's proportionate to a market where product identity is genuinely variable.",
    flags: [
      "Third-party certificate of analysis (CoA) with sequence confirmation — before purchase, not after",
      "Look for: amino acid sequence verification (LKKTETQ or equivalent), purity percentage (aim 98%+), heavy metal panel",
      "Vendor reputation and transparent third-party testing history matter more than price",
      "If a vendor doesn't provide or resists sharing a full CoA, that's your answer",
    ],
  },
  {
    icon: "›",
    title: "Cancer history check — this is the TB-500 risk asymmetry",
    body: "Tβ4's role in cell migration and tissue repair involves growth-promoting signaling pathways. For most people this is irrelevant. For people with active cancer, recent cancer treatment, or high-risk cancer history, this creates a real mechanistic concern that warrants oncology discussion before starting. This is the most important population-specific risk that distinguishes TB-500 from other recovery peptides.",
    flags: [
      "Active cancer diagnosis of any kind — stop; consult oncologist before starting",
      "Active chemotherapy or targeted cancer therapy — stop; interaction unknowns with tissue-growth signaling are real",
      "Recent cancer treatment (last 2–3 years) — consult before starting, especially for hormone-sensitive or growth-factor-sensitive cancers",
      "High hereditary cancer risk with no active diagnosis — this is a personal risk/benefit call worth discussing with a provider",
    ],
  },
  {
    icon: "›",
    title: "Injection technique — sterile is non-negotiable",
    body: "Subcutaneous injection is the standard route for TB-500. The risk here is not the compound — it's technique. Infection at an injection site has nothing to do with TB-500 pharmacology and everything to do with whether the process was clean. New needle, swabbed septum, swabbed skin, rotated site, stored correctly.",
    flags: [
      "New needle and syringe for every injection — never re-use",
      "Alcohol swab on the vial septum and injection site before every use",
      "Proper SC insertion angle (45°) into a pinched skin fold",
      "Rotate injection sites — tissue buildup is avoidable",
      "Reconstituted: refrigerate, use within 30 days, discard if cloudy or precipitate forms",
    ],
  },
  {
    icon: "›",
    title: "Set a hypothesis — know what you're evaluating",
    body: "TB-500 is frequently used without a clear outcome hypothesis. The result is indefinite use because things 'seem better' or early stopping because effects weren't immediate — when this peptide (if it works) operates over weeks. Before starting: define the specific outcome, the evaluation window, and what non-improvement at 8–10 weeks means to you.",
    flags: [
      "Specific goal: e.g., 'improve left hamstring tendon recovery trajectory over 8 weeks'",
      "Baseline note: document current symptom level so you have a comparison point",
      "Minimum evaluation window: 6–8 weeks for soft tissue goals",
      "Exit criteria: no change at 10–12 weeks is meaningful data — act on it",
    ],
  },
  {
    icon: "›",
    title: "Bleeding risk check",
    body: "Tβ4/TB-500 angiogenic and actin-regulation mechanisms may have additive effects with anticoagulant or antiplatelet medications. This isn't a confirmed interaction — it's a mechanistically plausible one. If you're on warfarin, a DOAC (apixaban, rivaroxaban, etc.), or daily aspirin/clopidogrel for a cardiovascular indication, this warrants a discussion before starting.",
    flags: [
      "Prescription anticoagulants (warfarin, heparin, apixaban, rivaroxaban, dabigatran): discuss with prescriber before starting",
      "Prescription antiplatelets (clopidogrel, ticagrelor) for cardiovascular protection: same — discuss first",
      "Diagnosed bleeding disorder (hemophilia, von Willebrand): contraindicated without specialist input",
      "High-dose anticoagulant herbs (fish oil >3g/day, ginkgo, garlic supplements): note the additive risk",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Active cancer diagnosis or currently in cancer treatment",
    action: "Stop immediately. Tβ4/TB-500 biology involves tissue growth signaling. Do not resume without oncology clearance.",
  },
  {
    signal: "Increasing redness, warmth, swelling, pus, or fever at an injection site after 24 hours",
    action: "This is infection until proven otherwise. Stop injecting at that site. Seek medical evaluation — injection site infections can escalate quickly.",
  },
  {
    signal: "Hives, facial swelling, throat tightness, or difficulty breathing",
    action: "Stop immediately. Anaphylaxis protocol. Epinephrine if available, emergency services if severe.",
  },
  {
    signal: "Unexplained bruising, prolonged bleeding, or blood in urine/stool while on an anticoagulant",
    action: "Stop TB-500 and contact your prescribing physician. Possible additive anticoagulation effect.",
  },
  {
    signal: "Pregnant, planning pregnancy, or possibly pregnant",
    action: "Stop immediately. No safety data exists. There is no acceptable risk threshold here.",
  },
  {
    signal: "Product does not have a verifiable third-party CoA with sequence confirmation",
    action: "Don't inject it. This is a gate before you start — not a red line mid-protocol.",
  },
];

export default function Tb500SafetyPanel() {
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
          TB-500&apos;s direct side effect profile is mild. The risks that matter are sourcing/identity, cancer history, injection technique, and anticoagulant status. All are controllable variables if you address them before starting.
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
          TB-500&apos;s direct side effect profile is mild — consistent with BPC-157 and similar injectable peptides. The compound&apos;s own risk is low for most people. What&apos;s not low is the combination of an unregulated market with product identity uncertainty and a meaningful cancer history concern that doesn&apos;t apply to most other recovery peptides.
        </p>
        <p>
          For people without cancer history, on no anticoagulants, with a verified source: the risk profile is manageable and proportionate to the investigational status of the compound. For people with cancer history or on anticoagulants: those specific concerns need to be addressed before starting, not managed around.
        </p>
      </div>

    </div>
  );
}
