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
  minMonths: number;
  extMonths: number;
}

export const PACKAGES: Record<PackageId, LeasingPackage> = {
  starter: { id: "starter", name: "Starter · 1 Cube", cubes: 1, monthlyRate: 699, deposit: 1000, minMonths: 6, extMonths: 12 },
  micro: { id: "micro", name: "Micro-Farm · 10 Cubes", cubes: 10, monthlyRate: 4990, deposit: 10000, minMonths: 24, extMonths: 36 },
};

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
