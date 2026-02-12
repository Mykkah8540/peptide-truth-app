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
export const CONTEXT_PACKS: ContextPack[



  {
    id: "pt_ctx_younger_people",
    title: "Younger people (teens / young adults)",
    terms: [
      "young",
      "younger",
      "teen",
      "teens",
      "teenager",
      "adolescent",
      "young adult",
      "college age",
      "under 25",
      "under 30",
      "growth plates",
      "still growing"
    ],
    why: "Age and baseline development can change what’s relevant (safety signals, recovery capacity, hormone dynamics, and how outcomes are measured).",
    contextSummary:
      "People often ask how “{query}” relates to {peptide}. This matters because baseline physiology and development stage can shift what gets emphasized in research discussions and how experiences are described.",
    whatIsKnown:
      "What’s discussed most consistently is that age can influence baseline hormone signaling, recovery capacity, and how sensitive someone may be to certain pathways. Evidence about {peptide} specifically in younger populations is often limited, indirect, or extrapolated from broader data.",
    whatIsUnclear:
      "It’s often unclear how well general findings translate to younger people because many studies exclude minors or do not stratify results by age group. Long-term data in younger populations may be sparse.",
    whyExperiencesVary:
      "Variability can come from differences in baseline biology, training load, sleep, nutrition, concurrent medications/supplements, and how outcomes are measured or reported."
  },

  {
    id: "pt_ctx_older_adults",
    title: "Older adults (50+, seniors)",
    terms: [
      "older",
      "older adults",
      "senior",
      "seniors",
      "elderly",
      "aging",
      "age 50",
      "50+",
      "60+",
      "70+",
      "frail",
      "sarcopenia"
    ],
    why: "Aging can change clearance, sensitivity, comorbidity burden, and which tradeoffs matter most (sleep, recovery, appetite, BP, glucose).",
    contextSummary:
      "People often ask how “{query}” relates to {peptide}. This matters because aging physiology and common comorbidities can change what’s relevant in both research discussions and real-world experiences.",
    whatIsKnown:
      "What’s discussed most consistently is that aging can shift baseline inflammation, muscle protein balance, sleep architecture, and cardiometabolic factors. For many compounds, evidence may not be specifically built on older-adult cohorts, so conclusions can be more cautious.",
    whatIsUnclear:
      "It’s often unclear how well general findings translate to older adults when studies skew younger, exclude complex comorbidity, or don’t account for polypharmacy. Direct evidence may be limited for some peptides and outcomes.",
    whyExperiencesVary:
      "Variability can come from differences in baseline health, kidney/liver function, medication burden, hydration, nutrition, and activity level — plus differences in goals and how benefits are perceived."
  },

  {
    id: "pt_ctx_overweight_obesity",
    title: "Overweight / obesity (body fat, weight loss)",
    terms: [
      "overweight",
      "obese",
      "obesity",
      "high body fat",
      "body fat",
      "weight loss",
      "lose weight",
      "fat loss",
      "bmi",
      "metabolic",
      "insulin resistance",
      "prediabetes",
      "blood sugar",
      "glucose",
      "a1c"
    ],
    why: "Body composition and metabolic status can affect inflammation, appetite signaling, glucose dynamics, and how people interpret “results.”",
    contextSummary:
      "People often ask how “{query}” relates to {peptide}. This matters because metabolic baseline (glucose control, inflammation, appetite signaling) can change which mechanisms are emphasized and what outcomes people notice.",
    whatIsKnown:
      "What’s discussed most consistently is mechanistic overlap between metabolic pathways (glucose handling, appetite/satiety, inflammation) and the pathways certain peptides may influence. Evidence strength varies by peptide and context.",
    whatIsUnclear:
      "It’s often unclear how well a peptide’s general findings translate across different metabolic baselines, especially if studies don’t stratify by BMI, insulin resistance, or concurrent lifestyle changes.",
    whyExperiencesVary:
      "Variability can come from baseline metabolic health, diet composition, sleep, activity level, concurrent medications, and differences in expectations (scale weight vs body composition vs performance)."
  },

  {
    id: "pt_ctx_high_blood_pressure",
    title: "High blood pressure (hypertension)",
    terms: [
      "high blood pressure",
      "hypertension",
      "bp",
      "blood pressure",
      "elevated blood pressure",
      "stage 1 hypertension",
      "stage 2 hypertension",
      "ace inhibitor",
      "arb",
      "beta blocker",
      "calcium channel blocker",
      "diuretic"
    ],
    why: "Blood pressure is a high-signal constraint for many people; medications and hydration status can shape both perceived effects and risk sensitivity.",
    contextSummary:
      "People often ask how “{query}” relates to {peptide}. This matters because blood pressure, hydration, and common BP medications can interact with how effects are interpreted and which safety signals are prioritized in discussion.",
    whatIsKnown:
      "What’s discussed most consistently is that cardiovascular context (BP, heart rate, fluid balance) can change which pathways matter most and how people frame outcomes. Evidence about direct BP effects may be limited or peptide-specific.",
    whatIsUnclear:
      "It’s often unclear how well general findings translate to people with hypertension, especially when studies exclude higher-risk cardiovascular populations or don’t control for medication classes and baseline BP.",
    whyExperiencesVary:
      "Variability can come from baseline BP control, medication regimen, sodium/hydration status, stress, sleep, and concurrent stimulants or supplements."
  },

  {
    id: "pt_ctx_kidney_disease_ckd",
    title: "Kidney disease (CKD) / reduced kidney function",
    terms: [
      "kidney",
      "kidney disease",
      "ckd",
      "chronic kidney disease",
      "reduced kidney function",
      "low egfr",
      "egfr",
      "creatinine",
      "dialysis",
      "proteinuria"
    ],
    why: "Clearance and metabolite handling can matter a lot when kidney function is reduced; this can shift tolerance, accumulation risk, and what “safe use” even means in discussion.",
    contextSummary:
      "People often ask how “{query}” relates to {peptide}. This matters because reduced kidney function can change clearance, sensitivity, and how people interpret side effects or benefits discussed in research and anecdotes.",
    whatIsKnown:
      "What’s discussed most consistently is that kidney function can be a key variable for how compounds are handled and tolerated. For many peptides, direct CKD-specific evidence may be limited, so discussions often stay cautious and context-heavy.",
    whatIsUnclear:
      "It’s often unclear how well general findings translate across CKD stages when studies exclude reduced kidney function or don’t report kidney-related stratification. Direct evidence for certain outcomes may be sparse.",
    whyExperiencesVary:
      "Variability can come from CKD stage, hydration status, electrolyte balance, medication burden, protein intake, and comorbid conditions that often travel with kidney disease."
  }
] = [
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
