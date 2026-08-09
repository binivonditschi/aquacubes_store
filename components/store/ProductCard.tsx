"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";
import { useCart } from "@/store/useCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "EUR" }).format(amount);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      purchaseType: "buy",
      kautionAmount: 0,
    });
  };

  const handlePreOrder = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      purchaseType: "preorder",
      kautionAmount: product.kautionAmount,
      deliveryDate: product.deliveryDate,
    });
  };

  return (
    <article className="group flex flex-col">
      <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden rounded-md bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.isPreOrder && (
          <div className="absolute left-3 top-3">
            <Badge variant="secondary" className="bg-background/90 text-foreground backdrop-blur-sm">
              <Calendar className="mr-1 h-3 w-3" />
              Pre-order
            </Badge>
          </div>
        )}
        {product.subscription3YearPrice && (
          <div className="absolute right-3 top-3">
            <Badge variant="outline" className="bg-background/90 text-foreground backdrop-blur-sm border-border">
              <Clock className="mr-1 h-3 w-3" />
              Sub available
            </Badge>
          </div>
        )}
      </Link>

      <div className="mt-4 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-lg font-medium text-foreground transition-colors hover:text-primary">
              {product.name}
            </h3>
          </Link>
          <span className="text-base font-semibold text-foreground">{formatPrice(product.price)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

        {product.isPreOrder && product.deliveryDate && (
          <p className="text-xs text-muted-foreground mt-1">
            Estimated delivery: {new Date(product.deliveryDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>
        )}

        {product.subscription3YearPrice && (
          <p className="text-xs text-primary mt-1">
            From {formatPrice(product.subscription5YearPrice || product.subscription3YearPrice)}/mo with subscription
          </p>
        )}

        <div className="mt-3 flex flex-col gap-2">
          {product.isPreOrder ? (
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-md border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={handlePreOrder}
            >
              Pre-order Now — {formatPrice(product.kautionAmount)} kaution
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-md border-border text-sm font-medium transition-all hover:bg-primary hover:text-primary-foreground"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
