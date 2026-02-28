/**
 * Mk677InteractionsPanel — interaction intelligence for MK-677 (Ibutamoren).
 * Shares GH-axis interaction profile with CJC-1295 / ipamorelin. Key additions:
 * - Diuretics / cardiac medications: edema and heart failure concern is explicit
 * - Carpal tunnel medications: nerve compression context
 * - GLP-1 agonists: appetite opposition more significant with sustained ghrelin activation
 * - Sleep medications: vivid dreams + sleep disruption interaction
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
    why: "IGF-1 elevation from MK-677 is confirmed in RCTs — not just mechanistically inferred. IGF-1 is a direct mitogen. Sustained IGF-1 elevation from MK-677's long half-life may be mechanistically more concerning than pulsatile exposure from injectable GHRPs, though this distinction hasn't been directly studied.",
    action: "Stop MK-677 immediately. Do not use during active cancer treatment without explicit oncology clearance.",
  },
  {
    name: "Insulin and diabetes medications (insulin, metformin, GLP-1 agonists, SGLT2 inhibitors, sulfonylureas)",
    tier: "flag",
    detail: "Glucose-lowering therapy of any class",
    why: "Sustained GH counter-regulation to insulin from MK-677's ~24hr half-life produces more persistent glucose dysregulation than injectable GHRPs. Adding sustained GH-axis stimulation to an established diabetes regimen can shift glucose control in either direction unpredictably — the interaction is documented in clinical trials, not just mechanistically inferred.",
    action: "Do not combine without medical supervision. A prescribing physician conversation is required before starting. This applies more urgently than for short-acting injectable GHRPs due to the sustained glucose counter-regulation.",
  },
  {
    name: "Heart failure medications (ACE inhibitors, beta-blockers, diuretics, digoxin)",
    tier: "flag",
    detail: "Medications for heart failure or cardiac function management",
    why: "Sustained GH elevation and fluid retention from MK-677 is a real concern in heart failure. GH-driven fluid retention can worsen cardiac preload and edema in people with compromised cardiac function. Heart failure was specifically identified as a caution in MK-677's clinical context. Adding a sustained GH secretagogue to heart failure medications creates an interaction risk that affects both the cardiac medication's effectiveness and the fluid balance it's managing.",
    action: "Do not start MK-677 if you have heart failure without explicit cardiologist clearance. This is not a 'monitor and adjust' situation — it's a stop-and-consult before starting.",
  },
  {
    name: "Thyroid hormone replacement (levothyroxine, liothyronine)",
    tier: "flag",
    detail: "Prescription thyroid hormone therapy",
    why: "GH elevation can affect T4/T3 conversion and TSH dynamics. Same interaction as CJC-1295 and sermorelin — sustained GH elevation from MK-677's long half-life means this interaction is more persistent than with shorter-acting compounds.",
    action: "Discuss with your endocrinologist or prescribing physician before starting. Add a thyroid function check during use if labs are monitored periodically.",
  },

  // ── WATCHES ──
  {
    name: "GLP-1 receptor agonists (semaglutide, tirzepatide, liraglutide) for weight or diabetes",
    tier: "watch",
    detail: "GLP-1 receptor agonists suppress appetite; MK-677 increases appetite persistently via sustained ghrelin receptor activation",
    why: "The appetite-mechanism opposition from ipamorelin is amplified with MK-677: GLP-1 agonists suppress hunger while sustained ghrelin receptor activation from MK-677 drives continuous hunger. The combination places opposing appetite signals simultaneously throughout the day — not just peri-injection. The glucose control interaction (GH counter-regulation + GLP-1 glucose lowering) remains unpredictable. If on a GLP-1 agonist for diabetes: treat as a diabetes medication flag.",
    action: "If on a GLP-1 agonist for diabetes: treat as the diabetes medication flag — discuss with your prescriber. If on a GLP-1 agonist for weight management: the sustained appetite opposition actively works against your primary goal — reconsider the combination.",
  },
  {
    name: "Ipamorelin / other GHRPs (GHRP-2, GHRP-6, hexarelin)",
    tier: "watch",
    detail: "Additional ghrelin receptor agonists — compounded receptor saturation and GH load",
    why: "Stacking MK-677 with ipamorelin (or other GHRPs) combines two ghrelin receptor agonists. Unlike the CJC+ipa stack (complementary receptors), MK-677+ipamorelin hits the same receptor via two compounds with different half-lives. The additive endocrine and appetite load is real. Some protocols use this combination, but the rationale for combining same-receptor agonists with different half-lives is weaker than the dual-receptor CJC+ipa rationale.",
    action: "Not the same mechanistic rationale as CJC+ipa. All metabolic, cancer, and glucose gates apply to the combined load. Appetite stimulation is particularly amplified.",
  },
  {
    name: "CJC-1295 or sermorelin (GHRH receptor agonists)",
    tier: "watch",
    detail: "Complementary GH secretagogue — different receptor from MK-677",
    why: "CJC-1295 or sermorelin + MK-677 is the same mechanistic rationale as CJC+ipa: GHRH receptor + ghrelin receptor = complementary, additive GH release. This is a community stack. However, stacking a 24hr compound (MK-677) with a short-acting compound (CJC no-DAC) or a long-acting compound (CJC-DAC) compounds both the endocrine load and the interaction complexity. All GH-axis gates apply to the combined protocol.",
    action: "Standard complementary stack with good mechanistic rationale. Apply all metabolic, cancer, edema, and cycling gates to the combined protocol. The glucose concern from MK-677's sustained GH elevation is the most important shared gate.",
  },
  {
    name: "Sleep medications (benzodiazepines, Z-drugs: zolpidem, eszopiclone; sedating antihistamines)",
    tier: "watch",
    detail: "Medications that affect sleep architecture",
    why: "MK-677 has documented effects on sleep architecture — including increased slow-wave sleep in some users but vivid dreams and disruption in others. Sleep medications that reduce sleep quality or alter sleep stages may compound the variable sleep effects of MK-677. Benzodiazepines and Z-drugs reduce upper airway tone — relevant in anyone with OSA risk given GH-driven fluid retention.",
    action: "Monitor sleep quality carefully if combining. If you have OSA risk factors, assess for sleep apnea before adding MK-677. Worsening daytime sleepiness, snoring, or morning fatigue warrants evaluation.",
  },
  {
    name: "Corticosteroids (prednisone, dexamethasone, hydrocortisone)",
    tier: "watch",
    detail: "Systemic corticosteroid therapy",
    why: "GH and glucocorticoids interact in complex ways. Both independently affect glucose — additive hyperglycemia risk is particularly significant with MK-677's sustained GH exposure. Corticosteroids may also blunt IGF-1 response to GH elevation. Fluid retention from both compounds can compound, raising cardiac and edema concerns.",
    action: "Monitor glucose closely — this combination represents compounded hyperglycemia risk. Discuss with prescribing physician before adding MK-677. Edema and fluid balance require particular attention.",
  },
  {
    name: "Diuretics (furosemide, hydrochlorothiazide, spironolactone)",
    tier: "watch",
    detail: "Medications that manage fluid balance",
    why: "If on diuretics for edema, hypertension, or cardiac management: MK-677's sustained fluid retention mechanism works counter to diuretic effect. This can require upward titration of diuretics and represents a real interaction with the diuretic's therapeutic purpose. For people on diuretics for cardiac conditions, this is more urgent — see the heart failure flag.",
    action: "If on diuretics for fluid management: discuss with prescribing physician before starting MK-677. Monitor fluid balance, weight, and edema closely. Diuretic dose may need adjustment.",
  },
  {
    name: "Alcohol (heavy or chronic use)",
    tier: "watch",
    detail: "Regular heavy drinking during a GH-axis protocol",
    why: "Alcohol disrupts GH secretion and worsens sleep quality. MK-677's sleep architecture effects (vivid dreams, altered stages) may be compounded by alcohol's disruptive effects on REM sleep. Additionally, both alcohol and MK-677 independently affect glucose — the combination adds metabolic complexity.",
    action: "Not a hard stop. Heavy alcohol use undermines both the GH mechanism and the sleep quality effects that users often pursue with MK-677.",
  },

  // ── LOWS ──
  {
    name: "BPC-157",
    tier: "low",
    detail: "Recovery peptide — tissue repair mechanism",
    why: "Completely different mechanism. No known pharmacological conflict.",
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
    why: "No known direct pharmacological interaction with GH/IGF-1 axis. Cannabis before sleep may compound MK-677's sleep architecture effects — worth noting.",
    action: "No specific pharmacological concern. Cannabis use before sleep is worth monitoring in the context of MK-677's variable sleep effects.",
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

export default function Mk677InteractionsPanel() {
  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        MK-677&apos;s interaction profile shares the GH-axis flags but has two amplifications: heart failure medications are elevated to a flag (sustained fluid retention is a real cardiac concern), and the GLP-1 agonist appetite-opposition is more significant with a 24hr compound than with pulsatile injectable GHRPs. The sustained nature of MK-677&apos;s GH exposure makes glucose-related interactions more clinically relevant than with shorter-acting compounds.
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
        MK-677&apos;s interaction profile is driven by sustained GH/IGF-1 physiology — the same engine as other GH-axis compounds, amplified by the 24hr half-life. Heart failure medications are the most MK-677-specific flag: sustained fluid retention in cardiac-compromised patients is a real concern, not a theoretical one. When combining with GHRH analogs (CJC-1295, sermorelin), apply all safety gates to the combined protocol with particular attention to glucose.
      </div>

    </div>
  );
}
