#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "calcitonin",
  "carbetocin",
  "cgrp",
  "cjc-1295-dac",
  "desmopressin",
]

PATCH = {
  "calcitonin": {
    "bottom_line": "Calcitonin is a prescription hormone used in specific medical contexts (e.g., certain calcium/bone indications). It is not a wellness peptide; off-label use can disrupt calcium balance and cause meaningful harm.",
    "benefits": [
      "clinical relevance in calcium and bone metabolism physiology",
      "prescription use in specific indications under medical supervision",
      "research relevance in endocrine regulation discussions",
    ],
    "side_effects_common": [
      "nausea or stomach upset",
      "flushing",
      "headache",
    ],
    "side_effects_serious": [
      "signs of low calcium (muscle cramps, tingling, spasms)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "severe dizziness, fainting, or collapse",
    ],
    "who_should_be_cautious": [
      "people with calcium or parathyroid disorders",
      "people with significant kidney disease or electrolyte instability",
      "pregnant or breastfeeding individuals",
      "adolescents (endocrine disruption risk plus inappropriate context)",
    ],
  },

  "carbetocin": {
    "bottom_line": "Carbetocin is an oxytocin-analog medication used in obstetric care to help control uterine bleeding after delivery. It is not a wellness peptide; non-medical use is high-risk.",
    "benefits": [
      "clinical relevance in postpartum uterine atony prevention/treatment (medical setting)",
      "physiology relevance in uterine contraction signaling",
    ],
    "side_effects_common": [
      "nausea",
      "headache",
      "flushing",
    ],
    "side_effects_serious": [
      "dangerous blood pressure symptoms (fainting, collapse, severe dizziness)",
      "chest pain, severe shortness of breath, or severe palpitations",
      "signs of water/electrolyte imbalance (confusion, severe weakness, seizures)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone not under obstetric/medical supervision for a clear indication",
      "people with cardiovascular disease or significant blood pressure instability",
      "people with kidney disease or electrolyte disorders",
      "pregnant or breastfeeding individuals (context-specific drug; do not self-administer)",
      "adolescents (high consequence plus inappropriate for non-clinical use)",
    ],
  },

  "cgrp": {
    "bottom_line": "CGRP (calcitonin gene-related peptide) is a major signaling molecule in migraine biology and vascular regulation. It is not a wellness peptide; direct use outside research/medical contexts is high-risk because it can affect blood vessels and blood pressure.",
    "benefits": [
      "strong physiology relevance in migraine pathways and neurovascular signaling",
      "clinical relevance because CGRP-targeting drugs exist (antagonists and antibodies)",
      "research relevance in pain and vasodilation discussions",
    ],
    "side_effects_common": [
      "headache or head pressure changes",
      "flushing or warmth",
      "lightheadedness",
    ],
    "side_effects_serious": [
      "fainting or collapse",
      "severe chest pain or severe shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with cardiovascular disease, stroke history, or severe blood pressure instability",
      "people with severe migraine symptoms requiring medical evaluation (rule-out risk)",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence plus inappropriate for non-clinical use)",
    ],
  },

  "cjc-1295-dac": {
    "bottom_line": "CJC-1295 with DAC is discussed for growth hormone and IGF-1 signaling goals. It is endocrine-active; side effects and downstream risks are real, and long-term outcomes for non-medical use are not established.",
    "benefits": [
      "GH/IGF-1 signaling interest for body composition and recovery themes (claims often exceed evidence)",
      "sometimes discussed for sleep and training recovery (variable)",
      "often used in “growth” stacking conversations (anecdotal)",
    ],
    "side_effects_common": [
      "water retention or swelling",
      "increased appetite",
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

  "desmopressin": {
    "bottom_line": "Desmopressin (DDAVP) is a prescription drug that changes water balance and can also affect clotting factors in specific conditions. It is not a wellness peptide; the major danger is hyponatremia (dangerously low sodium).",
    "benefits": [
      "clinical use in diabetes insipidus and certain nighttime urination disorders (medical supervision)",
      "clinical use in specific bleeding disorders (von Willebrand/hemophilia A contexts) under supervision",
      "physiology relevance in vasopressin signaling and water balance",
    ],
    "side_effects_common": [
      "headache",
      "nausea",
      "water retention or swelling",
    ],
    "side_effects_serious": [
      "hyponatremia symptoms (confusion, severe headache, vomiting)",
      "seizure or loss of consciousness (emergency)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with low sodium history, heart failure, or kidney disease",
      "people taking diuretics or medications that affect sodium/water balance",
      "pregnant or breastfeeding individuals",
      "adolescents (prescription-only context; high consequence if misused)",
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
