import { readFileSync, existsSync } from "node:fs";
import path from "node:path";

export type PeptideDoc = any;
export type BlendDoc = any;

function repoRoot(): string {
  // app/web -> repo root is ../..
  return path.resolve(process.cwd(), "..", "..");
}

export function loadPeptideBySlug(slug: string): PeptideDoc {
  const fp = path.join(repoRoot(), "content", "peptides", `${slug}.json`);
  if (!existsSync(fp)) {
    throw new Error(`Peptide not found: ${slug} (${fp})`);
  }
  const raw = readFileSync(fp, "utf-8");
  return JSON.parse(raw);
}

export function loadBlendBySlug(slug: string): BlendDoc {
  const fp = path.join(repoRoot(), "content", "blends", `${slug}.json`);
  if (!existsSync(fp)) {
    throw new Error(`Blend not found: ${slug} (${fp})`);
  }
  const raw = readFileSync(fp, "utf-8");
  return JSON.parse(raw);
}
