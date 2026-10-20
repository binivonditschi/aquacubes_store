"use client";

import Icon from "@/components/b2b/Icon";
import { useT } from "@/lib/i18n";
import dict from "@/content/i18n/landing.json";

type Key = keyof (typeof dict)["de"];

// Rows of the spec matrix: label key, value (translated key or fixed text), colour.
const SPECS: { label: Key; value: Key | string; tone?: "primary" | "green" }[] = [
  { label: "spc1", value: "4.0m (L) × 2.0m (B) × 1.41m (H)" },
  { label: "spc2", value: "≈ 3.000 Liter (3 m³)" },
  { label: "spc3", value: "spcv3", tone: "primary" },
  { label: "spc4", value: "spcv4" },
  { label: "spc5", value: "spcv5", tone: "green" },
  { label: "spc6", value: "spcv6" },
  { label: "spc7", value: "spcv7" },
  { label: "spc8", value: "spcv8" },
  { label: "spc9", value: "spcv9" },
];

const FEATURES = [
  { icon: "smart_toy", n: 1, box: "bg-accent-cyan-light text-primary", tag: "text-primary" },
  { icon: "eco", n: 2, box: "bg-compliance-green-bg text-compliance-green", tag: "text-compliance-green" },
  { icon: "phone_iphone", n: 3, box: "bg-secondary-container text-surface-navy", tag: "text-surface-navy" },
] as const;

export default function Technology() {
  const t = useT(dict);
  const text = (v: Key | string) => (v in dict.de ? t(v as Key) : v);

  return (
    <>
      <section id="technical-specs" className="bg-surface-canvas px-margin py-space-3xl md:px-margin-tablet lg:px-margin-desktop">
        <div className="mx-auto max-w-7xl">
          <div className="mb-space-2xl flex flex-col justify-between gap-space-md md:flex-row md:items-end">
            <div>
              <span className="text-label-technical font-bold uppercase text-primary">{t("tech_eyebrow")}</span>
              <h2 className="mt-1 text-headline-xl-mobile text-surface-navy md:text-headline-xl">{t("tech_h2")}</h2>
            </div>
            <p className="max-w-md text-body-md text-steel">{t("tech_p")}</p>
          </div>

          <div className="rounded-2xl bg-surface-subtle p-space-md shadow-sm md:p-space-lg">
            <h3 className="mb-space-md flex items-center gap-2 text-headline-lg text-surface-navy">
              <Icon name="tune" className="text-primary" />
              <span>{t("spec_h")}</span>
            </h3>
            <div className="space-y-space-xs text-body-md">
              {SPECS.map((spec, i) => (
                <div
                  key={spec.label}
                  className={`flex flex-col justify-between gap-1 rounded-xs px-3 py-2.5 sm:flex-row sm:items-center ${
                    i % 2 === 0 ? "bg-surface-canvas" : "bg-surface-subtle"
                  }`}
                >
                  <span className="font-medium text-steel">{t(spec.label)}</span>
                  <span
                    className={`font-bold sm:text-right ${
                      spec.tone === "primary" ? "text-primary" : spec.tone === "green" ? "text-compliance-green" : "text-surface-navy"
                    }`}
                  >
                    {text(spec.value)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-space-md pt-space-sm text-center">
              <a href="#yield-calculator" className="inline-flex items-center gap-1 text-body-md font-semibold text-primary hover:underline">
                <span>{t("calc_link")}</span>
                <Icon name="arrow_forward" size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface px-margin py-space-3xl md:px-margin-tablet lg:px-margin-desktop">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-space-2xl max-w-3xl text-center">
            <span className="text-label-technical font-bold uppercase text-primary">{t("sys_cta")}</span>
            <h2 className="mt-1 text-headline-xl-mobile text-surface-navy md:text-headline-xl">{t("feat_h2")}</h2>
            <p className="text-body-lg text-on-surface-variant">{t("feat_p")}</p>
          </div>

          <div className="grid grid-cols-1 gap-space-lg md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.n} className="flex flex-col justify-between rounded-2xl bg-surface-canvas p-space-xl shadow-sm">
                <div>
                  <div className={`mb-space-md flex h-12 w-12 items-center justify-center rounded-lg ${f.box}`}>
                    <Icon name={f.icon} size={28} />
                  </div>
                  <h3 className="mb-space-xs text-headline-md text-surface-navy">{t(`feat${f.n}_h`)}</h3>
                  <p className="text-body-md leading-relaxed text-steel">{t(`feat${f.n}_p`)}</p>
                </div>
                <div className={`mt-space-md text-label-technical font-semibold uppercase ${f.tag}`}>{t(`feat${f.n}_tag`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
