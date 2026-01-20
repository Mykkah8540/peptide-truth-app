#!/usr/bin/env python3
import json
import sys
from pathlib import Path
from datetime import datetime

def die(msg: str, code: int = 1):
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(code)

def load_json(p: Path):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        die(f"Failed to parse JSON: {p} ({e})")

def norm_list(x):
    if x is None:
        return []
    if isinstance(x, list):
        return [v for v in x if isinstance(v, str) and v.strip()]
    return []

def main():
    root = Path(".").resolve()

    peptides_dir = root / "content" / "peptides"
    blends_dir = root / "content" / "blends"
    blends_registry = blends_dir / "_index.json"
    out_path = root / "content" / "_index" / "entities_v1.json"

    topics_pages_dir = root / "content" / "topics" / "pages"

    governance_path = root / "content" / "_governance" / "coverage_checklist_v1.json"

    if not peptides_dir.exists():
        die(f"Missing peptides dir: {peptides_dir}")
    if not blends_dir.exists():
        die(f"Missing blends dir: {blends_dir}")
    if not blends_registry.exists():
        die(f"Missing blends registry: {blends_registry}")

    if not topics_pages_dir.exists():
        die(f"Missing topics pages dir: {topics_pages_dir}")

    if not governance_path.exists():
        die(f"Missing governance file: {governance_path}")

    gov = load_json(governance_path)
    gov_peptides = gov.get("peptides")
    if not isinstance(gov_peptides, list):
        die("content/_governance/coverage_checklist_v1.json must contain top-level 'peptides' list")
    gov_tax_map = {}
    for gp in gov_peptides:
        if not isinstance(gp, dict):
            continue
        s = gp.get("slug")
        if not isinstance(s, str) or not s.strip():
            continue
        tks = gp.get("taxonomy_keys") or []
        if not isinstance(tks, list):
            die(f"Invalid taxonomy_keys for governance peptide '{s}'")
        # Keep only non-empty strings
        gov_tax_map[s.strip()] = [k for k in tks if isinstance(k, str) and k.strip()]

    peptide_files = sorted([p for p in peptides_dir.glob("*.json") if not p.name.startswith("_")])
    blend_files = sorted([p for p in blends_dir.glob("*.json") if p.suffix == ".json" and not p.name.startswith("_") and p.name != "README.md"])

    peptides = []
    peptide_slugs = set()
    for p in peptide_files:
        d = load_json(p)
        pep = d.get("peptide")
        if not isinstance(pep, dict):
            die(f"Invalid peptide object in: {p}")
        slug = p.stem
        canonical = pep.get("canonical_name") or slug
        status = pep.get("status") or {}
        status_cat = status.get("category") or ""

        entity_kind = "peptide"
        # heuristic: if they tagged it, use it (non-breaking)
        ek = pep.get("entity_kind") or pep.get("meta", {}).get("entity_kind")
        if isinstance(ek, str) and ek.strip():
            entity_kind = ek.strip()

        taxonomy_keys = norm_list(pep.get("taxonomy_keys") or pep.get("meta", {}).get("taxonomy_keys"))
        # Deterministic fallback: if peptide JSON doesn't carry taxonomy_keys, use governance mapping.
        if not taxonomy_keys:
            taxonomy_keys = norm_list(gov_tax_map.get(slug))
        appears_in_blends = norm_list(pep.get("meta", {}).get("appears_in_blends"))

        peptides.append({
            "kind": "peptide",
            "slug": slug,
            "display_name": canonical,
            "status_category": status_cat,
            "entity_kind": entity_kind,
            "taxonomy_keys": taxonomy_keys,
            "appears_in_blends": appears_in_blends,
            "source_path": f"content/peptides/{slug}.json",
        })
        peptide_slugs.add(slug)

    # Blends registry is canonical list of blends
    reg = load_json(blends_registry)
    reg_blends = reg.get("blends")
    if not isinstance(reg_blends, list):
        die("content/blends/_index.json must contain top-level 'blends' list")

    # Load blend stubs (per-blend JSON files) for evidence + unresolved components
    blend_file_map = {p.stem: p for p in blend_files}

    blends = []
    blend_slugs = set()
    for b in reg_blends:
        if not isinstance(b, dict):
            continue
        slug = b.get("slug")
        if not isinstance(slug, str) or not slug.strip():
            die("Blend registry contains a blend without a valid 'slug'")
        slug = slug.strip()

        display_name = b.get("display_name") or slug
        taxonomy_keys = norm_list(b.get("taxonomy_keys"))
        components = norm_list(b.get("components"))
        components_unresolved = norm_list(b.get("components_unresolved"))

        # Merge in stub fields if present
        stub_path = blend_file_map.get(slug)
        evidence_count = 0
        if stub_path:
            stub = load_json(stub_path)
            ev = stub.get("evidence")
            if isinstance(ev, list):
                evidence_count = sum(1 for x in ev if isinstance(x, dict))
            # Prefer stub components lists if present (should match; registry validator enforces)
            stub_comps = norm_list(stub.get("components"))
            if stub_comps:
                components = stub_comps
            stub_unres = norm_list(stub.get("components_unresolved"))
            if stub_unres:
                components_unresolved = stub_unres

        # sanity: keep unresolved separate, do not duplicate
        components_set = set(components)
        components_unresolved = sorted(set([c for c in components_unresolved if c not in components_set]))

        blends.append({
            "kind": "blend",
            "slug": slug,
            "display_name": display_name,
            "taxonomy_keys": taxonomy_keys,
            "components": components,
            "components_unresolved": components_unresolved,
            "evidence_count": evidence_count,
            "source_path": f"content/blends/{slug}.json" if stub_path else None,
        })
        blend_slugs.add(slug)

    # Topics (topic pages) -> first-class entities
    topic_files = sorted([p for p in topics_pages_dir.glob("*.json") if p.suffix == ".json"])
    topics = []
    topic_slugs = set()
    for tp in topic_files:
        d = load_json(tp)
        if d.get("schema_version") != "topic_page_v1":
            die(f"Invalid topic schema_version in: {tp}")
        obj = d.get("topic_page")
        if not isinstance(obj, dict):
            die(f"Invalid topic_page object in: {tp}")
        tid = obj.get("topic_id")
        title = obj.get("title")
        if not isinstance(tid, str) or not tid.strip():
            die(f"Missing topic_id in: {tp}")
        if not isinstance(title, str) or not title.strip():
            die(f"Missing title in: {tp}")
        slug = tp.stem
        if slug in topic_slugs:
            die(f"Duplicate topic slug detected: {slug}")
        topic_slugs.add(slug)
        topics.append({
            "kind": "topic",
            "slug": slug,
            "topic_id": tid.strip(),
            "display_name": title.strip(),
            "source_path": f"content/topics/pages/{slug}.json",
        })

    # Sort deterministically
    peptides = sorted(peptides, key=lambda x: x["slug"])
    blends = sorted(blends, key=lambda x: x["slug"])
    topics = sorted(topics, key=lambda x: x["slug"])

    now = datetime.now().strftime("%Y-%m-%d")
    out = {
        "version": "v1",
        "updated_at": now,
        "notes": "Unified entity index generated from peptide JSONs + blends registry + blend stubs + topic pages.",
        "counts": {
            "peptides": len(peptides),
            "topics": len(topics),
            "blends": len(blends),
            "total": len(peptides) + len(blends) + len(topics),
        },
        "peptides": peptides,
        "blends": blends,
        "topics": topics,
    }

    out_path.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote: {out_path}")
    print(f"Peptides: {len(peptides)}  Blends: {len(blends)}  Total: {len(peptides)+len(blends)}")

if __name__ == "__main__":
    main()
