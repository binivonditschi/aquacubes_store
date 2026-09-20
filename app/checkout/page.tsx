"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Lock, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/useCart";
import { formatPrice } from "@/lib/utils";
import { usePriceVisible } from "@/lib/usePriceVisible";
import { Button } from "@/components/ui/button";
import content from "@/content/checkout.json";

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const total = useCart((s) => s.total());
  const router = useRouter();
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
      <div className="flex min-h-[60dvh] flex-col items-center justify-center bg-off-white px-6 py-24 text-center">
        <ShoppingBag className="mb-6 h-16 w-16 text-gray-100" />
        <p className="mb-4 text-body text-gray-500">{content.emptyCart.message}</p>
        <Button onClick={() => router.push("/shop")} className="rounded-button bg-teal text-white hover:bg-teal-dark">
          {content.emptyCart.buttonText}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-off-white pb-20 pt-[120px]">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <h1 className="mb-8 text-h1 font-heading text-navy">{content.title}</h1>

        <div className="grid gap-12 lg:grid-cols-[65%_35%]">
          <div>
            <h2 className="mb-6 font-heading text-lg font-semibold text-navy">{content.orderSummary.title}</h2>
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-5 rounded-xl bg-white p-5 shadow-sm">
                  <Link
                    href={`/shop/${item.id}`}
                    className="flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-lg bg-teal/10"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image || "/AQUACUBES.png"} alt={item.name} className="h-full w-full object-cover" />
                  </Link>

                  <div className="flex flex-1 flex-col gap-1">
                    <Link href={`/shop/${item.id}`}>
                      <h3 className="font-body text-base font-semibold text-navy transition-colors hover:text-teal">{item.name}</h3>
                    </Link>
                    <p className="font-mono-label text-xs text-gray-500">
                      {showPrice ? `${formatPrice(item.price)} each` : "Price on request"}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                      className="rounded-md p-1.5 text-gray-300 transition-colors hover:bg-error/10 hover:text-error"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-50 text-navy transition-colors hover:bg-gray-100"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[2rem] text-center font-mono-label text-sm text-navy">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-50 text-navy transition-colors hover:bg-gray-100"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <span className="min-w-[80px] text-right font-mono-label text-base font-semibold text-navy">
                        {showPrice ? formatPrice(item.price * item.quantity) : "—"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <span className="font-heading text-lg font-semibold text-navy">{content.orderSummary.totalLabel}</span>
                <span className="font-mono-label text-2xl font-bold text-navy">
                  {showPrice ? formatPrice(total) : "—"}
                </span>
              </div>

              <div className="mt-4 rounded-xl bg-off-white p-4">
                <p className="text-xs leading-relaxed text-gray-500">{content.payment.redirectNotice}</p>
              </div>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="mt-4">
                <Button
                  onClick={handleContinue}
                  disabled={loading}
                  className="w-full rounded-button bg-teal py-6 text-base font-medium text-white hover:bg-teal-dark"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {content.payment.processingText}
                    </>
                  ) : (
                    content.payment.continueButtonText
                  )}
                </Button>
              </motion.div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-300">
                <Lock className="h-3.5 w-3.5" />
                {content.payment.secureCheckoutText}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
