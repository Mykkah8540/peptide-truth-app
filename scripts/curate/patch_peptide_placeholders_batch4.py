#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

def load(path: Path):
  return json.loads(path.read_text(encoding="utf-8"))

def save(path: Path, data):
  path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def ensure_practical(d: dict) -> dict:
  # practical block should live at top-level: d["practical"]
  pr = d.get("practical")
  if not isinstance(pr, dict):
    pr = {}
    d["practical"] = pr
  pr["schema_version"] = "practical_block_v1"
  pr.setdefault("bottom_line", "")
  pr.setdefault("benefits", [])
  pr.setdefault("side_effects_common", [])
  pr.setdefault("side_effects_serious", [])
  pr.setdefault("who_should_be_cautious", [])
  return pr

def patch_bpc_157(fp: Path):
  d = load(fp)
  pr = ensure_practical(d)
  pr["bottom_line"] = (
    "BPC-157 is mostly supported by preclinical research. Human evidence is limited. "
    "In real-world use, the biggest safety variable is unregulated sourcing and non-medical handling."
  )
  pr["benefits"] = [
    "Interest in tendon/ligament and soft-tissue recovery support (evidence is limited)",
    "Interest in GI comfort / gut inflammation contexts (evidence is limited)",
    "Used in return-to-training discussions during rehab (anecdotal)",
  ]
  pr["side_effects_common"] = [
    "No consistent, high-quality human side-effect profile is established",
    "Local irritation or discomfort at the site of use is commonly reported anecdotally",
  ]
  # Remove “could/may/indicate” style phrasing; keep direct symptom list + action.
  pr["side_effects_serious"] = [
    "Fever, spreading redness, swelling, drainage, or rapidly worsening pain — seek medical care",
    "Chest pain, shortness of breath, fainting, or severe allergic symptoms — seek emergency care",
  ]
  pr["who_should_be_cautious"] = [
    "Pregnant or breastfeeding people",
    "People using anticoagulants/antiplatelets or NSAIDs",
    "Anyone with immune suppression or a history of severe allergic reactions",
    "Competitive athletes (anti-doping rules may apply)",
  ]
  save(fp, d)
  print("OK: patched bpc-157")

def patch_sermorelin(fp: Path):
  d = load(fp)
  pr = ensure_practical(d)
  pr["bottom_line"] = (
    "Sermorelin is a GHRH analog discussed for growth-hormone axis signaling. "
    "Effects and tolerability depend heavily on individual physiology and context."
  )
  pr["benefits"] = [
    "Interest in sleep quality and recovery support (variable; evidence is mixed)",
    "Interest in body composition support via GH/IGF-1 pathways (variable)",
  ]
  pr["side_effects_common"] = [
    "Headache",
    "Flushing",
    "Nausea",
    "Fatigue",
  ]
  pr["side_effects_serious"] = [
    "Severe swelling of face/lips/tongue, wheeze, or trouble breathing — seek emergency care",
    "Severe persistent headache with vision changes — seek medical care",
  ]
  pr["who_should_be_cautious"] = [
    "Pregnant or breastfeeding people",
    "People with uncontrolled diabetes or significant glucose dysregulation",
    "People with untreated thyroid disease",
  ]
  save(fp, d)
  print("OK: patched sermorelin")

def patch_tesamorelin(fp: Path):
  d = load(fp)
  pr = ensure_practical(d)
  pr["bottom_line"] = (
    "Tesamorelin is a GHRH analog with FDA approval in specific indications. "
    "Outside that context, risk/benefit depends on medical oversight and individual factors."
  )
  pr["benefits"] = [
    "Indication-specific reduction in visceral adipose tissue (in approved context)",
    "Interest in body composition and metabolic parameters (outside label: evidence varies)",
  ]
  pr["side_effects_common"] = [
    "Joint pain (arthralgia)",
    "Muscle pain (myalgia)",
    "Swelling or fluid retention",
    "Numbness or tingling sensations",
  ]
  pr["side_effects_serious"] = [
    "Severe allergic symptoms — seek emergency care",
    "Severe swelling, shortness of breath, or chest pain — seek medical care",
  ]
  # Remove “may apply / follow guidance” phrasing; keep direct constraint.
  pr["who_should_be_cautious"] = [
    "History of malignancy or active cancer",
    "Pregnant or breastfeeding people",
    "People with uncontrolled diabetes or significant glucose dysregulation",
  ]
  save(fp, d)
  print("OK: patched tesamorelin")

def main():
  targets = {
    "bpc-157": patch_bpc_157,
    "sermorelin": patch_sermorelin,
    "tesamorelin": patch_tesamorelin,
  }
  for slug, fn in targets.items():
    fp = ROOT / "content" / "peptides" / f"{slug}.json"
    if not fp.exists():
      print(f"SKIP: missing {fp}")
      continue
    fn(fp)

if __name__ == "__main__":
  main()
