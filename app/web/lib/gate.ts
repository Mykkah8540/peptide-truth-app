import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function isPaidUnlocked(): Promise<boolean> {
  try {
    const jar: any = await cookies();
    return jar?.get?.("pt_gate")?.value === "1";
  } catch {
    return false;
  }
}

export async function requirePaid(): Promise<void> {
  const ok = await isPaidUnlocked();
  if (!ok) redirect("/upgrade");
}
