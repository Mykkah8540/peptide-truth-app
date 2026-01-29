#!/usr/bin/env python3
import json
from pathlib import Path
from typing import Any, Dict, List

REPO = Path(__file__).resolve().parents[2]
BLENDS_DIR = REPO / "content" / "blends"
PEPTIDES_DIR = REPO / "content" / "peptides"

def load(fp: Path) -> Dict[str, Any]:
    return json.loads(fp.read_text())

def save(fp: Path, obj: Dict[str, Any]) -> None:
    fp.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n")

def ensure_sections(obj: Dict[str, Any]) -> Dict[str, Any]:
    b = obj.get("blend")
    if not isinstance(b, dict):
        b = {}
        obj["blend"] = b
    sec = b.get("sections")
    if not isinstance(sec, dict):
        sec = {}
        b["sections"] = sec
    return sec

def is_empty_blocks(v: Any) -> bool:
    return v is None or (isinstance(v, list) and len(v) == 0)

def detect_block_schema() -> Dict[str, Any]:
    tmpl = load(PEPTIDES_DIR / "bpc-157.json")
    sec = ((tmpl.get("peptide") or {}).get("sections") or {})
    # canonical block example: list of dicts with keys like title/text
    for k in ["overview","use_cases","interaction_summary"]:
        v = sec.get(k)
        if isinstance(v, list) and v and isinstance(v[0], dict):
            keys = list(v[0].keys())
            text_key = "text" if "text" in keys else keys[0]
            title_key = "title" if "title" in keys else None
            return {"text_key": text_key, "title_key": title_key, "keys": keys}
    return {"text_key": "text", "title_key": "title", "keys": ["title","text"]}

def mk_block(schema: Dict[str, Any], text: str, title: str = "") -> Dict[str, Any]:
    out: Dict[str, Any] = {}
    tk = schema.get("title_key")
    if tk and title:
        out[tk] = title
    out[schema["text_key"]] = text
    return out

def get_components(obj: Dict[str, Any]) -> List[str]:
    comps = obj.get("components")
    if isinstance(comps, list):
        return [str(x).strip() for x in comps if str(x).strip()]
    # sometimes blends may store under blend.components
    b = obj.get("blend") or {}
    comps = b.get("components") if isinstance(b, dict) else None
    if isinstance(comps, list):
        return [str(x).strip() for x in comps if str(x).strip()]
    return []

def fill_overview(schema: Dict[str, Any], slug: str, comps: List[str]) -> List[Dict[str, Any]]:
    title = "What this blend is"
    if comps:
        txt = (
            "This is a combined blend built around these components: "
            + ", ".join(comps)
            + ". The goal of this page is to explain why people pair them, what overlap exists, what tradeoffs show up in the real world, and where uncertainty is highest."
        )
    else:
        txt = (
            "This blend page explains why people pair components, what overlap exists, what tradeoffs show up in the real world, and where uncertainty is highest."
        )
    return [mk_block(schema, txt, title=title)]

def fill_use_cases(schema: Dict[str, Any]) -> List[Dict[str, Any]]:
    return [
        mk_block(schema, "Use cases are framed as intent + context, not as a recommendation.", title="Use cases (real-world)"),
        mk_block(schema, "People usually consider blends when they’re trying to simplify decision-making, stack fewer vials, or chase a combined effect profile. The downside is more moving parts and more uncertainty."),
        mk_block(schema, "If one component would be a bad fit for you (meds, history, side effects), the blend is also a bad fit — even if the other component seems appealing."),
    ]

def fill_interaction_summary(schema: Dict[str, Any]) -> List[Dict[str, Any]]:
    return [
        mk_block(schema, "Interaction flags are category prompts — not dosing instructions.", title="Interaction summary"),
        mk_block(schema, "Blends inherit interaction risk from every component. If one component has a meaningful interaction class, treat the blend as having that interaction class."),
        mk_block(schema, "If you’re on prescription meds (especially cardio, anticoagulant/antiplatelet, serotonergic, immunomodulating), treat uncertainty as a reason to slow down and verify with a clinician."),
    ]

def ensure_first_title(schema: Dict[str, Any], blocks: Any, title: str) -> None:
    tk = schema.get("title_key")
    if not tk:
        return
    if isinstance(blocks, list) and blocks and isinstance(blocks[0], dict):
        if not blocks[0].get(tk):
            blocks[0][tk] = title

def main() -> int:
    schema = detect_block_schema()
    changed_files = 0

    for fp in sorted(BLENDS_DIR.glob("*.json")):
        obj = load(fp)
        sec = ensure_sections(obj)
        slug = fp.stem
        comps = get_components(obj)

        touched = False

        if is_empty_blocks(sec.get("overview")):
            sec["overview"] = fill_overview(schema, slug, comps)
            touched = True

        if is_empty_blocks(sec.get("use_cases")):
            sec["use_cases"] = fill_use_cases(schema)
            touched = True

        if is_empty_blocks(sec.get("interaction_summary")):
            sec["interaction_summary"] = fill_interaction_summary(schema)
            touched = True

        # enforce first-block titles if schema supports it
        ensure_first_title(schema, sec.get("use_cases"), "Use cases (real-world)")
        ensure_first_title(schema, sec.get("interaction_summary"), "Interaction summary")
        ensure_first_title(schema, sec.get("overview"), "What this blend is")

        if touched:
            save(fp, obj)
            changed_files += 1

    print(f"Blend sections fill complete. Files changed: {changed_files}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
