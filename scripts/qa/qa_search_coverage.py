#!/usr/bin/env python3
import csv
import json
import subprocess
import sys
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).resolve().parents[2]
ENTITIES = ROOT / "content/_index/entities_v1.json"
QUEUE = ROOT / "content/peptides/_queue.csv"
RESOLVER = ROOT / "scripts/search/resolve_query.py"

def die(msg: str, code: int = 1):
    print(f"ERROR: {msg}", file=sys.stderr)
    sys.exit(code)

def load_entities() -> dict:
    if not ENTITIES.exists():
        die(f"Missing {ENTITIES}")
    return json.loads(ENTITIES.read_text(encoding="utf-8"))

def load_queue() -> tuple[list[dict], list[str]]:
    if not QUEUE.exists():
        die(f"Missing {QUEUE}")
    with QUEUE.open("r", encoding="utf-8", newline="") as f:
        r = csv.DictReader(f)
        rows = list(r)
        fields = r.fieldnames or []
    if not fields:
        die("Queue CSV missing header/fieldnames.")
    return rows, fields

def norm(s: str) -> str:
    return (s or "").strip().lower()

def run_resolver(query: str) -> dict:
    # Use python3 to run the resolver script
    p = subprocess.run(
        ["python3", str(RESOLVER), query],
        cwd=str(ROOT),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )
    if p.returncode != 0:
        return {"_error": True, "_stderr": p.stderr.strip(), "query": query}
    try:
        return json.loads(p.stdout)
    except Exception:
        return {"_error": True, "_stderr": "Non-JSON output", "_raw": p.stdout[-4000:], "query": query}

def extract_entity_map(idx: dict) -> dict[str, dict]:
    # entities_v1.json shape in your project: {"peptides":[...], "blends":[...]}
    out = {}
    for kind in ("peptides", "blends"):
        for e in idx.get(kind, []):
            slug = e.get("slug")
            if slug:
                out[f"{kind[:-1]}:{slug}"] = e
    return out

def main() -> int:
    idx = load_entities()
    entities_map = extract_entity_map(idx)

    queue_rows, fields = load_queue()
    queue_by_slug = { (r.get("slug") or "").strip(): r for r in queue_rows if (r.get("slug") or "").strip() }

    # Build query set from queue (canonical + slug + aliases)
    queries = set()
    expected_route_by_query = {}  # query -> expected route (best guess)

    def add_query(q: str, expected_route: str):
        q = (q or "").strip()
        if not q:
            return
        queries.add(q)
        # If multiple expected routes appear for same query, keep first but mark ambiguity later
        expected_route_by_query.setdefault(q, expected_route)

    # Build expected routes for peptides from queue slugs (queue only covers peptides)
    for slug, row in queue_by_slug.items():
        if not slug:
            continue
        expected_route = f"peptide:{slug}"
        add_query(slug, expected_route)

        cn = (row.get("canonical_name") or "").strip()
        if cn:
            add_query(cn, expected_route)

        aliases = (row.get("aliases") or "").strip()
        if aliases:
            for a in aliases.split("|"):
                add_query(a, expected_route)

    # Also include canonical + aliases from entities index (extra safety)
    for route, ent in entities_map.items():
        slug = ent.get("slug") or ""
        name = ent.get("canonical_name") or ent.get("name") or ""
        if slug:
            add_query(slug, route)
        if name:
            add_query(name, route)
        for a in ent.get("aliases", []) or []:
            add_query(a, route)

    queries = sorted(queries, key=lambda s: (s.lower(), s))

    # Reports
    not_direct = []
    mismatch = []
    resolver_errors = []
    did_you_mean_only = []
    ok = 0

    for q in queries:
        res = run_resolver(q)
        if res.get("_error"):
            resolver_errors.append(res)
            continue

        intent = res.get("intent")
        route = res.get("route")
        dym = res.get("did_you_mean") or []

        expected = expected_route_by_query.get(q)
        if intent != "direct_entity" or not route:
            not_direct.append((q, intent, route, dym[:5]))
            if dym and not route:
                did_you_mean_only.append((q, dym[:5]))
            continue

        if expected and route != expected:
            mismatch.append((q, expected, route))
        else:
            ok += 1

    # Queue governance gaps
    missing_topics = []
    not_a_peptide_flags = []
    for slug, row in queue_by_slug.items():
        topics = (row.get("primary_topics") or "").strip()
        if not topics:
            missing_topics.append(slug)

        notes = (row.get("notes") or "").lower()
        status = (row.get("status_category") or "").lower()
        # Heuristic: queue notes explicitly says not a peptide OR status indicates small molecule/supplement
        if "not a peptide" in notes or status in {"otc_supplement"}:
            not_a_peptide_flags.append((slug, row.get("canonical_name",""), status))

    # Print summary
    print("=== QA SEARCH COVERAGE REPORT ===")
    print(f"Total queries tested: {len(queries)}")
    print(f"Direct entity OK:     {ok}")
    print(f"Not direct:           {len(not_direct)}")
    print(f"Route mismatch:       {len(mismatch)}")
    print(f"Resolver errors:      {len(resolver_errors)}")
    print()

    if mismatch:
        print("=== ROUTE MISMATCHES (query expected -> got) ===")
        for q, exp, got in mismatch[:80]:
            print(f"- {q!r}: {exp} -> {got}")
        if len(mismatch) > 80:
            print(f"... ({len(mismatch)-80} more)")
        print()

    if not_direct:
        print("=== NOT DIRECT ENTITY (intent/route/did_you_mean) ===")
        for q, intent, route, dym in not_direct[:120]:
            print(f"- {q!r}: intent={intent} route={route} dym={dym}")
        if len(not_direct) > 120:
            print(f"... ({len(not_direct)-120} more)")
        print()

    if resolver_errors:
        print("=== RESOLVER ERRORS ===")
        for e in resolver_errors[:40]:
            print(f"- {e.get('query')!r}: {e.get('_stderr')}")
        if len(resolver_errors) > 40:
            print(f"... ({len(resolver_errors)-40} more)")
        print()

    print("=== QUEUE GOVERNANCE GAPS ===")
    print(f"Peptides missing primary_topics: {len(missing_topics)}")
    if missing_topics:
        for s in missing_topics[:120]:
            print(f"- {s}")
        if len(missing_topics) > 120:
            print(f"... ({len(missing_topics)-120} more)")
    print()

    print("=== 'NOT A PEPTIDE' / SUPPLEMENT FLAGS (needs UI labeling) ===")
    print(f"Flagged: {len(not_a_peptide_flags)}")
    for slug, name, status in not_a_peptide_flags:
        print(f"- {slug} :: {name} (status={status})")
    print()

    # Exit code: fail if any resolver errors or route mismatches
    if resolver_errors or mismatch:
        return 2
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
