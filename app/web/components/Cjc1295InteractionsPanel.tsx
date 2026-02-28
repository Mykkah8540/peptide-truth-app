/**
 * Cjc1295InteractionsPanel — interaction intelligence for CJC-1295.
 * Key frame: GH-axis compound with real systemic endocrine effects.
 * Flags: cancer treatment (IGF-1 is mitogenic), insulin/diabetes meds (GH counter-regulation),
 * thyroid therapy (GH-thyroid axis interaction). Watches: other GH-axis compounds, corticosteroids,
 * SSRIs, anticoagulants. Lows: BPC-157, TB-500, NAD+, creatine.
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
    why: "IGF-1 — the primary downstream mediator of CJC-1295 — is a direct mitogen. It promotes cell proliferation. The GH/IGF-1 axis is directly implicated in tumor growth and progression. Combining sustained IGF-1 elevation with active cancer treatment creates mechanistic conflict regardless of the treatment type.",
    action: "Stop CJC-1295 immediately. Do not use during active cancer treatment without explicit oncology clearance. This is not a soft recommendation.",
  },
  {
    name: "Insulin and diabetes medications (insulin, metformin, GLP-1 agonists, SGLT2 inhibitors, sulfonylureas)",
    tier: "flag",
    detail: "Glucose-lowering therapy of any class",
    why: "GH is counter-regulatory to insulin — it raises blood glucose by promoting hepatic glucose production and reducing peripheral insulin sensitivity. Adding CJC-1295 to an established diabetes medication regimen can unpredictably shift glucose control in either direction: glucose may worsen (if insulin resistance increases) or hypoglycemia risk may increase (if medication doses were calibrated to a lower GH state).",
    action: "Do not combine without medical supervision. If you're on any glucose-lowering medication, this requires a prescribing physician conversation before starting.",
  },
  {
    name: "Thyroid hormone replacement (levothyroxine, liothyronine)",
    tier: "flag",
    detail: "Prescription thyroid hormone therapy",
    why: "GH and thyroid hormone metabolism interact bidirectionally. GH can increase peripheral conversion of T4 to T3 and may affect thyroid-stimulating hormone (TSH) signaling. In people on thyroid replacement therapy, elevated GH can alter the effective dose of their thyroid medication — potentially unmasking hypothyroidism or shifting the balance of thyroid hormone conversion.",
    action: "Discuss with your endocrinologist or prescribing physician before starting. If thyroid labs are checked periodically, add a check during CJC-1295 use.",
  },

  // ── WATCHES ──
  {
    name: "Other GH-axis compounds (ipamorelin, GHRP-2, GHRP-6, MK-677)",
    tier: "watch",
    detail: "GH secretagogues — commonly stacked with CJC-1295",
    why: "Stacking CJC-1295 with another GH-axis compound produces additive GH/IGF-1 elevation. This is the explicit goal of the CJC+ipamorelin stack, but additive endocrine load also means additive metabolic effects, additive cancer signal concern, and additive edema risk. The stack logic is sound; the risk management needs to match the amplified effect.",
    action: "Ipamorelin: standard complementary stack — but apply all the same metabolic and cancer history gates to the stack, not just CJC alone. Older GHRPs (GHRP-2, GHRP-6): more cortisol/prolactin elevation than ipamorelin — additional consideration. MK-677: long half-life, oral, sustained GH elevation — additive concerns compound.",
  },
  {
    name: "Corticosteroids (prednisone, dexamethasone, hydrocortisone)",
    tier: "watch",
    detail: "Systemic corticosteroid therapy",
    why: "GH and cortisol/glucocorticoids have complex interactions. Corticosteroids promote GH resistance peripherally — meaning GH elevation may not translate to expected IGF-1 increases. Additionally, both corticosteroids and GH independently affect glucose control, creating additive hyperglycemia risk.",
    action: "If on ongoing systemic corticosteroid therapy, monitor glucose more closely and consult your prescribing physician before adding CJC-1295.",
  },
  {
    name: "SSRIs and serotonergic medications",
    tier: "watch",
    detail: "Antidepressants and other serotonergic agents",
    why: "Serotonin is involved in GH regulation — serotonin receptor activation can stimulate GH release through the hypothalamic axis. SSRIs may modulate the baseline GH response in a way that interacts with CJC-1295. The interaction is not well-characterized for this specific combination but is mechanistically plausible.",
    action: "Not a hard stop. Monitor for unexpected changes in side effect intensity (flushing, edema) that might suggest amplified GH response. If on an SSRI for a psychiatric indication, do not discontinue it — that risk far outweighs the interaction concern here.",
  },
  {
    name: "Anticoagulants (warfarin, DOACs) and antiplatelets",
    tier: "watch",
    detail: "Blood-thinning medications",
    why: "GH affects fluid balance and cardiovascular physiology. The interaction with anticoagulants is not directly characterized for CJC-1295, but the potential for edema and fluid shifts creates a secondary consideration for anyone whose anticoagulation is tightly managed.",
    action: "Not a hard flag, but inform your prescribing physician that you're adding CJC-1295. Monitor INR more closely if on warfarin during first weeks of use.",
  },
  {
    name: "Alcohol (heavy or chronic use)",
    tier: "watch",
    detail: "Regular heavy drinking during a GH-axis protocol",
    why: "Alcohol disrupts GH secretion — particularly the nocturnal GH pulse that CJC-1295 is often timed to amplify. Drinking before sleep directly blunts the GH pulse you're trying to enhance, working against the stated mechanism. Additionally, alcohol affects liver function, which is the primary site of IGF-1 synthesis.",
    action: "Not a hard stop. But regular heavy drinking significantly undermines the mechanism and timing that makes CJC-1295 work. It's self-defeating.",
  },
  {
    name: "Stimulants (high-dose caffeine, ADHD medications, pre-workout stacks)",
    tier: "watch",
    detail: "CNS stimulants, especially when affecting sleep",
    why: "GH is predominantly released during slow-wave sleep. Stimulants that impair sleep quality or delay sleep onset reduce the primary GH secretion window. If the bedtime injection timing convention is being used, stimulant use in the evening directly conflicts with the physiological basis of that timing.",
    action: "Manage stimulant timing to preserve sleep quality — the nocturnal GH pulse is the mechanism CJC-1295 is trying to amplify.",
  },

  // ── LOWS ──
  {
    name: "Ipamorelin",
    tier: "low",
    detail: "GH secretagogue (GHRP / ghrelin mimetic) — the canonical CJC-1295 stack partner",
    why: "Different receptor mechanism (ghrelin receptor vs GHRH receptor) — synergistic, not redundant. Together they produce greater GH release than either alone. Ipamorelin is relatively selective, with less cortisol and prolactin elevation than older GHRPs.",
    action: "Standard complementary stack. All metabolic and cancer safety gates apply to the stack collectively — not just to CJC-1295 alone.",
  },
  {
    name: "BPC-157",
    tier: "low",
    detail: "Recovery peptide — tissue repair mechanism, not GH axis",
    why: "Completely different mechanism. Commonly co-used in recovery and training contexts. No known pharmacological conflict.",
    action: "No specific concern. Verify each compound's source independently.",
  },
  {
    name: "TB-500",
    tier: "low",
    detail: "Recovery peptide — Tβ4 fragment, tissue repair mechanism",
    why: "Different mechanism from CJC-1295. Commonly co-used in recovery protocols.",
    action: "No specific concern. Apply cancer history gate to both compounds — TB-500 has its own tissue-growth signaling concern.",
  },
  {
    name: "NAD+ / NMN / NR",
    tier: "low",
    detail: "Cellular energy / longevity pathway supplementation",
    why: "Different mechanism entirely. No known pharmacological interaction with GH-axis compounds.",
    action: "No concern. Cancer history gate for NAD+ applies independently (PARP inhibitor conflict).",
  },
  {
    name: "Creatine",
    tier: "low",
    detail: "Ergogenic — ATP regeneration, well-studied",
    why: "No interaction with GH-axis compounds. Separately well-studied safety profile.",
    action: "No concern.",
  },
  {
    name: "Collagen peptides / vitamin C / zinc",
    tier: "low",
    detail: "Connective tissue nutritional support",
    why: "Foundational nutritional pathways. No interaction with GH-axis mechanism.",
    action: "No concern.",
  },
  {
    name: "Cannabis / CBD",
    tier: "low",
    detail: "Endocannabinoid system",
    why: "No known direct interaction with GH/IGF-1 axis. Cannabis may affect sleep architecture — which matters for GH timing but is a lifestyle factor, not a pharmacological interaction.",
    action: "No specific pharmacological concern. Sleep quality matters for GH timing — manage cannabis use timing accordingly.",
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

export default function Cjc1295InteractionsPanel() {
  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        CJC-1295 is a systemic endocrine compound — its interaction profile is driven by GH/IGF-1 physiology. The three flags (cancer treatment, diabetes medications, thyroid therapy) reflect real mechanism conflicts, not precautionary hedging. The watches cover the downstream effects of GH elevation on other body systems. Most other common supplements are lows.
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
        CJC-1295&apos;s interaction profile is more consequential than recovery peptides like BPC-157 because it produces real, measurable changes in endocrine physiology. Interactions operate through those downstream effects — glucose, IGF-1, fluid balance, thyroid conversion. When in doubt about a specific combination with a prescription medication, the prescribing physician conversation should happen before starting, not after a problem develops.
      </div>

    </div>
  );
}
