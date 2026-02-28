/**
 * HexarelinEvidencePanel — honest, layered evidence for Hexarelin.
 * Key frame: GH release confirmed and potent (higher than other GHRPs in human studies);
 * cortisol/prolactin elevation documented; CD36 cardiac receptor binding documented in animal
 * and limited human data; tachyphylaxis documented in human studies.
 * Enhancement outcome data: absent. Same gap as all GHRPs.
 */

const SIGNALS = [
  {
    label: "GH release in humans",
    value: "Confirmed — high potency",
    note: "Hexarelin produces the largest acute GH pulse of any GHRP class compound — established in human pharmacology studies; the potency advantage over ipamorelin, GHRP-2, and GHRP-6 is documented",
    tier: "strong",
  },
  {
    label: "Cortisol and prolactin elevation",
    value: "Confirmed",
    note: "Cortisol and prolactin elevation following hexarelin administration is documented in human studies — same non-selective profile as GHRP-2 and GHRP-6; ipamorelin was designed to eliminate this",
    tier: "strong",
  },
  {
    label: "Tachyphylaxis / receptor desensitization",
    value: "Confirmed",
    note: "GH response attenuation with continued hexarelin use is documented in human studies — faster and more pronounced than other GHRPs; the mechanism is GHSR1a receptor downregulation",
    tier: "strong",
  },
  {
    label: "CD36 receptor binding",
    value: "Confirmed (animal + limited human)",
    note: "Hexarelin binds the CD36 scavenger receptor independently of the ghrelin receptor and GH release — documented in animal models and limited human cardiac studies; this receptor activity is unique among GHRPs",
    tier: "moderate",
  },
  {
    label: "CD36 cardiac effects in enhancement context",
    value: "Not characterized",
    note: "CD36 binding has been studied in heart failure models (cardioprotective signal in some animal data); what this means for healthy adults using hexarelin for enhancement is completely unstudied",
    tier: "none",
  },
  {
    label: "Body composition / recovery outcomes",
    value: "Not established",
    note: "No controlled trial on body composition or recovery in enhancement-context healthy adults — the same gap as every other GHRP; the tachyphylaxis constraint makes sustained-use outcome studies methodologically complex",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "GH+",    label: "highest acute pulse of any GHRP in human studies",     note: "Hexarelin's GH release potency is documented as exceeding other GHRPs at comparable doses" },
  { stat: "TACHY",  label: "tachyphylaxis confirmed in human studies",              note: "Receptor downregulation with continuous use is a documented hexarelin-specific limitation" },
  { stat: "CD36",   label: "cardiac receptor binding — unique among GHRPs",         note: "CD36 activity documented; enhancement-context implications uncharacterized" },
  { stat: "0",      label: "enhancement-context outcome RCTs",                      note: "No controlled trial on body composition, recovery, or performance in healthy adults" },
];

const MECHANISMS = [
  {
    receptor: "Ghrelin receptor (GHSR1a) — high-potency binding with fast desensitization",
    label: "Strongest acute GH pulse, fastest receptor downregulation",
    tier: "strong",
    body: "Hexarelin is the highest-potency GHRP at the ghrelin receptor — it stimulates GH release more powerfully than ipamorelin, GHRP-2, or GHRP-6. The same receptor interaction also elevates cortisol and prolactin, sharing the non-selective profile of GHRP-2 and GHRP-6. The key differentiator is tachyphylaxis: the ghrelin receptor downregulates with hexarelin more rapidly than with other GHRPs. The practical implication is that hexarelin's potency advantage is time-limited — within 4–8 weeks of continuous use, the GH response has attenuated significantly. Cycling off for 4–6 weeks restores sensitivity.",
    evidence: "GH release human studies: confirmed, documented as highest-potency GHRP. Cortisol and prolactin elevation: confirmed in human pharmacology. Tachyphylaxis: documented in human studies — receptor downregulation is characterized.",
  },
  {
    receptor: "CD36 scavenger receptor — independent of GH axis",
    label: "Unique cardiac receptor activity — cardioprotective in animal models, uncharacterized in healthy adults",
    tier: "moderate",
    body: "Hexarelin binds the CD36 receptor independently of the ghrelin receptor — meaning this activity persists even in conditions where the GH response has desensitized. CD36 has been studied in cardiac biology, and hexarelin's CD36 binding showed cardioprotective effects in heart failure animal models and limited human cardiac data. Whether this represents a benefit, a neutral effect, or a risk in healthy adults using hexarelin for enhancement is genuinely unknown. People with pre-existing cardiac conditions represent the highest uncertainty context — the cardioprotective signal in heart failure models does not necessarily translate to safety in cardiac disease with normal GH axis function.",
    evidence: "CD36 binding: confirmed in animal models and limited human cardiac research. Cardioprotective effect in heart failure models: documented in animal studies. Enhancement-context implications in healthy adults: not studied. Cardiac disease context: interaction profile unstudied.",
  },
  {
    receptor: "GH → IGF-1 axis",
    label: "Downstream anabolic signaling — with tachyphylaxis limiting sustained elevation",
    tier: "moderate",
    body: "GH elevation from hexarelin drives hepatic IGF-1 synthesis — same pathway as all GH-axis compounds. The cancer history concern applies identically. The tachyphylaxis constraint means IGF-1 elevation is also likely to attenuate with continuous use — the downstream anabolic signaling follows the attenuating GH pulse. Net anabolic outcomes are uncharacterized in any controlled study.",
    evidence: "GH/IGF-1 physiology: established. Hexarelin-specific IGF-1 data: less characterized than CJC-1295. Net body composition: not trialed. Tachyphylaxis effect on sustained IGF-1 elevation: logical inference, not independently characterized.",
  },
];

const GAPS = [
  "Enhancement-context outcome data is absent — the same gap as all other GHRPs, compounded by the tachyphylaxis constraint that limits continuous-use protocols",
  "CD36 cardiac receptor binding in healthy adults: implications completely unstudied in enhancement-context populations",
  "Tachyphylaxis trajectory: how much attenuation, over what timeline, and full recovery rate with off-period is not precisely characterized in human studies",
  "Long-term safety of the non-selective cortisol/prolactin burden from hexarelin sustained cycling: not studied",
  "Comparative body composition outcomes vs ipamorelin in healthy adults: never studied",
  "Whether hexarelin's CD36 activity interacts with cardiovascular medications: not studied",
];

const OBSERVED = [
  "The tachyphylaxis limitation is the most consistently reported practical challenge — users describe the GH response visibly attenuating within weeks",
  "Community has largely moved to ipamorelin for sustained GH protocols — hexarelin's tachyphylaxis makes it unsuitable for the same role",
  "Short-cycle use of hexarelin (4–6 week bursts) appears in older protocols — framed as a way to exploit the peak-potency window before desensitization",
  "Cortisol and mood disruption are reported with hexarelin — consistent with the documented non-selective hormonal profile",
  "CD36 binding is occasionally discussed in research-oriented communities as interesting pharmacology — the cardiac implications are treated as genuinely unknown",
  "CJC-1295 + ipamorelin has largely replaced CJC + hexarelin in modern community protocols",
];

export default function HexarelinEvidencePanel() {
  return (
    <div className="reta-evidence">

      {/* ── Evidence at a glance ── */}
      <div>
        <div className="reta-evidence__section-label">Evidence at a glance</div>
        <div className="reta-evidence__signals">
          {SIGNALS.map((s) => {
            const st = TIER_STYLE[s.tier];
            return (
              <div
                key={s.label}
                className="reta-evidence__signal"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-evidence__signal-top">
                  <span className="reta-evidence__signal-dot" style={{ color: st.dot }}>●</span>
                  <span className="reta-evidence__signal-value" style={{ color: st.text }}>{s.value}</span>
                </div>
                <div className="reta-evidence__signal-label">{s.label}</div>
                <div className="reta-evidence__signal-note">{s.note}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Evidence landscape ── */}
      <div>
        <div className="reta-evidence__section-label">The evidence landscape — confirmed pharmacology, absent outcome data</div>
        <div className="reta-evidence__trial-header">
          Hexarelin&apos;s pharmacology is confirmed: GH release (highest potency among GHRPs), cortisol and prolactin elevation, tachyphylaxis, and CD36 receptor binding are all documented. The enhancement-context outcome data is absent — the same gap as other GHRPs. Hexarelin adds the unique complexity of both tachyphylaxis (which limits sustained protocols) and CD36 activity (which introduces an unstudied cardiac dimension).
        </div>
        <div className="reta-evidence__trial-stats">
          {TRIAL_STATS.map((s) => (
            <div key={s.stat} className="reta-evidence__trial-stat">
              <div className="reta-evidence__trial-stat-value">{s.stat}</div>
              <div className="reta-evidence__trial-stat-label">{s.label}</div>
              <div className="reta-evidence__trial-stat-note">{s.note}</div>
            </div>
          ))}
        </div>
        <div className="reta-evidence__trial-callout">
          GH release: confirmed at the highest GHRP potency. Tachyphylaxis: confirmed — the response attenuates faster than other GHRPs. CD36 binding: confirmed — implications in healthy adults unstudied. Enhancement outcome data: absent. These facts coexist honestly.
        </div>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">The mechanism pathways — what we know and what it means</div>
        <div className="reta-evidence__mechanisms">
          {MECHANISMS.map((m) => {
            const st = TIER_STYLE[m.tier];
            return (
              <div
                key={m.receptor}
                className="reta-evidence__mechanism"
                style={{ borderTop: `3px solid ${st.dot}` }}
              >
                <div className="reta-evidence__mechanism-receptor" style={{ color: st.dot }}>
                  {m.receptor}
                </div>
                <div className="reta-evidence__mechanism-label">{m.label}</div>
                <div className="reta-evidence__mechanism-body">{m.body}</div>
                <div className="reta-evidence__mechanism-evidence">{m.evidence}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Honest gaps ── */}
      <div>
        <div className="reta-evidence__section-label">What the evidence doesn&apos;t cover</div>
        <ul className="reta-evidence__gaps">
          {GAPS.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </div>

      {/* ── Real-world observations ── */}
      <div className="reta-evidence__observed-block">
        <div className="reta-evidence__observed-heading">
          What people actually report
          <span className="reta-evidence__observed-badge">Observed — not clinical evidence</span>
        </div>
        <div className="reta-evidence__observed-sub">
          These are patterns from community reports and anecdotal accounts. They don&apos;t have the rigor of trials — but they reflect real use experience, which the published trials don&apos;t capture.
        </div>
        <ul className="reta-evidence__observed-list">
          {OBSERVED.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
        <a className="reta-evidence__community-link" href="#community">
          Read community experiences →
        </a>
      </div>

    </div>
  );
}
