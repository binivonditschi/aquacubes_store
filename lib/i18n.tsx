"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

/**
 * Region → language switching from the Last-main site. The visitor picks their
 * installation country; that sets the page language and is remembered under the
 * same storage key the static site used ("ac-region").
 */
export const REGIONS = ["DE", "DK", "SE", "NO", "CH", "OTHER"] as const;
export type Region = (typeof REGIONS)[number];
export type Lang = "de" | "da" | "sv" | "no" | "en";

/** Countries we deliver to and sell in directly. */
export const DELIVERY_REGIONS: Region[] = ["DE", "DK", "SE", "NO", "CH"];

export const REGION_LANG: Record<Region, Lang> = { DE: "de", DK: "da", SE: "sv", NO: "no", CH: "de", OTHER: "en" };
export const REGION_FLAG: Record<Region, string> = { DE: "🇩🇪", DK: "🇩🇰", SE: "🇸🇪", NO: "🇳🇴", CH: "🇨🇭", OTHER: "🌍" };
export const LOCALES: Record<Lang, string> = { de: "de-DE", da: "da-DK", sv: "sv-SE", no: "nb-NO", en: "en-GB" };

const STORAGE_KEY = "ac-region";

export function isRegion(value: unknown): value is Region {
  return typeof value === "string" && (REGIONS as readonly string[]).includes(value);
}

interface RegionContextValue {
  region: Region;
  lang: Lang;
  locale: string;
  setRegion: (region: Region) => void;
}

const RegionContext = createContext<RegionContextValue>({
  region: "DE",
  lang: "de",
  locale: LOCALES.de,
  setRegion: () => {},
});

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegionState] = useState<Region>("DE");

  // ?region=XX in the URL wins, then the remembered choice, else Germany.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("region")?.toUpperCase();
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage blocked — fall back to the default region.
    }
    const initial = isRegion(fromUrl) ? fromUrl : isRegion(stored) ? stored : null;
    if (initial) setRegionState(initial);
  }, []);

  const lang = REGION_LANG[region];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setRegion = useCallback((next: Region) => {
    setRegionState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Not remembered, but still applied for this page view.
    }
  }, []);

  return (
    <RegionContext.Provider value={{ region, lang, locale: LOCALES[lang], setRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  return useContext(RegionContext);
}

type Dictionary = Record<Lang, Record<string, string>>;

/** Returns a lookup for one of the content/i18n/*.json dictionaries in the current language. */
export function useT<D extends Dictionary>(dict: D) {
  const { lang } = useRegion();
  return useCallback(
    (key: keyof D["de"] & string): string => dict[lang]?.[key] ?? dict.de[key] ?? key,
    [dict, lang],
  );
}
