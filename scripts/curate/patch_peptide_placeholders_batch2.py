from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any, Dict, List

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

PENDING_RE = re.compile(r"pep-talk curation pending", re.I)

def load_json(p: Path) -> Dict[str, Any]:
    return json.loads(p.read_text(encoding="utf-8"))

def save_json(p: Path, d: Dict[str, Any]) -> None:
    p.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def is_pending_text(s: str) -> bool:
    return bool(PENDING_RE.search((s or "").strip()))

def ensure_practical_block(d: Dict[str, Any]) -> Dict[str, Any]:
    # Practical block lives at top-level in current repo reality.
    pr = d.get("practical")
    if not isinstance(pr, dict):
        pr = {}
        d["practical"] = pr
    # Required by validator
    pr["schema_version"] = "practical_block_v1"
    return pr

def patch_one(slug: str, practical: Dict[str, Any]) -> None:
    p = PEPTIDES_DIR / f"{slug}.json"
    if not p.exists():
        raise SystemExit(f"Missing peptide file: {p}")

    d = load_json(p)
    pr = ensure_practical_block(d)

    # Replace only if missing OR placeholder-y
    def set_if_empty_or_pending(key: str, val: Any):
        cur = pr.get(key)
        if cur is None:
            pr[key] = val
            return
        if isinstance(cur, str) and (not cur.strip() or is_pending_text(cur)):
            pr[key] = val
            return
        if isinstance(cur, list) and len(cur) == 0:
            pr[key] = val
            return

    set_if_empty_or_pending("bottom_line", practical["bottom_line"])
    set_if_empty_or_pending("benefits", practical["benefits"])
    set_if_empty_or_pending("side_effects_common", practical["side_effects_common"])
    set_if_empty_or_pending("side_effects_serious", practical["side_effects_serious"])
    set_if_empty_or_pending("who_should_be_cautious", practical["who_should_be_cautious"])

    save_json(p, d)
    print(f"OK: patched {slug}")

BATCH2: Dict[str, Dict[str, Any]] = {
  "cjc-1295": {
    "bottom_line": (
      "CJC-1295 is a long-acting analog of growth hormone-releasing hormone (GHRH). "
      "In real-world wellness and bodybuilding circles it’s discussed for GH/IGF-1 elevation, recovery, and body composition—"
      "but the evidence base is limited, and most use happens outside regulated medical systems."
    ),
    "benefits": [
      "Interest in increased GH/IGF-1 signaling (body composition / recovery discussions)",
      "Sleep and “recovery quality” anecdotes in fitness communities",
      "Often discussed as part of GH-axis “stacking” (conceptual, not a protocol)"
    ],
    "side_effects_common": [
      "Water retention / puffiness (reported in GH-axis discussions)",
      "Increased appetite or changes in hunger (variable reports)",
      "Fatigue or headache (nonspecific, inconsistently reported)"
    ],
    "side_effects_serious": [
      "Signs of glucose intolerance (unusual thirst/urination, unexplained fatigue) — seek medical evaluation",
      "Rapid swelling, shortness of breath, or chest pain (seek urgent care)",
      "Severe allergic reaction (hives, facial swelling, trouble breathing)"
    ],
    "who_should_be_cautious": [
      "People with diabetes or prediabetes, or strong family history of metabolic disease",
      "Active malignancy or cancer history where growth signaling is a concern (requires clinician discussion)",
      "Pregnancy/breastfeeding (avoid due to uncertainty)",
      "Adolescents (avoid: growth axis manipulation + long-term uncertainty)"
    ],
  },

  "aod-9604": {
    "bottom_line": (
      "AOD-9604 is a peptide fragment derived from the C-terminal region of human growth hormone (often described as hGH fragment 176–191). "
      "It’s marketed heavily for fat loss, but human evidence has been mixed/weak in many summaries, and real-world products vary widely in quality."
    ),
    "benefits": [
      "Discussed for fat-loss support without “full GH” effects (marketing claim; evidence mixed)",
      "Used in weight-loss experimentation circles as a “metabolic helper” (anecdotal)",
      "Sometimes framed as an adjunct to diet/training efforts (conceptual)"
    ],
    "side_effects_common": [
      "GI upset or nausea (reported anecdotally)",
      "Headache or fatigue (nonspecific)",
      "No noticeable effect is common (frequent real-world report)"
    ],
    "side_effects_serious": [
      "Severe allergic reaction (hives, facial swelling, trouble breathing)",
      "Persistent abdominal pain, vomiting, or signs of dehydration (seek care)",
      "New/worsening mood symptoms or sleep disruption that becomes severe (seek evaluation)"
    ],
    "who_should_be_cautious": [
      "Pregnancy/breastfeeding (avoid due to uncertainty)",
      "Adolescents (avoid: long-term metabolic setpoints + uncertainty)",
      "People with significant endocrine disorders (requires clinician oversight)",
      "Anyone relying on unregulated sources (quality/contamination risk is a major real-world hazard)"
    ],
  },

  "bremelanotide": {
    "bottom_line": (
      "Bremelanotide is a melanocortin receptor agonist discussed for sexual desire/arousal effects. "
      "Unlike many “research peptides,” it has formal drug development history—but real-world use still varies, "
      "and side effects can be meaningful for some people."
    ),
    "benefits": [
      "Discussed for sexual desire/arousal support (primary use-case in public discussion)",
      "Sometimes discussed for mood/drive effects (secondary, anecdotal)",
      "Occasionally mentioned in ‘libido stack’ conversations (conceptual)"
    ],
    "side_effects_common": [
      "Nausea (commonly discussed)",
      "Flushing or warmth",
      "Headache",
      "Temporary increases in blood pressure (reported/flagged in some contexts)"
    ],
    "side_effects_serious": [
      "Chest pain, severe shortness of breath, or fainting (seek urgent care)",
      "Severe headache with neurological symptoms (urgent evaluation)",
      "Severe or persistent blood pressure elevation symptoms (urgent evaluation)"
    ],
    "who_should_be_cautious": [
      "People with uncontrolled hypertension or significant cardiovascular disease",
      "History of severe migraines or neurologic events (needs clinician guidance)",
      "Pregnancy/breastfeeding (avoid due to uncertainty)",
      "Adolescents (avoid)"
    ],
  },

  "afamelanotide": {
    "bottom_line": (
      "Afamelanotide is a melanocortin analog developed to increase melanin production and photoprotection in specific medical contexts. "
      "Public discussion often drifts into “tanning” or cosmetic narratives, but the meaningful use-case is condition-specific and medically supervised."
    ),
    "benefits": [
      "Photoprotection / reduced light sensitivity in specific medical contexts (condition-specific)",
      "Interest in skin pigmentation changes (cosmetic discussion; not the clinical purpose)",
      "Sometimes discussed for inflammatory/oxidative stress hypotheses (uncertain)"
    ],
    "side_effects_common": [
      "Nausea or reduced appetite",
      "Headache",
      "Skin darkening / pigmentation changes (expected effect; may be uneven)",
      "Mild fatigue or flushing (variable reports)"
    ],
    "side_effects_serious": [
      "New or changing pigmented skin lesions (get evaluated promptly)",
      "Severe allergic reaction (hives, facial swelling, trouble breathing)",
      "Severe or persistent systemic symptoms that don’t resolve (seek evaluation)"
    ],
    "who_should_be_cautious": [
      "History of melanoma or high-risk pigmented lesion history (requires clinician guidance)",
      "Pregnancy/breastfeeding (avoid due to uncertainty)",
      "Adolescents (avoid)",
      "Anyone pursuing cosmetic-only use outside medical supervision (risk/benefit mismatch)"
    ],
  },
}

def main() -> int:
    for slug, pr in BATCH2.items():
        patch_one(slug, pr)
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
