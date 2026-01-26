#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
from typing import Dict, Any

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

def load_json(p: Path) -> Dict[str, Any]:
    with p.open("r", encoding="utf-8") as f:
        return json.load(f)

def save_json(p: Path, d: Dict[str, Any]) -> None:
    with p.open("w", encoding="utf-8") as f:
        json.dump(d, f, ensure_ascii=False, indent=2)
        f.write("\n")

def apply_patch(slug: str, practical: Dict[str, Any]) -> None:
    fp = PEPTIDES_DIR / f"{slug}.json"
    if not fp.exists():
        raise SystemExit(f"ERROR: missing peptide file: {fp}")

    d = load_json(fp)

    # Set top-level practical (authoritative for validator)
    d["practical"] = practical

    # Also mirror into peptide.practical if present (keeps older loaders safe)
    pep = d.get("peptide")
    if isinstance(pep, dict):
        pep["practical"] = practical
        d["peptide"] = pep

    save_json(fp, d)
    print(f"OK: patched {slug}")

def practical_block(bottom_line: str, benefits: list[str], common: list[str], serious: list[str], cautious: list[str]) -> Dict[str, Any]:
    # Keep language validator-clean: no "may/could/might/expected", no parenthetical hedging.
    return {
        "schema_version": "practical_block_v1",
        "bottom_line": bottom_line.strip(),
        "benefits": [s.strip() for s in benefits if str(s).strip()],
        "side_effects_common": [s.strip() for s in common if str(s).strip()],
        "side_effects_serious": [s.strip() for s in serious if str(s).strip()],
        "who_should_be_cautious": [s.strip() for s in cautious if str(s).strip()],
    }

def main() -> int:
    targets: Dict[str, Dict[str, Any]] = {}

    # --- THYMOSIN ALPHA-1 (TA1) ---
    targets["thymosin-alpha-1"] = practical_block(
        bottom_line=(
            "Thymosin alpha-1 is an immune-modulating peptide studied in infectious disease and oncology-adjunct contexts. "
            "In wellness communities, it is usually discussed as immune support during high stress or frequent illness seasons. "
            "The biggest real-world variables are sourcing quality and medical appropriateness for immune-related conditions."
        ),
        benefits=[
            "Immune support interest during frequent illness seasons",
            "Resilience support interest during high stress or heavy training blocks",
            "Adjunct interest in chronic infection discussions in online communities",
            "Interest in immune calibration and inflammatory balance discussions",
        ],
        common=[
            "Injection-site irritation or redness",
            "Fatigue",
            "Headache",
            "Mild flu-like feeling",
        ],
        serious=[
            "Allergic reaction with hives, facial swelling, or trouble breathing",
            "High fever with severe body aches",
            "Severe worsening of autoimmune symptoms",
        ],
        cautious=[
            "Autoimmune disease",
            "Organ transplant recipients or people on immunosuppressive therapy",
            "Active infection with significant systemic symptoms",
            "Pregnancy or breastfeeding",
            "Children and adolescents",
        ],
    )

    # --- THYMOSIN BETA-4 (TB4) ---
    targets["thymosin-beta-4"] = practical_block(
        bottom_line=(
            "Thymosin beta-4 is discussed for tissue repair and recovery, with most supportive data coming from preclinical models and limited human research. "
            "In real-world use discussions, it is often framed around injury recovery and return-to-training timelines. "
            "Product labeling and market naming can be confusing, so identity and sourcing are major practical risks."
        ),
        benefits=[
            "Soft-tissue recovery interest after overuse or injury",
            "Skin and wound recovery interest in research contexts",
            "Joint comfort and mobility support interest during rehab periods",
            "Interest in repair-pathway signaling in sports medicine discussions",
        ],
        common=[
            "Injection-site irritation or discomfort",
            "Headache",
            "Nausea",
            "Fatigue",
        ],
        serious=[
            "Allergic reaction with hives, facial swelling, or trouble breathing",
            "Chest pain, fainting, or severe shortness of breath",
            "Severe swelling, rapidly spreading redness, or drainage at an injection site",
        ],
        cautious=[
            "Active cancer or recent cancer treatment",
            "People using anticoagulants or antiplatelets",
            "Bleeding disorders",
            "Pregnancy or breastfeeding",
            "Children and adolescents",
        ],
    )

    # --- THYMOSIN BETA-4 FULL-LENGTH ---
    targets["thymosin-beta-4-full"] = practical_block(
        bottom_line=(
            "Thymosin beta-4 full-length is the canonical TB4 peptide discussed in wound and tissue repair research. "
            "In consumer markets, it is frequently confused with fragments and look-alike products, which creates identity and quality risk. "
            "The practical takeaway is that sourcing, labeling accuracy, and medical appropriateness drive most of the real-world downside."
        ),
        benefits=[
            "Soft-tissue recovery interest after overuse or injury",
            "Skin and wound recovery interest in research contexts",
            "Return-to-training support interest during rehabilitation periods",
            "Preference for full-length identity clarity in product discussions",
        ],
        common=[
            "Injection-site irritation or discomfort",
            "Headache",
            "Nausea",
            "Fatigue",
        ],
        serious=[
            "Allergic reaction with hives, facial swelling, or trouble breathing",
            "Chest pain, fainting, or severe shortness of breath",
            "Severe swelling, rapidly spreading redness, or drainage at an injection site",
        ],
        cautious=[
            "Active cancer or recent cancer treatment",
            "People using anticoagulants or antiplatelets",
            "Bleeding disorders",
            "Pregnancy or breastfeeding",
            "Children and adolescents",
        ],
    )

    # Apply
    for slug, pr in targets.items():
        apply_patch(slug, pr)

    return 0

if __name__ == "__main__":
    raise SystemExit(main())
