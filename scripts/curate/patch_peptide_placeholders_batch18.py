#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "cagrilintide",
  "kpv",
  "mots-c",
  "melanotan-ii",
  "acetyl-hexapeptide-8",
]

PATCH = {
  "cagrilintide": {
    "bottom_line": "Cagrilintide is discussed for appetite control and weight-loss support, often alongside GLP-1 medications. It can strongly affect appetite and GI tolerance, and misuse risks are real.",
    "benefits": [
      "appetite control and reduced food noise discussions",
      "weight-loss support discussions, often in combo with GLP-1s",
      "sometimes discussed for “portion control” and adherence to calorie targets",
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
    ],
    "who_should_be_cautious": [
      "people with a history of pancreatitis or severe GI disease",
      "people with eating disorder history or extreme appetite suppression risk",
      "people on diabetes medications (hypoglycemia risk context when combined)",
      "pregnant or breastfeeding individuals",
      "adolescents (high-consequence metabolic manipulation plus limited evidence)",
    ],
  },

  "kpv": {
    "bottom_line": "KPV is discussed for gut and skin inflammation themes, especially in IBD-adjacent or dermatitis conversations. Human evidence is limited; benefits are uncertain and product quality matters.",
    "benefits": [
      "gut irritation and inflammation discussions (evidence limited)",
      "skin irritation and redness discussions in some communities (variable)",
      "often framed as a “calming” peptide (claims frequently outpace evidence)",
    ],
    "side_effects_common": [
      "headache",
      "nausea or stomach upset",
      "fatigue",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "worsening symptoms that are severe or rapidly progressive",
    ],
    "who_should_be_cautious": [
      "people with autoimmune disease on prescription immunomodulators",
      "people with severe GI disease who are unstable or frequently hospitalized",
      "pregnant or breastfeeding individuals",
      "adolescents (limited evidence and long-term uncertainty)",
    ],
  },

  "mots-c": {
    "bottom_line": "MOTS-c is discussed for metabolic health and exercise performance themes, often framed as “mitochondrial support.” Human evidence is limited, so expectations should be conservative.",
    "benefits": [
      "metabolic health curiosity (early-stage evidence)",
      "exercise tolerance and recovery discussions (mixed, often overstated)",
      "sometimes discussed for insulin sensitivity themes (uncertain outcomes)",
    ],
    "side_effects_common": [
      "headache",
      "nausea",
      "fatigue",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "chest pain, fainting, or severe shortness of breath",
    ],
    "who_should_be_cautious": [
      "people with diabetes or unstable blood sugar control",
      "people with significant cardiovascular disease",
      "pregnant or breastfeeding individuals",
      "adolescents (limited human evidence and endocrine/metabolic uncertainty)",
    ],
  },

  "melanotan-ii": {
    "bottom_line": "Melanotan II is used for tanning and is also known for libido-related effects. Risks are real: nausea is common, pigmentation changes can be lasting, and sourcing/quality problems are widespread.",
    "benefits": [
      "increased tanning response and reduced sunburn tendency discussions",
      "libido effects are commonly reported (unpredictable)",
      "sometimes discussed for appetite suppression (variable)",
    ],
    "side_effects_common": [
      "nausea",
      "flushing",
      "yawning or fatigue",
      "increased freckles or darkening of existing moles",
    ],
    "side_effects_serious": [
      "rapidly changing mole or new irregular pigmented lesion",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "severe blood pressure symptoms (fainting, collapse)",
    ],
    "who_should_be_cautious": [
      "people with many moles, atypical moles, or melanoma history (pigment-risk context)",
      "people with uncontrolled hypertension or cardiovascular disease",
      "pregnant or breastfeeding individuals",
      "adolescents (cosmetic-driven use with meaningful long-term uncertainty)",
    ],
  },

  "acetyl-hexapeptide-8": {
    "bottom_line": "Acetyl hexapeptide-8 is a cosmetic peptide best known as “Argireline,” used for the look of expression lines. It is primarily a topical ingredient; systemic use is higher-risk with little upside.",
    "benefits": [
      "cosmetic interest for fine lines and skin texture (topical use common)",
      "often used in skincare routines as a “Botox-like” cosmetic claim (marketing heavy)",
      "best framed as appearance-focused, not health-focused",
    ],
    "side_effects_common": [
      "skin irritation or redness (topical)",
      "itching or rash",
      "dryness or sensitivity",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "widespread rash or swelling that escalates quickly",
    ],
    "who_should_be_cautious": [
      "people with very reactive skin or severe dermatitis history",
      "pregnant or breastfeeding individuals",
      "adolescents (cosmetic use still has limited long-term data)",
      "anyone combining many strong skincare actives (irritation stacking)",
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
