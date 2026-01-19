#!/usr/bin/env python3
import json
import sys
from pathlib import Path
from typing import NoReturn

ALLOWED_EVIDENCE_GRADE = {
  "rct_meta", "rct", "human_interventional", "human_observational",
  "animal", "in_vitro", "mechanistic_only", "regulatory_label"
}

def fail(msg: str) -> NoReturn:
  print(f"VALIDATION FAILED: {msg}", file=sys.stderr)
  sys.exit(1)

def main():
  if len(sys.argv) != 2:
    print("Usage: python3 scripts/validate/validate_blend_json.py <path-to-blend.json>")
    sys.exit(2)

  path = Path(sys.argv[1]).expanduser().resolve()
  if not path.exists():
    fail(f"File not found: {path}")

  data = json.loads(path.read_text(encoding="utf-8"))
  if not isinstance(data, dict):
    fail("Root JSON must be an object/dict")

  if data.get("schema_version") != "blend_json_v1":
    fail("schema_version must be 'blend_json_v1'")

  blend = data.get("blend")
  if not isinstance(blend, dict):
    fail("Missing 'blend' object")

  required = [
    "slug", "display_name", "status", "taxonomy_keys",
    "components", "components_unresolved", "sections", "evidence"
  ]
  for k in required:
    if k not in blend:
      fail(f"Missing blend.{k}")

  if not isinstance(blend["taxonomy_keys"], list):
    fail("blend.taxonomy_keys must be a list")
  if not isinstance(blend["components"], list):
    fail("blend.components must be a list")
  if not isinstance(blend["components_unresolved"], list):
    fail("blend.components_unresolved must be a list")

  sections = blend["sections"]
  if not isinstance(sections, dict):
    fail("blend.sections must be an object")

  overview = sections.get("overview")
  if not isinstance(overview, list) or len(overview) == 0 or not isinstance(overview[0], dict):
    fail("blend.sections.overview must be a non-empty list of objects")

  if "evidence_refs" not in overview[0] or not isinstance(overview[0]["evidence_refs"], list):
    fail("blend.sections.overview[0].evidence_refs must exist and be a list")

  ev = blend["evidence"]
  if not isinstance(ev, list) or len(ev) == 0:
    fail("blend.evidence must be a non-empty list")

  for i, e in enumerate(ev):
    ctx = f"blend.evidence[{i}]"
    if not isinstance(e, dict):
      fail(f"{ctx} must be an object")
    for k in ["id", "title", "source_type", "source_id", "evidence_grade"]:
      if k not in e:
        fail(f"Missing '{k}' in {ctx}")
    if not isinstance(e["id"], str) or not e["id"].strip():
      fail(f"{ctx}.id must be non-empty string")
    if e["evidence_grade"] not in ALLOWED_EVIDENCE_GRADE:
      fail(f"Invalid evidence_grade in {ctx}: {e['evidence_grade']}")

  # For stubs, still require at least one ref wired (E1)
  if len(overview[0]["evidence_refs"]) == 0:
    fail("blend.sections.overview[0].evidence_refs cannot be empty")

  print("BLEND JSON VALIDATION PASSED")

if __name__ == "__main__":
  main()
