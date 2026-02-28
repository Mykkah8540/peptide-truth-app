/**
 * HexarelinInteractionsPanel — interaction intelligence for Hexarelin.
 * Shares GH-axis interaction profile with GHRP-2. Key hexarelin-specific additions:
 * - Cardiovascular medications: elevated concern due to CD36 receptor binding (unique to hexarelin)
 * - GH-axis compounds for stacking: tachyphylaxis note — stacking doesn't solve the desensitization
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
    why: "IGF-1 is a direct mitogen — same concern as all GH-axis compounds. Hexarelin's cortisol and prolactin elevation add additional endocrine disruption in cancer contexts.",
    action: "Stop hexarelin immediately. Do not use during active cancer treatment without explicit oncology clearance.",
  },
  {
    name: "Insulin and diabetes medications (insulin, metformin, GLP-1 agonists, SGLT2 inhibitors, sulfonylureas)",
    tier: "flag",
    detail: "Glucose-lowering therapy — compounded by GH + cortisol glucose-raising mechanism",
    why: "Hexarelin creates the same compounded glucose-raising mechanism as GHRP-2: GH counter-regulation to insulin PLUS cortisol's glucocorticoid glucose effect. Adding hexarelin to diabetes medications creates complex glucose management. Note: the GH effect may attenuate with tachyphylaxis, but cortisol elevation can persist — the glucose concern doesn't necessarily attenuate on the same timeline.",
    action: "Do not combine without medical supervision. Physician conversation required before starting.",
  },
  {
    name: "Corticosteroids (prednisone, dexamethasone, hydrocortisone)",
    tier: "flag",
    detail: "Systemic corticosteroid therapy — additive cortisol load",
    why: "Hexarelin produces documented cortisol elevation. Adding systemic corticosteroids creates additive glucocorticoid burden: compounded glucose elevation, catabolic signaling, and complex endocrine interaction. Elevated to flag (same as GHRP-2) due to the documented cortisol contribution.",
    action: "Do not combine without physician supervision. Discuss with prescribing physician before adding hexarelin to corticosteroid therapy.",
  },
  {
    name: "Thyroid hormone replacement (levothyroxine, liothyronine)",
    tier: "flag",
    detail: "Prescription thyroid hormone therapy",
    why: "GH elevation can affect T4/T3 conversion and TSH dynamics. Hexarelin's cortisol elevation adds an additional variable — cortisol independently affects thyroid hormone metabolism.",
    action: "Discuss with your endocrinologist or prescribing physician before starting. Add a thyroid function check during use if labs are monitored.",
  },

  // ── WATCHES ──
  {
    name: "Cardiovascular medications (beta-blockers, ACE inhibitors, antiarrhythmics, statins)",
    tier: "watch",
    detail: "Medications for cardiac conditions — hexarelin's CD36 activity adds a unique interaction dimension",
    why: "Hexarelin's CD36 scavenger receptor binding is unique among GHRPs and creates a cardiac interaction dimension absent from ipamorelin, GHRP-2, or GHRP-6. CD36 activity has been studied in cardiac biology — its interaction with cardiovascular medications in humans is not characterized. GH-driven fluid dynamics and cortisol cardiovascular effects compound in people with underlying cardiac conditions.",
    action: "If on cardiovascular medications for cardiac conditions: this interaction is insufficiently characterized to combine without physician supervision. Discuss explicitly with prescribing physician — be specific about hexarelin's CD36 receptor activity.",
  },
  {
    name: "Antipsychotics and prolactin-affecting medications (risperidone, haloperidol, metoclopramide)",
    tier: "watch",
    detail: "Medications that raise prolactin — additive to hexarelin's prolactin elevation",
    why: "Hexarelin produces documented prolactin elevation alongside GH. Medications that also raise prolactin (antipsychotics, some antiemetics) create additive prolactin burden. Elevated prolactin can affect sexual function, libido, and mood at sustained levels.",
    action: "If on prolactin-raising medications: discuss with prescribing physician before adding hexarelin. Monitor for prolactin-related symptoms. Consider ipamorelin as an alternative — same GH mechanism without prolactin elevation.",
  },
  {
    name: "CJC-1295 or sermorelin (GHRH receptor agonists)",
    tier: "watch",
    detail: "Complementary GH secretagogue — different receptor from hexarelin",
    why: "CJC-1295 + hexarelin is the same dual-receptor rationale as CJC + ipamorelin: GHRH receptor + ghrelin receptor = additive GH release. However, hexarelin's tachyphylaxis means the ghrelin receptor component attenuates over time in the stack — the dual-receptor benefit diminishes. CJC + ipamorelin provides the same dual-receptor mechanism with a sustained ghrelin receptor response.",
    action: "If running CJC + hexarelin: apply all GH-axis safety gates. Plan cycle breaks to address tachyphylaxis. Consider CJC + ipamorelin for sustained protocols — same receptor combination, without the desensitization constraint.",
  },
  {
    name: "Other GHRPs (ipamorelin, GHRP-2, GHRP-6)",
    tier: "watch",
    detail: "Additional ghrelin receptor agonists — same receptor class as hexarelin",
    why: "Stacking hexarelin with other GHRPs compounds the ghrelin receptor load. Stacking doesn't solve hexarelin's tachyphylaxis — receptor downregulation affects hexarelin regardless of what else is binding the receptor. The cortisol, prolactin, and CD36 burden applies to the combined stack.",
    action: "Compounded endocrine load. Stacking does not prevent hexarelin tachyphylaxis. All GH-axis and cortisol gates apply.",
  },
  {
    name: "Alcohol (heavy or chronic use)",
    tier: "watch",
    detail: "Regular heavy drinking — GH disruption, cortisol compounding",
    why: "Alcohol disrupts GH secretion and raises cortisol acutely. Hexarelin's cortisol elevation and alcohol's cortisol stimulation compound — more total cortisol disruption than with ipamorelin.",
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

export default function HexarelinInteractionsPanel() {
  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        Hexarelin&apos;s interaction profile extends the standard GH-axis flags with two hexarelin-specific considerations: cardiovascular medications are a more elevated concern than with other GHRPs due to hexarelin&apos;s CD36 scavenger receptor binding (unique among GHRPs — interaction with cardiac medications is uncharacterized), and the tachyphylaxis note applies to all stacking rationales — the ghrelin receptor component attenuates over time regardless of the stack.
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
        Hexarelin&apos;s interaction profile is the GHRP-2 standard plus two hexarelin-specific dimensions: the CD36 cardiac receptor creates a unique interaction question for cardiovascular medications (not present with any other GHRP), and tachyphylaxis means the rationale for stacking hexarelin with other compounds erodes over time. If ipamorelin fits your goals — same GH mechanism, sustainable response, no cortisol, no CD36 ambiguity — the interaction profile is cleaner.
      </div>

    </div>
  );
}
