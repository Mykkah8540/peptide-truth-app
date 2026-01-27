#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "lanreotide",
  "leuprolide",
  "linaclotide",
  "liraglutide",
  "octreotide",
]

PATCH = {
  "lanreotide": {
    "bottom_line": "Lanreotide is a prescription somatostatin analog used for specific tumors and endocrine conditions. It is not a wellness peptide; non-medical use carries real endocrine and gallbladder risks.",
    "benefits": [
      "clinical use in acromegaly and certain neuroendocrine tumors (specialist care)",
      "reduces hormone secretion in specific medical contexts",
      "symptom control in supervised endocrine/oncology settings",
    ],
    "side_effects_common": [
      "diarrhea or loose stools",
      "abdominal pain",
      "nausea",
      "injection site reactions",
      "fatigue",
    ],
    "side_effects_serious": [
      "gallbladder problems (severe right-upper abdominal pain, fever, jaundice)",
      "severe blood sugar disturbances (high or low blood sugar symptoms)",
      "slow heart rate symptoms (fainting, severe dizziness)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone without specialist supervision for a defined indication",
      "people with diabetes or unstable blood sugar control",
      "people with gallbladder disease history",
      "pregnant or breastfeeding individuals",
      "adolescents (high-consequence endocrine manipulation plus inappropriate use context)",
    ],
  },

  "leuprolide": {
    "bottom_line": "Leuprolide is a prescription GnRH agonist used to suppress sex hormones in conditions like prostate cancer, endometriosis, and puberty disorders. It is not a wellness peptide; hormone suppression has major consequences.",
    "benefits": [
      "clinical use in hormone-sensitive cancers and specific gynecologic conditions (specialist care)",
      "clinical use in central precocious puberty under pediatric endocrinology care",
      "mechanistic relevance in GnRH/LH/FSH signaling discussions",
    ],
    "side_effects_common": [
      "hot flashes",
      "mood changes",
      "fatigue",
      "headache",
      "reduced libido",
    ],
    "side_effects_serious": [
      "severe depression or suicidal thoughts",
      "chest pain, shortness of breath, or fainting",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone without endocrinology/oncology supervision",
      "people with severe depression history or psychiatric instability",
      "people with cardiovascular disease or high stroke risk",
      "pregnant or breastfeeding individuals",
      "adolescents (only appropriate under pediatric endocrine care for specific indications)",
    ],
  },

  "linaclotide": {
    "bottom_line": "Linaclotide is a prescription peptide used for IBS-C and chronic constipation. It is not a general wellness supplement; the main real-world risk is severe diarrhea and dehydration.",
    "benefits": [
      "clinical use for IBS with constipation (IBS-C) symptom relief (prescription context)",
      "clinical use for chronic idiopathic constipation (prescription context)",
      "reduces constipation-related discomfort for some patients",
    ],
    "side_effects_common": [
      "diarrhea",
      "abdominal pain or cramping",
      "bloating",
      "gas",
    ],
    "side_effects_serious": [
      "severe diarrhea or dehydration (dizziness, fainting, weakness)",
      "severe abdominal pain with persistent vomiting",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people who get dehydrated easily or have kidney disease",
      "people with bowel obstruction risk or severe GI disease",
      "pregnant or breastfeeding individuals",
      "adolescents and children (age restrictions and safety considerations)",
    ],
  },

  "liraglutide": {
    "bottom_line": "Liraglutide is a prescription GLP-1 receptor agonist used for type 2 diabetes and weight management in specific indications. It can strongly affect appetite and GI tolerance, and non-medical use is high-risk.",
    "benefits": [
      "blood sugar control in type 2 diabetes contexts (prescription use)",
      "weight-loss support in indicated patients (prescription programs)",
      "appetite reduction and reduced food noise discussions (variable)",
    ],
    "side_effects_common": [
      "nausea",
      "vomiting or stomach upset",
      "constipation or diarrhea",
      "reduced appetite that can overshoot into under-eating",
    ],
    "side_effects_serious": [
      "severe persistent vomiting or dehydration",
      "severe abdominal pain (urgent evaluation)",
      "signs of low blood sugar when combined with other diabetes meds (confusion, fainting)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with a history of pancreatitis or severe GI disease",
      "people on insulin or sulfonylureas (hypoglycemia-risk context when combined)",
      "people with eating disorder history or extreme appetite suppression risk",
      "pregnant or breastfeeding individuals",
      "adolescents (only appropriate in defined indications under medical care)",
    ],
  },

  "octreotide": {
    "bottom_line": "Octreotide is a prescription somatostatin analog used for acromegaly and certain neuroendocrine tumors and GI bleeding syndromes. It is not a wellness peptide; endocrine and gallbladder risks are real.",
    "benefits": [
      "clinical use in acromegaly and certain neuroendocrine tumors (specialist care)",
      "reduces hormone secretion in specific medical contexts",
      "clinical use in select GI bleeding or secretory diarrhea contexts (supervised care)",
    ],
    "side_effects_common": [
      "diarrhea or loose stools",
      "abdominal pain",
      "nausea",
      "injection site reactions",
      "fatigue",
    ],
    "side_effects_serious": [
      "gallbladder problems (severe right-upper abdominal pain, fever, jaundice)",
      "severe blood sugar disturbances (high or low blood sugar symptoms)",
      "slow heart rate symptoms (fainting, severe dizziness)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone without specialist supervision for a defined indication",
      "people with diabetes or unstable blood sugar control",
      "people with gallbladder disease history",
      "pregnant or breastfeeding individuals",
      "adolescents (high-consequence endocrine manipulation plus inappropriate use context)",
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
