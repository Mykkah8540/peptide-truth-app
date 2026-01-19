#!/usr/bin/env python3
import json
import sys
from pathlib import Path

def fail(msg: str):
    print(f"ENTITIES INDEX VALIDATION FAILED: {msg}", file=sys.stderr)
    sys.exit(1)

def load_json(p: Path):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        fail(f"Could not parse JSON: {p} ({e})")

def main():
    root = Path(".").resolve()
    idx_path = root / "content" / "_index" / "entities_v1.json"
    peptides_dir = root / "content" / "peptides"
    blends_registry = root / "content" / "blends" / "_index.json"

    if not idx_path.exists():
        fail(f"Missing entities index: {idx_path}")

    idx = load_json(idx_path)
    if idx.get("version") != "v1":
        fail("entities_v1.json must have version 'v1'")
    peptides = idx.get("peptides")
    blends = idx.get("blends")
    if not isinstance(peptides, list) or not isinstance(blends, list):
        fail("entities_v1.json must contain 'peptides' and 'blends' arrays")

    # Peptides must map to real files
    fs_peptides = {p.stem for p in peptides_dir.glob("*.json") if not p.name.startswith("_")}
    idx_peptides = set()
    for p in peptides:
        if not isinstance(p, dict):
            fail("peptides[] entries must be objects")
        if p.get("kind") != "peptide":
            fail(f"peptides[] entry kind must be 'peptide' (got {p.get('kind')})")
        slug = p.get("slug")
        if not isinstance(slug, str) or not slug.strip():
            fail("peptides[] entry missing slug")
        if slug in idx_peptides:
            fail(f"Duplicate peptide slug in entities index: {slug}")
        idx_peptides.add(slug)
        if slug not in fs_peptides:
            fail(f"Peptide slug in entities index not found on disk: {slug}")

    # Blends must map to registry
    reg = load_json(blends_registry)
    reg_blends = reg.get("blends")
    if not isinstance(reg_blends, list):
        fail("content/blends/_index.json must contain 'blends' list")
    fs_blends = {b.get("slug") for b in reg_blends if isinstance(b, dict) and isinstance(b.get("slug"), str)}
    idx_blends = set()
    for b in blends:
        if not isinstance(b, dict):
            fail("blends[] entries must be objects")
        if b.get("kind") != "blend":
            fail(f"blends[] entry kind must be 'blend' (got {b.get('kind')})")
        slug = b.get("slug")
        if not isinstance(slug, str) or not slug.strip():
            fail("blends[] entry missing slug")
        if slug in idx_blends:
            fail(f"Duplicate blend slug in entities index: {slug}")
        idx_blends.add(slug)
        if slug not in fs_blends:
            fail(f"Blend slug in entities index not found in blends registry: {slug}")

    # Counts sanity
    counts = idx.get("counts", {})
    if isinstance(counts, dict):
        if counts.get("peptides") != len(peptides):
            fail("counts.peptides does not match peptides[] length")
        if counts.get("blends") != len(blends):
            fail("counts.blends does not match blends[] length")
        if counts.get("total") != (len(peptides) + len(blends)):
            fail("counts.total does not match peptides+blends")

    print("ENTITIES INDEX VALIDATION PASSED")
    print(f"Peptides: {len(peptides)}  Blends: {len(blends)}  Total: {len(peptides)+len(blends)}")

if __name__ == "__main__":
    main()
