import { ugcPool } from "@/lib/ugc/db";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserSafe } from "@/lib/auth/getUserSafe";
import { getUserRoles } from "@/lib/auth/roles";

type StatBlock = {
  pending: number;
  approved: number;
  rejected: number;
  archived: number;
  trash: number;
  flaggedPending: number;
};

async function getStats(): Promise<StatBlock> {
  const pool = ugcPool();

  const countsRes = await pool.query(`
    select status, count(*)::int as n
    from public.ugc_posts
    group by status
  `);

  const flaggedRes = await pool.query(`
    select count(*)::int as n
    from public.ugc_posts
    where status = 'pending'
      and flags is not null
      and flags <> '{}'::jsonb
  `);

  const counts = Object.fromEntries(countsRes.rows.map((r: any) => [String(r.status), Number(r.n)]));

  return {
    pending: Number(counts["pending"] ?? 0),
    approved: Number(counts["approved"] ?? 0),
    rejected: Number(counts["rejected"] ?? 0),
    archived: Number(counts["archived"] ?? 0),
    trash: Number(counts["trash"] ?? 0),
    flaggedPending: Number(flaggedRes.rows?.[0]?.n ?? 0),
  };
}

function MetricCard(props: { label: string; value: number; hint?: string }) {
  return (
    <div className="rounded-xl border p-4">
      <div className="text-sm text-muted-foreground">{props.label}</div>
      <div className="mt-1 text-3xl font-semibold">{props.value}</div>
      {props.hint ? <div className="mt-1 text-xs text-muted-foreground">{props.hint}</div> : null}
    </div>
  );
}

function ToolCard(props: { href: string; title: string; desc: string }) {
  return (
    <a className="rounded-xl border p-4 hover:bg-muted" href={props.href}>
      <div className="font-medium">{props.title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{props.desc}</div>
    </a>
  );
}

export default async function AdminHome() {
  const supa = await supabaseServer();
  const user = await getUserSafe(supa);

  // AdminLayout already gates access, but showing identity is useful.
  const roles = user ? await getUserRoles(supa, user.id) : [];
  const stats = await getStats();

  const roleLabel =
    roles.includes("admin") ? "admin" : roles.includes("moderator") ? "moderator" : "unknown";

  return (
    <div className="space-y-6">
      <div className="rounded-xl border p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-sm text-muted-foreground">Pep Talk Admin</div>
            <div className="text-2xl font-semibold">Control Panel</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Moderation-first tools with SaaS-style ops modules. Access is controlled by DB roles.
            </div>
          </div>

          <div className="rounded-xl border px-3 py-2 text-sm">
            <div className="text-muted-foreground">Signed in as</div>
            <div className="font-medium">{user?.email ?? "unknown"}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              role: <span className="font-mono">{roleLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard label="Pending UGC" value={stats.pending} hint="Needs review" />
        <MetricCard label="Flagged Pending" value={stats.flaggedPending} hint="Pending with flags" />
        <MetricCard label="Approved" value={stats.approved} hint="Live on site" />
        <MetricCard label="Rejected" value={stats.rejected} hint="Not published" />
        <MetricCard label="Archived" value={stats.archived} hint="Hidden for later" />
        <MetricCard label="Trash" value={stats.trash} hint="Discarded" />
      </div>

      <div className="rounded-xl border p-4">
        <div className="text-lg font-semibold">Admin Tools</div>
        <div className="mt-1 text-sm text-muted-foreground">
          Enter modules below. Moderators should live here, not in source files.
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ToolCard href="/admin/ugc" title="UGC Moderation" desc="Review, approve, reject, archive, triage" />
          <ToolCard href="/admin/roles" title="Role Management" desc="Assign admin/moderator access (admin-only)" />
          <ToolCard href="/admin/flags" title="Feature Flags" desc="Operational toggles and controls" />
          <ToolCard href="/admin/audit" title="Audit Trail" desc="Moderation history and events (coming soon)" />
          <ToolCard href="/admin/ops" title="Ops & Health" desc="System checks and diagnostics (coming soon)" />
        </div>
      </div>
    </div>
  );
}
