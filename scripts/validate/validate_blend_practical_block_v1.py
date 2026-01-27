#!/usr/bin/env python3
import json
import sys
from pathlib import Path
from typing import NoReturn, Any

BANNED_PHRASES = [
  "ask your doctor",
  "consult your physician",
  "not intended to diagnose",
  "not medical advice",
  "for informational purposes only",
  "protocol",
  "dosing",
  "inject",
  "injection",
]

WEASEL_WORDS = [
  "may ", "might ", "could ", "possibly", "potentially", "suggests", "appears to",
]

MAX_BULLETS = 8
MAX_BULLET_CHARS = 160
MAX_BOTTOM_LINE_CHARS = 320

def fail(msg: str) -> NoReturn:
  print(f"VALIDATION FAILED: {msg}", file=sys.stderr)
  sys.exit(1)

def is_pending_text(s: str) -> bool:
  return "pep-talk curation pending" in (s or "").strip().lower()

def assert_clean_text(ctx: str, s: Any):
  if not isinstance(s, str):
    fail(f"{ctx} must be a string")
  t = s.strip()
  if not t:
    fail(f"{ctx} cannot be empty")
  low = t.lower()
  for p in BANNED_PHRASES:
    if p in low:
      fail(f"{ctx} contains banned phrase: '{p}'")
  for w in WEASEL_WORDS:
    if w in low:
      fail(f"{ctx} contains weasel wording: '{w.strip()}'")

def assert_bullets(ctx: str, arr: Any):
  if arr is None:
    return
  if not isinstance(arr, list):
    fail(f"{ctx} must be a list")
  if len(arr) > MAX_BULLETS:
    fail(f"{ctx} has too many bullets (max {MAX_BULLETS})")
  for i, b in enumerate(arr):
    bctx = f"{ctx}[{i}]"
    assert_clean_text(bctx, b)
    if len(b.strip()) > MAX_BULLET_CHARS:
      fail(f"{bctx} too long (max {MAX_BULLET_CHARS} chars)")

def validate_practical(blend_slug: str, pr: Any):
  if not isinstance(pr, dict):
    fail(f"{blend_slug}: blend.practical must be an object")

  if pr.get("schema_version") != "blend_practical_block_v1":
    fail(f"{blend_slug}: blend.practical.schema_version must be 'blend_practical_block_v1'")

  bottom = pr.get("bottom_line")
  if not isinstance(bottom, str) or not bottom.strip():
    fail(f"{blend_slug}: blend.practical.bottom_line must be non-empty string")
  if len(bottom.strip()) > MAX_BOTTOM_LINE_CHARS:
    fail(f"{blend_slug}: bottom_line too long (max {MAX_BOTTOM_LINE_CHARS} chars)")

  # Allow "pending" as the only allowed placeholder state.
  if is_pending_text(bottom):
    return

  assert_clean_text(f"{blend_slug}: bottom_line", bottom)

  assert_bullets(f"{blend_slug}: benefits", pr.get("benefits"))
  assert_bullets(f"{blend_slug}: common_downsides", pr.get("common_downsides"))
  assert_bullets(f"{blend_slug}: serious_red_flags", pr.get("serious_red_flags"))
  assert_bullets(f"{blend_slug}: who_should_be_cautious", pr.get("who_should_be_cautious"))

def main():
  root = Path("content/blends")
  if not root.exists():
    fail("Expected content/blends to exist (run from repo root)")

  files = sorted([p for p in root.glob("*.json") if not p.name.startswith("_")])
  scanned = 0
  checked = 0

  for fp in files:
    scanned += 1
    data = json.loads(fp.read_text(encoding="utf-8"))
    blend = data.get("blend", {})
    if not isinstance(blend, dict):
      continue
    slug = blend.get("slug", fp.stem)
    pr = blend.get("practical")
    if pr is None:
      continue
    checked += 1
    validate_practical(slug, pr)

  print("BLEND PRACTICAL BLOCK VALIDATION PASSED")
  print(f"Blends scanned: {scanned}  Blends with practical: {checked}")

if __name__ == "__main__":
  main()
