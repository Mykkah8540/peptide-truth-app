/**
 * ExenatideOverviewPanel — decision-oriented overview for Exenatide (Byetta / Bydureon).
 * Key frame: first FDA-approved GLP-1 receptor agonist (2005); exendin-4 analog from
 * Gila monster venom; established the GLP-1 drug class but produces substantially less
 * weight loss (~3-5%) than modern GLP-1 drugs (semaglutide ~15%, tirzepatide ~22%).
 * Byetta (twice daily) largely superseded by Bydureon (weekly extended-release).
 */

const STAT_CARDS = [
  {
    value: "GLP-1 receptor agonist",
    label: "mechanism — selective GLP-1R agonist; 53% homology with human GLP-1; exendin-4 origin",
    sub: "Exenatide is a synthetic version of exendin-4, a peptide isolated from the salivary glands of the Gila monster (Heloderma suspectum). It shares 53% amino acid homology with native human GLP-1 but has a much longer half-life due to its resistance to DPP-4 enzymatic degradation. It activates the GLP-1 receptor, producing glucose-dependent insulin secretion (only active when blood glucose is elevated), suppression of glucagon, delay of gastric emptying, and central satiety signaling. Byetta (twice daily injection) has a 2.4-hour half-life; Bydureon (weekly microsphere extended-release) maintains therapeutic levels over 7 days.",
    note: "The 53% homology vs 100% homology of native GLP-1 is why exenatide has a longer half-life — it is not recognized by DPP-4, the enzyme that rapidly inactivates native GLP-1. This is also what gave rise to the entire GLP-1 agonist drug class: exendin-4 demonstrated that a partial GLP-1 analog with DPP-4 resistance could provide sustained receptor activation. Semaglutide and liraglutide are derived from human GLP-1 modified for the same purpose, while tirzepatide adds GIP receptor co-agonism.",
  },
  {
    value: "~3–5% body weight reduction",
    label: "weight loss at approved doses (Byetta) — substantially less than semaglutide (~15%) or tirzepatide (~22%)",
    sub: "In the AMIGO trial program, exenatide (Byetta 10 mcg twice daily) produced approximately 3-5% body weight reduction over 30 weeks in T2D patients. This compares to semaglutide (Ozempic/Wegovy) at approximately 15% weight loss (SUSTAIN-6, STEP trials) and tirzepatide (Mounjaro/Zepbound) at approximately 22% weight loss (SURMOUNT trials). Bydureon BCise (weekly exenatide) produced similar or slightly less weight loss than Byetta. Exenatide's weight effect is real but modest by modern GLP-1 benchmarks.",
    note: "The weight loss gap between exenatide and modern GLP-1 drugs is mechanistically explained: semaglutide's higher GLP-1R binding affinity and longer half-life produce greater and more sustained receptor activation; tirzepatide adds GIP receptor co-agonism which synergizes with GLP-1R activation for substantially greater weight loss. Exenatide's lower potency and shorter half-life (especially Byetta) mean the receptor is not continuously activated at the levels achieved by modern weekly formulations.",
  },
  {
    value: "FDA-approved 2005",
    label: "regulatory history — first GLP-1 agonist approved; first-in-class landmark",
    sub: "Byetta (exenatide twice daily) was FDA-approved in April 2005 — the first GLP-1 receptor agonist approved anywhere in the world. This approval established the GLP-1 agonist class and preceded liraglutide (Victoza, 2010), albiglutide, dulaglutide, and eventually semaglutide (Ozempic 2017, Wegovy 2021) and tirzepatide (Mounjaro 2022, Zepbound 2023). Bydureon (weekly extended-release exenatide) was approved in 2012. Both are FDA-approved for T2D; neither is FDA-approved for obesity/weight management as a primary indication.",
    note: "The 20-year track record of exenatide is a genuine advantage in terms of real-world safety data — rare adverse effects that would not appear in clinical trials (pancreatitis, kidney injury, medullary thyroid tumor signals) have had time to emerge. The cardiovascular outcomes trial (EXSCEL) showed a neutral outcome — no significant benefit or harm — unlike semaglutide which showed significant CV benefit in SUSTAIN-6 and SELECT. The post-marketing database for exenatide is uniquely long compared to newer agents.",
  },
  {
    value: "Gila monster peptide origin",
    label: "exendin-4 source — functional analog discovered in reptile venom; 39 amino acids",
    sub: "Exenatide is a 39-amino-acid synthetic peptide corresponding to exendin-4, discovered by endocrinologist John Eng in the early 1990s in the salivary secretions of the Gila monster. Exendin-4 was identified as a potent GLP-1 receptor agonist because its GLP-1-like N-terminal sequence activates the GLP-1 receptor, while its C-terminal structure confers resistance to DPP-4 degradation. The Gila monster eats infrequently but has pronounced post-prandial insulin responses — the biology of infrequent feeding matched GLP-1R agonism. Synthetic exendin-4 became the first in-class drug.",
    note: "The Gila monster connection is scientifically meaningful, not just colorful. It demonstrates that GLP-1 receptor pharmacology is conserved across evolutionarily distant species and that DPP-4 resistance can be built into a GLP-1R agonist by structural modification. The drug discovery story is a classic example of peptide-based lead identification from natural sources — a lesson that has since been applied broadly in metabolic disease pharmacology.",
  },
];

const FIT_YES = [
  "You have T2D and have been stable on Byetta for years with good glycemic control and tolerability — switching to a newer GLP-1 drug disrupts a working regimen without guaranteed improvement in glycemic outcomes (though weight loss and CV outcomes might improve)",
  "You specifically prefer a twice-daily formulation (Byetta) because it gives you more control over timing and dosing flexibility — some patients prefer short-acting GLP-1 drugs for meal-linked glucose management",
  "You are in a setting where semaglutide and tirzepatide are not accessible (cost, shortage, formulary restrictions) and exenatide is available — it is a legitimate first-in-class GLP-1 agonist with a 20-year safety record",
  "You want the GLP-1 class with the longest post-marketing safety track record before committing to a newer agent with less long-term real-world data",
];

const FIT_NO = [
  "You are starting GLP-1 therapy today with maximizing weight loss as a primary goal — semaglutide (Ozempic/Wegovy) and tirzepatide (Mounjaro/Zepbound) outperform exenatide by a wide margin (~15% vs ~3-5% weight loss); exenatide is not the right choice here",
  "You are comparing exenatide to semaglutide or tirzepatide expecting similar outcomes — these are not equivalent compounds; exenatide is the original, lower-potency version of the drug class",
  "You are managing T2D with primary cardiovascular risk — semaglutide has significant CV outcome trial benefits (SUSTAIN-6, SELECT); exenatide has a neutral cardiovascular outcomes trial (EXSCEL); semaglutide is the superior choice for CV risk reduction",
  "You have history of pancreatitis or medullary thyroid carcinoma / MEN2 — exenatide carries the full class contraindications shared with all GLP-1 agonists",
];

const TIMELINE = [
  {
    phase: "Acute (first 1–4 weeks)",
    heading: "GI side effects peak — nausea, vomiting, reduced appetite",
    body: "The most common experience with exenatide initiation is nausea, which is the pharmacological effect of GLP-1R activation slowing gastric emptying and activating central satiety pathways. Byetta's twice-daily injection structure means GI side effects occur around injections (especially the evening dose). Bydureon's continuous release typically produces less peak nausea but the first injection can trigger acute symptoms. Gradual dose titration (5 mcg Byetta → 10 mcg) reduces but does not eliminate nausea. Most patients experience nausea in the first 4-8 weeks that then substantially diminishes.",
  },
  {
    phase: "Weeks 4–12",
    heading: "Glycemic control established; modest weight loss begins",
    body: "HbA1c reduction (the primary T2D endpoint) becomes evident by 8-12 weeks. Exenatide's glucose-dependent insulin secretion mechanism means hypoglycemia is rare when used without insulin or sulfonylureas. Weight loss of 2-4 lbs is typical in this window. For Byetta twice-daily users, the post-meal glucose excursions (especially after breakfast and dinner) are most controlled because of the prandial dosing structure. Fasting glucose improvement takes longer.",
  },
  {
    phase: "3–6 months",
    heading: "Steady-state effects — weight loss plateau typically reached",
    body: "The AMIGO trial data shows weight loss plateaus at 3-5% by approximately 30 weeks. Unlike semaglutide and tirzepatide — which in the STEP and SURMOUNT trials showed continued weight loss trajectories for over a year — exenatide reaches its ceiling relatively early. HbA1c reductions of 0.5-0.9% from baseline are typical. For patients whose primary need is glycemic control with modest weight loss, exenatide may be adequate. For patients expecting semaglutide-level trajectories, the plateau will be disappointing.",
  },
];

const COMPARISON = [
  {
    name: "Exenatide",
    badge: "GLP-1 RA / FDA-approved 2005 (first-in-class)",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GLP-1R selective agonist; 53% GLP-1 homology; DPP-4 resistant; exendin-4 origin" },
      { label: "Weight loss", value: "~3–5% body weight (Byetta/Bydureon); lowest in class for weight outcome" },
      { label: "CV outcomes", value: "EXSCEL trial — neutral (no significant benefit or harm); not a CV-outcome superior agent" },
      { label: "Formulation", value: "Byetta: 5/10 mcg SC twice daily; Bydureon: 2 mg SC weekly microsphere" },
      { label: "Status", value: "FDA-approved T2D; longest post-marketing track record in class; generic exenatide available" },
    ],
    highlight: true,
  },
  {
    name: "Semaglutide",
    badge: "GLP-1 RA / FDA-approved 2017 (Ozempic) / 2021 (Wegovy)",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GLP-1R selective agonist; human GLP-1 analog with C18 fatty acid chain; higher receptor affinity than exenatide" },
      { label: "Weight loss", value: "~15% body weight (Wegovy 2.4 mg weekly — STEP trials); markedly superior to exenatide" },
      { label: "CV outcomes", value: "SUSTAIN-6 and SELECT trials — significant CV event reduction; superior CV evidence vs exenatide" },
      { label: "Formulation", value: "Ozempic: 0.5/1/2 mg SC weekly; Wegovy: 2.4 mg SC weekly; Rybelsus: oral 3/7/14 mg daily" },
      { label: "Status", value: "FDA-approved T2D and obesity; dominant market share; the benchmark modern GLP-1 agonist" },
    ],
    highlight: false,
  },
  {
    name: "Tirzepatide",
    badge: "GLP-1/GIP dual agonist / FDA-approved 2022 (Mounjaro) / 2023 (Zepbound)",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "GLP-1R + GIPR dual agonist; co-agonism at both receptors produces synergistic metabolic effects beyond GLP-1 alone" },
      { label: "Weight loss", value: "~22% body weight (Zepbound 15 mg weekly — SURMOUNT-1); highest weight loss in class" },
      { label: "CV outcomes", value: "SURPASS-CVOT ongoing; early data favorable; direct CV comparison with exenatide shows tirzepatide is expected to be superior" },
      { label: "Formulation", value: "Mounjaro/Zepbound: 2.5/5/7.5/10/12.5/15 mg SC weekly; single weekly injection" },
      { label: "Status", value: "FDA-approved T2D and obesity; highest weight loss in class; represents the next generation beyond GLP-1 monotherapy" },
    ],
    highlight: false,
  },
];

export default function ExenatideOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The first GLP-1 agonist — exenatide established the class but modern weekly GLP-1 drugs produce greater weight loss with the same tolerability profile.
        </div>
        <div className="reta-overview__headline-sub">
          Exenatide (Byetta / Bydureon) was the first GLP-1 receptor agonist approved anywhere in the world, derived from exendin-4 in Gila monster venom. It validated the GLP-1 drug class and has a 20-year post-marketing safety track record that no newer agent can match. However, it produces substantially less weight loss (~3-5%) than semaglutide (~15%) or tirzepatide (~22%), has a neutral cardiovascular outcomes trial versus semaglutide&apos;s significant CV benefit, and is largely superseded by Bydureon BCise (weekly) over the original twice-daily Byetta formulation. For patients starting GLP-1 therapy today with weight loss as a goal, semaglutide or tirzepatide are the rational choices. Exenatide remains appropriate for patients stable on it, or where newer agents are inaccessible.
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
      <div className="reta-overview__section-label">Exenatide vs Semaglutide vs Tirzepatide</div>
      <div className="reta-overview__compare-note">
        The GLP-1 class evolution from first-generation (exenatide) to second-generation (semaglutide) to dual-agonist (tirzepatide). The mechanism is the same foundational GLP-1 receptor pharmacology — what differs is potency, receptor affinity, half-life, and the addition of GIP co-agonism in tirzepatide. Exenatide is the original; its modest weight loss and neutral CV outcome trial reflect lower receptor engagement compared to its successors.
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
