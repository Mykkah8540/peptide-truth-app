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
  "motilin",
]

PATCH = {
  "lanreotide": {
    "bottom_line": "Lanreotide is a prescription somatostatin analog used for specific endocrine and neuroendocrine tumor conditions. It is not a wellness peptide; hormone and GI effects can be significant.",
    "benefits": [
      "clinical relevance for acromegaly and certain neuroendocrine tumors (specialist care)",
      "physiology relevance in suppressing specific hormone secretion pathways",
    ],
    "side_effects_common": [
      "diarrhea or loose stools",
      "abdominal pain or cramping",
      "nausea",
      "injection-site pain or lumps (prescription context)",
    ],
    "side_effects_serious": [
      "severe abdominal pain (urgent evaluation)",
      "signs of gallbladder disease (right-upper belly pain, fever, jaundice)",
      "dangerous blood sugar changes (confusion, fainting)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone not under specialist medical supervision for a clear indication",
      "people with gallbladder disease history",
      "people with diabetes or blood sugar instability",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence endocrine manipulation plus inappropriate context)",
    ],
  },

  "leuprolide": {
    "bottom_line": "Leuprolide is a potent prescription GnRH agonist used to suppress sex hormones in specific medical conditions. It is not a wellness peptide; endocrine disruption and mental/physical side effects can be substantial.",
    "benefits": [
      "clinical relevance in prostate cancer, endometriosis, fibroids, and puberty suppression contexts (specialist care)",
      "physiology relevance in HPG-axis suppression discussions",
    ],
    "side_effects_common": [
      "hot flashes",
      "fatigue",
      "mood changes or irritability",
      "reduced libido",
      "headache",
    ],
    "side_effects_serious": [
      "severe depression, suicidal thoughts, or extreme mood instability",
      "chest pain, fainting, or severe shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone not under specialist medical supervision for a clear indication",
      "people with major depressive disorder or severe anxiety history",
      "people with osteoporosis risk or low bone density",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence endocrine manipulation; specialist-only context)",
    ],
  },

  "linaclotide": {
    "bottom_line": "Linaclotide is a prescription GI peptide used for IBS-C and chronic constipation. It can be effective for constipation and abdominal discomfort, but diarrhea and dehydration risks are real.",
    "benefits": [
      "improved bowel movement frequency in constipation contexts (prescription use)",
      "reduced abdominal discomfort in IBS-C contexts for some people",
    ],
    "side_effects_common": [
      "diarrhea",
      "abdominal cramping",
      "bloating or gas",
      "nausea",
    ],
    "side_effects_serious": [
      "severe diarrhea or dehydration",
      "fainting or collapse (dehydration/electrolyte context)",
      "signs of electrolyte imbalance (severe weakness, palpitations)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with frequent diarrhea or inflammatory bowel disease flares",
      "people with dehydration risk or kidney disease",
      "pregnant or breastfeeding individuals (risk/benefit is clinical)",
      "adolescents and children (age-specific prescribing considerations)",
    ],
  },

  "liraglutide": {
    "bottom_line": "Liraglutide is a prescription GLP-1 receptor agonist used for type 2 diabetes and weight management (indication-dependent). It can strongly affect appetite and GI tolerance, and misuse risks are real.",
    "benefits": [
      "blood sugar control in type 2 diabetes contexts (prescription use)",
      "appetite reduction and reduced food noise discussions (variable)",
      "weight-loss support in approved weight-management contexts",
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
      "adolescents (high-consequence metabolic manipulation plus limited context)",
    ],
  },

  "motilin": {
    "bottom_line": "Motilin is a gut hormone involved in migrating motor complex activity and GI motility. It is not a casual wellness peptide; manipulating motility can backfire and symptoms can worsen.",
    "benefits": [
      "physiology relevance in GI motility and gastric emptying discussions",
      "research relevance in prokinetic drug development and motility disorders",
    ],
    "side_effects_common": [
      "abdominal cramping",
      "diarrhea or loose stools",
      "nausea",
      "bloating",
    ],
    "side_effects_serious": [
      "severe abdominal pain (urgent evaluation)",
      "severe diarrhea or dehydration",
      "fainting or collapse (dehydration/electrolyte context)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with inflammatory bowel disease, severe IBS, or unstable GI disease",
      "people with bowel obstruction history or severe abdominal symptoms",
      "pregnant or breastfeeding individuals",
      "adolescents (limited context and inappropriate for non-clinical use)",
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
