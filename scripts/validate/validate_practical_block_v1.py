#!/usr/bin/env python3
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

MAX_BULLETS = 8   # keep it tight
MAX_CHARS = 180   # per bullet

WEASEL = re.compile(r"\b(may|might|could|potentially|possibly|suggests|hypothes(?:is|ized))\b", re.I)
PHARMA = re.compile(r"\b(ask your doctor|consult (your|a) physician|not intended to diagnose|side effects include)\b", re.I)

CURATION_OK = re.compile(r"\b(curation pending|not yet curated|we avoid speculative)\b", re.I)

def fail(msg: str) -> None:
    raise SystemExit(f"ERROR: {msg}")

def is_str_list(x):
    return isinstance(x, list) and all(isinstance(i, str) for i in x)

def check_list(name: str, arr):
    if not is_str_list(arr):
        fail(f"{name} must be a list[str]")
    if len(arr) > MAX_BULLETS:
        fail(f"{name} too long: {len(arr)} > {MAX_BULLETS}")
    for i, s in enumerate(arr):
        t = s.strip()
        if not t:
            fail(f"{name}[{i}] blank")
        if len(t) > MAX_CHARS:
            fail(f"{name}[{i}] too long: {len(t)} > {MAX_CHARS}")
        if WEASEL.search(t):
            fail(f"{name}[{i}] contains weasel wording: '{t}'")
        if PHARMA.search(t):
            fail(f"{name}[{i}] contains pharma boilerplate: '{t}'")

def main() -> int:
    scanned = 0
    for fp in sorted(PEPTIDES_DIR.glob("*.json")):
        if fp.name.startswith("_"):
            continue
        scanned += 1
        doc = json.loads(fp.read_text("utf-8"))
        if not isinstance(doc, dict):
            fail(f"{fp}: not a JSON object")

        pr = doc.get("practical")
        if not isinstance(pr, dict):
            fail(f"{fp}: missing practical object")

        if pr.get("schema_version") != "practical_block_v1":
            fail(f"{fp}: practical.schema_version must be practical_block_v1")

        benefits = pr.get("benefits", [])
        common = pr.get("side_effects_common", [])
        serious = pr.get("side_effects_serious", [])
        cautious = pr.get("who_should_be_cautious", [])
        bottom = pr.get("bottom_line", "")

        # enforce types + caps + wording
        check_list(f"{fp.name}:practical.benefits", benefits)
        check_list(f"{fp.name}:practical.side_effects_common", common)
        check_list(f"{fp.name}:practical.side_effects_serious", serious)
        check_list(f"{fp.name}:practical.who_should_be_cautious", cautious)

        if not isinstance(bottom, str) or not bottom.strip():
            fail(f"{fp}: practical.bottom_line must be a non-empty string")

        b = bottom.strip()
        if len(b) > 420:
            fail(f"{fp}: bottom_line too long (>420 chars)")
        if WEASEL.search(b):
            fail(f"{fp}: bottom_line contains weasel wording")
        if PHARMA.search(b):
            fail(f"{fp}: bottom_line contains pharma boilerplate")

        # If everything is empty, bottom_line must clearly indicate curation pending
        if (len(benefits) + len(common) + len(serious) + len(cautious)) == 0:
            if not CURATION_OK.search(b):
                fail(f"{fp}: empty practical lists require bottom_line to indicate curation pending")

    print("VALIDATION PASSED")
    print(f"Peptides scanned: {scanned}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
