/**
 * KpvOverviewPanel — decision-oriented overview for KPV (Lys-Pro-Val).
 * Key frame: C-terminal tripeptide of alpha-MSH; primarily researched for IBD
 * and mucosal inflammation via NF-κB inhibition and MC1R partial agonism.
 * Human RCT data does not exist. Oral delivery context is the primary research frame.
 */

const STAT_CARDS = [
  {
    value: "MC1R / NF-κB",
    label: "dual anti-inflammatory mechanism — melanocortin receptor partial agonism plus direct NF-κB pathway inhibition",
    sub: "KPV (Lys-Pro-Val) is the C-terminal tripeptide of alpha-melanocyte-stimulating hormone (alpha-MSH). It retains anti-inflammatory properties of alpha-MSH without the full melanocortin receptor agonism or the pigmentation effects. KPV's anti-inflammatory mechanism operates through two proposed pathways: (1) partial agonism at MC1R (melanocortin 1 receptor) expressed on immune cells including macrophages and dendritic cells, producing anti-inflammatory signaling; and (2) direct NF-κB pathway inhibition independent of MC1R — NF-κB is a central transcription factor driving inflammatory cytokine production (TNF-α, IL-6, IL-1β). The NF-κB inhibition has been demonstrated in cell culture models independent of melanocortin receptor activity.",
    note: "The dual mechanism — receptor-mediated and receptor-independent — is pharmacologically interesting but creates complexity in predicting dose-response relationships and potential effects. The MC1R partial agonism is mechanistically different from full alpha-MSH agonism, and the systemic implications of MC1R activation (pigmentation, HPA axis effects) are reduced compared to full alpha-MSH. But 'reduced' does not mean absent, particularly with systemic routes of administration.",
  },
  {
    value: "IBD / mucosal inflammation",
    label: "primary research indication — Crohn's disease, ulcerative colitis, intestinal barrier support",
    sub: "The bulk of KPV research focuses on inflammatory bowel disease — Crohn's disease and ulcerative colitis — as the primary indication. The rationale is that KPV can be delivered to the colon via oral route (peptides are generally degraded in the upper GI tract, but KPV's small size and stability make colonic delivery feasible with targeted formulations like nanoparticles or colonic release capsules), where it acts locally on intestinal immune cells. Animal model data in murine colitis (DSS-induced colitis, TNBS colitis) shows consistent reduction in colonic inflammation, inflammatory cytokines, and epithelial barrier disruption. KPV also appears to support intestinal barrier function independently of its anti-inflammatory effects.",
    note: "The IBD research frame is important context for understanding KPV's intended use. This is not primarily a systemic anti-inflammatory compound — the research positions it as a targeted mucosal anti-inflammatory delivered specifically to the inflamed intestinal tissue. The oral route for colonic delivery is a meaningful aspect of the pharmacology; systemic injection bypasses this intended local delivery mechanism and activates the compound systemically, with different receptor exposure and risk profiles.",
  },
  {
    value: "Oral tripeptide (GI stable)",
    label: "unique pharmacokinetic feature — small size and stability allow partial GI survival; oral delivery is part of the research rationale",
    sub: "Most peptides are rapidly degraded in the gastrointestinal tract by proteases. KPV, as a tripeptide, has unusual GI stability compared to larger peptides — the small size reduces the number of peptide bonds available for protease attack. Research has explored nanoparticle encapsulation, colonic-release formulations, and hydrogel systems to further optimize KPV delivery to inflamed colonic tissue. Some studies use free oral KPV in animal models and show efficacy, suggesting at least partial bioavailability of the tripeptide itself. Community protocols sometimes use oral KPV capsules for this reason — and the oral route is more aligned with the research evidence base than injection for IBD indications.",
    note: "The GI stability of KPV does not mean it reaches systemic circulation efficiently — oral absorption may be limited. The community assumption that oral KPV produces systemic anti-inflammatory effects equivalent to injection is not validated. The research rationale specifically leverages local GI delivery to inflamed tissue, not systemic exposure.",
  },
  {
    value: "Investigational (no FDA approval)",
    label: "regulatory status — preclinical and early research; no approved indications; no active large-scale drug development",
    sub: "KPV has no FDA approval for any indication. The research is primarily preclinical (cell culture and animal models) with limited early human data. Unlike many investigational peptides, KPV does not appear to be in active Phase II/III clinical development pipelines at major pharmaceutical companies — the research is primarily academic. Community access is through gray-market peptide suppliers. As a tripeptide, KPV synthesis is straightforward and product quality verification is feasible with standard analytical methods.",
    note: "The absence of active pharmaceutical development does not mean KPV is without merit — it may reflect the small patient population (IBD) relative to drug development investment thresholds, or the difficulty of commercializing a very small peptide without proprietary modification. Academic research continues. But the investigational status means community use is without regulatory safety or efficacy review.",
  },
];

const FIT_YES = [
  "IBD (Crohn's disease, ulcerative colitis) context where established treatments have failed or are being supplemented — KPV has consistent preclinical evidence for mucosal anti-inflammatory effects and is the most directly relevant community peptide for this indication",
  "Exploring the melanocortin anti-inflammatory mechanism as part of the research community — MC1R pharmacology and the alpha-MSH family have legitimate scientific interest and KPV represents the anti-inflammatory fragment without the full melanocortin side effect profile",
  "Oral peptide delivery research context — KPV is one of the few peptides where oral delivery has been specifically studied and has some supporting evidence for GI-local bioavailability",
  "Intestinal permeability ('leaky gut') context where a mucosal anti-inflammatory and barrier-supporting compound is the goal — KPV has preclinical evidence for intestinal barrier support independent of inflammation reduction",
];

const FIT_NO = [
  "Systemic inflammatory conditions (rheumatoid arthritis, systemic lupus, ankylosing spondylitis) expecting KPV to provide alpha-MSH-level systemic effects — KPV is a partial agonist with the primary evidence base in mucosal inflammation, not systemic inflammatory disease",
  "Expecting immediate systemic anti-inflammatory effects outside the GI context — the evidence base and mechanistic rationale are GI-specific; systemic effects from injectable KPV are not characterized",
  "Treating IBD without physician involvement — IBD is a serious, complex condition requiring colonoscopic monitoring, disease activity assessment, and medication management that goes beyond any single peptide supplement",
  "Expecting KPV to replace corticosteroids or biologics for IBD — the evidence base is preclinical; corticosteroids and biologics (anti-TNF, anti-integrin, anti-IL-12/23) have robust human evidence for IBD; KPV is at best an investigational adjunct",
];

const TIMELINE = [
  {
    phase: "Acute (days to 1 week)",
    heading: "Onset of anti-inflammatory signaling — NF-κB inhibition and MC1R activation",
    body: "In animal models, KPV effects on colonic inflammation are typically assessed over 1-2 weeks. NF-κB pathway inhibition and MC1R-mediated anti-inflammatory signaling occur at the cellular level relatively quickly after exposure. Community protocols use daily or frequent dosing (oral or injectable) over weeks. Whether an individual response is occurring at all — without colonoscopic mucosal assessment — is difficult to gauge subjectively for most IBD manifestations.",
  },
  {
    phase: "Weeks (continuous dosing)",
    heading: "Cumulative anti-inflammatory effects — mucosal healing potential",
    body: "The IBD animal model literature shows progressive mucosal healing, reduced inflammatory markers, and improved intestinal barrier function over 1-4 weeks of continuous KPV administration. The therapeutic goal in IBD is mucosal healing — endoscopic remission — which develops over weeks to months with any effective therapy. KPV's ability to produce mucosal healing in humans is not established. Community protocols typically run 4-8 weeks.",
  },
  {
    phase: "Long-term",
    heading: "Unknown — no human long-term data; MC1R activation implications uncharacterized",
    body: "Long-term safety and efficacy of KPV in any indication is entirely uncharacterized in humans. Continuous MC1R partial agonism long-term has not been studied. In cancer contexts, MC1R activation has complex implications (MC1R is expressed on melanocytes and some tumor cells). The anti-inflammatory effect's durability, the potential for tolerance, and the long-term systemic effects of sustained NF-κB inhibition are unknown.",
  },
];

const COMPARISON = [
  {
    name: "KPV",
    badge: "alpha-MSH C-terminal fragment / IBD research focus / Tripeptide",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "MC1R partial agonism + NF-κB inhibition; anti-inflammatory; intestinal barrier support" },
      { label: "Primary evidence", value: "Preclinical only (cell culture + animal IBD models); no human RCTs; consistent mucosal anti-inflammatory effects" },
      { label: "Best delivery", value: "Oral (colonic delivery) or injectable; oral route aligns with IBD research rationale" },
      { label: "Regulatory status", value: "Investigational; no FDA approval; no active large-scale clinical development" },
      { label: "Best indication", value: "IBD (Crohn's, UC) adjunct; intestinal permeability support; mucosal inflammation" },
    ],
    highlight: true,
  },
  {
    name: "alpha-MSH (full peptide)",
    badge: "Full melanocortin peptide / Multiple MC receptor activation",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Full MC1R-MC5R agonism; anti-inflammatory, pigmentation (MC1R), appetite suppression (MC4R), sexual function (MC4R)" },
      { label: "Primary evidence", value: "Extensive preclinical; some human data for specific indications; broader receptor activation vs. KPV" },
      { label: "Best delivery", value: "Injectable (endogenous peptide); intranasal studied; oral degradation reduces bioavailability" },
      { label: "Regulatory status", value: "Investigational; afamelanotide (MC1R agonist) approved for EPP; other indications experimental" },
      { label: "Best indication", value: "Skin conditions, sexual function (via MC4R analogs); broader than KPV's GI focus" },
    ],
    highlight: false,
  },
  {
    name: "Corticosteroids (IBD context)",
    badge: "Established IBD therapy / Strong human evidence",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Broad glucocorticoid receptor-mediated suppression of inflammation; NF-κB inhibition (overlapping with KPV) plus many other pathways" },
      { label: "Primary evidence", value: "Decades of RCT evidence for IBD; first-line for flare induction of remission; not appropriate for maintenance" },
      { label: "Best delivery", value: "Oral systemic (prednisone, prednisolone); rectal (budesonide suppositories for distal UC); IV for severe flares" },
      { label: "Regulatory status", value: "FDA-approved for IBD; standard of care for flare management" },
      { label: "Best indication", value: "Active IBD flare induction of remission; not maintenance (significant side effects with prolonged use)" },
    ],
    highlight: false,
  },
];

export default function KpvOverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          The anti-inflammatory C-terminal fragment of alpha-MSH — primarily researched for IBD and mucosal inflammation; oral delivery context.
        </div>
        <div className="reta-overview__headline-sub">
          KPV (Lys-Pro-Val) is a tripeptide derived from the C-terminus of alpha-melanocyte-stimulating hormone. It retains the anti-inflammatory activity of alpha-MSH — operating through MC1R partial agonism and direct NF-κB inhibition — without the full spectrum of melanocortin receptor activity. The research centers on IBD (Crohn's disease, ulcerative colitis), where KPV is studied for mucosal anti-inflammatory effects and intestinal barrier support. As a tripeptide, it has unusual GI stability, making oral delivery to the colon feasible — a key part of the IBD research rationale. There are no human RCTs. Community interest extends to systemic anti-inflammatory uses where the evidence base is thinner and the mechanistic rationale is weaker than for the GI indication.
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
      <div className="reta-overview__section-label">KPV vs alpha-MSH vs Corticosteroids</div>
      <div className="reta-overview__compare-note">
        Three anti-inflammatory approaches relevant to IBD. KPV is the most targeted and has the most GI-specific evidence but only preclinical data. Alpha-MSH has broader melanocortin receptor activity and broader research applications. Corticosteroids have the strongest human evidence for IBD flare management but significant long-term side effects that limit maintenance use — they are the established standard before any investigational peptide is considered.
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
