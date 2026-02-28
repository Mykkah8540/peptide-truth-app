/**
 * Ghrp6InteractionsPanel — interaction intelligence for GHRP-6.
 * Mirrors GHRP-2 with additional eating disorder / appetite-medication context.
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
    name: "Cancer treatments (chemotherapy, targeted therapy, hormone therapy, immunotherapy)",
    tier: "flag",
    detail: "Active oncology treatment of any kind",
    why: "IGF-1 is a direct mitogen — same concern as all GH-axis compounds. GHRP-6's cortisol and prolactin elevation add endocrine disruption in cancer contexts.",
    action: "Stop GHRP-6 immediately. Do not use during active cancer treatment without explicit oncology clearance.",
  },
  {
    name: "Insulin and diabetes medications (insulin, metformin, GLP-1 agonists, SGLT2 inhibitors, sulfonylureas)",
    tier: "flag",
    detail: "Glucose-lowering therapy — compounded by GH + cortisol glucose-raising mechanism",
    why: "GHRP-6 creates a compounded glucose-raising mechanism: GH counter-regulation to insulin PLUS cortisol's glucocorticoid glucose effect. Adding GHRP-6 to diabetes medications creates more complex glucose management than ipamorelin — both mechanisms are active simultaneously.",
    action: "Do not combine without medical supervision. Physician conversation required before starting.",
  },
  {
    name: "Corticosteroids (prednisone, dexamethasone, hydrocortisone)",
    tier: "flag",
    detail: "Systemic corticosteroid therapy — additive cortisol load",
    why: "GHRP-6 produces documented cortisol elevation. Adding systemic corticosteroids creates additive glucocorticoid burden: compounded glucose elevation, catabolic signaling, and complex endocrine interaction. Elevated to flag (vs watch for ipamorelin) due to the documented GHRP-6 cortisol contribution.",
    action: "Do not combine without physician supervision. Discuss with prescribing physician before adding GHRP-6 to corticosteroid therapy.",
  },
  {
    name: "Thyroid hormone replacement (levothyroxine, liothyronine)",
    tier: "flag",
    detail: "Prescription thyroid hormone therapy",
    why: "GH elevation can affect T4/T3 conversion and TSH dynamics. GHRP-6's cortisol elevation adds an additional variable — cortisol independently affects thyroid hormone metabolism.",
    action: "Discuss with your endocrinologist or prescribing physician before starting. Add a thyroid function check during use if labs are monitored.",
  },

  // ── WATCHES ──
  {
    name: "Appetite-suppressing medications (phentermine, topiramate, bupropion/naltrexone)",
    tier: "watch",
    detail: "Medications for weight management — mechanistically opposed to GHRP-6's appetite stimulation",
    why: "GHRP-6's extreme appetite stimulation directly opposes the mechanism of appetite-suppressing weight loss medications. Combining them places pharmacologically opposing appetite signals simultaneously. The glucose interaction (GH + cortisol vs appetite suppression for weight management) is also pharmacologically complex.",
    action: "The combination is mechanistically counterproductive if weight management is the goal. If on appetite suppressants for a clinical indication: discuss with prescribing physician before adding GHRP-6.",
  },
  {
    name: "GLP-1 receptor agonists (semaglutide, tirzepatide, liraglutide)",
    tier: "watch",
    detail: "GLP-1 receptor agonists suppress appetite — opposed by GHRP-6's extreme hunger stimulation",
    why: "The appetite opposition between GLP-1 agonists and GHRP-6 is more significant than with ipamorelin — GHRP-6's ghrelin activation is at the extreme end of the GHRP spectrum. For weight management: the combination actively fights itself. The glucose interaction (GH + cortisol vs GLP-1 glucose lowering) is complex.",
    action: "If on a GLP-1 agonist for diabetes: treat as a diabetes medication flag. If on a GLP-1 agonist for weight management: the combination is mechanistically counterproductive.",
  },
  {
    name: "Antipsychotics and prolactin-affecting medications (risperidone, haloperidol, metoclopramide)",
    tier: "watch",
    detail: "Medications that raise prolactin — additive to GHRP-6's prolactin elevation",
    why: "GHRP-6 produces documented prolactin elevation alongside GH. Medications that also raise prolactin (antipsychotics, some antiemetics) create additive prolactin burden. Elevated prolactin can affect sexual function, libido, and mood at sustained levels.",
    action: "If on prolactin-raising medications: discuss with prescribing physician before adding GHRP-6. Monitor for prolactin-related symptoms. Consider ipamorelin as an alternative — same GH mechanism without prolactin elevation.",
  },
  {
    name: "CJC-1295 or sermorelin (GHRH receptor agonists)",
    tier: "watch",
    detail: "Complementary GH secretagogue — different receptor from GHRP-6",
    why: "CJC-1295 + GHRP-6 is the same dual-receptor rationale as CJC+ipamorelin. The GHRP-6 extreme appetite and cortisol/prolactin profile apply to the combined stack. CJC+ipamorelin is a more favorable selectivity profile for most users pursuing the same dual-receptor GH release strategy.",
    action: "All GH-axis safety gates apply to the combined protocol. Consider CJC+ipamorelin as an alternative with a cleaner side effect profile for most goals.",
  },
  {
    name: "GHRP-2 or other GHRPs (ipamorelin, hexarelin)",
    tier: "watch",
    detail: "Additional ghrelin receptor agonists — compounded receptor load",
    why: "Stacking GHRP-6 with other GHRPs adds to the ghrelin receptor load and the cortisol/prolactin burden without the complementary mechanism benefit of dual-receptor stacks. The extreme appetite from GHRP-6 is amplified with additional ghrelin activation.",
    action: "Compounded endocrine load. All cortisol, glucose, and appetite gates apply to the combined protocol.",
  },
  {
    name: "Cardiovascular medications",
    tier: "watch",
    detail: "Medications for cardiac conditions",
    why: "Cardiovascular symptoms (chest pain, fainting) are listed in GHRP-6's safety profile. GH-driven fluid dynamics and cortisol cardiovascular effects compound in people with underlying cardiac conditions.",
    action: "If on cardiovascular medications for cardiac conditions: discuss with prescribing physician before adding GHRP-6.",
  },
  {
    name: "Alcohol (heavy or chronic use)",
    tier: "watch",
    detail: "Regular heavy drinking — GH disruption, cortisol compounding",
    why: "Alcohol disrupts GH secretion and raises cortisol acutely. GHRP-6's already elevated cortisol effect compounds with alcohol's cortisol stimulation — more total cortisol disruption than with ipamorelin.",
    action: "Not a hard stop. Heavy alcohol use undermines the GH mechanism and compounds cortisol effects.",
  },

  // ── LOWS ──
  {
    name: "BPC-157",
    tier: "low",
    detail: "Recovery peptide — tissue repair mechanism",
    why: "Different mechanism. No known pharmacological conflict.",
    action: "No specific concern. Verify each compound independently.",
  },
  {
    name: "TB-500",
    tier: "low",
    detail: "Recovery peptide — Tβ4 fragment",
    why: "Different mechanism. No known conflict. Cancer history gate applies to TB-500 independently.",
    action: "No specific concern beyond noting the cancer gate applies to both.",
  },
  {
    name: "NAD+ / NMN / NR",
    tier: "low",
    detail: "Cellular energy / longevity pathway",
    why: "Different mechanism. No known interaction with GH-axis compounds.",
    action: "No concern. NAD+ PARP inhibitor conflict applies independently.",
  },
  {
    name: "Creatine",
    tier: "low",
    detail: "Ergogenic — ATP regeneration",
    why: "No interaction with GH-axis mechanism.",
    action: "No concern.",
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

export default function Ghrp6InteractionsPanel() {
  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        GHRP-6&apos;s interaction profile shares the GH-axis flags with two GHRP-6-specific additions: appetite-suppressing medications are in direct pharmacological opposition to GHRP-6&apos;s extreme hunger stimulation, and the GLP-1 agonist appetite opposition is more significant than with ipamorelin due to GHRP-6&apos;s extreme ghrelin activation intensity. Corticosteroids are elevated to a flag (same as GHRP-2) due to additive cortisol burden.
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
        GHRP-6&apos;s interaction profile is the standard GH-axis stack plus cortisol/prolactin and appetite complications. The most GHRP-6-specific consideration: appetite-suppressing medications are in direct mechanistic opposition. If the treatment goal involves caloric restriction or weight management and you&apos;re on appetite medications, combining with GHRP-6 creates active pharmacological conflict. Ipamorelin avoids this — same GH mechanism, manageable appetite, no cortisol elevation.
      </div>

    </div>
  );
}
