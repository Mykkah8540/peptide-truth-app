/**
 * Ll37SafetyPanel — proactive safety for LL-37.
 * Key frame: autoimmune disease is a hard stop (LL-37 drives autoimmune pathology
 * mechanistically). Cancer concern is dual-edge and not resolvable without oncology
 * guidance. Injection site reactions are common and can be significant.
 * Source quality is critical.
 */

const SIDE_EFFECTS = [
  {
    name: "Autoimmune disease worsening — LL-37 as a pathogenic driver in psoriasis, SLE, RA",
    detail: "LL-37 is mechanistically implicated in psoriasis (TLR9 activation), SLE (anti-DNA complex formation), and RA (synovial inflammation) — exogenous LL-37 amplifies these same pathological mechanisms",
    frequency: "In individuals with these conditions: high probability of worsening due to the direct mechanistic role",
    timing: "Potential worsening during active dosing",
    tier: "flag",
    note: "This is not a theoretical concern — it is established human disease biology. LL-37 is elevated in psoriatic lesions and is causally involved in initiating the TLR9-mediated interferon-alpha cascade that drives psoriatic inflammation. Adding exogenous LL-37 in someone with psoriasis is adding fuel to the mechanism driving their disease. The same principle applies to SLE and RA through related mechanisms. Any personal or family history of these conditions requires honest evaluation before considering LL-37.",
  },
  {
    name: "Cancer promotion — context-dependent, cancer-type specific",
    detail: "LL-37 promotes tumor growth and invasion in gastric cancer, ovarian cancer, and some lung adenocarcinomas via FPRL1/MAPK/PI3K signaling; the direction reverses in some other cancer types",
    frequency: "Mechanism-based concern in the presence of relevant cancer cells; not an acute toxicity event",
    timing: "Cumulative concern with ongoing use in individuals with relevant cancer history or pre-malignant conditions",
    tier: "flag",
    note: "The cancer concern for LL-37 is dual-edge and tumor-type dependent — meaning it is not fully resolved by 'I don't have cancer type X.' The FPRL1 receptor that mediates cancer promotion is expressed broadly. Cancer history of any kind warrants explicit oncology consultation before considering LL-37. The uncertainty about which direction LL-37 acts in a specific individual's cancer context is not acceptable to self-manage.",
  },
  {
    name: "Injection site reactions — more pronounced than typical peptides",
    detail: "Redness, swelling, pain, and local tissue reaction at injection site; can be significant due to LL-37's membrane-disrupting mechanism",
    frequency: "Common — LL-37 is cytotoxic to mammalian cells at high local concentrations, not just to bacteria",
    timing: "Acute post-injection; severity depends on source purity and local concentration",
    tier: "watch",
    note: "LL-37 injection site reactions are consistently reported as more significant than equivalent-volume injections of other peptides. This is mechanistically expected — the same amphipathic structure that disrupts bacterial membranes can disrupt mammalian cell membranes at high local concentrations. Impure preparations significantly worsen this. Diluting further and rotating sites helps; persistent, worsening, or infected-appearing injection site reactions require evaluation.",
  },
  {
    name: "Systemic inflammatory response",
    detail: "Systemic immune activation from LL-37's immunomodulatory effects — cytokine release, fever, malaise",
    frequency: "Not well-characterized in human self-administration; reported variably in community use",
    timing: "Acute to subacute following injection",
    tier: "watch",
    note: "LL-37 activates innate immune pathways — this can produce systemic inflammatory responses including fever, fatigue, and malaise. The magnitude depends on individual immune baseline, dose, and injection frequency. Community reports include some cases of significant systemic reactions. This is particularly relevant for individuals with any baseline immune dysregulation.",
  },
  {
    name: "Adolescent / pregnant use",
    detail: "Hard stop — no safety data; immune-active peptide with unknown developmental implications",
    frequency: "Population-specific",
    timing: "At any point during use",
    tier: "flag",
    note: "LL-37's immunomodulatory effects on developing immune systems are unknown. Pregnancy carries specific concern given LL-37's role in innate immunity at the maternal-fetal interface. Do not use.",
  },
];

const TIER_STYLE: Record<string, { bg: string; border: string; labelColor: string; label: string }> = {
  low:   { bg: "rgba(21,100,58,0.06)",  border: "rgba(21,100,58,0.15)",  labelColor: "#155e38", label: "Low concern" },
  watch: { bg: "rgba(124,82,0,0.06)",   border: "rgba(124,82,0,0.16)",   labelColor: "#7c5200", label: "Worth watching" },
  flag:  { bg: "rgba(158,56,0,0.07)",   border: "rgba(158,56,0,0.18)",   labelColor: "#9e3800", label: "Stop signal" },
};

const PLAYBOOK = [
  {
    icon: "›",
    title: "Autoimmune disease screening — the most important safety gate",
    body: "Before using LL-37, screen for any autoimmune disease — diagnosed or suspected. Psoriasis, SLE, RA, Hashimoto's thyroiditis, inflammatory bowel disease, and any condition involving chronic immune activation are all contraindications based on the established pathogenic role of LL-37 in autoimmune biology. An undiagnosed autoimmune condition is not a safe baseline — if you have unexplained inflammatory symptoms, investigate before adding LL-37.",
    flags: [
      "Psoriasis: absolute contraindication — LL-37 is mechanistically causative of psoriatic inflammation",
      "SLE or anti-nuclear antibody (ANA) positive: do not use — LL-37 amplifies the same pathological mechanism",
      "RA or other inflammatory arthritis: do not use without explicit rheumatology guidance",
      "Unexplained inflammatory symptoms: evaluate before using any immune-active compound",
    ],
  },
  {
    icon: "›",
    title: "Cancer history and screening — the cancer concern requires honest accounting",
    body: "Cancer history of any type requires explicit oncology consultation before considering LL-37. The cancer dual-edge (promotes some, may suppress others) is not resolvable without oncology guidance specific to your cancer type and current status. Age-appropriate cancer screening before starting is reasonable given the mechanism.",
    flags: [
      "Gastric cancer history: do not use — established mechanism of cancer promotion",
      "Ovarian cancer history: do not use — established mechanism of cancer promotion",
      "Any cancer history: explicit oncology consultation required before proceeding",
    ],
  },
  {
    icon: "›",
    title: "Source quality — the practical highest-priority risk variable",
    body: "No pharmaceutical-grade LL-37 exists commercially. Synthesis of LL-37 is technically challenging — the amphipathic helical structure must be preserved, and impurities are common in research-grade products. The injection site reactions commonly reported in the community are often worse with impure batches. A third-party CoA is the minimum; even with a CoA, the first injection should be done with awareness that reaction intensity varies by batch.",
    flags: [
      "No third-party CoA available: do not inject — LL-37 source quality variation is a primary safety variable",
      "Severe injection site reaction worse than previous batches: suspect purity difference; consider pausing",
      "Reconstitution: bacteriostatic water, proper aseptic technique, appropriate concentration to reduce local cytotoxicity",
    ],
  },
];

const RED_LINES = [
  {
    signal: "Any personal autoimmune diagnosis — psoriasis, SLE, RA, Hashimoto's, IBD, or similar",
    action: "Do not use LL-37. The mechanism is not a general immune concern — it is specifically pathogenic in these conditions. This is not a compound to use with autoimmune history at any dose.",
  },
  {
    signal: "Cancer history",
    action: "Do not use LL-37 without explicit oncology consultation. The dual-edge cancer biology cannot be self-managed — the direction of effect in your specific cancer context requires expert assessment.",
  },
  {
    signal: "On immunosuppressive medications",
    action: "Do not add LL-37 without physician guidance. LL-37's immune activation mechanism directly conflicts with pharmacological immunosuppression and may destabilize your current treatment.",
  },
  {
    signal: "Pregnant, breastfeeding, or adolescent",
    action: "Do not use. Immune-active peptide with no safety data in these populations and specific developmental concern.",
  },
  {
    signal: "Severe injection site reaction — significant necrosis, worsening, or infection signs",
    action: "Stop injecting immediately and seek medical evaluation. LL-37 can produce significant local tissue damage; infection and abscess are additional risks with impure product.",
  },
  {
    signal: "Fever, severe fatigue, or systemic inflammatory symptoms following injection",
    action: "Stop and seek medical evaluation. Systemic inflammatory responses from LL-37 can indicate immune overactivation that requires assessment, particularly if any autoimmune history exists.",
  },
];

export default function Ll37SafetyPanel() {
  return (
    <div className="reta-safety">

      {/* ── Section: What actually happens ── */}
      <div>
        <div className="reta-safety__section-label">What actually happens — and the real risk hierarchy</div>
        <div className="reta-safety__effects">
          {SIDE_EFFECTS.map((se) => {
            const st = TIER_STYLE[se.tier];
            return (
              <div
                key={se.name}
                className="reta-safety__effect"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-safety__effect-top">
                  <div className="reta-safety__effect-name">{se.name}</div>
                  <span
                    className="reta-safety__effect-badge"
                    style={{ color: st.labelColor, borderColor: st.border }}
                  >
                    {st.label}
                  </span>
                </div>
                <div className="reta-safety__effect-detail">{se.detail}</div>
                <div className="reta-safety__effect-timing">{se.timing}</div>
                <div className="reta-safety__effect-note">{se.note}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Section: Mitigation playbook ── */}
      <div>
        <div className="reta-safety__section-label">The mitigation playbook</div>
        <div className="reta-safety__intro">
          LL-37&apos;s safety protocol starts and ends with the autoimmune screen. This is not a general precaution — it&apos;s a mechanism-based contraindication. After autoimmune screening, cancer history and immunosuppressive medications are the next hard stops. Source quality is the primary modifiable practical risk. For a person without autoimmune disease, cancer history, or immunosuppression who has verified source quality — the acute risk profile is dominated by injection site reactions and uncertain systemic immune effects.
        </div>
        <div className="reta-safety__playbook">
          {PLAYBOOK.map((item) => (
            <div key={item.title} className="reta-safety__play">
              <div className="reta-safety__play-header">
                <span className="reta-safety__play-icon" aria-hidden="true">{item.icon}</span>
                <span className="reta-safety__play-title">{item.title}</span>
              </div>
              <div className="reta-safety__play-body">{item.body}</div>
              <ul className="reta-safety__play-flags">
                {item.flags.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section: Red lines ── */}
      <div className="reta-safety__redlines-block">
        <div className="reta-safety__section-label" style={{ opacity: 1, color: "#9e3800" }}>
          When to stop and get help
        </div>
        <div className="reta-safety__redlines-sub">
          These aren&apos;t &ldquo;maybe check in with your doctor&rdquo; situations. They&apos;re stop-now signals.
        </div>
        <div className="reta-safety__redlines">
          {RED_LINES.map((r, i) => (
            <div key={i} className="reta-safety__redline">
              <div className="reta-safety__redline-signal">{r.signal}</div>
              <div className="reta-safety__redline-action">{r.action}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Risk in proportion ── */}
      <div className="reta-safety__proportion">
        <div className="reta-safety__proportion-heading">Risk in proportion</div>
        <p>
          LL-37 occupies a different risk category from most enhancement peptides because the risk is not primarily about unknown long-term effects of a new compound — it is about known pharmacological effects of a well-studied human peptide being applied in the wrong direction. The autoimmune worsening risk is not theoretical — it is established human disease biology. The cancer dual-edge is documented in published oncology literature.
        </p>
        <p>
          For a healthy adult without autoimmune disease, cancer history, or immunosuppressive medications who has verified source quality: the acute risk profile is injection site reactions (manageable with technique and source quality) and uncertain systemic immune effects (not catastrophic in the absence of the key contraindications). The primary ongoing concern is using it for indications that have no clinical evidence base.
        </p>
        <p>
          The honest comparison: Thymosin Alpha-1 achieves immune modulation goals with substantially more human clinical evidence (approved in 35+ countries), a better-characterized safety profile, and pharmaceutical-grade product availability. If the goal is immune support, that comparison belongs in the decision.
        </p>
      </div>

    </div>
  );
}
