export type ContextPack = {
  id: string;
  label: string;
  synonyms: string[];
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Reduced kidney function can change clearance and sensitivity, which can shift how people interpret side effects or benefits discussed in research and anecdotes.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that kidney function can be a key variable for how compounds are handled and tolerated. For many peptides, CKD-specific evidence may be limited, so discussions tend to stay cautious and context-heavy.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how well general findings translate across CKD stages when studies exclude reduced kidney function or don't report kidney-related stratification. Direct evidence for some outcomes may be sparse.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from CKD stage, hydration status, electrolyte balance, medication burden, protein intake, and comorbid conditions that often travel with kidney disease.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Thyroid status can shift baseline metabolism, heart-rate sensitivity, and energy perception, which changes how outcomes are described and which signals people notice first.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is *baseline sensitivity*. When "${q}" is part of the picture, people may pay more attention to changes in energy, sleep, temperature tolerance, and heart-rate sensations. Evidence for direct thyroid-specific effects varies by peptide and is often indirect (mechanistic or early human data).`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear which observations are attributable to ${peptide} versus underlying thyroid dynamics, concurrent thyroid medications, or fluctuations in lab markers over time. Many studies are not designed around thyroid subgroups, so direct applicability can be limited.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from baseline thyroid function, medication stability, iodine status, sleep debt, stimulant exposure (caffeine), and differences in what "more energy" or "better metabolism" means to different people.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Autoimmune contexts tend to involve fluctuating symptoms and immune signaling, so discussion often centers on inflammatory pathways and symptom variability rather than single, stable outcomes.`,
    whatIsKnown: (peptide, q) =>
      `The most consistent theme is *signal noise*: symptoms can shift from week to week even without a single clear cause. When "${q}" is present, interpretation usually benefits from separating immune-related symptom fluctuations from more general effects being discussed for ${peptide}.`,
    whatIsUnclear: (peptide, q) =>
      `Direct evidence in specific autoimmune populations is often limited, and studies may exclude people on immunomodulators or complex regimens. That makes it hard to generalize from mixed-population findings to "${q}" specifically.`,
    whyExperiencesVary: (peptide, q) =>
      `Differences in diagnosis subtype, flare cycles, baseline inflammation, concurrent meds, and how outcomes are measured (pain, fatigue, function) can all produce very different narratives—even when people are describing similar events.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. In antidepressant contexts, discussions usually focus on overlapping domains like sleep, appetite, nausea, mood perception, and energy—where attribution can be tricky.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is *overlap in subjective endpoints*. When "${q}" is present, a change in sleep, appetite, or motivation may be interpreted differently depending on baseline mental-state stability and side-effect sensitivity.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how much reported change is due to ${peptide} versus the antidepressant's baseline effects, dose stability over time, or normal mood variability. Many datasets don't capture nuanced psychiatric baselines, so specificity is limited.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from medication type, duration of use, baseline anxiety, sleep quality, caffeine/stimulants, and differences in how individuals label "better" (calmer vs more energized vs less appetite vs better sleep).`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Anxiety, ADHD, and stimulant medications all influence the nervous system's baseline tone, which can shape how effects on sleep, appetite, heart rate, and mood are perceived and described.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is *nervous system overlap*. When "${q}" is present, stimulant use or anxiety can amplify sensitivity to changes in heart rate, energy, sleep, and appetite—making it harder to isolate what any single compound is contributing.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear whether reported changes reflect ${peptide} directly, stimulant dose effects, anxiety fluctuation, or day-to-day variation in stress and sleep. Most studies don't enroll people with active ADHD or significant anxiety diagnoses, limiting direct applicability.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from stimulant type and dose, caffeine use, baseline anxiety level, sleep quality, stress load, and how tightly someone's attention is focused on physical sensations (which high-anxiety and ADHD profiles can amplify).`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Age can change pharmacodynamics, recovery capacity, and baseline risks, so discussions often center on comorbidities and concurrent medications rather than a single mechanism.`,
    whatIsKnown: (peptide, q) =>
      `The most consistent theme is *context load*: more medications, more conditions, and less physiological reserve can change how effects are noticed and described. Evidence is often thinner in older cohorts because many studies skew younger or healthier.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how well general findings translate to older adults because subgroup analyses may be missing, and outcomes can be influenced by baseline frailty, nutrition status, sleep, and mobility limitations.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from medication burden, kidney/liver function differences, hydration status, baseline activity level, and how "improvement" is defined (pain, function, energy, sleep, appetite).`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Pregnancy and lactation contexts are discussed differently because evidence standards, ethical constraints, and safety signals are treated with more caution.`,
    whatIsKnown: (peptide, q) =>
      `What's known most consistently is that direct human evidence is frequently limited in these populations. Discussion tends to emphasize the difference between mechanistic speculation and population-specific safety data.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear what is truly known versus assumed, because many datasets exclude pregnancy/lactation by design. That creates a gap between general research discourse and pregnancy-specific certainty.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from trimester/postpartum phase, baseline nausea/sleep shifts, iron status, thyroid changes, and normal hormonal dynamics that can dominate subjective experience.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Metabolic contexts often change baseline appetite, energy, and cardiovascular signals, so discussions frequently hinge on which outcomes are being measured and over what timeframe.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is *endpoint ambiguity*: appetite, weight, glucose markers, and energy can move for many reasons. When "${q}" is present, clarity often comes from distinguishing mechanism talk from measurable outcomes in real-world reports.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how much of a reported change is due to ${peptide} versus baseline lifestyle shifts, medication changes, or regression-to-the-mean in fluctuating markers. Many studies don't capture all confounders.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from baseline insulin resistance, sleep, stress, diet composition, training status, and concurrent meds that affect appetite or glucose handling.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Liver function can matter because the liver is central to metabolism and clearance for many compounds, which can shift sensitivity and how side effects are interpreted.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that reduced liver function can change how long effects linger and how "strong" something feels at a given exposure. For many peptides, direct liver-disease subgroup evidence is limited, so discussions often stay cautious and context-heavy.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how well general findings translate across liver-disease severity because studies may exclude significant liver impairment or fail to report liver-related stratification. Evidence can also be indirect (mechanistic or mixed-population).`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from disease severity, inflammation status, nutrition, alcohol history, medication burden, bile flow issues, and comorbid metabolic conditions that often co-occur with liver disease.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Heart and cardiovascular conditions can affect baseline heart rate, blood pressure, and fluid balance—which changes how effects on energy, exercise tolerance, and recovery are described.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that cardiac status can amplify or mask signals that would otherwise be attributed to ${peptide}. When "${q}" is present, changes in heart rate, blood pressure, exercise tolerance, or fluid retention are often difficult to attribute to a single cause.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how well general findings translate to people with established heart disease because most study populations exclude significant cardiac conditions. Direct cardiac-specific evidence for many peptides is limited or indirect.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from cardiac diagnosis type and severity, medication burden, ejection fraction, fluid regulation, activity limitations, and the strong influence that cardiovascular baseline can have on energy, tolerance, and recovery markers.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. When someone is on blood thinners or has a clotting condition, bleeding and bruising signals take on added significance—so discussions often focus heavily on safety considerations and how to interpret unexpected changes.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is *elevated baseline concern* around any new compound when anticoagulation is involved. When "${q}" is present, people often pay close attention to bruising, wound healing, and any signs of unexpected bleeding—though attribution is usually uncertain.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how ${peptide} specifically interacts with anticoagulant pathways, especially at the level of real-world outcomes versus theoretical mechanistic concern. Many studies don't enroll people on anticoagulation or don't report bleeding outcomes in detail.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from which anticoagulant is used, dose stability, INR control, baseline bleeding risk, underlying condition (afib vs DVT vs clotting disorder), and individual tissue sensitivity to bruising and healing.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Tendon problems are often about load management and slow tissue remodeling, so discussions tend to focus on recovery timelines and variability rather than quick, obvious changes.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that tendon symptoms can lag behind training changes and can flare with small shifts in volume, intensity, or biomechanics. When "${q}" is present, interpretation often benefits from tracking training load and recovery conditions alongside any compound-related discussion.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear whether a reported improvement reflects true tendon remodeling versus reduced irritation, temporary symptom suppression, or simply a change in training stress. Many reports lack details about rehab work, rest, or activity modification.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from injury location and severity, training history, recent load spikes, sleep and nutrition, body weight, biomechanics, adherence to rehab, and differences in how pain is perceived and reported.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Blood-pressure symptoms can be strongly influenced by hydration, salt balance, stress, and other medications—so discussion often focuses on context and attribution rather than a single cause.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is *signal overlap*: dizziness, fatigue, and "heart racing" sensations can come from blood pressure shifts, dehydration, anxiety, stimulants, or medication effects. When "${q}" is present, interpretation often benefits from separating subjective sensations from measured readings and surrounding circumstances.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear whether a reported symptom reflects a real blood-pressure change versus a transient event (hydration, sleep, caffeine, stress) or unrelated factors. Many anecdotes don't include measurements, timing, or co-medication context.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from baseline BP, hydration and electrolyte intake, fitness level, heat exposure, posture changes, concurrent meds (including antihypertensives/diuretics), and differences in sensitivity to palpitations or dizziness.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Gastrointestinal conditions can shift baseline appetite, nausea sensitivity, and bowel patterns, which strongly shapes how effects are perceived and reported.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that GI symptoms are highly sensitive and easily influenced by stress, diet, and expectation. When "${q}" is present, distinguishing baseline variability from new effects becomes especially important.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how much of a change is directly attributable to ${peptide} versus underlying motility patterns, inflammation cycles, microbiome shifts, or concurrent dietary changes. Many studies don't deeply stratify by GI diagnosis.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from diagnosis subtype (IBS vs IBD), flare cycles, stress load, fiber intake, hydration, microbiome diversity, medication use, and individual sensitivity to gut sensations.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Sleep quality is one of the biggest drivers of how people feel day-to-day, so it can dominate perceived "effects" and make attribution especially tricky.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that poor sleep amplifies sensitivity—mood, appetite, pain, motivation, and energy can swing widely. When "${q}" is present, changes may reflect improved or worsened sleep more than a direct primary effect of ${peptide}.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear whether reported changes are direct or downstream (e.g., sleep improved → appetite and mood shift). Many studies don't measure sleep rigorously, and real-world reports rarely control for sleep debt or apnea severity.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from sleep apnea severity, total sleep time, sleep regularity, caffeine/stimulant use, stress load, bedtime routine, alcohol use, and whether sleep disruption is primary or secondary to another condition.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Hormone therapy can strongly influence energy, body composition, mood, libido, and recovery—so it often changes baseline expectations and how results are interpreted.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that hormone status can amplify or dampen perceived effects. When "${q}" is present, changes in energy, appetite, muscle recovery, or mood may reflect overlapping hormonal signaling rather than a single isolated mechanism.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how much of a reported effect is due to ${peptide} versus underlying hormone levels, dose stability, aromatization, or recent protocol changes. Many datasets don't stratify by hormone therapy status.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from dose, delivery method (injection vs topical), estradiol balance, SHBG levels, body fat percentage, sleep quality, training intensity, and whether hormone levels are stable or recently adjusted.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Menopause transitions can shift sleep, temperature regulation, mood, and body composition signals, which can change how people interpret energy, appetite, and recovery discussions.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that baseline symptoms can fluctuate substantially during this phase (sleep quality, stress tolerance, appetite, fatigue). When "${q}" is present, it's common for people to attribute changes to multiple overlapping factors.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how well general findings translate to perimenopausal or menopausal populations because many studies don't stratify by menopause status or symptom severity. Direct evidence for certain outcomes can be limited.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from stage (peri vs post), sleep disruption severity, stress load, HRT use, training status, and differences in baseline metabolic health.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. When someone is underweight or frail, baseline reserves are lower, so appetite, hydration, and tolerance signals may show up sooner and be interpreted differently.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that low baseline reserves can amplify perceived effects (good or bad). When "${q}" is present, discussions often emphasize whether a change reflects true benefit or just reduced tolerance margin.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how well general findings translate to frail or underweight populations because many studies enroll healthier or more weight-stable cohorts. Subgroup evidence may be limited.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from nutrition status, protein intake, baseline activity, sleep quality, medication burden, and underlying causes of low weight (illness, GI issues, stress).`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. In athlete and rehab contexts, baseline training stress and tissue healing timelines can dominate how people interpret changes—so "worked" vs "did nothing" often depends on where someone is in the recovery cycle.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that training load and recovery stage matter a lot. Symptoms like soreness, stiffness, sleep quality, and perceived readiness can shift quickly with volume/intensity changes, so athlete discussions tend to focus on separating normal training fluctuation from any peptide-specific signal.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear whether a reported improvement reflects true tissue healing versus short-term shifts in pain perception, swelling, sleep, or training behavior. Many conversations rely on anecdote, and studies may not match real-world injury types, rehab protocols, or athlete workloads.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from the specific tissue involved (muscle vs tendon vs ligament), injury severity, rehab quality, sleep, nutrition, stress, re-injury risk, and whether training load was reduced or ramped while "${q}" was being discussed.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. In younger or growth-stage contexts, baseline physiology can be different, and discussion tends to focus on uncertainty, safety signals, and the fact that most evidence is not built around adolescents.`,
    whatIsKnown: (peptide, q) =>
      `What's most consistent is that evidence quality is usually lower for "${q}" because many studies focus on adults. Conversations often emphasize that growth-stage hormones, training volume, and sleep can strongly shape outcomes people attribute to ${peptide}.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how adult findings translate to adolescents, and what's "normal variability" versus a true signal. Many datasets do not include age-specific stratification or long-term follow-up in younger groups.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from puberty stage, sleep needs, training load, nutrition adequacy, stress, and rapid baseline changes that can dwarf subtle effects being discussed.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. In overweight/high-BMI contexts, appetite signals and metabolic markers can shift for many reasons—so interpretation often improves when people separate "how I feel" from measurable changes over time.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that baseline appetite regulation, sleep, and stress can strongly shape reported outcomes. When "${q}" is present, people often pay closer attention to appetite, nausea, energy, and blood-sugar-related sensations that may not generalize across individuals.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear whether a reported change reflects a direct effect of ${peptide} versus concurrent behavior changes, diet composition shifts, training changes, or normal variability in weight and hunger signals.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from baseline insulin resistance, sleep quality, stress, diet, training status, medication effects, and how quickly someone changes lifestyle variables during the same window they're discussing "${q}".`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Post-COVID and Long COVID contexts involve multi-system involvement—fatigue, immune dysregulation, autonomic dysfunction, and cognitive symptoms—that can shift how all outcomes are perceived and which signals get attention.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that Long COVID produces layered, overlapping symptoms (fatigue, brain fog, breathlessness, palpitations) that fluctuate unpredictably. When "${q}" is part of the picture, it can be very difficult to attribute any change to ${peptide} versus normal Long COVID variation or recovery trajectory.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how well findings from healthy or typical-disease populations translate to Long COVID, since the underlying biology—microclots, immune dysregulation, viral persistence—is still being characterized. Evidence for ${peptide} in this specific context is typically absent or indirect.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from which organ systems were affected (respiratory, cardiac, neurological), initial COVID severity, vaccination status, timing since infection, autonomic involvement, co-occurring conditions, and how sensitized someone is to physical sensations after a prolonged illness.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Chronic fatigue conditions like ME/CFS and POTS involve profound energy limitation and autonomic instability, which means baseline function can vary enormously day-to-day and small changes can be hard to interpret.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that post-exertional malaise (PEM) and autonomic symptoms set a very different starting point for interpreting any compound's effects. When "${q}" is present, perceived changes in energy, heart rate, and cognition often reflect illness fluctuation as much as any external factor.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how findings from healthy populations or different disease models translate to ME/CFS, since the underlying biology remains incompletely understood. Formal evidence for ${peptide} in this population is usually absent or anecdotal, and PEM risk makes interpretation especially complex.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from illness severity and duration, autonomic subtype (POTS vs other dysautonomia), co-occurring MCAS or hypermobility, sleep quality, stress, activity pacing, and the sensitivity of the nervous system in this context.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Chronic pain contexts involve a high medication burden and a nervous system that may already be sensitized—which changes how new signals, side effects, and perceived benefits are interpreted.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that pain medications (especially opioids, gabapentinoids, and muscle relaxants) can dampen energy, cognition, and motivation—which creates a complicated baseline when trying to interpret what ${peptide} is contributing. Pain itself also affects sleep, appetite, and mood, layering additional confounders.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how much of a reported change reflects ${peptide} versus fluctuations in pain levels, medication adjustments, sleep quality, or mood shifts that travel with chronic pain. Studies rarely enroll people on complex pain regimens.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from pain type and location, medication class and dose, tolerance development, sleep disruption, psychological impact of chronic pain, activity levels, and whether pain is currently stable or in a flare cycle.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Cancer and active treatment create a physiological environment unlike most study populations—immune function, metabolism, organ reserve, and medication interactions are all significantly altered.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that cancer treatment changes baseline dramatically: fatigue, nausea, appetite loss, and immune suppression can dominate the experience. When "${q}" is present, separating treatment effects from anything ${peptide} might contribute is especially difficult, and the stakes around unexpected changes are higher.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how findings from healthy or non-cancer populations apply to people in active treatment or early survivorship, since organ function, immune status, and drug metabolism can be significantly altered. Direct evidence for ${peptide} in oncology contexts is typically very limited.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from cancer type, treatment phase, cumulative treatment toxicity, current immune status, nutritional state, organ function (liver, kidney, bone marrow), and the psychological context of navigating a cancer diagnosis.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Respiratory conditions affect oxygen delivery, exercise capacity, and sometimes systemic inflammation—which can shift how effects on energy, endurance, and recovery are perceived and reported.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that breathing limitations set a ceiling on energy and exercise tolerance that can dominate outcomes. When "${q}" is present, changes in perceived exertion, endurance, and recovery may reflect respiratory status as much as any direct effect of ${peptide}.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how well findings from people with normal lung function translate to those with significant respiratory limitations. Inhaled medications and systemic steroids can also affect energy, bone density, immune function, and metabolism in ways that create additional confounders.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from condition type and severity, current exacerbation status, inhaler and medication regimen, allergen exposure, activity level, and how much respiratory limitation already constrains daily function.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Bipolar disorder and antipsychotic medications create a complex baseline—metabolic changes, mood cycling, sedation, and significant pharmacological interactions can all influence how effects are experienced and interpreted.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that mood stabilizers and antipsychotics can significantly affect metabolic markers (weight, blood sugar, lipids), energy levels, and cognitive clarity. When "${q}" is present, separating medication effects from any compound-related signal is especially difficult, and mood stability itself can shift how experiences are labeled.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how ${peptide} interacts with the pharmacology of mood stabilizers or antipsychotics, and most study populations exclude people on these medications. Changes in energy, sleep, appetite, and weight in this context have multiple plausible explanations.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from mood phase (stable vs hypomanic vs depressed), specific medication class and dose, metabolic side-effect burden, sleep quality, stress load, substance use, and how closely someone is monitoring their mental state for changes.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Bone health contexts often involve long-term medication use and a focus on markers that change slowly—which means interpreting short-term experiences is tricky, and the medications used have their own systemic effects.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that bone density changes on a timescale of months to years, while subjective symptoms (joint comfort, energy, recovery) are what people notice day-to-day. When "${q}" is present, it's important to separate how ${peptide} might influence bone-adjacent markers (collagen, inflammation) from claims about bone density itself.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how well general findings translate to people with established bone disease or on bisphosphonate/denosumab therapy, since these medications alter bone metabolism significantly. Direct evidence for ${peptide} in osteoporosis populations is limited.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from severity of bone loss, medication class, calcium and vitamin D status, hormonal status (especially estrogen/testosterone), activity level, history of steroid use, and underlying cause of bone loss.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Conditions like endometriosis and PCOS involve hormonal and inflammatory dynamics that fluctuate with the menstrual cycle—which creates a shifting baseline that makes it hard to isolate what any single compound is contributing.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that hormonal cycling, inflammation, and pain levels in these conditions can produce week-to-week variability that dominates subjective experience. When "${q}" is present, changes in energy, mood, appetite, and pain often reflect cycle phase and underlying condition as much as any external compound.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how well findings from mixed or male-dominated study populations translate to people with endometriosis or PCOS, since hormonal environment, inflammation patterns, and drug metabolism can differ meaningfully. Direct evidence for ${peptide} in these conditions is typically limited.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from cycle phase, disease severity, current hormonal therapy, insulin sensitivity (especially in PCOS), stress load, sleep, pain level, and how hormone levels fluctuate across the month.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Eating disorder contexts involve significant nutritional variability, potential electrolyte and metabolic instability, and a heightened sensitivity to anything that affects appetite, weight, or body perception—making interpretation especially nuanced.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that appetite, weight, energy, and body-related signals carry outsized emotional and behavioral weight in this context. When "${q}" is part of the picture, effects on hunger, nausea, and body composition perception can interact with existing patterns in ways that don't apply to general populations.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how findings from typical populations translate to people with active or historical eating disorders, since nutritional status, electrolyte balance, and neuroendocrine function can be significantly altered. Most studies exclude this population, so direct evidence for ${peptide} here is essentially absent.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from current nutritional status, recovery stage, medication use, electrolyte balance, bone health, hormonal suppression from low weight, psychological relationship with food, and whether appetite suppression or stimulation is experienced as welcome or threatening.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Allergy and histamine contexts can affect immune reactivity, skin, GI function, and respiratory symptoms—and antihistamines can have sedating and anti-inflammatory effects that change the baseline for interpreting other signals.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that histamine-related symptoms (skin reactions, gut irritation, fatigue, brain fog) can fluctuate with allergen exposure, season, stress, and diet—creating variability that's hard to attribute to any single compound. When "${q}" is present, antihistamine use can dampen or mask signals.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear whether a new skin symptom, GI reaction, or fatigue episode reflects ${peptide} directly, a histamine response, an allergy flare, or antihistamine side effects. Most studies don't stratify by allergy status or antihistamine use.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from allergy type and severity, current allergen load (season, diet), antihistamine class and sedation level, mast cell reactivity, gut permeability, and underlying immune sensitivity.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Anemia and iron deficiency affect oxygen delivery, energy metabolism, and cognitive function—creating a fatigue and performance baseline that can be difficult to separate from effects attributed to other compounds.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that iron deficiency and anemia can independently produce fatigue, brain fog, exercise intolerance, and cold sensitivity—symptoms that overlap substantially with what people monitor when using ${peptide}. When "${q}" is present, correcting deficiency often has a more noticeable effect than any compound.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how well findings from iron-replete populations translate to people with active anemia or deficiency, and whether ${peptide} influences iron metabolism, red cell production, or inflammatory pathways that affect blood markers. Direct evidence is typically limited.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from severity of deficiency, underlying cause (dietary, absorption, blood loss, chronic disease), whether supplementation is ongoing, concurrent deficiencies (B12, folate), menstrual blood loss, and baseline metabolic demand.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Hair loss is a sensitive and highly visible outcome, and its causes are multifactorial—hormones, nutrition, stress, immune function, and medications can all contribute—which makes attribution especially difficult.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that hair cycling has a natural lag—telogen effluvium and regrowth both appear weeks to months after the triggering event. When "${q}" is present, it can be hard to know whether ${peptide} is influencing hair cycles, or whether the change reflects an earlier stressor, hormonal shift, or nutritional deficit.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear whether reported changes in hair shedding or regrowth reflect ${peptide} directly, changes in hormones (androgens, thyroid, estrogen), nutritional status, or the natural fluctuation of hair cycling. Most studies don't track hair outcomes systematically.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from genetic predisposition, hormonal environment (DHT, estrogen, thyroid), nutritional status (iron, biotin, protein), stress levels, scalp health, and what phase of the hair cycle someone is in when they start observing.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Skin conditions involve immune, hormonal, and inflammatory dynamics that fluctuate with stress, diet, season, and medication—making it difficult to isolate what any single compound is contributing to skin changes.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that skin symptoms are highly reactive to multiple overlapping factors. When "${q}" is present, new skin changes (flushing, breakouts, dryness, irritation) often reflect immune or hormonal shifts, topical medication changes, or diet/stress rather than a direct effect of ${peptide}.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear whether a skin change reflects ${peptide} directly, a change in inflammatory status, hormonal fluctuation, dietary shift, or reaction to other medications. Skin responses are often nonspecific and may resolve without any clear cause identified.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from skin condition type and severity, immune and hormonal environment, current medication regimen, skincare routine, diet, stress load, climate and season, and individual skin barrier function.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Migraine is a complex neurological condition influenced by hormones, inflammation, sleep, stress, and metabolic factors—all of which can shift when metabolic or inflammatory status changes.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that migraine frequency and severity can be sensitive to hormonal fluctuations, dietary shifts (especially caloric restriction or fasting), changes in sleep, and stress levels. When someone with "${q}" starts ${peptide}, any of these factors may shift.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear whether headache changes reflect ${peptide} directly, a change in hydration or electrolytes, dietary pattern shifts (common with GLP-1 class compounds), hormonal fluctuations, medication interactions, or background migraine variability.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from migraine subtype, hormone status (especially estrogen), current preventive medication, hydration and electrolyte balance, sleep quality, stress, dietary changes, and how migraine threshold shifts with metabolic changes.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Osteoarthritis and joint degeneration involve structural, inflammatory, and mechanical factors. Weight, metabolic status, and systemic inflammation all influence joint symptom trajectory—making the picture complex when other variables change.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that reduced mechanical load (from weight change) and shifts in systemic inflammation can affect how joint symptoms are experienced. When someone with "${q}" experiences changes, it's often difficult to distinguish structural factors from inflammatory, mechanical, and medication effects.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how well findings from general populations apply to people with significant "${q}", especially those on anti-inflammatory medications, corticosteroid injections, or those who have had joint procedures. Concurrent medication effects are rarely studied together.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from joint affected and severity, body weight and loading patterns, concurrent anti-inflammatory medications, activity level, physical therapy, sleep quality, systemic inflammation, and individual cartilage and bone biology.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Alcohol and substance use affect liver function, metabolic status, sleep, inflammation, and medication processing—creating a complex background that can change how any compound is experienced and how effects are interpreted.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that liver function, metabolic health, and inflammatory baseline can all be affected by alcohol or substance use patterns. When "${q}" is present, liver enzyme monitoring and metabolic parameters may have additional complexity. Some research suggests GLP-1 receptor signaling may be relevant to reward pathways.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how substance use history interacts with ${peptide} in practice. Most clinical studies exclude people with active substance use disorders, so evidence is limited. Interactions with medications used in addiction treatment are often unstudied.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from type and amount of substance used, current use vs. recovery status, liver and metabolic health, concurrent medications (especially MAT), sleep quality, nutritional status, and how substance use affects appetite regulation and GI function.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Neurological conditions involve a wide spectrum of mechanisms—from altered neurotransmitter systems to inflammatory and metabolic factors—that can influence how any compound affects the nervous system and cognitive function.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that neurological conditions may alter metabolic regulation, appetite signaling, and how the CNS responds to compounds. Some neurological medications have metabolic or GI effects that may overlap or interact. When "${q}" is present, effects on cognition, energy, and motor function may be harder to attribute clearly.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how neurological conditions or their medications affect ${peptide} processing and tolerability. Most trials exclude people with significant neurological diagnoses, and drug-drug interactions with neurological medications are understudied in this context.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from neurological diagnosis and severity, current medications and their metabolic effects, sleep disruption, autonomic function, cognitive capacity to track changes, dietary and mobility patterns, and how the condition affects appetite, GI motility, and stress systems.`,
  },

  // ─── LYME / MOLD / CIRS ───────────────────────────────────────────────────
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Lyme disease, mold illness, and CIRS involve persistent inflammatory, immune, and neuroendocrine disruption that can affect how the body responds to any compound—and how reported effects are interpreted in the context of an already unpredictable symptom baseline.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that people with "${q}" often have baseline fatigue, brain fog, pain, and immune dysregulation that fluctuate independently. Changes in symptoms when using ${peptide} may be difficult to distinguish from underlying condition variability, herxheimer-type reactions, or treatment effects.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how chronic inflammatory conditions like "${q}" affect metabolic and endocrine pathways relevant to ${peptide}, and whether standard effects are amplified, blunted, or shifted. Research populations generally exclude people with these diagnoses.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from illness phase and severity, current treatment protocol, mold or tick antigen burden, mast cell reactivity, immune system state, HPA axis function, sleep disruption, concurrent medications and binders, and individual sensitivity to inflammatory signals.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Gout and high uric acid are influenced by diet, hydration, kidney function, metabolic health, and several medications—making it complex to predict how changes in any of these factors (which may shift during ${peptide} use) affect uric acid levels and gout risk.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that uric acid is sensitive to dietary changes (especially caloric restriction and protein intake), hydration status, kidney function, and metabolic shifts. When "${q}" is present, changes in diet or weight can sometimes transiently affect uric acid levels.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear whether ${peptide} directly affects uric acid metabolism, or whether observed changes reflect diet, hydration, weight change, or kidney function shifts. Gout medications and their interactions in this context are not well studied.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from baseline uric acid level, kidney function, diet composition, hydration, alcohol use, genetic uric acid handling, concurrent urate-lowering therapy, and how dietary patterns shift during the period of use.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Prostate health involves hormonal, inflammatory, and urological dynamics that can interact with metabolic status, testosterone levels, and medications—creating a background context that shapes how any compound's effects are interpreted.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that hormonal balance, metabolic health, and inflammatory status can influence prostate symptoms and PSA levels. When someone with "${q}" is also on hormone-modulating treatments like ADT or TRT, the interaction with ${peptide}'s metabolic effects may add complexity.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how ${peptide} affects prostate-specific outcomes, or how prostate medications interact with metabolic compounds in practice. Studies involving people on active prostate cancer treatment rarely include investigational metabolic compounds.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from prostate condition type and severity, current medications (especially hormonal), baseline testosterone levels, metabolic and inflammatory status, urological anatomy, and whether active treatment for prostate cancer is ongoing.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Post-surgical recovery involves tissue healing, immune response, pain management, and metabolic demands that can be highly sensitive to nutritional status, appetite, weight, and medication changes—all of which may be relevant when using compounds that affect these systems.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that nutrition, protein intake, inflammatory status, and weight trajectory all matter for surgical recovery. When someone is recovering from "${q}" while also using ${peptide}, the effect on appetite and GI function may have implications for meeting recovery nutritional needs.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how ${peptide} use around the surgical period affects wound healing, immune function, or anesthetic interactions. Guidance on timing (stopping before surgery, when to resume) varies and is not systematically studied in clinical contexts.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from surgery type and complexity, nutritional status before surgery, healing biology, concurrent medications (especially pain management), activity level, comorbid conditions, age, and whether complications occurred during or after the procedure.`,
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
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. PTSD and trauma affect the nervous system, HPA axis, cortisol, appetite regulation, and eating patterns in ways that are deeply intertwined with metabolic health—making it complex to interpret how any compound affects symptoms, behavior, or wellbeing in this context.`,
    whatIsKnown: (peptide, q) =>
      `What's discussed most consistently is that trauma affects appetite, eating behavior, weight regulation, and stress hormones. When "${q}" is present, emotional eating patterns, dissociation around food, and hypervigilance about body changes may all intersect with how ${peptide} affects appetite and weight.`,
    whatIsUnclear: (peptide, q) =>
      `It's often unclear how trauma history or active PTSD affects the subjective experience of metabolic compounds, or whether changes in appetite and weight trigger psychological responses that complicate the picture. The interaction between trauma-related eating patterns and GLP-1 class mechanisms is not well studied.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from trauma type, history, and severity, current therapeutic support, concurrent psychiatric medications, relationship with food and body, stress and cortisol baseline, sleep disruption, nervous system regulation capacity, and emotional eating patterns.`,
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
