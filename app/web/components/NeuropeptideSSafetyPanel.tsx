/**
 * NeuropeptideSSafetyPanel — proactive safety intelligence for Neuropeptide S.
 * Key frame: entirely uncharacterized in humans. The safety concern is the absence
 * of any safety data — not a documented side effect profile.
 * Primary watch signals: paradoxical anxiogenic potential, CNS drug overlaps.
 */

type Tier = "flag" | "watch" | "low";

interface SafetyItem {
  id: string;
  heading: string;
  tier: Tier;
  body: string;
  context: string;
}

const SAFETY_ITEMS: SafetyItem[] = [
  {
    id: "no-human-data",
    heading: "No human safety data \u2014 completely uncharacterized",
    tier: "watch",
    body: "There are no human clinical trials, no pharmacokinetic studies, and no documented adverse event data for exogenous NPS administration in humans. This is not a compound with a known safety profile. The absence of data is itself the primary safety concern: the full range of possible effects, dose thresholds for adverse reactions, and interaction risks are unknown.",
    context: "This \u2018watch\u2019 classification understates the concern. Most compounds at this evidence level should simply not be used. The watch designation is used here to flag it as a data gap rather than a documented harm \u2014 but that gap is complete.",
  },
  {
    id: "paradoxical-anxiety",
    heading: "Paradoxical anxiogenic potential \u2014 dose and region-dependent",
    tier: "watch",
    body: "NPS produces dose-dependent and brain-region-dependent effects in animal models: anxiolytic at some doses and in some contexts, anxiogenic at others. Higher doses and administration to specific brain circuits (e.g., lateral hypothalamus, amygdala subregions) can produce anxiety-like behavior. Without human pharmacokinetic data, predicting which effect direction exogenous NPS administration would produce is not possible.",
    context: "If you are using NPS to treat anxiety and the compound produces paradoxical anxiety amplification, you have no reference dose to adjust from, no clinical literature to interpret the response against, and no established reversal strategy. This is a specific concern for a compound with this mechanism profile.",
  },
  {
    id: "bbb-delivery",
    heading: "Blood-brain barrier delivery uncertainty",
    tier: "watch",
    body: "NPS is a 20-amino-acid peptide. Peripheral injection of an unmodified 20-AA peptide faces significant blood-brain barrier permeability challenges. The animal model effects are primarily demonstrated via intracerebroventricular (ICV) delivery \u2014 directly into the brain ventricles. Whether systemic (subcutaneous or intramuscular) injection produces meaningful CNS NPS concentrations is unknown. The pharmacology may simply not work as intended via community-accessible routes.",
    context: "This creates a second-order uncertainty: you don\u2019t know if systemic injection does anything at all at NPSR1 receptors, or if any effect you observe comes from peripheral NPSR1 activation (NPS receptors exist outside the CNS) with different pharmacological consequences.",
  },
  {
    id: "npsr1-genetics-risk",
    heading: "NPSR1 genetic variants \u2014 population risk heterogeneity",
    tier: "low",
    body: "NPSR1 polymorphisms (particularly Asn107Ile) alter receptor sensitivity. Individuals with certain NPSR1 variants may be more sensitive to NPS agonism \u2014 either more responsive (potential for greater effect at lower doses) or differently responsive. Without genetic testing for NPSR1 status, the individual pharmacological response to exogenous NPS is additionally unpredictable.",
    context: "The genetic association studies that link NPSR1 to panic disorder suggest that altered NPSR1 signaling is a vulnerability factor. Potentiating NPSR1 in someone with a high-sensitivity variant and existing anxiety vulnerability is a specific concern.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

const RED_LINES = [
  {
    signal: "Any use for anxiety, wakefulness, or appetite suppression",
    action: "No human data exists to support this use. Compounds without any human safety characterization are not appropriate for self-administration for enhancement purposes. Use Selank for the anxiolytic goal if a peptide is desired \u2014 it has at least Russian clinical data.",
  },
  {
    signal: "On benzodiazepines, SSRIs, or other anxiolytics and considering adding NPS",
    action: "Stop. The CNS interaction profile of exogenous NPS with any existing anxiolytic medication is completely uncharacterized. Adding an unknown variable to an existing CNS medication regimen creates unpredictable risk.",
  },
  {
    signal: "Adolescent or pregnant",
    action: "Hard stop. An uncharacterized CNS compound with NPSR1 agonism and anxiety circuit involvement is contraindicated in neurodevelopmental and pregnancy contexts.",
  },
  {
    signal: "Personal or family history of panic disorder",
    action: "Do not proceed. NPSR1 genetic association with panic disorder creates specific concern about exogenous NPSR1 agonism in individuals with panic vulnerability.",
  },
];

export default function NeuropeptideSSafetyPanel() {
  return (
    <div className="reta-safety">

      <div>
        <div className="reta-safety__section-label">What actually happens \u2014 and the real risk hierarchy</div>
        <div className="reta-safety__effects">
          {SAFETY_ITEMS.map((item) => {
            const st = TIER_STYLE[item.tier];
            return (
              <div
                key={item.id}
                className="reta-safety__effect"
                style={{ background: st.bg, border: `1px solid ${st.border}` }}
              >
                <div className="reta-safety__effect-top">
                  <div className="reta-safety__effect-name">{item.heading}</div>
                  <span
                    className="reta-safety__effect-badge"
                    style={{ color: st.labelColor, borderColor: st.border }}
                  >
                    {st.label}
                  </span>
                </div>
                <div className="reta-safety__effect-note">{item.body}</div>
                <div className="reta-safety__effect-detail">{item.context}</div>
              </div>
            );
          })}
        </div>
      </div>

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

      <div className="reta-safety__proportion">
        <div className="reta-safety__proportion-heading">Risk in proportion</div>
        <p>
          Neuropeptide S occupies a different risk category than most compounds in this database. It is not a compound with a documented side effect profile to weigh against benefits \u2014 it is a compound with no human data at all. The risk is the unknowing: no safety floor has been established, no dose threshold for harm, no interaction profile. The NPSR1 biology is interesting, but the gap between interesting science and safe human use is large and not bridged here.
        </p>
        <p>
          If your interest is anxiolytic peptides, Selank has Russian clinical evidence and community use history. If your interest is wakefulness, modafinil and armodafinil have extensive human safety data. NPS does not compete with these on any dimension that matters for a person making an actual decision.
        </p>
      </div>

    </div>
  );
}
