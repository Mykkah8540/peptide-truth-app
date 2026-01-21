#!/usr/bin/env python3
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[2]
SYN_FP = ROOT / "content" / "_taxonomy" / "search_synonyms_v1.json"

def load_syn():
    try:
        return json.loads(SYN_FP.read_text(encoding="utf-8"))
    except Exception as e:
        print(f"FAIL: could not read {SYN_FP}: {e}")
        sys.exit(2)

def build_term_to_slugs(syn):
    m = {}
    for row in syn.get("entity_synonyms", []) + syn.get("blend_synonyms", []):
        term = (row.get("term") or "").strip().lower()
        slugs = row.get("slugs") or []
        if not term or not isinstance(slugs, list):
            continue
        m.setdefault(term, set()).update([s for s in slugs if isinstance(s, str) and s.strip()])
    return m

def assert_maps(term_to_slugs, term, must_include_slug):
    t = term.strip().lower()
    got = sorted(term_to_slugs.get(t, []))
    if must_include_slug not in got:
        print(f"FAIL: term '{term}' does not map to '{must_include_slug}'. Got: {got}")
        return False
    print(f"OK: '{term}' -> includes '{must_include_slug}'")
    return True

def main():
    syn = load_syn()
    term_to_slugs = build_term_to_slugs(syn)

    tests = [
        ("reta", "retatrutide"),
        ("pt141", "bremelanotide"),
        ("nad+", "nad-plus"),
    ]

    ok = True
    for term, slug in tests:
        ok = assert_maps(term_to_slugs, term, slug) and ok

    if not ok:
        sys.exit(1)

    print("PASS: search smoke tests")

if __name__ == "__main__":
    main()
