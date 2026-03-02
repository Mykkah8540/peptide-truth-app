export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserSafe } from "@/lib/auth/getUserSafe";
import { hasAnyRole, getUserRoles } from "@/lib/auth/roles";
import AdminNav from "./_components/AdminNav";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supa = await supabaseServer();
  const user = await getUserSafe(supa);

  if (!user) redirect("/login?next=/admin");

  const ok = await hasAnyRole(supa, user.id, ["admin", "moderator"]);
  if (!ok) {
    const roles = await getUserRoles(supa, user.id);
    return (
      <div className="pt-admin">
        <div className="pt-admin__header">
          <div className="pt-admin__header-inner">
            <div>
              <div className="pt-admin__eyebrow">Pep Talk Admin</div>
              <div className="pt-admin__title">Access Denied</div>
            </div>
            <div className="pt-admin__header-actions">
              <a className="pt-admin__header-link" href="/">Back to site</a>
              <a className="pt-admin__header-link" href="/logout">Log out</a>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 640, margin: "40px auto", padding: "0 24px" }}>
          <div className="pt-admin__page-header">
            <div className="pt-admin__page-title">Access denied</div>
            <div className="pt-admin__page-sub">
              Your account is signed in but does not currently have an <strong>admin</strong> or <strong>moderator</strong> role.
            </div>
            <div style={{ marginTop: 16, display: "grid", gap: 8 }}>
              <div className="pt-admin__note">User ID: <span className="pt-admin__mono">{user.id}</span></div>
              <div className="pt-admin__note">Roles: <span className="pt-admin__mono">{roles.length ? roles.join(", ") : "(none)"}</span></div>
            </div>
            <div className="pt-admin__hint" style={{ marginTop: 16 }}>
              <strong>Fix in Supabase SQL Editor:</strong>
              <pre style={{ marginTop: 8, fontFamily: "monospace", fontSize: 12, whiteSpace: "pre-wrap" }}>
{`insert into public.user_roles (user_id, role)\nvalues ('${user.id}', 'admin')\non conflict (user_id, role) do nothing;`}
              </pre>
            </div>
            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <a className="pt-admin__btn pt-admin__btn--ghost" href="/">Back to site</a>
              <a className="pt-admin__btn pt-admin__btn--ghost" href="/logout">Log out</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-admin">
      <div className="pt-admin__header">
        <div className="pt-admin__header-inner">
          <div>
            <div className="pt-admin__eyebrow">Pep Talk Admin</div>
            <div className="pt-admin__title">Control Panel</div>
          </div>
          <div className="pt-admin__header-actions">
            <a className="pt-admin__header-link" href="/">Back to site</a>
            <a className="pt-admin__header-link" href="/logout">Log out</a>
          </div>
        </div>
      </div>

      <div className="pt-admin__body">
        <aside className="pt-admin__sidebar">
          <div className="pt-admin__nav-card">
            <div className="pt-admin__nav-section-label">Nav</div>
            <AdminNav />
          </div>
        </aside>

        <main className="pt-admin__main">
          {children}
        </main>
      </div>
    </div>
  );
}
