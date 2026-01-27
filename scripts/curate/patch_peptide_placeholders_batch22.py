#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "endothelin-1",
  "eptifibatide",
  "exenatide",
  "follistatin-344",
  "ghrp-2",
]

PATCH = {
  "endothelin-1": {
    "bottom_line": "Endothelin-1 is a vasoconstrictor involved in blood pressure regulation and vascular disease biology. It is not a wellness peptide; non-medical use is high-risk.",
    "benefits": [
      "physiology relevance in vascular tone regulation",
      "research relevance in pulmonary hypertension and cardiovascular disease pathways",
    ],
    "side_effects_common": [
      "headache",
      "blood pressure changes (often felt as head pressure or dizziness)",
      "nausea",
    ],
    "side_effects_serious": [
      "severe chest pain, severe shortness of breath, or collapse",
      "dangerous blood pressure symptoms (confusion, fainting)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with cardiovascular disease, pulmonary hypertension, or stroke history",
      "people with uncontrolled hypertension",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence plus inappropriate for non-clinical use)",
    ],
  },

  "eptifibatide": {
    "bottom_line": "Eptifibatide is a potent antiplatelet medication used in hospital settings to reduce clotting during acute coronary care. It is not a wellness peptide; bleeding risk is high.",
    "benefits": [
      "clinical relevance in acute coronary syndrome/PCI settings (medical supervision)",
      "mechanistic relevance in platelet aggregation (GP IIb/IIIa) discussions",
    ],
    "side_effects_common": [
      "bruising",
      "nosebleeds or gum bleeding",
      "nausea",
    ],
    "side_effects_serious": [
      "serious bleeding (GI bleed, intracranial bleed, uncontrolled bleeding)",
      "black/tarry stools or vomiting blood",
      "sudden severe headache, weakness, or vision changes (emergency evaluation)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone not under direct medical supervision for a cardiovascular indication",
      "people on anticoagulants/antiplatelets or with bleeding disorders",
      "people with recent surgery, ulcers, or stroke history",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence plus inappropriate for non-clinical use)",
    ],
  },

  "exenatide": {
    "bottom_line": "Exenatide is a prescription GLP-1 receptor agonist used for type 2 diabetes and sometimes weight-related goals. It can strongly affect appetite and GI tolerance, and misuse risks are real.",
    "benefits": [
      "blood sugar control in type 2 diabetes contexts (prescription use)",
      "appetite reduction and ‘food noise’ discussions (variable)",
      "weight-loss support discussions as a GLP-1 option (context-dependent)",
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

  "follistatin-344": {
    "bottom_line": "Follistatin-344 is discussed for muscle and performance goals because it interacts with growth-related signaling (myostatin/activin pathways). Human evidence for non-medical use is limited, and theoretical long-term risks are a serious consideration.",
    "benefits": [
      "muscle growth and body composition interest (claims often exceed evidence)",
      "performance and recovery discussions in enhancement communities (anecdotal)",
      "mechanistic relevance in myostatin/activin signaling discussions",
    ],
    "side_effects_common": [
      "headache",
      "fatigue",
      "water retention or swelling",
    ],
    "side_effects_serious": [
      "chest pain, fainting, or severe shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "new or rapidly worsening swelling, severe weakness, or neurologic symptoms",
    ],
    "who_should_be_cautious": [
      "people with cancer history or active malignancy concern (growth signaling context)",
      "people with cardiovascular disease or clotting risk factors",
      "pregnant or breastfeeding individuals",
      "adolescents (growth pathway manipulation plus long-term uncertainty)",
    ],
  },

  "ghrp-2": {
    "bottom_line": "GHRP-2 is discussed for growth hormone stimulation and related body composition goals. It is endocrine-active; appetite changes and water retention are common discussion points, and long-term outcomes for non-medical use are not established.",
    "benefits": [
      "GH-related signaling interest for recovery and body composition themes (variable)",
      "sleep and training recovery discussions (mixed, often overstated)",
      "sometimes discussed for appetite stimulation (context-dependent)",
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
