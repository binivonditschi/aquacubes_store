"use client";

import { useState } from "react";
import { Product } from "@/lib/data";
import { useCart } from "@/store/useCart";
import { Button } from "@/components/ui/button";
import { Calendar, Check, Shield } from "lucide-react";

interface ProductPurchaseSelectorProps {
  product: Product;
}

export default function ProductPurchaseSelector({ product }: ProductPurchaseSelectorProps) {
  const addItem = useCart((s) => s.addItem);
  const [purchaseType, setPurchaseType] = useState<"buy" | "preorder" | "subscription">(
    product.isPreOrder ? "preorder" : "buy"
  );
  const [subscriptionDuration, setSubscriptionDuration] = useState<3 | 5>(3);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(amount);

  const handleAddToCart = () => {
    if (purchaseType === "subscription" && product.subscription3YearPrice) {
      const monthlyPrice = subscriptionDuration === 3 
        ? product.subscription3YearPrice 
        : (product.subscription5YearPrice || product.subscription3YearPrice);
      
      addItem({
        id: `${product.id}-sub-${subscriptionDuration}`,
        name: `${product.name} (${subscriptionDuration}-Year Subscription)`,
        price: product.price,
        image: product.image,
        purchaseType: "subscription",
        subscriptionDuration,
        monthlyPrice,
        kautionAmount: product.kautionAmount,
        deliveryDate: product.deliveryDate,
      });
    } else if (purchaseType === "preorder") {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        purchaseType: "preorder",
        kautionAmount: product.kautionAmount,
        deliveryDate: product.deliveryDate,
      });
    } else {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        purchaseType: "buy",
        kautionAmount: 0,
      });
    }
  };

  const hasSubscription = product.subscription3YearPrice || product.subscription5YearPrice;

  return (
    <div className="flex flex-col">
      <div className="mb-6 flex flex-col gap-3">
        <div className="flex rounded-md border border-border p-1 bg-muted">
          {!product.isPreOrder && (
            <button
              onClick={() => setPurchaseType("buy")}
              className={`flex-1 rounded-sm py-2 text-sm font-medium transition-colors ${
                purchaseType === "buy"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Buy Now
            </button>
          )}
          {product.isPreOrder && (
            <button
              onClick={() => setPurchaseType("preorder")}
              className={`flex-1 rounded-sm py-2 text-sm font-medium transition-colors ${
                purchaseType === "preorder"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Pre-order
            </button>
          )}
          {hasSubscription && (
            <button
              onClick={() => setPurchaseType("subscription")}
              className={`flex-1 rounded-sm py-2 text-sm font-medium transition-colors ${
                purchaseType === "subscription"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Subscribe
            </button>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          {purchaseType === "buy" && (
            <span className="text-2xl font-semibold text-foreground">
              {formatPrice(product.price)}
            </span>
          )}
          {purchaseType === "preorder" && (
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-semibold text-foreground">
                {formatPrice(product.kautionAmount)} kaution
              </span>
              <span className="text-sm text-muted-foreground">
                Full price: {formatPrice(product.price)} — charged at delivery
              </span>
            </div>
          )}
          {purchaseType === "subscription" && (
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-semibold text-foreground">
                {formatPrice(
                  subscriptionDuration === 3
                    ? product.subscription3YearPrice || 0
                    : product.subscription5YearPrice || 0
                )}/mo
              </span>
              <span className="text-sm text-muted-foreground">
                + {formatPrice(product.kautionAmount)} kaution now
              </span>
            </div>
          )}
        </div>
      </div>

      {purchaseType === "subscription" && hasSubscription && (
        <div className="mb-6 rounded-md border border-border bg-muted p-4">
          <p className="text-sm font-medium text-foreground mb-3">Subscription Duration</p>
          <div className="flex gap-3">
            {product.subscription3YearPrice && (
              <button
                onClick={() => setSubscriptionDuration(3)}
                className={`flex flex-1 flex-col items-center gap-2 rounded-md border p-3 transition-all ${
                  subscriptionDuration === 3
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-muted-foreground"
                }`}
              >
                <span className="text-sm font-medium text-foreground">3 Years</span>
                <span className="text-xs text-muted-foreground">
                  {formatPrice(product.subscription3YearPrice)}/mo
                </span>
                {subscriptionDuration === 3 && <Check className="h-4 w-4 text-primary" />}
              </button>
            )}
            {product.subscription5YearPrice && (
              <button
                onClick={() => setSubscriptionDuration(5)}
                className={`flex flex-1 flex-col items-center gap-2 rounded-md border p-3 transition-all ${
                  subscriptionDuration === 5
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-muted-foreground"
                }`}
              >
                <span className="text-sm font-medium text-foreground">5 Years</span>
                <span className="text-xs text-muted-foreground">
                  {formatPrice(product.subscription5YearPrice)}/mo
                </span>
                {subscriptionDuration === 5 && <Check className="h-4 w-4 text-primary" />}
              </button>
            )}
          </div>
        </div>
      )}

      {(purchaseType === "preorder" || purchaseType === "subscription") && product.deliveryDate && (
        <div className="mb-6 flex items-start gap-3 rounded-md border border-border bg-muted p-4">
          <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Estimated Delivery</p>
            <p className="text-sm text-muted-foreground">
              {new Date(product.deliveryDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            {purchaseType === "subscription" && (
              <p className="text-xs text-muted-foreground mt-1">
                Subscription billing starts after delivery. Kaution is refundable upon return.
              </p>
            )}
          </div>
        </div>
      )}

      {(purchaseType === "preorder" || purchaseType === "subscription") && product.kautionAmount > 0 && (
        <div className="mb-6 flex items-start gap-3 rounded-md border border-border bg-muted p-4">
          <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Kaution (Security Deposit)</p>
            <p className="text-sm text-muted-foreground">
              {formatPrice(product.kautionAmount)} charged now. Fully refundable upon return or purchase completion.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          size="lg"
          className="rounded-md bg-primary px-8 text-primary-foreground hover:bg-primary/90"
          onClick={handleAddToCart}
          disabled={purchaseType === "buy" && product.stock <= 0}
        >
          {purchaseType === "buy" && "Add to Cart"}
          {purchaseType === "preorder" && `Pre-order — ${formatPrice(product.kautionAmount)} kaution`}
          {purchaseType === "subscription" && `Subscribe — ${formatPrice(product.kautionAmount)} kaution`}
        </Button>
        {purchaseType === "buy" && (
          <span className="flex items-center text-sm text-muted-foreground">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        )}
      </div>
    </div>
  );
}
