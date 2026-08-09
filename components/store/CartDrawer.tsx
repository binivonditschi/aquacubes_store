"use client";

import { useCart } from "@/store/useCart";
import { X, Minus, Plus, ShoppingBag, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, kautionTotal, subscriptionMonthlyTotal, clearCart } = useCart();

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(amount);

  if (!isOpen) return null;

  const hasSubscriptions = items.some((i) => i.purchaseType === "subscription");
  const hasKaution = kautionTotal() > 0;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={closeCart} />
      <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-medium text-foreground">Your Cart</h2>
          <button onClick={closeCart} className="rounded-md p-2 text-muted-foreground hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingBag className="h-12 w-12 stroke-1" />
            <p className="text-base">Your cart is empty</p>
            <Button variant="outline" onClick={closeCart} className="rounded-md">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      {item.image && (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-foreground">{item.name}</span>
                          {item.purchaseType === "preorder" && (
                            <Badge variant="secondary" className="mt-1 w-fit text-[10px]">
                              <Calendar className="mr-1 h-3 w-3" />
                              Pre-order
                            </Badge>
                          )}
                          {item.purchaseType === "subscription" && (
                            <Badge variant="outline" className="mt-1 w-fit text-[10px] border-primary text-primary">
                              <Clock className="mr-1 h-3 w-3" />
                              {item.subscriptionDuration}-Year Sub
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {item.purchaseType === "subscription"
                            ? formatPrice(item.kautionAmount * item.quantity)
                            : formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                      
                      {item.purchaseType === "subscription" && item.monthlyPrice && (
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(item.monthlyPrice)}/mo after delivery
                        </p>
                      )}
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-md border border-border">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-muted-foreground hover:text-foreground"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-[1.5rem] text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-muted-foreground hover:text-foreground"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-muted-foreground underline hover:text-destructive"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border px-6 py-6">
              <div className="mb-4 flex flex-col gap-2">
                {hasKaution && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Kaution (deposit)</span>
                    <span className="text-sm font-medium text-foreground">{formatPrice(kautionTotal())}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {hasSubscriptions ? "Due now" : "Subtotal"}
                  </span>
                  <span className="text-sm font-semibold text-foreground">{formatPrice(total())}</span>
                </div>
                {hasSubscriptions && (
                  <div className="flex items-center justify-between border-t border-border pt-2 mt-1">
                    <span className="text-sm text-muted-foreground">Monthly subscription</span>
                    <span className="text-sm font-semibold text-primary">{formatPrice(subscriptionMonthlyTotal())}/mo</span>
                  </div>
                )}
              </div>

              <p className="mb-6 text-xs text-muted-foreground">
                {hasSubscriptions
                  ? "Kaution is charged now. Subscription billing starts after delivery."
                  : "Shipping and taxes calculated at checkout."}
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/checkout" onClick={closeCart}>
                  <Button className="w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                    {hasSubscriptions ? `Pay Kaution ${formatPrice(total())}` : "Checkout"}
                  </Button>
                </Link>
                <Button variant="outline" onClick={clearCart} className="w-full rounded-md">
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
