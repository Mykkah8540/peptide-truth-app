#!/usr/bin/env python3
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "5-amino-1mq",
  "acetyl-hexapeptide-8",
  "adipotide",
  "amylin",
  "angiotensin-ii",
]

PATCH = {
  "5-amino-1mq": {
    "bottom_line": "5-Amino-1MQ is discussed for fat-loss and metabolic goals based on early mechanistic work. Human outcomes are not well-established, so treat expectations as uncertain.",
    "benefits": [
      "body composition interest (primarily based on early data)",
      "metabolic and energy balance curiosity in biohacker communities",
      "used in goal-based stacking discussions for fat-loss (anecdotal)",
    ],
    "side_effects_common": [
      "stimulant-like feelings (restlessness, jittery energy)",
      "sleep disruption when taken too late in the day",
      "headache or nausea in sensitive users",
    ],
    "side_effects_serious": [
      "chest pain, fainting, or severe shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with cardiovascular disease or uncontrolled blood pressure",
      "people with anxiety disorders or significant sleep problems",
      "pregnant or breastfeeding individuals",
      "adolescents (developmental risk plus limited evidence)",
    ],
  },

  "acetyl-hexapeptide-8": {
    "bottom_line": "Acetyl hexapeptide-8 (often marketed as Argireline) is used topically for cosmetic “expression line” smoothing. Effects are subtle and depend on formulation and consistent use.",
    "benefits": [
      "cosmetic interest for mild, temporary smoothing of expression lines",
      "used in skincare routines as a non-procedure option (anecdotal)",
      "often paired with hydration-focused skincare for appearance goals",
    ],
    "side_effects_common": [
      "skin irritation or redness, especially on sensitive skin",
      "dryness or mild peeling depending on the product base",
      "eye-area irritation if applied too close to eyes",
    ],
    "side_effects_serious": [
      "severe rash or swelling suggesting allergic contact dermatitis",
      "eye pain or vision changes after accidental exposure to eyes",
    ],
    "who_should_be_cautious": [
      "people with a history of severe skin allergies or eczema flares",
      "people using strong actives (retinoids, acids) who frequently react",
      "pregnant or breastfeeding individuals (safety data is limited)",
      "adolescents (cosmetic use is generally low priority; data limited)",
    ],
  },

  "adipotide": {
    "bottom_line": "Adipotide is an experimental compound discussed for targeted fat reduction. Safety and real-world use are high-risk because credible human evidence is limited and claims are often exaggerated.",
    "benefits": [
      "fat-loss interest driven by early preclinical targeting concepts",
      "discussed in extreme weight-loss communities (anecdotal)",
      "curiosity around “targeted” adipose mechanisms (early-stage)",
    ],
    "side_effects_common": [
      "nausea or reduced appetite",
      "fatigue or malaise",
      "injection-site irritation in real-world use (when used unsafely)",
    ],
    "side_effects_serious": [
      "signs of kidney stress (dark urine, flank pain, reduced urination)",
      "severe vomiting, dehydration, or confusion",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone with kidney disease or reduced kidney function",
      "people on medications that affect kidneys or fluid balance",
      "pregnant or breastfeeding individuals",
      "adolescents (developmental risk plus high uncertainty)",
    ],
  },

  "amylin": {
    "bottom_line": "Amylin is a hormone involved in satiety and glucose regulation and is relevant to metabolic disease contexts. Using amylin-like therapies outside supervised care raises risk because glucose effects are meaningful.",
    "benefits": [
      "satiety and appetite regulation interest in metabolic contexts",
      "post-meal glucose control interest (clinical context dependent)",
      "sometimes discussed alongside GLP-1 approaches (context varies)",
    ],
    "side_effects_common": [
      "nausea, especially during early use",
      "reduced appetite that can impair fueling for training",
      "dizziness or lightheadedness if meals are skipped",
    ],
    "side_effects_serious": [
      "symptoms of hypoglycemia (confusion, sweating, tremor, fainting)",
      "severe vomiting with inability to keep fluids down",
    ],
    "who_should_be_cautious": [
      "people with diabetes using insulin or insulin secretagogues",
      "people with a history of severe hypoglycemia",
      "pregnant or breastfeeding individuals",
      "adolescents (growth and metabolic setpoints are sensitive)",
    ],
  },

  "angiotensin-ii": {
    "bottom_line": "Angiotensin II is a potent vasoactive peptide used in critical-care settings for specific indications. It is not a wellness peptide; unsupervised use carries high cardiovascular risk.",
    "benefits": [
      "clinically relevant for raising blood pressure in controlled medical settings",
      "mechanistic interest in vascular tone regulation",
    ],
    "side_effects_common": [
      "headache or flushing",
      "elevated blood pressure beyond target range in sensitive individuals",
      "nausea or dizziness",
    ],
    "side_effects_serious": [
      "severe hypertension symptoms (severe headache, vision changes, confusion)",
      "chest pain, stroke-like symptoms, or sudden weakness/numbness",
      "signs of clotting events (leg swelling/pain, sudden shortness of breath)",
    ],
    "who_should_be_cautious": [
      "anyone with cardiovascular disease, stroke history, or clotting disorders",
      "people on blood pressure medications or vasoactive drugs",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence + inappropriate for non-clinical use)",
    ],
  },
}

def load_json(path: Path) -> dict:
  with path.open("r", encoding="utf-8") as f:
    return json.load(f)

def save_json(path: Path, data: dict) -> None:
  with path.open("w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")

def apply(slug: str) -> None:
  fp = PEPTIDES_DIR / f"{slug}.json"
  if not fp.exists():
    raise SystemExit(f"ERROR: missing peptide file: {fp}")

  d = load_json(fp)

  pr = PATCH[slug].copy()
  pr["schema_version"] = "practical_block_v1"

  # Always patch top-level practical (validator expects it here)
  d["practical"] = pr

  save_json(fp, d)
  print(f"OK: patched {slug}")

def main() -> int:
  for slug in BATCH:
    apply(slug)
  return 0

if __name__ == "__main__":
  raise SystemExit(main())
