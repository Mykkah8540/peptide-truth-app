#!/usr/bin/env python3
from __future__ import annotations
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

def load_json(p: Path) -> dict:
  return json.loads(p.read_text(encoding="utf-8"))

def save_json(p: Path, d: dict) -> None:
  p.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

def ensure_practical_block(d: dict, practical: dict) -> dict:
  practical = dict(practical)
  practical["schema_version"] = "practical_block_v1"
  d["practical"] = practical
  return d

BATCH = {
  "ara-290": {
    "bottom_line": "ARA-290 (cibinetide) is an investigational peptide related to erythropoietin biology, discussed for neuropathy and inflammatory pain contexts. It is not a general-purpose wellness peptide; evidence and availability vary by indication and setting.",
    "benefits": [
      "interest in neuropathic pain and small-fiber neuropathy discussions",
      "interest in inflammation-modulation signaling (mechanistic)",
      "discussion in recovery communities for nerve irritation (anecdotal)"
    ],
    "side_effects_common": [
      "headache",
      "nausea",
      "fatigue",
      "injection-site irritation"
    ],
    "side_effects_serious": [
      "allergic reaction signs: hives, facial swelling, trouble breathing",
      "chest pain, fainting, or severe shortness of breath",
      "new severe neurologic symptoms: sudden weakness, confusion, loss of vision"
    ],
    "who_should_be_cautious": [
      "pregnant or breastfeeding people",
      "people with uncontrolled cardiovascular disease",
      "people with severe kidney or liver disease",
      "people with a history of severe allergic reactions to injectable biologics"
    ]
  },

  "atrial-natriuretic-peptide": {
    "bottom_line": "Atrial natriuretic peptide (ANP) is an endogenous hormone involved in blood-pressure and fluid regulation. Discussion outside medical settings often mixes physiology with performance and fat-loss claims; the real risk is dangerous blood-pressure and electrolyte effects.",
    "benefits": [
      "education value for fluid balance and blood-pressure physiology",
      "clinical relevance in cardiovascular physiology (context)"
    ],
    "side_effects_common": [
      "lightheadedness",
      "headache",
      "nausea",
      "increased urination"
    ],
    "side_effects_serious": [
      "fainting or near-fainting episodes",
      "severe low blood pressure symptoms: confusion, inability to stand, cold clammy skin",
      "abnormal heart rhythm symptoms: pounding heartbeat, chest tightness, collapse",
      "severe weakness or cramps with confusion (electrolyte disturbance)"
    ],
    "who_should_be_cautious": [
      "people with low blood pressure or recurrent fainting",
      "people using diuretics or multiple blood-pressure medications",
      "people with significant heart rhythm disorders",
      "people with kidney disease or electrolyte disorders"
    ]
  },

  "bivalirudin": {
    "bottom_line": "Bivalirudin is a prescription anticoagulant (direct thrombin inhibitor) used in hospital settings for specific cardiac procedures. It is not a wellness peptide; the primary risk is serious bleeding.",
    "benefits": [
      "medically indicated anticoagulation during certain cardiac procedures under physician management",
      "education value for anticoagulant class comparison"
    ],
    "side_effects_common": [
      "bleeding or bruising",
      "nausea",
      "back pain"
    ],
    "side_effects_serious": [
      "major bleeding: vomiting blood, black stools, coughing blood",
      "intracranial bleeding symptoms: sudden severe headache, one-sided weakness, confusion",
      "severe allergic reaction signs: hives, facial swelling, trouble breathing"
    ],
    "who_should_be_cautious": [
      "anyone with active bleeding or recent major surgery",
      "people with bleeding disorders",
      "people with a history of hemorrhagic stroke",
      "people using other anticoagulants or antiplatelet drugs"
    ]
  },

  "bradykinin": {
    "bottom_line": "Bradykinin is an endogenous peptide involved in inflammation, pain signaling, and blood-vessel dilation. It is most relevant clinically through medications that alter its levels; direct use outside medical contexts is high-risk due to swelling and blood-pressure effects.",
    "benefits": [
      "education value for inflammation and vascular physiology",
      "context for understanding ACE-inhibitor cough and angioedema risk (mechanistic)"
    ],
    "side_effects_common": [
      "flushing",
      "headache",
      "lightheadedness",
      "local swelling or pain"
    ],
    "side_effects_serious": [
      "angioedema symptoms: swelling of lips, tongue, face, throat tightness",
      "severe low blood pressure symptoms: fainting, confusion, collapse",
      "wheezing or breathing difficulty"
    ],
    "who_should_be_cautious": [
      "people with a history of angioedema",
      "people using ACE inhibitors or neprilysin inhibitors",
      "people with low blood pressure or recurrent fainting",
      "pregnant or breastfeeding people"
    ]
  },

  "brain-natriuretic-peptide": {
    "bottom_line": "Brain natriuretic peptide (BNP) is an endogenous hormone used clinically as a cardiac biomarker and is involved in fluid balance. Non-medical discussion often drifts into performance or fat-loss narratives; the real risk is unsafe blood-pressure and fluid shifts.",
    "benefits": [
      "clinical relevance as a heart-failure biomarker (education)",
      "education value for cardiovascular fluid regulation physiology"
    ],
    "side_effects_common": [
      "lightheadedness",
      "headache",
      "nausea",
      "increased urination"
    ],
    "side_effects_serious": [
      "fainting or collapse",
      "severe low blood pressure symptoms: confusion, inability to stand, cold clammy skin",
      "abnormal heart rhythm symptoms: chest tightness, pounding heartbeat, collapse",
      "severe weakness or cramps with confusion (electrolyte disturbance)"
    ],
    "who_should_be_cautious": [
      "people with low blood pressure or recurrent fainting",
      "people with significant heart rhythm disorders",
      "people with kidney disease or electrolyte disorders",
      "people using multiple blood-pressure medicines or diuretics"
    ]
  },
}

def main() -> int:
  for slug, practical in BATCH.items():
    p = PEPTIDES_DIR / f"{slug}.json"
    if not p.exists():
      print(f"SKIP: missing {slug}.json")
      continue
    d = load_json(p)
    d = ensure_practical_block(d, practical)
    save_json(p, d)
    print(f"OK: patched {slug}")
  return 0

if __name__ == "__main__":
  raise SystemExit(main())
