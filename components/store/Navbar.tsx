"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "@/components/b2b/Icon";
import { useCart } from "@/store/useCart";
import AccountMenu from "./AccountMenu";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const itemCount = useCart((s) => s.itemCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-surface-canvas/95 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-space-sm px-margin md:px-margin-tablet lg:px-margin-desktop">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Aquacubes Startseite">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/aquacubes-logo.png" alt="Aquacubes Logo" className="h-7 w-auto object-contain sm:h-9" />
        </Link>

        <div className="flex items-center gap-space-sm sm:gap-space-md">
          <AccountMenu />

          <Link
            href="/checkout"
            aria-label="Warenkorb"
            className="relative flex h-9 w-9 items-center justify-center rounded text-surface-navy transition-colors hover:bg-surface-subtle"
          >
            <Icon name="shopping_bag" size={22} />
            {mounted && itemCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-aquamarine text-[10px] font-bold text-surface-navy"
              >
                {itemCount}
              </motion.span>
            )}
          </Link>

          <Link
            href="/shop"
            className="inline-flex items-center rounded-xs bg-primary-container px-space-sm py-2 text-body-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary sm:px-space-md sm:text-body-md"
          >
            <span className="sm:hidden">Reservieren</span>
            <span className="hidden sm:inline">Cube reservieren / bestellen</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
