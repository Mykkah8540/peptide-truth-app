#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "ll-37",
  "mazdutide",
]

PATCH = {
  "ll-37": {
    "bottom_line": "LL-37 is a human antimicrobial peptide studied in immunity and inflammation. Outside of clinical research, product claims often outpace evidence and quality control is a major concern.",
    "benefits": [
      "research relevance in innate immunity and antimicrobial activity",
      "inflammation and skin-related discussions in some communities (evidence mixed)",
      "sometimes discussed in chronic infection or biofilm narratives (claims often exceed data)",
    ],
    "side_effects_common": [
      "injection or site irritation (when used improperly)",
      "headache",
      "fatigue",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "rapidly worsening inflammatory symptoms or severe swelling",
      "chest pain, fainting, or severe shortness of breath",
    ],
    "who_should_be_cautious": [
      "people with autoimmune disease or immune dysregulation",
      "people on prescription immunosuppressants or immunomodulators",
      "pregnant or breastfeeding individuals",
      "adolescents (limited evidence and immune-development uncertainty)",
    ],
  },

  "mazdutide": {
    "bottom_line": "Mazdutide is an investigational incretin-based drug discussed for weight loss and metabolic goals. Effects on appetite and GI tolerance can be strong, and non-prescription sourcing adds real risk.",
    "benefits": [
      "appetite reduction and reduced food-noise discussions (variable)",
      "weight-loss support discussions (investigational context)",
      "metabolic health interest such as glucose and cardiometabolic markers (context-dependent)",
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
      "fainting or collapse from dehydration or poor intake",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with a history of pancreatitis or severe GI disease",
      "people on diabetes medications where hypoglycemia risk context applies",
      "people with eating disorder history or extreme appetite suppression risk",
      "pregnant or breastfeeding individuals",
      "adolescents (high-consequence metabolic manipulation plus limited context)",
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
