export const dynamic = "force-dynamic";

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
      <>
        <div className="pt-admin__page-header">
          <div className="pt-admin__page-title">Audit</div>
          <div className="pt-admin__page-sub">Admin event log viewer (read-only).</div>
        </div>
        <div className="pt-admin__error-card">
          <strong>Failed to load audit events</strong>
          <div style={{ marginTop: 4, opacity: 0.7 }}>{data?.error || `HTTP ${res.status}`}</div>
        </div>
      </>
    );
  }

  const rows = data.rows || [];
  const nextCursor = data.nextCursor || null;

  return (
    <>
      <div className="pt-admin__page-header">
        <div className="pt-admin__page-title">Audit</div>
        <div className="pt-admin__page-sub">Admin event log viewer (read-only).</div>
      </div>

      {rows.length === 0 ? (
        <div className="pt-admin__card">
          <div className="pt-admin__empty">No audit events yet.</div>
        </div>
      ) : (
        <div className="pt-admin__table-wrap">
          <div style={{ overflowX: "auto" }}>
            <table className="pt-admin__table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Action</th>
                  <th>Entity</th>
                  <th>Actor</th>
                  <th>Request</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td style={{ whiteSpace: "nowrap" }}>{fmt(r.created_at)}</td>
                    <td style={{ fontWeight: 700 }}>{r.action}</td>
                    <td>
                      {r.entity_type ? (
                        <span className="pt-admin__mono">
                          {r.entity_type}{r.entity_id ? `:${r.entity_id}` : ""}
                        </span>
                      ) : (
                        <span style={{ opacity: 0.4 }}>—</span>
                      )}
                    </td>
                    <td>{r.actor_email || r.actor_user_id || "—"}</td>
                    <td>
                      <span className="pt-admin__mono">{r.request_id || "—"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="pt-admin__pagination">
        <div className="pt-admin__note">Showing {rows.length} event(s)</div>
        {nextCursor ? (
          <a
            className="pt-admin__pagination-link"
            href={`/admin/audit?cursor=${encodeURIComponent(nextCursor)}`}
          >
            Next →
          </a>
        ) : (
          <span className="pt-admin__note">End</span>
        )}
      </div>
    </>
  );
}
