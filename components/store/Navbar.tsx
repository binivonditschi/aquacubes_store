"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";
import dict from "@/content/i18n/landing.json";
import AccountMenu from "./AccountMenu";

export default function Navbar() {
  const t = useT(dict);

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
            href="/leasing"
            className="inline-flex items-center rounded-xs bg-primary-container px-space-sm py-2 text-body-sm font-semibold text-on-primary shadow-sm transition-colors hover:bg-primary sm:px-space-md sm:text-body-md"
          >
            {t("hdr_cta")}
          </Link>
        </div>
      </div>
    </header>
  );
}
