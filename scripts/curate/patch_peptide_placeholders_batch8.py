#!/usr/bin/env python3
"""
Batch 8: practical_block_v1 for:
- melanotan-i
- melanotan-ii
- oxytocin
- tb-500

Rules:
- Educational only. Not medical advice. No prescriptive directives or personalized instruction. Observational transparency allowed when lane-separated.
- schema_version must be practical_block_v1.
- Avoid validator "weasel wording" like: may/might/could/likely/possibly/expected.
"""

from __future__ import annotations
import json
from pathlib import Path
from typing import Any, Dict

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

def load_json(p: Path) -> Dict[str, Any]:
  return json.loads(p.read_text(encoding="utf-8"))

def save_json(p: Path, d: Dict[str, Any]) -> None:
  p.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def patch_slug(slug: str, practical: Dict[str, Any]) -> None:
  fp = PEPTIDES_DIR / f"{slug}.json"
  if not fp.exists():
    raise SystemExit(f"ERROR: missing peptide file: {fp}")
  d = load_json(fp)
  d["practical"] = practical
  save_json(fp, d)
  print(f"OK: patched {slug}")

def main() -> int:
  patch_slug("melanotan-i", {
    "schema_version": "practical_block_v1",
    "bottom_line": "Melanotan I is a peptide analog related to pigmentation pathways and is discussed for tanning and skin tone effects. Practical risk is driven by side effects, cosmetic overuse patterns, and unregulated sourcing.",
    "benefits": [
      "Tanning and pigmentation interest (community use)",
      "Interest in reducing sun exposure time (community use)"
    ],
    "side_effects_common": [
      "Nausea",
      "Headache",
      "Flushing",
      "Increased appetite"
    ],
    "side_effects_serious": [
      "Severe allergic reaction (hives, facial swelling, trouble breathing)",
      "New or rapidly changing mole or skin lesion",
      "Severe vomiting or dehydration symptoms"
    ],
    "who_should_be_cautious": [
      "People with a personal history of melanoma or high-risk skin cancer",
      "People with many atypical moles or strong family history of melanoma",
      "Pregnant or breastfeeding individuals",
      "Anyone under 18"
    ]
  })

  patch_slug("melanotan-ii", {
    "schema_version": "practical_block_v1",
    "bottom_line": "Melanotan II is discussed for tanning and sometimes libido effects. Practical risk includes side effects, pigment changes, and unregulated sourcing in non-medical settings.",
    "benefits": [
      "Tanning and pigmentation interest (community use)",
      "Libido and sexual interest (community use)"
    ],
    "side_effects_common": [
      "Nausea",
      "Flushing",
      "Headache",
      "Increased appetite"
    ],
    "side_effects_serious": [
      "Severe allergic reaction (hives, facial swelling, trouble breathing)",
      "New or rapidly changing mole or skin lesion",
      "Severe prolonged erection requiring urgent care"
    ],
    "who_should_be_cautious": [
      "People with a personal history of melanoma or high-risk skin cancer",
      "People with many atypical moles or strong family history of melanoma",
      "People with significant cardiovascular disease",
      "Pregnant or breastfeeding individuals",
      "Anyone under 18"
    ]
  })

  patch_slug("oxytocin", {
    "schema_version": "practical_block_v1",
    "bottom_line": "Oxytocin has established medical uses and is discussed in wellness contexts for mood, bonding, and social effects. Practical risk is driven by inappropriate self-use and individual sensitivity.",
    "benefits": [
      "Interest in social calm and connection effects (community use)",
      "Interest in stress response modulation (community use)",
      "Clinical relevance in obstetric settings (medical context)"
    ],
    "side_effects_common": [
      "Headache",
      "Nausea",
      "Dizziness",
      "Fatigue"
    ],
    "side_effects_serious": [
      "Severe allergic reaction (hives, facial swelling, trouble breathing)",
      "Chest pain, fainting, or severe palpitations",
      "Severe confusion or agitation"
    ],
    "who_should_be_cautious": [
      "Pregnant individuals (non-medical use is inappropriate)",
      "People with significant cardiovascular disease or arrhythmia history",
      "People with bipolar disorder or a history of mania",
      "Anyone under 18"
    ]
  })

  patch_slug("tb-500", {
    "schema_version": "practical_block_v1",
    "bottom_line": "TB-500 is marketed as a repair and recovery peptide, often associated with thymosin beta-4 fragments. Practical risk is driven by limited human evidence in wellness use and unregulated sourcing.",
    "benefits": [
      "Soft tissue recovery interest (community use)",
      "Interest in rehab support and return-to-training (community use)",
      "Interest in mobility and comfort during recovery (community use)"
    ],
    "side_effects_common": [
      "Injection-site irritation (if injected)",
      "Fatigue",
      "Headache",
      "Nausea"
    ],
    "side_effects_serious": [
      "Severe allergic reaction (hives, facial swelling, trouble breathing)",
      "Fever, chills, spreading redness, or drainage at injection site",
      "Severe dizziness, fainting, or chest pain"
    ],
    "who_should_be_cautious": [
      "People with active cancer or recent cancer treatment",
      "People with immune suppression or active infection",
      "Pregnant or breastfeeding individuals",
      "Anyone under 18"
    ]
  })

  return 0

if __name__ == "__main__":
  raise SystemExit(main())
