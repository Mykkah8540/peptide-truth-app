#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 2 ]]; then
  echo "Usage: scripts/ingest/new_peptide.sh \"Canonical Name\" slug"
  echo "Example: scripts/ingest/new_peptide.sh \"AOD-9604\" aod-9604"
  exit 2
fi

CANON="$1"
SLUG="$2"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
TEMPLATE="$ROOT_DIR/scripts/ingest/peptide_template.json"
DEST="$ROOT_DIR/content/peptides/${SLUG}.json"
QUEUE="$ROOT_DIR/content/peptides/_queue.csv"

if [[ ! -f "$TEMPLATE" ]]; then
  echo "Template not found: $TEMPLATE"
  exit 1
fi

if [[ -f "$DEST" ]]; then
  echo "Peptide file already exists: $DEST"
  exit 1
fi

cp "$TEMPLATE" "$DEST"

python3 - <<PY
import json
from pathlib import Path

p = Path("$DEST")
data = json.loads(p.read_text(encoding="utf-8"))

data["peptide"]["canonical_name"] = "$CANON"
data["peptide"]["short_name"] = "$CANON"

p.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print("Created:", p)
PY

echo "\"$CANON\",$SLUG,investigational_human,false,normal," >> "$QUEUE"

echo "Next: open $DEST and fill required fields (status.human_use_note, risk.rationale, overview[0].text)."
echo "Then validate:"
echo "  python3 scripts/validate/validate_peptide_json.py content/peptides/${SLUG}.json"
