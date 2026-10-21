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
  /** Refundable reservation deposit in EUR, net — the only amount ever paid online. */
  deposit: number;
  minMonths: number;
  extMonths: number;
}

/** Flat online reservation deposit for every package; customer service arranges the rest. */
export const RESERVATION_DEPOSIT = 1000;

export const PACKAGES: Record<PackageId, LeasingPackage> = {
  starter: { id: "starter", name: "Starter · 1 Cube", cubes: 1, monthlyRate: 699, deposit: RESERVATION_DEPOSIT, minMonths: 6, extMonths: 12 },
  micro: { id: "micro", name: "Micro-Farm · 10 Cubes", cubes: 10, monthlyRate: 4990, deposit: RESERVATION_DEPOSIT, minMonths: 24, extMonths: 36 },
};

/**
 * Live Stripe Payment Links (one per package, each a €1,000 one-time charge).
 * The amount is set in the Stripe dashboard — the website cannot change it.
 */
export const STRIPE_PAYMENT_LINKS: Record<PackageId, string> = {
  starter: "https://abo.aquacubes.fish/b/bJebJ2abU8EWcZQ10od3i03",
  micro: "https://abo.aquacubes.fish/b/8x26oIabUbR89NEbF2d3i04",
};

/** Browser storage key: the order being paid, read by /danke after the Stripe redirect. */
export const LAST_ORDER_KEY = "ac-last-order-id";

/** Optional one-time spare parts & wear kit (billed with the contract, not with the deposit). */
export const SPARES_KIT_PRICE = 1850;

export const SPECIES = ["Seesaibling", "Regenbogenforelle", "Wolfsbarsch", "Nil-Tilapia"] as const;
export type Species = (typeof SPECIES)[number];

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
