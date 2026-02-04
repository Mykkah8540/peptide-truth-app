import { NextResponse } from "next/server";
import { requirePaid } from "@/lib/gate";
import { listPeptides } from "@/lib/content";

export async function GET() {
  await requirePaid();

  const peptides = listPeptides().map((p: any) => ({
    slug: p.slug,
    title: p.title || p.slug,
  }));

  return NextResponse.json({ ok: true, peptides });
}
