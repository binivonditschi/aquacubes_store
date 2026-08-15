"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useCart } from "@/store/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Order } from "@/lib/types";

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
    <div className="w-full rounded-xl bg-white p-4 text-left shadow-sm">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">Order</span>
        <span className="font-mono-label text-navy">{order.id}</span>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-gray-500">Total</span>
        <span className="font-mono-label font-semibold text-navy">{formatPrice(order.total)}</span>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-gray-500">Status</span>
        <span className="capitalize text-teal">{order.status}</span>
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-off-white px-6 py-24">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        <div className="rounded-full bg-teal/10 p-4">
          <CheckCircle className="h-12 w-12 text-teal" strokeWidth={1.5} />
        </div>
        <h1 className="text-h2 font-heading text-navy">Thank you for your order</h1>
        <p className="text-body leading-relaxed text-gray-500">
          Your payment was successful. We&apos;ve sent a confirmation email with your order details.
        </p>

        <Suspense fallback={null}>
          <OrderSummary />
        </Suspense>

        <Link href="/">
          <Button className="rounded-button bg-teal px-8 text-navy hover:bg-teal-dark">Continue Shopping</Button>
        </Link>
      </div>
    </main>
  );
}
