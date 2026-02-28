/**
 * DSIPSafetyPanel — safety calibration for DSIP.
 * Key frame: generally regarded as low acute toxicity in animal models;
 * no established serious adverse effects in human studies; but the data is
 * sparse and old. Opioid receptor interactions create a context-specific concern.
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
    id: "opioid-use",
    heading: "Active opioid use or opioid use disorder — complex interaction with opioid receptor system",
    tier: "flag",
    body: "DSIP has proposed opioid receptor interactions that may underlie its efficacy in withdrawal states. Using DSIP while actively taking opioid medications (prescription or otherwise) creates an uncharacterized interaction at opioid receptor systems. The direction and magnitude of this interaction — additive, antagonistic, or modulatory — is not established in controlled studies. The withdrawal studies used DSIP during active withdrawal, not alongside ongoing opioid use.",
    context: "On any opioid medication (prescription pain management, methadone maintenance, buprenorphine): do not use DSIP without discussing with the prescribing physician. The opioid receptor interaction is proposed but not pharmacologically characterized. The clinical context of opioid withdrawal studies is different from concurrent opioid use.",
  },
  {
    id: "cns-depressants",
    heading: "Combined CNS depressants — sedatives, benzodiazepines, sleep medications",
    tier: "watch",
    body: "DSIP has sleep-modulating properties in some studies. Combining DSIP with sedative medications (benzodiazepines, z-drugs like zolpidem/eszopiclone, gabapentinoids, alcohol) creates the theoretical risk of additive CNS depression. Whether DSIP's effects are strong enough in practice to create clinically significant sedative combination effects is uncertain, but the theoretical interaction is present.",
    context: "On benzodiazepines or z-drugs prescribed for sleep or anxiety: discuss with prescribing physician before adding DSIP. Avoid combining with alcohol given the potential additive CNS depressant effects. Start DSIP on a night where no other sedatives are used to characterize the individual response.",
  },
  {
    id: "unknown-profile",
    heading: "Overall safety profile — sparse data; no modern systematic safety studies",
    tier: "watch",
    body: "DSIP's human safety data comes from small studies conducted 30-45 years ago with limited safety monitoring by modern standards. No serious adverse events were reported in the published human studies, but the monitoring was not designed to detect delayed or subtle effects. The 9-amino-acid peptide is small enough for standard synthesis, reducing the quality concerns that apply to large proteins. But the safety profile for long-term community use (months of weekly dosing) is not characterized.",
    context: "DSIP appears to have low acute toxicity based on the historical human data. This is reassuring but not a full safety profile. Baseline monitoring (liver function, basic metabolic panel) before starting and after 4-8 weeks of use is reasonable. Document any sleep architecture changes (if using a sleep tracker) and stress markers to assess individual response.",
  },
  {
    id: "bbb-penetration",
    heading: "Blood-brain barrier penetration — uncertain for subcutaneous injection route",
    tier: "watch",
    body: "The original sleep studies used intravenous and sometimes intracerebroventricular administration routes that bypass the blood-brain barrier. Whether subcutaneous DSIP injection achieves sufficient CNS concentrations to produce neurological effects is not established. If DSIP does not penetrate the BBB after subcutaneous injection, the primary effect would be peripheral (HPA axis, stress hormones) rather than central sleep modulation.",
    context: "This is not a safety concern per se, but is worth understanding — subcutaneous injection may produce a different effect profile than IV administration in the original studies. Peripheral effects (HPA axis) may be more accessible than central sleep effects from the community injection route.",
  },
  {
    id: "injection-reactions",
    heading: "Injection site reactions — standard small peptide considerations",
    tier: "low",
    body: "As a 9-amino-acid peptide, DSIP is small and amenable to standard solid-phase synthesis. Quality issues are less severe than for large glycoproteins. Standard subcutaneous injection tolerability is expected. No unusual injection site concerns are documented in the historical human studies.",
    context: "Standard injection hygiene and site rotation apply. No specific injection site concerns beyond those applicable to any subcutaneous peptide injection.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function DSIPSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        DSIP appears to have low acute toxicity in the small historical human studies — no serious adverse events were reported. The primary safety considerations are: opioid receptor interactions (relevant for people on opioid medications), potential additive CNS depression with sedatives, and the general caveat that the safety profile is from 1980s-90s studies with limited monitoring. This is not a compound with documented serious harms, but the evidence base is thin.
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
