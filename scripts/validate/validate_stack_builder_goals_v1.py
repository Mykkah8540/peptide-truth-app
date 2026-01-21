#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
FP = ROOT / "content" / "stack_builder" / "goals_v1.json"
TOPICS_DIR = ROOT / "content" / "topics" / "pages"

def die(msg: str) -> None:
    raise SystemExit(f"VALIDATION FAILED: {msg}")

def main() -> None:
    if not FP.exists():
        die(f"Missing file: {FP}")

    doc = json.loads(FP.read_text(encoding="utf-8"))
    if doc.get("schema_version") != "stack_builder_goals_v1":
        die("schema_version must be 'stack_builder_goals_v1'")

    goals = doc.get("goals")
    if not isinstance(goals, list) or not goals:
        die("goals must be a non-empty list")

    seen_ids = set()
    for i, g in enumerate(goals):
        if not isinstance(g, dict):
            die(f"goals[{i}] must be an object")

        gid = g.get("goal_id")
        title = g.get("title")
        topic_ids = g.get("topic_ids")

        if not isinstance(gid, str) or not gid.strip():
            die(f"goals[{i}].goal_id must be a non-empty string")
        if gid in seen_ids:
            die(f"Duplicate goal_id: {gid}")
        seen_ids.add(gid)

        if not isinstance(title, str) or not title.strip():
            die(f"goals[{i}].title must be a non-empty string")

        if not isinstance(topic_ids, list) or not topic_ids:
            die(f"goals[{i}].topic_ids must be a non-empty list")

        for t in topic_ids:
            if not isinstance(t, str) or not t.strip():
                die(f"goals[{i}].topic_ids contains an invalid entry")
            # Allow missing topic pages (for now), but warn in output
            # We only validate format; content completeness can be enforced later.

    print("STACK BUILDER GOALS VALIDATION PASSED")
    print(f"Goals: {len(goals)}")
    # Optional: report missing topic pages (non-fatal)
    missing = []
    for g in goals:
        for t in g.get("topic_ids", []):
            if not (TOPICS_DIR / f"{t}.json").exists():
                missing.append(t)
    missing = sorted(set(missing))
    if missing:
        print(f"NOTE: {len(missing)} referenced topic_id(s) missing pages:")
        for t in missing[:60]:
            print(" -", t)

if __name__ == "__main__":
    main()
