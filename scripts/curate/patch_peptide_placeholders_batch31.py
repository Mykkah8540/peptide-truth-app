#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "follistatin-344",
  "ghrp-2",
  "ghrp-6",
  "glucagon",
  "glutathione",
]

PATCH = {
  "follistatin-344": {
    "bottom_line": "Follistatin-344 is discussed for muscle growth and myostatin-related themes, but the real-world evidence base is weak and the biology intersects with growth signaling. Treat hype as a red flag and risk as non-trivial.",
    "benefits": [
      "muscle growth and body composition discussions (evidence limited, hype-heavy)",
      "myostatin pathway interest (mechanistic framing often outruns data)",
      "sometimes discussed in performance communities (anecdotal, high variance)",
    ],
    "side_effects_common": [
      "headache",
      "fatigue",
      "sleep disruption in sensitive users",
    ],
    "side_effects_serious": [
      "chest pain, fainting, or severe shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "unexpected swelling or rapidly worsening symptoms",
    ],
    "who_should_be_cautious": [
      "people with cancer history or active malignancy concerns (growth signaling context)",
      "people with cardiovascular disease or uncontrolled blood pressure",
      "pregnant or breastfeeding individuals",
      "adolescents (developmental risk plus high uncertainty)",
    ],
  },

  "ghrp-2": {
    "bottom_line": "GHRP-2 is discussed for growth-hormone axis effects, appetite changes, and recovery themes. Endocrine manipulation carries real risks and outcomes vary widely; expectations should be conservative.",
    "benefits": [
      "growth-hormone axis interest (variable; claims often exceed evidence)",
      "recovery and sleep discussions in some communities (anecdotal)",
      "appetite effects are sometimes reported (unpredictable)",
    ],
    "side_effects_common": [
      "increased appetite or hunger swings",
      "water retention or swelling",
      "headache",
      "sleep disruption in some users",
    ],
    "side_effects_serious": [
      "chest pain, fainting, or severe shortness of breath",
      "severe blood sugar symptoms (confusion, fainting) in susceptible users",
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

  "ghrp-6": {
    "bottom_line": "GHRP-6 is discussed for growth-hormone axis effects and is especially known for strong hunger signals. Appetite and metabolic effects can be significant; endocrine manipulation is not low-risk.",
    "benefits": [
      "growth-hormone axis interest (variable; evidence mixed)",
      "appetite stimulation is commonly reported (can be extreme)",
      "sometimes discussed for recovery themes (anecdotal)",
    ],
    "side_effects_common": [
      "strong hunger or overeating risk",
      "water retention or swelling",
      "headache",
      "sleep disruption in some users",
    ],
    "side_effects_serious": [
      "severe blood sugar symptoms (confusion, fainting) in susceptible users",
      "chest pain, fainting, or severe shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with diabetes or unstable blood sugar control",
      "people with obesity or eating disorder history (appetite dysregulation risk)",
      "people with cancer history or active malignancy concerns (growth signaling context)",
      "pregnant or breastfeeding individuals",
      "adolescents (developmental endocrine risk plus inappropriate use context)",
    ],
  },

  "glucagon": {
    "bottom_line": "Glucagon is a prescription hormone used to treat severe hypoglycemia and in certain medical procedures. It can meaningfully raise blood sugar and affect heart rate; it is not a wellness peptide.",
    "benefits": [
      "life-saving clinical relevance for severe hypoglycemia (medical use)",
      "used in specific diagnostic/procedural settings under supervision",
      "physiology relevance in glucose regulation",
    ],
    "side_effects_common": [
      "nausea",
      "vomiting",
      "headache",
      "fast heart rate or palpitations",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "severe chest pain, fainting, or collapse",
      "severe or persistent vomiting with dehydration",
    ],
    "who_should_be_cautious": [
      "anyone not in a prescription emergency/medical context",
      "people with pheochromocytoma or certain endocrine tumors (high-risk context)",
      "people with significant cardiovascular disease",
      "pregnant or breastfeeding individuals",
      "adolescents unless prescribed (high consequence metabolic effects)",
    ],
  },

  "glutathione": {
    "bottom_line": "Glutathione is an antioxidant discussed for ‘detox’ and skin-brightening claims, but real-world outcomes are inconsistent and marketing is heavy. Focus on realistic expectations and product quality.",
    "benefits": [
      "antioxidant biology relevance (mechanistic)",
      "common discussions around general wellness and recovery (evidence mixed)",
      "skin tone/brightening claims are common but often overstated",
    ],
    "side_effects_common": [
      "nausea or stomach upset",
      "headache",
      "rash or itching",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "wheezing or severe shortness of breath in susceptible users",
      "rapidly worsening rash or swelling",
    ],
    "who_should_be_cautious": [
      "people with asthma or airway reactivity",
      "people with significant medication regimens where interactions are a concern",
      "pregnant or breastfeeding individuals",
      "adolescents (limited evidence and unnecessary risk for cosmetic goals)",
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
