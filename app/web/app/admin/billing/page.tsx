export const dynamic = "force-dynamic";

import { createClient } from "@supabase/supabase-js";

type BillingRow = {
  user_id: string;
  rc_app_user_id: string;
  pro_active: boolean;
  pro_expires_at: string | null;
  source: string;
  last_event_id: string | null;
  last_event_at: string | null;
  updated_at: string;
};

function supabaseService() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return createClient(url, key, { auth: { persistSession: false } });
}

function fmt(iso: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function AdminBillingPage() {
  const supa = supabaseService();

  const { data: rows, error } = await supa
    .from("billing_entitlements")
    .select("*")
    .order("updated_at", { ascending: false });

  let emailMap: Record<string, string> = {};
  try {
    const { data: usersData } = await supa.auth.admin.listUsers({ perPage: 1000 });
    for (const u of usersData?.users ?? []) {
      emailMap[u.id] = u.email ?? u.id;
    }
  } catch {
    // non-fatal
  }

  const entitlements: BillingRow[] = rows ?? [];
  const activeCount = entitlements.filter((r) => r.pro_active).length;
  const totalCount = entitlements.length;

  return (
    <>
      <div className="pt-admin__page-header">
        <div className="pt-admin__page-title">Billing</div>
        <div className="pt-admin__page-sub">
          Subscriber list synced from RevenueCat webhooks. Price and products are managed in{" "}
          <a href="https://app.revenuecat.com" target="_blank" rel="noopener noreferrer">
            RevenueCat dashboard
          </a>.
        </div>
      </div>

      <div className="pt-admin__stat-grid">
        <div className="pt-admin__stat">
          <div className="pt-admin__stat-num">{activeCount}</div>
          <div className="pt-admin__stat-label">Active subscribers</div>
        </div>
        <div className="pt-admin__stat">
          <div className="pt-admin__stat-num">{totalCount}</div>
          <div className="pt-admin__stat-label">Total ever subscribed</div>
        </div>
        <div className="pt-admin__stat">
          <div className="pt-admin__stat-num">${(activeCount * 4.99).toFixed(2)}</div>
          <div className="pt-admin__stat-label">Est. MRR @ $4.99</div>
        </div>
      </div>

      {error && (
        <div className="pt-admin__error-card">
          Error loading billing data: {error.message}
        </div>
      )}

      {entitlements.length === 0 ? (
        <div className="pt-admin__card">
          <div className="pt-admin__empty">
            No subscribers yet. Once someone purchases, their entitlement will appear here after the RevenueCat webhook fires.
          </div>
        </div>
      ) : (
        <div className="pt-admin__table-wrap">
          <table className="pt-admin__table">
            <thead>
              <tr>
                <th>User</th>
                <th>Status</th>
                <th>Expires</th>
                <th>Last updated</th>
                <th>RC user ID</th>
              </tr>
            </thead>
            <tbody>
              {entitlements.map((r) => (
                <tr key={r.user_id}>
                  <td>
                    <div style={{ fontWeight: 700 }}>{emailMap[r.user_id] ?? r.user_id}</div>
                    <div className="pt-admin__mono">{r.user_id}</div>
                  </td>
                  <td>
                    <span className={`pt-admin__badge ${r.pro_active ? "pt-admin__badge--active" : "pt-admin__badge--inactive"}`}>
                      {r.pro_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={{ color: "rgba(0,0,0,0.5)" }}>
                    {r.pro_expires_at ? fmt(r.pro_expires_at) : r.pro_active ? "Lifetime" : "—"}
                  </td>
                  <td style={{ color: "rgba(0,0,0,0.5)" }}>{fmt(r.updated_at)}</td>
                  <td>
                    <a
                      href={`https://app.revenuecat.com/customers/app/${encodeURIComponent(r.rc_app_user_id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pt-admin__mono"
                      style={{ textDecoration: "underline" }}
                      title="View in RevenueCat"
                    >
                      {r.rc_app_user_id.slice(0, 16)}…
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="pt-admin__card">
        <div className="pt-admin__note">
          <strong style={{ color: "#0f1a2e" }}>To change the price:</strong>{" "}
          Go to{" "}
          <a href="https://app.revenuecat.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline", fontWeight: 700, color: "rgba(0,0,0,0.6)" }}>
            app.revenuecat.com
          </a>{" "}
          → Products → update the Stripe product price → update your Offering package. The app picks up the new price automatically on next page load.
        </div>
      </div>
    </>
  );
}
