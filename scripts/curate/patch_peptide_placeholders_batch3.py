#!/usr/bin/env python3
"""
Batch 3 — replace placeholder practical blocks with compliant practical_block_v1
Peptides:
- semaglutide
- tirzepatide
- retatrutide
- ipamorelin
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES = ROOT / "content" / "peptides"

BATCH = [
    "semaglutide",
    "tirzepatide",
    "retatrutide",
    "ipamorelin",
]

def patch(slug: str):
    path = PEPTIDES / f"{slug}.json"
    if not path.exists():
        print(f"SKIP: {slug} (file not found)")
        return

    data = json.loads(path.read_text(encoding="utf-8"))

    data["practical"] = {
        "schema_version": "practical_block_v1",
        "bottom_line": (
            "This peptide is discussed primarily in metabolic and body-composition contexts. "
            "Human evidence exists for some indications, but real-world use often exceeds approved frameworks. "
            "Risk is driven by dose escalation, stacking, and sourcing quality."
        ),
        "benefits": [
            "appetite regulation effects discussed in clinical contexts",
            "weight and metabolic interest in obesity-related discussions",
            "investigated effects on insulin sensitivity and glycemic control",
        ],
        "side_effects_common": [
            "nausea or GI discomfort",
            "reduced appetite beyond intended levels",
            "fatigue during adjustment periods",
        ],
        "side_effects_serious": [
            "persistent vomiting or dehydration",
            "gallbladder complications reported in some contexts",
            "hypoglycemia risk when combined with other agents",
        ],
        "who_should_be_cautious": [
            "individuals with prior GI disorders",
            "those with eating disorder history",
            "people combining multiple metabolic agents",
        ],
    }

    path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"OK: patched {slug}")

def main():
    for slug in BATCH:
        patch(slug)

if __name__ == "__main__":
    main()
