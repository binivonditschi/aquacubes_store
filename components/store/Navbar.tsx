"use client";

import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useEffect, useState } from "react";

export default function Navbar() {
  const itemCount = useCart((s) => s.itemCount());
  const openCart = useCart((s) => s.openCart);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-heading-3 font-medium tracking-tight text-foreground">
          Aquacubes
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-body-sm text-muted-foreground transition-colors hover:text-foreground">
            Shop
          </Link>
          <Link href="/" className="text-body-sm text-muted-foreground transition-colors hover:text-foreground">
            About
          </Link>
          <button
            onClick={openCart}
            className="relative rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {mounted && itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={openCart}
            className="relative rounded-md p-2 text-muted-foreground"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {mounted && itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-md p-2 text-muted-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/" onClick={() => setMobileOpen(false)} className="text-body text-foreground">
              Shop
            </Link>
            <Link href="/" onClick={() => setMobileOpen(false)} className="text-body text-foreground">
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
