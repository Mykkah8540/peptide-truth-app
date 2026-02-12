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
// Add more over time; this file is intentionally the single source for the v1 matcher.
export const CONTEXT_PACKS: ContextPack[] = [
  {
    id: "pt_ctx_kidney_disease_ckd",
    label: "Kidney disease (CKD) / reduced kidney function",
    synonyms: ["kidney", "kidney disease", "ckd", "chronic kidney disease", "reduced kidney function", "low egfr", "egfr", "creatinine", "dialysis", "proteinuria"],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Reduced kidney function can change clearance and sensitivity, which can shift how people interpret side effects or benefits discussed in research and anecdotes.`,
    whatIsKnown: (peptide, q) =>
      `What’s discussed most consistently is that kidney function can be a key variable for how compounds are handled and tolerated. For many peptides, CKD-specific evidence may be limited, so discussions tend to stay cautious and context-heavy.`,
    whatIsUnclear: (peptide, q) =>
      `It’s often unclear how well general findings translate across CKD stages when studies exclude reduced kidney function or don’t report kidney-related stratification. Direct evidence for some outcomes may be sparse.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from CKD stage, hydration status, electrolyte balance, medication burden, protein intake, and comorbid conditions that often travel with kidney disease.`,
  },
  {
    id: "thyroid",
    label: "Thyroid conditions",
    synonyms: ["hypothyroid", "hyperthyroid", "hashimoto", "graves", "levothyroxine", "t3", "t4"],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Thyroid status can shift baseline metabolism, heart-rate sensitivity, and energy perception, which changes how outcomes are described and which signals people notice first.`,
    whatIsKnown: (peptide, q) =>
      `What’s discussed most consistently is *baseline sensitivity*. When "${q}" is part of the picture, people may pay more attention to changes in energy, sleep, temperature tolerance, and heart-rate sensations. Evidence for direct thyroid-specific effects varies by peptide and is often indirect (mechanistic or early human data).`,
    whatIsUnclear: (peptide, q) =>
      `It’s often unclear which observations are attributable to ${peptide} versus underlying thyroid dynamics, concurrent thyroid medications, or fluctuations in lab markers over time. Many studies are not designed around thyroid subgroups, so direct applicability can be limited.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from baseline thyroid function, medication stability, iodine status, sleep debt, stimulant exposure (caffeine), and differences in what “more energy” or “better metabolism” means to different people.`,
  },
  {
    id: "autoimmune",
    label: "Autoimmune conditions",
    synonyms: ["autoimmune", "inflammation", "lupus", "ra", "rheumatoid", "ms", "crohns", "ulcerative colitis", "immunosuppressant"],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Autoimmune contexts tend to involve fluctuating symptoms and immune signaling, so discussion often centers on inflammatory pathways and symptom variability rather than single, stable outcomes.`,
    whatIsKnown: (peptide, q) =>
      `The most consistent theme is *signal noise*: symptoms can shift from week to week even without a single clear cause. When "${q}" is present, interpretation usually benefits from separating immune-related symptom fluctuations from more general effects being discussed for ${peptide}.`,
    whatIsUnclear: (peptide, q) =>
      `Direct evidence in specific autoimmune populations is often limited, and studies may exclude people on immunomodulators or complex regimens. That makes it hard to generalize from mixed-population findings to "${q}" specifically.`,
    whyExperiencesVary: (peptide, q) =>
      `Differences in diagnosis subtype, flare cycles, baseline inflammation, concurrent meds, and how outcomes are measured (pain, fatigue, function) can all produce very different narratives—even when people are describing similar events.`,
  },
  {
    id: "ssri",
    label: "Antidepressants (SSRIs)",
    synonyms: ["ssri", "snri", "sertraline", "fluoxetine", "escitalopram", "citalopram", "paroxetine", "venlafaxine", "duloxetine"],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. In antidepressant contexts, discussions usually focus on overlapping domains like sleep, appetite, nausea, mood perception, and energy—where attribution can be tricky.`,
    whatIsKnown: (peptide, q) =>
      `What’s discussed most consistently is *overlap in subjective endpoints*. When "${q}" is present, a change in sleep, appetite, or motivation may be interpreted differently depending on baseline mental-state stability and side-effect sensitivity.`,
    whatIsUnclear: (peptide, q) =>
      `It’s often unclear how much reported change is due to ${peptide} versus the antidepressant’s baseline effects, dose stability over time, or normal mood variability. Many datasets don’t capture nuanced psychiatric baselines, so specificity is limited.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from medication type, duration of use, baseline anxiety, sleep quality, caffeine/stimulants, and differences in how individuals label “better” (calmer vs more energized vs less appetite vs better sleep).`,
  },
  {
    id: "older-adults",
    label: "Older adults",
    synonyms: ["older adults", "senior", "65+", "age", "aging", "frailty", "polypharmacy", "comorbidities"],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Age can change pharmacodynamics, recovery capacity, and baseline risks, so discussions often center on comorbidities and concurrent medications rather than a single mechanism.`,
    whatIsKnown: (peptide, q) =>
      `The most consistent theme is *context load*: more medications, more conditions, and less physiological reserve can change how effects are noticed and described. Evidence is often thinner in older cohorts because many studies skew younger or healthier.`,
    whatIsUnclear: (peptide, q) =>
      `It’s often unclear how well general findings translate to older adults because subgroup analyses may be missing, and outcomes can be influenced by baseline frailty, nutrition status, sleep, and mobility limitations.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from medication burden, kidney/liver function differences, hydration status, baseline activity level, and how “improvement” is defined (pain, function, energy, sleep, appetite).`,
  },
  {
    id: "pregnancy",
    label: "Pregnancy",
    synonyms: ["pregnant", "pregnancy", "trying to conceive", "ttc", "breastfeeding", "lactation", "postpartum"],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Pregnancy and lactation contexts are discussed differently because evidence standards, ethical constraints, and safety signals are treated with more caution.`,
    whatIsKnown: (peptide, q) =>
      `What’s known most consistently is that direct human evidence is frequently limited in these populations. Discussion tends to emphasize the difference between mechanistic speculation and population-specific safety data.`,
    whatIsUnclear: (peptide, q) =>
      `It’s often unclear what is truly known versus assumed, because many datasets exclude pregnancy/lactation by design. That creates a gap between general research discourse and pregnancy-specific certainty.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from trimester/postpartum phase, baseline nausea/sleep shifts, iron status, thyroid changes, and normal hormonal dynamics that can dominate subjective experience.`,
  },
  {
    id: "metabolic",
    label: "Metabolic conditions",
    synonyms: ["prediabetes", "diabetes", "insulin resistance", "metabolic syndrome", "pcos", "obesity", "hypertension"],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Metabolic contexts often change baseline appetite, energy, and cardiovascular signals, so discussions frequently hinge on which outcomes are being measured and over what timeframe.`,
    whatIsKnown: (peptide, q) =>
      `What’s discussed most consistently is *endpoint ambiguity*: appetite, weight, glucose markers, and energy can move for many reasons. When "${q}" is present, clarity often comes from distinguishing mechanism talk from measurable outcomes in real-world reports.`,
    whatIsUnclear: (peptide, q) =>
      `It’s often unclear how much of a reported change is due to ${peptide} versus baseline lifestyle shifts, medication changes, or regression-to-the-mean in fluctuating markers. Many studies don’t capture all confounders.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from baseline insulin resistance, sleep, stress, diet composition, training status, and concurrent meds that affect appetite or glucose handling.`,
  },
  {
    id: "pt_ctx_liver_disease",
    label: "Liver disease / reduced liver function",
    synonyms: [
      "liver",
      "liver disease",
      "fatty liver",
      "nafld",
      "nash",
      "cirrhosis",
      "hepatitis",
      "elevated liver enzymes",
      "alt",
      "ast",
      "bilirubin",
      "albumin",
      "child pugh",
      "portal hypertension"
    ],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Liver function can matter because the liver is central to metabolism and clearance for many compounds, which can shift sensitivity and how side effects are interpreted.`,
    whatIsKnown: (peptide, q) =>
      `What’s discussed most consistently is that reduced liver function can change how long effects linger and how “strong” something feels at a given exposure. For many peptides, direct liver-disease subgroup evidence is limited, so discussions often stay cautious and context-heavy.`,
    whatIsUnclear: (peptide, q) =>
      `It’s often unclear how well general findings translate across liver-disease severity because studies may exclude significant liver impairment or fail to report liver-related stratification. Evidence can also be indirect (mechanistic or mixed-population).`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from disease severity, inflammation status, nutrition, alcohol history, medication burden, bile flow issues, and comorbid metabolic conditions that often co-occur with liver disease.`,
  },
          {
    id: "pt_ctx_tendonitis",
    label: "Tendonitis / tendon pain / overuse injuries",
    synonyms: [
      "tendonitis",
      "tendinitis",
      "tendinopathy",
      "tendon pain",
      "tendon soreness",
      "overuse injury",
      "overuse injuries",
      "achilles tendonitis",
      "achilles tendinitis",
      "achilles pain",
      "patellar tendonitis",
      "patellar tendinitis",
      "jumper's knee",
      "tennis elbow",
      "golfer's elbow",
      "lateral epicondylitis",
      "medial epicondylitis",
      "rotator cuff tendinitis",
      "rotator cuff pain",
      "shoulder tendonitis",
      "biceps tendonitis",
      "elbow tendonitis",
      "wrist tendonitis",
      "plantar fasciitis",
      "connective tissue pain",
      "joint pain",
      "inflammation",
      "training load",
      "volume",
      "recovery",
      "rehab"
    ],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Tendon problems are often about load management and slow tissue remodeling, so discussions tend to focus on recovery timelines and variability rather than quick, obvious changes.`,
    whatIsKnown: (peptide, q) =>
      `What’s discussed most consistently is that tendon symptoms can lag behind training changes and can flare with small shifts in volume, intensity, or biomechanics. When "${q}" is present, interpretation often benefits from tracking training load and recovery conditions alongside any compound-related discussion.`,
    whatIsUnclear: (peptide, q) =>
      `It’s often unclear whether a reported improvement reflects true tendon remodeling versus reduced irritation, temporary symptom suppression, or simply a change in training stress. Many reports lack details about rehab work, rest, or activity modification.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from injury location and severity, training history, recent load spikes, sleep and nutrition, body weight, biomechanics, adherence to rehab, and differences in how pain is perceived and reported.`,
  },
  {
    id: "pt_ctx_blood_pressure",
    label: "Blood pressure (high/low) and dizziness",
    synonyms: [
      "blood pressure",
      "bp",
      "high blood pressure",
      "hypertension",
      "elevated blood pressure",
      "low blood pressure",
      "hypotension",
      "orthostatic",
      "orthostatic hypotension",
      "postural hypotension",
      "dizziness",
      "lightheaded",
      "lightheadedness",
      "faint",
      "fainting",
      "syncope",
      "head rush",
      "standing up",
      "palpitations",
      "heart racing",
      "tachycardia",
      "bradycardia",
      "pounding heart",
      "salt",
      "electrolytes",
      "dehydration",
      "hydration",
      "diuretics",
      "beta blocker",
      "ace inhibitor",
      "arb"
    ],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Blood-pressure symptoms can be strongly influenced by hydration, salt balance, stress, and other medications—so discussion often focuses on context and attribution rather than a single cause.`,
    whatIsKnown: (peptide, q) =>
      `What’s discussed most consistently is *signal overlap*: dizziness, fatigue, and “heart racing” sensations can come from blood pressure shifts, dehydration, anxiety, stimulants, or medication effects. When "${q}" is present, interpretation often benefits from separating subjective sensations from measured readings and surrounding circumstances.`,
    whatIsUnclear: (peptide, q) =>
      `It’s often unclear whether a reported symptom reflects a real blood-pressure change versus a transient event (hydration, sleep, caffeine, stress) or unrelated factors. Many anecdotes don’t include measurements, timing, or co-medication context.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from baseline BP, hydration and electrolyte intake, fitness level, heat exposure, posture changes, concurrent meds (including antihypertensives/diuretics), and differences in sensitivity to palpitations or dizziness.`,
  },
  {
    id: "pt_ctx_gi_conditions",
    label: "Gastrointestinal conditions (IBS / IBD / reflux)",
    synonyms: [
      "ibs",
      "irritable bowel",
      "ibd",
      "crohns",
      "ulcerative colitis",
      "reflux",
      "gerd",
      "acid reflux",
      "gastritis",
      "bloating",
      "gut issues",
      "digestive issues",
      "diarrhea",
      "constipation"
    ],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Gastrointestinal conditions can shift baseline appetite, nausea sensitivity, and bowel patterns, which strongly shapes how effects are perceived and reported.`,
    whatIsKnown: (peptide, q) =>
      `What’s discussed most consistently is that GI symptoms are highly sensitive and easily influenced by stress, diet, and expectation. When "${q}" is present, distinguishing baseline variability from new effects becomes especially important.`,
    whatIsUnclear: (peptide, q) =>
      `It’s often unclear how much of a change is directly attributable to ${peptide} versus underlying motility patterns, inflammation cycles, microbiome shifts, or concurrent dietary changes. Many studies don’t deeply stratify by GI diagnosis.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from diagnosis subtype (IBS vs IBD), flare cycles, stress load, fiber intake, hydration, microbiome diversity, medication use, and individual sensitivity to gut sensations.`,
  },
  {
    id: "pt_ctx_sleep_issues",
    label: "Sleep issues (insomnia / poor sleep / sleep apnea)",
    synonyms: [
      "sleep",
      "poor sleep",
      "insomnia",
      "sleep apnea",
      "osa",
      "snoring",
      "fatigue",
      "tired",
      "daytime sleepiness",
      "restless sleep",
      "shift work",
      "jet lag"
    ],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Sleep quality is one of the biggest drivers of how people feel day-to-day, so it can dominate perceived “effects” and make attribution especially tricky.`,
    whatIsKnown: (peptide, q) =>
      `What’s discussed most consistently is that poor sleep amplifies sensitivity—mood, appetite, pain, motivation, and energy can swing widely. When "${q}" is present, changes may reflect improved or worsened sleep more than a direct primary effect of ${peptide}.`,
    whatIsUnclear: (peptide, q) =>
      `It’s often unclear whether reported changes are direct or downstream (e.g., sleep improved → appetite and mood shift). Many studies don’t measure sleep rigorously, and real-world reports rarely control for sleep debt or apnea severity.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from sleep apnea severity, total sleep time, sleep regularity, caffeine/stimulant use, stress load, bedtime routine, alcohol use, and whether sleep disruption is primary or secondary to another condition.`,
  },
  {
    id: "pt_ctx_hrt_trt",
    label: "Hormone therapy (TRT / estrogen / HRT)",
    synonyms: [
      "trt",
      "testosterone replacement",
      "testosterone therapy",
      "low testosterone",
      "low t",
      "hrt",
      "hormone replacement",
      "estrogen therapy",
      "estradiol",
      "progesterone",
      "androgen therapy",
      "menopause",
      "perimenopause"
    ],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Hormone therapy can strongly influence energy, body composition, mood, libido, and recovery—so it often changes baseline expectations and how results are interpreted.`,
    whatIsKnown: (peptide, q) =>
      `What’s discussed most consistently is that hormone status can amplify or dampen perceived effects. When "${q}" is present, changes in energy, appetite, muscle recovery, or mood may reflect overlapping hormonal signaling rather than a single isolated mechanism.`,
    whatIsUnclear: (peptide, q) =>
      `It’s often unclear how much of a reported effect is due to ${peptide} versus underlying hormone levels, dose stability, aromatization, or recent protocol changes. Many datasets don’t stratify by hormone therapy status.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from dose, delivery method (injection vs topical), estradiol balance, SHBG levels, body fat percentage, sleep quality, training intensity, and whether hormone levels are stable or recently adjusted.`,
  },
      {
    id: "pt_ctx_menopause",
    label: "Perimenopause / menopause",
    synonyms: [
      "perimenopause",
      "menopause",
      "hot flashes",
      "night sweats",
      "hormone shifts",
      "estrogen decline",
      "sleep disruption"
    ],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. Menopause transitions can shift sleep, temperature regulation, mood, and body composition signals, which can change how people interpret energy, appetite, and recovery discussions.`,
    whatIsKnown: (peptide, q) =>
      `What’s discussed most consistently is that baseline symptoms can fluctuate substantially during this phase (sleep quality, stress tolerance, appetite, fatigue). When "${q}" is present, it’s common for people to attribute changes to multiple overlapping factors.`,
    whatIsUnclear: (peptide, q) =>
      `It’s often unclear how well general findings translate to perimenopausal or menopausal populations because many studies don’t stratify by menopause status or symptom severity. Direct evidence for certain outcomes can be limited.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from stage (peri vs post), sleep disruption severity, stress load, HRT use, training status, and differences in baseline metabolic health.`,
  },
  {
    id: "pt_ctx_underweight_low_bmi",
    label: "Underweight / low BMI / frailty",
    synonyms: [
      "underweight",
      "low bmi",
      "frailty",
      "low body fat",
      "unintentional weight loss",
      "low appetite",
      "sarcopenia"
    ],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. When someone is underweight or frail, baseline reserves are lower, so appetite, hydration, and tolerance signals may show up sooner and be interpreted differently.`,
    whatIsKnown: (peptide, q) =>
      `What’s discussed most consistently is that low baseline reserves can amplify perceived effects (good or bad). When "${q}" is present, discussions often emphasize whether a change reflects true benefit or just reduced tolerance margin.`,
    whatIsUnclear: (peptide, q) =>
      `It’s often unclear how well general findings translate to frail or underweight populations because many studies enroll healthier or more weight-stable cohorts. Subgroup evidence may be limited.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from nutrition status, protein intake, baseline activity, sleep quality, medication burden, and underlying causes of low weight (illness, GI issues, stress).`,
  },

  {
    id: "pt_ctx_athlete_injury_recovery",
    label: "Athletes: injury recovery, overuse, soreness, and rehab",
    synonyms: [
      "athlete",
      "training",
      "hard training",
      "overuse",
      "overtraining",
      "recovery",
      "rehab",
      "return to sport",
      "return to play",
      "sports injury",
      "injury recovery",
      "soreness",
      "doms",
      "muscle soreness",
      "strain",
      "muscle strain",
      "pull",
      "muscle pull",
      "sprain",
      "tear",
      "ligament tear",
      "tendon tear",
      "meniscus",
      "acl",
      "mcl",
      "ankle sprain",
      "knee pain",
      "back pain",
      "low back pain",
      "shin splints",
      "stress reaction",
      "stress fracture",
      "tendinopathy",
      "tendonitis",
      "tendinitis",
      "shoulder pain",
      "elbow pain",
      "hip pain",
      "plantar fasciitis"
    ],
    contextSummary: (peptide, q) =>
      `People often ask how "${q}" relates to ${peptide}. In athlete and rehab contexts, baseline training stress and tissue healing timelines can dominate how people interpret changes—so “worked” vs “did nothing” often depends on where someone is in the recovery cycle.`,
    whatIsKnown: (peptide, q) =>
      `What’s discussed most consistently is that training load and recovery stage matter a lot. Symptoms like soreness, stiffness, sleep quality, and perceived readiness can shift quickly with volume/intensity changes, so athlete discussions tend to focus on separating normal training fluctuation from any peptide-specific signal.`,
    whatIsUnclear: (peptide, q) =>
      `It’s often unclear whether a reported improvement reflects true tissue healing versus short-term shifts in pain perception, swelling, sleep, or training behavior. Many conversations rely on anecdote, and studies may not match real-world injury types, rehab protocols, or athlete workloads.`,
    whyExperiencesVary: (peptide, q) =>
      `Variability can come from the specific tissue involved (muscle vs tendon vs ligament), injury severity, rehab quality, sleep, nutrition, stress, re-injury risk, and whether training load was reduced or ramped while "${q}" was being discussed.`
  },

  ];

export function getBestContextMatches(query: string, limit = 3): Match[] {
  const qn = norm(query);
  const qt = tokens(query);
  if (!qn) return [];

  const scored = CONTEXT_PACKS.map((p) => scorePack(qn, qt, p))
    .filter((m) => m.score > 0.22) // avoid noisy matches
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, Math.max(1, limit));
}
