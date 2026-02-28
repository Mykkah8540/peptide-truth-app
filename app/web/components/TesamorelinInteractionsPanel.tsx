/**
 * TesamorelinInteractionsPanel — interaction intelligence for Tesamorelin.
 * Same GH-axis flag structure as CJC-1295 and sermorelin.
 * Tesamorelin-specific additions:
 * - HIV antiretrovirals: on-label population context (interaction data from HIV trials)
 * - Arthralgia note: NSAIDs and analgesics are commonly co-used for joint pain management
 * - Thyroid: same as sermorelin (flag) — GH + cortisol effect, but tesamorelin has no cortisol
 *   so thyroid flag is GH-only (same as CJC-1295, watch not flag; keep consistent)
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
    detail: "Active oncology treatment of any kind — contraindicated per prescribing information",
    why: "Active malignancy is a contraindication in the tesamorelin prescribing information. IGF-1 is a direct mitogen — the same flag as CJC-1295, ipamorelin, and all GH-axis compounds, now with formal regulatory weight behind it.",
    action: "Stop tesamorelin immediately. Do not use during active cancer treatment without explicit oncology clearance — this is a prescribing information contraindication.",
  },
  {
    name: "Insulin and diabetes medications (insulin, metformin, GLP-1 agonists, SGLT2 inhibitors, sulfonylureas)",
    tier: "flag",
    detail: "Glucose-lowering therapy — GH counter-regulation to insulin documented in prescribing information",
    why: "Tesamorelin's prescribing information explicitly notes glucose dysregulation as a risk. The GH counter-regulatory mechanism applies the same as CJC-1295: GH opposes insulin action and can worsen insulin resistance. Uncontrolled diabetes was an exclusion in Phase III trials. Unlike GHRP-2 or hexarelin, tesamorelin does not add a cortisol mechanism — but the GH component alone is significant for active diabetes management.",
    action: "Do not combine without medical supervision. Uncontrolled diabetes: do not use. Controlled diabetes: physician conversation required before starting.",
  },
  {
    name: "Pregnancy (any trimester)",
    tier: "flag",
    detail: "Pregnancy is a contraindication in the tesamorelin prescribing information",
    why: "Tesamorelin is formally contraindicated in pregnancy per the prescribing information. No safety data exists for GH-axis compounds during pregnancy — and this is stated explicitly, not just inferred.",
    action: "Stop immediately. Pregnancy is a prescribing information contraindication.",
  },

  // ── WATCHES ──
  {
    name: "Thyroid hormone replacement (levothyroxine, liothyronine)",
    tier: "watch",
    detail: "Prescription thyroid hormone therapy — GH can affect T4/T3 conversion",
    why: "GH elevation can affect T4/T3 conversion and TSH dynamics — the same interaction concern as CJC-1295 and sermorelin. Unlike GHRP-2 or hexarelin, tesamorelin does not produce cortisol elevation, so the additive cortisol/thyroid interaction is absent. This is a watch (same as CJC-1295) rather than a flag — the GH-only mechanism is less disruptive to thyroid dynamics than the GH + cortisol combination.",
    action: "Discuss with your endocrinologist or prescribing physician before starting. Add a thyroid function check during use if labs are monitored.",
  },
  {
    name: "HIV antiretrovirals (ARVs) — lopinavir/ritonavir, efavirenz, others",
    tier: "watch",
    detail: "The on-label tesamorelin population is on antiretroviral therapy — interaction data exists from HIV trials",
    why: "Tesamorelin's approved indication is HIV-associated lipodystrophy in patients on ARV therapy. Some ARVs (lopinavir/ritonavir) can affect GH and metabolism; the interaction was managed in the Phase III trials. For HIV-positive users already on ARV therapy, this is the on-label use context with available safety data. For off-label users not on ARVs, this interaction is not relevant.",
    action: "If HIV-positive and on ARV therapy: tesamorelin's prescribing information was developed in this context — follow standard prescribing guidance. Discuss with your infectious disease physician or prescriber.",
  },
  {
    name: "NSAIDs and analgesics (ibuprofen, naproxen, acetaminophen)",
    tier: "watch",
    detail: "Commonly used to manage tesamorelin's arthralgia — interaction note for context",
    why: "Arthralgia (joint pain) is the most distinctive common adverse event from tesamorelin trials. Many users reach for NSAIDs or analgesics to manage joint pain during tesamorelin use. NSAIDs themselves have no pharmacological interaction with GH-axis compounds. The relevant consideration: NSAIDs mask pain signals that indicate the arthralgia is worsening, and chronic NSAID use has its own GI and renal risk profile.",
    action: "NSAIDs for tesamorelin-related joint pain: reasonable short-term management. If arthralgia requires regular NSAID use: consider dose reduction of tesamorelin rather than sustained NSAID use. Persistent or worsening arthralgia: discuss with physician.",
  },
  {
    name: "CJC-1295 or sermorelin (other GHRH receptor agonists)",
    tier: "watch",
    detail: "Same receptor class — stacking compounds the GHRH receptor load without complementary mechanism benefit",
    why: "Stacking tesamorelin with other GHRH analogs (CJC-1295, sermorelin) loads the same receptor without the complementary mechanism benefit of a ghrelin receptor + GHRH receptor dual-receptor stack. The rationale for same-receptor stacking is weak. GH-axis safety gates apply to the combined protocol.",
    action: "No complementary mechanism rationale. All GH-axis safety gates apply. Choose one GHRH analog for a given protocol.",
  },
  {
    name: "Ipamorelin or other GHRPs (ghrelin receptor agonists)",
    tier: "watch",
    detail: "Complementary GH secretagogue — different receptor from tesamorelin",
    why: "Tesamorelin (GHRH receptor) + ipamorelin (ghrelin receptor) is the same dual-receptor rationale as CJC-1295 + ipamorelin: two complementary receptors amplifying GH release. The tesamorelin-specific considerations (arthralgia, formal prescribing information) apply to the combined stack. The GH-axis safety gates apply to the combined protocol.",
    action: "If using tesamorelin + ipamorelin: apply all GH-axis safety gates to the combined protocol. Arthralgia risk from tesamorelin is not attenuated by adding ipamorelin.",
  },
  {
    name: "Alcohol (heavy or chronic use)",
    tier: "watch",
    detail: "Regular heavy drinking — GH disruption",
    why: "Alcohol disrupts GH secretion and worsens sleep. Unlike GHRP-2 or hexarelin, tesamorelin does not add a cortisol mechanism — so the cortisol compounding concern from those compounds is absent. The GH mechanism disruption from alcohol applies.",
    action: "Not a hard stop. Heavy alcohol use undermines the GH mechanism.",
  },

  // ── LOWS ──
  {
    name: "BPC-157",
    tier: "low",
    detail: "Recovery peptide — tissue repair mechanism",
    why: "Different mechanism. No known pharmacological conflict. Note: BPC-157's anti-inflammatory mechanism may theoretically complement tesamorelin's arthralgia, but this is speculative — no interaction data exists.",
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

export default function TesamorelinInteractionsPanel() {
  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        Tesamorelin&apos;s interaction profile is the standard GH-axis flag set — cancer treatments, diabetes medications, and pregnancy are formal contraindications in the prescribing information. Two tesamorelin-specific watch items: HIV antiretrovirals are the on-label population context (interaction data exists from Phase III trials), and NSAIDs are commonly used to manage tesamorelin&apos;s characteristic arthralgia (not a pharmacological conflict, but worth context). Unlike GHRP-2 or hexarelin, tesamorelin does not produce cortisol elevation — the corticosteroid flag and cortisol-compounding concerns do not apply.
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
        Tesamorelin&apos;s interaction profile benefits from formal prescribing information: cancer treatments and pregnancy are stated contraindications, and glucose dysregulation is a documented risk with diabetes medications. The interaction profile is cleaner than GHRP-2 or hexarelin (no cortisol, no CD36 ambiguity) — closer to CJC-1295 with the addition of the arthralgia note and the HIV antiretroviral context for on-label users.
      </div>

    </div>
  );
}
