"use client";

import { Purchases } from "@revenuecat/purchases-js";

export type RevenueCatOffering = {
  identifier: string;
  description: string | null;
  availablePackages: Array<{
    identifier: string;
    product: {
      identifier: string;
      title: string;
      description: string;
      priceString: string;
    };
  }>;
};

export async function fetchCurrentOffering(): Promise<RevenueCatOffering | null> {
  const rc = Purchases.getSharedInstance();
  const offerings = await rc.getOfferings();
  return (offerings as any)?.current ?? null;
}
