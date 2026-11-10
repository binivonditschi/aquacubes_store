"use client";

import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MotionConfig, motion } from "framer-motion";
import Icon from "@/components/b2b/Icon";
import { useT } from "@/lib/i18n";
import { BLACK_FRIDAY_ENDS_AT, isBlackFriday } from "@/lib/leasing";
import dict from "@/content/i18n/landing.json";

// Pages where a sales banner would get in the way of a finished or abandoned payment.
const NO_BANNER_PATHS = ["/danke", "/checkout"];

function subscribeToClock(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}

function secondsLeft() {
  return Math.max(0, Math.floor((BLACK_FRIDAY_ENDS_AT - Date.now()) / 1000));
}

/** True while the sale runs; flips by itself when the countdown reaches zero. */
export function useBlackFriday() {
  // The pages are prerendered during the sale, so hydration starts from "on".
  return useSyncExternalStore(subscribeToClock, isBlackFriday, () => true);
}

/** An old price with a line drawn through its middle when it scrolls into view. */
export function Strike({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <MotionConfig reducedMotion="user">
      <span className={`relative inline-block whitespace-nowrap ${className}`}>
        <s className="no-underline">{children}</s>
        <motion.span
          aria-hidden
          className="absolute -inset-x-0.5 top-1/2 h-[max(1.5px,0.08em)] origin-left -translate-y-1/2 rounded-full bg-error"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
    </MotionConfig>
  );
}

/** "~~€699~~ [BLACK FRIDAY −14%]": the line shown above a discounted price. */
export function PriceDrop({ list, price, label }: { list: number; price: number; label: string }) {
  const percent = Math.round((1 - price / list) * 100);
  return (
    <div className="mb-1 flex flex-wrap items-center gap-2">
      <Strike className="text-headline-md text-steel">{label}</Strike>
      <MotionConfig reducedMotion="user">
        <motion.span
          className="relative inline-flex items-center gap-1.5 overflow-hidden rounded-pill bg-surface-navy px-2.5 py-0.5 text-label-technical uppercase text-accent-aquamarine"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.7 }}
        >
          <span aria-hidden className="bf-sweep absolute inset-0" />
          <span className="relative">Black Friday</span>
          <span className="relative font-extrabold text-on-primary">−{percent}%</span>
        </motion.span>
      </MotionConfig>
    </div>
  );
}

function CountdownUnit({ value, label }: { value: number | null; label: string }) {
  const digits = value === null ? "--" : String(value).padStart(2, "0");
  return (
    <div className="flex min-w-9 flex-col items-center sm:min-w-11 rounded bg-white/10 px-1.5 py-1 ring-1 ring-white/10">
      <div className="h-5 overflow-hidden text-body-lg font-bold leading-5 tabular-nums">
        <motion.span
          key={digits}
          className="block"
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {digits}
        </motion.span>
      </div>
      <div className="text-[9px] uppercase leading-3 tracking-wider text-white/60">{label}</div>
    </div>
  );
}

function Countdown() {
  const t = useT(dict);
  // Unknown on the server, so the digits only appear once the page is live.
  const left = useSyncExternalStore(subscribeToClock, secondsLeft, () => null);
  const part = (seconds: number, modulo?: number) => {
    if (left === null) return null;
    const whole = Math.floor(left / seconds);
    return modulo ? whole % modulo : whole;
  };

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-body-sm text-white/70 sm:inline">{t("bf_ends")}</span>
      <div role="timer" className="flex gap-1">
        <CountdownUnit value={part(86400)} label={t("bf_days")} />
        <CountdownUnit value={part(3600, 24)} label={t("bf_hours")} />
        <CountdownUnit value={part(60, 60)} label={t("bf_mins")} />
        <CountdownUnit value={part(1, 60)} label={t("bf_secs")} />
      </div>
    </div>
  );
}

export function BlackFridayBanner() {
  const t = useT(dict);
  const promo = useBlackFriday();
  const pathname = usePathname();

  if (!promo || NO_BANNER_PATHS.some((path) => pathname.startsWith(path))) return null;

  return (
    <aside className="sticky top-16 z-40 overflow-hidden bg-[#05080f] px-margin py-1.5 text-on-primary shadow-md md:px-margin-tablet lg:px-margin-desktop lg:py-space-sm">
      <div aria-hidden className="bf-sweep absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -left-16 -top-24 h-56 w-56 rounded-full bg-accent-aquamarine/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-tertiary/40 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-2 gap-y-1 sm:gap-x-space-md lg:flex-nowrap lg:gap-x-space-lg">
        <div className="contents">
          <span className="inline-flex shrink-0 items-center gap-1.5 text-body-sm font-extrabold uppercase tracking-[0.08em] text-accent-aquamarine sm:gap-2 sm:text-body-md sm:tracking-[0.18em]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent-aquamarine" />
            Black Friday
          </span>
          <span className="order-last w-full text-center text-body-sm font-medium lg:order-none lg:w-auto lg:flex-1 lg:text-left lg:text-body-md">{t("bf_headline")}</span>
        </div>

        <div className="flex shrink-0 items-center gap-x-2 sm:gap-x-space-md">
          <Countdown />
          <Link
            href="/leasing" aria-label={t("bf_cta")}
            className="group inline-flex items-center gap-1 rounded bg-accent-aquamarine p-2 text-body-md sm:px-space-md font-bold text-surface-navy transition-colors hover:bg-primary-fixed"
          >
            <span className="hidden sm:inline">{t("bf_cta")}</span>
            <Icon name="arrow_forward" size={18} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
