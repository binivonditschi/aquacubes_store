"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Icon from "@/components/b2b/Icon";
import { isRegion, useT, useRegion } from "@/lib/i18n";
import { orderRef, type LeasingConfig } from "@/lib/leasing";
import type { Order } from "@/lib/types";
import dict from "@/content/i18n/danke.json";
import leasing from "@/content/i18n/leasing.json";

export default function ThankYou() {
  const t = useT(dict);
  const tl = useT(leasing);
  const { locale } = useRegion();
  const orderId = useSearchParams().get("orderId");
  const [order, setOrder] = useState<Order | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    try {
      localStorage.removeItem("ac-leasing-config");
    } catch {
      // Nothing to clean up.
    }
    if (!orderId) {
      setMissing(true);
      return;
    }
    fetch(`/api/orders/${orderId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data: Order | null) => (data ? setOrder(data) : setMissing(true)))
      .catch(() => setMissing(true));
  }, [orderId]);

  let config: Partial<LeasingConfig> = {};
  try {
    config = order ? (JSON.parse(order.items)[0]?.config ?? {}) : {};
  } catch {
    // Older orders have no leasing config.
  }

  const paid = order?.status === "paid";
  const date = order ? new Date(order.createdAt).toLocaleDateString(locale) : "—";
  const countryKey = `c_${isRegion(config.region) ? config.region : "OTHER"}` as keyof (typeof dict)["de"];

  return (
    <div>
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(125deg,#eef1f3 0%,#f7f9fa 38%,#e3e8ea 55%,#f2f5f6 72%,#e9edee 100%)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg,transparent 40%,rgba(255,255,255,0.75) 46%,transparent 54%),linear-gradient(100deg,transparent 62%,rgba(255,255,255,0.55) 68%,transparent 76%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-margin pt-space-2xl md:px-margin-tablet md:pt-space-3xl lg:px-margin-desktop">
          <div className="max-w-3xl">
            <div className="mb-space-sm text-label-technical uppercase tracking-widest text-steel">{t("eyebrow")}</div>
            <h1 className="mb-space-sm text-display-hero-mobile leading-none text-surface-navy md:text-display-hero">{t("h1")}</h1>
            <div className="mb-space-md h-1 w-16 rounded-full bg-primary-container" />
            <p className="mb-space-sm text-headline-lg text-surface-navy">{t("sub1")}</p>
            <p className="mb-space-xl max-w-xl text-body-md text-on-surface-variant">{t("sub2")}</p>
          </div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-margin pb-space-xl md:px-margin-tablet lg:px-margin-desktop">
          <div className="overflow-hidden rounded-2xl bg-surface-canvas shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/aquacube-measure.jpg"
              alt="Aquacube Model Pro"
              className="h-auto max-h-[420px] w-full object-contain p-4"
            />
          </div>
        </div>
      </section>

      <section className="bg-surface px-margin py-space-2xl md:px-margin-tablet lg:px-margin-desktop">
        <div className="mx-auto max-w-7xl">
          {missing && !order && (
            <p className="mb-space-lg rounded bg-surface-subtle p-space-md text-body-md text-steel">{t("not_found")}</p>
          )}

          <div className="mb-space-lg flex items-center justify-between border-b border-border-subtle pb-space-md">
            <div>
              <div className="mb-1 text-label-technical uppercase tracking-widest text-steel">{t("your_cube")}</div>
              <div className="text-headline-xl-mobile text-surface-navy md:text-headline-xl">
                {config.pkg === "micro" ? t("pkg_micro") : t("pkg_starter")}
              </div>
            </div>
            <Icon name="deployed_code" size={32} className="text-primary" />
          </div>

          <div className="mb-space-lg grid grid-cols-2 gap-space-lg">
            <div>
              <div className="mb-1 text-label-technical uppercase text-steel">{t("l_ref")}</div>
              <div className="break-all text-headline-md text-surface-navy">
                {order ? orderRef(order.id, order.createdAt) : "AC-——————"}
              </div>
            </div>
            <div>
              <div className="mb-1 text-label-technical uppercase text-steel">{t("l_date")}</div>
              <div className="text-headline-md text-surface-navy">{date}</div>
            </div>
            <div>
              <div className="mb-1 text-label-technical uppercase text-steel">{t("l_paid_on")}</div>
              <div className="text-headline-md text-surface-navy">{paid ? date : "—"}</div>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  paid ? "bg-compliance-green-bg text-compliance-green" : "bg-surface-subtle text-steel"
                }`}
              >
                <Icon name={paid ? "check_circle" : "hourglass_top"} />
              </span>
              <div>
                <div className={`text-headline-md ${paid ? "text-compliance-green" : "text-surface-navy"}`}>
                  {paid ? t("paid") : t("pending")}
                </div>
                <div className="text-body-sm text-steel">{paid ? t("paid_sub") : t("pending_sub")}</div>
              </div>
            </div>
          </div>

          <div className="mb-space-lg border-t border-border-subtle pt-space-lg">
            <div className="mb-1 text-label-technical uppercase text-steel">{t("l_total")}</div>
            <div className="text-display-hero-mobile text-surface-navy md:text-display-hero">
              €{" "}
              {(order?.total ?? 0).toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="mt-1 text-body-sm text-steel">{t("total_sub")}</div>
          </div>

          <div className="grid grid-cols-2 gap-space-md border-t border-border-subtle pt-space-lg md:grid-cols-4">
            <div>
              <div className="mb-1 text-label-technical uppercase text-steel">{t("l_delivery")}</div>
              <div className="text-headline-md text-surface-navy">Q2–Q4 2027</div>
            </div>
            <div>
              <div className="mb-1 text-label-technical uppercase text-steel">{t("l_country")}</div>
              <div className="text-headline-md text-surface-navy">{t(countryKey)}</div>
            </div>
            <div>
              <div className="mb-1 text-label-technical uppercase text-steel">{t("l_rt")}</div>
              <div className="text-headline-md text-surface-navy">
                {config.months ? `${config.months} ${tl("months")}` : "—"}
              </div>
            </div>
            <div>
              <div className="mb-1 text-label-technical uppercase text-steel">{t("l_species")}</div>
              <div className="text-headline-md text-surface-navy">{config.species ?? "—"}</div>
            </div>
          </div>

          <div className="mt-space-xl flex flex-col gap-space-md sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-space-xs rounded bg-surface-navy px-space-lg py-3.5 text-body-md font-semibold text-on-primary transition-colors hover:bg-surface-navy-elevated"
            >
              <Icon name="arrow_back" size={20} />
              <span>{t("cta_home")}</span>
            </Link>
            <a
              href="https://wa.me/4915781371194"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-space-xs rounded border-2 border-surface-navy px-space-lg py-3.5 text-body-md font-semibold text-surface-navy transition-colors hover:bg-surface-subtle"
            >
              <Icon name="chat" size={20} />
              <span>{t("cta_wa")}</span>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-surface-subtle px-margin py-space-2xl md:px-margin-tablet lg:px-margin-desktop">
        <div className="mx-auto max-w-7xl">
          <div className="mb-space-sm text-label-technical uppercase tracking-widest text-steel">{t("next_h")}</div>
          <div className="grid grid-cols-1 gap-space-md md:grid-cols-3">
            {(["n1", "n2", "n3"] as const).map((step, i) => (
              <div key={step} className="rounded-lg bg-surface-canvas p-space-lg shadow-sm">
                <div className="mb-space-sm flex h-9 w-9 items-center justify-center rounded-full bg-primary-container text-sm font-bold text-on-primary">
                  {i + 1}
                </div>
                <div className="mb-1 text-headline-md text-surface-navy">{t(`${step}_h`)}</div>
                <div className="text-body-sm text-steel">{t(`${step}_p`)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
