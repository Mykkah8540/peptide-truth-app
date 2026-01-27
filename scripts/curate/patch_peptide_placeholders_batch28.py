#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "snap-8",
  "somatostatin",
  "substance-p",
  "survodutide",
  "teriparatide",
]

PATCH = {
  "snap-8": {
    "bottom_line": "SNAP-8 is a cosmetic peptide used in skincare for the appearance of expression lines. It’s best understood as topical-only; systemic use is higher-risk with little upside.",
    "benefits": [
      "cosmetic interest for the look of fine lines (topical use common)",
      "often marketed as a ‘relaxing’ peptide for expression areas (marketing heavy)",
      "best framed as appearance-focused, not health-focused",
    ],
    "side_effects_common": [
      "skin irritation or redness (topical)",
      "itching or rash",
      "dryness or sensitivity",
    ],
    "side_effects_serious": [
      "widespread rash or swelling that escalates quickly",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with very reactive skin or severe dermatitis history",
      "pregnant or breastfeeding individuals",
      "adolescents (cosmetic use still has limited long-term data)",
      "anyone combining many strong skincare actives (irritation stacking)",
    ],
  },

  "somatostatin": {
    "bottom_line": "Somatostatin is a powerful hormone that suppresses growth hormone and several GI hormones. It is not a wellness peptide; altering this pathway outside medical supervision can have wide effects.",
    "benefits": [
      "clinical relevance in endocrine and GI hormone regulation contexts (supervised use)",
      "physiology relevance across growth hormone, insulin/glucagon, and GI signaling",
      "used as the basis for prescription analogs in specific medical indications",
    ],
    "side_effects_common": [
      "nausea or stomach upset",
      "abdominal cramping",
      "changes in blood sugar symptoms (weakness, shakiness)",
      "fatigue",
    ],
    "side_effects_serious": [
      "severe blood sugar instability (confusion, fainting)",
      "severe abdominal pain or persistent vomiting",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with diabetes or unstable blood sugar control",
      "people with endocrine disorders or pituitary disease",
      "pregnant or breastfeeding individuals",
      "adolescents (endocrine development risk plus inappropriate use context)",
    ],
  },

  "substance-p": {
    "bottom_line": "Substance P is a neuropeptide involved in pain signaling, inflammation, and nausea pathways. It is not a wellness peptide; altering neuroimmune signaling outside research can carry real risk.",
    "benefits": [
      "research relevance in pain and neuroinflammation pathways",
      "physiology relevance in nausea and sensory signaling",
      "often mentioned in inflammation/pain discussions (claims can be speculative)",
    ],
    "side_effects_common": [
      "flushing or warmth",
      "headache",
      "nausea",
      "lightheadedness",
    ],
    "side_effects_serious": [
      "severe shortness of breath or wheezing",
      "fainting or collapse",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with asthma or airway reactivity",
      "people with significant cardiovascular disease or frequent fainting",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence plus inappropriate for non-clinical use)",
    ],
  },

  "survodutide": {
    "bottom_line": "Survodutide is a dual-agonist drug candidate discussed for weight loss and metabolic goals. It can strongly affect appetite and GI tolerance, and long-term real-world outcomes are still evolving.",
    "benefits": [
      "weight-loss support discussions in clinical-trial and emerging-therapy contexts",
      "reduced appetite and ‘food noise’ discussions (variable)",
      "metabolic risk-factor improvement themes (context-dependent)",
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
      "fainting or collapse from poor intake or dehydration",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with a history of pancreatitis or severe GI disease",
      "people with eating disorder history or extreme appetite suppression risk",
      "people on diabetes medications (hypoglycemia-risk context when combined)",
      "pregnant or breastfeeding individuals",
      "adolescents (high-consequence metabolic manipulation plus limited context)",
    ],
  },

  "teriparatide": {
    "bottom_line": "Teriparatide is a prescription parathyroid hormone analog used for osteoporosis and fracture-risk reduction. It is not a wellness peptide; it affects calcium and bone metabolism and must be medically supervised.",
    "benefits": [
      "bone density and fracture-risk reduction in osteoporosis contexts (prescription use)",
      "clinical relevance in severe osteopenia/osteoporosis management",
      "anabolic bone-building mechanism under medical supervision",
    ],
    "side_effects_common": [
      "nausea",
      "dizziness or lightheadedness",
      "leg cramps",
      "joint or bone pain",
    ],
    "side_effects_serious": [
      "signs of high calcium (confusion, severe weakness, irregular heartbeat)",
      "fainting or collapse",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with hypercalcemia or parathyroid disorders",
      "people with bone cancer history, skeletal radiation history, or high bone-turnover disorders",
      "pregnant or breastfeeding individuals",
      "adolescents (bone growth/development risk plus inappropriate use context)",
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
