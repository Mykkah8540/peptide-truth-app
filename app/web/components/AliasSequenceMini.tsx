import React from "react";
import { isPendingText } from "@/lib/isPendingText";

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
      x.includes("curation pending") ||
      x.includes("we're reviewing the evidence") ||
      x.includes("we’re reviewing the evidence") ||
      x.includes("will exp&& this section soon")
    );
  }

  const hasPendingSeq = !!rawSeq && isPendingText(rawSeq)
  const hasRealSeq = !!rawSeq && ! isPendingText(rawSeq)

  // Keep visible if we have aliases OR a real seq OR a pending seq (so the empty-state is visible).
  if (!a.length && ! hasRealSeq && ! hasPendingSeq) return null;

  const seqDisplay = hasRealSeq ? rawSeq : "Not available yet.";

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
            {a.length > 12 ? <span className="text-xs text-neutral-500">+{a.length - 12} more</span> : null}
          </div>
        </div>
      ) : null}

      {/* Always show AA sequence row if card is visible */}
      <div className={a.length ? "mt-3" : ""}>
        <div className="text-xs font-semibold text-neutral-900">AA sequence</div>
        <div
          className={"mt-1 font-mono text-[11px] leading-snug break-all " + (hasRealSeq ? "text-neutral-500" : "text-neutral-400")}
        >
          {seqDisplay}
        </div>
      </div>
    </div>
  );
}
