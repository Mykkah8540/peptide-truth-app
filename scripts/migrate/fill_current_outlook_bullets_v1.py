#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any, Dict, List, Set, Tuple

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

TARGET_KEY = "current_outlook_bullets"

# Conservative phrase bank (NOT protocols; descriptive; "commonly discussed for")
# This is used only when the peptide file doesn't provide enough signals.
# Phrasing avoids medical certainty: "interest in", "commonly discussed for", "support".
GENERIC_BY_TOPIC = {
    "topic_injury_healing": [
        "tendon and ligament recovery support",
        "soft tissue healing after overuse or injury",
        "return-to-training support during rehab",
        "joint comfort and mobility support",
        "interest in tissue repair pathways",
    ],
    "topic_sleep_circadian": [
        "sleep quality support",
        "falling asleep more easily (anecdotal)",
        "staying asleep through the night (anecdotal)",
        "circadian rhythm support",
        "next-day recovery and readiness support",
    ],
    "topic_skin_hair": [
        "skin appearance and texture support",
        "interest in collagen/skin remodeling pathways",
        "support for skin hydration and glow (anecdotal)",
        "support for wound/skin recovery (anecdotal)",
        "interest in hair/scalp support (anecdotal)",
    ],
    "topic_metabolic_weight": [
        "appetite control support (anecdotal)",
        "weight-loss support (commonly discussed)",
        "metabolic health support (anecdotal)",
        "blood sugar stability support (anecdotal)",
        "craving reduction support (anecdotal)",
    ],
    "topic_immunity_inflammation": [
        "immune support (anecdotal)",
        "inflammation modulation interest",
        "recovery from illness/stress support (anecdotal)",
        "gut-immune axis interest",
        "general resilience support (anecdotal)",
    ],
    "topic_muscle_performance": [
        "training recovery support",
        "muscle performance and endurance interest",
        "reduced soreness support (anecdotal)",
        "work capacity support (anecdotal)",
        "lean mass support (commonly discussed)",
    ],
}

# Simple keyword->bullet mapping (deterministic, not too specific)
KEYWORD_BULLETS = [
    (re.compile(r"\bgut\b|\bgi\b|\bintestinal\b|\bmucosa\b", re.I), [
        "gastrointestinal comfort and lining support (anecdotal)",
        "interest in gut repair and resilience pathways",
    ]),
    (re.compile(r"\btendon\b|\bligament\b|\bsoft tissue\b|\binjury\b|\brehab\b", re.I), [
        "tendon and ligament recovery support",
        "rehabilitation support after strains/overuse (anecdotal)",
    ]),
    (re.compile(r"\bsleep\b|\binsomnia\b|\bcircadian\b", re.I), [
        "sleep quality support",
        "circadian rhythm support",
    ]),
    (re.compile(r"\bskin\b|\bwrinkle\b|\bdermal\b|\bcomplexion\b|\bcosmetic\b", re.I), [
        "skin appearance and texture support",
        "interest in skin remodeling pathways",
    ]),
    (re.compile(r"\bhair\b|\bscalp\b", re.I), [
        "interest in hair/scalp support (anecdotal)",
    ]),
    (re.compile(r"\bappetite\b|\bweight\b|\bmetabolic\b|\bglucose\b", re.I), [
        "weight-loss support (commonly discussed)",
        "metabolic health support (anecdotal)",
    ]),
    (re.compile(r"\binflammation\b|\bimmune\b|\bimmunity\b", re.I), [
        "inflammation modulation interest",
        "immune support (anecdotal)",
    ]),
    (re.compile(r"\banti[- ]?aging\b|\blongevity\b", re.I), [
        "longevity and healthy-aging interest",
        "general resilience support (anecdotal)",
    ]),
    (re.compile(r"\bmuscle\b|\bstrength\b|\bendurance\b|\bperformance\b|\brecovery\b", re.I), [
        "training recovery support",
        "muscle performance and endurance interest",
    ]),
]


OUTLOOK_BLOCKLIST = re.compile(
    r"(unregulated|regulat|sourc|administrat|inject|route|impurit|approval|approved|legal|illegal|fda|anti[- ]?doping)",
    re.I
)

DISCLAIMER_WORDS = re.compile(
    r"\banimal\b|\bpreclinical\b|\blimited\b|\bnot definitive\b|\bunapproved\b|\bnot approved\b|\bregulatory\b|\bfda\b|\buncertainty\b|\bunknown\b",
    re.I
)

def norm(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "").strip())

def split_sentences(text: str) -> List[str]:
    t = norm(text)
    if not t:
        return []
    # deterministic sentence split
    parts = re.split(r"(?<=[.?!])\s+", t)
    return [p.strip() for p in parts if p.strip()]

def extract_interest_from_text(text: str) -> List[str]:
    """Extract phrases from overview-ish text that indicate what people discuss it for."""
    sents = split_sentences(text)
    keep: List[str] = []
    for s in sents:
        if DISCLAIMER_WORDS.search(s) or OUTLOOK_BLOCKLIST.search(s):
            continue
        # Keep only short-ish sentences as candidate bullets
        ss = s.strip().rstrip(".")
        if 20 <= len(ss) <= 160:
            keep.append(ss)
    # Convert kept sentences into bullets with conservative framing
    bullets: List[str] = []
    for s in keep[:6]:
        # Make it bullet-like, remove leading "BPC-157 is..."
        s2 = re.sub(r"^[A-Za-z0-9\- ]+\s+is\s+", "", s, flags=re.I).strip()
        s2 = s2[0].lower() + s2[1:] if s2 else s2
        # Avoid protocols words if any
        s2 = re.sub(r"\bdose\b|\bdosing\b|\binject\b|\binjection\b|\bmg\b", "", s2, flags=re.I).strip()
        if s2:
            bullets.append(s2)
    return bullets

def harvest_blocks(peptide: Dict[str, Any]) -> List[str]:
    """Pull bullets from structured sections: use_cases, hypothesized_effects, human_effects."""
    sections = peptide.get("sections") or {}
    out: List[str] = []
    for key in ("use_cases", "human_effects", "hypothesized_effects", "preclinical_effects"):
        arr = sections.get(key) or []
        if isinstance(arr, list):
            for b in arr:
                if not isinstance(b, dict):
                    continue
                title = norm(b.get("title") or "")
                text = norm(b.get("text") or "")
                # Prefer titles as bullets, else first clause of text
                cand = title or text
                if not cand:
                    continue
                # strip disclaimer-y statements here; those belong elsewhere
                if DISCLAIMER_WORDS.search(cand) or OUTLOOK_BLOCKLIST.search(cand):
                    continue
                cand = cand.rstrip(".")
                # keep it concise
                if len(cand) > 160:
                    cand = cand[:157].rstrip() + "…"
                out.append(cand)
    return out

def keyword_bullets(peptide: Dict[str, Any]) -> List[str]:
    sections = peptide.get("sections") or {}
    overview0 = ""
    if isinstance(sections.get("overview"), list) and sections["overview"]:
        if isinstance(sections["overview"][0], dict):
            overview0 = norm(sections["overview"][0].get("text") or "")
    joined = " ".join([
        overview0,
        norm(peptide.get("canonical_name") or ""),
        norm(peptide.get("short_name") or ""),
        norm((peptide.get("classification") or {}).get("notes") or ""),
        norm((peptide.get("status") or {}).get("human_use_note") or ""),
    ])
    out: List[str] = []
    for rx, bullets in KEYWORD_BULLETS:
        if rx.search(joined):
            out.extend(bullets)
    return out

def topic_based(peptide: Dict[str, Any]) -> List[str]:
    topics = peptide.get("topics") or {}
    prim = topics.get("primary") or []
    out: List[str] = []
    if isinstance(prim, list):
        for t in prim:
            if t in GENERIC_BY_TOPIC:
                out.extend(GENERIC_BY_TOPIC[t])
    return out

def dedupe_preserve_order(items: List[str]) -> List[str]:
    seen: Set[str] = set()
    out: List[str] = []
    for it in items:
        x = norm(it).rstrip(".")
        if not x:
            continue
        key = x.lower()
        if key in seen:
            continue
        seen.add(key)
        out.append(x)
    return out

def ensure_minimum(bullets: List[str], peptide: Dict[str, Any]) -> List[str]:
    """Guarantee 5–10 bullets deterministically, using progressively more generic fallbacks."""
    b = dedupe_preserve_order(bullets)

    # If still short, add topic-based generics
    if len(b) < 5:
        b = dedupe_preserve_order(b + topic_based(peptide))

    # If still short, add keyword-based generics
    if len(b) < 5:
        b = dedupe_preserve_order(b + keyword_bullets(peptide))

    # Final minimal fallback (very generic but honest)
    if len(b) < 5:
        b = dedupe_preserve_order(b + [
            "general recovery and resilience interest (anecdotal)",
            "common biohacker curiosity due to community reports",
            "interest in mechanisms suggested by early evidence",
            "used in goal-based stacking discussions (anecdotal)",
            "exploration in wellness communities despite evidence limits",
        ])

    # Cap at 10
    return b[:10]

def process_file(fp: Path) -> Tuple[bool, str]:
    doc = json.loads(fp.read_text(encoding="utf-8"))
    peptide = doc.get("peptide") or {}
    sections = peptide.get("sections") or {}

    # If already present with >=5 bullets, leave it
    existing = sections.get(TARGET_KEY)
    if isinstance(existing, list) and len([x for x in existing if isinstance(x, str) and x.strip()]) >= 5:
        return False, fp.name

    bullets: List[str] = []
    bullets += harvest_blocks(peptide)

    # Also derive from overview text (non-disclaimer sentences)
    if isinstance(sections.get("overview"), list) and sections["overview"]:
        b0 = sections["overview"][0]
        if isinstance(b0, dict):
            bullets += extract_interest_from_text(b0.get("text") or "")

    bullets = ensure_minimum(bullets, peptide)

    # Write back
    sections[TARGET_KEY] = bullets
    peptide["sections"] = sections
    doc["peptide"] = peptide

    fp.write_text(json.dumps(doc, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return True, fp.name

def main() -> None:
    if not PEPTIDES_DIR.exists():
        raise SystemExit(f"Missing peptides dir: {PEPTIDES_DIR}")

    changed = 0
    total = 0
    for fp in sorted(PEPTIDES_DIR.glob("*.json")):
        total += 1
        did, _ = process_file(fp)
        if did:
            changed += 1

    print(f"fill_current_outlook_bullets_v1: peptides={total} updated={changed} key=sections.{TARGET_KEY}")

if __name__ == "__main__":
    main()
