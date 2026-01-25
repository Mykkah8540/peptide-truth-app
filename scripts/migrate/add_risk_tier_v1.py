#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

def die(msg: str) -> None:
    raise SystemExit(f"ERROR: {msg}")

def read(p: Path) -> str:
    return p.read_text(encoding="utf-8")

def write(p: Path, s: str) -> None:
    p.write_text(s, encoding="utf-8")

def ensure_compute_risk_tier(src: str) -> tuple[str, bool]:
    if "def compute_risk_tier(" in src:
        return src, False

    # Insert after clamp_score() definition block
    m = re.search(r"def clamp_score\(x: int\) -> int:\n(?:[^\n]*\n)+?\s*return[^\n]*\n", src)
    if not m:
        die("Could not locate clamp_score() block to insert compute_risk_tier()")

    insert = """
def compute_risk_tier(
    *,
    risk_score: int,
    severity: str | None,
    likelihood: str | None,
    developmental_risk: bool,
    unknowns_penalty: bool,
) -> str:
    \"""
    Tier rubric (v1):
    - Base bands: 1–3 low, 4–6 moderate, 7–10 high
    - Escalate: severity high/critical => high
    - Escalate: unknowns_penalty or developmental_risk + score>=6 => high
    - No automatic bump from flags when score<=3 (prevents inflation)
    \"""
    s = clamp_score(int(risk_score))

    # Base from score
    tier = "low" if s <= 3 else ("moderate" if s <= 6 else "high")

    sev = (severity or "").strip().lower() or None
    like = (likelihood or "").strip().lower() or None

    if sev in ("critical", "high"):
        return "high"

    if (unknowns_penalty or developmental_risk) and s >= 6:
        return "high"

    if sev == "moderate" and like in ("very_likely", "likely"):
        return "moderate" if tier == "low" else tier

    return tier

"""
    out = src[: m.end()] + insert + src[m.end():]
    return out, True

def patch_build_risk_index() -> bool:
    p = ROOT / "scripts" / "index" / "build_risk_index.py"
    src = read(p)
    changed_any = False

    src, changed = ensure_compute_risk_tier(src)
    changed_any = changed_any or changed

    # Peptide loop: insert tier compute after 'inter = ...' if not present
    if 'tier = compute_risk_tier(' not in src:
        # peptide block anchor
        pat = r'(inter\s*=\s*bool\(pep_has_interactions\.get\(slug,\s*False\)\)\s*\n)'
        repl = r"""\1        tier = compute_risk_tier(
            risk_score=int(r.get("risk_score")),
            severity=r.get("severity"),
            likelihood=r.get("likelihood"),
            developmental_risk=dev,
            unknowns_penalty=unk,
        )
"""
        src2, n = re.subn(pat, repl, src, count=1, flags=re.M)
        if n != 1:
            die("Could not insert peptide tier compute (anchor not found or not unique)")
        src = src2
        changed_any = True

    # Add risk_tier inside peptide risk dict
    if '"risk_tier": tier' not in src:
        pat = r'("risk"\s*:\s*\{\s*\n\s*"risk_score"\s*:\s*int\(r\.get\("risk_score"\)\),\s*\n)'
        repl = r'\1                "risk_tier": tier,\n'
        src2, n = re.subn(pat, repl, src, count=1)
        if n != 1:
            die("Could not insert peptide risk_tier into risk dict")
        src = src2
        changed_any = True

    # Blend: insert tier compute after blend inter line (inter = any(...))
    if src.count('tier = compute_risk_tier(') < 2:
        pat = r'(inter\s*=\s*any\(bool\(pep_has_interactions\.get\(c,\s*False\)\)\s*for\s*c\s*in\s*comps\)\s*\n)'
        repl = r"""\1        tier = compute_risk_tier(
            risk_score=int(br.get("risk_score")),
            severity=br.get("severity"),
            likelihood=br.get("likelihood"),
            developmental_risk=dev,
            unknowns_penalty=unk,
        )
"""
        src2, n = re.subn(pat, repl, src, count=1, flags=re.M)
        if n != 1:
            die("Could not insert blend tier compute")
        src = src2
        changed_any = True

    # Add risk_tier inside blend risk dict
    if src.count('"risk_tier": tier') < 2:
        pat = r'("risk"\s*:\s*\{\s*\n\s*"risk_score"\s*:\s*int\(br\.get\("risk_score"\)\),\s*\n)'
        repl = r'\1                "risk_tier": tier,\n'
        src2, n = re.subn(pat, repl, src, count=1)
        if n != 1:
            die("Could not insert blend risk_tier into risk dict")
        src = src2
        changed_any = True

    if changed_any:
        write(p, src)
    return changed_any

def patch_risk_index_ts() -> bool:
    p = ROOT / "app" / "web" / "lib" / "riskIndex.ts"
    src = read(p)
    if 'risk_tier?: "low" | "moderate" | "high";' in src:
        return False

    # Insert right after risk_score line inside risk object type
    pat = r'(risk_score:\s*number;\s*//\s*1\.\.10\s*\n)'
    repl = r'\1    risk_tier?: "low" | "moderate" | "high";\n'
    out, n = re.subn(pat, repl, src, count=1)
    if n != 1:
        die("Could not insert risk_tier into app/web/lib/riskIndex.ts")
    write(p, out)
    return True

def rewrite_risk_badge_tsx() -> bool:
    p = ROOT / "app" / "web" / "components" / "RiskBadge.tsx"
    desired = """type Props = {
  score: number; // 1..10
  tier?: "low" | "moderate" | "high" | null;
};

function label(score: number, tier?: Props["tier"]): string {
  if (tier === "low") return "Low";
  if (tier === "moderate") return "Moderate";
  if (tier === "high") return "High";

  // Fallback for older indexes
  if (score <= 3) return "Low";
  if (score <= 6) return "Moderate";
  return "High";
}

function gradeColor(score: number): string {
  // 1-3 green, 4-6 orange, 7-10 red
  if (score <= 3) return "#16a34a";
  if (score <= 6) return "#f97316";
  return "#dc2626";
}

export default function RiskBadge({ score, tier }: Props) {
  const s = Math.max(1, Math.min(10, Number(score) || 1));
  const color = gradeColor(s);

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid rgba(0,0,0,0.10)", borderRadius: 12, padding: "10px 12px" }}>
      <span style={{ width: 10, height: 10, borderRadius: 999, background: color, display: "inline-block" }} />
      <div style={{ fontSize: 12, opacity: 0.7 }}>Safety grade</div>
      <div style={{ fontSize: 18, fontWeight: 800 }}>{s}/10</div>
      <div style={{ fontSize: 12, opacity: 0.85, fontWeight: 700 }}>{label(s, tier)}</div>
    </div>
  );
}
"""
    cur = read(p)
    if cur.strip() == desired.strip():
        return False
    write(p, desired)
    return True

def patch_identity_panel_tsx() -> bool:
    p = ROOT / "app" / "web" / "components" / "IdentityPanel.tsx"
    src = read(p)
    changed = False

    # Add riskTier prop if missing
    if re.search(r"\briskTier\?\s*:", src) is None:
        # Insert after riskScore prop line
        pat = r"(riskScore\?:\s*number\s*\|\s*null;\s*\n)"
        repl = r"\1  riskTier?: \"low\" | \"moderate\" | \"high\" | null;\n"
        src2, n = re.subn(pat, repl, src, count=1)
        if n != 1:
            die("Could not add riskTier prop to IdentityPanel.tsx (riskScore prop anchor missing)")
        src = src2
        changed = True

    # Pass tier into RiskBadge
    if "tier=" not in src:
        pat = r"<RiskBadge\s+score=\{props\.riskScore\}\s*/>"
        repl = r"<RiskBadge score={props.riskScore} tier={props.riskTier ?? null} />"
        src2, n = re.subn(pat, repl, src, count=1)
        if n != 1:
            die("Could not patch RiskBadge usage in IdentityPanel.tsx")
        src = src2
        changed = True

    if changed:
        write(p, src)
    return changed

def patch_peptide_page_tsx() -> bool:
    p = ROOT / "app" / "web" / "app" / "peptide" / "[slug]" / "page.tsx"
    src = read(p)
    changed = False

    # Add riskTier prop to IdentityPanel call(s) if missing
    if "riskTier=" not in src:
        pat = r"(riskScore=\{riskHit \? riskHit\.risk\.risk_score : null\}\s*)"
        repl = r"""\1
        riskTier={riskHit ? riskHit.risk.risk_tier ?? null : null}"""
        src2, n = re.subn(pat, repl, src, count=1)
        if n == 1:
            src = src2
            changed = True

    # If there's a direct RiskBadge usage, add tier there too
    pat2 = r"<RiskBadge\s+score=\{riskHit\.risk\.risk_score\}\s*/>"
    repl2 = r"<RiskBadge score={riskHit.risk.risk_score} tier={riskHit.risk.risk_tier ?? null} />"
    src2, n2 = re.subn(pat2, repl2, src, count=1)
    if n2 == 1:
        src = src2
        changed = True

    if changed:
        write(p, src)
    return changed

def patch_blend_page_tsx() -> bool:
    p = ROOT / "app" / "web" / "app" / "blend" / "[slug]" / "page.tsx"
    src = read(p)
    changed = False

    if "riskTier=" not in src:
        pat = r"(riskScore=\{riskHit \? riskHit\.risk\.risk_score : null\}\s*)"
        repl = r"""\1
        riskTier={riskHit ? riskHit.risk.risk_tier ?? null : null}"""
        src2, n = re.subn(pat, repl, src, count=1)
        if n != 1:
            die("Could not add riskTier prop to IdentityPanel usage in blend page")
        src = src2
        changed = True

    if changed:
        write(p, src)
    return changed

def main() -> int:
    touched = []

    if patch_build_risk_index():
        touched.append("scripts/index/build_risk_index.py")
    if patch_risk_index_ts():
        touched.append("app/web/lib/riskIndex.ts")
    if rewrite_risk_badge_tsx():
        touched.append("app/web/components/RiskBadge.tsx")
    if patch_identity_panel_tsx():
        touched.append("app/web/components/IdentityPanel.tsx")
    if patch_peptide_page_tsx():
        touched.append("app/web/app/peptide/[slug]/page.tsx")
    if patch_blend_page_tsx():
        touched.append("app/web/app/blend/[slug]/page.tsx")

    print("OK: add_risk_tier_v1 complete.")
    if touched:
        print("Touched:")
        for t in touched:
            print(f" - {t}")
    else:
        print("No changes needed (already applied).")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
