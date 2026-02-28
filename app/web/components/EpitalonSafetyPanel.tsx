/**
 * EpitalonSafetyPanel — proactive safety for Epitalon.
 * Key frame: favorable acute safety profile in available data — no severe adverse events
 * documented in clinical literature. The primary concern is not acute toxicity but the
 * cancer risk from telomerase activation and source quality in the absence of
 * pharmaceutical-grade products.
 */

const SIDE_EFFECTS = [
  {
    name: "Cancer promotion via telomerase activation — the defining theoretical risk",
    detail: "Telomerase activation (the proposed longevity mechanism) is the same pathway cancer cells use for immortality; exogenous epitalon theoretically promotes growth of pre-existing malignant or pre-malignant cells",
    frequency: "Unknown — the cancer promotion risk is theoretical from mechanism, not documented in human trials; long-term surveillance data does not exist",
    timing: "Long-term cumulative concern — not an acute effect",
    tier: "flag",
    note: "This requires clear framing: the cancer concern is not 'epitalon causes cancer from scratch.' The mechanism is cancer promotion — accelerating growth of cells with malignant potential by activating telomerase, which prevents cell death. Anyone with a personal cancer history is at direct risk from this mechanism. Anyone with family history of telomerase-sensitive cancers (many solid tumors) is at theoretical elevated risk. The absence of definitive human case data showing cancer promotion is not reassuring evidence — it reflects absence of long-term surveillance studies, not a clean bill of health.",
  },
  {
    name: "Injection site reactions — source quality dependent",
    detail: "Redness, pain, or swelling at injection site; more significant with impure or incorrectly prepared product",
    frequency: "Common with suboptimal technique or source; manageable with proper technique and quality product",
    timing: "Acute post-injection",
    tier: "low",
    note: "Standard injectable peptide considerations apply: sterile technique, SC injection at appropriate angle, site rotation, use bacteriostatic water for reconstitution. The injection site reaction risk is proportional to source quality — gray-market peptides with impurities cause more frequent and severe reactions. A third-party CoA is the minimum quality gate.",
  },
  {
    name: "Headache and mild fatigue",
    detail: "Headache and fatigue are the most commonly reported mild side effects in clinical literature",
    frequency: "Uncommon — reported in a minority of clinical trial participants",
    timing: "During active dosing period",
    tier: "low",
    note: "The mild adverse event profile from Khavinson's trials is genuinely favorable — no severe adverse events are documented in the clinical literature at the dosing conventions used. Headache and fatigue are the most cited minor effects. This favorable profile exists in the context of pharmaceutical-grade product and short dosing cycles.",
  },
  {
    name: "Adolescent / pregnant use",
    detail: "Hard stop — no safety data; telomerase activation during development is an unknown risk",
    frequency: "Population-specific",
    timing: "Any point during use",
    tier: "flag",
    note: "Telomerase activation during pregnancy or adolescent development has unknown implications for both developmental biology and cancer risk in developing cells. The absence of safety data is not the absence of risk — it is a genuine unknown in a context where the mechanism creates specific concern.",
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
    title: "Cancer history and family history screening — the primary safety gate",
    body: "Before using epitalon, screen cancer history honestly. Personal cancer history of any kind is a hard stop — the telomerase mechanism applies broadly, not just to specific cancer types. Family history of common telomerase-sensitive cancers (breast, colorectal, prostate) elevates the theoretical concern and warrants additional consideration. Age-appropriate cancer screening before starting (PSA for men, breast screening for women, colorectal by age) is reasonable given the mechanism.",
    flags: [
      "Any personal cancer history: do not use epitalon — the telomerase activation mechanism is directly applicable",
      "Strong family history of common cancers: explicit cancer screening before starting; understand this is a mechanism-based concern, not just a general precaution",
      "Active immunosuppression or immune compromise: the immunomodulatory effects of epitalon are incompletely characterized in this context",
    ],
  },
  {
    icon: "›",
    title: "Source quality — the highest actionable risk variable",
    body: "No pharmaceutical-grade epitalon is commercially available. The safety profile from Khavinson's trials used controlled-quality product. What community users inject is research-grade peptide from suppliers with variable quality control. A third-party certificate of analysis (CoA) covering purity, sterility, and concentration is the minimum standard before injection. Suppliers without CoA are a different risk category than suppliers with verified product.",
    flags: [
      "No third-party CoA available: do not inject — unverified research peptide source quality is a primary real-world safety risk",
      "New supplier: treat as a new risk assessment; CoA verification required even with trusted suppliers when product changes",
      "Reconstitution: use bacteriostatic water, not regular sterile water; proper storage matters for peptide stability",
    ],
  },
  {
    icon: "›",
    title: "Cycling and long-term use — convention, not evidence",
    body: "The community convention of cycling epitalon (typically 10-day courses, 2-4 times per year) is not based on clinical evidence — it's based on the dosing protocols from Khavinson's trials and reasonable caution about continuous telomerase activation. Continuous daily epitalon use is not supported by any evidence base and would produce cumulative telomerase activation without breaks. The cycling convention reflects appropriate uncertainty.",
    flags: [
      "Continuous daily use without cycling: no safety basis for this; the Russian trial protocols used discrete courses",
      "Longer than 14-day consecutive courses: outside the reference data from clinical trials",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Any personal cancer history",
    action: "Do not use epitalon. The telomerase activation mechanism is directly applicable to cancer cell growth promotion — this is not a compound to use with cancer history under any circumstances.",
  },
  {
    signal: "Pregnant or breastfeeding",
    action: "Stop immediately. The implications of telomerase activation during pregnancy and for fetal development are unknown — the mechanism creates specific concern that cannot be resolved by absence of data.",
  },
  {
    signal: "Adolescent use",
    action: "Hard stop. Telomerase activation during development is an unknown risk in a context (developing cells) where the mechanism is most active.",
  },
  {
    signal: "Product without verifiable third-party CoA",
    action: "Do not inject. No pharmaceutical-grade epitalon exists commercially — source quality is the primary real-world safety variable.",
  },
  {
    signal: "New or changing moles, lumps, or unusual tissue changes during use",
    action: "Stop and seek medical evaluation. While not definitively attributable to epitalon, any new tissue growth during a telomerase-activating compound warrants assessment.",
  },
];

export default function EpitalonSafetyPanel() {
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
          Epitalon&apos;s acute safety profile in Khavinson&apos;s trials is favorable — no severe adverse events in the clinical literature. The primary concern is not short-term toxicity but long-term cancer risk from telomerase activation and source quality in an unregulated supply chain. The practical checklist: screen cancer history first, verify source quality, cycle rather than use continuously, and observe the hard stops without exception.
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
          When to stop
        </div>
        <div className="reta-safety__redlines-sub">
          These are stop signals — not suggestions for dose adjustment.
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
          Epitalon&apos;s acute safety profile in the clinical literature is genuinely favorable — this is not a compound with a documented acute toxicity problem at the dosing conventions used in trials. The Russian clinical data does not show severe adverse events.
        </p>
        <p>
          The honest safety framing is about the cancer concern, not acute adverse effects. Telomerase activation is a theoretical cancer promotion risk — the mechanism is real, the human data is insufficient to confirm or deny it at the population level, and the absence of long-term cancer surveillance makes this a genuine unknown rather than a cleared risk. Cancer history is the hard stop. For everyone else, the theoretical cancer promotion risk is the primary consideration in the risk/benefit evaluation — not an argument to dismiss, and not a reason for certainty of harm.
        </p>
        <p>
          The comparison that matters: if the goal is longevity optimization, NAD+ supplementation (sirtuin/mitochondrial pathway) has more Western replication, a better-characterized safety profile, and avoids the telomerase tension entirely. Whether it provides equivalent longevity benefit is unknown — but as a starting point for longevity support with less mechanistic risk, it is worth evaluating first.
        </p>
      </div>

    </div>
  );
}
