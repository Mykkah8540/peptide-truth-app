import InteractionsHubClient from "@/components/InteractionsHubClient";
import { loadInteractionClassesV1 } from "@/lib/content";

export default function InteractionsPage() {
  const doc = loadInteractionClassesV1();
  return <InteractionsHubClient doc={doc} />;
}
