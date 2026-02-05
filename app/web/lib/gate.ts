import { redirect } from "next/navigation";
import { getViewer } from "@/lib/viewer";

export async function requirePaid() {
  const v = await getViewer();
  // Not logged in -> send to login with return path
  if (!v.user) {
    redirect("/login?next=" + encodeURIComponent("/upgrade"));
  }

  // Admin always gets access
  if (v.profile?.is_admin) return;

  // Global override OR user pro flag
  const ok = Boolean(v.forceProOn || v.profile?.is_pro);
  if (!ok) redirect("/upgrade");
}
