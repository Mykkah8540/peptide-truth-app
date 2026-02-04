import BackHomeLink from "@/components/BackHomeLink";
import UgcNotesSection from "@/components/UgcNotesSection";
import { requirePaid } from "@/lib/gate";

export default async function SuggestStackPage() {
  await requirePaid();

  return (
    <main className="pt-page">
      <section className="pt-card">
        <div style={{ marginBottom: 10 }}>
          <BackHomeLink />
        </div>

        <h1 className="pt-card-title" style={{ margin: 0 }}>
          Suggest a Stack
        </h1>

        <p className="pt-card-subtext" style={{ marginTop: 10 }}>
          Drop an idea for a synergy-first stack. Keep it educational — no dosing, protocols, schedules, or instructions. Submissions are moderated before appearing.
        </p>

        <p className="pt-card-subtext">
          Tip: include the goal, the peptides/blends you’d combine, and why they pair well.
        </p>
      </section>

      <UgcNotesSection type="stack" slug="__global__" />
    </main>
  );
}
