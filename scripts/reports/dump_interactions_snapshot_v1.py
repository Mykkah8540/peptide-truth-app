#!/usr/bin/env python3
from __future__ import annotations

import json
import subprocess
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Tuple

REPO_ROOT = Path(__file__).resolve().parents[2]

TAXONOMY_PATH = REPO_ROOT / "content" / "_taxonomy" / "interaction_classes_v1.json"
INDEX_PATH = REPO_ROOT / "content" / "_index" / "interactions_to_peptides_v1.json"
COVERAGE_REPORT_PATH = REPO_ROOT / "data" / "reports" / "interactions_coverage_report_v1.json"
OUTPUT_MD_PATH = REPO_ROOT / "docs" / "_snapshots" / "interactions_v1_snapshot.md"


def _run(cmd: List[str]) -> str:
    try:
        return subprocess.check_output(cmd, cwd=str(REPO_ROOT), stderr=subprocess.STDOUT).decode("utf-8").strip()
    except subprocess.CalledProcessError as e:
        out = e.output.decode("utf-8", errors="replace")
        return f"(command failed) {' '.join(cmd)}\n{out}".strip()


def _load_json(path: Path) -> Dict[str, Any]:
    if not path.exists():
        return {"__missing__": True, "__path__": str(path)}
    return json.loads(path.read_text(encoding="utf-8"))


def _get_git_info() -> Dict[str, str]:
    return {
        "branch": _run(["git", "rev-parse", "--abbrev-ref", "HEAD"]),
        "commit": _run(["git", "rev-parse", "--short", "HEAD"]),
        "describe": _run(["git", "describe", "--tags", "--always", "--dirty"]),
    }


def _safe_len(x: Any) -> int:
    try:
        return len(x)  # type: ignore[arg-type]
    except Exception:
        return 0


def _sort_classes(classes: List[Dict[str, Any]], counts: Dict[str, int]) -> List[Tuple[Dict[str, Any], int]]:
    pairs = [(c, counts.get(str(c.get("slug", "")).strip(), 0)) for c in classes]
    pairs.sort(key=lambda t: (-t[1], str(t[0].get("title") or ""), str(t[0].get("slug") or "")))
    return pairs


def main() -> None:
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%SZ")

    git = _get_git_info()
    taxonomy = _load_json(TAXONOMY_PATH)
    index = _load_json(INDEX_PATH)
    coverage = _load_json(COVERAGE_REPORT_PATH)

    drug_classes: List[Dict[str, Any]] = []
    if isinstance(taxonomy, dict) and isinstance(taxonomy.get("drug_classes"), list):
        drug_classes = taxonomy["drug_classes"]

    index_map: Dict[str, Any] = {}
    # reverse index shape:
    # { "generated_at": "...", "schema_version": "...", "stats": {...}, "mapping": {...} }
    if isinstance(index, dict) and isinstance(index.get("mapping"), dict):
        index_map = index["mapping"]

    per_class_counts: Dict[str, int] = {}
    for slug, peptide_slugs in index_map.items():
        per_class_counts[str(slug)] = _safe_len(peptide_slugs)

    totals: Dict[str, Any] = {}
    if isinstance(coverage, dict):
        if isinstance(coverage.get("totals"), dict):
            totals = coverage["totals"]
        elif isinstance(coverage.get("Totals"), dict):
            totals = coverage["Totals"]

    missing = None
    if isinstance(coverage, dict):
        missing = coverage.get("missing_interactions")
        if missing is None:
            missing = coverage.get("Missing interactions")

    OUTPUT_MD_PATH.parent.mkdir(parents=True, exist_ok=True)

    lines: List[str] = []
    lines.append("# Interactions V1 Snapshot")
    lines.append("")
    lines.append(f"- Generated (UTC): **{now}**")
    lines.append("- Repo: `peptide-truth-app`")
    lines.append(f"- Branch: `{git['branch']}`")
    lines.append(f"- Commit: `{git['commit']}`")
    lines.append(f"- Describe: `{git['describe']}`")
    lines.append("")
    lines.append("## Source Artifacts")
    lines.append("")
    lines.append(f"- Taxonomy: `{TAXONOMY_PATH.relative_to(REPO_ROOT)}`")
    lines.append(f"- Reverse index: `{INDEX_PATH.relative_to(REPO_ROOT)}`")
    lines.append(f"- Coverage report: `{COVERAGE_REPORT_PATH.relative_to(REPO_ROOT)}`")
    lines.append("")
    lines.append("## Coverage Totals")
    lines.append("")
    keys_order = ["peptides_total", "peptides_with_any_interactions", "drug_items_total", "supp_items_total", "peptide_items_total"]
    for k in keys_order:
        if k in totals:
            lines.append(f"- **{k}**: {totals[k]}")

    # Deterministic missing count even if coverage JSON shape changes
    pt = totals.get("peptides_total")
    pwi = totals.get("peptides_with_any_interactions")
    if isinstance(pt, int) and isinstance(pwi, int):
        lines.append(f"- **missing_interactions**: {pt - pwi}")
    elif missing is not None:
        lines.append(f"- **missing_interactions**: {missing}")

    lines.append("")
    lines.append("## Interaction Classes (Drug Classes)")
    lines.append("")
    if not drug_classes:
        lines.append("_No `drug_classes` found in taxonomy (unexpected)._")
    else:
        lines.append("| Rank | Slug | Title | Aka count | Peptides tagged |")
        lines.append("|---:|---|---|---:|---:|")
        sorted_pairs = _sort_classes(drug_classes, per_class_counts)
        for i, (c, count) in enumerate(sorted_pairs, start=1):
            slug = str(c.get("slug", "")).strip()
            title = str(c.get("title", "")).strip()
            aka = c.get("aka", [])
            aka_count = _safe_len(aka) if isinstance(aka, list) else 0
            lines.append(f"| {i} | `{slug}` | {title} | {aka_count} | {count} |")
        lines.append("")
        lines.append("### Notes")
        lines.append("")
        lines.append("- `Peptides tagged` is derived from the reverse index.")
        lines.append("- A class existing in taxonomy but missing in the reverse index will show as 0.")
        lines.append("")

    OUTPUT_MD_PATH.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
    print(f"OK: wrote {OUTPUT_MD_PATH}")


if __name__ == "__main__":
    main()
