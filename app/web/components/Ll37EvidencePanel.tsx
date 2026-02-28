/**
 * Ll37EvidencePanel — honest evidence for LL-37.
 * Key frame: extraordinary in vitro and animal data, essentially no human clinical
 * trials for systemic self-administration. Wound healing clinical trials exist
 * (topical/local) — not equivalent to systemic injection.
 */

const SIGNALS = [
  {
    label: "Broad-spectrum antimicrobial activity — in vitro",
    value: "Established — in vitro only; not confirmed by human RCTs",
    note: "LL-37 kills a broad range of gram-positive and gram-negative bacteria, fungi, and some enveloped viruses in cell culture via membrane disruption. The in vitro antimicrobial activity is one of the most well-characterized in human peptide biology. The translation to in vivo human efficacy for clinical infections is not established — bacteria in biofilm communities, systemic infections, and human tissue environments behave very differently from cell culture.",
    tier: "moderate",
  },
  {
    label: "Wound healing — topical and local clinical trial evidence",
    value: "Limited — Phase I/II trials for specific wound contexts",
    note: "LL-37 has been studied in clinical trials for chronic wounds (diabetic foot ulcers, venous leg ulcers) via topical application or local injection. Some trials show accelerated healing versus control. This is the most clinically credible evidence for LL-37 in humans — and it is for topical or local wound healing, not for the systemic immune-boosting or infection-prevention uses the community discusses.",
    tier: "moderate",
  },
  {
    label: "Immunomodulatory effects — in vitro and animal models",
    value: "Established in preclinical models — human clinical data limited",
    note: "LL-37 modulates immune function by: recruiting neutrophils and monocytes (chemotaxis via FPRL1), modulating TLR-mediated responses (amplifying or dampening cytokine responses depending on context), promoting dendritic cell differentiation, and inducing angiogenesis. These immunomodulatory effects are real and well-characterized in vitro and in animal models. How they translate to human systemic administration in enhancement contexts is not established.",
    tier: "moderate",
  },
  {
    label: "Cancer — dual-edge, context-dependent",
    value: "Documented concern — promotes some cancers; may suppress others",
    note: "LL-37 has documented cancer-promoting effects in gastric cancer, ovarian cancer, and some lung adenocarcinomas — acting through FPRL1 receptor and ErbB2 signaling. In some other cancer types (colon cancer, some hematological malignancies), LL-37 may have anti-tumor effects. The direction is tumor-type specific and not predictable without knowing the specific cancer. Cancer history is therefore a hard stop regardless of cancer type.",
    tier: "none",
  },
  {
    label: "Autoimmune disease — LL-37 as a pathogenic driver",
    value: "Documented — LL-37 is elevated and causally implicated in several autoimmune conditions",
    note: "LL-37 is elevated in psoriatic skin lesions and drives the inflammatory cascade by activating plasmacytoid dendritic cells via TLR9. In SLE, LL-37 forms complexes with self-DNA that activate autoreactive B cells. In RA, LL-37 promotes synovial inflammation. These are not theoretical associations — they are mechanistically established roles of endogenous LL-37 in driving autoimmune pathology. Adding exogenous LL-37 in someone with these conditions amplifies the same mechanism that is already causing disease.",
    tier: "none",
  },
  {
    label: "Systemic self-administration for enhancement — the evidence gap",
    value: "Essentially no human data — the community use case is unstudied",
    note: "The community uses LL-37 for infection resistance, immune optimization, and chronic infection management via subcutaneous injection. There are no human clinical trials for these use cases. The safety, pharmacokinetics, and effects of subcutaneous LL-37 in healthy adults are not characterized. The community is operating entirely on mechanistic inference and anecdotal reports.",
    tier: "none",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; dot: string; text: string }> = {
  strong:   { bg: "rgba(21,100,58,0.07)",  border: "rgba(21,100,58,0.18)",  dot: "#155e38", text: "#155e38" },
  moderate: { bg: "rgba(124,82,0,0.07)",   border: "rgba(124,82,0,0.18)",   dot: "#7c5200", text: "#7c5200" },
  none:     { bg: "rgba(0,0,0,0.03)",      border: "rgba(0,0,0,0.08)",      dot: "#888",    text: "#555" },
};

const TRIAL_STATS = [
  { stat: "In vitro", label: "antimicrobial evidence — extraordinary breadth, limited clinical translation",          note: "Kills bacteria, fungi, and some viruses in cell culture; clinical infection treatment data is essentially absent" },
  { stat: "Ph I/II",  label: "wound healing trials — the only human clinical evidence base",                        note: "Topical/local injection for diabetic foot ulcers and venous leg ulcers; not systemic administration" },
  { stat: "~0",       label: "human RCTs for systemic self-administration or enhancement use",                       note: "The community use case is entirely outside studied human parameters" },
  { stat: "Elevated", label: "in psoriasis, SLE, RA — established pathogenic role in autoimmune disease",           note: "LL-37 is not just associated with autoimmune disease — it drives the pathology in these conditions" },
];

const MECHANISMS = [
  {
    receptor: "Direct membrane disruption — the antimicrobial mechanism",
    label: "LL-37 kills bacteria by disrupting their cell membranes — and can do the same to mammalian cells at high concentrations",
    tier: "moderate",
    body: "LL-37 is an amphipathic helix — one face is positively charged and hydrophilic; the other is hydrophobic. This structure allows it to interact with negatively charged bacterial membranes and embed itself, disrupting membrane integrity and killing the cell. The same mechanism, at sufficiently high local concentrations, can disrupt mammalian cell membranes. This is why injection site reactions from LL-37 can be more pronounced than with many other peptides — the peptide is cytotoxic at high local concentrations, not just to bacteria.",
    evidence: "Amphipathic helix structure of LL-37: established in structural biology. Gram-positive and gram-negative bacterial membrane disruption: established in vitro. Anti-biofilm activity: in vitro evidence. Cytotoxicity to mammalian cells at high concentrations: documented in cell culture.",
  },
  {
    receptor: "FPRL1 / FPR2 — the immunomodulatory receptor",
    label: "The receptor that drives both immune activation and potential tumor promotion",
    tier: "moderate",
    body: "At sub-cytotoxic concentrations, LL-37 acts on the formyl peptide receptor-like 1 (FPRL1/FPR2) to modulate immune function: recruiting neutrophils, activating monocytes, and promoting angiogenesis. This is also the receptor through which LL-37 promotes tumor growth in gastric and ovarian cancer — it activates MAPK and PI3K signaling pathways that drive cancer cell proliferation and invasion. The same receptor mediates both the immune benefit and the potential oncological harm.",
    evidence: "FPRL1 receptor role in LL-37 immunomodulation: established. LL-37 chemotaxis of neutrophils and monocytes: documented in vitro and in vivo. Cancer cell FPRL1 signaling from LL-37: published in gastric and ovarian cancer models.",
  },
  {
    receptor: "TLR9 activation — the autoimmune driver",
    label: "LL-37 amplifies self-DNA sensing, driving psoriasis and SLE pathology",
    tier: "moderate",
    body: "In psoriasis, LL-37 forms complexes with self-DNA from dying keratinocytes. These complexes activate plasmacytoid dendritic cells via TLR9, triggering massive interferon-alpha production — the initiating event in psoriatic inflammation. In SLE, a similar mechanism drives anti-nuclear antibody formation by presenting self-DNA to autoreactive B cells. This is why LL-37 is not just associated with psoriasis and SLE — it is mechanistically causative of the immune activation that drives these diseases.",
    evidence: "LL-37/self-DNA complex formation: established. TLR9 activation in psoriasis: published and mechanistically established. LL-37 elevation in psoriatic lesions: documented. LL-37 role in SLE: published in Nature Immunology and subsequent literature.",
  },
];

const GAPS = [
  "Human RCTs for systemic LL-37 self-administration in any context: essentially none — the community use case has no clinical trial data",
  "Pharmacokinetics and biodistribution of subcutaneous LL-37 in healthy adults: not characterized",
  "Whether systemic self-administered LL-37 reaches concentrations at sites of interest (biofilm, chronic infection sites) for antimicrobial activity: not established",
  "Safety of LL-37 in the context of specific chronic infections (Lyme disease, chronic Lyme, biofilm infections): not studied; the community use for these indications is entirely without clinical evidence",
  "Long-term immunological effects of repeated systemic LL-37 in humans: no data",
  "Whether the autoimmune and cancer risks from endogenous LL-37 elevation translate to exogenous injection risk at community doses: not established, but mechanism-based concern is real",
];

const OBSERVED = [
  "Injection site reactions are frequently reported and often more pronounced than with other peptides — consistent with LL-37's membrane-disrupting mechanism at high local concentrations",
  "The Lyme disease community is a significant driver of LL-37 use — specifically for biofilm disruption — but this use case has no clinical evidence and the bioavailability to biofilm sites from subcutaneous injection is not established",
  "Autoimmune flares have been reported in community members with undiagnosed or mild autoimmune conditions who used LL-37 — consistent with the mechanism-based risk",
  "Users without autoimmune history report variable experiences — some report improved wound healing and infection recovery; others report no notable effects",
  "Source quality problems are a major practical issue — community members increasingly report significant batch-to-batch variation and reaction differences suggesting purity variation",
];

export default function Ll37EvidencePanel() {
  return (
    <div className="reta-evidence">

      {/* ── Evidence at a glance ── */}
      <div>
        <div className="reta-evidence__section-label">Evidence at a glance</div>
        <div className="reta-evidence__signals">
          {SIGNALS.map((s) => {
            const st = TIER_STYLE[s.tier];
            return (
              <div
                key={s.label}
                className="reta-evidence__signal"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-evidence__signal-top">
                  <span className="reta-evidence__signal-dot" style={{ color: st.dot }}>●</span>
                  <span className="reta-evidence__signal-value" style={{ color: st.text }}>{s.value}</span>
                </div>
                <div className="reta-evidence__signal-label">{s.label}</div>
                <div className="reta-evidence__signal-note">{s.note}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Evidence landscape ── */}
      <div>
        <div className="reta-evidence__section-label">The evidence landscape — in vitro excellence, clinical absence</div>
        <div className="reta-evidence__trial-header">
          LL-37 has one of the more interesting in vitro evidence profiles of any antimicrobial peptide — broad-spectrum antimicrobial activity, wound healing promotion, immunomodulatory effects. The problem is the gap between this preclinical profile and human clinical evidence for the ways the community uses it. That gap is enormous. Wound healing clinical trials are the closest thing to human evidence — and they are for topical or local application, not systemic self-injection. The autoimmune and cancer concerns are not theoretical — they are mechanistically established from human disease biology.
        </div>
        <div className="reta-evidence__trial-stats">
          {TRIAL_STATS.map((s) => (
            <div key={s.stat} className="reta-evidence__trial-stat">
              <div className="reta-evidence__trial-stat-value">{s.stat}</div>
              <div className="reta-evidence__trial-stat-label">{s.label}</div>
              <div className="reta-evidence__trial-stat-note">{s.note}</div>
            </div>
          ))}
        </div>
        <div className="reta-evidence__trial-callout">
          The evidence for LL-37 in community use contexts is preclinical. The risks (autoimmune, cancer) are established from human disease biology. This asymmetry matters.
        </div>
      </div>

      {/* ── Mechanism breakdown ── */}
      <div>
        <div className="reta-evidence__section-label">The mechanism pathways — the same peptide that kills bacteria can drive autoimmune disease and cancer</div>
        <div className="reta-evidence__mechanisms">
          {MECHANISMS.map((m) => {
            const st = TIER_STYLE[m.tier];
            return (
              <div
                key={m.receptor}
                className="reta-evidence__mechanism"
                style={{ borderTop: `3px solid ${st.dot}` }}
              >
                <div className="reta-evidence__mechanism-receptor" style={{ color: st.dot }}>
                  {m.receptor}
                </div>
                <div className="reta-evidence__mechanism-label">{m.label}</div>
                <div className="reta-evidence__mechanism-body">{m.body}</div>
                <div className="reta-evidence__mechanism-evidence">{m.evidence}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Honest gaps ── */}
      <div>
        <div className="reta-evidence__section-label">What the evidence doesn&apos;t cover</div>
        <ul className="reta-evidence__gaps">
          {GAPS.map((g, i) => (
            <li key={i}>{g}</li>
          ))}
        </ul>
      </div>

      {/* ── Real-world observations ── */}
      <div className="reta-evidence__observed-block">
        <div className="reta-evidence__observed-heading">
          What people actually report
          <span className="reta-evidence__observed-badge">Observed — not clinical evidence</span>
        </div>
        <div className="reta-evidence__observed-sub">
          Community reports from enhancement users. LL-37 attracts a specific subset of users focused on infection management and immune optimization.
        </div>
        <ul className="reta-evidence__observed-list">
          {OBSERVED.map((o, i) => (
            <li key={i}>{o}</li>
          ))}
        </ul>
        <a className="reta-evidence__community-link" href="#community">
          Read community experiences →
        </a>
      </div>

    </div>
  );
}
