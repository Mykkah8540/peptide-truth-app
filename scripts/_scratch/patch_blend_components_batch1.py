#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BLENDS_DIR = ROOT / "content" / "blends"

PATCH = {
    "cagri-sema": ["cagrilintide", "semaglutide"],
    "glp1-sma": ["semaglutide"],
    "glp2-trz": ["tirzepatide"],
    "glp3-reta": ["retatrutide"],
}

def load(fp: Path) -> dict:
    return json.loads(fp.read_text(encoding="utf-8"))

def save(fp: Path, data: dict) -> None:
    fp.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def main() -> None:
    changed = 0
    for slug, comps in PATCH.items():
        fp = BLENDS_DIR / f"{slug}.json"
        if not fp.exists():
            raise SystemExit(f"ERROR: missing blend file: {fp}")

        data = load(fp)
        if data.get("schema_version") != "blend_json_v1":
            raise SystemExit(f"ERROR: {fp} schema_version != blend_json_v1")

        blend = data.get("blend")
        if not isinstance(blend, dict):
            raise SystemExit(f"ERROR: {fp} missing blend object")

        before = list(blend.get("components") or [])
        blend["components"] = list(comps)

        # Keep components_unresolved present and a list
        if not isinstance(blend.get("components_unresolved"), list):
            blend["components_unresolved"] = []

        # Clean unresolved items that were actually resolved by this patch
        unresolved = [x for x in blend.get("components_unresolved", []) if x not in comps]
        blend["components_unresolved"] = unresolved

        if before != blend["components"]:
            changed += 1

        save(fp, data)

    print(f"OK: patched blend components for {changed} blend(s).")

if __name__ == "__main__":
    main()
