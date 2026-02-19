#!/usr/bin/env python3
"""
Batch 7: practical_block_v1 for:
- thymosin-alpha-1
- thymosin-beta-4
- thymosin-beta-4-full
- thymosin-beta-4-fragment (optional; skip if missing)
- ss-31

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

def patch_slug(slug: str, practical: Dict[str, Any], *, optional: bool = False) -> None:
  fp = PEPTIDES_DIR / f"{slug}.json"
  if not fp.exists():
    if optional:
      print(f"SKIP: missing optional peptide file: {slug}")
      return
    raise SystemExit(f"ERROR: missing peptide file: {fp}")
  d = load_json(fp)
  d["practical"] = practical
  save_json(fp, d)
  print(f"OK: patched {slug}")

def main() -> int:
  patch_slug("thymosin-alpha-1", {
    "schema_version": "practical_block_v1",
    "bottom_line": "Thymosin alpha-1 is used clinically in some countries for immune-related indications and is discussed in immune support contexts. Practical risk depends heavily on medical oversight and product quality.",
    "benefits": [
      "Immune system modulation interest (clinical use exists in some regions)",
      "Interest in resilience during frequent infections (community use)",
      "Interest in immune recovery during stress or heavy training (community use)"
    ],
    "side_effects_common": [
      "Injection-site irritation (if injected)",
      "Fatigue",
      "Headache",
      "Nausea"
    ],
    "side_effects_serious": [
      "Severe allergic reaction (hives, facial swelling, trouble breathing)",
      "High fever or severe systemic symptoms",
      "Severe rash with mucosal involvement"
    ],
    "who_should_be_cautious": [
      "People with autoimmune disease flares or unstable autoimmune disease",
      "People on immune-suppressing therapy or transplant recipients",
      "Pregnant or breastfeeding individuals",
      "Anyone under 18"
    ]
  })

  patch_slug("thymosin-beta-4", {
    "schema_version": "practical_block_v1",
    "bottom_line": "Thymosin beta-4 is discussed for tissue repair and recovery. Human evidence is limited in many wellness use cases; practical risk is driven by unregulated sourcing and non-medical administration.",
    "benefits": [
      "Soft tissue recovery interest (community use)",
      "Interest in wound or injury recovery support (community use)",
      "Interest in training continuity during rehab (community use)"
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

  patch_slug("thymosin-beta-4-full", {
    "schema_version": "practical_block_v1",
    "bottom_line": "Thymosin beta-4 (full-length) is discussed for tissue repair and recovery. Most real-world uncertainty comes from limited human data in wellness contexts and variable product quality.",
    "benefits": [
      "Soft tissue recovery interest (community use)",
      "Interest in wound or injury recovery support (community use)",
      "Interest in mobility and comfort during rehab (community use)"
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

  patch_slug("thymosin-beta-4-fragment", {
    "schema_version": "practical_block_v1",
    "bottom_line": "Thymosin beta-4 fragments are discussed for tissue recovery and repair signals. Practical risk is driven by limited human evidence in wellness use and product variability.",
    "benefits": [
      "Soft tissue recovery interest (community use)",
      "Interest in injury recovery support (community use)",
      "Interest in training continuity during rehab (community use)"
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
  }, optional=True)

  patch_slug("ss-31", {
    "schema_version": "practical_block_v1",
    "bottom_line": "SS-31 is a mitochondria-targeted peptide studied in select clinical research contexts. Consumer wellness narratives often run ahead of evidence; practical risk includes overinterpretation and unregulated sourcing.",
    "benefits": [
      "Interest in mitochondrial function and fatigue-related symptoms (research interest)",
      "Interest in recovery and resilience narratives (community use)",
      "Interest in age-related decline narratives (community use)"
    ],
    "side_effects_common": [
      "Headache",
      "Nausea",
      "Fatigue",
      "Injection-site irritation (if injected)"
    ],
    "side_effects_serious": [
      "Severe allergic reaction (hives, facial swelling, trouble breathing)",
      "Severe dizziness, fainting, or chest pain",
      "High fever or severe systemic symptoms"
    ],
    "who_should_be_cautious": [
      "People with significant cardiovascular disease or unstable medical conditions",
      "Pregnant or breastfeeding individuals",
      "Anyone under 18"
    ]
  })

  return 0

if __name__ == "__main__":
  raise SystemExit(main())
