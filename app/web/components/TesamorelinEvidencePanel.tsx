/**
 * TesamorelinEvidencePanel — honest, layered evidence for Tesamorelin.
 * Key frame: the strongest specific-outcome evidence of any GHRH analog —
 * RCT data for visceral fat reduction in HIV-associated lipodystrophy.
 * GH release confirmed. Enhancement outcomes in healthy adults: not established.
 * Arthralgia and myalgia: documented in trial data. Long-term safety: limited.
 */

const SIGNALS = [
  {
    label: "GH release in humans",
    value: "Confirmed",
    note: "Tesamorelin reliably stimulates pulsatile GH release via the GHRH receptor — same mechanism as CJC-1295 and sermorelin; confirmed in pharmacology and Phase III trial data",
    tier: "strong",
  },
  {
    label: "Visceral fat reduction (HIV-associated lipodystrophy)",
    value: "RCT-supported",
    note: "Statistically significant and clinically meaningful visceral fat reduction in HIV patients with lipodystrophy — the strongest specific-outcome evidence of any GHRH analog; Phase III multicenter RCTs (PMID 20546028, others)",
    tier: "strong",
  },
  {
    label: "Arthralgia and myalgia",
    value: "Documented in trials",
    note: "Joint pain and muscle pain are the most distinctive and consistently documented side effects from tesamorelin prescribing information — more prominent than in CJC-1295 or sermorelin community data",
    tier: "strong",
  },
  {
    label: "IGF-1 elevation",
    value: "Confirmed",
    note: "IGF-1 elevation was documented in the Phase III trials — the downstream GH/IGF-1 axis behaves as expected; the cancer history concern applies identically to all GHRH analogs",
    tier: "strong",
  },
  {
    label: "Visceral fat reduction in healthy adults (off-label)",
    value: "Not established",
    note: "The HIV-lipodystrophy RCT data does not automatically transfer to healthy adults — different metabolic context, different baseline visceral fat etiology, no controlled trials in healthy enhancement populations",
    tier: "none",
  },
  {
    label: "Body composition / performance outcomes in healthy adults",
    value: "Not established",
    note: "No controlled trial on muscle mass, recovery, or performance outcomes in healthy adults — the same gap as CJC-1295 and sermorelin; the FDA approval is for a specific population, not enhancement",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "RCT",    label: "Phase III data for HIV-lipodystrophy — unique among GHRH analogs",  note: "PMID 20546028 and supporting trials; visceral fat reduction statistically significant vs placebo at 26 weeks" },
  { stat: "FDA",    label: "approved indication — the only approved GHRH analog",               note: "Egrifta approved 2010; approval based on Phase III RCTs; narrow indication (HIV-associated lipodystrophy)" },
  { stat: "AE+",    label: "arthralgia and myalgia documented in prescribing information",       note: "Joint and muscle pain are the most distinctive and consistently reported adverse events from trial data" },
  { stat: "0",      label: "RCTs in healthy adults for enhancement outcomes",                   note: "No controlled trial on body composition, recovery, or performance in healthy adult enhancement populations" },
];

const MECHANISMS = [
  {
    receptor: "GHRH receptor (GHRHr) — same as CJC-1295 and sermorelin",
    label: "Pulsatile GH amplification — with RCT-level validation for one specific outcome",
    tier: "strong",
    body: "Tesamorelin acts on the GHRH receptor in the pituitary to stimulate pulsatile GH release — the same fundamental mechanism as CJC-1295 and sermorelin. Unlike synthetic analogues (CJC-1295), tesamorelin is a modified form of native GHRH(1–44) with a trans-3-hexenoic acid group added to improve stability. The receptor pharmacology is the same; the structural modification affects bioavailability and half-life rather than receptor selectivity. Phase III trials confirmed GH and IGF-1 elevation alongside the visceral fat outcomes.",
    evidence: "GHRH receptor mechanism: established. GH/IGF-1 elevation in Phase III trials: confirmed. Visceral fat reduction in HIV-lipodystrophy: RCT-supported. Enhancement outcomes in healthy adults: not established.",
  },
  {
    receptor: "GH → IGF-1 → visceral fat metabolism",
    label: "Visceral fat reduction — RCT-confirmed in HIV-lipodystrophy, extrapolated for off-label",
    tier: "strong",
    body: "GH has known effects on visceral fat metabolism — it promotes lipolysis and reduces visceral fat accumulation. In HIV patients with lipodystrophy (a condition involving abnormal fat redistribution, partly caused by antiretroviral therapy), this GH effect was sufficient to produce statistically significant visceral fat reduction in Phase III RCTs. The mechanism plausibly transfers to healthy adults with excess visceral fat. Whether the magnitude of effect, the timeline, and the benefit/risk ratio translate to an off-label population is not proven — the metabolic context differs significantly.",
    evidence: "Visceral fat reduction in HIV-lipodystrophy: RCT-confirmed (Phase III). GH/lipolysis mechanism: established biology. Transfer to healthy adults: biologically plausible, not controlled. Dose-response and timeline in off-label use: extrapolated from HIV trial data.",
  },
  {
    receptor: "GH → IGF-1 → cancer history concern",
    label: "Same IGF-1 mitogenic concern as all GHRH analogs",
    tier: "strong",
    body: "The Phase III trials confirmed IGF-1 elevation with tesamorelin — the same downstream effect as CJC-1295 and sermorelin. The cancer history concern applies identically: IGF-1 is a mitogenic growth factor, and active cancer or recent cancer treatment is a contraindication in the prescribing information. This is the same flag applied to all GH-axis compounds.",
    evidence: "IGF-1 elevation: confirmed in Phase III trials. Cancer contraindication: stated in prescribing information. Mitogenic mechanism: established biology shared with all GHRH analogs.",
  },
];

const GAPS = [
  "Visceral fat reduction in healthy adults (off-label): the HIV-lipodystrophy RCT data does not transfer automatically — no controlled trial in healthy enhancement populations",
  "Body composition, muscle mass, and performance outcomes in healthy adults: not trialed",
  "Long-term safety of continuous use in healthy adults: the Phase III trials were 26–52 weeks in HIV patients; off-label long-term safety is not characterized",
  "Mechanism of arthralgia and myalgia: documented in trials but not fully characterized; risk factors for severity not established",
  "Post-discontinuation rebound: the Phase III data showed visceral fat returning after stopping — whether cycling protocols preserve off-label gains is not studied",
  "Interaction with common non-HIV medications in an enhancement population: the trial safety data is from HIV patients on antiretrovirals, which may not reflect off-label users",
];

const OBSERVED = [
  "Joint and muscle pain (arthralgia/myalgia) are the most consistently reported user-level complaints — consistent with prescribing information and trial adverse event data",
  "The FDA-approval framing creates a different prescribing dynamic than gray-market GHRPs — some users access it through anti-aging clinics or weight management physicians",
  "Community typically frames tesamorelin as 'CJC-1295 with better visceral fat evidence' — a reasonable framing that also acknowledges the off-label extrapolation",
  "Water retention in early weeks is reported — consistent with standard GH-axis response",
  "Some users report the arthralgia as a reason to switch to CJC-1295, which has a lower arthralgia/myalgia signal in community experience",
  "The post-discontinuation rebound of visceral fat noted in trials is cited in community discussions as a reason for concern about cycling protocols",
];

export default function TesamorelinEvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — strongest GHRH analog data, in the wrong population for most users</div>
        <div className="reta-evidence__trial-header">
          Tesamorelin has the highest-quality evidence of any GHRH analog — FDA approval based on Phase III RCTs. That evidence is for one specific thing: visceral fat reduction in HIV patients with lipodystrophy. For healthy adults pursuing enhancement, tesamorelin is in the same evidence position as CJC-1295 and sermorelin — plausible mechanism, no controlled outcome data. The arthralgia and myalgia side effects documented in the trials are a meaningful clinical difference vs other GHRH analogs.
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
          FDA approval and RCT data: confirmed for HIV-associated lipodystrophy. GH and IGF-1 elevation: confirmed. Arthralgia/myalgia: documented in prescribing information. Enhancement outcomes in healthy adults: not established — same gap as CJC-1295. These facts coexist honestly.
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
