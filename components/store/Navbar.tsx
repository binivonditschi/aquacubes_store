"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/store/useCart";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const springTransition = { type: "spring" as const, stiffness: 380, damping: 30 };

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

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/85 backdrop-blur-xl shadow-nav" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="4" width="32" height="32" rx="6" stroke="#0A2540" strokeWidth="2.5" fill="none" />
              <path d="M12 28c0-8 6-14 8-16 2 2 8 8 8 16" stroke="#00D4AA" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <circle cx="20" cy="14" r="2" fill="#00D4AA" />
            </svg>
            <span className="font-heading text-xl font-bold text-navy">Aquacubes</span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative font-body text-sm font-medium uppercase tracking-[0.05em] transition-colors ${
                  isActive(link.href) ? "text-teal" : "text-navy hover:text-teal"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-[2px] left-0 h-[2px] w-0 bg-teal/40 transition-all duration-300 group-hover:w-full" />
                {isActive(link.href) && (
                  <motion.div
                    layoutId="activeNav"
                    transition={springTransition}
                    className="absolute -bottom-[6px] left-0 right-0 h-[2px] bg-teal"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
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
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-coral text-[10px] font-bold text-white"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded-button p-2 lg:hidden"
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
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="32" height="32" rx="6" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
                    <path d="M12 28c0-8 6-14 8-16 2 2 8 8 8 16" stroke="#00D4AA" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                    <circle cx="20" cy="14" r="2" fill="#00D4AA" />
                  </svg>
                  <span className="font-heading text-xl font-bold text-white">Aquacubes</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="rounded-button p-2 text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-2 px-6 py-4">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24, delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 font-heading text-2xl font-semibold transition-colors ${
                        isActive(link.href) ? "text-teal" : "text-white hover:text-teal"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
