/**
 * GonadorelinSafetyPanel — safety intelligence for Gonadorelin.
 * Key frame: the desensitization paradox is the primary safety/efficacy
 * concern. Sex-hormone-sensitive conditions are the contraindications.
 * Short-term profile is benign in clinical use; established pharmaceutical.
 */

type Tier = "flag" | "watch" | "low";

interface SideEffect {
  id: string;
  name: string;
  tier: Tier;
  prevalence: string;
  mechanism: string;
  management: string[];
}

const SIDE_EFFECTS: SideEffect[] = [
  {
    id: "sex-hormone-sensitive",
    name: "Sex hormone-sensitive conditions — prostate cancer, ER-positive breast cancer, endometriosis",
    tier: "flag",
    prevalence: "Contraindication — gonadorelin drives sex steroid production",
    mechanism: "Gonadorelin stimulates LH and FSH, which drive testosterone and estrogen production. Conditions that are driven by or sensitive to sex steroids are contraindicated: prostate cancer (testosterone-driven), ER-positive breast cancer (estrogen-driven), endometriosis (estrogen-responsive tissue). The mechanism that makes gonadorelin useful for TRT adjunct or axis recovery makes it harmful in sex-hormone-sensitive disease contexts.",
    management: [
      "Prostate cancer (especially androgen-sensitive): contraindicated — gonadorelin stimulates the testosterone that drives prostate cancer growth",
      "ER-positive breast cancer: contraindicated — gonadorelin drives estrogen production in females",
      "Endometriosis: contraindicated — gonadorelin stimulates estrogen in an estrogen-responsive disease",
      "Uterine fibroids: testosterone/estrogen-responsive; discuss with gynecologist before use",
    ],
  },
  {
    id: "axis-suppression-paradox",
    name: "Axis suppression from over-frequent dosing — the desensitization paradox",
    tier: "flag",
    prevalence: "Risk with any dosing protocol that is too frequent or continuous",
    mechanism: "Continuous or over-frequent gonadorelin causes GnRH receptor downregulation and loss of LH/FSH secretion — paradoxically suppressing the axis. This is mechanistically identical to how leuprolide (a long-acting GnRH agonist) achieves medical castration. Community users who dose gonadorelin multiple times daily, or whose twice-daily protocol is too closely spaced, may be suppressing rather than stimulating. The risk is dose-frequency specific.",
    management: [
      "Monitor LH and testosterone: if testosterone is falling during gonadorelin use, suspect receptor desensitization — stop and allow recovery",
      "Reduce injection frequency if testosterone trend is downward — the desensitization paradox is frequency-dependent",
      "Standard twice-daily protocol (100 mcg morning and evening) is the clinical convention; resist increasing frequency on the assumption that more is better",
    ],
  },
  {
    id: "hot-flash-flushing",
    name: "Hot flashes and vasomotor symptoms",
    tier: "watch",
    prevalence: "Common — acute response to LH/FSH pulse",
    mechanism: "The acute LH/FSH surge after gonadorelin injection produces transient hot flashes, facial flushing, and warmth — similar to the experience during natural hormonal fluctuations. These are an expected pharmacological response reflecting that the pituitary is responding to the GnRH stimulus. They typically resolve within 30-60 minutes.",
    management: [
      "Transient hot flashes after injection are a sign of pituitary response — not a signal to stop",
      "Severe or prolonged flushing warrants dose reassessment",
      "Evening dosing before sleep can avoid awareness of daytime flushing",
    ],
  },
  {
    id: "ovarian-hyperstimulation",
    name: "Ovarian hyperstimulation syndrome (OHSS) — female use in fertility contexts",
    tier: "watch",
    prevalence: "Risk in female fertility use — not applicable to standard male TRT adjunct use",
    mechanism: "In females using gonadorelin for fertility induction, FSH stimulation can cause excessive follicular development and OHSS — a potentially serious complication. This is a risk in supervised IVF and fertility contexts, not in the TRT adjunct context (which is male-specific for most community use).",
    management: [
      "Female use in fertility context: only under reproductive endocrinology supervision with monitoring",
      "Abdominal pain, bloating, rapid weight gain, decreased urination in female fertility context: emergency evaluation for OHSS",
    ],
  },
  {
    id: "injection-site",
    name: "Injection site reactions",
    tier: "low",
    prevalence: "Common — brief pain and local reaction",
    mechanism: "Subcutaneous injection produces local reaction. Gonadorelin is a short 10-amino acid peptide — local reactions are typically mild.",
    management: [
      "Rotate injection sites with each injection",
      "Typical injection site reactions are brief and mild — persistent nodules warrant site rotation",
    ],
  },
  {
    id: "multiple-pregnancy-female",
    name: "Multiple pregnancy risk — female fertility use",
    tier: "watch",
    prevalence: "Risk in supervised female fertility use — not applicable to typical male use",
    mechanism: "FSH stimulation can produce multiple follicle development, increasing the risk of multiple pregnancy if conception occurs. This is managed in supervised fertility protocols with monitoring; it is not a concern for male TRT adjunct use.",
    management: [
      "Female fertility use: requires ultrasound monitoring of follicular development — not appropriate without clinical supervision",
    ],
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; dot: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  dot: "#9e3800", label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  dot: "#7c5200", label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", dot: "#155e38", label: "Low concern",    labelColor: "#155e38" },
};

const PLAYBOOK = [
  {
    heading: "Before starting: hormone condition screen",
    items: [
      "Prostate cancer history or current diagnosis: do not use — gonadorelin drives testosterone",
      "ER-positive breast cancer: do not use — gonadorelin drives estrogen",
      "Endometriosis: contraindicated in most cases; discuss with gynecologist",
      "Baseline LH, FSH, testosterone: establish reference before starting to enable monitoring",
    ],
  },
  {
    heading: "Dosing protocol — respecting the pulsatile physics",
    items: [
      "Standard protocol: 100 mcg subcutaneous injection twice daily (morning and evening) — this is the clinical convention; do not increase frequency assuming more is better",
      "The 12-hour interval allows partial receptor recovery between injections; more frequent dosing risks desensitization",
      "Injection 30-60 minutes before measuring LH can confirm pituitary responsiveness if monitoring",
    ],
  },
  {
    heading: "Monitoring during use",
    items: [
      "LH and testosterone every 4-8 weeks during TRT adjunct use — confirm the axis is being stimulated, not suppressed",
      "If LH response is blunted and testosterone is declining: suspect receptor desensitization; reduce frequency or dose and allow receptor recovery",
      "Testicular volume assessment: clinical or self-assessment of maintaining testicular size during TRT is a practical proxy for functional preservation",
    ],
  },
];

const RED_LINES = [
  "Prostate cancer (androgen-sensitive) — testosterone stimulation drives progression; absolute contraindication",
  "ER-positive breast cancer — estrogen stimulation; absolute contraindication",
  "Endometriosis — estrogen-responsive; contraindicated in most cases",
  "Falling testosterone during gonadorelin use — stop immediately; indicates axis suppression from desensitization",
  "Female fertility use without medical supervision — OHSS and multiple pregnancy risk require clinical monitoring",
];

export default function GonadorelinSafetyPanel() {
  return (
    <div className="reta-safety">

      {/* ── Context note ── */}
      <div className="reta-safety__context">
        Gonadorelin is a pharmaceutical-grade GnRH with an established safety profile from clinical use. The primary safety concern specific to community use is the desensitization paradox — over-frequent dosing suppresses rather than stimulates the axis. The contraindications are sex-hormone-sensitive conditions (prostate cancer, ER-positive breast cancer, endometriosis) — direct consequences of the mechanism.
      </div>

      {/* ── Side effects ── */}
      <div className="reta-safety__section-label">Side effects and risk profile</div>
      <div className="reta-safety__effects">
        {SIDE_EFFECTS.map((se) => {
          const st = TIER_STYLE[se.tier];
          return (
            <div
              key={se.id}
              className="reta-safety__effect"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-safety__effect-top">
                <div className="reta-safety__effect-name">{se.name}</div>
                <div className="reta-safety__effect-meta">
                  <span className="reta-safety__effect-prevalence">{se.prevalence}</span>
                  <span
                    className="reta-safety__effect-tier"
                    style={{ color: st.labelColor, borderColor: st.border }}
                  >
                    {st.label}
                  </span>
                </div>
              </div>
              <div className="reta-safety__effect-mechanism">{se.mechanism}</div>
              <ul className="reta-safety__effect-mgmt">
                {se.management.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* ── Playbook ── */}
      <div className="reta-safety__section-label">Safety playbook</div>
      <div className="reta-safety__playbook">
        {PLAYBOOK.map((block) => (
          <div key={block.heading} className="reta-safety__playbook-block">
            <div className="reta-safety__playbook-heading">{block.heading}</div>
            <ul className="reta-safety__playbook-list">
              {block.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Red lines ── */}
      <div className="reta-safety__redlines">
        <div className="reta-safety__redlines-heading">Stop signals — non-negotiable</div>
        <ul className="reta-safety__redlines-list">
          {RED_LINES.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}
