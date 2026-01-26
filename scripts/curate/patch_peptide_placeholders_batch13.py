#!/usr/bin/env python3
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

def load_json(p: Path) -> dict:
  return json.loads(p.read_text(encoding="utf-8"))

def save_json(p: Path, d: dict) -> None:
  p.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def ensure_practical_block(d: dict, practical: dict) -> dict:
  # Always store practical at top-level (this is what validators expect).
  practical = dict(practical)
  practical["schema_version"] = "practical_block_v1"
  d["practical"] = practical
  return d

BATCH = {
  "5-amino-1mq": {
    "bottom_line": "5-Amino-1MQ is an experimental compound discussed as an NNMT inhibitor in metabolism and body-composition communities. Human clinical evidence is sparse; most claims come from preclinical work and anecdotal reporting.",
    "benefits": [
      "interest in fat-loss and body-composition support",
      "interest in metabolic flexibility and energy regulation",
      "used in weight-management experimentation discussions (anecdotal)",
      "curiosity around NNMT biology and NAD-related pathways (mechanistic)"
    ],
    "side_effects_common": [
      "headache",
      "nausea or stomach discomfort",
      "restlessness or sleep disruption",
      "reduced appetite"
    ],
    "side_effects_serious": [
      "allergic reaction signs: hives, facial swelling, trouble breathing",
      "chest pain, fainting, or severe shortness of breath",
      "severe agitation, confusion, or panic symptoms"
    ],
    "who_should_be_cautious": [
      "pregnant or breastfeeding people",
      "people with significant liver or kidney disease",
      "people with uncontrolled anxiety, bipolar disorder, or psychosis history",
      "people using multiple stimulants or strong appetite suppressants"
    ]
  },

  "acetyl-hexapeptide-8": {
    "bottom_line": "Acetyl hexapeptide-8 (often called Argireline) is a cosmetic peptide used topically to reduce the appearance of fine lines. Effects are cosmetic and surface-level; it is not a medical treatment.",
    "benefits": [
      "cosmetic smoothing of fine lines (topical use)",
      "improved skin feel and hydration when used in routine formulations",
      "common inclusion in anti-aging skincare products"
    ],
    "side_effects_common": [
      "skin irritation or stinging at the application site",
      "dryness or peeling",
      "redness",
      "itching"
    ],
    "side_effects_serious": [
      "allergic dermatitis: spreading rash, intense itching, blistering",
      "facial swelling or throat tightness after use"
    ],
    "who_should_be_cautious": [
      "people with a history of severe fragrance or cosmetic allergies",
      "people with active eczema, rosacea flares, or open skin lesions",
      "people using multiple new actives at once (retinoids, acids) without patch testing"
    ]
  },

  "adipotide": {
    "bottom_line": "Adipotide is an experimental research peptide investigated for selective effects on fat tissue vasculature in preclinical models. Human-use claims are not supported by robust clinical evidence, and safety concerns have been raised in animal studies.",
    "benefits": [
      "interest in targeted fat-tissue biology (research context)",
      "discussion in extreme weight-loss experimentation communities (anecdotal)"
    ],
    "side_effects_common": [
      "nausea",
      "fatigue",
      "loss of appetite"
    ],
    "side_effects_serious": [
      "kidney injury signs: reduced urination, swelling of legs, dark urine",
      "severe dehydration signs: dizziness, confusion, inability to keep fluids down",
      "allergic reaction signs: hives, facial swelling, trouble breathing"
    ],
    "who_should_be_cautious": [
      "people with any kidney disease or reduced kidney function",
      "people with uncontrolled high blood pressure",
      "pregnant or breastfeeding people",
      "people with eating-disorder history or medically fragile weight status"
    ]
  },

  "amylin": {
    "bottom_line": "Amylin is a hormone co-secreted with insulin that influences satiety and slows gastric emptying. In practice, discussions often reference prescription amylin analogs (for example, pramlintide) used in diabetes care.",
    "benefits": [
      "satiety support and reduced appetite signaling (physiology)",
      "slower post-meal glucose rise (diabetes care context)",
      "interest in weight-management support when medically supervised"
    ],
    "side_effects_common": [
      "nausea",
      "reduced appetite",
      "fullness or bloating",
      "headache"
    ],
    "side_effects_serious": [
      "hypoglycemia when combined with insulin or insulin secretagogues",
      "persistent vomiting or severe abdominal pain",
      "allergic reaction signs: hives, facial swelling, trouble breathing"
    ],
    "who_should_be_cautious": [
      "people using insulin or sulfonylureas",
      "people with gastroparesis or severe reflux",
      "people with a history of severe hypoglycemia",
      "pregnant or breastfeeding people"
    ]
  },

  "angiotensin-ii": {
    "bottom_line": "Angiotensin II is a potent vasoconstrictor hormone used medically in critical-care settings for specific shock states. It is not a wellness compound; the primary real-world risk is dangerous blood-pressure and clotting effects.",
    "benefits": [
      "life-support use in ICU settings for refractory shock under physician management",
      "mechanistic relevance to blood-pressure regulation (education)"
    ],
    "side_effects_common": [
      "headache",
      "high blood pressure",
      "nausea"
    ],
    "side_effects_serious": [
      "severe hypertension with chest pain, severe headache, vision changes",
      "stroke or heart attack symptoms: one-sided weakness, slurred speech, crushing chest pressure",
      "limb or organ ischemia signs: severe pain, cold or pale limb, sudden severe abdominal pain",
      "blood clots (thromboembolism) symptoms: sudden shortness of breath, leg swelling and pain"
    ],
    "who_should_be_cautious": [
      "people with uncontrolled hypertension",
      "people with prior stroke, heart attack, or vascular disease",
      "people with known clotting disorders or recent thrombosis",
      "pregnant or breastfeeding people"
    ]
  },
}

def main() -> int:
  for slug, practical in BATCH.items():
    p = PEPTIDES_DIR / f"{slug}.json"
    if not p.exists():
      print(f"SKIP: missing {slug}.json")
      continue
    d = load_json(p)
    d = ensure_practical_block(d, practical)
    save_json(p, d)
    print(f"OK: patched {slug}")
  return 0

if __name__ == "__main__":
  raise SystemExit(main())
