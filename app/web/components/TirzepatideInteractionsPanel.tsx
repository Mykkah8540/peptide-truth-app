"use client";

/**
 * TirzepatideInteractionsPanel — interaction intelligence for Tirzepatide.
 * Interaction profile largely mirrors semaglutide (same GLP-1 class concerns).
 * Primary differences: same insulin/sulfonylurea hypoglycemia risk,
 * same oral medication absorption concern, same pregnancy contraindication.
 * The GIP receptor addition doesn't materially change the clinical interaction profile.
 */

import { useState, useMemo } from "react";

type Tier = "flag" | "watch" | "low";
type Category = "medications" | "supplements" | "stimulants" | "recreational" | "peptides";

type Entry = {
  id: string;
  name: string;
  aliases: string[];
  category: Category;
  tier: Tier;
  summary: string;
  mitigation: string[];
};

const INTERACTIONS: Entry[] = [
  // ── FLAGS ──
  {
    id: "insulin",
    name: "Insulin (all types)",
    aliases: ["basal insulin", "bolus insulin", "glargine", "detemir", "degludec", "lispro", "aspart", "glulisine"],
    category: "medications",
    tier: "flag",
    summary: "Additive glucose-lowering — insulin dose reduction is typically required when starting tirzepatide",
    mitigation: [
      "Insulin dose reduction is required when starting tirzepatide — this is standard prescribing guidance; coordinate with your physician before starting",
      "Glucose monitoring is mandatory during the first 4-8 weeks after adding tirzepatide to an insulin regimen",
      "Hypoglycemia symptoms (shakiness, sweating, confusion, palpitations): fast-acting carbohydrates immediately",
      "In the SURPASS trials, basal insulin was typically reduced by ~20-30% when tirzepatide was added — physician-guided titration required",
    ],
  },
  {
    id: "sulfonylureas",
    name: "Sulfonylureas",
    aliases: ["glipizide", "glyburide", "glimepiride", "glibenclamide", "tolbutamide"],
    category: "medications",
    tier: "flag",
    summary: "Additive insulin secretion — hypoglycemia risk increased when combined with tirzepatide",
    mitigation: [
      "Sulfonylurea dose reduction is often recommended when adding tirzepatide — discuss with prescribing physician before starting",
      "Glucose monitoring: hypoglycemia risk is amplified by tirzepatide's potent glucose-lowering effect",
      "Hypoglycemia symptoms: fast-acting carbohydrates immediately; severe hypoglycemia requires emergency services",
    ],
  },
  {
    id: "other-glp1",
    name: "Other GLP-1 receptor agonists",
    aliases: ["semaglutide", "liraglutide", "dulaglutide", "exenatide", "ozempic", "victoza", "wegovy", "trulicity", "retatrutide"],
    category: "medications",
    tier: "flag",
    summary: "Tirzepatide contains GLP-1R agonism — do not combine with another GLP-1 drug; mechanism duplication",
    mitigation: [
      "Tirzepatide contains a GLP-1 receptor agonist component — do not run with another GLP-1 drug simultaneously",
      "Switching from semaglutide to tirzepatide requires a proper transition, not simple overlap — discuss with your physician",
      "Stacking two GLP-1 drugs provides no additive benefit while increasing GI and systemic risk",
    ],
  },
  {
    id: "oral-meds-narrow",
    name: "Oral medications with narrow therapeutic index",
    aliases: ["warfarin", "levothyroxine", "phenytoin", "digoxin", "cyclosporine", "tacrolimus", "lithium"],
    category: "medications",
    tier: "flag",
    summary: "Gastric emptying delay alters absorption of oral medications — narrow therapeutic index drugs need monitoring",
    mitigation: [
      "Tirzepatide's gastric emptying delay can alter the absorption rate and timing of oral medications",
      "Narrow therapeutic index drugs (warfarin, levothyroxine, cyclosporine, digoxin, lithium) are most sensitive — their plasma levels may shift after starting tirzepatide",
      "Alert physicians managing narrow therapeutic index medications when starting tirzepatide",
      "INR monitoring for warfarin, TSH for levothyroxine, and relevant levels for others should be rechecked after starting tirzepatide",
    ],
  },
  {
    id: "pregnancy",
    name: "Pregnancy / conception planning",
    aliases: ["pregnant", "trying to conceive", "IVF", "fertility treatment"],
    category: "medications",
    tier: "flag",
    summary: "Animal fetal harm — tirzepatide must be stopped before conception planning",
    mitigation: [
      "Stop tirzepatide before planning conception — prescribing information guidance is to stop prior to planned pregnancy",
      "If pregnant while taking tirzepatide: stop immediately and contact your OB",
      "Discuss contraception needs with your prescribing physician — oral contraceptive reliability may be affected by gastric emptying delay",
    ],
  },

  // ── WATCHES ──
  {
    id: "metformin",
    name: "Metformin",
    aliases: ["glucophage", "fortamet", "glumetza"],
    category: "medications",
    tier: "watch",
    summary: "Standard and common T2D combination with tirzepatide — additive glucose lowering, watch for GI stacking",
    mitigation: [
      "Tirzepatide + metformin is a standard combination in T2D treatment — not a contraindication",
      "GI side effects from both can compound — nausea and GI discomfort may be amplified during early tirzepatide titration on metformin",
      "Hypoglycemia risk from this combination alone (without insulin/sulfonylureas) is low — neither drug causes hypoglycemia independently",
    ],
  },
  {
    id: "sglt2",
    name: "SGLT-2 inhibitors",
    aliases: ["empagliflozin", "dapagliflozin", "canagliflozin", "jardiance", "farxiga", "invokana"],
    category: "medications",
    tier: "watch",
    summary: "Common T2D combination — DKA risk with extreme caloric restriction needs sick-day management plan",
    mitigation: [
      "Tirzepatide + SGLT-2 inhibitor is a commonly used combination in T2D — generally safe",
      "SGLT-2 inhibitors carry a DKA risk (euglycemic DKA — can occur with normal glucose) that may increase during prolonged very low caloric intake on tirzepatide",
      "Sick-day rule: if experiencing prolonged vomiting or not eating, hold SGLT-2 inhibitor and contact physician",
      "Ketone monitoring during prolonged very low caloric intake is prudent with this combination",
    ],
  },
  {
    id: "oral-contraceptives",
    name: "Oral contraceptives",
    aliases: ["birth control pill", "combined OCP", "progestin-only pill"],
    category: "medications",
    tier: "watch",
    summary: "Gastric emptying delay may affect OCP absorption — backup contraception recommended during titration",
    mitigation: [
      "Tirzepatide's gastric emptying delay can alter oral contraceptive absorption timing and reliability",
      "Backup contraception (condoms) is recommended during titration and for 4 weeks after each dose escalation",
      "Long-acting reversible contraception (IUD, implant) avoids the absorption interaction entirely",
    ],
  },
  {
    id: "nsaids",
    name: "NSAIDs",
    aliases: ["ibuprofen", "naproxen", "advil", "aleve", "diclofenac", "celecoxib", "meloxicam"],
    category: "medications",
    tier: "watch",
    summary: "Additive GI irritation — both tirzepatide and NSAIDs cause GI effects; avoid on empty stomach",
    mitigation: [
      "NSAID GI irritation can compound tirzepatide GI side effects — avoid taking NSAIDs on an empty stomach",
      "Acetaminophen/paracetamol is preferred for pain management during tirzepatide titration if possible",
      "Regular or daily NSAID use alongside tirzepatide warrants physician discussion",
    ],
  },
  {
    id: "alcohol",
    name: "Alcohol",
    aliases: ["wine", "beer", "spirits", "ethanol"],
    category: "recreational",
    tier: "watch",
    summary: "Amplifies GI side effects; alcohol tolerance frequently reduced on tirzepatide",
    mitigation: [
      "Alcohol worsens GI symptoms on tirzepatide — particularly during escalation periods",
      "Reduced alcohol tolerance is a common report with GLP-1/GIP drugs — the sedating and GI effects of alcohol appear amplified",
      "In T2D with insulin or sulfonylureas: alcohol can cause paradoxical hypoglycemia — monitor glucose if drinking",
      "Some users report reduced cravings for alcohol — an observed GLP-1R reward circuit effect",
    ],
  },
  {
    id: "statin",
    name: "Statins",
    aliases: ["atorvastatin", "rosuvastatin", "simvastatin", "pravastatin", "lipitor", "crestor"],
    category: "medications",
    tier: "watch",
    summary: "No direct pharmacological interaction — possible minor absorption timing effect from gastric emptying delay",
    mitigation: [
      "No clinically significant pharmacokinetic interaction established",
      "Gastric emptying delay may slightly alter statin absorption timing — not established as clinically meaningful",
      "Standard statin monitoring (LFTs, CK if symptomatic) applies; no changes specifically required for tirzepatide co-use",
    ],
  },
  {
    id: "bpc157",
    name: "BPC-157",
    aliases: ["body protection compound", "bpc"],
    category: "peptides",
    tier: "watch",
    summary: "No established interaction — anecdotal GI protective overlap; uncharacterized combination",
    mitigation: [
      "No pharmacological interaction established between BPC-157 and tirzepatide",
      "Community anecdotes suggest BPC-157 may help GI tolerability on GLP-1 drugs — not clinically studied",
      "Verify peptide source quality independently; BPC-157 is research-grade only",
    ],
  },

  // ── LOWS ──
  {
    id: "semaglutide-switch",
    name: "Switching from semaglutide to tirzepatide",
    aliases: ["ozempic to mounjaro", "wegovy to zepbound"],
    category: "peptides",
    tier: "low",
    summary: "Common transition — not a concurrent interaction; proper washout or sequential transition required",
    mitigation: [
      "Do not run semaglutide and tirzepatide simultaneously — GLP-1 mechanism duplication",
      "Most clinical guidance involves stopping semaglutide and starting tirzepatide at initiation dose (2.5mg) the following week — coordinate with prescriber",
      "GI effects may be more pronounced during the transition period",
    ],
  },
  {
    id: "magnesium",
    name: "Magnesium",
    aliases: ["mag glycinate", "mag citrate", "magnesium oxide"],
    category: "supplements",
    tier: "low",
    summary: "No direct interaction — magnesium citrate may help with constipation from tirzepatide",
    mitigation: [
      "No pharmacological interaction with tirzepatide",
      "Magnesium citrate at standard supplement doses may help with constipation — a common tirzepatide side effect",
    ],
  },
  {
    id: "protein-supplements",
    name: "Protein supplements",
    aliases: ["protein powder", "whey protein", "casein", "collagen", "pea protein", "protein shake"],
    category: "supplements",
    tier: "low",
    summary: "Not an interaction — actively recommended to meet protein targets when appetite is substantially suppressed",
    mitigation: [
      "No interaction. Protein supplementation is encouraged to maintain lean mass when appetite suppression is high",
      "Liquid protein may be better tolerated than solid protein during periods of GI intolerance",
    ],
  },
  {
    id: "vitamin-d",
    name: "Vitamin D",
    aliases: ["cholecalciferol", "ergocalciferol", "D3"],
    category: "supplements",
    tier: "low",
    summary: "No direct interaction — take with food containing some fat for absorption",
    mitigation: [
      "No pharmacological interaction with tirzepatide",
      "Fat-soluble vitamins should be taken with a small fat-containing meal — not changed by tirzepatide",
    ],
  },
  {
    id: "caffeine",
    name: "Caffeine (coffee, tea, energy drinks)",
    aliases: ["coffee", "tea", "energy drinks", "espresso"],
    category: "stimulants",
    tier: "low",
    summary: "No direct interaction — caffeine on empty stomach may worsen GI symptoms during titration",
    mitigation: [
      "No pharmacological interaction",
      "Caffeine on an empty stomach amplifies GI discomfort during tirzepatide titration — small food intake before coffee helps",
    ],
  },
  {
    id: "cannabis",
    name: "Cannabis / THC",
    aliases: ["marijuana", "weed", "THC", "CBD", "edibles"],
    category: "recreational",
    tier: "low",
    summary: "THC's appetite stimulation (CB1 receptor) directly counters tirzepatide's appetite suppression",
    mitigation: [
      "THC activates CB1 receptors driving appetite stimulation — this competes directly with tirzepatide's appetite suppression",
      "Regular cannabis use may reduce tirzepatide's weight management efficacy meaningfully",
    ],
  },
  {
    id: "berberine",
    name: "Berberine",
    aliases: [],
    category: "supplements",
    tier: "low",
    summary: "Additive glucose-lowering — low clinical hypoglycemia risk unless on insulin/sulfonylureas",
    mitigation: [
      "Berberine has modest AMPK-mediated glucose-lowering — additive with tirzepatide but unlikely to cause significant hypoglycemia alone",
      "In T2D with other medications: another glucose-lowering layer to be aware of",
    ],
  },
];

const CATEGORY_LABELS: Record<Category, string> = {
  medications:  "Medications",
  supplements:  "Supplements",
  stimulants:   "Stimulants",
  recreational: "Recreational",
  peptides:     "Peptides",
};

const TIER_CONFIG = {
  flag:  { label: "Stop signal",     bg: "rgba(158,56,0,0.09)",  border: "rgba(158,56,0,0.22)",  dot: "#9e3800", text: "#9e3800" },
  watch: { label: "Worth watching",  bg: "rgba(124,82,0,0.07)",  border: "rgba(124,82,0,0.18)",  dot: "#7c5200", text: "#7c5200" },
  low:   { label: "Low concern",     bg: "rgba(21,100,58,0.06)", border: "rgba(21,100,58,0.15)", dot: "#155e38", text: "#155e38" },
};

export default function TirzepatideInteractionsPanel() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return INTERACTIONS.filter((e) => {
      const matchesCategory = activeCategory === "all" || e.category === activeCategory;
      const matchesQuery =
        !q ||
        e.name.toLowerCase().includes(q) ||
        e.aliases.some((a) => a.toLowerCase().includes(q)) ||
        e.summary.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: INTERACTIONS.length };
    for (const e of INTERACTIONS) {
      counts[e.category] = (counts[e.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="reta-interactions">

      {/* ── Header ── */}
      <div className="reta-interactions__header">
        <div className="reta-interactions__header-note">
          Tirzepatide&apos;s interaction profile is largely identical to semaglutide — same GLP-1 class concerns. The GIP receptor addition doesn&apos;t materially change the clinical interaction landscape. The primary flags are insulin/sulfonylureas (hypoglycemia), other GLP-1 drugs (duplication), and narrow therapeutic index oral medications (absorption timing from gastric emptying delay).
        </div>
      </div>

      {/* ── Search ── */}
      <div className="reta-interactions__search-row">
        <input
          className="reta-interactions__search"
          type="text"
          placeholder="Search interactions (e.g. insulin, metformin, warfarin…)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* ── Category filters ── */}
      <div className="reta-interactions__cats">
        {(["all", ...Object.keys(CATEGORY_LABELS)] as (Category | "all")[]).map((cat) => (
          <button
            key={cat}
            className={`reta-interactions__cat${activeCategory === cat ? " reta-interactions__cat--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === "all" ? "All" : CATEGORY_LABELS[cat as Category]}
            <span className="reta-interactions__cat-count">{categoryCounts[cat] ?? 0}</span>
          </button>
        ))}
      </div>

      {/* ── Entries ── */}
      <div className="reta-interactions__list">
        {filtered.length === 0 && (
          <div className="reta-interactions__empty">No interactions match your search.</div>
        )}
        {filtered.map((e) => {
          const tc = TIER_CONFIG[e.tier];
          return (
            <div
              key={e.id}
              className="reta-interactions__entry"
              style={{ background: tc.bg, border: `1px solid ${tc.border}` }}
            >
              <div className="reta-interactions__entry-top">
                <div className="reta-interactions__entry-name">{e.name}</div>
                <span
                  className="reta-interactions__entry-tier"
                  style={{ color: tc.text, borderColor: tc.border }}
                >
                  <span style={{ color: tc.dot }}>●</span> {tc.label}
                </span>
              </div>
              {e.aliases.length > 0 && (
                <div className="reta-interactions__entry-aliases">
                  Also known as: {e.aliases.join(", ")}
                </div>
              )}
              <div className="reta-interactions__entry-summary">{e.summary}</div>
              <ul className="reta-interactions__entry-mitigation">
                {e.mitigation.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

    </div>
  );
}
