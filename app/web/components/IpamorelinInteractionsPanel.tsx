/**
 * IpamorelinInteractionsPanel — interaction intelligence for Ipamorelin.
 * Shares GH-axis interaction profile with CJC-1295. Key additions:
 * - Sleep medications: ghrelin + fluid dynamics can worsen OSA
 * - GLP-1 agonists: mechanistic opposition on appetite (ghrelin ↑ appetite; GLP-1 ↓ appetite)
 * - Ipamorelin is explicitly listed as a low-concern entry on its own
 *   (i.e., CJC+ipa stack: low concern, just apply all gates to the combined load)
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
    why: "IGF-1 — elevated downstream of GH from ipamorelin — is a direct mitogen. GH/IGF-1 axis interaction with cancer treatment is mechanistically real and clinically unpredictable. Same flag as CJC-1295.",
    action: "Stop ipamorelin immediately. Do not use during active cancer treatment without explicit oncology clearance.",
  },
  {
    name: "Insulin and diabetes medications (insulin, metformin, GLP-1 agonists, SGLT2 inhibitors, sulfonylureas)",
    tier: "flag",
    detail: "Glucose-lowering therapy of any class",
    why: "GH counter-regulation to insulin applies identically to ipamorelin as to CJC-1295. Adding GH-axis stimulation to an established diabetes regimen can shift glucose control in either direction unpredictably.",
    action: "Do not combine without medical supervision. A prescribing physician conversation is required before starting.",
  },
  {
    name: "Thyroid hormone replacement (levothyroxine, liothyronine)",
    tier: "flag",
    detail: "Prescription thyroid hormone therapy",
    why: "GH elevation — from any secretagogue — can affect T4/T3 conversion and TSH dynamics. Same interaction as CJC-1295.",
    action: "Discuss with your endocrinologist or prescribing physician before starting. Add a thyroid function check during use if labs are monitored periodically.",
  },

  // ── WATCHES ──
  {
    name: "Sleep medications (benzodiazepines, Z-drugs: zolpidem, eszopiclone; sedating antihistamines)",
    tier: "watch",
    detail: "Medications that affect sleep architecture or upper airway tone",
    why: "GH elevation and fluid retention from ipamorelin can worsen sleep-disordered breathing. Sleep medications that additionally reduce upper airway tone (benzodiazepines, Z-drugs) may compound this risk — particularly in anyone with underlying or undiagnosed OSA.",
    action: "If on sleep medications and you have any risk factors for sleep apnea: assess for OSA before starting ipamorelin. Monitor for worsening daytime fatigue, new snoring, or morning headaches.",
  },
  {
    name: "GLP-1 receptor agonists (semaglutide, tirzepatide, liraglutide) for weight or diabetes",
    tier: "watch",
    detail: "GLP-1 receptor agonists suppress appetite via GLP-1 pathway; ipamorelin increases appetite via ghrelin pathway",
    why: "These compounds act in mechanistically opposing directions on appetite — GLP-1 agonists reduce hunger; ipamorelin increases it via ghrelin receptor agonism. The net effect on appetite signaling in combination is not characterized. The glucose control interaction is the same flag as any diabetes medication.",
    action: "If on a GLP-1 agonist for diabetes: treat as a diabetes medication flag — discuss with your prescriber. If on a GLP-1 agonist for weight management: note the appetite-mechanism opposition; the combination may work against your primary goal.",
  },
  {
    name: "CJC-1295 (the canonical stack)",
    tier: "watch",
    detail: "GH secretagogue (GHRH receptor) — commonly stacked with ipamorelin",
    why: "CJC+ipa is the most common GH-axis community protocol. Additive GH effect is the goal. Additive GH-axis considerations (glucose, cancer, edema, cycling) apply to the combined load — not just each compound alone. The stack amplifies the need for safety gates, not just the GH response.",
    action: "Standard complementary stack with good mechanistic rationale. Apply all metabolic, cancer, sleep apnea, and cycling gates to the combined protocol — not separately to each compound.",
  },
  {
    name: "Other GH-axis compounds (GHRP-2, GHRP-6, MK-677, sermorelin)",
    tier: "watch",
    detail: "Additional GH secretagogues — additive GH-axis load",
    why: "Stacking multiple GH secretagogues compounds the endocrine load, metabolic effects, and cancer signal concern. GHRP-2/GHRP-6 add cortisol/prolactin elevation that ipamorelin avoids; MK-677 adds a long half-life oral GH secretagogue. The load is additive.",
    action: "Proceed with awareness of compounded risk. All safety gates apply to the stack collectively.",
  },
  {
    name: "Corticosteroids (prednisone, dexamethasone, hydrocortisone)",
    tier: "watch",
    detail: "Systemic corticosteroid therapy",
    why: "GH and cortisol/glucocorticoids interact in complex ways. Both independently affect glucose control — additive hyperglycemia risk. Corticosteroids may also blunt IGF-1 response to GH elevation.",
    action: "Monitor glucose closely if on systemic corticosteroids. Discuss with prescribing physician before adding ipamorelin.",
  },
  {
    name: "Alcohol (heavy or chronic use)",
    tier: "watch",
    detail: "Regular heavy drinking during a GH-axis protocol",
    why: "Alcohol disrupts GH secretion — particularly the nocturnal GH pulse. If the bedtime injection convention is used, drinking before sleep directly blunts the GH response ipamorelin is trying to amplify. Additionally, alcohol worsens sleep quality and can worsen sleep apnea.",
    action: "Not a hard stop. Heavy alcohol use significantly undermines both the GH mechanism and the sleep apnea safety profile.",
  },

  // ── LOWS ──
  {
    name: "BPC-157",
    tier: "low",
    detail: "Recovery peptide — tissue repair mechanism",
    why: "Completely different mechanism. No known pharmacological conflict. Commonly co-used in recovery contexts.",
    action: "No specific concern. Verify each compound independently.",
  },
  {
    name: "TB-500",
    tier: "low",
    detail: "Recovery peptide — Tβ4 fragment",
    why: "Different mechanism. No known conflict. Cancer history gate applies to TB-500 independently (tissue growth signaling concern).",
    action: "No specific concern beyond noting the cancer gate applies to both compounds.",
  },
  {
    name: "NAD+ / NMN / NR",
    tier: "low",
    detail: "Cellular energy / longevity pathway",
    why: "Different mechanism entirely. No known interaction with GH-axis compounds.",
    action: "No concern. NAD+ cancer history gate (PARP inhibitor conflict) applies independently.",
  },
  {
    name: "Creatine",
    tier: "low",
    detail: "Ergogenic — ATP regeneration",
    why: "No interaction with GH-axis mechanism.",
    action: "No concern.",
  },
  {
    name: "Collagen peptides / vitamin C / zinc",
    tier: "low",
    detail: "Connective tissue nutritional support",
    why: "Foundational nutritional pathways. No interaction with GH axis.",
    action: "No concern.",
  },
  {
    name: "Cannabis / CBD",
    tier: "low",
    detail: "Endocannabinoid system",
    why: "No known direct pharmacological interaction with GH/IGF-1 axis. Cannabis before sleep may affect sleep quality — relevant for OSA context.",
    action: "No specific pharmacological concern. Cannabis use before sleep is worth noting in the OSA context.",
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

export default function IpamorelinInteractionsPanel() {
  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        Ipamorelin&apos;s interaction profile largely mirrors CJC-1295 — GH/IGF-1 axis physiology drives the major flags. Two ipamorelin-specific additions: sleep medications warrant attention due to OSA risk, and GLP-1 agonists create a mechanistic appetite-opposition worth noting if used for weight management.
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
        Ipamorelin&apos;s interaction profile is driven by GH/IGF-1 physiology — the same engine as CJC-1295. The sleep medication and OSA consideration is the most ipamorelin-specific watchpoint. When combining with CJC-1295, apply all safety gates to the stack as a unit — not separately to each compound.
      </div>

    </div>
  );
}
