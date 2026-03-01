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

  // Fetch all billing entitlements
  const { data: rows, error } = await supa
    .from("billing_entitlements")
    .select("*")
    .order("updated_at", { ascending: false });

  // Fetch user emails via auth admin API
  let emailMap: Record<string, string> = {};
  try {
    const { data: usersData } = await supa.auth.admin.listUsers({ perPage: 1000 });
    for (const u of usersData?.users ?? []) {
      emailMap[u.id] = u.email ?? u.id;
    }
  } catch {
    // non-fatal — just show user_ids if emails unavailable
  }

  const entitlements: BillingRow[] = rows ?? [];
  const activeCount = entitlements.filter((r) => r.pro_active).length;
  const totalCount = entitlements.length;

  return (
    <div className="space-y-4">

      {/* Header */}
      <div className="rounded-xl border p-4">
        <div className="text-lg font-semibold">Billing</div>
        <div className="text-sm text-muted-foreground">
          Subscriber list synced from RevenueCat webhooks. Price and products are managed in{" "}
          <a
            href="https://app.revenuecat.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            RevenueCat dashboard
          </a>
          .
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border p-4">
          <div className="text-2xl font-bold">{activeCount}</div>
          <div className="text-sm text-muted-foreground">Active subscribers</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-2xl font-bold">{totalCount}</div>
          <div className="text-sm text-muted-foreground">Total ever subscribed</div>
        </div>
        <div className="rounded-xl border p-4">
          <div className="text-2xl font-bold">
            ${(activeCount * 4.99).toFixed(2)}
          </div>
          <div className="text-sm text-muted-foreground">Est. MRR @ $4.99</div>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Error loading billing data: {error.message}
        </div>
      )}

      {/* Subscriber table */}
      {entitlements.length === 0 ? (
        <div className="rounded-xl border p-6 text-center text-sm text-muted-foreground">
          No subscribers yet. Once someone purchases, their entitlement will appear here after the RevenueCat webhook fires.
        </div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 text-left font-medium">User</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Expires</th>
                <th className="px-4 py-3 text-left font-medium">Last updated</th>
                <th className="px-4 py-3 text-left font-medium">RC user ID</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {entitlements.map((r) => (
                <tr key={r.user_id} className="hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      {emailMap[r.user_id] ?? r.user_id}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {r.user_id}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        r.pro_active
                          ? "inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800"
                          : "inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-semibold text-zinc-600"
                      }
                    >
                      {r.pro_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {r.pro_expires_at ? fmt(r.pro_expires_at) : r.pro_active ? "Lifetime" : "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {fmt(r.updated_at)}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    <a
                      href={`https://app.revenuecat.com/customers/app/${encodeURIComponent(r.rc_app_user_id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
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

      {/* RC link */}
      <div className="rounded-xl border p-4 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">To change the price:</span>{" "}
        Go to{" "}
        <a
          href="https://app.revenuecat.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          app.revenuecat.com
        </a>{" "}
        → Products → update the Stripe product price → update your Offering package. The app picks up the new price automatically on next page load.
      </div>

    </div>
  );
}
