"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Minus, Plus } from "lucide-react";
import Icon from "@/components/b2b/Icon";
import { useCart } from "@/store/useCart";
import { formatPrice } from "@/lib/utils";
import { usePriceVisible } from "@/lib/usePriceVisible";
import content from "@/content/checkout.json";

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const total = useCart((s) => s.total());
  const [loading, setLoading] = useState(false);
  const showPrice = usePriceVisible();

  const handleContinue = async () => {
    if (items.length === 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, total }),
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || content.payment.genericErrorMessage);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert(content.payment.networkErrorMessage);
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center bg-surface-subtle px-margin py-space-3xl text-center">
        <div className="mb-space-md flex h-16 w-16 items-center justify-center rounded-xl bg-surface-canvas text-steel shadow-sm">
          <Icon name="shopping_bag" size={32} />
        </div>
        <p className="mb-space-md text-body-lg text-steel">{content.emptyCart.message}</p>
        <Link
          href="/shop"
          className="rounded bg-primary-container px-space-lg py-3 text-body-md font-bold text-on-primary shadow-md transition-colors hover:bg-primary"
        >
          {content.emptyCart.buttonText}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-surface-subtle px-margin py-space-2xl md:px-margin-tablet lg:px-margin-desktop">
      <div className="mx-auto max-w-7xl">
        <div className="mb-space-xs text-label-technical font-semibold uppercase text-primary">{content.eyebrow}</div>
        <h1 className="mb-space-xl text-headline-xl-mobile text-surface-navy md:text-headline-xl">{content.title}</h1>

        <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="mb-space-md text-headline-md text-surface-navy">{content.orderSummary.title}</h2>
            <div className="flex flex-col gap-space-sm">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-space-md rounded-2xl bg-surface-canvas p-space-md shadow-sm sm:flex-row sm:items-center"
                >
                  <Link
                    href={`/shop/${item.id}`}
                    className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-accent-cyan-light text-primary"
                  >
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <Icon name="water" size={32} />
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col gap-1">
                    <Link href={`/shop/${item.id}`}>
                      <h3 className="text-headline-md text-surface-navy transition-colors hover:text-primary">{item.name}</h3>
                    </Link>
                    <p className="text-body-sm text-steel">
                      {showPrice
                        ? `${formatPrice(item.price)} ${content.orderSummary.eachLabel}`
                        : content.orderSummary.priceOnRequest}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-space-md sm:justify-end">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Menge verringern"
                        className="flex h-8 w-8 items-center justify-center rounded bg-surface-subtle text-surface-navy transition-colors hover:bg-surface-container"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[2rem] text-center text-body-md font-semibold text-surface-navy">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Menge erhöhen"
                        className="flex h-8 w-8 items-center justify-center rounded bg-surface-subtle text-surface-navy transition-colors hover:bg-surface-container"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <span className="min-w-[90px] text-right text-headline-md text-surface-navy">
                      {showPrice ? formatPrice(item.price * item.quantity) : "—"}
                    </span>

                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Entfernen"
                      className="flex h-8 w-8 items-center justify-center rounded text-steel transition-colors hover:bg-error/10 hover:text-error"
                    >
                      <Icon name="delete" size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl bg-surface-canvas p-space-lg shadow-xl">
              <div className="flex items-center justify-between border-b border-border-subtle pb-space-md">
                <span className="text-headline-md text-surface-navy">{content.orderSummary.totalLabel}</span>
                <span className="text-label-numeric-lg text-primary">{showPrice ? formatPrice(total) : "—"}</span>
              </div>

              <div className="mt-space-md rounded-lg bg-surface-subtle p-space-md">
                <p className="text-body-sm text-steel">{content.payment.redirectNotice}</p>
              </div>

              <button
                onClick={handleContinue}
                disabled={loading}
                className="mt-space-md flex w-full items-center justify-center gap-2 rounded bg-primary-container py-3.5 text-body-md font-bold text-on-primary shadow-md transition-colors hover:bg-primary disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {content.payment.processingText}
                  </>
                ) : (
                  content.payment.continueButtonText
                )}
              </button>

              <div className="mt-space-md flex items-center justify-center gap-2 text-body-sm text-steel">
                <Icon name="lock" size={16} />
                {content.payment.secureCheckoutText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
