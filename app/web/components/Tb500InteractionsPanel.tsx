/**
 * Tb500InteractionsPanel — interaction intelligence for TB-500.
 * Key distinctions vs BPC-157:
 * - Cancer drugs / oncology treatments are a FLAG (tissue-growth signaling)
 * - Anticoagulants/antiplatelets are a FLAG (mechanistic + supplement_classes data)
 * - The tissue-growth signaling concern runs through multiple interaction categories
 */

type Tier = "flag" | "watch" | "low";

type Entry = {
  name: string;
  tier: Tier;
  detail: string;
  why: string;
  action: string;
};

const ENTRIES: Entry[] = [
  // ── FLAGS ──
  {
    name: "Cancer treatments (chemotherapy, targeted therapy, immunotherapy)",
    tier: "flag",
    detail: "Active oncology treatment of any kind",
    why: "Tβ4/TB-500 biology involves cell migration, tissue growth signaling, and angiogenesis — pathways that can interact mechanistically with cancer therapies in unpredictable directions. Some targeted therapies specifically inhibit growth factor signaling. The interaction unknowns here are not small.",
    action: "Stop TB-500 and consult your oncologist before resuming. This is not a 'discuss when convenient' recommendation — it's a hard gate.",
  },
  {
    name: "Anticoagulants (warfarin, heparin, apixaban, rivaroxaban, dabigatran)",
    tier: "flag",
    detail: "Prescription blood thinners",
    why: "Tβ4/TB-500 promotes angiogenesis and may have effects on vascular biology. Combining with anticoagulants creates plausible additive bleeding risk. Warfarin in particular has a narrow therapeutic window — any variable affecting vascular biology warrants attention.",
    action: "Consult your prescribing physician before starting TB-500. If you experience unusual bruising, bleeding, or blood in urine/stool: stop TB-500 and contact your doctor.",
  },
  {
    name: "Antiplatelets (clopidogrel, ticagrelor, prasugrel)",
    tier: "flag",
    detail: "Prescription platelet-inhibiting drugs, typically for cardiovascular protection",
    why: "Same mechanistic concern as anticoagulants. Antiplatelets are often prescribed for high-stakes cardiovascular indications (post-stent, ACS history) — any interaction affecting bleeding risk in that context is meaningful.",
    action: "Discuss with your cardiologist or prescribing physician before starting TB-500.",
  },

  // ── WATCHES ──
  {
    name: "Immunosuppressants / biologics (methotrexate, cyclosporine, TNF inhibitors)",
    tier: "watch",
    detail: "Prescription immunomodulating therapy, typically for autoimmune conditions",
    why: "Tβ4's role in immune regulation and the interaction between TB-500 and immunosuppressive regimens is unstudied. Adding a compound with tissue-growth and immune-modulating properties to an existing immunosuppressive regimen introduces unknowns that are hard to characterize.",
    action: "Consult your rheumatologist or prescribing physician. This is worth a direct conversation — don't assume it's compatible because both are 'anti-inflammatory'.",
  },
  {
    name: "NSAIDs (ibuprofen, naproxen, diclofenac)",
    tier: "watch",
    detail: "Anti-inflammatory pain medications, especially with chronic/daily use",
    why: "Same feedback loop issue as BPC-157: if you're using TB-500 for injury recovery while masking pain with chronic NSAIDs, you've removed the signal that tells you whether the underlying issue is healing. Acute NSAID use (single dose) is a different situation from daily use.",
    action: "Consider limiting chronic NSAID use during the TB-500 evaluation period. You need the pain feedback signal to assess whether healing is occurring.",
  },
  {
    name: "Corticosteroids (prednisone, dexamethasone, cortisone injections)",
    tier: "watch",
    detail: "Systemic or locally injected steroids",
    why: "Anti-inflammatory overlap creates a signal-masking problem. Corticosteroids can also independently affect tissue healing. Running both simultaneously makes it harder to attribute any change to either compound.",
    action: "If on systemic corticosteroids, consult your prescribing physician before adding TB-500. Local steroid injections at the same site should not be combined without medical guidance.",
  },
  {
    name: "Anticoagulant herbs (high-dose fish oil, ginkgo biloba, garlic supplements)",
    tier: "watch",
    detail: "Supplements with known platelet-affecting or anticoagulant properties",
    why: "Compound supplement_classes data flags anticoagulant-herb interactions. High-dose fish oil (>3g/day EPA+DHA), ginkgo, and garlic at supplement doses can have additive blood-thinning effects — this becomes more meaningful given TB-500's vascular biology.",
    action: "Note the additive risk. Not a hard stop, but monitor for unusual bruising or bleeding. If on a prescription anticoagulant, this combination warrants extra caution.",
  },
  {
    name: "Alcohol (heavy or chronic use)",
    tier: "watch",
    detail: "Regular heavy drinking during a recovery-focused protocol",
    why: "Alcohol impairs tissue healing directly — it reduces protein synthesis, promotes systemic inflammation, disrupts sleep architecture (which is when tissue repair occurs), and impairs immune function. Running a recovery peptide while drinking heavily is working against the stated goal.",
    action: "Not a hard stop, but chronic heavy alcohol use significantly counteracts the recovery environment TB-500 aims to support.",
  },

  // ── LOWS ──
  {
    name: "BPC-157",
    tier: "low",
    detail: "Commonly stacked — complementary mechanism",
    why: "BPC-157 acts primarily through VEGF/angiogenesis and NOS pathways; TB-500 through actin regulation and anti-inflammatory signaling. Different mechanism pathways for overlapping goals = complementary, not redundant. The BPC+TB-500 stack is the most common community protocol for injury recovery.",
    action: "Standard stack — no interaction concern. Each compound multiplies the sourcing quality risk, not the pharmacological risk.",
  },
  {
    name: "Ipamorelin / CJC-1295",
    tier: "low",
    detail: "Growth hormone secretagogues, often co-used in recovery protocols",
    why: "Different mechanism (GH release vs. tissue repair). No known pharmacological conflict. Commonly stacked in recovery contexts.",
    action: "No specific concern. Each compound should be sourced and verified independently.",
  },
  {
    name: "MK-677 (ibutamoren)",
    tier: "low",
    detail: "GH secretagogue; often used in recovery/recomp contexts",
    why: "Different mechanism from TB-500. No known direct interaction.",
    action: "No specific concern. Note that MK-677 is also research-grade — quality risk applies to each compound independently.",
  },
  {
    name: "NAD+ / NMN / NR",
    tier: "low",
    detail: "Cellular energy / longevity supplementation",
    why: "Different mechanism; commonly co-used in health optimization contexts. No known pharmacological conflict.",
    action: "No interaction concern. Sourcing quality check applies to each compound.",
  },
  {
    name: "Collagen peptides / vitamin C / zinc",
    tier: "low",
    detail: "Supportive nutrition for connective tissue health",
    why: "These operate through foundational nutritional pathways — collagen synthesis, antioxidant function, zinc-dependent enzyme activity. They support, not interfere with, tissue healing goals.",
    action: "No concern. These are reasonable nutritional complements to a recovery protocol.",
  },
  {
    name: "Creatine",
    tier: "low",
    detail: "Ergogenic aid for strength/recovery",
    why: "Different mechanism entirely. No known interaction with TB-500.",
    action: "No concern. Creatine is well-studied; continue as normal.",
  },
  {
    name: "Cannabis / CBD",
    tier: "low",
    detail: "Endocannabinoid system modulation",
    why: "Potential anti-inflammatory overlap is mild and clinically not well-characterized for this combination. No known direct pharmacological conflict.",
    action: "No specific concern. Cannabis may affect sleep and recovery in ways that are independent of TB-500.",
  },
  {
    name: "Caffeine / pre-workout",
    tier: "low",
    detail: "Stimulants used in training context",
    why: "No known interaction with TB-500's mechanisms.",
    action: "No concern. Note that excessive stimulant use can affect sleep, which matters for tissue repair.",
  },
];

const TIER_CONFIG: Record<Tier, { label: string; labelColor: string; border: string; bg: string; dot: string }> = {
  flag:  { label: "Flag",         labelColor: "#9e3800", border: "rgba(158,56,0,0.22)",  bg: "rgba(158,56,0,0.06)",  dot: "#9e3800" },
  watch: { label: "Watch",        labelColor: "#7c5200", border: "rgba(124,82,0,0.18)",  bg: "rgba(124,82,0,0.05)",  dot: "#7c5200" },
  low:   { label: "Low concern",  labelColor: "#155e38", border: "rgba(21,100,58,0.15)", bg: "rgba(21,100,58,0.04)", dot: "#155e38" },
};

const TIER_ORDER: Tier[] = ["flag", "watch", "low"];
const TIER_HEADING: Record<Tier, string> = {
  flag:  "Flags — stop and consult before combining",
  watch: "Worth watching — monitor and use judgment",
  low:   "Low concern — proceed with standard awareness",
};

export default function Tb500InteractionsPanel() {
  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        TB-500&apos;s interaction profile has two elevated concerns that differ from BPC-157: cancer treatment is a hard flag (tissue-growth signaling), and anticoagulants/antiplatelets are flagged at a higher level due to vascular biology mechanisms. Most other interactions are consistent with the broader recovery peptide class.
      </div>

      {TIER_ORDER.map((tier) => {
        const entries = ENTRIES.filter((e) => e.tier === tier);
        const cfg = TIER_CONFIG[tier];
        return (
          <div key={tier} className="reta-interactions__group">
            <div
              className="reta-interactions__group-heading"
              style={{ color: cfg.labelColor, borderLeft: `3px solid ${cfg.dot}` }}
            >
              {TIER_HEADING[tier]}
            </div>
            <div className="reta-interactions__entries">
              {entries.map((e) => (
                <div
                  key={e.name}
                  className="reta-interactions__entry"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                >
                  <div className="reta-interactions__entry-top">
                    <div className="reta-interactions__entry-name">{e.name}</div>
                    <span
                      className="reta-interactions__entry-badge"
                      style={{ color: cfg.labelColor, borderColor: cfg.border }}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <div className="reta-interactions__entry-detail">{e.detail}</div>
                  <div className="reta-interactions__entry-why">{e.why}</div>
                  <div className="reta-interactions__entry-action">{e.action}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="reta-interactions__footer">
        This list reflects known and mechanistically plausible interactions based on current understanding. TB-500&apos;s evidence base is limited — interaction data is even more limited. When in doubt about a specific combination with a prescription medication, ask your prescribing physician before starting.
      </div>

    </div>
  );
}
