/**
 * EpitalonOverviewPanel — decision-oriented overview for Epitalon.
 * Key frame: a synthetic tetrapeptide from Soviet-era longevity research.
 * Real but limited human data (Khavinson's trials); telomerase activation
 * is a genuine dual-edge mechanism — the same pathway that promotes longevity
 * also promotes cancer cell immortality. Evidence is Russian, small, and not
 * independently replicated at scale. The cancer concern requires honest framing.
 */

const STAT_CARDS = [
  {
    value: "Tetrapeptide",
    label: "Ala-Glu-Asp-Gly — synthetic analog of pineal gland-derived epithalamin",
    sub: "Epitalon is a synthetic version of epithalamin, a polypeptide extract from bovine pineal glands studied in Soviet longevity research starting in the 1980s. The tetrapeptide sequence (Ala-Glu-Asp-Gly) is the active fragment; the synthetic version is what the community uses",
    note: "The pineal gland connection is pharmacologically real — the pineal gland regulates melatonin secretion and circadian biology. The proposed mechanism is that epitalon restores age-related decline in pineal function, which is why sleep and melatonin effects are the most commonly reported acute experience.",
  },
  {
    value: "Telomerase",
    label: "proposed primary mechanism — hTERT activation and telomere extension",
    sub: "Epitalon is proposed to activate telomerase reverse transcriptase (hTERT), the enzyme that extends telomere length. Shortened telomeres are associated with cellular aging; telomerase activation theoretically slows this process. In vitro evidence for epitalon-induced telomerase activity exists",
    note: "The telomerase angle is genuinely interesting and genuinely double-edged. The same hTERT activation that could protect against cellular aging is the same pathway that makes cancer cells immortal — telomerase is highly expressed in most cancer cells precisely because it prevents cellular death. Anyone considering epitalon needs to sit with this tension honestly rather than dismissing it.",
  },
  {
    value: "Russian trials",
    label: "the evidence base — Khavinson's St. Petersburg Institute data, decades of work",
    sub: "The primary human evidence comes from Khavinson and colleagues at the St. Petersburg Institute of Bioregulation and Gerontology — small RCTs in elderly cohorts showing reduced all-cause mortality and age-related disease markers. This evidence is real but has significant methodological limitations and limited independent Western replication",
    note: "Dismissing the Russian trials entirely is not intellectually honest — they represent decades of consistent findings in the same direction. Taking them at face value without Western replication is also not honest. The calibrated position: real signal, real limitations, real unknowns. The evidence is not zero, and it is not solid.",
  },
  {
    value: "Research-grade",
    label: "regulatory status — no FDA approval, no pharmaceutical-grade standard",
    sub: "Epitalon is not FDA-approved for any indication. It is available as a research chemical from peptide suppliers with widely variable quality. The pharmaceutical-grade products from Russian clinical trials are not the same as gray-market research peptides — quality, purity, and sterility are not regulated",
    note: "Source quality is the primary practical safety variable for a compound in this regulatory space. The safety data from Russian trials assumed pharmaceutical-grade product. What most community users actually inject is research-grade material from unregulated suppliers — a meaningful distinction that the community underweights.",
  },
];

const FIT_YES = [
  "You have longevity or age-related goals and understand the evidence base is primarily small Russian trials with limited independent replication — the evidence ceiling is honest and you're working within it",
  "You have no personal or family history of cancer — the telomerase activation mechanism is a real theoretical cancer concern; cancer history makes this compound inappropriate",
  "You have verified source quality with a third-party certificate of analysis — no pharmaceutical-grade product exists, so CoA verification is the minimum quality gate",
  "You're interested in the sleep and circadian effects — the melatonin-pathway effects are the most consistently reported acute experience and some people use epitalon specifically for sleep quality goals",
];

const FIT_NO = [
  "You have any personal or family history of cancer — the telomerase activation mechanism promotes cancer cell immortality; this is not a theoretical concern to rationalize around in the presence of cancer history",
  "You expect dramatic anti-aging results quickly — the proposed longevity mechanisms are cumulative and years-scale, not weeks-scale; short-term subjective improvement is primarily sleep-related",
  "You are not willing to verify source quality — no pharmaceutical-grade epitalon is commercially available; gray-market research peptides carry real purity and sterility uncertainty",
  "You are pregnant, breastfeeding, or an adolescent — no safety data exists in these populations; the developmental biology implications of telomerase activation in these contexts are unknown",
  "You are expecting the cancer concern to be resolved by 'low dose' reasoning — the telomerase mechanism doesn't have a clearly established safe dose threshold for cancer promotion risk",
];

const TIMELINE = [
  {
    phase: "Weeks 1–2",
    heading: "Sleep and circadian effects — the most commonly reported acute experience",
    body: "The most consistently reported early effect is improved sleep quality — vivid dreams, deeper sleep, more refreshed waking. This is consistent with the pineal/melatonin mechanism. If epitalon is producing any acute effect in weeks 1-2, it is most likely through this pathway. Don't interpret sleep effects as evidence of anti-aging action — they're a different mechanism.",
  },
  {
    phase: "Weeks to months",
    heading: "The evidence window — no validated short-term biomarker for longevity effect",
    body: "The longevity claims in Russian trials were evaluated over years, not weeks. There is no validated short-term biomarker that tells you epitalon is 'working' for longevity purposes. Telomere length testing is commercially available but has significant measurement variability and does not predict individual outcomes reliably. Operating in this space means accepting an extended and uncertain evaluation window.",
  },
  {
    phase: "Long-term",
    heading: "The honest uncertainty — years-scale claims, insufficient data",
    body: "Khavinson's trials showed reduced all-cause mortality in elderly cohorts over 6-15 years — that's a meaningful claim with a meaningful evidence base. It's also in a specific population (elderly Russian patients), in a specific era, with specific methodological limitations. Whether these findings translate to healthy adults using research-grade epitalon in 2025 is genuinely unknown. The community convention of cycling (short courses with breaks) reflects appropriate caution about a compound with an incompletely characterized long-term profile.",
  },
];

const COMPARISON = [
  {
    name: "Epitalon",
    badge: "Tetrapeptide / Pineal-derived",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Telomerase activation (hTERT) + pineal melatonin pathway modulation" },
      { label: "Evidence", value: "Small Russian trials — real findings, limited independent replication" },
      { label: "Acute effects", value: "Sleep quality improvement is most commonly reported; longevity effects are years-scale" },
      { label: "Cancer concern", value: "Genuine — telomerase activation promotes cancer cell immortality; cancer history is a hard stop" },
      { label: "Status", value: "Research-grade only; no FDA approval, no pharmaceutical standard" },
    ],
    highlight: true,
  },
  {
    name: "NAD+",
    badge: "Coenzyme / OTC",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Sirtuin activation, mitochondrial energy, DNA repair — AMPK/sirtuin longevity pathways" },
      { label: "Evidence", value: "Better-characterized in humans than epitalon; more independent replication" },
      { label: "Acute effects", value: "Energy, cognitive clarity — more consistently reported than epitalon's acute effects" },
      { label: "Cancer concern", value: "PARP inhibitor interaction (NAD+ is substrate for PARP); PARP inhibitor patients should not use" },
      { label: "Status", value: "OTC supplement; IV also available clinically" },
    ],
    highlight: false,
  },
  {
    name: "Humanin",
    badge: "Mitochondrial peptide",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Mitochondrial-derived peptide; cytoprotective, insulin sensitizing, AMPK activation" },
      { label: "Evidence", value: "Earlier-stage evidence than epitalon — animal models and biomarker studies" },
      { label: "Acute effects", value: "No well-characterized acute human experience; preclinical focus" },
      { label: "Cancer concern", value: "Mixed — humanin has anti-apoptotic effects (could protect cancer cells)" },
      { label: "Status", value: "Research-grade only" },
    ],
    highlight: false,
  },
];

export default function EpitalonOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A Soviet-era longevity peptide with real but limited human data — and a telomerase mechanism that cuts both ways.
        </div>
        <div className="reta-overview__headline-sub">
          Epitalon is a synthetic tetrapeptide derived from pineal gland research. The longevity community uses it for telomere extension and anti-aging goals. The evidence from Khavinson&apos;s trials is real — small RCTs in elderly cohorts showing reduced mortality — but it hasn&apos;t been independently replicated at scale and the quality of available research-grade products is unregulated. The telomerase mechanism is the defining tension: the same pathway that could slow cellular aging also promotes cancer cell immortality. Anyone evaluating this compound needs to hold that tension honestly.
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="reta-overview__stats">
        {STAT_CARDS.map((s) => (
          <div key={s.value} className="reta-overview__stat">
            <div className="reta-overview__stat-value">{s.value}</div>
            <div className="reta-overview__stat-label">{s.label}</div>
            <div className="reta-overview__stat-sub">{s.sub}</div>
            <div className="reta-overview__stat-note">{s.note}</div>
          </div>
        ))}
      </div>

      {/* ── Fit matrix ── */}
      <div className="reta-overview__section-label">Is this the right call for you?</div>
      <div className="reta-overview__fit">
        <div className="reta-overview__fit-col reta-overview__fit-col--yes">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">✓</span> Fits your situation if…
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_YES.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="reta-overview__fit-col reta-overview__fit-col--no">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">✗</span> Look elsewhere if…
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_NO.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="reta-overview__section-label">What to actually expect</div>
      <div className="reta-overview__timeline">
        {TIMELINE.map((t, i) => (
          <div key={i} className="reta-overview__timeline-item">
            <div className="reta-overview__timeline-phase">{t.phase}</div>
            <div className="reta-overview__timeline-heading">{t.heading}</div>
            <div className="reta-overview__timeline-body">{t.body}</div>
          </div>
        ))}
      </div>

      {/* ── Comparison ── */}
      <div className="reta-overview__section-label">Epitalon vs NAD+ vs Humanin</div>
      <div className="reta-overview__compare-note">
        All three are discussed in the longevity space. NAD+ has more independent Western replication and better-characterized human evidence than epitalon. Humanin is earlier-stage still. The mechanisms are different — epitalon works primarily via telomerase/pineal pathways; NAD+ via sirtuin/mitochondrial pathways; humanin via mitochondrial cytoprotection.
      </div>
      <div className="reta-overview__compare">
        {COMPARISON.map((col) => (
          <div
            key={col.name}
            className={`reta-overview__compare-col${col.highlight ? " reta-overview__compare-col--active" : ""}`}
          >
            <div className="reta-overview__compare-name">
              {col.name}
              <span
                className="reta-overview__compare-badge"
                style={{ color: col.badgeColor, background: col.badgeBg }}
              >
                {col.badge}
              </span>
            </div>
            {col.rows.map((row) => (
              <div key={row.label} className="reta-overview__compare-row">
                <div className="reta-overview__compare-row-label">{row.label}</div>
                <div className="reta-overview__compare-row-value">{row.value}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}
