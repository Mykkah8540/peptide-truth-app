#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "orexin-a",
  "palmitoyl-pentapeptide-4",
  "palmitoyl-tripeptide-1",
  "peg-mgf",
  "pentagastrin",
]

PATCH = {
  "orexin-a": {
    "bottom_line": "Orexin-A is a neuropeptide central to wakefulness and arousal. It is not a wellness peptide; messing with orexin signaling can meaningfully affect sleep, anxiety, and cardiovascular tone.",
    "benefits": [
      "physiology relevance in wakefulness and narcolepsy biology",
      "research relevance in appetite, arousal, and autonomic regulation",
      "sometimes discussed for daytime alertness themes (non-clinical context is risky)",
    ],
    "side_effects_common": [
      "insomnia or sleep fragmentation",
      "anxiety or jitteriness",
      "headache",
      "increased heart rate or palpitations",
    ],
    "side_effects_serious": [
      "severe agitation, panic, or confusion",
      "chest pain, fainting, or severe shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with anxiety disorders or bipolar disorder (arousal pathway sensitivity)",
      "people with cardiovascular disease or arrhythmia history",
      "people with severe sleep disorders under medical management",
      "pregnant or breastfeeding individuals",
      "adolescents (neurodevelopment risk plus inappropriate use context)",
    ],
  },

  "palmitoyl-pentapeptide-4": {
    "bottom_line": "Palmitoyl pentapeptide-4 is a cosmetic peptide used topically for skin texture and fine lines, often known as “Matrixyl.” It’s primarily a skincare ingredient; systemic use is higher-risk with little upside.",
    "benefits": [
      "cosmetic interest for skin texture and fine lines (topical use common)",
      "often used in skincare as a collagen-support marketing claim (evidence varies by formulation)",
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

  "palmitoyl-tripeptide-1": {
    "bottom_line": "Palmitoyl tripeptide-1 is a cosmetic peptide used topically for skin appearance and barrier support, often associated with “Matrixyl” blends. It’s mainly a skincare ingredient; systemic use is higher-risk with little upside.",
    "benefits": [
      "cosmetic interest for fine lines and skin texture (topical use common)",
      "often included in multi-peptide skincare formulas (effects depend on formulation)",
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

  "peg-mgf": {
    "bottom_line": "PEG-MGF is discussed in performance and muscle-building circles as a modified growth-factor fragment. Human outcomes and safety are not well-established, and contamination/mislabeling risk is high.",
    "benefits": [
      "muscle-building and recovery discussions (largely anecdotal)",
      "often marketed around satellite cells and muscle repair narratives (claims frequently exceed evidence)",
      "performance-oriented interest in bodybuilding communities (high variability)",
    ],
    "side_effects_common": [
      "headache",
      "fatigue",
      "injection site irritation",
    ],
    "side_effects_serious": [
      "abnormal swelling or severe pain at injection site",
      "chest pain, fainting, or severe shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with cancer history or active malignancy concern (growth signaling context)",
      "people with diabetes or unstable blood sugar control",
      "people with cardiovascular disease",
      "pregnant or breastfeeding individuals",
      "adolescents (developmental risk plus inappropriate use context)",
    ],
  },

  "pentagastrin": {
    "bottom_line": "Pentagastrin is a diagnostic/physiology tool that stimulates gastric acid secretion. It is not a wellness peptide; non-medical use can provoke severe GI symptoms and dangerous complications in susceptible people.",
    "benefits": [
      "clinical/diagnostic relevance in gastric physiology contexts (supervised use)",
      "research relevance in acid secretion and GI hormone signaling",
    ],
    "side_effects_common": [
      "abdominal cramping",
      "nausea",
      "flushing",
      "diarrhea",
    ],
    "side_effects_serious": [
      "severe abdominal pain with persistent vomiting",
      "black/tarry stools or vomiting blood (GI bleeding signs)",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with ulcers, GI bleeding history, or severe reflux disease",
      "people with inflammatory bowel disease or severe GI instability",
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
