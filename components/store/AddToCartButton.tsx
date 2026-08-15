"use client";

import { useCart } from "@/store/useCart";
import type { Product } from "@/lib/types";

export default function AddToCartButton({
  product,
  className,
  children,
}: {
  product: Product;
  className?: string;
  children: React.ReactNode;
}) {
  const addItem = useCart((s) => s.addItem);

  return (
    <button
      onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image ?? undefined })}
      disabled={product.stock <= 0}
      className={className}
    >
      {product.stock <= 0 ? "Out of Stock" : children}
    </button>
  );
}
