export type ContextPack = {
  id: string;
  label: string;
  synonyms: string[];
  /** "low" = no direct concern; "watch" = worth monitoring; "flag" = discuss before starting */
  signal?: "low" | "watch" | "flag";
  /** One-sentence plain-language verdict shown first. */
  signalNote?: (peptideName: string, query: string) => string;
  // Copy blocks are intentionally non-directive and non-protocol
  contextSummary: (peptideName: string, query: string) => string;
  whatIsKnown: (peptideName: string, query: string) => string;
  whatIsUnclear: (peptideName: string, query: string) => string;
  whyExperiencesVary: (peptideName: string, query: string) => string;
};

export type Match = {
  pack: ContextPack;
  score: number; // 0..1
  matchedTerms: string[];
};

function norm(s: string) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\-\/\(\)]+/g, "")
    .replace(/\s+/g, " ");
}

function tokens(s: string) {
  const t = norm(s)
    .split(" ")
    .map((x) => x.trim())
    .filter(Boolean);
  return Array.from(new Set(t));
}

function contains(hay: string, needle: string) {
  return hay.includes(needle);
}

function scorePack(queryNorm: string, queryTokens: string[], pack: ContextPack): Match {
  const terms = Array.from(new Set([pack.label, ...pack.synonyms].map(norm))).filter(Boolean);
  const matched: string[] = [];

  let hits = 0;
  let weight = 0;

  for (const term of terms) {
    if (!term) continue;
    const w = term.length >= 12 ? 1.2 : term.length >= 7 ? 1.0 : 0.8;
    weight += w;

    if (contains(queryNorm, term)) {
      hits += w * 1.6; // phrase hit stronger
      matched.push(term);
      continue;
    }

    // token-level hits
    const termToks = tokens(term);
    const inter = termToks.filter((t) => queryTokens.includes(t));
    if (inter.length) {
      hits += w * Math.min(1.0, inter.length / Math.max(2, termToks.length));
      matched.push(...inter);
    }
  }

  const raw = weight ? hits / weight : 0;
  const score = Math.max(0, Math.min(1, raw));
  return {
    pack,
    score,
    matchedTerms: Array.from(new Set(matched)).slice(0, 6),
  };
}

// Context packs: conservative, non-directive, focused on interpretation + variability.
// Synonyms cover both plain-language (uneducated user) and clinical terms (educated user).
export const CONTEXT_PACKS: ContextPack[] = [

  // ─── KIDNEY ───────────────────────────────────────────────────────────────
  {
    id: "pt_ctx_kidney_disease_ckd",
    label: "Kidney disease (CKD) / reduced kidney function",
    synonyms: [
      // plain language
      "kidney", "kidneys", "kidney problems", "kidney issues", "kidney failure",
      "bad kidneys", "kidney function", "poor kidney function", "low kidney function",
      "kidney not working", "kidney damage",
      // clinical
      "ckd", "chronic kidney disease", "reduced kidney function", "renal", "renal disease",
      "renal failure", "renal impairment", "renal insufficiency", "renal function",
      "low egfr", "egfr", "creatinine", "creatinine elevated", "elevated creatinine",
      "dialysis", "hemodialysis", "peritoneal dialysis", "on dialysis",
      "proteinuria", "nephrotic syndrome", "nephropathy", "nephritis", "glomerulonephritis",
      "polycystic kidney", "pkd", "kidney transplant", "transplant", "azotemia",
      "uremia", "stage 3 kidney", "stage 4 kidney", "stage 5 kidney",
    ],
    signal: "flag",
    signalNote: (peptide, q) =>
      `Reduced kidney function changes how ${peptide} is cleared and tolerated — this is a real flag worth discussing with a provider before starting.`,
    contextSummary: (peptide, q) =>
      `The kidneys handle clearance for many peptides, so reduced function means the compound lingers longer and side effects can hit harder at the same dose. GLP-1 class compounds also carry nausea and vomiting risk, which can cause dehydration — a serious accelerant for kidney decline. If eGFR is below 60, this needs to be part of the conversation before starting.`,
    whatIsKnown: (peptide, q) =>
      `GLP-1 receptor agonists have shown some renal-protective effects in trials (reduced albuminuria, slower eGFR decline), but those were in people with mild-to-moderate CKD and careful monitoring. At stage 3b+ or on dialysis, clearance changes meaningfully. Track eGFR, creatinine, and hydration status closely — especially during the titration phase when nausea peaks.`,
    whatIsUnclear: (peptide, q) =>
      `Most ${peptide} data comes from people with normal or mildly reduced kidney function. How it behaves at stage 4-5, on dialysis, or post-transplant is largely unstudied. The dehydration risk from early GI side effects is the biggest practical unknown.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with stable stage 3a CKD and good hydration will have a completely different experience than someone with stage 4, on three blood pressure meds, running borderline dehydrated. CKD stage, fluid balance, medication load, and protein intake all drive the gap.`,
  },

  // ─── THYROID ──────────────────────────────────────────────────────────────
  {
    id: "thyroid",
    label: "Thyroid conditions",
    synonyms: [
      // plain language
      "thyroid", "thyroid problem", "thyroid problems", "thyroid issues", "thyroid disease",
      "thyroid disorder", "thyroid condition", "underactive thyroid", "overactive thyroid",
      "slow thyroid", "thyroid medication", "thyroid meds", "on thyroid medication",
      "thyroid removal", "no thyroid", "bad thyroid",
      // clinical
      "hypothyroid", "hypothyroidism", "hyperthyroid", "hyperthyroidism",
      "hashimoto", "hashimotos", "hashimoto's", "graves", "graves disease",
      "levothyroxine", "synthroid", "armour thyroid", "liothyronine", "cytomel",
      "t3", "t4", "tsh", "thyroxine", "thyroid stimulating hormone",
      "thyroid nodule", "goiter", "thyroid cancer", "thyroidectomy",
      "iodine", "euthyroid", "subclinical hypothyroid", "metabolism",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Well-managed thyroid conditions don't interact directly with ${peptide} — the early fatigue window during titration is the real thing to watch.`,
    contextSummary: (peptide, q) =>
      `If your thyroid is optimized (TSH in range, energy stable), there's no known direct interaction with ${peptide}. The concern is the titration phase — appetite drops sharply, energy dips, and for someone already managing fatigue from thyroid disease that 4-6 week adjustment can feel rough. It usually stabilizes. If thyroid is NOT optimized, fix that first — uncontrolled hypothyroidism amplifies weight-loss resistance and fatigue.`,
    whatIsKnown: (peptide, q) =>
      `Thyroid meds (levothyroxine, Synthroid, Armour) aren't known to interact pharmacologically with GLP-1 class compounds. What matters more is whether thyroid function is well-controlled before starting — unoptimized T3/T4 amplifies fatigue and weight-loss resistance. Have labs current within 3-6 months. GLP-1 compounds can also slow gastric emptying, which theoretically could affect levothyroxine absorption timing.`,
    whatIsUnclear: (peptide, q) =>
      `There's no good data on how triple agonists like ${peptide} specifically affect people with Hashimoto's or those on combination T3/T4 therapy. Most GLP-1 trials don't stratify by thyroid status, so the real-world nuance is largely extrapolated.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with well-controlled hypothyroidism on a stable levothyroxine dose will barely notice a difference. Someone with fluctuating Hashimoto's, poor sleep, and marginal T3 levels may find the early fatigue phase genuinely hard. Thyroid stability, medication type, and baseline energy reserves drive the gap.`,
  },

  // ─── AUTOIMMUNE ───────────────────────────────────────────────────────────
  {
    id: "autoimmune",
    label: "Autoimmune conditions",
    synonyms: [
      // plain language
      "autoimmune", "autoimmune disease", "autoimmune condition", "immune system",
      "immune problems", "immune issues", "body attacking itself", "inflammation",
      "inflammatory", "inflammatory condition", "chronic inflammation",
      "on immune suppressing medication", "immunosuppressed", "immunocompromised",
      "low immune", "weak immune system", "immune suppressed",
      // specific conditions
      "lupus", "sle", "systemic lupus",
      "ra", "rheumatoid", "rheumatoid arthritis", "arthritis",
      "ms", "multiple sclerosis",
      "crohns", "crohn's", "crohn's disease",
      "ulcerative colitis", "uc",
      "psoriasis", "psoriatic arthritis",
      "ankylosing spondylitis", "as", "axial spondyloarthritis",
      "sjogrens", "sjogren's", "sjogren",
      "celiac", "celiac disease", "gluten",
      "fibromyalgia",
      "vasculitis", "sarcoidosis", "myositis",
      "behcets", "raynauds", "raynaud's",
      // medications
      "immunosuppressant", "biologics", "biologic", "methotrexate",
      "hydroxychloroquine", "plaquenil", "prednisone", "corticosteroids",
      "steroids", "anti-inflammatory", "tnf", "tnf inhibitor",
      "humira", "adalimumab", "remicade", "infliximab", "enbrel", "etanercept",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Autoimmune conditions don't block ${peptide} use, but flare cycles and immunosuppressant medications add real variables worth tracking.`,
    contextSummary: (peptide, q) =>
      `${peptide} isn't contraindicated by autoimmune conditions, but the picture gets complicated. Flare cycles mean your baseline shifts week to week — fatigue, pain, and inflammation move independently of anything you add. If you're on immunosuppressants (methotrexate, biologics, prednisone), those already affect appetite, GI function, and energy, so isolating what ${peptide} is doing requires patience and honest tracking.`,
    whatIsKnown: (peptide, q) =>
      `GLP-1 class compounds have shown some anti-inflammatory effects in metabolic contexts, but that doesn't mean they help autoimmune inflammation specifically. If you're on prednisone or biologics, watch for GI overlap — nausea from ${peptide} stacked on methotrexate nausea is a real pattern. Track flare timing separately from ${peptide} titration changes so you can tell them apart.`,
    whatIsUnclear: (peptide, q) =>
      `Direct evidence for ${peptide} in autoimmune populations is essentially absent. Whether it modulates immune activity in any clinically meaningful way (positive or negative) is unknown. Most trials exclude people on immunosuppressants.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with stable, well-controlled RA on a biologic will have a very different experience than someone with active lupus flares on high-dose prednisone. Disease activity, immunosuppressant type, flare frequency, and baseline GI tolerance drive the range.`,
  },

  // ─── ANTIDEPRESSANTS / SSRIs ──────────────────────────────────────────────
  {
    id: "ssri",
    label: "Antidepressants (SSRIs / SNRIs)",
    synonyms: [
      // plain language
      "antidepressant", "antidepressants", "depression medication", "depression meds",
      "on antidepressants", "depression", "anxiety medication", "mental health medication",
      "psychiatric medication", "psychiatric meds", "on psych meds",
      "mood medication", "mood meds",
      // drug classes
      "ssri", "snri",
      // specific drugs (brand + generic)
      "sertraline", "zoloft",
      "fluoxetine", "prozac",
      "escitalopram", "lexapro",
      "citalopram", "celexa",
      "paroxetine", "paxil",
      "venlafaxine", "effexor",
      "duloxetine", "cymbalta",
      "bupropion", "wellbutrin",
      "mirtazapine", "remeron",
      "trazodone",
      "desvenlafaxine", "pristiq",
      "fluvoxamine", "luvox",
      "vilazodone", "viibryd",
      "vortioxetine", "trintellix",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `SSRIs and SNRIs don't interact pharmacologically with ${peptide}, but they share overlapping side-effect territory — appetite, nausea, sleep, and motivation all move in both directions.`,
    contextSummary: (peptide, q) =>
      `No known direct drug interaction between ${peptide} and SSRIs/SNRIs. The practical issue is overlapping symptoms: both can affect appetite, nausea, sleep, energy, and libido. If you recently started or changed antidepressant dose, give that 4-6 weeks to stabilize before adding ${peptide} — otherwise you'll have no idea what's causing what. Mirtazapine (Remeron) is a special case because it increases appetite, which ${peptide} suppresses; the tug-of-war can be confusing.`,
    whatIsKnown: (peptide, q) =>
      `SSRIs commonly cause initial nausea that overlaps with GLP-1 side effects. Bupropion (Wellbutrin) can itself suppress appetite, so combined with ${peptide} the effect may be stronger than expected. Track mood stability separately — if you notice flattened mood or increased apathy, flag it, because that pattern can come from either side. Weight changes on SSRIs (gain or loss) add another variable.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} affects serotonin signaling or antidepressant efficacy in any meaningful way is unstudied. Most metabolic trials don't capture psychiatric baselines or antidepressant use, so the real-world interaction picture is inferred rather than measured.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone stable on Lexapro for years will barely notice an interaction. Someone who just started Zoloft two weeks ago and adds ${peptide} will have overlapping nausea, appetite shifts, and mood changes that are nearly impossible to untangle. Antidepressant type, dose stability, and how long you've been on it matter enormously.`,
  },

  // ─── ANXIETY / ADHD / STIMULANTS ─────────────────────────────────────────
  {
    id: "pt_ctx_anxiety_adhd",
    label: "Anxiety, ADHD, and stimulant medications",
    synonyms: [
      // plain language
      "anxiety", "anxious", "nervous", "panic", "panic attacks", "panic disorder",
      "social anxiety", "generalized anxiety", "stress", "chronic stress",
      "worried", "overthinking", "ocd", "ptsd", "trauma",
      "adhd", "add", "attention deficit", "focus problems", "can't focus",
      "concentration", "brain fog", "distracted",
      "stimulant", "stimulants", "stimulant medication", "on stimulants",
      // specific anxiety/ADHD meds
      "adderall", "amphetamine", "mixed amphetamine salts",
      "vyvanse", "lisdexamfetamine",
      "ritalin", "methylphenidate", "concerta", "focalin", "dexedrine",
      "modafinil", "provigil", "armodafinil", "nuvigil",
      "atomoxetine", "strattera",
      "guanfacine", "intuniv", "clonidine",
      // anxiety meds
      "benzodiazepine", "benzo", "benzos",
      "xanax", "alprazolam",
      "klonopin", "clonazepam",
      "ativan", "lorazepam",
      "valium", "diazepam",
      "buspirone", "buspar",
      "hydroxyzine", "vistaril",
      "propranolol", "beta blocker for anxiety",
      "gad", "ocd", "nervous system",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Stimulants and ${peptide} both suppress appetite and can nudge heart rate up — stacking these effects is manageable but worth monitoring.`,
    contextSummary: (peptide, q) =>
      `GLP-1/GIP/glucagon agonists like ${peptide} are potent appetite suppressors. On Adderall or Vyvanse, appetite suppression can stack — some people eat almost nothing early on. That's not a win; it's a muscle loss and nutrient depletion risk. If you're on stimulants, you need to be intentional about eating enough protein (minimum 100g/day) even when you don't feel hungry. For anxiety, ${peptide}'s early nausea and heart rate changes can mimic anxiety symptoms, which may spike health-monitoring behavior.`,
    whatIsKnown: (peptide, q) =>
      `Track your resting heart rate if you're on stimulants — both Adderall and aggressive GLP-1 receptor agonists can nudge heart rate up 5-10 bpm. Not a dealbreaker, but worth knowing. Stimulant users also tend to undereat protein, and adding ${peptide} makes that worse. Benzodiazepines and buspirone don't have known interactions, but sedation plus GLP-1 nausea can feel rough.`,
    whatIsUnclear: (peptide, q) =>
      `Studies consistently exclude people on stimulants, so the real-world interaction picture is largely extrapolated. Whether ${peptide} affects ADHD symptom management, anxiety baseline, or stimulant efficacy is unknown.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone on low-dose Vyvanse with mild anxiety will have a different experience than someone on high-dose Adderall with panic disorder. Stimulant dose, caffeine intake, baseline anxiety level, and whether someone tends to hyper-focus on body sensations all shape the experience dramatically.`,
  },

  // ─── OLDER ADULTS ─────────────────────────────────────────────────────────
  {
    id: "older-adults",
    label: "Older adults",
    synonyms: [
      // plain language
      "older", "older adult", "older adults", "older person", "older people",
      "elderly", "senior", "seniors", "retired", "retirement",
      "65 years old", "70 years old", "75 years old", "80 years old",
      "65+", "70+", "75+", "80+", "over 65", "over 70", "over 75", "over 80",
      "aging", "age", "age-related", "getting older", "older population",
      "geriatric", "late life",
      // concerns
      "frailty", "frail", "polypharmacy", "many medications", "lots of medications",
      "comorbidities", "multiple conditions", "cognitive decline", "memory",
      "osteoporosis", "bone loss", "bone density", "falls", "balance",
      "muscle loss", "sarcopenia", "functional decline",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Age itself isn't a contraindication, but muscle preservation and fall risk from rapid weight loss are real concerns with ${peptide} in older adults.`,
    contextSummary: (peptide, q) =>
      `The biggest risk with ${peptide} in older adults isn't a drug interaction — it's sarcopenia. Aggressive appetite suppression plus age-related muscle loss can accelerate functional decline if protein intake drops. GLP-1 class compounds cause weight loss that's roughly 60-70% fat and 30-40% lean mass. For someone over 65, losing muscle is a fall risk. Strength training and high protein (1.2-1.6g/kg) aren't optional in this group.`,
    whatIsKnown: (peptide, q) =>
      `Polypharmacy is common over 65, so check for anything that compounds nausea or dehydration risk (diuretics, metformin, blood pressure meds). Kidney function tends to decline with age — even "normal" creatinine can mask reduced GFR. Start at the lowest dose and titrate slowly. Monitor weight loss rate: more than 1% body weight per week in an older adult warrants a conversation.`,
    whatIsUnclear: (peptide, q) =>
      `Most ${peptide} trial participants are 40-65. Data in people over 70 is thin, and over 80 essentially nonexistent. How age-related changes in gut motility, renal clearance, and body composition affect ${peptide} tolerability is mostly inferred.`,
    whyExperiencesVary: (peptide, q) =>
      `A fit 68-year-old who strength trains will respond very differently than a frail 78-year-old on eight medications. Baseline muscle mass, kidney function, medication burden, activity level, and nutritional status create a massive range in this age group.`,
  },

  // ─── PREGNANCY / FERTILITY ────────────────────────────────────────────────
  {
    id: "pregnancy",
    label: "Pregnancy, fertility, and breastfeeding",
    synonyms: [
      // plain language
      "pregnant", "pregnancy", "having a baby", "expecting", "expecting a baby",
      "trying to get pregnant", "trying for a baby", "want to get pregnant",
      "fertility", "infertility", "can't get pregnant", "trouble conceiving",
      "breastfeeding", "nursing", "nursing mom", "nursing mother", "pumping breast milk",
      "postpartum", "after baby", "new mom", "new mother",
      // clinical / abbreviations
      "trying to conceive", "ttc", "ivf", "in vitro fertilization", "iui",
      "lactation", "prenatal", "postnatal", "antenatal",
      "first trimester", "second trimester", "third trimester",
      "miscarriage", "pregnancy loss", "conception", "reproductive health",
      "birth control", "contraception", "getting off birth control",
      "newborn", "childbirth",
    ],
    signal: "flag",
    signalNote: (peptide, q) =>
      `${peptide} should be stopped before conception and is not recommended during pregnancy or breastfeeding — there's no safety data and the risk profile is unknown.`,
    contextSummary: (peptide, q) =>
      `This is straightforward: ${peptide} has no human safety data in pregnancy or breastfeeding. Animal studies for GLP-1 class drugs have shown adverse fetal outcomes at high doses. The standard recommendation is to stop at least 2 months before trying to conceive (longer for longer-acting formulations). If you're actively trying, this isn't the time. If you got pregnant while on it, stop and talk to your OB — it's not an emergency, but continued use isn't supported.`,
    whatIsKnown: (peptide, q) =>
      `GLP-1 receptor agonists can increase fertility by improving ovulation in women with PCOS or obesity — some people get pregnant unexpectedly after starting. If you're on birth control, don't assume metabolic compounds are neutral. GLP-1 compounds also slow gastric emptying, which can reduce oral contraceptive absorption. During breastfeeding, whether ${peptide} passes into breast milk is unknown.`,
    whatIsUnclear: (peptide, q) =>
      `Human pregnancy exposure data for ${peptide} is essentially zero. The fertility-boosting effect is real but poorly quantified — nobody knows the timeline from starting to ovulatory changes. Transfer into breast milk and effects on infant development are completely unstudied.`,
    whyExperiencesVary: (peptide, q) =>
      `Women with PCOS may see rapid fertility improvements (sometimes within weeks), while others may not. Postpartum weight loss goals add urgency that collides with breastfeeding safety unknowns. The tension between wanting to lose weight and wanting to breastfeed safely is real and personal.`,
  },

  // ─── METABOLIC ────────────────────────────────────────────────────────────
  {
    id: "metabolic",
    label: "Metabolic conditions (diabetes, insulin resistance, PCOS)",
    synonyms: [
      // plain language
      "diabetes", "diabetic", "blood sugar", "blood sugar problems", "high blood sugar",
      "low blood sugar", "sugar problems", "insulin", "insulin resistance",
      "metabolic syndrome", "metabolic", "metabolic health", "metabolism",
      "pcos", "polycystic ovary syndrome", "polycystic ovary",
      "weight issues", "obesity", "obese", "overweight", "belly fat", "visceral fat",
      "hypertension", "high blood pressure", "blood pressure medication",
      // clinical
      "prediabetes", "pre-diabetes", "pre diabetes",
      "type 2 diabetes", "t2d", "type 2", "t2dm",
      "type 1 diabetes", "t1d", "type 1", "t1dm",
      "hyperglycemia", "hypoglycemia", "a1c", "hba1c", "hemoglobin a1c",
      "glucose", "fasting glucose", "fasting blood sugar", "postprandial",
      "metformin", "glucophage",
      "glp-1", "glp1", "semaglutide", "ozempic", "wegovy", "tirzepatide", "mounjaro",
      "sglt2", "jardiance", "farxiga",
      "dyslipidemia", "high triglycerides", "triglycerides", "cholesterol",
      "high ldl", "low hdl",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Metabolic conditions are actually the core use case for ${peptide} — but if you're on insulin or sulfonylureas, hypoglycemia risk is the thing to manage carefully.`,
    contextSummary: (peptide, q) =>
      `This is where ${peptide} is designed to work. GLP-1/GIP agonism directly targets insulin sensitivity, appetite, and glucose control. If you have type 2 diabetes or insulin resistance, the effects tend to be more pronounced — sometimes dramatically so. The catch: if you're already on insulin or sulfonylureas, adding ${peptide} can cause hypoglycemia. Your diabetes meds will likely need adjusting downward, often within the first few weeks. For PCOS, the insulin-sensitizing effects can improve ovulation (see fertility considerations).`,
    whatIsKnown: (peptide, q) =>
      `Track fasting glucose, A1c, and fasting insulin if possible. If you're on metformin, that's generally fine to continue — GI side effects may stack initially but usually settle. If on insulin or a sulfonylurea, coordinate with your prescriber because doses typically need reduction within 2-4 weeks. Blood pressure often improves with weight loss, so monitor if you're on antihypertensives — you may need less medication.`,
    whatIsUnclear: (peptide, q) =>
      `For type 1 diabetes, ${peptide} data is very limited and the risk-benefit is different — appetite suppression without matching insulin reduction is dangerous. Long-term effects on insulin sensitivity after stopping ${peptide} are still being studied. Whether metabolic improvements persist or reverse after discontinuation varies.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with prediabetes and mild insulin resistance may see steady, undramatic improvement. Someone with uncontrolled T2D on multiple medications may see dramatic glucose drops that require aggressive med adjustments. Baseline metabolic severity, medication stack, and diet composition drive the variance.`,
  },

  // ─── LIVER DISEASE ────────────────────────────────────────────────────────
  {
    id: "pt_ctx_liver_disease",
    label: "Liver disease / reduced liver function",
    synonyms: [
      // plain language
      "liver", "liver problems", "liver issues", "liver disease", "liver damage",
      "bad liver", "liver not working", "liver function", "poor liver function",
      "liver inflammation", "liver enzymes", "liver enzymes elevated", "liver enzymes high",
      "elevated liver enzymes", "high liver enzymes", "liver condition",
      // clinical
      "fatty liver", "nafld", "nash", "nonalcoholic fatty liver", "nonalcoholic steatohepatitis",
      "cirrhosis", "liver cirrhosis", "fibrosis", "liver fibrosis",
      "hepatitis", "hepatitis b", "hepatitis c", "viral hepatitis",
      "alcoholic liver disease", "ald", "alcohol-related liver",
      "alt", "ast", "bilirubin", "albumin", "child pugh",
      "portal hypertension", "hepatic encephalopathy", "ascites",
      "liver cancer", "hepatocellular carcinoma", "hcc",
      "jaundice", "yellow skin", "yellow eyes",
      "liver transplant", "steatohepatitis",
    ],
    signal: "flag",
    signalNote: (peptide, q) =>
      `Mild fatty liver may actually benefit from ${peptide}'s metabolic effects, but significant liver disease (cirrhosis, elevated bilirubin) changes drug handling and warrants careful evaluation.`,
    contextSummary: (peptide, q) =>
      `This splits two ways. NAFLD/NASH (fatty liver) is actually a condition where GLP-1 class drugs show real promise — weight loss and improved insulin sensitivity can reduce liver fat meaningfully. But if you have cirrhosis, significant fibrosis, or compromised liver function (elevated bilirubin, low albumin), ${peptide} metabolism and clearance change unpredictably. Mild fatty liver and advanced liver disease are completely different risk profiles.`,
    whatIsKnown: (peptide, q) =>
      `For NAFLD/NASH, GLP-1 agonists have shown reduced liver fat, improved ALT/AST, and in some cases histological improvement. Track liver enzymes (ALT, AST) at baseline and every 2-3 months initially. If you're on medications processed through the liver, clearance may shift as liver fat decreases. For advanced disease, nausea and dehydration from ${peptide} can worsen hepatic encephalopathy risk.`,
    whatIsUnclear: (peptide, q) =>
      `How ${peptide} specifically behaves in cirrhosis (Child-Pugh B or C) is unstudied. Whether the liver-protective effects seen in mild NAFLD extend to more advanced disease is unproven. Drug-drug interactions in the setting of impaired hepatic metabolism are largely theoretical.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with simple fatty liver and mildly elevated ALT may see their enzymes normalize within months. Someone with compensated cirrhosis faces a completely different risk calculus. Disease stage, synthetic function, medication burden, and alcohol use history drive the range.`,
  },

  // ─── HEART DISEASE / CARDIOVASCULAR ──────────────────────────────────────
  {
    id: "pt_ctx_cardiovascular",
    label: "Heart disease / cardiovascular conditions",
    synonyms: [
      // plain language
      "heart disease", "heart problems", "heart issues", "heart condition",
      "heart failure", "weak heart", "bad heart", "heart attack", "heart attack history",
      "heart medication", "heart meds", "on heart medication", "cardiac",
      "chest pain", "angina", "palpitations", "heart racing", "rapid heart rate",
      "irregular heartbeat", "heart rhythm", "heart rhythm problem",
      "pacemaker", "defibrillator", "icd", "stent", "bypass", "bypass surgery",
      // clinical
      "cardiovascular disease", "cvd", "coronary artery disease", "cad",
      "congestive heart failure", "chf", "heart failure", "hfref", "hfpef",
      "atrial fibrillation", "afib", "a-fib", "arrhythmia", "dysrhythmia",
      "myocardial infarction", "mi", "stemi", "nstemi",
      "cardiomyopathy", "dilated cardiomyopathy", "hypertrophic cardiomyopathy",
      "valve disease", "aortic stenosis", "mitral regurgitation", "heart murmur",
      "ischemic heart disease", "peripheral artery disease", "pad",
      "stroke", "tia", "mini stroke", "cerebrovascular",
      "ejection fraction", "ef", "low ejection fraction",
      "cabg", "angioplasty", "cardiac catheterization",
      // cardiac medications
      "digoxin", "amiodarone", "metoprolol", "carvedilol", "atenolol",
      "lisinopril", "ramipril", "losartan", "valsartan",
      "statins", "atorvastatin", "rosuvastatin", "simvastatin", "lipitor", "crestor",
      "nitrates", "nitroglycerin", "isosorbide",
      "spironolactone", "furosemide", "lasix", "amlodipine",
    ],
    signal: "flag",
    signalNote: (peptide, q) =>
      `GLP-1 class drugs actually show cardiovascular benefit in trials, but established heart failure or arrhythmia adds complexity that needs a provider's input before starting ${peptide}.`,
    contextSummary: (peptide, q) =>
      `GLP-1 receptor agonists have shown cardiovascular benefit in large trials — reduced MACE events, improved lipids, modest blood pressure reduction. That's the good news. The complexity: if you have heart failure (especially HFrEF), the early nausea/dehydration phase can stress fluid balance. If you're on diuretics, dehydration risk compounds. And the modest heart rate increase (2-4 bpm average) from GLP-1 agonism may matter more if you already have arrhythmia concerns.`,
    whatIsKnown: (peptide, q) =>
      `Monitor heart rate, blood pressure, and weight. If you're on diuretics (furosemide, HCTZ), the dehydration from early GI side effects can cause electrolyte shifts — potassium and sodium especially. Blood pressure medications may need dose reduction as weight drops. Semaglutide's SUSTAIN-6 and SELECT trials showed cardiovascular benefit; ${peptide}'s specific cardiovascular profile is still being characterized.`,
    whatIsUnclear: (peptide, q) =>
      `${peptide}'s long-term cardiovascular outcomes data is less mature than semaglutide's. How it specifically affects people with low ejection fraction, active arrhythmia, or on complex cardiac medication regimens is largely unstudied. The triple-agonist mechanism (GLP-1/GIP/glucagon) has a different hemodynamic profile than pure GLP-1 agonists.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with stable coronary disease on a statin and ACE inhibitor will have a straightforward experience. Someone with heart failure, afib, and four cardiac medications faces real fluid balance and drug interaction complexity. Cardiac diagnosis type, ejection fraction, and medication burden drive the variance.`,
  },

  // ─── BLOOD THINNERS / ANTICOAGULATION ────────────────────────────────────
  {
    id: "pt_ctx_anticoagulation",
    label: "Blood thinners / anticoagulation",
    synonyms: [
      // plain language
      "blood thinner", "blood thinners", "on blood thinners", "blood thinning medication",
      "anticoagulant", "anticoagulants", "anticoagulation",
      "bruising", "easy bruising", "bruise easily", "bruises easily",
      "bleeding risk", "bleed easily", "bleeding",
      "blood clot", "blood clots", "clot", "clotting",
      // specific drugs
      "warfarin", "coumadin",
      "eliquis", "apixaban",
      "xarelto", "rivaroxaban",
      "pradaxa", "dabigatran",
      "plavix", "clopidogrel",
      "aspirin", "baby aspirin", "aspirin therapy", "low-dose aspirin",
      "brilinta", "ticagrelor",
      "effient", "prasugrel",
      "heparin", "lovenox", "enoxaparin", "low molecular weight heparin", "lmwh",
      // conditions requiring anticoagulation
      "inr", "pt inr", "coagulation",
      "dvt", "deep vein thrombosis", "deep vein clot",
      "pulmonary embolism", "pe", "lung clot",
      "clotting disorder", "thrombophilia", "factor v leiden",
      "antiphospholipid syndrome", "aps",
      "thrombosis", "thrombotic",
      "antiplatelet",
      "stroke prevention", "afib anticoagulation",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Blood thinners don't interact pharmacologically with ${peptide}, but GI nausea and vomiting can create a temporary bleeding risk worth flagging.`,
    contextSummary: (peptide, q) =>
      `No direct pharmacological interaction between ${peptide} and anticoagulants. The practical concern is GI: nausea and vomiting during titration can cause retching-related mucosal irritation, and if you're anticoagulated, even minor GI bleeding becomes more significant. For warfarin specifically, significant dietary changes (eating much less, or differently) can shift vitamin K intake and affect INR stability. The DOACs (Eliquis, Xarelto) are less affected by diet but still warrant awareness.`,
    whatIsKnown: (peptide, q) =>
      `If you're on warfarin, get INR checked more frequently during ${peptide} titration — dietary shifts from appetite suppression can move it. For DOACs, the main risk is dehydration from nausea/vomiting affecting renal clearance (Eliquis and Xarelto are partially renally cleared). Track any unusual bruising, dark stools, or bleeding gums as early signals.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} affects anticoagulant absorption through delayed gastric emptying is theoretically possible but not studied. Real-world interaction data for any GLP-1 agonist combined with anticoagulants is thin.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone on Eliquis with stable renal function and mild nausea will likely be fine. Someone on warfarin with borderline INR control who develops significant vomiting faces a real complication risk. Anticoagulant type, INR stability, renal function, and GI symptom severity drive the difference.`,
  },

  // ─── TENDONITIS ───────────────────────────────────────────────────────────
  {
    id: "pt_ctx_tendonitis",
    label: "Tendonitis / tendon pain / overuse injuries",
    synonyms: [
      // plain language
      "tendonitis", "tendon pain", "tendon soreness", "tendon issues", "tendon problems",
      "joint pain", "joint soreness", "connective tissue", "connective tissue pain",
      "overuse", "overuse injury", "overuse injuries", "repetitive strain",
      "training load", "volume", "recovery", "rehab",
      // specific conditions
      "tendinitis", "tendinopathy",
      "achilles tendonitis", "achilles tendinitis", "achilles tendinopathy",
      "achilles pain", "achilles rupture",
      "patellar tendonitis", "patellar tendinitis", "jumper's knee", "jumpers knee",
      "tennis elbow", "golfer's elbow", "lateral epicondylitis", "medial epicondylitis",
      "rotator cuff", "rotator cuff tendinitis", "rotator cuff pain",
      "shoulder tendonitis", "biceps tendonitis",
      "elbow tendonitis", "wrist tendonitis",
      "plantar fasciitis", "plantar fascia",
      "inflammation",
    ],
    signal: "low",
    signalNote: (peptide, q) =>
      `Tendon issues don't create any special concern with ${peptide} — load management and rehab matter far more than the compound.`,
    contextSummary: (peptide, q) =>
      `No pharmacological concern. ${peptide} doesn't affect tendon biology in any known way. The indirect consideration: if weight loss is significant and rapid, and you maintain the same training load, tendons can get irritated because loading patterns change. If you're already dealing with tendinopathy, keep rehab consistent and don't ramp volume just because you feel lighter. Tendons adapt slower than muscles.`,
    whatIsKnown: (peptide, q) =>
      `Tendon remodeling operates on a 3-6 month timeline regardless of what else you're doing. Track training load and don't let rapid weight loss trick you into thinking you can suddenly do more. If you're doing eccentric-focused rehab, keep at it — ${peptide} won't interfere. Adequate protein intake (which can drop with appetite suppression) matters for collagen synthesis.`,
    whatIsUnclear: (peptide, q) =>
      `Whether GLP-1 class compounds have any direct effect on connective tissue healing or collagen metabolism is unknown. It's a theoretical non-issue, but it's genuinely unstudied.`,
    whyExperiencesVary: (peptide, q) =>
      `Tendon issues are overwhelmingly driven by load management, not systemic compounds. Someone doing progressive rehab and managing volume will improve regardless. Someone ignoring load spikes and not sleeping enough won't — and that has nothing to do with ${peptide}.`,
  },

  // ─── BLOOD PRESSURE ───────────────────────────────────────────────────────
  {
    id: "pt_ctx_blood_pressure",
    label: "Blood pressure (high/low) and dizziness",
    synonyms: [
      // plain language
      "blood pressure", "bp", "high blood pressure", "low blood pressure",
      "blood pressure medication", "blood pressure meds", "on blood pressure medication",
      "blood pressure problems", "blood pressure issues", "hypertension", "hypotension",
      "dizziness", "dizzy", "lightheaded", "lightheadedness", "light headed",
      "head rush", "standing up dizzy", "dizzy when standing", "dizzy when getting up",
      "fainting", "faint", "passing out",
      "palpitations", "heart racing", "racing heart", "heart pounding",
      // clinical
      "orthostatic hypotension", "orthostatic", "postural hypotension", "postural",
      "syncope", "presyncope", "tachycardia", "bradycardia",
      "elevated blood pressure", "salt", "sodium", "electrolytes", "hydration", "dehydration",
      // medications
      "diuretics", "water pill", "water pills",
      "beta blocker", "ace inhibitor", "arb",
      "amlodipine", "norvasc", "lisinopril", "losartan", "valsartan",
      "hydrochlorothiazide", "hctz", "chlorthalidone",
      "furosemide", "lasix",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `${peptide} typically lowers blood pressure modestly through weight loss — if you're already on BP meds, you may need to reduce them to avoid dizziness.`,
    contextSummary: (peptide, q) =>
      `GLP-1 agonists reliably lower blood pressure by 2-5 mmHg on average through weight loss and possibly direct vascular effects. If you're already on antihypertensives, the combined effect can cause orthostatic symptoms — dizziness when standing, lightheadedness, head rushes. This is especially true in the first few weeks when nausea reduces fluid and salt intake. It's manageable: hydrate, get electrolytes, and talk to your prescriber about proactively reducing BP medication if needed.`,
    whatIsKnown: (peptide, q) =>
      `Monitor blood pressure at home, especially sitting vs. standing. If the difference is >20 mmHg systolic, you're experiencing orthostatic changes and may need medication adjustment. Diuretics combined with ${peptide}'s early nausea create a dehydration double-hit — sodium, potassium, and magnesium all matter. If you're on a beta blocker, note that ${peptide} can increase heart rate 2-4 bpm, partially offsetting the blocker's effect.`,
    whatIsUnclear: (peptide, q) =>
      `How much of ${peptide}'s blood pressure effect is direct versus weight-mediated isn't fully separated. Whether the blood pressure benefit persists after stopping or reverses with weight regain is still being characterized.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with mild hypertension on one medication may just see their numbers improve. Someone on three blood pressure meds who develops significant nausea and stops eating may become hypotensive and lightheaded within days. Baseline medication burden, hydration habits, and GI tolerance drive the difference.`,
  },

  // ─── GI CONDITIONS ────────────────────────────────────────────────────────
  {
    id: "pt_ctx_gi_conditions",
    label: "Gastrointestinal conditions (IBS / IBD / reflux)",
    synonyms: [
      // plain language
      "stomach", "stomach issues", "stomach problems", "stomach pain", "belly pain",
      "gut", "gut issues", "gut problems", "gut health",
      "digestive", "digestive issues", "digestive problems", "digestion",
      "bowel", "bowel issues", "bowel problems", "bowel movements",
      "bloating", "bloated", "gas", "gassy",
      "nausea", "nauseous", "sick to stomach",
      "diarrhea", "loose stools", "loose stool",
      "constipation", "constipated",
      "heartburn", "acid", "acid reflux", "acidic",
      "vomiting",
      // clinical / conditions
      "ibs", "irritable bowel", "irritable bowel syndrome",
      "ibd", "inflammatory bowel disease",
      "crohns", "crohn's", "crohn's disease",
      "ulcerative colitis", "uc",
      "reflux", "gerd", "gastroesophageal reflux", "acid reflux disease",
      "gastritis", "stomach inflammation",
      "celiac", "celiac disease", "gluten intolerance", "gluten sensitivity",
      "sibo", "small intestinal bacterial overgrowth",
      "leaky gut", "gut permeability",
      "gastroparesis", "slow stomach emptying",
      "ileostomy", "colostomy", "stoma",
      "gut motility", "motility disorder",
      "abdominal pain", "abdominal cramps",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Pre-existing GI conditions mean ${peptide}'s most common side effects — nausea, constipation, reflux — will likely hit harder and earlier.`,
    contextSummary: (peptide, q) =>
      `GLP-1 agonists slow gastric emptying. If you already have gastroparesis, IBS-C, or GERD, this will amplify those symptoms — sometimes significantly. If you have IBD (Crohn's, UC), the nausea and appetite suppression can make it harder to maintain nutrition during flares. For IBS-D, some people actually improve because slower transit normalizes things. Gastroparesis is the biggest red flag — ${peptide} can make it meaningfully worse.`,
    whatIsKnown: (peptide, q) =>
      `Nausea is the #1 side effect of every GLP-1 agonist, affecting 20-45% of people. If you already have a sensitive GI tract, you're more likely to be in that group. Track bowel patterns, nausea timing (before/after meals, AM vs PM), and reflux episodes. For GERD: slower gastric emptying can worsen reflux, especially if lying down after eating. Prokinetic medications (domperidone, metoclopramide) are counterproductive with ${peptide} since they work in opposite directions.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} has direct effects on gut inflammation (helpful or harmful) in IBD is unknown. Long-term effects of prolonged gastric emptying delay on GERD progression or Barrett's esophagus risk haven't been studied. The gut microbiome shifts from dramatically reduced food intake are largely uncharacterized.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with mild IBS-D may actually feel better on ${peptide}. Someone with gastroparesis or severe GERD may find it intolerable within the first week. GI diagnosis subtype, baseline motility, current medications, and individual nausea sensitivity explain the wide range.`,
  },

  // ─── SLEEP ────────────────────────────────────────────────────────────────
  {
    id: "pt_ctx_sleep_issues",
    label: "Sleep issues (insomnia / poor sleep / sleep apnea)",
    synonyms: [
      // plain language
      "sleep", "sleep problems", "sleep issues", "can't sleep", "trouble sleeping",
      "poor sleep", "bad sleep", "not sleeping", "sleep quality",
      "waking up at night", "waking up", "waking early", "early waking",
      "tired", "fatigue", "exhausted", "always tired", "never rested",
      "daytime sleepiness", "sleepy during day", "falling asleep during day",
      "snoring", "loud snoring",
      "sleep apnea", "cpap", "cpap machine", "bipap", "sleep machine",
      // clinical
      "insomnia", "chronic insomnia",
      "obstructive sleep apnea", "osa", "central sleep apnea",
      "restless sleep", "restless legs", "rls",
      "sleep study", "polysomnography",
      "narcolepsy", "hypersomnia",
      "shift work", "shift worker", "night shift", "rotating shift",
      "jet lag", "circadian rhythm", "circadian disruption",
      // medications
      "sleeping pill", "sleeping pills", "sleep medication", "sleep aid",
      "melatonin", "ambien", "zolpidem", "lunesta", "eszopiclone",
      "trazodone for sleep", "mirtazapine for sleep",
      "non-restorative sleep", "sleep deprivation",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Sleep issues don't block ${peptide} use, but poor sleep blunts weight loss and amplifies fatigue — and sleep apnea often improves with weight loss, which is worth tracking.`,
    contextSummary: (peptide, q) =>
      `Sleep is the single biggest confounder in how people feel on ${peptide}. Poor sleep amplifies fatigue, increases hunger, worsens insulin resistance, and makes every side effect feel worse. On the positive side: weight loss from ${peptide} can dramatically improve obstructive sleep apnea — some people reduce or eliminate CPAP within months. If you have untreated sleep apnea, fixing that will likely matter more than anything ${peptide} does.`,
    whatIsKnown: (peptide, q) =>
      `Weight loss of 10-15% can significantly reduce AHI (apnea events per hour) in obstructive sleep apnea. Track sleep quality, not just hours — if you're waking up more rested, that's a real signal. For insomnia, ${peptide} hasn't been shown to directly affect sleep architecture, but eating much less (especially eating nothing after 3pm, which some people do on GLP-1s) can disrupt overnight blood sugar and cause early waking.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} directly affects sleep neurobiology or circadian signaling is unknown. The relationship between rapid caloric restriction and sleep disruption is well-established but poorly characterized in the GLP-1 context specifically. For shift workers, how ${peptide}'s effects interact with circadian disruption is completely unstudied.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with sleep apnea who loses 30 pounds may experience life-changing sleep improvement. Someone with chronic insomnia who starts undereating may find sleep gets worse before it gets better. Sleep diagnosis type, baseline sleep debt, and whether apnea is present drive dramatically different trajectories.`,
  },

  // ─── HORMONE THERAPY ──────────────────────────────────────────────────────
  {
    id: "pt_ctx_hrt_trt",
    label: "Hormone therapy (TRT / estrogen / HRT)",
    synonyms: [
      // plain language
      "hormone therapy", "hormone replacement", "hormones", "hormone medication",
      "on hormones", "hormone treatment",
      "low testosterone", "low t", "low testosterone levels", "testosterone problems",
      "testosterone therapy", "testosterone replacement",
      "libido", "low libido", "sex drive", "low sex drive",
      "erectile dysfunction", "ed", "erection problems",
      "estrogen therapy", "estrogen replacement",
      "menopause hormones", "hrt", "hrm",
      // clinical
      "trt", "testosterone replacement therapy",
      "hypogonadism", "male hypogonadism",
      "estradiol", "progesterone", "androgen therapy",
      "bioidentical hormones", "bhrt", "bioidentical hormone replacement",
      "pellet therapy", "hormone pellets", "testosterone pellets",
      "andropause",
      // medications
      "testosterone cypionate", "testosterone enanthate", "testosterone propionate",
      "androgel", "testim", "testosterone gel", "testosterone cream",
      "dhea", "pregnenolone",
      "clomid", "clomiphene", "enclomiphene",
      "anastrozole", "letrozole", "aromatase inhibitor", "ai",
      "hcg", "human chorionic gonadotropin",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Hormone therapy and ${peptide} don't interact directly, but body composition changes from both can amplify results — and estrogen levels shift with fat loss, which matters for both TRT and HRT users.`,
    contextSummary: (peptide, q) =>
      `No pharmacological interaction. The practical consideration is that fat tissue converts testosterone to estrogen (aromatization), so as ${peptide} drives fat loss, estrogen levels may drop — which can affect mood, libido, and joint comfort for both men on TRT and women on HRT. For men on TRT, rapid fat loss sometimes improves free testosterone but shifts estradiol, requiring AI (aromatase inhibitor) dose adjustment. For women on HRT, monitor whether hot flashes or mood shift as body composition changes.`,
    whatIsKnown: (peptide, q) =>
      `Track body composition (not just weight) if possible — DEXA or even waist circumference. For TRT users, check total testosterone, free testosterone, and estradiol after 3-6 months of significant weight loss, since the ratios can shift. GLP-1 agonists may improve testosterone levels in obese men independently of TRT by reducing insulin resistance and fat mass. HRT absorption (patches, gels) can change with body composition shifts.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} directly affects sex hormone binding globulin (SHBG) or androgen receptor sensitivity is unstudied. How rapid fat loss specifically affects HRT dosing requirements hasn't been systematically evaluated. The timing of hormonal shifts relative to weight loss phases is poorly characterized.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone on stable TRT with moderate body fat may see improved free T as fat drops. Someone on high-dose TRT with aggressive fat loss may get an estrogen crash that tanks mood and libido. Hormone type, dose, delivery method, starting body fat percentage, and rate of fat loss all drive the variance.`,
  },

  // ─── MENOPAUSE ────────────────────────────────────────────────────────────
  {
    id: "pt_ctx_menopause",
    label: "Perimenopause / menopause",
    synonyms: [
      // plain language
      "menopause", "perimenopause", "peri menopause", "change of life",
      "menopausal", "perimenopausal",
      "hot flashes", "hot flash", "night sweats", "sweating at night",
      "hormone shifts", "hormone changes", "hormonal", "hormonal changes",
      "irregular periods", "missed period", "skipping periods", "periods changing",
      "late period", "period problems",
      "vaginal dryness", "vaginal changes",
      "mood changes menopause", "brain fog", "memory problems",
      "weight gain menopause", "belly fat menopause",
      "bone loss menopause", "osteoporosis",
      // clinical
      "estrogen decline", "estrogen loss", "declining estrogen",
      "ovarian function", "ovarian failure", "premature menopause",
      "surgical menopause", "post-menopausal", "postmenopausal",
      "fsh", "follicle stimulating hormone",
      "sleep disruption menopause",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Menopause doesn't block ${peptide} use — but the hormonal transition amplifies fatigue, sleep disruption, and weight-loss resistance, which shapes the experience.`,
    contextSummary: (peptide, q) =>
      `Perimenopause and menopause shift body composition toward visceral fat, increase insulin resistance, and disrupt sleep — which is exactly why many women in this window seek out ${peptide}. The compound can work well here, but expectations need calibrating: weight loss may be slower than for someone with the same BMI who isn't in menopausal transition. The compounding fatigue from declining estrogen plus ${peptide}'s titration-phase energy dip can feel significant for the first month. It usually improves.`,
    whatIsKnown: (peptide, q) =>
      `Track sleep quality (not just hot flashes), energy patterns, and mood alongside weight. If you're on HRT, that generally helps ${peptide} outcomes because stabilized estrogen improves insulin sensitivity and sleep. Bone density is a background concern — rapid weight loss accelerates bone loss, and menopause already does this. Strength training and adequate calcium/vitamin D aren't optional. Protein needs are higher during menopause (1.2g/kg minimum).`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} has any direct effect on menopausal symptoms (hot flashes, mood) is unknown. How the triple-agonist mechanism interacts with declining ovarian hormones hasn't been studied. Whether GLP-1 class compounds affect bone density outcomes differently in menopausal versus premenopausal women is an open question.`,
    whyExperiencesVary: (peptide, q) =>
      `A postmenopausal woman on stable HRT with good sleep may respond like anyone else. A perimenopausal woman with night sweats, insomnia, and wildly fluctuating hormones may find the first 6 weeks of ${peptide} genuinely difficult. Menopause stage, HRT status, sleep quality, and baseline metabolic health drive the range.`,
  },

  // ─── UNDERWEIGHT / LOW BMI ────────────────────────────────────────────────
  {
    id: "pt_ctx_underweight_low_bmi",
    label: "Underweight / low BMI / frailty",
    synonyms: [
      // plain language
      "underweight", "too thin", "thin", "skinny", "can't gain weight",
      "hard to gain weight", "trouble gaining weight", "trying to gain weight",
      "low weight", "low body weight",
      "low appetite", "no appetite", "poor appetite", "not hungry",
      "low bmi", "frailty", "frail", "weak",
      // clinical
      "low body fat", "low body fat percentage",
      "unintentional weight loss", "unexplained weight loss",
      "sarcopenia", "muscle wasting", "muscle loss",
      "cachexia", "wasting syndrome",
      "malnutrition", "malnourished", "undernutrition",
      "nutrient deficiency", "nutrient deficiencies",
      "hard gainer", "ectomorph",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `If you're already underweight or have low appetite, ${peptide}'s appetite suppression is a real risk — further caloric restriction can cause dangerous muscle and nutrient depletion.`,
    contextSummary: (peptide, q) =>
      `This is a genuine concern. ${peptide} is designed to suppress appetite and promote weight loss. If you're already underweight or struggling to eat enough, adding aggressive appetite suppression can push caloric intake dangerously low — muscle wasting, electrolyte depletion, and nutrient deficiency accelerate quickly in people without reserves. Unless there's a specific non-weight-loss reason to use ${peptide} (e.g., glucose control), this needs a clear clinical rationale.`,
    whatIsKnown: (peptide, q) =>
      `GLP-1 agonists cause dose-dependent appetite suppression and weight loss. In someone already at or below healthy weight, there's no metabolic "floor" that prevents further loss. Track caloric intake, protein (aim for at least 1.6g/kg), and body weight weekly. Electrolytes (sodium, potassium, magnesium) can drop quickly if food intake falls below 1000 calories/day. Muscle mass should be monitored — grip strength or body composition tracking.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} has utility at low body weight for non-metabolic indications is poorly studied. Pharmacokinetics may differ in low body-fat individuals (altered distribution volume). The threshold at which appetite suppression becomes clinically dangerous hasn't been defined for this population.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with low BMI but normal muscle mass and good nutritional status may tolerate it cautiously. Someone who's frail, malnourished, or has cachexia is at real risk of harm. Baseline nutritional reserves, reason for low weight, and protein intake capacity drive the difference.`,
  },

  // ─── ATHLETES / INJURY RECOVERY ───────────────────────────────────────────
  {
    id: "pt_ctx_athlete_injury_recovery",
    label: "Athletes: injury recovery, overuse, soreness, and rehab",
    synonyms: [
      // plain language
      "athlete", "athletes", "athletic", "training", "hard training", "heavy training",
      "working out", "gym", "weightlifting", "lifting weights", "strength training",
      "running", "endurance", "cardio", "crossfit",
      "recovery", "recovery time", "slow recovery", "poor recovery",
      "sore", "soreness", "muscle soreness", "sore muscles",
      "injury", "injured", "sport injury", "sports injury",
      "rehab", "rehabilitation", "physical therapy", "pt",
      "overuse", "overtraining",
      "return to sport", "return to play", "getting back to sport",
      // specific injuries
      "doms", "delayed onset muscle soreness",
      "strain", "muscle strain", "pulled muscle", "muscle pull", "muscle tear",
      "sprain", "ligament sprain",
      "tear", "ligament tear", "tendon tear",
      "acl", "mcl", "pcl", "lcl", "knee ligament",
      "meniscus", "meniscus tear",
      "ankle sprain", "ankle injury",
      "knee pain", "runner's knee", "patellofemoral",
      "back pain", "low back pain", "lower back pain",
      "shoulder pain", "shoulder injury", "rotator cuff",
      "elbow pain", "elbow injury",
      "hip pain", "hip flexor",
      "shin splints", "stress fracture", "stress reaction",
      "tendinopathy", "tendonitis", "tendinitis",
      "plantar fasciitis",
      "overuse injury", "overuse injuries",
    ],
    signal: "low",
    signalNote: (peptide, q) =>
      `No special athletic concern with ${peptide} — but preserving muscle mass during weight loss requires intentional protein intake and resistance training.`,
    contextSummary: (peptide, q) =>
      `${peptide} doesn't impair recovery or healing. The athlete-specific consideration is lean mass preservation: GLP-1 agonist-driven weight loss includes 30-40% lean mass unless you actively counteract it with resistance training and high protein (1.6-2.2g/kg). For endurance athletes, the appetite suppression can make fueling for long sessions difficult — bonking becomes more likely if you can't eat enough. For injury rehab, adequate nutrition is critical for tissue repair, and undereating slows healing.`,
    whatIsKnown: (peptide, q) =>
      `Track training performance, not just body weight. If lifts are declining or endurance is dropping, you're likely underfueling. Protein timing around training matters more on ${peptide} because total intake tends to drop. For injury recovery, maintain caloric intake at maintenance (not deficit) — healing tissue needs energy. Some athletes report improved body composition but worse performance during aggressive ${peptide} dosing.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} affects muscle protein synthesis, recovery kinetics, or anabolic signaling pathways is largely unstudied in athletic populations. The interaction between high training volume and aggressive appetite suppression hasn't been formally characterized.`,
    whyExperiencesVary: (peptide, q) =>
      `A recreational lifter wanting to cut body fat with solid protein intake may see great results. A competitive endurance athlete trying to maintain volume while eating 40% less will struggle. Training type, intensity, protein discipline, and whether you're in-season vs. off-season drive the difference.`,
  },

  // ─── YOUNGER PEOPLE ───────────────────────────────────────────────────────
  {
    id: "pt_ctx_young_adolescents",
    label: "Younger people: teens, adolescents, and growth-stage factors",
    synonyms: [
      "young", "younger", "teen", "teens", "teenager", "teenagers",
      "adolescent", "adolescents", "youth", "young person",
      "high school", "middle school", "college", "college student", "college age",
      "puberty", "growth", "growing", "still growing", "growth plates",
      "18 years old", "19 years old", "early 20s", "20s", "18-25", "young adult",
      "developing body", "adolescence", "developmental stage",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Adolescents and young adults are still developing — ${peptide}'s long-term effects on growth, hormones, and bone density in this age group are essentially unknown.`,
    contextSummary: (peptide, q) =>
      `The concern isn't a drug interaction — it's developmental context. Adolescents have active growth plates, developing endocrine systems, and rapidly changing body composition. Aggressive appetite suppression during this window could affect bone density accrual, hormonal development, and growth. Semaglutide has some adolescent obesity data showing it works, but long-term safety over decades of use starting in youth is completely unknown. The younger the person, the higher the bar for justification.`,
    whatIsKnown: (peptide, q) =>
      `Semaglutide's STEP TEENS trial showed efficacy in adolescents with obesity, but follow-up is short. Bone density, hormonal development, and growth velocity weren't primary endpoints. For college-age adults (18-25), the main practical risk is disordered eating patterns — using ${peptide} for body image rather than metabolic health can normalize extreme restriction. Track growth (if still growing), bone health markers, and maintain honest conversations about why it's being used.`,
    whatIsUnclear: (peptide, q) =>
      `Long-term effects of GLP-1 agonists on skeletal development, pubertal hormones, and brain maturation are unknown. Whether starting in adolescence creates dependency patterns (weight regain requiring lifetime use) is a real open question. ${peptide} specifically has no published adolescent data.`,
    whyExperiencesVary: (peptide, q) =>
      `A 22-year-old with class 3 obesity and metabolic syndrome has a very different risk-benefit than a 16-year-old who wants to lose 15 pounds. Developmental stage, metabolic severity, and psychological relationship with food and body image drive the calculus.`,
  },

  // ─── OVERWEIGHT / HIGH BMI ────────────────────────────────────────────────
  {
    id: "pt_ctx_overweight_high_bmi",
    label: "Overweight / high BMI: appetite, metabolic signals, and baseline inflammation",
    synonyms: [
      // plain language
      "overweight", "obese", "obesity", "weight loss", "fat loss", "losing weight",
      "can't lose weight", "trouble losing weight", "weight plateau", "weight stuck",
      "struggling with weight", "weight management", "weight problem",
      "always hungry", "hungry all the time", "constant hunger", "food cravings",
      "sugar cravings", "carb cravings", "sweet tooth",
      "appetite", "appetite control", "overeating", "emotional eating",
      "binge eating", "food addiction",
      // clinical
      "high bmi", "bmi", "class 2 obesity", "class 3 obesity", "morbid obesity",
      "satiety", "satiety signals",
      "insulin resistance", "prediabetes",
      "blood sugar", "metabolic syndrome",
      "inflammation", "chronic inflammation",
      "nafld", "fatty liver",
      "belly fat", "abdominal obesity", "visceral fat",
      "slow metabolism",
    ],
    signal: "low",
    signalNote: (peptide, q) =>
      `This is ${peptide}'s primary use case — no special concerns beyond standard titration and monitoring.`,
    contextSummary: (peptide, q) =>
      `Weight loss is what ${peptide} is designed for. GLP-1/GIP/glucagon triple agonism produces the most aggressive appetite suppression and weight loss in the class — early trial data shows 20-25%+ body weight reduction. The main thing to calibrate: the first 4-6 weeks can be intense (nausea, appetite crash, fatigue), and this is dose-dependent. Start low, titrate slowly, and don't try to white-knuckle through severe nausea — it's better to stay at a lower dose longer than to push through and quit.`,
    whatIsKnown: (peptide, q) =>
      `Track weight weekly (not daily — fluctuations are noise), waist circumference monthly, and how your clothes fit. Protein intake is critical — aim for 1.2-1.6g/kg of ideal body weight to minimize lean mass loss. Resistance training significantly improves body composition outcomes. Blood pressure, fasting glucose, and lipids typically improve within 3-6 months. Most people reach maximum weight loss at 9-12 months and then stabilize.`,
    whatIsUnclear: (peptide, q) =>
      `Weight regain after stopping is the elephant in the room — most GLP-1 trials show significant regain within 12 months of discontinuation. Whether ${peptide}'s triple-agonist mechanism produces more durable effects than semaglutide or tirzepatide is unknown. The long-term metabolic adaptation to sustained GLP-1 agonism is still being characterized.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with high insulin resistance and food noise may feel like a completely different person within weeks. Someone with emotional eating patterns may lose appetite but not the underlying drive, creating a frustrating disconnect. Baseline metabolic health, relationship with food, and whether structural eating habits change alongside the compound drive the range.`,
  },

  // ─── POST-COVID / LONG COVID ─────────────────────────────────────────────
  {
    id: "pt_ctx_long_covid",
    label: "Post-COVID / Long COVID",
    synonyms: [
      // plain language
      "long covid", "long haul covid", "post covid", "post-covid", "covid long hauler",
      "long hauler", "long haulers", "covid recovery", "after covid", "covid symptoms",
      "still sick from covid", "never recovered from covid", "covid complications",
      "brain fog covid", "fatigue after covid", "exhausted after covid",
      "shortness of breath covid", "breathlessness after covid",
      "heart issues after covid", "chest pain after covid",
      "smell loss", "taste loss", "anosmia", "parosmia",
      // clinical
      "post-acute sequelae", "pasc", "post-acute covid", "long-haul covid",
      "post-viral syndrome", "post-viral fatigue", "post-viral illness",
      "autonomic dysfunction covid", "pots after covid",
      "myocarditis covid", "pericarditis covid",
      "cognitive impairment covid", "neurological covid",
      "immune dysregulation", "microclots", "endothelial dysfunction",
      "covid", "sars-cov-2", "coronavirus",
      // related symptoms searched
      "can't exercise after covid", "exercise intolerance", "post-exertional malaise",
      "pem", "crashes", "energy crashes",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Long COVID's unpredictable symptom cycling makes it hard to tell what ${peptide} is doing versus what the condition is doing — go slow and track carefully.`,
    contextSummary: (peptide, q) =>
      `Long COVID involves immune dysregulation, autonomic instability, and metabolic disruption that can mimic or amplify every common ${peptide} side effect. Fatigue, brain fog, nausea, heart rate changes, and exercise intolerance are all Long COVID features AND ${peptide} titration features. If you're going to try it, start at the lowest possible dose and titrate much slower than standard protocols — your nervous system is already sensitized. Some Long COVID patients report improvement (possibly anti-inflammatory effects), but others report flares.`,
    whatIsKnown: (peptide, q) =>
      `Track heart rate, fatigue patterns, and cognitive function separately from weight. If you have post-COVID POTS, ${peptide}'s mild heart rate increase and potential dehydration from nausea can worsen orthostatic symptoms. Hydration and electrolytes are non-negotiable. Some early data suggests GLP-1 agonists may reduce neuroinflammation, but this is mechanistic speculation, not proven therapeutic benefit.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} helps or worsens Long COVID symptoms is genuinely unknown — it could go either way depending on the individual's specific pathology. The interaction between GLP-1 agonism and immune dysregulation, microclot biology, and autonomic dysfunction hasn't been studied.`,
    whyExperiencesVary: (peptide, q) =>
      `Long COVID itself varies enormously — someone with mild brain fog will have a different experience than someone with severe POTS and post-exertional malaise. Which organ systems were affected, how long since acute infection, and the specific pattern of autonomic involvement drive the unpredictability.`,
  },

  // ─── CHRONIC FATIGUE / ME-CFS / POTS / DYSAUTONOMIA ──────────────────────
  {
    id: "pt_ctx_cfs_pots",
    label: "Chronic fatigue syndrome (ME/CFS), POTS, and dysautonomia",
    synonyms: [
      // plain language
      "chronic fatigue", "chronic fatigue syndrome", "always exhausted", "extreme fatigue",
      "debilitating fatigue", "fatigue all the time", "tired all the time",
      "no energy", "energy crashes", "crashes", "boom and bust",
      "post-exertional malaise", "pem", "can't exercise", "exercise makes me worse",
      "can't do much", "housebound", "bedbound",
      "pots", "postural orthostatic tachycardia", "dysautonomia",
      "autonomic dysfunction", "autonomic nervous system",
      "dizzy when standing", "heart races when standing", "can't stand long",
      // clinical
      "me/cfs", "mecfs", "myalgic encephalomyelitis", "me", "cfs",
      "systemic exertion intolerance disease", "seid",
      "fibromyalgia", "fibro",
      "orthostatic intolerance", "orthostatic tachycardia",
      "neurocardiogenic syncope", "vasovagal",
      "mast cell activation", "mcas", "mast cell",
      "small fiber neuropathy",
      "hypermobility", "hypermobile", "eds", "ehlers danlos", "ehlers-danlos",
      // related
      "unrefreshing sleep", "non-restorative sleep", "wake up exhausted",
      "brain fog", "cognitive dysfunction", "memory issues",
      "pain all over", "widespread pain",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `ME/CFS and POTS involve a sensitized autonomic nervous system — ${peptide}'s effects on heart rate, appetite, and energy can amplify existing instability.`,
    contextSummary: (peptide, q) =>
      `This population needs extra caution. ${peptide}'s nausea, dehydration risk, and modest heart rate increase can directly worsen POTS symptoms (orthostatic tachycardia, dizziness, presyncope). ME/CFS patients often have post-exertional malaise, and the caloric restriction from appetite suppression counts as metabolic stress — some people crash. If you're going to try ${peptide}, start at the absolute minimum dose, ensure electrolytes and fluid intake are solid, and track energy patterns rather than weight.`,
    whatIsKnown: (peptide, q) =>
      `POTS patients should monitor resting and standing heart rate — if the differential worsens (>30bpm increase on standing), ${peptide} may be contributing via dehydration. Sodium and fluid intake need to increase, not decrease, during titration. For ME/CFS, track post-exertional malaise patterns: if crashes become more frequent or severe, that's a signal to pause. Appetite suppression can drop caloric intake below what these conditions tolerate.`,
    whatIsUnclear: (peptide, q) =>
      `Whether GLP-1 agonists affect autonomic function, mast cell activation, or the neuroimmune pathways involved in ME/CFS is unknown. Some theoretical pathways suggest possible anti-inflammatory benefit, but there's no clinical evidence. The interaction between energy envelope management (pacing) and aggressive appetite suppression is completely uncharacterized.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with mild POTS and stable energy may tolerate ${peptide} fine with extra hydration. Someone with severe ME/CFS who's already struggling to eat enough may find appetite suppression tips them into a crash cycle. Illness severity, autonomic subtype, baseline caloric intake, and hydration discipline drive the range.`,
  },

  // ─── CHRONIC PAIN / PAIN MEDICATIONS ─────────────────────────────────────
  {
    id: "pt_ctx_chronic_pain",
    label: "Chronic pain and pain medications",
    synonyms: [
      // plain language
      "chronic pain", "pain", "pain all the time", "constant pain", "always in pain",
      "pain management", "pain medication", "pain meds", "on pain medication",
      "nerve pain", "neuropathic pain", "burning pain", "shooting pain",
      "back pain", "chronic back pain", "neck pain", "joint pain",
      "pain clinic", "pain specialist", "pain doctor",
      "fibromyalgia", "fibro",
      // opioids - plain language
      "opioid", "opioids", "opiate", "opiates", "narcotic", "narcotics",
      "hydrocodone", "vicodin", "norco",
      "oxycodone", "oxycontin", "percocet",
      "morphine", "ms contin",
      "tramadol", "ultram",
      "codeine",
      "fentanyl", "fentanyl patch",
      "buprenorphine", "suboxone", "subutex", "methadone",
      "on opioids", "opioid therapy", "chronic opioid therapy",
      // nerve pain medications
      "gabapentin", "neurontin",
      "pregabalin", "lyrica",
      "duloxetine for pain", "cymbalta for pain",
      "amitriptyline", "nortriptyline", "tricyclic",
      // NSAIDs and anti-inflammatory
      "nsaids", "nsaid", "ibuprofen", "naproxen", "aleve", "advil",
      "meloxicam", "celebrex", "celecoxib", "diclofenac",
      "anti-inflammatory medication",
      // other
      "muscle relaxer", "muscle relaxant", "baclofen", "cyclobenzaprine", "flexeril",
      "ketamine", "low dose naltrexone", "ldn",
      "pain patch", "pain pump",
      "complex regional pain syndrome", "crps",
      "central sensitization",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Pain medications don't interact directly with ${peptide}, but opioids slow gut motility just like GLP-1 agonists — stacking these effects can cause severe constipation.`,
    contextSummary: (peptide, q) =>
      `The practical issue is GI overlap. Opioids and ${peptide} both slow gut motility — combined, constipation can become severe. Gabapentin and pregabalin cause weight gain and appetite increase in some people, which ${peptide} counteracts, but the tug-of-war can be confusing. For weight-bearing pain (back, hips, knees), weight loss from ${peptide} often provides meaningful pain relief — sometimes more than the pain medication itself. That's a real and underappreciated benefit.`,
    whatIsKnown: (peptide, q) =>
      `If you're on opioids, proactively manage constipation (fiber, magnesium, stool softeners) before starting ${peptide}, not after. Gabapentin and pregabalin don't have direct interactions but both can cause peripheral edema — monitor if you notice swelling. NSAIDs on an empty stomach (which happens more often with suppressed appetite) increase GI bleeding and ulcer risk. Track pain levels separately from ${peptide} side effects so you can see if the weight loss is actually helping.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} affects pain perception, central sensitization, or opioid receptor signaling is unknown. The gut motility interaction between opioids and GLP-1 agonists hasn't been formally characterized. Whether rapid weight loss changes pain medication dosing requirements (through volume of distribution changes) is unstudied.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with knee pain on Tylenol may find dramatic relief from weight loss. Someone on chronic high-dose opioids with central sensitization may find the constipation intolerable and the pain unchanged. Pain type, medication class, whether the pain is weight-bearing, and baseline GI function drive the difference.`,
  },

  // ─── CANCER / ONCOLOGY ────────────────────────────────────────────────────
  {
    id: "pt_ctx_cancer",
    label: "Cancer and oncology (active treatment or survivorship)",
    synonyms: [
      // plain language
      "cancer", "cancer diagnosis", "cancer treatment", "fighting cancer",
      "cancer survivor", "cancer history", "had cancer", "in remission",
      "chemotherapy", "chemo", "on chemo",
      "radiation", "radiation therapy", "radiation treatment",
      "immunotherapy", "cancer immunotherapy",
      "tumor", "tumors",
      // specific cancers searched
      "breast cancer", "prostate cancer", "colon cancer", "colorectal cancer",
      "lung cancer", "skin cancer", "melanoma", "lymphoma", "leukemia",
      "thyroid cancer", "ovarian cancer", "cervical cancer", "uterine cancer",
      "kidney cancer", "bladder cancer", "liver cancer", "pancreatic cancer",
      "brain cancer", "glioblastoma",
      "blood cancer", "myeloma", "multiple myeloma",
      // treatments and clinical
      "oncology", "oncologist", "hematologist", "tumor marker",
      "targeted therapy", "biologic therapy", "monoclonal antibody",
      "immunosuppressive cancer treatment",
      "checkpoint inhibitor", "car-t", "car t cell therapy",
      "stem cell transplant", "bone marrow transplant",
      "hormonal cancer therapy", "tamoxifen", "aromatase inhibitor cancer",
      "androgen deprivation therapy", "adt",
      "neutropenic", "neutropenia", "low white blood cells",
      "anemia from cancer", "cancer fatigue", "cancer-related fatigue",
      "cachexia", "cancer weight loss",
      "palliative", "palliative care",
    ],
    signal: "flag",
    signalNote: (peptide, q) =>
      `Active cancer treatment is a real flag — ${peptide} hasn't been studied in this context, and the metabolic load is unpredictable.`,
    contextSummary: (peptide, q) =>
      `This splits sharply: active treatment vs. survivorship. During active chemo, radiation, or immunotherapy, adding ${peptide} introduces appetite suppression and nausea into a system already struggling with both. Cancer cachexia (involuntary weight loss) is the opposite of what ${peptide} does — if someone is losing weight from cancer, further appetite suppression is harmful. In survivorship (years out, no active disease), the risk profile is much more like the general population, especially for weight management after treatment-related gain.`,
    whatIsKnown: (peptide, q) =>
      `During active treatment, prioritize nutrition — muscle mass preservation matters for treatment tolerance and outcomes. ${peptide}'s nausea stacked on chemo nausea can make eating nearly impossible. For cancer survivors, post-treatment weight gain (especially from hormonal therapy like tamoxifen or ADT) is common, and GLP-1 agonists can help. Some early research suggests GLP-1 agonism may have anti-tumor properties, but this is mechanistic speculation, not treatment guidance.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} affects tumor biology, immune surveillance, or treatment efficacy is completely unknown. Drug-drug interactions with chemotherapy agents are unstudied. The safety profile in immunocompromised patients (post-transplant, neutropenic) is uncharacterized. For survivors, long-term cancer recurrence risk with metabolic compound use is an open question.`,
    whyExperiencesVary: (peptide, q) =>
      `A breast cancer survivor 5 years out wanting to lose tamoxifen-related weight has a completely different profile than someone currently on chemo with treatment-related cachexia. Cancer type, treatment phase, nutritional status, and how far from active disease you are drive the calculus.`,
  },

  // ─── RESPIRATORY / PULMONARY ──────────────────────────────────────────────
  {
    id: "pt_ctx_respiratory",
    label: "Respiratory conditions (asthma, COPD, breathing issues)",
    synonyms: [
      // plain language
      "asthma", "asthmatic", "breathing problems", "breathing issues", "trouble breathing",
      "shortness of breath", "breathlessness", "out of breath",
      "chest tightness", "wheezing", "wheeze",
      "copd", "chronic obstructive pulmonary disease", "emphysema", "chronic bronchitis",
      "lung disease", "lung condition", "lung problems", "bad lungs",
      "inhaler", "rescue inhaler", "steroid inhaler", "on inhalers",
      "oxygen", "on oxygen", "supplemental oxygen", "oxygen tank",
      "pulmonary", "pulmonary disease", "pulmonary condition",
      // clinical
      "bronchial", "bronchiectasis", "bronchospasm",
      "pulmonary fibrosis", "ipf", "interstitial lung disease", "ild",
      "pulmonary hypertension", "pah",
      "sleep apnea", "osa", "cpap",
      "respiratory failure", "low oxygen saturation", "low o2",
      // medications
      "albuterol", "salbutamol", "ventolin",
      "salmeterol", "formoterol", "advair", "symbicort",
      "tiotropium", "spiriva",
      "montelukast", "singulair",
      "inhaled corticosteroids", "fluticasone", "budesonide",
      "oral steroids for lung", "prednisone for asthma",
      "nebulizer", "nebulizer treatment",
      "exercise-induced asthma", "exercise induced bronchospasm",
      "vo2 max", "aerobic capacity", "reduced exercise capacity",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Respiratory conditions themselves don't interact with ${peptide}, but oral steroid use for flares affects weight and glucose — and weight loss often improves breathing capacity.`,
    contextSummary: (peptide, q) =>
      `No direct pharmacological concern between ${peptide} and inhaled respiratory medications. The real connection is weight: for obesity-related breathing difficulty, weight loss from ${peptide} can significantly improve exercise tolerance, reduce inhaler use, and improve sleep apnea. If you're on oral steroids (prednisone) for flares, those cause weight gain, glucose spikes, and appetite increase — ${peptide} counteracts some of this, but the metabolic whiplash from steroid courses can make tracking difficult.`,
    whatIsKnown: (peptide, q) =>
      `Weight loss of 10-15% can measurably improve FEV1 and exercise capacity in people with obesity-related breathing limitations. For asthma, reduced abdominal fat improves diaphragm mechanics. If you're on frequent oral steroid courses, track glucose during flares — ${peptide} can help blunt the steroid-induced spikes. Sleep apnea (which overlaps heavily with respiratory conditions) often improves with weight loss.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} has direct airway or anti-inflammatory effects relevant to asthma or COPD is unknown. How GLP-1 agonism interacts with the systemic effects of chronic oral steroid use (bone loss, glucose, muscle wasting) hasn't been studied. For pulmonary fibrosis or pulmonary hypertension, there's zero data.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with obesity-related asthma may see dramatic breathing improvement with weight loss. Someone with severe COPD and low body weight may find appetite suppression counterproductive. Respiratory diagnosis, body weight, steroid use frequency, and baseline exercise capacity drive the range.`,
  },

  // ─── BIPOLAR / ANTIPSYCHOTICS / MOOD STABILIZERS ─────────────────────────
  {
    id: "pt_ctx_bipolar_antipsychotics",
    label: "Bipolar disorder, antipsychotics, and mood stabilizers",
    synonyms: [
      // plain language
      "bipolar", "bipolar disorder", "manic depression",
      "mania", "manic", "manic episode", "hypomania",
      "mood disorder", "mood swings", "extreme mood swings",
      "antipsychotic", "antipsychotics", "on antipsychotics",
      "mood stabilizer", "mood stabilizers", "on mood stabilizers",
      "psychiatric medication", "psych medication",
      "schizophrenia", "schizoaffective",
      "psychosis", "psychotic",
      // specific medications
      "lithium", "lithium carbonate",
      "valproate", "valproic acid", "depakote", "divalproex",
      "lamotrigine", "lamictal",
      "quetiapine", "seroquel",
      "olanzapine", "zyprexa",
      "risperidone", "risperdal",
      "aripiprazole", "abilify",
      "lurasidone", "latuda",
      "ziprasidone", "geodon",
      "clozapine", "clozaril",
      "haloperidol", "haldol",
      "paliperidone", "invega",
      "cariprazine", "vraylar",
      "brexpiprazole", "rexulti",
      // related concerns
      "weight gain from medication", "medication weight gain",
      "metabolic effects of antipsychotics", "metabolic side effects",
      "tardive dyskinesia",
      "lithium levels", "lithium toxicity",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Antipsychotics cause significant metabolic side effects that ${peptide} can help counter — but lithium levels can shift with dehydration, which is a real thing to monitor.`,
    contextSummary: (peptide, q) =>
      `Antipsychotics (especially olanzapine, quetiapine, clozapine) cause substantial weight gain and metabolic dysfunction — sometimes 20-40+ pounds. ${peptide} directly counteracts this, and there's growing interest in using GLP-1 agonists specifically for antipsychotic-induced weight gain. The serious watch item: if you're on lithium, dehydration from ${peptide}'s nausea phase can raise lithium levels into the toxic range. Lithium toxicity is dangerous. Stay hydrated and get levels checked during titration.`,
    whatIsKnown: (peptide, q) =>
      `Monitor lithium levels closely during ${peptide} titration — any significant nausea, vomiting, or reduced fluid intake can concentrate lithium. For olanzapine/clozapine, metabolic monitoring (glucose, lipids, waist circumference) may show improvement with ${peptide}. Mood stability is the priority — if appetite, sleep, or energy changes trigger mood episode concern, flag it immediately. Some antipsychotics (quetiapine) are sedating; combined with ${peptide} fatigue, the first few weeks can feel heavy.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} affects mood stability, dopaminergic signaling, or antipsychotic efficacy is unstudied. The metabolic benefits of GLP-1 agonists in antipsychotic-treated populations are being actively researched but data for ${peptide} specifically is absent. Long-term psychiatric outcomes for people using both are unknown.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone on lamotrigine (weight-neutral) will have a very different metabolic baseline than someone on olanzapine who's gained 40 pounds. Medication class, dose, metabolic side-effect severity, and whether mood is currently stable drive the variance. Lithium users are in a separate risk category because of the dehydration-toxicity pathway.`,
  },

  // ─── OSTEOPOROSIS / BONE HEALTH ───────────────────────────────────────────
  {
    id: "pt_ctx_osteoporosis",
    label: "Osteoporosis and bone health",
    synonyms: [
      // plain language
      "osteoporosis", "bone loss", "bone density", "low bone density",
      "weak bones", "brittle bones", "thinning bones",
      "fracture risk", "fracture", "stress fracture", "broken bone easily",
      "bone health", "bone strength",
      "osteopenia", "pre-osteoporosis",
      // clinical
      "dexa scan", "dxa scan", "bone density scan", "t-score", "z-score",
      "bone mineral density", "bmd",
      "hip fracture", "vertebral fracture", "spinal fracture", "compression fracture",
      "calcium", "calcium supplement", "calcium deficiency",
      "vitamin d", "vitamin d deficiency", "low vitamin d",
      "vitamin k2", "bone metabolism",
      "osteoblast", "osteoclast", "bone remodeling",
      // medications
      "bisphosphonates", "bisphosphonate",
      "alendronate", "fosamax",
      "risedronate", "actonel",
      "zoledronic acid", "reclast",
      "denosumab", "prolia",
      "teriparatide", "forteo", "parathyroid hormone",
      "romosozumab", "evenity",
      "raloxifene", "evista",
      // related
      "falls", "fall risk", "fracture prevention",
      "calcium and d", "calcium and vitamin d",
      "collagen", "bone collagen",
      "cortisone bone loss", "steroid bone loss", "glucocorticoid-induced osteoporosis",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Rapid weight loss accelerates bone density loss — if you already have osteoporosis, muscle and bone preservation with ${peptide} need active management.`,
    contextSummary: (peptide, q) =>
      `Weight loss from any cause reduces bone density — and GLP-1 agonist-driven loss is no exception. For someone already dealing with osteoporosis or osteopenia, this isn't a reason to avoid ${peptide}, but it means you need to actively protect bone: strength training (especially weight-bearing and resistance), adequate calcium (1200mg/day), vitamin D (get levels checked, target 40-60 ng/mL), and adequate protein. Bisphosphonates like Fosamax need to be taken on an empty stomach with water — ${peptide}'s delayed gastric emptying could theoretically affect absorption timing.`,
    whatIsKnown: (peptide, q) =>
      `Get a DEXA scan before starting if you don't have a recent one. Track it annually. Weight-bearing exercise is the single most protective thing for bone during weight loss — don't skip it. Lean mass loss (which accompanies all GLP-1 weight loss) correlates with bone density loss. If you're on denosumab (Prolia), stopping it causes rapid bone loss — that's separate from ${peptide} but adds to the context. Bisphosphonate absorption timing may need adjustment.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} has any direct effect on bone metabolism (osteoblast/osteoclast activity) is unclear. Some GLP-1 receptor agonist data suggests possible bone-protective effects through GIP receptor activation, but this is mechanistic and not clinically proven. Whether rate of weight loss correlates with rate of bone loss in this specific context is unquantified.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with osteopenia who does heavy resistance training and takes calcium/D may see zero bone impact. Someone with established osteoporosis who loses weight rapidly without exercise may see meaningful density decline. Baseline bone health, exercise type, calcium/D status, and rate of weight loss drive the outcome.`,
  },

  // ─── ENDOMETRIOSIS / PCOS / WOMEN'S REPRODUCTIVE HEALTH ──────────────────
  {
    id: "pt_ctx_womens_reproductive",
    label: "Endometriosis, PCOS, and women's reproductive conditions",
    synonyms: [
      // plain language
      "endometriosis", "endo", "painful periods", "period pain", "bad periods",
      "heavy periods", "heavy bleeding", "heavy menstrual bleeding",
      "irregular periods", "missed periods", "no periods",
      "pcos", "polycystic ovary syndrome", "polycystic ovaries",
      "hormonal imbalance", "hormone imbalance", "female hormone issues",
      "uterine fibroids", "fibroids",
      "adenomyosis",
      "ovarian cysts", "cysts on ovaries",
      "pelvic pain", "pelvic floor", "pelvic floor issues",
      "fertility issues", "infertility", "trouble conceiving", "hormonal infertility",
      // symptoms
      "bloating from period", "period bloating", "period symptoms",
      "cramps", "severe cramps", "dysmenorrhea",
      "spotting", "breakthrough bleeding",
      "estrogen dominance", "low progesterone",
      "excess androgens", "facial hair", "hirsutism",
      "acne from hormones", "hormonal acne",
      // medications and treatments
      "birth control for endometriosis", "hormonal birth control",
      "progesterone", "progestin", "norethindrone",
      "lupron", "leuprolide", "gnrh agonist",
      "orilissa", "elagolix",
      "letrozole for fertility", "clomid for pcos",
      "inositol", "myo-inositol", "d-chiro-inositol",
      "metformin for pcos",
      "spironolactone for pcos", "spiro",
      "lap surgery", "laparoscopy", "excision surgery",
      // related
      "endocrine disruptor", "period tracker", "luteal phase",
      "follicular phase", "cycle tracking",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `PCOS responds well to ${peptide}'s insulin-sensitizing effects, but endometriosis is inflammation-driven and less predictable — track cycle patterns closely.`,
    contextSummary: (peptide, q) =>
      `For PCOS, ${peptide} is arguably a strong fit: insulin resistance drives much of PCOS pathology, and GLP-1/GIP agonism directly improves insulin sensitivity, reduces androgen levels, and can restore ovulation. This is genuinely promising. For endometriosis, the connection is weaker — it's an inflammatory and hormonal condition where weight loss may or may not affect symptoms. The fertility angle matters: ${peptide} can improve ovulation in PCOS quickly, sometimes unexpectedly. If you don't want to get pregnant, use reliable contraception (and note that GLP-1 drugs may reduce oral contraceptive absorption).`,
    whatIsKnown: (peptide, q) =>
      `For PCOS, track cycle regularity, androgen symptoms (acne, hair growth), and fasting insulin alongside weight. Improvements in cycle regularity can appear within 2-3 months. If on metformin for PCOS, GI side effects may stack with ${peptide} initially. For endometriosis, track pain patterns by cycle phase — if ${peptide} shifts inflammation or hormonal balance, pain patterns may change. Oral contraceptive absorption may be reduced by delayed gastric emptying.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} has direct effects on endometrial tissue, endo-related inflammation, or estrogen metabolism is unknown. The speed and reliability of fertility improvement in PCOS with GLP-1 agonists is poorly quantified. How hormonal birth control effectiveness is affected by delayed gastric emptying hasn't been formally studied.`,
    whyExperiencesVary: (peptide, q) =>
      `A woman with PCOS and high insulin resistance may see dramatic improvement in cycles and symptoms within months. A woman with deep infiltrating endometriosis may see weight change but no pain relief. Whether the condition is primarily insulin-driven (PCOS) versus inflammation-driven (endo) predicts the response far more than anything else.`,
  },

  // ─── EATING DISORDERS ────────────────────────────────────────────────────
  {
    id: "pt_ctx_eating_disorders",
    label: "Eating disorders and disordered eating",
    synonyms: [
      // plain language
      "eating disorder", "eating disorders", "disordered eating",
      "anorexia", "anorexic", "restricting food", "not eating enough",
      "bulimia", "bulimic", "binge purge", "purging",
      "binge eating", "binge eating disorder", "bingeing", "compulsive eating",
      "orthorexia", "fear of food",
      "arfid", "avoidant restrictive food intake",
      "recovery from eating disorder", "ed recovery", "in recovery",
      "history of eating disorder",
      // related behaviors and concerns
      "body image", "body dysmorphia", "body dysmorphic disorder",
      "calorie restriction", "extreme calorie restriction", "very low calorie",
      "food restriction", "restrictive eating",
      "laxative use", "laxatives", "laxative abuse",
      "overexercise", "compulsive exercise", "exercise addiction",
      "low weight", "very low weight", "underweight",
      "relapse risk", "eating disorder relapse",
      // nutritional consequences
      "electrolyte imbalance", "low electrolytes",
      "refeeding syndrome", "refeeding",
      "nutrient deficiency", "malnutrition",
      "low bone density from eating disorder", "amenorrhea", "female athlete triad",
      "relative energy deficiency", "red-s",
      // treatment
      "eating disorder treatment", "inpatient eating disorder", "residential treatment",
      "dietitian", "nutritionist", "eating disorder therapist",
    ],
    signal: "flag",
    signalNote: (peptide, q) =>
      `Eating disorders are a serious flag — ${peptide}'s appetite suppression can reinforce restrictive patterns, trigger relapse, or mask dangerous undereating.`,
    contextSummary: (peptide, q) =>
      `This is a genuine clinical concern. For people with active anorexia or restrictive eating, ${peptide} removes hunger signals that may be the only thing preventing dangerously low intake. For bulimia, the nausea and appetite suppression could enable restriction phases. For binge eating disorder, GLP-1 agonists show real promise — reducing binge frequency by dampening the compulsive drive to eat. But even here, it needs to be part of a supported treatment plan, not a standalone fix. History of eating disorder in recovery requires honest self-assessment: is this tool, or is this the disorder finding a new mechanism?`,
    whatIsKnown: (peptide, q) =>
      `GLP-1 agonists reduce food noise and binge urges in many people — for binge eating disorder, this is clinically meaningful. For restrictive disorders, the same mechanism is dangerous. Electrolyte monitoring (potassium, magnesium, phosphorus) is essential if intake drops below 1200 calories. Watch for refeeding-like metabolic shifts if someone transitions from very low to normal intake. Bone density, amenorrhea, and cardiac markers all need tracking in underweight or recently-underweight individuals.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} affects eating disorder psychopathology (body image, fear of weight gain, control compulsions) or only the behavioral component (binge frequency, restriction) is unknown. Long-term relapse risk when using appetite suppressants in people with ED history is unstudied. The psychological impact of externally-imposed appetite suppression on someone with a history of control-based eating patterns is a real and uncharacterized concern.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with binge eating disorder and stable mental health support may find genuine relief from food noise. Someone in early recovery from anorexia may find that ${peptide} re-enables the restriction their treatment is trying to undo. ED subtype, recovery stage, therapeutic support, and honest self-awareness about motivation drive the calculus.`,
  },

  // ─── ALLERGIES / HISTAMINE / ANTIHISTAMINES ──────────────────────────────
  {
    id: "pt_ctx_allergies",
    label: "Allergies, histamine intolerance, and antihistamines",
    synonyms: [
      // plain language
      "allergies", "allergy", "allergic", "allergic reaction",
      "seasonal allergies", "hay fever", "pollen allergy",
      "food allergies", "food allergy", "allergic to food",
      "allergic to nuts", "nut allergy", "tree nut allergy",
      "shellfish allergy", "dairy allergy", "gluten allergy",
      "pet allergy", "cat allergy", "dog allergy", "dust allergy",
      "mold allergy",
      "antihistamine", "antihistamines", "on antihistamines",
      "allergy medication", "allergy meds", "allergy pills",
      "histamine", "histamine intolerance", "high histamine",
      "hives", "urticaria", "chronic hives", "chronic urticaria",
      "angioedema", "swelling from allergy",
      "anaphylaxis", "anaphylactic", "epipen", "epinephrine",
      // clinical
      "allergic rhinitis", "rhinitis",
      "mast cell activation", "mcas", "mast cell activation syndrome",
      "mast cell disorder",
      "ige mediated", "ige allergy",
      "skin prick test", "allergy testing",
      "immunotherapy allergy shots", "allergy shots", "sublingual immunotherapy", "slit",
      "eosinophilic esophagitis", "eoe", "eosinophilic",
      // medications
      "cetirizine", "zyrtec",
      "loratadine", "claritin",
      "fexofenadine", "allegra",
      "diphenhydramine", "benadryl",
      "hydroxyzine for allergy",
      "montelukast", "singulair",
      "nasal corticosteroid", "flonase", "nasonex", "rhinocort",
      "cromolyn", "ketotifen",
      "dupilumab", "dupixent",
      "omalizumab", "xolair",
      "prednisone for allergy", "steroids for allergy",
    ],
    signal: "low",
    signalNote: (peptide, q) =>
      `Standard allergies and antihistamines don't create meaningful concerns with ${peptide} — MCAS is a different story and warrants closer monitoring.`,
    contextSummary: (peptide, q) =>
      `For standard seasonal or food allergies, no real interaction with ${peptide}. Antihistamines (Zyrtec, Claritin, Allegra) are fine. The exception is mast cell activation syndrome (MCAS) — people with MCAS can have unpredictable reactions to new compounds, including injection-site reactions or systemic histamine responses. If you have MCAS, introduce ${peptide} cautiously and watch for hives, flushing, or GI flares in the hours after injection. Diphenhydramine (Benadryl) can increase sedation if combined with ${peptide}'s fatigue.`,
    whatIsKnown: (peptide, q) =>
      `No pharmacological interactions between ${peptide} and antihistamines. Injection-site reactions (redness, itching, swelling) can occur with any subcutaneous peptide and are usually histamine-mediated but not true allergy. For MCAS patients, pre-treating with antihistamines before injection is a common precautionary approach. If you have severe food allergies and dramatically change your diet on ${peptide}, be aware that new foods you introduce may trigger reactions.`,
    whatIsUnclear: (peptide, q) =>
      `Whether GLP-1 agonists affect mast cell degranulation or histamine pathways is poorly characterized. True allergic reactions to ${peptide} (as opposed to injection site irritation) are rare but reported for the GLP-1 class. The histamine intolerance community reports mixed experiences with peptides, but formal data is absent.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with seasonal allergies on Claritin will notice nothing different. Someone with MCAS who reacts to new compounds may have significant injection-site or systemic reactions. Allergy type, mast cell reactivity, and individual immune sensitivity drive the difference.`,
  },

  // ─── ANEMIA / IRON DEFICIENCY / BLOOD DISORDERS ──────────────────────────
  {
    id: "pt_ctx_anemia_blood",
    label: "Anemia, iron deficiency, and blood disorders",
    synonyms: [
      // plain language
      "anemia", "anaemia", "low iron", "iron deficiency", "iron low",
      "low ferritin", "ferritin low", "depleted iron stores",
      "low hemoglobin", "low hgb", "low red blood cells", "low rbc",
      "low blood count", "low blood", "pale", "pale skin",
      "tired from low iron", "exhausted from anemia",
      "blood disorder", "blood condition", "blood problem",
      "b12 deficiency", "low b12", "b12 low", "vitamin b12",
      "folate deficiency", "low folate", "folic acid deficiency",
      // clinical
      "iron deficiency anemia", "ida",
      "hemoglobin", "hematocrit", "hgb", "hct",
      "ferritin", "serum iron", "tibc", "transferrin saturation",
      "iron infusion", "iv iron", "iron transfusion",
      "iron supplement", "iron pills", "ferrous sulfate", "ferrous gluconate",
      "blood transfusion",
      "b12 injections", "b12 shots", "methylcobalamin", "cyanocobalamin",
      // blood disorders
      "sickle cell", "sickle cell disease", "sickle cell anemia",
      "thalassemia", "thalassaemia", "beta thalassemia",
      "hemolytic anemia", "hemolysis",
      "aplastic anemia",
      "polycythemia", "polycythemia vera",
      "thrombocytopenia", "low platelets", "low platelet count",
      "thrombocytosis", "high platelets",
      "neutropenia", "low neutrophils",
      "hemophilia", "von willebrand disease", "clotting factor deficiency",
      "myelodysplastic syndrome", "mds",
      "anemia of chronic disease", "anemia of inflammation",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Iron deficiency causes fatigue that overlaps heavily with ${peptide}'s titration side effects — fix the deficiency first or you won't be able to tell what's causing what.`,
    contextSummary: (peptide, q) =>
      `No direct interaction, but the practical overlap matters: iron deficiency anemia causes fatigue, brain fog, exercise intolerance, and cold sensitivity — all of which are also common during ${peptide} titration. If you start ${peptide} with uncorrected iron deficiency, you'll feel terrible and blame the compound when the fix was iron. Get ferritin, hemoglobin, and B12 checked before starting. If ferritin is under 30, correct it first. Oral iron supplements are best taken on an empty stomach, and ${peptide}'s nausea may make that harder to tolerate.`,
    whatIsKnown: (peptide, q) =>
      `Reduced food intake from ${peptide} can worsen iron and B12 deficiency if dietary sources drop — especially if red meat intake decreases. Menstruating women are at higher risk. Iron absorption requires stomach acid, and GLP-1 agonists can reduce gastric acid secretion. Track ferritin and hemoglobin at baseline and every 3-6 months. If oral iron isn't tolerated (nausea on top of ${peptide} nausea), IV iron infusion is a reliable alternative.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} meaningfully affects iron absorption through gastric pH changes or delayed emptying hasn't been studied. For rarer blood disorders (sickle cell, thalassemia, MDS), there's zero data on GLP-1 agonist use. The nutritional impact of sustained low caloric intake on micronutrient status is undercharacterized in this specific context.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with replete iron stores will feel fine. Someone with ferritin of 12 who starts ${peptide} may feel profoundly exhausted and assume it's the compound. Baseline iron and B12 status, menstrual blood loss, and dietary iron sources explain most of the variance.`,
  },

  // ─── ALOPECIA / HAIR LOSS ────────────────────────────────────────────────
  {
    id: "pt_ctx_hair_loss",
    label: "Hair loss and alopecia",
    synonyms: [
      // plain language
      "hair loss", "losing hair", "thinning hair", "hair thinning",
      "bald", "balding", "going bald", "hair falling out",
      "shedding hair", "hair shedding", "excessive shedding",
      "receding hairline", "hair line receding",
      "alopecia", "alopecia areata", "spot baldness", "bald patches",
      "androgenic alopecia", "androgenetic alopecia",
      "male pattern baldness", "female pattern hair loss",
      "hair not growing back",
      // causes and triggers
      "telogen effluvium", "stress hair loss", "hair loss from stress",
      "hormonal hair loss", "thyroid hair loss",
      "postpartum hair loss", "hair loss after baby", "hair loss after pregnancy",
      "hair loss from medication", "drug-induced hair loss",
      "nutritional hair loss", "hair loss from low iron",
      "scalp issues", "scalp inflammation", "scalp condition",
      // clinical and treatments
      "minoxidil", "rogaine", "topical minoxidil",
      "finasteride", "propecia", "dutasteride", "avodart",
      "spironolactone for hair", "spiro for hair",
      "platelet rich plasma", "prp for hair",
      "hair transplant",
      "ketoconazole shampoo", "nizoral",
      "biotin", "biotin for hair",
      "collagen for hair",
      "low level laser therapy", "lllt",
      "dermatologist", "trichologist",
      "jak inhibitor for alopecia", "baricitinib", "ritlecitinib",
    ],
    signal: "low",
    signalNote: (peptide, q) =>
      `Hair shedding during rapid weight loss is common and temporary (telogen effluvium) — it's not a ${peptide}-specific effect, it's a caloric deficit effect.`,
    contextSummary: (peptide, q) =>
      `Hair shedding is one of the most commonly reported concerns with GLP-1 agonists, but it's not a drug-specific side effect — it's telogen effluvium triggered by rapid weight loss and caloric restriction. Any significant weight loss (surgical, dietary, or pharmaceutical) can push hair follicles into the shedding phase 2-4 months after the caloric shift. It's temporary. Hair typically recovers within 6-12 months as weight stabilizes, as long as nutritional deficiencies aren't driving it.`,
    whatIsKnown: (peptide, q) =>
      `Ensure iron (ferritin >40), zinc, biotin, and protein intake are adequate — deficiencies in any of these during caloric restriction accelerate hair loss. If you already have androgenetic alopecia, the shedding may temporarily worsen it but doesn't change the underlying pattern. Thyroid function should be checked if shedding is severe. The shedding usually peaks 3-5 months after significant weight loss begins and self-resolves.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} has any direct effect on hair follicle cycling beyond the caloric deficit mechanism is unknown. The reported rates of hair loss in GLP-1 trials are low (3-5%), but real-world reports are higher — possibly because trials don't always ask about it. Whether the triple-agonist mechanism has different hair effects than pure GLP-1 agonism is unstudied.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone losing weight slowly with good nutrition may notice nothing. Someone dropping 30 pounds in 3 months with inadequate protein and low ferritin may see alarming shedding. Rate of weight loss, nutritional status, genetic hair pattern, and baseline iron/zinc levels explain the difference.`,
  },

  // ─── SKIN CONDITIONS ─────────────────────────────────────────────────────
  {
    id: "pt_ctx_skin_conditions",
    label: "Skin conditions (eczema, rosacea, acne, dermatitis)",
    synonyms: [
      // plain language
      "skin condition", "skin conditions", "skin problem", "skin problems",
      "skin disorder", "skin issues", "bad skin",
      "eczema", "atopic dermatitis", "dry itchy skin", "itchy skin", "rash",
      "rosacea", "facial redness", "flushing", "red face",
      "acne", "breakouts", "pimples", "cystic acne", "hormonal acne", "body acne",
      "psoriasis", "psoriasis plaques", "psoriasis flares",
      "hives", "urticaria", "itchy welts",
      "contact dermatitis", "skin allergy", "skin reaction",
      "seborrheic dermatitis", "dandruff",
      "perioral dermatitis",
      "sensitive skin", "skin sensitivity", "reactive skin",
      "dry skin", "very dry skin", "flaky skin",
      "oily skin",
      "skin inflammation",
      "wound healing", "slow wound healing", "poor healing",
      "scarring", "scarring easily",
      "stretch marks",
      "skin aging", "collagen skin", "skin elasticity",
      // clinical and treatments
      "dermatologist", "dermatology",
      "topical steroid", "topical corticosteroid", "hydrocortisone cream",
      "triamcinolone", "clobetasol",
      "retinoid", "retinol", "tretinoin", "retin-a",
      "isotretinoin", "accutane",
      "dupilumab", "dupixent",
      "biologic for skin", "skyrizi", "risankizumab",
      "methotrexate for skin",
      "cyclosporine for skin",
      "phototherapy", "uvb therapy", "narrow band uvb",
      "immunosuppressant for skin",
      "moisturizer", "emollient", "barrier cream",
      "antibiotic for skin", "doxycycline for skin", "minocycline",
      "spironolactone for acne",
    ],
    signal: "low",
    signalNote: (peptide, q) =>
      `Skin conditions don't create special concerns with ${peptide} — some people report skin improvement from reduced inflammation, others notice temporary changes during weight loss.`,
    contextSummary: (peptide, q) =>
      `No direct interaction between ${peptide} and skin conditions or their treatments. Indirectly, weight loss and improved insulin sensitivity can improve acne (especially hormonal/PCOS-related), reduce psoriasis severity (lower systemic inflammation), and sometimes improve eczema. On the flip side, rapid weight loss can temporarily worsen skin laxity and stretch marks. Injection-site reactions (redness, itching at the injection spot) are separate from underlying skin conditions and usually mild.`,
    whatIsKnown: (peptide, q) =>
      `For hormonal acne, ${peptide}'s insulin-sensitizing effects may reduce androgen-driven breakouts over months. For psoriasis, weight loss of >5% has been shown to improve disease severity in studies. If you're on isotretinoin (Accutane), the combined GI effects (both cause nausea, both affect lipids) warrant monitoring. Hydration matters for skin — dehydration from ${peptide}'s nausea phase can temporarily worsen dry skin conditions.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} has direct anti-inflammatory effects on skin conditions is unknown. Anecdotal reports of skin improvement are common but hard to separate from weight loss, dietary changes, and reduced systemic inflammation. The injection-site reaction profile for ${peptide} specifically is still being characterized.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with insulin-driven hormonal acne may see clear skin within months. Someone with autoimmune eczema may notice no change. Skin condition type, underlying driver (hormonal vs. immune vs. barrier), and how much systemic inflammation contributes explain the variance.`,
  },

  // ─── MIGRAINE ─────────────────────────────────────────────────────────────
  {
    id: "pt_ctx_migraine",
    label: "Migraine",
    synonyms: [
      // plain language
      "migraine", "migraines", "severe headache", "bad headaches", "chronic headaches",
      "headaches all the time", "pounding headache", "throbbing head",
      "aura", "migraine with aura", "ocular migraine", "silent migraine",
      "vestibular migraine", "hemiplegic migraine",
      // triggers
      "migraine triggers", "light sensitivity", "photophobia", "sound sensitivity",
      "phonophobia", "nausea headache", "vomiting headache", "migraine nausea",
      // medications — preventive
      "topiramate", "topamax", "valproate", "depakote", "amitriptyline for migraine",
      "propranolol for migraine", "metoprolol for migraine", "verapamil for migraine",
      "candesartan", "beta blocker migraine",
      // medications — acute / abortive
      "sumatriptan", "imitrex", "rizatriptan", "maxalt", "triptan", "triptans",
      "ubrelvy", "ubrogepant", "nurtec", "rimegepant", "cgrp",
      "aimovig", "erenumab", "ajovy", "fremanezumab", "emgality", "galcanezumab",
      "cgrp blocker", "cgrp inhibitor", "cgrp antibody",
      "ergotamine", "dihydroergotamine", "dhe",
      "excedrin", "ibuprofen headache", "nsaid headache", "acetaminophen headache",
      "rebound headache", "medication overuse headache",
      // related
      "cluster headache", "tension headache", "cervicogenic headache",
      "botox for migraine", "onabotulinumtoxin", "botox injection headache",
      "nerve block", "occipital nerve block",
      "neck pain headache", "tmj headache",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Dietary changes and dehydration from ${peptide} can trigger migraines — the first few weeks are the highest-risk window for people with migraine history.`,
    contextSummary: (peptide, q) =>
      `Migraines are triggered by metabolic shifts, and ${peptide} creates a lot of metabolic shifts. Caloric restriction, dehydration, skipped meals, blood sugar swings, and sleep changes are all classic migraine triggers — and all common during GLP-1 titration. Some people with migraines report improvement over time (possibly from reduced inflammation and improved metabolic stability), but the first 4-8 weeks can be rocky. If you have a reliable migraine pattern, track whether frequency changes and keep your acute medications on hand.`,
    whatIsKnown: (peptide, q) =>
      `Hydration and consistent eating patterns matter more for migraine prevention during ${peptide} use than anything else. Don't skip meals even if appetite is low — blood sugar drops trigger migraines. Topiramate (Topamax) already causes appetite suppression and cognitive side effects; adding ${peptide} can amplify both. CGRP inhibitors (Aimovig, Nurtec) don't have known interactions with GLP-1 agonists. Track migraine days per month as a separate metric.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} affects CGRP pathways, trigeminal signaling, or migraine threshold directly is unknown. Some GLP-1 receptor expression has been found in brain regions relevant to migraine, but the clinical significance is uncharacterized. Whether the metabolic stabilization from long-term use reduces migraine frequency is anecdotal, not proven.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone whose migraines are driven by hormonal triggers may see no change. Someone whose migraines are metabolically triggered (skipped meals, dehydration) may get worse initially and then better once eating patterns stabilize. Migraine trigger profile, preventive medication, hydration discipline, and how dramatically eating patterns shift drive the range.`,
  },

  // ─── OSTEOARTHRITIS / JOINT DEGENERATION ──────────────────────────────────
  {
    id: "pt_ctx_osteoarthritis",
    label: "Osteoarthritis / Joint Pain",
    synonyms: [
      // plain language
      "joint pain", "knee pain", "hip pain", "back pain", "arthritis", "oa",
      "osteoarthritis", "degenerative joint disease", "bone on bone",
      "cartilage loss", "worn joints", "stiff joints", "achy joints",
      "joint degeneration", "worn cartilage", "joint wear",
      "my knees hurt", "my hips hurt", "bad joints",
      // body parts
      "knee arthritis", "hip arthritis", "ankle pain", "shoulder arthritis",
      "spine arthritis", "lumbar osteoarthritis", "cervical osteoarthritis",
      "hand arthritis", "finger joints", "knuckle pain",
      // related conditions
      "rheumatoid arthritis", "ra", "psoriatic arthritis", "inflammatory arthritis",
      "gout", "joint inflammation", "synovitis",
      "bursitis", "tendinitis", "tendinopathy",
      // treatments
      "cortisone injection", "steroid injection joint", "intraarticular steroid",
      "hyaluronic acid injection", "viscosupplementation", "synvisc",
      "nsaid for arthritis", "naproxen", "ibuprofen arthritis", "diclofenac",
      "celecoxib", "celebrex", "meloxicam",
      "acetaminophen arthritis", "tylenol arthritis",
      "physical therapy", "joint replacement", "knee replacement", "hip replacement",
      "platelet rich plasma", "prp joint",
      "glucosamine", "chondroitin",
      "duloxetine for pain", "cymbalta pain",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Weight loss from ${peptide} often provides significant joint pain relief — every pound lost removes about 4 pounds of knee joint load.`,
    contextSummary: (peptide, q) =>
      `This is one of the most consistently positive stories with GLP-1 agonists. Weight loss reduces mechanical joint loading — for knee OA especially, even 10% body weight loss can meaningfully reduce pain and improve function. The reduction in systemic inflammation from improved metabolic health may add further benefit. The watch item: rapid weight loss without resistance training can reduce the muscle that stabilizes joints, potentially worsening instability. Strength training around affected joints is protective.`,
    whatIsKnown: (peptide, q) =>
      `Track pain levels, functional capacity (stairs, walking distance), and NSAID use over time. Many people reduce or stop NSAIDs after significant weight loss. If you're taking NSAIDs regularly, the reduced food intake from ${peptide} means more empty-stomach NSAID use, which increases GI risk — consider switching to taking them with whatever food you do eat. Joint replacement candidates who lose weight first often have better surgical outcomes and may even postpone surgery.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} has direct anti-inflammatory effects on joint tissue beyond the indirect benefit of weight loss and metabolic improvement is unknown. How rapidly joint pain improves relative to weight loss (is there a threshold?) isn't well-quantified. Whether cartilage degeneration slows or just symptoms improve is an open question.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with knee OA driven primarily by mechanical overload may see dramatic improvement with 20 pounds of weight loss. Someone with advanced bone-on-bone disease may get some relief but still need surgical intervention. Joint affected, disease severity, how much of the pain is weight-bearing versus inflammatory, and whether strength training accompanies the weight loss all drive outcomes.`,
  },

  // ─── ALCOHOL / SUBSTANCE USE ───────────────────────────────────────────────
  {
    id: "pt_ctx_alcohol_substance",
    label: "Alcohol or Substance Use",
    synonyms: [
      // plain language
      "alcohol", "drinking", "heavy drinking", "drink a lot", "i drink", "wine",
      "beer", "liquor", "whiskey", "vodka", "daily drinker", "social drinker",
      "alcohol use disorder", "aud", "alcoholism", "alcohol dependency", "alcohol addiction",
      "recovering alcoholic", "sober", "sobriety", "alcohol in recovery",
      "quit drinking", "cutting back on alcohol",
      // substances
      "cannabis", "marijuana", "weed", "thc", "cbd", "pot",
      "nicotine", "smoking", "vaping", "cigarettes", "tobacco",
      "opioid", "opioids", "opioid use disorder", "oud",
      "heroin", "fentanyl", "methadone", "suboxone", "buprenorphine", "naltrexone",
      "vivitrol", "mat", "medication assisted treatment",
      "cocaine", "stimulant use", "methamphetamine", "meth", "amphetamine misuse",
      "benzodiazepine dependence", "benzo dependence", "xanax dependence",
      "addiction", "substance use disorder", "sud", "recovery",
      "harm reduction", "sobriety",
      // liver / metabolic effects
      "liver damage", "alcohol liver disease", "alcoholic liver", "cirrhosis",
      "fatty liver from alcohol", "alcoholic hepatitis",
      "elevated liver enzymes drinking", "ast alt elevated alcohol",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `GLP-1 agonists appear to reduce alcohol cravings in many people — but if you have liver damage from alcohol, that's a separate and more serious consideration.`,
    contextSummary: (peptide, q) =>
      `One of the most interesting emerging findings: GLP-1 receptor agonists appear to reduce alcohol intake and cravings in a significant subset of people. This is thought to work through reward pathway modulation — the same mechanism that reduces food noise seems to reduce alcohol desire. For people wanting to cut back, this may be an unexpected benefit. The caution: if there's existing liver damage from alcohol use, see the liver disease section — reduced hepatic function changes the risk profile. For opioid users on MAT (Suboxone, methadone), GI effects stack and constipation can become severe.`,
    whatIsKnown: (peptide, q) =>
      `Track alcohol intake honestly — many people report spontaneously drinking less on GLP-1 agonists without actively trying. If you're on naltrexone (Vivitrol) for alcohol or opioid use disorder, there's no known interaction with ${peptide}, but both can cause nausea. For cannabis users, the appetite-stimulating effects of THC can partially counteract ${peptide}'s suppression, creating a confusing push-pull. Liver enzymes (ALT, AST, GGT) should be monitored if there's any alcohol use history.`,
    whatIsUnclear: (peptide, q) =>
      `The alcohol reduction effect is real but not yet approved for this indication — clinical trials are underway. Whether this extends to other substances of abuse is largely anecdotal. How ${peptide}'s specific triple-agonist mechanism compares to semaglutide's effect on reward pathways is unknown. Long-term interaction with MAT medications is unstudied.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone who drinks socially may find they simply stop wanting it. Someone with severe alcohol use disorder may find cravings reduced but behavioral patterns still deeply entrenched. Substance type, severity of use, liver health, concurrent MAT medications, and the psychological versus physical components of the addiction drive the variance.`,
  },

  // ─── NEUROLOGICAL CONDITIONS ──────────────────────────────────────────────
  {
    id: "pt_ctx_neurological",
    label: "Neurological Conditions",
    synonyms: [
      // epilepsy
      "epilepsy", "seizures", "seizure disorder", "convulsions",
      "absence seizure", "grand mal", "tonic clonic", "focal seizure",
      "anti-epileptic", "anticonvulsant", "epileptic",
      "levetiracetam", "keppra", "lamotrigine", "lamictal", "valproate", "depakote",
      "phenytoin", "dilantin", "carbamazepine", "tegretol", "oxcarbazepine",
      "lacosamide", "vimpat", "topiramate seizure",
      // parkinson's
      "parkinson", "parkinson's", "parkinson's disease", "pd",
      "tremor", "resting tremor", "rigidity", "bradykinesia", "shuffling gait",
      "levodopa", "carbidopa", "sinemet", "dopamine for parkinson",
      "ropinirole", "pramipexole", "mirapex", "rasagiline", "selegiline", "safinamide",
      "deep brain stimulation", "dbs parkinson",
      // neuropathy
      "neuropathy", "peripheral neuropathy", "nerve damage", "nerve pain",
      "diabetic neuropathy", "charcot", "burning feet", "numbness tingling",
      "small fiber neuropathy", "autonomic neuropathy",
      "gabapentin", "pregabalin", "lyrica", "neurontin",
      // tbi / brain injury
      "tbi", "traumatic brain injury", "concussion", "post-concussion", "pcs",
      "brain injury", "head injury",
      "multiple sclerosis", "ms", "relapsing remitting ms",
      // general
      "neurological", "neurology", "neurological condition", "brain condition",
      "cognitive decline", "dementia", "alzheimer", "memory loss",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Neurological medications often have metabolic and GI side effects that can overlap with ${peptide} — and seizure threshold can shift with rapid metabolic changes.`,
    contextSummary: (peptide, q) =>
      `The neurological landscape is broad, so the considerations vary by condition. For epilepsy: rapid metabolic shifts (blood sugar, electrolytes, hydration) can affect seizure threshold — titrate slowly and stay hydrated. Valproate and some anticonvulsants cause significant weight gain, making ${peptide} appealing, but medication levels may shift with changed body composition. For Parkinson's: nausea from ${peptide} can overlap with levodopa nausea. For diabetic neuropathy: improved glucose control from ${peptide} may stabilize or improve nerve function over time.`,
    whatIsKnown: (peptide, q) =>
      `If you're on anti-epileptic drugs, check with your prescriber about monitoring drug levels during significant weight loss — volume of distribution changes can alter effective concentrations. Topiramate already suppresses appetite; adding ${peptide} can cause excessive caloric restriction. For neuropathy, track pain scores and sensation — some people report improvement with sustained glucose control. GLP-1 receptor agonists are being actively researched for neuroprotective properties in Alzheimer's and Parkinson's, but this is investigational.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} has neuroprotective or neurotoxic effects is an active research question. The interaction between GLP-1 agonism and seizure threshold hasn't been formally evaluated. How neurological medication levels change with rapid body composition shifts is understudied. The neuroprotection signal from GLP-1 agonists is promising but not yet clinically validated.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with well-controlled epilepsy on a stable regimen may tolerate ${peptide} without issues. Someone with brittle seizure control on multiple anticonvulsants faces more uncertainty. Neurological diagnosis, seizure control stability, medication type and number, and baseline metabolic health drive the variance.`,
  },

  // ─── LYME / MOLD / CIRS ──────���────────────────────────────────────────────
  {
    id: "pt_ctx_lyme_mold_cirs",
    label: "Lyme / Mold / CIRS",
    synonyms: [
      // lyme
      "lyme", "lyme disease", "lyme borreliosis", "chronic lyme",
      "post-lyme", "post-lyme syndrome", "post-treatment lyme", "ptlds",
      "tick-borne illness", "tick bite", "co-infections", "bartonella", "babesia", "ehrlichia",
      "persistent lyme", "lyme symptoms", "lyme fatigue",
      // mold
      "mold", "mold illness", "mold exposure", "toxic mold", "black mold",
      "water damaged building", "wdb", "mycotoxin", "mycotoxins",
      "mold toxicity", "mold sensitivity",
      // cirs
      "cirs", "chronic inflammatory response syndrome",
      "biotoxin illness", "biotoxin", "biotoxin pathway",
      "shoemaker protocol", "vcs test",
      "mast cell activation", "mcas",
      // symptoms
      "brain fog lyme", "joint pain lyme", "fatigue lyme",
      "neurological lyme", "lyme arthritis",
      // treatments
      "doxycycline lyme", "amoxicillin lyme", "ceftin lyme",
      "iv antibiotics lyme", "long term antibiotics",
      "cholestyramine", "welchol", "binders",
      "hla dr", "mmp9",
      // functional medicine
      "functional medicine", "integrative medicine",
      "chronic illness", "complex chronic illness",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Lyme, mold illness, and CIRS involve complex immune dysregulation — ${peptide}'s effects will be harder to interpret against an already unpredictable symptom baseline.`,
    contextSummary: (peptide, q) =>
      `These conditions involve multi-system inflammation, immune activation, and autonomic dysfunction that create a noisy baseline. Adding ${peptide} introduces new variables (nausea, appetite change, energy shifts) into a system that already fluctuates unpredictably. If you're on binders (cholestyramine, charcoal, Welchol), be aware that these can bind other compounds in the gut — timing ${peptide} relative to binders may matter for oral medications, though injectable ${peptide} bypasses this. Go slow, track symptoms in a structured way, and resist the temptation to attribute every change to one cause.`,
    whatIsKnown: (peptide, q) =>
      `Mast cell activation (common in CIRS and chronic Lyme) can increase reactivity to injections — watch for injection-site reactions or systemic histamine responses. If you're on long-term antibiotics, the combined GI burden with ${peptide} may be significant. Track core symptoms (fatigue, brain fog, joint pain) separately from ${peptide} side effects so you can tell them apart. Hydration and electrolyte balance matter more in these populations because baseline autonomic function is often compromised.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} affects immune signaling in ways that matter for Lyme, mold, or CIRS pathophysiology is completely unknown. There's no research on GLP-1 agonists in these specific populations. Whether the anti-inflammatory properties seen in metabolic contexts translate to biotoxin-driven inflammation is purely speculative.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with post-treatment Lyme who's mostly recovered but dealing with persistent fatigue will have a very different experience than someone with active CIRS, MCAS, and autonomic dysfunction. Illness phase, mast cell reactivity, current treatment burden, and how stable the baseline is drive the range enormously.`,
  },

  // ─── GOUT / HIGH URIC ACID ────────────────────────────────────────────────
  {
    id: "pt_ctx_gout",
    label: "Gout / High Uric Acid",
    synonyms: [
      // plain language
      "gout", "gout attack", "gout flare", "gouty arthritis",
      "high uric acid", "elevated uric acid", "uric acid",
      "hyperuricemia", "purine", "urate", "urate crystals",
      "crystal arthritis",
      // symptoms
      "big toe pain", "toe swelling gout", "joint attack gout",
      "tophi", "gout tophi", "chronic gout",
      // medications
      "allopurinol", "febuxostat", "uloric",
      "colchicine", "colcrys",
      "indomethacin gout", "nsaid gout",
      "probenecid",
      "pegloticase", "krystexxa",
      "rasburicase",
      "prednisone gout", "steroid gout",
      // diet related
      "purine diet", "low purine", "avoid red meat gout",
      "shellfish gout", "alcohol gout", "beer gout",
      "fructose gout", "high fructose gout",
      // kidney related
      "kidney stones uric acid", "uric acid kidney stones",
      "urate nephropathy",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Rapid weight loss and dietary shifts can temporarily spike uric acid and trigger gout flares — the first few months on ${peptide} are the highest-risk window.`,
    contextSummary: (peptide, q) =>
      `This is a real and under-discussed risk. Rapid weight loss and caloric restriction can transiently increase uric acid levels through purine release from tissue breakdown and reduced renal clearance from dehydration. For someone with gout or borderline-high uric acid, the first 2-3 months on ${peptide} carry an elevated flare risk. Long-term, weight loss and improved metabolic health typically lower uric acid. It's the transition period that's risky. Stay well-hydrated and consider prophylactic colchicine if flare history is frequent.`,
    whatIsKnown: (peptide, q) =>
      `Track uric acid levels at baseline and 2-3 months in. Hydration is critical — dehydration concentrates uric acid and impairs renal excretion. If you're on allopurinol, keep taking it; don't stop because things seem to be improving metabolically. Dietary changes on ${peptide} (eating less protein, or different protein sources) can shift purine intake unpredictably. Alcohol reduction (which many people experience on GLP-1s) helps gout independently. Some GLP-1 trial data suggests modest uric acid reduction with sustained use.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} has direct effects on uric acid metabolism or renal urate handling beyond the indirect effects of weight loss is unknown. The magnitude and duration of the early uric acid spike during rapid weight loss is poorly quantified. How gout medications interact with the metabolic changes from ${peptide} hasn't been formally studied.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with controlled gout on allopurinol who loses weight gradually may see uric acid improve. Someone with frequent flares and borderline levels who loses 15 pounds in 6 weeks may trigger a bad flare early on. Baseline uric acid level, hydration habits, rate of weight loss, and whether prophylactic medication is in place drive the outcome.`,
  },

  // ─── PROSTATE / BPH ───────────────────────────────────────────────────────
  {
    id: "pt_ctx_prostate",
    label: "Prostate Health / BPH",
    synonyms: [
      // plain language
      "prostate", "prostate problems", "enlarged prostate", "big prostate",
      "bph", "benign prostatic hyperplasia", "prostate enlargement",
      "trouble urinating", "weak urine stream", "frequent urination men",
      "can't empty bladder", "nocturia", "waking up to pee",
      // prostate cancer
      "prostate cancer", "pca", "prostate tumor",
      "psa", "psa elevated", "rising psa", "psa test",
      "active surveillance prostate", "watchful waiting prostate",
      "prostatectomy", "radiation prostate",
      "hormone therapy prostate", "adt", "androgen deprivation therapy",
      "leuprolide", "lupron", "enzalutamide", "xtandi", "abiraterone", "zytiga",
      "castration resistant",
      // bph medications
      "tamsulosin", "flomax", "alfuzosin", "silodosin",
      "finasteride prostate", "dutasteride", "avodart", "proscar",
      "5-alpha reductase inhibitor",
      "alpha blocker prostate",
      // related
      "prostatitis", "chronic prostatitis", "pelvic pain men",
      "testosterone prostate", "low t prostate", "trt prostate",
      "dihydrotestosterone", "dht",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `BPH itself isn't a concern with ${peptide}, but men on androgen deprivation therapy for prostate cancer face significant metabolic side effects that ${peptide} may help counter.`,
    contextSummary: (peptide, q) =>
      `For BPH (enlarged prostate), no meaningful interaction with ${peptide}. Alpha blockers (Flomax) and 5-alpha reductase inhibitors (finasteride) don't interact with GLP-1 agonists. For prostate cancer, the picture depends on treatment: androgen deprivation therapy (ADT/Lupron) causes significant weight gain, insulin resistance, muscle loss, and metabolic syndrome — exactly the profile where ${peptide} could help. But if actively on ADT, the combined muscle-wasting risk from hormone deprivation plus aggressive appetite suppression needs active management (high protein, resistance training).`,
    whatIsKnown: (peptide, q) =>
      `If you're on ADT, metabolic monitoring (glucose, lipids, body composition) is already recommended — ${peptide} may improve these markers. Track PSA alongside metabolic markers; weight loss alone shouldn't affect PSA, but hormonal shifts can. For BPH, some men notice that reduced fluid intake from ${peptide}'s appetite suppression changes urinary patterns — ensure you're still drinking adequate water. Tamsulosin can cause orthostatic hypotension, which ${peptide}'s dehydration effects may amplify.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} affects PSA levels, prostate tissue directly, or androgen metabolism is unknown. The interaction between ADT-induced metabolic syndrome and GLP-1 agonism is theoretically promising but unstudied with ${peptide} specifically. Whether weight loss affects prostate cancer outcomes is an active research question unrelated to ${peptide}.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with BPH on Flomax will barely register ${peptide} as relevant. Someone on ADT gaining 30 pounds with worsening glucose may find ${peptide} addresses the metabolic side effects meaningfully. Whether it's simple BPH versus cancer treatment, and which medications are involved, drive entirely different contexts.`,
  },

  // ─── POST-SURGICAL RECOVERY ───────────────────────────────────────────────
  {
    id: "pt_ctx_post_surgical",
    label: "Post-Surgical Recovery",
    synonyms: [
      // plain language
      "surgery", "post surgery", "after surgery", "recovering from surgery",
      "post op", "postoperative", "surgical recovery", "healing from surgery",
      "wound healing", "incision", "stitches", "staples",
      "post-surgical", "recent surgery", "just had surgery",
      // types of surgery
      "bariatric surgery", "gastric bypass", "sleeve gastrectomy", "gastric sleeve",
      "weight loss surgery",
      "hip replacement", "knee replacement", "joint replacement",
      "heart surgery", "bypass surgery", "cardiac surgery",
      "abdominal surgery", "bowel surgery", "colon surgery", "colectomy",
      "hernia repair",
      "organ transplant", "transplant",
      "appendectomy", "gallbladder surgery", "cholecystectomy",
      "spinal surgery", "back surgery", "discectomy", "fusion spine",
      // recovery state
      "slow healing", "poor wound healing", "wound infection",
      "anesthesia", "general anesthesia",
      "physical therapy post surgery", "rehab surgery",
      "pain control post op", "opioid post surgery",
      "blood clot post surgery", "dvt post op", "pe post surgery",
      "complications surgery",
    ],
    signal: "flag",
    signalNote: (peptide, q) =>
      `Surgery requires adequate nutrition for healing — ${peptide}'s appetite suppression can undermine recovery if caloric and protein intake drops too low.`,
    contextSummary: (peptide, q) =>
      `Timing matters here. Before elective surgery: most surgeons and anesthesiologists now recommend stopping GLP-1 agonists 1-3 weeks before surgery because delayed gastric emptying increases aspiration risk during anesthesia. After surgery: the priority is wound healing and nutrition, and ${peptide}'s appetite suppression can make it hard to eat enough protein and calories for tissue repair. For bariatric surgery patients specifically, adding ${peptide} post-bypass or post-sleeve creates an extreme restriction environment that needs very careful nutritional monitoring.`,
    whatIsKnown: (peptide, q) =>
      `The American Society of Anesthesiologists recommends holding GLP-1 agonists before procedures involving sedation/anesthesia due to aspiration risk from retained gastric contents. After surgery, protein requirements increase to 1.5-2g/kg for wound healing — if ${peptide} makes eating 50g of protein a struggle, healing will suffer. Track wound healing progress, protein intake, and albumin/prealbumin if available. Post-bariatric surgery patients already have restricted intake; ${peptide} on top requires a dietitian's involvement.`,
    whatIsUnclear: (peptide, q) =>
      `Exactly how long before surgery to stop ${peptide} is debated — some say 1 week, some say up to the full half-life (which varies by compound). Whether ${peptide} affects wound healing through mechanisms beyond caloric restriction (e.g., GLP-1 receptor expression in immune cells) is unknown. The ideal timing for resuming post-surgery hasn't been established.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone having elective knee replacement who stops ${peptide} a week before and resumes 2 weeks after will likely be fine. Someone having emergency abdominal surgery while on ${peptide} with a full stomach faces real aspiration risk. Surgery type, urgency, current GI state, and nutritional reserves pre-surgery drive the risk profile.`,
  },

  // ─── PTSD / TRAUMA ────────────────────────────────────────────────────────
  {
    id: "pt_ctx_ptsd_trauma",
    label: "PTSD / Trauma",
    synonyms: [
      // plain language
      "ptsd", "trauma", "traumatic stress", "post traumatic stress",
      "post-traumatic stress disorder", "complex ptsd", "cptsd",
      "trauma survivor", "traumatized", "childhood trauma", "adverse childhood events",
      "ace score", "aces",
      "military trauma", "combat ptsd", "veteran ptsd",
      "sexual trauma", "abuse history",
      "dissociation", "flashbacks", "nightmares trauma", "hypervigilance",
      "freeze response", "fight or flight", "trauma response",
      // related conditions
      "emotional eating", "binge eating trauma", "trauma and eating",
      "trauma and weight", "obesity and trauma",
      "somatic symptoms", "body memory",
      // treatments
      "trauma therapy", "emdr", "cbt trauma", "prolonged exposure therapy",
      "cognitive processing therapy", "cpt therapy",
      "prazosin nightmares", "prazosin ptsd",
      "sertraline ptsd", "paroxetine ptsd", "ssri ptsd",
      "stellate ganglion block", "sgb ptsd",
      "ketamine ptsd", "mdma therapy", "psychedelic therapy",
      // stress / nervous system
      "hyperarousal", "nervous system dysregulation",
      "hpa axis", "cortisol and trauma", "adrenal and stress",
      "chronic stress", "allostatic load",
    ],
    signal: "watch",
    signalNote: (peptide, q) =>
      `Trauma deeply affects eating behavior and body relationship — ${peptide} changes both of these systems, which can be helpful or destabilizing depending on the person.`,
    contextSummary: (peptide, q) =>
      `Trauma and eating are deeply intertwined. Emotional eating, binge eating, restrictive patterns, and the use of food as nervous system regulation are all common in trauma histories. ${peptide} removes the hunger drive, which can feel like freedom from compulsive eating — or it can remove a coping mechanism without replacing it. For people with PTSD who use food to manage hyperarousal, dissociation, or nightmares, the sudden absence of that regulation tool needs therapeutic support. Body changes from weight loss can also trigger trauma responses related to body image, especially in sexual trauma histories.`,
    whatIsKnown: (peptide, q) =>
      `High ACE scores correlate with higher rates of obesity, emotional eating, and metabolic syndrome — this population often benefits metabolically from ${peptide} but needs psychological support alongside it. If you're on SSRIs for PTSD (sertraline, paroxetine), see the antidepressant section for overlap considerations. Prazosin for nightmares can lower blood pressure; combined with ${peptide}'s BP-lowering effect, monitor for dizziness. Track emotional eating patterns and nervous system regulation, not just weight.`,
    whatIsUnclear: (peptide, q) =>
      `Whether ${peptide} affects HPA axis function, cortisol regulation, or stress reactivity is unknown. The psychological impact of rapid body change in trauma survivors hasn't been studied in the GLP-1 context. Whether the reduction in food noise helps or hinders trauma processing is a clinical question without data.`,
    whyExperiencesVary: (peptide, q) =>
      `Someone with resolved PTSD and residual emotional eating may feel genuine liberation from food noise. Someone with active PTSD and food as a primary coping mechanism may find the experience destabilizing. Trauma type, current therapeutic support, relationship with food, and nervous system regulation capacity drive dramatically different outcomes.`,
  },

];

export function getBestContextMatches(query: string, limit = 3): Match[] {
  const qn = norm(query);
  const qt = tokens(query);
  if (!qn) return [];

  const scored = CONTEXT_PACKS.map((p) => scorePack(qn, qt, p))
    .filter((m) => m.score > 0.18) // slightly lower threshold for broader coverage
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, Math.max(1, limit));
}
