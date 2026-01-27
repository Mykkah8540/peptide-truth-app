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
    "bottom_line": "Calcitonin is a hormone involved in calcium regulation and is used clinically in specific contexts. It is not a wellness peptide; unsupervised use adds real risk without clear upside.",
    "benefits": [
      "clinical relevance in calcium/bone regulation contexts",
      "used in medicine for specific indications (context-dependent)",
      "physiology relevance for endocrine regulation discussions",
    ],
    "side_effects_common": [
      "nausea",
      "flushing",
      "headache",
      "injection-site irritation",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "severe dizziness, fainting, or collapse",
      "severe vomiting or dehydration",
    ],
    "who_should_be_cautious": [
      "people with calcium disorders or complex endocrine disease",
      "people with significant kidney disease or electrolyte instability",
      "pregnant or breastfeeding individuals",
      "adolescents (endocrine manipulation with high consequence)",
    ],
  },

  "carbetocin": {
    "bottom_line": "Carbetocin is an oxytocin-receptor agonist used clinically for uterine contraction in obstetric settings. It is not a wellness peptide; unsupervised use is dangerous.",
    "benefits": [
      "clinical relevance in postpartum uterine tone management (medical setting)",
      "physiology relevance for oxytocin/uterine signaling discussions",
    ],
    "side_effects_common": [
      "headache",
      "nausea",
      "flushing",
      "dizziness",
    ],
    "side_effects_serious": [
      "chest pain, severe shortness of breath, or collapse",
      "severe low blood pressure symptoms (fainting, confusion)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone not under direct medical supervision for an obstetric indication",
      "people with cardiovascular disease or unstable blood pressure",
      "pregnant or breastfeeding individuals (outside appropriate clinical use)",
      "adolescents (high consequence plus inappropriate for non-clinical use)",
    ],
  },

  "cgrp": {
    "bottom_line": "CGRP (calcitonin gene-related peptide) is a key migraine and vascular signaling molecule. It is not a wellness peptide; altering CGRP pathways is clinically consequential.",
    "benefits": [
      "major clinical relevance in migraine biology (targeted by approved therapies)",
      "physiology relevance in vascular tone and pain signaling discussions",
      "research relevance across neurovascular pathways",
    ],
    "side_effects_common": [
      "headache or head pressure changes",
      "flushing",
      "lightheadedness",
    ],
    "side_effects_serious": [
      "fainting or collapse",
      "severe chest pain or severe shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with significant cardiovascular disease or unstable blood pressure",
      "people with complex migraine or neurologic disease under active treatment",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence pathway manipulation)",
    ],
  },

  "cjc-1295-dac": {
    "bottom_line": "CJC-1295 with DAC is a long-acting growth-hormone axis peptide discussed for body composition and recovery goals. Growth-hormone pathway manipulation carries real tradeoffs and requires serious caution.",
    "benefits": [
      "recovery and performance discussions via GH/IGF-1 pathway interest",
      "body composition discussions in fitness communities (claims vary)",
      "sleep and well-being discussions in some users (variable)",
    ],
    "side_effects_common": [
      "water retention or swelling",
      "increased appetite",
      "headache",
      "tingling or numbness in hands (carpal-tunnel-like symptoms)",
    ],
    "side_effects_serious": [
      "severe swelling, shortness of breath, or chest pain",
      "significant blood sugar problems (new or worsening hyperglycemia symptoms)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with diabetes or insulin resistance",
      "people with cancer history or active malignancy concern (growth signaling context)",
      "people with uncontrolled blood pressure, heart failure, or significant edema",
      "pregnant or breastfeeding individuals",
      "adolescents (endocrine growth axis manipulation plus long-term uncertainty)",
    ],
  },

  "desmopressin": {
    "bottom_line": "Desmopressin (DDAVP) is a prescription peptide used to reduce urine output and treat specific bleeding disorders. It is not a wellness peptide; electrolyte and fluid-balance risk is significant.",
    "benefits": [
      "prescription relevance for diabetes insipidus and nocturia contexts (medical use)",
      "prescription relevance for select bleeding disorders (medical supervision)",
      "physiology relevance for vasopressin signaling and water balance",
    ],
    "side_effects_common": [
      "headache",
      "nausea",
      "fluid retention or swelling",
    ],
    "side_effects_serious": [
      "hyponatremia symptoms (confusion, severe weakness, seizures)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "dangerous blood pressure symptoms (fainting, collapse)",
    ],
    "who_should_be_cautious": [
      "people with kidney disease or unstable fluid balance",
      "people with low sodium history or seizure risk",
      "people on diuretics or medications affecting sodium/water balance",
      "pregnant or breastfeeding individuals (requires clinician context)",
      "adolescents (high consequence electrolyte risk outside medical supervision)",
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
