/**
 * SemaglutideOverviewPanel — decision-oriented overview for Semaglutide (Ozempic / Wegovy).
 * Key frame: the most-studied GLP-1 drug — the baseline everyone compares against.
 * ~15% weight loss in STEP 1 (Wegovy 2.4mg, 68 weeks) set the modern benchmark.
 * Tirzepatide and retatrutide beat it; semaglutide established the standard.
 */

const STAT_CARDS = [
  {
    value: "GLP-1R",
    label: "receptor — appetite, insulin, and satiety signals",
    sub: "semaglutide agonizes the GLP-1 receptor — stimulating insulin secretion, suppressing glucagon, slowing gastric emptying, and signaling satiety centers in the hypothalamus. All four effects work together toward weight and glucose control",
    note: "The hypothalamic satiety signal is the main driver of weight loss — semaglutide changes how hungry you feel, not just how food is processed. This distinction matters for planning nutrition and protein intake.",
  },
  {
    value: "~15%",
    label: "body weight reduction — STEP 1 trial benchmark",
    sub: "in the STEP 1 trial (Wegovy 2.4mg, n=1,961, 68 weeks), participants lost an average of ~14.9% body weight vs ~2.4% on placebo — the landmark RCT that defined GLP-1 weight loss expectations",
    note: "15% is the average. Individual results range from minimal response to 20%+. The people who respond most are those with substantial appetite dysregulation driving their weight. Purely mechanical/metabolic obesity responds less dramatically.",
  },
  {
    value: "Weekly",
    label: "subcutaneous injection — once weekly dosing",
    sub: "Ozempic and Wegovy are injected subcutaneously once weekly with auto-injector pens. Rybelsus (oral semaglutide) is also available but with lower bioavailability and specific fasting requirements. The injectable form dominates clinical use",
    note: "Weekly dosing improves adherence compared to daily GLP-1 drugs. The slow titration schedule (starting at 0.25mg, escalating over 16-20 weeks) is non-optional — it's how nausea is managed, not a patience exercise.",
  },
  {
    value: "FDA ✓",
    label: "approved for T2D (Ozempic) and obesity (Wegovy)",
    sub: "Ozempic is approved for type 2 diabetes glycemic control; Wegovy is approved for chronic weight management in adults with BMI ≥30 or ≥27 with weight-related comorbidity. The SELECT trial (2023) extended cardiovascular outcome data to non-diabetic obese adults",
    note: "The FDA approval path means prescribing information with stated contraindications, a formal titration schedule, and post-market safety surveillance that doesn't exist for research peptides. The clinical evidence base is substantially stronger than anything else in this category.",
  },
];

const FIT_YES = [
  "Your primary goal is meaningful, sustained weight loss — the STEP trial data shows ~15% body weight reduction is achievable with appropriate protein and resistance training to protect lean mass",
  "You have type 2 diabetes or prediabetes — semaglutide has the most comprehensive T2D glycemic evidence of any GLP-1, including cardiovascular outcome trials",
  "You have a BMI that qualifies you for Wegovy — FDA approval means insurance coverage may be an option, and the prescribing information provides a clear framework for use",
  "You want a GLP-1 drug with the deepest evidence base before committing — semaglutide has more published trial data and post-market real-world evidence than tirzepatide or retatrutide at this stage",
  "You have established cardiovascular disease or high CV risk — the SELECT trial (2021) showed semaglutide reduces major adverse cardiovascular events in non-diabetic obese adults (HR 0.80)",
  "You can manage the titration schedule — gradual dose escalation over 16-20 weeks is how GI side effects are managed; people who rush the titration have significantly worse tolerance",
];

const FIT_NO = [
  "You have a personal or family history of medullary thyroid carcinoma or MEN2 syndrome — the thyroid C-cell tumor signal from animal studies makes this a prescribing information contraindication",
  "You have a history of pancreatitis — GLP-1 drugs are associated with pancreatitis risk; personal history is a clear contraindication in prescribing information",
  "Your GI tolerance is poor — nausea affects ~40-44% of Wegovy users, particularly during titration; vomiting occurs in ~24%. If you have IBS, severe GERD, or prior GI surgery, discuss specifically with a physician",
  "You are pregnant or planning pregnancy — semaglutide must be discontinued at least 2 months before planned conception; fetal harm risk from animal studies",
  "You want the most potent option available — tirzepatide achieves ~20-22% weight loss in SURMOUNT-1; retatrutide achieves ~24% in Phase 2. If maximum efficacy is the goal, semaglutide is not the ceiling",
  "You are on insulin or sulfonylureas and don't have glucose monitoring in place — the hypoglycemia risk from combined GLP-1 + insulin/sulfonylurea requires glucose monitoring before adding semaglutide",
];

const TIMELINE = [
  {
    phase: "Weeks 1–20",
    heading: "Slow titration — nausea management is the primary goal, not weight loss",
    body: "The titration schedule exists for a reason: starting at 0.25mg and escalating every 4 weeks to the maintenance dose manages GI side effects. Most nausea occurs at dose escalation points, not at steady state. The first 20 weeks are less about watching the scale and more about finding your tolerated dose. Protein intake becomes critical early — appetite suppression can accidentally erase protein if not actively managed. Many people underestimate how much they'll eat less and don't compensate with protein-first meals.",
  },
  {
    phase: "Months 3–6",
    heading: "Appetite normalization and the honest weight loss window",
    body: "By the maintenance dose, appetite suppression is more predictable. Weight loss typically progresses most rapidly in months 3-6 — but speed varies significantly. ~15% over 68 weeks in a trial context means roughly 1-1.5 lbs/week at best. People who see faster early loss are often losing significant water weight and glycogen stores alongside fat. Resistance training during this phase is non-optional for lean mass preservation — GLP-1 drugs suppress appetite systemically, not selectively for fat. You lose what you fail to protect.",
  },
  {
    phase: "Long-term",
    heading: "Efficacy plateau, cessation rebound, and the maintenance question",
    body: "Weight loss plateaus typically occur by month 9-12. Long-term data from the STEP 5 trial (2 years) shows sustained ~15% weight reduction at 104 weeks in compliant patients. The cessation data is important: a STEP 1 extension study found participants who stopped semaglutide regained ~2/3 of lost weight within a year. This isn't unique to semaglutide — it reflects the chronic disease model of obesity. The realistic frame: this may be a long-term or indefinite treatment, not a course. Cardiovascular outcome data (SELECT trial) provides the strongest argument for extended use.",
  },
];

const COMPARISON = [
  {
    name: "Semaglutide",
    badge: "GLP-1 RA / Benchmark",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Mechanism", value: "GLP-1 receptor agonist — appetite, insulin, glucagon, gastric emptying" },
      { label: "Weight loss", value: "~15% body weight — STEP 1 (n=1,961, 68 weeks)" },
      { label: "Evidence depth", value: "Deepest of the class — STEP program, SELECT CV outcomes, SUSTAIN T2D trials" },
      { label: "Route", value: "Weekly subcutaneous injection (Ozempic/Wegovy) or daily oral (Rybelsus)" },
      { label: "Key limitation", value: "Ceiling lower than tirzepatide/retatrutide; cessation causes significant weight regain" },
    ],
    highlight: true,
  },
  {
    name: "Tirzepatide",
    badge: "GLP-1 + GIP Dual Agonist",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GLP-1R + GIPR dual agonism — additive appetite and metabolic effects" },
      { label: "Weight loss", value: "~20-22% body weight — SURMOUNT-1 (15mg, 72 weeks)" },
      { label: "Evidence depth", value: "Strong but newer than semaglutide — SURMOUNT and SURPASS trial programs" },
      { label: "Route", value: "Weekly subcutaneous injection (Mounjaro/Zepbound)" },
      { label: "Key advantage", value: "Significantly greater weight loss than semaglutide at equivalent adherence" },
    ],
    highlight: false,
  },
  {
    name: "Retatrutide",
    badge: "GLP-1 + GIP + Glucagon Triple",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Triple agonism: GLP-1R + GIPR + GCGR — adds glucagon-driven energy expenditure" },
      { label: "Weight loss", value: "~24% body weight — Phase 2 (n=338, 48 weeks); Phase 3 pending" },
      { label: "Evidence depth", value: "Phase 2 only — no approved indication, no long-term outcome data" },
      { label: "Route", value: "Weekly subcutaneous injection — Phase 2 only, no commercial product" },
      { label: "Key advantage", value: "Highest weight loss of the class in Phase 2; Phase 3 will be the real test" },
    ],
    highlight: false,
  },
];

export default function SemaglutideOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The most-studied weight loss drug available — the baseline everyone else is compared against.
        </div>
        <div className="reta-overview__headline-sub">
          Semaglutide (Ozempic for diabetes, Wegovy for weight) is the GLP-1 drug that changed the weight loss conversation. The STEP 1 trial showed ~15% body weight reduction over 68 weeks — that number is now the benchmark every newer compound (tirzepatide, retatrutide) has to beat or justify. Tirzepatide does beat it. But semaglutide has three things the newer drugs don&apos;t yet have: years of real-world data, cardiovascular outcome evidence from the SELECT trial, and the most complete prescribing information of any weight drug. The question isn&apos;t whether it works — it&apos;s whether 15% is enough for your goals, and whether you can manage the GI side effects.
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
      <div className="reta-overview__section-label">Semaglutide vs Tirzepatide vs Retatrutide</div>
      <div className="reta-overview__compare-note">
        The GLP-1 class has a clear potency progression: semaglutide (~15%) → tirzepatide (~20-22%) → retatrutide (~24%). Each step up adds a receptor mechanism and more weight loss, but also less long-term evidence and fewer safety guardrails from formal prescribing information. Semaglutide is the compound with the deepest evidence base. Tirzepatide is FDA-approved and has the next-deepest data. Retatrutide is Phase 2 only.
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
