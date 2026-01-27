#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "thymulin",
  "triptorelin",
  "vasopressin",
  "vip",
  "ziconotide",
]

PATCH = {
  "thymulin": {
    "bottom_line": "Thymulin is discussed in immune-modulation and thymus-related aging narratives. Human outcomes are not well-established, so expectations should be conservative and hype should be treated skeptically.",
    "benefits": [
      "research relevance in thymic/immune signaling pathways",
      "immune ‘support’ discussions in some wellness communities (variable)",
      "often included in ‘rejuvenation’ narratives (claims frequently exceed evidence)",
    ],
    "side_effects_common": [
      "headache",
      "fatigue",
      "flu-like feelings",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "worsening autoimmune symptoms that are severe or rapidly progressive",
    ],
    "who_should_be_cautious": [
      "people with autoimmune disease, especially on immunomodulating prescriptions",
      "people with immune suppression or active infection concerns",
      "pregnant or breastfeeding individuals",
      "adolescents (limited evidence and immune-development uncertainty)",
    ],
  },

  "triptorelin": {
    "bottom_line": "Triptorelin is a prescription GnRH agonist that can strongly suppress sex hormones after an initial surge. It is not a wellness peptide; endocrine manipulation carries serious risks and requires medical supervision.",
    "benefits": [
      "clinical relevance in hormone-dependent conditions (prescription use)",
      "used in specific fertility and oncology-related protocols (supervised care)",
      "mechanistic relevance in pituitary–gonadal axis regulation",
    ],
    "side_effects_common": [
      "hot flashes",
      "mood changes or irritability",
      "headache",
      "fatigue",
    ],
    "side_effects_serious": [
      "severe depression or suicidal thoughts",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "chest pain, fainting, or severe shortness of breath",
    ],
    "who_should_be_cautious": [
      "anyone not under direct medical supervision for a defined endocrine indication",
      "people with severe depression or psychiatric history",
      "pregnant or breastfeeding individuals",
      "adolescents (puberty/development risk plus inappropriate use context)",
    ],
  },

  "vasopressin": {
    "bottom_line": "Vasopressin (ADH) is a powerful hormone controlling water balance and blood vessel tone. It is not a wellness peptide; misuse can cause dangerous sodium and blood pressure problems.",
    "benefits": [
      "clinical relevance in specific shock and diabetes insipidus contexts (supervised care)",
      "physiology relevance in water retention and vascular tone regulation",
      "research relevance in kidney and cardiovascular regulation pathways",
    ],
    "side_effects_common": [
      "headache",
      "nausea",
      "abdominal cramping",
      "blood pressure changes felt as dizziness or head pressure",
    ],
    "side_effects_serious": [
      "dangerous low sodium symptoms (confusion, seizure, severe weakness)",
      "severe chest pain or shortness of breath",
      "fainting or collapse",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with heart failure, kidney disease, or unstable fluid balance",
      "people with low sodium history or seizure risk",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence plus inappropriate for non-clinical use)",
    ],
  },

  "vip": {
    "bottom_line": "VIP (vasoactive intestinal peptide) is a potent neuropeptide affecting blood vessels, lungs, and gut function. It is not a routine wellness peptide; altering these systems outside medical oversight can be risky.",
    "benefits": [
      "research relevance in airway, vascular, and GI signaling",
      "physiology relevance in smooth muscle relaxation and secretion pathways",
      "often discussed for inflammatory or respiratory themes (claims can be speculative)",
    ],
    "side_effects_common": [
      "flushing",
      "headache",
      "lightheadedness",
      "nausea or diarrhea",
    ],
    "side_effects_serious": [
      "fainting or collapse from blood pressure effects",
      "severe shortness of breath or wheezing",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with low blood pressure or on vasodilators/blood pressure meds",
      "people with significant asthma/airway reactivity or severe GI disease",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence plus inappropriate for non-clinical use)",
    ],
  },

  "ziconotide": {
    "bottom_line": "Ziconotide is a powerful, prescription-only pain medication used via intrathecal pump for severe chronic pain. It is not a wellness peptide; neuropsychiatric and neurologic risks can be serious.",
    "benefits": [
      "clinical relevance for severe refractory chronic pain (specialist-supervised use)",
      "non-opioid analgesic mechanism (N-type calcium channel blocker) relevance",
      "used only in narrow, high-acuity pain-management settings",
    ],
    "side_effects_common": [
      "dizziness",
      "nausea",
      "confusion",
      "headache",
    ],
    "side_effects_serious": [
      "severe confusion, hallucinations, or psychosis",
      "severe weakness, inability to walk, or new neurologic deficits",
      "suicidal thoughts or severe mood changes",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone not under specialist pain-management supervision",
      "people with psychiatric illness history (psychosis, severe depression)",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence plus inappropriate for non-clinical use)",
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
