#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

REPO_ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = REPO_ROOT / "content" / "peptides"
REPORTS_DIR = REPO_ROOT / "scripts" / "audit" / "_reports"
REPORTS_DIR.mkdir(parents=True, exist_ok=True)

DISCLAIMER_REQUIRED_SUBSTRINGS = [
    "descriptive only",
    "not instructions",
]

IMPERATIVE_WORDS = [
    "should", "must", "take", "inject", "use", "start", "begin", "increase", "decrease",
    "titrate", "ramp", "cycle", "stack", "protocol", "dose", "dosing", "regimen",
]

PROTOCOLISH_PATTERNS = [
    r"\bweek\s*\d+\b",
    r"\bday\s*\d+\b",
    r"\bon\s*\d+\s*/\s*off\s*\d+\b",
    r"\b(\d+)\s*(weeks?|days?)\s*on\b",
    r"\b(\d+)\s*(weeks?|days?)\s*off\b",
]

@dataclass
class Finding:
    peptide_slug: str
    canonical_name: str
    rule_id: str
    severity: str
    message: str
    snippet: str

def load_json(path: Path) -> Dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))

def iter_peptide_files() -> List[Path]:
    return sorted([p for p in PEPTIDES_DIR.glob("*.json") if p.name not in ("_index.json", "_search_index.json")])

def norm(s: Any) -> str:
    return re.sub(r"\s+", " ", str(s or "")).strip()

def has_disclaimer(text: str) -> bool:
    t = text.lower()
    return all(x in t for x in DISCLAIMER_REQUIRED_SUBSTRINGS)

def contains_imperative(text: str) -> str | None:
    t = text.lower()
    for w in IMPERATIVE_WORDS:
        if re.search(r"\b" + re.escape(w) + r"\b", t):
            return w
    for pat in PROTOCOLISH_PATTERNS:
        if re.search(pat, t):
            return f"pattern:{pat}"
    return None

def audit_one(path: Path) -> List[Finding]:
    doc = load_json(path)
    pep = doc.get("peptide", {}) or {}
    slug = path.stem
    cname = pep.get("canonical_name", slug)

    sections = pep.get("sections", {}) or {}
    ranges = sections.get("observed_exposure_ranges", [])
    findings: List[Finding] = []

    if not isinstance(ranges, list):
        return findings

    for i, r in enumerate(ranges):
        if not isinstance(r, dict):
            continue

        unit = norm(r.get("unit"))
        minv = r.get("min", None)
        maxv = r.get("max", None)
        freq = norm(r.get("frequency"))
        dur = norm(r.get("duration"))
        notes = norm(r.get("notes"))
        route = norm(r.get("route"))
        pop = norm(r.get("population_group"))

        # D1: notes must include disclaimer language
        if notes:
            if not has_disclaimer(notes):
                findings.append(Finding(
                    peptide_slug=slug,
                    canonical_name=cname,
                    rule_id="7D.D1_MISSING_DISCLAIMER",
                    severity="warning",
                    message=f"observed_exposure_ranges[{i}] notes missing required disclaimer substrings.",
                    snippet=notes[:220],
                ))
        else:
            findings.append(Finding(
                peptide_slug=slug,
                canonical_name=cname,
                rule_id="7D.D1_MISSING_DISCLAIMER",
                severity="warning",
                message=f"observed_exposure_ranges[{i}] notes is empty; must include descriptive-only disclaimer.",
                snippet=f"route={route} unit={unit} min={minv} max={maxv} freq={freq} dur={dur} pop={pop}",
            ))

        # D2: notes/frequency/duration must not contain imperative/protocol language
        joined = " | ".join([notes, freq, dur])
        bad = contains_imperative(joined)
        if bad:
            findings.append(Finding(
                peptide_slug=slug,
                canonical_name=cname,
                rule_id="7D.D2_PROTOCOLISH_LANGUAGE",
                severity="warning",
                message=f"observed_exposure_ranges[{i}] contains imperative/protocol-ish language: {bad}",
                snippet=joined[:260],
            ))

        # D3: unit must exist if min or max exists
        if (minv is not None or maxv is not None) and not unit:
            findings.append(Finding(
                peptide_slug=slug,
                canonical_name=cname,
                rule_id="7D.D3_UNIT_REQUIRED",
                severity="warning",
                message=f"observed_exposure_ranges[{i}] has min/max but unit is empty.",
                snippet=f"min={minv} max={maxv} freq={freq} dur={dur}",
            ))

        # D4: min/max coherence
        if minv is not None and maxv is not None:
            try:
                if float(minv) > float(maxv):
                    findings.append(Finding(
                        peptide_slug=slug,
                        canonical_name=cname,
                        rule_id="7D.D4_MIN_GT_MAX",
                        severity="warning",
                        message=f"observed_exposure_ranges[{i}] min > max.",
                        snippet=f"min={minv} max={maxv} unit={unit}",
                    ))
            except Exception:
                findings.append(Finding(
                    peptide_slug=slug,
                    canonical_name=cname,
                    rule_id="7D.D4_MIN_MAX_NONNUMERIC",
                    severity="warning",
                    message=f"observed_exposure_ranges[{i}] min/max not numeric.",
                    snippet=f"min={minv} max={maxv} unit={unit}",
                ))

        # D5: frequency should not be empty if min/max present (still descriptive)
        if (minv is not None or maxv is not None) and not freq:
            findings.append(Finding(
                peptide_slug=slug,
                canonical_name=cname,
                rule_id="7D.D5_FREQUENCY_RECOMMENDED",
                severity="warning",
                message=f"observed_exposure_ranges[{i}] has min/max but frequency is empty (reduces usefulness).",
                snippet=f"min={minv} max={maxv} unit={unit} dur={dur}",
            ))

    return findings

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--write", action="store_true", help="Write timestamped report JSON to scripts/audit/_reports/")
    ap.add_argument("--strict", action="store_true", help="Exit non-zero if any warnings found")
    args = ap.parse_args()

    peptide_files = iter_peptide_files()
    findings: List[Finding] = []
    for p in peptide_files:
        findings.extend(audit_one(p))

    report = {
        "schema_version": "observed_exposure_audit_v1",
        "timestamp": datetime.now().strftime("%Y-%m-%d_%H%M%S"),
        "peptide_count": len(peptide_files),
        "finding_count": len(findings),
        "findings": [
            {
                "peptide_slug": f.peptide_slug,
                "canonical_name": f.canonical_name,
                "rule_id": f.rule_id,
                "severity": f.severity,
                "message": f.message,
                "snippet": f.snippet,
            }
            for f in findings
        ],
    }

    print(f"Observed-exposure audit: peptides={len(peptide_files)} findings={len(findings)}")

    if args.write:
        outp = REPORTS_DIR / f"{report['timestamp']}_observed_exposure.json"
        outp.write_text(json.dumps(report, indent=2), encoding="utf-8")
        print(f"Wrote report: {outp}")

    if args.strict and findings:
        return 2
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
