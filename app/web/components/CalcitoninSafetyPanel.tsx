/**
 * CalcitoninSafetyPanel — safety calibration for Calcitonin.
 * Key frame: the 2013 cancer signal is the primary safety concern — a real regulatory
 * finding from pooled clinical trial data. Hypocalcemia is a dose-dependent watch item.
 * Nausea/GI is the most common adverse effect. Antibody development with salmon
 * calcitonin can reduce efficacy. Injection site flushing is characteristic but benign.
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
    id: "malignancy-signal",
    heading: "Malignancy signal — 2013 FDA pooled analysis found higher non-fatal cancer rates in calcitonin-treated subjects",
    tier: "flag",
    body: "The FDA's 2013 review of 21 randomized clinical trials of salmon calcitonin nasal spray for osteoporosis found malignancy rates of approximately 2.4% in calcitonin-treated subjects vs 1.9% in placebo — a statistically significant difference in pooled analysis. The malignancies were heterogeneous (no single cancer type predominated), and the mechanism is not fully characterized. The calcitonin receptor (CALCR) is expressed in various tissues beyond bone, including epithelial cells in multiple organ systems and some tumor cell types. Receptor activation could theoretically affect tumor cell behavior. The EMA (European Medicines Agency) conducted a similar review in 2012 and reached the same conclusion. These are regulatory findings from controlled trial data, not theoretical concerns.",
    context: "This safety signal is the primary reason calcitonin should not be used outside carefully considered physician-supervised clinical contexts. The osteoporosis indication — where the cancer signal was identified — is effectively discontinued in most markets. For Paget's disease and acute hypercalcemia, the risk-benefit calculation is different: these are serious conditions where the short-term benefit may outweigh a modest malignancy signal. For any non-medical or community enhancement use, the cancer signal creates an unfavorable risk-benefit with no offsetting clinical benefit.",
  },
  {
    id: "hypocalcemia",
    heading: "Hypocalcemia — dose-dependent calcium lowering; monitoring required",
    tier: "watch",
    body: "Calcitonin's mechanism — reducing osteoclastic bone calcium efflux and (at higher pharmacological doses) reducing renal calcium reabsorption — lowers serum calcium. For therapeutic use in hypercalcemia, this is the intended effect. For Paget's disease management in patients with normal calcium, overcorrection to below-normal serum calcium is a monitoring consideration, particularly at higher doses or with concurrent calcium-restricted diet. Symptoms of hypocalcemia: muscle cramps, tetany, paresthesias (circumoral, fingertip), in severe cases: laryngospasm, seizures.",
    context: "Baseline serum calcium before starting calcitonin. Monitor calcium during treatment — frequency depends on indication (more frequent for hypercalcemia management as calcium falls; less frequent for Paget's maintenance). Ensure adequate calcium and vitamin D intake during calcitonin treatment — calcium supplementation counteracts any tendency toward hypocalcemia while also supporting bone health. If calcium drops below 8.0 mg/dL with symptoms: reduce dose and consult prescribing physician.",
  },
  {
    id: "nausea-gi",
    heading: "Nausea and GI effects — most common adverse effect; dose-related; flushing characteristic",
    tier: "watch",
    body: "Nausea, with or without vomiting, is the most commonly reported adverse effect of calcitonin and is dose-related. Injectable calcitonin produces more GI symptoms than nasal spray. A characteristic adverse effect unique to calcitonin injection is a rapid facial flushing reaction beginning 10-15 minutes after injection — described as facial warmth, erythema, and a sensation of heat. This flushing is vasomotor in nature (likely not V1a mediated given calcitonin doesn't act on V1a, but through a separate vasodilatory mechanism), lasts 30-60 minutes, and is dose-related. It is benign but can be alarming to patients who are not forewarned.",
    context: "Nausea: administer calcitonin at bedtime if GI symptoms are problematic — sleeping through the peak effect period reduces symptomatic nausea. Antiemetics can be used if nausea is significant. Flushing: inform patients that the post-injection flush is expected, benign, and temporary — it is not an allergic reaction. Dose reduction reduces both nausea and flushing frequency. The nasal spray formulation significantly reduces systemic GI adverse effects compared to injection.",
  },
  {
    id: "antibody-development",
    heading: "Neutralizing antibody development — reduces efficacy of salmon calcitonin with prolonged use",
    tier: "watch",
    body: "Salmon calcitonin is a foreign protein to the human immune system — the 50% structural divergence from human calcitonin is sufficient to trigger antibody formation in a proportion of patients (estimates range from 5-30% depending on assay sensitivity and duration of exposure). Neutralizing antibodies bind calcitonin and prevent receptor engagement, effectively reducing or eliminating the therapeutic effect. Clinical presentation: initial response followed by apparent loss of efficacy over months to years of treatment. The antibody issue does not occur with human calcitonin (self-protein), but human calcitonin's 40-50x lower potency limits its utility.",
    context: "If a patient on salmon calcitonin who initially responded shows apparent loss of therapeutic effect (rising alkaline phosphatase in Paget's, return of symptoms): test for calcitonin-binding antibodies. If antibodies are confirmed: switch to a bisphosphonate or denosumab, which do not carry antibody-mediated resistance. This is the primary reason long-term calcitonin use for Paget's disease is managed with periodic efficacy monitoring.",
  },
  {
    id: "injection-flushing",
    heading: "Post-injection flushing — characteristic vasomotor reaction; benign but alarming without forewarning",
    tier: "low",
    body: "A distinctive adverse effect of injectable calcitonin is rapid-onset facial flushing beginning approximately 10-15 minutes after injection. Patients report facial warmth, redness, tingling, and a sensation of heat. The reaction peaks within 15-30 minutes and resolves within an hour. It is dose-dependent and more pronounced with IV versus SC injection. The flushing is vasomotor in nature and is not an allergic or anaphylactic reaction — pulse and blood pressure remain normal, and there is no urticaria, bronchospasm, or angioedema.",
    context: "Always warn patients about the expected post-injection flush before their first calcitonin injection — many patients who are not warned believe they are having an allergic reaction. The reaction is benign and does not require treatment. Subcutaneous injection produces less flushing than IV. Evening administration allows the flush to occur during sleep in many patients.",
  },
  {
    id: "nasal-irritation",
    heading: "Nasal irritation — intranasal formulation local effects",
    tier: "low",
    body: "The nasal spray formulation (while available) commonly causes rhinitis, nasal congestion, epistaxis (nosebleeds), and nasal dryness. These local effects are typically mild. More significant nasal effects (persistent epistaxis, nasal ulceration) are less common but warrant dose reduction or route change. These effects are entirely formulation-specific — injectable calcitonin does not cause nasal adverse effects.",
    context: "Standard nasal spray technique (upright head, one side at a time, alternating nostrils) and moisturizing nasal saline minimize local irritation. If significant nasal effects occur: switch to injectable formulation if clinical indication supports continued calcitonin treatment.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function CalcitoninSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Calcitonin&apos;s safety profile is defined by one dominant concern: the 2013 FDA pooled clinical trial finding of higher malignancy rates in calcitonin-treated subjects. This is not a theoretical signal — it is a regulatory finding from controlled data that caused the osteoporosis nasal spray to be effectively withdrawn. Acute adverse effects (nausea, flushing, hypocalcemia) are manageable and well-characterized. Neutralizing antibodies can reduce long-term efficacy with salmon calcitonin. The cancer signal is the reason calcitonin has a very limited role in contemporary clinical medicine.
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
