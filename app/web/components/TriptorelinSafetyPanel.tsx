/**
 * TriptorelinSafetyPanel — safety calibration for Triptorelin.
 * Key frame: the testosterone/estrogen flare at initiation is a clinically
 * managed risk in prostate cancer; community use without anti-androgen
 * cover replicates this risk unmanaged. Long-term sex hormone suppression
 * drives bone density loss and cardiovascular risk.
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
    id: "testosterone-flare",
    heading: "Testosterone/estrogen flare at initiation — first 1-2 weeks cause hormone surge before suppression",
    tier: "flag",
    body: "The first 1-2 weeks of triptorelin therapy produce paradoxical LH/FSH stimulation and a testosterone (men) or estrogen (women) surge — the 'flare' phenomenon — before receptor desensitization collapses the axis. In prostate cancer patients, this testosterone flare can cause bone pain flare, worsening lower urinary tract symptoms, and in patients with spinal metastases, the flare can cause spinal cord compression requiring emergency intervention. This risk is managed in clinical prostate cancer protocols by co-administering anti-androgens (bicalutamide, cyproterone) for the first 2-4 weeks to block the testosterone flare effect at end-organ level.",
    context: "Community use of triptorelin without anti-androgen flare cover replicates a known clinical risk without the management protocol. Any prostate cancer patient context absolutely requires anti-androgen cover during GnRH agonist initiation — this is an oncological emergency risk, not a theoretical concern. Off-label use by anyone with prostate disease, elevated PSA, or undiagnosed prostate pathology faces this risk.",
  },
  {
    id: "bone-density",
    heading: "Osteoporosis with long-term use — sex hormone suppression drives clinically significant bone density loss",
    tier: "flag",
    body: "Testosterone and estrogen are critical for bone density maintenance. Sustained GnRH agonist-induced sex hormone suppression causes bone density loss that is measurable at 6 months and clinically significant with > 12 months of therapy. In prostate cancer patients on long-term androgen deprivation therapy, fracture risk is substantially elevated. In endometriosis treatment, bone density loss limits triptorelin therapy to 6 months without add-back hormone therapy. Bone density loss from GnRH agonists is partially reversible after cessation but full recovery is not guaranteed, especially after prolonged suppression.",
    context: "Bone density monitoring (DEXA scan) is standard of care for patients on GnRH agonist therapy beyond 6 months. Supplementation with calcium (1000-1200 mg/day) and vitamin D (800-1000 IU/day) is recommended. Bisphosphonate therapy may be added for high-risk patients. Community use without this monitoring framework creates unmonitored bone density loss that may not become clinically apparent until fracture.",
  },
  {
    id: "cardiovascular-risk",
    heading: "Cardiovascular risk with androgen deprivation — elevated event rates in men with prostate cancer",
    tier: "watch",
    body: "Androgen deprivation therapy (ADT) — the sex hormone suppression achieved by triptorelin — is associated with increased cardiovascular event rates in men with prostate cancer. The mechanisms include: insulin resistance (testosterone deficiency causes metabolic syndrome components), dyslipidemia, increased fat mass, decreased lean muscle mass, and QTc prolongation. Major cardiovascular events (MI, stroke) are elevated in men on ADT, particularly those with pre-existing cardiovascular disease. This is a documented pharmacovigilance signal from large prostate cancer registries and trial data.",
    context: "Men with pre-existing cardiovascular disease, metabolic syndrome, or diabetes contemplating triptorelin use require explicit cardiologist involvement. Cardiovascular risk mitigation (statin therapy, blood pressure management, exercise programs) is part of responsible ADT management in clinical oncology. Community use without this framework accepts uncharacterized cardiovascular risk.",
  },
  {
    id: "depression-mood",
    heading: "Depression and mood changes — sex hormone suppression and CNS effects",
    tier: "watch",
    body: "Sex hormone suppression from GnRH agonist therapy is associated with depression, mood lability, and cognitive changes in both men (on ADT for prostate cancer) and women (on GnRH agonist therapy for endometriosis or fibroids). The mechanisms include direct loss of testosterone/estrogen effects on mood regulation and the psychological impact of the physical changes accompanying sex hormone deficiency. These mood effects are underreported in trial data and documented in patient experience literature. Severe depression requiring psychiatric intervention occurs in a subset of patients.",
    context: "Anyone with a history of depression, bipolar disorder, or other mood disorders should discuss triptorelin therapy with a psychiatrist before initiation. Mood monitoring during therapy is essential. Community use without psychiatric support for at-risk individuals places mood safety at risk from an otherwise avoidable exposure.",
  },
  {
    id: "depot-irreversibility",
    heading: "Depot irreversibility — cannot stop effects once injected; months-long commitment",
    tier: "watch",
    body: "Unlike oral medications or short-acting injections, once a triptorelin depot is administered, the drug release and its physiological effects cannot be terminated early. A 3-month depot commits to approximately 3 months of axis suppression regardless of emerging adverse effects. If the individual experiences severe mood effects, cardiovascular events, or any intolerable adverse reaction, there is no pharmacological reversal available — supportive care must manage the depot period.",
    context: "This irreversibility is the defining practical safety feature of depot GnRH agonist formulations. Anyone considering triptorelin off-label must understand that the decision is not analogous to starting a daily medication that can be stopped. Careful selection and physician oversight before initiating a depot is essential precisely because course correction is not available after injection.",
  },
  {
    id: "injection-site",
    heading: "Injection site reactions — depot microsphere formulations",
    tier: "low",
    body: "Triptorelin depot injections (intramuscular or subcutaneous depending on formulation) can cause local reactions including pain, swelling, and induration at the injection site. These are generally mild and self-limiting. The depot microsphere formulation requires proper reconstitution and injection technique.",
    context: "Standard injection site care applies. No unusual injection site concerns beyond standard depot formulation administration.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function TriptorelinSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Triptorelin has a significant safety profile that is well-characterized from its oncological and gynecological approved indications. The two major safety concerns are: (1) testosterone/estrogen flare at initiation — managed in clinical prostate cancer settings with anti-androgen cover, but a real unmanaged risk in community use; and (2) long-term bone density loss from sustained sex hormone suppression. Cardiovascular risk, depression, and the irreversibility of depot formulations are secondary but important concerns. Community use of this compound outside of physician supervision is not appropriate given the clinical management requirements its safety profile demands.
      </div>
      <div className="reta-safety__list">
        {SAFETY_ITEMS.map((item) => {
          const st = TIER_STYLE[item.tier];
          return (
            <div
              key={item.id}
              className="reta-safety__entry"
              style={{ background: st.bg, border: `1px solid ${st.border}` }}
            >
              <div className="reta-safety__entry-top">
                <div className="reta-safety__entry-heading">{item.heading}</div>
                <div
                  className="reta-safety__entry-tier"
                  style={{ color: st.labelColor, borderColor: st.border }}
                >
                  {st.label}
                </div>
              </div>
              <div className="reta-safety__entry-body">{item.body}</div>
              <div className="reta-safety__entry-context">{item.context}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
