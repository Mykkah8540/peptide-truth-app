import { supabaseServer } from "@/lib/supabase/server";
import { getUserSafe } from "@/lib/auth/getUserSafe";
import { hasAnyRole, getUserRoles } from "@/lib/auth/roles";

export default async function AdminRoles() {
  const supa = await supabaseServer();
  const user = await getUserSafe(supa);

  if (!user) {
    return (
      <div className="rounded-xl border p-4">
        <div className="text-lg font-semibold">Roles</div>
        <div className="text-sm text-muted-foreground">Please log in.</div>
      </div>
    );
  }

  // Roles admin-only. Moderators should NOT manage access control.
  const isAdmin = await hasAnyRole(supa, user.id, ["admin"]);
  const myRoles = await getUserRoles(supa, user.id);

  if (!isAdmin) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border p-4">
          <div className="text-lg font-semibold">Roles</div>
          <div className="text-sm text-muted-foreground">
            Access denied. Only <span className="font-medium">admin</span> can manage roles.
          </div>
        </div>
        <div className="rounded-xl border p-4 text-sm">
          <div><span className="text-muted-foreground">User ID:</span> <span className="font-mono">{user.id}</span></div>
          <div><span className="text-muted-foreground">Your roles:</span> <span className="font-mono">{myRoles.length ? myRoles.join(", ") : "(none)"}</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-4">
        <div className="text-lg font-semibold">Roles</div>
        <div className="text-sm text-muted-foreground">
          Grant moderators access without giving them source access. Use user_id + role.
        </div>
      </div>

      <form className="rounded-xl border p-4 space-y-3" action="/api/admin/roles" method="post">
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="user_id">User ID (uuid)</label>
          <input
            id="user_id"
            name="user_id"
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            className="w-full rounded-lg border px-3 py-2 text-sm"
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="role">Role</label>
          <select id="role" name="role" className="w-full rounded-lg border px-3 py-2 text-sm" defaultValue="moderator">
            <option value="moderator">moderator</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button name="op" value="add" className="rounded-lg border px-3 py-2 text-sm hover:bg-muted">
            Add role
          </button>
          <button name="op" value="remove" className="rounded-lg border px-3 py-2 text-sm hover:bg-muted">
            Remove role
          </button>
        </div>

        <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
          Tip: find a user’s ID in Supabase Auth → Users. Your ID is also shown on the /admin access-denied debug panel.
        </div>
      </form>
    </div>
  );
}
