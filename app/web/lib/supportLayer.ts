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
  return ["cjc-1295", "cjc-1295-dac", "ipamorelin", "mk-677"].includes(s);
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

export function getSupportPack(entity: EntityLike): SupportPack | null {
  if (isIncretinFamily(entity)) return SUPPORT_INCRETIN;
  if (isNadFamily(entity)) return SUPPORT_NAD;
  if (isHealingFamily(entity)) return SUPPORT_HEALING;
  if (isGhAxisFamily(entity)) return SUPPORT_GH_AXIS;
  return null;
}
