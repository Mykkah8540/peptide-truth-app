#!/usr/bin/env python3
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TOPICS_INDEX = ROOT / "content" / "topics" / "_topics_index.json"
TOPIC_PAGES_DIR = ROOT / "content" / "topics" / "pages"
TOPIC_MAP = ROOT / "content" / "_deprecated" / "topics" / "topic_peptide_map_v1.json"
PEPTIDES_DIR = ROOT / "content" / "peptides"

ALLOWED_CONFIDENCE = {"high", "moderate", "low", "hypothesis", "unknown"}
ALLOWED_EVIDENCE_GRADE = {
    "regulatory_label", "rct_meta", "rct", "human_interventional", "human_observational",
    "animal", "in_vitro", "mechanistic_only"
}

def fail(msg: str) -> None:
    print(f"VALIDATION FAILED: {msg}", file=sys.stderr)
    sys.exit(1)

def warn(msg: str) -> None:
    print(f"WARNING: {msg}", file=sys.stderr)

def load_json(p: Path):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        fail(f"Could not parse JSON at {p}: {e}")

def peptide_exists(slug: str) -> Path:
    p = PEPTIDES_DIR / f"{slug}.json"
    if not p.exists():
        fail(f"Peptide slug not found: {slug} (expected file {p})")
    return p

def get_peptide_name(slug: str) -> str:
    p = peptide_exists(slug)
    data = load_json(p)
    try:
        return data["peptide"]["canonical_name"]
    except Exception:
        fail(f"Peptide file missing peptide.canonical_name: {p}")

def main():
    if not TOPICS_INDEX.exists():
        fail(f"Missing topics index: {TOPICS_INDEX}")
    if not TOPIC_MAP.exists():
        warn(f"Missing deprecated topic map: {TOPIC_MAP} (OK under option 2.2). Skipping mapping validation.")
        mappings = []
    else:
        mapping_doc = load_json(TOPIC_MAP)
        mappings = mapping_doc.get("mappings", [])
        if not isinstance(mappings, list):
            fail("topic_peptide_map_v1.json: mappings must be a list")

    topics_index = load_json(TOPICS_INDEX)
    topic_ids = {t["topic_id"] for t in topics_index.get("topics", [])}
    if not topic_ids:
        fail("No topics found in _topics_index.json")

    # Validate topic-peptide mappings
    mapping_doc = load_json(TOPIC_MAP)
    mappings = mapping_doc.get("mappings", [])
    if not isinstance(mappings, list):
        fail("topic_peptide_map_v1.json: mappings must be a list")

    for i, m in enumerate(mappings):
        for k in ["topic_id", "peptide_slug", "rationale", "confidence", "evidence_grade"]:
            if k not in m:
                fail(f"Mapping[{i}] missing '{k}'")
        if m["topic_id"] not in topic_ids:
            fail(f"Mapping[{i}] topic_id not in topics index: {m['topic_id']}")
        if not str(m["rationale"]).strip():
            fail(f"Mapping[{i}] rationale cannot be empty")
        if m["confidence"] not in ALLOWED_CONFIDENCE:
            fail(f"Mapping[{i}] invalid confidence: {m['confidence']}")
        if m["evidence_grade"] not in ALLOWED_EVIDENCE_GRADE:
            fail(f"Mapping[{i}] invalid evidence_grade: {m['evidence_grade']}")
        peptide_exists(m["peptide_slug"])

    # Validate topic pages
    if not TOPIC_PAGES_DIR.exists():
        warn("No topic pages directory found. Skipping topic page validation.")
        print("VALIDATION PASSED")
        return

    pages = sorted(TOPIC_PAGES_DIR.glob("*.json"))
    if not pages:
        warn("No topic pages found in content/topics/pages. Consider adding at least one.")
        print("VALIDATION PASSED")
        return

    for page in pages:
        doc = load_json(page)
        if doc.get("schema_version") != "topic_page_v1":
            fail(f"{page}: schema_version must be topic_page_v1")
        tp = doc.get("topic_page", {})
        tid = tp.get("topic_id", "")
        if tid not in topic_ids:
            fail(f"{page}: topic_id not in topics index: {tid}")

        # Validate peptide groups and alphabetical order by canonical_name
        groups = tp.get("peptide_groups", [])
        if not isinstance(groups, list):
            fail(f"{page}: peptide_groups must be a list")

        for gi, g in enumerate(groups):
            peps = g.get("peptides", [])
            if not isinstance(peps, list):
                fail(f"{page}: peptide_groups[{gi}].peptides must be a list")
            # Ensure required keys and slugs exist
            names = []
            for pi, p in enumerate(peps):
                for k in ["canonical_name", "slug", "status_category", "risk_score", "developmental_risk", "evidence_snapshot"]:
                    if k not in p:
                        fail(f"{page}: peptide_groups[{gi}].peptides[{pi}] missing '{k}'")
                slug = p["slug"]
                actual_name = get_peptide_name(slug)
                # canonical_name on topic page must match peptide truth file (tight consistency)
                if p["canonical_name"] != actual_name:
                    fail(f"{page}: peptide '{slug}' canonical_name mismatch. Topic page has '{p['canonical_name']}' but peptide file has '{actual_name}'")
                names.append(actual_name)

            if names != sorted(names, key=lambda s: s.lower()):
                fail(f"{page}: peptide_groups[{gi}] peptides are not alphabetical by canonical_name")

    print("VALIDATION PASSED")

if __name__ == "__main__":
    main()
