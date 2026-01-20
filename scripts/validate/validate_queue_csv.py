#!/usr/bin/env python3
import csv
import sys
from pathlib import Path

ROOT = Path(".").resolve()
QUEUE = ROOT / "content" / "peptides" / "_queue.csv"

ALLOWED_TOPIC_IDS = {
    "topic_cognition_mood",
    "topic_fat_loss_metabolism",
    "topic_gut_inflammation",
    "topic_hormonal_endocrine",
    "topic_immune_modulation",
    "topic_injury_healing",
    "topic_longevity_aging",
    "topic_muscle_recovery",
    "topic_skin_cosmetic",
    "topic_sleep_circadian",
}

def die(msg: str, code: int = 1):
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(code)

def main() -> int:
    if not QUEUE.exists():
        die(f"Missing queue CSV: {QUEUE}")

    with QUEUE.open("r", encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        rows = list(reader)

    bad = []
    for i, r in enumerate(rows, start=2):  # header = line 1
        slug = (r.get("slug") or "").strip()
        topics = (r.get("primary_topics") or "").strip()
        if not topics:
            continue
        for t in topics.split("|"):
            if t not in ALLOWED_TOPIC_IDS:
                bad.append((i, slug, t))

    if bad:
        print("INVALID primary_topics detected in _queue.csv:")
        for line, slug, t in bad:
            print(f"  line {line} slug='{slug}' topic='{t}'")
        die(
            "primary_topics must be topic_* IDs only. "
            f"Allowed: {sorted(ALLOWED_TOPIC_IDS)}"
        )

    print("QUEUE CSV VALIDATION PASSED")
    print(f"Rows checked: {len(rows)}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
