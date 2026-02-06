"use client";

import { Purchases } from "@revenuecat/purchases-js";

let configuredForUserId: string | null = null;

export function getRevenueCatPublicKey(): string {
  const key = process.env.NEXT_PUBLIC_REVENUECAT_PUBLIC_API_KEY;
  if (!key) throw new Error("missing_revenuecat_public_key");
  return key;
}

/**
 * Configure Purchases for the currently authed user.
 * Canonical identity: Supabase Auth UUID (profiles.id).
 *
 * Safe to call multiple times. Will only reconfigure if user id changes.
 */
export async function configureRevenueCat(userId: string): Promise<void> {
  if (!userId) throw new Error("missing_user_id");
  if (configuredForUserId === userId) return;

  const apiKey = getRevenueCatPublicKey();

  await Purchases.configure({ apiKey, appUserId: userId });

  configuredForUserId = userId;
}
