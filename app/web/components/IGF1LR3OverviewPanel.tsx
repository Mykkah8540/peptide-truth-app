/**
 * IGF1LR3OverviewPanel — decision-oriented overview for IGF-1 LR3.
 * Key frame: synthetic IGF-1 analog with extended half-life (~20-30h vs
 * ~10-15min for endogenous IGF-1); same IGF-1R activation but sustained
 * exposure dramatically amplifies both effects and risks vs native IGF-1.
 * Hypoglycemia is the primary acute safety concern.
 */

const STAT_CARDS = [
  {
    value: "IGF-1 receptor (IGF-1R)",
    label: "mechanism — same receptor as native IGF-1 but dramatically extended half-life changes the pharmacological profile",
    sub: "IGF-1 LR3 (Long R3 IGF-1) is a synthetic IGF-1 analog with two modifications: an N-terminal 13-amino-acid extension and a Glu→Arg substitution at position 3. These modifications prevent binding to IGF binding proteins (IGFBPs), which normally sequester circulating IGF-1 and limit its bioavailability. The result: IGF-1 LR3 has ~50-fold reduced IGFBP binding and a dramatically extended half-life (~20-30 hours vs. ~10-15 minutes for endogenous free IGF-1). It binds and activates the same IGF-1 receptor as native IGF-1.",
    note: "The extended half-life is the defining pharmacological difference. Native IGF-1's short half-life when free (regulated by IGFBPs) limits its duration of action. IGF-1 LR3's resistance to IGFBP binding means it circulates freely for hours to days. This translates to more prolonged IGF-1R activation — more anabolic effect per dose, and more prolonged glucose-lowering, cancer stimulation, and other IGF-1 effects.",
  },
  {
    value: "Muscle + tissue growth",
    label: "IGF-1R activation drives: protein synthesis (mTOR/Akt), muscle hypertrophy, satellite cell activation, glucose uptake",
    sub: "IGF-1 receptor signaling activates the PI3K/Akt/mTOR pathway (protein synthesis, cell growth, anti-apoptosis) and the MAPK/ERK pathway (proliferation, differentiation). In skeletal muscle, this drives protein synthesis, satellite cell proliferation, and hypertrophy. IGF-1 also increases glucose uptake in muscle via GLUT4 translocation — a direct insulin-like metabolic effect causing hypoglycemia. These effects are the basis of the community bodybuilding use case.",
    note: "The same IGF-1R signaling that drives muscle hypertrophy also drives cancer cell growth. IGF-1R is overexpressed in multiple cancer types; IGF-1R signaling promotes cancer cell survival, proliferation, and metastasis. The cancer concern is not a theoretical extrapolation — targeting the IGF-1R pathway is an active area of oncological drug development, with drugs designed to block what community users are trying to activate.",
  },
  {
    value: "Hypoglycemia risk",
    label: "primary acute safety concern — IGF-1 LR3 causes prolonged glucose lowering; more sustained than native IGF-1",
    sub: "IGF-1 stimulates glucose uptake in skeletal muscle via insulin-independent GLUT4 translocation — a direct glucose-lowering mechanism. IGF-1 LR3's extended half-life means this glucose-lowering effect persists for hours after injection, unlike native IGF-1's brief action. Hypoglycemia from IGF-1 LR3 can be severe and prolonged — more so than from regular IGF-1 because of the sustained exposure. Injecting in a fasted state dramatically amplifies risk.",
    note: "The hypoglycemia risk profile of IGF-1 LR3 is meaningfully worse than regular IGF-1 due to the extended half-life. A single injection can cause blood glucose suppression lasting 12-24+ hours. This is not a short transient risk window — it is a sustained hypoglycemia risk that persists through the day and night.",
  },
  {
    value: "Research chemical",
    label: "regulatory status — no FDA approval for any use; used in cell culture research; gray-market community access",
    sub: "IGF-1 LR3 has no FDA approval for any indication. It is used in cell culture as a research reagent to stimulate cell growth without IGFBP interference. It is not in clinical development for any human indication. Community access is through gray-market sources with highly variable quality. Unlike native IGF-1 (which has pharmaceutical preparations for GH deficiency), IGF-1 LR3 has no pharmaceutical production standard.",
    note: "The absence of any clinical development for IGF-1 LR3 reflects the oncological risk profile. While native IGF-1 is studied for specific therapeutic contexts (GH deficiency, extreme insulin resistance), IGF-1 LR3's prolonged free IGF-1R activation is not a profile that drug development pursues — precisely because sustained IGF-1 signaling is what oncology is trying to block.",
  },
];

const FIT_YES = [
  "You have a specific clinical context (severe insulin resistance like Donohue syndrome, or GH insensitivity) where a physician has specifically discussed IGF-1 therapy — native IGF-1 (mecasermin) exists for clinical use",
  "You understand the cancer screen requirement (PSA, recent screening) is not optional — the IGF-1R is a growth signal for multiple cancer types and any occult cancer is a contraindication",
  "You have arranged to never inject fasted, always have fast-acting glucose on hand, and are not doing this alone — the hypoglycemia risk is serious and the extended duration makes it more dangerous than most compounds",
];

const FIT_NO = [
  "You have any cancer history — IGF-1R is overexpressed in multiple cancers and is a validated oncological target; stimulating this receptor in someone with cancer is contraindicated",
  "You have diabetes or significant insulin resistance — the additive glucose-lowering effect with existing metabolic dysfunction creates dangerous hypoglycemia risk",
  "You are comparing this to native IGF-1 and think the extended half-life is purely advantageous — the same persistence that amplifies anabolic effects also amplifies hypoglycemia duration, cancer growth stimulation, and all other IGF-1R effects",
  "You want growth hormone axis support — GH peptide secretagogues (ipamorelin, CJC-1295) stimulate the GH/IGF-1 axis through physiological pulsatile release with a very different risk profile than direct IGF-1 LR3 injection",
];

const TIMELINE = [
  {
    phase: "Hours (acute danger window)",
    heading: "Extended hypoglycemia window — blood glucose suppression persists 12-24+ hours",
    body: "IGF-1 LR3's ~20-30 hour half-life means glucose-lowering effects persist long after injection. Unlike regular IGF-1 (where glucose effects resolve within 1-2 hours), IGF-1 LR3's glucose suppression can persist into the next day. The danger window is not just the hour post-injection — it is the entire day and potentially overnight. This requires glucose monitoring throughout the effect period, not just immediately post-injection.",
  },
  {
    phase: "Weeks",
    heading: "Muscle hypertrophy signal — mTOR/Akt activation drives protein synthesis",
    body: "With appropriate nutrition, resistance training, and glucose management, IGF-1 LR3 is expected to produce measurable muscle hypertrophy over weeks of use. The mechanism (mTOR/Akt/protein synthesis) is well-characterized. Whether the hypertrophy exceeds what is achievable from properly managed GH-axis peptides (ipamorelin + CJC-1295) with a much better safety profile is not established.",
  },
  {
    phase: "Long-term concern",
    heading: "IGF-1 exposure and cancer risk — cumulative IGF-1R activation",
    body: "Elevated circulating IGF-1 levels are associated with increased risk of prostate, breast, colorectal, and other cancers in observational epidemiology. Chronic IGF-1 LR3 use maintains elevated free IGF-1R stimulation continuously — a pattern that does not occur naturally (endogenous IGF-1 is tightly regulated by IGFBPs). The long-term cancer risk of sustained supraphysiological IGF-1R activation from LR3 is not quantified but mechanistically concerning.",
  },
];

const COMPARISON = [
  {
    name: "IGF-1 LR3",
    badge: "IGF-1 analog / Research chemical",
    badgeColor: "#9e3800",
    badgeBg: "rgba(158,56,0,0.08)",
    rows: [
      { label: "Mechanism", value: "IGFBP-resistant IGF-1 analog → sustained free IGF-1R activation; half-life ~20-30h" },
      { label: "Hypoglycemia duration", value: "Prolonged — glucose suppression persists 12-24+ hours; highest risk of any community insulin-pathway compound" },
      { label: "Cancer risk", value: "Significant — sustained free IGF-1R activation; IGF-1R is a validated oncology target" },
      { label: "Evidence", value: "Cell culture/animal data; no human clinical trials; no pharmaceutical development pathway" },
      { label: "Status", value: "No FDA approval; research chemical; no pharmaceutical standard" },
    ],
    highlight: true,
  },
  {
    name: "Native IGF-1 (Mecasermin)",
    badge: "Pharmaceutical IGF-1 / FDA-approved",
    badgeColor: "#155e38",
    badgeBg: "rgba(21,100,58,0.10)",
    rows: [
      { label: "Mechanism", value: "Same IGF-1R; subject to IGFBP regulation; shorter free half-life than LR3; physiological pharmacokinetics" },
      { label: "Hypoglycemia duration", value: "Shorter duration — IGFBP regulation limits free IGF-1 window; still requires post-meal administration" },
      { label: "Cancer risk", value: "Present — same IGF-1R pathway; IGFBP regulation provides some brake on sustained activation" },
      { label: "Evidence", value: "FDA-approved for severe primary IGF-1 deficiency; Phase 2/3 data for ALS (mixed); established pharmaceutical" },
      { label: "Status", value: "FDA-approved (Increlex) for specific indications; not for bodybuilding; Rx required" },
    ],
    highlight: false,
  },
  {
    name: "Ipamorelin + CJC-1295",
    badge: "GH axis peptides / Investigational",
    badgeColor: "#7c5200",
    badgeBg: "rgba(124,82,0,0.10)",
    rows: [
      { label: "Mechanism", value: "Pituitary GH release → liver IGF-1 production; physiological axis stimulation, not direct IGF-1 injection" },
      { label: "Hypoglycemia duration", value: "Lower risk — GH/IGF-1 rise is pulsatile and regulated; not the same acute hypoglycemia profile as IGF-1 injection" },
      { label: "Cancer risk", value: "Present (IGF-1 elevation) but at physiological levels; meaningfully lower risk profile than direct IGF-1 LR3" },
      { label: "Evidence", value: "GH-axis mechanism established; human PK data; more clinical evidence than IGF-1 LR3 specifically" },
      { label: "Status", value: "Compounding pharmacy access; investigational; cancer history still a contraindication" },
    ],
    highlight: false,
  },
];

export default function IGF1LR3OverviewPanel() {
  return (
    <div className="reta-overview">

      {/* ── Headline ── */}
      <div className="reta-overview__headline">
        <div className="reta-overview__headline-text">
          Extended-half-life IGF-1 analog: more anabolic effect per dose, more prolonged hypoglycemia, more sustained cancer growth signaling — and no pharmaceutical development pathway for good reason.
        </div>
        <div className="reta-overview__headline-sub">
          IGF-1 LR3 bypasses the IGFBP binding proteins that naturally regulate free IGF-1 exposure, producing a half-life of ~20-30 hours vs. minutes for endogenous free IGF-1. This dramatically amplifies both the intended effect (muscle hypertrophy) and the risks (hypoglycemia persisting 12-24+ hours, sustained IGF-1 receptor activation in cancer cells). No clinical development is pursuing IGF-1 LR3 for human use precisely because sustained free IGF-1R activation is what oncological drugs are designed to block. If the muscle-building goal is the objective, GH-axis peptides (ipamorelin, CJC-1295) achieve physiological IGF-1 elevation with a substantially better risk profile.
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
      <div className="reta-overview__section-label">IGF-1 LR3 vs Native IGF-1 vs Ipamorelin + CJC-1295</div>
      <div className="reta-overview__compare-note">
        Three IGF-1 pathway approaches with dramatically different risk profiles. IGF-1 LR3 has the highest risk — prolonged hypoglycemia, sustained cancer signaling, no pharmaceutical safety standard. Native IGF-1 (mecasermin) is regulated with IGFBP binding limiting free exposure. GH peptides produce physiological IGF-1 elevation through the body&apos;s own regulation. For most community goals, GH peptides have a substantially better risk profile than direct IGF-1 injection.
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
