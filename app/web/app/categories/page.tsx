import Link from "next/link";
import BackHomeLink from "@/components/BackHomeLink";
import { requirePaid } from "@/lib/gate";

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */

interface PathCompound {
  name: string;
  slug: string;
  role: string;
  tradeoff: string;
}

interface WellnessPath {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  framing: string;
  compounds: PathCompound[];
  synergy: string;
  watchFor: string[];
}

const PATHS: WellnessPath[] = [
  {
    id: "weight-metabolic",
    title: "Weight Loss & Metabolic Health",
    subtitle: "GLP-1 class · appetite · fat oxidation",
    color: "#3b82f6",
    framing:
      "Most people in this space are asking a single question: is there a compound that actually moves the needle on fat loss without destroying lean mass? The GLP-1 receptor agonists are the honest answer — they're the most clinically validated fat-loss peptides. The supporting compounds matter too, but they play second string.",
    compounds: [
      {
        name: "Retatrutide",
        slug: "retatrutide",
        role: "Triple incretin (GLP-1 / GIP / Glucagon). The most potent fat-loss peptide in this class. Phase 2 trials show 24% body weight reduction at 48 weeks.",
        tradeoff: "Investigational — no approved formulation. Nausea and GI side effects are significant, especially during titration. Long-term data is still being collected.",
      },
      {
        name: "Tirzepatide",
        slug: "tirzepatide",
        role: "Dual GLP-1 / GIP agonist. Approved (Mounjaro / Zepbound). 20–22% weight reduction in SURMOUNT trials. Better GI tolerability than Retatrutide.",
        tradeoff: "Prescription only. Cost is high without coverage. Muscle loss possible at high doses without resistance training.",
      },
      {
        name: "Semaglutide",
        slug: "semaglutide",
        role: "GLP-1 agonist. First-mover in the class (Wegovy / Ozempic). ~15% weight reduction in STEP trials. Most real-world data available.",
        tradeoff: "Slower than Tirzepatide for weight loss. GI effects (nausea, vomiting) are common in first weeks.",
      },
      {
        name: "5-Amino-1MQ",
        slug: "5-amino-1mq",
        role: "NNMT inhibitor. Targets adipose metabolism directly. Often stacked with GLP-1s for additive fat oxidation. May help preserve lean mass during deficit.",
        tradeoff: "Mostly preclinical data. Oral bioavailability variable. Best thought of as a supporting compound, not a primary.",
      },
      {
        name: "AOD-9604",
        slug: "aod-9604",
        role: "hGH fragment (176-191). Mimics the lipolytic action of growth hormone without IGF-1 elevation. Targets adipose tissue specifically.",
        tradeoff: "Modest effect size in humans. Requires consistency. Works best as a complement to an already-optimized protocol.",
      },
    ],
    synergy:
      "Retatrutide or Tirzepatide as the primary → AOD-9604 or 5-Amino-1MQ as a supporting layer. Resistance training is non-negotiable to preserve lean mass while in a GLP-1-driven deficit.",
    watchFor: [
      "GI side effects (nausea, vomiting, gastroparesis risk) — always titrate slowly",
      "Muscle loss — track lean mass, prioritize protein and resistance training",
      "Gallstone formation with rapid weight loss",
      "Blood sugar swings, especially if you have any pre-existing metabolic condition",
    ],
  },
  {
    id: "muscle-performance",
    title: "Muscle Building & Performance",
    subtitle: "GH secretagogues · IGF-1 · myostatin inhibition",
    color: "#f59e0b",
    framing:
      "Performance peptides fall into two buckets: compounds that raise GH/IGF-1 (which builds and preserves lean mass over time) and compounds that directly promote satellite cell activity. The GH secretagogues are the safer, more dialed-in entry point. IGF-1 analogs and Follistatin play at the edge of what's understood.",
    compounds: [
      {
        name: "CJC-1295",
        slug: "cjc-1295",
        role: "GHRH analog. Extends the GH pulse window. Paired with Ipamorelin for a synergistic GH release that stays closer to natural pulsatile rhythm.",
        tradeoff: "Effects are cumulative — takes 4–8 weeks to notice meaningful body composition changes. Requires consistent dosing.",
      },
      {
        name: "Ipamorelin",
        slug: "ipamorelin",
        role: "Selective GHRP. Stimulates GH release with minimal cortisol or prolactin elevation. Considered one of the cleanest GH secretagogues.",
        tradeoff: "Always stack with a GHRH analog for meaningful effect. Alone, pulse amplitude is modest.",
      },
      {
        name: "IGF-1 LR3",
        slug: "igf-1-lr3",
        role: "Extended half-life IGF-1 analog. Directly drives satellite cell proliferation and protein synthesis. More potent muscle-building signal than GH secretagogues.",
        tradeoff: "Not selective — increases IGF-1 signaling systemically. Hypoglycemia risk. Acromegalic effects possible with long-term misuse. This is not beginner territory.",
      },
      {
        name: "Follistatin-344",
        slug: "follistatin-344",
        role: "Myostatin inhibitor. Blocks the brake on muscle growth. Dramatic effects in animal models; human data is mostly anecdotal.",
        tradeoff: "Scarce human safety data. Effects may plateau quickly. Sourcing quality is a real concern.",
      },
      {
        name: "BPC-157",
        slug: "bpc-157",
        role: "Tissue repair and tendon healing. Athletes use it to recover from injuries faster and stay in training. Not a direct muscle-builder, but enables higher training volume.",
        tradeoff: "Limited human RCT data. Animal studies are strong but not always translatable. Most effective for injury recovery, not mass gain per se.",
      },
    ],
    synergy:
      "CJC-1295 + Ipamorelin is the safest foundation — 8–16 week cycle, dosed at night. IGF-1 LR3 is for experienced users adding a stronger anabolic signal. BPC-157 runs alongside to handle the connective tissue stress of pushing hard.",
    watchFor: [
      "IGF-1 elevation — prolonged elevation increases certain cancer risk signals",
      "Hypoglycemia with IGF-1 analogs — dose timing around meals matters",
      "Water retention and joint aches during GH elevation (usually transient)",
      "Sourcing quality — Follistatin and IGF-1 analogs are frequently mislabeled",
    ],
  },
  {
    id: "recovery-repair",
    title: "Recovery & Repair",
    subtitle: "Tissue healing · tendon · systemic repair",
    color: "#10b981",
    framing:
      "Injury recovery is where peptides have some of the most compelling real-world signal. BPC-157 and TB-500 are the two most-discussed compounds in this category, and for good reason — the mechanistic rationale is strong and the community experience is consistent, even if large-scale RCTs are absent.",
    compounds: [
      {
        name: "BPC-157",
        slug: "bpc-157",
        role: "Body protective compound derived from gastric juice. Promotes tendon, ligament, and GI tissue repair. Strong angiogenic effect — increases blood flow to injured areas.",
        tradeoff: "No large human RCTs. Animal data is compelling. Most effective when administered proximal to the injury site (local injection or systemic). Form matters (standard vs. arginate).",
      },
      {
        name: "TB-500",
        slug: "tb-500",
        role: "Thymosin Beta-4 fragment. Promotes cellular migration and actin polymerization — key for wound healing and tissue remodeling. Systemic distribution makes it good for non-localized injuries.",
        tradeoff: "Human data is limited. Often combined with BPC-157 for a synergistic repair stack. Cost is higher than BPC-157.",
      },
      {
        name: "GHK-Cu",
        slug: "ghk-cu",
        role: "Copper peptide. Promotes collagen synthesis and skin repair. Can be injected for deeper tissue effects or applied topically for surface healing.",
        tradeoff: "Primarily studied in wound healing and skin. Systemic injection for deeper injuries is less well-characterized.",
      },
      {
        name: "CJC-1295",
        slug: "cjc-1295",
        role: "Elevated GH pulse supports systemic tissue repair as a background effect. Often added to a repair stack for its cumulative recovery boost.",
        tradeoff: "Indirect effect on recovery — not targeted like BPC-157. Supporting compound, not primary.",
      },
    ],
    synergy:
      "BPC-157 + TB-500 is the gold standard repair stack. Run them together for 6–12 weeks. If the injury involves connective tissue, local BPC-157 injection near the site (subcutaneous) is commonly reported to accelerate the response.",
    watchFor: [
      "GI upset with oral BPC-157 (rare but reported)",
      "Flushing or lightheadedness with rapid TB-500 injection",
      "Healing too fast — return to training before the structure fully remodeled is a real risk",
      "Source quality — these are among the most counterfeited peptides on the market",
    ],
  },
  {
    id: "sleep",
    title: "Sleep Optimization",
    subtitle: "GH pulse · cortisol · circadian rhythm",
    color: "#7c3aed",
    framing:
      "Sleep peptides work through different levers: some amplify slow-wave GH release (the recovery pulse that happens in first-sleep stages), some modulate the stress/cortisol system that keeps people awake, and some act directly on circadian biology. The best-supported approach is GH secretagogues dosed before bed — you're amplifying a natural signal, not overriding it.",
    compounds: [
      {
        name: "CJC-1295",
        slug: "cjc-1295",
        role: "Taken before sleep, amplifies the natural GH pulse that occurs in slow-wave sleep. Improved sleep quality is a common reported effect beyond just the body composition benefits.",
        tradeoff: "Effect is indirect — it doesn't make you sleepy, it deepens the quality of slow-wave sleep you're already getting.",
      },
      {
        name: "Ipamorelin",
        slug: "ipamorelin",
        role: "Pairs with CJC-1295 for the pre-sleep GH stack. Clean mechanism, minimal cortisol elevation, well-tolerated for long-term use.",
        tradeoff: "Same as CJC-1295 — supports sleep quality, doesn't induce it.",
      },
      {
        name: "Selank",
        slug: "selank",
        role: "Anxiolytic peptide analog. Modulates GABA and serotonin signaling. Reduces cortisol. For people who can't sleep because their nervous system is activated, this is a well-regarded option.",
        tradeoff: "Nasal or sublingual administration. Effects are noticeable but subtle — this isn't a sedative.",
      },
      {
        name: "Epithalon",
        slug: "epithalon",
        role: "Pineal gland peptide. Regulates melatonin production and circadian rhythm. May extend telomere length as a secondary benefit.",
        tradeoff: "Limited modern human data. Russian-origin research. Cycling recommended — not for indefinite use.",
      },
      {
        name: "Delta Sleep-Inducing Peptide (DSIP)",
        slug: "dsip",
        role: "Directly promotes slow-wave sleep initiation. One of the few peptides specifically studied for insomnia.",
        tradeoff: "Short half-life — timing is everything. Variable response between individuals.",
      },
    ],
    synergy:
      "CJC-1295 + Ipamorelin dosed 30–60 min before sleep is the workhorse of this path. Add Selank if racing thoughts or elevated cortisol are the primary sleep disruptor. Epithalon as a periodic reset for circadian dysregulation.",
    watchFor: [
      "Vivid dreams or altered sleep architecture during first 2 weeks (usually transients)",
      "Water retention from elevated GH (may cause morning puffiness)",
      "Nasal irritation with intranasal Selank",
      "Don't stack Selank with prescription benzodiazepines without medical oversight",
    ],
  },
  {
    id: "brain-focus",
    title: "Brain Fog & Mental Clarity",
    subtitle: "Nootropic · BDNF · neuroprotective",
    color: "#6366f1",
    framing:
      "The cognitive peptide space is real but overhyped. The compounds with the best signal are the Russian-developed analogs (Semax, Selank, Dihexa) and BPC-157 — which turns out to have meaningful central nervous system effects beyond its repair reputation. These aren't stimulants. They work on the underlying architecture of how the brain signals and repairs itself.",
    compounds: [
      {
        name: "Semax",
        slug: "semax",
        role: "ACTH(4-7) analog. Increases BDNF and NGF in the brain. Clear cognitive enhancement signal — sharper focus, faster processing, better working memory. One of the most-used nootropic peptides.",
        tradeoff: "Intranasal only. Effects are noticeable but not dramatic in neurotypical users. Tolerance can develop with continuous use — cycling is recommended.",
      },
      {
        name: "Selank",
        slug: "selank",
        role: "Anxiolytic with cognitive benefits. Reduces background anxiety and cortisol, which is often the real cause of brain fog. Improved mood, calmer focus.",
        tradeoff: "More anxiolytic than stimulating. If your brain fog is driven by anxiety and cortisol, this is the better pick over Semax.",
      },
      {
        name: "Dihexa",
        slug: "dihexa",
        role: "HGF-derived compound. Extremely potent BDNF mimetic (reported 10M× more potent than BDNF). Strong signal for memory formation and neuroplasticity in animal models.",
        tradeoff: "Very limited human data. Long half-life — effects accumulate. Dosing requires extreme caution. Not for casual experimentation.",
      },
      {
        name: "BPC-157",
        slug: "bpc-157",
        role: "Increasingly recognized for CNS effects — dopamine and serotonin modulation, neuroprotection, potential for mood stabilization beyond its tissue repair actions.",
        tradeoff: "CNS effects are a secondary mechanism — this is still primarily a repair compound. The cognitive benefits are real but indirect.",
      },
      {
        name: "Epithalon",
        slug: "epithalon",
        role: "Neuroprotective at the systemic level. Telomerase activation and antioxidant effects may support long-term cognitive resilience.",
        tradeoff: "Not an acute cognitive enhancer. Best thought of as long-term brain maintenance.",
      },
    ],
    synergy:
      "Semax (morning, intranasal) for sharp days when cognitive output matters. Selank (evening or as-needed) for anxiety-driven fog. Dihexa only if you've exhausted the other options and understand what you're doing. BPC-157 as a background neuroprotective.",
    watchFor: [
      "Overstimulation with Semax — some users report agitation at higher doses",
      "Emotional blunting with Selank (rare, but possible at high doses)",
      "Dihexa accumulation — long half-life means effects compound over days",
      "Nasal irritation with intranasal peptides",
    ],
  },
  {
    id: "longevity",
    title: "Anti-Aging & Longevity",
    subtitle: "Telomeres · mitochondria · cellular repair",
    color: "#ef4444",
    framing:
      "Longevity peptides are the category where the research is genuinely exciting but also where the gap between animal data and human application is widest. The honest framing: these compounds address real biological aging mechanisms (telomere erosion, mitochondrial decline, senescent cell accumulation) — but no peptide has been proven to extend human lifespan. What they can reasonably do is optimize the conditions for slower aging.",
    compounds: [
      {
        name: "Epithalon",
        slug: "epithalon",
        role: "Tetrapeptide from the pineal gland. Activates telomerase — the enzyme that repairs telomere ends. The most-studied longevity peptide with the longest research history (Khavinson, Russian Academy of Sciences).",
        tradeoff: "Human trials are small and mostly Russian. Mechanism is solid but the clinical evidence at scale is absent. Not for continuous use — 10-day cycles recommended.",
      },
      {
        name: "GHK-Cu",
        slug: "ghk-cu",
        role: "Copper-binding tripeptide with a remarkable breadth of action. Activates 32% of genes involved in tissue repair and anti-inflammatory signaling. Declines sharply with age.",
        tradeoff: "Topical is well-studied (skin). Systemic injection effects are harder to measure. Copper accumulation is a theoretical concern with heavy systemic use.",
      },
      {
        name: "Humanin",
        slug: "humanin",
        role: "Mitochondrial peptide. Circulates in the blood and declines with age. Protective against Alzheimer's pathology, metabolic dysfunction, and apoptosis.",
        tradeoff: "Endogenous signaling molecule — exogenous dosing protocols are not established. Cutting-edge, limited human application data.",
      },
      {
        name: "SHLP-2",
        slug: "shlp-2",
        role: "Another mitochondrial-derived peptide. Regulates apoptosis, has anti-cancer signal in preclinical models, and declines with age.",
        tradeoff: "Even more frontier than Humanin. Preclinical territory. Dosing is not established.",
      },
      {
        name: "Thymalin",
        slug: "thymalin",
        role: "Thymic peptide that restores immune function which declines with age (thymic involution). Used in Russian longevity protocols for decades.",
        tradeoff: "Limited Western clinical data. Often stacked with Epithalon in traditional Russian anti-aging protocols.",
      },
    ],
    synergy:
      "Epithalon as the cornerstone — periodic cycles (2× per year). GHK-Cu topically for skin and subcutaneous for systemic support. Humanin and SHLP-2 represent the frontier layer — for those comfortable with frontier-level uncertainty.",
    watchFor: [
      "Telomerase activation is a double-edged biology — some researchers raise theoretical cancer promotion concerns with sustained activation",
      "Copper accumulation with chronic high-dose GHK-Cu",
      "These compounds are not replacements for lifestyle foundations: sleep, exercise, diet",
      "Sourcing purity is especially important for frontier peptides — concentration errors are consequential",
    ],
  },
  {
    id: "hormonal-sexual",
    title: "Hormonal Balance & Sexual Health",
    subtitle: "LH/FSH axis · libido · fertility",
    color: "#ec4899",
    framing:
      "The hormonal peptides operate on the HPG axis — the hypothalamic-pituitary-gonadal signaling chain. Unlike exogenous testosterone or estrogen, these compounds work by stimulating the body's own hormone production pathways. The distinction matters: they support the system rather than replacing it.",
    compounds: [
      {
        name: "PT-141 (Bremelanotide)",
        slug: "pt-141",
        role: "Melanocortin receptor agonist. Acts centrally on the brain's sexual arousal circuitry — not on blood flow (unlike PDE5 inhibitors). FDA-approved for HSDD in premenopausal women (Vyleesi). Used by both sexes.",
        tradeoff: "Nausea is the primary side effect — dose and timing matter. Works within 45–60 min. Blood pressure elevation possible.",
      },
      {
        name: "Kisspeptin-10",
        slug: "kisspeptin-10",
        role: "Master regulator of the HPG axis. Stimulates GnRH release, which drives LH and FSH — the hormones that govern testosterone and estrogen production. May have direct libido and social bonding effects.",
        tradeoff: "Research-only territory. Dosing protocols are not established. Effects are subtle and depend on baseline HPG function.",
      },
      {
        name: "Gonadorelin",
        slug: "gonadorelin",
        role: "Synthetic GnRH. Used clinically to stimulate LH/FSH release and assess hypothalamic function. In TRT contexts, used to prevent testicular atrophy.",
        tradeoff: "Very short half-life — subcutaneous injection timing is critical. Often used clinically, not DIY.",
      },
      {
        name: "Oxytocin",
        slug: "oxytocin",
        role: "The bonding and trust peptide. Modulates social connection, reduces anxiety, and enhances pair bonding. Intranasal use is common.",
        tradeoff: "Intranasal bioavailability varies. CNS penetration debated. Effects can feel forced at high doses (anxiety paradox in some users).",
      },
    ],
    synergy:
      "PT-141 for acute sexual function. Kisspeptin + Gonadorelin for HPG axis support when natural hormone production needs a signal boost. Oxytocin in relational/bonding contexts. These shouldn't be combined casually — hormonal pathways are interconnected.",
    watchFor: [
      "HPG axis suppression if hormonal peptides are used incorrectly or chronically",
      "PT-141 nausea — dose starting at 0.5mg, not 1.75mg",
      "Don't use hormonal peptides if you're undergoing fertility treatment without physician involvement",
      "Blood pressure monitoring with PT-141",
    ],
  },
  {
    id: "inflammation-immune",
    title: "Inflammation & Immune Support",
    subtitle: "Thymic · cytokine modulation · anti-inflammatory",
    color: "#f97316",
    framing:
      "Chronic low-grade inflammation is at the root of nearly every major disease. The immune peptides in this category don't suppress inflammation bluntly — they modulate it. The distinction is important: these compounds aim to restore normal immune tone, not override it.",
    compounds: [
      {
        name: "Thymosin Alpha-1",
        slug: "thymosin-alpha-1",
        role: "Thymic peptide with broad immunomodulatory action. Approved in 40+ countries for hepatitis and immune deficiency. Enhances T-cell and NK cell activity, modulates cytokine balance.",
        tradeoff: "Best evidence in the context of immune deficiency or chronic infection. Effects in healthy users are less dramatic. Expensive.",
      },
      {
        name: "TB-500 (Thymosin Beta-4)",
        slug: "tb-500",
        role: "Anti-inflammatory alongside its tissue repair actions. Downregulates inflammatory cytokines at injury sites. Systemic distribution.",
        tradeoff: "More effective as a repair compound than a dedicated anti-inflammatory. Used for both purposes simultaneously.",
      },
      {
        name: "BPC-157",
        slug: "bpc-157",
        role: "Strong anti-inflammatory signal, particularly in gut tissue. Modulates COX pathways without the GI damage of NSAIDs.",
        tradeoff: "Most potent for local GI inflammation. Systemic anti-inflammatory effects are real but less targeted than Thymosin Alpha-1.",
      },
      {
        name: "Thymulin",
        slug: "thymulin",
        role: "Thymic hormone involved in T-cell maturation and immune regulation. Used in aging and autoimmune contexts.",
        tradeoff: "Zinc-dependent activity — co-supplementation with zinc recommended. Limited human clinical data.",
      },
      {
        name: "LL-37",
        slug: "ll-37",
        role: "Human host defense peptide. Antimicrobial and immunomodulatory. Bridges innate and adaptive immunity.",
        tradeoff: "Injection site reactions common. Dual nature (pro-inflammatory in some contexts) means it's not straightforwardly anti-inflammatory.",
      },
    ],
    synergy:
      "Thymosin Alpha-1 as the systemic immune modulator. BPC-157 for gut-origin inflammation. TB-500 when the inflammation is injury-related. Thymulin for age-related immune decline.",
    watchFor: [
      "Immune activation can worsen autoimmune conditions — consult a physician if you have an autoimmune diagnosis",
      "Thymosin Alpha-1 has a strong safety record but shouldn't be self-prescribed for diagnosed immune conditions",
      "LL-37 injection site reactions can be significant — start low",
      "These compounds don't replace addressing upstream inflammation drivers: sleep, diet, stress",
    ],
  },
  {
    id: "gut-digestion",
    title: "Gut Health & Digestion",
    subtitle: "GI repair · motility · barrier integrity",
    color: "#14b8a6",
    framing:
      "Gut-focused peptide use is dominated by BPC-157, and for good reason — the evidence base for GI tissue repair is stronger here than in almost any other application. The question isn't whether it works for GI issues; it's which form, which delivery route, and what underlying condition you're addressing.",
    compounds: [
      {
        name: "BPC-157",
        slug: "bpc-157",
        role: "Derived from gastric juice — it was designed for GI protection. Promotes mucosal healing, barrier integrity, and motility normalization. Strong signal for IBD, IBS, gastric ulcers, and leaky gut.",
        tradeoff: "Oral vs. injectable matters: oral reaches GI tissue more directly for luminal issues; injectable is better for systemic effects. Standard vs. arginate form also affects stability.",
      },
      {
        name: "BPC-157 Arginate",
        slug: "bpc-157-arginate",
        role: "Salt form of BPC-157. More stable, better suited for oral use and potentially higher bioavailability in the gut. Preferred form for GI-specific applications.",
        tradeoff: "Slightly different bioavailability profile than standard BPC-157. Some users prefer one over the other — the research doesn't definitively favor either.",
      },
      {
        name: "Selank",
        slug: "selank",
        role: "Not primarily a gut compound, but anxiolytic action on the gut-brain axis can help with stress-driven GI dysfunction (IBS, functional dyspepsia).",
        tradeoff: "Indirect mechanism for GI issues. More appropriate when stress/anxiety is the primary driver of gut symptoms.",
      },
      {
        name: "LL-37",
        slug: "ll-37",
        role: "Host defense peptide with antimicrobial properties relevant in gut dysbiosis contexts. May help restore microbial balance.",
        tradeoff: "Not a targeted GI compound. More appropriate for gut infections or severe dysbiosis, not general gut support.",
      },
    ],
    synergy:
      "BPC-157 Arginate (oral) as the primary for luminal GI repair. Standard BPC-157 (systemic) when the issue extends beyond the gut lumen. Selank as the gut-brain axis complement.",
    watchFor: [
      "BPC-157 can affect motility — both direction possible depending on the underlying state",
      "Quality sourcing is critical for oral peptides — degradation during transit is a real concern",
      "These are supportive tools, not cures for serious GI disease — IBD, Crohn's, celiac require medical management",
      "Peptides don't address diet and microbiome composition — you can't out-supplement a bad diet",
    ],
  },
  {
    id: "skin-cosmetic",
    title: "Skin & Cosmetic",
    subtitle: "Collagen · anti-aging · wound healing",
    color: "#84cc16",
    framing:
      "Topical peptides are one of the few areas where there's solid cosmetic clinical evidence — particularly for copper peptides and palmitoyl tripeptides. The distinction between surface cosmetic application and deeper systemic effects matters: topical is well-characterized; injectable for cosmetic purposes is a different risk calculation.",
    compounds: [
      {
        name: "GHK-Cu",
        slug: "ghk-cu",
        role: "Copper tripeptide. Stimulates collagen, elastin, and glycosaminoglycan synthesis. Anti-inflammatory. Promotes hair follicle health. The most evidence-backed cosmetic peptide.",
        tradeoff: "Topical form is the safest application. Concentration in formulations varies widely — quality sourcing matters.",
      },
      {
        name: "Palmitoyl Pentapeptide-4 (Matrixyl)",
        slug: "palmitoyl-pentapeptide-4",
        role: "Procollagen stimulator. Signals fibroblasts to produce more collagen. Found in many mainstream anti-aging skincare products, but concentration in commercial products is often too low to be effective.",
        tradeoff: "Cosmetic-grade only (topical). Effective concentration requires research-grade formulations, not typical OTC products.",
      },
      {
        name: "Palmitoyl Tripeptide-1",
        slug: "palmitoyl-tripeptide-1",
        role: "TGF-β pathway activator. Works synergistically with Palmitoyl Pentapeptide-4 (common commercial combination). Reduces wrinkle depth and skin laxity in clinical studies.",
        tradeoff: "Same limitations as Pentapeptide-4 regarding concentration. Best used in combination.",
      },
      {
        name: "Epithalon",
        slug: "epithalon",
        role: "Beyond longevity applications, Epithalon has direct skin anti-aging effects — promotes melatonin production and antioxidant defense in skin tissue.",
        tradeoff: "Primary application is systemic longevity. Skin benefits are a secondary effect.",
      },
      {
        name: "Thymosin Beta-4 (TB-500)",
        slug: "tb-500",
        role: "Accelerates wound healing and scar remodeling when applied topically or systemically. Used for post-surgical recovery and scar reduction.",
        tradeoff: "Injectable for systemic wound healing effects. Topical application is less studied than systemic.",
      },
    ],
    synergy:
      "GHK-Cu as the topical cornerstone — daily application in a well-formulated product. Palmitoyl Pentapeptide-4 + Tripeptide-1 combined for anti-wrinkle. TB-500 for active wound healing or scar management.",
    watchFor: [
      "Copper accumulation with heavy topical use is theoretical but unlikely at normal concentrations",
      "Skin purging responses in the first 2–4 weeks of GHK-Cu use",
      "Peptides are denatured by high heat — formulation and storage stability matter",
      "Topical and injectable applications have different risk profiles — don't conflate them",
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */

export default async function WellnessPathsPage() {
  await requirePaid();

  return (
    <main className="pt-well">

      {/* ── Hero ── */}
      <div className="pt-well__hero">
        <div className="pt-well__hero-inner">
          <div className="pt-well__hero-back">
            <BackHomeLink />
          </div>
          <p className="pt-well__hero-eyebrow">Pro</p>
          <h1 className="pt-well__hero-title">Wellness Paths</h1>
          <p className="pt-well__hero-sub">
            Start with a goal, not a compound name. Each path maps a symptom cluster to the peptides most relevant to it — with honest tradeoffs, not hype.
          </p>
          <p className="pt-well__hero-note">
            {PATHS.length} paths &middot; {PATHS.reduce((n, p) => n + p.compounds.length, 0)} compounds covered
          </p>
        </div>
      </div>

      {/* ── Paths ── */}
      <div className="pt-well__body">
        <div className="pt-well__grid">
          {PATHS.map((path) => (
            <details key={path.id} className="pt-well__path" id={path.id}>
              <summary className="pt-well__path-summary">
                <span
                  className="pt-well__path-accent"
                  style={{ background: path.color }}
                />
                <div className="pt-well__path-hd">
                  <span className="pt-well__path-title">{path.title}</span>
                  <span className="pt-well__path-subtitle">{path.subtitle}</span>
                </div>
                <span className="pt-well__path-chevron" aria-hidden="true">
                  ›
                </span>
              </summary>

              <div className="pt-well__path-body">

                {/* Framing */}
                <p className="pt-well__framing">{path.framing}</p>

                {/* Compounds */}
                <div className="pt-well__compounds-label">Compounds</div>
                <div className="pt-well__compounds">
                  {path.compounds.map((c) => (
                    <div key={c.slug} className="pt-well__compound">
                      <div className="pt-well__compound-hd">
                        <Link
                          href={`/peptide/${c.slug}`}
                          className="pt-well__compound-name"
                          style={{ color: path.color }}
                        >
                          {c.name}
                        </Link>
                      </div>
                      <p className="pt-well__compound-role">{c.role}</p>
                      <p className="pt-well__compound-tradeoff">
                        <span className="pt-well__tradeoff-label">Trade-off:</span> {c.tradeoff}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Synergy */}
                <div className="pt-well__synergy">
                  <div className="pt-well__synergy-label">How they work together</div>
                  <p className="pt-well__synergy-text">{path.synergy}</p>
                </div>

                {/* Watch For */}
                <div className="pt-well__watch">
                  <div className="pt-well__watch-label">Watch for</div>
                  <ul className="pt-well__watch-list">
                    {path.watchFor.map((w, i) => (
                      <li key={i} className="pt-well__watch-item">{w}</li>
                    ))}
                  </ul>
                </div>

              </div>
            </details>
          ))}
        </div>

        {/* Footer note */}
        <div className="pt-well__footer">
          <p className="pt-well__footer-text">
            Wellness Paths are a starting framework, not medical advice. Individual response varies significantly. Use these as a map to start exploring — then dig into the individual compound profiles for the full picture.
          </p>
          <div className="pt-well__footer-links">
            <Link href="/stack-builder" className="pt-well__footer-link">
              Build a stack →
            </Link>
            <Link href="/stacks" className="pt-well__footer-link">
              Browse curated stacks →
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}
