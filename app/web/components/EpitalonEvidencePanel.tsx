/**
 * EpitalonEvidencePanel — honest evidence for Epitalon.
 * Key frame: real but limited. Soviet-era longevity trials are genuine work with
 * genuine limitations. Telomerase activation is mechanistically real and cuts both ways.
 * No large Western RCTs. Independent replication is the gap.
 */

const SIGNALS = [
  {
    label: "All-cause mortality reduction in elderly cohorts — Khavinson's long-term trials",
    value: "Suggestive — Russian trials only, not independently replicated",
    note: "Khavinson et al. conducted multiple trials in elderly cohorts over 6-15 years showing reduced all-cause mortality in groups receiving epithalamin or epitalon vs controls. These are real controlled trials, not case series. The methodological quality varies; sample sizes are small; Soviet and post-Soviet research standards differ from FDA trial design; independent replication in Western populations is essentially absent. The signal is real. The confidence level should be calibrated accordingly.",
    tier: "moderate",
  },
  {
    label: "Telomerase activation (hTERT induction) — in vitro evidence",
    value: "Mechanistically established in vitro — human in vivo not confirmed",
    note: "In vitro studies show epitalon induces telomerase reverse transcriptase (hTERT) expression in human cells, leading to telomere elongation. This is the proposed mechanism for the longevity effects. The in vitro finding is real and published. Translation to in vivo telomere extension in humans has not been formally confirmed in well-controlled human studies.",
    tier: "moderate",
  },
  {
    label: "Sleep quality improvement — melatonin pathway effects",
    value: "Consistent anecdotal and limited clinical reports",
    note: "The pineal gland-melatonin connection means epitalon theoretically restores age-related decline in pineal melatonin secretion. Sleep quality improvement is the most consistently reported subjective effect in both clinical accounts and community experience. Small studies suggest melatonin synthesis normalization. This is the most plausible and most experienced acute effect — not a longevity claim, but a sleep physiology claim.",
    tier: "moderate",
  },
  {
    label: "Cancer cell growth promotion — the double-edge of telomerase activation",
    value: "Documented concern — telomerase is a cancer hallmark",
    note: "Telomerase (hTERT) is one of the defining hallmarks of cancer — the vast majority of cancer cells maintain telomere length through telomerase activity, which is what makes them immortal. Epitalon's proposed mechanism (telomerase activation) is the same mechanism cancer cells exploit for immortality. Whether exogenous epitalon promotes existing cancer cell growth in humans is not established by direct evidence — but the mechanism is real and the theoretical risk is not dismissible.",
    tier: "none",
  },
  {
    label: "Immunomodulatory effects — restoration of age-related immune decline",
    value: "Preliminary — small studies, limited characterization",
    note: "Several Khavinson studies report immune parameter improvements (thymic function, lymphocyte counts, natural killer cell activity) in elderly populations receiving epithalamin/epitalon. The immunomodulatory evidence is the second-most cited benefit claim after longevity. The data is small, not independently replicated, and the clinical significance for healthy adults is not established.",
    tier: "moderate",
  },
  {
    label: "Antioxidant and oxidative stress reduction",
    value: "Limited — animal models and small human studies",
    note: "Some studies report reductions in oxidative stress markers (lipid peroxidation, antioxidant enzyme activity) with epitalon treatment. This is pharmacologically plausible but not a primary mechanistic claim. The clinical significance for healthy adults pursuing longevity goals is not established.",
    tier: "moderate",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "Small",   label: "RCT sample sizes — most trials are tens to low hundreds of participants",       note: "Khavinson's trials are controlled but not powered at the scale of modern pharmaceutical trials" },
  { stat: "6-15yr",  label: "follow-up in long-term mortality trials — the most meaningful evidence",         note: "The mortality findings come from genuinely long follow-up periods; this is not short-term surrogate endpoint data" },
  { stat: "~0",      label: "large independent Western RCTs — the defining evidence gap",                     note: "No Western research group has conducted a large, pre-registered RCT of epitalon in comparable populations" },
  { stat: "In vitro",label: "telomerase activation evidence — not confirmed by in vivo human telomere studies", note: "hTERT induction in cell culture is established; in vivo human telomere extension data is not" },
];

const MECHANISMS = [
  {
    receptor: "Telomerase (hTERT) — the longevity mechanism and the cancer risk in the same pathway",
    label: "Activating the enzyme that extends telomeres is the same as activating the enzyme that makes cancer cells immortal",
    tier: "moderate",
    body: "Telomere length shortens with each cell division — this is one of the hallmarks of cellular aging. Telomerase (specifically hTERT) is the enzyme that can extend telomeres, slowing this aging process. Epitalon is proposed to induce hTERT expression. The same mechanism is exploited by cancer cells: ~85% of cancers maintain telomere length through telomerase activity, which prevents the cell death that would otherwise terminate abnormal cell proliferation. Epitalon's mechanism cannot selectively activate telomerase in healthy cells while leaving cancer cells unaffected — the pathway is the same.",
    evidence: "hTERT as longevity mechanism: established in aging biology literature. hTERT as cancer hallmark: established in oncology. Epitalon-induced hTERT in vitro: published (Khavinson, Vanyushin et al.). In vivo human telomere extension from epitalon: not confirmed in large independent studies.",
  },
  {
    receptor: "Pineal gland / melatonin pathway — the circadian and sleep mechanism",
    label: "Restoration of age-related pineal decline — the most plausible acute mechanism",
    tier: "moderate",
    body: "Melatonin secretion from the pineal gland declines substantially with age. Epithalamin (the parent compound) was proposed to restore pineal function and melatonin synthesis in aged animals. Epitalon may work through a similar mechanism — the most commonly reported acute effect (improved sleep quality, more vivid dreams, deeper sleep) is consistent with melatonin pathway modulation. This is a distinct mechanism from the telomerase pathway and probably accounts for the majority of the acute user experience.",
    evidence: "Age-related pineal melatonin decline: established. Epithalamin effects on pineal function in animals: published. Epitalon effects on human melatonin secretion: limited, mostly from Khavinson group.",
  },
];

const GAPS = [
  "Large, pre-registered Western RCTs in comparable healthy populations: absent — all the mortality data comes from small Russian trials",
  "In vivo telomere extension in humans: not confirmed by independent large-scale measurement studies",
  "Whether telomerase activation from epitalon selectively targets healthy vs. cancer cells: not established; the mechanism does not suggest selectivity",
  "Long-term cancer risk from telomerase activation in human use: not studied; the theoretical mechanism creates a surveillance obligation that cannot be resolved by existing data",
  "Optimal dosing and cycling protocols: entirely convention-based; the Russian trial dosing is not comparable to the community's typical injection protocols",
  "Bioavailability and pharmacokinetics of various routes (subcutaneous injection vs. intranasal vs. oral): not fully characterized in independent studies",
];

const OBSERVED = [
  "Sleep quality improvement is the most consistently reported effect — across multiple online communities, vivid dreams and deeper sleep are the primary acute experience",
  "Many users report 'nothing noticeable' — particularly for the longevity claims; this is consistent with a compound whose proposed benefits are cumulative and years-scale",
  "Cycling protocols (typically 10-day courses, 2-3 times per year) are the dominant community convention — not evidence-based, but reflects appropriate uncertainty about long-term continuous use",
  "Cancer history is increasingly cited as a hard stop in informed community discussions — the telomerase mechanism is becoming more widely understood as a genuine dual concern",
  "Source quality variation is a major practical discussion point — community members increasingly report testing results from different suppliers showing significant purity variation",
];

export default function EpitalonEvidencePanel() {
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
        <div className="reta-evidence__section-label">The evidence landscape — real signal, real limitations, defining gap</div>
        <div className="reta-evidence__trial-header">
          Khavinson&apos;s research represents decades of consistent work in one direction — that is not nothing. But it is also not what &apos;strong evidence&apos; means in 2025 pharmacology. The defining gap is independent Western replication of the longevity findings at adequate statistical power. Until that gap is closed, epitalon sits in the same evidence space as many longevity compounds: real mechanistic plausibility, suggestive human data, insufficient confirmation. The cancer concern from the telomerase mechanism is not nullified by the absence of definitive human data — absence of evidence is not evidence of absence when the mechanism is established.
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
          The longevity claims require years-scale evaluation and no validated short-term biomarker. The sleep effects are the only near-term outcome most users can actually assess.
        </div>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">The mechanism pathways — the longevity hope and the cancer risk share the same biology</div>
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
          Community reports from longevity-focused users. Epitalon attracts a more research-oriented subset of the longevity community than most peptides.
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
