/**
 * Cjc1295DacOverviewPanel — decision-oriented overview for CJC-1295 with DAC.
 * Key frame: DAC (Drug Affinity Complex) modification extends half-life to ~8 days
 * via albumin binding. This is a fundamentally different pharmacological context
 * from CJC-1295 no-DAC — continuous GH stimulation, not pulsatile. Accumulation,
 * washout planning, and glucose monitoring are substantially more important than
 * with shorter-acting GHRH analogs.
 */

const STAT_CARDS = [
  {
    value: "~8 days",
    label: "half-life — DAC modification enables albumin binding; continuous GH stimulation vs pulsatile from no-DAC",
    sub: "The DAC (Drug Affinity Complex) modification is a maleimidoproprionic acid (MPA) conjugate attached to CJC-1295 that reacts with Lys34 of circulating albumin. Albumin has a 19-day half-life in plasma and acts as an endogenous drug carrier — once CJC-1295 DAC is bound to albumin, it is protected from enzymatic degradation and cleared at albumin's rate rather than the peptide's intrinsic rate. The result: an effective half-life of approximately 8 days for the DAC-modified CJC-1295. The 2006 Teichman human trial (PMID 16352683) demonstrated sustained GH and IGF-1 elevation for up to 14 days after a single injection.",
    note: "The 8-day half-life changes every practical parameter of CJC-1295 DAC compared to no-DAC. Steady-state accumulation takes 4-5 half-lives to reach (~5-6 weeks of weekly dosing). Any side effect from a dose will persist for approximately a week before half the dose is eliminated. The GH axis is continuously stimulated rather than pulsed. These are not minor convenience differences — they represent a meaningfully different pharmacological context requiring different expectations and more conservative management.",
  },
  {
    value: "Albumin binding via DAC",
    label: "mechanism of extension — maleimidoproprionic acid conjugate reacts with Lys34 of albumin; not a change to the GHRH active sequence",
    sub: "The DAC modification adds a maleimidoproprionic acid linker to the lysine at position 29 of CJC-1295 (the modified GHRH analog). This linker reacts with the free cysteine-34 of circulating albumin in a thiol-maleimide reaction, forming a stable covalent bond. The GHRH receptor-activating sequence of CJC-1295 is unchanged — the modification is on a portion of the molecule that does not contact the GHRH receptor directly. Once albumin-bound, the CJC-1295-DAC/albumin complex circulates and the GHRH peptide portion continues to activate pituitary GHRH receptors as albumin passes through pituitary fenestrated capillaries.",
    note: "Understanding that DAC is a covalent albumin-binding modification — not a slow-release depot or a prodrug — has implications for how to think about dose. The GHRH active sequence is the same as no-DAC CJC-1295. What changes is persistence: once albumin-bound, the compound recirculates for days. This means no-DAC and DAC CJC-1295 are NOT interchangeable at the same mcg dose — a no-DAC dose produces a transient effect; the same dose of DAC produces a persistent one.",
  },
  {
    value: "PMID 16352683",
    label: "human evidence — the 2006 Teichman trial; once-weekly or biweekly dosing sustained GH/IGF-1 elevation for 14 days",
    sub: "The foundational human evidence for CJC-1295 DAC is the 2006 dose-ranging trial by Teichman et al. (published in the Journal of Clinical Endocrinology & Metabolism). This randomized, placebo-controlled, dose-escalation study in healthy adults administered single or multiple subcutaneous injections of DAC-GRF (the original name) at doses ranging from 30 to 120 mcg/kg. Results showed dose-dependent GH increases (2-10 fold above baseline) sustained for 6+ days, IGF-1 increases of 30-120% above baseline sustained for 14 days, and no serious adverse events at the doses studied. This is the primary human pharmacokinetic and pharmacodynamic reference for the compound.",
    note: "The 2006 Teichman trial provides essential dose-response and duration data — but the study was a single-dose or two-dose short-term pharmacokinetic study, not a long-term efficacy or safety study. It establishes pharmacokinetics reliably. Long-term safety, optimal dosing for specific goals, and effects at community dosing patterns (weekly for months) are extrapolated from this single clinical study and community experience — not from long-term RCT data.",
  },
  {
    value: "Weekly dosing protocol",
    label: "practical implication — DAC enables once-weekly injections vs daily/EOD for no-DAC; but accumulation requires washout planning",
    sub: "The primary practical advantage of CJC-1295 DAC is dosing convenience: once-weekly subcutaneous injection versus the daily or every-other-day injections required for no-DAC CJC-1295 or sermorelin. However, this convenience comes with a pharmacological tradeoff that many users underestimate. With an 8-day half-life and weekly dosing, each weekly dose adds to the residual concentration from previous doses. Full steady-state accumulation takes approximately 5-6 weeks. At steady state, GH and IGF-1 are continuously elevated — not pulsatile. This means that if problems develop (glucose dysregulation, edema, carpal tunnel symptoms), stopping the last injection does not quickly resolve exposure — residual compound persists for weeks.",
    note: "The accumulation pharmacology also means that starting dose and steady-state dose are different experiences. The first injection may produce a mild effect. After 6+ weeks of weekly dosing, the cumulative GH/IGF-1 elevation is substantially higher. Side effects that were absent in the first 2-4 weeks may emerge at steady-state. 'Starting on DAC' and 'being at steady-state on DAC' are different pharmacological states — this is less true for no-DAC compounds with shorter half-lives.",
  },
];

const FIT_YES = [
  "You have used no-DAC CJC-1295 or another GHRH analog at stable doses and tolerated it well, and you want to reduce injection frequency — DAC's once-weekly dosing is a genuine convenience advantage for tolerant users",
  "You understand and accept continuous GH/IGF-1 elevation as distinct from pulsatile stimulation — some users prefer the sustained elevation; this is a legitimate preference if the trade-offs are understood",
  "You have physician oversight including IGF-1 monitoring and glucose assessment — weekly dosing with accumulation dynamics makes physician-guided monitoring more important than with shorter-acting compounds",
  "You are in a context where daily injection adherence is difficult and once-weekly dosing would substantially improve consistency — adherence advantage is real and has value if the pharmacological context is accepted",
];

const FIT_NO = [
  "You confused DAC with no-DAC in your supply — these are not interchangeable at the same dose; DAC at a no-DAC dose builds up to continuous high-level GH stimulation in a way that no-DAC does not; verify your product before dosing",
  "You want pulsatile GH stimulation that mimics physiological GH pulses — CJC-1295 DAC produces continuous stimulation by design; ipamorelin + no-DAC CJC-1295 or sermorelin are the appropriate choices for pulsatile protocols",
  "You are new to GH axis compounds — start with shorter-acting compounds (ipamorelin, sermorelin, no-DAC CJC-1295) to establish your individual response and tolerance before committing to a compound with an 8-day half-life and accumulation dynamics",
  "Cancer history — continuous GH/IGF-1 elevation from CJC-1295 DAC represents a sustained anabolic and potentially mitogenic stimulus; the cancer contraindication applies to CJC-1295 in any form, and the DAC variant amplifies continuous IGF-1 exposure",
];

const TIMELINE = [
  {
    phase: "First 1-2 injections",
    heading: "Initial response — GH and IGF-1 rise from baseline; not yet at steady-state accumulation",
    body: "The first one or two weekly injections of CJC-1295 DAC produce a measurable GH and IGF-1 response, but this does not represent the steady-state pharmacology. GH may increase 2-5 fold from baseline with the first injection, and IGF-1 typically rises 20-50% above baseline. These initial responses are lower than steady-state because accumulation has not yet occurred. Users who tolerate the first 2-4 injections without side effects should not assume they have fully characterized their tolerance — steady-state concentrations are higher.",
  },
  {
    phase: "Weeks 5-8 (steady state)",
    heading: "Steady-state accumulation — continuous GH/IGF-1 elevation; side effects may emerge",
    body: "After approximately 5-6 weeks of weekly dosing (4-5 half-lives), plasma concentrations reach steady state. GH and IGF-1 are continuously elevated at a level approximately 2-3x higher than the initial post-injection response. Side effects associated with chronic GH elevation — fluid retention, carpal tunnel syndrome symptoms (numbness/tingling in hands), mild arthralgia, glucose elevation — are most likely to emerge or worsen at steady state. This is the phase requiring the most active monitoring and the time when many users discover their true tolerance to the compound.",
  },
  {
    phase: "Washout (after stopping)",
    heading: "8-day half-life means 2-4 weeks to clear — cannot rapidly reduce exposure",
    body: "A key characteristic of CJC-1295 DAC that distinguishes it from shorter-acting GH compounds: you cannot quickly reverse a dose. After stopping weekly injections, it takes approximately 5 half-lives (40 days) for 97% clearance. At 1 week post-last-injection, approximately half the dose remains active. At 2 weeks, approximately 25% remains. This means that if a side effect develops, stopping the injection does not quickly resolve it. Patients experiencing carpal tunnel symptoms, glucose elevation, or edema should expect these to persist for 2+ weeks after stopping and should seek physician evaluation.",
  },
];

const COMPARISON = [
  {
    name: "CJC-1295 DAC",
    badge: "GHRH analog / 8-day half-life / Continuous stimulation",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Half-life", value: "~8 days — albumin binding via DAC modification; steady-state takes 5-6 weeks of weekly dosing" },
      { label: "GH pattern", value: "Continuous elevation — not pulsatile; sustained GH/IGF-1 above baseline throughout the week" },
      { label: "Dosing frequency", value: "Once weekly — the primary practical advantage over no-DAC; accumulation dynamics require washout planning" },
      { label: "Evidence", value: "PMID 16352683 (2006 Teichman trial — dose-ranging pharmacokinetics/dynamics in healthy adults); no long-term RCT" },
      { label: "Appropriate for", value: "Tolerant users comfortable with continuous GH elevation; those preferring once-weekly convenience; requires physician oversight" },
    ],
    highlight: true,
  },
  {
    name: "CJC-1295 no-DAC (Modified GRF 1-29)",
    badge: "GHRH analog / Short half-life / Pulsatile stimulation",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.08)",
    rows: [
      { label: "Half-life", value: "~30 minutes — no albumin binding; rapid clearance produces pulsatile GH pattern; daily or EOD dosing required" },
      { label: "GH pattern", value: "Pulsatile — GH spike after each injection, returns to baseline between doses; more physiological GH pattern" },
      { label: "Dosing frequency", value: "Daily or every-other-day — more injections but exposure is controllable; stopping produces rapid clearance" },
      { label: "Evidence", value: "Less direct human evidence than DAC; widely used community compound; typically combined with ipamorelin for pulsatile GHRH + GHRP stacks" },
      { label: "Appropriate for", value: "New users starting with GH axis compounds; those wanting pulsatile GH; those who want rapid reversibility; combined with ipamorelin" },
    ],
    highlight: false,
  },
  {
    name: "Sermorelin",
    badge: "GHRH(1-29) / Shortest half-life / Most physiological",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Half-life", value: "~10-12 minutes — the shortest of the GHRH analogs; most closely mimics physiological GHRH pulse duration" },
      { label: "GH pattern", value: "Most pulsatile — very brief GHRH signal; GH response is the sharpest pulse, quickest return to baseline" },
      { label: "Dosing frequency", value: "Daily (typically at bedtime) — brief active window; timing with GHRH peak sleep physiology is key" },
      { label: "Evidence", value: "FDA-approved historically for pediatric GH deficiency; the original GHRH analog; well-characterized pharmacology" },
      { label: "Appropriate for", value: "Users wanting the most physiological pulsatile GH stimulation; those prioritizing safety of short exposure windows; combination with GHRP is common" },
    ],
    highlight: false,
  },
];

export default function Cjc1295DacOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The 8-day half-life variant — CJC-1295 DAC is a fundamentally different dosing context from no-DAC, not just a longer-lasting version.
        </div>
        <div className="reta-overview__headline-sub">
          CJC-1295 DAC contains a Drug Affinity Complex modification that binds to albumin, extending the half-life from hours (no-DAC) to approximately 8 days. This is not simply &quot;more convenient&quot; — an 8-day half-life means GH stimulation accumulates with each dose, steady-state takes weeks to establish, side effects persist for a week or more after a problematic dose, and the GH/IGF-1 axis is continuously elevated rather than pulsed. The original DAC-GRF human trial (PMID 16352683) showed sustained GH and IGF-1 elevation for 14 days after a single injection. This is a meaningfully different pharmacological profile than no-DAC CJC-1295.
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
      <div className="reta-overview__section-label">CJC-1295 DAC vs CJC-1295 no-DAC vs Sermorelin</div>
      <div className="reta-overview__compare-note">
        Three GHRH analogs with dramatically different half-lives and GH stimulation patterns. CJC-1295 DAC provides continuous GH elevation with once-weekly dosing convenience at the cost of accumulation dynamics and less reversibility. No-DAC CJC-1295 and sermorelin produce pulsatile GH stimulation with daily dosing requirements but rapid reversibility. Half-life is the most important variable distinguishing these compounds — it changes every practical aspect of use.
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
