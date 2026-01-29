#!/usr/bin/env python3
import json
from pathlib import Path
from typing import Any, Dict, List, Optional

BATCH = [
  "sermorelin","bradykinin","dsip","ara-290","mots-c","oxytocin","aod-9604","shlp-2",
  "cjc-1295","humanin","retatrutide","semaglutide","tirzepatide","atrial-natriuretic-peptide",
  "ghk-cu","substance-p",
]

REPO = Path(__file__).resolve().parents[2]  # scripts/curate -> scripts -> repo root
PEPTIDES_DIR = REPO / "content" / "peptides"

def load_json(fp: Path) -> Dict[str, Any]:
    return json.loads(fp.read_text())

def save_json(fp: Path, obj: Dict[str, Any]) -> None:
    fp.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n")

def detect_block_shape() -> Dict[str, Any]:
    """
    Detect the block schema by looking at bpc-157 sections.use_cases or sections.overview.
    Returns a dict describing the canonical keys to keep for each block.
    """
    tmpl = load_json(PEPTIDES_DIR / "bpc-157.json")
    sec = ((tmpl.get("peptide") or {}).get("sections") or {})
    candidate = None
    for k in ["use_cases", "overview"]:
        v = sec.get(k)
        if isinstance(v, list) and v and isinstance(v[0], dict):
            candidate = v[0]
            break

    # Fallback schema: minimal "text"
    if not isinstance(candidate, dict):
        return {"keys": ["text"], "text_key": "text"}

    keys = list(candidate.keys())
    text_key = "text" if "text" in candidate else ("content" if "content" in candidate else keys[0])
    # Keep ordering stable: put text key first, then the rest
    ordered = [text_key] + [k for k in keys if k != text_key]
    return {"keys": ordered, "text_key": text_key}

def make_block(schema: Dict[str, Any], text: str) -> Dict[str, Any]:
    out = {k: None for k in schema["keys"]}
    out[schema["text_key"]] = text
    # Drop Nones for cleanliness (unless template uses explicit nulls)
    return {k: v for k, v in out.items() if v is not None}

def ensure_sections(obj: Dict[str, Any]) -> Dict[str, Any]:
    pep = obj.get("peptide")
    if not isinstance(pep, dict):
        pep = {}
        obj["peptide"] = pep
    sec = pep.get("sections")
    if not isinstance(sec, dict):
        sec = {}
        pep["sections"] = sec
    return sec

def is_empty_blocks(v: Any) -> bool:
    if v is None:
        return True
    if isinstance(v, list) and len(v) == 0:
        return True
    return False

def listify(x: Any) -> List[str]:
    if isinstance(x, list):
        return [str(i).strip() for i in x if str(i).strip()]
    return []

def build_use_cases_blocks(schema: Dict[str, Any], practical: Dict[str, Any]) -> List[Dict[str, Any]]:
    benefits = listify(practical.get("benefits"))
    blocks: List[Dict[str, Any]] = []

    # short framing paragraph (non-dosing, no instructions)
    blocks.append(make_block(schema,
        "These are the most common real-world reasons people look into this peptide, plus the context that tends to matter most (quality, expectations, and safety)."
    ))

    if benefits:
        # Convert benefits into short lines (not bullets in UI; ContentBlocks renders blocks as paragraphs)
        for b in benefits[:8]:
            blocks.append(make_block(schema, f"• {b}"))
    else:
        blocks.append(make_block(schema,
            "Use-case notes are pending. We’ll add them after evidence + safety context are reviewed."
        ))

    return blocks

def build_interaction_summary_blocks(schema: Dict[str, Any], interactions: Dict[str, Any]) -> List[Dict[str, Any]]:
    drug = listify(interactions.get("drug_classes"))
    supp = listify(interactions.get("supplement_classes"))

    blocks: List[Dict[str, Any]] = []
    blocks.append(make_block(schema,
        "Interactions here are category flags — they’re meant to help you ask better questions and avoid obvious conflicts. They are not a dosing guide."
    ))

    if drug:
        blocks.append(make_block(schema, "Drug-class flags to review:"))
        blocks.append(make_block(schema, "• " + ", ".join(drug)))

    if supp:
        blocks.append(make_block(schema, "Supplement / OTC flags to review:"))
        blocks.append(make_block(schema, "• " + ", ".join(supp)))

    if (not drug) and (not supp):
        blocks.append(make_block(schema,
            "No interaction classes are tagged yet for this peptide. That may mean ‘not reviewed’ rather than ‘no interactions.’"
        ))

    blocks.append(make_block(schema,
        "If you’re on cardiovascular, anticoagulant/antiplatelet, serotonergic, or immunomodulating meds/supplements, treat uncertainty as a reason to slow down and verify with a clinician."
    ))
    return blocks

def main() -> int:
    schema = detect_block_shape()

    changed = 0
    for slug in BATCH:
        fp = PEPTIDES_DIR / f"{slug}.json"
        if not fp.exists():
            continue
        obj = load_json(fp)
        sec = ensure_sections(obj)

        practical = obj.get("practical") if isinstance(obj.get("practical"), dict) else {}
        interactions = obj.get("interactions") if isinstance(obj.get("interactions"), dict) else {}

        # Only patch if empty
        if is_empty_blocks(sec.get("use_cases")):
            sec["use_cases"] = build_use_cases_blocks(schema, practical)
            changed += 1

        if is_empty_blocks(sec.get("interaction_summary")):
            sec["interaction_summary"] = build_interaction_summary_blocks(schema, interactions)
            changed += 1

        save_json(fp, obj)

    print(f"Patched sections.use_cases and/or sections.interaction_summary across batch. Writes applied: {changed}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
