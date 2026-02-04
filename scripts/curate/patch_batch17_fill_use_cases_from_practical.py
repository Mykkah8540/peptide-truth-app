#!/usr/bin/env python3
import json
from pathlib import Path
from typing import Any, Dict, List

BATCH = [
  "sermorelin","bradykinin","dsip","ara-290","mots-c","oxytocin","aod-9604","shlp-2",
  "cjc-1295","humanin","retatrutide","semaglutide","tirzepatide","atrial-natriuretic-peptide",
  "ghk-cu","substance-p",
]

REPO = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = REPO / "content" / "peptides"

def load(fp: Path) -> Dict[str, Any]:
    return json.loads(fp.read_text())

def save(fp: Path, obj: Dict[str, Any]) -> None:
    fp.write_text(json.dumps(obj, ensure_ascii=False, indent=2) + "\n")

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
    return (v is None) or (isinstance(v, list) and len(v) == 0)

def listify(x: Any) -> List[str]:
    if isinstance(x, list):
        return [str(i).strip() for i in x if str(i).strip()]
    return []

def block(text: str, title: str | None = None) -> Dict[str, Any]:
    b: Dict[str, Any] = {"text": text}
    if title:
        b["title"] = title
    return b

def build_use_cases(practical: Dict[str, Any]) -> List[Dict[str, Any]]:
    benefits = listify(practical.get("benefits"))

    out: List[Dict[str, Any]] = []
    out.append(block(
        "This section is a real-world orientation: what people typically hope to get out of it, and what context tends to matter most (expectations, quality/testing, and safety).",
        title="Use cases (real-world)"
    ))

    if benefits:
        # Convert benefits into compact blocks. Keep it calm and non-promissory.
        out.append(block("Common reasons people consider it:"))
        for b in benefits[:8]:
            out.append(block(f"• {b}"))
    else:
        out.append(block("Use-case notes are pending for this peptide. We’ll fill this after evidence + safety context are reviewed."))

    out.append(block(
        "Important: “use case” ≠ “safe for you.” If you’re on prescription meds or have significant medical history, treat uncertainty as a reason to slow down and verify with a clinician."
    ))
    return out

def main() -> int:
    changed = 0
    for slug in BATCH:
        fp = PEPTIDES_DIR / f"{slug}.json"
        if not fp.exists():
            continue
        obj = load(fp)
        sec = ensure_sections(obj)

        if not is_empty_blocks(sec.get("use_cases")):
            continue  # already has content

        practical = obj.get("practical") if isinstance(obj.get("practical"), dict) else {}
        sec["use_cases"] = build_use_cases(practical)
        save(fp, obj)
        changed += 1

    print(f"Batch17 use_cases fill complete. Files changed: {changed}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
