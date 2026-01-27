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
    "bottom_line": "Calcitonin is a prescription hormone used in select bone and calcium-related indications and sometimes for pain in specific settings. It is not a general wellness peptide; benefits depend on medical context.",
    "benefits": [
      "clinical relevance in certain bone/calcium disorders (prescription use)",
      "sometimes used for short-term pain contexts in specific clinical scenarios",
      "physiology relevance in calcium regulation pathways",
    ],
    "side_effects_common": [
      "nausea",
      "flushing",
      "headache",
      "nasal irritation (for nasal formulations)",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "severe dizziness or fainting",
    ],
    "who_should_be_cautious": [
      "anyone with allergy to salmon-derived products (relevant to some formulations)",
      "people with low calcium or disorders of calcium regulation",
      "pregnant or breastfeeding individuals",
      "adolescents (prescription-only context plus limited non-clinical rationale)",
    ],
  },

  "carbetocin": {
    "bottom_line": "Carbetocin is a prescription oxytocin-analog used to prevent postpartum uterine bleeding. It is not a wellness peptide; it can affect uterine tone and blood pressure and is used in obstetric care.",
    "benefits": [
      "clinical relevance in postpartum hemorrhage prevention (medical setting)",
      "mechanistic relevance in uterine contraction signaling",
      "used only in supervised obstetric contexts",
    ],
    "side_effects_common": [
      "nausea",
      "headache",
      "flushing",
      "abdominal cramping",
    ],
    "side_effects_serious": [
      "severe blood pressure changes, fainting, or collapse",
      "chest pain or severe shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone not in a supervised obstetric care context",
      "pregnant individuals outside intended obstetric use (uterine risk)",
      "people with cardiovascular disease or unstable blood pressure",
      "adolescents (high consequence plus inappropriate use context)",
    ],
  },

  "cgrp": {
    "bottom_line": "CGRP is a key neuropeptide in migraine biology and vascular signaling. Modern migraine drugs target CGRP pathways; using CGRP itself outside clinical research is not a wellness strategy and may carry vascular risks.",
    "benefits": [
      "high clinical relevance in migraine pathophysiology (target of CGRP therapies)",
      "physiology relevance in vascular tone and pain signaling pathways",
      "research relevance across neurology and vascular biology",
    ],
    "side_effects_common": [
      "flushing",
      "headache",
      "lightheadedness",
      "nausea",
    ],
    "side_effects_serious": [
      "fainting or collapse from blood pressure effects",
      "severe chest pain or shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with cardiovascular disease or unstable blood pressure",
      "people with severe migraine or neurologic disease needing specialist care",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence plus inappropriate for non-clinical use)",
    ],
  },

  "cjc-1295-dac": {
    "bottom_line": "CJC-1295 DAC is a long-acting GHRH analog discussed for growth-hormone axis effects. Endocrine manipulation carries real risks, and long-acting exposure can amplify side effects and monitoring needs.",
    "benefits": [
      "growth-hormone axis interest (variable; claims often exceed evidence)",
      "sometimes discussed for body composition and recovery themes (anecdotal heavy)",
      "long-acting design is a major differentiator (also increases risk if misused)",
    ],
    "side_effects_common": [
      "water retention or swelling",
      "headache",
      "flushing at the site or generalized warmth",
      "sleep disruption in some users",
    ],
    "side_effects_serious": [
      "severe swelling, shortness of breath, or chest pain",
      "severe blood sugar changes symptoms (confusion, fainting) in susceptible users",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with diabetes or unstable blood sugar control",
      "people with cancer history or active malignancy concerns (growth signaling context)",
      "people with significant cardiovascular disease or uncontrolled blood pressure",
      "pregnant or breastfeeding individuals",
      "adolescents (developmental endocrine risk plus inappropriate use context)",
    ],
  },

  "desmopressin": {
    "bottom_line": "Desmopressin (DDAVP) is a prescription vasopressin analog used for diabetes insipidus, bedwetting in select cases, and certain bleeding disorders. It can cause dangerous low sodium; it is not a wellness peptide.",
    "benefits": [
      "clinical relevance in central diabetes insipidus (prescription use)",
      "clinical relevance in select bleeding disorders (von Willebrand/hemophilia A contexts)",
      "used in specific pediatric/urology contexts under medical guidance",
    ],
    "side_effects_common": [
      "headache",
      "nausea",
      "water retention or swelling",
      "mild abdominal cramps",
    ],
    "side_effects_serious": [
      "dangerous low sodium symptoms (confusion, seizure, severe weakness)",
      "fainting or collapse",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with a history of low sodium, seizures, or significant kidney disease",
      "people with heart failure or unstable fluid balance",
      "pregnant or breastfeeding individuals",
      "adolescents unless prescribed (high consequence electrolyte risk)",
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
