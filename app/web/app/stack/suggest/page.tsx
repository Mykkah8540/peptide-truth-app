import BackHomeLink from "@/components/BackHomeLink";
import StackSuggestionForm from "@/components/StackSuggestionForm";
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

        <p className="pt-card-subtext" style={{ marginTop: 0 }}>
          Suggest a synergy-first stack idea. Keep it educational — no dosing, protocols, schedules, or instructions.
        </p>
      </section>

      <StackSuggestionForm ugcSlug="__global__" />

      <UgcNotesSection type="stack" slug="__global__" />
    </main>
  );
}
