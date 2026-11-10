/**
 * Leasing packages from the Last-main configurator. Shared by the /leasing page
 * and the Stripe checkout route, which computes the amount from here so the
 * browser can never choose its own price.
 */
export type PackageId = "starter" | "micro";
export type Term = "min" | "ext";

export interface LeasingPackage {
  id: PackageId;
  name: string;
  cubes: number;
  /** Monthly lease rate in EUR, net. Starts only after on-site acceptance. */
  monthlyRate: number;
  /** Refundable reservation deposit in EUR, net — the amount charged today via Stripe. */
  deposit: number;
  /** Black Friday monthly rate in EUR, net. */
  promoMonthlyRate: number;
  /** Black Friday reservation deposit in EUR, net. */
  promoDeposit: number;
  minMonths: number;
  extMonths: number;
}

/** The Black Friday prices apply until this moment (end of 27 Nov 2026, German time), then revert by themselves. */
export const BLACK_FRIDAY_ENDS_AT = Date.parse("2026-11-27T23:59:59+01:00");

export function isBlackFriday(now = Date.now()): boolean {
  return now <= BLACK_FRIDAY_ENDS_AT;
}

export const PACKAGES: Record<PackageId, LeasingPackage> = {
  starter: { id: "starter", name: "Starter · 1 Cube", cubes: 1, monthlyRate: 699, deposit: 1000, promoMonthlyRate: 599, promoDeposit: 500, minMonths: 6, extMonths: 12 },
  micro: { id: "micro", name: "Micro-Farm · 10 Cubes", cubes: 10, monthlyRate: 4990, deposit: 10000, promoMonthlyRate: 3990, promoDeposit: 5000, minMonths: 24, extMonths: 36 },
};

/** Optional one-time spare parts & wear kit (billed with the contract, not with the deposit). */
export const SPARES_KIT_PRICE = 1850;

export const SPECIES = ["Seesaibling", "Regenbogenforelle", "Wolfsbarsch", "Nil-Tilapia"] as const;
export type Species = (typeof SPECIES)[number];

/** The rate and deposit to show and charge, depending on whether the sale is running. */
export function packagePrice(pkg: PackageId, promo: boolean): { monthlyRate: number; deposit: number } {
  const plan = PACKAGES[pkg];
  return promo
    ? { monthlyRate: plan.promoMonthlyRate, deposit: plan.promoDeposit }
    : { monthlyRate: plan.monthlyRate, deposit: plan.deposit };
}

export function isPackageId(value: unknown): value is PackageId {
  return value === "starter" || value === "micro";
}

export function isTerm(value: unknown): value is Term {
  return value === "min" || value === "ext";
}

export function isSpecies(value: unknown): value is Species {
  return typeof value === "string" && (SPECIES as readonly string[]).includes(value);
}

export function termMonths(pkg: PackageId, term: Term): number {
  return term === "ext" ? PACKAGES[pkg].extMonths : PACKAGES[pkg].minMonths;
}

/** What the configurator stores on the order (Order.items JSON). */
export interface LeasingConfig {
  pkg: PackageId;
  term: Term;
  months: number;
  species: Species;
  region: string;
  sparesKit: boolean;
  monthlyRate: number;
  deposit: number;
}

/** Human-readable order number shown to the customer (AC-2026-XXXXXX style). */
export function orderRef(orderId: string, createdAt: string | Date): string {
  const year = new Date(createdAt).getFullYear();
  return `AC-${year}-${orderId.slice(-6).toUpperCase()}`;
}
