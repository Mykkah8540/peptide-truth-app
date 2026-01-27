#!/usr/bin/env python3
import json
import re
from pathlib import Path
from collections import defaultdict
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional

ROOT = Path(__file__).resolve().parents[2]
ENTITIES_FP = ROOT / "content" / "_index" / "entities_v1.json"
PEPTIDES_DIR = ROOT / "content" / "peptides"
OUT_DIR = ROOT / "content" / "_index"
OUT_FP = OUT_DIR / "interactions_to_peptides_v1.json"

def load_json(fp: Path) -> Any:
    return json.loads(fp.read_text(encoding="utf-8"))

def save_json(fp: Path, data: Any) -> None:
    fp.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def governed_peptide_entities() -> List[Dict[str, Any]]:
    d = load_json(ENTITIES_FP)
    items = d.get("peptides") if isinstance(d, dict) else []
    if not isinstance(items, list):
        return []
    out = []
    for it in items:
        if isinstance(it, dict) and isinstance(it.get("slug"), str) and it["slug"].strip():
            out.append(it)
    return out

def iter_tokens(items):
    if not isinstance(items, list):
        return
    for it in items:
        if isinstance(it, str):
            tok = it.strip()
        elif isinstance(it, dict):
            v = it.get("slug") or it.get("name") or ""
            tok = str(v).strip()
        else:
            continue
        if tok:
            yield tok


# PEP_TALK__CANON_INTERACTION_KEYS_V1
INTERACTION_CLASSES_FP = ROOT / "content" / "_taxonomy" / "interaction_classes_v1.json"

def _norm(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "").strip().lower())

def _slugify(s: str) -> str:
    s = _norm(s)
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"[\s_]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s

def _load_interaction_registry():
    try:
        d = load_json(INTERACTION_CLASSES_FP)
    except Exception:
        return set(), {}
    all_slugs = set()
    term_to_slug = {}

    def add_term(term: str, slug: str):
        t = _norm(term)
        if t:
            term_to_slug[t] = slug

    for bucket in ("drug_classes", "supplement_classes"):
        items = d.get(bucket) if isinstance(d, dict) else []
        if not isinstance(items, list):
            continue
        for c in items:
            if not isinstance(c, dict):
                continue
            slug = (c.get("slug") or "").strip()
            if not slug:
                continue
            all_slugs.add(slug)
            add_term(slug, slug)
            add_term(c.get("title") or "", slug)
            aka = c.get("aka") or []
            if isinstance(aka, list):
                for a in aka:
                    if isinstance(a, str):
                        add_term(a, slug)

    return all_slugs, term_to_slug

def _canonical_interaction_slug(token: str, all_slugs: set, term_to_slug: dict) -> Optional[str]:
    raw = (token or "").strip()
    if not raw:
        return None
    if raw in all_slugs:
        return raw
    hit = term_to_slug.get(_norm(raw))
    if hit:
        return hit
    cand = _slugify(raw)
    if cand in all_slugs:
        return cand
    return None


# --- Canonical interaction key resolution (taxonomy is source of truth) ---
TAXONOMY_FP = ROOT / "content" / "_taxonomy" / "interaction_classes_v1.json"

def _norm(s: str) -> str:
    s = (s or "").strip().lower()
    s = re.sub(r"\s+", " ", s)
    return s

def _slugify(s: str) -> str:
    s = (s or "").strip().lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return s

def _load_interaction_canon() -> tuple[set[str], dict[str, str]]:
    """Returns (all_slugs, term_to_slug) from interaction taxonomy."""
    all_slugs: set[str] = set()
    term_to_slug: dict[str, str] = {}

    try:
        doc = load_json(TAXONOMY_FP)
    except Exception:
        return all_slugs, term_to_slug

    def add_term(term: str, slug: str) -> None:
        t = _norm(term)
        if not t:
            return
        term_to_slug.setdefault(t, slug)

    def ingest(items):
        if not isinstance(items, list):
            return
        for c in items:
            if not isinstance(c, dict):
                continue
            slug = str(c.get("slug") or "").strip()
            if not slug:
                continue
            all_slugs.add(slug)
            add_term(slug, slug)
            add_term(str(c.get("title") or ""), slug)
            aka = c.get("aka") or []
            if isinstance(aka, list):
                for a in aka:
                    if isinstance(a, str):
                        add_term(a, slug)

    ingest(doc.get("drug_classes"))
    ingest(doc.get("supplement_classes"))
    return all_slugs, term_to_slug

def _canonical_interaction_slug(token: str, all_slugs: set[str], term_to_slug: dict[str, str]) -> Optional[str]:
    """Resolve token to canonical taxonomy slug; return None if it can't be resolved."""
    raw = (token or "").strip()
    if not raw:
        return None

    # direct slug match
    if raw in all_slugs:
        return raw

    # title/aka exact (normalized)
    hit = term_to_slug.get(_norm(raw))
    if hit:
        return hit

    # slugify fallback
    cand = _slugify(raw)
    if cand in all_slugs:
        return cand

    return None
# --- end canonicalization ---  # PEP_TALK__CANONICALIZE_INTERACTION_KEYS_V1

def main() -> int:
    ents = governed_peptide_entities()
    all_slugs, term_to_slug = _load_interaction_registry()  # PEP_TALK__USE_CANON_KEYS_IN_MAPPING_V1
    name_by_slug = {e["slug"]: (e.get("display_name") or e["slug"]) for e in ents}

    mapping = defaultdict(list)  # interaction_slug -> [{peptide_slug, peptide_name}...]

    scanned = 0
    peptides_with_any = 0

    for e in ents:
        slug = e["slug"]
        fp = PEPTIDES_DIR / f"{slug}.json"
        if not fp.exists():
            continue
        try:
            doc = load_json(fp)
        except Exception:
            continue
        if not isinstance(doc, dict):
            continue

        scanned += 1

        # ✅ Schema-v1: TOP-LEVEL ONLY
        inter = doc.get("interactions")
        if not isinstance(inter, dict):
            continue

        hit = False

        for token in iter_tokens(inter.get("drug_classes")):
          key = _canonical_interaction_slug(token, all_slugs, term_to_slug)
          if not key:
              continue
          mapping[key].append({"peptide_slug": slug, "peptide_name": name_by_slug.get(slug, slug)})
          hit = True  # PEP_TALK__USE_CANON_KEYS_IN_MAPPING_V1

        for token in iter_tokens(inter.get("supplement_classes")):
          key = _canonical_interaction_slug(token, all_slugs, term_to_slug)
          if not key:
              continue
          mapping[key].append({"peptide_slug": slug, "peptide_name": name_by_slug.get(slug, slug)})
          hit = True  # PEP_TALK__USE_CANON_KEYS_IN_MAPPING_V1

        for token in iter_tokens(inter.get("peptides")):
          key = _canonical_interaction_slug(token, all_slugs, term_to_slug)
          if not key:
              continue
          mapping[key].append({"peptide_slug": slug, "peptide_name": name_by_slug.get(slug, slug)})
          hit = True  # PEP_TALK__USE_CANON_KEYS_IN_MAPPING_V1

        if hit:
            peptides_with_any += 1

    # de-dupe + sort per key
    final = {}
    for k, rows in mapping.items():
        seen = set()
        uniq = []
        for r in rows:
            key = (r["peptide_slug"], r["peptide_name"])
            if key in seen:
                continue
            seen.add(key)
            uniq.append(r)
        uniq.sort(key=lambda x: (x["peptide_name"].lower(), x["peptide_slug"]))
        final[k] = uniq

    out = {
        "schema_version": "interactions_to_peptides_index_v1",
        "stats": {
            "total_governed_peptides": len(ents),
            "total_peptides_loaded": scanned,
            "peptides_with_any_interactions": peptides_with_any,
            "interaction_keys": len(final),
        },
        "mapping": final,
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    save_json(OUT_FP, out)
    print(f"OK: wrote {OUT_FP.relative_to(ROOT)} ({len(final)} interaction key(s))")
    print("STATS:", out["stats"])
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
