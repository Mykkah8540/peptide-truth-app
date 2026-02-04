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

        <h1 className="pt-card-title" style={{ margin: 0 }}>
          Suggest a Stack
        </h1>

        <p className="pt-card-subtext" style={{ marginTop: 10 }}>
          Suggest a synergy-first combo. Educational only — no dosing, protocols, schedules, or instructions. Submissions are moderated before appearing.
        </p>
      </section>

      <StackSuggestionForm ugcSlug="__global__" />

      <UgcNotesSection type="stack" slug="__global__" />
    </main>
  );
}
