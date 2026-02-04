import BackHomeLink from "@/components/BackHomeLink";
import StackSuggestionForm from "@/components/StackSuggestionForm";
import UgcNotesSection from "@/components/UgcNotesSection";
import SuggestStackForm from "@/components/SuggestStackForm";
import { requirePaid } from "@/lib/gate";

export default async function SuggestStackPage() {
  await requirePaid();

  return (
    <main className="pt-page">
      <SuggestStackForm />

      <StackSuggestionForm ugcSlug="__global__" />

      <UgcNotesSection type="stack" slug="__global__" hideSubmit />
    </main>
  );
}
