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

function isEpitalonFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "epitalon";
}

function isGlutathioneFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "glutathione";
}

function isLl37Family(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "ll-37";
}

function isCagrilintideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "cagrilintide";
}

function isThymosinBeta4Family(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return ["thymosin-beta-4", "tb-500"].includes(s);
}

function isFiveAmino1MQFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "5-amino-1mq";
}

function isKisspeptinFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "kisspeptin";
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

const SUPPORT_EPITALON: SupportPack = {
  id: "support_epitalon_longevity_v1",
  title: "Support layer: using a longevity peptide with realistic expectations",
  subtitle:
    "Cancer screening and source quality are the two gates that actually matter before starting epitalon.",
  bullets: [
    "Cancer history screen first — the telomerase activation mechanism is a real cancer promotion concern; any personal cancer history is a hard stop",
    "Source quality: no pharmaceutical-grade epitalon exists commercially; third-party CoA for purity, sterility, and identity is the minimum before injection",
    "Expectation calibration: the longevity claims are years-scale, not weeks — sleep quality improvement is the only near-term effect most people can assess",
    "Cycle rather than continuous use: the Russian trial protocols used discrete courses (typically 10-day), not continuous daily administration; this convention reflects appropriate caution",
    "Cancer screening baseline: age-appropriate screening (PSA, breast, colorectal by age) before starting is reasonable given the telomerase mechanism",
    "Sleep monitoring: if epitalon is producing any effect you can assess short-term, it is most likely through the pineal/melatonin pathway — deeper sleep and vivid dreams are the most reported signal",
  ],
  redFlags: [
    "Any personal cancer history — do not use epitalon; the telomerase mechanism applies broadly",
    "New, changing, or rapidly darkening moles or tissue changes during use — stop and seek dermatology/oncology evaluation",
    "Pregnant, breastfeeding, or adolescent — stop immediately; developmental implications of telomerase activation are unknown",
    "Product without verifiable third-party CoA — do not inject; no pharmaceutical-grade standard exists",
  ],
};

const SUPPORT_GLUTATHIONE: SupportPack = {
  id: "support_glutathione_antioxidant_v1",
  title: "Support layer: getting honest value from glutathione supplementation",
  subtitle:
    "Route determines everything — match your expectations to the delivery method you're actually using.",
  bullets: [
    "Route determines bioavailability: standard oral glutathione has poor bioavailability; liposomal is meaningfully better; IV delivers real systemic levels — know which you're using and calibrate expectations accordingly",
    "NAC comparison: N-acetylcysteine has substantially better oral bioavailability than standard glutathione and works via the cell's own synthetic machinery — consider whether NAC achieves your goal more effectively",
    "Asthma screen: inhaled/nebulized glutathione is contraindicated in asthma and reactive airway disease; bronchospasm is a documented adverse effect",
    "Cancer treatment: do not use glutathione during active chemotherapy or radiation without oncologist guidance — the antioxidant/pro-oxidant interaction is treatment-regimen specific",
    "Skin brightening expectation: the melanin inhibition mechanism is real in vitro; consistent, significant skin tone change from any route of supplementation is not reliably achieved in clinical studies",
    "Evaluation window: oral supplementation requires 8-12 weeks minimum before assessing any effect; short-term assessment is not meaningful",
  ],
  redFlags: [
    "Asthma or reactive airway disease using inhaled/nebulized glutathione — stop; bronchospasm is a documented risk",
    "Active cancer treatment — discuss all glutathione use with your oncologist; the antioxidant/chemotherapy interaction depends on your specific regimen",
    "Severe allergic reaction (urticaria, facial swelling, difficulty breathing) — stop and seek emergency evaluation",
    "Chest tightness or difficulty breathing during IV infusion — stop infusion immediately",
  ],
};

const SUPPORT_LL37: SupportPack = {
  id: "support_ll37_antimicrobial_v1",
  title: "Support layer: using an immune-active antimicrobial peptide responsibly",
  subtitle:
    "Autoimmune screen first — this is a mechanism-based contraindication, not a general precaution.",
  bullets: [
    "Autoimmune disease screen — the most important step: psoriasis, SLE, RA, Hashimoto's, IBD, and similar conditions are contraindications; LL-37 is mechanistically pathogenic in these conditions, not a general immune concern",
    "Cancer history screen: any personal cancer history requires explicit oncology consultation; LL-37 promotes growth in some cancer types via FPRL1 signaling",
    "Source quality is critical: LL-37 synthesis is technically challenging; impure preparations cause more significant injection site reactions; third-party CoA is the minimum",
    "Immunosuppressive medication screen: LL-37's immune activation mechanism directly conflicts with pharmacological immunosuppression — transplant recipients and autoimmune patients on immunosuppressants should not use LL-37",
    "Injection site preparation: LL-37 can cause more significant local reactions than many peptides due to its membrane-disrupting mechanism — proper dilution, sterile technique, and site rotation matter more here",
    "Expectation calibration: there are essentially no human RCTs for the community use cases (infection resistance, immune optimization); the evidence base is animal models and in vitro data",
  ],
  redFlags: [
    "Any autoimmune diagnosis (psoriasis, SLE, RA, Hashimoto's, IBD) — stop immediately; LL-37 is mechanistically pathogenic in these conditions",
    "On immunosuppressive medications — stop and consult your prescribing physician",
    "Severe injection site reaction (significant necrosis, worsening, signs of infection) — stop and seek medical evaluation",
    "Fever or severe systemic inflammatory symptoms following injection — stop and seek medical evaluation",
    "Cancer history — stop and consult oncology before proceeding",
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

const SUPPORT_CAGRILINTIDE: SupportPack = {
  id: "cagrilintide",
  title: "The CagriSema combination is where the evidence lives — not the monotherapy",
  subtitle: "Amylin analog for weight management — key screens before starting",
  bullets: [
    "Thyroid screen: MTC or MEN2 history is a class contraindication — stop signal, not a dose question",
    "On insulin or sulfonylureas: hypoglycemia risk from additive glucose-lowering requires physician adjustment before adding cagrilintide",
    "If already on semaglutide: adding cagrilintide amplifies gastric slowing — titrate slowly; the CagriSema combination has more GI side effects than either alone",
    "Titrate dose: starting at full dose without titration substantially worsens GI tolerability — slow escalation is not optional",
    "Source quality: no pharmaceutical-grade cagrilintide exists outside trials; third-party CoA is the minimum quality gate",
    "Lean mass: appetite suppression from amylin + GLP-1 combined requires intentional protein targeting and resistance training",
  ],
  redFlags: [
    "Severe or persistent abdominal pain radiating to the back — emergency pancreatitis evaluation",
    "MTC or MEN2 history — class contraindication; do not proceed",
    "Neck mass, difficulty swallowing, hoarseness — stop and seek thyroid evaluation",
    "Pregnancy — stop immediately; metabolic effects incompatible with pregnancy",
  ],
};

const SUPPORT_THYMOSIN_BETA4: SupportPack = {
  id: "thymosin-beta-4",
  title: "Cancer history is the hard stop — angiogenesis applies to both TB4 and TB-500",
  subtitle: "Injury repair peptide — key screens before use",
  bullets: [
    "Cancer screen: TB4 promotes angiogenesis via ILK and endothelial signaling — the same mechanism that tumor vasculature exploits; any cancer history is a hard stop for both full TB4 and TB-500",
    "TB4 vs TB-500: you are most likely using TB-500 (the synthetic Ac-SDKP fragment); the research is on TB4 (full protein); the translation is mechanistically sound but not clinically validated",
    "NSAIDs during injury recovery: minimize NSAID use in the acute repair phase — some inflammation is necessary for repair, and NSAIDs partially counteract TB4's repair signaling",
    "Source quality: full TB4 protein requires cold chain integrity; verify CoA with HPLC purity and mass spec identity — peptide degradation is higher for larger proteins",
    "Structural injury evaluation: TB4/TB-500 do not substitute for imaging or clinical assessment of serious injury; get the injury evaluated, not just treated",
    "Cancer surveillance obligation: ongoing use creates an obligation to monitor for new tissue masses or growths — angiogenesis promotion is a recurring concern, not a one-time screen",
  ],
  redFlags: [
    "Any cancer history — angiogenesis mechanism applies; hard stop for both TB4 and TB-500",
    "Pregnancy — developmental angiogenesis implications unknown; stop immediately",
    "New unexplained tissue mass or lymph node enlargement during use — stop and seek evaluation",
    "Progressive injection site reactions (worsening over multiple doses) — potential immune response to protein; stop and evaluate",
  ],
};

const SUPPORT_FIVE_AMINO_1MQ: SupportPack = {
  id: "5-amino-1mq",
  title: "No human safety data — you are operating without a safety floor",
  subtitle: "NNMT inhibitor (research chemical) — key screens before use",
  bullets: [
    "Evidence ceiling: no published human clinical trials exist; the evidence base is mouse studies and community anecdote — calibrate expectations accordingly",
    "Liver baseline: NNMT is highly expressed in liver; get ALT, AST, bilirubin baseline before starting and monitor during sustained use",
    "No SAMe stacking: 5-Amino-1MQ raises SAM by blocking NNMT; combining with SAMe supplements or high methionine loads creates additive methylation effects that are not characterized",
    "No NMN/NR stacking at high doses: both raise NAD+ via different mechanisms; the combined effect on NAD+ and methylation metabolism is not characterized",
    "Active cancer: stop — NNMT's complex role in cancer cell metabolism makes any NNMT inhibitor inappropriate during cancer treatment without oncology guidance",
    "Source quality: this is a research chemical with less supply chain maturity than most peptides; verify identity with LC-MS or NMR, not HPLC alone",
    "Cycling: community convention is to cycle rather than use continuously; appropriate given the unknown long-term methylation effects",
  ],
  redFlags: [
    "Active cancer or cancer treatment — NNMT's role in cancer cell biology is unexplored; avoid",
    "Jaundice, dark urine, or right upper quadrant pain — stop immediately; seek hepatic evaluation",
    "Active liver disease — NNMT's hepatic expression makes liver disease a stop signal",
    "Pregnancy — NAD+ and methylation pathway perturbations in pregnancy are not characterized",
  ],
};

const SUPPORT_KISSPEPTIN: SupportPack = {
  id: "kisspeptin",
  title: "Pulsatile dosing is the mechanism — continuous use suppresses rather than stimulates",
  subtitle: "HPG axis stimulant — key screens and constraints before use",
  bullets: [
    "Pulsatile requirement: kisspeptin drives GnRH pulses; continuous or daily high-frequency dosing desensitizes GPR54, suppressing the axis — this is the same mechanism GnRH agonists use for medical castration; ensure adequate pulse spacing",
    "ER-positive cancer, endometriosis, uterine fibroids: kisspeptin drives estrogen production — hard stop for estrogen-sensitive conditions",
    "PCOS: LH hypersecreting condition; additional LH stimulation from kisspeptin may worsen LH/FSH dysregulation — discuss with reproductive endocrinologist",
    "Active TRT: kisspeptin is mechanistically conflicted with concurrent TRT — post-TRT use (after stopping) is rational; concurrent use is not; monitor LH and testosterone",
    "GnRH agonists/antagonists: direct downstream conflict — kisspeptin cannot override receptor-level suppression from leuprolide or antagonism from degarelix",
    "Product form: specify KP-10 or KP-54; unspecified 'kisspeptin' products may contain inactive degraded forms; require mass spec identity confirmation",
    "Monitor hormones: measure LH and testosterone at baseline and during use — a declining testosterone during kisspeptin use indicates axis suppression, not stimulation; stop if this occurs",
  ],
  redFlags: [
    "ER-positive cancer, endometriosis, or uterine fibroids — estrogen-driven conditions; kisspeptin drives estrogen",
    "PCOS — LH hypersecretion condition; do not add further LH stimulation without specialist guidance",
    "Falling testosterone during use — axis suppression from desensitization; stop immediately",
    "Active TRT + expecting axis optimization — mechanistically conflicted; axis recovery requires stopping TRT first",
  ],
};

function isGonadorelinFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "gonadorelin";
}

function isFollistatin344Family(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "follistatin-344";
}

function isHumaninFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "humanin";
}

function isDsipFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "dsip";
}

const SUPPORT_GONADORELIN: SupportPack = {
  id: "gonadorelin",
  title: "Pulsatile stimulation — the same receptor, misused, causes the opposite effect",
  subtitle: "Synthetic GnRH — HPG axis mechanics and TRT context",
  bullets: [
    "Pulsatile requirement: gonadorelin works by mimicking the natural GnRH pulse — twice-daily subcutaneous injection approximates this; increasing frequency beyond this risks receptor desensitization and axis suppression",
    "GnRH agonists are a hard stop: leuprolide, triptorelin, nafarelin on the same receptor continuously — adding gonadorelin while on these is mechanistically futile and potentially harmful",
    "TRT context monitoring: exogenous testosterone suppresses the axis; monitor LH 30–60 min post-injection to confirm pituitary is still responding — blunted LH response indicates TRT suppression is overcoming gonadorelin stimulation",
    "Post-TRT axis recovery: combine with SERMs (clomiphene, enclomiphene) for dual-mechanism recovery — gonadorelin acts at pituitary level, SERMs remove negative feedback at hypothalamus; monitor LH and testosterone together",
    "Source: gonadorelin is available through compounding pharmacies in the US (prescription required); verify CoA for purity and sterility",
    "Expect modest testicular volume preservation, not TRT-equivalent testosterone — gonadorelin supports the axis, it does not replace TRT levels",
  ],
  redFlags: [
    "Currently on GnRH agonist (leuprolide, triptorelin, nafarelin) — hard stop; mechanistic conflict at receptor level",
    "Falling testosterone while on gonadorelin — potential receptor desensitization; reduce dosing frequency, reassess protocol",
    "Prostate cancer history — gonadorelin stimulates testosterone production; hard stop without oncology guidance",
    "Signs of OHSS in female users (abdominal pain, bloating, nausea) — stop and seek evaluation",
  ],
};

const SUPPORT_FOLLISTATIN_344: SupportPack = {
  id: "follistatin-344",
  title: "Activin suppression is a real cancer concern — not a theoretical one",
  subtitle: "Myostatin/activin antagonist — high-stakes screens before use",
  bullets: [
    "Cancer screen first — hard stop: activin has tumor-suppressive roles in endometrial, ovarian, prostate, and colorectal cancer; follistatin overexpression is found in these cancers; any cancer history is a hard stop",
    "Recent cancer screening required: even without cancer history, activin suppression is not appropriate without a recent baseline screening (age-appropriate: PSA, breast/gyn, colorectal)",
    "Product quality is higher concern than most compounds: follistatin-344 is a 344 AA glycoprotein requiring mammalian cell expression; most research peptide suppliers cannot produce correctly folded product — verify identity with HPLC + mass spec",
    "FSH suppression is expected: activin drives FSH; follistatin suppresses activin; FSH suppression impairs spermatogenesis (males) and follicular development (females) — fertility impact is predictable",
    "The animal data is real; the peptide injection pharmacokinetics in humans are not: dramatic transgenic/gene therapy results do not establish that subcutaneous injection achieves systemic myostatin blockade",
    "Fertility timeline: anyone planning conception in the next 6 months should not use follistatin-344 given expected FSH suppression",
  ],
  redFlags: [
    "Any cancer history — activin suppression removes tumor-suppressive signaling; hard stop",
    "ER-positive breast cancer or estrogen-sensitive conditions — stop immediately",
    "Fertility treatment or planned conception — FSH suppression from activin blockade directly conflicts with fertility goals",
    "Anti-ActRIIB or TGF-β pathway cancer drugs — do not combine",
  ],
};

const SUPPORT_HUMANIN: SupportPack = {
  id: "humanin",
  title: "More mechanistically coherent than most — but no human RCTs to validate it",
  subtitle: "Mitokine peptide — longevity/neuroprotection context",
  bullets: [
    "JAK inhibitor screen first: humanin activates JAK2/STAT3; if you are on ruxolitinib, tofacitinib, baricitinib, or other JAK inhibitors, humanin is mechanistically opposed to your treatment",
    "Cancer flag for STAT3-dependent cancers: JAK2/STAT3 activation is a pro-survival signal in certain cancer types; active cancer treatment requires oncology guidance before adding any JAK2/STAT3-activating compound",
    "Native humanin vs HNG: most preclinical efficacy data uses HNG (Gly14-humanin, ~1000× more potent); confirm what your product actually contains — dose calibration differs substantially",
    "Metabolic monitoring if combining with insulin or metformin: humanin has insulin-sensitizing effects in rodent models; additive glucose-lowering is a possible interaction to monitor",
    "Source quality: humanin is a 21 AA peptide amenable to standard synthesis — quality concerns are lower than for follistatin, but verify CoA for purity and identity",
    "Expectation calibration: the centenarian association is the most compelling human data point; there are no human RCTs; this is early-investigational by any evidence standard",
  ],
  redFlags: [
    "On JAK inhibitors — humanin activates the pathway being suppressed; mechanistic conflict; discuss with physician",
    "Active cancer with STAT3-dependent biology — stop and consult oncology",
    "On insulin without glucose monitoring plan — additive insulin sensitization could cause hypoglycemia",
    "Severe injection site reaction or systemic symptoms post-injection — stop and evaluate",
  ],
};

const SUPPORT_DSIP: SupportPack = {
  id: "dsip",
  title: "Old evidence, mixed results — the stress-modulation story is more credible than the sleep-induction name",
  subtitle: "Sleep/stress neuropeptide — key context and safety checks",
  bullets: [
    "Opioid medication screen first: DSIP has proposed opioid receptor interactions and demonstrated efficacy in opioid withdrawal — concurrent opioid use creates uncharacterized receptor overlap; discuss with prescribing physician",
    "CNS depressant check: benzodiazepines, z-drugs, and alcohol all have additive CNS depression potential with DSIP's sleep-modulating effects; don't combine on first use nights",
    "HPA axis medications: DSIP modulates ACTH and cortisol; corticosteroids, adrenal insufficiency treatment, and Cushing's management all interact with HPA axis — physician guidance required",
    "Expectation calibration: the 'delta sleep-inducing' name overpromises; the human sleep induction studies are mixed; the HPA axis normalization and stress modulation data is more consistent — orient expectations accordingly",
    "No modern human RCTs exist: the evidence base is 1980s-90s European sleep medicine studies; community use is based on extrapolation from dated literature",
    "BBB penetration uncertain: the original studies used IV administration; whether subcutaneous injection achieves CNS concentrations for sleep architecture effects is not established",
  ],
  redFlags: [
    "On opioid medications — uncharacterized receptor interaction; discuss with prescribing physician before combining",
    "On benzodiazepines + DSIP: potential additive sedation — do not combine without clinical guidance",
    "Opioid use disorder in active treatment — any investigational compound use should be disclosed to addiction medicine provider",
    "Worsening sleep or paradoxical stimulation — stop use; DSIP's response is highly variable in community reports",
  ],
};

function isBradykininFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "bradykinin";
}

function isBrainNatriureticPeptideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "brain-natriuretic-peptide";
}

function isCarbetocinFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "carbetocin";
}

function isCgrpFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "cgrp";
}

const SUPPORT_BRADYKININ: SupportPack = {
  id: "bradykinin",
  title: "Bradykinin is a vasodilatory signaling peptide \u2014 not a therapeutic agent; relevant mainly for ACE inhibitor angioedema education",
  subtitle: "Kallikrein-kinin system; ACE inhibitor angioedema mechanism; icatibant for HAE; no community use",
  bullets: [
    "Bradykinin is generated endogenously from kininogens by kallikrein \u2014 it causes vasodilation, pain sensitization, and increased vascular permeability via B1/B2 receptors",
    "ACE inhibitor angioedema: ACE normally degrades bradykinin; ACE inhibitors block this degradation \u2014 bradykinin accumulates and can cause life-threatening angioedema (tongue, airway)",
    "Icatibant (Firazyr) is a B2 receptor antagonist FDA-approved for hereditary angioedema (HAE) attacks \u2014 it blocks the bradykinin-mediated swelling",
    "Lanadelumab (Takhzyro) prevents HAE by inhibiting plasma kallikrein, reducing bradykinin generation at the source",
    "No exogenous bradykinin injection use case \u2014 it would cause systemic vasodilation, hypotension, and severe pain; it is a research/pharmacology reference compound",
    "Key takeaway: if you take ACE inhibitors and experience facial/tongue swelling, this is bradykinin-mediated angioedema \u2014 a medical emergency requiring immediate care",
  ],
};

const SUPPORT_BRAIN_NATRIURETIC_PEPTIDE: SupportPack = {
  id: "brain-natriuretic-peptide",
  title: "BNP is the gold-standard heart failure biomarker \u2014 nesiritide (recombinant BNP) is a declining-use IV drug",
  subtitle: "Cardiac biomarker for HF diagnosis/monitoring; nesiritide for acute decompensated HF; no community use",
  bullets: [
    "BNP and NT-proBNP are secreted by ventricular myocytes under volume/pressure overload \u2014 the most clinically important heart failure biomarkers for diagnosis, prognosis, and treatment monitoring",
    "Nesiritide (Natrecor) is recombinant human BNP \u2014 FDA-approved for acute decompensated heart failure, but use has declined since ASCEND-HF (2011) showed no mortality benefit and possible worsening renal function",
    "BNP level interpretation: values rise with acute HF exacerbation and fall with effective treatment; obesity, kidney disease, and atrial fibrillation affect levels",
    "NT-proBNP is preferred in many labs (more stable); BNP and NT-proBNP have different reference ranges and cannot be directly compared",
    "No community use of exogenous BNP \u2014 nesiritide is a hospital IV medication requiring hemodynamic monitoring",
    "The natriuretic peptide system (ANP, BNP, CNP) is the physiological counterbalance to RAAS \u2014 pharmacological context for sacubitril/valsartan (Entresto), which blocks neprilysin to preserve endogenous natriuretic peptides",
  ],
};

const SUPPORT_CARBETOCIN: SupportPack = {
  id: "carbetocin",
  title: "Carbetocin is a long-acting oxytocin analogue for postpartum hemorrhage prevention \u2014 obstetric use only",
  subtitle: "WHO essential medicine for PPH; CHAMPION trial; single-dose convenience vs repeated oxytocin; no community use",
  bullets: [
    "Carbetocin is a synthetic oxytocin analogue with ~40 min half-life (vs. ~3 min for oxytocin) \u2014 single dose replaces repeated oxytocin infusions for PPH prevention after cesarean delivery",
    "CHAMPION trial (2018, Lancet): non-inferiority to oxytocin for PPH prevention across 23 countries; WHO added to essential medicines list for PPH",
    "Not FDA-approved in the United States; widely used internationally; heat-stable formulation (Carbetocin RTS) approved by WHO for lower-resource settings without cold chain",
    "No community or enhancement use \u2014 carbetocin is an obstetric uterotonic; its oxytocin receptor activity in non-obstetric contexts would cause uterine cramping, hypotension, and nausea without benefit",
    "Cardiovascular monitoring: like oxytocin, carbetocin causes vasodilation and transient hypotension/tachycardia \u2014 administered with IV access and monitoring in place",
    "The oxytocin receptor agonism that makes it useful for PPH is distinct from the social/anxiolytic effects sometimes attributed to intranasal oxytocin",
  ],
};

const SUPPORT_CGRP: SupportPack = {
  id: "cgrp",
  title: "CGRP is the central migraine mediator \u2014 CGRP-targeted drugs have transformed migraine prevention and acute treatment",
  subtitle: "Trigeminal neuropeptide; 4 FDA-approved mAbs for prevention; gepants for acute and preventive treatment",
  bullets: [
    "CGRP (calcitonin gene-related peptide) is released from trigeminal nerve terminals during migraine attacks, causing vasodilation and neurogenic inflammation \u2014 the key molecular driver of migraine pain",
    "4 FDA-approved CGRP monoclonal antibodies for migraine prevention: erenumab (Aimovig), fremanezumab (Ajovy), galcanezumab (Emgality), eptinezumab (Vyepti)",
    "Gepants (CGRP receptor antagonists) for acute migraine: rimegepant (Nurtec ODT), ubrogepant (Ubrelvy); atogepant (Qulipta) also approved for prevention",
    "CGRP mAbs reduce monthly migraine days by 50%+ in ~40-50% of patients \u2014 one of the most targeted, mechanism-validated drug classes in modern neurology",
    "No community injection of exogenous CGRP \u2014 this would cause vasodilation and potentially exacerbate migraine; CGRP is an endogenous mediator to block, not supplement",
    "If you have chronic migraine (15+ headache days/month, 8+ migraine): discuss CGRP-targeted therapy with a headache specialist; these drugs represent a major advance over older preventive options",
  ],
};

function isAmylinFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "amylin";
}

function isAngiotensinIiFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "angiotensin-ii";
}

function isAra290Family(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "ara-290";
}

function isBivalirudinFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "bivalirudin";
}

const SUPPORT_AMYLIN: SupportPack = {
  id: "amylin",
  title: "Amylin fibrillates — pramlintide (Symlin) is the pharmaceutical option, not raw amylin",
  subtitle: "Endogenous beta-cell peptide; IAPP amyloid risk; pramlintide is FDA-approved; cagrilintide in development",
  bullets: [
    "Amylin (IAPP) naturally forms amyloid fibrils — injecting unformulated human amylin would risk injection-site amyloid deposition; pramlintide has proline substitutions preventing fibrillation",
    "Pramlintide (Symlin) is the FDA-approved amylin analogue — reduces postprandial glucagon, slows gastric emptying, and produces ~1-1.5 kg weight loss as an adjunct to insulin",
    "Prandial insulin dose reduction (typically 50%) is required when starting pramlintide — severe hypoglycemia occurs with full insulin doses",
    "Nausea is common in the first 4-8 weeks; starting at low doses (15 mcg T1DM, 60 mcg T2DM) and titrating reduces tolerability issues",
    "Cagrilintide (long-acting amylin analogue) combined with semaglutide is in Phase 3 (REDEFINE) — showing >15% weight reduction; not yet approved",
    "Community amylin injection has no evidence base and introduces fibrillation risk without benefit over the approved pharmaceutical alternative",
  ],
};

const SUPPORT_ANGIOTENSIN_II: SupportPack = {
  id: "angiotensin-ii",
  title: "Angiotensin-II (Giapreza) is an ICU vasopressor — not a community peptide",
  subtitle: "FDA-approved vasopressor for distributive shock; black box thrombosis warning; hospital-only administration",
  bullets: [
    "Giapreza (angiotensin-II injection) is FDA-approved for increasing blood pressure in adults with septic or other distributive shock — catecholamine-sparing vasopressor",
    "ATHOS-3 RCT demonstrated superior MAP response vs. placebo in patients refractory to norepinephrine",
    "Black box warning: thrombotic risk (DVT, arterial thrombosis) — VTE prophylaxis with heparin is mandatory during treatment",
    "Administered only in ICU settings with continuous hemodynamic monitoring; precise dose titration requires trained clinical staff",
    "No community, enhancement, or peptide therapy use case — angiotensin-II is a hospital IV medication for life-threatening hypotension",
    "RAAS physiology context: understanding how angiotensin-II functions illuminates why ACE inhibitors and ARBs work in heart failure and hypertension",
  ],
};

const SUPPORT_ARA_290: SupportPack = {
  id: "ara-290",
  title: "ARA-290 targets the tissue-protective EPO receptor — small trials in neuropathy, no FDA approval",
  subtitle: "EPO-derived peptide for innate repair receptor; sarcoidosis SFN research; research compound only",
  bullets: [
    "ARA-290 targets the innate repair receptor (EPO receptor + beta-common receptor heterodimer) without activating the hematopoietic EPO receptor — no erythropoietic effect by design",
    "Small randomized trial in sarcoidosis-associated small fiber neuropathy (Brines et al. 2014) showed improved neuropathic symptoms and intraepidermal nerve fiber density",
    "Not FDA-approved; no large-scale clinical trials completed; limited human safety database",
    "Potential hypoglycemia — some studies noted glucose-lowering effects; monitor if using insulin or antidiabetic drugs",
    "Community-sourced ARA-290 has no pharmaceutical-grade quality control — purity and sterility are unverified",
    "Research compound status: promising mechanism with limited clinical evidence — appropriate for clinical trial participation, not self-administration",
  ],
};

const SUPPORT_BIVALIRUDIN: SupportPack = {
  id: "bivalirudin",
  title: "Bivalirudin is a direct thrombin inhibitor for cardiac catheterization — hospital-only IV anticoagulant",
  subtitle: "Angiomax; bivalent thrombin inhibition; PCI and HIT anticoagulation; no reversal agent",
  bullets: [
    "Bivalirudin (Angiomax) is FDA-approved for anticoagulation during PCI (percutaneous coronary intervention) and in patients with or at risk for heparin-induced thrombocytopenia (HIT)",
    "Bivalent mechanism — binds both thrombin active site and exosite-1 simultaneously; short half-life (~25 min) via thrombin-mediated cleavage + renal clearance",
    "Major bleeding is the primary safety concern — no specific reversal agent exists; manage by discontinuation and supportive care",
    "Renal dose adjustment required — active metabolite cleared renally; aPTT or ACT monitoring in CKD patients",
    "Combination with antiplatelet drugs (aspirin, P2Y12 inhibitors) is standard in PCI — increases bleeding risk, which is the designed trade-off for ischemic protection",
    "Hospital IV medication — not relevant as a community peptide; educational value is in demonstrating precision synthetic peptide anticoagulation",
  ],
};

function isAbaloparatideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "abaloparatide";
}

function isAcetylHexapeptide8Family(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "acetyl-hexapeptide-8";
}

function isAdipotideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "adipotide";
}

function isAfamelanotideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "afamelanotide";
}

const SUPPORT_ABALOPARATIDE: SupportPack = {
  id: "abaloparatide",
  title: "Abaloparatide builds bone — but requires careful monitoring and has a cumulative 2-year lifetime use limit",
  subtitle: "FDA-approved PTHrP analogue for osteoporosis; osteosarcoma black box; sequential antiresorptive therapy required",
  bullets: [
    "FDA-approved for postmenopausal women with osteoporosis at high fracture risk — reduces vertebral and non-vertebral fractures (ACTIVE trial, NEJM 2016)",
    "PTH1R RG-conformation preference may give more anabolic bone effect vs. teriparatide — but clinical superiority is not established",
    "Osteosarcoma black box: cumulative lifetime use limit of 2 years across all PTH/PTHrP analogues (abaloparatide + teriparatide combined)",
    "Hypercalcemia risk: monitor calcium and urine calcium; avoid concurrent calcium supplements + active vitamin D within the post-injection window",
    "Must be followed by an antiresorptive agent (bisphosphonate, denosumab) — bone gains are lost rapidly without transition therapy",
    "No community or enhancement use case — anabolic bone agents are for documented osteoporosis under endocrinology or rheumatology supervision",
  ],
};

const SUPPORT_ACETYL_HEXAPEPTIDE_8: SupportPack = {
  id: "acetyl-hexapeptide-8",
  title: "Acetyl hexapeptide-8 (Argireline) is a cosmetic ingredient — not a drug, not Botox",
  subtitle: "Topical SNARE-inhibiting peptide; evidence is limited cosmetic studies; no injectable use",
  bullets: [
    "Topical cosmetic ingredient — not FDA-approved as a drug; evidence base is small, industry-funded cosmetic studies",
    "Proposed mechanism (SNARE/SNAP-25 inhibition) is pharmacologically plausible but unproven to occur in meaningful amounts through skin",
    "At ~889 Da molecular weight, transdermal absorption sufficient to reach neuromuscular junctions is highly unlikely without penetration enhancers",
    "The 'topical Botox' framing is pharmacologically misleading — Botox is injected directly at NMJ; topical AH8 does not achieve equivalent concentrations",
    "Topical formulations are generally well-tolerated with low irritation risk — safe as a skincare ingredient in that context",
    "No established injectable formulation or injection use case — community injection protocols for AH8 have no evidence base",
  ],
};

const SUPPORT_ADIPOTIDE: SupportPack = {
  id: "adipotide",
  title: "Adipotide showed striking fat loss in primates — but also serious kidney toxicity, and no human trials exist",
  subtitle: "Research compound only; pro-apoptotic adipose targeting; renal toxicity signal from the only primate study",
  bullets: [
    "Single primate study (Barnhart 2011, Sci Transl Med) showed ~11% body weight loss in obese Rhesus monkeys — but significant nephrotoxicity accompanied this effect",
    "Zero completed human clinical trials — no established safe dose, administration schedule, or human pharmacokinetic data",
    "The pro-apoptotic KLAK sequence targets prohibitin on adipose vasculature — but off-target vascular apoptosis (including in kidney) is a real mechanism-based risk",
    "Community-sourced adipotide has no pharmaceutical-grade quality control — purity, sterility, and concentration are unverified",
    "The nephrotoxicity signal in the primate study is not a theoretical concern — it was observed at the same doses that produced weight loss",
    "Do not combine with other nephrotoxic drugs (NSAIDs, aminoglycosides, contrast agents) given the established renal risk signal",
  ],
};

const SUPPORT_AFAMELANOTIDE: SupportPack = {
  id: "afamelanotide",
  title: "Afamelanotide (Scenesse) is FDA-approved for a rare photodermatosis — not for general tanning",
  subtitle: "MC1R agonist implant for erythropoietic protoporphyria; melanoma surveillance required; not indicated for aesthetic use",
  bullets: [
    "FDA-approved (2019) for photoprotection in adults with erythropoietic protoporphyria (EPP) — a rare, severely disabling photodermatosis",
    "Mechanism: potent MC1R agonist → eumelanin synthesis → photoprotection; significantly increases time in sunlight without phototoxic pain in EPP patients",
    "Administered as a subcutaneous implant (16 mg every 60 days) — not an injectable peptide in the community sense; requires medical implantation",
    "Melanoma safety: MC1R is a known melanoma risk-associated receptor; REMS program requires dermatology surveillance; skin examinations every 6 months",
    "Not approved or indicated for general tanning — the community/melanotan space uses different analogues (MT-I, MT-II) with their own risk profile",
    "Nausea and skin darkening are common after implant; post-implant monitoring for implant site and systemic effects is part of the prescribing protocol",
  ],
};

function isExenatideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "exenatide";
}

function isSubstancePFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "substance-p";
}

function isOrexinAFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "orexin-a";
}

function isNeuropeptideYFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "neuropeptide-y";
}

const SUPPORT_EXENATIDE: SupportPack = {
  id: "exenatide",
  title: "Modern weekly GLP-1 drugs produce 3-4× more weight loss — exenatide is the class's first member, not its best",
  subtitle: "First GLP-1 receptor agonist — established safety track record; inferior weight loss vs modern options",
  bullets: [
    "Insulin and sulfonylurea dose reduction: if starting exenatide on insulin or sulfonylureas, dose reduction is required before initiation to prevent hypoglycemia — the same additive glucose-lowering interaction as other GLP-1 drugs",
    "Thyroid cancer and MEN2 class contraindication: applies equally to exenatide as all GLP-1 agonists; thyroid C-cell concern is a class-wide warning",
    "Pancreatitis history: personal history of pancreatitis is a contraindication; the association is documented for the GLP-1 class",
    "Nausea management: Byetta (twice daily) generally has higher nausea rates than weekly formulations; start at 5 mcg twice daily and titrate to 10 mcg after 4 weeks if tolerated",
    "Hydration: exenatide-induced nausea/vomiting can cause volume depletion and has been associated with acute kidney injury; maintain hydration and reduce dose if GI symptoms are significant",
    "Expectation calibration: at the prescribed doses, exenatide produces ~3-5% body weight reduction — substantially less than semaglutide (~15%) or tirzepatide (~22%); if maximum weight loss is the goal, newer agents are more effective",
  ],
  redFlags: [
    "Pancreatitis — severe, persistent abdominal pain radiating to the back; stop immediately and seek emergency evaluation",
    "MEN2 or medullary thyroid cancer history — class contraindication; do not proceed",
    "Acute kidney injury signs (significant decrease in urine output, swelling) — stop and seek medical evaluation",
    "On insulin without dose reduction at initiation — hypoglycemia risk; reduce insulin dose before starting exenatide",
  ],
};

const SUPPORT_SUBSTANCE_P: SupportPack = {
  id: "substance-p",
  title: "Substance P is a pain-promoting, pro-inflammatory mediator — its clinical value is in its antagonists, not its injection",
  subtitle: "NK1 receptor agonist — pro-nociceptive; NK1 antagonists are the therapeutic direction",
  bullets: [
    "Understand the mechanism before use: Substance P activates NK1 receptors that promote pain signaling, vasodilation, and inflammatory responses; this is not a compound where exogenous administration has therapeutic benefit in healthy adults",
    "NK1 antagonists are the therapy: aprepitant (Emend), netupitant, and other NK1 antagonists are FDA-approved for chemotherapy-induced nausea/vomiting and are being studied for depression; these work by blocking the SP/NK1 system",
    "Injection produces pain and inflammation: subcutaneous injection of substance P would stimulate NK1 receptors at the injection site, causing local pain, vasodilation, and inflammatory cell recruitment — this is the pharmacological mechanism, not a side effect to be managed around",
    "Fibromyalgia and chronic pain: elevated SP levels are found in fibromyalgia patients; this finding supports the investigation of NK1 antagonists for these conditions, not SP supplementation",
    "Research context only: if this compound is being considered, it is in a research or educational context to understand pain physiology — not for therapeutic self-administration",
  ],
  redFlags: [
    "Any planned subcutaneous injection of substance P — the pharmacology is pro-inflammatory and pro-nociceptive; this would cause pain and local inflammation by mechanism",
    "Chronic pain condition where SP is elevated — this argues for NK1 antagonist therapy (physician prescription), not SP administration",
    "On NK1 antagonist medications (aprepitant) — exogenous SP would directly oppose the therapeutic mechanism",
  ],
};

const SUPPORT_OREXIN_A: SupportPack = {
  id: "orexin-a",
  title: "Subcutaneous injection does not reach the brain — intranasal is the only studied CNS delivery route for orexin-A",
  subtitle: "Wakefulness neuropeptide — BBB penetration only via intranasal route; narcolepsy context",
  bullets: [
    "BBB penetration reality: orexin-A is a 33-AA peptide that does not reliably cross the blood-brain barrier after subcutaneous injection; the wakefulness-promoting studies used intranasal administration or intracerebroventricular routes; subcutaneous injection may have no CNS wakefulness effect",
    "Narcolepsy Type 1 is the clinically rational context: narcolepsy Type 1 is caused by loss of orexin-producing neurons; orexin-A replacement via intranasal route has been studied in small trials with positive results; community self-injection subcutaneously for wakefulness enhancement has no supporting evidence",
    "Psychiatric and arousal screen: orexin promotes arousal and can worsen anxiety states; anyone with psychosis history, bipolar disorder, or anxiety disorders should not use arousal-promoting compounds without psychiatric guidance",
    "Orexin antagonists are the current approved drugs: suvorexant (Belsomra) and lemborexant (Dayvigo) are FDA-approved insomnia drugs that block orexin; if you are on these medications, exogenous orexin-A directly opposes the therapeutic mechanism",
    "Expectation calibration: any peripheral injection of orexin-A expecting CNS wakefulness is based on an assumption of BBB penetration that has not been established; the mechanism requires CNS delivery",
    "Modafinil is the practical alternative: for community wakefulness enhancement with established CNS pharmacokinetics, modafinil has an established evidence base; orexin-A injection does not",
  ],
  redFlags: [
    "Psychosis or mania history — arousal-promoting compounds are contraindicated without psychiatric guidance",
    "On suvorexant or lemborexant for sleep — exogenous orexin-A opposes the therapeutic mechanism; stop and discuss with prescribing physician",
    "Expecting wakefulness effect from subcutaneous injection — BBB penetration is not established from this route; manage expectations accordingly",
    "Significant cardiovascular symptoms after administration — peripheral orexin has sympathomimetic properties; stop and evaluate",
  ],
};

const SUPPORT_NEUROPEPTIDE_Y: SupportPack = {
  id: "neuropeptide-y",
  title: "NPY is a potent appetite stimulator and vasoconstrictor — community injection produces effects that conflict with most therapeutic goals",
  subtitle: "Appetite/stress neuropeptide — Y-receptor complexity; cardiovascular and appetite concerns",
  bullets: [
    "Understand the appetite pharmacology: NPY is one of the most potent appetite-stimulating signals known; injecting NPY peripherally activates Y1/Y5 receptors driving food intake; if appetite suppression or weight management is your goal, NPY injection is the opposite direction",
    "Vasoconstriction is a pharmacological effect: NPY causes peripheral vasoconstriction and blood pressure elevation via Y1 receptors; anyone with hypertension, cardiovascular disease, or on antihypertensive medications should not use NPY",
    "The stress resilience story requires CNS selectivity: the correlation between NPY levels and stress resilience/reduced PTSD is a CNS Y2 receptor-mediated effect; systemic injection does not selectively activate CNS Y2 receptors — it activates all Y receptors including appetite-stimulating and vasoconstricting subtypes",
    "GLP-1 drug opposition: GLP-1 agonists (semaglutide, tirzepatide) suppress appetite through pathways that include reduction of NPY signaling; NPY injection would directly oppose GLP-1 drug mechanisms",
    "No therapeutic NPY injection use case: there is no community therapeutic rationale for NPY injection given the appetite-stimulating, vasoconstricting peripheral effects and the receptor non-selectivity of full NPY at community doses",
    "Research and education context only: if NPY is in your compound library, it is likely being considered for research education about appetite neuroscience, not for self-administration",
  ],
  redFlags: [
    "Hypertension or cardiovascular disease — Y1-mediated vasoconstriction will elevate blood pressure; stop immediately",
    "On antihypertensive medications — NPY vasoconstriction opposes antihypertensive mechanism; potential hypertensive effect",
    "Eating disorder history or active eating disorder treatment — the potent appetite-stimulating effect is contraindicated",
    "On GLP-1 agonists for weight management — NPY directly opposes the appetite-suppressing mechanism of these drugs",
  ],
};

function isLeuprolideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "leuprolide";
}

function isDesmopressinFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "desmopressin";
}

function isCalcitoninFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "calcitonin";
}

function isGlucagonFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "glucagon";
}

const SUPPORT_LEUPROLIDE: SupportPack = {
  id: "leuprolide",
  title: "Continuous GnRH receptor stimulation suppresses the axis — this is chemical castration, not stimulation; the PCT narrative is backwards",
  subtitle: "GnRH agonist (Lupron) — chemical castration; flare management; bone loss",
  bullets: [
    "The suppression mechanism: leuprolide continuously stimulates GnRH receptors until they downregulate — this produces chemical castration (testosterone/estrogen suppression), not stimulation; it is pharmacologically the opposite of axis stimulation from gonadorelin or SERMs",
    "Testosterone flare at initiation: the first 1-2 weeks cause a sex hormone surge before suppression; prostate cancer patients require anti-androgen cover (bicalutamide, enzalutamide) during this window to prevent disease flare — this is standard of care, not optional",
    "Depot duration means no quick reversal: 1-month, 3-month, and 6-month depot formulations are available; if adverse effects develop, you cannot stop exposure; understand your formulation duration before injection",
    "Bone density loss is cumulative: sustained androgen/estrogen deprivation causes progressive bone density loss; baseline DEXA scan + calcium + vitamin D supplementation are standard clinical practice; bisphosphonate co-prescription is common for long-term use",
    "PCT use is pharmacologically backwards: PCT aims to stimulate the HPG axis to restore endogenous testosterone production; leuprolide suppresses the axis; this is not a PCT compound",
    "Physician supervision is mandatory: leuprolide is a Schedule III drug (prescription only) with serious, potentially irreversible hormonal and metabolic consequences in depot form",
  ],
  redFlags: [
    "Prostate cancer at initiation without anti-androgen cover — testosterone flare can cause bone pain, urinary obstruction, spinal cord compression; this is a medical emergency risk",
    "Osteoporotic fracture during treatment — bone density monitoring and intervention required immediately",
    "Significant cardiovascular event (MI, stroke) during prolonged therapy — ADT increases cardiovascular risk; stop and evaluate with cardiologist",
    "Expecting testosterone stimulation from leuprolide — stop; the mechanism produces suppression, not stimulation",
    "Any use outside a physician-supervised context given depot duration and hormonal potency",
  ],
};

const SUPPORT_DESMOPRESSIN: SupportPack = {
  id: "desmopressin",
  title: "Hyponatremia is the dominant safety concern — fluid restriction while using desmopressin is not optional",
  subtitle: "V2-selective ADH analog — antidiuretic/hemostatic; hyponatremia and fluid intake protocol",
  bullets: [
    "Fluid restriction is required during use: desmopressin's V2 receptor activation causes water retention; drinking more than necessary while on desmopressin causes dilutional hyponatremia — fluid restriction is a clinical protocol requirement, not a general suggestion",
    "Heart failure contraindication: desmopressin causes water retention; this directly worsens volume overload in heart failure, hyponatremia, or conditions where fluid balance is impaired — contraindicated without cardiologist guidance",
    "SSRI interaction is mechanistically significant: SSRIs independently cause SIADH (antidiuretic hormone syndrome); adding desmopressin creates additive water retention and hyponatremia risk; check your medication list before starting desmopressin",
    "Elderly vulnerability: elderly patients are more susceptible to hyponatremia from desmopressin due to reduced renal concentrating ability and often lower baseline sodium; the FDA added a boxed warning for nocturia use in elderly patients",
    "Hyponatremia recognition: headache + nausea + unusual fatigue + confusion = possible hyponatremia; stop desmopressin, do not drink excessive fluids, seek medical evaluation",
    "Clinical indications are the appropriate context: desmopressin is appropriately used for diabetes insipidus, nocturnal enuresis in children, nocturia, and hemostasis (vWD Type 1, hemophilia A) — these have established protocols and monitoring standards",
  ],
  redFlags: [
    "Heart failure, significant edema, or volume overload — stop; desmopressin contraindicated",
    "Headache, nausea, unusual fatigue, confusion — possible hyponatremia; stop, limit fluid intake, seek medical evaluation immediately",
    "Sodium level below 130 mEq/L on any blood test — hyponatremia; stop and seek medical evaluation",
    "Seizure activity — hyponatremia-associated seizure; emergency services immediately",
    "Using for athletic performance or water retention management outside a medical context — not an appropriate use",
  ],
};

const SUPPORT_CALCITONIN: SupportPack = {
  id: "calcitonin",
  title: "FDA withdrew calcitonin nasal spray for osteoporosis due to a cancer signal — this is a real regulatory finding",
  subtitle: "Osteoclast-inhibiting thyroid peptide — Paget's/hypercalcemia indications; malignancy concern",
  bullets: [
    "Cancer signal is real: in 2013, the FDA refused to allow calcitonin nasal spray (Fortical, Miacalcin) to remain on label for osteoporosis after a pooled analysis of clinical trial data showed higher rates of malignancies in calcitonin-treated patients versus placebo — this was a regulatory evidence-based decision, not theoretical concern",
    "Approved indications remain: Paget's disease and hypercalcemia of malignancy are the remaining FDA-approved uses where the benefit-risk balance is established; physician-supervised post-menopausal osteoporosis in specific clinical situations where other agents are not tolerated",
    "Salmon vs human calcitonin: salmon calcitonin has 40-50x higher receptor affinity than human calcitonin and is the clinically used form; the receptor is the same but potency differs substantially",
    "Antibody formation with salmon calcitonin: some patients develop neutralizing antibodies that reduce efficacy over months of use; this is a pharmacological characteristic of a non-human peptide sequence",
    "Bisphosphonates are generally preferred: for post-menopausal osteoporosis, bisphosphonates (alendronate, risedronate) and denosumab have stronger fracture reduction evidence and better established safety profiles than calcitonin",
    "Calcium and vitamin D co-supplementation: any bone agent requires adequate calcium and vitamin D as a foundation; ensure these are in place",
  ],
  redFlags: [
    "Cancer history in the osteoporosis treatment context — the malignancy signal from pooled clinical trials warrants oncology discussion before starting",
    "Symptoms of hypocalcemia (muscle cramps, tingling, numbness, tetany) — stop and check serum calcium",
    "Loss of efficacy over months of use — possible antibody formation; discuss with physician about transitioning to bisphosphonate",
    "Calcitonin injection without physician supervision and indication — the malignancy signal makes physician oversight important for any ongoing use",
  ],
};

const SUPPORT_GLUCAGON: SupportPack = {
  id: "glucagon",
  title: "Every insulin-using diabetic should have a glucagon rescue kit — its absence is the primary safety gap",
  subtitle: "Counter-regulatory hormone / hypoglycemia rescue — FDA-approved emergency use",
  bullets: [
    "Rescue kit access: if you or someone close to you uses insulin, a glucagon rescue kit (GlucaGen, Gvoke, or Baqsimi nasal powder) should be immediately accessible at all times; severe hypoglycemia can cause loss of consciousness and the person may be unable to self-treat",
    "Who should have the kit: any insulin user, anyone with an insulin-using person in their household, and anyone using other high-risk glucose-lowering compounds (pramlintide, IGF-1 LR3) should have glucagon available",
    "Rescue training: family members, partners, and coworkers should know how to administer the kit; glucagon's value during a severe hypoglycemia emergency depends entirely on someone being present and trained",
    "Post-rescue protocol: after glucagon rescue, the person should eat a carbohydrate-containing meal once conscious; glucagon causes temporary glycogen depletion that predisposes to recurrence; seek medical evaluation after any severe hypoglycemia episode",
    "Pheochromocytoma contraindication: glucagon stimulates catecholamine release from pheochromocytoma tumors, which can cause a life-threatening hypertensive crisis; this is a contraindication for diagnostic or therapeutic glucagon use",
    "GLP-1 mechanism education: GLP-1 drugs (semaglutide, tirzepatide, retatrutide) suppress glucagon release from alpha cells; this is part of how they lower glucose; understanding this explains why GLP-1 users have more stable post-meal glucose",
  ],
  redFlags: [
    "Severe hypoglycemia (unconscious, seizure, unable to swallow) without glucagon rescue kit available — emergency services immediately",
    "Pheochromocytoma or suspected pheochromocytoma — do not use glucagon; hypertensive crisis risk",
    "Glycogen depletion context (prolonged fasting, severe illness, heavy alcohol use) — glucagon rescue requires liver glycogen to work; in these contexts, IV dextrose is required, not glucagon",
    "Recurrent severe hypoglycemia — requires immediate reassessment of insulin regimen by prescribing physician",
  ],
};

function isVasopressinFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "vasopressin";
}

function isTriptorelinFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "triptorelin";
}

function isKpvFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "kpv";
}

function isAnpFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "atrial-natriuretic-peptide";
}

const SUPPORT_VASOPRESSIN: SupportPack = {
  id: "vasopressin",
  title: "Vasopressin is not oxytocin — V1a vasoconstriction creates cardiovascular risk that oxytocin does not",
  subtitle: "ADH / V1-V2 receptor agonist — cardiovascular and hyponatremia screens required",
  bullets: [
    "Cardiovascular screen first: V1a receptor activation causes vasoconstriction and blood pressure elevation; any hypertension, coronary artery disease, or cardiovascular history requires physician clearance before vasopressin use",
    "Vasopressin ≠ oxytocin: they are structurally similar 9-AA peptides but pharmacologically distinct — vasopressin activates V1a (vasoconstriction), V2 (water retention), V1b (HPA axis); oxytocin does not produce the same cardiovascular effects",
    "Hyponatremia monitoring: V2 receptor activation causes water retention; excessive fluid intake during or after vasopressin use dilutes serum sodium — watch for headache, nausea, unusual fatigue, confusion as early signs",
    "SSRI/SNRI interaction: SSRIs cause SIADH (syndrome of inappropriate antidiuretic hormone) independently — combining with vasopressin creates additive water retention and hyponatremia risk; check your medication list",
    "Pregnancy exclusion: vasopressin has oxytocin-like uterotonic effects at higher doses — pregnancy is a contraindication",
    "Expectation calibration: the memory and cognitive effects in community use are extrapolated from rodent V1b receptor research and small human IV studies — far less consistent than the oxytocin social cognition narrative (which is itself inconsistent)",
  ],
  redFlags: [
    "Hypertension or cardiovascular disease without physician clearance — V1a vasoconstriction is pharmacologically real and relevant",
    "Headache, nausea, unusual fatigue, confusion during or after use — possible hyponatremia; stop, drink moderate (not excessive) fluids, seek evaluation if symptoms persist",
    "Any possibility of pregnancy — oxytocin-like uterotonic activity; stop immediately",
    "Chest pain or significantly elevated blood pressure — stop and seek evaluation",
  ],
};

const SUPPORT_TRIPTORELIN: SupportPack = {
  id: "triptorelin",
  title: "Continuous GnRH agonism suppresses the axis — this is chemical castration, not axis stimulation",
  subtitle: "GnRH agonist (depot) — testosterone flare, bone loss, and duration screens",
  bullets: [
    "The suppression mechanism: triptorelin continuously stimulates GnRH receptors until they downregulate — this is the mechanism of chemical castration; it produces the opposite of gonadorelin's pulsatile stimulation effect; do not confuse the two",
    "Testosterone/estrogen flare at initiation: the first 1-2 weeks of GnRH agonist therapy cause a surge in sex hormones before suppression; prostate cancer patients must have anti-androgen cover during this window; understand flare management before first injection",
    "Depot duration means no quick reversal: depending on formulation, triptorelin's depot effects last 1, 3, or 6 months; if adverse effects develop, you cannot rapidly reduce exposure — understand the duration of your formulation before injecting",
    "Bone density monitoring: sustained testosterone/estrogen suppression causes bone density loss; baseline DEXA scan and calcium/vitamin D supplementation are standard practice in the clinical setting",
    "PCT context: triptorelin is sometimes discussed for PCT — this is pharmacologically irrational; it suppresses the axis rather than stimulating it; PCT requires axis stimulation (SERMs, kisspeptin, gonadorelin)",
    "Physician oversight is mandatory: triptorelin is a prescription drug with serious hormonal consequences; off-label use without physician oversight creates real risks including irreversible effects during depot duration",
  ],
  redFlags: [
    "Using triptorelin expecting PCT-like axis stimulation — the mechanism produces the opposite; stop and understand the pharmacology",
    "Prostate cancer without anti-androgen flare cover at initiation — the testosterone surge can cause disease flare; mandatory physician involvement",
    "Unexpected bone pain, fracture, or falls — possible bone density loss with prolonged use; stop and seek evaluation",
    "Significant mood deterioration, depression, or cognitive changes — sex hormone suppression effects; discuss with prescribing physician",
    "Any triptorelin use without physician oversight given depot duration and hormonal potency",
  ],
};

const SUPPORT_KPV: SupportPack = {
  id: "kpv",
  title: "Primarily researched for IBD in oral colonic delivery — not a systemic anti-inflammatory compound",
  subtitle: "MC1R/NF-κB anti-inflammatory tripeptide — IBD context and route considerations",
  bullets: [
    "Route defines the indication: KPV's evidence base is oral or targeted colonic delivery for IBD (Crohn's, ulcerative colitis); the research is built around mucosal delivery, not systemic injection; if injecting subcutaneously, you are operating outside the evidence base entirely",
    "Established IBD medications take priority: if you have IBD managed by a gastroenterologist, any supplement or investigational compound should be disclosed; KPV should not replace established IBD medications (biologics, aminosalicylates, immunosuppressants)",
    "Active cancer screen: KPV has partial MC1R agonist activity; MC1R is expressed in some melanomas and other cancers; any cancer history or active cancer treatment requires oncology consultation before use",
    "Immunosuppressive medication interaction: if on azathioprine, 6-MP, methotrexate, or biologics for IBD, the combined anti-inflammatory effect and potential immunomodulatory interaction is not characterized",
    "Expectation calibration: no human RCTs have been published; the evidence base is in vitro (NF-κB) and animal models (colitis); systemic injection evidence is essentially nonexistent",
    "Oral formulation quality: not all oral 'KPV' formulations achieve meaningful GI delivery; colon-targeted delivery formulations are required for the IBD application; standard oral supplements may have limited local activity",
  ],
  redFlags: [
    "Active cancer or cancer treatment — MC1R partial agonism; consult oncology",
    "IBD flare with worsening symptoms despite use — KPV does not replace established IBD therapy; seek medical evaluation",
    "On biologics without gastroenterologist awareness — disclosure is required for any compound with immunomodulatory activity",
    "Severe allergic reaction to any injection (hives, breathing difficulty, swelling) — stop and seek emergency evaluation",
  ],
};

const SUPPORT_ANP: SupportPack = {
  id: "atrial-natriuretic-peptide",
  title: "2-minute half-life makes native ANP subcutaneous injection pharmacokinetically irrational — the clinical applications are IV infusion only",
  subtitle: "Cardiac natriuretic peptide — 2-3 min half-life; clinical analog context",
  bullets: [
    "Half-life reality: native ANP has a plasma half-life of approximately 2-3 minutes; subcutaneous injection does not achieve meaningful systemic levels; if natriuretic peptide effects are the clinical goal, carperitide (IV, Japan) or other analogs are the pharmacokinetically rational compounds",
    "Cardiovascular disease context: natriuretic peptides are used in acute heart failure in clinical settings; any cardiovascular condition (heart failure, severe hypertension, significant arrhythmia) requires physician oversight before any natriuretic peptide compound",
    "Hypotension risk: ANP and all natriuretic peptides cause dose-dependent vasodilation and hypotension; this is the primary adverse effect in clinical trials — understand your baseline blood pressure before use",
    "Nesiritide context: the related clinical analog (nesiritide / BNP) was withdrawn from widespread use due to renal and mortality concerns; this does not necessarily apply to native ANP, but it illustrates the risks of clinical-dose natriuretic peptide administration",
    "Antihypertensive medication interaction: ANP's vasodilation is additive with antihypertensive medications; if on blood pressure medications, ANP adds to the hypotensive effect",
    "Electrolyte monitoring: the natriuretic effect increases sodium excretion; with sustained use or high doses, sodium/potassium balance requires monitoring",
  ],
  redFlags: [
    "Symptomatic hypotension or dizziness after use — stop; blood pressure measurement; hydrate and rest horizontally",
    "Active heart failure or severe cardiovascular disease — requires physician oversight; IV carperitide/analog in a monitored clinical setting",
    "On antihypertensive medications without blood pressure monitoring plan — additive hypotension risk",
    "Any worsening of cardiovascular symptoms (chest pain, shortness of breath, palpitations) — stop and seek emergency evaluation",
  ],
};

function isSomatostatinFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "somatostatin";
}

function isBpc157ArginateFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "bpc-157-arginate";
}

function isThymosinBeta4FullFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "thymosin-beta-4-full";
}

function isCjc1295DacFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "cjc-1295-dac";
}

const SUPPORT_SOMATOSTATIN: SupportPack = {
  id: "somatostatin",
  title: "90-second half-life makes subcutaneous injection pharmacologically meaningless — use an analog if you need somatostatin receptor activity",
  subtitle: "Endogenous GH/glucagon inhibitor — mechanism vs practical use context",
  bullets: [
    "Half-life reality check: native somatostatin has a plasma half-life of approximately 90 seconds; subcutaneous injection does not achieve sustained systemic levels; if somatostatin receptor activity is the goal, octreotide or lanreotide are the clinically rational compounds",
    "Glucagon counter-regulation concern: somatostatin inhibits glucagon as well as insulin; if glucose drops while using a somatostatin compound, the normal glucagon rescue response is impaired — fast-acting glucose must be accessible",
    "Octreotide/lanreotide reference: if using a somatostatin analog (octreotide, lanreotide, pasireotide), physician oversight is the standard — these have FDA-approved prescribing information with established contraindications",
    "GH axis context: somatostatin is the endogenous brake on GH; those using GH secretagogues are working against the somatostatin system; the two are opposing signals",
    "Glucose monitoring: any compound affecting both insulin and glucagon secretion requires glucose awareness; monitoring fasting glucose at baseline is a minimum",
    "Source quality: no pharmaceutical-grade native somatostatin is available for community injection; this compound is primarily used in IV research contexts",
  ],
  redFlags: [
    "Hypoglycemia symptoms (shakiness, sweating, confusion, rapid heart rate) — impaired glucagon counter-regulation means normal recovery may be blunted; fast-acting carbohydrates immediately",
    "Bradycardia or significant heart rate slowing — somatostatin has cardiac effects; stop and evaluate",
    "On insulin or hypoglycemic agents without a glucose monitoring plan — glucagon suppression is additive hypoglycemia risk",
    "Gallbladder symptoms (right upper quadrant pain, nausea) during long-term analog use — gallstone risk is a documented class effect",
  ],
};

const SUPPORT_BPC157_ARGINATE: SupportPack = {
  id: "bpc-157-arginate",
  title: "Same peptide as BPC-157 in a different salt form — the BPC-157 safety and protocol considerations apply unchanged",
  subtitle: "Arginate formulation of BPC-157 — the active peptide is identical",
  bullets: [
    "The BPC-157 safety framework applies: cancer history (same angiogenesis mechanism), pregnancy (no safety data), injection site infection signs, anticoagulant awareness — all apply to the arginate form identically",
    "Arginate is the counterion, not the active moiety: the GEPPPGKPADDAGLV peptide sequence is unchanged; arginate improves water solubility, it does not change pharmacology",
    "Source quality: third-party CoA is required as for standard BPC-157; arginate form does not guarantee higher quality or different standards",
    "No separate evidence base: all BPC-157 animal and limited human data applies; there are no arginate-specific comparative studies showing superior efficacy",
    "Route selection: oral route targets GI tract; injectable is for systemic effects — same decision framework as standard BPC-157",
    "Set a hypothesis: what specific outcome are you targeting, over what defined timeframe? The same 6-8 week minimum evaluation window applies",
  ],
  redFlags: [
    "Cancer history — same BPC-157 hard stop applies; the arginate form does not change the angiogenesis mechanism",
    "Injection site infection signs (increasing redness, warmth, pus, fever after 24 hours) — stop injecting there, seek medical evaluation",
    "Pregnant, planning pregnancy, or breastfeeding — stop immediately; no safety data for either BPC-157 form",
    "Product without a verifiable third-party CoA — do not inject; arginate labeling does not guarantee quality",
  ],
};

const SUPPORT_THYMOSIN_BETA4_FULL: SupportPack = {
  id: "thymosin-beta-4-full",
  title: "Most community 'TB4' is actually TB-500 — verify what you have before applying TB4 protocols",
  subtitle: "Complete 43-AA thymosin beta-4 protein — cardiac repair evidence; cancer hard stop",
  bullets: [
    "Product verification first: full TB4 (43 AA, ~4964 Da) and TB-500 (Ac-SDKP fragment, ~886 Da) are only distinguishable by mass spectrometry; most gray-market 'TB4' products are TB-500; verify identity before proceeding",
    "Cancer history hard stop: thymosin beta-4 promotes angiogenesis via ILK signaling; this applies equally to TB-500 and full TB4; any personal cancer history is an absolute contraindication",
    "Cold chain is critical for full protein: the complete 43-AA glycoprotein is significantly more temperature-sensitive than smaller peptides like TB-500; verify refrigeration integrity and check product for cloudiness or precipitation",
    "Cardiac context: the TOPCARE-AMI pilot and dry eye Phase 2 data are the strongest evidence contexts; any use in someone with active cardiac disease requires cardiologist oversight",
    "NSAIDs: minimize NSAID use during recovery-focused use — some inflammatory signaling is necessary for repair; NSAIDs partially counteract TB4's repair signaling",
    "Cancer surveillance: ongoing use requires monitoring for new tissue masses or unexplained growths; angiogenesis promotion is a recurring concern, not a one-time screen",
  ],
  redFlags: [
    "Any cancer history — angiogenesis mechanism; absolute hard stop for both TB4 and TB-500",
    "Active cardiac disease without cardiologist oversight — cardiac repair evidence requires physician involvement",
    "Product stored at room temperature or showing cloudiness/precipitation — protein degradation; do not use",
    "New unexplained tissue mass or lymph node enlargement during use — stop immediately and seek evaluation",
    "Pregnancy — developmental angiogenesis implications unknown; stop immediately",
  ],
};

const SUPPORT_CJC1295_DAC: SupportPack = {
  id: "cjc-1295-dac",
  title: "8-day half-life means steady-state builds over weeks and side effects persist for days after dosing — plan accordingly",
  subtitle: "Long-acting GHRH analog — continuous GH axis activation; once-weekly dosing context",
  bullets: [
    "Cancer history hard stop: the 8-day half-life means continuous, not pulsatile, IGF-1 elevation — the same GH-axis cancer gate as no-DAC CJC-1295 but amplified by persistent elevated exposure; any cancer history is an absolute stop",
    "Steady-state accumulation: with an 8-day half-life, steady-state is not reached until 5-6 weeks of weekly dosing; GH and IGF-1 levels continue building during this period — glucose and side effect monitoring is most important in this window",
    "Side effect persistence: if edema, carpal tunnel, or glucose elevation develop, it takes approximately 1 week after the last dose for levels to halve; you cannot rapidly reduce exposure as you can with daily short-acting compounds",
    "Glucose monitoring: baseline fasting glucose before starting; recheck at 4-6 weeks when approaching steady state; continuous GH elevation is counter-regulatory to insulin over time",
    "DAC vs no-DAC confusion: CJC-1295 DAC and CJC-1295 without DAC are not interchangeable at the same dose; if you have ordered one and received the other, the pharmacokinetics and dosing frequency are fundamentally different",
    "Sleep timing: once-weekly injection at bedtime aligns with natural GH pulse; the DAC extension means injection timing has less acute impact than with short-acting compounds",
  ],
  redFlags: [
    "Any cancer history — continuous IGF-1 elevation from DAC half-life; absolute hard stop",
    "Significant edema, carpal tunnel symptoms, or glucose elevation — reduce dose; note that effects persist ~1 week after last injection before beginning to resolve",
    "Fasting glucose noticeably elevated or symptoms of glucose dysregulation (thirst, fatigue, frequent urination) — stop; check glucose",
    "Product confusion between DAC and no-DAC variants — do not assume equivalence; confirm what you have before dosing",
    "Pregnant, planning pregnancy, or breastfeeding — stop immediately; GH axis activation in pregnancy is contraindicated",
  ],
};

function isPramlintideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "pramlintide";
}

function isHcgFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "hcg";
}

function isSS31Family(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "ss-31";
}

function isIgf1Lr3Family(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "igf-1-lr3";
}

const SUPPORT_PRAMLINTIDE: SupportPack = {
  id: "pramlintide",
  title: "Insulin dose adjustment is mandatory — not optional — when starting pramlintide",
  subtitle: "FDA-approved amylin analog — key screens and protocol requirements",
  bullets: [
    "Insulin reduction first: if on insulin, reduce all rapid-acting insulin by 50% when starting pramlintide — this is a labeling requirement, not a suggestion; the additive glucose-lowering is pharmacologically inevitable",
    "Gastroparesis gate: pramlintide slows gastric emptying; gastroparesis symptoms or diagnosis are a contraindication — check before starting",
    "Hypoglycemia unawareness screen: if you cannot reliably feel low blood sugar, pramlintide + insulin is high-risk; CGM is strongly recommended and may be essential",
    "Oral medication timing: pramlintide slows gastric emptying; take any critical oral medication (antibiotics, thyroid meds) ≥1 hour before or 2 hours after pramlintide injection",
    "Nausea expectation: common for first 4 weeks; start at lowest dose (15 mcg) and titrate slowly — most nausea is dose and titration-rate dependent",
    "CGM strongly advisable at initiation: post-meal glucose variability with pramlintide + insulin is hard to track without continuous data; CGM is the practical safety anchor",
  ],
  redFlags: [
    "On insulin and did not reduce dose by 50% at initiation — do not proceed without this adjustment; hypoglycemia is pharmacological, not rare",
    "Gastroparesis symptoms (bloating, nausea, early satiety) — contraindication; stop and evaluate before resuming",
    "Hypoglycemia unawareness — does not feel low blood sugar; pramlintide + insulin without CGM is unsafe",
    "Severe nausea/vomiting preventing fluid intake — stop pramlintide, resume when stable, restart titration from lowest dose",
  ],
};

const SUPPORT_HCG: SupportPack = {
  id: "hcg",
  title: "Estradiol management is the ongoing work — not just testosterone",
  subtitle: "LH mimetic / TRT adjunct — key monitoring requirements",
  bullets: [
    "Estradiol monitoring: hCG drives Leydig cell testosterone production; aromatization of that testosterone elevates estradiol — measure E2 at baseline and 4-6 weeks after starting, especially if using with exogenous testosterone",
    "AI awareness: if estradiol rises significantly, aromatase inhibitors are commonly co-prescribed; understand the target range and do not chase low estradiol — over-suppression is as problematic as elevation",
    "FSH limitation: hCG only stimulates Leydig cells (testosterone); Sertoli cells (sperm production) require FSH; if fertility is the goal and hCG alone is not achieving it, FSH or gonadorelin may be needed",
    "Prostate cancer screen: hCG drives testosterone; PSA screening is indicated before starting, especially in males over 40",
    "Hormone-sensitive cancer history: absolute hard stop; hCG stimulates sex steroid production; any hormone-sensitive cancer history requires oncology clearance",
    "Source quality: pharmaceutical hCG (Pregnyl, Novarel) is the reference; compounded and gray-market hCG varies in activity — verify the source before using",
  ],
  redFlags: [
    "Hormone-sensitive cancer (prostate, testicular, breast) — hard stop; hCG drives the steroids that fuel these cancers",
    "Symptoms of OHSS in female users (severe abdominal pain, bloating, rapid weight gain, shortness of breath) — stop immediately and seek emergency evaluation",
    "Estradiol significantly elevated with symptoms developing (gynecomastia, mood changes, fluid retention) without AI management — stop and assess",
    "Prostate cancer or rising PSA without evaluation — stop and seek urological evaluation",
  ],
};

const SUPPORT_SS31: SupportPack = {
  id: "ss-31",
  title: "D-amino acid verification is the quality gate that most products fail",
  subtitle: "Cardiolipin-targeting mitochondrial peptide — HARP trial context",
  bullets: [
    "D-amino acid verification: SS-31 contains D-Arg and D-Phe; standard HPLC cannot distinguish D from L amino acids — require chiral LC-MS confirmation; most research peptide suppliers cannot produce this correctly",
    "Cardiac disease context: the HARP trial evidence is in HFpEF; cardiac conditions with active medical management require cardiologist involvement before adding an investigational mitochondrial compound",
    "Expectation calibration: the cardiolipin mechanism is unusually well-characterized for an investigational compound; the jump to healthy adult athletic enhancement is a significant extrapolation from Phase 2 cardiac and genetic disease data",
    "No pharmaceutical-grade SS-31 outside trials: community access is through research peptide suppliers with variable quality; chiral verification is the minimum quality gate",
    "HARP trial context: Phase 2 showed improved PCr/ATP ratio (mitochondrial energy production) in HFpEF; this is a surrogate endpoint, not a clinical outcome — interpret the evidence accordingly",
    "Stacking with NAD+ precursors: NMN/NR and SS-31 target different aspects of mitochondrial function; they are mechanistically complementary with no known adverse interaction",
  ],
  redFlags: [
    "Active cardiac disease (heart failure, recent MI, significant arrhythmia) without cardiologist oversight — do not use an investigational mitochondrial compound without physician involvement",
    "Product without chiral LC-MS confirmation — D-amino acid verification cannot be done with standard HPLC; L-amino acid substitution produces an inactive peptide",
    "Progressive injection site reactions worsening over multiple uses — stop and evaluate",
    "Worsening cardiac symptoms during use — stop and seek evaluation immediately",
  ],
};

const SUPPORT_IGF1_LR3: SupportPack = {
  id: "igf-1-lr3",
  title: "Extended half-life means the hypoglycemia window is 24 hours — not an hour",
  subtitle: "IGFBP-resistant IGF-1 analog — high-risk compound requiring specific protocols",
  bullets: [
    "24-hour hypoglycemia window: unlike native IGF-1, LR3's 20-30 hour half-life means the glucose-lowering effect persists overnight and the next day — eat carbohydrates with every meal on injection day and the following day",
    "Eat before injection, always: a carbohydrate-containing meal 20-30 minutes before injection; injecting fasted with IGF-1 LR3 is dangerous given the extended duration",
    "Fast-acting glucose accessible: glucose gel, tablets, or juice within reach during the injection window and for 24 hours post-injection — not optional",
    "Cancer history is a hard stop: IGF-1R is a validated cancer treatment target; any personal cancer history means no IGF-1 LR3, ever, under any circumstances",
    "No insulin same day: insulin + IGF-1 LR3 produces additive, potentially severe hypoglycemia; the 24-hour LR3 half-life means this window extends through the next day",
    "No alcohol 24h post-injection: alcohol impairs gluconeogenesis (the liver's response to falling glucose) and masks hypoglycemia symptoms; the combination significantly amplifies risk",
    "Source quality is safety-critical: concentration errors directly determine hypoglycemia severity; a 2× concentration error doubles the hypoglycemic dose; get a third-party CoA with concentration verification",
  ],
  redFlags: [
    "Any cancer history — absolute permanent hard stop; no exceptions; IGF-1R is a cancer treatment target",
    "Confusion, impaired coordination, or loss of consciousness — emergency services immediately; do not wait for symptoms to self-resolve",
    "Diabetes or significant insulin resistance — contraindicated; the additive hypoglycemia risk is pharmacological, not avoidable with careful dosing",
    "Severe hypoglycemia symptoms not responding to fast-acting glucose within 15 minutes — emergency services",
    "Product without verifiable CoA including concentration verification — do not inject; wrong concentration is a direct path to severe hypoglycemia",
  ],
};

function isMazdutideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "mazdutide";
}

function isMelanoranIFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "melanotan-i";
}

function isMotilinFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "motilin";
}

function isNesiritideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "nesiritide";
}

const SUPPORT_MAZDUTIDE: SupportPack = {
  id: "mazdutide",
  title: "Mazdutide is a dual GLP-1R/GCGR agonist in Phase 3 in China \u2014 not FDA-approved; GLP-1 class safety rules apply",
  subtitle: "OXM3; GLP-1/glucagon dual agonism; ~10-13% weight loss; NAFLD benefit signal; no global approval",
  bullets: [
    "GLP-1 class safety framework fully applies: thyroid C-cell warning (personal/family history of medullary thyroid carcinoma or MEN2 is a contraindication), pancreatitis screen, insulin/sulfonylurea dose reduction if combining",
    "GI tolerability is the primary management challenge: nausea, vomiting, diarrhea are common \u2014 especially at initiation; start low, titrate slowly, manage with smaller meals and avoiding high-fat/high-sugar foods",
    "Glucagon receptor component adds NAFLD/MASH benefit: the GCGR agonism drives hepatic fat reduction independent of weight loss; liver fat reduction is a key differentiator vs GLP-1-only drugs",
    "Not FDA-approved: Phase 3 data is from Chinese trials; a global regulatory pathway has not been established; this is an investigational compound with no internationally approved prescribing information",
    "Hypoglycemia risk is low with monotherapy (similar to GLP-1 drugs alone): the glucagon receptor component theoretically raises glucose, partially offsetting GLP-1-mediated lowering; real-world hypoglycemia risk with mazdutide alone is low but increases if combined with insulin or secretagogues",
    "Source quality: no pharmaceutical-grade mazdutide is available for community access; research peptide suppliers do not have the QC infrastructure for this compound",
  ],
  redFlags: [
    "Personal or family history of medullary thyroid carcinoma or MEN2 \u2014 class contraindication; do not start",
    "Pancreatitis symptoms (severe upper abdominal pain radiating to back) \u2014 stop immediately and seek emergency evaluation",
    "On insulin or secretagogues without dose adjustment at initiation \u2014 hypoglycemia risk increases significantly with combination use",
    "Significant nausea/vomiting preventing fluid intake \u2014 stop and reassess; dehydration risk",
  ],
};

const SUPPORT_MELANOTAN_I: SupportPack = {
  id: "melanotan-i",
  title: "MC1R agonism requires melanoma surveillance \u2014 every 6 months dermatology check is not optional",
  subtitle: "Afamelanotide analogue; MC1R selectivity; EPP FDA-approved context; melanoma risk monitoring",
  bullets: [
    "Melanoma surveillance is mandatory: MC1R is a known melanoma risk-associated receptor; anyone using MC1R agonist peptides (melanotan-I, melanotan-II, afamelanotide) must have a baseline full-body skin examination by a dermatologist and follow-up every 6 months; new or changing nevi require immediate evaluation",
    "Melanotan-I vs melanotan-II: MT-I is more MC1R-selective with less MC3R/MC4R activation \u2014 fewer sexual side effects and less nausea compared to MT-II; the MC1R melanoma surveillance concern is the same for both",
    "Afamelanotide (Scenesse) is the pharmaceutical-grade MT-I: FDA-approved for erythropoietic protoporphyria (EPP) as a subcutaneous implant; administered by clinicians; community MT-I injection is outside this framework and lacks the quality control of the approved product",
    "Nausea and flushing: common at initiation; typically dose-dependent and transient; starting at low doses reduces tolerability issues",
    "Skin changes: increased pigmentation (including new and existing nevi) is expected; this also means changes in existing moles that require evaluation against baseline \u2014 photography of existing nevi before starting is a practical tool",
    "No systemic enhancement use case: MT-I does not have meaningful effects outside MC1R-mediated pigmentation and photoprotection; community injection for libido or body composition has no mechanism-based rationale for MT-I specifically",
  ],
  redFlags: [
    "Personal or family history of melanoma \u2014 MC1R agonism in the context of melanoma history requires oncology clearance before use",
    "New or rapidly changing skin lesion during use \u2014 stop and seek immediate dermatology evaluation; do not wait for a scheduled appointment",
    "No baseline skin examination before starting \u2014 without a baseline, changes cannot be tracked; get a dermatology exam before first injection",
    "Using community-sourced MT-I injection without purity verification \u2014 no third-party CoA means no quality assurance",
  ],
};

const SUPPORT_MOTILIN: SupportPack = {
  id: "motilin",
  title: "Motilin\u2019s clinical story is in its receptor agonists \u2014 not in exogenous motilin injection",
  subtitle: "Endogenous GI motility peptide; 90-second half-life; erythromycin as MLNR agonist; no therapeutic formulation",
  bullets: [
    "Understand the pharmacology before use: native motilin has a very short plasma half-life (similar to other endogenous GI peptides); subcutaneous injection does not achieve sustained receptor activation; the compound works as an endogenous hormone in pulsatile cyclic bursts \u2014 not as an injectable therapeutic",
    "Erythromycin is the clinically-used MLNR agonist: erythromycin at sub-antimicrobial doses (1-3 mg/kg IV, 250 mg oral) acts as a motilin receptor agonist and accelerates gastric emptying; it is the only widely-used MLNR agonist and requires physician management for gastroparesis indications",
    "Synthetic MLNR agonists failed: camicinal (GSK962040) and other small-molecule MLNR agonists went through clinical trials for gastroparesis and failed to show durable efficacy \u2014 motilin receptor agonism alone does not reliably translate to clinical gastroparesis benefit",
    "No community or enhancement use case: there is no evidence base for exogenous motilin injection producing any benefit; the endogenous physiology is well-understood, but that does not translate to therapeutic benefit from self-administration",
    "If you have gastroparesis symptoms: this requires GI evaluation; erythromycin, metoclopramide, or domperidone are the pharmacological options \u2014 under physician guidance; not exogenous motilin",
    "Ghrelin relationship: motilin and ghrelin receptors (GHSR) are related \u2014 ghrelin itself has some motilin-like prokinetic effects; ghrelin agonist research has been another approach to gastroparesis that has also had mixed results",
  ],
  redFlags: [
    "Gastroparesis symptoms (bloating, early satiety, nausea, vomiting after meals) \u2014 this requires GI evaluation, not self-treatment with motilin",
    "Using exogenous motilin expecting prokinetic GI effects \u2014 the pharmacokinetics do not support sustained receptor activation from injection; the mechanism does not translate to a therapeutic application",
    "On erythromycin or another prokinetic \u2014 adding an uncharacterized exogenous motilin creates an unstudied interaction with a drug that already activates MLNR",
  ],
};

const SUPPORT_NESIRITIDE: SupportPack = {
  id: "nesiritide",
  title: "Nesiritide is a hospital IV drug for acute heart failure \u2014 hypotension is the primary risk in monitored clinical settings",
  subtitle: "Recombinant human BNP; Natrecor; ASCEND-HF demonstrated modest dyspnea benefit, no mortality benefit; IV hospital only",
  bullets: [
    "Hospital IV medication only: nesiritide is administered as a continuous IV infusion in hospital settings for acutely decompensated heart failure (ADHF); it requires hemodynamic monitoring, blood pressure management, and trained clinical staff \u2014 not a community peptide",
    "Hypotension is the primary risk: nesiritide causes dose-dependent vasodilation and blood pressure reduction; symptomatic hypotension occurred in 7.1% of patients in ASCEND-HF; blood pressure monitoring is continuous during infusion",
    "ASCEND-HF context: the 2011 NEJM trial showed modest improvement in dyspnea at 6 and 24 hours but no reduction in 30-day mortality or rehospitalization; nesiritide\u2019s clinical use has declined since this trial in favor of alternatives",
    "Renal effects require monitoring: earlier concerns about nesiritide-induced renal injury led to a safety moratorium; ASCEND-HF found no significant worsening of renal function vs placebo, but urine output and creatinine require monitoring during infusion",
    "Drug compatibility in IV: nesiritide is incompatible with several common drugs in the same IV line \u2014 heparin, furosemide, enalaprilat, hydralazine, and regular insulin; separate IV access or line flushing is required",
    "BNP as biomarker vs therapy: serum BNP (or NT-proBNP) is used as a diagnostic and prognostic marker in heart failure; nesiritide provides exogenous BNP with vasodilatory and natriuretic effects \u2014 this is a clinical treatment, not a biomarker supplementation",
  ],
  redFlags: [
    "Symptomatic hypotension (dizziness, lightheadedness, syncope) during infusion \u2014 reduce rate or stop; do not continue at current dose",
    "Cardiogenic shock or systolic BP below 90 mmHg \u2014 absolute contraindication; nesiritide contraindicated in the absence of adequate cardiac output",
    "Significant worsening of renal function (rising creatinine, reduced urine output) during infusion \u2014 stop and reassess; discuss with cardiologist",
    "Any use outside hospital monitored setting \u2014 not appropriate; the compound requires continuous hemodynamic monitoring",
  ],
};

function isNeuropeptideSFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "neuropeptide-s";
}

function isOctreotideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "octreotide";
}

function isPegMgfFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "peg-mgf";
}

function isPentagastrinFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "pentagastrin";
}

function isPlecanatideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "plecanatide";
}

function isProlactinReleasingPeptideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "prolactin-releasing-peptide";
}

function isSecretinFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "secretin";
}

function isShlp2Family(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "shlp-2";
}

const SUPPORT_NEUROPEPTIDE_S: SupportPack = {
  id: "neuropeptide-s",
  title: "No human safety data, no established CNS delivery route \u2014 the absence of data is the primary risk",
  subtitle: "NPSR1 agonist neuropeptide; completely uncharacterized in humans; anxiolytic and wakefulness claims animal-only",
  bullets: [
    "No human clinical trials exist: NPS has zero published human pharmacokinetic studies, zero Phase 1 safety trials, and zero established safe doses in humans; this is not a compound with a risk-benefit profile to weigh \u2014 the risk side is unknown and the benefit side is unestablished",
    "CNS delivery from subcutaneous injection is not established: NPS is a 20-amino-acid peptide; peripheral injection faces significant blood-brain barrier challenges; the animal model effects are primarily from intracerebroventricular (ICV) delivery directly into the brain; whether subcutaneous injection achieves meaningful CNS concentrations is unknown",
    "Paradoxical anxiogenic potential: NPS produces dose-dependent and brain-region-dependent effects in animals \u2014 anxiolytic at some doses, anxiogenic at others; without human data, predicting which direction exogenous NPS produces is impossible",
    "NPSR1 genetic variant risk: NPSR1 polymorphisms affect receptor sensitivity; individuals with high-sensitivity variants and anxiety vulnerability may be at particular risk for paradoxical anxiogenic effects",
    "If anxiolytic peptide is the goal: Selank has Russian clinical evidence and community history; if wakefulness is the goal, modafinil has extensive human safety data; NPS competes with neither on any dimension relevant to a real decision",
    "Overlapping CNS medication screen: if on benzodiazepines, SSRIs, SNRIs, or stimulants, adding NPS creates an entirely uncharacterized CNS interaction profile on top of an already uncharacterized compound",
  ],
  redFlags: [
    "On anxiolytic medications (benzodiazepines, SSRIs, buspirone) \u2014 completely uncharacterized interaction; stop and do not combine",
    "History of panic disorder or anxiety disorder \u2014 NPSR1 genetic association with panic; specific risk of paradoxical anxiogenic effect",
    "Adolescent or pregnant \u2014 hard stop; uncharacterized CNS compound",
    "On stimulants for wakefulness \u2014 additive CNS arousal; uncharacterized combination",
  ],
};

const SUPPORT_OCTREOTIDE: SupportPack = {
  id: "octreotide",
  title: "Gallbladder surveillance and glucose monitoring are mandatory for anyone on long-term octreotide",
  subtitle: "Sandostatin; SSTR2/3/5-selective somatostatin analogue; acromegaly/carcinoid/NET indications; physician-managed only",
  bullets: [
    "FDA-approved for acromegaly, carcinoid syndrome (diarrhea/flushing), VIPomas, and variceal GI bleeding \u2014 these are specialist-managed indications requiring physician oversight and monitoring; not community peptide territory",
    "Gallbladder surveillance is mandatory: somatostatin analogues impair gallbladder motility; gallstones develop in 15-30% of patients with chronic octreotide use; baseline ultrasound and periodic surveillance are clinical standards",
    "Glucose monitoring is required: octreotide inhibits both insulin and glucagon; the net glucose effect is variable \u2014 hypoglycemia can occur acutely (more insulin suppression), glucose intolerance with chronic use (reduced glucagon counter-regulation); fasting glucose baseline before starting and periodic monitoring",
    "Bradycardia and cardiac conduction: somatostatin analogues can cause bradycardia and conduction changes via SST2 receptors; baseline EKG is appropriate for anyone with pre-existing cardiac conditions or bradycardia risk factors",
    "Cyclosporine interaction: octreotide reduces cyclosporine bioavailability significantly by inhibiting GI absorption; dose adjustment and monitoring required if combining",
    "Comparison to lanreotide: both are long-acting somatostatin analogues with similar clinical profiles; octreotide LAR (microsphere IM injection, clinic-administered) vs lanreotide Depot (prefilled SQ syringe, self-injectable after training) \u2014 choice is often practical",
  ],
  redFlags: [
    "Severe right upper quadrant pain \u2014 possible gallstone or acute cholecystitis; stop and seek evaluation urgently",
    "Symptomatic hypoglycemia \u2014 fast-acting carbohydrates immediately; normal glucagon response may be impaired; stop and consult",
    "Bradycardia with symptoms (syncope, pre-syncope, exercise intolerance) \u2014 stop and seek cardiac evaluation",
    "On cyclosporine without dose adjustment and monitoring plan \u2014 octreotide significantly reduces cyclosporine levels; organ transplant recipients are at rejection risk",
  ],
};

const SUPPORT_PEG_MGF: SupportPack = {
  id: "peg-mgf",
  title: "PEG-MGF activates the IGF-1 axis \u2014 cancer history is an absolute hard stop, identical to IGF-1 LR3",
  subtitle: "PEGylated mechano growth factor; IGF-1 splice variant; preclinical only; oncogenesis concern; PEG accumulation risk",
  bullets: [
    "Cancer history is an absolute hard stop: PEG-MGF signals through the IGF-1 axis; IGF-1 receptor (IGF-1R) is a validated oncology target; any personal cancer history means no PEG-MGF, ever, under any circumstances \u2014 same rule as IGF-1 LR3",
    "No human clinical trials exist: PEG-MGF is entirely preclinical; no Phase 1 safety data, no established human dose, no pharmacokinetic data in humans; the community use is a significant extrapolation from cell and animal models",
    "PEG accumulation is an uncharacterized concern: repeated PEGylated compound dosing can lead to PEG (polyethylene glycol) accumulation in tissues and anti-PEG antibody formation; the long-term consequences of PEG accumulation from research peptide injection are not studied",
    "IGF-1 axis interaction audit: if on GH secretagogues (CJC-1295, ipamorelin, MK-677), adding PEG-MGF creates a second IGF-1 axis input; cumulative IGF-1 axis activation amplifies the oncogenesis concern and the hypoglycemia concern",
    "Source quality is critical: no pharmaceutical-grade PEG-MGF exists; community access is through research peptide suppliers with variable quality; purity, concentration, and PEG conjugation integrity are unverifiable without mass spectrometry",
    "The muscle repair narrative is extrapolated from MGF biology in animal models: humans do produce MGF in mechanically loaded muscle; whether exogenous PEG-MGF injection on top of exercise adds meaningful repair benefit beyond what training alone produces is not established",
  ],
  redFlags: [
    "Any cancer history \u2014 absolute permanent hard stop; IGF-1 axis activation is a cancer risk factor; no exceptions",
    "On insulin or IGF-1 LR3 \u2014 additive IGF-1 pathway activation and hypoglycemia risk; do not combine without physician oversight",
    "Product without verifiable third-party CoA including PEGylation confirmation \u2014 do not inject; wrong concentration or incomplete PEGylation is not detectable visually",
    "Pregnant or breastfeeding \u2014 hard stop; IGF-1 axis activation in pregnancy is contraindicated",
  ],
};

const SUPPORT_PENTAGASTRIN: SupportPack = {
  id: "pentagastrin",
  title: "Historical diagnostic tool \u2014 largely replaced by RET genetic testing; no therapeutic or community use case",
  subtitle: "CCK-B/gastrin receptor agonist; gastric acid stimulation test; calcitonin MTC provocative test; off-market in US",
  bullets: [
    "Pentagastrin is a diagnostic agent, not a therapeutic compound: it was used as a provocative test to measure maximal gastric acid output and to stimulate calcitonin release for early MTC detection in MEN2 families; it has no therapeutic application",
    "Largely replaced by genetic testing: RET proto-oncogene mutation testing now identifies MEN2 mutation carriers before MTC develops, making repeated calcitonin provocative testing unnecessary in most cases; calcium gluconate stimulation is preferred for biochemical testing where needed",
    "Off-market in the US: pentagastrin has been removed from the US market; it is not commercially available in many countries; obtaining it outside a clinical research context is impractical",
    "GI adverse effects are expected in diagnostic use: nausea, GI cramping, flushing, and headache are common with pentagastrin administration; these are managed in supervised diagnostic settings and are not a basis for community self-administration",
    "Educational context: pentagastrin demonstrates CCK-B/gastrin receptor pharmacology and the C-terminal tetrapeptide (-Trp-Met-Asp-Phe-NH2) active sequence; understanding this explains the mechanism of histamine-2 receptor antagonist competition for gastric acid control",
    "No community use case: this entry exists for pharmacological completeness in a peptide database; there is no community or enhancement use case for pentagastrin",
  ],
};

const SUPPORT_PLECANATIDE: SupportPack = {
  id: "plecanatide",
  title: "Same pediatric black box warning as linaclotide \u2014 absolute contraindication under 6; diarrhea is the adult management challenge",
  subtitle: "Trulance; GC-C agonist; uroguanylin analogue; pH-dependent activation; CIC and IBS-C indications",
  bullets: [
    "FDA-approved for chronic idiopathic constipation (CIC) and IBS with constipation (IBS-C) \u2014 Phase 3 RCT support for both; mechanism well-characterized (GC-C \u2192 cGMP \u2192 chloride and bicarbonate secretion \u2192 intestinal fluid and transit)",
    "Black box warning: contraindicated in patients under 6 years of age due to risk of serious dehydrating diarrhea; avoid in patients 6-17 (safety not established); absolute contraindication",
    "Diarrhea management: the most common adverse effect; take on an empty stomach 30 minutes before the first meal; if severe diarrhea develops, discontinue and contact physician",
    "pH-dependent duodenal activation (vs linaclotide): plecanatide is a uroguanylin analogue with GC-C activation preferentially in the acidic duodenal environment; this is mechanistically distinct from linaclotide (guanylin analogue, non-pH-gated); may offer modestly different tolerability in some patients",
    "Negligible systemic absorption: plecanatide works locally in the GI tract; systemic drug interactions are not expected; does not affect hepatic or renal drug metabolism",
    "Bowel obstruction contraindication: if mechanical obstruction is suspected, plecanatide is contraindicated; rule out obstruction before starting in patients with severe constipation and significant abdominal pain",
  ],
  redFlags: [
    "Child under 6 \u2014 absolute contraindication; black box warning; do not administer",
    "Severe or bloody diarrhea \u2014 stop immediately; dehydration and electrolyte loss risk; seek medical evaluation",
    "Possible bowel obstruction (severe cramping, inability to pass stool or gas, abdominal distension) \u2014 stop and seek emergency evaluation",
    "Worsening abdominal pain without bowel habit improvement \u2014 rule out alternative GI pathology",
  ],
};

const SUPPORT_PROLACTIN_RELEASING_PEPTIDE: SupportPack = {
  id: "prolactin-releasing-peptide",
  title: "PrRP\u2019s clinical name is misleading \u2014 its primary role is appetite suppression via GPR10, not prolactin regulation",
  subtitle: "GPR10 agonist; energy balance neuropeptide; GLP-1/PrRP conjugate pipeline; no FDA approval; research compound",
  bullets: [
    "The naming is misleading: prolactin-releasing peptide was named when first isolated, but GPR10-mediated appetite suppression and energy balance is now understood as its primary biological role; prolactin regulation is a secondary or indirect effect, not the main pharmacological story",
    "GLP-1/PrRP conjugate development: pharmaceutical companies (Novo Nordisk and others) are developing dual GLP-1R/GPR10 agonist conjugates for obesity \u2014 this is the most clinically significant development in PrRP pharmacology; exogenous PrRP alone is not the drug being developed",
    "No FDA approval or clinical evidence for therapeutic use: PrRP has no approved clinical applications; community injection of PrRP does not have evidence support; this is an early-stage research compound",
    "Uncertain prolactin effects: despite the naming, exogenous PrRP can affect prolactin release in some contexts; individuals with prolactinoma, hyperprolactinemia, or on dopamine agonists for prolactin management should be cautious about adding any compound with potential prolactin interaction",
    "Research compound quality issues: no pharmaceutical-grade PrRP exists for community access; purity and potency verification is not possible through standard community channels",
    "No community use case with an established rationale: the appetite suppression mechanism is real but has not been demonstrated to produce meaningful weight loss in any human study from exogenous PrRP injection",
  ],
  redFlags: [
    "Hyperprolactinemia or prolactinoma under treatment \u2014 uncertain prolactin effects; do not add uncharacterized PrRP without endocrinologist guidance",
    "On dopamine agonists (cabergoline, bromocriptine) for prolactin management \u2014 possible pharmacodynamic interaction; do not combine without physician oversight",
    "Expecting GLP-1-like weight loss from PrRP injection \u2014 the GLP-1/PrRP conjugate effect is in the combined molecule; standalone PrRP injection has not demonstrated meaningful human weight loss",
    "On antipsychotics that increase prolactin \u2014 prolactin pathway already affected; adding uncharacterized PrRP creates unstudied interaction",
  ],
};

const SUPPORT_SECRETIN: SupportPack = {
  id: "secretin",
  title: "Secretin is a diagnostic agent \u2014 the autism treatment claim has been definitively refuted by multiple RCTs and a Cochrane review",
  subtitle: "ChiRhoStim/SecreFlo; GI diagnostic peptide; pancreatic function testing; autism claim not supported",
  bullets: [
    "Autism claim is definitively refuted: multiple randomized controlled trials and a Cochrane systematic review found no benefit from secretin for autism spectrum disorder; the autism use case was driven by an anecdotal case series that did not replicate in controlled settings; this is not a contested area of research",
    "FDA-approved as a diagnostic agent only: ChiRhoStim (porcine secretin) and SecreFlo (synthetic human secretin) are approved for gastrinoma (Zollinger-Ellison syndrome) evaluation and pancreatic function testing; these are specific, supervised diagnostic procedures",
    "Mechanism is GI-specific: secretin from S cells in the duodenum stimulates pancreatic bicarbonate secretion, reduces gastric acid, and regulates GI motility via secretin receptors; these are the mechanisms that make it a useful GI diagnostic tool, not a systemic or CNS therapeutic",
    "Anticholinergic interaction in diagnostic testing: anticholinergic drugs reduce pancreatic response to secretin in diagnostic testing; this is a pharmacodynamic interaction relevant to diagnostic test validity, not a safety concern in community use",
    "Short duration of action: secretin has a short plasma half-life; its diagnostic utility depends on this (defined stimulation window for measurement); effects do not persist after testing",
    "No therapeutic or enhancement use case: there is no evidence base and no pharmacological rationale for using secretin as a therapeutic or enhancement compound",
  ],
};

const SUPPORT_SHLP2: SupportPack = {
  id: "shlp-2",
  title: "Novel mitochondrial biology but entirely preclinical \u2014 no human trials, no established safety data",
  subtitle: "Small Humanin-like Peptide 2; mtDNA 16S rRNA smORF; MDP family; cytoprotective and insulin-sensitizing in preclinical models",
  bullets: [
    "No human clinical trials: SHLP-2 has never been tested in a human clinical trial; there are no Phase 1 safety data, no established pharmacokinetics in humans, and no known safe dose range for exogenous SHLP-2",
    "The circulating levels correlation with longevity markers is observational: higher endogenous SHLP-2 is associated with healthier aging in some cohort studies, but correlation does not establish that injecting exogenous SHLP-2 produces the same effect \u2014 SHLP-2 may be a marker of good mitochondrial health, not a cause",
    "Insulin sensitization concern: SHLP-2 shows insulin-sensitizing effects in cell and animal models; if on insulin, metformin, or other glucose-lowering agents, the theoretical additive effect could cause hypoglycemia; monitor glucose if adding SHLP-2 and using antidiabetic medications",
    "Stacking with other MDPs: SHLP-2, humanin, and MOTS-c are all MDP family members from the mitochondrial genome; their interaction profiles when combined have not been studied; combining multiple MDPs is not supported by any evidence",
    "Source quality: no pharmaceutical manufacturer produces SHLP-2; research peptide vendors are the only source; purity and identity verification is not possible through standard channels",
    "MDP family context: SHLP-2 is one of at least 7 mitochondrial-derived peptides now identified (humanin, MOTS-c, SHLP-1 through SHLP-6); the family is genuinely novel biology; the jump from interesting science to safe, effective self-administration is not yet bridged for any of them",
  ],
  redFlags: [
    "On insulin or glucose-lowering medications \u2014 putative insulin sensitization could be additive; monitor glucose and discuss with prescribing physician",
    "Active cancer or cancer history \u2014 mitochondrial metabolic effects; discuss with oncologist before using any uncharacterized mitochondrial compound",
    "Expecting to verify product quality through standard means \u2014 identity and purity of SHLP-2 cannot be confirmed without mass spectrometry; standard visual or HPLC testing is insufficient",
  ],
};

function isEndothelin1Family(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "endothelin-1";
}

function isEptifibatideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "eptifibatide";
}

function isLanreotideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "lanreotide";
}

function isLinaclotideFamily(entity: EntityLike): boolean {
  const s = String(entity?.slug || entity?.peptide?.slug || "").toLowerCase();
  return s === "linaclotide";
}

const SUPPORT_ENDOTHELIN_1: SupportPack = {
  id: "endothelin-1",
  title: "ET-1 is a potent vasoconstrictor \u2014 the clinical drugs block its receptor, not supplement it",
  subtitle: "Endogenous vasoconstrictive peptide; ERA drugs (bosentan, macitentan, ambrisentan) are the PAH therapy; no community injection rationale",
  bullets: [
    "ET-1 mechanism: one of the most potent vasoconstrictors known \u2014 activates ETA and ETB receptors on vascular smooth muscle; exogenous injection would cause acute vasoconstriction and blood pressure elevation",
    "The clinical drugs go the opposite direction: endothelin receptor antagonists (ERAs) \u2014 bosentan (Tracleer), ambrisentan (Letairis), macitentan (Opsumit) \u2014 are FDA-approved for pulmonary arterial hypertension by blocking the ET pathway",
    "ERA hepatotoxicity monitoring: bosentan requires monthly LFT monitoring (hepatotoxicity is documented); ambrisentan has lower hepatic risk; macitentan has the most favorable tolerability profile",
    "ERA teratogenicity: all ERAs are Pregnancy Category X \u2014 absolutely contraindicated in pregnancy; REMS programs require monthly pregnancy testing and two forms of contraception for women of childbearing potential",
    "ERA drug interactions: bosentan is a strong CYP3A4 and CYP2C9 inducer \u2014 reduces levels of many drugs including oral contraceptives, cyclosporine, and simvastatin; interaction review is mandatory before starting",
    "No community or enhancement injection use case for ET-1 \u2014 understanding ET-1 pharmacology matters for interpreting PAH therapy, not for self-administration",
  ],
};

const SUPPORT_EPTIFIBATIDE: SupportPack = {
  id: "eptifibatide",
  title: "Eptifibatide is a hospital IV GP IIb/IIIa inhibitor for ACS and PCI \u2014 not a community peptide",
  subtitle: "Integrilin; cyclic heptapeptide; GP IIb/IIIa blockade; bleeding is the primary risk; no reversal agent",
  bullets: [
    "FDA-approved for acute coronary syndromes (ACS) and percutaneous coronary intervention (PCI) \u2014 administered as IV bolus + infusion in hospital cardiac catheterization settings only",
    "Mechanism: eptifibatide blocks the GP IIb/IIIa receptor \u2014 the final common pathway of platelet aggregation \u2014 by mimicking the Arg-Gly-Asp (RGD) sequence that fibrinogen uses to cross-link platelets; this prevents thrombus propagation",
    "Bleeding is the dominant risk: major bleeding occurs in 1-10% of patients in ACS/PCI trials; eptifibatide significantly increases bleeding versus heparin alone; no specific reversal agent exists \u2014 manage by stopping the infusion",
    "Renal dosing is critical: eptifibatide is renally cleared; dose reduction is required at creatinine clearance 25-50 mL/min; contraindicated below 25 mL/min due to accumulation and hemorrhage risk",
    "Thrombocytopenia monitoring: acute profound thrombocytopenia (platelet count <100K within hours of administration) can occur with all GP IIb/IIIa inhibitors; platelet monitoring is mandatory during infusion",
    "Educational pharmacology context: eptifibatide demonstrates RGD-mimetic cyclic peptide design \u2014 the scientific interest for research education; the compound has no community self-administration use case",
  ],
};

const SUPPORT_LANREOTIDE: SupportPack = {
  id: "lanreotide",
  title: "Lanreotide is a long-acting somatostatin analogue with month-scale depot duration \u2014 gallbladder and glucose monitoring are mandatory",
  subtitle: "Somatuline Depot; acromegaly and NET indications; physician-managed only; gallstone surveillance required",
  bullets: [
    "FDA-approved for acromegaly, pancreatic/intestinal NETs, and carcinoid diarrhea/flushing \u2014 administered as a deep subcutaneous depot injection every 4-8 weeks under physician management; not a self-administered community compound",
    "Gallbladder surveillance is mandatory: somatostatin analogues impair gallbladder motility; gallstones develop in 15-30% of patients with chronic use; baseline ultrasound before starting and periodic monitoring are clinical standard practice",
    "Glucose monitoring: lanreotide suppresses both insulin and glucagon; hypoglycemia can occur acutely (insulin suppressed more than glucagon) and glucose intolerance can develop with chronic use (net GH reduction helps; somatostatin effect on glucagon varies); monitor fasting glucose at baseline and periodically",
    "Cardiac effects: bradycardia and conduction changes can develop via SST2 receptor activity; baseline EKG is appropriate for patients with pre-existing cardiac conditions or those with bradycardia risk factors",
    "Octreotide vs lanreotide comparison: Somatuline Depot (lanreotide) and Sandostatin LAR (octreotide) have similar efficacy for acromegaly and NETs; lanreotide is a prefilled deep-SQ syringe; octreotide LAR is a IM microsphere requiring clinic administration; similar tolerability profiles",
    "Physician oversight is mandatory: these are specialist-prescribed drugs for confirmed acromegaly or NETs; off-label or performance use without physician oversight creates unmonitored gallstone, glucose, and cardiac risks over the depot duration",
  ],
  redFlags: [
    "Severe right upper quadrant pain (possible gallstone or cholecystitis) \u2014 stop and seek evaluation; do not wait for scheduled appointment",
    "Symptomatic hypoglycemia \u2014 normal glucagon counter-regulation may be impaired; fast-acting carbohydrates immediately; stop and consult physician",
    "New or worsening bradycardia symptoms (lightheadedness, syncope, exercise intolerance) \u2014 stop and seek cardiac evaluation",
    "Significant worsening of GI symptoms (diarrhea, steatorrhea) \u2014 exocrine pancreatic insufficiency is a known effect; enzyme supplementation may be needed",
  ],
};

const SUPPORT_LINACLOTIDE: SupportPack = {
  id: "linaclotide",
  title: "Linaclotide has a black box warning for pediatric use \u2014 absolute contraindication for children under 6",
  subtitle: "Linzess; GC-C agonist; CIC and IBS-C; diarrhea management is the primary tolerability challenge",
  bullets: [
    "FDA-approved for chronic idiopathic constipation (CIC) and IBS with constipation (IBS-C) \u2014 multiple Phase 3 RCTs support both indications; mechanism is well-characterized (GC-C \u2192 cGMP \u2192 chloride secretion \u2192 intestinal transit)",
    "Black box warning: contraindicated in patients under 6 years of age due to risk of serious dehydrating diarrhea; avoid in patients 6-17 years (safety not established); this is absolute, not a relative caution",
    "Diarrhea management: the most common adverse effect (16-20% in clinical trials); take on an empty stomach at least 30 minutes before the first meal of the day; if diarrhea is severe or bloody, discontinue and contact physician",
    "Mechanical bowel obstruction screen: if mechanical obstruction is present or suspected, linaclotide is contraindicated; this should be ruled out clinically before starting in patients with severe constipation and abdominal pain",
    "Drug interactions are limited: linaclotide has negligible systemic absorption; meaningful pharmacokinetic interactions with systemic drugs are not expected; it does not affect hepatic or renal drug metabolism",
    "Linaclotide vs plecanatide comparison: both are GC-C agonists with similar efficacy; linaclotide (guanylin analogue) activates GC-C throughout the intestine; plecanatide (uroguanylin analogue) has pH-dependent duodenal preferential activation; some patients tolerate one better than the other if diarrhea is limiting",
  ],
  redFlags: [
    "Child under 6 years \u2014 absolute contraindication; black box warning; do not administer",
    "Severe or bloody diarrhea \u2014 stop immediately; dehydration risk; seek medical evaluation",
    "Possible bowel obstruction symptoms (severe cramping, inability to pass stool or gas, abdominal distension) \u2014 stop and seek emergency evaluation",
    "Significant worsening of abdominal pain without improvement in bowel habits \u2014 rule out alternative GI diagnoses",
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
  if (isEpitalonFamily(entity)) return SUPPORT_EPITALON;
  if (isGlutathioneFamily(entity)) return SUPPORT_GLUTATHIONE;
  if (isLl37Family(entity)) return SUPPORT_LL37;
  if (isCagrilintideFamily(entity)) return SUPPORT_CAGRILINTIDE;
  if (isThymosinBeta4Family(entity)) return SUPPORT_THYMOSIN_BETA4;
  if (isFiveAmino1MQFamily(entity)) return SUPPORT_FIVE_AMINO_1MQ;
  if (isKisspeptinFamily(entity)) return SUPPORT_KISSPEPTIN;
  if (isGonadorelinFamily(entity)) return SUPPORT_GONADORELIN;
  if (isFollistatin344Family(entity)) return SUPPORT_FOLLISTATIN_344;
  if (isHumaninFamily(entity)) return SUPPORT_HUMANIN;
  if (isDsipFamily(entity)) return SUPPORT_DSIP;
  if (isPramlintideFamily(entity)) return SUPPORT_PRAMLINTIDE;
  if (isHcgFamily(entity)) return SUPPORT_HCG;
  if (isSS31Family(entity)) return SUPPORT_SS31;
  if (isIgf1Lr3Family(entity)) return SUPPORT_IGF1_LR3;
  if (isSomatostatinFamily(entity)) return SUPPORT_SOMATOSTATIN;
  if (isBpc157ArginateFamily(entity)) return SUPPORT_BPC157_ARGINATE;
  if (isThymosinBeta4FullFamily(entity)) return SUPPORT_THYMOSIN_BETA4_FULL;
  if (isCjc1295DacFamily(entity)) return SUPPORT_CJC1295_DAC;
  if (isVasopressinFamily(entity)) return SUPPORT_VASOPRESSIN;
  if (isTriptorelinFamily(entity)) return SUPPORT_TRIPTORELIN;
  if (isKpvFamily(entity)) return SUPPORT_KPV;
  if (isAnpFamily(entity)) return SUPPORT_ANP;
  if (isLeuprolideFamily(entity)) return SUPPORT_LEUPROLIDE;
  if (isDesmopressinFamily(entity)) return SUPPORT_DESMOPRESSIN;
  if (isCalcitoninFamily(entity)) return SUPPORT_CALCITONIN;
  if (isGlucagonFamily(entity)) return SUPPORT_GLUCAGON;
  if (isBradykininFamily(entity)) return SUPPORT_BRADYKININ;
  if (isBrainNatriureticPeptideFamily(entity)) return SUPPORT_BRAIN_NATRIURETIC_PEPTIDE;
  if (isCarbetocinFamily(entity)) return SUPPORT_CARBETOCIN;
  if (isCgrpFamily(entity)) return SUPPORT_CGRP;
  if (isAmylinFamily(entity)) return SUPPORT_AMYLIN;
  if (isAngiotensinIiFamily(entity)) return SUPPORT_ANGIOTENSIN_II;
  if (isAra290Family(entity)) return SUPPORT_ARA_290;
  if (isBivalirudinFamily(entity)) return SUPPORT_BIVALIRUDIN;
  if (isAbaloparatideFamily(entity)) return SUPPORT_ABALOPARATIDE;
  if (isAcetylHexapeptide8Family(entity)) return SUPPORT_ACETYL_HEXAPEPTIDE_8;
  if (isAdipotideFamily(entity)) return SUPPORT_ADIPOTIDE;
  if (isAfamelanotideFamily(entity)) return SUPPORT_AFAMELANOTIDE;
  if (isExenatideFamily(entity)) return SUPPORT_EXENATIDE;
  if (isSubstancePFamily(entity)) return SUPPORT_SUBSTANCE_P;
  if (isOrexinAFamily(entity)) return SUPPORT_OREXIN_A;
  if (isNeuropeptideYFamily(entity)) return SUPPORT_NEUROPEPTIDE_Y;
  if (isEndothelin1Family(entity)) return SUPPORT_ENDOTHELIN_1;
  if (isEptifibatideFamily(entity)) return SUPPORT_EPTIFIBATIDE;
  if (isLanreotideFamily(entity)) return SUPPORT_LANREOTIDE;
  if (isLinaclotideFamily(entity)) return SUPPORT_LINACLOTIDE;
  if (isMazdutideFamily(entity)) return SUPPORT_MAZDUTIDE;
  if (isMelanoranIFamily(entity)) return SUPPORT_MELANOTAN_I;
  if (isMotilinFamily(entity)) return SUPPORT_MOTILIN;
  if (isNesiritideFamily(entity)) return SUPPORT_NESIRITIDE;
  if (isNeuropeptideSFamily(entity)) return SUPPORT_NEUROPEPTIDE_S;
  if (isOctreotideFamily(entity)) return SUPPORT_OCTREOTIDE;
  if (isPegMgfFamily(entity)) return SUPPORT_PEG_MGF;
  if (isPentagastrinFamily(entity)) return SUPPORT_PENTAGASTRIN;
  if (isPlecanatideFamily(entity)) return SUPPORT_PLECANATIDE;
  if (isProlactinReleasingPeptideFamily(entity)) return SUPPORT_PROLACTIN_RELEASING_PEPTIDE;
  if (isSecretinFamily(entity)) return SUPPORT_SECRETIN;
  if (isShlp2Family(entity)) return SUPPORT_SHLP2;
  if (isSnap8Family(entity)) return SUPPORT_SNAP8;
  if (isSurvodutideFamily(entity)) return SUPPORT_SURVODUTIDE;
  if (isTeriparatideFamily(entity)) return SUPPORT_TERIPARATIDE;
  if (isThymulinFamily(entity)) return SUPPORT_THYMULIN;
  if (isPalmitoylPentapeptide4Family(entity)) return SUPPORT_PALMITOYL_PENTAPEPTIDE_4;
  if (isPalmitoylTripeptide1Family(entity)) return SUPPORT_PALMITOYL_TRIPEPTIDE_1;
  if (isVipFamily(entity)) return SUPPORT_VIP;
  if (isZiconotideFamily(entity)) return SUPPORT_ZICONOTIDE;
  return null;
}

function isPalmitoylPentapeptide4Family(entity: EntityLike): boolean {
  return entity.slug === "palmitoyl-pentapeptide-4";
}

function isPalmitoylTripeptide1Family(entity: EntityLike): boolean {
  return entity.slug === "palmitoyl-tripeptide-1";
}

function isVipFamily(entity: EntityLike): boolean {
  return entity.slug === "vip";
}

function isZiconotideFamily(entity: EntityLike): boolean {
  return entity.slug === "ziconotide";
}

const SUPPORT_PALMITOYL_PENTAPEPTIDE_4: SupportPack = {
  id: "palmitoyl-pentapeptide-4",
  title: "Palmitoyl Pentapeptide-4 (Matrixyl)",
  subtitle: "Cosmetic signal peptide \u2014 topical use only",
  bullets: [
    "Topical cosmetic ingredient only. No injectable use case, no dosing data, no pharmacokinetic profile for any route other than topical.",
    "The collagen synthesis mechanism is well characterized in fibroblast cell culture. In vivo dermal bioavailability from topical application is not established by independent RCT evidence.",
    "Most clinical data are from industry-funded studies. Independent head-to-head evidence is limited.",
    "Extremely well tolerated topically \u2014 one of the safest cosmetic actives in routine use.",
  ],
  redFlags: [
    "Do not inject. There is no data for any injectable use and no rational basis for it.",
    "Rare contact sensitization: patch-test if you have reactive skin or known peptide hypersensitivity.",
  ],
};

const SUPPORT_PALMITOYL_TRIPEPTIDE_1: SupportPack = {
  id: "palmitoyl-tripeptide-1",
  title: "Palmitoyl Tripeptide-1",
  subtitle: "Matrixyl 3000 component \u2014 topical cosmetic use only",
  bullets: [
    "One of two actives in Matrixyl 3000 (with palmitoyl pentapeptide-4). GHK-derived sequence, targets collagen I and III.",
    "Almost exclusively studied in combination \u2014 standalone efficacy data independent of its pentapeptide-4 partner are very limited.",
    "Topical cosmetic ingredient only. No injectable formulation or data exists.",
    "Safety profile essentially identical to palmitoyl pentapeptide-4: extremely low toxicity for topical use.",
  ],
  redFlags: [
    "Do not inject. No data exists for any non-topical route.",
    "Patch-test if reactive skin history: contact sensitization is rare but possible.",
  ],
};

const SUPPORT_VIP: SupportPack = {
  id: "vip",
  title: "VIP (Vasoactive Intestinal Peptide)",
  subtitle: "Endogenous neuropeptide \u2014 research compound, not a community peptide",
  bullets: [
    "Plasma half-life under 2 minutes due to rapid peptidase cleavage \u2014 this severely limits the pharmacological rationale for self-injection protocols.",
    "Profound vasodilatory effect: meaningful hypotension risk from injection.",
    "No established dosing protocol, no safety profile for self-administration. This is a research compound.",
    "Aviptadil (a VIP synthetic analog) has been studied in critical care (ARDS); this context does not translate to community use.",
  ],
  redFlags: [
    "Injection risk: significant hypotension and tachycardia. Do not inject without medical oversight.",
    "Do not combine with antihypertensives, nitrates, or PDE5 inhibitors \u2014 profound additive vasodilation risk.",
    "No established human dosing exists for community use.",
  ],
};

const SUPPORT_ZICONOTIDE: SupportPack = {
  id: "ziconotide",
  title: "Ziconotide (Prialt)",
  subtitle: "FDA-approved intrathecal analgesic \u2014 specialist use only, not a community peptide",
  bullets: [
    "Intrathecal (spinal) delivery only. Systemic injection would affect voltage-gated calcium channels throughout the nervous system \u2014 not studied, extremely dangerous.",
    "Requires an implanted intrathecal drug delivery system managed by a pain specialist or neurosurgeon.",
    "Serious neurological and psychiatric side effects are well documented even at therapeutic intrathecal doses.",
    "This is an FDA-approved pharmaceutical in a specialized clinical context \u2014 it is not a community peptide.",
  ],
  redFlags: [
    "Non-intrathecal route: any other route of administration is absolutely contraindicated. Do not inject subcutaneously, intramuscularly, or intravenously.",
    "Self-administration of ziconotide is not possible or safe \u2014 requires implanted IDDS and specialist management.",
    "Black box warning for severe psychiatric and neurological adverse effects including cognitive impairment.",
  ],
};

function isSnap8Family(entity: EntityLike): boolean {
  return entity.slug === "snap-8";
}

function isSurvodutideFamily(entity: EntityLike): boolean {
  return entity.slug === "survodutide";
}

function isTeriparatideFamily(entity: EntityLike): boolean {
  return entity.slug === "teriparatide";
}

function isThymulinFamily(entity: EntityLike): boolean {
  return entity.slug === "thymulin";
}

const SUPPORT_SNAP8: SupportPack = {
  id: "snap-8",
  title: "Snap-8 (Acetyl Octapeptide-3)",
  subtitle: "Cosmetic signal peptide \u2014 topical only",
  bullets: [
    "Topical cosmetic ingredient only \u2014 no legitimate injectable use case or dosing data.",
    "The SNARE inhibition mechanism is cell culture evidence; transdermal delivery to NMJ has not been demonstrated in vivo.",
    "Industry-funded studies dominate the literature \u2014 independent RCT data for clinical wrinkle outcomes are very limited.",
    "Extremely well tolerated topically; contact sensitization is rare but reported.",
  ],
  redFlags: [
    "Injectable use: no data, no rational pharmacological basis \u2014 do not inject.",
    "If using near eyes or on compromised barrier skin, monitor for sensitization.",
  ],
};

const SUPPORT_SURVODUTIDE: SupportPack = {
  id: "survodutide",
  title: "Survodutide (BI 456906)",
  subtitle: "Dual GLP-1R/GCGR agonist \u2014 investigational",
  bullets: [
    "Investigational compound \u2014 not FDA-approved as of early 2026. Phase 3 trials ongoing.",
    "Dual GLP-1/glucagon receptor agonism may offer superior liver fat reduction vs. pure GLP-1 agents.",
    "Carries the same GLP-1 class warnings: thyroid C-cell tumors, pancreatitis, GI tolerability.",
    "Glucagon component introduces a unique hyperglycemia risk not seen with semaglutide or tirzepatide.",
  ],
  redFlags: [
    "Do not combine with other GLP-1 receptor agonists.",
    "Personal or family history of medullary thyroid carcinoma or MEN2: contraindicated (class warning).",
    "Insulin and sulfonylurea users: monitor glucose \u2014 hypoglycemia risk with secretagogues.",
  ],
};

const SUPPORT_TERIPARATIDE: SupportPack = {
  id: "teriparatide",
  title: "Teriparatide (Forteo)",
  subtitle: "FDA-approved anabolic bone agent \u2014 PTH(1\u201334)",
  bullets: [
    "FDA-approved for severe osteoporosis. Requires a prescribing physician and proper bone density evaluation.",
    "Cumulative use is limited to 2 years lifetime due to the osteosarcoma black box warning.",
    "Antiresorptive therapy (bisphosphonate or denosumab) must follow to preserve BMD gains.",
    "Pulsatile administration is critical \u2014 the anabolic effect depends on intermittent PTH exposure.",
  ],
  redFlags: [
    "Osteosarcoma black box: 2-year lifetime cumulative dose limit. Do not exceed.",
    "Hypercalcemia: monitor calcium, especially with active vitamin D analogues or thiazides.",
    "Paget\u2019s disease of bone: contraindicated.",
    "Orthostatic hypotension can occur post-injection \u2014 administer sitting or lying down initially.",
  ],
};

const SUPPORT_THYMULIN: SupportPack = {
  id: "thymulin",
  title: "Thymulin",
  subtitle: "Thymic nonapeptide \u2014 zinc-dependent, no human trials",
  bullets: [
    "No human clinical trials of injectable thymulin exist. All evidence is preclinical.",
    "Zinc repletion may restore endogenous thymulin activity \u2014 often more actionable than exogenous injection.",
    "Unknown long-term safety profile. \u201cNo known toxicity\u201d in preclinical models does not equal established human safety.",
    "Animal model data show immune modulation and antinociceptive effects; human translation is unestablished.",
  ],
  redFlags: [
    "Immunocompromised patients (HIV, transplant, active cancer): unknown and potentially significant immune risk.",
    "Active autoimmune disease: unknown interaction with immune modulation \u2014 discuss with physician.",
    "Do not combine with immunosuppressants or biologic immunomodulators without medical oversight.",
  ],
};
