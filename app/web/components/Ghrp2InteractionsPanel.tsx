/**
 * Ghrp2InteractionsPanel — interaction intelligence for GHRP-2.
 * Shares GH-axis interaction profile with ipamorelin. Key additions:
 * - Corticosteroids: additive cortisol effect is clinically meaningful (not just a watch — amplified)
 * - Antipsychotics / prolactin-affecting medications: GHRP-2 prolactin elevation adds complexity
 * - Cardiovascular medications: caution flag per safety profile
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
    why: "IGF-1 is a direct mitogen — same concern as all GH-axis compounds. GHRP-2's cortisol and prolactin elevation add additional endocrine disruption in cancer contexts. Cancer patients were excluded from GHRP research contexts for these reasons.",
    action: "Stop GHRP-2 immediately. Do not use during active cancer treatment without explicit oncology clearance.",
  },
  {
    name: "Insulin and diabetes medications (insulin, metformin, GLP-1 agonists, SGLT2 inhibitors, sulfonylureas)",
    tier: "flag",
    detail: "Glucose-lowering therapy of any class",
    why: "GHRP-2 creates a compounded glucose-raising mechanism: GH counter-regulation to insulin PLUS cortisol's glucocorticoid glucose effect. Adding GHRP-2 to an established diabetes regimen creates more complex glucose management than adding ipamorelin — both mechanisms are active simultaneously.",
    action: "Do not combine without medical supervision. More urgent than with ipamorelin due to the compounded glucose-raising mechanism. Physician conversation required before starting.",
  },
  {
    name: "Corticosteroids (prednisone, dexamethasone, hydrocortisone)",
    tier: "flag",
    detail: "Systemic corticosteroid therapy — additive cortisol load",
    why: "GHRP-2 produces documented cortisol elevation. Adding it to systemic corticosteroid therapy creates additive glucocorticoid burden: more glucose elevation, more catabolic signaling, and more complex endocrine interaction than either compound alone. This is elevated to a flag for GHRP-2 (it's a watch for ipamorelin, which doesn't produce cortisol).",
    action: "Do not combine without physician supervision. The additive cortisol burden and glucose effects are real and compounded. Discuss with prescribing physician before adding GHRP-2 to corticosteroid therapy.",
  },
  {
    name: "Thyroid hormone replacement (levothyroxine, liothyronine)",
    tier: "flag",
    detail: "Prescription thyroid hormone therapy",
    why: "GH elevation can affect T4/T3 conversion and TSH dynamics. Same interaction as CJC-1295 and sermorelin. GHRP-2's cortisol elevation adds an additional variable — cortisol affects thyroid hormone metabolism independently.",
    action: "Discuss with your endocrinologist or prescribing physician before starting. Add a thyroid function check during use if labs are monitored.",
  },

  // ── WATCHES ──
  {
    name: "Antipsychotics and prolactin-affecting medications (risperidone, haloperidol, metoclopramide)",
    tier: "watch",
    detail: "Medications that raise prolactin — additive to GHRP-2's prolactin elevation",
    why: "GHRP-2 produces documented prolactin elevation. Medications that also raise prolactin (many antipsychotics, some antiemetics) create additive prolactin burden. Elevated prolactin can affect sexual function, libido, mood, and — at very high levels — galactorrhea. This interaction is specific to GHRP-2 (and GHRP-6) and does not apply to ipamorelin.",
    action: "If on prolactin-raising medications: discuss with prescribing physician before adding GHRP-2. Monitor for prolactin-related symptoms (libido changes, sexual dysfunction, mood changes). Consider ipamorelin as an alternative — same GH mechanism without prolactin elevation.",
  },
  {
    name: "CJC-1295 or sermorelin (GHRH receptor agonists)",
    tier: "watch",
    detail: "Complementary GH secretagogue — different receptor from GHRP-2",
    why: "CJC-1295 or sermorelin + GHRP-2 is the same dual-receptor rationale as CJC+ipamorelin: GHRH receptor + ghrelin receptor = additive GH release. The interaction is mechanistically complementary. The cortisol and prolactin concerns from GHRP-2 apply to the combined stack. CJC+ipamorelin is a better-characterized and more favorable selectivity profile for most users.",
    action: "If using the CJC+GHRP-2 stack: apply all GH-axis safety gates to the combined protocol. Consider whether CJC+ipamorelin better fits your goals — same receptor combination, ipamorelin's cleaner selectivity profile.",
  },
  {
    name: "Ipamorelin and other GHRPs (GHRP-6, hexarelin)",
    tier: "watch",
    detail: "Additional ghrelin receptor agonists — same receptor class as GHRP-2",
    why: "Stacking GHRP-2 with ipamorelin or other GHRPs compounds the ghrelin receptor load without the complementary dual-receptor benefit of CJC+GHRP stacks. GHRP-2's cortisol/prolactin elevation applies to the combined stack. The rationale for same-receptor stacking is weaker than complementary receptor stacking.",
    action: "Compounded endocrine load without complementary mechanism. All GH-axis and cortisol gates apply to the combined protocol.",
  },
  {
    name: "Cardiovascular medications (beta-blockers, ACE inhibitors, antiarrhythmics)",
    tier: "watch",
    detail: "Medications for cardiac conditions — cardiovascular caution in GHRP-2 safety profile",
    why: "Cardiovascular symptoms (chest pain, fainting, severe shortness of breath) are listed in GHRP-2's safety documentation — more explicitly than for ipamorelin. Combining GHRP-2 with cardiovascular medications in people with underlying cardiac conditions adds complexity. Cortisol's cardiovascular effects (blood pressure, glucose, fluid) compound the GH-axis fluid dynamics.",
    action: "If on cardiovascular medications for cardiac conditions: discuss with prescribing physician before adding GHRP-2. Monitor for cardiovascular symptoms, especially during the first few weeks.",
  },
  {
    name: "GLP-1 receptor agonists for weight or diabetes",
    tier: "watch",
    detail: "GLP-1 receptor agonists suppress appetite; GHRP-2 modestly increases appetite via ghrelin",
    why: "Mechanistic appetite opposition (ghrelin ↑ appetite; GLP-1 ↓ appetite) applies as with ipamorelin. The glucose interaction is the primary concern — adding GHRP-2's compounded glucose-raising mechanism (GH + cortisol) to GLP-1 therapy creates complex glucose dynamics.",
    action: "If on a GLP-1 agonist for diabetes: treat as a diabetes medication flag — physician supervision required. If on a GLP-1 agonist for weight management: note the compounded glucose complexity from GHRP-2's cortisol effect.",
  },
  {
    name: "Alcohol (heavy or chronic use)",
    tier: "watch",
    detail: "Regular heavy drinking during a GH-axis protocol",
    why: "Alcohol disrupts GH secretion and worsens sleep. GHRP-2's cortisol elevation and alcohol's cortisol stimulation (alcohol acutely raises cortisol) compound each other — more cortisol-related disruption than with ipamorelin.",
    action: "Not a hard stop. Heavy alcohol use significantly undermines the GH mechanism and compounds the cortisol effects.",
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
    action: "No specific concern beyond noting the cancer gate applies to both compounds.",
  },
  {
    name: "NAD+ / NMN / NR",
    tier: "low",
    detail: "Cellular energy / longevity pathway",
    why: "Different mechanism. No known interaction with GH-axis compounds.",
    action: "No concern. NAD+ cancer history gate (PARP inhibitor conflict) applies independently.",
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

export default function Ghrp2InteractionsPanel() {
  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        GHRP-2&apos;s interaction profile extends the standard GH-axis flags with two GHRP-2-specific additions: corticosteroids are elevated to a flag (additive cortisol burden is clinically meaningful, not just a watch), and prolactin-raising medications (antipsychotics, some antiemetics) warrant attention due to additive prolactin elevation. Both elevations are documented pharmacology, not theoretical.
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
        GHRP-2&apos;s interaction profile is the GH-axis standard plus cortisol and prolactin complications. The corticosteroid flag (elevated from ipamorelin&apos;s watch) reflects the additive cortisol burden — running GHRP-2 with systemic corticosteroids compounds two cortisol-raising mechanisms. Prolactin-affecting medications are a GHRP-2-specific consideration that doesn&apos;t apply to ipamorelin. If ipamorelin fits your goals, the interaction profile is cleaner.
      </div>

    </div>
  );
}
