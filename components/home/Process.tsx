"use client";

import Link from "next/link";
import Icon from "@/components/b2b/Icon";
import { useT } from "@/lib/i18n";
import dict from "@/content/i18n/landing.json";

const STEPS = [1, 2, 3, 4] as const;

export default function Process() {
  const t = useT(dict);

  return (
    <>
      <section id="reservation-flow" className="bg-surface-subtle px-margin py-space-3xl md:px-margin-tablet lg:px-margin-desktop">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-space-2xl max-w-3xl text-center">
            <h2 className="mt-1 text-headline-xl-mobile text-surface-navy md:text-headline-xl">{t("proc_h2")}</h2>
            <p className="text-body-lg text-on-surface-variant">{t("proc_p")}</p>
          </div>

          <div className="relative mb-space-2xl">
            <div className="absolute left-[10%] right-[10%] top-6 hidden h-1 rounded-full bg-gradient-to-r from-surface-navy via-primary to-accent-aquamarine opacity-20 lg:block" />
            <div className="relative grid grid-cols-1 gap-space-md sm:grid-cols-2 lg:grid-cols-4 lg:gap-space-xl">
              {STEPS.map((n) => {
                const isLast = n === 4;
                return (
                  <div
                    key={n}
                    className={`relative flex flex-col justify-between rounded-lg border-t-4 bg-surface-canvas p-space-lg shadow-sm ${
                      isLast ? "border-primary" : "border-surface-navy"
                    }`}
                  >
                    {!isLast && (
                      <Icon name="arrow_forward" size={28} className="absolute -right-5 top-8 z-10 hidden text-primary lg:block" />
                    )}
                    <div>
                      <div
                        className={`mb-space-md flex h-12 w-12 items-center justify-center rounded-xl text-headline-lg text-on-primary shadow-md ring-4 ring-surface-subtle ${
                          isLast ? "bg-primary" : "bg-surface-navy"
                        }`}
                      >
                        {n}
                      </div>
                      <h4 className="mb-space-xs text-headline-md text-surface-navy">{t(`s${n}_h`)}</h4>
                      <p className="text-body-sm leading-relaxed text-steel">{t(`s${n}_p`)}</p>
                    </div>
                    <div className={`mt-space-md text-label-legal ${isLast ? "font-semibold text-compliance-green" : "text-steel"}`}>
                      {t(`s${n}_n`)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mx-auto mb-space-lg flex max-w-4xl flex-col items-center justify-between gap-space-md rounded-2xl bg-surface-navy p-space-xl shadow-lg sm:flex-row">
            <div>
              <div className="mb-1 text-label-technical uppercase text-primary-fixed">{t("shop_tag")}</div>
              <h3 className="text-headline-lg text-on-primary">{t("shop_h")}</h3>
            </div>
            <Link
              href="/leasing"
              className="inline-flex shrink-0 items-center gap-space-xs rounded bg-primary-container px-space-lg py-3.5 text-body-md font-bold text-on-primary shadow-md transition-all hover:bg-primary"
            >
              <Icon name="storefront" size={20} />
              <span>{t("shop_btn")}</span>
            </Link>
          </div>
        </div>
      </section>

      <section id="customs-consult" className="bg-surface-navy px-margin py-space-2xl text-on-primary md:px-margin-tablet lg:px-margin-desktop">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="mb-space-sm mt-1 text-headline-xl-mobile text-on-primary md:text-headline-xl">{t("contact_h2")}</h2>
            <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
              {[
                { icon: "call", label: t("c_card1"), value: "+49 15781371194", href: "tel:+4915781371194", note: t("c_hours") },
                { icon: "mail", label: t("c_card2"), value: "sales@aquacubes.fish", href: "mailto:sales@aquacubes.fish", note: t("c_resp") },
              ].map((item) => (
                <div key={item.href} className="rounded-lg bg-surface-navy-elevated p-space-md">
                  <div className="mb-1 flex items-center gap-space-xs text-primary-fixed">
                    <Icon name={item.icon} size={20} />
                    <span className="text-label-technical uppercase">{item.label}</span>
                  </div>
                  <a className="text-headline-md font-bold text-on-primary hover:underline" href={item.href}>
                    {item.value}
                  </a>
                  <div className="mt-1 text-label-legal text-secondary-fixed-dim">{item.note}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-surface-navy-elevated p-space-lg md:p-space-xl lg:col-span-5">
            <h3 className="mb-space-xs text-headline-md text-on-primary">{t("wa_h")}</h3>
            <p className="mb-space-md text-body-sm text-secondary-fixed-dim">{t("wa_p")}</p>
            <a
              href="https://wa.me/4915781371194"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-space-xs rounded bg-accent-aquamarine px-space-sm py-3.5 text-center text-body-md font-bold text-surface-navy shadow transition-colors hover:bg-primary-fixed"
            >
              <Icon name="chat" size={22} />
              <span>{t("wa_cta")}</span>
            </a>
            <div className="mt-space-md flex items-center justify-between gap-2 text-label-legal text-secondary-fixed-dim">
              <span>{t("addr1")}</span>
              <span>{t("addr2")}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
