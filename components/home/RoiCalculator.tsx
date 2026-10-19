"use client";

import { useState } from "react";
import Link from "next/link";
import content from "@/content/home.json";

const YIELD_PER_CUBE_KG = 600;
const FOOTPRINT_PER_CUBE_M2 = 8;
// Micro-Farm rate applies from 10 cubes, Starter rate below that.
const LEASE_RATE_SMALL = 699;
const LEASE_RATE_FARM = 499;

const fmt = (n: number) => n.toLocaleString("de-DE");

export default function RoiCalculator() {
  const { calculator } = content;
  const [cubes, setCubes] = useState(10);
  const [pricePerKg, setPricePerKg] = useState(calculator.species[0].pricePerKg);

  const annualYield = cubes * YIELD_PER_CUBE_KG;
  const revenue = annualYield * pricePerKg;
  const footprint = cubes * FOOTPRINT_PER_CUBE_M2;
  const annualLease = cubes * (cubes >= 10 ? LEASE_RATE_FARM : LEASE_RATE_SMALL) * 12;

  return (
    <section
      id="yield-calculator"
      className="bg-surface-subtle px-margin py-space-2xl md:px-margin-tablet lg:px-margin-desktop"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-space-xl max-w-3xl text-center">
          <div className="mb-space-xs text-label-technical font-semibold uppercase text-primary">
            {calculator.eyebrow}
          </div>
          <h2 className="mb-space-sm text-headline-xl-mobile text-surface-navy md:text-headline-xl">
            {calculator.title}
          </h2>
          <p className="text-body-lg text-on-surface-variant">{calculator.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 items-center gap-space-xl rounded-2xl bg-surface-canvas p-space-lg shadow-md md:p-space-xl lg:grid-cols-12">
          <div className="space-y-space-lg lg:col-span-6">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="cubeSlider" className="text-headline-md text-surface-navy">
                  Anzahl Aquacubes:
                </label>
                <span className="text-label-numeric-lg text-primary">
                  {cubes} {cubes === 1 ? "Cube" : "Cubes"}
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
              <div className="mt-1 flex justify-between text-body-sm text-steel">
                <span>1 Cube (Testbetrieb)</span>
                <span>25 Cubes (Mittelstand)</span>
                <span>50 Cubes (Industrie-Hub)</span>
              </div>
            </div>

            <div>
              <label htmlFor="speciesSelect" className="mb-2 block text-headline-md text-surface-navy">
                Ziel-Spezies &amp; Marktpreis-Referenz:
              </label>
              <select
                id="speciesSelect"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(parseFloat(e.target.value))}
                className="w-full rounded bg-surface-subtle p-3 text-body-md text-surface-navy shadow-sm focus:outline-none"
              >
                {calculator.species.map((s) => (
                  <option key={s.label} value={s.pricePerKg}>
                    {s.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-label-legal text-steel">{calculator.speciesNote}</p>
            </div>

            <div className="space-y-space-xs rounded-lg bg-surface-subtle p-space-md text-body-sm text-steel">
              <div className="flex justify-between gap-4">
                <span>Erforderliche Grundfläche:</span>
                <strong className="text-right text-surface-navy">{fmt(footprint)} m² (inkl. Bedienkorridor)</strong>
              </div>
              <div className="flex justify-between gap-4">
                <span>Kreislaufeffizienz:</span>
                <strong className="text-right text-compliance-green">99% Wasserrückführung</strong>
              </div>
              <div className="flex justify-between gap-4">
                <span>Wartungsintervall:</span>
                <strong className="text-right text-surface-navy">Autonom mit wöchentlichem Routine-Check</strong>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-lg bg-surface-navy p-space-lg text-on-primary shadow-lg md:p-space-xl lg:col-span-6">
            <div>
              <div className="mb-space-md flex items-center justify-between gap-2">
                <span className="text-label-technical font-semibold uppercase text-accent-aquamarine">
                  Prognose-Übersicht (12 Monate)
                </span>
                <span className="rounded-xs bg-surface-navy-elevated px-2.5 py-0.5 text-body-sm text-secondary-fixed-dim">
                  DIN 16738 RAS Modell
                </span>
              </div>

              <div className="mb-space-lg grid grid-cols-1 gap-space-md sm:grid-cols-2">
                <div className="rounded bg-surface-navy-elevated p-space-md">
                  <div className="text-body-sm text-secondary-fixed-dim">Jahresgesamtertrag</div>
                  <div className="mt-1 text-label-numeric-lg text-primary-fixed">{fmt(annualYield)} kg</div>
                  <div className="mt-0.5 text-label-legal text-secondary-fixed-dim">Gereinigt &amp; küchenfertig</div>
                </div>
                <div className="rounded bg-surface-navy-elevated p-space-md">
                  <div className="text-body-sm text-secondary-fixed-dim">Geschätzter Marktwert</div>
                  <div className="mt-1 text-label-numeric-lg text-accent-aquamarine">€{fmt(revenue)}</div>
                  <div className="mt-0.5 text-label-legal text-secondary-fixed-dim">Jährlicher Brutto-Umsatzerlös</div>
                </div>
              </div>

              <div className="mb-space-lg space-y-space-xs text-body-sm text-secondary-fixed-dim">
                <div className="flex justify-between py-1">
                  <span>Leasingaufwand p.a. (netto):</span>
                  <span className="font-semibold text-on-primary">€{fmt(annualLease)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Wassereinsparung vs. Durchlauf:</span>
                  <span className="font-semibold text-accent-aquamarine">≈ 94.000 Liter / Zyklus</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Autonome Fütterungspräzision:</span>
                  <span className="font-semibold text-on-primary">FCR &lt; 1.15</span>
                </div>
              </div>
            </div>

            <Link
              href={cubes >= 10 ? "/shop/micro-farms" : "/shop/starter"}
              className="w-full rounded bg-primary py-3.5 text-center text-body-md font-bold text-on-primary shadow transition-colors hover:bg-primary-container"
            >
              {calculator.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
