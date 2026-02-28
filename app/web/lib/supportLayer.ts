// app/web/lib/supportLayer.ts

export type SupportPack = {
  id: string;
  title: string;
  subtitle?: string;
  bullets: string[];
  redFlags?: string[];
};

type EntityLike = {
  slug?: string | null;
  interactions?: { drug_classes?: string[] | null } | null;
  peptide?: {
    slug?: string | null;
    interactions?: { drug_classes?: string[] | null } | null;
  } | null;
};

function uniq(xs: string[]) {
  return Array.from(new Set(xs.filter(Boolean)));
}

function drugClasses(entity: EntityLike): string[] {
  const a = entity?.interactions?.drug_classes ?? [];
  const b = entity?.peptide?.interactions?.drug_classes ?? [];
  return uniq([...(a || []), ...(b || [])].map(String));
}

function isIncretinFamily(entity: EntityLike): boolean {
  const dc = drugClasses(entity);
  if (dc.includes("antidiabetics-insulin-glp1")) return true;

  // fallback by known flagship slugs (start tight; expand later)
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return ["retatrutide", "tirzepatide", "semaglutide", "cagrilintide"].includes(s);
}

function isNadFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return ["nad-plus", "nmn", "nr"].includes(s);
}

function isHealingFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return ["bpc-157", "tb-500"].includes(s);
}

function isGhAxisFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return ["cjc-1295", "cjc-1295-dac", "ipamorelin", "mk-677", "sermorelin", "ghrp-2", "ghrp-6", "hexarelin", "tesamorelin"].includes(s);
}

const SUPPORT_INCRETIN: SupportPack = {
  id: "support_incretin_metabolic_v1",
  title: "Support layer: protecting energy, hydration, and lean mass",
  subtitle:
    "These compounds can make eating feel “automatic.” The support layer keeps that from turning into fatigue, dehydration, or muscle loss.",
  bullets: [
    "Protein anchor: don’t let appetite suppression erase protein by accident",
    "Hydration anchor: constipation + low intake usually means fluids fell off",
    "Fiber + simple foods: GI tolerance improves when meals get boring and predictable",
    "Electrolyte awareness: dizziness, headaches, and “flat” workouts often track to low fluids/salts",
    "Training anchor: keep resistance training consistent to protect strength and lean mass",
    "Recovery realism: when intake is low, adjust volume instead of pretending you’re fully fed",
  ],
  redFlags: [
    "Can’t keep fluids down, persistent vomiting, or signs of dehydration (urgent)",
    "Severe abdominal pain that doesn’t settle (urgent evaluation)",
    "Lightheadedness/fainting or rapid heart rate with low intake",
    "Rapid strength drop or pronounced weakness (often under-fueling)",
  ],
};

const SUPPORT_NAD: SupportPack = {
  id: "support_nad_longevity_v1",
  title: "Support layer: getting honest value from NAD+ supplementation",
  subtitle:
    "NAD+ works subtly and cumulatively \u2014 not acutely. These anchors help you evaluate it honestly and avoid the most common mistakes.",
  bullets: [
    "Cancer therapy check: PARP inhibitors (olaparib, niraparib, rucaparib) are a direct mechanism conflict \u2014 consult your oncologist before starting",
    "Expectation anchor: no immediate signal is normal \u2014 give it 60\u201390 days before deciding if it\u2019s doing anything",
    "Precursor stacking: NMN, NR, and direct NAD+ all hit the same endpoint \u2014 pick one approach, don\u2019t run all three simultaneously",
    "Alcohol actively depletes NAD+ through ethanol metabolism \u2014 regular heavy drinking directly counteracts the goal",
    "IV route: flushing during infusion is expected and manageable by slowing the drip rate \u2014 it\u2019s uncomfortable, not dangerous",
    "Track subjectively: energy levels, cognitive clarity, and sleep quality are the most commonly reported benefit domains",
  ],
  redFlags: [
    "Currently on PARP inhibitor chemotherapy \u2014 stop and consult oncologist before continuing",
    "Active cancer diagnosis of any kind \u2014 requires oncology clearance before starting",
    "Chest pain or significant palpitations during IV infusion (stop infusion, seek evaluation)",
    "Symptoms worsening rather than neutral or improving after 4+ weeks",
  ],
};

const SUPPORT_HEALING: SupportPack = {
  id: "support_healing_recovery_v1",
  title: "Support layer: getting the most out of a recovery-focused peptide",
  subtitle:
    "BPC-157 lives or dies by supply quality and sensible use context. These anchors cover the variables that actually matter.",
  bullets: [
    "Source quality is the highest-leverage variable \u2014 get a third-party certificate of analysis (CoA) before use, not after purchase",
    "Injection technique: sterile prep, proper SC insertion angle, site rotation \u2014 most short-term reactions trace back to technique, not the compound",
    "Set a hypothesis before starting: what specific outcome are you targeting, over what defined timeframe?",
    "Route selection matters: oral route targets GI directly; injectable is for systemic and structural goals \u2014 route choice follows your actual target",
    "NSAIDs as the silent complicator: chronic NSAID use alongside BPC-157 removes the pain-feedback signal that tells you whether the underlying issue is healing",
    "Minimum evaluation window: 6\u20138 weeks for any tissue or GI outcome \u2014 don\u2019t make a call at week 1 or 2",
  ],
  redFlags: [
    "Increasing redness, warmth, swelling, pus, or fever at an injection site after 24 hours (stop injecting there \u2014 seek medical evaluation)",
    "Hives, facial swelling, throat tightness, or difficulty breathing (anaphylaxis \u2014 stop immediately, emergency services if severe)",
    "Pregnant, planning pregnancy, or breastfeeding \u2014 stop immediately, no safety data exists",
    "Product does not have a verifiable third-party CoA \u2014 do not inject it",
  ],
};

const SUPPORT_GH_AXIS: SupportPack = {
  id: "support_gh_axis_v1",
  title: "Support layer: managing a GH-axis compound responsibly",
  subtitle:
    "GH-axis compounds change endocrine physiology systemically. These anchors keep the downstream effects from becoming problems.",
  bullets: [
    "Glucose awareness: GH is counter-regulatory to insulin \u2014 get a baseline fasting glucose before starting and monitor if you have any metabolic history",
    "If using CJC-1295: know your variant \u2014 DAC has a multi-day half-life vs hours without DAC; dosing frequency, accumulation, and side effects differ significantly",
    "Sleep timing: GH pulses are largest during slow-wave sleep \u2014 bedtime injection aligns with this; disrupted sleep undermines the mechanism",
    "Water retention is expected early: mild edema in weeks 1\u20134 is a common GH response \u2014 significant or persistent swelling warrants dose reduction",
    "Cancer history gate: GH/IGF-1 is a mitogenic axis \u2014 active cancer, recent treatment, or high hereditary risk requires oncology clearance before starting",
    "Plan your cycle before you start: long-term continuous GH-axis stimulation is unstudied \u2014 cycling on/off is the community convention for a reason",
  ],
  redFlags: [
    "Fasting glucose noticeably elevated or symptoms of glucose dysregulation (unusual thirst, fatigue, frequent urination) \u2014 stop and check glucose",
    "Active cancer diagnosis or starting cancer treatment \u2014 stop immediately; IGF-1 is a direct growth signal",
    "Significant, persistent edema (hands, feet, face) not resolving after early weeks \u2014 stop and evaluate",
    "Pregnant, planning pregnancy, or breastfeeding \u2014 stop immediately, no safety data exists",
  ],
};

function isMelanocortinFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return ["bremelanotide", "melanotan-ii", "melanotan-i"].includes(s);
}

function isSelankFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "selank";
}

function isSemaxFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "semax";
}

function isThymosinA1Family(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "thymosin-alpha-1";
}

function isGhkCuFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "ghk-cu";
}

function isMetabolicPeptideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return ["aod-9604", "mots-c"].includes(s);
}

function isOxytocinFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "oxytocin";
}

function isIgf1Family(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "igf-1";
}

const SUPPORT_MELANOCORTIN: SupportPack = {
  id: "support_melanocortin_v1",
  title: "Support layer: using a melanocortin compound responsibly",
  subtitle:
    "Nausea management and cardiovascular awareness are the two practical anchors for this compound class.",
  bullets: [
    "Nausea is common on first use: sit down for 30\u201360 min post-dose, avoid alcohol and heavy food beforehand, and have antiemetics available if prescribed",
    "Blood pressure: a transient elevation is a known pharmacological effect \u2014 understand your cardiovascular baseline before starting",
    "Dose titration matters: start low and wait for the full effect window before increasing \u2014 most adverse effects track to overuse, not the compound itself",
    "Skin monitoring: any compound affecting melanocortin receptors that also impacts pigmentation requires a baseline skin/mole check and monitoring for changes",
    "Source quality: research-grade melanocortin compounds lack pharmaceutical quality control \u2014 get a third-party CoA before use",
    "Timing: understand onset/duration for your specific compound and plan use accordingly; impulsive re-dosing is where most adverse events occur",
  ],
  redFlags: [
    "Significant or persistent BP elevation, chest pain, or palpitations \u2014 stop and evaluate cardiovascular status",
    "Spontaneous, unwanted, or prolonged erection (priapism >4 hours for Melanotan II) \u2014 emergency evaluation required",
    "New, rapidly darkening, or changing moles or lesions after starting \u2014 dermatology evaluation before continuing",
    "Previous melanoma diagnosis \u2014 stop immediately; this is a hard contraindication",
    "Severe vomiting preventing fluid intake \u2014 hydration and medical evaluation",
  ],
};

const SUPPORT_SELANK: SupportPack = {
  id: "support_selank_v1",
  title: "Support layer: anxiolytic CNS peptide use",
  subtitle:
    "Selank\u2019s clean profile in isolation can mask real risk when CNS-active medications are in the picture.",
  bullets: [
    "CNS medication screen first: benzodiazepines, opioids, alcohol, and Z-drugs all add to Selank\u2019s CNS inhibitory mechanism \u2014 this is the most important pre-use check",
    "Intranasal technique: proper insertion angle, correct volume, and avoiding immediate horizontal position after dosing ensure consistent delivery",
    "Expectation calibration: the anxiolytic effect is subtle, not sedating, and cumulative over days of use \u2014 not an immediate dramatic shift",
    "Dosing protocol: twice-daily is the most common clinical reference protocol; pick one approach and observe for 1\u20132 weeks before adjusting",
    "Concurrent CNS compounds: if combining with Semax or other stimulatory compounds, monitor the combined CNS load; the combination is common but the overall effect profile changes",
    "Source quality: intranasal peptide formulations vary in stability \u2014 refrigerate properly and observe the manufacturer\u2019s stability window",
  ],
  redFlags: [
    "Unexpected sedation or coordination impairment \u2014 most likely a CNS drug interaction; review your full medication list",
    "On benzodiazepines or opioid medications \u2014 do not add Selank without physician guidance",
    "Worsening anxiety or paradoxical agitation \u2014 discontinue and reassess",
    "Any psychiatric deterioration \u2014 stop immediately and discuss with prescribing psychiatrist",
  ],
};

const SUPPORT_SEMAX: SupportPack = {
  id: "support_semax_v1",
  title: "Support layer: stimulatory cognitive peptide use",
  subtitle:
    "Semax\u2019s stimulatory profile means timing, dose titration, and psychiatric context matter more than for most peptides.",
  bullets: [
    "Morning timing only: Semax activates BDNF, dopaminergic, and serotonergic pathways \u2014 evening use disrupts sleep for most people",
    "Start low: 200\u2013300\u03bcg intranasal is a reasonable starting point; stimulatory effects are dose-dependent and can become dysphoric at high doses",
    "Anxiety monitoring: Semax can amplify baseline anxiety \u2014 if you have an anxiety-prone baseline, Selank co-use is the standard community buffer strategy",
    "Psychiatric medication screen: MAOIs, antipsychotics, and stimulant medications have real mechanistic intersections with Semax \u2014 check your drug list before starting",
    "Cycle your use: effects tend to fade with continuous daily use; cycling (e.g., 5 on / 2 off) is the common community protocol to maintain responsiveness",
    "Expectation calibration: cognitive enhancement effects are anecdotally reported; the Russian clinical evidence base has significant methodological limitations and limited independent replication",
  ],
  redFlags: [
    "Significant anxiety worsening, panic episodes, or agitation \u2014 discontinue or reduce dose; adding Selank may buffer",
    "On MAOIs or antipsychotics without physician guidance \u2014 stop and consult first",
    "Sleep disruption persisting after shifting to morning dosing \u2014 reduce dose or discontinue",
    "Any psychiatric deterioration \u2014 stop immediately and discuss with prescribing psychiatrist",
  ],
};

const SUPPORT_THYMOSIN_A1: SupportPack = {
  id: "support_thymosin_a1_v1",
  title: "Support layer: immune-modulating peptide use",
  subtitle:
    "Thymosin Alpha-1\u2019s value depends on your immune context \u2014 clarify that context before starting.",
  bullets: [
    "Autoimmune and immunosuppressive gate: check this first \u2014 Thymosin Alpha-1 activates immune pathways that directly conflict with immunosuppressive medications and autoimmune disease management",
    "Injection technique: SC injection with sterile prep, correct angle, site rotation \u2014 standard injectable peptide protocol",
    "Source quality: pharmaceutical-grade Thymosin Alpha-1 (Zadaxin) has established manufacturing standards \u2014 research-grade versions require third-party CoA verification before injection",
    "Expectation calibration: immunological effects are real in hepatitis B/C and oncology adjunct contexts; \u2018immune support\u2019 in healthy adults is a different and less-characterized claim",
    "Active infection timing: don\u2019t start during acute illness \u2014 let the immune system resolve active infection before adding immune modulation",
    "Evaluation window: immunological effects are cumulative; a minimum 8-week protocol before assessing response is a reasonable reference point",
  ],
  redFlags: [
    "Autoimmune disease flare during use \u2014 stop and consult rheumatologist",
    "On immunosuppressive medications without physician guidance for this combination \u2014 stop and consult",
    "Organ transplant recipient \u2014 stop immediately; immune activation conflicts with transplant management",
    "Injection site infection signs (increasing redness, warmth, pus, fever after 24h) \u2014 stop injecting there and seek medical evaluation",
  ],
};

const SUPPORT_GHK_CU: SupportPack = {
  id: "support_ghk_cu_v1",
  title: "Support layer: topical copper peptide use",
  subtitle:
    "GHK-Cu is primarily a topical compound \u2014 application technique and product quality are the main practical anchors.",
  bullets: [
    "Patch test first: apply a small amount to the inner arm for 24 hours before face or body application \u2014 check for copper sensitivity or product-specific irritation",
    "Application technique: apply to clean, dry skin; a thin layer is sufficient \u2014 excess product does not improve outcomes",
    "Layering strategy: avoid applying simultaneously with strong acids (glycolic, lactic >10%) or prescription retinoids \u2014 30 min separation or AM/PM split timing is the practical approach",
    "Expectation calibration: skin appearance evidence is modest and real, primarily via collagen pathway effects \u2014 evaluate at 8\u201312 weeks, not days",
    "Wilson\u2019s disease: if you have a copper metabolism disorder, topical copper peptide use is not appropriate",
    "Injectable route: the topical route has meaningfully more evidence than injectable GHK-Cu; if pursuing injectable, the evidence gap is larger and source quality becomes critical",
  ],
  redFlags: [
    "Skin rash, significant irritation, or allergic reaction \u2014 discontinue use",
    "Known copper allergy or Wilson\u2019s disease \u2014 do not use",
    "Broken skin, active eczema, or open wounds \u2014 do not apply topical preparations",
    "Injectable route: injection site infection signs (increasing redness, warmth, pus after 24h) \u2014 stop and seek evaluation",
  ],
};

const SUPPORT_METABOLIC_PEPTIDE: SupportPack = {
  id: "support_metabolic_peptide_v1",
  title: "Support layer: metabolic peptide use",
  subtitle:
    "Blood sugar monitoring and expectation calibration are the primary anchors for this compound class.",
  bullets: [
    "Blood sugar monitoring: if you\u2019re on diabetes medications, AOD-9604 and MOTS-c both interact with glucose metabolism pathways \u2014 get a baseline fasting glucose and monitor if you have any metabolic history",
    "Expectation calibration: neither compound has demonstrated clinically significant fat loss in human trials at community-available doses \u2014 set expectations based on mechanism plausibility, not dramatic outcomes",
    "Injection technique (if injectable): sterile prep, correct SC insertion, site rotation \u2014 standard injectable peptide protocol",
    "Protocol length: 12 weeks is the reference period from AOD-9604 Phase II data; MOTS-c has no human reference \u2014 don\u2019t commit to indefinite use without an evaluation plan",
    "Stack attribution: these compounds may interact with other metabolic interventions (dietary changes, exercise, GLP-1 drugs) in ways that make individual attribution difficult",
    "Source quality: research-grade metabolic peptides vary significantly in purity \u2014 third-party CoA is essential before injection",
  ],
  redFlags: [
    "On insulin or sulfonylureas without a glucose monitoring plan \u2014 establish monitoring before adding a metabolic peptide",
    "Hypoglycemia symptoms (shakiness, sweating, confusion, rapid heart rate) \u2014 fast-acting carbohydrates, check glucose, reassess protocol",
    "Fasting glucose rising noticeably or glucose dysregulation symptoms developing \u2014 stop and check glucose",
    "Injection site infection signs (increasing redness, warmth, pus after 24h) \u2014 stop injecting there and seek evaluation",
  ],
};

const SUPPORT_OXYTOCIN: SupportPack = {
  id: "support_oxytocin_v1",
  title: "Support layer: intranasal oxytocin use",
  subtitle:
    "Pregnancy exclusion is the non-negotiable first step \u2014 the rest follows from that.",
  bullets: [
    "Pregnancy gate: if there is any possibility of pregnancy, stop immediately \u2014 oxytocin causes uterine contractions; this is the mechanism of the FDA-approved drug, not a theoretical concern",
    "Intranasal technique: blow nose first, upright position, correct sniff technique, avoid immediately lying down after \u2014 inconsistent delivery creates inconsistent results",
    "Seizure history screen: hyponatremia is a documented seizure trigger and oxytocin has antidiuretic-like activity \u2014 epilepsy or seizure history requires explicit clinical review before use",
    "Expectation calibration: large pre-registered replication studies have NOT consistently shown the prosocial effects from early small studies \u2014 the \u2018love hormone\u2019 effect in healthy adults is genuinely uncertain",
    "Hyponatremia awareness: with high or repeated doses, watch for early signs \u2014 unusual headache, nausea, unusual fatigue, confusion",
    "Social context: proposed prosocial effects are context-dependent; oxytocin is not a standalone social effect compound",
  ],
  redFlags: [
    "Pregnant or any possibility of current pregnancy \u2014 stop immediately; absolute contraindication",
    "Trying to conceive \u2014 stop; the uterotonic risk extends to the periconceptional period",
    "Unusual headache + nausea + confusion (possible hyponatremia) \u2014 stop, drink moderate fluids, seek evaluation if symptoms persist",
    "Seizure activity \u2014 stop and seek emergency evaluation",
    "Seizure disorder history and using oxytocin without neurological clearance \u2014 stop and consult neurologist",
  ],
};

const SUPPORT_IGF1: SupportPack = {
  id: "support_igf1_v1",
  title: "Support layer: managing IGF-1's acute risks before and during use",
  subtitle:
    "Hypoglycemia is the immediate life-safety concern. These anchors address the things that actually prevent hospitalizations.",
  bullets: [
    "Eat before every injection — carbohydrate-containing meal 20-30 minutes before each dose; injecting fasted is the single most preventable risk amplifier",
    "Fast-acting glucose on hand — gel, tablets, or juice within reach during the injection window and 2-3 hours after",
    "Know hypoglycemia symptoms — shakiness, sweating, rapid heart rate, confusion, impaired coordination; treat immediately with fast-acting carbs, not 'in a few minutes'",
    "Baseline glucose labs before starting — fasting glucose and HbA1c characterize your baseline; abnormal results are a stop signal",
    "Cancer screening before starting — age-appropriate baseline: PSA (men), breast screening (women), colorectal by age; cancer history is an absolute hard stop",
    "Source quality is safety-critical — IGF-1 concentration accuracy directly determines hypoglycemia severity; get a third-party CoA; a 2x concentration error doubles the hypoglycemic dose",
    "Solo use caution — first injection should be observed, not done alone; IGF-1's longer half-life means hypoglycemia can persist longer than expected",
  ],
  redFlags: [
    "Confusion, loss of coordination, or loss of consciousness — emergency services immediately; do not wait for symptoms to resolve on their own",
    "Severe hypoglycemia symptoms not responding to fast-acting glucose within 15 minutes — emergency services",
    "Any cancer history — stop immediately and permanently; no circumstances override this",
    "Diabetes or significant insulin resistance — do not use IGF-1; the hypoglycemia risk is pharmacological, not a preference",
    "Cardiac symptoms (palpitations, chest pain, shortness of breath) — stop and seek cardiac evaluation",
    "Product without verifiable third-party CoA — do not inject; concentration errors are direct hypoglycemia risk",
  ],
};

export function getSupportPack(entity: EntityLike): SupportPack | null {
  if (isIncretinFamily(entity)) return SUPPORT_INCRETIN;
  if (isNadFamily(entity)) return SUPPORT_NAD;
  if (isHealingFamily(entity)) return SUPPORT_HEALING;
  if (isGhAxisFamily(entity)) return SUPPORT_GH_AXIS;
  if (isMelanocortinFamily(entity)) return SUPPORT_MELANOCORTIN;
  if (isSelankFamily(entity)) return SUPPORT_SELANK;
  if (isSemaxFamily(entity)) return SUPPORT_SEMAX;
  if (isThymosinA1Family(entity)) return SUPPORT_THYMOSIN_A1;
  if (isGhkCuFamily(entity)) return SUPPORT_GHK_CU;
  if (isMetabolicPeptideFamily(entity)) return SUPPORT_METABOLIC_PEPTIDE;
  if (isOxytocinFamily(entity)) return SUPPORT_OXYTOCIN;
  if (isIgf1Family(entity)) return SUPPORT_IGF1;
  return null;
}
