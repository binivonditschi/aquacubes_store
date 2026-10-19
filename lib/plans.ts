import type { Product } from "@/lib/types";
import content from "@/content/home.json";

export type Plan = (typeof content.pricing.plans)[number] & {
  badge?: string;
  contactHref?: string;
};

export function getPlans(): Plan[] {
  return content.pricing.plans;
}

export function getPlan(id: string): Plan | undefined {
  return getPlans().find((plan) => plan.id === id);
}

export function isPurchasable(plan: Plan): boolean {
  return /\d/.test(plan.price);
}

export function planPriceValue(plan: Plan): number {
  return parseFloat(plan.price.replace(/[^0-9.]/g, "")) || 0;
}

export function planToProduct(plan: Plan, position: number): Product {
  return {
    id: plan.id,
    name: plan.name,
    description: plan.description,
    price: planPriceValue(plan),
    image: null,
    category: "System",
    position,
    isVisible: true,
    stock: 999,
  };
}
