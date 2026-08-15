"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Truck, ShieldCheck, Clock } from "lucide-react";
import { useCart } from "@/store/useCart";
import type { Product } from "@/lib/types";

export default function ProductDetailActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCart((s) => s.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: product.id, name: product.name, price: product.price, image: product.image ?? undefined });
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-4">
        <div className="flex items-center rounded-lg border border-gray-100">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="p-3 text-gray-500 transition-colors hover:text-navy"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-[2rem] text-center font-mono text-sm text-navy">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Increase quantity"
            className="p-3 text-gray-500 transition-colors hover:text-navy"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="flex flex-1 items-center justify-center gap-2 rounded-button bg-teal py-3.5 font-body text-sm font-medium text-navy transition-colors hover:bg-teal-dark disabled:opacity-50"
        >
          <ShoppingCart className="h-4 w-4" />
          {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
        </motion.button>
      </div>

      <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-teal" />
          Free shipping on all systems
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-teal" />
          2-year warranty included
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-teal" />
          30-day money-back guarantee
        </div>
      </div>
    </div>
  );
}
