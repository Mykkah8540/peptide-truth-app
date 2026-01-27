#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "bpc-157",
  "ghk-cu",
  "ipamorelin",
  "cjc-1295",
  "tb-500",
]

PATCH = {
  "bpc-157": {
    "bottom_line": "BPC-157 is discussed for gut irritation and injury-recovery goals. Human evidence is limited; expectations should be conservative and quality/testing matters.",
    "benefits": [
      "gut irritation and reflux symptom discussions (real-world interest, evidence limited)",
      "soft-tissue and joint recovery discussions in training communities (anecdotal)",
      "often framed as a \"recovery support\" peptide rather than a performance enhancer",
    ],
    "side_effects_common": [
      "headache",
      "nausea or stomach upset",
      "fatigue or “off” feeling",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "persistent chest pain, fainting, or severe shortness of breath",
    ],
    "who_should_be_cautious": [
      "pregnant or breastfeeding individuals",
      "adolescents (limited evidence and developmental uncertainty)",
      "people with complex autoimmune or inflammatory disease on prescription immunomodulators",
      "anyone using multiple unverified compounds (contamination and mislabeling risk)",
    ],
  },

  "ghk-cu": {
    "bottom_line": "GHK-Cu is best known for skin and hair/cosmetic use. It is widely discussed topically; injectable use is higher-risk with less real-world clarity.",
    "benefits": [
      "cosmetic interest for skin appearance and texture (topical use common)",
      "discussion around hair/scalp health in cosmetic communities (mixed evidence)",
      "used as a general “skin support” ingredient in some formulations",
    ],
    "side_effects_common": [
      "skin irritation or redness (topical)",
      "itching or rash",
      "headache in sensitive users",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "widespread rash or swelling that escalates quickly",
    ],
    "who_should_be_cautious": [
      "people with copper sensitivity or severe dermatitis history",
      "pregnant or breastfeeding individuals",
      "adolescents (cosmetic use still has limited long-term data)",
      "anyone prone to allergic reactions to skincare actives",
    ],
  },

  "ipamorelin": {
    "bottom_line": "Ipamorelin is a growth-hormone secretagogue discussed for recovery, sleep, and body composition goals. It can affect appetite, fluid balance, and glucose regulation.",
    "benefits": [
      "recovery and sleep-quality discussions in training communities (subjective reports vary)",
      "body composition interest tied to GH/IGF-1 signaling (outcomes vary)",
      "often mentioned as a “milder” GH secretagogue compared with older options",
    ],
    "side_effects_common": [
      "increased appetite",
      "water retention or puffiness",
      "headache or lethargy",
    ],
    "side_effects_serious": [
      "worsening glucose control in susceptible users",
      "severe swelling, shortness of breath, or chest pain",
    ],
    "who_should_be_cautious": [
      "people with diabetes, prediabetes, or unstable blood sugar",
      "people with untreated sleep apnea (GH axis and fluid shifts can matter)",
      "pregnant or breastfeeding individuals",
      "adolescents (endocrine-axis impact plus limited non-medical context)",
    ],
  },

  "cjc-1295": {
    "bottom_line": "CJC-1295 is a GHRH analog discussed to stimulate growth-hormone signaling. It can meaningfully affect endocrine physiology, appetite, fluid balance, and glucose control.",
    "benefits": [
      "sleep and recovery interest tied to GH physiology (real-world reports vary)",
      "body composition interest in training communities (outcomes vary)",
      "sometimes discussed alongside other GH-axis peptides (stacking culture)",
    ],
    "side_effects_common": [
      "flushing or warmth",
      "water retention or swelling",
      "headache",
    ],
    "side_effects_serious": [
      "worsening glucose control in susceptible users",
      "severe swelling, palpitations, or fainting",
    ],
    "who_should_be_cautious": [
      "people with diabetes, prediabetes, or metabolic syndrome",
      "people with active cancer or a high cancer-risk history (growth signaling context)",
      "pregnant or breastfeeding individuals",
      "adolescents (endocrine-axis impact plus long-term uncertainty)",
    ],
  },

  "tb-500": {
    "bottom_line": "TB-500 is marketed as a recovery peptide linked to thymosin beta-4 fragments. Real-world use centers on soft-tissue recovery claims; human evidence is limited.",
    "benefits": [
      "soft-tissue recovery discussions (anecdotal, evidence limited)",
      "general “inflammation control” claims in some communities (often overstated)",
      "sometimes grouped with other injury-healing compounds in recovery culture",
    ],
    "side_effects_common": [
      "fatigue",
      "headache",
      "nausea",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "persistent chest pain, fainting, or severe shortness of breath",
    ],
    "who_should_be_cautious": [
      "people with active cancer or a high cancer-risk history (tissue-growth signaling context)",
      "pregnant or breastfeeding individuals",
      "adolescents (limited evidence and developmental uncertainty)",
      "anyone using unverified sources (contamination and mislabeling risk)",
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
