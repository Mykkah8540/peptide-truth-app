/**
 * SomatostatinOverviewPanel — decision-oriented overview for Somatostatin (SRIF).
 * Key frame: endogenous cyclic 14-AA peptide; inhibits GH, glucagon, insulin, TSH;
 * 90-second plasma half-life makes native somatostatin a scientific tool, not a
 * clinical compound. FDA-approved clinical use is through long-acting analogs
 * (octreotide, lanreotide, pasireotide). Community injection of native somatostatin
 * makes no pharmacokinetic sense.
 */

const STAT_CARDS = [
  {
    value: "SSTR1-5",
    label: "receptor family — Gi-coupled inhibitory; 5 subtypes widely expressed",
    sub: "Somatostatin signals through five G-protein-coupled receptor subtypes (SSTR1 through SSTR5), all of which are Gi-coupled and inhibit adenylyl cyclase. The subtypes differ in tissue distribution and downstream effectors: SSTR2 and SSTR5 are the most clinically important (targeted by octreotide and pasireotide), SSTR1 and SSTR4 are expressed in brain and immune tissues, SSTR3 is implicated in apoptosis signaling. The widespread receptor expression in pancreas, gut, pituitary, brain, and immune cells explains the breadth of somatostatin's inhibitory actions — it is a systemic 'brake' on secretory activity across multiple tissues.",
    note: "Five receptor subtypes with distinct tissue distributions means that receptor pharmacology is critical to understanding which effects dominate at a given dose in a given tissue. Native somatostatin activates all five equally. Clinical analogs were specifically engineered to be SSTR2/5-selective to maximize GH and tumor-hormone suppression while limiting gastrointestinal side effects. This selectivity difference between native somatostatin and analogs is not a minor detail — it determines the side effect profile.",
  },
  {
    value: "GH inhibition",
    label: "primary clinical interest — somatostatin inhibits GH release; short half-life limits clinical use",
    sub: "Somatostatin's inhibition of growth hormone (GH) release from the pituitary is its most clinically exploited property — the entire acromegaly and neuroendocrine tumor (NET) treatment pipeline is built on this mechanism. In community contexts, interest in somatostatin relates to GH axis modulation, either as a counter to GH excess or in timed protocols with GH secretagogues. However, the 90-second plasma half-life means that any native somatostatin reaching the pituitary from a subcutaneous injection would be cleared in minutes. The continuous IV infusion required to sustain GH suppression is the only pharmacologically rational delivery method for the native peptide.",
    note: "Community interest in somatostatin injection to modulate the GH axis reflects a misunderstanding of pharmacokinetics. The concept is pharmacologically sound — somatostatin does inhibit GH. The delivery method is not. Subcutaneous injection of a peptide with a 90-second half-life produces a brief concentration spike that does not achieve sustained GH suppression. If GH axis modulation is the goal, octreotide (half-life 1.5-2 hours SC) or long-acting depot formulations are the pharmacologically rational choices.",
  },
  {
    value: "Octreotide / Lanreotide",
    label: "the practical analogs — long-acting SSTR2/5-selective; FDA-approved for acromegaly and NETs",
    sub: "Octreotide (Sandostatin) and lanreotide (Somatuline) are synthetic somatostatin analogs with SSTR2 and SSTR5 selectivity and half-lives of 1.5-2 hours (immediate-release octreotide) to weeks (depot formulations). Pasireotide (Signifor) has broader SSTR1/2/3/5 selectivity and is used for Cushing's disease. These analogs have robust Phase 3 human evidence for acromegaly, carcinoid syndrome, and other NET-related conditions. They represent the clinically valid application of somatostatin pathway inhibition. Native somatostatin was the original research tool; analogs are the clinical translation.",
    note: "If the goal is SSTR-mediated GH suppression, the analog with established pharmacokinetics and FDA-approved dosing should be the frame of reference — not the native peptide that inspired them. The analogs were specifically engineered to solve the half-life problem that makes native somatostatin impractical.",
  },
  {
    value: "Investigational context",
    label: "regulatory status — no approved use for native somatostatin; analogs are the clinical compounds",
    sub: "Native somatostatin has no FDA-approved indication. It is used as a research tool in endocrinology — IV infusion to acutely suppress GH, glucagon, or insulin for mechanistic studies — but this is a controlled laboratory context. Community access is through gray-market peptide suppliers. The compound itself is not pharmacologically complex (cyclic 14-AA peptide), so synthesis quality is achievable. But the fundamental pharmacokinetic limitation — 90-second half-life — is intrinsic to the native peptide structure and cannot be addressed by formulation.",
    note: "The regulatory status of somatostatin reflects not just lack of development, but a scientific consensus that the native peptide is not a useful clinical drug. The analogs solved the half-life problem and became the drugs. Using the native peptide instead is working with the problem that the analogs were engineered to fix.",
  },
];

const FIT_YES = [
  "You are in a GH axis research context and want to understand the native somatostatin mechanism as the endogenous counterpart to GHRH — this is the scientifically correct frame",
  "You are already using a somatostatin analog (octreotide, lanreotide) under physician supervision and want to understand the biology of the target receptor family",
  "You want to understand the complete GH pulse architecture — GHRH drives GH release, somatostatin terminates it; understanding the somatostatin arm helps frame why pulsatile GH secretagogue timing matters",
  "You are researching the pancreatic axis (GH/glucagon/insulin) and need to understand how the endogenous inhibitory system works before deciding on any modulation approach",
];

const FIT_NO = [
  "Direct injection of native somatostatin for GH modulation — the 90-second half-life makes subcutaneous injection pharmacokinetically meaningless for sustained GH suppression; if you want SSTR-mediated GH inhibition, octreotide is the rational compound",
  "Using somatostatin to 'reset' GH axis sensitivity between GH secretagogue cycles — the pharmacokinetic argument against native somatostatin applies here too; any GH secretagogue timing protocols should be designed around the secretagogues' pharmacokinetics, not native somatostatin",
  "Anyone hoping for the GI or tumor effects of somatostatin analogs — carcinoid syndrome management, NET treatment — without physician involvement and FDA-approved analog formulations; these are medical indications requiring monitoring",
  "Anyone with diabetes or pre-diabetes using somatostatin — inhibition of both insulin and glucagon creates a complex, unpredictable glucose effect that requires medical supervision",
];

const TIMELINE = [
  {
    phase: "Acute (seconds to minutes)",
    heading: "90-second half-life — any effect from IV is transient; subcutaneous injection produces no meaningful sustained effect",
    body: "Native somatostatin has a plasma half-life of approximately 1-3 minutes depending on the assay and measurement conditions. IV infusion studies that suppress GH require continuous infusion to maintain plasma concentrations — the moment the infusion stops, somatostatin is cleared and GH rebounds. Subcutaneous injection produces a concentration spike that is cleared within minutes. For comparison, IV infusion studies typically use rates of 250-500 mcg/hour to maintain suppression. A 100-250 mcg subcutaneous injection delivers a brief pulse — not sustained suppression.",
  },
  {
    phase: "Days to weeks",
    heading: "No meaningful accumulation — somatostatin does not accumulate with repeated dosing",
    body: "Unlike GH secretagogues, which may desensitize receptors with chronic use, somatostatin's effects are acutely tied to plasma concentration. There is no sustained pharmacological state achievable with repeated subcutaneous injections of native somatostatin. The peptide is cleared before any extended receptor occupancy can develop. Contrast this with octreotide LAR or lanreotide, which achieve sustained plasma levels via depot formulations specifically designed to overcome this pharmacokinetic limitation.",
  },
  {
    phase: "Long-term",
    heading: "Not a framework for native somatostatin — this is an analog question",
    body: "Long-term somatostatin pathway modulation — for acromegaly, GH optimization, or metabolic purposes — is an analog question, not a native somatostatin question. Long-acting octreotide and lanreotide have characterized safety profiles over years of use in acromegaly patients: gallstone formation risk (requires monitoring), glucose effects (complex — may improve in acromegaly patients by reducing GH's counter-regulatory effects), and injection site reactions. These long-term profiles are what inform sustained SSTR pathway modulation, not any community experience with native somatostatin.",
  },
];

const COMPARISON = [
  {
    name: "Somatostatin (native)",
    badge: "Endogenous cyclic peptide / Research tool",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Half-life", value: "~90 seconds (1-3 min) — IV infusion only for sustained effects; subcutaneous injection not pharmacologically rational" },
      { label: "Receptor selectivity", value: "SSTR1-5 equally — non-selective across all five subtypes; broad inhibitory effect on GH, glucagon, insulin, TSH, GI secretions" },
      { label: "Evidence", value: "Pharmacology: well-characterized. Clinical use: IV research tool only. Subcutaneous injection: no meaningful evidence" },
      { label: "FDA status", value: "No approved indication; not a clinical drug; analogs are the approved compounds" },
      { label: "Practical use", value: "Research tool for acute GH/glucagon/insulin suppression in controlled IV settings; not a community compound" },
    ],
    highlight: true,
  },
  {
    name: "Octreotide (Sandostatin)",
    badge: "SSTR2/5-selective analog / FDA-approved",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.08)",
    rows: [
      { label: "Half-life", value: "1.5-2 hours (SC immediate-release); weeks (LAR depot formulation) — practical for clinical use" },
      { label: "Receptor selectivity", value: "SSTR2 >> SSTR5 > SSTR3 — engineered selectivity targeting the primary GH-suppressing receptor subtypes" },
      { label: "Evidence", value: "FDA-approved for acromegaly and carcinoid syndrome; decades of Phase 3 data; characterized long-term safety profile" },
      { label: "FDA status", value: "FDA-approved; available as pharmaceutical; prescribed under medical supervision" },
      { label: "Practical use", value: "The practical clinical translation of somatostatin pathway inhibition for GH suppression; what community users actually should be considering" },
    ],
    highlight: false,
  },
  {
    name: "GH secretagogues (ipamorelin, CJC-1295)",
    badge: "GH axis stimulators / Inverse comparison",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GHRP/GHRH pathway activation — stimulate pulsatile GH release; opposite direction from somatostatin" },
      { label: "Evidence", value: "Ipamorelin and CJC-1295 have small human PK studies; community use for GH optimization is established though not FDA-approved" },
      { label: "Context", value: "Understanding somatostatin matters here — GH pulse amplitude is partly determined by somatostatin withdrawal; GHRH + somatostatin withdrawal = maximal GH pulse" },
      { label: "Practical framing", value: "Somatostatin is the brake; GHRH/GHRPs are the accelerator. Pulsatile GH physiology depends on both arms — you cannot optimize one without understanding the other" },
      { label: "Community use", value: "GH secretagogues (not somatostatin) are what community users actually access for GH axis effects; more rational pharmacokinetics for non-IV use" },
    ],
    highlight: false,
  },
];

export default function SomatostatinOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The endogenous stop signal for GH, glucagon, and insulin — 90-second half-life makes native somatostatin a scientific tool, not a clinical compound.
        </div>
        <div className="reta-overview__headline-sub">
          Somatostatin is an endogenous cyclic tetradecapeptide that inhibits GH, glucagon, insulin, TSH, and gastrointestinal secretions via five receptor subtypes (SSTR1-5). FDA-approved clinical use is through long-acting analogs (octreotide, lanreotide, pasireotide) with half-lives of hours to weeks. Native somatostatin&apos;s 90-second plasma half-life makes it unsuitable as a clinical drug — IV infusion has been studied, but it is not used in community contexts. Community interest in somatostatin injection is based on its GH-inhibitory role, but using the native peptide subcutaneously makes no pharmacokinetic sense.
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
      <div className="reta-overview__section-label">Somatostatin vs Octreotide vs GH Secretagogues</div>
      <div className="reta-overview__compare-note">
        Native somatostatin, its clinical analogs, and GH secretagogues occupy different pharmacological roles in the same axis. Native somatostatin is the endogenous reference compound — well-characterized pharmacology, impractical half-life. Octreotide solves the half-life problem with SSTR2/5 selectivity and FDA approval. GH secretagogues work in the opposite direction — stimulating GH release rather than inhibiting it. Community users interested in the GH axis are almost always better served by understanding octreotide or GH secretagogues rather than native somatostatin.
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
