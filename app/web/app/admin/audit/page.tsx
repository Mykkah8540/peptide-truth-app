import { headers } from "next/headers";
type AuditRow = {
  id: string;
  created_at: string;
  actor_user_id: string | null;
  actor_email: string | null;
  actor_role: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  ip: string | null;
  request_id: string | null;
};

type AuditResp = {
  ok: boolean;
  error?: string;
  rows?: AuditRow[];
  nextCursor?: string | null;
};

async function fetchAudit(cursor?: string | null) {
  const h = await headers();
  const host = h.get("host") || "localhost:3000";
  const proto = h.get("x-forwarded-proto") || "http";

  const url = new URL(`/api/admin/audit`, `${proto}://${host}`);
  url.searchParams.set("limit", "50");
  if (cursor) url.searchParams.set("cursor", cursor);

  const res = await fetch(url.toString(), { cache: "no-store" });
  const data = (await res.json()) as AuditResp;
  return { res, data };
}

function fmt(ts: string) {
  const d = new Date(ts);
  return Number.isNaN(d.getTime()) ? ts : d.toLocaleString();
}

export default async function AdminAudit({
  searchParams,
}: {
  searchParams?: { cursor?: string };
}) {
  const cursor = searchParams?.cursor ? String(searchParams.cursor) : null;

  const { res, data } = await fetchAudit(cursor);

  if (!res.ok || !data.ok) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border p-4">
          <div className="text-lg font-semibold">Audit</div>
          <div className="text-sm text-muted-foreground">
            Admin event log viewer (read-only).
          </div>
        </div>
        <div className="rounded-xl border p-4 text-sm">
          <div className="font-medium">Failed to load audit events</div>
          <div className="text-muted-foreground">
            {data?.error || `HTTP ${res.status}`}
          </div>
        </div>
      </div>
    );
  }

  const rows = data.rows || [];
  const nextCursor = data.nextCursor || null;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-4">
        <div className="text-lg font-semibold">Audit</div>
        <div className="text-sm text-muted-foreground">
          Admin event log viewer (read-only).
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border p-4 text-sm text-muted-foreground">
          No audit events yet.
        </div>
      ) : (
        <div className="rounded-xl border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/30">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Time</th>
                  <th className="px-3 py-2 text-left font-medium">Action</th>
                  <th className="px-3 py-2 text-left font-medium">Entity</th>
                  <th className="px-3 py-2 text-left font-medium">Actor</th>
                  <th className="px-3 py-2 text-left font-medium">Request</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b last:border-0">
                    <td className="px-3 py-2 whitespace-nowrap">{fmt(r.created_at)}</td>
                    <td className="px-3 py-2">{r.action}</td>
                    <td className="px-3 py-2">
                      {r.entity_type ? (
                        <span className="text-muted-foreground">
                          {r.entity_type}
                          {r.entity_id ? `:${r.entity_id}` : ""}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {r.actor_email || r.actor_user_id || "—"}
                    </td>
                    <td className="px-3 py-2">
                      <span className="text-muted-foreground">
                        {r.request_id || "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          Showing {rows.length} event(s)
        </div>
        {nextCursor ? (
          <a
            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-muted"
            href={`/admin/audit?cursor=${encodeURIComponent(nextCursor)}`}
          >
            Next →
          </a>
        ) : (
          <span className="text-xs text-muted-foreground">End</span>
        )}
      </div>
    </div>
  );
}
