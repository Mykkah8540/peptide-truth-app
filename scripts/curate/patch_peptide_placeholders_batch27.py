#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "plecanatide",
  "pramlintide",
  "prolactin-releasing-peptide",
  "secretin",
  "shlp-2",
]

PATCH = {
  "plecanatide": {
    "bottom_line": "Plecanatide is a prescription medication for chronic idiopathic constipation and IBS-C. It works locally in the gut and can cause significant diarrhea and dehydration if misused.",
    "benefits": [
      "constipation relief in CIC/IBS-C contexts (prescription use)",
      "improved stool frequency and reduced straining discussions (context-dependent)",
      "sometimes discussed for IBS-C symptom relief under medical guidance",
    ],
    "side_effects_common": [
      "diarrhea",
      "abdominal cramping",
      "bloating or gas",
      "nausea",
    ],
    "side_effects_serious": [
      "severe diarrhea or dehydration (dizziness, fainting)",
      "signs of electrolyte imbalance (severe weakness, palpitations)",
      "blood in stool or severe abdominal pain",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with bowel obstruction concern or severe abdominal pain of unknown cause",
      "people prone to dehydration or on diuretics",
      "pregnant or breastfeeding individuals",
      "adolescents and children (age-specific safety/indication constraints)",
    ],
  },

  "pramlintide": {
    "bottom_line": "Pramlintide is a prescription amylin analog used with mealtime insulin in diabetes. It can meaningfully change appetite and gastric emptying, and hypoglycemia risk is real when combined with insulin.",
    "benefits": [
      "post-meal glucose control support in diabetes contexts (prescription use)",
      "reduced appetite and smaller meal size discussions (variable)",
      "sometimes discussed for modest weight support in supervised diabetes care",
    ],
    "side_effects_common": [
      "nausea",
      "reduced appetite",
      "fullness or bloating",
      "headache",
    ],
    "side_effects_serious": [
      "severe hypoglycemia when combined with insulin (confusion, fainting, seizure)",
      "severe persistent vomiting or dehydration",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone not under medical supervision for diabetes management",
      "people with hypoglycemia unawareness or frequent severe lows",
      "people with gastroparesis or significant GI motility disorders",
      "pregnant or breastfeeding individuals",
      "adolescents (high-consequence glucose manipulation plus limited context)",
    ],
  },

  "prolactin-releasing-peptide": {
    "bottom_line": "Prolactin-releasing peptide (PrRP) is a neuroendocrine signaling peptide studied in appetite, stress, and prolactin regulation. It is not a wellness peptide; endocrine effects are unpredictable outside clinical research.",
    "benefits": [
      "research relevance in appetite and stress signaling",
      "physiology relevance in prolactin and neuroendocrine regulation",
      "sometimes discussed in weight/appetite conversations (claims often exceed evidence)",
    ],
    "side_effects_common": [
      "headache",
      "nausea",
      "sleep disturbance",
      "mood changes or irritability",
    ],
    "side_effects_serious": [
      "severe anxiety, agitation, or confusion",
      "fainting or severe dizziness",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with endocrine disorders (pituitary, thyroid, prolactin-related issues)",
      "people with mood disorders sensitive to sleep and stress changes",
      "pregnant or breastfeeding individuals",
      "adolescents (endocrine development risk plus inappropriate use context)",
    ],
  },

  "secretin": {
    "bottom_line": "Secretin is a GI hormone used clinically in diagnostic testing and studied in pancreatic and bile physiology. It is not a wellness peptide; non-medical use can trigger significant GI symptoms.",
    "benefits": [
      "clinical/diagnostic relevance in pancreatic function testing (supervised use)",
      "physiology relevance in bicarbonate secretion and bile/pancreatic signaling",
    ],
    "side_effects_common": [
      "nausea",
      "abdominal discomfort or cramping",
      "flushing",
      "lightheadedness",
    ],
    "side_effects_serious": [
      "severe abdominal pain with persistent vomiting",
      "fainting or collapse",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with significant GI disease or unexplained severe abdominal pain",
      "people with cardiovascular instability or frequent fainting",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence plus inappropriate for non-clinical use)",
    ],
  },

  "shlp-2": {
    "bottom_line": "SHLP-2 is discussed as a “mitochondrial peptide” with aging and metabolic themes. Human outcomes are not established, so expectations should be conservative and hype should be treated as a red flag.",
    "benefits": [
      "metabolic health curiosity (early-stage evidence)",
      "aging/longevity interest (human outcomes uncertain)",
      "sometimes discussed for exercise tolerance or recovery (variable, often overstated)",
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
      "people with diabetes or unstable blood sugar control",
      "people with significant cardiovascular disease",
      "pregnant or breastfeeding individuals",
      "adolescents (limited human evidence and endocrine/metabolic uncertainty)",
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
