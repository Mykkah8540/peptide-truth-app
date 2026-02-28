/**
 * LiraglutideOverviewPanel — decision-oriented overview for Liraglutide.
 * Key frame: the original GLP-1 benchmark — daily injection, ~5-8% weight loss,
 * FDA-approved (Victoza for T2D 2010, Saxenda for obesity 2014). Mostly superseded
 * by weekly semaglutide (~15%) and tirzepatide (~22%) for weight goals, but established
 * cardiovascular outcome data (LEADER trial) and well-characterized tolerability profile.
 */

const STAT_CARDS = [
  {
    value: "GLP-1R",
    label: "receptor — same mechanism as semaglutide and tirzepatide, older compound",
    sub: "Liraglutide activates the GLP-1 receptor (GLP-1R) — slowing gastric emptying, suppressing appetite via hypothalamic satiety signaling, and stimulating glucose-dependent insulin secretion. Same receptor as semaglutide; different molecule with daily vs. weekly dosing",
    note: "The GLP-1R mechanism is the most well-characterized anti-obesity target in modern pharmacology. Liraglutide established this proof of concept clinically before semaglutide and tirzepatide superseded it on efficacy. The receptor pharmacology is the same; the practical differences are in potency, dosing frequency, and weight loss ceiling.",
  },
  {
    value: "~5–8%",
    label: "weight reduction in SCALE Obesity (56 weeks, n=3,731)",
    sub: "SCALE Obesity & Prediabetes: ~5.9% placebo-adjusted, ~8% total weight reduction from baseline at 56 weeks with 3.0mg/day Saxenda dose. Responder rate for ≥5% loss: ~63% vs 27% placebo",
    note: "The SCALE number is ~8% total weight loss at 56 weeks — real and clinically meaningful, but substantially below semaglutide's ~15% (STEP 1) and tirzepatide's ~22% (SURMOUNT-1). This gap matters if your goal is meaningful body composition change rather than modest metabolic benefit. The comparison is also daily injection vs. weekly — practical burden is higher for lower efficacy.",
  },
  {
    value: "Daily",
    label: "injection — the main practical disadvantage vs. newer GLP-1 agents",
    sub: "Liraglutide requires daily subcutaneous injection; semaglutide and tirzepatide are weekly. The daily injection burden is a real friction point for adherence — one of the reasons newer weekly agents have largely replaced liraglutide for weight management in practice",
    note: "For most people pursuing GLP-1 therapy, the practical question is: why choose a daily injection compound that achieves less weight loss when weekly alternatives with superior outcomes (and similar safety profiles) exist? The honest answer: if you're already stabilized on liraglutide, or if a specific clinical situation favors it, the profile is well-characterized. For a new start, the comparison matters.",
  },
  {
    value: "FDA✓",
    label: "Victoza (T2D, 2010) and Saxenda (obesity, 2014) — established prescription history",
    sub: "Among the most clinically characterized GLP-1 agents: Victoza approved for T2D and CV risk reduction; Saxenda for obesity and weight management in adults and adolescents ≥12. LEADER trial cardiovascular outcomes data (2016) is the most established CV evidence in the GLP-1 class",
    note: "The regulatory and clinical history is an asset here — liraglutide has more long-term safety follow-up than newer agents. The LEADER trial (n=9,340, median 3.8 years) is one of the defining cardiovascular outcome trials in the GLP-1 class. For someone with T2D and cardiovascular risk where the established CV data matters, the clinical record is meaningful.",
  },
];

const FIT_YES = [
  "You have T2D or obesity and your physician has prescribed liraglutide — Victoza and Saxenda are well-characterized approved drugs; the clinical evidence supporting them is real",
  "You've already established tolerance on liraglutide and are managing well — the disruption of switching compounds often doesn't justify the change if your current protocol is working",
  "Cardiovascular outcome data matters to your decision — LEADER trial provided CV risk reduction evidence in T2D that at the time was the most robust in the GLP-1 class; SELECT (semaglutide) is now available but for people already stable on liraglutide, the established data has value",
  "You have a clinical reason to prefer a daily dosing schedule over weekly — some patients prefer the predictability of daily dosing",
];

const FIT_NO = [
  "Your primary goal is maximal weight loss — semaglutide weekly (~15%, STEP 1) and tirzepatide (~22%, SURMOUNT-1) achieve substantially more weight reduction with the same injection frequency (once weekly vs once daily); this is the defining efficacy comparison",
  "You're starting a GLP-1 drug for the first time and weight loss is the goal — the newer weekly agents now offer superior efficacy with equivalent or better tolerability at the same or lower weekly injection burden",
  "You have a personal or family history of thyroid C-cell cancer (MTC) or MEN2 — same class contraindication as all GLP-1 agonists; boxed warning applies",
  "You have a history of pancreatitis — same class concern; pancreatitis is a class-wide precaution for GLP-1 agonists",
  "You are pregnant, breastfeeding, or an adolescent outside of a specific indicated clinical context (Saxenda has an adolescent indication in specific criteria, but requires physician management)",
];

const TIMELINE = [
  {
    phase: "Weeks 1–5 (titration)",
    heading: "The nausea window — the titration schedule exists to manage it",
    body: "Liraglutide starts at 0.6mg/day (week 1), escalates to 1.2mg (week 2), and to 1.8mg (week 3 for T2D) or up to 3.0mg (obesity indication, titrated over 5 weeks). Nausea, vomiting, and diarrhea are most intense during the titration phase. Most people tolerate it by week 4-5 when the dose stabilizes. If nausea is severe, staying at a lower dose longer is an option before escalating — the titration schedule is a guideline, not a mandate.",
  },
  {
    phase: "Months 1–3",
    heading: "Weight loss trajectory — most of the loss happens in the first year",
    body: "SCALE trial data shows the weight loss curve is steepest in months 1-6 and begins to plateau at 9-12 months. Protein intake management (maintaining adequate protein while appetite is suppressed) and continued resistance training are the anchors for making the weight loss quality-preferential toward fat rather than lean mass. GI symptoms typically improve significantly after the titration phase.",
  },
  {
    phase: "Beyond 12 months",
    heading: "Weight maintenance — regain after cessation is the honest long-term picture",
    body: "SCALE maintenance extension data shows weight regain after liraglutide discontinuation — typically 2/3 of lost weight is regained within a year of stopping. This is not a liraglutide-specific finding; it applies across GLP-1 agents and reflects the underlying biology of adiposity. Long-term use vs cycling vs transition to a newer agent with better efficacy are real decisions that belong in a physician conversation.",
  },
];

const COMPARISON = [
  {
    name: "Liraglutide",
    badge: "Daily injection / GLP-1R",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Weight loss", value: "~5-8% total (SCALE, 56 wks) — meaningful but substantially less than newer agents" },
      { label: "Dosing", value: "Daily subcutaneous injection — highest injection frequency in the class" },
      { label: "Nausea", value: "Common during titration; typically improves after dose stabilization" },
      { label: "CV outcomes", value: "LEADER trial: 13% relative risk reduction in MACE in T2D (established data)" },
      { label: "Status", value: "FDA-approved: Victoza (T2D), Saxenda (obesity)" },
    ],
    highlight: true,
  },
  {
    name: "Semaglutide",
    badge: "Weekly / GLP-1R",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Weight loss", value: "~15% total (STEP 1, 68 wks) — approximately 2x liraglutide" },
      { label: "Dosing", value: "Once weekly subcutaneous injection — substantially lower burden" },
      { label: "Nausea", value: "Similar titration profile; weekly dosing makes management more predictable" },
      { label: "CV outcomes", value: "SELECT trial: 20% relative risk reduction in MACE in non-diabetic CVD" },
      { label: "Status", value: "FDA-approved: Ozempic (T2D), Wegovy (obesity)" },
    ],
    highlight: false,
  },
  {
    name: "Tirzepatide",
    badge: "Weekly / GLP-1+GIP",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Weight loss", value: "~22% total (SURMOUNT-1, 72 wks) — approximately 3x liraglutide" },
      { label: "Dosing", value: "Once weekly subcutaneous injection" },
      { label: "Nausea", value: "Generally less nausea than GLP-1-only agents (GIP co-agonism effect)" },
      { label: "CV outcomes", value: "SURMOUNT-MMO trial ongoing; early data positive" },
      { label: "Status", value: "FDA-approved: Mounjaro (T2D), Zepbound (obesity)" },
    ],
    highlight: false,
  },
];

export default function LiraglutideOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The original GLP-1 benchmark — daily injection, established data, largely superseded on efficacy by weekly agents.
        </div>
        <div className="reta-overview__headline-sub">
          Liraglutide (Victoza for diabetes, Saxenda for weight) was the GLP-1 drug that proved the concept. It&apos;s FDA-approved, well-characterized, and backed by one of the strongest cardiovascular outcome trials in the class (LEADER). The catch: it requires daily injections and produces ~5-8% weight loss — about half of what weekly semaglutide achieves and a third of tirzepatide. If you&apos;re evaluating this drug in 2025, the comparison to newer weekly agents is the most important framing in this decision.
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
      <div className="reta-overview__section-label">Liraglutide vs Semaglutide vs Tirzepatide</div>
      <div className="reta-overview__compare-note">
        All three are GLP-1R agonists or dual agonists. The defining differences: dosing frequency (daily vs weekly) and weight loss efficacy (~5-8% vs ~15% vs ~22%). Same class safety profile and contraindications apply to all three.
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
