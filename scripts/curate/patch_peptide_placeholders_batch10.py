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
    return is_placeholder_text(bl) or counts == (0, 0, 0, 0)

def apply_practical(slug: str, patch: dict) -> None:
    fp = PEPTIDES_DIR / f"{slug}.json"
    if not fp.exists():
        print(f"SKIP: missing {slug}.json")
        return

    d = load_json(fp)

    pr = d.get("practical") if isinstance(d.get("practical"), dict) else None
    if not practical_is_placeholder(pr):
        print(f"SKIP: {slug} already has non-placeholder practical")
        return

    d["practical"] = patch
    save_json(fp, d)
    print(f"OK: patched {slug}")

BATCH = {
  "tb-500": {
    "schema_version": "practical_block_v1",
    "bottom_line": "TB-500 is commonly discussed for soft-tissue recovery and return-to-training support. Many claims are extrapolated from early or indirect evidence, and real-world use often involves aggressive stacking and unregulated sourcing. The practical risk is overconfidence: using it to justify training through injuries or skipping proper rehab.",
    "benefits": [
      "soft-tissue recovery interest (tendon and ligament discussions)",
      "return-to-training support interest during rehab phases",
      "joint comfort and mobility interest in overuse situations",
      "general recovery and resilience interest (anecdotal)"
    ],
    "side_effects_common": [
      "injection-site irritation (redness, soreness)",
      "headache",
      "fatigue",
      "nausea"
    ],
    "side_effects_serious": [
      "allergic reaction signs (hives, facial swelling, trouble breathing)",
      "infection signs at injection site (spreading redness, warmth, fever)"
    ],
    "who_should_be_cautious": [
      "people with active cancer or a recent cancer history",
      "people with autoimmune disease or on immunosuppressive therapy",
      "pregnant or breastfeeding people",
      "under-18 users (limited developmental data)"
    ]
  },
  "ss-31": {
    "schema_version": "practical_block_v1",
    "bottom_line": "SS-31 (elamipretide) is a mitochondria-targeting peptide studied in specific clinical research settings. Wellness discussions often frame it as a broad energy or longevity tool, but those claims are not established. The practical risk is buying into a generalized performance narrative when evidence is narrower and context-dependent.",
    "benefits": [
      "mitochondrial support interest (fatigue and energy discussions)",
      "recovery and resilience interest in training and aging circles",
      "curiosity in oxidative stress and cellular stress discussions",
      "research-driven interest due to clinical development history"
    ],
    "side_effects_common": [
      "injection-site irritation (redness, soreness)",
      "headache",
      "nausea",
      "fatigue"
    ],
    "side_effects_serious": [
      "allergic reaction signs (hives, facial swelling, trouble breathing)",
      "severe dizziness or fainting"
    ],
    "who_should_be_cautious": [
      "people with significant cardiovascular disease or unstable blood pressure",
      "pregnant or breastfeeding people",
      "under-18 users (limited developmental data)",
      "people using multiple stimulants or aggressive stacks (symptom attribution becomes unreliable)"
    ]
  }
}

if __name__ == "__main__":
    for slug, patch in BATCH.items():
        apply_practical(slug, patch)
