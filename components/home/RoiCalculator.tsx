"use client";

import { useState } from "react";
import Link from "next/link";
import { Strike, useBlackFriday } from "@/components/store/BlackFriday";
import { useRegion, useT } from "@/lib/i18n";
import { PACKAGES, packagePrice } from "@/lib/leasing";
import dict from "@/content/i18n/landing.json";

const YIELD_PER_CUBE_KG = 600;
const FOOTPRINT_PER_CUBE_M2 = 8;

/** Yearly lease total: the Micro-Farm rate applies from 10 cubes, the Starter rate below that. */
function annualLeaseFor(cubes: number, promo: boolean) {
  const perCube = cubes >= 10 ? packagePrice("micro", promo).monthlyRate / PACKAGES.micro.cubes : packagePrice("starter", promo).monthlyRate;
  return cubes * perCube * 12;
}

const SPECIES = [
  { key: "cs1", pricePerKg: 28 },
  { key: "cs2", pricePerKg: 19 },
  { key: "cs3", pricePerKg: 34 },
  { key: "cs4", pricePerKg: 15 },
] as const;

export default function RoiCalculator() {
  const t = useT(dict);
  const { locale } = useRegion();
  const promo = useBlackFriday();
  const [cubes, setCubes] = useState(10);
  const [pricePerKg, setPricePerKg] = useState<number>(SPECIES[0].pricePerKg);

  const fmt = (n: number) => n.toLocaleString(locale);
  const annualYield = cubes * YIELD_PER_CUBE_KG;
  const revenue = annualYield * pricePerKg;
  const footprint = cubes * FOOTPRINT_PER_CUBE_M2;
  const annualLease = annualLeaseFor(cubes, promo);

  return (
    <section id="yield-calculator" className="bg-surface-subtle px-margin py-space-2xl md:px-margin-tablet lg:px-margin-desktop">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-space-xl max-w-3xl text-center">
          <div className="mb-space-xs text-label-technical font-semibold uppercase text-primary">{t("calc_eyebrow")}</div>
          <h2 className="mb-space-sm text-headline-xl-mobile text-surface-navy md:text-headline-xl">{t("calc_h2")}</h2>
          <p className="text-body-lg text-on-surface-variant">{t("calc_p")}</p>
        </div>

        <div className="grid grid-cols-1 items-center gap-space-xl rounded-2xl bg-surface-canvas p-space-lg shadow-md md:p-space-xl lg:grid-cols-12">
          <div className="space-y-space-lg lg:col-span-6">
            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <label htmlFor="cubeSlider" className="text-headline-md text-surface-navy">
                  {t("calc_cubes_label")}
                </label>
                <span className="text-label-numeric-lg text-primary">
                  {cubes} {cubes === 1 ? t("cube_1") : t("cube_n")}
                </span>
              </div>
              <input
                id="cubeSlider"
                type="range"
                min={1}
                max={50}
                value={cubes}
                onChange={(e) => setCubes(parseInt(e.target.value, 10))}
                className="h-2 w-full cursor-pointer rounded bg-surface-container accent-primary"
              />
              <div className="mt-1 flex justify-between gap-2 text-body-sm text-steel">
                <span>{t("calc_opt1")}</span>
                <span className="text-center">{t("calc_opt25")}</span>
                <span className="text-right">{t("calc_opt50")}</span>
              </div>
            </div>

            <div>
              <label htmlFor="speciesSelect" className="mb-2 block text-headline-md text-surface-navy">
                {t("calc_species_label")}
              </label>
              <select
                id="speciesSelect"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(parseFloat(e.target.value))}
                className="w-full rounded bg-surface-subtle p-3 text-body-md text-surface-navy shadow-sm focus:outline-none"
              >
                {SPECIES.map((s) => (
                  <option key={s.key} value={s.pricePerKg}>
                    {t(s.key)}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-label-legal text-steel">{t("calc_footnote")}</p>
            </div>

            <div className="space-y-space-xs rounded-lg bg-surface-subtle p-space-md text-body-sm text-steel">
              <div className="flex justify-between gap-4">
                <span>{t("calc_area_label")}</span>
                <strong className="text-right text-surface-navy">
                  {fmt(footprint)}
                  {t("area_suffix")}
                </strong>
              </div>
              <div className="flex justify-between gap-4">
                <span>{t("calc_circ_label")}</span>
                <strong className="text-right text-compliance-green">{t("calc_circ_val")}</strong>
              </div>
              <div className="flex justify-between gap-4">
                <span>{t("calc_maint_label")}</span>
                <strong className="text-right text-surface-navy">{t("calc_maint_val")}</strong>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-lg bg-surface-navy p-space-lg text-on-primary shadow-lg md:p-space-xl lg:col-span-6">
            <div>
              <div className="mb-space-md flex items-center justify-between gap-2">
                <span className="text-label-technical font-semibold uppercase text-accent-aquamarine">{t("res_h")}</span>
                <span className="rounded-xs bg-surface-navy-elevated px-2.5 py-0.5 text-body-sm text-secondary-fixed-dim">{t("res_sub")}</span>
              </div>

              <div className="mb-space-lg grid grid-cols-1 gap-space-md sm:grid-cols-2">
                <div className="rounded bg-surface-navy-elevated p-space-md">
                  <div className="text-body-sm text-secondary-fixed-dim">{t("res_yield")}</div>
                  <div className="mt-1 text-label-numeric-lg text-primary-fixed">{fmt(annualYield)} kg</div>
                  <div className="mt-0.5 text-label-legal text-secondary-fixed-dim">{t("res_yield_sub")}</div>
                </div>
                <div className="rounded bg-surface-navy-elevated p-space-md">
                  <div className="text-body-sm text-secondary-fixed-dim">{t("res_value")}</div>
                  <div className="mt-1 text-label-numeric-lg text-accent-aquamarine">€{fmt(revenue)}</div>
                  <div className="mt-0.5 text-label-legal text-secondary-fixed-dim">{t("res_value_sub")}</div>
                </div>
              </div>

              <div className="mb-space-lg space-y-space-xs text-body-sm text-secondary-fixed-dim">
                <div className="flex justify-between gap-4 py-1">
                  <span>{t("res_lease")}</span>
                  <span className="font-semibold text-on-primary">
                    {promo && <Strike className="mr-2 font-normal text-secondary-fixed-dim">€{fmt(annualLeaseFor(cubes, false))}</Strike>}
                    €{fmt(annualLease)}
                  </span>
                </div>
                <div className="flex justify-between gap-4 py-1">
                  <span>{t("res_water")}</span>
                  <span className="text-right font-semibold text-accent-aquamarine">{t("res_water_val")}</span>
                </div>
                <div className="flex justify-between gap-4 py-1">
                  <span>{t("res_feed")}</span>
                  <span className="font-semibold text-on-primary">FCR &lt; 1.15</span>
                </div>
              </div>
            </div>

            <Link
              href={cubes >= 10 ? "/leasing?pkg=micro" : "/leasing?pkg=starter"}
              className="w-full rounded bg-primary py-3.5 text-center text-body-md font-bold text-on-primary shadow transition-colors hover:bg-primary-container"
            >
              {t("res_cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
