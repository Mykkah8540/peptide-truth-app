import Link from "next/link";
import BackHomeLink from "@/components/BackHomeLink";
import { requirePaid } from "@/lib/gate";

/* ─────────────────────────────────────────────────────────────
   DATA TYPES
───────────────────────────────────────────────────────────── */

interface PathCompound {
  name: string;
  slug: string;
  tier: "primary" | "support";
  role: string;
  tradeoff: string;
}

interface SupportConsideration {
  label: string;
  text: string;
}

interface WellnessPath {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  framing: string;
  primaryNote: string;   // how to use the primary tier: "pick one", "always pair these", etc.
  supportNote: string;   // how to use the support tier
  compounds: PathCompound[];
  synergy: string;
  considerations: SupportConsideration[];
  watchFor: string[];
}

/* ─────────────────────────────────────────────────────────────
   PATH DATA
───────────────────────────────────────────────────────────── */

const PATHS: WellnessPath[] = [
  {
    id: "weight-metabolic",
    title: "Weight Loss & Metabolic Health",
    subtitle: "GLP-1 class · appetite · fat oxidation",
    color: "#3b82f6",
    framing:
      "Most people asking about fat loss peptides are really asking about the GLP-1 class — and that's the right starting point. They're the most clinically validated fat-loss compounds by a wide margin. The supporting compounds help with fat oxidation or lean mass preservation but are additions, not substitutes.",
    primaryNote: "Pick one GLP-1 based on availability and your tolerance for side effects. Retatrutide is the most potent but investigational; Tirzepatide is the sweet spot for most; Semaglutide has the most real-world data.",
    supportNote: "Optional additions — add one if you want to layer in fat oxidation or lean mass support on top of the primary.",
    compounds: [
      {
        name: "Retatrutide",
        slug: "retatrutide",
        tier: "primary",
        role: "Triple incretin (GLP-1 / GIP / Glucagon). The most potent in the class. Phase 2 trials show ~24% body weight reduction at 48 weeks.",
        tradeoff: "Investigational — no approved formulation. Significant GI side effects during titration. Long-term safety data still being collected.",
      },
      {
        name: "Tirzepatide",
        slug: "tirzepatide",
        tier: "primary",
        role: "Dual GLP-1 / GIP agonist. Approved (Mounjaro / Zepbound). 20–22% weight reduction in SURMOUNT trials. Better GI tolerability than Retatrutide.",
        tradeoff: "Prescription only. Cost is high without coverage. Muscle loss possible at high doses without resistance training.",
      },
      {
        name: "Semaglutide",
        slug: "semaglutide",
        tier: "primary",
        role: "GLP-1 agonist (Wegovy / Ozempic). ~15% weight reduction in STEP trials. Most real-world data of any compound in this category.",
        tradeoff: "Slower weight loss than Tirzepatide. GI effects common in first weeks. Weekly injection.",
      },
      {
        name: "5-Amino-1MQ",
        slug: "5-amino-1mq",
        tier: "support",
        role: "NNMT inhibitor. Targets adipose metabolism directly. Often stacked with GLP-1s for additive fat oxidation. May help preserve lean mass during deficit.",
        tradeoff: "Mostly preclinical data. Oral bioavailability variable. A supporting layer, not a primary driver.",
      },
      {
        name: "AOD-9604",
        slug: "aod-9604",
        tier: "support",
        role: "hGH fragment (176-191). Mimics the lipolytic action of growth hormone without IGF-1 elevation. Targets adipose tissue specifically.",
        tradeoff: "Modest effect size in humans. Works best as a complement to an already-running GLP-1 protocol.",
      },
    ],
    synergy:
      "Your chosen GLP-1 does the heavy lifting. If adding a support compound, AOD-9604 is the more targeted fat oxidation option; 5-Amino-1MQ is more experimental. Resistance training is non-negotiable alongside any GLP-1 — you will lose muscle without it.",
    considerations: [
      {
        label: "Protect your muscle",
        text: "Your appetite drops significantly — but your protein needs don't. Aim for 0.8–1g of protein per pound of lean body mass daily. Most people on GLP-1s undereat protein and lose muscle alongside the fat. That's not the goal.",
      },
      {
        label: "Lift weights",
        text: "These compounds can't protect lean mass without a mechanical stimulus. Even 3 sessions of full-body resistance training per week makes a significant difference. Don't skip this step.",
      },
      {
        label: "Watch your electrolytes",
        text: "Reduced appetite means reduced sodium, potassium, and magnesium. Low electrolytes make nausea and fatigue worse. Consider an electrolyte supplement, especially in the first 4–6 weeks.",
      },
      {
        label: "Gallbladder support",
        text: "Rapid weight loss increases gallstone risk. Losing more than 1.5–2% of body weight per week, staying active, and maintaining adequate dietary fat (zero-fat diets worsen the risk) all matter. TUDCA is a common addition.",
      },
      {
        label: "Titrate slowly",
        text: "GI side effects are worst in weeks 1–4 and almost always dose-related. Don't rush to higher doses. Small frequent meals, ginger tea, and avoiding high-fat food during titration helps most people get through the adaptation window.",
      },
      {
        label: "Get a baseline",
        text: "HbA1c, fasting insulin, lipid panel, and a DEXA or InBody scan before starting gives you something real to measure against. Weight alone doesn't tell you if you're losing fat or muscle.",
      },
    ],
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
      "Performance peptides fall into two buckets: compounds that raise GH/IGF-1 over time and compounds that directly promote satellite cell activity. CJC-1295 + Ipamorelin is the safest and most established foundation — always used as a pair. IGF-1 LR3 and Follistatin are a more advanced layer for experienced users only.",
    primaryNote: "CJC-1295 and Ipamorelin are always used together — treat them as one stack. They're your foundation for this path. Don't run just one.",
    supportNote: "Add one support compound if you have a specific goal: IGF-1 LR3 for a stronger anabolic signal (advanced users only), BPC-157 if injury recovery is limiting your training.",
    compounds: [
      {
        name: "CJC-1295",
        slug: "cjc-1295",
        tier: "primary",
        role: "GHRH analog. Extends the GH pulse window. Always paired with Ipamorelin for synergistic GH release that stays close to natural pulsatile rhythm.",
        tradeoff: "Effects are cumulative — takes 4–8 weeks to notice meaningful changes. Must be paired with Ipamorelin.",
      },
      {
        name: "Ipamorelin",
        slug: "ipamorelin",
        tier: "primary",
        role: "Selective GHRP. Stimulates GH release with minimal cortisol or prolactin elevation. The cleanest GH secretagogue — always paired with CJC-1295.",
        tradeoff: "Alone, pulse amplitude is modest. The CJC-1295 + Ipamorelin pair is the combination that produces meaningful GH elevation.",
      },
      {
        name: "IGF-1 LR3",
        slug: "igf-1-lr3",
        tier: "support",
        role: "Extended half-life IGF-1 analog. Directly drives satellite cell proliferation and protein synthesis. Stronger anabolic signal than GH secretagogues alone. Advanced users only.",
        tradeoff: "Not selective — increases IGF-1 systemically. Hypoglycemia risk. Not beginner territory. Run alongside the CJC/Ipa foundation, not instead of it.",
      },
      {
        name: "Follistatin-344",
        slug: "follistatin-344",
        tier: "support",
        role: "Myostatin inhibitor. Blocks the brake on muscle growth. Dramatic effects in animal models; human data is mostly anecdotal.",
        tradeoff: "Scarce human safety data. Frontier territory. Sourcing quality is a real concern.",
      },
      {
        name: "BPC-157",
        slug: "bpc-157",
        tier: "support",
        role: "Tissue repair and tendon healing. For athletes pushing hard volume — BPC-157 helps handle the connective tissue stress and keeps you in training.",
        tradeoff: "Not a direct muscle-builder. Add this if injury or joint stress is your limiting factor, not if your limiting factor is anabolism.",
      },
    ],
    synergy:
      "CJC-1295 + Ipamorelin dosed before bed is the foundation — 8–16 weeks. Add one support compound based on your specific gap: IGF-1 LR3 if you want a stronger anabolic signal and you're an experienced user; BPC-157 if injury is your bottleneck.",
    considerations: [
      {
        label: "Sleep is the delivery mechanism",
        text: "GH peptides amplify the GH pulse that occurs during slow-wave sleep. If you're averaging 6 hours or less, you're getting a fraction of the return. Fix sleep before optimizing peptides.",
      },
      {
        label: "Food is the raw material",
        text: "Peptides create the hormonal environment for growth — they don't provide the substrate. 1g of protein per pound of bodyweight minimum. You cannot out-peptide a caloric deficit when the goal is mass.",
      },
      {
        label: "Progressive overload is the signal",
        text: "GH secretagogues support tissue building; they don't create it. The anabolic environment needs a training stimulus to act on. If you're not consistently getting stronger over time, elevated GH has nothing to work with.",
      },
      {
        label: "Nail the basics first",
        text: "Creatine (5g/day), zinc (15–30mg), and magnesium (300–400mg) are cheap, well-evidenced, and most people are deficient in at least one. Optimize these before adding peptides.",
      },
      {
        label: "Timing matters",
        text: "CJC-1295 + Ipamorelin is most effective dosed 30–60 minutes before sleep. GH pulsatility peaks during slow-wave sleep — you're amplifying a natural pattern.",
      },
    ],
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
      "Injury recovery is where peptides have some of the most compelling real-world signal. BPC-157 and TB-500 are the two cornerstones — most people run both together. The supporting compounds layer in when you have a specific type of injury or want to accelerate the GH-side of tissue repair.",
    primaryNote: "BPC-157 and TB-500 are typically run together as the core repair stack. If cost is a constraint, BPC-157 alone is the stronger single-compound choice for most injury types.",
    supportNote: "Add one support compound based on the specific injury type: GHK-Cu for skin or superficial tissue, CJC-1295 + Ipamorelin if you want a systemic GH recovery boost on top.",
    compounds: [
      {
        name: "BPC-157",
        slug: "bpc-157",
        tier: "primary",
        role: "Body protective compound derived from gastric juice. Promotes tendon, ligament, and GI tissue repair. Strong angiogenic effect — increases blood flow to injured areas.",
        tradeoff: "No large human RCTs. Animal data is compelling. Form matters (standard vs. arginate). Most effective administered close to the injury site.",
      },
      {
        name: "TB-500",
        slug: "tb-500",
        tier: "primary",
        role: "Thymosin Beta-4 fragment. Promotes cellular migration and tissue remodeling. Systemic distribution makes it good for non-localized or multi-site injuries.",
        tradeoff: "Human data is limited. More expensive than BPC-157. The BPC-157 + TB-500 combination is more potent than either alone.",
      },
      {
        name: "GHK-Cu",
        slug: "ghk-cu",
        tier: "support",
        role: "Copper peptide. Promotes collagen synthesis. Useful for skin, wound, and superficial tissue healing — topically or subcutaneous near the site.",
        tradeoff: "More targeted to surface and collagen-rich tissue than deep structural injury.",
      },
      {
        name: "CJC-1295",
        slug: "cjc-1295",
        tier: "support",
        role: "Elevated GH pulse supports systemic tissue repair as a background effect. Add to a repair stack when you want to accelerate overall recovery, not just the injured site.",
        tradeoff: "Indirect effect. Supporting layer, not targeted like BPC-157. Pair with Ipamorelin if adding.",
      },
    ],
    synergy:
      "BPC-157 + TB-500 for 6–12 weeks is the standard repair stack. For localized soft tissue injuries, subcutaneous injection of BPC-157 near the site is commonly reported to accelerate response. Add GHK-Cu if skin or collagen remodeling is also a goal.",
    considerations: [
      {
        label: "Don't rush back",
        text: "This is the most common mistake. Peptides accelerate tissue healing — but not structural strength. The area feeling better and the area being structurally ready to load are different things. Return to full training gradually.",
      },
      {
        label: "Give it the cofactors",
        text: "Collagen synthesis requires vitamin C and zinc. Without adequate vitamin C (500mg+ during healing) and zinc (15–30mg), the repair signaling has less raw material to work with.",
      },
      {
        label: "Sleep is where repair happens",
        text: "Most soft tissue repair occurs during slow-wave sleep when GH peaks. Chronically poor sleep significantly extends healing timelines — no peptide stack overcomes this.",
      },
      {
        label: "Manage stress seriously",
        text: "Chronic cortisol directly impairs tissue repair. Heavy psychological stress during recovery lengthens healing timelines regardless of what you're taking. This isn't soft advice — it's physiology.",
      },
    ],
    watchFor: [
      "GI upset with oral BPC-157 (rare but reported)",
      "Flushing or lightheadedness with rapid TB-500 injection",
      "Healing too fast — the area feels better before it's structurally ready for load",
      "Source quality — these are among the most counterfeited peptides on the market",
    ],
  },
  {
    id: "sleep",
    title: "Sleep Optimization",
    subtitle: "GH pulse · cortisol · circadian rhythm",
    color: "#7c3aed",
    framing:
      "Sleep peptides work through different levers. CJC-1295 + Ipamorelin amplify the GH pulse that happens during slow-wave sleep — good if your sleep architecture is intact but recovery quality is poor. Selank addresses the cortisol/nervous system side — good if you can't fall asleep or stay asleep due to a wired mind. Most people benefit from both.",
    primaryNote: "CJC-1295 and Ipamorelin are always used together — dose them as a pair 30–60 minutes before sleep. They're your foundation.",
    supportNote: "Add Selank if racing thoughts or cortisol are your primary sleep disruptor. Add Epithalon or DSIP only if you've tried the foundation and want to address circadian rhythm specifically.",
    compounds: [
      {
        name: "CJC-1295",
        slug: "cjc-1295",
        tier: "primary",
        role: "Taken before sleep, amplifies the natural GH pulse that occurs in slow-wave sleep. Improved sleep quality and morning recovery are commonly reported.",
        tradeoff: "Doesn't make you sleepy — deepens the quality of slow-wave sleep you're already getting. Must be paired with Ipamorelin.",
      },
      {
        name: "Ipamorelin",
        slug: "ipamorelin",
        tier: "primary",
        role: "Pairs with CJC-1295 for the pre-sleep GH stack. Clean mechanism, minimal cortisol elevation, well-tolerated for long-term use.",
        tradeoff: "Alone, pulse amplitude is modest. The pair is the protocol.",
      },
      {
        name: "Selank",
        slug: "selank",
        tier: "support",
        role: "Anxiolytic peptide. Modulates GABA and serotonin signaling, reduces cortisol. Best option if racing thoughts or nervous system activation is keeping you awake.",
        tradeoff: "Anxiolytic, not sedating — it calms the system, doesn't knock you out. Nasal or sublingual administration.",
      },
      {
        name: "Epitalon",
        slug: "epitalon",
        tier: "support",
        role: "Pineal gland peptide. Regulates melatonin production and circadian rhythm. Useful for shift workers or anyone with disrupted sleep timing.",
        tradeoff: "Primarily addresses circadian rhythm, not sleep quality. Cycling recommended.",
      },
      {
        name: "DSIP",
        slug: "dsip",
        tier: "support",
        role: "Delta Sleep-Inducing Peptide. Directly promotes slow-wave sleep initiation. One of the few peptides specifically studied for insomnia.",
        tradeoff: "Short half-life — timing is critical. Variable individual response.",
      },
    ],
    synergy:
      "CJC-1295 + Ipamorelin before bed as the foundation. Selank for the cortisol/anxiety layer. Most people who struggle with sleep quality need both layers addressed. Epitalon and DSIP are periodic additions, not daily compounds.",
    considerations: [
      {
        label: "Hygiene comes first",
        text: "Peptides amplify sleep quality — they don't create it from nothing. Blue light in the 2 hours before bed, cool room temperature (65–68°F), consistent bedtime, and no alcohol are the substrate these compounds act on.",
      },
      {
        label: "Know which problem you have",
        text: "If you can't fall asleep because your mind is racing — that's a cortisol and nervous system problem. Selank is your first add. If you fall asleep fine but wake unrefreshed — that's a slow-wave sleep and GH recovery issue. CJC + Ipa is the primary answer.",
      },
      {
        label: "Magnesium is underrated",
        text: "Magnesium glycinate (200–400mg before bed) improves slow-wave sleep for most people. It's inexpensive and compounds well with sleep peptides. Add it alongside, not instead of the stack.",
      },
      {
        label: "Alcohol kills the return",
        text: "Alcohol suppresses slow-wave and REM sleep — exactly what GH peptides are trying to enhance. Even 1–2 drinks significantly blunts the overnight GH pulse. Hard to have it both ways.",
      },
    ],
    watchFor: [
      "Vivid dreams or altered sleep architecture in the first 2 weeks (usually transient)",
      "Morning puffiness from water retention during GH elevation",
      "Nasal irritation with intranasal Selank",
      "Don't combine Selank with prescription benzodiazepines without medical oversight",
    ],
  },
  {
    id: "brain-focus",
    title: "Brain Fog & Mental Clarity",
    subtitle: "Nootropic · BDNF · neuroprotective",
    color: "#6366f1",
    framing:
      "The right cognitive peptide depends on why your cognition is suffering. Semax is the go-to for focus and processing speed — it's the most widely used nootropic peptide. Selank is better when anxiety is the root cause of brain fog. Choose based on your symptom, not arbitrarily.",
    primaryNote: "Pick one primary based on your main symptom: Semax for focus/processing deficits, Selank if anxiety or stress is driving the fog. Don't start both simultaneously — you won't know what's working.",
    supportNote: "Add one support compound after you've established a baseline with your primary. BPC-157 for background neuroprotection, Epitalon for long-term brain maintenance. Dihexa is frontier territory — experienced users only.",
    compounds: [
      {
        name: "Semax",
        slug: "semax",
        tier: "primary",
        role: "ACTH(4-7) analog. Increases BDNF and NGF. Clear cognitive enhancement signal — sharper focus, faster processing, better working memory. Most-used nootropic peptide.",
        tradeoff: "Intranasal only. Tolerance can develop — cycle it. Best when cognitive output (focus, processing) is the primary complaint.",
      },
      {
        name: "Selank",
        slug: "selank",
        tier: "primary",
        role: "Anxiolytic with cognitive benefits. Reduces background anxiety and cortisol. Improved mood, calmer focus. Best when anxiety or stress is the root cause of brain fog.",
        tradeoff: "More anxiolytic than stimulating. If your fog is driven by anxiety, this is the right primary. If your fog is purely cognitive (not anxiety-driven), Semax is the better pick.",
      },
      {
        name: "BPC-157",
        slug: "bpc-157",
        tier: "support",
        role: "Increasingly recognized for CNS effects — dopamine and serotonin modulation, neuroprotection, mood stabilization alongside its primary tissue repair actions.",
        tradeoff: "CNS effects are secondary. A good background neuroprotective that many users run for other reasons and notice cognitive improvements as a side effect.",
      },
      {
        name: "Dihexa",
        slug: "dihexa",
        tier: "support",
        role: "HGF-derived compound. Extremely potent BDNF mimetic. Strong signal for memory formation and neuroplasticity in animal models.",
        tradeoff: "Very limited human data. Long half-life — effects accumulate. Dosing requires extreme caution. Not for casual experimentation.",
      },
      {
        name: "Epitalon",
        slug: "epitalon",
        tier: "support",
        role: "Neuroprotective at the systemic level. Antioxidant and telomerase effects may support long-term cognitive resilience.",
        tradeoff: "Not an acute cognitive enhancer. Long-term brain maintenance, not a daily nootropic.",
      },
    ],
    synergy:
      "Choose one primary and run it for 4 weeks before adding anything. Semax (morning) or Selank (evening/as-needed) establishes the baseline. BPC-157 as a background layer is additive. Dihexa only if you've exhausted the rest and understand the risk profile.",
    considerations: [
      {
        label: "Find the root cause",
        text: "The three most common brain fog drivers — poor sleep, chronic stress, and metabolic dysfunction (blood sugar, low thyroid) — all respond to lifestyle. Fixing those makes peptides work better. Skipping them means you're treating symptoms.",
      },
      {
        label: "Support the neurotransmitter pathways",
        text: "Semax and Dihexa target BDNF/NGF pathways that work better with acetylcholine precursors available. Alpha-GPC (300–600mg) or CDP-choline alongside nootropic peptides gives those pathways more substrate. Meaningful addition, not optional.",
      },
      {
        label: "Omega-3s matter",
        text: "DHA is a structural component of neural membranes and affects receptor sensitivity. 2–3g EPA+DHA daily compounds with peptide effects. Most people with brain fog are deficient in omega-3s.",
      },
      {
        label: "Caffeine dependence masks the problem",
        text: "Cognitive peptides are not stimulants. If caffeine is masking HPA axis fatigue, no nootropic peptide fixes it. Tapering caffeine dependence often restores more clarity than any stack.",
      },
    ],
    watchFor: [
      "Overstimulation with Semax — agitation possible at higher doses",
      "Emotional blunting with Selank at high doses (rare but reported)",
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
      "Longevity peptides target real biological aging mechanisms — telomere erosion, mitochondrial decline, cellular repair capacity. But the gap between animal data and established human protocols is wide. Epitalon is the most-studied cornerstone. Everything else layers on top, with diminishing evidence at each step.",
    primaryNote: "Epitalon is your foundation — the most-studied longevity peptide with the longest research history. Run it in cycles (typically a 10-day course 1–2× per year), not continuously.",
    supportNote: "Add one support compound based on your specific longevity focus: GHK-Cu for tissue and skin repair, Humanin or SHLP-2 if you're specifically targeting mitochondrial aging (frontier territory), Thymulin for immune aging.",
    compounds: [
      {
        name: "Epitalon",
        slug: "epitalon",
        tier: "primary",
        role: "Tetrapeptide from the pineal gland. Activates telomerase — the enzyme that repairs telomere ends. The most-studied longevity peptide with decades of Russian research behind it.",
        tradeoff: "Human trials are small and mostly Russian. Not for continuous use — 10-day cycles recommended. Mechanism is solid but large-scale clinical evidence is absent.",
      },
      {
        name: "GHK-Cu",
        slug: "ghk-cu",
        tier: "support",
        role: "Copper-binding tripeptide. Activates genes involved in tissue repair and anti-inflammatory signaling. Declines with age. Topical for skin; systemic injection for broader effects.",
        tradeoff: "Topical use is well-studied. Systemic effects harder to measure. Copper accumulation is a theoretical concern with heavy systemic use.",
      },
      {
        name: "Humanin",
        slug: "humanin",
        tier: "support",
        role: "Mitochondrial peptide. Protective against Alzheimer's pathology, metabolic dysfunction, and cellular apoptosis. Circulates in blood and declines with age.",
        tradeoff: "Exogenous dosing protocols not established. Cutting-edge, limited human application data. Frontier territory.",
      },
      {
        name: "SHLP-2",
        slug: "shlp-2",
        tier: "support",
        role: "Mitochondrial-derived peptide. Regulates apoptosis, has anti-cancer signal in preclinical models, declines with age.",
        tradeoff: "Preclinical territory. Dosing not established. Even more frontier than Humanin.",
      },
      {
        name: "Thymulin",
        slug: "thymulin",
        tier: "support",
        role: "Thymic hormone involved in T-cell maturation and immune regulation. Addresses age-related immune decline (thymic involution).",
        tradeoff: "Zinc-dependent — zinc co-supplementation recommended. Limited Western clinical data.",
      },
    ],
    synergy:
      "Epitalon as the periodic cornerstone. GHK-Cu topically as a daily addition. The mitochondrial peptides (Humanin, SHLP-2) represent the frontier layer — for those who've read the primary literature and understand the uncertainty.",
    considerations: [
      {
        label: "Measure or it doesn't count",
        text: "Longevity interventions without tracking biomarkers are guesswork. At minimum, establish a baseline: telomere length testing, inflammatory markers (hsCRP, IL-6), metabolic panel, and DEXA. You need a before to know if anything is working.",
      },
      {
        label: "These are multipliers, not replacements",
        text: "Longevity peptides amplify a healthy baseline — they don't offset poor sleep, chronic stress, or a sedentary lifestyle. If the foundations aren't in place, you're getting minimal return. Fix lifestyle first.",
      },
      {
        label: "Consider the NAD+ pathway",
        text: "Epitalon and GHK-Cu address telomere and repair pathways. NMN or NR for NAD+ support covers the mitochondrial energy/sirtuin side they don't directly target. Different pathways, additive effects.",
      },
      {
        label: "Telomerase is a double-edged mechanism",
        text: "Telomerase activation is what makes Epitalon interesting — and also why cycling matters. Cancer cells use telomerase to become immortal. Run Epitalon in periodic cycles, not continuously, for this reason.",
      },
    ],
    watchFor: [
      "Telomerase activation — theoretical cancer promotion with sustained use; always cycle",
      "Copper accumulation with chronic high-dose GHK-Cu",
      "Longevity peptides are not replacements for lifestyle foundations",
      "Sourcing purity is especially critical for frontier peptides — concentration errors are consequential",
    ],
  },
  {
    id: "hormonal-sexual",
    title: "Hormonal Balance & Sexual Health",
    subtitle: "LH/FSH axis · libido · fertility",
    color: "#ec4899",
    framing:
      "The hormonal peptides in this category work on the HPG axis — the signaling chain that governs testosterone and estrogen production. Unlike exogenous hormones, they stimulate the body's own production. PT-141 is a separate category — it works centrally on sexual arousal, not on hormone levels.",
    primaryNote: "Choose based on your goal: PT-141 for acute sexual function and libido, Kisspeptin + Gonadorelin if you're trying to stimulate or restore natural hormone production. These are different problems — pick the right tool.",
    supportNote: "Oxytocin is a context-specific addition — bonding, anxiety reduction, relational use. It doesn't address the hormone production side.",
    compounds: [
      {
        name: "PT-141 (Bremelanotide)",
        slug: "bremelanotide",
        tier: "primary",
        role: "Melanocortin receptor agonist. Works centrally on the brain's sexual arousal circuitry — not on blood flow. FDA-approved for HSDD in premenopausal women (Vyleesi). Used by both sexes.",
        tradeoff: "Nausea is the primary side effect — start at 0.5mg. Blood pressure elevation possible. Acts within 45–60 min.",
      },
      {
        name: "Kisspeptin-10",
        slug: "kisspeptin",
        tier: "primary",
        role: "Master regulator of the HPG axis. Stimulates GnRH release, which drives LH and FSH — the hormones governing testosterone and estrogen production.",
        tradeoff: "Research-only territory. Dosing protocols not established. Effects depend heavily on baseline HPG function.",
      },
      {
        name: "Gonadorelin",
        slug: "gonadorelin",
        tier: "primary",
        role: "Synthetic GnRH. Directly stimulates LH/FSH release. Used clinically during TRT to prevent testicular atrophy.",
        tradeoff: "Very short half-life — timing critical. Typically used clinically rather than independently.",
      },
      {
        name: "Oxytocin",
        slug: "oxytocin",
        tier: "support",
        role: "The bonding and trust peptide. Reduces anxiety, enhances pair bonding and social connection. Intranasal use is common.",
        tradeoff: "CNS penetration debated. Anxiety paradox possible at high doses in some users. Context-specific — not a hormone production compound.",
      },
    ],
    synergy:
      "PT-141 for acute sexual function. Kisspeptin + Gonadorelin for HPG axis support and hormone production stimulation — these work together on the same axis. Oxytocin in specific relational contexts.",
    considerations: [
      {
        label: "Get labs first",
        text: "Non-negotiable: a full hormone panel (total and free testosterone, estradiol, LH, FSH, prolactin, SHBG) before starting anything. These compounds affect the same axes you're measuring — you need a before.",
      },
      {
        label: "Fix the cheap stuff first",
        text: "Vitamin D and zinc directly impact hormone production. Vitamin D functions as a steroid hormone precursor. Zinc is a cofactor for testosterone synthesis. Check these levels — optimizing them costs almost nothing.",
      },
      {
        label: "Stress is the number one hormone suppressor",
        text: "Cortisol and testosterone are inversely correlated. Chronic stress is one of the most common causes of suppressed hormone levels. No HPG-targeting peptide overcomes a chronically activated HPA axis.",
      },
      {
        label: "PT-141 timing and dose",
        text: "PT-141 peaks 45–60 minutes after injection. Start at 0.5mg — most nausea complaints are from overshooting the dose. Dose it on a light stomach with food beforehand.",
      },
    ],
    watchFor: [
      "HPG axis suppression if hormonal peptides are used incorrectly or chronically",
      "PT-141 nausea — start at 0.5mg, not the full 1.75mg dose",
      "Do not use hormonal peptides during fertility treatment without physician involvement",
      "Blood pressure monitoring with PT-141",
    ],
  },
  {
    id: "inflammation-immune",
    title: "Inflammation & Immune Support",
    subtitle: "Thymic · cytokine modulation · anti-inflammatory",
    color: "#f97316",
    framing:
      "The immune peptides here don't suppress inflammation bluntly — they modulate it. Thymosin Alpha-1 is the most clinically validated systemic immune compound. BPC-157 is better for gut-origin inflammation. Choose your primary based on where the inflammation is coming from.",
    primaryNote: "Pick one primary based on the source: Thymosin Alpha-1 for systemic immune dysregulation or chronic infection, BPC-157 if gut inflammation or injury-related inflammation is the primary driver.",
    supportNote: "Add one support compound to round out the stack: TB-500 if there's tissue repair needed alongside immune support, Thymulin if age-related immune decline is a factor.",
    compounds: [
      {
        name: "Thymosin Alpha-1",
        slug: "thymosin-alpha-1",
        tier: "primary",
        role: "Thymic peptide with broad immunomodulatory action. Approved in 40+ countries for hepatitis and immune deficiency. Enhances T-cell and NK cell activity, modulates cytokine balance.",
        tradeoff: "Best evidence in immune deficiency or chronic infection. Effects in healthy users are less dramatic. Expensive.",
      },
      {
        name: "BPC-157",
        slug: "bpc-157",
        tier: "primary",
        role: "Strong anti-inflammatory, particularly in gut tissue. Modulates COX pathways without the GI damage of NSAIDs. Also relevant for injury-driven inflammation.",
        tradeoff: "More potent for local GI inflammation. Systemic anti-inflammatory effects are real but less targeted than Thymosin Alpha-1.",
      },
      {
        name: "TB-500",
        slug: "tb-500",
        tier: "support",
        role: "Anti-inflammatory at injury sites alongside its tissue repair actions. Downregulates inflammatory cytokines. Add this when inflammation is injury-related.",
        tradeoff: "More effective as a repair compound than a dedicated anti-inflammatory. The anti-inflammatory effect is a byproduct of its repair mechanism.",
      },
      {
        name: "Thymulin",
        slug: "thymulin",
        tier: "support",
        role: "Thymic hormone involved in T-cell maturation and immune regulation. Addresses age-related immune decline.",
        tradeoff: "Zinc-dependent activity — zinc co-supplementation recommended. Limited human clinical data.",
      },
      {
        name: "LL-37",
        slug: "ll-37",
        tier: "support",
        role: "Host defense peptide. Antimicrobial and immunomodulatory. Add if microbial imbalance (gut dysbiosis, chronic infection) is part of the picture.",
        tradeoff: "Injection site reactions common. Can be pro-inflammatory in some contexts — not straightforwardly anti-inflammatory.",
      },
    ],
    synergy:
      "Thymosin Alpha-1 for the systemic immune layer. BPC-157 for gut and local inflammation. TB-500 when repair and inflammation management go hand-in-hand. Don't stack immune-stimulating compounds casually if you have any autoimmune history.",
    considerations: [
      {
        label: "Omega-3s are foundational",
        text: "2–3g EPA+DHA daily is among the best-evidenced anti-inflammatory interventions. It's additive with immunomodulatory peptides — different pathways, additive effects. Fix this first before adding compounds.",
      },
      {
        label: "Your gut is your immune system",
        text: "70% of immune function lives in the gut. Thymosin Alpha-1 modulates systemic tone, but without a healthy gut environment you're pushing uphill. Fiber, fermented foods, and microbiome care matter as much as the compounds.",
      },
      {
        label: "Chronic stress is chronic inflammation",
        text: "Cortisol dysregulation is one of the most consistent drivers of elevated inflammatory markers. If stress is the primary driver, no immunomodulatory compound substitutes for addressing the root cause.",
      },
      {
        label: "Autoimmune: get a physician",
        text: "If you have a diagnosed autoimmune condition, do not self-prescribe immune-stimulating peptides. Thymosin Alpha-1 can shift immune balance in unpredictable ways in autoimmune contexts. This requires clinical oversight.",
      },
    ],
    watchFor: [
      "Immune activation can worsen autoimmune conditions — physician involvement required if you have a diagnosis",
      "Thymosin Alpha-1 has a strong safety record but isn't appropriate for self-prescription in diagnosed immune conditions",
      "LL-37 injection site reactions can be significant — start low",
      "Peptides don't replace addressing the upstream drivers: sleep, diet, stress",
    ],
  },
  {
    id: "gut-digestion",
    title: "Gut Health & Digestion",
    subtitle: "GI repair · motility · barrier integrity",
    color: "#14b8a6",
    framing:
      "Gut-focused peptide use is dominated by BPC-157, and for good reason — the evidence base for GI tissue repair is stronger here than in almost any other application. The key question is form: oral reaches the gut lumen directly; injectable is better for systemic effects. Most GI-specific use cases call for oral BPC-157 Arginate.",
    primaryNote: "BPC-157 Arginate (oral) is your primary for most GI-specific conditions — it reaches the gut tissue directly. Standard BPC-157 (injectable) is your primary if you're addressing a non-luminal or systemic issue alongside gut healing.",
    supportNote: "Add Selank if stress and the gut-brain axis is a significant part of your picture. Add LL-37 only if microbial dysbiosis or active gut infection is part of the diagnosis.",
    compounds: [
      {
        name: "BPC-157 Arginate",
        slug: "bpc-157-arginate",
        tier: "primary",
        role: "Salt form of BPC-157. More stable for oral use. For luminal GI conditions — IBD, IBS, gastric ulcers, leaky gut — this form reaches the tissue directly. Preferred for GI-specific applications.",
        tradeoff: "Slightly different bioavailability profile than standard BPC-157. Research doesn't definitively favor one over the other, but the arginate form's stability makes it better suited for oral delivery.",
      },
      {
        name: "BPC-157",
        slug: "bpc-157",
        tier: "primary",
        role: "Subcutaneous injection. Better for systemic effects — when gut healing is one part of a broader repair goal (e.g., simultaneous injury recovery). Same mechanism, different delivery.",
        tradeoff: "For purely GI-luminal conditions, the oral arginate form is preferable. Use the injectable form when you need systemic distribution, not just gut.",
      },
      {
        name: "Selank",
        slug: "selank",
        tier: "support",
        role: "Addresses the gut-brain axis. Reduces anxiety and cortisol — which directly affects gut motility, barrier integrity, and IBS-type symptom patterns.",
        tradeoff: "Indirect mechanism for GI issues. Only relevant if stress or anxiety is a meaningful part of your GI picture.",
      },
      {
        name: "LL-37",
        slug: "ll-37",
        tier: "support",
        role: "Host defense peptide with antimicrobial properties. Add when gut dysbiosis or microbial imbalance is part of the problem.",
        tradeoff: "Not a routine gut supplement. More appropriate for gut infections or severe dysbiosis, not general gut support.",
      },
    ],
    synergy:
      "Oral BPC-157 Arginate as the primary for most luminal GI conditions. Add Selank if stress is driving symptoms. Injectable BPC-157 alongside for systemic repair if there are concurrent injury or inflammation goals.",
    considerations: [
      {
        label: "You can't out-supplement a bad diet",
        text: "BPC-157 promotes mucosal repair, but dietary fiber feeds the microbiome that maintains that mucosa. Without adequate fiber, you're repairing with one hand and undermining with the other. Processed food and emulsifiers are particularly damaging to what peptides are trying to heal.",
      },
      {
        label: "Gut-brain axis is real",
        text: "Chronic psychological stress directly alters gut motility and barrier integrity. If stress is your primary gut trigger, Selank addresses the signal — but you still need to address the source.",
      },
      {
        label: "Form and route matter",
        text: "This path has two 'primary' options because the form determines the target tissue. Oral = luminal (gut wall). Injectable = systemic. Choosing the wrong form for your condition means the compound ends up in the wrong place.",
      },
      {
        label: "Antibiotic timing",
        text: "If you're healing gut dysbiosis, unnecessary antibiotics during that period reset the microbiome you're rebuilding. If antibiotics are medically necessary, probiotic timing on either side of the course matters.",
      },
    ],
    watchFor: [
      "BPC-157 can affect gut motility in either direction — depends on the underlying state",
      "Oral peptide sourcing quality is critical — degradation during manufacturing affects potency",
      "These are supportive tools, not cures for serious GI disease — IBD, Crohn's, celiac require medical management",
      "Don't combine with active immunosuppressant therapy without physician oversight",
    ],
  },
  {
    id: "skin-cosmetic",
    title: "Skin & Cosmetic",
    subtitle: "Collagen · anti-aging · wound healing",
    color: "#84cc16",
    framing:
      "Topical peptides have solid cosmetic clinical evidence — particularly GHK-Cu and the palmitoyl family. GHK-Cu is the clear primary here: the most evidence-backed cosmetic peptide with the broadest mechanism. The palmitoyl peptides are effective supporting additions, especially when combined.",
    primaryNote: "GHK-Cu is your foundation — apply topically daily in a well-formulated product. Everything else layers on top of it.",
    supportNote: "Add Palmitoyl Pentapeptide-4 and Palmitoyl Tripeptide-1 together (they're synergistic as a pair) for anti-wrinkle focus. Add TB-500 if wound healing or scar reduction is the goal. Epitalon is a long-term systemic addition, not a topical.",
    compounds: [
      {
        name: "GHK-Cu",
        slug: "ghk-cu",
        tier: "primary",
        role: "Copper tripeptide. Stimulates collagen, elastin, and glycosaminoglycan synthesis. Anti-inflammatory. Promotes hair follicle health. The most evidence-backed cosmetic peptide.",
        tradeoff: "Topical is the safest and best-studied application. Concentration in commercial formulations varies widely — quality sourcing matters significantly.",
      },
      {
        name: "Palmitoyl Pentapeptide-4 (Matrixyl)",
        slug: "palmitoyl-pentapeptide-4",
        tier: "support",
        role: "Procollagen stimulator. Signals fibroblasts to produce more collagen. Works synergistically with Palmitoyl Tripeptide-1 — these two are typically combined.",
        tradeoff: "Effective concentration requires research-grade formulations — typical OTC products are underdosed.",
      },
      {
        name: "Palmitoyl Tripeptide-1",
        slug: "palmitoyl-tripeptide-1",
        tier: "support",
        role: "TGF-β pathway activator. Reduces wrinkle depth and skin laxity. Always combined with Palmitoyl Pentapeptide-4 for synergistic collagen stimulation.",
        tradeoff: "Same concentration limitations. Used as a pair with Pentapeptide-4, not independently.",
      },
      {
        name: "TB-500",
        slug: "tb-500",
        tier: "support",
        role: "Accelerates wound healing and scar remodeling. Add this if post-surgical recovery, active wound healing, or scar reduction is the goal.",
        tradeoff: "Injectable for systemic effects. Topical application is less studied. Overkill for routine anti-aging use.",
      },
      {
        name: "Epitalon",
        slug: "epitalon",
        tier: "support",
        role: "Systemic longevity compound with secondary skin benefits — promotes melatonin and antioxidant defense in skin tissue. Periodic cycling.",
        tradeoff: "Not a topical compound. Skin benefits are a secondary effect of the systemic longevity mechanism. Add if running Epitalon for longevity anyway.",
      },
    ],
    synergy:
      "GHK-Cu daily topically as the foundation. Palmitoyl Pentapeptide-4 + Tripeptide-1 combined for anti-wrinkle. TB-500 for active wound healing. Vitamin C and SPF alongside everything — collagen synthesis needs vitamin C as a cofactor and UV undoes what peptides build.",
    considerations: [
      {
        label: "Vitamin C is non-negotiable",
        text: "GHK-Cu and collagen-stimulating peptides require vitamin C for collagen cross-linking. Without 500mg+ oral vitamin C (or a topical vitamin C serum applied alongside), you're signaling collagen synthesis but limiting the output.",
      },
      {
        label: "SPF undoes everything",
        text: "UV radiation destroys collagen faster than any peptide can build it. Daily SPF 30+ is the highest-ROI skin intervention — it has to accompany a peptide protocol or you're losing ground on net.",
      },
      {
        label: "Give it 12 weeks",
        text: "Topical peptides require 8–12 weeks of consistent application before meaningful visible changes appear. Most people quit at 4 weeks. Take photos at the start — you won't notice gradual change without a reference.",
      },
      {
        label: "Commercial products are underdosed",
        text: "Most mainstream skincare with GHK-Cu or Matrixyl lists the peptide but at concentrations too low to be effective. Effective concentration requires deliberate sourcing — research-grade formulations or custom compounding.",
      },
    ],
    watchFor: [
      "Skin purging in the first 2–4 weeks of GHK-Cu use (usually resolves)",
      "Peptides are denatured by high heat — formulation and storage stability matter",
      "Topical and injectable applications have different risk profiles — don't conflate them",
      "Commercial products are almost always underdosed — verify concentration before evaluating results",
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────── */

function primaryLabel(compounds: PathCompound[]): string {
  const primaries = compounds.filter((c) => c.tier === "primary");
  return primaries.length === 1 ? "Primary compound" : "Primary compounds";
}

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
            Start with a goal, not a compound name. Each path tells you what to take,
            what to pair it with, and what a knowledgeable friend would make sure you
            knew before you started.
          </p>
          <p className="pt-well__hero-note">
            {PATHS.length} paths &middot;{" "}
            {PATHS.reduce((n, p) => n + p.compounds.length, 0)} compounds covered
          </p>
        </div>
      </div>

      {/* ── Paths ── */}
      <div className="pt-well__body">
        <div className="pt-well__grid">
          {PATHS.map((path) => {
            const primaries = path.compounds.filter((c) => c.tier === "primary");
            const supports  = path.compounds.filter((c) => c.tier === "support");

            return (
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
                  <span className="pt-well__path-chevron" aria-hidden="true">›</span>
                </summary>

                <div className="pt-well__path-body">

                  {/* Framing */}
                  <p className="pt-well__framing">{path.framing}</p>

                  {/* ── Primary compounds ── */}
                  <div className="pt-well__tier-hd">
                    <span className="pt-well__tier-label">{primaryLabel(path.compounds)}</span>
                    <span className="pt-well__tier-note" style={{ color: path.color }}>
                      {path.primaryNote}
                    </span>
                  </div>
                  <div className="pt-well__compounds pt-well__compounds--primary">
                    {primaries.map((c) => (
                      <div key={c.slug} className="pt-well__compound pt-well__compound--primary">
                        <Link
                          href={`/peptide/${c.slug}`}
                          className="pt-well__compound-name"
                          style={{ color: path.color }}
                        >
                          {c.name}
                        </Link>
                        <p className="pt-well__compound-role">{c.role}</p>
                        <p className="pt-well__compound-tradeoff">
                          <span className="pt-well__tradeoff-label">Trade-off:</span>{" "}
                          {c.tradeoff}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* ── Support compounds ── */}
                  {supports.length > 0 && (
                    <>
                      <div className="pt-well__tier-hd pt-well__tier-hd--support">
                        <span className="pt-well__tier-label">Supporting compounds</span>
                        <span className="pt-well__tier-note">{path.supportNote}</span>
                      </div>
                      <div className="pt-well__compounds pt-well__compounds--support">
                        {supports.map((c) => (
                          <div key={c.slug} className="pt-well__compound pt-well__compound--support">
                            <Link
                              href={`/peptide/${c.slug}`}
                              className="pt-well__compound-name"
                              style={{ color: path.color, opacity: 0.80 }}
                            >
                              {c.name}
                            </Link>
                            <p className="pt-well__compound-role">{c.role}</p>
                            <p className="pt-well__compound-tradeoff">
                              <span className="pt-well__tradeoff-label">Trade-off:</span>{" "}
                              {c.tradeoff}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Synergy */}
                  <div className="pt-well__synergy">
                    <div className="pt-well__synergy-label">How they work together</div>
                    <p className="pt-well__synergy-text">{path.synergy}</p>
                  </div>

                  {/* Support Considerations */}
                  <div className="pt-well__section-label pt-well__section-label--support">
                    Things to consider
                  </div>
                  <p className="pt-well__support-intro">
                    Going down this path? Here&rsquo;s what a knowledgeable friend would
                    make sure you knew before you started.
                  </p>
                  <div className="pt-well__considerations">
                    {path.considerations.map((c, i) => (
                      <div key={i} className="pt-well__consideration">
                        <div className="pt-well__consideration-label">{c.label}</div>
                        <p className="pt-well__consideration-text">{c.text}</p>
                      </div>
                    ))}
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

                  {/* Stack Builder CTA */}
                  <div className="pt-well__stack-cta">
                    <div className="pt-well__stack-cta-body">
                      <div className="pt-well__stack-cta-heading">Want to go deeper?</div>
                      <p className="pt-well__stack-cta-text">
                        This path is a starting point. The Stack Builder lets you design a
                        full multi-peptide protocol around this goal — combining compounds
                        for compounding effect, with timing and sequencing built in.
                      </p>
                    </div>
                    <Link href="/stack-builder" className="pt-well__stack-cta-btn">
                      Build a stack for this goal &rarr;
                    </Link>
                  </div>

                </div>
              </details>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-well__footer">
          <p className="pt-well__footer-text">
            Wellness Paths are a starting framework, not medical advice. Individual
            response varies significantly. Use these as a map to explore — then dig
            into the individual compound profiles for the full picture.
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
