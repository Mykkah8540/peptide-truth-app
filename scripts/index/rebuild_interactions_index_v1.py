#!/usr/bin/env python3
import json
from pathlib import Path
from collections import defaultdict
from datetime import date

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"
OUT_DIR = ROOT / "content" / "_index"
OUT_FP = OUT_DIR / "interactions_v1.json"

TAX_FP = ROOT / "content" / "_taxonomy" / "interaction_classes_v1.json"
ENTITIES_FP = ROOT / "content" / "_index" / "entities_v1.json"


def norm(s: str) -> str:
    return " ".join((s or "").strip().split())


def load_json(fp: Path):
    return json.loads(fp.read_text(encoding="utf-8"))


def load_governed_peptide_slugs() -> list[str]:
    """
    Canonical peptide set comes from content/_index/entities_v1.json["peptides"].

    Note: entities_v1 peptides are objects, not strings. We extract slug.
    """
    try:
        d = load_json(ENTITIES_FP)
    except Exception:
        return []
    items = d.get("peptides") if isinstance(d, dict) else []
    if not isinstance(items, list):
        return []
    out: list[str] = []
    for it in items:
        if isinstance(it, str) and it.strip():
            # tolerate legacy shape
            out.append(it.strip())
            continue
        if not isinstance(it, dict):
            continue
        slug = it.get("slug")
        if isinstance(slug, str) and slug.strip():
            out.append(slug.strip())
    # de-dupe preserving order
    seen = set()
    uniq = []
    for s in out:
        if s in seen:
            continue
        seen.add(s)
        uniq.append(s)
    return uniq



def build_slug_map(tax: dict, section: str) -> dict:
    """
    Returns: {slug: {"title": str, "aka": [str...]}}
    Taxonomy sections are list[dict] with keys: slug,title,aka,notes...
    """
    out: dict = {}
    for item in (tax.get(section) or []):
        if not isinstance(item, dict):
            continue
        slug = item.get("slug")
        if not isinstance(slug, str) or not slug.strip():
            continue
        slug = slug.strip()
        title = item.get("title") if isinstance(item.get("title"), str) else slug
        aka = item.get("aka") or []
        aka = [a.strip() for a in aka if isinstance(a, str) and a.strip()]
        out[slug] = {"title": title.strip(), "aka": aka}
    return out


def expand_terms(token: str, slug_map: dict) -> list[str]:
    """
    token can be a slug OR a plain term.
    If token is a known slug, expand to [title, *aka, slug]
    Else return [token]
    """
    token = norm(token)
    if not token:
        return []
    if token in slug_map:
        t = slug_map[token]
        return [t["title"], *t["aka"], token]
    return [token]


def iter_tokens(items):
    """
    Accept list entries as:
      - "slug-or-term"
      - {"slug": "..."} or {"name": "..."}
    Return normalized string tokens.
    """
    if not isinstance(items, list):
        return
    for it in items:
        if isinstance(it, str):
            tok = it
        elif isinstance(it, dict):
            tok = it.get("slug") or it.get("name") or ""
        else:
            continue
        tok = norm(str(tok))
        if tok:
            yield tok


def main():
    # Load taxonomy (best-effort)
    try:
        tax = load_json(TAX_FP)
    except Exception:
        tax = {}

    DRUG = build_slug_map(tax, "drug_classes")
    SUPP = build_slug_map(tax, "supplement_classes")

    drug_map = defaultdict(list)  # term -> [peptide_slug...]
    supp_map = defaultdict(list)  # term -> [peptide_slug...]
    pep_map = defaultdict(list)   # term -> [peptide_slug...]

    governed_slugs = load_governed_peptide_slugs()

    total_loaded = 0
    peptides_with_any = 0

    for slug in governed_slugs:
        fp = PEPTIDES_DIR / f"{slug}.json"
        if not fp.exists():
            # governed slug missing a file: skip but keep governed count stable
            continue
        try:
            doc = load_json(fp)
        except Exception:
            continue
        if not isinstance(doc, dict):
            continue

        total_loaded += 1

        # IMPORTANT: Schema-v1 interactions are TOP-LEVEL
        interactions = doc.get("interactions")
        if not isinstance(interactions, dict):
            continue

        hit_any = False

        for token in iter_tokens(interactions.get("drug_classes")):
            for term in expand_terms(token, DRUG):
                t = norm(term)
                if t:
                    drug_map[t].append(slug)
                    hit_any = True

        for token in iter_tokens(interactions.get("supplement_classes")):
            for term in expand_terms(token, SUPP):
                t = norm(term)
                if t:
                    supp_map[t].append(slug)
                    hit_any = True

        for token in iter_tokens(interactions.get("peptides")):
            t = norm(token)
            if t:
                pep_map[t].append(slug)
                hit_any = True

        if hit_any:
            peptides_with_any += 1

    def finalize(d):
        out = {}
        for name, slugs in d.items():
            uniq = sorted(set(slugs))
            out[name] = uniq
        return out

    out = {
        "schema_version": "interactions_index_v1",
        "generated_at": str(date.today()),
        "stats": {
            "total_governed_peptides": len(governed_slugs),
            "total_peptides_loaded": total_loaded,
            "peptides_with_any_interactions": peptides_with_any,
            "drug_class_terms": len(drug_map),
            "supplement_class_terms": len(supp_map),
            "peptide_terms": len(pep_map),
        },
        "drug_classes": finalize(drug_map),
        "supplement_classes": finalize(supp_map),
        "peptides": finalize(pep_map),
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    OUT_FP.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"OK: wrote {OUT_FP.relative_to(ROOT)}")
    print("STATS:", out["stats"])


if __name__ == "__main__":
    main()
