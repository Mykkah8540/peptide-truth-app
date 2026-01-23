#!/usr/bin/env python3
from __future__ import annotations

import json
import csv
from pathlib import Path
from typing import Any, Dict, List, Tuple

REPO_ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = REPO_ROOT / "content" / "peptides"
OUT_PLAN = Path("/tmp/peptalk_missing_interactions_plan_v2.csv")

def read_json(p: Path) -> Any:
    return json.loads(p.read_text(encoding="utf-8"))

def has_any_interactions(doc: Dict[str, Any]) -> bool:
    it = doc.get("interactions")
    if not isinstance(it, dict):
        return False
    for k in ("drug_classes", "supplement_classes", "peptides"):
        v = it.get(k)
        if isinstance(v, list) and len(v) > 0:
            return True
    return False

def text(doc: Dict[str, Any]) -> str:
    bits = []
    for k in ("canonical_name", "short_name", "canonical_slug"):
        v = doc.get(k)
        if isinstance(v, str) and v.strip():
            bits.append(v.strip())
    # fallback to file slug
    return (" ".join(bits)).lower()

# Ordered rules: MOST LOGICAL first (high-signal consumer search / common meds)
RULES: List[Tuple[str, List[str], str]] = [
    # 1) Diabetes / GLP-1 / insulin / incretins (highest user demand)
    ("diabetes-glucose-lowering",
     ["glp", "glp-1", "incret", "semaglut", "liraglut", "dulaglut", "exenatide", "tirzepatide", "retatrutide", "insulin", "amylin", "pramlintide"],
     "diabetes-glucose-lowering"),
    ("antidiabetics-insulin-glp1",
     ["glp", "glp-1", "semaglut", "liraglut", "dulaglut", "exenatide", "tirzepatide", "retatrutide", "insulin", "amylin", "pramlintide"],
     "antidiabetics-insulin-glp1"),

    # 2) Cardiovascular / vasoactive peptides
    ("cardiovascular-physiology-context",
     ["vip", "np", "natriuret", "angiotensin", "bradykinin", "endothelin", "adrenomedullin", "apelin"],
     "cardiovascular-physiology-context"),

    # 3) BP / antihypertensive context (RAAS etc.)
    ("antihypertensives",
     ["angiotensin", "renin", "vasopressin", "desmopressin", "raas"],
     "antihypertensives"),

    # 4) Immune modulation / infection-risk context
    ("immune-modulation-infection-risk",
     ["thym", "tα1", "ta1", "thymosin", "ll-37", "cathelicidin", "defensin", "interleukin", "immun", "cytok"],
     "immune-modulation-infection-risk"),
    ("immunosuppressants",
     ["cyclospor", "tacrolim", "sirolim", "everolim", "mycophen", "azathiopr"],
     "immunosuppressants"),
    ("anti-infectives-antimicrobials",
     ["antimicro", "antibiot", "antiviral", "antifungal", "aln-apn", "antimicrobial"],
     "anti-infectives-antimicrobials"),

    # 5) Endocrine axis modulation (GH/HPA/HPG/HPT etc.)
    ("endocrine-axis-modulation-context",
     ["ghrp", "ghrelin", "ipamorelin", "sermorelin", "tesamorelin", "somatostat", "octreotide", "lanreotide", "calcitonin", "teriparatide", "abaloparatide", "oxytocin", "carbetocin", "desmopressin"],
     "endocrine-axis-modulation-context"),

    # 6) CNS / neuropeptides (sleep, mood, cognition, itch/pain)
    ("neuropeptide-cns-context",
     ["nootrop", "cogn", "dihexa", "semax", "selank", "difelikefalin", "opioid", "melanotan", "pt-141", "kisspeptin", "oxytocin"],
     "neuropeptide-cns-context"),

    # 7) NSAIDs + serotonergic last (least peptide-direct, more “med class” context)
    ("nsaids",
     ["cox", "prostagland", "nsaid", "ibuprofen", "naproxen"],
     "nsaids"),
    ("ssri-snri-serotonergic",
     ["seroton", "ssri", "snri", "5-ht"],
     "ssri-snri-serotonergic"),
]

def choose_class(doc: Dict[str, Any]) -> str | None:
    t = text(doc)
    if not t:
        return None
    for _name, needles, klass in RULES:
        for n in needles:
            if n in t:
                return klass
    return None

def main() -> None:
    peptides = sorted(PEPTIDES_DIR.glob("*.json"))
    missing: List[Tuple[str, str]] = []
    unknown: List[str] = []

    for fp in peptides:
        doc = read_json(fp)
        if not isinstance(doc, dict):
            continue
        if has_any_interactions(doc):
            continue

        slug = fp.stem
        klass = choose_class(doc)
        if klass:
            missing.append((slug, klass))
        else:
            unknown.append(slug)

    # Write plan
    OUT_PLAN.parent.mkdir(parents=True, exist_ok=True)
    with OUT_PLAN.open("w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow(["# peptide_slug", "interaction_class_slug"])
        for slug, klass in missing:
            w.writerow([slug, klass])

    print("OK")
    print(json.dumps({
        "missing_with_suggestions": len(missing),
        "missing_unknown": len(unknown),
        "plan_path": str(OUT_PLAN),
        "unknown_slugs_preview": unknown[:40],
    }, indent=2))

if __name__ == "__main__":
    main()
