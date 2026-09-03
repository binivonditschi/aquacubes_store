"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ALLOWED_COUNTRIES = ["DE", "AT", "DK"];
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
            className="fixed left-1/2 top-1/2 z-[100] w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-8 text-center shadow-modal"
          >
            <h2 id="region-modal-title" className="mb-3 font-heading text-xl font-semibold text-navy">
              Not Available in Your Region
            </h2>
            <p className="mb-6 text-sm text-gray-500">
              Aquacubes currently only ships to and accepts orders from Germany, Austria, and Denmark. Ordering
              is not available outside these countries yet.
            </p>
            <button
              onClick={close}
              className="w-full rounded-button bg-navy py-3 font-body text-sm font-medium text-white transition-colors hover:bg-navy-light"
            >
              Got it
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
