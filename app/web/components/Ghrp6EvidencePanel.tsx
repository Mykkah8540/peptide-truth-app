/**
 * Ghrp6EvidencePanel — honest, layered evidence for GHRP-6.
 * Key frame: similar evidence profile to GHRP-2 — GH release confirmed in human studies,
 * cortisol/prolactin elevation documented, appetite stimulation the most extreme of any GHRP.
 * Enhancement outcome data: absent. The extreme appetite adds a practical evidence gap —
 * body composition studies couldn't control for the caloric intake pressure even if they existed.
 */

const SIGNALS = [
  {
    label: "GH release in humans",
    value: "Confirmed",
    note: "GHRP-6 reliably stimulates GH release — established in human pharmacology studies; one of the original research GHRPs that demonstrated ghrelin receptor → GH release in humans",
    tier: "strong",
  },
  {
    label: "Cortisol elevation",
    value: "Confirmed",
    note: "cortisol elevation following GHRP-6 administration is documented in human studies — same non-selective profile as GHRP-2; this is characterized pharmacology",
    tier: "strong",
  },
  {
    label: "Prolactin elevation",
    value: "Confirmed",
    note: "prolactin elevation alongside GH release is documented for GHRP-6 — part of the non-selective GHRP profile",
    tier: "strong",
  },
  {
    label: "Appetite stimulation",
    value: "Confirmed — extreme",
    note: "GHRP-6 produces the most intense hunger stimulation of any GHRP class compound — this is pharmacologically documented and consistently reported; it is a mechanism-driven effect, not a side effect to manage around",
    tier: "strong",
  },
  {
    label: "Body composition / recovery outcomes",
    value: "Not established",
    note: "no controlled trial on body composition or recovery outcomes in enhancement context — the extreme appetite stimulation makes a controlled body composition trial methodologically complex even conceptually",
    tier: "none",
  },
  {
    label: "Long-term safety in healthy adults",
    value: "No data",
    note: "completely unstudied for sustained enhancement use — chronic cortisol/prolactin elevation and chronic extreme appetite stimulation are both uncharacterized",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "GH+",    label: "release confirmed in human pharmacology",      note: "GHRP-6 human GH release data contributed to establishing the ghrelin receptor → GH release mechanism" },
  { stat: "CORT+",  label: "cortisol elevation documented",                 note: "non-selective profile confirmed — cortisol and prolactin elevation are characterized pharmacological effects" },
  { stat: "Hunger", label: "most extreme appetite of any GHRP class",       note: "GHRP-6 produces stronger appetite stimulation than GHRP-2 or ipamorelin — pharmacologically documented, consistently reported" },
  { stat: "0",      label: "enhancement-context outcome RCTs",               note: "no controlled trial on body composition, recovery, or performance outcomes in healthy adults" },
];

const MECHANISMS = [
  {
    receptor: "Ghrelin receptor (GHSR1a) — high-potency activation",
    label: "Extreme appetite and strong GH release — the defining GHRP-6 mechanism",
    tier: "strong",
    body: "GHRP-6 binds the ghrelin receptor with potent activity — producing both robust GH release and the most intense appetite stimulation of any GHRP compound. Ghrelin is endogenously the 'hunger hormone': its receptor activation drives both GH secretion from the pituitary and hunger signaling in the hypothalamus. GHRP-6's potency at this receptor means both effects are at the extreme end of the GHRP spectrum. The GH mechanism is the same as ipamorelin; the appetite magnitude is fundamentally different. This appetite signal is not manageable by timing or dose scheduling in the same way ipamorelin's is — it's the ghrelin receptor working at full intensity.",
    evidence: "Ghrelin receptor pharmacology established. GH release in humans: confirmed. Appetite stimulation magnitude: documented in pharmacology studies and community reports. Cortisol and prolactin elevation: confirmed in human studies.",
  },
  {
    receptor: "Cortisol / HPA axis — non-selective burden",
    label: "Catabolic counter-pressure — same as GHRP-2",
    tier: "strong",
    body: "GHRP-6 produces cortisol elevation alongside GH — the same non-selective pharmacological profile as GHRP-2. Cortisol is catabolic: it promotes protein breakdown and opposes the anabolic GH signal. Running GHRP-6 for recovery or body composition goals means managing three competing physiological signals simultaneously: GH anabolism, cortisol catabolism, and extreme appetite driving caloric surplus. The net body composition outcome depends heavily on the user's ability to manage all three.",
    evidence: "Cortisol elevation from GHRP-6: documented in human pharmacology. Net body composition effect: not trialed; mechanistically complex given three simultaneous competing signals.",
  },
  {
    receptor: "GH → IGF-1 axis",
    label: "Downstream anabolic signaling — with appetite and cortisol counter-pressures",
    tier: "moderate",
    body: "GH elevation from GHRP-6 drives hepatic IGF-1 synthesis — same pathway as ipamorelin, CJC-1295, and all GH-axis compounds. IGF-1 mediates GH's anabolic effects; the cancer history concern applies identically. In GHRP-6's case, the IGF-1 anabolic signal operates against the cortisol catabolic signal and alongside extreme appetite stimulation — making net body composition prediction more complex than with selective GHRPs.",
    evidence: "GH/IGF-1 physiology established. GHRP-6-specific IGF-1 data: less characterized than CJC-1295 or MK-677. Net body composition with cortisol counter-pressure: not trialed.",
  },
];

const GAPS = [
  "Enhancement-context outcome data is absent — and GHRP-6's extreme appetite stimulation makes controlled body composition research methodologically difficult even to conceive",
  "Net body composition effect of GH + cortisol + extreme caloric intake pressure: these three simultaneous signals are not characterized in any controlled study",
  "Chronic cortisol elevation from sustained GHRP-6 use: long-term implications not studied",
  "Eating disorder risk from extreme appetite stimulation in vulnerable individuals: not studied in enhancement contexts",
  "Long-term safety of sustained non-selective GHRP use in healthy adults: not characterized",
  "Comparative body composition outcomes vs ipamorelin in controlled conditions: never studied",
];

const OBSERVED = [
  "GHRP-6's hunger effect is the most consistently and prominently reported aspect in community use — often described as overwhelming in the first weeks",
  "Users pursuing aggressive weight gain or bulking protocols cite the appetite effect as an asset — this represents a specific use case where GHRP-6's characteristic is a goal, not a limitation",
  "Community has moved to ipamorelin as the standard GHRP — GHRP-6 appears in older protocols and in specific bulking contexts",
  "Mood and sleep disruption are reported with GHRP-6 — consistent with cortisol elevation; similar to GHRP-2 community reports",
  "The cortisol 'counterproductive for cutting' framing is common in community discussion — accurately captures the fundamental tension between GHRP-6's cortisol profile and fat loss goals",
  "CJC+GHRP-6 stacks appear in older community literature — largely replaced by CJC+ipamorelin for most users",
];

export default function Ghrp6EvidencePanel() {
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
          GHRP-6&apos;s pharmacology is confirmed: GH release, cortisol elevation, prolactin elevation, and extreme appetite stimulation are all documented in human studies. The enhancement-context outcome data is absent — the same gap as GHRP-2 and ipamorelin. GHRP-6 adds the unique complexity that extreme appetite stimulation makes body composition outcomes especially difficult to assess or study.
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
          GH release: confirmed. Cortisol elevation: confirmed. Appetite stimulation: confirmed at the extreme end of the GHRP class. Enhancement outcome data: absent. These facts coexist honestly — GHRP-6 works pharmacologically; the net benefit in enhancement contexts is not trialed.
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
