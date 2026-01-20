#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
from datetime import date
from typing import Any, Dict, List, Tuple

ROOT = Path(__file__).resolve().parents[2]

TOPICS_INDEX = ROOT / "content" / "topics" / "_topics_index.json"
TOPIC_PAGES_DIR = ROOT / "content" / "topics" / "pages"

DEPRECATED_MAP = ROOT / "content" / "_deprecated" / "topics" / "topic_peptide_map_v1.json"
PEPTIDES_DIR = ROOT / "content" / "peptides"

SCHEMA_VERSION = "topic_page_v1"

# Deterministic filenames (keep consistent; do NOT re-introduce "*-and-*" variants)
TOPIC_ID_TO_FILENAME = {
    "topic_fat_loss_metabolism": "fat-loss-metabolism.json",
    "topic_muscle_recovery": "muscle-recovery.json",
    "topic_injury_healing": "injury-healing.json",
    "topic_gut_inflammation": "gut-inflammation.json",
    "topic_skin_cosmetic": "skin-cosmetic-health.json",
    "topic_sleep_circadian": "sleep-circadian.json",
    "topic_cognition_mood": "cognition-mood.json",
    "topic_longevity_aging": "longevity-aging.json",
    "topic_immune_modulation": "immune-modulation.json",
    "topic_hormonal_endocrine": "hormonal-endocrine.json",
    "topic_safety_quality_testing": "safety-quality-testing.json",
}

# Evidence grade ordering (best -> worst) to compute a single snapshot from evidence list
EVIDENCE_RANK = {
    "regulatory_label": 100,
    "rct_meta": 90,
    "rct": 85,
    "human_interventional": 80,
    "human_observational": 70,
    "animal": 40,
    "in_vitro": 30,
    "mechanistic_only": 20,
    "unknown": 0,
}

HUMAN_GRADES = {
    "regulatory_label", "rct_meta", "rct", "human_interventional", "human_observational"
}

def load_json(p: Path) -> Any:
    return json.loads(p.read_text(encoding="utf-8"))

def save_json(p: Path, obj: Any) -> None:
    p.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def today_iso() -> str:
    return date.today().isoformat()

def peptide_path(slug: str) -> Path:
    return PEPTIDES_DIR / f"{slug}.json"

def compute_evidence_snapshot(pep: Dict[str, Any]) -> Dict[str, Any]:
    """
    pep is the inner peptide object (d["peptide"]).
    Evidence is currently a LIST of source items with evidence_grade.
    """
    ev = pep.get("evidence", [])
    best_grade = "unknown"
    human_exists = False

    if isinstance(ev, list) and ev:
        best_item = None
        best_rank = -1
        for item in ev:
            g = (item or {}).get("evidence_grade", "unknown")
            r = EVIDENCE_RANK.get(g, 0)
            if r > best_rank:
                best_rank = r
                best_item = item
        if best_item:
            best_grade = best_item.get("evidence_grade", "unknown")
        human_exists = any(((item or {}).get("evidence_grade") in HUMAN_GRADES) for item in ev)

    # If evidence list is empty, fall back to risk.evidence_grade if present
    risk = pep.get("risk", {}) if isinstance(pep.get("risk", {}), dict) else {}
    if best_grade == "unknown":
        fallback = risk.get("evidence_grade")
        if isinstance(fallback, str) and fallback.strip():
            best_grade = fallback.strip()

    return {
        "best_available_grade": best_grade,
        "human_evidence_exists": bool(human_exists),
    }

def read_peptide_summary(slug: str) -> Dict[str, Any]:
    p = peptide_path(slug)
    if not p.exists():
        raise FileNotFoundError(f"Missing peptide file: {p}")
    d = load_json(p)
    pep = d["peptide"]

    canonical_name = pep.get("canonical_name", "")
    status = pep.get("status", {}) if isinstance(pep.get("status", {}), dict) else {}
    risk = pep.get("risk", {}) if isinstance(pep.get("risk", {}), dict) else {}

    status_category = status.get("category", "unknown")
    risk_score = risk.get("current_score", None)
    developmental_risk = bool(risk.get("developmental_risk", False))

    ev_snap = compute_evidence_snapshot(pep)

    return {
        "canonical_name": canonical_name,
        "slug": slug,
        "status_category": status_category,
        "risk_score": risk_score,
        "developmental_risk": developmental_risk,
        "evidence_snapshot": ev_snap,
    }

def build_intro(title: str, short_desc: str) -> Dict[str, Any]:
    # Keep it conservative + non-prescriptive
    return {
        "what_this_topic_means": f"This topic helps you browse peptides commonly associated with: {short_desc}. Associations reflect search interest and categorization—not recommendations.",
        "common_misconceptions": [
            "Association with a topic is not proof of benefit.",
            "Preclinical or mechanistic evidence is not the same as proven human outcomes.",
            "Short-term biomarker changes do not guarantee long-term safety or effectiveness."
        ],
        "who_should_be_extra_cautious": [
            "Adolescents and young adults (developmental setpoints may still be calibrating)",
            "People with complex endocrine/metabolic conditions",
            "Anyone on multiple medications or with significant medical comorbidity"
        ]
    }

def build_page(topic: Dict[str, Any], mapped_slugs: List[Tuple[str, Dict[str, Any]]]) -> Dict[str, Any]:
    tid = topic["topic_id"]
    title = topic["title"]
    short_desc = topic.get("short_description", "").strip()

    # Build peptides list deterministically (alphabetical by canonical_name)
    peptide_items = []
    for slug, mapping in mapped_slugs:
        ps = read_peptide_summary(slug)
        rationale = (mapping or {}).get("rationale", "").strip()
        peptide_items.append({
            "canonical_name": ps["canonical_name"],
            "slug": ps["slug"],
            "why_people_look_it_up": (rationale or "Commonly searched under this topic; association reflects interest, not endorsement."),
            "status_category": ps["status_category"],
            "risk_score": ps["risk_score"],
            "developmental_risk": ps["developmental_risk"],
            "evidence_snapshot": ps["evidence_snapshot"],
        })

    peptide_items.sort(key=lambda x: (x["canonical_name"] or "").lower())

    doc = {
        "schema_version": SCHEMA_VERSION,
        "topic_page": {
            "topic_id": tid,
            "title": title,
            "intro": build_intro(title, short_desc),
            "how_to_use_this_page": [
                "Topics help you browse; they do not recommend peptides.",
                "Always check status and risk score first.",
                "Human evidence and preclinical evidence are separated."
            ],
            "peptide_groups": [
                {
                    "group_title": "Mapped peptides",
                    "display_rule": "Alphabetical within group",
                    "peptides": peptide_items
                }
            ],
            "safety_callouts": [
                {
                    "title": "Adolescents and development",
                    "body": (
                        "If you are under 18, treat uncertainty as part of the risk. Many compounds have little to no adolescent data, "
                        "and endocrine/metabolic effects may have long-lived consequences."
                    )
                }
            ],
            "evidence_notes": [
                {
                    "title": "Why evidence changes",
                    "body": (
                        "Status and evidence can change as trials publish or regulators update labeling. "
                        "This app aims to track updates and tie key claims to specific sources."
                    )
                },
                {
                    "title": "Absence of evidence is not evidence of safety",
                    "body": (
                        "Many compounds have limited human exposure data, short study durations, or outcomes that don’t capture rare or delayed harms. "
                        "When uncertainty is high, the risk score reflects that explicitly."
                    )
                }
            ],
            "last_reviewed": today_iso(),
        }
    }
    return doc

def main() -> int:
    if not TOPICS_INDEX.exists():
        raise SystemExit(f"Missing topics index: {TOPICS_INDEX}")

    topics_index = load_json(TOPICS_INDEX)
    topics = topics_index.get("topics", [])
    if not isinstance(topics, list) or not topics:
        raise SystemExit("No topics found in _topics_index.json")

    # Load mappings if present (deprecated map may exist; under option 2.2 it should)
    mappings: List[Dict[str, Any]] = []
    if DEPRECATED_MAP.exists():
        mapping_doc = load_json(DEPRECATED_MAP)
        mappings = mapping_doc.get("mappings", [])
        if not isinstance(mappings, list):
            raise SystemExit("Deprecated topic map mappings must be a list.")
    else:
        # Still build empty pages (no peptides) deterministically
        mappings = []

    # Group mappings by topic_id
    by_topic: Dict[str, List[Tuple[str, Dict[str, Any]]]] = {}
    for m in mappings:
        tid = m.get("topic_id")
        slug = m.get("peptide_slug")
        if not tid or not slug:
            continue
        by_topic.setdefault(tid, []).append((slug, m))

    TOPIC_PAGES_DIR.mkdir(parents=True, exist_ok=True)

    written = 0
    for t in topics:
        tid = t["topic_id"]
        fname = TOPIC_ID_TO_FILENAME.get(tid)
        if not fname:
            raise SystemExit(f"No deterministic filename mapping for topic_id: {tid}. Add it to TOPIC_ID_TO_FILENAME.")
        out_path = TOPIC_PAGES_DIR / fname
        mapped = by_topic.get(tid, [])
        doc = build_page(t, mapped)
        save_json(out_path, doc)
        written += 1

    print(f"OK: wrote/updated {written} topic page(s) in {TOPIC_PAGES_DIR}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
