"use client";

import Link from "next/link";
import Icon from "@/components/b2b/Icon";
import { useT } from "@/lib/i18n";
import dict from "@/content/i18n/landing.json";

type Key = keyof (typeof dict)["de"];

interface Feature {
  icon: string;
  key: Key;
  strongKey?: Key;
  muted?: boolean;
}

const STARTER: Feature[] = [
  { icon: "check_circle", strongKey: "sf1", key: "sf1b" },
  { icon: "check_circle", key: "sf2" },
  { icon: "check_circle", key: "sf3" },
  { icon: "check_circle", key: "sf4" },
  { icon: "schedule", key: "starter_upgrade", muted: true },
];
const MICRO: Feature[] = [
  { icon: "verified", strongKey: "mf1", key: "mf1b" },
  { icon: "verified", key: "mf2" },
  { icon: "verified", key: "mf3" },
  { icon: "verified", key: "mf4" },
  { icon: "verified", key: "mf5" },
];
const ENTERPRISE: Feature[] = [
  { icon: "check_circle", key: "ef2" },
  { icon: "check_circle", key: "ef3" },
  { icon: "check_circle", key: "ef4" },
  { icon: "check_circle", key: "ef5" },
];

function FeatureList({ items, t }: { items: Feature[]; t: (k: Key) => string }) {
  return (
    <ul className="mb-space-xl space-y-space-sm text-body-sm text-on-surface">
      {items.map((f) => (
        <li key={f.key} className="flex items-start gap-2">
          <Icon name={f.icon} size={18} className={`mt-0.5 ${f.muted ? "text-steel" : "text-primary"}`} />
          <span>
            {f.strongKey && <strong>{t(f.strongKey)} </strong>}
            {t(f.key)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Pricing() {
  const t = useT(dict);
  const button = "block w-full rounded px-space-md py-3.5 text-center text-body-md font-bold transition-colors";

  return (
    <section id="commercial-packages" className="bg-surface px-margin py-space-3xl md:px-margin-tablet lg:px-margin-desktop">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-space-2xl max-w-3xl text-center">
          <div className="mb-space-xs inline-block text-label-technical font-semibold uppercase text-primary">{t("price_eyebrow")}</div>
          <h2 className="mb-space-sm text-headline-xl-mobile text-surface-navy md:text-headline-xl">{t("price_h2")}</h2>
          <p className="text-body-lg text-on-surface-variant">{t("price_p")}</p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-space-lg lg:grid-cols-3">
          {/* Starter */}
          <div className="flex flex-col justify-between rounded-2xl bg-surface-canvas p-space-xl shadow-sm transition-shadow hover:shadow-md">
            <div>
              <div className="mb-space-sm flex items-center justify-between gap-2">
                <span className="text-label-technical uppercase text-steel">{t("starter_tag")}</span>
                <span className="rounded-xs bg-surface-subtle px-2 py-0.5 text-body-sm text-on-surface-variant">{t("starter_sys")}</span>
              </div>
              <h3 className="mb-1 text-headline-lg text-surface-navy">Starter</h3>
              <p className="mb-space-lg text-body-md text-steel">{t("starter_desc")}</p>
              <div className="mb-space-lg rounded-lg bg-surface-subtle p-space-md">
                <div className="flex items-baseline gap-1">
                  <span className="text-label-numeric-lg text-surface-navy">€699</span>
                  <span className="text-body-md text-steel">{t("per_month_cube")}</span>
                </div>
                <div className="mt-1 text-label-legal text-steel">{t("starter_vat")}</div>
              </div>
              <FeatureList items={STARTER} t={t} />
            </div>
            <div>
              <Link href="/leasing?pkg=starter" className={`${button} bg-surface-subtle text-surface-navy shadow-sm hover:bg-surface-container`}>
                {t("starter_cta")}
              </Link>
              <div className="mt-2 text-center text-label-legal text-steel">{t("starter_dep")}</div>
            </div>
          </div>

          {/* Micro-Farm (featured) */}
          <div className="relative flex flex-col justify-between rounded-2xl bg-surface-canvas p-space-xl shadow-xl lg:-mt-4">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xs bg-primary-container px-space-md py-1 text-label-technical font-bold uppercase text-on-primary shadow-md">
              {t("pop_badge")}
            </div>
            <div>
              <div className="mb-space-sm flex items-center justify-between gap-2 pt-2">
                <span className="text-label-technical font-bold uppercase text-primary">{t("micro_tag")}</span>
                <span className="rounded-xs bg-accent-cyan-light px-2 py-0.5 text-body-sm font-bold text-primary">{t("micro_sys")}</span>
              </div>
              <h3 className="mb-1 text-headline-lg text-surface-navy">Micro-Farms</h3>
              <p className="mb-space-lg text-body-md text-steel">{t("micro_desc")}</p>
              <div className="mb-space-lg rounded-lg bg-surface-container-low p-space-md">
                <div className="flex items-baseline gap-1">
                  <span className="text-label-numeric-lg text-primary">€499</span>
                  <span className="text-body-md font-semibold text-surface-navy">{t("per_month_cube2")}</span>
                </div>
                <div className="mt-1 text-label-legal text-steel">{t("micro_vat")}</div>
              </div>
              <FeatureList items={MICRO} t={t} />
            </div>
            <div>
              <Link href="/leasing?pkg=micro" className={`${button} bg-primary-container text-on-primary shadow-md hover:bg-primary`}>
                {t("micro_cta")}
              </Link>
              <div className="mt-2 text-center text-label-legal font-semibold text-compliance-green">{t("micro_pay")}</div>
            </div>
          </div>

          {/* Enterprise */}
          <div className="flex flex-col justify-between rounded-2xl bg-surface-canvas p-space-xl shadow-sm transition-shadow hover:shadow-md">
            <div>
              <div className="mb-space-sm flex items-center justify-between gap-2">
                <span className="text-label-technical uppercase text-steel">{t("ent_tag")}</span>
                <span className="rounded-xs bg-surface-subtle px-2 py-0.5 text-body-sm text-on-surface-variant">{t("ent_sys")}</span>
              </div>
              <h3 className="mb-1 text-headline-lg text-surface-navy">Enterprise</h3>
              <p className="mb-space-lg text-body-md text-steel">{t("ent_desc")}</p>
              <div className="mb-space-lg rounded-lg bg-surface-subtle p-space-md">
                <div className="flex items-baseline gap-1">
                  <span className="text-label-numeric-lg text-surface-navy">Custom</span>
                  <span className="text-body-md text-steel">{t("ent_price")}</span>
                </div>
                <div className="mt-1 text-label-legal text-steel">{t("ef1")}</div>
              </div>
              <FeatureList items={ENTERPRISE} t={t} />
            </div>
            <a
              href="mailto:sales@aquacubes.fish?subject=Enterprise%20Aquacubes%20Inquiry"
              className={`${button} bg-surface-navy text-on-primary shadow-sm hover:bg-surface-navy-elevated`}
            >
              {t("ent_cta")}
            </a>
          </div>
        </div>

        <div className="mt-space-xl rounded-2xl bg-surface-subtle p-space-lg shadow-sm">
          <div className="flex flex-col items-center justify-between gap-space-md md:flex-row">
            <div className="flex items-center gap-space-md">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-aquamarine/20 text-primary">
                <Icon name="stars" size={28} />
              </div>
              <div>
                <div className="text-headline-md text-surface-navy">{t("early_h")}</div>
                <div className="text-body-sm text-steel">{t("early_p")}</div>
              </div>
            </div>
            <div className="whitespace-nowrap rounded bg-surface-canvas px-space-md py-2 text-label-technical font-bold uppercase text-primary shadow-sm">
              {t("early_left")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
