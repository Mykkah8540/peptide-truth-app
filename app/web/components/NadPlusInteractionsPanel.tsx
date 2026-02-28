"use client";

import { useMemo, useState } from "react";

type SignalTier = "flag" | "watch" | "low";
type Category = "medications" | "stimulants" | "supplements" | "recreational" | "peptides";

type Interaction = {
  id: string;
  name: string;
  aliases: string[];
  category: Category;
  tier: SignalTier;
  summary: string;
  mitigation: string[];
};

const TIER_ORDER: Record<SignalTier, number> = { flag: 0, watch: 1, low: 2 };

const TIER_CONFIG: Record<SignalTier, { label: string; bg: string; border: string; color: string }> = {
  flag:  { label: "Real consideration", bg: "rgba(158,56,0,0.07)",  border: "rgba(158,56,0,0.18)",  color: "#9e3800" },
  watch: { label: "Worth watching",     bg: "rgba(124,82,0,0.07)",  border: "rgba(124,82,0,0.16)",  color: "#7c5200" },
  low:   { label: "Low concern",        bg: "rgba(21,100,58,0.06)", border: "rgba(21,100,58,0.14)", color: "#155e38" },
};

const CAT_LABELS: Record<Category | "all", string> = {
  all: "All",
  medications: "Medications",
  stimulants: "Stimulants",
  supplements: "Supplements",
  recreational: "Recreational",
  peptides: "Peptides",
};

const INTERACTIONS: Interaction[] = [
  // ── MEDICATIONS ─────────────────────────────────────────────────────────────

  {
    id: "parp-inhibitors",
    name: "PARP Inhibitors (Oncology)",
    aliases: ["olaparib", "lynparza", "niraparib", "zejula", "rucaparib", "rubraca", "talazoparib", "talzenna", "parp inhibitor", "parp", "cancer drug"],
    category: "medications",
    tier: "flag",
    summary: "PARP inhibitors work by blocking PARP-1 and PARP-2 enzymes, which depletes NAD+ in cancer cells and causes them to die. NAD+ supplementation replenishes the exact molecule these drugs are working to deplete — potentially counteracting the cancer therapy mechanism. This is a direct, clinically relevant conflict.",
    mitigation: [
      "Do not start NAD+ supplementation while on PARP inhibitor therapy without explicit oncology consultation",
      "This applies to all NAD+ precursors (NMN, NR) as well — same endpoint molecule",
      "If you're in remission and off PARP inhibitors, this is a conversation to have with your oncologist before starting",
    ],
  },
  {
    id: "active-cancer-chemo",
    name: "Chemotherapy (General)",
    aliases: ["chemotherapy", "chemo", "cancer treatment", "oncology treatment", "taxol", "paclitaxel", "cisplatin", "carboplatin", "doxorubicin", "adriamycin"],
    category: "medications",
    tier: "flag",
    summary: "NAD+ metabolism is central to how cells respond to DNA damage — including the DNA damage that chemotherapy intentionally induces. NAD+ supplementation may affect cellular response to multiple chemotherapy mechanisms. The direction and magnitude of that effect is not well-characterized for most drug classes.",
    mitigation: [
      "Active chemotherapy is a firm consult-oncologist-first situation before starting any NAD+ supplement",
      "The concern is not theoretical — it's mechanistic and worth a specific clinical conversation",
      "For most people not on active cancer treatment, this flag is not applicable",
    ],
  },
  {
    id: "niacin-b3",
    name: "Niacin / Nicotinic Acid (High-Dose)",
    aliases: ["niacin", "nicotinic acid", "vitamin b3", "niaspan", "flush niacin", "no-flush niacin", "inositol hexanicotinate", "nicotinamide"],
    category: "medications",
    tier: "watch",
    summary: "High-dose niacin (nicotinic acid, 1g+ daily as used for lipid management) shares a metabolic pathway with NAD+ — niacin is a direct NAD+ precursor. Combining high-dose niacin with NAD+ or NMN supplementation risks overloading the pathway and amplifying flushing, GI effects, and potentially liver load. Multivitamin-level niacin (20–30mg) is not a concern.",
    mitigation: [
      "Flush-based niacin at therapeutic doses (500mg+) plus NAD+ supplementation is redundant — pick one approach",
      "If you're using high-dose niacin for lipid management, discuss with your prescriber before adding NAD+",
      "Standard multivitamin B3 levels are not a concern — only pharmacological doses",
    ],
  },
  {
    id: "metformin",
    name: "Metformin",
    aliases: ["metformin", "glucophage", "fortamet", "glumetza", "riomet"],
    category: "medications",
    tier: "watch",
    summary: "Metformin's mechanisms include AMPK activation and effects on mitochondrial complex I — pathways that intersect with NAD+ metabolism and SIRT1 signaling. Combining metformin with NAD+ precursors is an active area of longevity research interest. Some researchers believe they're complementary; the combination is not yet characterized in controlled human trials.",
    mitigation: [
      "No established dangerous interaction — this is more of an understudied overlap",
      "Both are common in longevity-focused protocols; monitor for any unusual fatigue or GI effects",
      "If using for diabetes management, note that NAD+ itself doesn't meaningfully affect blood glucose",
    ],
  },
  {
    id: "warfarin",
    name: "Warfarin / Blood Thinners",
    aliases: ["warfarin", "coumadin", "jantoven", "blood thinner", "anticoagulant", "inr"],
    category: "medications",
    tier: "watch",
    summary: "High-dose niacin (which shares a metabolic precursor chain with NAD+) can affect warfarin sensitivity and INR levels. Direct NAD+ supplementation likely has a smaller effect, but if you're on warfarin, any change to your supplement regimen warrants more frequent INR monitoring until you know how you respond.",
    mitigation: [
      "More frequent INR monitoring when adding NAD+ supplementation",
      "Alert your anticoagulation clinic that you've added NAD+ supplements",
      "This is a monitoring concern, not a contraindication",
    ],
  },
  {
    id: "statins",
    name: "Statins",
    aliases: ["statin", "atorvastatin", "lipitor", "rosuvastatin", "crestor", "simvastatin", "zocor", "pravastatin", "pravachol", "lovastatin"],
    category: "medications",
    tier: "low",
    summary: "Statins affect CoQ10 levels and some aspects of mitochondrial metabolism. There's minor theoretical overlap with NAD+-driven mitochondrial pathways, but no clinically significant interaction has been established. This is a low-concern combination.",
    mitigation: [
      "Continue statins as prescribed",
      "No specific adjustments needed for NAD+ supplementation",
      "If concerned about mitochondrial support, CoQ10 alongside statins has more direct evidence than NAD+",
    ],
  },
  {
    id: "ssris-snris",
    name: "SSRIs / SNRIs",
    aliases: ["ssri", "snri", "sertraline", "zoloft", "escitalopram", "lexapro", "fluoxetine", "prozac", "venlafaxine", "effexor", "duloxetine", "cymbalta", "antidepressant"],
    category: "medications",
    tier: "low",
    summary: "No significant direct interaction with NAD+ metabolism. Both affect brain chemistry through different pathways that don't meaningfully interfere. NAD+ is sometimes used in mental health recovery contexts; no contraindication with standard antidepressants.",
    mitigation: [
      "No specific adjustments needed",
      "Continue antidepressants as prescribed",
      "If adding NAD+ alongside depression management, mention it to your prescriber",
    ],
  },

  // ── STIMULANTS ──────────────────────────────────────────────────────────────

  {
    id: "caffeine",
    name: "Caffeine",
    aliases: ["caffeine", "coffee", "energy drink", "red bull", "monster", "espresso", "tea"],
    category: "stimulants",
    tier: "low",
    summary: "No significant interaction with NAD+ metabolism. Chronic heavy caffeine use increases oxidative stress modestly, which increases NAD+ consumption — a minor consideration in the context of supplementation. Normal coffee intake is not a concern.",
    mitigation: [
      "Normal caffeine intake has no meaningful interaction with NAD+ supplementation",
      "Avoid caffeine in the 2 hours before IV infusion — elevated heart rate before infusion may amplify flushing response",
    ],
  },
  {
    id: "adderall-amphetamines",
    name: "ADHD Stimulants",
    aliases: ["adderall", "vyvanse", "dexedrine", "ritalin", "concerta", "methylphenidate", "amphetamine", "lisdexamfetamine"],
    category: "stimulants",
    tier: "low",
    summary: "No significant direct interaction between ADHD stimulant medications and NAD+ pathways. Both affect brain function but through non-overlapping mechanisms. NAD+ is sometimes used in cognitive support contexts alongside ADHD management.",
    mitigation: [
      "No specific adjustments needed",
      "If adding NAD+ as a cognitive support alongside ADHD medication, allow a few weeks to assess any subjective changes",
    ],
  },

  // ── SUPPLEMENTS ─────────────────────────────────────────────────────────────

  {
    id: "nmn",
    name: "NMN (Nicotinamide Mononucleotide)",
    aliases: ["nmn", "nicotinamide mononucleotide", "nmn supplement", "alive by nature nmn", "tru niagen nmn", "beta-nmn"],
    category: "supplements",
    tier: "flag",
    summary: "NMN is a direct NAD+ precursor — it converts to NAD+ inside cells. Taking both NMN and NAD+ (especially IV NAD+) simultaneously is redundant at best and excessive at worst. The pathway has a ceiling — stacking multiple NAD+ boosters doesn't linearly raise cellular NAD+ beyond saturation.",
    mitigation: [
      "Pick one approach: IV NAD+, oral NAD+, NMN, or NR — don't stack all of them simultaneously",
      "If doing IV NAD+ sessions, you likely don't need daily NMN on the same days",
      "Oral NAD+ + NMN daily combination is redundant and unnecessarily expensive",
    ],
  },
  {
    id: "nr",
    name: "NR (Nicotinamide Riboside)",
    aliases: ["nr", "nicotinamide riboside", "tru niagen", "niagen", "niacel", "basis supplement"],
    category: "supplements",
    tier: "flag",
    summary: "NR is also a NAD+ precursor — different molecular structure from NMN but the same metabolic endpoint. Stacking NR with NAD+ or NMN is triple-redundant on the same pathway. There's no evidence that combining all three NAD+ pathway supplements outperforms a single approach.",
    mitigation: [
      "Choose one NAD+ strategy: NR, NMN, or direct NAD+ — not multiple simultaneously",
      "NR has the most bioavailability evidence of the three (Tru Niagen studies)",
      "If unsure which to use, NR or NMN are typically preferred over oral NAD+ due to better absorption data",
    ],
  },
  {
    id: "resveratrol",
    name: "Resveratrol",
    aliases: ["resveratrol", "trans-resveratrol", "red wine extract", "japanese knotweed", "pterostilbene"],
    category: "supplements",
    tier: "watch",
    summary: "Resveratrol is a SIRT1 activator — it works through the same sirtuin pathway that NAD+ supports. The theoretical synergy is that resveratrol activates sirtuins while NAD+ provides the fuel they need. This stack is widely used in longevity communities. Human evidence for the combination is thin; the rationale is mechanistically coherent.",
    mitigation: [
      "Common longevity stack — not dangerous, but clinical evidence for the combination is limited",
      "Resveratrol bioavailability is low in most supplement forms — pterostilbene (a related compound) may have better absorption",
      "If using both, track subjective effects — this is genuinely an n=1 experiment for most people",
    ],
  },
  {
    id: "tmg",
    name: "TMG (Trimethylglycine / Betaine)",
    aliases: ["tmg", "trimethylglycine", "betaine", "betaine anhydrous", "methylation support"],
    category: "supplements",
    tier: "watch",
    summary: "NAD+ precursors (NMN in particular) consume methyl groups during metabolism, which some longevity researchers believe can deplete methylation capacity over time. TMG is used as a methyl donor to replenish this. The concern and the intervention are both based on indirect evidence — not strongly established in humans.",
    mitigation: [
      "If using high-dose NMN (500mg+), some practitioners recommend 500mg–1g TMG alongside it",
      "This is speculative preventive care — the methylation depletion concern is not confirmed in most users",
      "If not on NMN specifically (and using direct NAD+ or NR instead), TMG is less relevant",
    ],
  },
  {
    id: "quercetin-fisetin",
    name: "Quercetin / Fisetin (Senolytics)",
    aliases: ["quercetin", "fisetin", "senolytic", "senolytics", "zombie cells", "anti-aging supplements"],
    category: "supplements",
    tier: "low",
    summary: "Senolytics (quercetin, fisetin) target senescent cells — complementary to NAD+'s focus on mitochondrial and sirtuin function. No significant interaction between these pathways. Common to see both in longevity stacks.",
    mitigation: [
      "No specific adjustments needed — complementary mechanisms, not conflicting",
      "If building a longevity stack, these often appear together — no red flags",
    ],
  },
  {
    id: "coq10",
    name: "CoQ10 / Ubiquinol",
    aliases: ["coq10", "coenzyme q10", "ubiquinol", "ubiquinone", "qunol", "mitochondrial support"],
    category: "supplements",
    tier: "low",
    summary: "CoQ10 also supports mitochondrial ATP synthesis — a parallel but distinct pathway from NAD+. These are complementary, not redundant. No significant interaction between them. Often seen together in mitochondrial support protocols.",
    mitigation: [
      "No specific adjustments needed",
      "Both CoQ10 and NAD+ support mitochondrial function through different mechanisms — stacking is reasonable and common",
    ],
  },
  {
    id: "melatonin",
    name: "Melatonin",
    aliases: ["melatonin", "sleep supplement", "circadian"],
    category: "supplements",
    tier: "low",
    summary: "No significant interaction with NAD+ metabolism. Sleep quality is relevant to cellular repair (which NAD+ supports) — melatonin and NAD+ are complementary in supporting recovery and cellular health.",
    mitigation: [
      "No specific adjustments needed",
      "Both are used in longevity stacks — no interaction concerns",
    ],
  },

  // ── RECREATIONAL ────────────────────────────────────────────────────────────

  {
    id: "alcohol",
    name: "Alcohol",
    aliases: ["alcohol", "beer", "wine", "liquor", "drinking", "ethanol"],
    category: "recreational",
    tier: "flag",
    summary: "Alcohol metabolism consumes NAD+ directly and rapidly. Ethanol is processed by alcohol dehydrogenase, which converts NAD+ to NADH. Heavy or regular drinking actively depletes NAD+ — working directly against the rationale for supplementing it. If your goal is to maintain or restore NAD+ levels, regular significant alcohol use is the most direct countermeasure.",
    mitigation: [
      "The more you drink, the more you undermine the supplementation rationale",
      "This isn't about occasional social drinking — regular heavy use directly depletes the molecule you're supplementing",
      "If you're doing IV NAD+ for recovery from alcohol-related depletion, this is a well-established clinical context — the two uses are different",
    ],
  },
  {
    id: "cannabis",
    name: "Cannabis / THC",
    aliases: ["cannabis", "marijuana", "weed", "thc", "cbd", "edibles", "vaping cannabis"],
    category: "recreational",
    tier: "low",
    summary: "No direct interaction between THC/CBD and NAD+ metabolic pathways. CBD has CYP enzyme interactions that affect metabolism of some medications — check if other drugs you're on are CYP-sensitive if adding high-dose CBD.",
    mitigation: [
      "No significant interaction with NAD+ supplementation itself",
      "If combining CBD with other medications, check for CYP3A4 or CYP2C19 interactions",
    ],
  },
  {
    id: "nicotine",
    name: "Nicotine / Smoking",
    aliases: ["nicotine", "smoking", "cigarettes", "tobacco", "vaping", "juul", "e-cigarette", "nicotine patch"],
    category: "recreational",
    tier: "watch",
    summary: "Chronic nicotine use increases oxidative stress, which accelerates NAD+ consumption. Smoking also impairs mitochondrial function directly. Both effects work against the longevity rationale for NAD+ supplementation — not a direct drug-level interaction, but a behavioral counterforce.",
    mitigation: [
      "The mitochondrial and oxidative damage from chronic smoking significantly offsets any NAD+ benefit",
      "If the goal is longevity and cellular health, cessation has far larger impact than supplementation",
      "Nicotine replacement therapy (patch, gum) has less oxidative impact than smoking",
    ],
  },

  // ── PEPTIDES ────────────────────────────────────────────────────────────────

  {
    id: "bpc157",
    name: "BPC-157",
    aliases: ["bpc-157", "bpc157", "body protection compound", "pentadecapeptide"],
    category: "peptides",
    tier: "low",
    summary: "No known interaction between BPC-157 and NAD+ pathways. Both are used in recovery and anti-aging contexts through distinct mechanisms (BPC-157 via growth factor and nitric oxide pathways; NAD+ via mitochondrial and sirtuin pathways). Common combination in biohacking stacks.",
    mitigation: [
      "No specific adjustments needed",
      "Complementary mechanisms — no red flags for combining",
    ],
  },
  {
    id: "ipamorelin-cjc",
    name: "Ipamorelin / CJC-1295 / Sermorelin",
    aliases: ["ipamorelin", "cjc-1295", "cjc1295", "sermorelin", "ghrh", "ghrp", "growth hormone peptide", "growth hormone secretagogue"],
    category: "peptides",
    tier: "low",
    summary: "Growth hormone secretagogues work through the GH/IGF-1 axis, which doesn't directly intersect with NAD+ metabolism. Both are used in anti-aging and longevity protocols. No significant interaction established. The combination is common in longevity-oriented peptide stacks.",
    mitigation: [
      "No specific adjustments needed",
      "Common longevity stack combination — no known conflicts",
    ],
  },
  {
    id: "epitalon",
    name: "Epitalon",
    aliases: ["epitalon", "epithalon", "epithalamine", "tetrapeptide", "longevity peptide"],
    category: "peptides",
    tier: "watch",
    summary: "Epitalon (tetrapeptide Ala-Glu-Asp-Gly) is a pineal gland extract peptide studied for anti-aging properties, including telomerase activation. Often stacked with NAD+ supplementation in longevity protocols. The combination is mechanistically sensible (complementary longevity pathways) but is not characterized in any systematic human study.",
    mitigation: [
      "Common longevity protocol combination — no established safety concern",
      "Treat the combination as an n=1 personal experiment with careful tracking",
      "Epitalon research is largely Russian and difficult to evaluate for quality — approach with calibrated skepticism",
    ],
  },
  {
    id: "ghk-cu",
    name: "GHK-Cu (Copper Peptide)",
    aliases: ["ghk-cu", "ghk", "copper peptide", "glycyl-l-histidyl-l-lysine", "skin peptide"],
    category: "peptides",
    tier: "low",
    summary: "GHK-Cu operates through copper-dependent wound healing and anti-aging pathways that don't intersect significantly with NAD+ metabolism. Both appear in longevity and anti-aging stacks without known conflicts.",
    mitigation: [
      "No specific adjustments needed",
      "Complementary pathways — no interaction concerns",
    ],
  },
];

const SORT_ORDER = (a: Interaction, b: Interaction) =>
  TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || a.name.localeCompare(b.name);

export default function NadPlusInteractionsPanel() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return INTERACTIONS.filter((it) => {
      const catMatch = activeCategory === "all" || it.category === activeCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        it.name.toLowerCase().includes(q) ||
        it.aliases.some((a) => a.toLowerCase().includes(q)) ||
        it.summary.toLowerCase().includes(q)
      );
    }).sort(SORT_ORDER);
  }, [search, activeCategory]);

  const counts = useMemo(() => {
    const out: Partial<Record<Category | "all", number>> = { all: INTERACTIONS.length };
    for (const cat of Object.keys(CAT_LABELS) as (Category | "all")[]) {
      if (cat !== "all") out[cat] = INTERACTIONS.filter((i) => i.category === cat).length;
    }
    return out;
  }, []);

  return (
    <div className="reta-ix">

      {/* Intro */}
      <div className="reta-ix__intro">
        <p>
          What you&apos;re taking changes what you need to know. Search a drug, supplement, or substance below — or browse by category. Flags first, context always.
        </p>
      </div>

      {/* Search + category filter */}
      <div className="reta-ix__controls">
        <div className="reta-ix__search-wrap">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, brand, or class…"
            autoComplete="off"
            spellCheck={false}
            className="reta-ix__search"
          />
          {search && (
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); setSearch(""); }}
              className="reta-ix__search-clear"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        <div className="reta-ix__cats" role="group" aria-label="Filter by category">
          {(Object.keys(CAT_LABELS) as (Category | "all")[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`reta-ix__cat${activeCategory === cat ? " reta-ix__cat--active" : ""}`}
            >
              {CAT_LABELS[cat]}
              <span className="reta-ix__cat-count">{counts[cat]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      {search && (
        <div className="reta-ix__result-count">
          {filtered.length === 0
            ? "No matches — try a brand name or drug class"
            : `${filtered.length} match${filtered.length === 1 ? "" : "es"}`}
        </div>
      )}

      {/* Cards */}
      {filtered.length > 0 ? (
        <div className="reta-ix__grid">
          {filtered.map((it) => {
            const cfg = TIER_CONFIG[it.tier];
            return (
              <div
                key={it.id}
                className="reta-ix__card"
                style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
              >
                <div className="reta-ix__card-top">
                  <div className="reta-ix__card-name">{it.name}</div>
                  <span
                    className="reta-ix__card-badge"
                    style={{ color: cfg.color, borderColor: cfg.border }}
                  >
                    ● {cfg.label}
                  </span>
                </div>
                {it.aliases.length > 0 && (
                  <div className="reta-ix__card-aliases">
                    {it.aliases.slice(0, 6).join(", ")}
                  </div>
                )}
                <div className="reta-ix__card-summary">{it.summary}</div>
                <ul className="reta-ix__card-mit">
                  {it.mitigation.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        !search && (
          <div className="reta-ix__empty">No interactions listed for this category yet.</div>
        )
      )}

      {/* Footer */}
      <div className="reta-ix__footer">
        This is a risk-awareness map — not a complete drug interaction database. If you&apos;re on a medication not listed here, treat that as a reason to ask, not a reason to assume it&apos;s fine.
      </div>

    </div>
  );
}
