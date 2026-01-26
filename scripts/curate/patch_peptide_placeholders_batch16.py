#!/usr/bin/env python3
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

BATCH = [
  "aod-9604",
  "ara-290",
  "atrial-natriuretic-peptide",
  "bradykinin",
  "brain-natriuretic-peptide",
]

PATCH = {
  "aod-9604": {
    "bottom_line": "AOD-9604 is discussed for fat-loss and metabolic goals. Human outcomes are not well-established, so real-world expectations should be conservative.",
    "benefits": [
      "fat-loss interest driven by early mechanistic claims",
      "metabolic curiosity in wellness communities (evidence limited)",
      "often discussed in weight-management stacking conversations (anecdotal)",
    ],
    "side_effects_common": [
      "headache",
      "nausea or stomach upset",
      "sleep disruption in sensitive users",
    ],
    "side_effects_serious": [
      "chest pain, fainting, or severe shortness of breath",
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
    ],
    "who_should_be_cautious": [
      "people with diabetes or unstable blood sugar control",
      "people with cardiovascular disease or uncontrolled blood pressure",
      "pregnant or breastfeeding individuals",
      "adolescents (developmental risk plus limited evidence)",
    ],
  },

  "ara-290": {
    "bottom_line": "ARA-290 is discussed for nerve pain and inflammatory conditions based on early research directions. Human evidence is limited, so benefits are uncertain.",
    "benefits": [
      "neuropathic pain and nerve irritation interest (early-stage)",
      "inflammation-related symptom interest in some communities (anecdotal)",
      "sometimes discussed for small-fiber neuropathy contexts (evidence varies)",
    ],
    "side_effects_common": [
      "headache",
      "fatigue",
      "nausea",
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, trouble breathing)",
      "severe dizziness, fainting, or confusion",
    ],
    "who_should_be_cautious": [
      "people with autoimmune disease on immunomodulating medications",
      "people with complex neurologic conditions requiring close medical supervision",
      "pregnant or breastfeeding individuals",
      "adolescents (limited evidence and long-term uncertainty)",
    ],
  },

  "atrial-natriuretic-peptide": {
    "bottom_line": "Atrial natriuretic peptide (ANP) regulates fluid balance and blood pressure physiology. It is not a wellness peptide; unsupervised use could meaningfully affect blood pressure and electrolytes.",
    "benefits": [
      "physiology relevance for vascular tone and natriuresis",
      "clinical and research relevance in cardiovascular regulation",
    ],
    "side_effects_common": [
      "lightheadedness from lower blood pressure",
      "increased urination",
      "headache",
    ],
    "side_effects_serious": [
      "fainting or severe dizziness",
      "dangerous low blood pressure symptoms (confusion, collapse)",
      "signs of electrolyte imbalance (severe weakness, palpitations)",
    ],
    "who_should_be_cautious": [
      "people with low blood pressure or on blood pressure medications",
      "people with kidney disease or electrolyte disorders",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence plus limited context for use)",
    ],
  },

  "bradykinin": {
    "bottom_line": "Bradykinin is a potent mediator involved in inflammation and vascular permeability. It is not a wellness peptide; unsupervised use could cause dangerous swelling and blood pressure effects.",
    "benefits": [
      "physiology relevance in inflammation signaling and vascular permeability",
      "research relevance in pain and inflammatory pathways",
    ],
    "side_effects_common": [
      "flushing or warmth",
      "headache",
      "lightheadedness",
    ],
    "side_effects_serious": [
      "throat, tongue, or facial swelling",
      "severe shortness of breath or wheezing",
      "fainting or collapse",
    ],
    "who_should_be_cautious": [
      "anyone with a history of angioedema or severe allergic reactions",
      "people with asthma or airway reactivity",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence plus inappropriate for non-clinical use)",
    ],
  },

  "brain-natriuretic-peptide": {
    "bottom_line": "Brain natriuretic peptide (BNP) is a cardiovascular hormone used clinically as a biomarker and is relevant to fluid balance and cardiac strain. It is not a wellness peptide; unsupervised use could affect blood pressure and fluid status.",
    "benefits": [
      "clinical relevance as a heart-failure biomarker (BNP/NT-proBNP)",
      "physiology relevance in natriuresis and vascular tone regulation",
    ],
    "side_effects_common": [
      "lightheadedness from lower blood pressure",
      "headache",
      "fatigue",
    ],
    "side_effects_serious": [
      "fainting or severe dizziness",
      "dangerous low blood pressure symptoms (confusion, collapse)",
      "signs of electrolyte imbalance (severe weakness, palpitations)",
    ],
    "who_should_be_cautious": [
      "people with low blood pressure or on vasodilators/blood pressure meds",
      "people with kidney disease or unstable fluid balance",
      "pregnant or breastfeeding individuals",
      "adolescents (high consequence plus limited context for use)",
    ],
  },
}

def load_json(path: Path) -> dict:
  with path.open("r", encoding="utf-8") as f:
    return json.load(f)

def save_json(path: Path, data: dict) -> None:
  with path.open("w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write("\n")

def apply(slug: str) -> None:
  fp = PEPTIDES_DIR / f"{slug}.json"
  if not fp.exists():
    raise SystemExit(f"ERROR: missing peptide file: {fp}")

  d = load_json(fp)
  pr = PATCH[slug].copy()
  pr["schema_version"] = "practical_block_v1"
  d["practical"] = pr
  save_json(fp, d)
  print(f"OK: patched {slug}")

def main() -> int:
  for slug in BATCH:
    apply(slug)
  return 0

if __name__ == "__main__":
  raise SystemExit(main())
