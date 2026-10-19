"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Same storage key as the static b2b site, so an existing choice carries over.
const STORAGE_KEY = "aquacubes-cookie-consent";
const OPEN_EVENT = "aquacubes:open-cookie-settings";

type Consent = { essential: true; analytics: boolean; ts?: string };

function readConsent(): Consent | null {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
  } catch {
    return null;
  }
}

/** Opens the settings dialog from anywhere (e.g. the footer link). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export default function CookieConsent() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    if (!readConsent()) setBannerOpen(true);

    const onOpen = () => {
      setAnalytics(Boolean(readConsent()?.analytics));
      setModalOpen(true);
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const save = (consent: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...consent, ts: new Date().toISOString() }));
    } catch {
      // Storage blocked — the choice simply isn't remembered.
    }
    setBannerOpen(false);
    setModalOpen(false);
  };

  return (
    <>
      {bannerOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-surface-navy text-on-primary shadow-2xl">
          <div className="mx-auto flex max-w-5xl flex-col gap-space-md px-space-lg py-space-md md:flex-row md:items-center">
            <p className="flex-1 text-sm text-secondary-fixed-dim">
              Wir verwenden technisch notwendige Cookies sowie – mit Ihrer Einwilligung – optionale Analyse-Cookies, um
              unsere Website zu verbessern. Details in der{" "}
              <Link className="text-primary-fixed underline" href="/datenschutz">
                Datenschutzerklärung
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-space-sm">
              <button
                onClick={openCookieSettings}
                className="rounded-xs border border-secondary-fixed-dim px-space-md py-2 text-sm transition-colors hover:bg-surface-navy-elevated"
              >
                Einstellungen
              </button>
              <button
                onClick={() => save({ essential: true, analytics: false })}
                className="rounded-xs bg-surface-navy-elevated px-space-md py-2 text-sm transition-colors hover:bg-surface-container-high hover:text-on-surface"
              >
                Nur notwendige
              </button>
              <button
                onClick={() => save({ essential: true, analytics: true })}
                className="rounded-xs bg-primary-container px-space-md py-2 text-sm font-semibold transition-colors hover:bg-primary"
              >
                Alle akzeptieren
              </button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            className="w-full max-w-lg rounded-2xl bg-surface-canvas p-space-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="cookie-settings-title" className="mb-space-sm text-headline-lg text-surface-navy">
              Cookie-Einstellungen
            </h3>
            <div className="mb-space-lg space-y-space-md">
              <label className="flex items-start justify-between gap-space-md">
                <span>
                  <span className="block text-sm font-semibold text-surface-navy">Technisch notwendige</span>
                  <span className="block text-sm text-steel">
                    Erforderlich für Grundfunktionen (z. B. Speicherung dieser Einwilligung). Immer aktiv.
                  </span>
                </span>
                <input type="checkbox" checked disabled className="mt-1 accent-primary" />
              </label>
              <label className="flex items-start justify-between gap-space-md">
                <span>
                  <span className="block text-sm font-semibold text-surface-navy">Analyse &amp; Statistik</span>
                  <span className="block text-sm text-steel">
                    Anonyme Nutzungsstatistiken zur Verbesserung der Website. Nur mit Einwilligung.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 accent-primary"
                />
              </label>
            </div>
            <div className="flex justify-end gap-space-sm">
              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xs px-space-md py-2 text-sm text-steel transition-colors hover:bg-surface-subtle"
              >
                Abbrechen
              </button>
              <button
                onClick={() => save({ essential: true, analytics })}
                className="rounded-xs bg-primary-container px-space-md py-2 text-sm font-semibold text-on-primary transition-colors hover:bg-primary"
              >
                Auswahl speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
