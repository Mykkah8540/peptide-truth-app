#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[2]

PEPTIDE_PAGE = ROOT / "app" / "web" / "app" / "peptide" / "[slug]" / "page.tsx"
SECTION_COMP = ROOT / "app" / "web" / "components" / "InteractionsSection.tsx"

START_BLOCK_1 = "/* PEP-TALK: related interaction class pages */"
START_BLOCK_2 = "/* Interaction class links (navigation aid) */"

def die(msg: str) -> None:
    print(f"ERROR: {msg}")
    raise SystemExit(1)

def patch_interactions_section() -> None:
    if not SECTION_COMP.exists():
        die(f"Missing file: {SECTION_COMP}")

    s = SECTION_COMP.read_text(encoding="utf-8")

    # Ensure we can safely patch (guardrails)
    if "function resolveInteractionHref" not in s:
        die("InteractionsSection.tsx: missing resolveInteractionHref()")

    # 1) Add listInteractions import if missing
    if 'from "@/lib/content"' not in s:
        # Insert import after existing imports
        lines = s.splitlines()
        insert_at = 0
        for i, line in enumerate(lines):
            if line.startswith("import "):
                insert_at = i + 1
        lines.insert(insert_at, 'import { listInteractions } from "@/lib/content";')
        s = "\n".join(lines)
    else:
        # If it already imports from lib/content, ensure listInteractions is included
        lines = s.splitlines()
        updated = False
        for i, line in enumerate(lines):
            if 'from "@/lib/content"' in line and "import" in line and "{" in line and "}" in line:
                before, rest = line.split("{", 1)
                inside, after = rest.split("}", 1)
                names = [x.strip() for x in inside.split(",") if x.strip()]
                if "listInteractions" not in names:
                    names.append("listInteractions")
                    lines[i] = f'{before}{{ {", ".join(names)} }}{after}'
                    updated = True
                break
        if updated:
            s = "\n".join(lines)

    # 2) Create a stable name->slug map once per render (cheap; index is small)
    # Insert right before resolveInteractionHref definition (first occurrence).
    if "__interactionTitleToSlug" not in s:
        s = s.replace(
            "function resolveInteractionHref(it: any): string | null {",
            """const __interactionTitleToSlug = (() => {
  try {
    const list = listInteractions();
    const m = new Map<string, string>();
    for (const it of list) {
      const slug = String((it as any)?.slug ?? "").trim();
      const title = String((it as any)?.title ?? "").trim();
      if (slug && title) m.set(title.toLowerCase(), slug);
      // Also index common variants if present
      const name = String((it as any)?.name ?? "").trim();
      if (slug && name) m.set(name.toLowerCase(), slug);
    }
    return m;
  } catch {
    return new Map<string, string>();
  }
})();

function resolveInteractionHref(it: any): string | null {""",
            1,
        )

    # 3) Modify resolveInteractionHref: use the map before slugify fallback
    # Replace the block where it uses `name` and slugify directly.
    # We keep your existing slugify helper.
    s2 = re.sub(
        r"""  const name = \(it\?\.\s*name \|\| ""\)\.toString\(\)\.trim\(\);\n  if \(!name\) return null;\n\n  // Best-effort slugify fallback \(works if interaction slugs follow slugified names\)\n  return `/interaction/\$\{slugify\(name\)\}`;""",
        """  const name = (it?.name || "").toString().trim();
  if (!name) return null;

  // Prefer governed slugs from interactions index (title/name -> slug)
  const hit = __interactionTitleToSlug.get(name.toLowerCase());
  if (hit) return `/interaction/${hit}`;

  // Last-resort fallback: slugify (may not match governed slugs)
  return `/interaction/${slugify(name)}`;""",
        s,
        flags=re.M,
    )

    if s2 == s:
        die("InteractionsSection.tsx: expected resolveInteractionHref name block not found (refusing to patch).")

    SECTION_COMP.write_text(s2, encoding="utf-8")
    print(f"OK: patched {SECTION_COMP.relative_to(ROOT)}")

def remove_nav_blocks() -> None:
    if not PEPTIDE_PAGE.exists():
        die(f"Missing file: {PEPTIDE_PAGE}")

    s = PEPTIDE_PAGE.read_text(encoding="utf-8")

    if START_BLOCK_1 not in s:
        die(f"peptide page: missing start marker 1: {START_BLOCK_1}")
    if START_BLOCK_2 not in s:
        die(f"peptide page: missing start marker 2: {START_BLOCK_2}")

    # Remove block 1: from marker to the end of its IIFE call `})()}`
    i1 = s.find(START_BLOCK_1)
    end1 = s.find("})()}", i1)
    if end1 == -1:
        die("peptide page: could not find end of block 1 `})()}`")
    end1 = end1 + len("})()}")

    # Remove block 2: from marker to the end of its IIFE call `})()}`
    i2 = s.find(START_BLOCK_2, end1)
    end2 = s.find("})()}", i2)
    if end2 == -1:
        die("peptide page: could not find end of block 2 `})()}`")
    end2 = end2 + len("})()}")

    # Preserve spacing: replace removed blocks with a single blank line
    s_new = s[:i1].rstrip() + "\n\n" + s[end2:].lstrip()

    PEPTIDE_PAGE.write_text(s_new, encoding="utf-8")
    print(f"OK: removed nav aid blocks in {PEPTIDE_PAGE.relative_to(ROOT)}")

def main() -> None:
    patch_interactions_section()
    remove_nav_blocks()

if __name__ == "__main__":
    main()
