"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Lock } from "lucide-react";
import { useCart } from "@/store/useCart";
import { formatPrice } from "@/lib/utils";

const staggerLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Cart() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const itemCount = useCart((s) => s.itemCount());
  const subtotal = useCart((s) => s.total());
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null);

  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.21;
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (id: string, newQty: number) => {
    setHighlightedItem(id);
    updateQuantity(id, newQty);
    setTimeout(() => setHighlightedItem(null), 300);
  };

  return (
    <div className="bg-off-white pb-20 pt-[120px]">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag className="mb-6 h-20 w-20 text-gray-100" />
            <h2 className="text-h2 font-heading text-gray-500">Your cart is empty</h2>
            <p className="mt-2 max-w-md font-body text-base text-gray-300">Looks like you haven&apos;t added any items yet.</p>
            <Link href="/shop" className="mt-8 rounded-lg bg-teal px-8 py-3 font-body text-sm font-semibold text-navy transition-colors hover:bg-teal-dark">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[65%_35%]">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-h1 font-heading text-navy">Your Cart</h1>
                  <p className="mt-1 font-body text-base text-gray-500">
                    ({itemCount} item{itemCount !== 1 ? "s" : ""})
                  </p>
                </div>
                <Link href="/shop" className="flex items-center gap-2 font-body text-sm font-medium text-teal transition-colors hover:text-teal-dark">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </div>

              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      custom={i}
                      variants={staggerLeft}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
                      layout
                      className="flex items-center gap-5 rounded-xl bg-white p-5 shadow-sm"
                    >
                      <Link href={`/shop/${item.id}`} className="flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} className="h-20 w-20 rounded-lg object-cover" />
                      </Link>

                      <div className="flex flex-1 flex-col gap-1">
                        <Link href={`/shop/${item.id}`}>
                          <h3 className="font-body text-base font-semibold text-navy transition-colors hover:text-teal">{item.name}</h3>
                        </Link>
                        <p className="font-mono-label text-xs text-gray-500">{formatPrice(item.price)} each</p>
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
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-50 text-navy transition-colors hover:bg-gray-100"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span
                              className={`min-w-[2rem] text-center font-mono-label text-sm transition-colors ${
                                highlightedItem === item.id ? "text-teal" : "text-navy"
                              }`}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-50 text-navy transition-colors hover:bg-gray-100"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <span className="min-w-[80px] text-right font-mono-label text-base font-semibold text-navy">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div>
              <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm">
                <h3 className="font-heading text-xl font-semibold text-navy">Order Summary</h3>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-gray-500">Subtotal</span>
                    <span className="font-mono-label text-sm font-medium text-navy">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-gray-500">Shipping</span>
                    <span className={`font-body text-sm font-medium ${shipping === 0 ? "text-teal" : "text-navy"}`}>
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-gray-500">Tax (21%)</span>
                    <span className="font-mono-label text-sm font-medium text-navy">{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="my-4 h-px bg-gray-100" />

                <div className="flex items-center justify-between">
                  <span className="font-heading text-lg font-semibold text-navy">Total</span>
                  <span className="font-mono-label text-xl font-bold text-navy">{formatPrice(total)}</span>
                </div>

                <Link
                  href="/checkout"
                  className="mt-6 flex w-full items-center justify-center rounded-lg bg-teal py-4 font-body text-base font-semibold text-navy transition-all hover:bg-teal-dark active:scale-[0.98]"
                >
                  Proceed to Checkout
                </Link>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-300">
                  <Lock className="h-3.5 w-3.5" />
                  Secure SSL Checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
