#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

REPO_ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = REPO_ROOT / "content" / "peptides"
REPORTS_DIR = REPO_ROOT / "scripts" / "audit" / "_reports"
REPORTS_DIR.mkdir(parents=True, exist_ok=True)

# Evidence grades (must match your enums; used only for relative strictness)
EVIDENCE_RANK = {
    "mechanistic_only": 10,
    "in_vitro": 20,
    "animal": 30,
    "human_observational": 40,
    "human_interventional": 50,
    "approved_medical": 60,
    "unknown": 0,
}

LOW_EVIDENCE_MAX = EVIDENCE_RANK.get("animal", 30)  # mechanistic/in_vitro/animal

# Words that tend to imply established efficacy or medical treatment
ASSERTIVE_VERBS = [
    "treats", "cures", "heals", "prevents", "reverses", "eliminates",
    "reduces", "improves", "increases", "decreases", "restores",
    "fixes", "stops", "boosts", "accelerates", "repairs", "regenerates",
    "protects", "enhances",
]

# Medicalized claims (extra sensitive regardless of evidence level)
MEDICALIZED_PHRASES = [
    "clinically proven",
    "proven to",
    "shown to cure",
    "guaranteed",
    "best treatment",
    "first-line",
    "prescribe",
]

# Hedging / uncertainty language that is expected at low evidence
HEDGING_CUES = [
    "may", "might", "could", "is hypothesized", "is believed", "preclinical", "animal", "in vitro",
    "limited", "uncertain", "not established", "not confirmed", "unknown", "mixed evidence",
]

# If these appear near assertive verbs, it's less likely to be overclaiming
ALLOWLIST_NEAR_ASSERTIVE = [
    "in animals", "in mice", "in rats", "in vitro", "preclinical", "hypothesized", "may", "might", "could"
]

WINDOW_CHARS = 80  # context window around match for reporting

@dataclass
class Finding:
    peptide_slug: str
    canonical_name: str
    section: str
    claim_title: str
    evidence_grade: str
    rule_id: str
    severity: str
    message: str
    snippet: str

def load_json(path: Path) -> Dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))

def iter_peptide_files() -> List[Path]:
    return sorted([p for p in PEPTIDES_DIR.glob("*.json") if p.name not in ("_index.json", "_search_index.json")])

def normalize_text(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "")).strip()

def evidence_rank(grade: str) -> int:
    return EVIDENCE_RANK.get((grade or "unknown").strip(), 0)

def contains_any(text: str, needles: List[str]) -> Optional[str]:
    t = text.lower()
    for n in needles:
        if n in t:
            return n
    return None

def find_assertive_hits(text: str) -> List[Tuple[str, int]]:
    hits = []
    t = text.lower()
    for v in ASSERTIVE_VERBS:
        for m in re.finditer(r"\b" + re.escape(v) + r"\b", t):
            hits.append((v, m.start()))
    return hits

def has_hedge_near(text: str, pos: int) -> bool:
    t = text.lower()
    lo = max(0, pos - WINDOW_CHARS)
    hi = min(len(t), pos + WINDOW_CHARS)
    win = t[lo:hi]
    return any(h in win for h in HEDGING_CUES)

def allowlisted_context(text: str, pos: int) -> bool:
    t = text.lower()
    lo = max(0, pos - WINDOW_CHARS)
    hi = min(len(t), pos + WINDOW_CHARS)
    win = t[lo:hi]
    return any(a in win for a in ALLOWLIST_NEAR_ASSERTIVE)

def snippet_around(text: str, pos: int) -> str:
    t = normalize_text(text)
    lo = max(0, pos - WINDOW_CHARS)
    hi = min(len(t), pos + WINDOW_CHARS)
    return t[lo:hi]

def extract_claims(doc: Dict[str, Any]) -> List[Tuple[str, Dict[str, Any]]]:
    """
    Returns list of (section_name, claim_obj) for each claim in peptide.sections.* arrays.
    """
    pep = doc.get("peptide", {})
    sections = pep.get("sections", {}) or {}
    out: List[Tuple[str, Dict[str, Any]]] = []
    for section_name, arr in sections.items():
        if isinstance(arr, list):
            for c in arr:
                if isinstance(c, dict):
                    out.append((section_name, c))
    return out

def audit_peptide(path: Path) -> List[Finding]:
    doc = load_json(path)
    pep = doc.get("peptide", {}) or {}
    slug = path.stem
    cname = pep.get("canonical_name", slug)

    findings: List[Finding] = []
    claims = extract_claims(doc)

    for section_name, claim in claims:
        text = normalize_text(claim.get("text", ""))
        title = normalize_text(claim.get("title", "")) or normalize_text(claim.get("claim_type", "")) or section_name
        eg = (claim.get("evidence_grade") or pep.get("risk", {}).get("evidence_grade") or "unknown").strip()

        # Rule C1: Low evidence claims should not read as established efficacy
        if evidence_rank(eg) <= LOW_EVIDENCE_MAX and text:
            for verb, pos in find_assertive_hits(text):
                # If there is explicit contextual framing near the verb, downgrade/ignore
                if allowlisted_context(text, pos) or has_hedge_near(text, pos):
                    continue
                findings.append(Finding(
                    peptide_slug=slug,
                    canonical_name=cname,
                    section=section_name,
                    claim_title=title,
                    evidence_grade=eg,
                    rule_id="7C.C1_OVERCLAIM_LOW_EVIDENCE",
                    severity="warning",
                    message=f"Low-evidence claim uses assertive verb '{verb}' without nearby hedging/context.",
                    snippet=snippet_around(text, pos),
                ))

        # Rule C2: Medicalized phrases are always flagged unless clearly negated
        if text:
            mp = contains_any(text, MEDICALIZED_PHRASES)
            if mp:
                findings.append(Finding(
                    peptide_slug=slug,
                    canonical_name=cname,
                    section=section_name,
                    claim_title=title,
                    evidence_grade=eg,
                    rule_id="7C.C2_MEDICALIZED_LANGUAGE",
                    severity="warning",
                    message=f"Medicalized phrase '{mp}' found. Ensure language is descriptive and evidence-bounded.",
                    snippet=snippet_around(text, text.lower().find(mp)),
                ))

        # Rule C3: Observed exposure must stay non-instructional (extra guard)
        if section_name == "observed_exposure_ranges" and text:
            # If text contains imperative phrasing, flag
            if re.search(r"\b(should|must|take|inject|use|start)\b", text.lower()):
                findings.append(Finding(
                    peptide_slug=slug,
                    canonical_name=cname,
                    section=section_name,
                    claim_title=title,
                    evidence_grade=eg,
                    rule_id="7C.C3_EXPOSURE_IMPERATIVE_LANGUAGE",
                    severity="warning",
                    message="Observed exposure section appears to include imperative/instructional language. Must remain descriptive only.",
                    snippet=text[:200],
                ))

    return findings

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--write", action="store_true", help="Write timestamped report JSON to scripts/audit/_reports/")
    ap.add_argument("--strict", action="store_true", help="Exit non-zero if any warnings found (CI-ready)")
    args = ap.parse_args()

    peptide_files = iter_peptide_files()
    all_findings: List[Finding] = []
    for p in peptide_files:
        all_findings.extend(audit_peptide(p))

    report = {
        "schema_version": "evidence_language_audit_v1",
        "timestamp": datetime.now().strftime("%Y-%m-%d_%H%M%S"),
        "peptide_count": len(peptide_files),
        "finding_count": len(all_findings),
        "findings": [
            {
                "peptide_slug": f.peptide_slug,
                "canonical_name": f.canonical_name,
                "section": f.section,
                "claim_title": f.claim_title,
                "evidence_grade": f.evidence_grade,
                "rule_id": f.rule_id,
                "severity": f.severity,
                "message": f.message,
                "snippet": f.snippet,
            }
            for f in all_findings
        ],
    }

    # Print summary
    print(f"Evidence-language audit: peptides={len(peptide_files)} findings={len(all_findings)}")
    if all_findings:
        by_rule: Dict[str, int] = {}
        for f in all_findings:
            by_rule[f.rule_id] = by_rule.get(f.rule_id, 0) + 1
        print("Findings by rule:")
        for k in sorted(by_rule.keys()):
            print(f" - {k}: {by_rule[k]}")

    if args.write:
        outp = REPORTS_DIR / f"{report['timestamp']}.json"
        outp.write_text(json.dumps(report, indent=2), encoding="utf-8")
        print(f"Wrote report: {outp}")

    if args.strict and all_findings:
        return 2
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
