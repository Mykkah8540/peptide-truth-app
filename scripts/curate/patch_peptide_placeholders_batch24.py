#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "hexarelin",
  "humanin",
  "igf-1",
  "igf-1-lr3",
  "kisspeptin",
]

PATCH = {
  "hexarelin": {
    "bottom_line": "Hexarelin is discussed for growth hormone stimulation and performance/body-composition goals. It is endocrine-active, and non-medical use carries meaningful metabolic and long-term uncertainty.",
    "benefits": [
      "GH-related signaling interest for recovery/body composition themes (variable)",
      "sometimes discussed for sleep quality and training recovery (mixed)",
      "often compared with other GHRPs in performance communities (anecdotal)",
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

  "humanin": {
    "bottom_line": "Humanin is discussed for ‘mitochondrial’ and cell-protection themes. Human evidence is limited, so real-world expectations should be conservative and hype-resistant.",
    "benefits": [
      "mitochondrial and cellular stress-resilience interest (early-stage)",
      "often discussed in longevity-adjacent communities (human outcomes uncertain)",
      "sometimes discussed for metabolic or neuroprotection themes (speculative in humans)",
    ],
    "side_effects_common": [
      "headache",
      "nausea",
      "fatigue",
    ],
    "side_effects_serious": [
      "chest pain, fainting, or severe shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with significant cardiovascular disease",
      "people with active cancer or cancer history concerns (growth/repair signaling context)",
      "pregnant or breastfeeding individuals",
      "adolescents (limited human evidence and long-term uncertainty)",
    ],
  },

  "igf-1": {
    "bottom_line": "IGF-1 is a powerful growth factor with real clinical relevance. It is not a casual wellness peptide; non-medical use carries meaningful risks, including glucose effects and growth signaling concerns.",
    "benefits": [
      "clinical relevance in specific deficiency states (specialist context)",
      "physiology relevance in growth and tissue signaling discussions",
    ],
    "side_effects_common": [
      "water retention or swelling",
      "joint discomfort",
      "headache",
      "low blood sugar symptoms (shakiness, sweating, hunger)",
    ],
    "side_effects_serious": [
      "severe hypoglycemia symptoms (confusion, fainting, seizure)",
      "severe swelling, shortness of breath, or chest pain",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with diabetes or blood sugar instability",
      "people with cancer history or elevated cancer concern (growth signaling context)",
      "people with active proliferative eye disease (specialist context)",
      "pregnant or breastfeeding individuals",
      "adolescents (growth axis disruption risk plus inappropriate context)",
    ],
  },

  "igf-1-lr3": {
    "bottom_line": "IGF-1 LR3 is a modified form discussed in performance circles for anabolic and recovery goals. It is high-risk due to potent growth signaling and metabolic effects, with significant uncertainty outside medical settings.",
    "benefits": [
      "muscle-building and recovery discussions in performance communities (anecdotal)",
      "often discussed for nutrient partitioning themes (uncertain outcomes)",
      "sometimes discussed for injury recovery narratives (claims often outpace evidence)",
    ],
    "side_effects_common": [
      "water retention or swelling",
      "headache",
      "joint discomfort",
      "low blood sugar symptoms (shakiness, sweating, hunger)",
    ],
    "side_effects_serious": [
      "severe hypoglycemia symptoms (confusion, fainting, seizure)",
      "severe swelling, shortness of breath, or chest pain",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with diabetes or blood sugar instability",
      "people with cancer history or elevated cancer concern (growth signaling context)",
      "people with cardiovascular disease or uncontrolled blood pressure",
      "pregnant or breastfeeding individuals",
      "adolescents (growth axis disruption risk plus inappropriate context)",
    ],
  },

  "kisspeptin": {
    "bottom_line": "Kisspeptin is a reproductive-axis signaling peptide studied in fertility and endocrine contexts. It is not a general wellness peptide; non-medical use can disrupt hormones, mood, and fertility signaling.",
    "benefits": [
      "clinical and research relevance in fertility and reproductive endocrinology",
      "physiology relevance in GnRH/LH/FSH axis discussions",
    ],
    "side_effects_common": [
      "headache",
      "nausea",
      "flushing",
      "mood changes or irritability",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "fainting or collapse",
      "severe pelvic/testicular pain or concerning swelling",
    ],
    "who_should_be_cautious": [
      "anyone trying to conceive or with fertility concerns (axis disruption risk)",
      "people with hormone-sensitive cancers or endocrine tumors (specialist context)",
      "pregnant or breastfeeding individuals",
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
