import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import { hasAnyRole } from "@/lib/auth/roles";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supa = await supabaseServer();
  const { data: auth } = await supa.auth.getUser();
  const user = auth?.user;

  if (!user) redirect("/login?next=/admin");

  // Allow admins + moderators into /admin area (long-term: moderators can be limited by page)
  const ok = await hasAnyRole(supa, user.id, ["admin", "moderator"]);
  if (!ok) redirect("/");

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
