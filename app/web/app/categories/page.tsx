import Link from "next/link";
import BackHomeLink from "@/components/BackHomeLink";
import { requirePaid } from "@/lib/gate";

/* ─────────────────────────────────────────────────────────────
   DATA TYPES
───────────────────────────────────────────────────────────── */

interface PathCompound {
  name: string;
  slug: string;
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
    considerations: [
      {
        label: "Protect your muscle",
        text: "Your appetite drops significantly on GLP-1 compounds — but your protein needs don't. Aim for 0.8–1g of protein per pound of lean body mass daily. Most people on these compounds undereat protein and lose muscle alongside the fat. That's not the goal.",
      },
      {
        label: "Lift weights",
        text: "These compounds can't protect lean mass without a mechanical stimulus. Even 3 sessions of full-body resistance training per week makes a significant difference in body composition outcomes. Don't skip this step.",
      },
      {
        label: "Watch your electrolytes",
        text: "Reduced appetite often means reduced sodium, potassium, and magnesium intake. Low electrolytes make nausea and fatigue worse. Consider an electrolyte supplement, especially in the first 4–6 weeks.",
      },
      {
        label: "Gallbladder support",
        text: "Rapid weight loss increases gallstone formation risk. If you're losing more than 1.5–2% of body weight per week, consider bile acid support (TUDCA), stay active, and make sure you're still eating adequate dietary fat — zero-fat diets during rapid weight loss worsen the risk.",
      },
      {
        label: "Titrate slowly",
        text: "GI side effects (nausea, vomiting, acid reflux) are worst in weeks 1–4 and almost always dose-related. Don't rush to higher doses. Small frequent meals, ginger tea, and avoiding high-fat or spicy food during titration helps most people get through the adaptation window.",
      },
      {
        label: "Get a baseline",
        text: "HbA1c, fasting insulin, lipid panel, and a DEXA or InBody scan before starting gives you something real to measure against. Weight alone doesn't tell you whether you're losing fat or muscle.",
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
        tradeoff: "Not selective — increases IGF-1 signaling systemically. Hypoglycemia risk. Acromegalic effects possible with long-term misuse. Not beginner territory.",
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
        tradeoff: "Limited human RCT data. Most effective for injury recovery, not mass gain per se.",
      },
    ],
    synergy:
      "CJC-1295 + Ipamorelin is the safest foundation — 8–16 week cycle, dosed at night. IGF-1 LR3 is for experienced users adding a stronger anabolic signal. BPC-157 runs alongside to handle the connective tissue stress of pushing hard.",
    considerations: [
      {
        label: "Sleep is not optional",
        text: "GH peptides amplify the GH pulse that occurs during slow-wave sleep. If you're averaging 6 hours or less, you're getting a fraction of the return. Fix sleep before optimizing peptides — it's the delivery mechanism.",
      },
      {
        label: "Food is still the raw material",
        text: "Peptides create the hormonal environment for growth — they don't provide the substrate. 1g of protein per pound of bodyweight minimum. You cannot out-peptide a caloric deficit when the goal is mass.",
      },
      {
        label: "Progressive overload is the signal",
        text: "GH secretagogues support tissue building; they don't create it. The anabolic environment peptides produce needs a training stimulus to act on. If you're not consistently getting stronger over time, elevated GH has nothing to work with.",
      },
      {
        label: "Nail the basics first",
        text: "Creatine (5g/day), zinc (15–30mg), and magnesium (300–400mg) are cheap, well-evidenced, and most people are deficient in at least one. Optimize these before spending money on peptides — they'll also make the peptides work better.",
      },
      {
        label: "Timing matters",
        text: "CJC-1295 + Ipamorelin is most effective dosed 30–60 minutes before sleep, not in the morning. GH pulsatility peaks during slow-wave sleep — you're amplifying a natural pattern, not creating a new one.",
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
      "Injury recovery is where peptides have some of the most compelling real-world signal. BPC-157 and TB-500 are the two most-discussed compounds in this category, and for good reason — the mechanistic rationale is strong and the community experience is consistent, even if large-scale RCTs are absent.",
    compounds: [
      {
        name: "BPC-157",
        slug: "bpc-157",
        role: "Body protective compound derived from gastric juice. Promotes tendon, ligament, and GI tissue repair. Strong angiogenic effect — increases blood flow to injured areas.",
        tradeoff: "No large human RCTs. Animal data is compelling. Most effective when administered proximal to the injury site. Form matters (standard vs. arginate).",
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
    considerations: [
      {
        label: "Don't rush back",
        text: "This is the most common mistake. Peptides accelerate tissue healing — but they don't accelerate structural strength. The area feeling better and the area being structurally ready to load are different things. Return to full training volume gradually, not when the pain disappears.",
      },
      {
        label: "Give it the cofactors it needs",
        text: "Collagen synthesis requires vitamin C and zinc. Without adequate vitamin C (500mg+ during the healing period) and zinc (15–30mg), the repair signaling peptides trigger has less raw material to work with. These aren't expensive additions.",
      },
      {
        label: "Sleep is where repair happens",
        text: "Most soft tissue repair occurs during slow-wave sleep when GH peaks. Chronically poor sleep significantly extends healing timelines. If you're not sleeping well, no peptide stack makes up for it.",
      },
      {
        label: "Manage stress seriously",
        text: "Chronic cortisol directly impairs tissue repair. If you're under heavy psychological stress during recovery, your healing timeline is longer regardless of what you're taking. Addressing the HPA axis isn't soft advice — it's physiology.",
      },
    ],
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
        tradeoff: "Doesn't make you sleepy — deepens the quality of slow-wave sleep you're already getting.",
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
        tradeoff: "More anxiolytic than sedating — not a sleeping pill. Nasal or sublingual administration.",
      },
      {
        name: "Epithalon",
        slug: "epithalon",
        role: "Pineal gland peptide. Regulates melatonin production and circadian rhythm. May extend telomere length as a secondary benefit.",
        tradeoff: "Limited modern human data. Cycling recommended — not for indefinite use.",
      },
      {
        name: "DSIP",
        slug: "dsip",
        role: "Delta Sleep-Inducing Peptide. Directly promotes slow-wave sleep initiation. One of the few peptides specifically studied for insomnia.",
        tradeoff: "Short half-life — timing is everything. Variable individual response.",
      },
    ],
    synergy:
      "CJC-1295 + Ipamorelin dosed 30–60 min before sleep is the workhorse of this path. Add Selank if racing thoughts or elevated cortisol are the primary sleep disruptor. Epithalon as a periodic reset for circadian dysregulation.",
    considerations: [
      {
        label: "Hygiene comes first",
        text: "Peptides amplify sleep quality — they don't create it from nothing. Blue light exposure in the 2 hours before bed, cool room temperature (65–68°F), consistent bedtime, and no alcohol are the substrate these compounds act on. Without that foundation, you're building on sand.",
      },
      {
        label: "Identify your sleep problem",
        text: "If you can't fall asleep because your mind is racing, that's a cortisol and nervous system problem — Selank is your starting compound. If you fall asleep fine but wake unrefreshed or groggy, that's a sleep architecture and GH recovery issue — CJC-1295 + Ipamorelin addresses that side. Most people need both.",
      },
      {
        label: "Magnesium is underrated",
        text: "Magnesium glycinate (200–400mg before bed) improves slow-wave sleep for most people and is dramatically underused. It's inexpensive, has strong evidence, and compounds well with sleep peptides. Add it first, before reaching for the more complex stack.",
      },
      {
        label: "Alcohol kills the return",
        text: "Alcohol suppresses slow-wave and REM sleep — exactly what GH peptides are trying to enhance. Even 1–2 drinks significantly blunts the overnight GH pulse. You can't have it both ways. If sleep quality is the goal, alcohol is the biggest obstacle.",
      },
    ],
    watchFor: [
      "Vivid dreams or altered sleep architecture during first 2 weeks (usually transient)",
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
      "The cognitive peptide space is real but overhyped. The compounds with the best signal are the Russian-developed analogs (Semax, Selank, Dihexa) and BPC-157 — which turns out to have meaningful CNS effects beyond its repair reputation. These aren't stimulants. They work on the underlying architecture of how the brain signals and repairs itself.",
    compounds: [
      {
        name: "Semax",
        slug: "semax",
        role: "ACTH(4-7) analog. Increases BDNF and NGF in the brain. Clear cognitive enhancement signal — sharper focus, faster processing, better working memory.",
        tradeoff: "Intranasal only. Tolerance can develop with continuous use — cycling is recommended.",
      },
      {
        name: "Selank",
        slug: "selank",
        role: "Anxiolytic with cognitive benefits. Reduces background anxiety and cortisol, which is often the real cause of brain fog.",
        tradeoff: "More anxiolytic than stimulating. Better choice if anxiety is driving the brain fog.",
      },
      {
        name: "Dihexa",
        slug: "dihexa",
        role: "HGF-derived compound. Extremely potent BDNF mimetic. Strong signal for memory formation and neuroplasticity in animal models.",
        tradeoff: "Very limited human data. Long half-life — effects accumulate. Requires extreme dosing caution.",
      },
      {
        name: "BPC-157",
        slug: "bpc-157",
        role: "Increasingly recognized for CNS effects — dopamine and serotonin modulation, neuroprotection, mood stabilization.",
        tradeoff: "CNS effects are a secondary mechanism. Cognitive benefits are real but indirect.",
      },
      {
        name: "Epithalon",
        slug: "epithalon",
        role: "Neuroprotective at the systemic level. Telomerase activation and antioxidant effects may support long-term cognitive resilience.",
        tradeoff: "Not an acute cognitive enhancer. Best thought of as long-term brain maintenance.",
      },
    ],
    synergy:
      "Semax (morning, intranasal) for sharp cognitive output. Selank (evening or as-needed) for anxiety-driven fog. Dihexa only if you've exhausted the other options and understand what you're doing. BPC-157 as background neuroprotection.",
    considerations: [
      {
        label: "Find the actual root cause",
        text: "The three most common drivers of brain fog — poor sleep, chronic stress, and metabolic dysfunction (blood sugar dysregulation, low thyroid) — all respond to lifestyle interventions. Fixing those makes peptides work better. Skipping them means you're treating symptoms, not the system.",
      },
      {
        label: "Support the neurotransmitter pathways",
        text: "Semax and Dihexa target BDNF and NGF pathways that work better when acetylcholine precursors are available. Alpha-GPC (300–600mg) or CDP-choline alongside nootropic peptides gives the pathways more substrate to work with. This is a meaningful addition, not optional.",
      },
      {
        label: "Omega-3s matter",
        text: "DHA is a structural component of neural membranes and affects receptor sensitivity directly. 2–3g EPA+DHA daily compounds with peptide effects — they're working on different parts of the same system. Most people with brain fog are deficient in omega-3s.",
      },
      {
        label: "Caffeine dependence masks the problem",
        text: "Cognitive peptides are not stimulants. If caffeine is masking cognitive fatigue driven by HPA axis dysregulation, no nootropic peptide will fix it. Tapering caffeine dependence often restores more clarity than any stack. If you can't function without it, that's the signal.",
      },
    ],
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
      "Longevity peptides are the category where the research is genuinely exciting but also where the gap between animal data and human application is widest. The honest framing: these compounds address real biological aging mechanisms — telomere erosion, mitochondrial decline, senescent cell accumulation — but no peptide has been proven to extend human lifespan. What they can reasonably do is optimize the conditions for slower aging.",
    compounds: [
      {
        name: "Epithalon",
        slug: "epithalon",
        role: "Tetrapeptide from the pineal gland. Activates telomerase — the enzyme that repairs telomere ends. The most-studied longevity peptide with the longest research history.",
        tradeoff: "Human trials are small and mostly Russian. Not for continuous use — 10-day cycles recommended.",
      },
      {
        name: "GHK-Cu",
        slug: "ghk-cu",
        role: "Copper-binding tripeptide. Activates genes involved in tissue repair and anti-inflammatory signaling. Declines sharply with age.",
        tradeoff: "Topical well-studied. Systemic effects harder to measure. Copper accumulation is a theoretical concern with heavy systemic use.",
      },
      {
        name: "Humanin",
        slug: "humanin",
        role: "Mitochondrial peptide. Protective against Alzheimer's pathology, metabolic dysfunction, and apoptosis. Declines with age.",
        tradeoff: "Exogenous dosing protocols are not established. Cutting-edge, limited human application data.",
      },
      {
        name: "SHLP-2",
        slug: "shlp-2",
        role: "Mitochondrial-derived peptide. Regulates apoptosis, has anti-cancer signal in preclinical models, declines with age.",
        tradeoff: "Preclinical territory. Dosing not established.",
      },
      {
        name: "Thymalin",
        slug: "thymalin",
        role: "Thymic peptide that restores immune function which declines with age (thymic involution). Used in Russian longevity protocols for decades.",
        tradeoff: "Limited Western clinical data. Often stacked with Epithalon in traditional anti-aging protocols.",
      },
    ],
    synergy:
      "Epithalon as the cornerstone — periodic cycles (2× per year). GHK-Cu topically for skin and subcutaneous for systemic support. Humanin and SHLP-2 represent the frontier layer — for those comfortable with frontier-level uncertainty.",
    considerations: [
      {
        label: "Measure or it doesn't count",
        text: "Longevity interventions without tracking biomarkers are guesswork. At minimum, establish a baseline: telomere length (SpectraCell or Life Length), inflammatory markers (hsCRP, IL-6), metabolic panel, and a DEXA scan. You need a 'before' to know if anything you're doing matters.",
      },
      {
        label: "These are multipliers, not replacements",
        text: "Longevity peptides amplify a healthy baseline — they don't offset poor sleep, chronic stress, or a sedentary lifestyle. If the foundations aren't in place, you're paying for minimal return. Exercise, sleep quality, and stress management are the things that actually extend healthspan. Peptides are an optimization layer on top.",
      },
      {
        label: "Consider the NAD+ pathway too",
        text: "Epithalon and GHK-Cu address telomere and repair pathways, but not mitochondrial energy metabolism directly. NMN or NR supplementation for NAD+ support is a logical companion that covers the energy/sirtuin side. Different pathways, additive effects.",
      },
      {
        label: "Telomerase is a double-edged mechanism",
        text: "Telomerase activation is what makes Epithalon interesting — and also what requires caution with sustained use. Cancer cells use telomerase to become immortal. Cycling protocols exist for this reason. Don't run Epithalon continuously — periodic cycles are the standard approach.",
      },
    ],
    watchFor: [
      "Telomerase activation — theoretical cancer promotion concern with sustained use; cycle, don't run continuously",
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
        role: "Melanocortin receptor agonist. Acts centrally on the brain's sexual arousal circuitry. FDA-approved for HSDD in premenopausal women (Vyleesi). Used by both sexes.",
        tradeoff: "Nausea is the primary side effect — dose and timing matter. Blood pressure elevation possible.",
      },
      {
        name: "Kisspeptin-10",
        slug: "kisspeptin-10",
        role: "Master regulator of the HPG axis. Stimulates GnRH release, which drives LH and FSH — the hormones governing testosterone and estrogen production.",
        tradeoff: "Research-only territory. Dosing protocols not established. Effects depend heavily on baseline HPG function.",
      },
      {
        name: "Gonadorelin",
        slug: "gonadorelin",
        role: "Synthetic GnRH. Stimulates LH/FSH release. In TRT contexts, used to prevent testicular atrophy.",
        tradeoff: "Very short half-life — timing critical. Often used clinically.",
      },
      {
        name: "Oxytocin",
        slug: "oxytocin",
        role: "The bonding and trust peptide. Modulates social connection, reduces anxiety, enhances pair bonding. Intranasal use is common.",
        tradeoff: "CNS penetration debated. Anxiety paradox possible at high doses in some users.",
      },
    ],
    synergy:
      "PT-141 for acute sexual function. Kisspeptin + Gonadorelin for HPG axis support. Oxytocin in relational/bonding contexts. These shouldn't be combined casually — hormonal pathways are interconnected.",
    considerations: [
      {
        label: "Get labs first",
        text: "Non-negotiable: a full hormone panel (total and free testosterone, estradiol, LH, FSH, prolactin, SHBG) before starting anything in this category. These compounds directly affect the same axes you're measuring — you need a baseline 'before' or you're just guessing at causality.",
      },
      {
        label: "Fix the cheap stuff first",
        text: "Vitamin D and zinc are the two most common deficiencies that directly suppress hormone production. Vitamin D functions as a steroid hormone precursor. Zinc is a cofactor for testosterone synthesis. Check these levels — optimizing them costs almost nothing and can meaningfully shift hormone levels.",
      },
      {
        label: "Stress is the number one hormone suppressor",
        text: "Cortisol and testosterone are inversely correlated. Chronic stress is one of the most common causes of suppressed hormone levels in otherwise healthy people. No HPG-targeting peptide can overcome a chronically activated HPA axis. If stress is the root cause, it has to be addressed at the root.",
      },
      {
        label: "PT-141 timing and dose",
        text: "PT-141 takes 45–60 minutes to reach peak effect. Start at 0.5mg, not 1.75mg — most of the nausea complaints are from overshooting the dose. Dose it 1 hour before, on a light stomach, and have something to eat beforehand to blunt the GI response.",
      },
    ],
    watchFor: [
      "HPG axis suppression if hormonal peptides are used incorrectly or chronically",
      "PT-141 nausea — start at 0.5mg, not full dose",
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
      "Chronic low-grade inflammation is at the root of nearly every major disease. The immune peptides in this category don't suppress inflammation bluntly — they modulate it. The distinction is important: these compounds aim to restore normal immune tone, not override it.",
    compounds: [
      {
        name: "Thymosin Alpha-1",
        slug: "thymosin-alpha-1",
        role: "Thymic peptide with broad immunomodulatory action. Approved in 40+ countries for hepatitis and immune deficiency. Enhances T-cell and NK cell activity, modulates cytokine balance.",
        tradeoff: "Best evidence in immune deficiency or chronic infection. Effects in healthy users are less dramatic. Expensive.",
      },
      {
        name: "TB-500",
        slug: "tb-500",
        role: "Anti-inflammatory alongside its tissue repair actions. Downregulates inflammatory cytokines at injury sites.",
        tradeoff: "More effective as a repair compound than a dedicated anti-inflammatory.",
      },
      {
        name: "BPC-157",
        slug: "bpc-157",
        role: "Strong anti-inflammatory signal, particularly in gut tissue. Modulates COX pathways without the GI damage of NSAIDs.",
        tradeoff: "Most potent for local GI inflammation. Systemic anti-inflammatory effects are real but less targeted.",
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
        tradeoff: "Injection site reactions common. Dual nature — can be pro-inflammatory in some contexts.",
      },
    ],
    synergy:
      "Thymosin Alpha-1 as the systemic immune modulator. BPC-157 for gut-origin inflammation. TB-500 when inflammation is injury-related. Thymulin for age-related immune decline.",
    considerations: [
      {
        label: "Omega-3s are foundational",
        text: "2–3g EPA+DHA daily is among the best-evidenced anti-inflammatory interventions that exists. It's additive with immunomodulatory peptides — they work on different parts of the pathway. Most people in chronic inflammatory states are deficient. Fix this first.",
      },
      {
        label: "Your gut is your immune system",
        text: "70% of immune function lives in the gut. Thymosin Alpha-1 modulates systemic immune tone, but without a healthy gut environment, you're pushing uphill. Fiber, fermented foods, and not destroying your microbiome with unnecessary antibiotics matter as much as the compounds you add.",
      },
      {
        label: "Chronic stress is chronic inflammation",
        text: "Cortisol is an immunosuppressant at chronic levels — but the compensatory inflammatory rebound makes chronic stress one of the most consistent drivers of inflammatory markers. If stress is the primary driver, no immunomodulatory compound substitutes for addressing the root cause.",
      },
      {
        label: "Autoimmune: get a physician",
        text: "If you have a diagnosed autoimmune condition, do not self-prescribe immune-stimulating peptides. Thymosin Alpha-1 can shift immune balance in ways that are not predictable in autoimmune contexts. The general rule — 'boosting' immunity when the immune system is already attacking self — requires clinical oversight.",
      },
    ],
    watchFor: [
      "Immune activation can worsen autoimmune conditions — physician involvement required if you have a diagnosis",
      "Thymosin Alpha-1 has a strong safety record but shouldn't be self-prescribed for diagnosed immune conditions",
      "LL-37 injection site reactions can be significant — start low",
      "Peptides don't replace addressing upstream inflammation drivers: sleep, diet, stress",
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
        role: "Derived from gastric juice — designed for GI protection. Promotes mucosal healing, barrier integrity, and motility normalization. Strong signal for IBD, IBS, gastric ulcers, and leaky gut.",
        tradeoff: "Oral vs. injectable matters: oral reaches GI tissue directly for luminal issues. Standard vs. arginate form affects stability.",
      },
      {
        name: "BPC-157 Arginate",
        slug: "bpc-157-arginate",
        role: "Salt form of BPC-157. More stable, better suited for oral use. Preferred form for GI-specific applications.",
        tradeoff: "Slightly different bioavailability profile than standard BPC-157. Research doesn't definitively favor either.",
      },
      {
        name: "Selank",
        slug: "selank",
        role: "Anxiolytic action on the gut-brain axis can help with stress-driven GI dysfunction (IBS, functional dyspepsia).",
        tradeoff: "Indirect mechanism for GI issues. More appropriate when stress is the primary driver of gut symptoms.",
      },
      {
        name: "LL-37",
        slug: "ll-37",
        role: "Host defense peptide with antimicrobial properties relevant in gut dysbiosis contexts.",
        tradeoff: "Not a targeted GI compound. More appropriate for gut infections or severe dysbiosis.",
      },
    ],
    synergy:
      "BPC-157 Arginate (oral) as the primary for luminal GI repair. Standard BPC-157 (systemic) when the issue extends beyond the gut lumen. Selank as the gut-brain axis complement.",
    considerations: [
      {
        label: "You can't out-supplement a bad diet",
        text: "BPC-157 promotes mucosal repair, but dietary fiber feeds the microbiome that maintains that mucosa. Without 25–40g of fiber daily, you're repairing with one hand and undermining with the other. Processed food, emulsifiers, and artificial sweeteners are particularly damaging to the gut lining that peptides are trying to heal.",
      },
      {
        label: "Gut-brain axis is real",
        text: "Chronic psychological stress directly alters gut motility, barrier integrity, and microbiome composition — this is well-established physiology, not metaphor. If stress is your primary gut trigger (common in IBS), Selank addresses the signal. But you still need to address the source.",
      },
      {
        label: "Form and route matter",
        text: "For luminal GI conditions — IBD, gastric ulcers, IBS — oral BPC-157 reaches the tissue directly. For systemic effects alongside gut healing (like simultaneous tendon repair), subcutaneous injection makes more sense. These are not interchangeable for all use cases.",
      },
      {
        label: "Antibiotic timing",
        text: "If you're healing gut dysbiosis with peptides, unnecessary antibiotic courses during that period reset the microbiome you're rebuilding. If antibiotics are medically necessary, probiotic timing and sequencing on either side of the course matters.",
      },
    ],
    watchFor: [
      "BPC-157 can affect gut motility — both directions are possible depending on the underlying condition",
      "Oral peptide sourcing quality is critical — degradation during manufacturing and transit is a real concern",
      "These are supportive tools, not cures for serious GI disease — IBD, Crohn's, celiac require medical management",
      "Don't combine gut peptides with active immunosuppressant therapy without physician oversight",
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
        tradeoff: "Topical is the safest application. Concentration in formulations varies widely — quality sourcing matters.",
      },
      {
        name: "Palmitoyl Pentapeptide-4 (Matrixyl)",
        slug: "palmitoyl-pentapeptide-4",
        role: "Procollagen stimulator. Signals fibroblasts to produce more collagen. Found in mainstream anti-aging products, but concentration is often too low to be effective.",
        tradeoff: "Effective concentration requires research-grade formulations — typical OTC products are underdosed.",
      },
      {
        name: "Palmitoyl Tripeptide-1",
        slug: "palmitoyl-tripeptide-1",
        role: "TGF-β pathway activator. Works synergistically with Palmitoyl Pentapeptide-4. Reduces wrinkle depth and skin laxity in clinical studies.",
        tradeoff: "Same concentration limitations. Best used in combination.",
      },
      {
        name: "Epithalon",
        slug: "epithalon",
        role: "Beyond longevity applications, promotes melatonin production and antioxidant defense in skin tissue.",
        tradeoff: "Primary application is systemic longevity. Skin benefits are a secondary effect.",
      },
      {
        name: "TB-500",
        slug: "tb-500",
        role: "Accelerates wound healing and scar remodeling when applied topically or systemically. Used for post-surgical recovery and scar reduction.",
        tradeoff: "Injectable for systemic wound healing effects. Topical application less studied.",
      },
    ],
    synergy:
      "GHK-Cu as the topical cornerstone — daily application in a well-formulated product. Palmitoyl Pentapeptide-4 + Tripeptide-1 combined for anti-wrinkle. TB-500 for active wound healing or scar management.",
    considerations: [
      {
        label: "Vitamin C is non-negotiable",
        text: "GHK-Cu and collagen-stimulating peptides require vitamin C as a cofactor for collagen cross-linking. Without 500mg+ of oral vitamin C daily (or a topical vitamin C serum applied alongside), you're signaling collagen synthesis but limiting the output. These aren't alternatives — they're paired.",
      },
      {
        label: "SPF undoes everything",
        text: "UV radiation destroys collagen faster than any peptide can build it. If you're investing in collagen synthesis and not wearing SPF 30+ daily, you're losing ground on net. Sunscreen is the single highest-ROI skin intervention — it has to be part of the protocol.",
      },
      {
        label: "Give it time",
        text: "Topical peptides require 8–12 weeks of consistent application before meaningful visible changes appear. Most people quit at 4 weeks. Set a 12-week window before you evaluate results, and take photos at the start — you won't notice gradual change without a reference point.",
      },
      {
        label: "Hydration affects everything",
        text: "Collagen matrix formation requires water. Chronically dehydrated skin doesn't respond as well to peptide-driven synthesis. 2L+ of water daily is part of the protocol, not a footnote.",
      },
    ],
    watchFor: [
      "Skin purging in the first 2–4 weeks of GHK-Cu use (usually resolves)",
      "Peptides are denatured by high heat — formulation and storage stability matter",
      "Topical and injectable applications have different risk profiles — don't conflate them",
      "Commercial products are almost always underdosed — effective concentration requires deliberate sourcing",
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
            Start with a goal, not a compound name. Each path maps a symptom cluster to the
            peptides most relevant to it — with the support context a knowledgeable friend
            would give you alongside the recommendation.
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
                <div className="pt-well__section-label">Compounds</div>
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
                        <span className="pt-well__tradeoff-label">Trade-off:</span>{" "}
                        {c.tradeoff}
                      </p>
                    </div>
                  ))}
                </div>

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
                  Going down this path? Here&rsquo;s what a knowledgeable friend would make
                  sure you knew before you started.
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
                      <li key={i} className="pt-well__watch-item">
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack Builder CTA */}
                <div className="pt-well__stack-cta">
                  <div className="pt-well__stack-cta-body">
                    <div className="pt-well__stack-cta-heading">
                      Want to go deeper?
                    </div>
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
          ))}
        </div>

        {/* Footer */}
        <div className="pt-well__footer">
          <p className="pt-well__footer-text">
            Wellness Paths are a starting framework, not medical advice. Individual response
            varies significantly. Use these as a map to explore — then dig into the individual
            compound profiles for the full picture.
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
