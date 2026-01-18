#!/usr/bin/env python3
"""
Phase 6: Safe, scalable peptide ingestion (queue -> JSON -> index -> validation)

Non-negotiables:
- Do not redesign schema (pdp_json_v1)
- No instructions / no regimens / no dosing advice
- Observed exposure ranges are allowed ONLY as descriptive sections (placeholders by default)
- Developmental risk must be clearly flagged when applicable
- Validator is authoritative gate

Assumptions (repo-validated):
- Canonical peptide JSON lives at: content/peptides/<slug>.json
- Queue lives at: content/peptides/_queue.csv
- Template lives at: scripts/ingest/peptide_template.json
- Peptide index lives at: content/peptides/_index.json
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import subprocess
from copy import deepcopy
from dataclasses import dataclass
from datetime import date, datetime
from pathlib import Path
from typing import Any, Dict, List, Optional, Set


REPO_ROOT = Path(__file__).resolve().parents[2]
CONTENT_PEPTIDES_DIR = REPO_ROOT / "content" / "peptides"
TEMPLATE_PATH = REPO_ROOT / "scripts" / "ingest" / "peptide_template.json"
QUEUE_PATH = CONTENT_PEPTIDES_DIR / "_queue.csv"
PEPTIDE_INDEX_PATH = CONTENT_PEPTIDES_DIR / "_index.json"
TOPICS_DIR = REPO_ROOT / "content" / "topics"
TOPICS_INDEX_PATH = TOPICS_DIR / "_topics_index.json"
TOPIC_MAP_PATH = TOPICS_DIR / "topic_peptide_map_v1.json"
TOPIC_PAGES_DIR = TOPICS_DIR / "topic_pages_v1"
VALIDATOR_PATH = REPO_ROOT / "scripts" / "validate" / "validate_peptide_json.py"

SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def load_json(path: Path) -> Dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def save_json(path: Path, obj: Dict[str, Any]) -> None:
    path.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def today_iso() -> str:
    return date.today().isoformat()


def now_stamp() -> str:
    return datetime.now().strftime("%Y-%m-%d_%H%M%S")


def assert_slug(slug: str) -> None:
    if not SLUG_RE.match(slug):
        raise ValueError(f"Invalid slug: {slug!r}. Must be lowercase hyphen-separated.")


def parse_bool(val: str) -> bool:
    s = (val or "").strip().lower()
    if s in ("true", "1", "yes", "y"):
        return True
    if s in ("false", "0", "no", "n"):
        return False
    raise ValueError(f"Invalid boolean: {val!r}")


def split_pipes(s: str) -> List[str]:
    if not s:
        return []
    return [x.strip() for x in s.split("|") if x.strip()]


def safe_placeholder(text: str, fallback: str) -> str:
    t = (text or "").strip()
    return t if t else fallback


@dataclass(frozen=True)
class QueueRow:
    canonical_name: str
    slug: str
    status_category: str
    needs_prescription: bool
    priority: str
    notes: str
    aliases: List[str]
    adolescent_flag: Optional[bool]  # Optional override
    primary_topics: List[str]
    developmental_systems: List[str]


def read_queue(queue_path: Path) -> List[QueueRow]:
    """
    Read canonical queue CSV and return normalized QueueRow objects.
    This function MUST remain side-effect free (no topic mapping, no writes).
    """
    import csv

    def split_pipes(s: str) -> List[str]:
        s = (s or "").strip()
        if not s:
            return []
        return [x.strip() for x in s.split("|") if x.strip()]

    def parse_bool_optional(s: str) -> Optional[bool]:
        s = (s or "").strip().lower()
        if not s:
            return None
        if s in ("true", "1", "yes", "y"):
            return True
        if s in ("false", "0", "no", "n"):
            return False
        raise ValueError(f"Invalid boolean value in queue: {s!r} (expected true/false)")

    rows: List[QueueRow] = []
    seen_slug: set[str] = set()

    with queue_path.open(newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for r in reader:
            canonical_name = (r.get("canonical_name") or "").strip()
            slug = (r.get("slug") or "").strip()
            status_category = (r.get("status_category") or "").strip()
            needs_prescription_raw = (r.get("needs_prescription") or "").strip().lower()
            priority = (r.get("priority") or "").strip()
            notes = (r.get("notes") or "").strip()

            if not slug:
                continue
            if slug in seen_slug:
                raise ValueError(f"Duplicate slug in queue: {slug}")
            seen_slug.add(slug)

            if needs_prescription_raw in ("true", "1", "yes", "y"):
                needs_prescription = True
            elif needs_prescription_raw in ("false", "0", "no", "n", ""):
                needs_prescription = False
            else:
                raise ValueError(f"Invalid needs_prescription in queue for {slug}: {needs_prescription_raw!r}")

            aliases = split_pipes((r.get("aliases") or ""))
            primary_topics = split_pipes((r.get("primary_topics") or ""))
            adolescent_flag = parse_bool_optional((r.get("adolescent_flag") or ""))
            developmental_systems = split_pipes((r.get("developmental_systems") or ""))

            rows.append(
                QueueRow(
                    canonical_name=canonical_name,
                    slug=slug,
                    status_category=status_category,
                    needs_prescription=needs_prescription,
                    priority=priority,
                    notes=notes,
                    aliases=aliases,
                    adolescent_flag=adolescent_flag,
                    primary_topics=primary_topics,
                    developmental_systems=developmental_systems,
                )
            )

    return rows

def ensure_observed_exposure_ranges(pep: Dict[str, Any]) -> None:
    # Must exist and be explicitly non-instructional
    sections = pep["sections"]
    oer = sections.get("observed_exposure_ranges", [])
    if not oer:
        sections["observed_exposure_ranges"] = [
            {
                "route": "",
                "unit": "",
                "min": None,
                "max": None,
                "frequency": "",
                "duration": "",
                "population_group": "general",
                "notes": "Descriptive only. Observed in studies; not instructions.",
                "evidence_refs": []
            }
        ]


def ensure_developmental_risk_block(pep: Dict[str, Any]) -> None:
    # If developmental risk is flagged, ensure block exists
    if pep["risk"].get("developmental_risk") is not True:
        return
    sections = pep["sections"]
    block = sections.get("developmental_risk_block", [])
    if not block:
        sections["developmental_risk_block"] = [
            {
                "claim_type": "risk",
                "population_group": "adolescent",
                "confidence": "unknown",
                "evidence_grade": "mechanistic_only",
                "text": (
                    "Developmental risk is flagged due to limited adolescent data and uncertain long-term effects. "
                    "Endocrine, growth, neurodevelopmental, and metabolic setpoints may be sensitive to perturbation. "
                    "This section is descriptive only; uncertainty is explicitly acknowledged."
                ),
                "evidence_refs": []
            }
        ]



def load_topics_index() -> List[str]:
    if not TOPICS_INDEX_PATH.exists():
        raise FileNotFoundError(f"Topics index not found: {TOPICS_INDEX_PATH}")
    data = load_json(TOPICS_INDEX_PATH)
    topics = data.get("topics", [])
    ids = [t.get("topic_id", "") for t in topics if t.get("topic_id")]
    return ids

def validate_topic_ids(topic_ids: List[str]) -> None:
    if not topic_ids:
        return
    allowed = set(load_topics_index())
    bad = [t for t in topic_ids if t not in allowed]
    if bad:
        raise ValueError(f"Invalid topic_id(s) in queue: {bad}. Allowed: {sorted(allowed)}")

def ensure_topic_map_exists() -> dict:
    # Canonical format: mappings[]
    if TOPIC_MAP_PATH.exists():
        return load_json(TOPIC_MAP_PATH)
    return {
        "schema_version": "topic_peptide_map_v1",
        "rules": {
            "topic_tags_are_not_endorsements": True,
            "each_mapping_requires_rationale": True,
            "mappings_should_reference_claim_types_not_protocols": True
        },
        "mappings": []
    }

def upsert_topic_map(map_doc: dict, slug: str, topic_ids: List[str]) -> None:
    """
    Navigation-only mapping. Do not invent claims or protocols.
    If queue includes primary_topics, create placeholder mapping stubs that require human rationale.
    """
    if not topic_ids:
        return

    mappings = map_doc.setdefault("mappings", [])
    existing = {(m.get("topic_id"), m.get("peptide_slug")) for m in mappings}

    for tid in sorted(set(topic_ids)):
        key = (tid, slug)
        if key in existing:
            continue
        mappings.append({
            "topic_id": tid,
            "peptide_slug": slug,
            "rationale": "PLACEHOLDER: descriptive navigation rationale required (not endorsement).",
            "confidence": "unknown",
            "evidence_grade": "mechanistic_only"
        })

def rebuild_topic_pages(map_doc: dict) -> None:
    # Builds content/topics/topic_pages_v1/<topic_id>.json deterministically from mappings[]
    TOPIC_PAGES_DIR.mkdir(parents=True, exist_ok=True)

    mappings = map_doc.get("mappings", [])

    inv: Dict[str, List[str]] = {}
    for m in mappings:
        tid = m.get("topic_id")
        slug = m.get("peptide_slug")
        if not tid or not slug:
            continue
        inv.setdefault(tid, []).append(slug)

    # Load peptides canonical names (for stable display order)
    peptide_meta: Dict[str, str] = {}
    for pj in sorted(CONTENT_PEPTIDES_DIR.glob("*.json")):
        if pj.name.startswith("_"):
            continue
        doc = load_json(pj)
        pep = doc.get("peptide", {})
        peptide_meta[pj.stem] = pep.get("canonical_name", pj.stem)

    for tid, slugs in inv.items():
        items = [{"slug": s, "canonical_name": peptide_meta.get(s, s)} for s in slugs]
        items.sort(key=lambda x: (x["canonical_name"].lower(), x["slug"]))
        out = {
            "schema_version": "topic_page_v1",
            "topic_id": tid,
            "peptides": items,
            "note": "Navigation only. Not a recommendation or endorsement."
        }
        save_json(TOPIC_PAGES_DIR / f"{tid}.json", out)

def make_doc_from_template(template: Dict[str, Any], row: QueueRow) -> Dict[str, Any]:
    doc = deepcopy(template)
    if doc.get("schema_version") != "pdp_json_v1":
        raise ValueError("Template schema_version is not pdp_json_v1; refusing to proceed.")

    pep = doc["peptide"]

    # Core naming
    pep["canonical_name"] = row.canonical_name
    pep["short_name"] = row.canonical_name
    pep["aliases"] = row.aliases

    # Classification + Status
    pep["classification"]["category"] = row.status_category
    pep["classification"]["needs_prescription"] = row.needs_prescription
    pep["classification"]["notes"] = safe_placeholder(
        pep["classification"].get("notes", ""),
        "PLACEHOLDER: Classification notes (non-prescriptive)."
    )

    pep["status"]["category"] = row.status_category
    pep["status"]["jurisdiction"] = pep["status"].get("jurisdiction") or "GLOBAL"
    pep["status"]["last_reviewed"] = today_iso()
    pep["status"]["human_use_note"] = safe_placeholder(
        pep["status"].get("human_use_note", ""),
        "PLACEHOLDER: Status + real-world use context (descriptive only)."
    )

    # Structure fields: leave as template placeholders; do not invent sequences / MW.
    pep["structure"]["sequence_oneletter"] = pep["structure"].get("sequence_oneletter", "") or ""
    pep["structure"]["amino_acid_seq"] = pep["structure"].get("amino_acid_seq", "") or ""
    pep["structure"]["molecular_formula"] = pep["structure"].get("molecular_formula", "") or ""
    pep["structure"]["molecular_weight"] = pep["structure"].get("molecular_weight", None)
    pep["structure"]["structure_image_url"] = pep["structure"].get("structure_image_url", "") or ""

    # Risk defaults
    # Phase 6 rule: default developmental risk TRUE unless approved_human, but allow explicit override.
    if row.adolescent_flag is None:
        pep["risk"]["developmental_risk"] = (row.status_category != "approved_human")
    else:
        pep["risk"]["developmental_risk"] = bool(row.adolescent_flag)

    pep["risk"]["rationale"] = safe_placeholder(
        pep["risk"].get("rationale", ""),
        "PLACEHOLDER: Risk rationale tied to evidence limits and known unknowns."
    )

    # Ensure overview section exists; keep placeholders explicit
    ov_list = pep["sections"].get("overview", [])
    if not ov_list:
        pep["sections"]["overview"] = [
            {
                "claim_type": "overview",
                "title": "What it is",
                "population_group": "general",
                "confidence": "unknown",
                "evidence_grade": "mechanistic_only",
                "text": "PLACEHOLDER: What it is; intended biological purpose; why it is studied.",
                "evidence_refs": []
            }
        ]
    else:
        ov0 = ov_list[0]
        ov0["text"] = safe_placeholder(
            ov0.get("text", ""),
            "PLACEHOLDER: What it is; intended biological purpose; why it is studied."
        )

    # Observed dosing section: must exist but remains descriptive-only unless human-authored
    ensure_observed_exposure_ranges(pep)

    # Developmental block: if flagged
    ensure_developmental_risk_block(pep)

    # Changelog: new initial entry
    pep["changelog"] = [
        {
            "date": today_iso(),
            "change_type": "initial_entry",
            "summary": f"Initial canonical entry for {row.canonical_name}",
            "detail": "Generated from queue ingestion (Phase 6). Requires human-authored, evidence-bounded content.",
            "evidence_refs": []
        }
    ]

    return doc


def rebuild_index(content_dir: Path) -> Dict[str, Any]:
    # Deterministically rebuild the peptide index from actual peptide files
    if PEPTIDE_INDEX_PATH.exists():
        index = load_json(PEPTIDE_INDEX_PATH)
    else:
        index = {
            "schema_version": "peptide_index_v1",
            "rules": {
                "alphabetical": True,
                "sort_key": "canonical_name",
                "slug_rule": "lowercase hyphen-separated",
                "source_of_truth": "content/peptides/<slug>.json"
            },
            "peptides": []
        }

    peptides: List[Dict[str, str]] = []
    for p in content_dir.glob("*.json"):
        if p.name.startswith("_"):
            continue
        doc = load_json(p)
        pep = doc.get("peptide", {})
        canonical = pep.get("canonical_name", "")
        if canonical:
            peptides.append({"slug": p.stem, "canonical_name": canonical})

    peptides.sort(key=lambda x: (x["canonical_name"].lower(), x["slug"]))
    index["peptides"] = peptides
    return index


def run_validator(paths: List[Path]) -> int:
    if not VALIDATOR_PATH.exists():
        raise FileNotFoundError(f"Validator not found: {VALIDATOR_PATH}")

    rc = 0
    for p in paths:
        cmd = ["python3", str(VALIDATOR_PATH), str(p)]
        proc = subprocess.run(cmd, cwd=str(REPO_ROOT))
        if proc.returncode != 0:
            rc = proc.returncode
    return rc



def enforce_developmental_risk(doc: dict, slug: str, systems: List[str]) -> bool:
    """
    Ensures developmental risk flags + an adolescent developmental risk block exists.
    Returns True if doc was modified.
    Descriptive-only: no protocols, no dosing, no regimens.
    """
    changed = False
    pep = doc.setdefault("peptide", {})
    risk = pep.setdefault("risk", {})
    sections = pep.setdefault("sections", {})

    # Set developmental risk true
    if risk.get("developmental_risk") is not True:
        risk["developmental_risk"] = True
        changed = True

    # Ensure developmental risk block exists with at least one entry
    block = sections.get("developmental_risk_block")
    if not isinstance(block, list) or len(block) == 0:
        block = []
        sections["developmental_risk_block"] = block
        changed = True

    # If empty, add a canonical placeholder warning entry
    if len(block) == 0:
        systems_txt = ""
        if systems:
            systems_txt = " Systems of concern (descriptive labels): " + ", ".join(systems) + "."
        block.append({
            "claim_type": "risk",
            "population_group": "adolescent",
            "confidence": "unknown",
            "evidence_grade": "mechanistic_only",
            "text": (
                "Developmental exposure may carry higher and less predictable risk than adult exposure. "
                "Long-term effects on growth, endocrine signaling, and neurodevelopment are not well studied "
                "and may be irreversible." + systems_txt
            ),
            "evidence_refs": []
        })
        changed = True

    return changed

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="No file writes")
    ap.add_argument("--apply", action="store_true", help="Actually write files (safety latch)")
    ap.add_argument("--overwrite", action="store_true", help="Overwrite existing peptide JSON files")
    ap.add_argument("--validate", action="store_true", help="Run validator after generation")
    ap.add_argument("--verbose", action="store_true", help="Print created / skipped / updated")
    ap.add_argument("--only", type=str, default="", help="Comma-separated slugs to run (optional)")
    args = ap.parse_args()


    # SAFETY_LATCH_APPLY: prevent accidental writes
    if (not args.dry_run) and (not args.apply):
        print("Refusing to write files without --apply. Use --dry-run to preview, or re-run with --apply.")
        return 2

    if not TEMPLATE_PATH.exists():
        raise FileNotFoundError(f"Template not found: {TEMPLATE_PATH}")
    template = load_json(TEMPLATE_PATH)

    rows = read_queue(QUEUE_PATH)

    # Topic mapping (navigation only)
    topic_map_doc = ensure_topic_map_exists()

    only: Set[str] = set()
    if args.only.strip():
        only = {s.strip() for s in args.only.split(",") if s.strip()}
        rows = [r for r in rows if r.slug in only]

    created: List[str] = []
    updated: List[str] = []
    skipped: List[str] = []
    warnings: List[str] = []
    written_paths: List[Path] = []

    for row in rows:
        # Queue-driven topic mapping (navigation only; placeholder stubs only)
        validate_topic_ids(row.primary_topics)
        if row.primary_topics:
            upsert_topic_map(topic_map_doc, row.slug, row.primary_topics)

        # Queue-driven developmental risk enforcement (safety-first; descriptive-only)
        # If adolescent_flag is true OR developmental_systems provided, enforce risk flag + warning block.
        enforce_dev = (row.adolescent_flag is True) or (len(row.developmental_systems) > 0)
        dev_modified = False
        if enforce_dev:
            peptide_path = CONTENT_PEPTIDES_DIR / f"{row.slug}.json"
            if peptide_path.exists():
                doc_existing = load_json(peptide_path)
                dev_modified = enforce_developmental_risk(doc_existing, row.slug, row.developmental_systems)
                if dev_modified and args.apply:
                    save_json(peptide_path, doc_existing)
            # If file does not exist, template generation path will include flags later.

        out_path = CONTENT_PEPTIDES_DIR / f"{row.slug}.json"
        exists = out_path.exists()

        if exists and not args.overwrite:
            skipped.append(row.slug)
            continue

        doc = make_doc_from_template(template, row)

        # Warn if overview has no refs (placeholder allowed)
        ov0 = doc["peptide"]["sections"]["overview"][0]
        if not ov0.get("evidence_refs"):
            warnings.append(f"{row.slug}: overview has no evidence_refs yet (placeholder ok; must be authored later).")

        if args.dry_run:
            (updated if exists else created).append(row.slug)
            continue

        save_json(out_path, doc)
        written_paths.append(out_path)
        (updated if exists else created).append(row.slug)

    # Rebuild index each run for deterministic alphabetical integrity
    new_index = rebuild_index(CONTENT_PEPTIDES_DIR)
    if not args.dry_run:
        save_json(PEPTIDE_INDEX_PATH, new_index)
        # Write topic map + topic pages deterministically
        save_json(TOPIC_MAP_PATH, topic_map_doc)
        rebuild_topic_pages(topic_map_doc)

    # Report
    report = {
        "timestamp": now_stamp(),
        "dry_run": bool(args.dry_run),
        "overwrite": bool(args.overwrite),
        "only": sorted(list(only)),
        "created": created,
        "updated": updated,
        "skipped": skipped,
        "warnings": warnings,
        "queue_path": str(QUEUE_PATH),
        "template_path": str(TEMPLATE_PATH),
        "index_path": str(PEPTIDE_INDEX_PATH),
    }

    # VERBOSE_OUTPUT_BLOCK
    if args.verbose:
        print("Created:", created)
        print("Updated:", updated)
        print("Skipped:", skipped)
        if warnings:
            print("Warnings:")
            for w in warnings:
                print(" -", w)


    report_dir = REPO_ROOT / "scripts" / "ingest" / "_reports"
    if not args.dry_run:
        report_dir.mkdir(parents=True, exist_ok=True)
        save_json(report_dir / f"{report['timestamp']}.json", report)

    if args.validate and written_paths:
        return run_validator(written_paths)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
