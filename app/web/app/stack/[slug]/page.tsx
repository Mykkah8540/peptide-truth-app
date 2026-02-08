import { notFound } from "next/navigation";
import StackViewer from "@/components/StackViewer";
import { loadStackV1BySlug } from "@/lib/content";
import { requirePaid } from "@/lib/gate";

export default async function StackPage(props: { params: Promise<{ slug: string }> }) {
 await requirePaid();

 const { slug } = await props.params;
 const doc = loadStackV1BySlug(slug);
 if (!doc) return notFound();

 return <StackViewer stack={doc} />;
}
