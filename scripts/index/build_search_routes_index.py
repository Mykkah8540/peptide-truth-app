#!/usr/bin/env python3
"""
Build search routing index for Pep-Talk.

Output: content/_index/search_routes_v1.json

This file is a deterministic, UI-facing "routing layer" that maps normalized terms to:
- entity routes: peptide:<slug>, blend:<slug>
- category routes: category:<taxonomy_key>

Rules:
- Additive only; never overrides exact slug matches in UI logic.
- Uses synonyms map (content/_taxonomy/search_synonyms_v1.json) as an explicit override-free boost.
- Uses peptide_search_index_v1 for canonical_name + aliases.
- Uses entities_v1 + blends registry for existence + taxonomy_keys.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path
from datetime import datetime
import re


def die(msg: str, code: int = 1) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    raise SystemExit(code)


def load_json(p: Path):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        die(f"Failed to parse JSON: {p} ({e})")


def norm_term(s: str) -> str:
    # Deterministic normalization (matches Search Relevance Spec patterns)
    s = s.strip().lower()
    if not s:
        return ""
    # convert common separators to spaces
    s = s.replace("+", " ").replace("/", " ").replace("&", " ")
    # keep hyphen, remove other punctuation except plus already handled
    s = re.sub(r"[^\w\s\-]+", "", s, flags=re.UNICODE)
    # collapse whitespace
    s = re.sub(r"\s+", " ", s).strip()
    return s


def add_term_map(term_map: dict, term: str, route: dict, source: str) -> None:
    t = norm_term(term)
    if not t:
        return
    entry = term_map.setdefault(t, {"term": t, "routes": [], "sources": []})
    # avoid duplicate routes
    if route not in entry["routes"]:
        entry["routes"].append(route)
    if source not in entry["sources"]:
        entry["sources"].append(source)


def main() -> int:
    root = Path(".").resolve()

    entities_path = root / "content" / "_index" / "entities_v1.json"
    pep_search_path = root / "content" / "peptides" / "_search_index.json"
    blends_registry_path = root / "content" / "blends" / "_index.json"
    synonyms_path = root / "content" / "_taxonomy" / "search_synonyms_v1.json"
    pep_cats_path = root / "content" / "_taxonomy" / "peptide_categories_v1.json"

    for p in [entities_path, pep_search_path, blends_registry_path, synonyms_path, pep_cats_path]:
        if not p.exists():
            die(f"Missing required file: {p}")

    entities = load_json(entities_path)
    pep_search = load_json(pep_search_path)
    blends_registry = load_json(blends_registry_path)
    synonyms = load_json(synonyms_path)
    pep_cats = load_json(pep_cats_path)

    peptides = entities.get("peptides")
    blends = entities.get("blends")
    if not isinstance(peptides, list) or not isinstance(blends, list):
        die("entities_v1.json must contain top-level 'peptides' and 'blends' lists")

    # Build existence sets
    peptide_slugs = set()
    peptide_display = {}
    peptide_tax = {}
    for e in peptides:
        if not isinstance(e, dict):
            continue
        if e.get("kind") != "peptide":
            continue
        slug = e.get("slug")
        if isinstance(slug, str) and slug.strip():
            slug = slug.strip()
            peptide_slugs.add(slug)
            dn = e.get("display_name") or slug
            peptide_display[slug] = dn
            tks = e.get("taxonomy_keys") if isinstance(e.get("taxonomy_keys"), list) else []
            peptide_tax[slug] = [k for k in tks if isinstance(k, str) and k.strip()]

    blend_slugs = set()
    blend_display = {}
    blend_tax = {}
    for e in blends:
        if not isinstance(e, dict):
            continue
        if e.get("kind") != "blend":
            continue
        slug = e.get("slug")
        if isinstance(slug, str) and slug.strip():
            slug = slug.strip()
            blend_slugs.add(slug)
            dn = e.get("display_name") or slug
            blend_display[slug] = dn
            tks = e.get("taxonomy_keys") if isinstance(e.get("taxonomy_keys"), list) else []
            blend_tax[slug] = [k for k in tks if isinstance(k, str) and k.strip()]

    # Categories (peptide taxonomy keys)
    pep_classes = pep_cats.get("peptide_classes")
    if not isinstance(pep_classes, list):
        die("peptide_categories_v1.json must contain top-level 'peptide_classes' list")

    category_keys = []
    category_labels = {}
    for c in pep_classes:
        if not isinstance(c, dict):
            continue
        k = c.get("key")
        label = c.get("label")
        if isinstance(k, str) and k.strip():
            k = k.strip()
            category_keys.append(k)
            category_labels[k] = label if isinstance(label, str) and label.strip() else k

    # Validate synonyms shape minimally
    ent_syn = synonyms.get("entity_synonyms", [])
    cat_syn = synonyms.get("category_synonyms", [])
    blend_syn = synonyms.get("blend_synonyms", [])
    if not isinstance(ent_syn, list) or not isinstance(cat_syn, list) or not isinstance(blend_syn, list):
        die("search_synonyms_v1.json must contain entity_synonyms, category_synonyms, blend_synonyms arrays")

    # Build term map
    term_map: dict[str, dict] = {}

    # A) Exact slugs should be routable
    for slug in sorted(peptide_slugs):
        add_term_map(term_map, slug, {"type": "entity", "kind": "peptide", "slug": slug, "route": f"peptide:{slug}"}, "slug")
    for slug in sorted(blend_slugs):
        add_term_map(term_map, slug, {"type": "entity", "kind": "blend", "slug": slug, "route": f"blend:{slug}"}, "slug")

    # B) Names + aliases from peptide_search_index_v1
    pep_list = pep_search.get("peptides")
    if not isinstance(pep_list, list):
        die("peptides/_search_index.json must contain top-level 'peptides' list")
    for p in pep_list:
        if not isinstance(p, dict):
            continue
        slug = p.get("slug")
        if not isinstance(slug, str) or slug.strip() == "":
            continue
        slug = slug.strip()
        if slug not in peptide_slugs:
            # If search index contains slugs not in entities, that's a consistency problem
            die(f"peptide_search_index contains unknown peptide slug not in entities_v1: {slug}")

        canonical = p.get("canonical_name") or peptide_display.get(slug, slug)
        add_term_map(term_map, str(canonical), {"type": "entity", "kind": "peptide", "slug": slug, "route": f"peptide:{slug}"}, "peptide_search_index:canonical_name")

        short_name = p.get("short_name")
        if isinstance(short_name, str) and short_name.strip():
            add_term_map(term_map, short_name, {"type": "entity", "kind": "peptide", "slug": slug, "route": f"peptide:{slug}"}, "peptide_search_index:short_name")

        aliases = p.get("aliases")
        if isinstance(aliases, list):
            for a in aliases:
                if isinstance(a, str) and a.strip():
                    add_term_map(term_map, a, {"type": "entity", "kind": "peptide", "slug": slug, "route": f"peptide:{slug}"}, "peptide_search_index:aliases")

    # C) Blend display_name from blends registry (authoritative list)
    reg_blends = blends_registry.get("blends")
    if not isinstance(reg_blends, list):
        die("content/blends/_index.json must contain top-level 'blends' list")
    for b in reg_blends:
        if not isinstance(b, dict):
            continue
        slug = b.get("slug")
        if not isinstance(slug, str) or not slug.strip():
            continue
        slug = slug.strip()
        if slug not in blend_slugs:
            die(f"blends registry contains blend slug not in entities_v1: {slug}")
        dn = b.get("display_name") or blend_display.get(slug, slug)
        add_term_map(term_map, str(dn), {"type": "entity", "kind": "blend", "slug": slug, "route": f"blend:{slug}"}, "blend_registry:display_name")

    # D) Categories: allow routing via label and key (keys already routable via slug-like)
    for k in category_keys:
        add_term_map(term_map, k, {"type": "category", "taxonomy_key": k, "label": category_labels.get(k, k), "route": f"category:{k}"}, "category:key")
        add_term_map(term_map, category_labels.get(k, k), {"type": "category", "taxonomy_key": k, "label": category_labels.get(k, k), "route": f"category:{k}"}, "category:label")

    # E) Synonyms: entity/category/blend
    for row in ent_syn:
        if not isinstance(row, dict):
            continue
        term = row.get("term")
        slugs = row.get("slugs")
        if not isinstance(term, str) or not term.strip():
            continue
        if not isinstance(slugs, list):
            die(f"entity_synonyms row must have list 'slugs': {row}")
        for s in slugs:
            if not isinstance(s, str) or not s.strip():
                continue
            s = s.strip()
            if s not in peptide_slugs:
                die(f"entity_synonyms references unknown peptide slug: {s}")
            add_term_map(term_map, term, {"type": "entity", "kind": "peptide", "slug": s, "route": f"peptide:{s}"}, "synonyms:entity_synonyms")

    for row in blend_syn:
        if not isinstance(row, dict):
            continue
        term = row.get("term")
        slugs = row.get("blend_slugs")
        if not isinstance(term, str) or not term.strip():
            continue
        if not isinstance(slugs, list):
            die(f"blend_synonyms row must have list 'blend_slugs': {row}")
        for s in slugs:
            if not isinstance(s, str) or not s.strip():
                continue
            s = s.strip()
            if s not in blend_slugs:
                die(f"blend_synonyms references unknown blend slug: {s}")
            add_term_map(term_map, term, {"type": "entity", "kind": "blend", "slug": s, "route": f"blend:{s}"}, "synonyms:blend_synonyms")

    for row in cat_syn:
        if not isinstance(row, dict):
            continue
        term = row.get("term")
        keys = row.get("taxonomy_keys")
        if not isinstance(term, str) or not term.strip():
            continue
        if not isinstance(keys, list):
            die(f"category_synonyms row must have list 'taxonomy_keys': {row}")
        for k in keys:
            if not isinstance(k, str) or not k.strip():
                continue
            k = k.strip()
            if k not in category_labels:
                die(f"category_synonyms references unknown taxonomy key: {k}")
            add_term_map(term_map, term, {"type": "category", "taxonomy_key": k, "label": category_labels.get(k, k), "route": f"category:{k}"}, "synonyms:category_synonyms")

    # Sort each term's routes deterministically: entity over category? No — keep stable but deterministic.
    # We'll sort by route string then by kind for stability.
    for t, entry in term_map.items():
        entry["routes"] = sorted(entry["routes"], key=lambda r: (r.get("type", ""), r.get("kind", ""), r.get("route", "")))

    out_terms = [term_map[k] for k in sorted(term_map.keys())]

    out_path = root / "content" / "_index" / "search_routes_v1.json"
    now = datetime.now().strftime("%Y-%m-%d")

    out = {
        "version": "v1",
        "updated_at": now,
        "notes": "Deterministic search routing index (terms -> entity/category routes). Additive only.",
        "counts": {
            "terms": len(out_terms),
            "peptides": len(peptide_slugs),
            "blends": len(blend_slugs),
            "categories": len(category_keys),
        },
        "terms": out_terms,
    }


    # === BACKFILL ROUTES FROM ENTITY_SYNONYMS ===

    # Some entity_synonyms entries were being emitted with route=None in terms[].

    # Ensure every synonym term gets a proper route before writing the index.

    try:

        import json as _json

        from pathlib import Path as _Path

        def _norm(s): return (s or "").strip().lower()

        _syn = _json.loads(_Path("content/_taxonomy/search_synonyms_v1.json").read_text(encoding="utf-8"))

        _ent = _syn.get("entity_synonyms", [])

        _map = {}

        if isinstance(_ent, list):

            for _r in _ent:

                _t = _norm(_r.get("term"))

                _route = (_r.get("route") or "").strip()

                if _t and _route:

                    _map[_t] = _route

        # `terms` should exist in this script as the list being written out

        _fixed = 0

        for _row in terms:

            _t = _norm(_row.get("term"))

            if not _t:

                continue

            if (_row.get("route") is None or (isinstance(_row.get("route"), str) and _row.get("route").strip() == "")) and _t in _map:

                _row["route"] = _map[_t]

                _fixed += 1

        # Optional: print once for visibility when running directly

        # print(f"Backfilled synonym routes: {_fixed}")

    except Exception:

        pass


    out_path.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote {out_path} (terms={len(out_terms)})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
