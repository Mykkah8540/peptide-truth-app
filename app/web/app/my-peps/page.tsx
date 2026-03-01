import { listPeptides, listBlends } from "@/lib/content";
import { supabaseServer } from "@/lib/supabase/server";
import MyPepsClient from "@/components/MyPepsClient";
import SavedStacksSection from "@/components/SavedStacksSection";

export const dynamic = "force-dynamic";

export default async function MyPepsPage() {
  // Server-render user stacks if authenticated
  let serverStacks: Record<string, unknown>[] | null = null;
  try {
    const supa = await supabaseServer();
    const { data: auth } = await supa.auth.getUser();
    if (auth?.user) {
      const { data } = await supa
        .from("user_stacks")
        .select("*")
        .eq("user_id", auth.user.id)
        .order("updated_at", { ascending: false });
      serverStacks = data ?? [];
    }
  } catch {
    // Non-fatal: SavedStacksSection will handle empty state
  }

  return (
    <main className="pt-page">
      <section className="pt-card">
        <h1 className="pt-card-title">My Peps</h1>
        <p className="pt-card-subtext">
          Your personal workspace — saved peptides, blends, and stacks you want to revisit.
        </p>
      </section>

      <section className="pt-card">
        <MyPepsClient peptides={listPeptides()} blends={listBlends()} />
      </section>

      <SavedStacksSection initialStacks={serverStacks} />
    </main>
  );
}
