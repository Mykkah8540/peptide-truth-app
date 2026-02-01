export function isPendingText(v: any): boolean {
  const x = String(v ?? "").trim().toLowerCase();
  if (!x) return false;

  // Core marker
  if (x.includes("pep-talk curation pending")) return true;

  // Common variants we have seen in placeholders
  if (x.includes("we’re reviewing the evidence")) return true;
  if (x.includes("we're reviewing the evidence")) return true;
  if (x.includes("will expand this section soon")) return true;

  return false;
}
