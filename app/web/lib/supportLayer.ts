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
  return null;
}
