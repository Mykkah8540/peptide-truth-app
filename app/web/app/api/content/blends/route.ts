import { NextResponse } from "next/server";
import { requirePaid } from "@/lib/gate";
import { listBlends } from "@/lib/content";

export async function GET() {
  await requirePaid();

  const blends = listBlends().map((b: any) => ({
    slug: b.slug,
    title: b.title || b.slug,
  }));

  return NextResponse.json({ ok: true, blends });
}
