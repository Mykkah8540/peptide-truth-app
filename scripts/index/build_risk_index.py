#!/usr/bin/env python3
"""
Build content/_index/risk_index_v1.json

Goals:
- One deterministic, fast artifact the UI can load to show risk badges everywhere
- Use existing peptide risk blocks (source of truth)
- Compute blend risk conservatively from component peptide risks
- Attach safety_links using existing safety_ids in content/safety/_safety_index.json

NO dosing. NO instructions. Risk-only metadata + links.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"
BLENDS_DIR = ROOT / "content" / "blends"
BLENDS_INDEX = BLENDS_DIR / "_index.json"
SAFETY_INDEX = ROOT / "content" / "safety" / "_safety_index.json"
OUT_PATH = ROOT / "content" / "_index" / "risk_index_v1.json"


EVIDENCE_RANK = {
    # Higher rank = stronger evidence (best). We will choose the WEAKER of two by rank.
    "regulatory_label": 9,
    "rct_meta": 8,
    "rct": 7,
    "human_interventional": 6,
    "human_observational": 5,
    "animal": 4,
    "in_vitro": 3,
    "mechanistic_only": 2,
    "unknown": 1,
}

SEVERITY_RANK = {"minimal": 1, "mild": 2, "moderate": 3, "high": 4, "critical": 5}
LIKELIHOOD_RANK = {"unlikely": 1, "possible": 2, "likely": 3, "very_likely": 4}


def die(msg: str, code: int = 1) -> None:
    raise SystemExit(f"ERROR: {msg}")


def load_json(p: Path) -> Any:
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        die(f"Failed to parse JSON: {p} ({e})")


def list_peptide_files() -> list[Path]:
    return sorted([p for p in PEPTIDES_DIR.glob("*.json") if not p.name.startswith("_")])


def list_blend_files() -> list[Path]:
    return sorted([p for p in BLENDS_DIR.glob("*.json") if not p.name.startswith("_")])


def safety_ids() -> set[str]:
    if not SAFETY_INDEX.exists():
        return set()
    s = load_json(SAFETY_INDEX)
    pages = s.get("pages", [])
    out = set()
    if isinstance(pages, list):
        for x in pages:
            if isinstance(x, dict) and isinstance(x.get("safety_id"), str):
                out.add(x["safety_id"])
    return out


def build_safety_links(*, developmental_risk: bool, unknowns_penalty: bool, has_interactions: bool) -> list[str]:
    # Keep this simple and deterministic.
    links = []
    if developmental_risk:
        links.append("safety_adolescents_development")
        links.append("safety_endocrine_axes")
    if has_interactions:
        links.append("safety_interactions")
    if unknowns_penalty:
        links.append("safety_evidence_grades")
    links.append("safety_risk_scoring")

    # de-dupe preserve order
    seen = set()
    out = []
    for x in links:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out


def has_any_interaction_notes(peptide_obj: dict) -> bool:
    # Use what exists today: interaction_summary arrays embedded in sections (if present).
    # If those are empty, this returns False.
    secs = peptide_obj.get("sections", [])
    if not isinstance(secs, list):
        return False
    for s in secs:
        if not isinstance(s, dict):
            continue
        summary = s.get("interaction_summary")
        if isinstance(summary, list) and any(isinstance(x, str) and x.strip() for x in summary):
            return True
    return False


def worse_evidence(a: str | None, b: str | None) -> str | None:
    if not a and not b:
        return None
    if not a:
        return b
    if not b:
        return a
    ra = EVIDENCE_RANK.get(a, 1)
    rb = EVIDENCE_RANK.get(b, 1)
    return a if ra <= rb else b


def max_severity(a: str | None, b: str | None) -> str | None:
    if not a and not b:
        return None
    if not a:
        return b
    if not b:
        return a
    return a if SEVERITY_RANK.get(a, 1) >= SEVERITY_RANK.get(b, 1) else b


def max_likelihood(a: str | None, b: str | None) -> str | None:
    if not a and not b:
        return None
    if not a:
        return b
    if not b:
        return a
    return a if LIKELIHOOD_RANK.get(a, 1) >= LIKELIHOOD_RANK.get(b, 1) else b


def clamp_score(x: int) -> int:
    return max(1, min(10, x))

def compute_risk_tier(
    *,
    risk_score: int,
    severity: str | None,
    likelihood: str | None,
    developmental_risk: bool,
    unknowns_penalty: bool,
) -> str:
    """
    Tier rubric (v1):
    - Base bands: 1–3 low, 4–6 moderate, 7–10 high
    - Escalate: severity high/critical => high
    - Escalate: unknowns_penalty or developmental_risk + score>=6 => high
    - No automatic bump from flags when score<=3 (prevents inflation)
    """
    s = clamp_score(int(risk_score))

    # Base from score
    tier = "low" if s <= 3 else ("moderate" if s <= 6 else "high")

    sev = (severity or "").strip().lower() or None
    like = (likelihood or "").strip().lower() or None

    if sev in ("critical", "high"):
        return "high"

    if (unknowns_penalty or developmental_risk) and s >= 6:
        return "high"

    if sev == "moderate" and like in ("very_likely", "likely"):
        return "moderate" if tier == "low" else tier

    return tier



def compute_blend_risk(component_risks: list[dict]) -> dict:
    # Conservative aggregation:
    # - Base = max(component risk_score)
    # - +1 if 2+ components have risk_score >= 6 (stacking uncertainty)
    # - Cap at 10
    scores = [int(r.get("risk_score") or 0) for r in component_risks if isinstance(r, dict)]
    base = max(scores) if scores else 5  # default conservative
    high_count = sum(1 for s in scores if s >= 6)
    score = base + (1 if high_count >= 2 else 0)

    developmental = any(bool(r.get("developmental_risk")) for r in component_risks)
    unknowns = any(bool(r.get("unknowns_penalty")) for r in component_risks)
    severity = None
    likelihood = None
    evidence = None
    for r in component_risks:
        severity = max_severity(severity, r.get("severity"))
        likelihood = max_likelihood(likelihood, r.get("likelihood"))
        evidence = worse_evidence(evidence, r.get("evidence_grade"))

    return {
        "risk_score": clamp_score(int(score)),
        "risk_tier": compute_risk_tier(
            risk_score=int(score),
            severity=severity,
            likelihood=likelihood,
            developmental_risk=developmental,
            unknowns_penalty=unknowns,
        ),
        "severity": severity,
        "likelihood": likelihood,
        "evidence_grade": evidence,
        "developmental_risk": developmental,
        "unknowns_penalty": unknowns,
    }


def main() -> int:

    allowed_safety = safety_ids()

    # Build peptide risk map
    pep_risk_by_slug: dict[str, dict] = {}
    pep_has_interactions: dict[str, bool] = {}

    for p in list_peptide_files():
        d = load_json(p)
        pep = d.get("peptide", {})
        slug = pep.get("slug")
        if not isinstance(slug, str) or not slug.strip():
            die(f"Peptide missing slug: {p}")
        r = pep.get("risk")
        if not isinstance(r, dict):
            die(f"Peptide missing risk block: {p}")

        # minimal required
        if not isinstance(r.get("risk_score"), int):
            die(f"Peptide risk_score must be int for {slug}")
        pep_risk_by_slug[slug] = r
        pep_has_interactions[slug] = has_any_interaction_notes(pep)

    # Build blend composition map from blends/_index.json if present
    blend_components: dict[str, list[str]] = {}
    if BLENDS_INDEX.exists():
        idx = load_json(BLENDS_INDEX)
        blends = idx.get("blends", [])
        if isinstance(blends, list):
            for b in blends:
                if not isinstance(b, dict):
                    continue
                slug = b.get("slug")
                comps = b.get("components", [])
                if isinstance(slug, str) and isinstance(comps, list):
                    blend_components[slug] = [c for c in comps if isinstance(c, str) and c.strip()]

    # Build risk entries
    entities = []

    # Peptides
    for slug, r in sorted(pep_risk_by_slug.items()):
        dev = bool(r.get("developmental_risk"))
        unk = bool(r.get("unknowns_penalty"))
        inter = bool(pep_has_interactions.get(slug, False))
        tier = compute_risk_tier(
            risk_score=int(r.get("risk_score")),
            severity=r.get("severity"),
            likelihood=r.get("likelihood"),
            developmental_risk=dev,
            unknowns_penalty=unk,
        )
        links = build_safety_links(developmental_risk=dev, unknowns_penalty=unk, has_interactions=inter)
        links = [x for x in links if x in allowed_safety] if allowed_safety else links

        entities.append({
            "route": f"peptide:{slug}",
            "kind": "peptide",
            "slug": slug,
            "risk": {
                "risk_score": int(r.get("risk_score")),
                "risk_tier": tier,
                "severity": r.get("severity"),
                "likelihood": r.get("likelihood"),
                "evidence_grade": r.get("evidence_grade"),
                "developmental_risk": dev,
                "unknowns_penalty": unk,
            },
            "safety_links": links,
        })

    # Blends (computed)
    # Prefer blend_components from _index.json; fallback: parse each blend JSON for components (if present there)
    blend_slugs = sorted(set([p.stem for p in list_blend_files()]))

    for slug in blend_slugs:
        comps = blend_components.get(slug)
        if not comps:
            # fallback to blend json
            d = load_json(BLENDS_DIR / f"{slug}.json")
            comps = d.get("blend", {}).get("components", [])
            if not isinstance(comps, list):
                comps = []
            comps = [c for c in comps if isinstance(c, str) and c.strip()]

        component_risks = [pep_risk_by_slug.get(c, {}) for c in comps]
        br = compute_blend_risk(component_risks)
        dev = bool(br.get("developmental_risk"))
        unk = bool(br.get("unknowns_penalty"))
        # blend interactions = OR of component interactions (until you add real blend interactions)
        inter = any(bool(pep_has_interactions.get(c, False)) for c in comps)

        tier = compute_risk_tier(
            risk_score=int(br.get("risk_score")),
            severity=br.get("severity"),
            likelihood=br.get("likelihood"),
            developmental_risk=dev,
            unknowns_penalty=unk,
        )
        links = build_safety_links(developmental_risk=dev, unknowns_penalty=unk, has_interactions=inter)
        links = [x for x in links if x in allowed_safety] if allowed_safety else links

        entities.append({
            "route": f"blend:{slug}",
            "kind": "blend",
            "slug": slug,
            "risk": {
                "risk_score": int(br.get("risk_score")),
                "risk_tier": tier,
                "severity": br.get("severity"),
                "likelihood": br.get("likelihood"),
                "evidence_grade": br.get("evidence_grade"),
                "developmental_risk": dev,
                "unknowns_penalty": unk,
                "computed_from_components": True,
                "component_slugs": comps,
            },
            "safety_links": links,
        })

    out = {
        "version": "v1",
        "generated_on": date.today().isoformat(),
        "counts": {
            "entities": len(entities),
            "peptides": sum(1 for e in entities if e.get("kind") == "peptide"),
            "blends": sum(1 for e in entities if e.get("kind") == "blend"),
        },
        "entities": entities,
    }

    OUT_PATH.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Wrote: {OUT_PATH} (entities={len(entities)})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
