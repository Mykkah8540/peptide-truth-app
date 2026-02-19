#!/usr/bin/env python3
"""
Validate Pep-Talk PDP Content Contract (V1).

This validator enforces repo-level, non-negotiable guardrails so V1 cannot drift:

Hard fails on:
- Any "PLACEHOLDER" text inside peptide/blend content JSON (any nested string)
- Any leaked internal code markers (PEP_TALK__ / NO_RETURN_EMPTY_OBJECT / CAST_RELATED_INTERACTIONS) in app/web
- Banned jargon phrases that violate the "talk like a friend" rule

Notes:
- This is intentionally conservative and only checks what we can deterministically validate from repo artifacts.
- NO dosing / protocols logic is handled elsewhere (constitution + practical validator).
"""

from __future__ import annotations

import sys
from pathlib import Path
from typing import Any, Iterable

import re

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"
BLENDS_DIR = ROOT / "content" / "blends"
WEB_DIR = ROOT / "app" / "web"

IGNORE_DIRS = {".next", "node_modules"}

FAIL = False

# Contract: placeholders are never allowed in shipping content
PLACEHOLDER_TOKENS = [
    "PLACEHOLDER",
    "pLACEHOLDER",
    "placeholder:",
    "PLACEHOLDER:",
]

# Contract: internal markers must never render (or even exist in UI source)
LEAK_MARKERS = [
    "PEP_TALK__",
    "NO_RETURN_EMPTY_OBJECT",
    "CAST_RELATED_INTERACTIONS",
]

# Contract: banned jargon that normal people don't say out loud
BANNED_PHRASES = [
    "multi-pathway metabolic effects",
    "multipathway metabolic effects",
    "mechanistic signaling",
    "pathway modulation",
    "mechanistic_only",  # evidence-grade leakage into user-facing copy is not allowed
]

# Allowed internal enum string when used ONLY as a structured JSON value for evidence_grade.
ALLOW_MECHANISTIC_ONLY_EVIDENCE_GRADE_RE = re.compile(r'\"evidence_grade\"\s*:\s*\"mechanistic_only\"')

def die(msg: str) -> None:
    global FAIL
    FAIL = True
    print(f"FAIL: {msg}")

def iter_json_strings(x: Any, path: str = "$") -> Iterable[tuple[str, str]]:
    """Yield (json_path, string_value) for any string in nested JSON structures."""
    if isinstance(x, str):
        yield (path, x)
        return
    if isinstance(x, dict):
        for k, v in x.items():
            kp = f"{path}.{k}"
            yield from iter_json_strings(v, kp)
        return
    if isinstance(x, list):
        for i, v in enumerate(x):
            kp = f"{path}[{i}]"
            yield from iter_json_strings(v, kp)
        return

def load_json(p: Path) -> Any:
    import json
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        die(f"Could not parse JSON: {p} ({e})")
        return None

def scan_content_json_files(files: list[Path], label: str) -> None:
    for p in files:
        if p.name.startswith("_"):
            continue
        data = load_json(p)
        if data is None:
            continue
        for jp, s in iter_json_strings(data):
            s_l = s.lower()

            for tok in PLACEHOLDER_TOKENS:
                if tok.lower() in s_l:
                    die(f"{label} placeholder token '{tok}' found in {p} at {jp}")

            for phrase in BANNED_PHRASES:
                if phrase.lower() in s_l:
                    # Allow internal enum in structured data; UI must map this to friendly labels.
                    if phrase == "mechanistic_only":
                        if jp.endswith(".evidence_grade") and ALLOW_MECHANISTIC_ONLY_EVIDENCE_GRADE_RE.search(p.read_text(encoding="utf-8", errors="replace")):
                            continue
                    die(f"{label} banned phrase '{phrase}' found in {p} at {jp}")

def scan_web_for_leaks() -> None:
    if not WEB_DIR.exists():
        return
    for p in WEB_DIR.rglob("*"):
        if any(part in IGNORE_DIRS for part in p.parts):
            continue
        if not p.is_file():
            continue
        # Only scan typical source + templates
        if p.suffix.lower() not in {".ts", ".tsx", ".js", ".jsx", ".md", ".mdx"}:
            continue
        try:
            txt = p.read_text(encoding="utf-8", errors="replace")
        except Exception:
            continue
        t_l = txt.lower()
        for m in LEAK_MARKERS:
            if m.lower() in t_l:
                die(f"UI leak marker '{m}' found in {p}")

def main() -> int:
    pep_files = sorted([
        p for p in PEPTIDES_DIR.glob("*.json")
        if p.is_file() and not p.name.startswith("_")
    ])
    blend_files = sorted([
        p for p in BLENDS_DIR.glob("*.json")
        if p.is_file() and not p.name.startswith("_")
    ])

    if not pep_files:
        die("No peptide JSON files found under content/peptides")
    if not blend_files:
        # blends may be empty in early phases; don't hard fail
        print("WARN: No blend JSON files found under content/blends")

    scan_content_json_files(pep_files, "peptide")
    if blend_files:
        scan_content_json_files(blend_files, "blend")

    scan_web_for_leaks()

    if FAIL:
        return 1

    print("PDP CONTRACT VALIDATION PASSED")
    print(f"Peptides scanned: {len(pep_files)}")
    print(f"Blends scanned: {len(blend_files)}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
