#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "nesiritide",
  "neuropeptide-s",
  "neuropeptide-y",
  "octreotide",
  "orexin-a",
]

PATCH = {
  "nesiritide": {
    "bottom_line": "Nesiritide is a prescription form of BNP used in acute heart failure care in monitored settings. It is not a wellness peptide; blood pressure and kidney effects can be dangerous without supervision.",
    "benefits": [
      "clinical relevance in acute decompensated heart failure contexts (monitored care)",
      "physiology relevance in natriuresis and vasodilation pathways",
    ],
    "side_effects_common": [
      "low blood pressure symptoms (lightheadedness, dizziness)",
      "headache",
      "nausea",
    ],
    "side_effects_serious": [
      "fainting or collapse from hypotension",
      "dangerous low blood pressure symptoms (confusion, severe weakness)",
      "worsening kidney function signs (reduced urination, swelling, confusion)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone not under direct medical supervision for acute heart failure care",
      "people with low blood pressure or on vasodilators/blood pressure meds",
      "people with kidney disease or unstable fluid balance",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence plus inappropriate for non-clinical use)",
    ],
  },

  "neuropeptide-s": {
    "bottom_line": "Neuropeptide S is a brain signaling peptide studied for arousal, anxiety-related pathways, and sleep-wake regulation. Human evidence is limited; effects are unpredictable and CNS-active risk is real.",
    "benefits": [
      "research relevance in arousal and anxiety-related circuitry",
      "sleep-wake regulation interest (evidence limited, often overstated)",
      "sometimes discussed for “alert calm” themes (anecdotal)",
    ],
    "side_effects_common": [
      "restlessness or jittery feeling",
      "headache",
      "sleep disruption",
      "nausea",
    ],
    "side_effects_serious": [
      "severe agitation, panic, or confusion",
      "chest pain, fainting, or severe shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with anxiety disorders, panic disorder, or bipolar disorder history",
      "people taking stimulants, antidepressants, or other CNS-active prescriptions",
      "people with seizure disorders",
      "pregnant or breastfeeding individuals",
      "adolescents (neurodevelopment uncertainty plus limited human evidence)",
    ],
  },

  "neuropeptide-y": {
    "bottom_line": "Neuropeptide Y is a widely distributed neuropeptide involved in appetite, stress resilience, and cardiovascular regulation. It is not a simple wellness peptide; systemic effects are broad and human outcomes are uncertain.",
    "benefits": [
      "physiology relevance in appetite and stress-response pathways",
      "research relevance in anxiety, PTSD resilience, and metabolic signaling",
    ],
    "side_effects_common": [
      "headache",
      "nausea",
      "fatigue",
      "changes in appetite",
    ],
    "side_effects_serious": [
      "significant blood pressure or heart-rate symptoms (chest pain, fainting)",
      "severe anxiety, agitation, or confusion",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with cardiovascular disease or uncontrolled blood pressure",
      "people with significant psychiatric history where arousal/anxiety shifts are risky",
      "pregnant or breastfeeding individuals",
      "adolescents (limited human evidence and broad systemic signaling)",
    ],
  },

  "octreotide": {
    "bottom_line": "Octreotide is a prescription somatostatin analog used in endocrine, GI, and bleeding-related indications in clinical care. It is not a wellness peptide; hormone, glucose, and GI effects can be significant.",
    "benefits": [
      "clinical relevance in acromegaly and certain neuroendocrine tumors (specialist care)",
      "clinical relevance in specific GI bleeding/variceal settings (medical supervision)",
      "physiology relevance in suppressing hormone secretion pathways",
    ],
    "side_effects_common": [
      "diarrhea or loose stools",
      "abdominal pain or cramping",
      "nausea",
      "injection-site pain (prescription context)",
    ],
    "side_effects_serious": [
      "severe abdominal pain (urgent evaluation)",
      "signs of gallbladder disease (right-upper belly pain, fever, jaundice)",
      "dangerous blood sugar changes (confusion, fainting)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "anyone not under specialist medical supervision for a clear indication",
      "people with gallbladder disease history",
      "people with diabetes or blood sugar instability",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence endocrine manipulation plus inappropriate context)",
    ],
  },

  "orexin-a": {
    "bottom_line": "Orexin-A (hypocretin-1) is a brain peptide central to wakefulness and arousal regulation. Human use outside research is high-risk; sleep, anxiety, and cardiovascular symptoms can be meaningful.",
    "benefits": [
      "physiology relevance in wakefulness and sleep-wake stability (narcolepsy biology)",
      "research relevance in arousal, motivation, and appetite-related circuitry",
    ],
    "side_effects_common": [
      "insomnia or sleep disruption",
      "restlessness",
      "headache",
      "nausea",
    ],
    "side_effects_serious": [
      "severe anxiety, agitation, or panic symptoms",
      "chest pain, fainting, or severe shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with insomnia, panic disorder, or severe anxiety history",
      "people with cardiovascular disease or uncontrolled blood pressure",
      "people taking stimulants or other CNS-active prescriptions",
      "pregnant or breastfeeding individuals",
      "adolescents (neurodevelopment uncertainty plus limited human evidence)",
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
