#!/usr/bin/env python3
import json
import os
import re
from pathlib import Path
from typing import Dict, List, Any, Tuple

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"
TAXON_FILE = ROOT / "content" / "_taxonomy" / "interaction_classes_v1.json"
OUT_FILE = ROOT / "content" / "_index" / "interactions_to_peptides_v1.json"

def load_json(path: Path) -> Any:
  return json.loads(path.read_text(encoding="utf-8"))

def norm(s: str) -> str:
  s = (s or "").strip().lower()
  s = re.sub(r"\s+", " ", s)
  return s

def build_term_to_slug(tax: Any) -> Dict[str, str]:
  """
  Build a lookup from many possible terms -> interaction slug/id.
  Supports flexible taxonomy shapes.
  """
  lookup: Dict[str, str] = {}
  doc = tax or {}

  # Taxonomy shape (governed):
  # {
  #   "drug_classes": [ { "slug", "title", "aka": [...] }, ... ],
  #   "supplement_classes": [ ... ]
  # }
  classes = []
  for k in ("drug_classes", "supplement_classes"):
    v = doc.get(k)
    if isinstance(v, list):
      classes.extend(v)

  for c in classes:
    if not isinstance(c, dict):
      continue
    slug = (c.get("id") or c.get("slug") or c.get("category_id") or "").strip()
    if not slug:
      continue

    terms: List[str] = []
    for k in ["title", "name", "id", "slug"]:
      v = c.get(k)
      if isinstance(v, str) and v.strip():
        terms.append(v)

    # Synonyms / terms fields (try many names)
    for k in ["synonyms", "aliases", "terms", "candidate_terms", "search_terms"]:
      v = c.get(k)
      if isinstance(v, list):
        terms.extend([x for x in v if isinstance(x, str)])

    for t in terms:
      nt = norm(t)
      if nt and nt not in lookup:
        lookup[nt] = slug

  return lookup

def extract_interaction_names(peptide_doc: Any) -> List[str]:
  """
  Pull interaction class names from peptide doc in a schema-flexible way.
  We scan common locations and list fields.
  """
  out: List[str] = []
  if not isinstance(peptide_doc, dict):
    return out

  interactions = peptide_doc.get("interactions")
  if not isinstance(interactions, dict):
    return out

  # Common structured lists
  for list_key in ["drug_classes", "supplement_classes", "peptides", "other_peptides", "classes", "items"]:
    lst = interactions.get(list_key)
    if not isinstance(lst, list):
      continue
    for it in lst:
      if isinstance(it, str):
        out.append(it)
      elif isinstance(it, dict):
        nm = it.get("name") or it.get("title") or it.get("id") or it.get("slug")
        if isinstance(nm, str) and nm.strip():
          out.append(nm)

  # Sometimes there’s a single list of ids/slugs
  for list_key in ["interaction_ids", "interaction_slugs", "interaction_classes"]:
    lst = interactions.get(list_key)
    if isinstance(lst, list):
      for x in lst:
        if isinstance(x, str) and x.strip():
          out.append(x)

  return [x for x in out if isinstance(x, str) and x.strip()]

def main() -> None:
  if not TAXON_FILE.exists():
    raise SystemExit(f"Missing taxonomy file: {TAXON_FILE}")

  tax = load_json(TAXON_FILE)
  term_to_slug = build_term_to_slug(tax)

  # reverse index: interaction_slug -> peptides[]
  rev: Dict[str, List[Dict[str, str]]] = {}

  peptide_files = sorted(PEPTIDES_DIR.glob("*.json"))
  for fp in peptide_files:
    try:
      doc = load_json(fp)
    except Exception:
      continue

    peptide_slug = fp.stem
    peptide_node = doc.get("peptide") if isinstance(doc.get("peptide"), dict) else doc

    peptide_name = (
      peptide_node.get("canonical_name")
      or peptide_node.get("short_name")
      or peptide_node.get("title")
      or peptide_slug
    )

    names = extract_interaction_names(peptide_node)

    # Resolve names -> interaction slug
    slugs = set()
    for nm in names:
      key = norm(nm)
      if key in term_to_slug:
        slugs.add(term_to_slug[key])
      else:
        # fallback: if nm itself looks like an id/slug, accept it
        if re.fullmatch(r"[a-z0-9][a-z0-9\-]{1,80}", key):
          slugs.add(key)

    for interaction_slug in sorted(slugs):
      rev.setdefault(interaction_slug, []).append({
        "peptide_slug": peptide_slug,
        "peptide_name": str(peptide_name),
      })

  # Sort each list by peptide_name
  for k in list(rev.keys()):
    rev[k] = sorted(rev[k], key=lambda x: (x.get("peptide_name","").lower(), x.get("peptide_slug","")))

  out = {
    "schema_version": "interactions_to_peptides_v1",
    "generated_at": __import__("datetime").datetime.utcnow().replace(microsecond=0).isoformat() + "Z",
    "mapping": rev,
  }

  OUT_FILE.write_text(json.dumps(out, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
  print(f"OK: wrote {OUT_FILE} ({len(rev)} interaction key(s))")

if __name__ == "__main__":
  main()
