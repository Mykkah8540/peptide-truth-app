#!/usr/bin/env python3
import json
import sys
from pathlib import Path
from datetime import date

TODAY = str(date.today())

ROOT = Path(__file__).resolve().parents[2]
BLENDS_INDEX = ROOT / "content/blends/_index.json"
BLENDS_DIR = ROOT / "content/blends"
PEPTIDES_DIR = ROOT / "content/peptides"

def load_json(p: Path) -> dict:
    return json.loads(p.read_text(encoding="utf-8"))

def write_json(p: Path, data: dict) -> None:
    p.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def peptide_exists(slug: str) -> bool:
    return (PEPTIDES_DIR / f"{slug}.json").exists()

def main():
    if not BLENDS_INDEX.exists():
        print(f"ERROR: missing {BLENDS_INDEX}", file=sys.stderr)
        sys.exit(1)

    idx = load_json(BLENDS_INDEX)
    blends = idx.get("blends", [])
    if not isinstance(blends, list):
        print("ERROR: blends/_index.json missing 'blends' list", file=sys.stderr)
        sys.exit(1)

    created = 0
    updated = 0
    skipped = 0

    BLENDS_DIR.mkdir(parents=True, exist_ok=True)

    for b in blends:
        if not isinstance(b, dict):
            continue
        slug = b.get("slug")
        if not isinstance(slug, str) or not slug.strip():
            continue

        out = BLENDS_DIR / f"{slug}.json"

        # Non-destructive: only create if missing; otherwise only ensure minimum keys exist.
        if out.exists():
            data = load_json(out)
            changed = False
        else:
            data = {
                "schema_version": "blend_json_v1",
                "blend": {
                    "slug": slug,
                    "display_name": b.get("display_name", slug),
                    "status": "parked",
                    "taxonomy_keys": b.get("taxonomy_keys", []),
                    "components": [],
                    "components_unresolved": [],
                    "sections": {
                        "overview": [
                            {
                                "text": "",
                                "evidence_refs": []
                            }
                        ],
                        "claims": [],
                        "safety": [
                            {
                                "text": "",
                                "evidence_refs": []
                            }
                        ]
                    },
                    "evidence": [
                        {
                            "id": "E1",
                            "title": f"{b.get('display_name', slug)} — reference index",
                            "source_type": "website",
                            "source_id": f"https://pubmed.ncbi.nlm.nih.gov/?term={b.get('display_name', slug).replace(' ', '+')}",
                            "evidence_grade": "mechanistic_only",
                            "notes": "Index link for literature discovery. This file intentionally contains no protocol instructions."
                        }
                    ],
                    "disclaimer": {
                        "text": "This blend page is informational. It does not provide protocols or instructions. Claims must be supported by cited evidence.",
                        "updated_at": TODAY
                    },
                    "meta": {
                        "generated_from": "content/blends/_index.json",
                        "generated_at": TODAY
                    }
                }
            }
            changed = True

        blend = data.setdefault("blend", {})
        if not isinstance(blend, dict):
            print(f"ERROR: {out} has invalid 'blend' object", file=sys.stderr)
            sys.exit(1)

        # Ensure required-ish keys exist (non-destructive)
        for k, v in {
            "slug": slug,
            "display_name": b.get("display_name", slug),
            "status": blend.get("status", "parked"),
            "taxonomy_keys": b.get("taxonomy_keys", blend.get("taxonomy_keys", [])),
        }.items():
            if k not in blend:
                blend[k] = v
                changed = True

        # Merge components (resolved/unresolved)
        comps = b.get("components", [])
        unresolved = b.get("components_unresolved", [])
        if not isinstance(comps, list): comps = []
        if not isinstance(unresolved, list): unresolved = []

        resolved = [c for c in comps if isinstance(c, str) and c.strip() and peptide_exists(c)]
        missing = [c for c in comps if isinstance(c, str) and c.strip() and not peptide_exists(c)]
        unresolved_all = sorted(set([c for c in unresolved if isinstance(c, str) and c.strip()] + missing))

        if blend.get("components") != resolved:
            blend["components"] = resolved
            changed = True
        if blend.get("components_unresolved") != unresolved_all:
            blend["components_unresolved"] = unresolved_all
            changed = True

        # Ensure sections structure
        sections = blend.setdefault("sections", {})
        if not isinstance(sections, dict):
            sections = {}
            blend["sections"] = sections
            changed = True

        overview = sections.setdefault("overview", [{"text": "", "evidence_refs": []}])
        if not isinstance(overview, list) or len(overview) == 0 or not isinstance(overview[0], dict):
            sections["overview"] = [{"text": "", "evidence_refs": []}]
            changed = True
        sections.setdefault("claims", [])
        sections.setdefault("safety", [{"text": "", "evidence_refs": []}])

        # Ensure evidence exists
        ev = blend.setdefault("evidence", [])
        if not isinstance(ev, list) or len(ev) == 0:
            blend["evidence"] = [{
                "id": "E1",
                "title": f"{blend.get('display_name', slug)} — reference index",
                "source_type": "website",
                "source_id": f"https://pubmed.ncbi.nlm.nih.gov/?term={blend.get('display_name', slug).replace(' ', '+')}",
                "evidence_grade": "mechanistic_only",
                "notes": "Index link for literature discovery. This file intentionally contains no protocol instructions."
            }]
            changed = True

        if changed:
            # Keep schema_version stable
            data.setdefault("schema_version", "blend_json_v1")
            write_json(out, data)
            if out.exists():
                if "generated_at" in blend.get("meta", {}):
                    # existing file updated
                    if out.exists():
                        updated += 1
                else:
                    updated += 1
            else:
                created += 1
        else:
            skipped += 1

    print(f"Done. created={created} updated={updated} skipped={skipped}")

if __name__ == "__main__":
    main()
