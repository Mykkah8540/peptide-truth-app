/**
 * KisspeptinSafetyPanel — safety intelligence for Kisspeptin.
 * Key frame: the desensitization paradox is the most important "safety" issue
 * (suppressing rather than stimulating). Estrogen-sensitive conditions and PCOS
 * are the clinical contraindications. Short-term profile is benign in studies.
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
    id: "estrogen-sensitive",
    name: "Estrogen-sensitive conditions — estrogen receptor-positive cancer, endometriosis, uterine fibroids",
    tier: "flag",
    prevalence: "Contraindication — kisspeptin drives estrogen production",
    mechanism: "Kisspeptin stimulates the HPG axis and drives downstream sex steroid production — in females, this means estrogen (and progesterone in appropriate cycle phases). Conditions that are exacerbated by estrogen — ER-positive breast cancer, endometriosis, uterine fibroids — represent a direct contraindication to kisspeptin use. Stimulating further estrogen production in these contexts drives pathology.",
    management: [
      "Any ER-positive breast cancer history or current diagnosis: do not use kisspeptin — axis stimulation drives estrogen production",
      "Endometriosis: kisspeptin stimulates the very hormonal environment that drives endometriotic tissue growth — contraindicated",
      "Uterine fibroids: estrogen-responsive; kisspeptin-driven estrogen elevation could drive fibroid growth",
    ],
  },
  {
    id: "pcos",
    name: "PCOS (polycystic ovary syndrome)",
    tier: "flag",
    prevalence: "Contraindication — PCOS is characterized by LH hypersecretion",
    mechanism: "PCOS involves dysregulated LH/FSH secretion — LH is typically elevated relative to FSH, contributing to androgen excess and disrupted folliculogenesis. Kisspeptin stimulates the axis that produces LH. Adding kisspeptin to an already LH-hypersecreting system may worsen the LH/FSH dysregulation. Clinical data on kisspeptin in PCOS is limited but the mechanism creates a plausible harm pathway.",
    management: [
      "PCOS diagnosis: do not use kisspeptin without reproductive endocrinologist guidance — the LH hypersecreting mechanism of PCOS makes additional LH stimulation potentially harmful",
    ],
  },
  {
    id: "axis-suppression-paradox",
    name: "Axis suppression from continuous dosing — the desensitization paradox",
    tier: "flag",
    prevalence: "Applies to any dosing protocol without adequate pulse spacing",
    mechanism: "Continuous or high-frequency kisspeptin administration desensitizes GPR54, reducing GnRH pulse amplitude. The result is suppression rather than stimulation — the same mechanism by which GnRH agonists (leuprolide, triptorelin) achieve medical castration. Community users who dose kisspeptin daily or multiple times daily may be suppressing their axis rather than optimizing it. This is not a minor risk — it is pharmacologically equivalent to gonadotropin-releasing hormone agonist-induced hypogonadism, which is used clinically as a reversible castration method.",
    management: [
      "Ensure adequate pulse spacing between kisspeptin doses — daily or multiple-times-daily dosing is likely desensitizing",
      "Monitor LH and testosterone levels to confirm axis is stimulated, not suppressed — if testosterone is decreasing rather than stable or increasing, stop and allow axis recovery",
      "If axis suppression is suspected: stop kisspeptin, allow time for receptor recovery, and measure LH/testosterone after washout",
    ],
  },
  {
    id: "hot-flashes-flushing",
    name: "Hot flashes and vasomotor symptoms",
    tier: "watch",
    prevalence: "Reported in clinical studies — transient",
    mechanism: "Kisspeptin's hypothalamic activity can produce transient vasomotor effects — hot flashes, flushing — similar to those experienced during natural hormonal fluctuations. In IVF trigger studies, transient flushing and headache were among the most commonly reported side effects. These are generally mild and self-resolving.",
    management: [
      "Transient hot flashes and flushing after injection are an expected pharmacological response — not a signal to stop unless severe or prolonged",
      "If persistent hot flashes occur between doses, reassess dosing frequency — this can be a sign of hormonal fluctuation from pulsatile axis stimulation",
    ],
  },
  {
    id: "injection-site",
    name: "Injection site reactions",
    tier: "low",
    prevalence: "Common — local redness, brief pain",
    mechanism: "Subcutaneous peptide injection produces local reaction. Kisspeptin is a relatively short peptide (KP-10 is 10 amino acids); local reactions are typically mild and resolve quickly.",
    management: [
      "Rotate injection sites with each administration",
      "Local redness and brief stinging are normal — persistent nodules or worsening reactions warrant site rotation and evaluation",
    ],
  },
  {
    id: "source-form-ambiguity",
    name: "Product form ambiguity — KP-10 vs KP-54 vs degraded mixture",
    tier: "watch",
    prevalence: "Structural risk — community products often do not specify form",
    mechanism: "Kisspeptin is not a single peptide — KP-10, KP-13, KP-14, and KP-54 are all active forms with different potencies, half-lives, and pharmacological profiles. Clinical evidence is form-specific (KP-54 for IVF trigger; KP-10 for acute LH pulse studies). Community products sold as 'kisspeptin' often do not specify which form they contain. A degraded or truncated peptide is inactive. An unspecified form has unknown pharmacology relative to the evidence base.",
    management: [
      "Use only suppliers who specify the kisspeptin form (KP-10 or KP-54) and provide third-party CoA with mass spectrometry identity confirmation",
      "Products labeled only as 'kisspeptin' without form specification should be treated with heightened caution — the clinical evidence is form-specific",
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
    heading: "Before starting: the key screen questions",
    items: [
      "ER-positive cancer history (breast, uterine, ovarian): stop — kisspeptin drives estrogen production",
      "PCOS: stop or discuss with reproductive endocrinologist — LH hypersecreting environment makes additional LH stimulation potentially harmful",
      "Active exogenous testosterone (TRT): understand that TRT creates HPG axis suppression; kisspeptin works against this suppression but requires stopping TRT for meaningful axis recovery — both at the same time is mechanistically conflicted",
      "Prostate cancer or prostate cancer risk: kisspeptin drives testosterone; discuss with urologist",
    ],
  },
  {
    heading: "Pulsatile dosing — the most important protocol requirement",
    items: [
      "Dose interval: allow adequate recovery time between injections — daily or multiple-times-daily dosing risks receptor desensitization and axis suppression",
      "Blood-based monitoring: LH and testosterone measurement at baseline and during use is the only way to confirm the axis is being stimulated rather than suppressed",
      "If testosterone declines during kisspeptin use: stop immediately — this indicates axis suppression from desensitization, not stimulation",
      "Treat any decline in libido, energy, or other testosterone-related symptoms as a signal to stop and measure hormones",
    ],
  },
  {
    heading: "Female use requires explicit caution",
    items: [
      "Kisspeptin drives LH/FSH and downstream estrogen/progesterone — the consequences in females are cycle-phase dependent and medically complex",
      "Unsupervised female use is not appropriate without reproductive endocrinology guidance",
      "Fertility goals outside IVF: kisspeptin's effects on folliculogenesis in community-dosed protocols are not characterized; this is a clinically supervised intervention",
    ],
  },
];

const RED_LINES = [
  "ER-positive cancer history — kisspeptin drives estrogen; contraindicated",
  "PCOS — LH hypersecreting condition; kisspeptin adds to an already dysregulated LH signal",
  "Endometriosis — estrogen-driven pathology; kisspeptin stimulates estrogen production",
  "Active TRT without intent to stop — TRT + kisspeptin is mechanistically conflicted; axis recovery requires stopping TRT, not stacking kisspeptin on top",
  "Falling testosterone during kisspeptin use — indicates desensitization-driven suppression; stop immediately",
  "Pregnancy or suspected pregnancy — axis stimulation during pregnancy is not characterized; stop immediately if pregnancy occurs",
];

export default function KisspeptinSafetyPanel() {
  return (
    <div className="reta-safety">

      {/* ── Context note ── */}
      <div className="reta-safety__context">
        Kisspeptin&apos;s most important safety issue is the desensitization paradox — continuous or excessive dosing suppresses the axis rather than stimulating it. This is not a minor risk: axis suppression from receptor desensitization is pharmacologically equivalent to GnRH agonist-induced hypogonadism. The clinical contraindications (estrogen-sensitive conditions, PCOS) follow directly from the mechanism: kisspeptin drives sex steroid production, and any condition exacerbated by those steroids is a contraindication.
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
