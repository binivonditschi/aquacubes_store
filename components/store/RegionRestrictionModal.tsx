"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ALLOWED_COUNTRIES = ["DE", "AT", "DK", "CN", "NO"];
const DISMISS_KEY = "regionNoticeDismissed";

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export default function RegionRestrictionModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const country = getCookie("shipCountry");
    const alreadyDismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
    if (country && !ALLOWED_COUNTRIES.includes(country) && !alreadyDismissed) {
      setOpen(true);
    }
  }, []);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-navy/40 backdrop-blur-sm"
            onClick={close}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="region-modal-title"
            className="fixed left-1/2 top-1/2 z-[100] w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-surface-canvas p-space-xl text-center shadow-2xl"
          >
            <h2 id="region-modal-title" className="mb-3 text-headline-lg text-surface-navy">
              In Ihrer Region nicht verfügbar
            </h2>
            <p className="mb-6 text-body-md text-steel">
              Aquacubes liefert und nimmt Bestellungen derzeit nur aus Deutschland, Österreich und Dänemark an.
              Für andere Regionen kontaktieren Sie bitte unser Vertriebsteam.
            </p>
            <button
              onClick={close}
              className="w-full rounded bg-surface-navy py-3 text-body-md font-bold text-on-primary transition-colors hover:bg-surface-navy-elevated"
            >
              Verstanden
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
