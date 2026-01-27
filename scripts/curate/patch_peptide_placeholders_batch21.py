#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "bpc-157-arginate",
  "calcitonin",
  "carbetocin",
  "cgrp",
  "cjc-1295-dac",
]

PATCH = {
  "bpc-157-arginate": {
    "bottom_line": "BPC-157 arginate is a variant form discussed in injury and recovery communities. Human outcomes are not established, and product quality variation is a major real-world risk.",
    "benefits": [
      "injury and recovery discussions borrowed from BPC-157 narratives",
      "often framed as a “stronger” or “more stable” version (claims exceed evidence)",
      "used in anecdotal stacking conversations (low-quality signal)",
    ],
    "side_effects_common": [
      "headache",
      "nausea or stomach upset",
      "sleep disruption in sensitive users",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "chest pain, fainting, or severe shortness of breath",
    ],
    "who_should_be_cautious": [
      "people with cancer history or active malignancy concern",
      "people with autoimmune disease on immunomodulating medications",
      "pregnant or breastfeeding individuals",
      "adolescents (limited evidence and long-term uncertainty)",
    ],
  },

  "calcitonin": {
    "bottom_line": "Calcitonin is a prescription hormone used for specific bone and calcium-related indications. It is not a wellness peptide; electrolyte and hormone effects can be meaningful outside medical care.",
    "benefits": [
      "clinical relevance in select bone and calcium-related indications (prescription care)",
      "physiology relevance in calcium regulation pathways",
    ],
    "side_effects_common": [
      "nausea",
      "flushing",
      "injection-site irritation (prescription context)",
      "headache",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "signs of low calcium (muscle cramps, tingling, severe weakness)",
      "severe dizziness or fainting",
    ],
    "who_should_be_cautious": [
      "anyone without clinician supervision for a clear indication",
      "people with calcium/electrolyte disorders",
      "pregnant or breastfeeding individuals",
      "adolescents (endocrine manipulation plus inappropriate context)",
    ],
  },

  "carbetocin": {
    "bottom_line": "Carbetocin is a prescription oxytocin analog used in obstetric care to support uterine contraction. It is not a wellness peptide; blood pressure and uterine effects make non-medical use high-risk.",
    "benefits": [
      "clinical relevance in postpartum uterine atony prevention/treatment (medical care)",
      "physiology relevance in uterine contractility signaling",
    ],
    "side_effects_common": [
      "nausea",
      "headache",
      "flushing",
      "dizziness",
    ],
    "side_effects_serious": [
      "severe blood pressure symptoms (fainting, collapse)",
      "chest pain or severe shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "pregnant individuals (outside supervised obstetric care)",
      "people with cardiovascular disease or unstable blood pressure",
      "people with seizure disorders",
      "breastfeeding individuals (clinical context matters)",
      "adolescents (high consequence plus inappropriate context)",
    ],
  },

  "cgrp": {
    "bottom_line": "CGRP is a vasoactive neuropeptide central to migraine biology and vascular tone. It is not a wellness peptide; systemic vascular effects make non-medical use high-risk.",
    "benefits": [
      "research relevance in migraine and trigeminal pain pathways",
      "physiology relevance in vasodilation and neurovascular signaling",
    ],
    "side_effects_common": [
      "headache changes (worsening or atypical patterns)",
      "flushing",
      "dizziness",
      "nausea",
    ],
    "side_effects_serious": [
      "fainting or collapse",
      "chest pain, severe shortness of breath, or severe weakness",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with cardiovascular disease or unstable blood pressure",
      "people with complex neurologic conditions requiring supervision",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence plus inappropriate context)",
    ],
  },

  "cjc-1295-dac": {
    "bottom_line": "CJC-1295 with DAC is a long-acting GHRH analog discussed for growth-hormone axis effects. Endocrine manipulation is high-consequence, and non-medical use is high-risk.",
    "benefits": [
      "growth-hormone axis interest (claims vary and are commonly overstated)",
      "body composition and recovery discussions in performance communities (anecdotal)",
      "sleep-related discussions tied to GH narratives (variable)",
    ],
    "side_effects_common": [
      "headache",
      "flushing",
      "water retention or swelling",
      "sleep disruption in sensitive users",
    ],
    "side_effects_serious": [
      "chest pain, fainting, or severe shortness of breath",
      "severe blood sugar symptoms (confusion, fainting)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with diabetes or unstable blood sugar control",
      "people with cancer history or active malignancy concern",
      "people with endocrine disorders requiring specialist management",
      "pregnant or breastfeeding individuals",
      "adolescents (endocrine axis disruption plus long-term uncertainty)",
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
