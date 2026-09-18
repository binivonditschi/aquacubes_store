"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/store/useCart";
import AccountMenu from "./AccountMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const itemCount = useCart((s) => s.itemCount());
  const openCart = useCart((s) => s.openCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  if (pathname === "/") return null;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 bg-white transition-shadow duration-500 ${
          scrolled ? "shadow-nav" : ""
        }`}
      >
        <div className="relative mx-auto flex h-20 max-w-content items-center px-6 lg:px-10">
          <Link href="/" className="absolute left-6 top-1/2 z-10 -translate-y-1/2 lg:left-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Aquacubes Logo.png" alt="Aquacubes" className="h-96 w-auto lg:h-48" />
          </Link>

          <div className="ml-auto hidden items-center gap-5 lg:flex">
            <AccountMenu variant="light" />

            <button
              onClick={openCart}
              aria-label="Open cart"
              className="relative rounded-button p-2 transition-colors hover:bg-gray-50"
            >
              <ShoppingBag className="h-5 w-5 text-navy" />
              {mounted && itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-navy"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="ml-auto rounded-button p-2 lg:hidden"
          >
            <Menu className="h-6 w-6 text-navy" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-navy/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed left-0 top-0 z-[70] flex h-full w-[85vw] max-w-[360px] flex-col bg-navy lg:hidden"
            >
              <div className="flex items-center justify-between p-6">
                <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/Aquacubes Logo.png" alt="Aquacubes" className="h-11 w-auto brightness-0 invert" />
                </Link>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="rounded-button p-2 text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
