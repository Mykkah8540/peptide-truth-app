#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PEPTIDES_DIR = ROOT / "content" / "peptides"

SCHEMA = "practical_block_v1"

def load(p: Path) -> dict:
  return json.loads(p.read_text(encoding="utf-8"))

def save(p: Path, d: dict) -> None:
  p.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def ensure_practical(doc: dict) -> dict:
  # Practical can be top-level (preferred) or nested; standardize to top-level.
  pr = doc.get("practical")
  if not isinstance(pr, dict):
    pr = {}
    doc["practical"] = pr

  pr["schema_version"] = SCHEMA

  pr.setdefault("bottom_line", "")
  pr.setdefault("benefits", [])
  pr.setdefault("side_effects_common", [])
  pr.setdefault("side_effects_serious", [])
  pr.setdefault("who_should_be_cautious", [])

  # Ensure correct types
  for k in ["benefits", "side_effects_common", "side_effects_serious", "who_should_be_cautious"]:
    if not isinstance(pr.get(k), list):
      pr[k] = []
  for k in ["bottom_line"]:
    if not isinstance(pr.get(k), str):
      pr[k] = str(pr.get(k) or "")

  return pr

def patch(slug: str, bottom_line: str, benefits: list[str], common: list[str], serious: list[str], cautious: list[str]) -> None:
  p = PEPTIDES_DIR / f"{slug}.json"
  if not p.exists():
    print(f"SKIP: {slug} (missing file)")
    return

  d = load(p)
  pr = ensure_practical(d)

  pr["bottom_line"] = bottom_line
  pr["benefits"] = benefits
  pr["side_effects_common"] = common
  pr["side_effects_serious"] = serious
  pr["who_should_be_cautious"] = cautious

  save(p, d)
  print(f"OK: patched {slug}")

def main():
  # Batch 4 targets: high-traffic / high-visibility peptides that must not look “empty”.
  patch(
    "bpc-157",
    bottom_line=(
      "Often discussed for tendon/ligament and gut-related recovery. Most supportive evidence is preclinical; "
      "human evidence is limited and heterogeneous. The biggest real-world risk driver is unregulated sourcing "
      "and non-medical administration practices."
    ),
    benefits=[
      "Interest in soft tissue recovery and return-to-training support (evidence quality mixed; human data limited)",
      "Interest in GI symptom support and gut barrier/inflammation pathways (mostly preclinical)",
      "Used in rehab conversations for overuse injuries (largely anecdotal)",
    ],
    common=[
      "Injection-site irritation or discomfort (in real-world use contexts)",
      "Headache or fatigue reports (non-specific; causality unclear)",
      "GI upset or appetite changes (reported; inconsistent)",
    ],
    serious=[
      "Unexpected allergic-type reactions (rare; seek care if severe)",
      "Worsening or unusual symptoms that could indicate infection/contamination risk from sourcing/handling",
    ],
    cautious=[
      "Anyone with a history of severe allergies or prior reactions to injectables",
      "People using anticoagulants/antiplatelets or NSAIDs (bleeding/bruising risk may be amplified in real-world use)",
      "Pregnancy/breastfeeding (data gaps)",
      "Under-18 athletes (developmental uncertainty + real-world use risk)",
    ],
  )

  patch(
    "tesamorelin",
    bottom_line=(
      "A prescription peptide in specific clinical contexts. Outside that context, discussions often focus on "
      "body composition and metabolic effects. Practical use requires careful framing: real effects may exist, "
      "but risks and contraindications matter and depend on the person."
    ),
    benefits=[
      "Body-composition interest (fat distribution / metabolic markers) in appropriate medical contexts",
      "Interest in IGF-1 mediated downstream effects (interpretation depends on context)",
    ],
    common=[
      "Injection-site reactions",
      "Fluid retention or swelling",
      "Joint aches or muscle pain reports",
    ],
    serious=[
      "Glucose intolerance/worsening glycemic control in susceptible individuals",
      "Potential tumor growth concerns in those with active malignancy (context-dependent; contraindications exist)",
    ],
    cautious=[
      "Diabetes or significant insulin resistance",
      "History of malignancy or active cancer (follow medical guidance; contraindications may apply)",
      "Pregnancy/breastfeeding",
      "Under-18 athletes (endocrine setpoints + uncertainty)",
    ],
  )

  patch(
    "sermorelin",
    bottom_line=(
      "Discussed as a growth-hormone–axis modulator. Real-world interest is mostly around sleep, recovery, and "
      "body composition, but outcomes are variable and depend on baseline physiology. Evidence and claims are often overstated."
    ),
    benefits=[
      "Sleep and recovery interest (subjective outcomes vary)",
      "Body-composition curiosity (often overstated; depends heavily on baseline factors)",
    ],
    common=[
      "Injection-site irritation",
      "Headache or flushing reports",
      "Transient fatigue or dizziness reports",
    ],
    serious=[
      "Worsening glucose control in susceptible individuals (uncommon; context-dependent)",
      "Signs of significant edema or shortness of breath (seek care)",
    ],
    cautious=[
      "Diabetes/insulin resistance",
      "Active malignancy/history of malignancy (medical guidance required)",
      "Pregnancy/breastfeeding",
      "Under-18 athletes",
    ],
  )

if __name__ == "__main__":
  main()
