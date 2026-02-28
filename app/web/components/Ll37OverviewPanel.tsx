/**
 * Ll37OverviewPanel — decision-oriented overview for LL-37.
 * Key frame: a human antimicrobial peptide with extraordinary in vitro and animal data
 * and essentially zero clinical trials for enhancement/self-administration use.
 * The dual-edge immunology (pro-inflammatory in autoimmune, potentially pro-tumorigenic
 * in some cancers) is the defining risk that the community systematically underweights.
 * Autoimmune history is a hard stop.
 */

const STAT_CARDS = [
  {
    value: "Cathelicidin",
    label: "the sole human cathelicidin — endogenously produced in skin, airways, and immune cells",
    sub: "LL-37 is a 37-amino acid peptide derived from the C-terminus of the human cathelicidin protein hCAP-18. It is produced naturally by neutrophils, macrophages, epithelial cells in skin and airways, and other innate immune cells. The name comes from the two leucines at its N-terminus and its length (37 amino acids)",
    note: "LL-37 being endogenously produced is often cited as a safety argument in the community. This framing is wrong — the endogenous production is tightly regulated, context-dependent, and highly localized. Injecting pharmacological doses systemically is fundamentally different from the regulated local release that occurs naturally.",
  },
  {
    value: "Dual-edge",
    label: "antimicrobial + immunomodulatory — which effect dominates depends on concentration and context",
    sub: "LL-37 is antimicrobial at high concentrations (membrane disruption of bacteria, fungi, some viruses) and immunomodulatory at lower concentrations (cytokine modulation, chemotaxis, wound healing). The same peptide that kills pathogens can promote inflammation in autoimmune contexts or support tumor growth in some cancer types",
    note: "The dual-edge mechanism is not a minor footnote — it is the defining pharmacological tension for LL-37. The community narrative emphasizes the antimicrobial and immune-boosting angle. The less-discussed side: LL-37 is elevated in psoriatic lesions and actively drives the inflammatory pathology; LL-37 promotes some tumor types while suppressing others. Context determines which effect dominates.",
  },
  {
    value: "No human trials",
    label: "for enhancement or self-administration use — animal and in vitro data only",
    sub: "LL-37 has Phase I/II clinical trial data in wound healing contexts (topical or local injection). For systemic self-administration in enhancement contexts — the way the community uses it — there are essentially no human clinical trials. The evidence base is cell culture and animal models",
    note: "The community narratives about LL-37 for infection resistance, Lyme disease, chronic infections, and immune optimization are running substantially ahead of the clinical evidence. This is not a compound with a 'limited human evidence' problem — it's a compound with essentially no human evidence for the ways the community discusses using it.",
  },
  {
    value: "Research-grade",
    label: "no pharmaceutical-grade standard — source quality is critical and unregulated",
    sub: "No FDA-approved LL-37 product exists for the uses the community discusses. Research-grade LL-37 from peptide suppliers varies widely in purity and sterility. The peptide is challenging to synthesize with high purity; impure preparations carry significant local and systemic reaction risk",
    note: "The synthesis challenge for LL-37 is real — the peptide has a complex structure and its amphipathic helical shape is essential for its activity. Research-grade products vary significantly in whether the active conformation is maintained and whether impurities are present. A third-party CoA is a minimum, not a guarantee.",
  },
];

const FIT_YES = [
  "You are participating in a supervised clinical trial or research protocol involving LL-37 — the only context where the risk/benefit calculation has been made with appropriate expertise and monitoring",
  "You have no autoimmune disease, no cancer history, and no immunosuppressive medications — the two clearest contraindications; if these don't apply, the risk profile is more manageable",
  "You have verified source quality with a third-party certificate of analysis covering purity, sterility, and identity — without this, the primary safety variable is unaddressed",
  "You have realistic expectations based on the actual evidence (animal models and in vitro, not human RCTs) and are explicitly accepting the evidence-free nature of self-administration in enhancement contexts",
];

const FIT_NO = [
  "You have any autoimmune disease — LL-37 is elevated and pathogenic in psoriasis, systemic lupus erythematosus (SLE), and rheumatoid arthritis; exogenous LL-37 would add to a mechanism that is already driving disease pathology",
  "You have cancer history — LL-37 promotes growth of some cancers (gastric, ovarian, lung adenocarcinoma) while suppressing others; the uncertainty about which direction it acts in your specific cancer context is not resolvable without oncology guidance",
  "You are on immunosuppressive medications — LL-37's immune activation mechanism directly conflicts with pharmacological immunosuppression",
  "You are expecting LL-37 to treat or prevent a specific infection (Lyme disease, biofilm infections, chronic infections) — the community narrative for these uses is significantly ahead of the clinical evidence; there are no human clinical trials supporting LL-37 for these specific indications",
  "You are pregnant, breastfeeding, or an adolescent — immune-active peptides during development have unknown implications",
  "You cannot verify source quality — impure LL-37 preparations carry significant injection site and systemic reaction risk",
];

const TIMELINE = [
  {
    phase: "No established human timeline",
    heading: "There is no validated human enhancement timeline for LL-37 self-administration",
    body: "The clinical trial data for LL-37 is in wound healing contexts (topical or locally injected), not systemic self-administration. The animal model timeline for antimicrobial and immune effects ranges from hours (direct antimicrobial activity) to days-weeks (wound healing). Applying this to human systemic self-injection protocols is speculation. Any timeline the community uses is convention, not evidence.",
  },
  {
    phase: "Injection site",
    heading: "Injection site reactions are the most predictable and common effect",
    body: "LL-37 is a membrane-disrupting peptide — this is literally how it kills bacteria. It can also disrupt mammalian cell membranes at high local concentrations, which is why injection site reactions (redness, swelling, pain) are common and can be significant with impure or concentrated preparations. Local inflammatory response at the injection site is expected and can be more pronounced than with most peptides.",
  },
  {
    phase: "Systemic effects",
    heading: "Systemic immune effects — unknown in magnitude and direction for human self-administration",
    body: "LL-37 modulates cytokine production (both pro- and anti-inflammatory), affects neutrophil and monocyte function, and has chemotactic effects. What happens systemically when a human self-administers pharmacological doses subcutaneously is not characterized. The immune modulation could go in directions that are beneficial, neutral, or harmful depending on the individual's immune state, autoimmune status, and cancer status.",
  },
];

const COMPARISON = [
  {
    name: "LL-37",
    badge: "Antimicrobial peptide / Cathelicidin",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Direct antimicrobial (membrane disruption) + immunomodulatory (cytokine modulation, chemotaxis)" },
      { label: "Human evidence", value: "Wound healing clinical trials (topical/local); essentially none for systemic self-administration" },
      { label: "Autoimmune risk", value: "Significant — elevated in psoriasis, SLE, RA as a pathogenic driver; contraindicated in these conditions" },
      { label: "Cancer risk", value: "Dual-edge — promotes some cancers; suppresses others; direction is cancer-type dependent" },
      { label: "Status", value: "Research-grade only; no FDA approval for enhancement use" },
    ],
    highlight: true,
  },
  {
    name: "Thymosin Alpha-1",
    badge: "Immune modulator / Approved globally",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Thymic T-cell maturation, NK cell activation, dendritic cell function — adaptive immune focus" },
      { label: "Human evidence", value: "Approved in 35+ countries for hepatitis B/C and oncology adjunct; substantial human data" },
      { label: "Autoimmune risk", value: "Present but different mechanism — modulates via T-cell, not cathelicidin pathways" },
      { label: "Cancer risk", value: "Generally immune-activating in oncology context; not same dual-edge as LL-37" },
      { label: "Status", value: "Pharmaceutical-grade available (Zadaxin); prescription in some jurisdictions" },
    ],
    highlight: false,
  },
  {
    name: "BPC-157",
    badge: "Healing peptide / Research-grade",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Angiogenesis, growth factor upregulation, gut protection — tissue repair focus" },
      { label: "Human evidence", value: "No human RCTs; 30+ years animal data for GI and tissue healing" },
      { label: "Autoimmune risk", value: "Low — not an immune activator in the same sense; different mechanism entirely" },
      { label: "Cancer risk", value: "Modest angiogenesis concern; not the same dual-edge mechanism as LL-37" },
      { label: "Status", value: "Research-grade; no FDA approval" },
    ],
    highlight: false,
  },
];

export default function Ll37OverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          A powerful antimicrobial peptide your body makes — with extraordinary lab data and essentially no human clinical trial evidence for the ways the community uses it.
        </div>
        <div className="reta-overview__headline-sub">
          LL-37 is a real antimicrobial peptide that kills bacteria, modulates the immune system, and promotes wound healing in animal and cell culture models. The gap between that evidence base and the community narrative (Lyme disease treatment, biofilm clearing, infection resistance) is enormous. The dual-edge immunology — LL-37 drives psoriasis and lupus pathology; it promotes some cancers — is systematically underweighted in community discussions. Autoimmune disease is a hard stop. If your goal is immune support with better-characterized human data, Thymosin Alpha-1 is the comparison worth making first.
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
      <div className="reta-overview__section-label">LL-37 vs Thymosin Alpha-1 vs BPC-157</div>
      <div className="reta-overview__compare-note">
        If the goal is immune support, Thymosin Alpha-1 has substantially more human clinical evidence (approved in 35+ countries) and a more characterized safety profile than LL-37 for systemic use. BPC-157 is the comparison for healing goals — different mechanism, different risk profile, more animal data.
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
