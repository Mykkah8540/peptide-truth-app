/**
 * ThymosinBeta4FullOverviewPanel — decision-oriented overview for Thymosin Beta-4 Full.
 * Key frame: the complete 43-AA protein with cardiac repair trial data;
 * most community use labeled "TB4" is actually TB-500 (the synthetic Ac-SDKP fragment).
 * Cancer history is a hard stop. Cold chain requirements are more demanding than TB-500.
 */

const STAT_CARDS = [
  {
    value: "G-actin sequestration / ILK",
    label: "mechanism — actin polymerization regulation, integrin-linked kinase signaling, angiogenesis",
    sub: "Thymosin Beta-4 (Tβ4) is an ubiquitous intracellular protein that sequesters G-actin monomers, regulating the polymerization state of the actin cytoskeleton. Beyond this primary structural role, Tβ4 activates integrin-linked kinase (ILK), which drives a cascade of downstream effects: cell migration, survival signaling (AKT pathway), angiogenesis (VEGF upregulation), and extracellular matrix remodeling. The Ac-SDKP tetrapeptide fragment released from Tβ4 by prolyl oligopeptidase has anti-fibrotic and angiogenic effects of its own. TB-500 is the synthetic version of the Ac-SDKP-adjacent region (residues 17-23 of the full protein).",
    note: "The distinction between full Tβ4 and TB-500 (the Ac-SDKP fragment) is mechanistically meaningful. The full protein contains both the actin-sequestering domain and the ILK-activating domain. TB-500 is enriched in the actin-sequestering activity. The clinical trial evidence (cardiac repair, dry eye) used full-length Tβ4 or recombinant Tβ4 — not TB-500. Community discussion often conflates the two, but they are different compounds with partially overlapping mechanisms.",
  },
  {
    value: "Cardiac repair (Phase 2)",
    label: "evidence peak — TOPCARE-AMI pilot; dry eye disease NDA filed; cardiac ischemia repair studied",
    sub: "Full thymosin beta-4 has reached the most advanced clinical stage of any thymosin peptide, with a completed Phase 2 pilot (TOPCARE-AMI study by RegeneRx) in cardiac ischemia and dry eye disease studies that have reached NDA filing stage. The cardiac repair evidence used Tβ4 to promote cardiomyocyte survival, angiogenesis in peri-infarct tissue, and potentially cardiomyocyte migration from the epicardium. Dry eye disease is the most clinically advanced application — topical Tβ4 eye drops have been studied in Phase 2 trials for corneal repair and dry eye syndrome. These are legitimate Phase 2 clinical data points.",
    note: "The cardiac repair evidence is pilot data — TOPCARE-AMI was a safety and feasibility study, not a powered efficacy trial. The dry eye data is more clinically mature. Neither has resulted in an FDA approval for the full protein. The clinical development pipeline for cardiac repair applications has been slow, reflecting the complexity of cardiac regeneration endpoints and regulatory requirements. The data is real and meaningful but does not establish the compound for any indication.",
  },
  {
    value: "TB-500 is not TB4",
    label: "key clarification — TB-500 is the Ac-SDKP fragment; TB4 is the full 43-AA protein; different sourcing and quality requirements",
    sub: "This distinction matters for almost everyone looking at this page. TB-500 (the synthetic pentapeptide AcSDKP or the 7-amino acid sequence LKKTETQ, depending on manufacturer) is NOT the same as full thymosin beta-4. They share some overlapping mechanisms but are different molecular entities. Full Tβ4 is a 43-amino acid protein with more complex folding and stability requirements. Full Tβ4 is harder to synthesize correctly, requires proper cold chain storage, and commands different quality standards. The clinical trials (TOPCARE-AMI, dry eye studies) used full-length recombinant Tβ4 — not TB-500. Community products labeled 'thymosin beta-4' are often actually TB-500.",
    note: "If you received a supply of 'thymosin beta-4' from a gray-market peptide supplier, verify by molecular weight: full Tβ4 has a molecular weight of ~4.9 kDa (4964 Da). TB-500 (Ac-LKKTETQ) has a molecular weight of ~886 Da. Mass spectrometry confirmation is the only reliable way to verify which compound you have. The two are frequently confused in community contexts.",
  },
  {
    value: "Investigational",
    label: "regulatory status — not FDA-approved for enhancement; limited pharmaceutical pipeline for cardiac repair",
    sub: "Full thymosin beta-4 has no FDA approval for any indication as of 2026. The dry eye disease application (RegeneRx RGN-259) has had the most advanced regulatory engagement. The cardiac repair application remains investigational. Community access to genuine full-length Tβ4 is through gray-market peptide suppliers, but quality verification is more demanding than for simpler peptides — the 43-AA protein requires more sophisticated synthesis and cold chain management. Supply authenticity (is this actually full Tβ4 or TB-500 labeled as Tβ4?) is the primary sourcing concern.",
    note: "The regulatory picture for full Tβ4 differs from TB-500. Full Tβ4 has a more developed clinical pipeline (actual Phase 2 data) but is further from approval. TB-500 is less clinically advanced but more practically accessible in the community market. The two should be evaluated separately — they are not interchangeable.",
  },
];

const FIT_YES = [
  "Cardiac recovery context with physician involvement — Tβ4's cardiac repair mechanism has Phase 2 pilot data; this is the most evidence-supported application context for the full protein",
  "Dry eye disease application — topical full Tβ4 has Phase 2 data for corneal healing; this is the most clinically mature Tβ4 application and should be discussed with an ophthalmologist",
  "You want to understand TB4 biology distinct from TB-500 — the full protein mechanisms (cardiac repair, ILK signaling, actin dynamics) are better characterized than TB-500 in the clinical literature",
  "Wound healing in complex contexts (major surgery recovery, difficult wounds) under medical supervision — the angiogenesis and cell migration promotion mechanisms are relevant, but cancer screening is required first",
];

const FIT_NO = [
  "Cancer history (active disease, remission, or significant family history) — the angiogenesis mechanism is a hard stop across all thymosin beta-4 forms; this is not negotiable",
  "Anyone who believes their 'thymosin beta-4' product is full Tβ4 without mass spectrometry confirmation — most community 'TB4' is actually TB-500; verify before forming any expectation based on full-protein clinical data",
  "Athletic performance enhancement without an underlying injury or medical context — the evidence (even in animal models) is for tissue repair, not performance enhancement in healthy tissue; the risk-benefit calculation is very different",
  "Anyone uncomfortable with the cold chain and storage requirements for a 43-AA glycoprotein — if proper refrigeration is not consistently maintained, the protein degrades; degraded protein cannot be assessed by injection appearance alone",
];

const TIMELINE = [
  {
    phase: "Acute (days to 1-2 weeks)",
    heading: "Anti-inflammatory and cytoprotective effects — faster component of the response",
    body: "In animal models and the dry eye disease context, thymosin beta-4 shows early anti-inflammatory effects through NF-κB pathway modulation and reduced inflammatory cytokine levels. Dry eye patients in clinical studies reported symptom improvement within weeks. The cytoprotective effects (cell survival signaling via ILK-AKT) are more acute than the repair and angiogenesis effects. Cardiac ischemia protection in animal models showed significant protection when Tβ4 was given at or near the time of injury — the acute protection window is an important aspect of the cardiac repair mechanism.",
  },
  {
    phase: "Weeks to 2-3 months",
    heading: "Tissue repair, angiogenesis, and remodeling — the primary repair arc",
    body: "The angiogenesis, cell migration, and extracellular matrix remodeling effects of full Tβ4 develop over weeks to months. In the TOPCARE-AMI cardiac pilot, imaging changes in perfusion and wall motion were assessed at 3 months. In the wound healing and musculoskeletal animal models, repair processes peaked over the first month of treatment. The full repair arc in human tissue — with its greater complexity and slower healing rates than rodents — is expected to require a sustained multi-week protocol. Community protocols of 4-12 weeks are consistent with this timeframe.",
  },
  {
    phase: "Long-term",
    heading: "Cardiac repair durability — early data is encouraging; monitoring required",
    body: "In the TOPCARE-AMI pilot, cardiac function improvements (ejection fraction, infarct size) measured at 3 months showed durable benefit at 12-month follow-up in the treated cohort. Long-term safety for non-cardiac applications in community use is not established. The angiogenesis promotion mechanism creates a theoretical concern for long-term use in any context where subclinical neoplastic processes might be present — regular health surveillance is prudent. There is no established long-term protocol for community use of full Tβ4.",
  },
];

const COMPARISON = [
  {
    name: "Thymosin Beta-4 Full (Tβ4)",
    badge: "43-AA protein / Phase 2 cardiac + dry eye data",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Size / complexity", value: "43 amino acids, ~4.9 kDa protein — more complex than TB-500; cold chain required; CoA with mass spec essential" },
      { label: "Mechanism", value: "G-actin sequestration + ILK activation + VEGF upregulation + Ac-SDKP release; broader mechanism than TB-500" },
      { label: "Evidence peak", value: "Phase 2 cardiac repair (TOPCARE-AMI pilot); dry eye Phase 2 trials; most clinically advanced thymosin compound" },
      { label: "Cancer contraindication", value: "Hard stop — angiogenesis mechanism (VEGF upregulation, vessel formation); same as TB-500 but more fully characterized" },
      { label: "Community access", value: "More difficult — synthesis complexity, cold chain requirements, authenticity verification challenges" },
    ],
    highlight: true,
  },
  {
    name: "TB-500 (Ac-SDKP fragment)",
    badge: "Synthetic fragment / Most common community TB4 product",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Size / complexity", value: "7 amino acids (Ac-LKKTETQ), ~886 Da — simpler synthesis; easier to source and verify; more stable" },
      { label: "Mechanism", value: "Actin sequestration via thymosin motif; some angiogenesis via Ac-SDKP signaling; subset of full Tβ4 mechanism" },
      { label: "Evidence peak", value: "Animal model tissue repair (musculoskeletal, cardiac); no human clinical trial data under the TB-500 name" },
      { label: "Cancer contraindication", value: "Same hard stop — angiogenesis mechanism applies; shared risk with full Tβ4" },
      { label: "Community access", value: "Most accessible — simpler peptide; most gray-market 'thymosin beta-4' products are actually TB-500" },
    ],
    highlight: false,
  },
  {
    name: "BPC-157",
    badge: "Pentadecapeptide / Different repair mechanism",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.08)",
    rows: [
      { label: "Size / complexity", value: "15 amino acids — simpler than both Tβ4 forms; standard synthesis; stable at room temperature" },
      { label: "Mechanism", value: "NO system modulation, growth factor receptor upregulation, VEGFR/FGFR; different pathway from thymosin" },
      { label: "Evidence peak", value: "30+ years animal model tissue repair and GI cytoprotection; no human RCTs; most studied repair peptide" },
      { label: "Cancer contraindication", value: "Same hard stop — angiogenesis mechanism applies; requires cancer screening before use" },
      { label: "Comparison", value: "BPC-157 is the more studied repair peptide by volume of animal data; full Tβ4 has more advanced human clinical data (Phase 2); TB-500 is between them" },
    ],
    highlight: false,
  },
];

export default function ThymosinBeta4FullOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The complete 43-AA protein with cardiac repair trial data — most community use labeled &quot;TB4&quot; is actually the TB-500 fragment, not this compound.
        </div>
        <div className="reta-overview__headline-sub">
          Thymosin Beta-4 (Tβ4) is the complete 43-amino acid isoregulatory protein that promotes actin polymerization, cell migration, and tissue repair. Most community discussion labeled &apos;TB4&apos; is actually TB-500, a synthetic peptide fragment. The full protein has cardiac repair trial evidence (TOPCARE-AMI pilot) and Phase 2 data in dry eye disease. The angiogenesis and ILK signaling mechanisms are the same as TB-500 but more fully characterized. Cancer history remains the absolute hard stop for both forms.
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
      <div className="reta-overview__section-label">Full TB4 vs TB-500 vs BPC-157</div>
      <div className="reta-overview__compare-note">
        Three repair-context peptides with different molecular sizes, evidence stages, and practical accessibility. Full Tβ4 has the most advanced human clinical data (Phase 2) but is the most complex to source and verify. TB-500 is the most practically accessible community product and is what most &apos;thymosin beta-4&apos; supply actually is. BPC-157 has the largest body of animal model evidence. All three share the cancer angiogenesis contraindication.
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
