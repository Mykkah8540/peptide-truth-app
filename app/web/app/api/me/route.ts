import { NextResponse } from "next/server";
import { getViewer } from "@/lib/viewer";

export async function GET() {
 const v = await getViewer();

 return NextResponse.json({
  ok: true,
  isAuthed: !!v.user,
  userId: v.user?.id ?? null,
  email: v.user?.email ?? null,
  isPro: !!(v.forceProOn || v.profile?.is_pro),
  forceProOn: !!v.forceProOn,
 });
}
