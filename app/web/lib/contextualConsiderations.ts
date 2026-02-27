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
