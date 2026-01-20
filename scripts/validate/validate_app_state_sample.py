#!/usr/bin/env python3
import json
import sys
import re
from pathlib import Path

ENTITY_KEY_RE = re.compile(r"^(peptide|blend):([a-z0-9][a-z0-9\\-]*)$")

def die(msg: str, code: int = 1):
    print(f"ERROR: {msg}", file=sys.stderr)
    raise SystemExit(code)

def load_json(p: Path):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        die(f"Failed to parse JSON: {p} ({e})")

def collect_entity_keys(entities_path: Path) -> set[str]:
    data = load_json(entities_path)
    keys = set()
    for e in data.get("peptides", []):
        slug = e.get("slug")
        if isinstance(slug, str) and slug.strip():
            keys.add(f"peptide:{slug.strip()}")
    for e in data.get("blends", []):
        slug = e.get("slug")
        if isinstance(slug, str) and slug.strip():
            keys.add(f"blend:{slug.strip()}")
    if not keys:
        die("No entity keys found in entities index")
    return keys

def validate_entity_key(entity_key: str, valid_keys: set[str], ctx: str):
    if not isinstance(entity_key, str) or not entity_key.strip():
        die(f"{ctx}: entity_key must be a non-empty string")
    m = ENTITY_KEY_RE.match(entity_key.strip())
    if not m:
        die(f"{ctx}: invalid entity_key format: {entity_key!r}")
    if entity_key not in valid_keys:
        die(f"{ctx}: unknown entity_key (not in entities_v1.json): {entity_key}")

def main() -> int:
    root = Path(".").resolve()
    sample_path = root / "content" / "_app_state_samples" / "app_state_v1.sample.json"
    entities_path = root / "content" / "_index" / "entities_v1.json"

    if not sample_path.exists():
        die(f"Missing sample file: {sample_path}")
    if not entities_path.exists():
        die(f"Missing entities index: {entities_path}")

    valid_keys = collect_entity_keys(entities_path)
    data = load_json(sample_path)

    if data.get("version") != "app_state_v1":
        die("sample version must be 'app_state_v1'")

    # Favorites
    fav = data.get("favorites", {})
    items = fav.get("items", [])
    if not isinstance(items, list):
        die("favorites.items must be a list")
    seen = set()
    for i, it in enumerate(items):
        if not isinstance(it, dict):
            die(f"favorites.items[{i}] must be an object")
        ek = it.get("entity_key")
        validate_entity_key(ek, valid_keys, f"favorites.items[{i}]")
        if ek in seen:
            die(f"favorites contains duplicate entity_key: {ek}")
        seen.add(ek)

    # Recents
    rec = data.get("recents", {})
    ritems = rec.get("items", [])
    if not isinstance(ritems, list):
        die("recents.items must be a list")
    rseen = set()
    for i, it in enumerate(ritems):
        if not isinstance(it, dict):
            die(f"recents.items[{i}] must be an object")
        ek = it.get("entity_key")
        validate_entity_key(ek, valid_keys, f"recents.items[{i}]")
        if ek in rseen:
            die(f"recents contains duplicate entity_key: {ek}")
        rseen.add(ek)

    # Stacks
    stacks = data.get("stacks", {})
    sitems = stacks.get("items", [])
    if not isinstance(sitems, list):
        die("stacks.items must be a list")
    for si, st in enumerate(sitems):
        if not isinstance(st, dict):
            die(f"stacks.items[{si}] must be an object")
        name = st.get("name")
        if not isinstance(name, str) or not (1 <= len(name.strip()) <= 60):
            die(f"stacks.items[{si}].name must be 1–60 chars")
        stack_items = st.get("items", [])
        if not isinstance(stack_items, list):
            die(f"stacks.items[{si}].items must be a list")
        for ii, it in enumerate(stack_items):
            if not isinstance(it, dict):
                die(f"stacks.items[{si}].items[{ii}] must be an object")
            ek = it.get("entity_key")
            validate_entity_key(ek, valid_keys, f"stacks.items[{si}].items[{ii}]")

    print("APP STATE SAMPLE VALIDATION PASSED")
    print(f"Valid entity keys: {len(valid_keys)}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
