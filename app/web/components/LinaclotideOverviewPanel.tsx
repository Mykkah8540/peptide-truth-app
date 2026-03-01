/**
 * LinaclotideOverviewPanel — decision-oriented overview for Linaclotide (Linzess).
 * Key frame: FDA-approved GC-C agonist for IBS-C and CIC.
 * Minimal systemic absorption by design. Black box: contraindicated under age 6.
 * No community enhancement use — not systemically absorbed.
 */

const STAT_CARDS = [
  {
    value: "GC-C",
    label: "guanylate cyclase-C receptor agonist \u2014 the same receptor activated by guanylin and uroguanylin",
    sub: "Linaclotide is a 14-amino-acid synthetic peptide that acts as an agonist at the guanylate cyclase-C (GC-C) receptor on the luminal surface of intestinal epithelial cells. GC-C is the same receptor activated by the endogenous gut peptides guanylin and uroguanylin. Activation of GC-C by linaclotide \u2192 intracellular cGMP production \u2192 activation of CFTR chloride channels and NHE3 sodium-hydrogen exchangers \u2192 chloride and bicarbonate secretion into the intestinal lumen \u2192 net fluid secretion \u2192 softer, more frequent stools and accelerated intestinal transit.",
    note: "The visceral pain benefit of linaclotide is a distinct mechanism from its secretory effects: cGMP produced by GC-C activation can enter pain-sensing subepithelial afferent neurons via CFTR channels, directly reducing afferent neuron excitability and decreasing visceral hypersensitivity. This dual mechanism \u2014 luminal fluid secretion and neural pain modulation \u2014 is why linaclotide addresses both constipation symptoms and the abdominal pain component of IBS-C, two distinct endpoints.",
  },
  {
    value: "IBS-C / CIC",
    label: "FDA-approved for IBS with constipation and chronic idiopathic constipation",
    sub: "Linaclotide (Linzess) is FDA-approved for two distinct indications: (1) irritable bowel syndrome with constipation (IBS-C) in adults \u2014 for relief of abdominal pain and improvement in bowel habits; and (2) chronic idiopathic constipation (CIC) in adults \u2014 for improvement in stool frequency and consistency. These are the two largest constipation-spectrum GI conditions in adults, affecting an estimated 10\u201320% of the adult population combined. The drug is taken orally (capsule) once daily, 30 minutes before the first meal of the day.",
    note: "IBS-C and CIC are related but distinct diagnoses. IBS-C is defined by abdominal pain associated with constipation (Rome IV criteria); the pain component is the distinguishing feature and a primary endpoint for approval. CIC has constipation as the dominant symptom without the required pain association. Linaclotide\u2019s dual mechanism (secretion + pain modulation) makes it particularly well-suited for IBS-C where both symptoms require treatment. For pure CIC without significant pain, the secretory effect alone (on stool frequency and consistency) is the primary clinical benefit.",
  },
  {
    value: "Minimal",
    label: "systemic absorption \u2014 designed to act locally in the GI lumen, not enter the bloodstream",
    sub: "Linaclotide is designed to have negligible systemic absorption \u2014 it acts entirely on the luminal surface of intestinal epithelial cells and is rapidly degraded within the intestinal lumen to inactive metabolites that are also not absorbed. Systemic plasma concentrations after therapeutic oral doses are below the quantification limit of sensitive assays. This design minimizes systemic side effects but also definitively eliminates any possibility of systemic or enhancement use.",
    note: "The minimal absorption design is a deliberate pharmacological choice and a key safety feature. GC-C receptors are expressed in the intestine but also in the kidney, lung, and brain. Systemic linaclotide would have off-target effects in these organs. The engineered instability of the peptide in the intestinal lumen ensures it degrades before it can be absorbed. This is a good example of targeted peptide pharmacology: a 14-amino-acid peptide engineered for local GI activity with built-in protection against systemic exposure.",
  },
  {
    value: "Black box",
    label: "pediatric black box \u2014 contraindicated under age 6; caution ages 6\u201317",
    sub: "Linaclotide carries a black box warning: it is contraindicated in patients under 6 years of age and should be avoided in patients aged 6 to 17 years. This is based on juvenile animal studies in which neonatal mice given linaclotide doses equivalent to pediatric clinical doses suffered fatal intestinal obstruction (fluid secretion in an immature GI tract with low compensatory capacity). The risk in very young children appears to be genuine \u2014 GC-C receptor expression and intestinal fluid handling physiology are different in developing GI tracts. The contraindication is firm below age 6; the warning for ages 6\u201317 reflects insufficient safety and efficacy data in pediatric patients.",
    note: "The pediatric black box does not affect adult use. In adults, the primary adverse effect is diarrhea, not obstruction \u2014 the physiology is different. However, adults should be aware that keeping linaclotide out of reach of children is a safety imperative, not a routine medication safety note. Accidental ingestion by a young child is a medical emergency requiring immediate evaluation.",
  },
];

const FIT_YES = [
  "You have irritable bowel syndrome with constipation (IBS-C) and your GI symptoms \u2014 both abdominal pain and constipation \u2014 have been inadequately managed with lifestyle modification and first-line treatments (fiber, osmotic laxatives); linaclotide addresses both the constipation and visceral pain components",
  "You have chronic idiopathic constipation (CIC) that has been unresponsive to conservative management; linaclotide\u2019s GC-C-mediated fluid secretion directly addresses the luminal fluid deficit that drives constipation-spectrum symptoms",
  "You want to understand how a synthetic 14-amino-acid peptide designed for local GI action achieves dual benefit (secretion + pain modulation) through a single receptor target \u2014 linaclotide is a clean example of targeted luminal peptide pharmacology",
  "You are a patient currently taking linaclotide who wants to understand the mechanism, what the expected onset of benefit is, and what to monitor",
];

const FIT_NO = [
  "You are under 6 years of age \u2014 absolute contraindication (black box); linaclotide is lethal in neonatal animal models at equivalent doses and contraindicated below age 6",
  "You are looking for systemic effects from linaclotide \u2014 it is not systemically absorbed by design; there is no plasma exposure and therefore no systemic or enhancement pharmacology possible with this drug",
  "You have a history of mechanical obstruction, severe inflammatory bowel disease, or known GI perforation \u2014 luminal fluid secretion in the context of obstruction is dangerous; these are absolute contraindications",
  "You are considering linaclotide alongside heavy laxative use \u2014 additive GI motility effects can produce severe diarrhea and dehydration; one approach at a time, guided by a gastroenterologist",
  "You are pregnant or considering pregnancy \u2014 linaclotide is not systemically absorbed, so systemic fetal exposure is not expected, but data in pregnancy is limited; discuss with your obstetrician",
];

const TIMELINE = [
  {
    phase: "First week",
    heading: "Onset is rapid \u2014 stool softening and frequency changes within days; diarrhea most common in first week",
    body: "GC-C-mediated chloride and fluid secretion begins with the first dose. Most patients notice stool consistency changes and increased frequency within 1\u20133 days of starting. The trade-off: diarrhea is most common in the first week, as the degree of fluid secretion is calibrated for effect but may produce looser stools than desired in some patients. Starting with the lower available dose (72 mcg for CIC) and titrating up based on response is an approach some gastroenterologists recommend. Taking linaclotide 30 minutes before the first meal of the day on an empty stomach is important \u2014 food increases GI motility and may accentuate diarrhea.",
  },
  {
    phase: "Weeks 2\u20134",
    heading: "Bowel habit stabilizes; abdominal pain response typically takes 2\u20134 weeks in IBS-C",
    body: "The secretory effect and stool consistency change are rapid, but the visceral pain benefit in IBS-C typically requires several weeks to become apparent. The neural pain modulation effect (cGMP-mediated reduction in afferent neuron excitability) is a sustained pharmacological effect that takes time to produce clinically detectable pain reduction. Clinical trials used 12\u201326 week treatment periods to assess pain endpoints. Many patients find the diarrhea risk decreases after the first weeks as GI adaptation occurs. If diarrhea is severe and persistent past 2 weeks, dose interruption is the management approach \u2014 there is no dose reduction formulation, but temporary interruption and restart at the same dose is standard.",
  },
  {
    phase: "Long-term",
    heading: "Continued use is generally safe; no systemic accumulation; reassess need periodically",
    body: "Long-term linaclotide use does not carry systemic accumulation risk because absorption is negligible. The long-term safety profile in clinical trials extending up to 26 weeks (and open-label extensions beyond that) is consistent with the short-term profile \u2014 diarrhea is the dominant adverse effect and does not worsen with time. Periodic reassessment of whether linaclotide remains the best management strategy is appropriate, particularly if IBS or CIC symptoms evolve. Drug holidays (temporary discontinuation to assess baseline symptoms) are a reasonable approach to determine ongoing need.",
  },
];

const COMPARISON = [
  {
    name: "Linaclotide (Linzess)",
    badge: "GC-C agonist \u2014 14-AA synthetic peptide",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.09)",
    rows: [
      { label: "Mechanism", value: "GC-C agonism \u2192 cGMP \u2192 chloride/bicarbonate secretion + visceral pain reduction via cGMP in afferent neurons" },
      { label: "Indications", value: "IBS-C (adults) and CIC (adults)" },
      { label: "Dosing", value: "145 mcg (IBS-C) or 72\u2013145 mcg (CIC) once daily, 30 min before breakfast" },
      { label: "Systemic absorption", value: "Negligible by design" },
      { label: "Black box", value: "Contraindicated under age 6; caution 6\u201317" },
    ],
    highlight: true,
  },
  {
    name: "Plecanatide (Trulance)",
    badge: "GC-C agonist \u2014 uroguanylin analogue",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GC-C agonism \u2014 same mechanism as linaclotide; structurally an uroguanylin analogue" },
      { label: "Indications", value: "IBS-C and CIC (adults)" },
      { label: "Dosing", value: "3 mg once daily without regard to meals" },
      { label: "Distinction", value: "pH-sensitive receptor activation: more active at the lower pH of the small intestine; potentially different activity distribution" },
      { label: "Black box", value: "Same pediatric contraindication (under 6 years)" },
    ],
    highlight: false,
  },
  {
    name: "Lubiprostone (Amitiza)",
    badge: "ClC-2 chloride channel activator \u2014 non-peptide",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Activates type-2 chloride channels (ClC-2) on intestinal epithelium \u2014 different receptor from GC-C" },
      { label: "Indications", value: "CIC, IBS-C (women \u226518), and opioid-induced constipation" },
      { label: "Dosing", value: "8\u201324 mcg twice daily with food" },
      { label: "Distinction", value: "Fatty acid bicyclic compound, not a peptide; slight systemic absorption; nausea is prominent side effect" },
      { label: "Black box", value: "No pediatric black box equivalent; avoid in pregnancy (pregnancy category C)" },
    ],
    highlight: false,
  },
];

export default function LinaclotideOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A locally-acting GC-C agonist for IBS-C and CIC \u2014 a peptide engineered to work in the gut and stay there.
        </div>
        <div className="reta-overview__headline-sub">
          Linaclotide (Linzess) is a 14-amino-acid peptide that activates guanylate cyclase-C receptors on the inner surface of the intestinal wall \u2014 the same receptor activated by the endogenous peptides guanylin and uroguanylin. Receptor activation produces cGMP, which drives chloride and fluid secretion into the intestinal lumen (softer, more frequent stools) and separately reduces visceral pain sensitivity by modulating pain-sensing afferent neurons. FDA-approved for IBS with constipation and chronic idiopathic constipation. Negligible systemic absorption by design \u2014 it does its work in the gut lumen and is degraded there. No enhancement application is pharmacologically possible. The black box: contraindicated in patients under 6 years. Keep away from children.
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
            <span className="reta-overview__fit-icon">&#x2713;</span> Fits your situation if&hellip;
          </div>
          <ul className="reta-overview__fit-list">
            {FIT_YES.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="reta-overview__fit-col reta-overview__fit-col--no">
          <div className="reta-overview__fit-heading">
            <span className="reta-overview__fit-icon">&#x2717;</span> Look elsewhere if&hellip;
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
      <div className="reta-overview__section-label">GC-C agonist and secretagogue comparison</div>
      <div className="reta-overview__compare-note">
        Linaclotide and plecanatide are the two FDA-approved GC-C agonists. Both work through the same receptor, have similar indications, and share the pediatric black box. The structural and formulation differences between them have produced slightly different clinical trial results but similar real-world efficacy. Lubiprostone is an older secretagogue in the same disease space but works through a different receptor (ClC-2 chloride channels). Choice between agents depends on symptom profile, tolerability, cost, and individual response.
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
