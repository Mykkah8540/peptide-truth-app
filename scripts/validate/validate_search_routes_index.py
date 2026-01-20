#!/usr/bin/env python3
"""
Validate content/_index/search_routes_v1.json

Guarantees:
- version == v1
- terms[] sorted lexicographically by term
- each term has routes[] and sources[]
- routes are only:
  - entity peptide:<slug> where slug exists in entities_v1 peptides
  - entity blend:<slug> where slug exists in entities_v1 blends
  - category category:<taxonomy_key> where key exists in peptide_categories_v1
- no empty terms
"""

from __future__ import annotations

import json
import sys
from pathlib import Path


def die(msg: str, code: int = 1) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    raise SystemExit(code)


def load_json(p: Path):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        die(f"Failed to parse JSON: {p} ({e})")


def main() -> int:
    root = Path(".").resolve()

    routes_path = root / "content" / "_index" / "search_routes_v1.json"
    entities_path = root / "content" / "_index" / "entities_v1.json"
    pep_cats_path = root / "content" / "_taxonomy" / "peptide_categories_v1.json"

    for p in [routes_path, entities_path, pep_cats_path]:
        if not p.exists():
            die(f"Missing required file: {p}")

    data = load_json(routes_path)
    if data.get("version") != "v1":
        die("search_routes_v1.json must have version == 'v1'")

    terms = data.get("terms")
    if not isinstance(terms, list):
        die("search_routes_v1.json must contain top-level 'terms' list")

    entities = load_json(entities_path)
    peps = entities.get("peptides")
    bls = entities.get("blends")
    if not isinstance(peps, list) or not isinstance(bls, list):
        die("entities_v1.json must contain top-level 'peptides' and 'blends' lists")

    peptide_slugs = {x.get("slug") for x in peps if isinstance(x, dict) and x.get("kind") == "peptide" and isinstance(x.get("slug"), str)}
    blend_slugs = {x.get("slug") for x in bls if isinstance(x, dict) and x.get("kind") == "blend" and isinstance(x.get("slug"), str)}

    pep_cats = load_json(pep_cats_path)
    pep_classes = pep_cats.get("peptide_classes")
    if not isinstance(pep_classes, list):
        die("peptide_categories_v1.json must contain top-level 'peptide_classes' list")
    cat_keys = {c.get("key") for c in pep_classes if isinstance(c, dict) and isinstance(c.get("key"), str)}

    # Terms sorted?
    term_values = []
    for i, entry in enumerate(terms):
        if not isinstance(entry, dict):
            die(f"terms[{i}] must be an object")
        term = entry.get("term")
        if not isinstance(term, str) or not term.strip():
            die(f"terms[{i}].term must be a non-empty string")
        if term != term.strip().lower():
            die(f"terms[{i}].term must be normalized lowercase (got '{term}')")
        term_values.append(term)

        routes = entry.get("routes")
        sources = entry.get("sources")
        if not isinstance(routes, list) or not routes:
            die(f"terms[{i}] must have non-empty routes[]")
        if not isinstance(sources, list) or not sources:
            die(f"terms[{i}] must have non-empty sources[]")

        for r in routes:
            if not isinstance(r, dict):
                die(f"terms[{i}].routes entries must be objects")
            rtype = r.get("type")
            route = r.get("route")
            if rtype not in ("entity", "category", "topic"):
                die(f"Invalid route type in term '{term}': {rtype}")
            if not isinstance(route, str) or ":" not in route:
                die(f"Invalid route string in term '{term}': {route}")

            if rtype == "entity":
                kind = r.get("kind")
                slug = r.get("slug")
                if kind not in ("peptide", "blend"):
                    die(f"Invalid entity kind in term '{term}': {kind}")
                if not isinstance(slug, str) or not slug.strip():
                    die(f"Invalid entity slug in term '{term}': {slug}")
                if kind == "peptide":
                    if slug not in peptide_slugs:
                        die(f"Unknown peptide slug in route for term '{term}': {slug}")
                    if route != f"peptide:{slug}":
                        die(f"Route mismatch for peptide '{slug}' in term '{term}': {route}")
                if kind == "blend":
                    if slug not in blend_slugs:
                        die(f"Unknown blend slug in route for term '{term}': {slug}")
                    if route != f"blend:{slug}":
                        die(f"Route mismatch for blend '{slug}' in term '{term}': {route}")

            if rtype == "category":
                tk = r.get("taxonomy_key")
                if not isinstance(tk, str) or not tk.strip():
                    die(f"Invalid taxonomy_key for category route in term '{term}'")
                if tk not in cat_keys:
                    die(f"Unknown taxonomy_key in category route for term '{term}': {tk}")
                if route != f"category:{tk}":
                    die(f"Route mismatch for category '{tk}' in term '{term}': {route}")

    if term_values != sorted(term_values):
        die("terms[] must be sorted lexicographically by term")

    # counts sanity
    counts = data.get("counts")
    if not isinstance(counts, dict):
        die("search_routes_v1.json must contain counts object")
    if counts.get("terms") != len(terms):
        die("counts.terms must equal len(terms)")

    print("SEARCH ROUTES INDEX VALIDATION PASSED")
    print(f"Terms: {len(terms)}  Peptides: {len(peptide_slugs)}  Blends: {len(blend_slugs)}  Categories: {len(cat_keys)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
