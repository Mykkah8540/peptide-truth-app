/**
 * Endothelin1OverviewPanel — decision-oriented overview for Endothelin-1 (ET-1).
 * Key frame: ET-1 is the most potent endogenous vasoconstrictor known.
 * It is not used therapeutically as an agonist — exogenous administration would
 * cause severe, prolonged vasoconstriction. The clinical relevance is via
 * endothelin receptor antagonists (ERAs) that BLOCK ET-1's effects in PAH.
 */

const STAT_CARDS = [
  {
    value: "21-AA",
    label: "vasoconstrictor peptide \u2014 the most potent endogenous one known",
    sub: "Endothelin-1 is a 21-amino-acid peptide produced by vascular endothelial cells. It binds ETA receptors on vascular smooth muscle, causing prolonged, powerful vasoconstriction \u2014 roughly 10 times more potent than angiotensin-II on a molar basis. It also binds ETB receptors on endothelium, which paradoxically causes vasodilation via nitric oxide and prostacyclin release, and clears circulating ET-1 from the bloodstream.",
    note: "The dual ETA/ETB receptor system is why ET-1 physiology is complex: ETA drives sustained constriction; ETB on endothelium provides a counterbalancing dilatory and clearance function. ETB on vascular smooth muscle also causes constriction, making the net effect depend on receptor distribution in a given tissue bed. The result is tissue-specific vasoregulation \u2014 not a simple \u201ctighten everything\u201d signal.",
  },
  {
    value: "ERAs",
    label: "endothelin receptor antagonists \u2014 FDA-approved for pulmonary arterial hypertension",
    sub: "The clinical relevance of ET-1 pharmacology is endothelin receptor antagonists (ERAs): bosentan (Tracleer), ambrisentan (Letairis), and macitentan (Opsumit). These drugs BLOCK ET-1\u2019s effects at ETA (and in the case of bosentan and macitentan, ETB as well). They are FDA-approved for pulmonary arterial hypertension (PAH), where pathologically elevated ET-1 drives progressive pulmonary vascular constriction and remodeling.",
    note: "ERAs are not ET-1 itself \u2014 they are ET-1 antagonists. This distinction is critical: the therapeutic intervention is blocking ET-1, not administering it. Exogenous ET-1 as an agonist would cause the opposite of the desired effect in PAH \u2014 and in any healthy person would cause acute severe hypertension, ischemia, and potential end-organ damage.",
  },
  {
    value: "PAH",
    label: "pulmonary arterial hypertension \u2014 the primary disease context for ET-1 pharmacology",
    sub: "In PAH, ET-1 levels are elevated 2\u20135-fold in plasma and are even higher in pulmonary arterial tissue. This pathological ET-1 excess drives the pulmonary vascular remodeling (smooth muscle hypertrophy, fibrosis, and progressive narrowing of pulmonary arterioles) that defines PAH. ERAs reverse or slow this process by blocking ET-1\u2019s effects at the receptor level. ET-1 measurement is used as a prognostic biomarker in PAH and heart failure.",
    note: "PAH is a serious, progressive condition with a median survival of 2\u20133 years without treatment in historical series. ERAs have substantially changed outcomes \u2014 macitentan in particular (SERAPHIN trial) showed significant reductions in morbidity and mortality. The ET-1 pathway is one of three major therapeutic targets in PAH (the others being the prostacyclin and NO/cGMP pathways).",
  },
  {
    value: "No Rx use",
    label: "ET-1 agonist \u2014 no therapeutic or community use; would cause extreme vasoconstriction",
    sub: "Exogenous endothelin-1 has no therapeutic use as an agonist in any approved indication. It is used as a research tool in laboratory settings (studying vasoconstriction, vascular biology, and receptor pharmacology). In the community peptide context, there is no legitimate use case: injecting ET-1 would cause severe, prolonged vasoconstriction that could produce hypertensive crisis, myocardial ischemia, cerebrovascular events, and renal ischemia.",
    note: "ET-1 is not a \u201ccommunity peptide\u201d \u2014 it appears here for pharmacological education on one of the most important vasoactive peptides in human physiology and as context for understanding ERA medications that patients with PAH, heart failure, or CKD may be taking. Anyone on an ERA (bosentan, ambrisentan, macitentan) needs to understand the interaction profile, particularly hepatotoxicity monitoring and the severe teratogenicity of this drug class.",
  },
];

const FIT_YES = [
  "You have been diagnosed with pulmonary arterial hypertension (PAH) and your cardiologist or pulmonologist has prescribed an ERA (bosentan, ambrisentan, or macitentan) \u2014 this is the legitimate clinical context for engaging with ET-1 pharmacology",
  "You are researching ET-1 physiology as part of understanding cardiovascular disease, vascular biology, or renal pathophysiology \u2014 ET-1 is a major mediator of vascular tone regulation worth understanding",
  "You are a patient on ERA therapy who wants to understand the mechanism of your medication and what interactions and monitoring requirements apply",
  "You are researching PAH treatment options and want to understand the pharmacological rationale behind the three major PAH drug classes",
];

const FIT_NO = [
  "You are considering using ET-1 for any injectable or enhancement purpose \u2014 exogenous ET-1 as an agonist would cause severe vasoconstriction; there is no therapeutic benefit and significant acute harm potential",
  "You are pregnant or planning pregnancy and are on ERA therapy \u2014 ERAs are pregnancy category X with documented teratogenicity; this requires immediate discussion with your prescriber about alternative PAH management or pregnancy prevention",
  "You are on an ERA and taking cyclosporine \u2014 this is a contraindicated combination with bosentan specifically due to major CYP3A4 and OATP1B1 interactions causing dramatically elevated cyclosporine and bosentan levels",
  "You are on hormonal contraceptives while taking bosentan \u2014 bosentan induces CYP3A4/2C9 and reduces hormonal contraceptive efficacy, compounding the teratogenicity risk of ERAs",
  "You have liver disease or elevated transaminases and are being considered for ERA therapy \u2014 hepatotoxicity (black box warning for bosentan) is a significant concern; liver function monitoring is mandatory and active liver disease may be a contraindication",
];

const TIMELINE = [
  {
    phase: "Before ERA therapy",
    heading: "Baseline liver function tests and pregnancy testing are mandatory before starting any ERA",
    body: "ERAs require baseline liver function tests (ALT, AST) before initiation. Bosentan carries a black box warning for hepatotoxicity and requires monthly liver function monitoring. Pregnancy testing is mandatory \u2014 all ERAs are teratogenic (pregnancy category X). Reliable contraception (two methods, given that bosentan reduces hormonal contraceptive efficacy) is required. The REMS program (Tracleer REMS, Letairis REMS) enforces these requirements with risk mitigation strategies including mandatory counseling and documentation. These are not optional precautions \u2014 they are regulatory requirements.",
  },
  {
    phase: "During ERA therapy",
    heading: "Monthly liver function monitoring, contraception counseling, and drug interaction surveillance",
    body: "Bosentan requires monthly ALT/AST monitoring due to hepatotoxicity risk; the label specifies dose reduction or discontinuation if transaminases rise above 3\u00d7 ULN. Ambrisentan and macitentan have lower hepatotoxicity rates but liver monitoring is still standard. Drug interactions are clinically significant: bosentan is a strong inducer of CYP3A4 and CYP2C9, which reduces the efficacy of many co-administered drugs including hormonal contraceptives, cyclosporine (contraindicated), and some antifungals. PAH combination therapy with sildenafil, tadalafil, or riociguat is standard of care and requires careful titration.",
  },
  {
    phase: "Long-term",
    heading: "PAH is a progressive disease; ERA therapy is long-term and combination therapy escalation is common",
    body: "PAH management is a long-term, often lifelong commitment. ERA therapy alone may be sufficient in early or milder disease, but guideline-recommended PAH care frequently involves combination therapy across the three pathways: ERA + PDE5 inhibitor (sildenafil, tadalafil) \u00b1 prostacyclin analogue (treprostinil, iloprost, selexipag). The AMBITION trial demonstrated superiority of upfront combination therapy (ambrisentan + tadalafil) over monotherapy in treatment-naive patients. Regular right-heart catheterization to assess pulmonary hemodynamics guides therapy escalation decisions.",
  },
];

const COMPARISON = [
  {
    name: "Bosentan (Tracleer)",
    badge: "Dual ETA/ETB antagonist \u2014 first ERA approved",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Receptor selectivity", value: "Non-selective: blocks both ETA and ETB \u2014 ETB blockade reduces endothelial clearance of ET-1" },
      { label: "Hepatotoxicity", value: "Black box warning \u2014 monthly LFT monitoring required; dose-dependent transaminase elevations in ~10% of patients" },
      { label: "Drug interactions", value: "Strong CYP3A4/2C9 inducer; cyclosporine contraindicated; reduces hormonal contraceptive efficacy" },
      { label: "REMS", value: "Tracleer REMS program \u2014 mandatory prescriber certification and monthly pregnancy tests" },
      { label: "Trial", value: "BREATHE-1 trial \u2014 6MWD improvement and time to clinical worsening in PAH" },
    ],
    highlight: false,
  },
  {
    name: "Ambrisentan (Letairis)",
    badge: "ETA-selective antagonist",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.09)",
    rows: [
      { label: "Receptor selectivity", value: "ETA-selective \u2014 preserves ETB-mediated vasodilation and ET-1 clearance" },
      { label: "Hepatotoxicity", value: "Lower rate than bosentan; removed black box warning in 2011; liver monitoring still recommended" },
      { label: "Drug interactions", value: "Fewer CYP interactions than bosentan; still contraindicated in pregnancy" },
      { label: "REMS", value: "Letairis REMS program \u2014 mandatory enrollment for female patients of reproductive potential" },
      { label: "Trial", value: "ARIES-1 and ARIES-2 trials; AMBITION trial (ambrisentan + tadalafil combination)" },
    ],
    highlight: false,
  },
  {
    name: "Macitentan (Opsumit)",
    badge: "Dual ETA/ETB \u2014 tissue-penetrating, event-driven trial",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.09)",
    rows: [
      { label: "Receptor selectivity", value: "Dual ETA/ETB; designed for sustained tissue penetration and receptor occupancy" },
      { label: "Hepatotoxicity", value: "Lower hepatotoxicity rate than bosentan in SERAPHIN trial; liver monitoring standard" },
      { label: "Drug interactions", value: "CYP3A4 substrate; strong CYP3A4 inducers (rifampin) reduce efficacy; less inducing of other drugs than bosentan" },
      { label: "Trial", value: "SERAPHIN trial \u2014 event-driven endpoint (morbidity and mortality); 45% reduction in combined endpoint vs placebo" },
      { label: "Distinction", value: "Only ERA with a robust long-term morbidity/mortality trial result in PAH" },
    ],
    highlight: true,
  },
];

export default function Endothelin1OverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The most potent endogenous vasoconstrictor \u2014 relevant clinically through the drugs that block it, not through any use of it.
        </div>
        <div className="reta-overview__headline-sub">
          Endothelin-1 is a 21-amino-acid peptide produced by your endothelial cells. It is the most potent vasoconstrictor your body makes \u2014 roughly 10 times more potent than angiotensin-II. In pulmonary arterial hypertension (PAH), ET-1 is pathologically elevated and drives the progressive pulmonary vascular damage that defines the disease. The clinical pharmacology of ET-1 is entirely about blocking its effects: endothelin receptor antagonists (ERAs) \u2014 bosentan, ambrisentan, and macitentan \u2014 are FDA-approved PAH treatments. Exogenous ET-1 as an agonist has no therapeutic role and would cause severe vasoconstriction. This page covers ET-1 physiology and ERA pharmacology for patients on these medications and for those researching vascular peptide biology.
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
      <div className="reta-overview__section-label">Is this relevant to your situation?</div>
      <div className="reta-overview__fit">
        <div className="reta-overview__fit-col reta-overview__fit-col--yes">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">&#x2713;</span> Relevant if&hellip;
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_YES.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="reta-overview__fit-col reta-overview__fit-col--no">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">&#x2717;</span> Not the right frame if&hellip;
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_NO.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="reta-overview__section-label">ERA therapy \u2014 what to know at each stage</div>
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
      <div className="reta-overview__section-label">ERA comparison: bosentan vs ambrisentan vs macitentan</div>
      <div className="reta-overview__compare-note">
        All three ERAs share the same mechanism (ET-1 receptor blockade) and the same core safety concern (teratogenicity \u2014 pregnancy category X). The key differences are receptor selectivity (ETA vs dual ETA/ETB), hepatotoxicity profile (bosentan&apos;s black box vs lower rates with ambrisentan and macitentan), and drug interaction burden (bosentan is a significant CYP inducer; macitentan has fewer inducing interactions). Choice in clinical practice depends on disease severity, co-medications, tolerability, and the available trial evidence.
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
