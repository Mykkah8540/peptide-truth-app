#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "hcg",
  "humanin",
  "igf-1",
  "igf-1-lr3",
  "kisspeptin",
]

PATCH = {
  "hcg": {
    "bottom_line": "hCG is a prescription fertility hormone with real endocrine impact. It is not a casual wellness peptide; unsupervised use can disrupt hormones and carries meaningful risks.",
    "benefits": [
      "clinical use in fertility and specific endocrine contexts (specialist care)",
      "stimulates testicular testosterone production in certain medical scenarios",
      "diagnostic relevance in some endocrine evaluations",
    ],
    "side_effects_common": [
      "headache",
      "mood changes or irritability",
      "water retention",
      "acne or skin changes",
      "breast tenderness",
    ],
    "side_effects_serious": [
      "shortness of breath, chest pain, or leg swelling (urgent evaluation)",
      "severe headache or vision changes",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone without clinician supervision for a medical indication",
      "people with hormone-sensitive cancers or high prostate/breast risk context",
      "people with prior blood clots or high clotting risk",
      "pregnant or breastfeeding individuals (context-specific medical use only)",
      "adolescents (developmental endocrine risk plus inappropriate use context)",
    ],
  },

  "humanin": {
    "bottom_line": "Humanin is discussed for mitochondrial and neuroprotection themes, but robust human outcomes are not established. Treat it as early-stage science with uncertain real-world benefit.",
    "benefits": [
      "research interest in cellular stress and mitochondrial signaling",
      "neuroprotection themes in early-stage literature discussions",
      "often framed as longevity support (claims frequently exceed evidence)",
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
      "people with significant cardiovascular disease",
      "people with cancer history or active malignancy concern (growth/survival signaling context)",
      "pregnant or breastfeeding individuals",
      "adolescents (limited human evidence and long-term uncertainty)",
    ],
  },

  "igf-1": {
    "bottom_line": "IGF-1 is a powerful growth factor with prescription uses in specific deficiencies. It is not a wellness peptide; misuse can carry serious risks, including metabolic and growth-related concerns.",
    "benefits": [
      "clinical use in rare IGF-1 deficiency contexts under specialist care",
      "physiology relevance in growth and metabolism signaling",
      "often discussed for muscle and recovery goals (high risk in non-medical use)",
    ],
    "side_effects_common": [
      "fluid retention",
      "joint pain",
      "headache",
      "fatigue",
      "blood sugar swings (including low blood sugar)",
    ],
    "side_effects_serious": [
      "severe hypoglycemia symptoms (confusion, fainting, seizure)",
      "chest pain, severe shortness of breath, or collapse",
      "severe swelling or neurologic symptoms (urgent evaluation)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone without endocrinology supervision for a defined indication",
      "people with diabetes or unstable blood sugar control",
      "people with cancer history or active malignancy concern (growth signaling context)",
      "pregnant or breastfeeding individuals",
      "adolescents (growth-axis manipulation plus high consequence)",
    ],
  },

  "igf-1-lr3": {
    "bottom_line": "IGF-1 LR3 is a long-acting IGF-1 analog used in research settings and discussed for physique goals. It is not a wellness peptide; growth-factor risks and metabolic effects are the central concern.",
    "benefits": [
      "research use as a long-acting IGF-1 analog",
      "bodybuilding/physique interest (high risk, low medical justification)",
      "anabolic signaling narratives (often overstated and not a safety substitute)",
    ],
    "side_effects_common": [
      "fluid retention",
      "joint pain",
      "headache",
      "fatigue",
      "blood sugar swings (including low blood sugar)",
    ],
    "side_effects_serious": [
      "severe hypoglycemia symptoms (confusion, fainting, seizure)",
      "chest pain, severe shortness of breath, or collapse",
      "rapid swelling, severe headache, or neurologic symptoms (urgent evaluation)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone without specialist medical oversight (high consequence growth-factor exposure)",
      "people with diabetes or unstable blood sugar control",
      "people with cancer history or active malignancy concern (growth signaling context)",
      "pregnant or breastfeeding individuals",
      "adolescents (growth-axis manipulation plus high consequence)",
    ],
  },

  "kisspeptin": {
    "bottom_line": "Kisspeptin is a hormone-regulating peptide involved in the reproductive axis and used in some fertility research/clinical contexts. It is not a casual wellness peptide; hormone disruption is the main risk outside supervision.",
    "benefits": [
      "clinical/research relevance in fertility and reproductive endocrinology",
      "physiology relevance in GnRH/LH/FSH signaling",
      "sometimes discussed for libido or fertility themes (should be medically guided)",
    ],
    "side_effects_common": [
      "headache",
      "nausea",
      "flushing",
      "mood changes",
    ],
    "side_effects_serious": [
      "severe pelvic or abdominal pain (urgent evaluation)",
      "fainting or severe dizziness",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone without endocrinology/fertility specialist supervision",
      "people with hormone-sensitive cancers or complex endocrine disorders",
      "pregnant or breastfeeding individuals",
      "adolescents (developmental endocrine risk plus inappropriate use context)",
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
