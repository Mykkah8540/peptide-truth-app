#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import List, Dict, Tuple, Optional


REPO_ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = REPO_ROOT / "content" / "peptides"
TOPICS_DIR = REPO_ROOT / "content" / "topics"

TOPICS_INDEX_PATH = TOPICS_DIR / "_topics_index.json"
TOPIC_MAP_PATH = TOPICS_DIR / "topic_peptide_map_v1.json"

SEARCH_INDEX_PATH = PEPTIDES_DIR / "_search_index.json"
REPORTS_DIR = REPO_ROOT / "scripts" / "index" / "_reports"


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def save_json(path: Path, doc: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(doc, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def now_stamp() -> str:
    return datetime.now().strftime("%Y-%m-%d_%H%M%S")


@dataclass
class TopicMeta:
    topic_id: str
    title: str
    short_description: str
    icon: str
    order: int


def load_topics_index() -> Dict[str, TopicMeta]:
    if not TOPICS_INDEX_PATH.exists():
        raise FileNotFoundError(f"Missing topics index: {TOPICS_INDEX_PATH}")
    data = load_json(TOPICS_INDEX_PATH)
    out: Dict[str, TopicMeta] = {}
    for t in data.get("topics", []):
        tid = t.get("topic_id")
        if not tid:
            continue
        out[tid] = TopicMeta(
            topic_id=tid,
            title=t.get("title", tid),
            short_description=t.get("short_description", ""),
            icon=t.get("icon", ""),
            order=int(t.get("order", 9999)),
        )
    return out


def load_topic_map() -> List[dict]:
    if not TOPIC_MAP_PATH.exists():
        return []
    data = load_json(TOPIC_MAP_PATH)
    return data.get("mappings", [])


def topics_for_peptide(slug: str, topics_meta: Dict[str, TopicMeta], mappings: List[dict]) -> List[dict]:
    rows: List[dict] = []
    for m in mappings:
        if m.get("peptide_slug") != slug:
            continue
        tid = m.get("topic_id")
        if not tid:
            continue
        tm = topics_meta.get(tid)
        rows.append({
            "topic_id": tid,
            "title": (tm.title if tm else tid),
            "order": (tm.order if tm else 9999),
            "icon": (tm.icon if tm else ""),
            "confidence": m.get("confidence", "unknown"),
            "evidence_grade": m.get("evidence_grade", "mechanistic_only"),
            "rationale": m.get("rationale", ""),
            "is_placeholder": str(m.get("rationale", "")).startswith("PLACEHOLDER:"),
        })

    rows.sort(key=lambda x: (x["order"], (x["title"] or "").lower(), x["topic_id"]))
    for r in rows:
        r.pop("order", None)
    return rows


def coverage_flags(peptide_doc: dict) -> dict:
    pep = peptide_doc.get("peptide", {})
    risk = pep.get("risk", {})
    sections = pep.get("sections", {})

    dev_risk = bool(risk.get("developmental_risk") is True)
    dev_block = sections.get("developmental_risk_block", [])
    has_dev_block = isinstance(dev_block, list) and len(dev_block) > 0

    obs_ranges = sections.get("observed_exposure_ranges", [])
    has_obs_ranges = isinstance(obs_ranges, list) and len(obs_ranges) > 0

    evidence = pep.get("evidence", [])
    has_evidence = isinstance(evidence, list) and len(evidence) > 0

    has_any_refs = False
    if isinstance(sections, dict):
        for _, v in sections.items():
            if isinstance(v, list):
                for item in v:
                    if isinstance(item, dict) and item.get("evidence_refs"):
                        has_any_refs = True
                        break
            if has_any_refs:
                break

    return {
        "has_evidence_items": has_evidence,
        "has_any_evidence_refs_in_sections": has_any_refs,
        "has_observed_exposure_ranges": has_obs_ranges,
        "developmental_risk_true": dev_risk,
        "has_developmental_risk_block": has_dev_block,
        "dev_risk_block_missing_when_flagged": (dev_risk and not has_dev_block),
    }


def build_index() -> Tuple[dict, dict]:
    topics_meta = load_topics_index()
    mappings = load_topic_map()

    peptides: List[dict] = []
    warnings: List[str] = []

    for path in sorted(PEPTIDES_DIR.glob("*.json")):
        if path.name.startswith("_"):
            continue

        doc = load_json(path)
        pep = doc.get("peptide", {})
        canonical_name = pep.get("canonical_name", path.stem)
        aliases = pep.get("aliases", []) or []

        status = pep.get("status", {})
        classification = pep.get("classification", {})
        risk = pep.get("risk", {})

        entry = {
            "slug": path.stem,
            "canonical_name": canonical_name,
            "aliases": aliases,
            "classification": {
                "category": classification.get("category", ""),
                "needs_prescription": classification.get("needs_prescription", False),
            },
            "status": {
                "category": status.get("category", ""),
                "jurisdiction": status.get("jurisdiction", ""),
                "last_reviewed": status.get("last_reviewed", ""),
            },
            "risk": {
                "severity": risk.get("severity", ""),
                "likelihood": risk.get("likelihood", ""),
                "evidence_grade": risk.get("evidence_grade", ""),
                "developmental_risk": bool(risk.get("developmental_risk") is True),
                "developmental_systems_of_concern": risk.get("developmental_systems_of_concern", []) or [],
                "unknowns_penalty": bool(risk.get("unknowns_penalty") is True),
                "current_score": risk.get("current_score", None),
            },
            "topics": topics_for_peptide(path.stem, topics_meta, mappings),
            "coverage": coverage_flags(doc),
        }

        if entry["coverage"]["dev_risk_block_missing_when_flagged"]:
            warnings.append(f"{path.stem}: developmental_risk true but developmental_risk_block missing/empty")

        peptides.append(entry)

    peptides.sort(key=lambda x: (str(x.get("canonical_name", "")).casefold(), x.get("slug", "")))

    out = {
        "schema_version": "peptide_search_index_v1",
        "generated_at": now_stamp(),
        "rules": {
            "source_of_truth": "content/peptides/<slug>.json",
            "topics_source": "content/topics/topic_peptide_map_v1.json (mappings[])",
            "deterministic_sort": "canonical_name, then slug",
            "navigation_only_topics": True,
        },
        "peptides": peptides,
    }

    report = {
        "timestamp": out["generated_at"],
        "peptides_count": len(peptides),
        "warnings_count": len(warnings),
        "warnings": warnings,
        "output_path": str(SEARCH_INDEX_PATH),
    }

    return out, report


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--write", action="store_true")
    ap.add_argument("--report", action="store_true")
    args = ap.parse_args()

    index_doc, report = build_index()

    if args.write:
        save_json(SEARCH_INDEX_PATH, index_doc)

    if args.report:
        REPORTS_DIR.mkdir(parents=True, exist_ok=True)
        rp = REPORTS_DIR / f"{report['timestamp']}.json"
        save_json(rp, report)

    print(f"Built peptide_search_index_v1 with {report['peptides_count']} peptide(s). Warnings: {report['warnings_count']}")
    if report["warnings_count"] > 0:
        for w in report["warnings"][:25]:
            print(" -", w)
        if report["warnings_count"] > 25:
            print(f" - (and {report['warnings_count']-25} more...)")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
