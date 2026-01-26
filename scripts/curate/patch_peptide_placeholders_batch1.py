import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]

def load(rel):
  p = ROOT / rel
  return json.loads(p.read_text(encoding="utf-8"))

def save(rel, d):
  p = ROOT / rel
  p.write_text(json.dumps(d, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def ensure_sections(d):
  pep = d.get("peptide") or {}
  if not isinstance(pep, dict):
    pep = {}
  if "sections" not in pep or not isinstance(pep["sections"], dict):
    pep["sections"] = {}
  d["peptide"] = pep
  return pep["sections"]

def set_blocks(sections, key, blocks):
  sections[key] = blocks

def patch_practical(d, practical):
  d["practical"] = practical

def patch_one(slug, practical, overview_blocks, use_cases_blocks=None):
  rel = f"content/peptides/{slug}.json"
  d = load(rel)
  sections = ensure_sections(d)

  patch_practical(d, practical)
  set_blocks(sections, "overview", overview_blocks)
  if use_cases_blocks is not None:
    set_blocks(sections, "use_cases", use_cases_blocks)

  save(rel, d)
  print(f"OK: patched {slug}")

def main():
  # Abaloparatide (Tymlos)
  patch_one(
    "abaloparatide",
    practical={
      "bottom_line": "Abaloparatide is a prescription osteoporosis medicine used to reduce fracture risk in high-risk patients. Outside of supervised medical care, the main real-world risk is using a potent bone-active drug without appropriate evaluation and monitoring.",
      "benefits": [
        "Lower fracture risk in indicated high-risk osteoporosis patients (medical use)",
        "Increases bone mineral density over time (medical use)"
      ],
      "side_effects_common": [
        "Dizziness or feeling light-headed (especially early on)",
        "Nausea or stomach upset",
        "Headache",
        "Palpitations / fast heart rate",
        "Injection-site irritation"
      ],
      "side_effects_serious": [
        "Fainting or severe dizziness",
        "Chest pain, severe palpitations, or shortness of breath",
        "Signs of high calcium (confusion, severe constipation, vomiting, weakness)"
      ],
      "who_should_be_cautious": [
        "Anyone with unexplained high calcium or disorders of calcium metabolism",
        "People with prior skeletal radiation therapy or certain bone cancers (contraindication context)",
        "Pregnant or breastfeeding individuals",
        "Adolescents / still-developing skeleton (not an appropriate context)"
      ]
    },
    overview_blocks=[
      {
        "title": "What it is",
        "text": "Abaloparatide is a synthetic peptide that activates the parathyroid hormone receptor pathway and is used as a prescription treatment for osteoporosis in specific high-risk patients."
      },
      {
        "title": "What people use it for in practice",
        "text": "In legitimate use, it’s a clinician-directed osteoporosis therapy aimed at lowering fracture risk. It’s not a general wellness compound and isn’t a fit for self-directed experimentation."
      }
    ],
    use_cases_blocks=[
      {
        "title": "Intended use context",
        "text": "This is primarily a medical osteoporosis therapy. Pep-Talk does not provide dosing or protocols."
      }
    ],
  )

  # BPC-157
  patch_one(
    "bpc-157",
    practical={
      "bottom_line": "BPC-157 is commonly discussed for tendon/ligament and gut irritation complaints, but the strongest supportive evidence is preclinical. The biggest real-world risk is unregulated sourcing and non-medical injection practices—not a well-defined clinical safety profile.",
      "benefits": [
        "Often discussed for soft-tissue recovery support (largely anecdotal)",
        "Frequently discussed for GI irritation/comfort (evidence mixed; human data limited)",
        "Sometimes discussed for return-to-training support during rehab (anecdotal)"
      ],
      "side_effects_common": [
        "Injection-site irritation (when injected)",
        "Headache or fatigue (reports vary)",
        "GI upset or appetite change (reports vary)"
      ],
      "side_effects_serious": [
        "Allergic reaction signs (hives, facial swelling, trouble breathing)",
        "Fever, severe redness, or drainage at injection site (possible infection/contamination)",
        "Chest pain or severe shortness of breath"
      ],
      "who_should_be_cautious": [
        "People on anticoagulants/antiplatelets or NSAIDs (interaction/bleeding-risk context should be clinician-reviewed)",
        "Autoimmune disease history or prior significant allergic reactions (uncertain immune effects)",
        "Pregnant or breastfeeding individuals",
        "Adolescents / competitive athletes (uncertainty + anti-doping rules)"
      ]
    },
    overview_blocks=[
      {
        "title": "What it is",
        "text": "BPC-157 is a synthetic 15-amino-acid peptide widely discussed in injury-recovery and GI contexts. Much of the optimistic literature comes from animal and cell models; human clinical evidence is limited and not definitive."
      },
      {
        "title": "What drives real-world risk",
        "text": "The practical risk is less about a well-characterized side-effect profile and more about product quality, contamination, and non-medical injection practices in an unregulated market."
      }
    ],
  )

  # MK-677 (Ibutamoren)
  patch_one(
    "mk-677",
    practical={
      "bottom_line": "MK-677 (ibutamoren) is an investigational oral ghrelin-receptor agonist that increases growth hormone/IGF-1 signaling. It’s often discussed for sleep, appetite, and body-composition goals, but tradeoffs commonly involve appetite/weight gain, fluid retention, and glucose tolerance concerns.",
      "benefits": [
        "Increases GH/IGF-1 signaling in studies (mechanistic effect)",
        "Often discussed for sleep quality or recovery feelings (mixed reports)",
        "Often discussed for appetite and weight gain (common effect)"
      ],
      "side_effects_common": [
        "Increased appetite / cravings",
        "Water retention or puffiness",
        "Fatigue or lethargy",
        "Numbness/tingling or carpal-tunnel-like complaints (reports vary)",
        "Vivid dreams (reports vary)"
      ],
      "side_effects_serious": [
        "Worsening blood sugar control signs (excess thirst/urination, blurry vision)",
        "Rapid swelling, shortness of breath, or chest pain",
        "Severe headaches or neurologic symptoms"
      ],
      "who_should_be_cautious": [
        "Diabetes, prediabetes, metabolic syndrome, or strong family history (glucose tolerance concern)",
        "Heart failure / edema-prone conditions",
        "Pregnant or breastfeeding individuals",
        "Adolescents (growth/endocrine setpoints; not an appropriate context)"
      ]
    },
    overview_blocks=[
      {
        "title": "What it is",
        "text": "MK-677 (ibutamoren) is an investigational, oral ghrelin-receptor agonist that increases growth hormone and IGF-1 signaling. It is not approved as a general wellness compound."
      },
      {
        "title": "Why people discuss it",
        "text": "It’s commonly discussed for appetite, sleep/recovery feelings, and body-composition goals. Practical downsides frequently center on appetite/weight gain, fluid retention, and glucose tolerance."
      }
    ],
  )

if __name__ == "__main__":
  main()
