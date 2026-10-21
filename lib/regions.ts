/**
 * Installation countries and their page languages. Kept out of lib/i18n.tsx
 * (a "use client" module) so server code — e.g. the Stripe checkout route —
 * can use these too.
 */
export const REGIONS = ["DE", "DK", "SE", "NO", "CH", "OTHER"] as const;
export type Region = (typeof REGIONS)[number];
export type Lang = "de" | "da" | "sv" | "no" | "en";

/** Countries we deliver to and sell in directly. */
export const DELIVERY_REGIONS: Region[] = ["DE", "DK", "SE", "NO", "CH"];

export const REGION_LANG: Record<Region, Lang> = { DE: "de", DK: "da", SE: "sv", NO: "no", CH: "de", OTHER: "en" };
export const LOCALES: Record<Lang, string> = { de: "de-DE", da: "da-DK", sv: "sv-SE", no: "nb-NO", en: "en-GB" };

export function isRegion(value: unknown): value is Region {
  return typeof value === "string" && (REGIONS as readonly string[]).includes(value);
}
