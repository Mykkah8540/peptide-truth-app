#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

# Batch 17: practical_block_v1 for peptides that appear as blend components
BATCH = [
  "bpc-157",
  "ghk-cu",
  "ipamorelin",
  "cjc-1295",
  "tb-500",
]

PATCH: dict[str, dict[str, Any]] = {
  "bpc-157": {
    "bottom_line": "People use BPC-157 for injury and healing support. The practical reality is mixed quality evidence, inconsistent sourcing, and expectations that get ahead of what is proven in humans.",
    "benefits": [
      "injury and tendon/ligament recovery interest",
      "gut irritation and inflammation symptom interest",
      "general “healing support” use in training communities",
    ],
    "side_effects_common": [
      "headache",
      "nausea or stomach upset",
      "fatigue",
      "irritability or sleep disruption in sensitive users",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "chest pain, fainting, or severe shortness of breath",
    ],
    "who_should_be_cautious": [
      "pregnant or breastfeeding individuals",
      "adolescents (developmental risk plus limited human evidence)",
      "people with complex medical conditions that require clinician oversight",
    ],
  },

  "ghk-cu": {
    "bottom_line": "People use GHK-Cu for skin and cosmetic goals. Real-world results depend heavily on formulation quality, irritation tolerance, and realistic expectations.",
    "benefits": [
      "skin appearance and texture interest",
      "supporting cosmetic routines (topical use discussions)",
      "general “skin repair” interest in aesthetics communities",
    ],
    "side_effects_common": [
      "skin irritation or redness (topical use)",
      "itching",
      "dryness or burning sensation (topical use)",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "severe skin reaction (blistering, intense swelling, widespread rash)",
    ],
    "who_should_be_cautious": [
      "people with very sensitive skin, eczema, or active dermatitis",
      "people using strong retinoids or irritant exfoliants (higher irritation load)",
      "pregnant or breastfeeding individuals (conservative default)",
      "adolescents (unnecessary risk for cosmetic goals)",
    ],
  },

  "ipamorelin": {
    "bottom_line": "People use ipamorelin for “GH secretagogue” goals like recovery and body composition. Practical outcomes vary widely and hinge on sleep, training, and nutrition more than peptide branding.",
    "benefits": [
      "sleep quality and recovery interest in some users",
      "appetite changes reported by some users (direction varies)",
      "body composition interest in strength communities",
    ],
    "side_effects_common": [
      "headache",
      "water retention or bloating",
      "increased appetite",
      "fatigue or vivid dreams",
    ],
    "side_effects_serious": [
      "severe swelling, rash, or breathing trouble (allergic reaction)",
      "severe dizziness, fainting, or chest pain",
    ],
    "who_should_be_cautious": [
      "people with diabetes or poor glucose control",
      "people with active malignancy or strong cancer-risk concerns",
      "pregnant or breastfeeding individuals",
      "adolescents (endocrine axis risk plus non-essential use)",
    ],
  },

  "cjc-1295": {
    "bottom_line": "People use CJC-1295 for growth hormone axis stimulation and recovery goals. Real-world risk centers on endocrine disruption, sleep/appetite changes, and metabolic side effects.",
    "benefits": [
      "recovery and sleep interest in some users",
      "body composition interest in training communities",
      "sometimes discussed alongside other GH-axis peptides",
    ],
    "side_effects_common": [
      "headache",
      "water retention or swelling",
      "increased appetite",
      "flushing or injection-site irritation (when applicable)",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "severe dizziness, fainting, or chest pain",
    ],
    "who_should_be_cautious": [
      "people with diabetes or impaired glucose tolerance",
      "people with active malignancy or strong cancer-risk concerns",
      "pregnant or breastfeeding individuals",
      "adolescents (endocrine axis risk plus non-essential use)",
    ],
  },

  "tb-500": {
    "bottom_line": "People use TB-500 for injury and recovery goals based on thymosin beta-4 narratives. Practical risk centers on uncertain human outcomes, sourcing variability, and expectations that outpace evidence.",
    "benefits": [
      "injury recovery interest (tendon/soft tissue)",
      "training recovery interest",
      "general “repair” discussions in athletic communities",
    ],
    "side_effects_common": [
      "headache",
      "fatigue",
      "nausea",
      "sleep disruption in sensitive users",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "chest pain, fainting, or severe shortness of breath",
    ],
    "who_should_be_cautious": [
      "pregnant or breastfeeding individuals",
      "adolescents (developmental risk plus limited human evidence)",
      "people with active malignancy or strong cancer-risk concerns",
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


def patch_one(slug: str, apply_changes: bool) -> None:
  fp = PEPTIDES_DIR / f"{slug}.json"
  if not fp.exists():
    raise SystemExit(f"ERROR: missing peptide file: {fp}")

  if slug not in PATCH:
    raise SystemExit(f"ERROR: missing PATCH entry for slug: {slug}")

  if not apply_changes:
    print(f"DRY-RUN: would patch {slug}")
    return

  d = load_json(fp)
  pr = dict(PATCH[slug])
  pr["schema_version"] = "practical_block_v1"
  d["practical"] = pr
  save_json(fp, d)
  print(f"OK: patched {slug}")


def main() -> int:
  ap = argparse.ArgumentParser()
  ap.add_argument("--apply", action="store_true", help="Write changes to peptide JSON files")
  ap.add_argument("--dry-run", action="store_true", help="Show what would change (default behavior)")
  args = ap.parse_args()

  # Default to dry-run unless --apply is explicitly provided
  apply_changes = bool(args.apply)

  for slug in BATCH:
    patch_one(slug, apply_changes=apply_changes)

  return 0


if __name__ == "__main__":
  raise SystemExit(main())
