"use client";

import { useEffect } from "react";
import { useCart } from "@/store/useCart";
import Link from "next/link";
import { CheckCircle, Calendar, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const { items, clearCart } = useCart();
  const hasSubscriptions = items.some((i) => i.purchaseType === "subscription");
  const hasPreorder = items.some((i) => i.purchaseType === "preorder");

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <div className="rounded-full bg-emerald-50 p-4">
          <CheckCircle className="h-12 w-12 text-emerald-600" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-medium tracking-tight text-foreground">
          Thank you for your order
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Your payment was successful. We&apos;ve sent a confirmation email with your order details.
        </p>

        {(hasSubscriptions || hasPreorder) && (
          <div className="w-full rounded-md border border-border bg-muted p-4 text-left">
            <h3 className="text-sm font-medium text-foreground mb-3">What happens next</h3>
            <ul className="space-y-3">
              {hasPreorder && (
                <li className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    We will email you when your pre-order is ready for delivery.
                  </span>
                </li>
              )}
              {hasSubscriptions && (
                <li className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    Your subscription will be activated after delivery confirmation. You will receive a setup link via email.
                  </span>
                </li>
              )}
              <li className="flex items-start gap-3">
                <Shield className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Your kaution is held securely and is fully refundable.
                </span>
              </li>
            </ul>
          </div>
        )}

        <Link href="/">
          <Button className="rounded-md bg-primary px-8 text-primary-foreground hover:bg-primary/90">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </main>
  );
}
