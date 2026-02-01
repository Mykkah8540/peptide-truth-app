# See docs/_status/pdp_conformance_report.md for the output produced by this script.
# Run: python3 scripts/reports/report_pdp_conformance_v1.py
from pathlib import Path
import json
import re

ROOT = Path(".").resolve()

PEP_DIR = ROOT / "content" / "peptides"
BLEND_DIR = ROOT / "content" / "blends"
OUT = ROOT / "docs" / "_status" / "pdp_conformance_report.md"

PENDING_PATTERNS = [
  r"pep-talk curation pending",
  r"curation pending",
  r"we're reviewing the evidence",
  r"we\u2019re reviewing the evidence",
  r"will expand this section soon",
]
PENDING_RE = re.compile("|".join(PENDING_PATTERNS), re.I)

def load_json(p: Path):
  try:
    return json.loads(p.read_text(encoding="utf-8")), None
  except Exception as e:
    return None, str(e)

def is_entity_file(p: Path) -> bool:
  name = p.name.lower()
  if name in {"_index.json", "index.json"}:
    return False
  return p.suffix.lower() == ".json"

def find_pending_paths(obj, path="$"):
  hits = []
  if isinstance(obj, dict):
    for k, v in obj.items():
      hits += find_pending_paths(v, f"{path}.{k}")
  elif isinstance(obj, list):
    for i, v in enumerate(obj):
      hits += find_pending_paths(v, f"{path}[{i}]")
  else:
    if obj is None:
      return hits
    try:
      s = str(obj)
    except Exception:
      return hits
    if s and PENDING_RE.search(s):
      snippet = s.strip().replace("\n", " ")
      if len(snippet) > 120:
        snippet = snippet[:117] + "..."
      hits.append((path, snippet))
  return hits

def summarize_peptide(doc: dict):
  sections = (doc or {}).get("sections") or {}
  overview = sections.get("overview") or []
  use_cases = sections.get("use_cases") or []
  outlook = sections.get("current_outlook_bullets") or []
  practical = (doc or {}).get("practical")
  aa_seq = (doc or {}).get("amino_acid_sequence")
  return {
    "has_overview": bool(overview),
    "has_use_cases": bool(use_cases),
    "has_outlook": bool(outlook),
    "has_practical": practical is not None,
    "has_aa_seq": bool(str(aa_seq or "").strip()),
  }

def summarize_blend(doc: dict):
  sections = (doc or {}).get("sections") or {}
  overview = sections.get("overview") or []
  safety = sections.get("safety") or []
  claims = sections.get("claims") or []
  practical = (doc or {}).get("practical")
  return {
    "has_overview": bool(overview),
    "has_safety": bool(safety),
    "has_claims": bool(claims),
    "has_practical": practical is not None,
  }

def slug_from_path(p: Path) -> str:
  return p.stem

def count_true(items, key):
  return sum(1 for _,_,s,_ in items if s.get(key))

def has_pending(items):
  return sum(1 for _,_,_,hits in items if len(hits) > 0)

def list_missing(items, key):
  out = []
  for slug, path, s, _ in items:
    if not s.get(key):
      out.append((slug, path))
  return out

def list_pending(items, limit=None):
  out = []
  for slug, path, _, hits in items:
    if hits:
      out.append((slug, path, hits))
  out.sort(key=lambda x: len(x[2]), reverse=True)
  if limit:
    out = out[:limit]
  return out

def emit_list(lines, title, items):
  lines.append(title)
  for slug, path in items:
    lines.append(f"- {slug}  ({path})")
  lines.append("")

def main():
  peptide_files = sorted([p for p in PEP_DIR.glob("*.json") if is_entity_file(p)])
  blend_files = sorted([p for p in BLEND_DIR.glob("*.json") if is_entity_file(p)])

  pep = []
  blend = []
  pep_errors = []
  blend_errors = []

  for p in peptide_files:
    doc, err = load_json(p)
    if err:
      pep_errors.append((slug_from_path(p), str(p), err))
      continue
    pep.append((slug_from_path(p), str(p), summarize_peptide(doc), find_pending_paths(doc)))

  for p in blend_files:
    doc, err = load_json(p)
    if err:
      blend_errors.append((slug_from_path(p), str(p), err))
      continue
    blend.append((slug_from_path(p), str(p), summarize_blend(doc), find_pending_paths(doc)))

  lines = []
  lines.append("# PDP conformance report")
  lines.append("")
  lines.append(f"Peptides found (excluding _index): {len(peptide_files)}")
  lines.append(f"Blends found (excluding _index): {len(blend_files)}")
  lines.append("")

  lines.append("## Peptides summary")
  lines.append(f"- Overview present: {count_true(pep,'has_overview')}/{len(pep)}")
  lines.append(f"- Use cases present: {count_true(pep,'has_use_cases')}/{len(pep)}")
  lines.append(f"- Outlook bullets present: {count_true(pep,'has_outlook')}/{len(pep)}")
  lines.append(f"- Practical present: {count_true(pep,'has_practical')}/{len(pep)}")
  lines.append(f"- AA sequence present: {count_true(pep,'has_aa_seq')}/{len(pep)}")
  lines.append(f"- Contains pending placeholder text: {has_pending(pep)}/{len(pep)}")
  lines.append("")

  emit_list(lines, "### Peptides missing AA sequence", list_missing(pep, "has_aa_seq"))
  emit_list(lines, "### Peptides missing overview", list_missing(pep, "has_overview"))
  emit_list(lines, "### Peptides missing use cases", list_missing(pep, "has_use_cases"))
  emit_list(lines, "### Peptides missing outlook bullets", list_missing(pep, "has_outlook"))
  emit_list(lines, "### Peptides missing practical", list_missing(pep, "has_practical"))

  lines.append("### Peptides with pending placeholder text (top 25 by hit count)")
  for slug, path, hits in list_pending(pep, limit=25):
    lines.append(f"- {slug}  ({path})")
    for jp, snip in hits[:6]:
      lines.append(f"  - {jp}: {snip}")
  lines.append("")

  lines.append("## Blends summary")
  lines.append(f"- Overview present: {count_true(blend,'has_overview')}/{len(blend)}")
  lines.append(f"- Safety present: {count_true(blend,'has_safety')}/{len(blend)}")
  lines.append(f"- Claims present: {count_true(blend,'has_claims')}/{len(blend)}")
  lines.append(f"- Practical present: {count_true(blend,'has_practical')}/{len(blend)}")
  lines.append(f"- Contains pending placeholder text: {has_pending(blend)}/{len(blend)}")
  lines.append("")

  emit_list(lines, "### Blends missing overview", list_missing(blend, "has_overview"))
  emit_list(lines, "### Blends missing safety", list_missing(blend, "has_safety"))
  emit_list(lines, "### Blends missing claims", list_missing(blend, "has_claims"))
  emit_list(lines, "### Blends missing practical", list_missing(blend, "has_practical"))

  lines.append("### Blends with pending placeholder text")
  for slug, path, hits in list_pending(blend, limit=50):
    lines.append(f"- {slug}  ({path})")
    for jp, snip in hits[:6]:
      lines.append(f"  - {jp}: {snip}")
  lines.append("")

  if pep_errors or blend_errors:
    lines.append("## JSON parse errors")
    for slug, path, err in pep_errors:
      lines.append(f"- peptide {slug} ({path}): {err}")
    for slug, path, err in blend_errors:
      lines.append(f"- blend {slug} ({path}): {err}")
    lines.append("")

  OUT.parent.mkdir(parents=True, exist_ok=True)
  OUT.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")

if __name__ == "__main__":
  main()
