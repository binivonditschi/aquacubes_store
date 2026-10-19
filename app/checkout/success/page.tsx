"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/b2b/Icon";
import { useCart } from "@/store/useCart";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/lib/types";
import content from "@/content/checkout.json";

function OrderSummary() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderId) return;
    fetch(`/api/orders/${orderId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then(setOrder);
  }, [orderId]);

  if (!order) return null;

  return (
    <div className="w-full space-y-space-xs rounded-lg bg-surface-subtle p-space-md text-left text-body-sm">
      <div className="flex items-center justify-between gap-4">
        <span className="text-steel">{content.success.orderLabel}</span>
        <span className="truncate font-medium text-surface-navy">{order.id}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-steel">{content.success.totalLabel}</span>
        <span className="font-semibold text-surface-navy">{formatPrice(order.total)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-steel">{content.success.statusLabel}</span>
        <span className="font-semibold capitalize text-compliance-green">{order.status}</span>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  const clearCart = useCart((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex min-h-[70dvh] items-center justify-center bg-surface-subtle px-margin py-space-3xl">
      <div className="flex w-full max-w-md flex-col items-center gap-space-md rounded-2xl bg-surface-canvas p-space-xl text-center shadow-xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-compliance-green-bg text-compliance-green">
          <Icon name="check_circle" size={36} />
        </div>
        <h1 className="text-headline-lg text-surface-navy">{content.success.title}</h1>
        <p className="text-body-md text-steel">{content.success.description}</p>

        <Suspense fallback={null}>
          <OrderSummary />
        </Suspense>

        <Link
          href="/"
          className="rounded bg-primary-container px-space-lg py-3 text-body-md font-bold text-on-primary shadow-md transition-colors hover:bg-primary"
        >
          {content.success.buttonText}
        </Link>
      </div>
    </div>
  );
}
