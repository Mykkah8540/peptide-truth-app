#!/usr/bin/env python3
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

PENDING_PHRASE = "Pep-Talk curation pending"

def load_json(p: Path) -> dict:
    return json.loads(p.read_text(encoding="utf-8"))

def save_json(p: Path, d: dict) -> None:
    p.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def is_placeholder_text(s: str) -> bool:
    s2 = (s or "").strip().lower()
    return (not s2) or (PENDING_PHRASE.lower() in s2)

def practical_is_placeholder(pr: dict | None) -> bool:
    if not isinstance(pr, dict):
        return True
    bl = str(pr.get("bottom_line") or "").strip()
    counts = (
        len(pr.get("benefits") or []),
        len(pr.get("side_effects_common") or []),
        len(pr.get("side_effects_serious") or []),
        len(pr.get("who_should_be_cautious") or []),
    )
    # If the bottom_line is placeholder OR all arrays are empty, treat as placeholder.
    return is_placeholder_text(bl) or counts == (0, 0, 0, 0)

def apply_practical(slug: str, patch: dict) -> None:
    fp = PEPTIDES_DIR / f"{slug}.json"
    if not fp.exists():
        print(f"SKIP: missing {slug}.json")
        return

    d = load_json(fp)

    # root practical (authoritative for validator)
    pr = d.get("practical") if isinstance(d.get("practical"), dict) else None
    if not practical_is_placeholder(pr):
        print(f"SKIP: {slug} already has non-placeholder practical")
        return

    d["practical"] = patch

    save_json(fp, d)
    print(f"OK: patched {slug}")

BATCH = {
  "thymosin-alpha-1": {
    "schema_version": "practical_block_v1",
    "bottom_line": "Thymosin alpha-1 is an immune-modulating peptide discussed for infection resilience and immune regulation. It has clinical history in certain medical contexts, but wellness use often outruns the evidence quality. The biggest practical risk is treating it like a guaranteed immune booster rather than a context-dependent immunology tool.",
    "benefits": [
      "immune modulation / resilience interest (context-dependent)",
      "supportive care interest during higher infection risk periods",
      "interest in immune balance in chronic inflammation discussions",
      "curiosity in adjunct use alongside lifestyle and sleep optimization"
    ],
    "side_effects_common": [
      "injection-site irritation (redness, soreness)",
      "headache",
      "fatigue",
      "flu-like feelings"
    ],
    "side_effects_serious": [
      "allergic reaction signs (hives, facial swelling, trouble breathing)",
      "severe rash or widespread skin reaction"
    ],
    "who_should_be_cautious": [
      "people with autoimmune disease or a history of immune dysregulation",
      "people on immunosuppressive therapy or with organ transplant history",
      "pregnant or breastfeeding people",
      "under-18 users (limited developmental data)"
    ]
  },
  "thymosin-beta-4": {
    "schema_version": "practical_block_v1",
    "bottom_line": "Thymosin beta-4 is discussed for tissue repair and recovery, especially in tendon and soft-tissue circles. Human clinical evidence in wellness contexts is limited and mixed, and many claims are extrapolated from early models. Real-world risk is driven by sourcing, expectations, and stacking it into aggressive rehab decisions.",
    "benefits": [
      "soft-tissue recovery interest (tendon/ligament discussions)",
      "return-to-training support interest during rehab phases",
      "joint comfort and mobility interest in overuse situations",
      "general recovery and resilience interest (anecdotal)"
    ],
    "side_effects_common": [
      "injection-site irritation (redness, soreness)",
      "nausea",
      "headache",
      "fatigue"
    ],
    "side_effects_serious": [
      "allergic reaction signs (hives, facial swelling, trouble breathing)",
      "severe or rapidly worsening swelling at an injection site"
    ],
    "who_should_be_cautious": [
      "people with active cancer or a recent cancer history",
      "people with autoimmune disease or on immunosuppressive therapy",
      "pregnant or breastfeeding people",
      "under-18 users (limited developmental data)"
    ]
  },
  "thymosin-beta-4-full": {
    "schema_version": "practical_block_v1",
    "bottom_line": "Thymosin beta-4 (full length) is discussed similarly to TB-4 in recovery communities, but product labeling and sourcing vary widely. Evidence quality for many athletic claims is limited, and users often treat it as a shortcut for rehab discipline. The practical focus should be safety, expectations, and avoiding reckless return-to-play decisions.",
    "benefits": [
      "soft-tissue recovery interest (rehab and overuse discussions)",
      "return-to-training support interest during recovery",
      "general recovery and resilience interest (anecdotal)",
      "curiosity in tissue repair pathway discussions"
    ],
    "side_effects_common": [
      "injection-site irritation (redness, soreness)",
      "headache",
      "fatigue",
      "nausea"
    ],
    "side_effects_serious": [
      "allergic reaction signs (hives, facial swelling, trouble breathing)",
      "severe or rapidly worsening swelling at an injection site"
    ],
    "who_should_be_cautious": [
      "people with active cancer or a recent cancer history",
      "people with autoimmune disease or on immunosuppressive therapy",
      "pregnant or breastfeeding people",
      "under-18 users (limited developmental data)"
    ]
  }
}

if __name__ == "__main__":
    for slug, patch in BATCH.items():
        apply_practical(slug, patch)
