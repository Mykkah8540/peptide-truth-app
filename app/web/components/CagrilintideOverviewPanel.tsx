/**
 * CagrilintideOverviewPanel — decision-oriented overview for Cagrilintide.
 * Key frame: long-acting amylin analog being studied primarily in combination
 * with semaglutide (CagriSema). Monotherapy ~10% weight loss; combination
 * ~25% in Phase 2. The combination story is bigger than cagrilintide alone.
 * Amylin mechanism is distinct from GLP-1 — complementary, not redundant.
 */

const STAT_CARDS = [
  {
    value: "Amylin analog",
    label: "AM833 — long-acting modified amylin, binds amylin receptors (CALCR + RAMP1/3)",
    sub: "Cagrilintide is a synthetic long-acting analog of amylin (also called islet amyloid polypeptide, IAPP), a hormone co-secreted with insulin from pancreatic beta cells. It was engineered for once-weekly subcutaneous dosing — native amylin has a half-life of minutes. The amylin receptor complex (calcitonin receptor + RAMP) is pharmacologically distinct from the GLP-1 receptor.",
    note: "Amylin's satiety mechanism is different from GLP-1's. GLP-1 primarily slows gastric emptying and suppresses appetite via central pathways; amylin reduces glucagon secretion, slows gastric emptying, and signals satiety via the area postrema (brainstem). These are complementary mechanisms — which is exactly why the CagriSema combination is pharmacologically interesting.",
  },
  {
    value: "CagriSema",
    label: "the clinically significant story — cagrilintide + semaglutide 2.4 mg combination",
    sub: "The Phase 2 SCALE STEP trial of CagriSema (cagrilintide 2.4 mg + semaglutide 2.4 mg, weekly) showed ~25% body weight reduction at 32 weeks — meaningfully exceeding either monotherapy. This is the data point driving attention to cagrilintide. Cagrilintide monotherapy shows approximately 10% weight loss, similar to liraglutide. The combination is where the compound's clinical value lies.",
    note: "The CagriSema combination is proceeding to Phase 3 (REDEFINE trials). This is the compound's primary development pathway, not monotherapy. Evaluating cagrilintide in isolation misses the clinical context — it is being developed as a complement to GLP-1 therapy, not as a standalone weight loss agent in the class.",
  },
  {
    value: "Phase 2/3",
    label: "development stage — SCALE STEP Phase 2 complete, REDEFINE Phase 3 ongoing",
    sub: "The CagriSema combination is in Phase 3 (REDEFINE program). Cagrilintide monotherapy has Phase 2 data for weight management. No FDA approval exists for cagrilintide in any indication. The compound is not available outside of clinical trials — community access is through gray-market research peptide suppliers, not clinical-grade product.",
    note: "The Phase 3 trial data will determine whether CagriSema achieves approval and at what scale. Phase 2 results are encouraging but cannot be treated as equivalent to Phase 3 completion — the history of obesity drug development includes promising Phase 2 compounds that did not replicate in larger trials.",
  },
  {
    value: "Investigational",
    label: "regulatory status — not approved for any indication, clinical trial access only",
    sub: "Cagrilintide has no FDA approval. It is being developed by Novo Nordisk. The compound is available in gray-market research peptide channels, but there is no pharmaceutical-grade product available outside clinical trials — quality, purity, and sterility are unregulated for research-grade material.",
    note: "The regulatory gap matters practically: the doses used in community protocols are not validated against Phase 2 safety data; the product is not the same formulation used in trials; and the CagriSema combination cannot be safely replicated by sourcing both compounds separately from research suppliers without the pharmacokinetic matching that the clinical formulation achieves.",
  },
];

const FIT_YES = [
  "You are interested in the amylin mechanism as a complement to GLP-1 therapy — the combination rationale is mechanistically sound, and you understand the evidence base is Phase 2, not approval-level",
  "You have metabolic goals and existing GLP-1 experience, and want to understand the mechanism and evidence landscape before the Phase 3 data lands",
  "You have no history of thyroid C-cell tumors or MEN2 — cagrilintide carries the same calcitonin receptor-related contraindication class as native amylin analogs",
  "You have verified source quality with a third-party certificate of analysis — no pharmaceutical-grade product exists outside clinical trials",
];

const FIT_NO = [
  "You expect clinical trial-equivalent safety monitoring from self-administration — the REDEFINE trials include metabolic monitoring, dose titration protocols, and adverse event tracking that are not replicable through self-administration",
  "You have a history of thyroid C-cell carcinoma or MEN2 — amylin receptor agonism carries related calcitonin receptor concerns to the GLP-1/GIP class",
  "You are already on semaglutide and expect to replicate CagriSema by adding a research-grade cagrilintide — the trial formulation is co-developed; gray-market combination carries uncharacterized pharmacokinetic overlap",
  "You are pregnant or breastfeeding — no safety data in pregnancy; the metabolic effects are incompatible with the nutritional demands of pregnancy",
  "You expect rapid results within weeks — the Phase 2 weight loss data was measured at 32 weeks; meaningful outcomes are months-scale",
];

const TIMELINE = [
  {
    phase: "Weeks 1–4",
    heading: "GI tolerability — nausea and gastric slowing",
    body: "The amylin receptor mechanism slows gastric emptying, similar to GLP-1s but via a different pathway. The GI side effect profile during initiation (nausea, reduced appetite, possible vomiting) mirrors the GLP-1 class initiation experience. Most Phase 2 participants tolerated the compound, but the titration schedule matters — starting at full dose without titration amplifies GI effects.",
  },
  {
    phase: "Weeks to months",
    heading: "Appetite suppression and weight trajectory",
    body: "The satiety effect (both through gastric slowing and area postrema signaling) becomes the dominant experience. Appetite suppression is the mechanism, not metabolic rate acceleration. Weight loss in Phase 2 followed a trajectory similar to GLP-1 agents — gradual, diet-dependent, and requiring sustained use to maintain. The combination data at 32 weeks showed ~25% — that is not a 32-week promise, it is an observed 32-week outcome under clinical conditions.",
  },
  {
    phase: "Long-term",
    heading: "Combination Phase 3 outcomes — pending",
    body: "The REDEFINE Phase 3 program will determine the actual clinical profile: superiority vs. semaglutide alone, durability of weight loss, cardiovascular outcomes, and long-term safety signal. The Phase 2 data is encouraging but insufficient to confirm the Phase 3 outcome. Community use is occurring ahead of this data — a decision being made before the relevant evidence exists.",
  },
];

const COMPARISON = [
  {
    name: "Cagrilintide",
    badge: "Amylin analog / Investigational",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Amylin receptor (CALCR + RAMP1/3) — satiety, glucagon suppression, gastric slowing" },
      { label: "Evidence", value: "Phase 2 (monotherapy ~10%, CagriSema ~25% at 32 weeks)" },
      { label: "Dosing", value: "Once-weekly subcutaneous, 0.3–2.4 mg (Phase 2 top dose)" },
      { label: "Approval", value: "None — Phase 3 ongoing (REDEFINE)" },
      { label: "GI tolerability", value: "Similar to GLP-1 initiation — dose-dependent nausea and gastric slowing" },
    ],
    highlight: true,
  },
  {
    name: "Pramlintide",
    badge: "Amylin analog / FDA-approved",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Amylin receptor agonist — same class as cagrilintide, shorter half-life" },
      { label: "Evidence", value: "FDA-approved for T1D and T2D as insulin adjunct; weight effects ~2-4 kg" },
      { label: "Dosing", value: "2–3× daily (short half-life) subcutaneous injection with meals" },
      { label: "Approval", value: "FDA-approved (Symlin) — insulin-dependent diabetes adjunct" },
      { label: "GI tolerability", value: "Significant nausea; this is the primary tolerability barrier" },
    ],
    highlight: false,
  },
  {
    name: "Tirzepatide",
    badge: "GLP-1/GIP dual / FDA-approved",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GLP-1R + GIPR dual agonist — different receptor family from amylin" },
      { label: "Evidence", value: "SURMOUNT-1: ~22% weight loss at 72 weeks — strongest approved weight data" },
      { label: "Dosing", value: "Once-weekly subcutaneous, 2.5–15 mg" },
      { label: "Approval", value: "FDA-approved (Zepbound for weight, Mounjaro for T2D)" },
      { label: "GI tolerability", value: "GI effects similar to class — nausea highest at initiation/escalation" },
    ],
    highlight: false,
  },
];

export default function CagrilintideOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          An amylin analog whose clinical story is really about the combination — CagriSema showed ~25% weight loss in Phase 2, outperforming either drug alone.
        </div>
        <div className="reta-overview__headline-sub">
          Cagrilintide is a long-acting amylin receptor agonist being developed by Novo Nordisk. As a monotherapy it produces approximately 10% weight loss — similar to liraglutide. Its clinical significance comes from the combination with semaglutide (CagriSema), where Phase 2 data showed ~25% weight reduction at 32 weeks. The amylin mechanism (satiety via area postrema, glucagon suppression, gastric slowing) is pharmacologically distinct from GLP-1 — which is exactly why the combination outperforms monotherapy. Phase 3 data is pending. The compound is not FDA-approved and not available in pharmaceutical-grade form outside clinical trials.
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
      <div className="reta-overview__section-label">Cagrilintide vs Pramlintide vs Tirzepatide</div>
      <div className="reta-overview__compare-note">
        Pramlintide is the only other approved amylin analog — short-acting, multiple daily injections, modest weight effect. Tirzepatide is the current approved dual-agonist benchmark. Cagrilintide as monotherapy sits between liraglutide and semaglutide in efficacy; its clinical case rests entirely on the CagriSema combination.
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
