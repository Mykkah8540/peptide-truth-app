#!/usr/bin/env python3
"""
Acceptance tests for deterministic query resolver.

These tests must remain stable:
- pt141 -> peptide:bremelanotide
- cjc/ipa -> blend:cjc-ipamorelin
- sleep -> category:sleep_circadian
"""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))

from scripts.search.resolve_query import resolve_query  # type: ignore


def die(msg: str) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    raise SystemExit(1)


def assert_eq(got, exp, label: str) -> None:
    if got != exp:
        die(f"{label}: expected {exp!r}, got {got!r}")


def main() -> int:
    # Test 1: entity synonym
    r = resolve_query("pt141")
    assert_eq(r["intent"], "direct_entity", "pt141 intent")
    assert_eq(r["route"], "peptide:bremelanotide", "pt141 route")

    # Test 2: blend synonym with separators
    r = resolve_query("cjc/ipa")
    # Some implementations may return search_results with candidate list if multiple,
    # but we expect direct because it exists as a term.
    assert_eq(r["intent"], "direct_entity", "cjc/ipa intent (direct)")
    assert_eq(r["route"], "blend:cjc-ipamorelin", "cjc/ipa route")

    # Test 3: category synonym
    r = resolve_query("sleep")
    assert_eq(r["intent"], "direct_category", "sleep intent")
    assert_eq(r["route"], "category:sleep_circadian", "sleep route")

    # Test 4: token-assisted category detection
    r = resolve_query("sleep peptide")
    assert_eq(r["intent"], "direct_category", "sleep peptide intent")
    assert_eq(r["route"], "category:sleep_circadian", "sleep peptide route")

    print("QUERY RESOLVER VALIDATION PASSED")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
