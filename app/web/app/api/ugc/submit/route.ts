import { NextResponse } from "next/server";
import { submitPost, type UgcEntityType } from "@/lib/ugc/store";
import { detectDosingOrProtocol } from "@/lib/ugc/noDosing";

const ALLOWED_TYPES: UgcEntityType[] = ["peptide", "blend", "stack"];

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const entityType = String(body?.type || "").trim() as UgcEntityType;
  const entitySlug = String(body?.slug || "").trim();
  const username = String(body?.username || "").trim();
  const text = String(body?.text || "").trim();
  const ack = body?.ack_no_dosing === true;

  if (!entityType || !username || !text) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(entityType)) {
    return NextResponse.json({ ok: false, error: "invalid_type" }, { status: 400 });
  }

  if (!ack) {
    return NextResponse.json({ ok: false, error: "ack_required" }, { status: 400 });
  }

  // Stack suggestions use a fixed internal slug; skip dosing detection for structured text
  const resolvedSlug = entityType === "stack" ? "__builder__" : entitySlug;
  if (entityType !== "stack" && !resolvedSlug) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  if (entityType !== "stack") {
    const det = detectDosingOrProtocol(text);
    if (det.blocked) {
      return NextResponse.json(
        { ok: false, error: "contains_dosing_or_protocol", hits: det.hits },
        { status: 400 }
      );
    }
  }

  const post = await submitPost({
    entityType,
    entitySlug: resolvedSlug,
    username,
    text,
    flags: { possibleDosing: false, source: entityType === "stack" ? "stack_builder" : "pdp" },
  });

  return NextResponse.json({ ok: true, post });
}
