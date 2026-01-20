#!/usr/bin/env python3
"""
Deterministic query resolver for Pep-Talk.

Inputs:
- raw query string

Outputs (JSON):
- query_raw, query_norm
- intent: direct_entity | direct_category | search_results | empty
- route (if high confidence single destination)
- candidates[] (routes)
- did_you_mean[] (spelling suggestions)

This resolver:
- NEVER invents entities
- ONLY routes to known deep links from content/_index/search_routes_v1.json
"""

from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass
from difflib import get_close_matches
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
ROUTES_PATH = ROOT / "content" / "_index" / "search_routes_v1.json"

SYNONYMS_PATH = ROOT / "content" / "_taxonomy" / "search_synonyms_v1.json"

_ENTITY_SYNONYMS_CACHE = None

def load_entity_synonyms_strict():
    """
    Returns dict: term_norm -> route
    STRICT: only include rows with a non-empty route and slugs[] length == 1.
    This is used to force direct routing for exact synonym terms.
    """
    global _ENTITY_SYNONYMS_CACHE
    if _ENTITY_SYNONYMS_CACHE is not None:
        return _ENTITY_SYNONYMS_CACHE

    if not SYNONYMS_PATH.exists():
        _ENTITY_SYNONYMS_CACHE = {}
        return _ENTITY_SYNONYMS_CACHE

    data = json.loads(SYNONYMS_PATH.read_text(encoding="utf-8"))
    rows = data.get("entity_synonyms", [])
    out = {}
    if isinstance(rows, list):
        for r in rows:
            term = (r.get("term") or "").strip().lower()
            route = (r.get("route") or "").strip()
            slugs = r.get("slugs")
            if not term or not route:
                continue
            if isinstance(slugs, list) and len(slugs) == 1 and (slugs[0] or "").strip():
                out[term] = route

    _ENTITY_SYNONYMS_CACHE = out
    return out



def die(msg: str, code: int = 1) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    raise SystemExit(code)


def load_json(p: Path) -> Any:
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        die(f"Failed to parse JSON: {p} ({e})")


def normalize_query(q: str) -> str:
    if q is None:
        return ""
    s = q.strip().casefold()

    # Normalize common unicode variants
    s = s.replace("–", "-").replace("—", "-")
    s = s.replace("β", "b").replace("Β", "b")  # beta -> b (casefold already, but keep explicit)

    # Treat separators as spaces (keep hyphen)
    s = re.sub(r"[+/&,_:;|.(){}\[\]<>!?\"“”‘’]", " ", s)

    # Collapse whitespace
    s = re.sub(r"\s+", " ", s).strip()
    return s


@dataclass(frozen=True)
class Candidate:
    route: str
    type: str
    kind: str | None
    slug: str | None
    taxonomy_key: str | None
    source_term: str
    source_sources: list[str]


def prefer_route_order(c: Candidate) -> tuple[int, str]:
    # Entity > category; peptide > blend; then route string for determinism
    if c.type == "entity":
        if c.kind == "peptide":
            return (0, c.route)
        if c.kind == "blend":
            return (1, c.route)
        return (2, c.route)
    return (3, c.route)


def build_term_map(routes_data: dict) -> dict[str, dict]:
    terms = routes_data.get("terms")
    if not isinstance(terms, list):
        die("search_routes_v1.json missing terms[]")

    term_map: dict[str, dict] = {}
    for t in terms:
        if not isinstance(t, dict):
            continue
        term = t.get("term")
        if not isinstance(term, str) or not term.strip():
            continue
        term_map[term.strip()] = t
    return term_map


def candidates_from_term(term_entry: dict) -> list[Candidate]:
    term = term_entry.get("term", "")
    sources = term_entry.get("sources", [])
    if not isinstance(sources, list):
        sources = []

    routes = term_entry.get("routes", [])
    if not isinstance(routes, list):
        return []

    out: list[Candidate] = []
    for r in routes:
        if not isinstance(r, dict):
            continue
        rtype = r.get("type")
        route = r.get("route")
        if not isinstance(rtype, str) or not isinstance(route, str):
            continue

        if rtype == "entity":
            out.append(
                Candidate(
                    route=route,
                    type="entity",
                    kind=r.get("kind") if isinstance(r.get("kind"), str) else None,
                    slug=r.get("slug") if isinstance(r.get("slug"), str) else None,
                    taxonomy_key=None,
                    source_term=term,
                    source_sources=[s for s in sources if isinstance(s, str)],
                )
            )
        elif rtype == "category":
            out.append(
                Candidate(
                    route=route,
                    type="category",
                    kind=None,
                    slug=None,
                    taxonomy_key=r.get("taxonomy_key") if isinstance(r.get("taxonomy_key"), str) else None,
                    source_term=term,
                    source_sources=[s for s in sources if isinstance(s, str)],
                )
            )
    return out


def resolve_query(query_raw: str) -> dict[str, Any]:

    # === FAST-PATH: EXACT ENTITY SYNONYM TERM -> DIRECT ENTITY ===
    # If normalized query exactly matches a *strict* entity_synonyms term (single slug),
    # resolve immediately to that canonical route (even if alias matching yields multiples).
    try:
        _q_norm = normalize_query(query_raw)
        _syn_map = load_entity_synonyms_strict()  # term_norm -> route
        _direct_route = _syn_map.get((_q_norm or "").strip().lower())
        if _direct_route:
            _kind = "blend" if _direct_route.startswith("blend:") else "peptide"
            _slug = _direct_route.split(":", 1)[1] if ":" in _direct_route else None
            return {
                "version": "v1",
                "query_raw": query_raw,
                "query_norm": _q_norm,
                "intent": "direct_entity",
                "route": _direct_route,
                "candidates": [{
                    "route": _direct_route,
                    "type": "entity",
                    "kind": _kind,
                    "slug": _slug,
                    "taxonomy_key": None,
                    "source_term": query_raw,
                    "source_sources": ["entity_synonyms:exact_strict"]
                }],
                "did_you_mean": []
            }
    except Exception:
        pass


    if not ROUTES_PATH.exists():
        die(f"Missing search routes index: {ROUTES_PATH} (run rebuild_all_indexes)")

    routes_data = load_json(ROUTES_PATH)
    term_map = build_term_map(routes_data)
    all_terms = sorted(term_map.keys())

    qn = normalize_query(query_raw)
    if not qn:
        return {
            "version": "v1",
            "query_raw": query_raw,
            "query_norm": qn,
            "intent": "empty",
            "route": None,
            "candidates": [],
            "did_you_mean": [],
        }

    # 1) Exact term match (highest confidence)
    exact = term_map.get(qn)
    if exact:
        cands = candidates_from_term(exact)
        cands = sorted(cands, key=prefer_route_order)

        # If one clear candidate, route directly.
        # If multiple, still return candidates but do not pick a single route.
        if len(cands) == 1:
            intent = "direct_entity" if cands[0].type == "entity" else "direct_category"
            return {
                "version": "v1",
                "query_raw": query_raw,
                "query_norm": qn,
                "intent": intent,
                "route": cands[0].route,
                "candidates": [c.__dict__ for c in cands],
                "did_you_mean": [],
            }

        # If multiple, prefer entity routes for display; UI decides.
        return {
            "version": "v1",
            "query_raw": query_raw,
            "query_norm": qn,
            "intent": "search_results",
            "route": None,
            "candidates": [c.__dict__ for c in cands],
            "did_you_mean": [],
        }

    # 2) Token-assisted category detection (e.g., "sleep peptide", "immune support")
    tokens = [t for t in qn.split(" ") if t]
    category_hits: list[Candidate] = []
    for tok in tokens:
        te = term_map.get(tok)
        if not te:
            continue
        for c in candidates_from_term(te):
            if c.type == "category":
                category_hits.append(c)
    if category_hits:
        category_hits = sorted(category_hits, key=prefer_route_order)
        # Deterministically pick first category hit as primary route
        primary = category_hits[0]
        return {
            "version": "v1",
            "query_raw": query_raw,
            "query_norm": qn,
            "intent": "direct_category",
            "route": primary.route,
            "candidates": [c.__dict__ for c in category_hits],
            "did_you_mean": [],
        }

    # 3) Prefix suggestions (typeahead use-case)
    prefix_hits = [t for t in all_terms if t.startswith(qn)]
    prefix_hits = prefix_hits[:15]

    cand_accum: list[Candidate] = []
    for t in prefix_hits:
        cand_accum.extend(candidates_from_term(term_map[t]))

    # 4) Did-you-mean (spelling) — limited, deterministic
    dym = get_close_matches(qn, all_terms, n=5, cutoff=0.78)

    cand_accum = sorted(cand_accum, key=prefer_route_order)
    # Deduplicate by route
    seen = set()
    unique = []
    for c in cand_accum:
        if c.route in seen:
            continue
        seen.add(c.route)
        unique.append(c)

    return {
        "version": "v1",
        "query_raw": query_raw,
        "query_norm": qn,
        "intent": "search_results",
        "route": None,
        "candidates": [c.__dict__ for c in unique[:25]],
        "did_you_mean": dym,
    }


def main() -> int:
    if len(sys.argv) < 2:
        print("Usage: scripts/search/resolve_query.py \"<query>\"")
        return 2
    query_raw = " ".join(sys.argv[1:])
    out = resolve_query(query_raw)
    print(json.dumps(out, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
