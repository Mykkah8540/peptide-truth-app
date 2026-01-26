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

def practical_block(bottom_line: str, benefits: list[str], common: list[str], serious: list[str], cautious: list[str]) -> Dict[str, Any]:
    # Validator-safe language: avoid "may/might/could/expected" and parenthetical hedging.
    return {
        "schema_version": "practical_block_v1",
        "bottom_line": bottom_line.strip(),
        "benefits": [s.strip() for s in benefits if str(s).strip()],
        "side_effects_common": [s.strip() for s in common if str(s).strip()],
        "side_effects_serious": [s.strip() for s in serious if str(s).strip()],
        "who_should_be_cautious": [s.strip() for s in cautious if str(s).strip()],
    }

def apply_patch(slug: str, practical: Dict[str, Any]) -> None:
    fp = PEPTIDES_DIR / f"{slug}.json"
    if not fp.exists():
        raise SystemExit(f"ERROR: missing peptide file: {fp}")

    d = load_json(fp)

    d["practical"] = practical

    pep = d.get("peptide")
    if isinstance(pep, dict):
        pep["practical"] = practical
        d["peptide"] = pep

    save_json(fp, d)
    print(f"OK: patched {slug}")

def main() -> int:
    targets: Dict[str, Dict[str, Any]] = {}

    # --- MELANOTAN I (Afamelanotide is separate; this is commonly discussed as "MT-I") ---
    targets["melanotan-i"] = practical_block(
        bottom_line=(
            "Melanotan I is discussed for tanning and pigmentation effects via melanocortin pathways. "
            "In consumer markets, the dominant risks are unregulated sourcing, unexpected pigmentation changes, and lack of medical oversight for skin-related concerns."
        ),
        benefits=[
            "Tanning and pigmentation interest in appearance-focused communities",
            "Sun-exposure management interest in some user communities",
            "Cosmetic skin tone interest for photos and events",
        ],
        common=[
            "Nausea",
            "Flushing",
            "Reduced appetite",
            "Headache",
            "Darkening of existing freckles or moles",
        ],
        serious=[
            "Allergic reaction with hives, facial swelling, or trouble breathing",
            "New or changing mole with rapid change in size, shape, or color",
            "Severe dizziness, fainting, or chest pain",
        ],
        cautious=[
            "Personal history of melanoma or high-risk skin cancer history",
            "Multiple atypical moles or strong family history of melanoma",
            "Pregnancy or breastfeeding",
            "Children and adolescents",
            "People with significant cardiovascular disease",
        ],
    )

    # --- MELANOTAN II (MT-II) ---
    targets["melanotan-ii"] = practical_block(
        bottom_line=(
            "Melanotan II is discussed for tanning and melanocortin-related effects, including libido-related discussions in some communities. "
            "Real-world risk is driven by unregulated sourcing, unpredictable pigmentation changes, and systemic side effects."
        ),
        benefits=[
            "Tanning and pigmentation interest in appearance-focused communities",
            "Cosmetic skin tone interest for photos and events",
            "Libido-related interest in some user communities",
        ],
        common=[
            "Nausea",
            "Flushing",
            "Headache",
            "Reduced appetite",
            "Darkening of existing freckles or moles",
        ],
        serious=[
            "Allergic reaction with hives, facial swelling, or trouble breathing",
            "New or changing mole with rapid change in size, shape, or color",
            "Severe dizziness, fainting, or chest pain",
        ],
        cautious=[
            "Personal history of melanoma or high-risk skin cancer history",
            "Multiple atypical moles or strong family history of melanoma",
            "Pregnancy or breastfeeding",
            "Children and adolescents",
            "People with significant cardiovascular disease",
        ],
    )

    # --- OXYTOCIN ---
    targets["oxytocin"] = practical_block(
        bottom_line=(
            "Oxytocin is a human hormone used clinically in specific obstetric settings. "
            "In non-clinical markets it is discussed for social bonding and mood effects, but the biggest risks are inappropriate use, contraindicated medical situations, and lack of supervision."
        ),
        benefits=[
            "Social bonding and connection interest in some communities",
            "Stress and mood support interest in some communities",
            "Clinical relevance in obstetric care contexts",
        ],
        common=[
            "Headache",
            "Nausea",
            "Dizziness",
            "Fatigue",
        ],
        serious=[
            "Chest pain, fainting, or severe shortness of breath",
            "Severe confusion or severe agitation",
            "Severe uterine cramping in pregnancy",
        ],
        cautious=[
            "Pregnancy or trying to conceive",
            "Postpartum complications or significant gynecologic history",
            "Significant cardiovascular disease",
            "Seizure disorders",
            "Children and adolescents",
        ],
    )

    # --- SS-31 (Elamipretide) ---
    targets["ss-31"] = practical_block(
        bottom_line=(
            "SS-31 (elamipretide) is a mitochondria-targeting peptide studied in clinical research for mitochondrial dysfunction-related conditions. "
            "In wellness communities it is discussed for fatigue and recovery, but the evidence base is specialized and product quality differences are a major practical risk."
        ),
        benefits=[
            "Energy and fatigue support interest in some communities",
            "Recovery support interest during heavy training or illness recovery periods",
            "Mitochondrial function interest in longevity discussions",
        ],
        common=[
            "Injection-site irritation or discomfort",
            "Nausea",
            "Headache",
            "Fatigue",
        ],
        serious=[
            "Allergic reaction with hives, facial swelling, or trouble breathing",
            "Severe dizziness, fainting, or chest pain",
            "Severe swelling, rapidly spreading redness, or drainage at an injection site",
        ],
        cautious=[
            "Pregnancy or breastfeeding",
            "Children and adolescents",
            "Significant cardiovascular disease",
            "Significant kidney or liver disease",
        ],
    )

    # --- TB-500 (commonly sold name; related to TB4 fragments in markets) ---
    targets["tb-500"] = practical_block(
        bottom_line=(
            "TB-500 is a market name often associated with thymosin beta-4–related fragments and is commonly discussed for injury recovery. "
            "Most supportive data is preclinical or indirect, and real-world risk is driven by product identity confusion and unregulated sourcing."
        ),
        benefits=[
            "Soft-tissue recovery interest after overuse or injury",
            "Return-to-training support interest during rehab periods",
            "Joint comfort and mobility support interest in recovery discussions",
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

    for slug, pr in targets.items():
        apply_patch(slug, pr)

    return 0

if __name__ == "__main__":
    raise SystemExit(main())
