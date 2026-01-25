import { readFileSync } from "node:fs";
import path from "node:path";

export type RiskIndexEntity = {
  route: string;              // "peptide:<slug>" | "blend:<slug>"
  kind: "peptide" | "blend";
  slug: string;
  risk: {
    risk_score: number;       // 1..10
    risk_tier?: "low" | "moderate" | "high";
    severity?: string | null;
    likelihood?: string | null;
    evidence_grade?: string | null;
    developmental_risk?: boolean;
    unknowns_penalty?: boolean;
    computed_from_components?: boolean;
    component_slugs?: string[];
  };
  safety_links?: string[];    // safety_id list
};

export type RiskIndexV1 = {
  version: "v1";
  generated_on: string;
  counts: { entities: number; peptides: number; blends: number };
  entities: RiskIndexEntity[];
};

// Cache in-module (server only). Deterministic + fast.
let _cache: RiskIndexV1 | null = null;

function repoRoot(): string {
  // app/web/src/lib -> repo root is ../../../..
  return path.resolve(process.cwd(), "..", "..");
}

export function loadRiskIndex(): RiskIndexV1 {
  if (_cache) return _cache;

  const root = repoRoot();
  const fp = path.join(root, "content", "_index", "risk_index_v1.json");
  const raw = readFileSync(fp, "utf-8");
  const data = JSON.parse(raw) as RiskIndexV1;

  if (data?.version !== "v1" || !Array.isArray(data.entities)) {
    throw new Error("Invalid risk_index_v1.json format");
  }

  _cache = data;
  return data;
}

export function getRiskForRoute(route: string): RiskIndexEntity | null {
  const idx = loadRiskIndex();
  const hit = idx.entities.find((e) => e.route === route);
  return hit ?? null;
}

export function getRiskForPeptide(slug: string): RiskIndexEntity | null {
  return getRiskForRoute(`peptide:${slug}`);
}

export function getRiskForBlend(slug: string): RiskIndexEntity | null {
  return getRiskForRoute(`blend:${slug}`);
}

// Evidence grade UI mapping: keep user-facing copy friendly.
// Enums may be technical; UI must translate them.
export const EVIDENCE_GRADE_LABELS: Record<string, string> = {
  regulatory_label: "Regulatory label / approved use",
  rct_meta: "Strong human evidence (meta-analysis of trials)",
  rct: "Strong human evidence (randomized trial)",
  human_interventional: "Human evidence (interventional study)",
  human_observational: "Human evidence (observational study)",
  animal: "Animal evidence (no human trials)",
  in_vitro: "Lab evidence (cells/tissue)",
  mechanistic_only: "Early mechanistic evidence (no human trials)",
};

export function evidenceGradeLabel(grade?: string | null): string {
  if (!grade) return "Evidence grade unknown";
  return EVIDENCE_GRADE_LABELS[grade] ?? "Evidence grade unknown";
}
