import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Product as PrismaProduct, Order as PrismaOrder } from "@prisma/client";
import type { Product, Order } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function serializeProduct(product: PrismaProduct): Product {
  return { ...product, price: Number(product.price) };
}

export function serializeOrder(order: PrismaOrder): Order {
  return {
    ...order,
    total: Number(order.total),
    createdAt: order.createdAt.toISOString(),
  };
}

export function formatPrice(amount: number | string) {
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(num);
}
