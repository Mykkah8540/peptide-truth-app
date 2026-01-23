#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path

PAGE = Path("app/web/app/interaction/[slug]/page.tsx")

MARKER = "Pep-Talk Interaction Detail (V1)"
ROOT_DIV = '<div className="space-y-8">'


def main() -> None:
    if not PAGE.exists():
        raise SystemExit(f"ERROR: missing {PAGE}")

    s = PAGE.read_text(encoding="utf-8")

    # Guard: don’t double-apply
    if MARKER in s or "Educational context tag" in s:
        raise SystemExit("ERROR: Patch already applied (marker/disclaimer found).")

    # Ensure the root wrapper exists (this is the stable anchor)
    idx = s.find(ROOT_DIV)
    if idx == -1:
        raise SystemExit(f"ERROR: Could not find root wrapper {ROOT_DIV}. Refusing to patch.")

    insert_at = idx + len(ROOT_DIV)

    disclaimer = f"""
      {{/* {MARKER} */}}
      <section className="rounded-xl bg-muted/40 p-3 space-y-2">
        <div className="text-xs font-extrabold tracking-wide uppercase">Educational context tag</div>
        <p className="text-sm text-muted-foreground">
          This page summarizes an <strong>interaction context</strong> used for browsing peptide content.
          It does <strong>not</strong> provide medical advice, dosing guidance, or prescribing recommendations.
        </p>
      </section>

      {{(interaction?.aka?.length ?? 0) > 0 ? (
        <section className="space-y-2">
          <div className="text-xs font-extrabold tracking-wide uppercase text-muted-foreground">Also called</div>
          <div className="flex flex-wrap gap-2">
            {{(interaction.aka || []).slice(0, 24).map((a: string) => (
              <span key={{a}} className="rounded-full bg-muted px-3 py-1 text-xs font-bold">
                {{a}}
              </span>
            ))}}
          </div>
        </section>
      ) : null}}

      {{interaction?.notes ? (
        <section className="space-y-2">
          <div className="text-xs font-extrabold tracking-wide uppercase text-muted-foreground">Notes</div>
          <p className="text-sm text-muted-foreground">{{interaction.notes}}</p>
        </section>
      ) : null}}
"""

    s = s[:insert_at] + disclaimer + s[insert_at:]
    PAGE.write_text(s, encoding="utf-8")
    print(f"OK: patched {PAGE}")


if __name__ == "__main__":
    main()
