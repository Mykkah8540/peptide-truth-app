/**
 * SermorelinInteractionsPanel — interaction intelligence for Sermorelin.
 * Shares GH-axis interaction profile with CJC-1295. Key additions:
 * - Thyroid hormone replacement: bidirectional GH/thyroid axis interaction, elevated to watch
 * - Prescription medications generally: sermorelin's prescription context means physician-supervised
 *   users may be on medications that warrant specific discussion
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
    why: "IGF-1 — elevated downstream of GH from sermorelin — is a direct mitogen. Cancer patients were excluded from sermorelin's GHD clinical trials for this reason. The mechanism is the same as CJC-1295; the clinical documentation of the exclusion criterion is actually more explicit for sermorelin.",
    action: "Stop sermorelin immediately. Do not use during active cancer treatment without explicit oncology clearance.",
  },
  {
    name: "Insulin and diabetes medications (insulin, metformin, GLP-1 agonists, SGLT2 inhibitors, sulfonylureas)",
    tier: "flag",
    detail: "Glucose-lowering therapy of any class",
    why: "GH counter-regulation to insulin applies identically to sermorelin as to all GHRH analogs. Adding GH-axis stimulation to an established diabetes regimen can shift glucose control in either direction unpredictably. In GHD treatment, glucose monitoring alongside diabetes medications is standard practice.",
    action: "Do not combine without medical supervision. A prescribing physician conversation is required before starting — especially important in sermorelin's prescription context.",
  },
  {
    name: "Thyroid hormone replacement (levothyroxine, liothyronine)",
    tier: "flag",
    detail: "Prescription thyroid hormone therapy",
    why: "GH elevation can affect T4/T3 conversion and TSH dynamics — the GH/thyroid axis interacts bidirectionally. This is more explicitly documented for sermorelin than for CJC-1295 because sermorelin's clinical use included patients who may have had co-occurring thyroid issues. The interaction is mechanistically real and can require thyroid medication adjustment.",
    action: "Discuss with your endocrinologist or prescribing physician before starting. Add a thyroid function check during use if labs are monitored periodically. Sermorelin's prescription context makes this conversation easier to have.",
  },

  // ── WATCHES ──
  {
    name: "CJC-1295 (same receptor class)",
    tier: "watch",
    detail: "GH secretagogue (GHRH receptor) — same receptor as sermorelin",
    why: "CJC-1295 and sermorelin both act at the GHRH receptor — stacking them does not provide the complementary dual-receptor benefit of the CJC+ipamorelin stack. Combining two GHRH analogs produces compounded endocrine load without the mechanistic synergy of different receptor classes. Some protocols exist, but the rationale is weaker than the CJC+ipa stack.",
    action: "Not the complementary stack CJC+ipamorelin is. All metabolic, cancer, and cycling gates apply to the combined GH load.",
  },
  {
    name: "Ipamorelin (and other GHRPs)",
    tier: "watch",
    detail: "GH secretagogue (ghrelin receptor) — different receptor from sermorelin; complementary stack",
    why: "Sermorelin + ipamorelin hits both the GHRH receptor and the ghrelin receptor — same mechanistic rationale as CJC-1295+ipamorelin. Additive GH effect is the goal. All GH-axis safety gates apply to the combined load. Ipamorelin adds the appetite stimulation and sleep apnea considerations specific to ghrelin receptor agonism.",
    action: "Standard complementary stack with good mechanistic rationale. Apply all metabolic, cancer, thyroid, and cycling gates to the combined protocol — not separately to each compound.",
  },
  {
    name: "Corticosteroids (prednisone, dexamethasone, hydrocortisone)",
    tier: "watch",
    detail: "Systemic corticosteroid therapy",
    why: "GH and glucocorticoids interact in complex ways. Both independently affect glucose control — additive hyperglycemia risk. Corticosteroids may blunt IGF-1 response to GH elevation. This interaction appeared in GHD treatment literature where patients were sometimes on corticosteroids concurrently.",
    action: "Monitor glucose closely if on systemic corticosteroids. Discuss with prescribing physician before adding sermorelin.",
  },
  {
    name: "Growth hormone (exogenous rhGH)",
    tier: "watch",
    detail: "Direct GH replacement — stacking with a GHRH analog compounds endocrine load",
    why: "Adding sermorelin (endogenous GH pulse stimulation) to exogenous rhGH creates compounded GH-axis load. The combination is mechanistically redundant for GH — the feedback inhibition from exogenous GH may actually reduce sermorelin's effectiveness. Some protocols combine them, but the rationale and safety of the combined approach are not well-characterized.",
    action: "Requires physician oversight. All GH-axis safety gates apply to the combined protocol.",
  },
  {
    name: "Antidiabetic medications for weight management (GLP-1 agonists: semaglutide, tirzepatide)",
    tier: "watch",
    detail: "GLP-1 receptor agonists — appetite suppression opposite to GH-axis stimulation",
    why: "GLP-1 agonists and GH-axis compounds work in partially opposing directions on metabolic signaling. GH increases insulin resistance; GLP-1 agonists lower blood glucose. The combined glucose control effects are unpredictable. Additionally, sermorelin is often pursued for body composition goals — a goal that GLP-1 agonists also target through different mechanisms, with potential conflicts.",
    action: "If on a GLP-1 agonist for diabetes: treat as a diabetes medication flag — discuss with your prescriber. If on a GLP-1 agonist for weight management: the combination requires physician oversight given opposing metabolic effects.",
  },
  {
    name: "Alcohol (heavy or chronic use)",
    tier: "watch",
    detail: "Regular heavy drinking during a GH-axis protocol",
    why: "Alcohol disrupts GH secretion — particularly the nocturnal GH pulse. If the bedtime injection convention is used, drinking before sleep directly blunts the GH response sermorelin is trying to amplify. Alcohol also worsens sleep quality and disrupts the slow-wave sleep during which GH pulses naturally occur.",
    action: "Not a hard stop. Heavy alcohol use significantly undermines both the GH mechanism and the sleep timing that makes bedtime injection effective.",
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

export default function SermorelinInteractionsPanel() {
  return (
    <div className="reta-interactions">

      <div className="reta-interactions__intro">
        Sermorelin&apos;s interaction profile largely mirrors CJC-1295 — GH/IGF-1 axis physiology drives the major flags. Two sermorelin-specific additions: thyroid hormone replacement is elevated to a flag (bidirectional GH/thyroid axis interaction is more explicitly documented for sermorelin), and the prescription context means physician-supervised users should factor their full medication list into any prescribing conversation.
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
        Sermorelin&apos;s interaction profile is driven by GH/IGF-1 physiology — the same engine as CJC-1295. Thyroid hormone replacement is the most sermorelin-specific flagged interaction; this reflects the bidirectional GH/thyroid axis interaction that was explicitly documented in sermorelin&apos;s clinical use. The prescription pathway means physician-supervised users already have a framework for these conversations — use it.
      </div>

    </div>
  );
}
