import json
from pathlib import Path

def load(p: Path):
    return json.loads(p.read_text(encoding="utf-8"))

def save(p: Path, obj):
    p.write_text(json.dumps(obj, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

map_path = Path("content/topics/topic_peptide_map_v1.json")

hormonal_page = Path("content/topics/pages/hormonal-endocrine.json")
injury_page   = Path("content/topics/pages/injury-healing.json")

cjc = load(Path("content/peptides/cjc-1295.json"))
tb  = load(Path("content/peptides/tb-500.json"))

m = load(map_path)
new = [
    {
        "topic_id": "topic_hormonal_endocrine",
        "peptide_slug": "cjc-1295",
        "rationale": "Often searched as a GHRH analog affecting GH/IGF signaling; mapping reflects popularity, not endorsement.",
        "confidence": "moderate",
        "evidence_grade": "human_interventional"
    },
    {
        "topic_id": "topic_injury_healing",
        "peptide_slug": "tb-500",
        "rationale": "Commonly searched recovery peptide product; mapping reflects interest and preclinical plausibility, not proven human outcomes.",
        "confidence": "low",
        "evidence_grade": tb["peptide"]["risk"]["evidence_grade"]
    }
]

seen=set()
out=[]
for x in m.get("mappings", []) + new:
    k=(x.get("topic_id"), x.get("peptide_slug"))
    if k not in seen:
        seen.add(k); out.append(x)
out.sort(key=lambda x:(x.get("topic_id",""), x.get("peptide_slug","")))
m["mappings"]=out
save(map_path, m)
print("Updated mapping:", map_path)

def add_to_topic(page_path: Path, pep_doc, slug: str, why: str):
    page = load(page_path)
    entry = {
        "canonical_name": pep_doc["peptide"]["canonical_name"],
        "slug": slug,
        "why_people_look_it_up": why,
        "status_category": pep_doc["peptide"]["status"]["category"],
        "risk_score": pep_doc["peptide"]["risk"]["current_score"],
        "developmental_risk": pep_doc["peptide"]["risk"]["developmental_risk"],
        "evidence_snapshot": {
            "best_available_grade": pep_doc["peptide"]["risk"]["evidence_grade"],
            "human_evidence_exists": pep_doc["peptide"]["risk"]["evidence_grade"] in (
                "regulatory_label","rct_meta","rct","human_interventional","human_observational"
            )
        }
    }
    group = page["topic_page"]["peptide_groups"][0]
    peps = [p for p in group.get("peptides", []) if p.get("slug") != slug]
    peps.append(entry)
    peps.sort(key=lambda x: x.get("canonical_name","").lower())
    group["peptides"] = peps
    save(page_path, page)
    print("Updated topic page:", page_path)

add_to_topic(hormonal_page, cjc, "cjc-1295",
             "Often searched for GH/IGF signaling changes; human endocrine evidence exists but long-term outcomes are uncertain.")
add_to_topic(injury_page, tb, "tb-500",
             "Often searched for injury recovery; evidence is largely preclinical and product identity may vary.")
