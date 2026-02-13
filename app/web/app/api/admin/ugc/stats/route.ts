import { NextResponse } from "next/server";
import { isUgcAdmin } from "@/lib/ugc/adminAuth";
import { ugcPool } from "@/lib/ugc/db";

export async function GET(req: Request) {
  if (!(await isUgcAdmin(req))) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const pool = ugcPool();

  // Core moderation counts (works with current schema)
  const countsRes = await pool.query(`
    select status, count(*)::int as n
    from public.ugc_posts
    group by status
  `);

  // "Flagged" = pending posts whose flags indicate something noteworthy
  // If your flags JSON is empty for most, this still works.
  const flaggedRes = await pool.query(`
    select count(*)::int as n
    from public.ugc_posts
    where status = 'pending'
      and flags is not null
      and flags <> '{}'::jsonb
  `);

  const out = {
    counts: Object.fromEntries(countsRes.rows.map((r: any) => [String(r.status), Number(r.n)])),
    flaggedPending: Number(flaggedRes.rows?.[0]?.n ?? 0),
  };

  return NextResponse.json({ ok: true, stats: out });
}
