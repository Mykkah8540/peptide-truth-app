/**
 * PramlintideOverviewPanel — decision-oriented overview for Pramlintide.
 * Key frame: the only FDA-approved amylin analog; real clinical evidence;
 * post-meal glucose and meal size effects are established. Hypoglycemia
 * risk with insulin is the defining safety constraint.
 */

const STAT_CARDS = [
  {
    value: "Amylin receptor (CALCR + RAMP1/3)",
    label: "mechanism — post-meal satiety and glucose regulation via amylin receptor complex",
    sub: "Pramlintide (Symlin) is a synthetic analog of amylin, a hormone co-secreted with insulin from pancreatic beta cells after meals. Amylin acts on the amylin receptor complex (calcitonin receptor + RAMP1 or RAMP3) in the hypothalamus and brainstem. Effects: slows gastric emptying (reduces the rate of glucose absorption), suppresses post-meal glucagon secretion, and signals satiety to reduce meal size. All three mechanisms work to reduce post-meal glucose spikes.",
    note: "Amylin and insulin are normally co-secreted in a fixed ratio — both are deficient in type 1 diabetes; in type 2 diabetes, amylin secretion is also blunted relative to normal. Pramlintide replaces the missing amylin signal. This is a physiological replacement approach, not a supraphysiological pharmacological intervention — at therapeutic doses, pramlintide restores near-physiological amylin activity.",
  },
  {
    value: "FDA-approved",
    label: "regulatory status — approved for type 1 and type 2 diabetes as insulin adjunct",
    sub: "Pramlintide (brand: Symlin) received FDA approval in 2005 as an adjunct to insulin for adults with type 1 or insulin-using type 2 diabetes who have not achieved adequate glucose control. It is administered as a subcutaneous injection before major meals. The approval is based on Phase 3 trial data demonstrating HbA1c reduction, post-meal glucose reduction, and modest weight loss (1-2 kg). It is the only FDA-approved amylin analog.",
    note: "FDA approval with real Phase 3 data puts pramlintide in a different evidence category from most community-discussed compounds. The clinical trials enrolled thousands of patients and ran for 26-52 weeks — this is pharmaceutical-grade evidence. The community interest goes beyond the approved diabetic indication into appetite suppression and weight management in non-diabetics, where the evidence is much thinner.",
  },
  {
    value: "Post-meal glucose + satiety",
    label: "primary established effects — HbA1c reduction and meal size reduction; modest weight loss",
    sub: "In Phase 3 trials of type 1 and type 2 diabetes patients, pramlintide produced: HbA1c reductions of ~0.4-0.6% (modest but consistent), significant post-meal glucose reductions (gastric emptying delay), glucagon suppression, and weight loss of approximately 1-2 kg over 26-52 weeks. The satiety effect is real — patients reported reduced meal size. This is a distinct mechanism from GLP-1 agonists: amylin primarily works post-meal, GLP-1 agonists work on both fasting and post-meal glucose.",
    note: "The weight loss in clinical trials (1-2 kg) is modest compared to GLP-1 agonists (5-15+ kg for semaglutide/tirzepatide). Community interest in pramlintide for weight management is based on combining its post-meal satiety with GLP-1's preprandial effects — the CagriSema concept (amylin + GLP-1 combination). Pramlintide alone is not a weight loss powerhouse; its value is as a complement to insulin management and in combination approaches.",
  },
  {
    value: "Hypoglycemia risk",
    label: "primary safety constraint — insulin dose reduction required when starting; severe hypoglycemia risk without adjustment",
    sub: "The defining adverse effect of pramlintide is hypoglycemia — specifically severe hypoglycemia when insulin doses are not reduced upon starting. By delaying gastric emptying and suppressing glucagon, pramlintide reduces post-meal glucose but also reduces glucagon's ability to counteract hypoglycemia from insulin. The FDA label requires insulin dose reduction of 50% when initiating pramlintide in type 1 diabetes. This is not a theoretical concern — clinical trials reported increased severe hypoglycemia in early use without dose adjustment.",
    note: "The hypoglycemia constraint is specific to insulin co-administration. Community users exploring pramlintide for weight management without insulin have a different risk profile — the gastric emptying delay and satiety effects still occur, but the hypoglycemia risk is primarily relevant in the insulin context. The approved indication is insulin adjunct; non-insulin use is off-label.",
  },
];

const FIT_YES = [
  "You have type 1 or insulin-using type 2 diabetes with post-meal glucose spikes not adequately controlled by insulin alone — this is the approved indication with established efficacy",
  "You are on a GLP-1 agonist and looking to address post-meal glucose specifically — pramlintide and GLP-1 agonists work at different points in the glucose response and can be complementary",
  "You want modest meal size reduction and satiety signaling with a compound that has pharmaceutical-grade evidence and FDA approval",
  "You understand the insulin dose adjustment requirement if using with insulin — 50% insulin reduction at initiation is mandatory, not optional",
];

const FIT_NO = [
  "You want dramatic weight loss like semaglutide or tirzepatide — pramlintide produces 1-2 kg over 6+ months; GLP-1 agonists produce 5-15+ kg; this is not a weight loss substitute",
  "You have gastroparesis or significant gastric motility issues — pramlintide's gastric emptying delay worsens these conditions",
  "You have hypoglycemia unawareness (inability to feel low blood sugar) — the reduced glucagon response from pramlintide in combination with insulin is particularly dangerous when hypoglycemia is not perceived",
  "You are on insulin and not prepared to reduce your insulin dose by 50% at initiation — severe hypoglycemia risk without adjustment is documented in clinical trials",
];

const TIMELINE = [
  {
    phase: "Minutes to hours",
    heading: "Post-meal effects — gastric slowing and glucagon suppression within hours",
    body: "Pramlintide's acute effects are pharmacokinetically rapid — gastric emptying delay and glucagon suppression begin with the first dose. Post-meal glucose reduction is measurable after the first injection. These immediate effects are the mechanism, not a delayed response requiring weeks to develop.",
  },
  {
    phase: "Weeks",
    heading: "HbA1c reduction and meal habituation — 4-8 weeks to new equilibrium",
    body: "HbA1c reduction from pramlintide reflects cumulative post-meal glucose lowering over weeks — the glycemic marker takes 2-3 months to fully reflect the change. Meal size reduction may take a few weeks to become habitual as patients adjust to the satiety signal. Nausea, the most common adverse effect, typically improves significantly over the first 4 weeks.",
  },
  {
    phase: "Long-term",
    heading: "Sustained control — continued with dose-adjusted insulin for ongoing glycemic management",
    body: "Phase 3 trials ran 26-52 weeks with maintained glucose benefits and stable weight effects. Long-term pramlintide use requires ongoing monitoring of insulin doses as body weight, insulin sensitivity, and glycemic patterns change. In type 1 diabetes specifically, the reduction in post-meal glucagon represents a meaningful physiological replacement of what is lost with beta-cell destruction.",
  },
];

const COMPARISON = [
  {
    name: "Pramlintide",
    badge: "Amylin analog / FDA-approved",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Mechanism", value: "CALCR/RAMP1/3 → gastric slowing + glucagon suppression + satiety" },
      { label: "Evidence", value: "FDA-approved Phase 3 data (T1D and T2D); HbA1c −0.4–0.6%; weight −1–2 kg" },
      { label: "Weight loss", value: "Modest — 1–2 kg; complement to insulin management, not weight loss drug" },
      { label: "Hypoglycemia risk", value: "With insulin: significant; requires 50% insulin dose reduction at initiation" },
      { label: "Status", value: "FDA-approved (Symlin); SC injection before major meals; requires prescription" },
    ],
    highlight: true,
  },
  {
    name: "Cagrilintide",
    badge: "Long-acting amylin analog / Phase 3",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Same CALCR/RAMP1/3 amylin receptor; once-weekly vs. pramlintide's pre-meal dosing" },
      { label: "Evidence", value: "Phase 3 in CagriSema combination (~25% weight loss); monotherapy ~10%; no FDA approval yet" },
      { label: "Weight loss", value: "In CagriSema combination: dramatic; monotherapy: similar to pramlintide with better adherence" },
      { label: "Hypoglycemia risk", value: "Not used with insulin in weight management trials; lower acute hypoglycemia concern" },
      { label: "Status", value: "No FDA approval; gray-market; under Phase 3 development" },
    ],
    highlight: false,
  },
  {
    name: "Semaglutide (GLP-1)",
    badge: "GLP-1 agonist / FDA-approved",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Mechanism", value: "GLP-1R → insulin secretion, gastric slowing, appetite suppression — different axis than amylin" },
      { label: "Evidence", value: "Multiple Phase 3 trials; 15–17% weight loss (Wegovy); SUSTAIN series for T2D" },
      { label: "Weight loss", value: "Dramatically more than pramlintide — 10–17% body weight reduction" },
      { label: "Hypoglycemia risk", value: "Low in non-insulin users; meaningful if combined with insulin or sulfonylureas" },
      { label: "Status", value: "FDA-approved (Ozempic for T2D, Wegovy for obesity); requires prescription" },
    ],
    highlight: false,
  },
];

export default function PramlintideOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The only FDA-approved amylin analog — real Phase 3 evidence, a mechanistically distinct post-meal approach, and a hypoglycemia constraint that requires insulin dose adjustment.
        </div>
        <div className="reta-overview__headline-sub">
          Pramlintide (Symlin) replaces the amylin signal that is lost in diabetes — slowing gastric emptying, suppressing post-meal glucagon, and reducing meal size. The Phase 3 evidence is real and the approval is legitimate. The constraint: it is designed as an insulin adjunct, and using it with insulin without reducing the insulin dose by 50% at initiation creates documented severe hypoglycemia risk. Community interest extends to weight management in non-diabetics and as a GLP-1 complement, where the evidence base is much thinner.
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
      <div className="reta-overview__section-label">Pramlintide vs Cagrilintide vs Semaglutide</div>
      <div className="reta-overview__compare-note">
        Three amylin/incretin approaches with different evidence levels and weight loss magnitudes. Pramlintide is the only FDA-approved amylin analog — real evidence, modest weight effect, insulin-adjunct context. Cagrilintide is the long-acting next-generation amylin analog with dramatic evidence in combination with semaglutide. Semaglutide is the weight loss benchmark — a different mechanism with dramatically more weight loss than amylin analogs alone.
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
