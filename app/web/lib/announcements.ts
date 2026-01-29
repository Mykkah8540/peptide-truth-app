export type AnnouncementConfig = {
  id: string;
  title: string;
  body: string;
  force: boolean;
};

function s(v: any): string {
  return typeof v === "string" ? v.trim() : "";
}

export function getAnnouncementConfig(): AnnouncementConfig | null {
  // Set these in env when you want to show an update:
  // NEXT_PUBLIC_ANNOUNCEMENT_ID="2026-01-29-v1"
  // NEXT_PUBLIC_ANNOUNCEMENT_TITLE="Update available"
  // NEXT_PUBLIC_ANNOUNCEMENT_BODY="What changed..."
  // NEXT_PUBLIC_ANNOUNCEMENT_FORCE="1"   (optional)
  const id = s(process.env.NEXT_PUBLIC_ANNOUNCEMENT_ID);
  if (!id) return null;

  const title = s(process.env.NEXT_PUBLIC_ANNOUNCEMENT_TITLE) || "Update";
  const body = s(process.env.NEXT_PUBLIC_ANNOUNCEMENT_BODY) || "An update is available.";
  const force = s(process.env.NEXT_PUBLIC_ANNOUNCEMENT_FORCE) === "1";

  return { id, title, body, force };
}
