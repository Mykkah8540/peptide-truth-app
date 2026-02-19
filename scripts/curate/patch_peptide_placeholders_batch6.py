#!/usr/bin/env python3
"""
Batch 6: practical_block_v1 for:
- melanotan-i
- melanotan-ii
- oxytocin
- tb-500

Rules:
- Educational only. Not medical advice. No prescriptive directives or personalized instruction. Observational transparency allowed when lane-separated.
- schema_version must be practical_block_v1.
- Avoid validator "weasel wording" like: may/might/could/expected/likely/possibly.
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
    "bottom_line": "Melanotan I is discussed for tanning and reduced sun sensitivity. Human evidence is limited, and real-world risk is driven by unregulated sourcing and overexposure behavior.",
    "benefits": [
      "Tanning / increased skin pigmentation interest",
      "Interest in reduced sunburn frequency during sun exposure",
      "Cosmetic interest for more even-looking tone (user-reported)"
    ],
    "side_effects_common": [
      "Nausea",
      "Flushing or warmth",
      "Headache",
      "Decreased appetite",
      "Injection-site irritation (if injected)"
    ],
    "side_effects_serious": [
      "New, changing, or rapidly darkening moles/lesions",
      "Severe allergic reaction (hives, facial swelling, trouble breathing)",
      "Severe dizziness, fainting, or chest pain"
    ],
    "who_should_be_cautious": [
      "Anyone with a personal history of melanoma or high-risk skin cancer",
      "People with many atypical moles or a strong family history of melanoma",
      "People with cardiovascular disease or uncontrolled hypertension",
      "Pregnant or breastfeeding individuals",
      "Anyone under 18"
    ]
  })

  patch_slug("melanotan-ii", {
    "schema_version": "practical_block_v1",
    "bottom_line": "Melanotan II is discussed for tanning and sometimes libido effects. Evidence quality is limited; the largest practical risk is unregulated sourcing and behavior that increases UV damage.",
    "benefits": [
      "Tanning / increased skin pigmentation interest",
      "Cosmetic interest for quicker pigment changes than sun alone (user-reported)",
      "Libido/arousal effects are commonly discussed (user-reported)"
    ],
    "side_effects_common": [
      "Nausea",
      "Flushing or warmth",
      "Headache",
      "Appetite suppression",
      "Darkening of freckles and existing moles",
      "Injection-site irritation (if injected)"
    ],
    "side_effects_serious": [
      "New, changing, or rapidly darkening moles/lesions",
      "Severe allergic reaction (hives, facial swelling, trouble breathing)",
      "Prolonged painful erection (priapism)",
      "Severe dizziness, fainting, or chest pain"
    ],
    "who_should_be_cautious": [
      "Anyone with a personal history of melanoma or high-risk skin cancer",
      "People with many atypical moles or a strong family history of melanoma",
      "People with cardiovascular disease or uncontrolled hypertension",
      "People with a history of priapism or significant urologic disease",
      "Pregnant or breastfeeding individuals",
      "Anyone under 18"
    ]
  })

  patch_slug("oxytocin", {
    "schema_version": "practical_block_v1",
    "bottom_line": "Oxytocin is a human hormone used medically in obstetrics; off-label wellness use focuses on mood and social effects. Evidence for these effects is mixed, and side effects depend on route and context.",
    "benefits": [
      "Clinical use in labor and postpartum bleeding control (medical setting)",
      "Interest in social bonding / affiliative behavior effects (research and user interest)",
      "Interest in anxiety modulation in select contexts (mixed evidence)"
    ],
    "side_effects_common": [
      "Headache",
      "Nausea",
      "Dizziness",
      "Nasal irritation (intranasal use)",
      "Fatigue"
    ],
    "side_effects_serious": [
      "Significant blood pressure changes, fainting, or chest pain",
      "Severe allergic reaction (hives, facial swelling, trouble breathing)",
      "Confusion, severe headache, or seizures (electrolyte disturbance risk)",
      "Uterine cramping/bleeding outside appropriate medical supervision"
    ],
    "who_should_be_cautious": [
      "Pregnant individuals (obstetric effects are primary and clinically significant)",
      "People with significant cardiovascular disease or arrhythmia history",
      "People with seizure disorders or history of severe hyponatremia",
      "Anyone under 18"
    ]
  })

  patch_slug("tb-500", {
    "schema_version": "practical_block_v1",
    "bottom_line": "TB-500 is a synthetic peptide discussed for soft-tissue recovery and inflammation signaling. Human clinical evidence is limited; practical risk is driven by non-medical use and unregulated sourcing.",
    "benefits": [
      "Interest in tendon/ligament recovery support (community use)",
      "Interest in muscle recovery and training continuity during rehab (community use)",
      "Interest in inflammation-related comfort signals (community use)"
    ],
    "side_effects_common": [
      "Injection-site irritation (if injected)",
      "Fatigue or low energy",
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
