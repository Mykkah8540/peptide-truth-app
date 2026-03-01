const TIER_STYLE = {
  flag: {
    bg: "rgba(220,38,38,0.06)",
    border: "rgba(220,38,38,0.25)",
    label: "Stop",
    labelColor: "#b91c1c",
  },
  watch: {
    bg: "rgba(234,179,8,0.07)",
    border: "rgba(234,179,8,0.35)",
    label: "Watch",
    labelColor: "#92400e",
  },
  low: {
    bg: "rgba(34,197,94,0.06)",
    border: "rgba(34,197,94,0.25)",
    label: "Low Risk",
    labelColor: "#166534",
  },
};

const flags = [
  {
    tier: "flag" as const,
    heading: "Any non-intrathecal route of administration",
    body:
      "This is the first and most important safety point. Ziconotide is approved and " +
      "studied exclusively for intrathecal delivery. Any other route\u2014IV, subcutaneous, " +
      "IM, oral\u2014would produce systemic N-type calcium channel blockade with potentially " +
      "fatal neurological and cardiovascular consequences. This is not theoretical " +
      "concern; it reflects the compound\u2019s mechanism. If you are considering " +
      "self-administration by any route, stop. This compound will not behave like " +
      "other peptides. It will cause serious harm.",
  },
  {
    tier: "flag" as const,
    heading: "Severe neurological and psychiatric side effects",
    body:
      "Even in the approved intrathecal context, ziconotide carries a black box warning " +
      "for psychiatric symptoms including depression with suicidal ideation, hallucinations, " +
      "cognitive impairment, dizziness, and confusion. Clinical trials reported psychiatric " +
      "events in a substantial proportion of patients. These are dose-related and reversible " +
      "with dose reduction or discontinuation\u2014but managing them requires specialist " +
      "oversight and access to the delivery system for dose adjustment.",
  },
  {
    tier: "flag" as const,
    heading: "Meningitis and infection risk from intrathecal delivery",
    body:
      "The intrathecal delivery system (catheter and implanted pump) creates a direct " +
      "pathway to the cerebrospinal fluid and meninges. Meningitis\u2014bacterial, fungal, " +
      "or aseptic\u2014is a documented complication of intrathecal drug delivery systems. " +
      "Managing this risk requires sterile technique during refill procedures, monitoring " +
      "for early infection signs, and immediate access to neurosurgical intervention. " +
      "This is a hospital-level safety concern.",
  },
  {
    tier: "flag" as const,
    heading: "Requires implanted pump and specialist management",
    body:
      "Ziconotide therapy requires surgical implantation of an intrathecal drug delivery " +
      "system by a neurosurgeon or interventional pain specialist. Dose titration is " +
      "cautious and slow (weeks to months) due to the serious side effect profile. Pump " +
      "refill and maintenance are ongoing medical procedures. There is no pathway for " +
      "self-administration\u2014the delivery infrastructure itself requires clinical involvement.",
  },
  {
    tier: "watch" as const,
    heading: "Narrow therapeutic index",
    body:
      "The difference between an effective intrathecal dose and one that produces " +
      "intolerable neurological side effects is small. This is why initial titration " +
      "is slow (no more than 2.4 mcg/day increases, no more frequently than 2\u20133 times " +
      "per week in the prescribing guidance) and why ongoing specialist supervision " +
      "is essential throughout therapy.",
  },
  {
    tier: "watch" as const,
    heading: "Drug interactions via intrathecal route",
    body:
      "Other drugs delivered intrathecally alongside ziconotide (opioids, baclofen, " +
      "local anesthetics) require careful management due to additive CNS depression, " +
      "hemodynamic effects, and altered pharmacokinetics in the intrathecal space. " +
      "These combinations are sometimes used in clinical practice but require specialist " +
      "oversight and are outside any self-administration context.",
  },
];

export default function ZiconotideSafetyPanel() {
  return (
    <div className="reta-safety">
      <h2 className="reta-safety__heading">Safety</h2>
      <div className="reta-safety__list">
        {flags.map((f, i) => {
          const t = TIER_STYLE[f.tier];
          return (
            <div
              key={i}
              className="reta-safety__item"
              style={{ background: t.bg, border: `1px solid ${t.border}` }}
            >
              <div className="reta-safety__item-top">
                <span className="reta-safety__item-label" style={{ color: t.labelColor }}>
                  {t.label}
                </span>
                <span className="reta-safety__item-heading">{f.heading}</span>
              </div>
              <p className="reta-safety__item-body">{f.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
