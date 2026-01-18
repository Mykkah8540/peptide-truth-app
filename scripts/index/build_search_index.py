#!/usr/bin/env python3
"""
Deterministic peptide search index builder (metadata only).
- --write: writes content/peptides/_search_index.json
- --check: does NOT write; exits 2 if generated output differs from file
- --report: writes a build report to scripts/index/_reports/<timestamp>.json
"""

from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional


REPO_ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = REPO_ROOT / "content" / "peptides"
SEARCH_INDEX_PATH = PEPTIDES_DIR / "_search_index.json"
REPORTS_DIR = REPO_ROOT / "scripts" / "index" / "_reports"


@dataclass(frozen=True)
class IndexItem:
    slug: str
    canonical_name: str
    short_name: str
    aliases: List[str]
    status_category: str
    needs_prescription: bool
    risk_severity: str
    risk_likelihood: str
    evidence_grade: str
    developmental_risk: bool
    primary_topics: List[str]


def _load_json(path: Path) -> Dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def _safe_bool(v: Any, default: bool = False) -> bool:
    if isinstance(v, bool):
        return v
    if isinstance(v, str):
        if v.strip().lower() in ("true", "1", "yes", "y"):
            return True
        if v.strip().lower() in ("false", "0", "no", "n"):
            return False
    return default


def _list_peptide_files() -> List[Path]:
    files: List[Path] = []
    for p in PEPTIDES_DIR.glob("*.json"):
        if p.name.startswith("_"):
            continue
        files.append(p)
    return sorted(files, key=lambda x: x.name)


def _extract_primary_topics(doc: Dict[str, Any]) -> List[str]:
    pep = doc.get("peptide", {}) or {}
    meta = pep.get("meta", {}) or {}
    topics = meta.get("primary_topics", []) or []
    if isinstance(topics, str):
        topics = [t.strip() for t in topics.split("|") if t.strip()]
    if not isinstance(topics, list):
        return []
    out = []
    for t in topics:
        if isinstance(t, str) and t.strip():
            out.append(t.strip())
    return sorted(set(out))


def build_index() -> Dict[str, Any]:
    items: List[IndexItem] = []
    warnings: List[str] = []

    for path in _list_peptide_files():
        try:
            doc = _load_json(path)
        except Exception as e:
            warnings.append(f"Failed to parse {path.name}: {e}")
            continue

        pep = doc.get("peptide", {}) or {}
        canonical = (pep.get("canonical_name") or "").strip()
        slug = path.stem.strip()
        if not canonical or not slug:
            warnings.append(f"Missing canonical_name or slug for {path.name}")
            continue

        short = (pep.get("short_name") or canonical).strip()
        aliases = pep.get("aliases") or []
        if isinstance(aliases, str):
            aliases = [a.strip() for a in aliases.split("|") if a.strip()]
        if not isinstance(aliases, list):
            aliases = []
        aliases = [a.strip() for a in aliases if isinstance(a, str) and a.strip()]
        aliases = sorted(set(aliases))

        classification = pep.get("classification", {}) or {}
        status = pep.get("status", {}) or {}
        risk = pep.get("risk", {}) or {}

        status_category = (status.get("category") or classification.get("category") or "").strip()
        needs_rx = _safe_bool(classification.get("needs_prescription"), default=False)

        risk_sev = (risk.get("severity") or "unknown").strip()
        risk_like = (risk.get("likelihood") or "unknown").strip()
        ev_grade = (risk.get("evidence_grade") or "unknown").strip()
        dev_risk = _safe_bool(risk.get("developmental_risk"), default=False)

        primary_topics = _extract_primary_topics(doc)

        items.append(IndexItem(
            slug=slug,
            canonical_name=canonical,
            short_name=short,
            aliases=aliases,
            status_category=status_category or "unknown",
            needs_prescription=needs_rx,
            risk_severity=risk_sev,
            risk_likelihood=risk_like,
            evidence_grade=ev_grade,
            developmental_risk=dev_risk,
            primary_topics=primary_topics,
        ))

    # Deterministic sort: canonical_name, then slug
    items_sorted = sorted(items, key=lambda x: (x.canonical_name.lower(), x.slug))

    out_doc: Dict[str, Any] = {
        "schema_version": "peptide_search_index_v1",
"rules": {
            "metadata_only": True,
            "source_of_truth": "content/peptides/<slug>.json",
            "no_protocols_no_regimens": True,
            "topics_are_navigation_not_recommendation": True,
        },
        "peptides": [
            {
                "slug": it.slug,
                "canonical_name": it.canonical_name,
                "short_name": it.short_name,
                "aliases": it.aliases,
                "status_category": it.status_category,
                "needs_prescription": it.needs_prescription,
                "risk": {
                    "severity": it.risk_severity,
                    "likelihood": it.risk_likelihood,
                    "evidence_grade": it.evidence_grade,
                    "developmental_risk": it.developmental_risk,
                },
                "topics": {
                    "primary": it.primary_topics
                }
            }
            for it in items_sorted
        ],
        "warnings": warnings,
        "counts": {
            "peptides": len(items_sorted),
            "warnings": len(warnings),
        }
    }
    return out_doc


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--write", action="store_true", help="Write content/peptides/_search_index.json")
    ap.add_argument("--check", action="store_true", help="Do not write; exit 2 if file differs from generated output")
    ap.add_argument("--report", action="store_true", help="Write scripts/index/_reports/<timestamp>.json")
    args = ap.parse_args()

    if args.write and args.check:
        print("ERROR: Use only one of --write or --check")
        return 2

    doc = build_index()
    generated = json.dumps(doc, indent=2) + "\n"

    # --check mode (non-mutating)
    if args.check:
        existing = SEARCH_INDEX_PATH.read_text(encoding="utf-8") if SEARCH_INDEX_PATH.exists() else ""
        if existing != generated:
            print("Search index check FAILED: content/peptides/_search_index.json differs from generated output.")
            print("Run: python3 scripts/index/build_search_index.py --write --report")
            return 2
        print("Search index check OK: no changes needed.")
        return 0

    # --write mode
    if args.write:
        SEARCH_INDEX_PATH.write_text(generated, encoding="utf-8")

    # report (allowed in either mode; but in check mode we returned already)
    if args.report:
        REPORTS_DIR.mkdir(parents=True, exist_ok=True)
        ts = datetime.now().strftime("%Y-%m-%d_%H%M%S")
        report_path = REPORTS_DIR / f"{ts}.json"
        report_path.write_text(generated, encoding="utf-8")

    print(f"Built peptide_search_index_v1 with {doc['counts']['peptides']} peptide(s). Warnings: {doc['counts']['warnings']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
