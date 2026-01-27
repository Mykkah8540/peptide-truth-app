#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "ghrp-2",
  "ghrp-6",
  "glucagon",
  "glutathione",
  "gonadorelin",
]

PATCH = {
  "ghrp-2": {
    "bottom_line": "GHRP-2 is a growth hormone secretagogue discussed for recovery and body-composition goals. It can influence appetite and endocrine signaling, and long-term safety in non-medical use is not established.",
    "benefits": [
      "recovery and sleep-quality discussions in performance communities (variable)",
      "body-composition interest via growth-hormone signaling narratives (evidence mixed)",
      "sometimes discussed for appetite effects (can increase hunger)",
    ],
    "side_effects_common": [
      "increased hunger",
      "water retention or puffiness",
      "fatigue or sleepiness",
      "headache",
    ],
    "side_effects_serious": [
      "chest pain, fainting, or severe shortness of breath",
      "severe swelling, numbness/tingling, or sudden weakness (urgent evaluation)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with diabetes or unstable blood sugar control",
      "people with cancer history or active malignancy concern (growth signaling context)",
      "people with significant cardiovascular disease or uncontrolled blood pressure",
      "pregnant or breastfeeding individuals",
      "adolescents (endocrine manipulation plus long-term uncertainty)",
    ],
  },

  "ghrp-6": {
    "bottom_line": "GHRP-6 is a growth hormone secretagogue known for strong hunger effects and discussed for recovery/body-composition goals. Appetite changes and endocrine effects are common; non-medical use is high-uncertainty.",
    "benefits": [
      "recovery and sleep discussions in some communities (variable)",
      "body-composition interest via growth-hormone signaling narratives (mixed evidence)",
      "appetite stimulation is commonly reported (can be a downside for many)",
    ],
    "side_effects_common": [
      "increased hunger (often pronounced)",
      "water retention or puffiness",
      "fatigue or sleepiness",
      "headache",
    ],
    "side_effects_serious": [
      "chest pain, fainting, or severe shortness of breath",
      "severe swelling, numbness/tingling, or sudden weakness (urgent evaluation)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with diabetes or unstable blood sugar control",
      "people with eating disorder history or problematic overeating patterns",
      "people with cancer history or active malignancy concern (growth signaling context)",
      "pregnant or breastfeeding individuals",
      "adolescents (endocrine manipulation plus long-term uncertainty)",
    ],
  },

  "glucagon": {
    "bottom_line": "Glucagon is a prescription rescue hormone used to treat severe hypoglycemia. It is not a wellness peptide; it can meaningfully shift blood sugar and cardiovascular stress responses.",
    "benefits": [
      "life-saving clinical use for severe low blood sugar (emergency context)",
      "physiology relevance in glucose regulation and counter-regulatory signaling",
      "clinical relevance in diagnostic settings (medical supervision)",
    ],
    "side_effects_common": [
      "nausea",
      "vomiting",
      "headache",
      "temporary increased heart rate",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "severe or persistent vomiting with dehydration",
      "severe chest pain, fainting, or collapse",
    ],
    "who_should_be_cautious": [
      "anyone without clinician direction for an approved indication",
      "people with pheochromocytoma or insulinoma (specialist-only context)",
      "people with significant cardiovascular disease",
      "pregnant or breastfeeding individuals (medical context required)",
      "adolescents (only appropriate in supervised medical care)",
    ],
  },

  "glutathione": {
    "bottom_line": "Glutathione is discussed for antioxidant and skin-brightening goals, but outcomes vary and product quality matters. It’s best treated as supportive at best, not a dramatic fix.",
    "benefits": [
      "antioxidant support discussions (evidence varies by context)",
      "skin tone/brightening discussions (high hype-to-evidence gap in marketing)",
      "sometimes discussed for liver or toxin-exposure themes (context-dependent)",
    ],
    "side_effects_common": [
      "headache",
      "nausea or stomach upset",
      "rash or itching",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "wheezing or bronchospasm in sensitive individuals",
      "severe dizziness, fainting, or collapse",
    ],
    "who_should_be_cautious": [
      "people with asthma or airway reactivity",
      "people with multiple medication allergies or prior severe reactions",
      "pregnant or breastfeeding individuals",
      "adolescents (limited long-term data for cosmetic-driven use)",
    ],
  },

  "gonadorelin": {
    "bottom_line": "Gonadorelin is a prescription GnRH analog used in fertility and endocrine testing contexts. It is not a wellness peptide; hormone-axis disruption is the core risk in non-medical use.",
    "benefits": [
      "clinical relevance in diagnostic testing of pituitary-gonadal function",
      "clinical relevance in fertility-related protocols under specialist care",
      "physiology relevance in LH/FSH signaling",
    ],
    "side_effects_common": [
      "headache",
      "nausea",
      "hot flashes or flushing",
      "mood changes",
    ],
    "side_effects_serious": [
      "severe pelvic or abdominal pain (urgent evaluation)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "fainting or severe dizziness",
    ],
    "who_should_be_cautious": [
      "anyone without endocrinology/fertility specialist supervision",
      "people with hormone-sensitive cancers or complex endocrine disease",
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
