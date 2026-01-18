import json
from pathlib import Path

def load(p: Path):
    return json.loads(p.read_text(encoding="utf-8"))

def save(p: Path, obj):
    p.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

map_path = Path("content/topics/topic_peptide_map_v1.json")
skin_page_path = Path("content/topics/pages/skin-cosmetic-health.json")
muscle_page_path = Path("content/topics/pages/muscle-recovery.json")

ghk_path = Path("content/peptides/ghk-cu.json")
bpc_path = Path("content/peptides/bpc-157.json")

doc_map = load(map_path)
skin_page = load(skin_page_path)
muscle_page = load(muscle_page_path)

ghk = load(ghk_path)
bpc = load(bpc_path)

new_mappings = [
    {
        "topic_id": "topic_skin_cosmetic",
        "peptide_slug": "ghk-cu",
        "rationale": "Widely searched topical cosmetic peptide complex discussed for skin appearance and barrier-related goals; association reflects user interest, not endorsement.",
        "confidence": "moderate",
        "evidence_grade": "human_interventional"
    },
    {
        "topic_id": "topic_muscle_recovery",
        "peptide_slug": "bpc-157",
        "rationale": "Frequently searched in injury and recovery contexts; mapping reflects popularity and preclinical interest, not proven human benefit.",
        "confidence": "low",
        "evidence_grade": "human_observational"
    }
]

# Update mappings: dedupe + sort
seen = set()
out = []
for m in doc_map.get("mappings", []) + new_mappings:
    k = (m.get("topic_id"), m.get("peptide_slug"))
    if k not in seen:
        seen.add(k)
        out.append(m)
out.sort(key=lambda x: (x.get("topic_id", ""), x.get("peptide_slug", "")))
doc_map["mappings"] = out
save(map_path, doc_map)
print("Updated mappings:", map_path)

def peptide_entry(pep_doc, slug, why):
    return {
        "canonical_name": pep_doc["peptide"]["canonical_name"],
        "slug": slug,
        "why_people_look_it_up": why,
        "status_category": pep_doc["peptide"]["status"]["category"],
        "risk_score": pep_doc["peptide"]["risk"]["current_score"],
        "developmental_risk": pep_doc["peptide"]["risk"]["developmental_risk"],
        "evidence_snapshot": {
            "best_available_grade": pep_doc["peptide"]["risk"]["evidence_grade"],
            "human_evidence_exists": pep_doc["peptide"]["risk"]["evidence_grade"] in ("regulatory_label","rct_meta","rct","human_interventional","human_observational")
        }
    }

# Skin topic page: first group peptides alphabetical
skin_group = skin_page["topic_page"]["peptide_groups"][0]
skin_peps = [x for x in skin_group.get("peptides", []) if x.get("slug") not in ("ghk-cu",)]
skin_peps.append(peptide_entry(
    ghk, "ghk-cu",
    "Popular topical 'copper peptide' discussed for skin appearance; effects depend heavily on formulation and delivery."
))
skin_peps.sort(key=lambda x: x.get("canonical_name","").lower())
skin_group["peptides"] = skin_peps
save(skin_page_path, skin_page)
print("Updated skin topic page:", skin_page_path)

# Muscle & Recovery topic page: first group peptides alphabetical
muscle_group = muscle_page["topic_page"]["peptide_groups"][0]
muscle_peps = [x for x in muscle_group.get("peptides", []) if x.get("slug") not in ("bpc-157",)]
muscle_peps.append(peptide_entry(
    bpc, "bpc-157",
    "Often searched for tendon/ligament/muscle recovery; human evidence is limited and regulatory status is unapproved."
))
muscle_peps.sort(key=lambda x: x.get("canonical_name","").lower())
muscle_group["peptides"] = muscle_peps
save(muscle_page_path, muscle_page)
print("Updated muscle topic page:", muscle_page_path)
