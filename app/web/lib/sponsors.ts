export type Sponsor = {
  id: string;
  name: string;
  href: string;
  // Optional path under /public, e.g. "/sponsors/acme.png"
  logoSrc?: string;
  // Optional fallback label if no image
  label?: string;
};

function s(v: any): string {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Sponsors are configured via a single env var so you can deploy without code changes:
 * NEXT_PUBLIC_SPONSORS_JSON='[{"id":"acme","name":"ACME Lab","href":"https://example.com","logoSrc":"/sponsors/acme.png"}]'
 *
 * If unset/invalid => returns [].
 */
export function getSponsors(): Sponsor[] {
  const raw = s(process.env.NEXT_PUBLIC_SPONSORS_JSON);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const out: Sponsor[] = [];
    for (const x of parsed) {
      const id = s(x?.id);
      const name = s(x?.name);
      const href = s(x?.href);
      const logoSrc = s(x?.logoSrc) || undefined;
      const label = s(x?.label) || undefined;
      if (!id || !name || !href) continue;
      out.push({ id, name, href, logoSrc, label });
    }
    return out;
  } catch {
    return [];
  }
}
