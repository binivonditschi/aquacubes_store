"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/store/useCart";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const items = useCart((s) => s.items);
  const isOpen = useCart((s) => s.isOpen);
  const closeCart = useCart((s) => s.closeCart);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const total = useCart((s) => s.total());
  const itemCount = useCart((s) => s.itemCount());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-navy/50 backdrop-blur-sm"
            onClick={closeCart}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-[400px] bg-white shadow-modal"
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-gray-100 p-6">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5 text-navy" />
                  <h2 className="font-heading text-lg font-semibold text-navy">Your Cart ({itemCount})</h2>
                </div>
                <button
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="rounded-button p-2 text-gray-300 transition-colors hover:bg-gray-50 hover:text-navy"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ShoppingBag className="mb-4 h-12 w-12 text-gray-100" />
                    </motion.div>
                    <p className="mb-2 font-heading text-lg font-semibold text-navy">Your cart is empty</p>
                    <p className="mb-6 text-sm text-gray-500">Add some products to get started.</p>
                    <Link
                      href="/shop"
                      onClick={closeCart}
                      className="rounded-button bg-teal px-6 py-3 font-body text-sm font-medium text-navy transition-colors hover:bg-teal-dark"
                    >
                      Shop Now
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          layoutId={item.id}
                          initial={{ opacity: 0, y: 20, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          className="flex gap-4 rounded-card bg-off-white p-4"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.name} className="h-20 w-20 rounded-button object-cover" />
                          <div className="flex flex-1 flex-col">
                            <h3 className="font-body text-sm font-medium text-navy">{item.name}</h3>
                            <p className="mt-1 font-mono text-sm font-bold text-navy">{formatPrice(item.price)}</p>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  aria-label="Decrease quantity"
                                  className="rounded-full p-1 text-gray-300 transition-colors hover:bg-white hover:text-navy"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <motion.span
                                  key={item.quantity}
                                  initial={{ scale: 1.2 }}
                                  animate={{ scale: 1 }}
                                  className="min-w-[1.5rem] text-center font-mono text-sm"
                                >
                                  {item.quantity}
                                </motion.span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  aria-label="Increase quantity"
                                  className="rounded-full p-1 text-gray-300 transition-colors hover:bg-white hover:text-navy"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                aria-label="Remove item"
                                className="rounded-full p-1 text-gray-300 transition-colors hover:text-error"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-gray-100 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-body text-sm text-gray-500">Subtotal</span>
                    <span className="font-mono text-lg font-bold text-navy">{formatPrice(total)}</span>
                  </div>
                  <p className="mb-4 text-xs text-gray-300">Shipping and taxes calculated at checkout.</p>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="group relative block w-full overflow-hidden rounded-button bg-teal py-3 text-center font-body text-sm font-medium text-navy transition-all hover:bg-teal-dark active:scale-[0.98]"
                  >
                    <span className="relative z-10">Proceed to Checkout</span>
                    <span className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  </Link>
                  <button
                    onClick={closeCart}
                    className="mt-2 block w-full rounded-button py-3 text-center font-body text-sm text-gray-500 transition-colors hover:text-navy"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
