import type { Product } from "@/lib/types";
import content from "@/content/home.json";

export type Plan = (typeof content.productShowcase.plans)[number];

export const planButtonStyle: Record<string, { solid: string; outline: string }> = {
  starter: {
    outline: "border-2 border-[#38b6ff] text-[#38b6ff] hover:bg-[#38b6ff] hover:text-white",
    solid: "bg-[#38b6ff] text-white hover:brightness-95",
  },
  "micro-farms": {
    outline: "border-2 border-navy text-navy hover:bg-navy hover:text-white",
    solid: "bg-navy text-white hover:bg-navy-light",
  },
  enterprise: {
    outline: "border-2 border-success text-success hover:bg-success hover:text-white",
    solid: "bg-success text-white hover:brightness-95",
  },
};

export function getPlans(): Plan[] {
  return content.productShowcase.plans;
}

export function getPlan(id: string): Plan | undefined {
  return content.productShowcase.plans.find((plan) => plan.id === id);
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
