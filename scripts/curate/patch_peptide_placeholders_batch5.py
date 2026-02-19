#!/usr/bin/env python3
"""
Batch 5: promote selected peptides from placeholder -> practical_block_v1.

Rules:
- Educational only. Not medical advice. No prescriptive directives or personalized instruction. Observational transparency allowed when lane-separated. No vendor guidance.
- practical.schema_version must be "practical_block_v1".
- Avoid validator "weasel wording" like: may/might/could/expected/likely/possibly/contraindications may apply.
- Tone: neutral, practical, uncertainty-forward.
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


def set_practical(d: Dict[str, Any], practical: Dict[str, Any]) -> None:
  # Practical lives at top-level in this repo’s current convention.
  d["practical"] = practical


def patch_slug(slug: str, practical: Dict[str, Any]) -> None:
  fp = PEPTIDES_DIR / f"{slug}.json"
  if not fp.exists():
    raise SystemExit(f"ERROR: missing peptide file: {fp}")
  d = load_json(fp)
  set_practical(d, practical)
  save_json(fp, d)
  print(f"OK: patched {slug}")


def main() -> int:
  # Selank
  patch_slug("selank", {
    "schema_version": "practical_block_v1",
    "bottom_line": "Selank is discussed as a calming, anxiety-oriented nootropic peptide. Human evidence is limited and effects vary widely by person. The main real-world risk is treating it as a substitute for clinical care or relying on unregulated sourcing.",
    "benefits": [
      "calmer baseline mood / reduced anxious feeling (community-reported)",
      "stress tolerance support during high-pressure periods (community-reported)",
      "sleep continuity support in people whose sleep is disrupted by anxiety (community-reported)",
      "cognitive steadiness under stress (community-reported)"
    ],
    "side_effects_common": [
      "headache",
      "fatigue or “flat” feeling",
      "nausea or stomach upset",
      "irritability or mood shift"
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, breathing difficulty)",
      "marked mood destabilization (panic escalation, agitation, suicidal thoughts)"
    ],
    "who_should_be_cautious": [
      "people with severe anxiety, panic disorder, bipolar disorder, or major depression",
      "people taking psychiatric medications (coordinate with a clinician; avoid abrupt changes)",
      "pregnancy or breastfeeding",
      "anyone with a history of serious allergic reactions to peptides"
    ]
  })

  # Semax
  patch_slug("semax", {
    "schema_version": "practical_block_v1",
    "bottom_line": "Semax is discussed as a focus and cognition peptide used in nootropic communities. Human evidence is limited and not definitive, and experiences range from “noticeable” to “no effect.” Real-world risk is overstimulation, sleep disruption, or substituting it for evaluation of attention or mood disorders.",
    "benefits": [
      "focus / task initiation support (community-reported)",
      "mental clarity during fatigue or stress (community-reported)",
      "motivation / drive support (community-reported)",
      "cognitive “sharpness” support (community-reported)"
    ],
    "side_effects_common": [
      "headache",
      "restlessness or feeling wired",
      "sleep disruption",
      "irritability"
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, breathing difficulty)",
      "marked mood destabilization (agitation, panic escalation, suicidal thoughts)"
    ],
    "who_should_be_cautious": [
      "people with bipolar disorder, panic disorder, or severe anxiety",
      "people taking psychiatric medications (coordinate with a clinician; avoid abrupt changes)",
      "pregnancy or breastfeeding",
      "anyone with a history of serious allergic reactions to peptides"
    ]
  })

  # NAD+
  patch_slug("nad-plus", {
    "schema_version": "practical_block_v1",
    "bottom_line": "NAD+ is framed as a cellular energy and aging-related molecule. In practice, the biggest gap is that “NAD+ benefits” claims often outpace human evidence. Real-world risk is cost chasing, exaggerated expectations, and ignoring the basics that drive energy and recovery (sleep, nutrition, training load, medical evaluation).",
    "benefits": [
      "fatigue reduction or “energy” improvement (mixed, community-reported)",
      "recovery support during high workload periods (community-reported)",
      "general wellness interest tied to aging and mitochondrial discussions",
      "interest in metabolic health framing (not definitive)"
    ],
    "side_effects_common": [
      "nausea",
      "headache",
      "flushing or feeling warm",
      "stomach upset"
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, breathing difficulty)",
      "chest pain, fainting, or severe shortness of breath"
    ],
    "who_should_be_cautious": [
      "people with significant heart disease or arrhythmia history",
      "pregnancy or breastfeeding",
      "people with chronic kidney disease",
      "anyone with a history of serious allergic reactions"
    ]
  })

  # GHK-Cu
  patch_slug("ghk-cu", {
    "schema_version": "practical_block_v1",
    "bottom_line": "GHK-Cu is most commonly discussed for skin and hair applications (texture, appearance, wound support). Human evidence varies by use and formulation. Real-world risk concentrates around skin irritation, allergic reactions, and inconsistent product quality.",
    "benefits": [
      "skin texture and overall appearance support (cosmetic use)",
      "support for minor skin recovery / post-procedure routines (cosmetic context)",
      "hair and scalp interest (community-reported)",
      "general cosmetic anti-aging interest"
    ],
    "side_effects_common": [
      "skin irritation or burning sensation",
      "redness or rash",
      "itching",
      "acne-like breakouts"
    ],
    "side_effects_serious": [
      "severe allergic reaction symptoms (hives, facial swelling, breathing difficulty)",
      "signs of skin infection (spreading redness, heat, pus, fever)"
    ],
    "who_should_be_cautious": [
      "people with eczema, psoriasis, or highly reactive skin",
      "people with known copper allergy or metal sensitivities",
      "pregnancy or breastfeeding",
      "anyone with a history of severe allergic reactions"
    ]
  })

  return 0


if __name__ == "__main__":
  raise SystemExit(main())
