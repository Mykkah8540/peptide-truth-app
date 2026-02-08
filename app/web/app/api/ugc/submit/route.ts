import { NextResponse } from "next/server";
import { submitPost, type UgcEntityType } from "@/lib/ugc/store";
import { detectDosingOrProtocol } from "@/lib/ugc/noDosing";

export async function POST(req: Request) {
 const body = await req.json().catch(() => null);
 const entityType = String(body?.type || "").trim() as UgcEntityType;
 const entitySlug = String(body?.slug || "").trim();
 const username = String(body?.username || "").trim();
 const text = String(body?.text || "").trim();
 const ack = body?.ack_no_dosing === true;

 if (!entityType || !entitySlug || !username || !text) {
  return NextResponse.json({ ok: false, error: "missing fields" }, { status: 400 });
 }

 // DB currently supports peptide+blend+stack
 if (entityType !== "peptide" && entityType !== "blend" && entityType !== "stack") {
  return NextResponse.json({ ok: false, error: "invalid type" }, { status: 400 });
 }
if (!ack) {
  return NextResponse.json({ ok: false, error: "ack_required" }, { status: 400 });
 }

 const det = detectDosingOrProtocol(text);
 if (det.blocked) {
  return NextResponse.json(
   { ok: false, error: "contains_dosing_or_protocol", hits: det.hits },
   { status: 400 }
  );
 }

 const post = await submitPost({
  entityType,
  entitySlug,
  username,
  text,
  flags: { possibleDosing: false },
 });

 return NextResponse.json({ ok: true, post });
}
