"use client";

import { usePriceVisible } from "@/lib/usePriceVisible";

export default function PriceGate({ children }: { children: React.ReactNode }) {
  const showPrice = usePriceVisible();

  if (!showPrice) {
    return <p className="text-sm text-gray-500">Contact us for pricing in your region.</p>;
  }

  return <>{children}</>;
}
