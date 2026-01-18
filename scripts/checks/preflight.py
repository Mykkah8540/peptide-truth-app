#!/usr/bin/env python3
from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]

def run(cmd: list[str], *, title: str) -> int:
    print(f"\n== {title} ==")
    print("+", " ".join(cmd))
    r = subprocess.run(cmd, cwd=str(REPO_ROOT))
    if r.returncode != 0:
        print(f"FAIL: {title} (exit {r.returncode})")
    else:
        print(f"OK: {title}")
    return r.returncode

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--strict", action="store_true", help="Fail fast on warnings in audits")
    args = ap.parse_args()

    steps: list[tuple[str, list[str]]] = [
        ("Python compile: ingestion", [sys.executable, "-m", "py_compile", "scripts/ingest/generate_from_queue.py"]),
        ("Python compile: search index builder", [sys.executable, "-m", "py_compile", "scripts/index/build_search_index.py"]),
        ("Python compile: audits", [sys.executable, "-m", "py_compile", "scripts/audit/evidence_language_audit.py", "scripts/audit/observed_exposure_audit.py"]),
        ("Ingestion dry-run (must not write)", [sys.executable, "scripts/ingest/generate_from_queue.py", "--dry-run", "--validate"]),
        ("Ingestion apply (deterministic rebuilds; safe latch already enforced)", [sys.executable, "scripts/ingest/generate_from_queue.py", "--apply", "--validate", "--rebuild-search-index"]),
        ("Search index rebuild standalone", [sys.executable, "scripts/index/build_search_index.py", "--write"]),
    ]

    # Audits (write reports so you have a paper trail)
    # evidence language
    steps.append(("Audit: evidence language", [sys.executable, "scripts/audit/evidence_language_audit.py"] + (["--strict"] if args.strict else [])))
    # observed exposure
    steps.append(("Audit: observed exposure", [sys.executable, "scripts/audit/observed_exposure_audit.py"] + (["--strict"] if args.strict else [])))

    # Git status must be clean (optional gate for CI; default ON)
    steps.append(("Git working tree clean", ["git", "status", "--porcelain"]))

    overall = 0
    for title, cmd in steps:
        rc = run(cmd, title=title)

        # Special handling: git status should have NO output
        if title == "Git working tree clean":
            if rc != 0:
                overall = rc if overall == 0 else overall
                break
            # capture output by re-running with capture
            out = subprocess.run(cmd, cwd=str(REPO_ROOT), capture_output=True, text=True)
            if out.stdout.strip():
                print("FAIL: Git working tree not clean. Output:")
                print(out.stdout.rstrip())
                overall = 3 if overall == 0 else overall
                break
            print("OK: Git working tree clean")
            continue

        if rc != 0:
            overall = rc if overall == 0 else overall
            break

    print("\n== PRE-FLIGHT RESULT ==")
    if overall == 0:
        print("PASS: repo is build-healthy and policy-clean.")
    else:
        print(f"FAIL: preflight blocked (exit {overall}). Fix failures and re-run.")
    return overall

if __name__ == "__main__":
    raise SystemExit(main())
