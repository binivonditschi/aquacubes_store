"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Lock } from "lucide-react";
import { useCart } from "@/store/useCart";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/mollie/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, items, total }),
      });

      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Payment initialization failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60dvh] flex-col items-center justify-center bg-off-white px-6 py-24 text-center">
        <p className="mb-4 text-body text-gray-500">Your cart is empty.</p>
        <Button onClick={() => router.push("/shop")} className="rounded-button bg-teal text-white hover:bg-teal-dark">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-off-white pb-20 pt-[120px]">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <h1 className="mb-8 text-h1 font-heading text-navy">Checkout</h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="mb-6 font-heading text-lg font-semibold text-navy">Order Summary</h2>
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-xl bg-white p-4 shadow-sm">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
                    {item.image && (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <span className="font-body text-sm font-medium text-navy">{item.name}</span>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-300">Qty: {item.quantity}</span>
                      <span className="font-mono-label text-sm font-semibold text-navy">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-6">
              <span className="font-body text-base text-gray-500">Total</span>
              <span className="font-mono-label text-2xl font-bold text-navy">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="mb-6 font-heading text-lg font-semibold text-navy">Payment Details</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="rounded-xl bg-white p-4">
                <p className="text-xs leading-relaxed text-gray-500">
                  You will be redirected to Mollie&apos;s secure payment page to complete your purchase.
                </p>
              </div>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-button bg-teal py-6 text-base font-medium text-white hover:bg-teal-dark"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay ${formatPrice(total)}`
                  )}
                </Button>
              </motion.div>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-300">
                <Lock className="h-3.5 w-3.5" />
                Secure SSL Checkout
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
