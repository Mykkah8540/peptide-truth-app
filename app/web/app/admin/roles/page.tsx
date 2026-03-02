import { supabaseServer } from "@/lib/supabase/server";
import { getUserSafe } from "@/lib/auth/getUserSafe";
import { hasAnyRole, getUserRoles } from "@/lib/auth/roles";

export default async function AdminRoles() {
  const supa = await supabaseServer();
  const user = await getUserSafe(supa);

  if (!user) {
    return (
      <div className="pt-admin__page-header">
        <div className="pt-admin__page-title">Roles</div>
        <div className="pt-admin__page-sub">Please log in.</div>
      </div>
    );
  }

  const isAdmin = await hasAnyRole(supa, user.id, ["admin"]);
  const myRoles = await getUserRoles(supa, user.id);

  if (!isAdmin) {
    return (
      <>
        <div className="pt-admin__page-header">
          <div className="pt-admin__page-title">Roles</div>
          <div className="pt-admin__page-sub">
            Access denied. Only <strong>admin</strong> can manage roles.
          </div>
        </div>
        <div className="pt-admin__card">
          <div className="pt-admin__note">
            User ID: <span className="pt-admin__mono">{user.id}</span>
          </div>
          <div className="pt-admin__note" style={{ marginTop: 6 }}>
            Your roles: <span className="pt-admin__mono">{myRoles.length ? myRoles.join(", ") : "(none)"}</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="pt-admin__page-header">
        <div className="pt-admin__page-title">Roles</div>
        <div className="pt-admin__page-sub">
          Grant moderators access without giving them source access. Use user_id + role.
        </div>
      </div>

      <div className="pt-admin__card">
        <form className="pt-admin__form" action="/api/admin/roles" method="post">
          <div className="pt-admin__form-group">
            <label className="pt-admin__label" htmlFor="user_id">User ID (uuid)</label>
            <input
              id="user_id"
              name="user_id"
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              className="pt-admin__input"
              required
            />
          </div>

          <div className="pt-admin__form-group">
            <label className="pt-admin__label" htmlFor="role">Role</label>
            <select id="role" name="role" className="pt-admin__select" defaultValue="moderator">
              <option value="moderator">moderator</option>
              <option value="admin">admin</option>
            </select>
          </div>

          <div className="pt-admin__form-actions">
            <button name="op" value="add" className="pt-admin__btn pt-admin__btn--primary">
              Add role
            </button>
            <button name="op" value="remove" className="pt-admin__btn pt-admin__btn--ghost">
              Remove role
            </button>
          </div>

          <div className="pt-admin__hint">
            Tip: find a user&apos;s ID in Supabase Auth → Users. Your ID is also shown on the /admin access-denied debug panel.
          </div>
        </form>
      </div>
    </>
  );
}
