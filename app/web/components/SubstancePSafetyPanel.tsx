/**
 * SubstancePSafetyPanel — safety calibration for Substance P.
 * Key frame: the "safety concerns" for SP injection are not classical adverse effects
 * to manage — they are the direct pharmacological mechanism of the compound.
 * Peripheral NK1R activation causes pain and neurogenic inflammation. This is not
 * a safety profile to navigate around; it is the reason not to inject SP.
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
    id: "injection-mechanism",
    heading: "Community injection: the mechanism IS the harm — NK1R activation produces pain and inflammation",
    tier: "flag",
    body: "This is not a standard safety profile for a compound with incidental adverse effects that can be managed. Substance P's peripheral pharmacological mechanism — NK1R activation in nociceptive neurons, blood vessels, and mast cells — produces pain, vasodilation, plasma extravasation, and mast cell degranulation. These are not side effects of an otherwise beneficial compound; they are the primary pharmacological action of SP in peripheral tissue. Injecting substance P subcutaneously would be expected to cause: immediate local pain at the injection site, vasodilation (redness, warmth), wheal-and-flare (edema and surrounding erythema from mast cell histamine release), and potentially systemic effects if significant mast cell activation occurs.",
    context: "There is no safe dose or safe protocol for community SP injection because the mechanism itself is the harm. This is not a risk-benefit calculation where risks can be managed — the core pharmacological action in peripheral tissue is pro-nociceptive and pro-inflammatory. Any healthcare professional evaluating this compound for community use should counsel clearly that injection of SP is contraindicated by its mechanism of action.",
  },
  {
    id: "on-nk1-antagonists",
    heading: "If currently on NK1 receptor antagonists (aprepitant, netupitant) — pharmacological opposition",
    tier: "flag",
    body: "Aprepitant (Emend) and netupitant (Akynzeo) are FDA-approved NK1 receptor antagonists used for CINV prevention. They work by blocking SP's action at the NK1R. If someone on an NK1 antagonist administered exogenous SP, the SP would compete with the antagonist at the NK1R. Depending on the relative concentrations of antagonist and agonist (SP), the antagonist's therapeutic effect could be reduced or overcome. This is direct pharmacological opposition of a prescribed therapeutic. Beyond the interaction concern, this reinforces that the therapeutic direction in the NK1 system is antagonism — adding SP would undermine the treatment.",
    context: "Anyone on aprepitant or netupitant (typically during chemotherapy cycles) should not consider SP administration under any circumstances — it directly opposes the therapeutic mechanism of these medications. Inform any treating oncologist of any peptide use during active chemotherapy cycles.",
  },
  {
    id: "pain-conditions",
    heading: "Pre-existing chronic pain conditions — SP administration would be expected to worsen pain",
    tier: "flag",
    body: "Fibromyalgia, complex regional pain syndrome, chronic low back pain, and migraine are all conditions in which elevated SP levels or sensitized SP/NK1R systems have been documented. In these conditions, central sensitization amplifies pain signal transmission. Exogenous SP would provide additional NK1R agonism on top of an already sensitized system — a mechanism directly opposed to therapeutic goals. NK1 antagonists are studied (with mixed but partially positive results) for these conditions precisely because blocking the SP/NK1R system is the direction of relief. Administering SP to a patient with a sensitized pain system is pharmacologically counterproductive.",
    context: "Patients with fibromyalgia, CRPS, chronic migraine, or other chronic pain conditions should be clearly counseled that SP administration is mechanistically counterproductive and would be expected to worsen, not improve, their pain states.",
  },
  {
    id: "mast-cell-disorders",
    heading: "Mast cell activation syndrome or mastocytosis — SP is a potent mast cell degranulator",
    tier: "watch",
    body: "Substance P is a potent trigger for mast cell degranulation via NK1R on mast cells. Patients with mast cell activation syndrome (MCAS) or systemic mastocytosis have hyperreactive mast cells that degranulate in response to lower-than-normal stimuli. Exogenous SP would trigger robust mast cell activation in these patients, releasing histamine, tryptase, prostaglandins, and potentially triggering anaphylactoid reactions. While this is a concern for the general population as well, it is particularly pronounced in patients with pre-existing mast cell hyperreactivity.",
    context: "Patients with mast cell activation syndrome, mastocytosis, or severe allergic conditions should be explicitly counseled that SP is a direct mast cell activator. Even in healthy individuals, significant mast cell activation from SP injection could produce histamine-mediated systemic reactions (flushing, tachycardia, hypotension in severe cases).",
  },
  {
    id: "pain-sensitization",
    heading: "Risk of central sensitization amplification — repeated SP stimulation can worsen chronic pain",
    tier: "watch",
    body: "Central sensitization — the process by which the central nervous system becomes increasingly responsive to pain signals — is mediated in part by sustained SP release and NK1R activation in the dorsal horn. Repeated or sustained NK1R stimulation upregulates the pain processing circuitry and can convert acute pain into chronic pain states. This is not merely a theoretical concern: it is the mechanism by which acute tissue damage can evolve into chronic pain syndromes. Any community injection of SP would contribute to NK1R-driven sensitization processes rather than therapeutic benefit.",
    context: "The central sensitization mechanism is the pharmacological reason why NK1 antagonists (not agonists) are therapeutic targets for chronic pain. Repeated SP stimulation from injection would move in the opposite direction — toward sensitization rather than pain relief.",
  },
];

const TIER_STYLE: Record<Tier, { bg: string; border: string; label: string; labelColor: string }> = {
  flag:  { bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.20)",  label: "Stop signal",    labelColor: "#9e3800" },
  watch: { bg: "rgba(124,82,0,0.06)",  border: "rgba(124,82,0,0.17)",  label: "Worth watching", labelColor: "#7c5200" },
  low:   { bg: "rgba(21,100,58,0.05)", border: "rgba(21,100,58,0.13)", label: "Low concern",    labelColor: "#155e38" },
};

export default function SubstancePSafetyPanel() {
  return (
    <div className="reta-safety">
      <div className="reta-safety__context">
        Substance P is unusual among compounds discussed in the peptide community in that the safety concern is not incidental — it is the core pharmacological mechanism. NK1R activation in peripheral tissue causes pain and neurogenic inflammation. This is not a compound with tolerable side effects that can be managed with careful dosing — the mechanism of action in peripheral tissue is pro-inflammatory and pro-nociceptive by design. The safety determination for SP injection is not a risk-benefit calculation; it is a pharmacological contraindication based on mechanism.
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
