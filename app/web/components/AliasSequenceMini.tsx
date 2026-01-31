import React from "react";

export default function AliasSequenceMini({
  aliases,
  aminoAcidSeq,
}: {
  aliases?: string[] | null;
  aminoAcidSeq?: string | null;
}) {
  const a = Array.isArray(aliases) ? aliases.map((s) => String(s || "").trim()).filter(Boolean) : [];
  const rawSeq = String(aminoAcidSeq || "").trim();

  function isPendingText(v: any): boolean {
    const x = String(v ?? "").trim().toLowerCase();
    if (!x) return false;
    return (
      x.includes("pep-talk curation pending") ||
      x.includes("we’re reviewing the evidence") ||
      x.includes("we're reviewing the evidence") ||
      x.includes("will expand this section soon")
    );
  }

  const seq = isPendingText(rawSeq) ? "" : rawSeq;
if (!a.length && !seq) return null;

  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-3 shadow-sm">
      {a.length ? (
        <div>
          <div className="text-xs font-semibold text-neutral-900">Also known as</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {a.slice(0, 12).map((x) => (
              <span
                key={x}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs text-neutral-800"
                title={x}
              >
                {x}
              </span>
            ))}
            {a.length > 12 ? (
              <span className="text-xs text-neutral-500">+{a.length - 12} more</span>
            ) : null}
          </div>
        </div>
      ) : null}

      {seq ? (
        <div className={a.length ? "mt-3" : ""}>
          <div className="text-xs font-semibold text-neutral-900">AA sequence</div>
          <div className="mt-1 font-mono text-[11px] leading-snug text-neutral-500 break-all">
            {seq}
          </div>
        </div>
      ) : null}
    </div>
  );
}
