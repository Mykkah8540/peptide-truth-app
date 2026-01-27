#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "ghrp-6",
  "glucagon",
  "glutathione",
  "gonadorelin",
  "hcg",
]

PATCH = {
  "ghrp-6": {
    "bottom_line": "GHRP-6 is discussed for growth hormone stimulation and is well-known for strong hunger signals. It is endocrine-active, and non-medical use carries real metabolic and long-term uncertainty.",
    "benefits": [
      "GH-related signaling interest for recovery and body composition themes (variable)",
      "sometimes discussed for sleep and training recovery (mixed, often overstated)",
      "appetite stimulation is commonly reported (context-dependent)",
    ],
    "side_effects_common": [
      "increased appetite",
      "water retention or swelling",
      "headache",
      "tingling or numbness sensations",
    ],
    "side_effects_serious": [
      "significant blood sugar worsening symptoms (extreme thirst, confusion, fainting)",
      "severe swelling, shortness of breath, or chest pain",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with diabetes, prediabetes, or metabolic syndrome",
      "people with active cancer or cancer history concerns (growth signaling context)",
      "people with cardiovascular disease or uncontrolled blood pressure",
      "pregnant or breastfeeding individuals",
      "adolescents (endocrine manipulation risk plus inappropriate context)",
    ],
  },

  "glucagon": {
    "bottom_line": "Glucagon is a prescription hormone used to raise blood sugar in severe hypoglycemia and has other clinical uses. It is not a wellness peptide; non-medical use can cause dangerous glucose and cardiovascular effects.",
    "benefits": [
      "clinical relevance for severe hypoglycemia rescue (medical supervision)",
      "physiology relevance in glucose regulation discussions",
    ],
    "side_effects_common": [
      "nausea",
      "vomiting",
      "headache",
      "fast heartbeat or jittery feeling",
    ],
    "side_effects_serious": [
      "severe high blood sugar symptoms (confusion, dehydration, fainting)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "severe chest pain or collapse",
    ],
    "who_should_be_cautious": [
      "people with diabetes who are not under medical supervision",
      "people with pheochromocytoma or insulinoma history (special-risk contexts)",
      "people with significant cardiovascular disease",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence endocrine manipulation plus inappropriate context)",
    ],
  },

  "glutathione": {
    "bottom_line": "Glutathione is discussed for antioxidant and skin-brightening themes. Oral and topical use are common; injectable use is higher-risk largely due to sourcing/quality and allergy risk, and outcomes vary widely.",
    "benefits": [
      "antioxidant and oxidative stress discussions (outcomes variable)",
      "skin tone/brightening claims are common (evidence mixed and often overstated)",
      "sometimes discussed for liver support themes (context-dependent)",
    ],
    "side_effects_common": [
      "nausea or stomach upset",
      "headache",
      "skin rash or itching",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "wheezing or severe bronchospasm symptoms in susceptible people",
      "severe rash or swelling that escalates quickly",
    ],
    "who_should_be_cautious": [
      "people with asthma or airway reactivity",
      "people with multiple medication allergies or prior anaphylaxis",
      "pregnant or breastfeeding individuals",
      "adolescents (cosmetic-driven use with limited long-term data)",
    ],
  },

  "gonadorelin": {
    "bottom_line": "Gonadorelin (GnRH) is used clinically to test or influence reproductive hormone signaling. It is not a casual wellness peptide; non-medical use can disrupt fertility hormones and mood.",
    "benefits": [
      "clinical relevance in diagnostic testing and specific endocrine indications",
      "physiology relevance in LH/FSH and reproductive axis discussions",
    ],
    "side_effects_common": [
      "headache",
      "nausea",
      "flushing",
      "mood changes or irritability",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "severe pelvic/testicular pain or concerning swelling",
      "fainting or collapse",
    ],
    "who_should_be_cautious": [
      "anyone trying to conceive or with fertility concerns (axis disruption risk)",
      "people with hormone-sensitive cancers or endocrine tumors (specialist context)",
      "pregnant or breastfeeding individuals",
      "adolescents (puberty/endocrine axis disruption risk)",
    ],
  },

  "hcg": {
    "bottom_line": "hCG is a prescription hormone used in specific fertility and endocrine contexts. It is not a general wellness peptide; misuse can disrupt hormones, fertility, and mood, and carries meaningful risk.",
    "benefits": [
      "clinical relevance in fertility treatment and certain hypogonadism protocols (medical supervision)",
      "physiology relevance in LH-like signaling discussions",
    ],
    "side_effects_common": [
      "mood changes or irritability",
      "headache",
      "water retention or bloating",
      "breast tenderness or hormonal discomfort",
    ],
    "side_effects_serious": [
      "blood clot symptoms (leg swelling/pain, sudden shortness of breath)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "severe abdominal/pelvic pain or rapid swelling (urgent evaluation)",
    ],
    "who_should_be_cautious": [
      "people with hormone-sensitive cancers or tumor risk contexts",
      "people with clotting history or strong clot risk factors",
      "pregnant or breastfeeding individuals (medical use only, specialist context)",
      "adolescents (puberty/endocrine axis disruption risk)",
    ],
  },
}

def load_json(path: Path) -> dict:
  return json.loads(path.read_text("utf-8"))

def save_json(path: Path, data: dict) -> None:
  path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def apply_patch(slug: str, dry_run: bool) -> None:
  fp = PEPTIDES_DIR / f"{slug}.json"
  if not fp.exists():
    raise SystemExit(f"ERROR: missing peptide file: {fp}")

  if dry_run:
    print(f"DRY-RUN OK: would patch {slug}")
    return

  d = load_json(fp)
  pr = PATCH[slug].copy()
  pr["schema_version"] = "practical_block_v1"
  d["practical"] = pr
  save_json(fp, d)
  print(f"OK: patched {slug}")

def main() -> int:
  ap = argparse.ArgumentParser()
  ap.add_argument("--apply", action="store_true", help="Write changes to files")
  ap.add_argument("--dry-run", action="store_true", help="No writes; print what would change")
  args = ap.parse_args()

  dry_run = args.dry_run or (not args.apply)

  for slug in BATCH:
    apply_patch(slug, dry_run=dry_run)

  if dry_run:
    print("DRY-RUN COMPLETE (no files written)")
  return 0

if __name__ == "__main__":
  raise SystemExit(main())
