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
    id: "immunosuppressants-biologics",
    name: "Immunosuppressants / Biologics",
    aliases: ["methotrexate", "humira", "adalimumab", "etanercept", "enbrel", "infliximab", "remicade", "rituximab", "mycophenolate", "tacrolimus", "cyclosporine", "biologic", "immunosuppressant", "dmard"],
    category: "medications",
    tier: "flag",
    summary: "BPC-157 has immune-modulating effects in animal models — including anti-inflammatory and growth factor signaling that touches immune cell behavior. The interaction with prescription immunomodulators used for complex autoimmune disease (RA, IBD, lupus, transplant) is genuinely unknown. Both directions of risk are plausible: BPC-157 amplifying or counteracting immunosuppression.",
    mitigation: [
      "Clinical consultation is warranted before combining with any prescription immunosuppressant or biologic",
      "This is not a theoretical concern — BPC-157's immune interactions in animals are documented; their human translation is the unknown",
      "If you have IBD and are considering BPC-157 for GI support alongside your biologic, this specific combination needs a conversation with your gastroenterologist",
    ],
  },
  {
    id: "anticoagulants",
    name: "Anticoagulants / Blood Thinners",
    aliases: ["warfarin", "coumadin", "xarelto", "rivaroxaban", "eliquis", "apixaban", "pradaxa", "dabigatran", "heparin", "blood thinner", "anticoagulant", "inr"],
    category: "medications",
    tier: "flag",
    summary: "BPC-157 is associated with effects on the nitric oxide pathway and some platelet-related signaling in animal models. Combining with anticoagulants introduces uncertainty in the coagulation picture. Additionally, the supplement_classes for BPC-157 include anticoagulant-interacting herbs — reflecting that this category of interaction is identified even in data-sparse contexts.",
    mitigation: [
      "Inform your anticoagulation provider if you plan to add BPC-157",
      "More frequent INR monitoring if on warfarin during any new supplement or peptide addition",
      "Watch for unusual bruising, bleeding gums, or longer-than-expected bleeding from minor cuts",
    ],
  },
  {
    id: "nsaids",
    name: "NSAIDs (Chronic Use)",
    aliases: ["ibuprofen", "advil", "motrin", "naproxen", "aleve", "celecoxib", "celebrex", "diclofenac", "voltaren", "nsaid", "anti-inflammatory"],
    category: "medications",
    tier: "watch",
    summary: "Many people use BPC-157 to reduce or eliminate NSAID reliance for injury management. The interaction isn't pharmacologically dangerous — it's functionally counterproductive. NSAIDs block the prostaglandin-mediated inflammation that, in the right amount, is part of the tissue repair cascade. Using NSAIDs chronically alongside a compound intended to support that same healing process creates conflicting signals.",
    mitigation: [
      "Chronic daily NSAID use during a BPC-157 recovery protocol undermines the feedback loop — you can't tell what's healing",
      "Acute single-dose NSAID use for temporary pain relief is a different situation from chronic suppression",
      "If the goal is reducing NSAID dependency, plan the transition — don't expect to run both simultaneously and get clean results",
    ],
  },
  {
    id: "corticosteroids",
    name: "Corticosteroids",
    aliases: ["prednisone", "prednisolone", "dexamethasone", "methylprednisolone", "triamcinolone", "cortisone", "corticosteroid", "steroid injection", "epidural steroid"],
    category: "medications",
    tier: "watch",
    summary: "Corticosteroids suppress inflammation through mechanisms that overlap with BPC-157's proposed anti-inflammatory pathways. Conceptually, combining an anti-inflammatory compound with a steroid during the same tissue healing protocol creates competing or redundant signals. The practical interaction hasn't been studied — this is mechanism-based reasoning, not established data.",
    mitigation: [
      "If using corticosteroids for acute injury management, time your BPC-157 use accordingly — not during active high-dose steroid treatment",
      "Steroid injections (local, for joint/tendon) are a different context from systemic oral steroids — discuss with your prescribing provider",
      "This isn't a safety contraindication — it's a protocol coherence concern",
    ],
  },
  {
    id: "antibiotics",
    name: "Antibiotics",
    aliases: ["antibiotic", "amoxicillin", "doxycycline", "ciprofloxacin", "metronidazole", "flagyl", "azithromycin", "zithromax", "clindamycin", "cephalexin"],
    category: "medications",
    tier: "watch",
    summary: "If using oral BPC-157 for GI-related goals, antibiotic courses significantly disrupt gut microbiome — creating a confounded picture. The GI changes from antibiotics can mimic or mask BPC-157 effects (positive or negative), making evaluation difficult. There's also an injection site consideration: if antibiotics are being taken for an existing infection, do not add injectable BPC-157 until the infection is resolved.",
    mitigation: [
      "Pause evaluation of oral BPC-157 GI effects during antibiotic courses — results will be confounded",
      "Do not begin injectable BPC-157 while on antibiotics for an existing infection",
      "Allow the gut to restabilize (4–6 weeks post-antibiotic) before drawing conclusions about GI response",
    ],
  },
  {
    id: "pain-meds-opioids",
    name: "Opioids (prescribed pain management)",
    aliases: ["oxycodone", "oxycontin", "hydrocodone", "vicodin", "tramadol", "buprenorphine", "suboxone", "morphine", "opioid", "pain management"],
    category: "medications",
    tier: "watch",
    summary: "No direct pharmacological interaction with BPC-157's mechanisms. The concern is contextual: if opioids are managing pain from an injury that BPC-157 is intended to support healing on, the pain signal suppression creates the same feedback loop problem as chronic NSAIDs — you can't clearly monitor healing trajectory.",
    mitigation: [
      "Use prescribed opioids as directed — do not discontinue without physician guidance",
      "Recognize that pain-masked injuries need careful monitoring during any recovery protocol",
      "BPC-157 doesn't replace pain management — it's a potential adjunct to healing, not analgesia",
    ],
  },
  {
    id: "proton-pump-inhibitors",
    name: "Proton Pump Inhibitors / Antacids",
    aliases: ["ppi", "omeprazole", "prilosec", "pantoprazole", "protonix", "lansoprazole", "prevacid", "esomeprazole", "nexium", "antacid", "h2 blocker", "famotidine", "pepcid", "ranitidine"],
    category: "medications",
    tier: "low",
    summary: "If using oral BPC-157 for acid reflux or GI irritation alongside a PPI, the mechanisms are different and potentially complementary — PPI reduces acid; BPC-157 (if oral bioavailability is real) may support mucosal repair. No direct pharmacological conflict identified.",
    mitigation: [
      "No specific adjustments needed",
      "If both are being used for GI goals, evaluate them on different timescales — PPIs work acutely, BPC-157 (if effective) works gradually",
      "Continue PPIs as prescribed — do not discontinue to 'test' BPC-157 alone without medical guidance",
    ],
  },

  // ── STIMULANTS ──────────────────────────────────────────────────────────────

  {
    id: "caffeine",
    name: "Caffeine",
    aliases: ["caffeine", "coffee", "energy drink", "pre-workout caffeine", "espresso"],
    category: "stimulants",
    tier: "low",
    summary: "No known interaction with BPC-157 mechanisms. Caffeine has mild anti-inflammatory properties through adenosine receptor antagonism — directionally complementary but not meaningfully synergistic or conflicting at normal doses.",
    mitigation: [
      "No specific adjustments needed",
      "Normal coffee/caffeine intake has no meaningful interaction with BPC-157",
    ],
  },
  {
    id: "preworkout",
    name: "Pre-workout Supplements",
    aliases: ["preworkout", "pre-workout", "c4", "legion pulse", "ghost legend", "bucked up"],
    category: "stimulants",
    tier: "low",
    summary: "No direct interaction with BPC-157 pathways. Many pre-workouts contain nitric oxide precursors (arginine, citrulline) — BPC-157 also affects the nitric oxide pathway in animal models. Additive NOS effects are theoretical but not established or clinically concerning at supplement doses.",
    mitigation: [
      "No specific adjustments needed",
      "If a pre-workout contains high-dose arginine/citrulline alongside BPC-157 and you notice unusual cardiovascular response, note it — but this is very unlikely to be significant",
    ],
  },

  // ── SUPPLEMENTS ─────────────────────────────────────────────────────────────

  {
    id: "anticoagulant-herbs",
    name: "Anticoagulant Herbs",
    aliases: ["fish oil", "omega-3", "garlic", "ginkgo", "ginkgo biloba", "turmeric", "curcumin", "ginger", "dong quai", "vitamin e high dose", "bromelain", "nattokinase"],
    category: "supplements",
    tier: "watch",
    summary: "BPC-157 has documented interactions with anticoagulant-interacting herbs in its supplement_classes data. Herbs with blood-thinning properties (garlic, ginkgo, high-dose fish oil, turmeric) may additively amplify any platelet/coagulation effects from BPC-157. The clinical significance is low for most users, but relevant if also on warfarin or other anticoagulants.",
    mitigation: [
      "If on warfarin, NSAIDs, or other anticoagulants, be aware of the additive blood-thinning potential",
      "High-dose fish oil (3g+ EPA/DHA daily) + BPC-157 + warfarin is the scenario that warrants monitoring",
      "Standard supplement doses of garlic, turmeric, or omega-3 are unlikely to be clinically significant",
    ],
  },
  {
    id: "collagen",
    name: "Collagen / Hydrolyzed Collagen",
    aliases: ["collagen", "collagen peptides", "hydrolyzed collagen", "collagen powder", "bone broth"],
    category: "supplements",
    tier: "low",
    summary: "Complementary for connective tissue support goals. Collagen provides amino acid precursors for tissue matrix rebuilding; BPC-157 (if effective) may support the repair environment. No interaction concerns. Common combination in recovery protocols.",
    mitigation: [
      "No specific adjustments needed",
      "Complementary mechanisms — collagen provides substrate, BPC-157 may support the healing environment",
    ],
  },
  {
    id: "vitamin-c",
    name: "Vitamin C",
    aliases: ["vitamin c", "ascorbic acid", "ascorbate", "ascorbyl"],
    category: "supplements",
    tier: "low",
    summary: "Vitamin C is a cofactor in collagen synthesis — complementary for tissue repair goals. No interaction with BPC-157 pathways. Standard combination in recovery stacks.",
    mitigation: [
      "No specific adjustments needed",
      "Commonly used alongside BPC-157 in injury recovery stacks — no concerns",
    ],
  },
  {
    id: "magnesium",
    name: "Magnesium",
    aliases: ["magnesium", "magnesium glycinate", "magnesium citrate", "mag"],
    category: "supplements",
    tier: "low",
    summary: "No interaction with BPC-157 mechanisms. Magnesium supports muscle recovery and sleep — complementary goals to injury healing. No concerns.",
    mitigation: [
      "No specific adjustments needed",
      "Commonly used in recovery stacks alongside BPC-157 — no conflicts",
    ],
  },
  {
    id: "zinc",
    name: "Zinc",
    aliases: ["zinc", "zinc picolinate", "zinc bisglycinate", "zinc carnosine", "zinc sulfate"],
    category: "supplements",
    tier: "low",
    summary: "Zinc is involved in wound healing and immune function. Complementary to tissue repair goals. Zinc carnosine specifically is used for GI mucosal support — complementary to oral BPC-157 GI use. No pharmacological conflict.",
    mitigation: [
      "No specific adjustments needed",
      "Zinc carnosine for GI goals is often combined with oral BPC-157 — complementary not conflicting",
    ],
  },

  // ── RECREATIONAL ────────────────────────────────────────────────────────────

  {
    id: "alcohol",
    name: "Alcohol",
    aliases: ["alcohol", "beer", "wine", "liquor", "drinking", "ethanol"],
    category: "recreational",
    tier: "watch",
    summary: "Alcohol impairs GI mucosal healing and promotes gut permeability — directly counteracting the goals of oral BPC-157 GI use. For injectable BPC-157 used for structural recovery, alcohol also impairs tissue healing, protein synthesis, and sleep quality — all relevant to recovery trajectory. Not a pharmacological danger, but a goal-coherence problem.",
    mitigation: [
      "Heavy or regular drinking works against BPC-157's proposed healing goals through multiple mechanisms",
      "If using oral BPC-157 for GI goals, alcohol's GI mucosal damage is a direct counterforce",
      "Occasional moderate drinking is unlikely to be a significant confound — regular heavy drinking is",
    ],
  },
  {
    id: "cannabis",
    name: "Cannabis / THC",
    aliases: ["cannabis", "marijuana", "weed", "thc", "cbd", "edibles", "vaping cannabis"],
    category: "recreational",
    tier: "low",
    summary: "No direct interaction with BPC-157 mechanisms. CBD has anti-inflammatory properties — directionally complementary. THC has variable effects on inflammation depending on dose. No safety concern identified.",
    mitigation: [
      "No specific adjustments needed",
      "CBD's anti-inflammatory properties are directionally complementary to BPC-157's mechanisms",
    ],
  },
  {
    id: "nicotine",
    name: "Nicotine / Smoking",
    aliases: ["nicotine", "smoking", "cigarettes", "tobacco", "vaping", "juul", "e-cigarette"],
    category: "recreational",
    tier: "watch",
    summary: "Smoking impairs tissue healing, reduces angiogenesis, and promotes inflammation — directly working against every mechanism proposed for BPC-157's tissue repair effects. This is a behavioral counterforce to BPC-157's healing goals, not a pharmacological interaction.",
    mitigation: [
      "Smoking impairs angiogenesis — one of BPC-157's primary proposed repair mechanisms",
      "Continued smoking during a BPC-157 recovery protocol undermines the healing environment",
      "Nicotine replacement therapy has less vascular impairment than smoking",
    ],
  },

  // ── PEPTIDES ────────────────────────────────────────────────────────────────

  {
    id: "tb500",
    name: "TB-500 / Thymosin Beta-4",
    aliases: ["tb-500", "tb500", "thymosin beta-4", "thymosin beta4", "tb4"],
    category: "peptides",
    tier: "low",
    summary: "The most common BPC-157 stack partner. TB-500 operates through actin regulation and anti-inflammatory pathways distinct from BPC-157's angiogenesis/NOS mechanisms. They're genuinely complementary — different pathways targeting overlapping healing goals. This combination is widely used in recovery communities. No known pharmacological conflict.",
    mitigation: [
      "No specific adjustments needed — this is the standard BPC-157 stack partner",
      "Source quality applies to both compounds — verify CoA for each independently",
      "The combination is not studied in humans; treat outcomes as n=1 observation",
    ],
  },
  {
    id: "ipamorelin-cjc",
    name: "Ipamorelin / CJC-1295 / Sermorelin",
    aliases: ["ipamorelin", "cjc-1295", "cjc1295", "sermorelin", "ghrh", "ghrp", "growth hormone peptide"],
    category: "peptides",
    tier: "low",
    summary: "Growth hormone secretagogues affect the GH/IGF-1 axis — distinct from BPC-157's healing pathways. Both are used in recovery-focused stacks. No known pharmacological conflict. The combination adds GH-driven anabolic signaling alongside BPC-157's tissue environment support — mechanistically complementary for recovery goals.",
    mitigation: [
      "No specific adjustments needed",
      "Common recovery/anti-aging stack combination — no known conflicts",
    ],
  },
  {
    id: "nad-plus",
    name: "NAD+",
    aliases: ["nad+", "nad plus", "nmn", "nicotinamide riboside", "nr"],
    category: "peptides",
    tier: "low",
    summary: "No known interaction between NAD+ supplementation and BPC-157's healing mechanisms. Both are used in longevity and recovery contexts through distinct pathways. Common combination in comprehensive biohacking protocols.",
    mitigation: [
      "No specific adjustments needed",
      "Complementary mechanisms — no interaction concerns",
    ],
  },
  {
    id: "retatrutide-glp1",
    name: "GLP-1 Peptides (Reta / Sema / Tirz)",
    aliases: ["retatrutide", "semaglutide", "ozempic", "wegovy", "tirzepatide", "mounjaro", "zepbound", "glp-1", "glp1"],
    category: "peptides",
    tier: "low",
    summary: "GLP-1 agonists and BPC-157 operate through entirely separate mechanisms. BPC-157 is actually sometimes used alongside GLP-1 drugs to manage the GI side effects of those compounds — anecdotal community practice with no studied interaction. No pharmacological conflict identified.",
    mitigation: [
      "No specific adjustments needed",
      "BPC-157 for GLP-1 GI side effect management is a community-reported use — not contraindicated",
    ],
  },
  {
    id: "mk-677",
    name: "MK-677 / Ibutamoren",
    aliases: ["mk-677", "mk677", "ibutamoren", "gh secretagogue oral"],
    category: "peptides",
    tier: "low",
    summary: "MK-677 stimulates GH/IGF-1 through the ghrelin receptor — distinct from BPC-157's healing pathways. Common combination in recovery and muscle-focused stacks. No known pharmacological conflict.",
    mitigation: [
      "No specific adjustments needed",
      "Common recovery stack combination — no known conflicts",
    ],
  },
];

const SORT_ORDER = (a: Interaction, b: Interaction) =>
  TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || a.name.localeCompare(b.name);

export default function BpcInteractionsPanel() {
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
