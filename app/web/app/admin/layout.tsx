import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { getUserSafe } from "@/lib/auth/getUserSafe";
import { hasAnyRole, getUserRoles } from "@/lib/auth/roles";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supa = await supabaseServer();
  const user = await getUserSafe(supa);

  if (!user) redirect("/login?next=/admin");

  // Allow admins + moderators into /admin area (long-term: moderators can be limited by page)
  const ok = await hasAnyRole(supa, user.id, ["admin", "moderator"]);
  if (!ok) {
    const roles = await getUserRoles(supa, user.id);
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="rounded-xl border p-5">
          <div className="text-sm text-muted-foreground">Pep Talk Admin</div>
          <div className="mt-1 text-2xl font-semibold">Access denied</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Your account is signed in, but it does not currently have an <span className="font-medium">admin</span> or <span className="font-medium">moderator</span> role.
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <div><span className="text-muted-foreground">User ID:</span> <span className="font-mono">{user.id}</span></div>
            <div><span className="text-muted-foreground">Roles visible to server:</span> <span className="font-mono">{roles.length ? roles.join(", ") : "(none)"}</span></div>
          </div>

          <div className="mt-6 rounded-lg bg-muted p-4 text-sm">
            <div className="font-medium">Fix in Supabase (SQL Editor)</div>
            <div className="mt-2 font-mono whitespace-pre-wrap">
insert into public.user_roles (user_id, role)
values ('{user.id}', 'admin')
on conflict (user_id, role) do nothing;
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <a className="rounded-lg border px-3 py-2 text-sm hover:bg-muted" href="/">Back to site</a>
            <a className="rounded-lg border px-3 py-2 text-sm hover:bg-muted" href="/logout">Log out</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Pep Talk Admin</div>
          <div className="text-xl font-semibold">Dashboard</div>
        </div>
        <a className="text-sm underline" href="/">Back to site</a>
      </div>

      {children}
    </div>
  );
}
