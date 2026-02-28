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

export function getSupportPack(entity: EntityLike): SupportPack | null {
  if (isIncretinFamily(entity)) return SUPPORT_INCRETIN;
  if (isNadFamily(entity)) return SUPPORT_NAD;
  return null;
}
