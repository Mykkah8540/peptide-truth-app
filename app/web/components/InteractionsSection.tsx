import ContentBlocks from "@/components/ContentBlocks";
import Link from "next/link";

type Item = {
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

function resolveInteractionHref(it: any): string | null {
  const direct = (it?.slug || it?.interaction_slug || "").toString().trim();
  if (direct) return `/interaction/${direct}`;

  const name = (it?.name || "").toString().trim();
  if (!name) return null;

  // Best-effort slugify fallback (works if interaction slugs follow slugified names)
  return `/interaction/${slugify(name)}`;
}

function renderList(label: string, items?: Item[] | null) {
  const list = (items ?? []).filter(Boolean);
  if (!list.length) return null;

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ fontSize: 13, fontWeight: 800 }}>{label}</div>
      <div style={{ marginTop: 8, display: "grid", gap: 10 }}>
        {list.map((it, idx) => {
          const name = (it.name || "").trim();
          const note = (it.risk_note || it.notes || "").trim();
          const metaParts = [
            it.confidence ? `Confidence: ${it.confidence}` : null,
            it.evidence_grade ? `Evidence: ${it.evidence_grade}` : null,
          ].filter(Boolean);

          return (
            <div key={`${label}-${idx}`} style={{ padding: 12, borderRadius: 14, background: "rgba(0,0,0,0.03)" }}>
              {(() => {
                const href = resolveInteractionHref(it);
                const label = name || "Interaction";
                return href ? (
                  <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
                    <div style={{ fontSize: 14, fontWeight: 900 }}>{label}</div>
                  </Link>
                ) : (
                  <div style={{ fontSize: 14, fontWeight: 900 }}>{label}</div>
                );
              })()}
              {metaParts.length ? <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75 }}>{metaParts.join(" · ")}</div> : null}
              {note ? <div style={{ marginTop: 8, fontSize: 13, lineHeight: 1.45 }}>{note}</div> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
    <section style={{ marginTop: 16, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.08)" }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>{heading}</h2>
      <p style={{ marginTop: 8, marginBottom: 0, fontSize: 13, opacity: 0.8, lineHeight: 1.45 }}>
        This section highlights known or suspected interaction risks with common medication/supplement classes and other peptides.
        If empty, it means this entry has not been populated yet.
      </p>

      {(interactionSummaryBlocks ?? []).length ? (
        <div style={{ marginTop: 12 }}>
          <ContentBlocks heading="" blocks={interactionSummaryBlocks ?? null} />
        </div>
      ) : null}

      {renderList("Medication classes", drugClasses)}
      {renderList("Supplement classes", supplementClasses)}
      {renderList("Other peptides", peptides)}

      {!hasStructured ? (
        <div style={{ marginTop: 12, padding: 12, borderRadius: 14, background: "rgba(0,0,0,0.03)", fontSize: 13, opacity: 0.85 }}>
          No interaction entries have been added for this peptide yet.
        </div>
      ) : null}
    </section>
  );
}
