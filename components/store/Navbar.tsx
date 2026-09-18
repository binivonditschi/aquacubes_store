"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { useCart } from "@/store/useCart";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const itemCount = useCart((s) => s.itemCount());
  const openCart = useCart((s) => s.openCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  const handleAccountClick = async () => {
    if (userEmail) {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } else {
      router.push("/login");
    }
  };

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
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Aquacubes Logo.png" alt="Aquacubes" className="h-96 w-auto lg:h-48" />
          </Link>

          <div className="hidden items-center gap-5 lg:flex">
            <button
              onClick={handleAccountClick}
              aria-label={userEmail ? "Sign out" : "Sign in"}
              title={userEmail ?? "Sign in"}
              className="rounded-button p-2 transition-colors hover:bg-gray-50"
            >
              <User className="h-5 w-5 text-navy" />
            </button>

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
