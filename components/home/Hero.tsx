"use client";

import Link from "next/link";
import Icon from "@/components/b2b/Icon";
import Flag from "@/components/b2b/Flag";
import { REGIONS, useRegion, useT, type Region } from "@/lib/i18n";
import dict from "@/content/i18n/landing.json";

const TRUST = [
  { icon: "verified", key: "trust1" },
  { icon: "sensors", key: "trust2" },
  { icon: "ac_unit", key: "trust3" },
  { icon: "water", key: "trust4" },
] as const;

const STATS = [
  { value: "3 m³", key: "stat_tank", highlight: false },
  { value: "4×", key: "stat_cycles", highlight: true },
  { value: "600 kg", key: "stat_yield", highlight: false },
] as const;

const REGION_KEY: Record<Region, keyof (typeof dict)["de"]> = {
  DE: "sel_de",
  DK: "sel_dk",
  SE: "sel_se",
  NO: "sel_no",
  CH: "sel_ch",
  OTHER: "sel_other",
};

export default function Hero() {
  const t = useT(dict);
  const { region, setRegion } = useRegion();

  return (
    <>
      <section className="relative overflow-hidden bg-surface-subtle px-margin py-space-2xl md:px-margin-tablet md:py-space-3xl lg:px-margin-desktop">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-tertiary/10 blur-2xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
          <div className="flex flex-col lg:col-span-7">
            <div className="mb-space-md flex flex-wrap items-center gap-space-xs">
              <span className="inline-flex items-center gap-1.5 rounded-xs bg-accent-cyan-light px-space-sm py-1 text-label-technical font-semibold text-tertiary">
                <Icon name="autorenew" size={15} />
                <span>{t("hero_eyebrow")}</span>
              </span>
              <span className="rounded-xs bg-surface-container px-space-sm py-1 text-label-technical text-steel">
                {t("hero_badge")}
              </span>
            </div>

            {/* Trusted first-party copy (contains the highlighted <span>) */}
            <h1
              className="mb-space-md text-display-hero-mobile text-surface-navy md:text-display-hero"
              dangerouslySetInnerHTML={{ __html: t("hero_h1a") }}
            />
            <p className="mb-space-lg max-w-2xl text-body-lg text-on-surface-variant">{t("hero_p")}</p>

            <div className="mb-space-lg rounded-lg bg-surface-canvas p-space-md shadow-sm">
              <div className="text-label-technical uppercase text-steel">{t("hero_lease_label")}</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-label-numeric-lg text-surface-navy">ab €499</span>
                <span className="text-body-md text-on-surface-variant">{t("hero_per_month")}</span>
              </div>
            </div>

            <div className="mb-space-lg flex flex-col items-stretch gap-space-md sm:flex-row sm:items-center">
              <Link
                href="/leasing"
                className="inline-flex items-center justify-center gap-space-xs rounded bg-primary-container px-space-lg py-3.5 text-body-md font-bold text-on-primary shadow-md transition-all hover:bg-primary"
              >
                <Icon name="shopping_cart_checkout" size={20} />
                <span>{t("hero_cta")}</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-space-sm text-label-technical uppercase text-steel sm:grid-cols-4">
              {TRUST.map((item) => (
                <div key={item.key} className="flex items-center gap-1.5">
                  <Icon name={item.icon} size={18} className="text-primary" />
                  <span>{t(item.key)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl bg-surface-canvas p-space-lg shadow-xl">
              <div className="mb-space-sm flex items-center justify-between gap-2">
                <span className="text-label-technical font-bold text-primary">{t("mp_badge")}</span>
                <span className="inline-flex items-center gap-1 rounded-xs bg-compliance-green-bg px-2 py-0.5 text-label-technical text-compliance-green">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-compliance-green" />
                  <span>{t("mp_res")}</span>
                </span>
              </div>
              <div className="relative mb-space-md aspect-square w-full overflow-hidden rounded-lg bg-surface-subtle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-full w-full object-contain p-4"
                  src="/images/aquacube-measure.jpg"
                  alt="Aquacube Model Pro mit Maßangaben: 4,0 m Länge, 2,5 m Breite, 1,41 m Höhe"
                />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-surface-navy/90 px-3 py-1.5 text-body-sm text-on-primary shadow backdrop-blur-sm">
                  <span className="font-semibold text-accent-aquamarine">4.0m</span> {t("dim_l")}{" "}
                  <span className="font-semibold text-accent-aquamarine">2.0m</span> {t("dim_w")}{" "}
                  <span className="font-semibold text-accent-aquamarine">1.41m</span> {t("dim_h")}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-space-sm text-center">
                {STATS.map((stat) => (
                  <div key={stat.key} className="rounded-xs bg-surface-subtle p-space-sm">
                    <div className={`text-label-numeric-lg leading-none ${stat.highlight ? "text-primary" : "text-surface-navy"}`}>
                      {stat.value}
                    </div>
                    <div className="mt-1 text-label-technical uppercase text-steel">{t(stat.key)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery zone + region picker (sets the page language) */}
      <section className="bg-surface-canvas px-margin py-space-lg shadow-sm md:px-margin-tablet lg:px-margin-desktop">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-space-md lg:flex-row">
          <div className="flex flex-col items-center gap-space-md text-center sm:flex-row sm:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-cyan-light text-primary">
              <Icon name="local_shipping" size={28} />
            </div>
            <div>
              <div className="text-label-technical uppercase text-steel">{t("ship_label")}</div>
              <div className="mt-0.5 text-body-sm text-steel">{t("ship_note")}</div>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap justify-center gap-2">
            {REGIONS.map((r) => {
              const active = region === r;
              return (
                <button
                  key={r}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setRegion(r)}
                  className={`inline-flex items-center gap-2 rounded border px-space-md py-2 text-body-md font-semibold transition-colors ${
                    active
                      ? "border-primary-container bg-primary-container text-on-primary"
                      : "border-border-strong bg-surface-canvas text-surface-navy hover:bg-surface-subtle"
                  }`}
                >
                  <Flag region={r} />
                  <span>{t(REGION_KEY[r])}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
