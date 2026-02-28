/**
 * Bpc157ArginateOverviewPanel — decision-oriented overview for BPC-157 Arginate.
 * Key frame: same active peptide as BPC-157 (GEPPPGKPADDAGLV);
 * arginate is the counterion for improved water solubility and stability.
 * No separate clinical evidence — all BPC-157 evidence applies. The choice
 * between standard BPC-157 and arginate form is a formulation/sourcing question.
 */

const STAT_CARDS = [
  {
    value: "BPC-157 (identical)",
    label: "active peptide — same GEPPPGKPADDAGLV sequence; arginate is the counterion, not the active moiety",
    sub: "BPC-157 arginate is BPC-157 (Body Protection Compound-157, the pentadecapeptide GEPPPGKPADDAGLV) complexed with arginine to form a water-soluble salt. The arginate salt form is a pharmaceutical chemistry technique: pairing a peptide with a counterion (in this case, arginine) to improve its aqueous solubility, stability, and handling properties. The active moiety — the 15-amino-acid BPC-157 sequence — is identical. Arginate salt formation does not modify the peptide structure, change its receptor interactions, or alter its pharmacodynamic profile. In solution, the arginate salt dissociates into BPC-157 and arginine.",
    note: "The distinction between BPC-157 and BPC-157 arginate is entirely a formulation chemistry distinction, not a pharmacological one. The evidence base — all from BPC-157 studies in animal models — applies to both forms equally. There is no rationale for expecting different efficacy or different safety from the arginate form. Whether suppliers choose arginate vs standard BPC-157 is typically driven by solubility during manufacturing and shipping stability considerations, not by superiority claims.",
  },
  {
    value: "Solubility",
    label: "arginate advantage — improved aqueous solubility; relevant for reconstitution and injection site tolerability",
    sub: "BPC-157 has limited water solubility in its free acid or acetate salt form, which can make reconstitution challenging and contribute to injection site irritation if the peptide is not fully dissolved. Arginate salt formation improves aqueous solubility by taking advantage of arginine's positive charge at physiological pH — the arginine counterion helps maintain the peptide in solution. This is the primary practical advantage of the arginate form. Whether the improved solubility translates to meaningfully better bioavailability or tolerability in community injection use is not established in comparative studies.",
    note: "The solubility advantage is real from pharmaceutical chemistry principles. Whether it matters clinically for community subcutaneous injection use is a different question. Most users of standard BPC-157 acetate successfully reconstitute it in bacteriostatic water without severe injection site problems. The arginate form may provide marginal reconstitution ease — particularly for higher-dose injection preparations — but this is not a clinically validated superiority claim.",
  },
  {
    value: "No separate evidence",
    label: "evidence base — all BPC-157 evidence applies; no arginate-specific human or animal studies",
    sub: "There are no published human or animal studies that specifically studied BPC-157 arginate as distinct from standard BPC-157. All animal model evidence for BPC-157's effects on wound healing, tendon repair, gut protection, and neurological effects is from studies using BPC-157 in its standard (acetate) form. The assumption that arginate form has equivalent pharmacology is scientifically reasonable (same active peptide), but it is an assumption — not a tested claim. Any efficacy claims for BPC-157 arginate are derived entirely from BPC-157's evidence base, not from arginate-specific data.",
    note: "This is an important caveat for anyone evaluating arginate form claims. Suppliers sometimes market arginate as 'more bioavailable' or 'more effective' — but there is no comparative pharmacokinetic or pharmacodynamic data supporting superiority over standard BPC-157. The evidence transfer from BPC-157 to arginate is reasonable in principle but has not been empirically validated.",
  },
  {
    value: "Research chemical",
    label: "regulatory status — same as standard BPC-157; no FDA approval; gray-market supply",
    sub: "BPC-157 arginate has the same regulatory status as standard BPC-157: no FDA approval for any indication, available through gray-market peptide suppliers, classified as a research chemical in most jurisdictions. The arginate form does not change the regulatory picture. Supply quality concerns (purity, endotoxin testing, accurate dosing) apply equally to the arginate form. The slightly improved solubility may marginally benefit supplier handling and formulation, but it does not imply any regulatory or quality guarantee.",
    note: "Gray-market BPC-157 supply quality varies substantially between suppliers. The arginate form's improved solubility may make it slightly easier for suppliers to produce clean preparations — but CoA (Certificate of Analysis) review and third-party mass spec verification remain the only ways to assess product quality for either form.",
  },
];

const FIT_YES = [
  "You have already used standard BPC-157 and experienced injection site irritation or reconstitution difficulties — the arginate form's improved solubility may address that specific formulation issue",
  "Your supplier stocks arginate form as their standard BPC-157 product and you want to understand whether it is pharmacologically equivalent to what BPC-157 studies used — it is, same active peptide",
  "You are researching BPC-157's mechanisms and want to understand what the salt form distinction means for formulation and bioavailability — a legitimate scientific question",
  "You are evaluating peptide sourcing options and want to understand whether arginate vs acetate form should influence your supplier decision — solubility is a reasonable consideration if you have had reconstitution problems",
];

const FIT_NO = [
  "You believe arginate form is a different, superior compound with separate evidence — it is not; the evidence base is identical to standard BPC-157 and the choice of form is a formulation preference",
  "You are choosing arginate over standard BPC-157 based on supplier claims of superior bioavailability or effectiveness — no comparative pharmacokinetic data supports this claim",
  "You are new to BPC-157 specifically seeking the arginate form — start with understanding the BPC-157 evidence base (all animal models, no human RCTs) before making a form distinction that is not supported by comparative data",
  "You have cancer history — BPC-157's angiogenesis and growth factor promotion mechanisms are a hard stop regardless of which salt form you use; the arginate designation does not change this",
];

const TIMELINE = [
  {
    phase: "Acute (hours to days)",
    heading: "Same onset expectations as standard BPC-157 — formulation does not change kinetics",
    body: "BPC-157 arginate, once reconstituted and injected, dissociates in solution and in vivo into BPC-157 and arginine. The pharmacokinetic profile of the active BPC-157 peptide should be essentially identical to standard BPC-157. In animal models, BPC-157 effects on wound healing and gut protection appear acutely (within hours for cytoprotective effects) and over days for tissue repair effects. The arginate form does not introduce a slow-release mechanism — it is not a depot formulation.",
  },
  {
    phase: "Days to weeks",
    heading: "Tissue repair and healing context — same timeline as standard BPC-157",
    body: "In the animal models where BPC-157 shows the most compelling data (tendon, ligament, and muscle repair), effects develop over days to weeks of dosing in the injured tissue context. These timelines apply to arginate form equally. The typical community protocol of 4-8 weeks of subcutaneous or oral dosing for repair applications is based on the BPC-157 animal model literature — not on any controlled human trial. The arginate form follows the same evidence-derived framework.",
  },
  {
    phase: "Long-term",
    heading: "No long-term data for either BPC-157 form",
    body: "Long-term safety and efficacy of BPC-157 in either standard or arginate form is not established in human subjects. The animal model studies are largely acute or subacute. Community long-term use data is anecdotal. The arginate form does not add any long-term monitoring considerations beyond those applicable to standard BPC-157 — but neither form has characterized human long-term data.",
  },
];

const COMPARISON = [
  {
    name: "BPC-157 Arginate",
    badge: "BPC-157 salt form / Formulation variant",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Active peptide", value: "GEPPPGKPADDAGLV — identical to standard BPC-157; arginate is the counterion" },
      { label: "Evidence base", value: "Same as BPC-157 — all animal model evidence applies; no arginate-specific human or animal studies" },
      { label: "Solubility advantage", value: "Improved aqueous solubility via arginine counterion — may ease reconstitution; no documented superiority in vivo" },
      { label: "Regulatory status", value: "Identical to standard BPC-157 — no FDA approval; gray-market research chemical" },
      { label: "Choice rationale", value: "Formulation preference only — prefer arginate if reconstitution has been difficult; no pharmacological basis for superiority" },
    ],
    highlight: true,
  },
  {
    name: "BPC-157 (standard / acetate)",
    badge: "Standard BPC-157 / Most studied form",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.08)",
    rows: [
      { label: "Active peptide", value: "GEPPPGKPADDAGLV — the pentadecapeptide; same sequence as arginate form" },
      { label: "Evidence base", value: "30+ years of animal model data; the studies referenced in BPC-157 research all used standard form; more supplier options available" },
      { label: "Solubility", value: "Marginally lower aqueous solubility than arginate form; most users successfully reconstitute in bacteriostatic water without significant difficulty" },
      { label: "Regulatory status", value: "Same — no FDA approval; gray-market research chemical; the form all peer-reviewed animal studies used" },
      { label: "Choice rationale", value: "Standard form if supplier is reputable; arginate if reconstitution has been problematic or supplier offers better purity guarantees in arginate form" },
    ],
    highlight: false,
  },
  {
    name: "BPC-157 oral formulations",
    badge: "Oral route / Different delivery context",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Active peptide", value: "Same GEPPPGKPADDAGLV — oral capsule or tablet formulations targeting GI-specific effects" },
      { label: "Evidence base", value: "Animal model GI protection evidence is partially derived from oral and IP routes; oral BPC-157 has animal model support for GI tract healing specifically" },
      { label: "Bioavailability", value: "Oral peptide bioavailability is generally low for systemic effects; oral route may achieve local GI concentrations sufficient for GI-specific effects" },
      { label: "Use context", value: "Oral BPC-157 is specifically relevant for GI repair applications (IBD, gut lining); subcutaneous (either form) is used for systemic and musculoskeletal applications" },
      { label: "Choice rationale", value: "Oral for GI-specific goals; subcutaneous (standard or arginate) for musculoskeletal or systemic applications — these are route decisions, not form decisions" },
    ],
    highlight: false,
  },
];

export default function Bpc157ArginateOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The same peptide as BPC-157 in a different salt form — arginate solves solubility without changing the molecule or the evidence.
        </div>
        <div className="reta-overview__headline-sub">
          BPC-157 arginate is BPC-157 complexed with arginine to form a more water-soluble salt. The active peptide (pentadecapeptide GEPPPGKPADDAGLV) is identical. Arginate formulations are used in pharmaceutical chemistry to improve solubility and stability of peptides — this is an established formulation technique, not a different compound. The evidence base for BPC-157 applies; there is no separate clinical literature for BPC-157 arginate specifically. The choice between standard BPC-157 and arginate form is primarily a formulation and sourcing question.
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
      <div className="reta-overview__section-label">BPC-157 Arginate vs Standard BPC-157 vs Oral BPC-157</div>
      <div className="reta-overview__compare-note">
        Three presentations of the same active peptide. Arginate and standard forms are pharmacologically identical — the arginate distinction is a formulation chemistry choice with a modest solubility advantage. Oral BPC-157 is a different route decision that targets GI-specific effects. Across all three, the evidence base is the same 30+ years of animal model data, and no form has human RCT evidence.
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
