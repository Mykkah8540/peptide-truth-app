import BackHomeLink from "@/components/BackHomeLink";
import StackSuggestionForm from "@/components/StackSuggestionForm";
import SuggestStackForm from "@/components/SuggestStackForm";
import { requirePaid } from "@/lib/gate";

export default async function SuggestStackPage() {
 await requirePaid();

 return (
  <main className="pt-page">
   <SuggestStackForm />

   <StackSuggestionForm ugcSlug="__global__" />
</main>
 );
}
