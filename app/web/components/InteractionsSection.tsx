import ContentBlocks from "@/components/ContentBlocks";
import Link from "next/link";
import { listInteractions } from "@/lib/content";

type Item = {
  title?: string;
  name?: string;
    slug?: string;
  interaction_slug?: string;
risk_note?: string;
  confidence?: string;
  evidence_grade?: string;
  notes?: string;
};

type Props = {
  heading?: string;
  drugClasses?: Item[] | null;
  supplementClasses?: Item[] | null;
  peptides?: Item[] | null;
  interactionSummaryBlocks?: any[] | null;
};


function slugify(s: string) {
  return (s || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const __interactionTitleToSlug = (() => {
  try {
    const list = listInteractions();
    const m = new Map<string, string>();
    for (const it of list) {
      const slug = String((it as any)?.slug ?? "").trim();
      const title = String((it as any)?.title ?? "").trim();
      if (slug && title) m.set(title.toLowerCase(), slug);
      // Also index common variants if present
      const name = String((it as any)?.name ?? "").trim();
      if (slug && name) m.set(name.toLowerCase(), slug);
    }
    return m;
  } catch {
    return new Map<string, string>();
  }
})();

function resolveInteractionHref(it: any): string | null {
  const direct = (it?.slug || it?.interaction_slug || "").toString().trim();
  if (direct) return `/interaction/${direct}`;

  const name = (it?.name || "").toString().trim();
  if (!name) return null;

  // Prefer governed slugs from interactions index (title/name -> slug)
  const hit = __interactionTitleToSlug.get(name.toLowerCase());
  if (hit) return `/interaction/${hit}`;

  // Last-resort fallback: slugify (may not match governed slugs)
  return `/interaction/${slugify(name)}`;
}

function renderList(label: string, items?: Item[] | null, opts?: { showNone?: boolean }) {
    const raw = (items ?? []).filter(Boolean);

    // Normalize strings into { name } items, and filter out items with no usable label.
    const list: Item[] = raw
      .map((it: any) => (typeof it === "string" ? ({ name: it } as any) : it))
      .filter((it: any) => {
        const name = String(it?.name ?? it?.title ?? "").trim();
        const note = String(it?.risk_note ?? it?.notes ?? "").trim();
        // Keep if it has either a label or a note (note-only can still be meaningful)
        return Boolean(name || note);
      });

    if (!list.length) {
      if (opts?.showNone) {
        return (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 800 }}>{label}</div>
            <div style={{ marginTop: 8, fontSize: 13, opacity: 0.55 }}>None</div>
          </div>
        );
      }
      return null;
    }

    return (
      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 800 }}>{label}</div>
        <div style={{ marginTop: 10 }} className="pt-stack">
          {list.map((it, idx) => {
            const name = String(it.name ?? it.title ?? "").trim();
            const note = String(it.risk_note ?? it.notes ?? "").trim();
            const metaParts: string[] = [].filter(Boolean);

            return (
              <div key={`${label}-${idx}`} className="pt-item">
                {(() => {
                  const href = resolveInteractionHref(it);
                  // If we have no name, don't show a fake label; just show the note.
                  const display = name || null;
                  return display ? (
                    href ? (
                      <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
                        <div className="pt-item-title">{display}</div>
                      </Link>
                    ) : (
                      <div className="pt-item-title">{display}</div>
                    )
                  ) : null;
                })()}
                {metaParts.length ? <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>{metaParts.join(" · ")}</div> : null}
                {note ? <div className="pt-item-note" style={{ marginTop: name ? 8 : 0 }}>{note}</div> : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

const DEBUG = process.env.NEXT_PUBLIC_DEBUG_PDP === "1";

export default function InteractionsSection({
  heading = "Interactions and medication considerations",
  drugClasses,
  supplementClasses,
  peptides,
  interactionSummaryBlocks,
}: Props) {
  const hasStructured =
    (drugClasses ?? []).length > 0 ||
    (supplementClasses ?? []).length > 0 ||
    (peptides ?? []).length > 0 ||
    (interactionSummaryBlocks ?? []).length > 0;

  return (
    <section className="pt-card">
      <h2 className="pt-card-title">{heading}</h2>
      <p className="pt-card-subtext">
        This section lists interaction considerations that have been added for this peptide. If nothing appears here, it usually means there isn’t curated interaction info in the database yet.
      </p>

      {(interactionSummaryBlocks ?? []).length ? (
        <div style={{ marginTop: 12 }}>
          <ContentBlocks heading="" blocks={interactionSummaryBlocks ?? null} />
        </div>
      ) : null}

      {renderList("Medication classes", drugClasses, { showNone: hasStructured })}
      {renderList("Supplement classes", supplementClasses, { showNone: hasStructured })}
      {renderList("Other peptides", peptides, { showNone: hasStructured })}

      {!hasStructured ? (
        <div className="pt-item" style={{ opacity: 0.9 }}>
          No interaction details have been added yet.
        </div>
      ) : null}
    </section>
  );
}