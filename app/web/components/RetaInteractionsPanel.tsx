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
    id: "insulin",
    name: "Insulin",
    aliases: ["insulin", "humalog", "lantus", "basaglar", "toujeo", "novolog", "levemir", "tresiba", "fast-acting insulin", "long-acting insulin"],
    category: "medications",
    tier: "flag",
    summary: "Blood sugar drops harder when appetite and food intake fall significantly on retatrutide. The insulin dose that was right before starting may cause hypoglycemia as weight loss progresses and caloric intake drops.",
    mitigation: [
      "Monitor blood sugar more frequently in the first 4–8 weeks",
      "Expect insulin needs to decrease — work with your prescriber proactively, not reactively",
      "Have a fast-acting glucose source accessible (juice, glucose tablets)",
    ],
  },
  {
    id: "sulfonylureas",
    name: "Sulfonylureas",
    aliases: ["sulfonylurea", "glipizide", "glucotrol", "glimepiride", "amaryl", "glyburide", "diabeta", "micronase", "sulfonylureas"],
    category: "medications",
    tier: "flag",
    summary: "Sulfonylureas force the pancreas to release insulin regardless of blood sugar levels — combined with retatrutide's appetite suppression and reduced food intake, blood sugar can drop significantly. This is one of the higher-risk drug class combinations.",
    mitigation: [
      "Sulfonylurea doses almost always need reduction as weight loss progresses",
      "Monitor blood sugar closely and have a dose-reduction plan with your prescriber before starting",
      "Know the symptoms of hypoglycemia: shakiness, sweating, confusion, fast heartbeat",
    ],
  },
  {
    id: "glp1-agonists",
    name: "GLP-1 Agonists",
    aliases: ["semaglutide", "ozempic", "wegovy", "rybelsus", "liraglutide", "victoza", "saxenda", "dulaglutide", "trulicity", "exenatide", "byetta", "glp-1", "glp1"],
    category: "medications",
    tier: "flag",
    summary: "Retatrutide already agonizes GLP-1 receptors — stacking another GLP-1 agonist adds the same mechanism twice with no rationale. Side effects compound (nausea, vomiting, constipation) without additive benefit.",
    mitigation: [
      "These should not be used together",
      "If transitioning from semaglutide, allow 3–4 weeks washout (half-life ~1 week at therapeutic doses)",
      "Transitioning from liraglutide is faster — ~2-day half-life — but still allow a washout period",
    ],
  },
  {
    id: "opioids-rx",
    name: "Opioids (prescribed)",
    aliases: ["oxycodone", "oxycontin", "hydrocodone", "vicodin", "norco", "tramadol", "ultram", "codeine", "morphine", "ms contin", "fentanyl patch", "buprenorphine", "suboxone", "opioid", "narcotic"],
    category: "medications",
    tier: "flag",
    summary: "Opioids already cause severe constipation by shutting down GI motility. Retatrutide also significantly slows gastric emptying. This combination is the worst-case scenario for bowel function — risk of obstruction-level constipation is real.",
    mitigation: [
      "Aggressive bowel protocol from day one: stool softeners daily, not as needed",
      "Maximum hydration — at least 2.5–3L of water daily",
      "If no bowel movement after 2–3 days, escalate — do not wait it out",
      "Discuss with your prescriber before combining these",
    ],
  },
  {
    id: "warfarin",
    name: "Warfarin / Blood Thinners",
    aliases: ["warfarin", "coumadin", "jantoven", "blood thinner", "anticoagulant", "inr"],
    category: "medications",
    tier: "watch",
    summary: "Warfarin is highly sensitive to dietary changes — its effectiveness shifts with vitamin K intake, which changes significantly when eating patterns change. GI side effects also increase GI bleeding risk.",
    mitigation: [
      "More frequent INR monitoring during the active weight loss phase",
      "Alert your prescriber that you've started retatrutide — warfarin dosing may need adjustment",
      "Consistent vitamin K intake day-to-day matters more than total amount",
    ],
  },
  {
    id: "metformin",
    name: "Metformin",
    aliases: ["metformin", "glucophage", "fortamet", "glumetza", "riomet"],
    category: "medications",
    tier: "watch",
    summary: "Both are GI-heavy. Metformin commonly causes nausea and diarrhea on its own — stacked with retatrutide's early GI side effects, the first 4 weeks can be rough. Not dangerous but uncomfortable.",
    mitigation: [
      "GI overlap is timing-specific and usually settles after the first few weeks",
      "Extended-release metformin (Glucophage XR) tends to cause less GI distress",
      "If symptoms are severe early on, your prescriber may suggest temporarily reducing metformin",
    ],
  },
  {
    id: "sglt2",
    name: "SGLT-2 Inhibitors",
    aliases: ["sglt2", "empagliflozin", "jardiance", "dapagliflozin", "farxiga", "canagliflozin", "invokana", "ertugliflozin", "steglatro"],
    category: "medications",
    tier: "watch",
    summary: "SGLT-2 inhibitors cause fluid loss through the urine. Combined with retatrutide's appetite suppression and reduced fluid intake from food, dehydration can compound faster than either alone.",
    mitigation: [
      "Hydration becomes doubly important — track fluid intake actively",
      "Watch for signs of dehydration: dark urine, lightheadedness, dry mouth",
      "Monitor kidney function markers at next lab draw",
    ],
  },
  {
    id: "bp-meds",
    name: "Blood Pressure Medications",
    aliases: ["lisinopril", "losartan", "amlodipine", "metoprolol", "atenolol", "valsartan", "enalapril", "ramipril", "carvedilol", "bisoprolol", "amlodipine", "nifedipine", "ace inhibitor", "arb", "beta blocker", "calcium channel blocker", "blood pressure medication", "antihypertensive"],
    category: "medications",
    tier: "watch",
    summary: "Significant weight loss directly and reliably lowers blood pressure. As the weight comes off, your current BP medication dose may become too strong — causing symptoms of over-treatment (dizziness, fatigue, fainting).",
    mitigation: [
      "Monitor blood pressure regularly during active weight loss — monthly is reasonable",
      "If BP is running low (< 100/60 sitting), contact your prescriber about reducing dose",
      "Beta-blockers specifically: can mask hypoglycemia symptoms if you're also on diabetes meds",
    ],
  },
  {
    id: "ssris",
    name: "SSRIs / SNRIs",
    aliases: ["ssri", "snri", "sertraline", "zoloft", "escitalopram", "lexapro", "fluoxetine", "prozac", "paroxetine", "paxil", "citalopram", "celexa", "venlafaxine", "effexor", "duloxetine", "cymbalta", "desvenlafaxine", "pristiq", "antidepressant"],
    category: "medications",
    tier: "watch",
    summary: "SSRIs and SNRIs affect GI motility and appetite — GI side effects overlap with retatrutide's early effects. Most people tolerate this combination fine; the main concern is compounded GI discomfort in the first few weeks.",
    mitigation: [
      "Give the GI picture 4–6 weeks to settle before attributing symptoms to either drug specifically",
      "If nausea is severe, separating administration timing (morning vs. evening) can help",
      "SNRIs (venlafaxine, duloxetine) can raise BP — worth monitoring alongside the weight loss effect",
    ],
  },
  {
    id: "bupropion",
    name: "Bupropion",
    aliases: ["bupropion", "wellbutrin", "zyban", "aplenzin", "forfivo"],
    category: "medications",
    tier: "watch",
    summary: "Bupropion independently suppresses appetite through norepinephrine-dopamine reuptake inhibition. Stacking two appetite suppressants can drive caloric intake below what's safe for muscle and energy maintenance.",
    mitigation: [
      "Track protein intake — the combined suppression makes it easy to under-eat significantly",
      "Monitor for fatigue and muscle loss signals (these are the downstream consequences of under-eating)",
      "This combination isn't dangerous per se, but nutritional vigilance matters more",
    ],
  },
  {
    id: "thyroid-meds",
    name: "Thyroid Medications",
    aliases: ["levothyroxine", "synthroid", "armour thyroid", "liothyronine", "cytomel", "nature-throid", "tirosint", "thyroid medication", "hypothyroid", "hyperthyroid", "tsh"],
    category: "medications",
    tier: "watch",
    summary: "Levothyroxine requirements change as body weight changes — thyroid hormone dosing is partly body-mass dependent. Additionally, GLP-1 class drugs carry a theoretical thyroid concern from rodent studies (not established in humans), worth noting with a history of thyroid disease.",
    mitigation: [
      "TSH monitoring at 3–6 months into treatment — dose adjustment may be needed as weight drops",
      "Inform your endocrinologist you've started retatrutide",
      "Personal or family history of medullary thyroid carcinoma (MTC) is a contraindication for the GLP-1 class — discuss with your prescriber",
    ],
  },
  {
    id: "nsaids",
    name: "NSAIDs",
    aliases: ["ibuprofen", "advil", "motrin", "naproxen", "aleve", "naprosyn", "celecoxib", "celebrex", "diclofenac", "voltaren", "indomethacin", "nsaid", "anti-inflammatory"],
    category: "medications",
    tier: "watch",
    summary: "NSAIDs irritate the GI lining through prostaglandin inhibition — combined with retatrutide's GI side effects, this increases mucosal irritation and GI bleeding risk. Regular or high-dose NSAID use during peak GI side effects is the concern.",
    mitigation: [
      "Use acetaminophen (Tylenol) instead of NSAIDs for pain management while on retatrutide",
      "If NSAIDs are needed, keep doses as low and infrequent as possible",
      "Avoid on an empty stomach — if you must take them, have something (even small) with them",
    ],
  },
  {
    id: "statins",
    name: "Statins",
    aliases: ["statin", "atorvastatin", "lipitor", "rosuvastatin", "crestor", "simvastatin", "zocor", "pravastatin", "pravachol", "lovastatin", "mevacor", "fluvastatin", "lescol"],
    category: "medications",
    tier: "low",
    summary: "No significant direct interaction between statins and retatrutide. Statins are primarily liver-metabolized through pathways that don't strongly intersect with incretin mechanisms. Mild GI overlap is possible but minor.",
    mitigation: [
      "Continue as prescribed",
      "Weight loss will likely improve your lipid panel — lipid recheck at 3–6 months is reasonable",
      "Statin dose may eventually be reducible as metabolic markers improve",
    ],
  },
  {
    id: "acetaminophen",
    name: "Acetaminophen",
    aliases: ["acetaminophen", "tylenol", "paracetamol", "apap"],
    category: "medications",
    tier: "low",
    summary: "No significant interaction with retatrutide. Acetaminophen is the recommended OTC pain option specifically because it avoids the GI irritation and bleeding risk of NSAIDs.",
    mitigation: [
      "Preferred OTC pain option while on retatrutide",
      "Stay within the recommended daily maximum (4g/day for healthy adults, less if drinking alcohol)",
    ],
  },
  {
    id: "gabapentin",
    name: "Gabapentin / Pregabalin",
    aliases: ["gabapentin", "neurontin", "pregabalin", "lyrica", "gralise", "horizant"],
    category: "medications",
    tier: "watch",
    summary: "Both gabapentin and pregabalin commonly cause weight gain and increased appetite — they work partially in the opposite direction of retatrutide's appetite suppression. Net effect varies by individual; expect more muted weight loss response.",
    mitigation: [
      "Weight loss may be slower or less complete with this combination",
      "No dangerous interaction — more of an efficacy consideration",
      "If weight gain is a known side effect for you on gabapentin/pregabalin, this is worth noting with your prescriber",
    ],
  },

  // ── STIMULANTS ──────────────────────────────────────────────────────────────

  {
    id: "fat-burners",
    name: "Fat Burners / Thermogenics",
    aliases: ["fat burner", "thermogenic", "eca stack", "ephedrine", "synephrine", "bitter orange", "hydroxycut", "lipo-6", "shredz", "phenq", "oxyelite"],
    category: "stimulants",
    tier: "flag",
    summary: "Thermogenics stack aggressive stimulant load, metabolic manipulation, and appetite suppression on top of retatrutide's existing effects. The cardiovascular stress and combined appetite suppression create real risk — this is adding a crowbar to a lever that's already doing work.",
    mitigation: [
      "These should not be combined with retatrutide",
      "The mechanism overlap is aggressive; additional benefit is minimal while cardiovascular and nutritional risk rises",
      "If weight loss goals feel inadequate, dose titration of retatrutide is a better lever than adding thermogenics",
    ],
  },
  {
    id: "adhd-amphetamines",
    name: "ADHD Stimulants (Amphetamines)",
    aliases: ["adderall", "vyvanse", "dexedrine", "dextroamphetamine", "amphetamine", "mixed amphetamine salts", "lisdexamfetamine"],
    category: "stimulants",
    tier: "watch",
    summary: "Amphetamines independently suppress appetite and raise heart rate. Combined with retatrutide, appetite suppression doubles — creating real risk of caloric and nutritional intake dropping too low. Cardiovascular demands stack.",
    mitigation: [
      "Protein tracking becomes critical — the combined suppression makes under-eating feel normal",
      "Watch for cardiovascular symptoms: palpitations, elevated resting heart rate, BP spikes",
      "If you're losing weight faster than intended (>2 lbs/week consistently), nutrition is likely the issue",
    ],
  },
  {
    id: "adhd-methylphenidate",
    name: "ADHD Stimulants (Methylphenidate)",
    aliases: ["ritalin", "concerta", "methylphenidate", "metadate", "quillivant", "daytrana", "focalin", "dexmethylphenidate"],
    category: "stimulants",
    tier: "watch",
    summary: "Methylphenidate suppresses appetite and has some cardiovascular effects, though typically milder than amphetamines. Appetite suppression stacks with retatrutide's effects — nutritional adequacy needs monitoring.",
    mitigation: [
      "Same approach as amphetamines: track protein intake actively",
      "Cardiovascular concern is lower than with amphetamines but still present",
      "Watch for signs of under-eating: fatigue, muscle loss, difficulty concentrating",
    ],
  },
  {
    id: "preworkout",
    name: "Pre-workout Supplements",
    aliases: ["preworkout", "pre-workout", "pre workout", "c4", "legion pulse", "ghost legend", "bucked up", "optimum nutrition gold standard pre"],
    category: "stimulants",
    tier: "watch",
    summary: "Most pre-workouts contain 200–400mg caffeine plus other compounds. The caffeine adds cardiovascular stress, diuretic effects (compounding dehydration risk), and additional appetite suppression during training.",
    mitigation: [
      "Assess total caffeine load across the day — 400mg+ consistently is worth reconsidering",
      "Hydrate aggressively before, during, and after workouts when using pre-workout",
      "Non-stimulant versions (pump formulas) eliminate most of the interaction concern",
    ],
  },
  {
    id: "caffeine",
    name: "Caffeine (coffee, energy drinks)",
    aliases: ["caffeine", "coffee", "energy drink", "red bull", "monster", "bang", "celsius", "pre-workout caffeine", "espresso"],
    category: "stimulants",
    tier: "low",
    summary: "Normal caffeine intake doesn't significantly interact with retatrutide. At high intake (400mg+/day), the diuretic effect and mild cardiovascular stress are worth noting — especially alongside retatrutide's appetite suppression and reduced fluid intake from food.",
    mitigation: [
      "Typical coffee use (1–3 cups/day) is fine — no significant adjustment needed",
      "If experiencing dehydration symptoms, check total caffeine load across all sources",
      "Energy drinks + pre-workout + coffee can stack to meaningfully high caffeine levels",
    ],
  },

  // ── SUPPLEMENTS ─────────────────────────────────────────────────────────────

  {
    id: "protein-powder",
    name: "Protein Powder / Amino Acids",
    aliases: ["protein powder", "whey", "casein", "plant protein", "protein shake", "bcaa", "amino acids", "essential amino acids", "eaa"],
    category: "supplements",
    tier: "low",
    summary: "No interaction — and actively recommended. Protein shakes become an important tool for hitting protein targets when appetite is suppressed and whole-food intake drops. This is part of the protocol, not a concern.",
    mitigation: [
      "Make daily protein intake a tracked metric, especially in the first 8 weeks",
      "Aim for 0.7–1g per lb of goal body weight daily — harder than it sounds when you're not hungry",
      "Shakes are a practical solution, not a compromise",
    ],
  },
  {
    id: "creatine",
    name: "Creatine",
    aliases: ["creatine", "creatine monohydrate", "creatine hcl", "creatine ethyl ester"],
    category: "supplements",
    tier: "low",
    summary: "No significant interaction. Creatine actively supports lean mass preservation during caloric restriction — it works in the same direction as the lean mass protection goal on retatrutide.",
    mitigation: [
      "Continue or start — 3–5g/day creatine monohydrate",
      "The extra hydration already recommended for retatrutide aligns with creatine's hydration needs",
      "Modest scale weight increase from creatine loading (water retention) is normal — not fat gain",
    ],
  },
  {
    id: "magnesium",
    name: "Magnesium",
    aliases: ["magnesium", "magnesium glycinate", "magnesium citrate", "magnesium oxide", "mag glycinate"],
    category: "supplements",
    tier: "low",
    summary: "No significant interaction — and often beneficial. Magnesium deficiency is common, and constipation (a major retatrutide side effect) is one of the things magnesium citrate/glycinate is used to address.",
    mitigation: [
      "Magnesium glycinate or citrate (200–400mg before bed) is a standard part of GI management on GLP-1s",
      "Magnesium oxide is less bioavailable and more likely to cause loose stools — other forms preferred",
      "No major safety concern at typical supplement doses",
    ],
  },
  {
    id: "fiber",
    name: "Fiber Supplements",
    aliases: ["fiber", "psyllium husk", "metamucil", "benefiber", "inulin", "prebiotic fiber", "citrucel"],
    category: "supplements",
    tier: "low",
    summary: "Actively beneficial. Fiber supplements directly address constipation (a major retatrutide side effect) and help maintain GI regularity. They also slow glucose absorption and improve satiety.",
    mitigation: [
      "Psyllium husk (1 tbsp/day in water) is one of the most evidence-backed options",
      "Take with plenty of water — fiber without adequate hydration can worsen constipation",
      "Start low and increase gradually to avoid bloating",
    ],
  },
  {
    id: "omega3",
    name: "Omega-3 / Fish Oil",
    aliases: ["omega-3", "omega 3", "fish oil", "krill oil", "dha", "epa", "nordic naturals", "carlson"],
    category: "supplements",
    tier: "low",
    summary: "No direct interaction with retatrutide. At very high doses (3g+ EPA/DHA combined daily), mild blood-thinning effects are possible — relevant only if also on warfarin or other anticoagulants.",
    mitigation: [
      "Standard doses (1–2g EPA/DHA) are fine — no adjustment needed",
      "If on warfarin, just note total omega-3 intake in your anticoagulation management",
    ],
  },
  {
    id: "melatonin",
    name: "Melatonin",
    aliases: ["melatonin", "sleep supplement"],
    category: "supplements",
    tier: "low",
    summary: "No significant interaction with retatrutide. Sleep quality matters more than usual during active weight loss (poor sleep elevates cortisol and increases muscle catabolism) — melatonin use is fine.",
    mitigation: [
      "No specific adjustments needed",
      "Prioritizing 7–9 hours of sleep is one of the underrated components of the protocol",
    ],
  },

  // ── RECREATIONAL ────────────────────────────────────────────────────────────

  {
    id: "opioids-recreational",
    name: "Opioids (recreational)",
    aliases: ["heroin", "fentanyl", "recreational opioid", "recreational narcotics", "illicit opioids", "street drugs", "opioid use"],
    category: "recreational",
    tier: "flag",
    summary: "Same GI mechanism as prescribed opioids — but worse. Unpredictable dosing, unknown adulterants, and no medical supervision. The constipation and GI motility shutdown from combining opioids with retatrutide is genuinely dangerous.",
    mitigation: [
      "This combination has real bowel obstruction risk — not a theoretical concern",
      "If this is your situation, it needs to be part of a clinical conversation before starting retatrutide",
      "Harm reduction: if continuing, aggressive bowel protocol is essential (stool softeners daily, high hydration)",
    ],
  },
  {
    id: "cannabis",
    name: "Cannabis / THC",
    aliases: ["cannabis", "marijuana", "weed", "thc", "cbd", "edibles", "vaping cannabis", "dabs", "pot", "joint", "blunt"],
    category: "recreational",
    tier: "watch",
    summary: "THC stimulates appetite through CB1 receptor agonism — 'the munchies' partially counteracts retatrutide's appetite suppression. CBD adds its own drug interactions through CYP enzyme inhibition. Heavy use may meaningfully blunt weight loss effectiveness.",
    mitigation: [
      "Moderate use is unlikely to completely override appetite control",
      "If using heavily and weight loss is stalling, appetite stimulation is a plausible factor",
      "CBD-dominant products have less appetite stimulation but their CYP interactions still apply if you're on affected medications",
    ],
  },
  {
    id: "alcohol",
    name: "Alcohol",
    aliases: ["alcohol", "beer", "wine", "liquor", "drinking", "ethanol"],
    category: "recreational",
    tier: "watch",
    summary: "Alcohol adds liquid calories that bypass appetite suppression, compounds GI irritation, and reduces inhibitions around eating. Intoxication can feel stronger on less food. If on diabetes medications, hypoglycemia risk during and after drinking increases.",
    mitigation: [
      "Reduce quantity — effects are amplified when eating significantly less",
      "Have something to eat with alcohol even if you're not hungry",
      "If on diabetes medications, monitor blood sugar carefully around drinking",
    ],
  },
  {
    id: "nicotine",
    name: "Nicotine / Smoking",
    aliases: ["nicotine", "smoking", "vaping", "cigarettes", "tobacco", "juul", "e-cigarette", "chewing tobacco", "nicotine patch", "nicotine gum"],
    category: "recreational",
    tier: "watch",
    summary: "Nicotine is a cardiovascular stressor that independently complicates metabolic health outcomes. While quitting smoking may cause transient weight gain (which retatrutide can offset), continuing smoking undermines many of the cardiovascular benefits of weight loss.",
    mitigation: [
      "This is worth addressing as a separate conversation — the interaction is about long-term outcome interference, not acute safety",
      "Nicotine replacement therapy (patch, gum) has significantly less cardiovascular risk than smoking",
      "The weight loss benefits of retatrutide can help buffer the modest weight gain from nicotine cessation",
    ],
  },
  {
    id: "cocaine-stimulants",
    name: "Cocaine / Illicit Stimulants",
    aliases: ["cocaine", "coke", "meth", "methamphetamine", "mdma", "ecstasy", "stimulant drug", "speed"],
    category: "recreational",
    tier: "flag",
    summary: "Illicit stimulants impose serious cardiovascular stress: elevated heart rate, blood pressure, and cardiac demand. Combined with the metabolic changes from retatrutide and reduced nutritional intake, this creates compounding cardiovascular and nutritional risk.",
    mitigation: [
      "This requires a clinical conversation before starting retatrutide",
      "Cardiovascular risk is the primary concern — not theoretical",
    ],
  },

  // ── PEPTIDES ────────────────────────────────────────────────────────────────

  {
    id: "tirzepatide",
    name: "Tirzepatide",
    aliases: ["tirzepatide", "mounjaro", "zepbound", "twincretin"],
    category: "peptides",
    tier: "flag",
    summary: "Tirzepatide already covers GLP-1 and GIP receptor agonism. Retatrutide covers all three of the same receptors plus glucagon. Stacking these creates massive receptor overlap — compounding side effects with no studied rationale.",
    mitigation: [
      "These should not be used together",
      "If transitioning from tirzepatide to retatrutide, allow adequate washout (tirzepatide half-life ~5 days; allow 2–3 weeks minimum)",
    ],
  },
  {
    id: "bpc157",
    name: "BPC-157",
    aliases: ["bpc-157", "bpc157", "body protection compound", "pentadecapeptide"],
    category: "peptides",
    tier: "low",
    summary: "No known significant interaction with retatrutide. BPC-157 is sometimes used specifically to manage GI side effects of GLP-1 class drugs — this is a reported combination with no major red flags in the literature.",
    mitigation: [
      "No specific adjustments needed",
      "If using BPC-157 to manage GI side effects, this is a reasonable approach — some community reporting supports it",
    ],
  },
  {
    id: "ipamorelin-cjc",
    name: "Ipamorelin / CJC-1295",
    aliases: ["ipamorelin", "cjc-1295", "cjc1295", "ghrp", "ghrh", "growth hormone peptide", "sermorelin"],
    category: "peptides",
    tier: "watch",
    summary: "Growth hormone secretagogues affect body composition through GH/IGF-1 axis stimulation — adding GH-driven anabolic signaling alongside reta's significant fat loss. The combination is used in the community, but complex metabolic interactions haven't been systematically studied.",
    mitigation: [
      "Body composition monitoring matters more — track lean mass not just scale weight",
      "The combination is used but not studied — treat outcomes as individual and track closely",
      "Timing: most use ipamorelin before sleep; generally not concurrent with reta injection",
    ],
  },
  {
    id: "tb500",
    name: "TB-500 / Thymosin Beta-4",
    aliases: ["tb-500", "tb500", "thymosin beta-4", "thymosin beta4"],
    category: "peptides",
    tier: "low",
    summary: "No known interaction with GLP-1/GIP/glucagon receptor mechanisms. TB-500 operates through actin regulation and anti-inflammatory pathways that don't intersect meaningfully with retatrutide's effects.",
    mitigation: [
      "No specific adjustments needed",
      "Continue as intended if using for recovery purposes",
    ],
  },
];

const SORT_ORDER = (a: Interaction, b: Interaction) =>
  TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || a.name.localeCompare(b.name);

export default function RetaInteractionsPanel() {
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
