"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import Icon from "@/components/b2b/Icon";
import { useCart } from "@/store/useCart";
import { usePriceVisible } from "@/lib/usePriceVisible";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import content from "@/content/shop.json";

export default function ProductDetailActions({ product }: { product: Product }) {
  const isAddOn = product.category === "Add-on";
  const [quantity, setQuantity] = useState(1);
  const [checking, setChecking] = useState(false);
  const addItem = useCart((s) => s.addItem);
  const isAllowedCountry = usePriceVisible();
  const pathname = usePathname();
  const router = useRouter();

  const handleAddToCart = async () => {
    setChecking(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image ?? undefined });
    }
    router.push("/checkout");
  };

  if (!isAllowedCountry) {
    return (
      <div>
        <p className="mb-space-md text-body-sm text-steel">{content.detail.regionNotice}</p>
        <Link
          href="/kontakt"
          className="block w-full rounded bg-surface-navy py-3.5 text-center text-body-md font-bold text-on-primary shadow-sm transition-colors hover:bg-surface-navy-elevated"
        >
          {content.detail.contactButtonText}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-space-sm">
      {isAddOn && (
        <div className="flex items-center rounded bg-surface-subtle">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Menge verringern"
            className="p-3 text-steel transition-colors hover:text-surface-navy"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[2rem] text-center text-body-md text-surface-navy">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Menge erhöhen"
            className="p-3 text-steel transition-colors hover:text-surface-navy"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      )}
      <button
        onClick={handleAddToCart}
        disabled={product.stock <= 0 || checking}
        className="flex flex-1 items-center justify-center gap-2 rounded bg-primary-container py-3.5 text-body-md font-bold text-on-primary shadow-md transition-colors hover:bg-primary disabled:opacity-50"
      >
        <Icon name="shopping_cart_checkout" size={20} />
        {product.stock <= 0 ? content.detail.outOfStockText : content.detail.orderButtonText}
      </button>
    </div>
  );
}
