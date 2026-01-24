#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

DEFAULT_BLOCK = {
  "schema_version": "practical_block_v1",
  "benefits": [],
  "side_effects_common": [],
  "side_effects_serious": [],
  "who_should_be_cautious": [],
  "bottom_line": "Pep-Talk curation pending. We avoid speculative claims; this section will be populated with practical, real-world benefits and known side effects as evidence is reviewed."
}

def main() -> int:
    changed = 0
    scanned = 0

    for fp in sorted(PEPTIDES_DIR.glob("*.json")):
        if fp.name.startswith("_"):
            continue
        scanned += 1
        doc = json.loads(fp.read_text("utf-8"))
        if not isinstance(doc, dict):
            continue

        # place Practical at top-level to keep it easy for UI + validation
        if "practical" not in doc or not isinstance(doc.get("practical"), dict):
            doc["practical"] = DEFAULT_BLOCK
            fp.write_text(json.dumps(doc, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
            changed += 1
            continue

        # ensure required keys exist even if practical already present
        pr = doc["practical"]
        pr.setdefault("schema_version", "practical_block_v1")
        pr.setdefault("benefits", [])
        pr.setdefault("side_effects_common", [])
        pr.setdefault("side_effects_serious", [])
        pr.setdefault("who_should_be_cautious", [])
        pr.setdefault("bottom_line", DEFAULT_BLOCK["bottom_line"])

        doc["practical"] = pr
        fp.write_text(json.dumps(doc, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
        changed += 1

    print(f"OK: scanned={scanned} updated={changed}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
