#!/usr/bin/env python3
import argparse
import json
from pathlib import Path
from typing import Any

ALLOWED_STATUS = {"approved_human", "investigational_human", "preclinical", "theoretical_unmanufactured"}
ALLOWED_EVIDENCE_GRADE = {
    "rct_meta", "rct", "human_interventional", "human_observational",
    "animal", "in_vitro", "mechanistic_only", "regulatory_label"
}

def infer_source_type(item: dict) -> str:
    st = item.get("source_type")
    if isinstance(st, str) and st.strip():
        return st.strip()
    t = item.get("type")
    if isinstance(t, str) and t.strip():
        t2 = t.strip().lower()
        if t2 in {"pubmed", "ncbi"}: return "pubmed"
        if t2 in {"regulatory", "fda", "label"}: return "regulatory"
        if t2 in {"journal", "paper", "doi"}: return "journal"
        if t2 in {"website", "web"}: return "website"
        return t2
    url = (item.get("url") or item.get("source_id") or "").lower()
    if "fda.gov" in url: return "regulatory"
    if "pubmed" in url or "ncbi" in url: return "pubmed"
    return "website"

def infer_source_id(item: dict) -> str:
    sid = item.get("source_id")
    if isinstance(sid, str) and sid.strip():
        return sid.strip()
    pmid = item.get("pmid")
    if pmid:
        return f"PMID:{pmid}"
    url = item.get("url")
    if isinstance(url, str) and url.strip():
        return url.strip()
    eid = item.get("id")
    if isinstance(eid, str) and eid.strip():
        return eid.strip()
    return "unknown"

def default_evidence_grade(item: dict) -> str:
    st = (item.get("source_type") or "").strip().lower()
    sid = (item.get("source_id") or item.get("url") or "").lower()
    eid = (item.get("id") or "").lower()
    if st == "regulatory" or "fda.gov" in sid or "label" in eid or "fda" in eid:
        return "regulatory_label"
    if st == "pubmed" or "pubmed" in sid or "ncbi" in sid:
        return "human_interventional"
    return "mechanistic_only"

def replace_placeholders(obj: Any, name: str) -> Any:
    if isinstance(obj, dict):
        return {k: replace_placeholders(v, name) for k, v in obj.items()}
    if isinstance(obj, list):
        return [replace_placeholders(v, name) for v in obj]
    if isinstance(obj, str):
        if "PLACEHOLDER:" in obj:
            if "What it is" in obj or "intended biological purpose" in obj:
                return f"{name} is a bioactive compound discussed in research and/or clinical contexts. This entry summarizes what it is, what it is studied for, and what evidence does and does not support, without providing protocols."
            if "Status" in obj:
                return f"Status reflects how {name} appears in clinical literature, regulatory contexts, and real-world use. This is descriptive only."
            if "Risk rationale" in obj:
                return "Risk reflects evidence quality, adverse-signal plausibility, and uncertainty. Limited data increases uncertainty."
            if "Classification notes" in obj:
                return f"Classification describes what {name} is and the general domain where it appears."
            return obj.replace("PLACEHOLDER:", "").strip()
        if obj.strip() in {"TBD", "TODO"}:
            return ""
    return obj

def clamp_risk_score(score: Any) -> int:
    try:
        s = int(score)
    except Exception:
        return 5
    if s < 1: return 1
    if s > 10: return 10
    return s

def patch_file(path: Path) -> tuple[bool, str]:
    d = json.loads(path.read_text(encoding="utf-8"))

    # schema_version
    if d.get("schema_version") != "pdp_json_v1":
        d["schema_version"] = "pdp_json_v1"

    pep = d.setdefault("peptide", {})
    name = pep.get("canonical_name") or path.stem.replace("-", " ").title()
    pep["canonical_name"] = name

    # status
    status = pep.setdefault("status", {})
    cat = status.get("category")
    if not (isinstance(cat, str) and cat.strip() in ALLOWED_STATUS):
        status["category"] = "investigational_human"
    status.setdefault("human_use_note", f"{name} appears in research and/or clinical contexts. Descriptive only; no prescriptive directives. Observational transparency allowed when lane-separated.")

    # risk
    risk = pep.setdefault("risk", {})
    risk["current_score"] = clamp_risk_score(risk.get("current_score", 5))
    risk.setdefault("severity", "moderate")
    risk.setdefault("likelihood", "possible")
    eg = risk.get("evidence_grade")
    if not (isinstance(eg, str) and eg in ALLOWED_EVIDENCE_GRADE):
        risk["evidence_grade"] = "mechanistic_only"
    risk.setdefault("rationale", "Risk is assessed from available evidence and uncertainty. Limited data increases uncertainty.")
    risk.setdefault("unknowns_penalty", True)
    risk.setdefault("developmental_risk", True)

    # sections/overview
    sections = pep.setdefault("sections", {})
    overview = sections.setdefault("overview", [])
    if not overview:
        overview.append({"text": "", "evidence_refs": []})
    if not isinstance(overview[0], dict):
        overview[0] = {"text": "", "evidence_refs": []}
    overview[0].setdefault("text", "")
    overview[0].setdefault("evidence_refs", [])

    # evidence
    ev = pep.setdefault("evidence", [])
    if not isinstance(ev, list):
        ev = []
        pep["evidence"] = ev
    if len(ev) == 0:
        ev.append({
            "id": "E1",
            "title": f"{name} — PubMed search (reference index)",
            "source_type": "website",
            "source_id": f"https://pubmed.ncbi.nlm.nih.gov/?term={name.replace(' ','+')}",
            "evidence_grade": "mechanistic_only",
        })

    for item in ev:
        if not isinstance(item, dict):
            continue
        item.setdefault("id", "E1")
        item.setdefault("title", f"{name} — reference")
        item["source_type"] = infer_source_type(item)
        item["source_id"] = infer_source_id(item)
        ieg = item.get("evidence_grade")
        if not (isinstance(ieg, str) and ieg in ALLOWED_EVIDENCE_GRADE):
            item["evidence_grade"] = default_evidence_grade(item)

    # wire overview evidence_refs
    refs = overview[0].get("evidence_refs")
    if not isinstance(refs, list) or len(refs) == 0:
        overview[0]["evidence_refs"] = [ev[0]["id"]]

    # replace placeholders
    d = replace_placeholders(d, name)

    new_txt = json.dumps(d, indent=2, ensure_ascii=False) + "\n"
    old_txt = path.read_text(encoding="utf-8")
    changed = (new_txt != old_txt)
    if changed:
        path.write_text(new_txt, encoding="utf-8")
    return changed, path.name

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--slugs", nargs="*", help="Optional list of peptide slugs to patch (filenames without .json). If omitted, patches all non-underscore peptides.")
    args = ap.parse_args()

    base = Path("content/peptides")
    if not base.exists():
        raise SystemExit("ERROR: content/peptides not found")

    files = []
    if args.slugs:
        for s in args.slugs:
            p = base / f"{s}.json"
            if not p.exists():
                raise SystemExit(f"ERROR: slug file not found: {p}")
            files.append(p)
    else:
        for p in sorted(base.glob("*.json")):
            if p.name.startswith("_"):
                continue
            files.append(p)

    total_changed = 0
    for p in files:
        changed, name = patch_file(p)
        if changed:
            total_changed += 1
            print(f"PATCHED: {p}")
    print(f"Done. Files changed: {total_changed} / {len(files)}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
