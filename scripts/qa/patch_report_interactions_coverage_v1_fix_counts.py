#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import re

repo = Path(__file__).resolve().parents[2]
target = repo / "scripts" / "reports" / "report_interactions_coverage_v1.py"
if not target.exists():
    raise SystemExit(f"ERROR: missing {target}")

s = target.read_text(encoding="utf-8")

# We patch by injecting a helper that computes peptides_with_any_interactions
# by scanning content/peptides/*.json and checking interactions lists, excluding slugs that start with "_".
marker = "PEP_TALK__FIX_COUNTS_V1"
if marker in s:
    print("OK: patch already applied")
    raise SystemExit(0)

inject = f'''
# {marker}
def _peptide_has_any_interactions(doc: dict) -> bool:
    it = doc.get("interactions")
    if not isinstance(it, dict):
        return False
    for k in ("drug_classes", "supplement_classes", "peptides"):
        v = it.get(k)
        if isinstance(v, list) and len(v) > 0:
            return True
    return False

def _compute_peptides_with_any_interactions(repo_root: Path) -> int:
    import json
    peptides_dir = repo_root / "content" / "peptides"
    n = 0
    for fp in sorted(peptides_dir.glob("*.json")):
        slug = fp.stem
        if slug.startswith("_"):
            continue
        try:
            doc = json.loads(fp.read_text(encoding="utf-8"))
        except Exception:
            continue
        if isinstance(doc, dict) and _peptide_has_any_interactions(doc):
            n += 1
    return n
'''

# Insert inject near imports (after first blank line following imports block)
lines = s.splitlines()
insert_at = None
for i, line in enumerate(lines):
    if line.strip() == "" and i > 5:
        insert_at = i + 1
        break
if insert_at is None:
    insert_at = 0
lines = lines[:insert_at] + inject.splitlines() + lines[insert_at:]
s2 = "\n".join(lines) + "\n"

# Now replace wherever peptides_with_any_interactions is set in totals.
# We will set it AFTER peptides_total is known by calling _compute_peptides_with_any_interactions(repo_root)
# This is intentionally conservative: replace assignment of totals dict field if present, otherwise append override.
pattern = re.compile(r'("peptides_with_any_interactions"\s*:\s*)(\d+|[A-Za-z0-9_]+\b)', re.M)
if pattern.search(s2):
    s2 = pattern.sub(r'\1_compute_peptides_with_any_interactions(repo_root)', s2, count=1)

# Also fix "Missing interactions" printing if present: use peptides_total - peptides_with_any_interactions
s2 = re.sub(
    r"(Missing interactions:\s*)\{[^}]+\}",
    r"\1{totals.get('peptides_total',0) - totals.get('peptides_with_any_interactions',0)}",
    s2
)

target.write_text(s2, encoding="utf-8")
print("OK: patched", target)
