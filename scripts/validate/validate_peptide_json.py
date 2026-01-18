#!/usr/bin/env python3
import json
import sys
from pathlib import Path

from typing import NoReturn, Any, Dict
ALLOWED_STATUS = {"approved_human", "investigational_human", "preclinical", "theoretical_unmanufactured"}
ALLOWED_CONFIDENCE = {"high", "moderate", "low", "hypothesis", "unknown"}
ALLOWED_EVIDENCE_GRADE = {
    "rct_meta", "rct", "human_interventional", "human_observational",
    "animal", "in_vitro", "mechanistic_only", "regulatory_label"
}
ALLOWED_POP = {
    "general", "adolescent", "young_adult", "pregnancy", "lactation", "female", "male",
    "renal_impairment", "hepatic_impairment", "cardiovascular_disease", "psychiatric_vulnerability",
    "autoimmune_disease", "cancer_history", "athlete_high_training_load"
}
ALLOWED_SEVERITY = {"minimal", "mild", "moderate", "high", "critical"}
ALLOWED_LIKELIHOOD = {"unlikely", "possible", "likely", "very_likely"}

REQUIRED_TOP = ["schema_version", "peptide"]
REQUIRED_PEPTIDE = ["canonical_name", "status", "risk", "sections", "evidence"]
REQUIRED_STATUS_FIELDS = ["category", "human_use_note"]
REQUIRED_RISK_FIELDS = ["current_score", "severity", "likelihood", "evidence_grade", "rationale", "unknowns_penalty", "developmental_risk"]

def fail(msg: str) -> NoReturn:
    print(f"VALIDATION FAILED: {msg}", file=sys.stderr)
    sys.exit(1)

def warn(msg: str) -> None:
    print(f"WARNING: {msg}", file=sys.stderr)

def load_json(path: Path) -> dict:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as e:
        fail(f"Could not read/parse JSON: {e}")
    if not isinstance(data, dict):
        fail("Root JSON must be an object/dict")
    return data

def require_keys(obj, keys, context):
    for k in keys:
        if k not in obj:
            fail(f"Missing required key '{k}' in {context}")

def validate_claim(claim, ctx):
    for k in ["claim_type", "text", "population_group", "confidence", "evidence_grade", "evidence_refs"]:
        if k not in claim:
            fail(f"Missing '{k}' in claim: {ctx}")
    if claim["population_group"] not in ALLOWED_POP:
        fail(f"Invalid population_group '{claim['population_group']}' in {ctx}")
    if claim["confidence"] not in ALLOWED_CONFIDENCE:
        fail(f"Invalid confidence '{claim['confidence']}' in {ctx}")
    if claim["evidence_grade"] not in ALLOWED_EVIDENCE_GRADE:
        fail(f"Invalid evidence_grade '{claim['evidence_grade']}' in {ctx}")
    if not isinstance(claim["evidence_refs"], list):
        fail(f"evidence_refs must be a list in {ctx}")

def main():
    if len(sys.argv) != 2:
        print("Usage: python3 scripts/validate/validate_peptide_json.py <path-to-peptide.json>")
        sys.exit(2)

    path = Path(sys.argv[1]).expanduser().resolve()
    if not path.exists():
        fail(f"File not found: {path}")

    data = load_json(path)

    require_keys(data, REQUIRED_TOP, "root")
    if data["schema_version"] != "pdp_json_v1":
        fail(f"schema_version must be 'pdp_json_v1' (found '{data['schema_version']}')")

    peptide = data["peptide"]
    require_keys(peptide, REQUIRED_PEPTIDE, "peptide")

    if not peptide["canonical_name"].strip():
        fail("peptide.canonical_name cannot be empty")

    status = peptide["status"]
    require_keys(status, REQUIRED_STATUS_FIELDS, "peptide.status")
    if status["category"] not in ALLOWED_STATUS:
        fail(f"Invalid status.category '{status['category']}'")

    if not status["human_use_note"].strip():
        fail("peptide.status.human_use_note cannot be empty (must describe human-use reality and labeling)")

    risk = peptide["risk"]
    require_keys(risk, REQUIRED_RISK_FIELDS, "peptide.risk")

    score = risk["current_score"]
    if not isinstance(score, int) or not (1 <= score <= 10):
        fail("peptide.risk.current_score must be an integer 1–10")

    if risk["severity"] not in ALLOWED_SEVERITY:
        fail(f"Invalid risk.severity '{risk['severity']}'")

    if risk["likelihood"] not in ALLOWED_LIKELIHOOD:
        fail(f"Invalid risk.likelihood '{risk['likelihood']}'")

    if risk["evidence_grade"] not in ALLOWED_EVIDENCE_GRADE:
        fail(f"Invalid risk.evidence_grade '{risk['evidence_grade']}'")

    if not isinstance(risk["unknowns_penalty"], bool):
        fail("peptide.risk.unknowns_penalty must be boolean")

    if not isinstance(risk["developmental_risk"], bool):
        fail("peptide.risk.developmental_risk must be boolean")

    if not str(risk["rationale"]).strip():
        fail("peptide.risk.rationale cannot be empty")

    sections = peptide["sections"]
    if "overview" not in sections or not isinstance(sections["overview"], list) or len(sections["overview"]) == 0:
        fail("peptide.sections.overview must be a non-empty list with at least one overview claim")

    # validate all claims in all sections that are lists of claims
    for section_key, value in sections.items():
        if isinstance(value, list) and section_key != "observed_exposure_ranges":
            for i, claim in enumerate(value):
                if isinstance(claim, dict) and "claim_type" in claim:
                    validate_claim(claim, f"sections.{section_key}[{i}]")

    # observed exposure ranges must be descriptive-only
    oer = sections.get("observed_exposure_ranges", [])
    if not isinstance(oer, list) or len(oer) == 0:
        warn("sections.observed_exposure_ranges is empty; ok for early drafts but required for dosing discussions.")
    else:
        for i, r in enumerate(oer):
            for k in ["route", "unit", "min", "max", "frequency", "duration", "population_group", "notes", "evidence_refs"]:
                if k not in r:
                    fail(f"Missing '{k}' in observed_exposure_ranges[{i}]")
            if r["population_group"] not in ALLOWED_POP:
                fail(f"Invalid population_group in observed_exposure_ranges[{i}]")
            if not isinstance(r["evidence_refs"], list):
                fail(f"evidence_refs must be list in observed_exposure_ranges[{i}]")
            note = str(r.get("notes",""))
            if "not instructions" not in note.lower():
                warn(f"observed_exposure_ranges[{i}].notes should include 'not instructions' language.")

    evidence = peptide["evidence"]
    if not isinstance(evidence, list) or len(evidence) == 0:
        warn("peptide.evidence is empty; strong claims should include evidence items.")
    else:
        ids = set()
        for e in evidence:
            for k in ["id", "title", "source_type", "source_id", "evidence_grade"]:
                if k not in e:
                    fail(f"Missing '{k}' in evidence item")
            if e["evidence_grade"] not in ALLOWED_EVIDENCE_GRADE:
                fail(f"Invalid evidence_grade in evidence item '{e.get('id','?')}'")
            if e["id"] in ids:
                fail(f"Duplicate evidence id '{e['id']}'")
            ids.add(e["id"])

    print("VALIDATION PASSED")

if __name__ == "__main__":
    main()
