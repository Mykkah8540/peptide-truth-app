import StackBuilderClient from "@/components/StackBuilderClient";
import { loadStackBuilderGoals, loadTopicPageV1BySlug, listTopics } from "@/lib/content";
import { requirePaid } from "@/lib/gate";

type GoalsDoc = NonNullable<ReturnType<typeof loadStackBuilderGoals>>;
function firstText(blocks: any): string {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";
  const t = blocks?.[0]?.text;
  return typeof t === "string" ? t : "";
}

export default async function StackBuilderPage() {
  await requirePaid();

  const goalsDoc = loadStackBuilderGoals();

  const goals = ((goalsDoc?.goals ?? []) as GoalsDoc["goals"]).map((g) => ({
    goal_id: g.goal_id,
    title: g.title,
    description: g.description ?? "",
    topic_ids: [
      ...(g.primary_topic_id ? [g.primary_topic_id] : []),
      ...(Array.isArray(g.secondary_topic_ids) ? g.secondary_topic_ids : []),
    ],
  }));

  // Build topic cards from actual topic_page_v1 docs
  const topicIndex = listTopics(); // uses file list; safe
  const topics = topicIndex.map((t) => {
    const doc = loadTopicPageV1BySlug(t.slug);
    const tp = doc?.topic_page;

    const groups = Array.isArray(tp?.peptide_groups)
      ? tp!.peptide_groups!.map((g) => ({
          group_id: g.group_id ?? undefined,
          title: g.title,
          description: g.description ?? "",
          peptides: Array.isArray(g.peptides) ? g.peptides : [],
          blends: Array.isArray(g.blends) ? g.blends : [],
        }))
      : [];

    return {
      slug: t.slug,
      title: tp?.title ?? t.title,
      introText: firstText(tp?.intro),
      groups,
      missing: !doc,
    };
  });

  return <StackBuilderClient goals={goals} topics={topics} />;
}
