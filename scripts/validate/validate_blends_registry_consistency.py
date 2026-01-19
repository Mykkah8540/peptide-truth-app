#!/usr/bin/env python3
import json
import sys
from pathlib import Path
from typing import NoReturn

def fail(msg: str) -> NoReturn:
    print(f"VALIDATION FAILED: {msg}", file=sys.stderr)
    sys.exit(1)

def load_json(p: Path):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        fail(f"Could not parse JSON {p}: {e}")

def collect_allowed_blend_taxonomy_keys(tax_path: Path) -> set[str]:
    d = load_json(tax_path)
    if not isinstance(d, dict):
        fail("blend taxonomy root must be object")
    arr = d.get("blend_classes")
    if not isinstance(arr, list):
        fail("blend taxonomy missing blend_classes list")
    keys = set()
    for i, item in enumerate(arr):
        if not isinstance(item, dict):
            fail(f"blend_classes[{i}] must be object")
        k = item.get("key")
        if not isinstance(k, str) or not k.strip():
            fail(f"blend_classes[{i}].key must be non-empty string")
        keys.add(k)
    return keys

def as_sorted_unique_str_list(v, ctx: str) -> list[str]:
    if v is None:
        return []
    if not isinstance(v, list):
        fail(f"{ctx} must be a list")
    out = []
    for i, x in enumerate(v):
        if not isinstance(x, str) or not x.strip():
            fail(f"{ctx}[{i}] must be a non-empty string")
        out.append(x.strip())
    # stable unique
    return sorted(set(out))

def main():
    repo = Path(".").resolve()

    blends_index_path = repo / "content/blends/_index.json"
    blends_dir = repo / "content/blends"
    tax_path = repo / "content/_taxonomy/blend_categories_v1.json"

    if not blends_index_path.exists():
        fail(f"Missing blends index: {blends_index_path}")
    if not blends_dir.exists():
        fail(f"Missing blends dir: {blends_dir}")
    if not tax_path.exists():
        fail(f"Missing blend taxonomy: {tax_path}")

    allowed_tax = collect_allowed_blend_taxonomy_keys(tax_path)

    idx = load_json(blends_index_path)
    if not isinstance(idx, dict):
        fail("blends/_index.json root must be object")
    blends = idx.get("blends")
    if not isinstance(blends, list):
        fail("blends/_index.json missing blends list")

    seen = set()
    errors = 0

    for i, b in enumerate(blends):
        ctx = f"blends[{i}]"
        if not isinstance(b, dict):
            fail(f"{ctx} must be object")

        for req in ["slug", "display_name", "taxonomy_keys", "components"]:
            if req not in b:
                fail(f"{ctx} missing {req}")

        slug = b["slug"]
        if not isinstance(slug, str) or not slug.strip():
            fail(f"{ctx}.slug must be non-empty string")
        slug = slug.strip()

        if slug in seen:
            fail(f"Duplicate blend slug in index: {slug}")
        seen.add(slug)

        display_name = b["display_name"]
        if not isinstance(display_name, str) or not display_name.strip():
            fail(f"{ctx}.display_name must be non-empty string")
        display_name = display_name.strip()

        taxonomy_keys = as_sorted_unique_str_list(b.get("taxonomy_keys"), f"{ctx}.taxonomy_keys")
        for k in taxonomy_keys:
            if k not in allowed_tax:
                fail(f"{ctx}.taxonomy_keys contains unknown key '{k}' (not in blend taxonomy)")

        components = as_sorted_unique_str_list(b.get("components"), f"{ctx}.components")
        unresolved = as_sorted_unique_str_list(b.get("components_unresolved"), f"{ctx}.components_unresolved")

        # Ensure no overlap between components and unresolved
        overlap = sorted(set(components) & set(unresolved))
        if overlap:
            fail(f"{ctx}: components and components_unresolved overlap: {overlap}")

        # Ensure stub exists
        stub_path = blends_dir / f"{slug}.json"
        if not stub_path.exists():
            fail(f"Missing blend stub file for '{slug}': {stub_path}")

        stub = load_json(stub_path)
        if not isinstance(stub, dict) or stub.get("schema_version") != "blend_json_v1":
            fail(f"Invalid stub schema_version in {stub_path}")

        sb = stub.get("blend")
        if not isinstance(sb, dict):
            fail(f"Stub missing 'blend' object: {stub_path}")

        # Compare key fields for consistency
        sb_slug = (sb.get("slug") or "").strip()
        if sb_slug != slug:
            fail(f"Stub slug mismatch for {slug}: stub has '{sb_slug}'")

        sb_name = (sb.get("display_name") or "").strip()
        if sb_name != display_name:
            fail(f"Stub display_name mismatch for {slug}: index='{display_name}' stub='{sb_name}'")

        sb_tax = as_sorted_unique_str_list(sb.get("taxonomy_keys"), f"stub({slug}).taxonomy_keys")
        if sb_tax != taxonomy_keys:
            fail(f"Stub taxonomy_keys mismatch for {slug}: index={taxonomy_keys} stub={sb_tax}")

        sb_components = as_sorted_unique_str_list(sb.get("components"), f"stub({slug}).components")
        sb_unresolved = as_sorted_unique_str_list(sb.get("components_unresolved"), f"stub({slug}).components_unresolved")

        if sb_components != components:
            fail(f"Stub components mismatch for {slug}: index={components} stub={sb_components}")
        if sb_unresolved != unresolved:
            fail(f"Stub components_unresolved mismatch for {slug}: index={unresolved} stub={sb_unresolved}")

    print("BLENDS REGISTRY CONSISTENCY VALIDATION PASSED")
    print(f"Blends validated: {len(seen)}")
    print(f"Allowed blend taxonomy keys: {len(allowed_tax)}")

if __name__ == "__main__":
    main()
