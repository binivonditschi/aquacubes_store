"use client";

import { useState } from "react";
import { useCart } from "@/store/useCart";
import { useRouter } from "next/navigation";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Calendar, Shield, Clock } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function CheckoutPage() {
  const { items, total, kautionTotal, subscriptionMonthlyTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(amount);

  const hasSubscriptions = items.some((i) => i.purchaseType === "subscription");
  const hasKaution = kautionTotal() > 0;
  const hasPreorder = items.some((i) => i.purchaseType === "preorder");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/mollie/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          items,
          total: total(),
          kautionTotal: kautionTotal(),
          subscriptionMonthlyTotal: subscriptionMonthlyTotal(),
        }),
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
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-6 py-24">
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-4">Your cart is empty.</p>
            <Button onClick={() => router.push("/")} className="rounded-md">
              Continue Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-12 md:px-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-medium tracking-tight text-foreground mb-8">Checkout</h1>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <h2 className="text-lg font-medium text-foreground mb-6">Order Summary</h2>
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-md border border-border bg-card p-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      {item.image && (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-sm font-medium text-foreground">{item.name}</span>
                          {item.purchaseType === "preorder" && (
                            <Badge variant="secondary" className="mt-1 block w-fit text-[10px]">
                              <Calendar className="mr-1 h-3 w-3 inline" />
                              Pre-order
                            </Badge>
                          )}
                          {item.purchaseType === "subscription" && (
                            <Badge variant="outline" className="mt-1 block w-fit text-[10px] border-primary text-primary">
                              <Clock className="mr-1 h-3 w-3 inline" />
                              {item.subscriptionDuration}-Year Sub
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                        <div className="text-right">
                          {item.purchaseType === "subscription" ? (
                            <div>
                              <span className="text-sm font-semibold text-foreground">
                                {formatPrice(item.kautionAmount * item.quantity)} kaution
                              </span>
                              <p className="text-xs text-muted-foreground">
                                {formatPrice((item.monthlyPrice || 0) * item.quantity)}/mo after delivery
                              </p>
                            </div>
                          ) : (
                            <span className="text-sm font-semibold text-foreground">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-border pt-6">
                {hasKaution && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Kaution (security deposit)</span>
                    <span className="text-sm font-medium text-foreground">{formatPrice(kautionTotal())}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-base text-muted-foreground">
                    {hasSubscriptions || hasPreorder ? "Due now" : "Total"}
                  </span>
                  <span className="text-2xl font-semibold text-foreground">{formatPrice(total())}</span>
                </div>
                {hasSubscriptions && (
                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <span className="text-sm text-muted-foreground">Future monthly subscription</span>
                    <span className="text-base font-semibold text-primary">{formatPrice(subscriptionMonthlyTotal())}/mo</span>
                  </div>
                )}
              </div>

              {(hasSubscriptions || hasPreorder) && (
                <div className="mt-4 rounded-md border border-border bg-muted p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">What happens next?</p>
                      <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                        {hasKaution && <li>• Kaution is charged now and held securely</li>}
                        {hasPreorder && <li>• You will be notified when your pre-order is ready for delivery</li>}
                        {hasSubscriptions && <li>• Subscription billing begins after delivery confirmation</li>}
                        <li>• Kaution is fully refundable upon return or completion</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-lg font-medium text-foreground mb-6">Payment Details</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-sm text-foreground">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-md border-border bg-background"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email" className="text-sm text-foreground">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-md border-border bg-background"
                    required
                  />
                </div>

                <div className="rounded-md bg-muted p-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    You will be redirected to Mollie&apos;s secure payment page. 
                    {hasSubscriptions 
                      ? " Only the kaution amount will be charged today. Subscription billing will be set up after delivery."
                      : " Your payment will be processed securely."}
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-md bg-primary py-6 text-base font-medium text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {hasSubscriptions || hasPreorder
                        ? `Pay Kaution ${formatPrice(total())}`
                        : `Pay ${formatPrice(total())}`}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
