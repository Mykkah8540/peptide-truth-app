/**
 * GlucagonOverviewPanel — decision-oriented overview for Glucagon.
 * Key frame: 29-AA pancreatic alpha-cell hormone; counter-regulatory to insulin;
 * FDA-approved for severe hypoglycemia rescue. Not used for enhancement. Community
 * context is primarily understanding glucagon's role in GLP-1 drug mechanisms —
 * GLP-1 suppresses glucagon, which is part of how GLP-1 drugs lower glucose.
 * The glucagon receptor is also a target in triple agonist development (retatrutide).
 */

const STAT_CARDS = [
  {
    value: "GCGR (hepatic glucose output)",
    label: "mechanism — glucagon receptor on liver: glycogenolysis + gluconeogenesis → rapid glucose release",
    sub: "Glucagon is a 29-amino-acid peptide hormone secreted by pancreatic alpha cells in response to hypoglycemia and other metabolic signals. It acts on the glucagon receptor (GCGR), a class B G-protein-coupled receptor, primarily on hepatocytes. GCGR activation triggers cAMP-mediated: glycogenolysis (rapid glycogen breakdown to glucose-1-phosphate → glucose-6-phosphate → glucose) and gluconeogenesis (new glucose synthesis from amino acids and other precursors). The net effect is rapid hepatic glucose output, raising blood glucose within minutes. Glucagon is the principal counter-regulatory hormone to insulin — when blood glucose falls, alpha cells secrete glucagon to restore it. In type 1 diabetes, alpha cell glucagon response to hypoglycemia may be impaired, making exogenous glucagon rescue kits essential.",
    note: "The GCGR is pharmacologically interesting beyond hypoglycemia rescue. It is a target in triple agonist drug development — retatrutide combines GLP-1, GIP, and glucagon receptor agonism. The glucagon receptor component may contribute to adipose tissue thermogenesis and energy expenditure. This is why triple agonists produce greater weight loss than dual GLP-1/GIP agonists (tirzepatide) alone. Understanding glucagon's role in energy metabolism is increasingly relevant as GLP-1 drugs that suppress glucagon are widely used.",
  },
  {
    value: "FDA-approved (hypoglycemia rescue)",
    label: "regulatory status — multiple FDA-approved formulations for severe hypoglycemia; also used for beta-blocker overdose and GI radiology",
    sub: "Glucagon has multiple FDA-approved formulations for hypoglycemia rescue: GlucaGen (rDNA-derived, injection kit); Baqsimi (nasal powder — a significant advance enabling non-injection rescue by bystanders); Gvoke (ready-to-use prefilled syringe/autoinjector — eliminates the kit reconstitution step that could delay rescue). These formulations represent decades of innovation making hypoglycemia rescue more accessible. Beyond rescue: glucagon is used in clinical settings for beta-blocker/calcium channel blocker overdose (pharmacological cardiac effects through non-adrenergic pathway) and GI radiology (motility inhibition allowing better visualization). All uses are FDA-approved and physician-supervised.",
    note: "The advance from traditional glucagon kits (which required reconstitution of powder under emergency conditions — often difficult for panicked bystanders or patients in partial unconsciousness) to Baqsimi nasal powder and Gvoke autoinjectors represents meaningful improvement in rescue accessibility. Every insulin-using diabetic patient should have one of the modern formulations available and teach household members how to use it. The traditional kit is still used but is being displaced by more user-friendly formulations.",
  },
  {
    value: "GLP-1 suppresses glucagon",
    label: "mechanism context — GLP-1 drugs lower glucose partly by suppressing glucagon; triple agonists (retatrutide) also target GCGR directly",
    sub: "Understanding glucagon is prerequisite for understanding how GLP-1 drugs work. GLP-1 receptor agonists lower postprandial glucose through two mechanisms: direct beta cell stimulation (glucose-dependent insulin secretion) and glucagon suppression (reducing hepatic glucose output). The glucagon-suppressing effect is clinically significant — in type 2 diabetes, postprandial glucagon secretion is pathologically elevated, worsening hyperglycemia. GLP-1 drugs normalize this. Triple agonists like retatrutide add direct GCGR agonism to GLP-1 + GIP effects — paradoxically, in the obesity context, GCGR agonism may increase energy expenditure and adipose thermogenesis without worsening glycemia at the doses used in triple agonists.",
    note: "The apparent paradox of a triple agonist targeting GCGR for weight loss — when glucagon raises blood glucose — is resolved by dose and context. At pharmacological doses in the context of GLP-1 co-agonism (which provides insulin secretion and glucose lowering), the glucagon receptor component contributes to fat oxidation and energy expenditure without net hyperglycemia. This is frontier pharmacology (mechanisms still being characterized in clinical trials) but represents the direction of obesity drug development beyond GLP-1/GIP.",
  },
  {
    value: "Beta-blocker overdose treatment",
    label: "clinical use — glucagon used in beta-blocker and calcium channel blocker overdose; acts through non-adrenergic cardiac pathway",
    sub: "In beta-blocker overdose, heart rate and myocardial contractility fall because adrenergic signaling is blocked. Glucagon provides a pharmacological workaround: GCGR on cardiomyocytes activates cAMP through a G-protein pathway distinct from beta-adrenergic receptors — bypassing the beta-blocker blockade. This increases heart rate and contractility independently of adrenergic signaling. Similarly in calcium channel blocker overdose. IV glucagon is part of the clinical toxicology management algorithm for these overdoses. This is a specialized ICU/emergency medicine use, not community context.",
    note: "The beta-blocker overdose use of glucagon is pharmacologically elegant — using a cAMP-generating hormone to bypass beta-receptor blockade and restore cardiac contractility. It illustrates how understanding the downstream mechanism (cAMP → cardiac effects) rather than just the receptor allows creative pharmacological problem-solving. This is also why glucagon has interactions with beta-blockers: in the overdose context, it is specifically the antidote.",
  },
];

const FIT_YES = [
  "You use insulin (type 1 or insulin-dependent type 2 diabetes) and do not have a glucagon rescue kit — every insulin user should have Baqsimi nasal powder or Gvoke autoinjector available at home and work, with trained household members",
  "You are a caregiver of someone with type 1 diabetes — know where the glucagon rescue kit is, have been trained in its use, and the kit is within its expiration date",
  "You are seeking to understand the mechanism of GLP-1 drugs and why they lower blood sugar — glucagon suppression is a key mechanism and understanding it contextualizes GLP-1 pharmacology",
  "You are a clinician managing beta-blocker or calcium channel blocker overdose — glucagon has a specific role in the toxicology management algorithm for these overdoses",
];

const FIT_NO = [
  "You are considering community injection of glucagon for any enhancement purpose — glucagon has no evidence or theoretical basis for any community enhancement effect; the relevant glucagon-axis pharmacology is in the GLP-1 drug class (which suppresses glucagon)",
  "You have a GLP-1 drug question and are conflating glucagon with GLP-1 compounds — glucagon and GLP-1 are counter-regulatory; the drugs that work for obesity and diabetes suppress glucagon, they are not glucagon itself",
  "You are seeking to use glucagon for weight loss — glucagon's role in energy expenditure is a component of triple agonist drugs (retatrutide) but as part of a carefully engineered triple agonist, not standalone glucagon injection",
  "You are managing hypoglycemia with glucagon alone without addressing the underlying cause — glucagon is a rescue intervention for severe hypoglycemia; recurrent hypoglycemia requires insulin dose adjustment and medical management, not glucagon as maintenance treatment",
];

const TIMELINE = [
  {
    phase: "Minutes (hypoglycemia rescue)",
    heading: "Rapid glucose restoration — blood glucose rises within 5-15 minutes of glucagon administration",
    body: "Glucagon's primary rescue use depends on speed. After IM or SC injection (or nasal absorption of Baqsimi powder), GCGR activation triggers rapid glycogenolysis in the liver. Blood glucose typically begins rising within 5-10 minutes, with significant restoration within 15 minutes. The rescue is glycogen-dependent — if hepatic glycogen stores are depleted (prolonged fasting, prolonged hypoglycemia, alcohol-related hypoglycemia, glycogen storage diseases), glucagon rescue may be less effective. After rescue, food must be given to replenish glycogen and sustain blood glucose.",
  },
  {
    phase: "Minutes to 30 minutes (GI radiology)",
    heading: "GI motility inhibition — smooth muscle relaxation allows visualization",
    body: "For gastrointestinal radiology procedures (barium contrast studies, ERCP), IV glucagon inhibits GI smooth muscle motility (separate from its glucose-raising effects, likely through non-GCGR or cAMP-related pathways), allowing better radiological visualization without peristaltic motion artifacts. The motility-inhibiting effect is rapid (< 1 minute with IV) and short-acting (15-30 minutes). This is a specific procedure-support use requiring physician administration.",
  },
  {
    phase: "Hours (beta-blocker overdose)",
    heading: "Cardiac effect restoration — sustained IV infusion for overdose management",
    body: "For beta-blocker or calcium channel blocker overdose, glucagon is administered as an IV bolus followed by continuous infusion for sustained cardiac support. The response requires ongoing glucagon delivery because the pharmacodynamic effect is shorter than the duration of beta-blocker toxicity. Sustained infusion maintains cAMP-mediated cardiac support while the beta-blocker or calcium channel blocker is metabolized or eliminated. This is intensive care medicine — monitoring of hemodynamics, glucose, and dose titration is continuous.",
  },
  {
    phase: "Long-term (no community use)",
    heading: "No community or enhancement application — glucagon is an emergency rescue compound",
    body: "Glucagon has no established community use protocol, no evidence for enhancement, and no long-term self-administration application outside of medically supervised diabetes management. The glucagon-axis pharmacology of interest for obesity and metabolic disease is being developed through engineered triple agonists (GCGR + GLP-1R + GIPR), not standalone glucagon. Community injection of glucagon for any purpose is not pharmacologically supported by the evidence.",
  },
];

const COMPARISON = [
  {
    name: "Glucagon",
    badge: "Counter-regulatory hormone / hypoglycemia rescue",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Role", value: "Counter-regulatory to insulin — hepatic glucose output; hypoglycemia rescue; beta-blocker overdose antidote" },
      { label: "FDA status", value: "Approved for severe hypoglycemia rescue (Baqsimi, GlucaGen, Gvoke); beta-blocker overdose; GI radiology" },
      { label: "Glucose effect", value: "RAISES blood glucose via hepatic glycogenolysis and gluconeogenesis — counter-regulatory to insulin" },
      { label: "Community use", value: "None — this is a rescue medication and a pharmacological education reference, not an enhancement compound" },
      { label: "Key context", value: "GLP-1 drugs suppress glucagon (mechanism of glucose lowering); triple agonists include GCGR component for energy expenditure" },
    ],
    highlight: true,
  },
  {
    name: "Insulin",
    badge: "Anabolic / glucose-lowering hormone",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.08)",
    rows: [
      { label: "Role", value: "Primary anabolic hormone — glucose uptake, glycogen synthesis, fat storage, protein anabolism; counter-regulatory to glucagon" },
      { label: "FDA status", value: "Multiple approved formulations for type 1 and type 2 diabetes; community off-label use in bodybuilding (high risk)" },
      { label: "Glucose effect", value: "LOWERS blood glucose by promoting cellular uptake — directly counter-regulatory to glucagon's hepatic output" },
      { label: "Community use", value: "Off-label bodybuilding use exists with significant hypoglycemia risk — makes glucagon rescue availability essential" },
      { label: "Key context", value: "Insulin and glucagon together regulate glucose homeostasis; any insulin user must have glucagon rescue available" },
    ],
    highlight: false,
  },
  {
    name: "GLP-1 receptor agonists (semaglutide, liraglutide)",
    badge: "GLP-1R agonist / glucose-lowering + weight loss",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.08)",
    rows: [
      { label: "Role", value: "GLP-1R agonism → glucose-dependent insulin secretion + glucagon suppression + gastric emptying delay + satiety" },
      { label: "FDA status", value: "Approved for type 2 diabetes (Ozempic, Victoza) and obesity (Wegovy, Saxenda); major clinical use expansion" },
      { label: "Glucose effect", value: "LOWERS blood glucose partly by SUPPRESSING glucagon — this is the counter-regulatory connection to glucagon biology" },
      { label: "Community use", value: "Widely used for weight management with physician prescription; the current dominant class in obesity pharmacotherapy" },
      { label: "Key context", value: "GLP-1 drugs are mechanistically the drugs that suppress the glucagon axis — not glucagon itself; understanding glucagon clarifies GLP-1 mechanisms" },
    ],
    highlight: false,
  },
];

export default function GlucagonOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The counter-regulatory hormone to insulin — FDA-approved for severe hypoglycemia rescue; relevant to understanding GLP-1 drug mechanisms and why triple agonists like retatrutide target the glucagon receptor; not an enhancement compound.
        </div>
        <div className="reta-overview__headline-sub">
          Glucagon is a 29-amino-acid peptide from pancreatic alpha cells that raises blood glucose by stimulating hepatic glycogenolysis and gluconeogenesis — the primary counter-regulatory response to insulin-induced hypoglycemia. FDA-approved formulations (Baqsimi nasal powder, Gvoke autoinjector, GlucaGen kit) are life-saving rescue medications that every insulin-using diabetic should have available. Beyond rescue, glucagon is used in beta-blocker overdose management and GI radiology. The community-relevant context is pharmacological education: GLP-1 drugs lower glucose in part by suppressing alpha-cell glucagon secretion, and triple agonists (retatrutide) directly target the glucagon receptor for its energy expenditure and fat-oxidizing effects. Understanding glucagon clarifies why these drugs work the way they do.
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
      <div className="reta-overview__section-label">Glucagon vs Insulin vs GLP-1 agonists</div>
      <div className="reta-overview__compare-note">
        Glucagon, insulin, and GLP-1 agonists are all part of the glucose regulatory system but with very different pharmacological roles. Glucagon raises glucose (rescue, counter-regulatory). Insulin lowers glucose (anabolic, glucose disposal). GLP-1 agonists lower glucose by stimulating insulin secretion and suppressing glucagon — which is the mechanistic connection between GLP-1 drugs and glucagon biology. Understanding all three clarifies why GLP-1 drugs work and why triple agonists add GCGR as a third target.
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
