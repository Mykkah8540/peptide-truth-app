#!/usr/bin/env python3
import json
import sys
from pathlib import Path
from typing import NoReturn

ALLOWED_BLEND_KEYS = {
    "slug",
    "display_name",
    "components",
    "components_unresolved",
    "taxonomy_keys",
}

def fail(msg: str) -> NoReturn:
    print(f"VALIDATION FAILED: {msg}", file=sys.stderr)
    sys.exit(1)

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 validate_blends_index.py <content/blends/_index.json>")
        sys.exit(2)

    path = Path(sys.argv[1]).expanduser().resolve()
    if not path.exists():
        fail(f"File not found: {path}")

    data = json.loads(path.read_text(encoding="utf-8"))

    if not isinstance(data, dict):
        fail("Root must be an object")

    if "blends" not in data or not isinstance(data["blends"], list):
        fail("Missing or invalid 'blends' array")

    slugs = set()
    for i, b in enumerate(data["blends"]):
        ctx = f"blends[{i}]"

        if not isinstance(b, dict):
            fail(f"{ctx} must be an object")

        missing = {"slug", "display_name", "taxonomy_keys"} - b.keys()
        if missing:
            fail(f"{ctx} missing keys: {sorted(missing)}")

        unknown = set(b.keys()) - ALLOWED_BLEND_KEYS
        if unknown:
            fail(f"{ctx} contains unknown keys: {sorted(unknown)}")

        slug = b["slug"]
        if not isinstance(slug, str) or not slug.strip():
            fail(f"{ctx}.slug must be non-empty string")

        if slug in slugs:
            fail(f"Duplicate blend slug: {slug}")
        slugs.add(slug)

        if not isinstance(b["display_name"], str):
            fail(f"{ctx}.display_name must be string")

        if not isinstance(b["taxonomy_keys"], list):
            fail(f"{ctx}.taxonomy_keys must be list")

        for k in b["taxonomy_keys"]:
            if not isinstance(k, str):
                fail(f"{ctx}.taxonomy_keys must contain strings")

        for field in ["components", "components_unresolved"]:
            if field in b:
                if not isinstance(b[field], list):
                    fail(f"{ctx}.{field} must be list")
                for c in b[field]:
                    if not isinstance(c, str):
                        fail(f"{ctx}.{field} must contain strings")

    print("BLENDS INDEX VALIDATION PASSED")

if __name__ == "__main__":
    main()
