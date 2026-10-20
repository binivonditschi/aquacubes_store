"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/b2b/Icon";
import { SalesForm } from "@/components/embeds";
import { createClient } from "@/lib/supabase/client";
import { DELIVERY_REGIONS, REGION_FLAG, REGIONS, isRegion, useRegion, useT, type Region } from "@/lib/i18n";
import {
  PACKAGES,
  SPECIES,
  isPackageId,
  isSpecies,
  isTerm,
  termMonths,
  type PackageId,
  type Species,
  type Term,
} from "@/lib/leasing";
import dict from "@/content/i18n/leasing.json";
import landing from "@/content/i18n/landing.json";

// The configuration survives the sign-in round trip (login page → back here).
const CONFIG_KEY = "ac-leasing-config";

const REGION_LABEL_KEY: Record<Region, keyof (typeof landing)["de"]> = {
  DE: "sel_de",
  DK: "sel_dk",
  SE: "sel_se",
  NO: "sel_no",
  CH: "sel_ch",
  OTHER: "sel_other",
};

const SPECIES_SUB_KEY: Record<Species, keyof (typeof dict)["de"]> = {
  Seesaibling: "sp_sea",
  Regenbogenforelle: "sp_trout",
  Wolfsbarsch: "sp_bass",
  "Nil-Tilapia": "sp_tilapia",
};

export default function LeasingConfigurator() {
  const t = useT(dict);
  const tl = useT(landing);
  const { region, setRegion, locale } = useRegion();

  const [pkg, setPkg] = useState<PackageId>("starter");
  const [term, setTerm] = useState<Term>("min");
  const [species, setSpecies] = useState<Species>("Seesaibling");
  const [sparesKit, setSparesKit] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Restore a saved configuration, then let ?pkg=starter|micro from the home page win.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CONFIG_KEY) ?? "null");
      if (saved) {
        if (isPackageId(saved.pkg)) setPkg(saved.pkg);
        if (isTerm(saved.term)) setTerm(saved.term);
        if (isSpecies(saved.species)) setSpecies(saved.species);
        if (typeof saved.sparesKit === "boolean") setSparesKit(saved.sparesKit);
      }
    } catch {
      // Nothing saved or storage blocked — keep the defaults.
    }
    const fromUrl = new URLSearchParams(window.location.search).get("pkg");
    if (isPackageId(fromUrl)) setPkg(fromUrl);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_KEY, JSON.stringify({ pkg, term, species, sparesKit }));
    } catch {
      // Not persisted — the order still works within this visit.
    }
  }, [pkg, term, species, sparesKit]);

  const plan = PACKAGES[pkg];
  const months = termMonths(pkg, term);
  const deliverable = DELIVERY_REGIONS.includes(region);
  const money = (n: number) => "€" + n.toLocaleString(locale);
  const kaution = t("kaution").charAt(0).toUpperCase() + t("kaution").slice(1);

  const choosePackage = (next: PackageId) => {
    setPkg(next);
    setTerm("min");
  };

  const startCheckout = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pkg, term, species, region, sparesKit }),
      });
      if (res.status === 401) {
        setLoading(false);
        setAuthOpen(true);
        return;
      }
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      setError(t("err_checkout"));
    } catch {
      setError(t("err_checkout"));
    }
    setLoading(false);
  };

  const order = async () => {
    if (!accepted) {
      setShowHint(true);
      return;
    }
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setAuthOpen(true);
      return;
    }
    await startCheckout();
  };

  return (
    <div className="bg-surface-subtle">
      <div className="mx-auto max-w-7xl px-margin pb-space-3xl md:px-margin-tablet lg:px-margin-desktop">
        {/* Title + stats */}
        <div className="pb-space-md pt-space-xl">
          <h1 className="text-headline-xl-mobile text-surface-navy md:text-headline-xl">Aquacube Model Pro</h1>
          <p className="mt-1 text-body-md text-steel">
            <span>{t("sub_title")}</span>
            <span className="font-semibold text-primary">{t("sub_limited")}</span>
          </p>
        </div>
        <div className="mb-space-lg grid grid-cols-2 gap-space-md border-y border-border-subtle py-space-md text-center md:grid-cols-4">
          {[
            ["600 kg", t("stat_yield")],
            ["4×", t("stat_cycles")],
            ["99%", t("stat_water")],
            ["8 m²", t("stat_area")],
          ].map(([value, label]) => (
            <div key={value}>
              <div className="text-2xl font-bold text-surface-navy">{value}</div>
              <div className="text-sm text-steel">{label}</div>
            </div>
          ))}
        </div>

        {/* Payment type: leasing only */}
        <div className="mb-space-lg flex justify-center">
          <div className="inline-flex overflow-hidden rounded-xl border border-border-subtle bg-surface-canvas">
            <span className="select-none px-space-lg py-2 text-sm text-outline line-through">{t("tab_cash")}</span>
            <span className="bg-surface-navy px-space-lg py-2 text-sm font-semibold text-on-primary">Leasing</span>
            <span className="select-none px-space-lg py-2 text-sm text-outline line-through">{t("tab_finance")}</span>
          </div>
        </div>
        <p className="-mt-2 mb-space-xl text-center text-sm text-steel">{t("leasing_only")}</p>

        {/* Region gate */}
        <section className="mb-space-lg rounded-2xl bg-surface-canvas p-space-lg shadow-sm md:p-space-xl">
          <h2 className="mb-1 text-headline-lg text-surface-navy">{t("region_title")}</h2>
          <p className="mb-space-md text-sm text-steel">{t("region_desc")}</p>
          <div className="flex flex-wrap gap-space-sm">
            {REGIONS.map((r) => (
              <button
                key={r}
                type="button"
                data-active={region === r}
                onClick={() => isRegion(r) && setRegion(r)}
                className="opt rounded-lg px-space-lg py-2.5 text-sm font-semibold text-surface-navy"
              >
                {REGION_FLAG[r]} {r === "OTHER" ? t("region_other") : tl(REGION_LABEL_KEY[r])}
              </button>
            ))}
          </div>
        </section>

        {!deliverable && (
          <section className="mb-space-lg rounded-2xl bg-surface-canvas p-space-lg shadow-sm md:p-space-xl">
            <div className="flex flex-col items-start gap-space-md sm:flex-row">
              <Icon name="public_off" size={32} className="text-warning-amber" />
              <div className="w-full">
                <h2 className="text-headline-lg text-surface-navy">{t("gate_title")}</h2>
                <p className="mb-space-md mt-1 text-sm text-steel">{t("gate_text")}</p>
                <div className="min-h-[120px] rounded-lg bg-surface-subtle p-space-lg">
                  <SalesForm />
                </div>
              </div>
            </div>
          </section>
        )}

        {deliverable && (
          <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-3">
            <div className="space-y-space-lg lg:col-span-2">
              {/* Package */}
              <section id="leasing-package" className="scroll-mt-24 rounded-2xl bg-surface-canvas p-space-lg shadow-sm md:p-space-xl">
                <h2 className="mb-space-md text-headline-lg text-surface-navy">{t("pkg_title")}</h2>
                <div className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
                  <button
                    type="button"
                    data-active={pkg === "starter"}
                    onClick={() => choosePackage("starter")}
                    className="opt rounded-lg p-space-lg text-left"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-surface-navy">Starter</div>
                      <span className="text-sm font-semibold text-primary">
                        {money(PACKAGES.starter.monthlyRate)} {t("per_month")}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-steel">{t("pkg_starter_desc")}</div>
                  </button>
                  <button
                    type="button"
                    data-active={pkg === "micro"}
                    onClick={() => choosePackage("micro")}
                    className="opt relative rounded-lg p-space-lg text-left"
                  >
                    <span className="absolute -top-2.5 right-4 rounded-xl bg-primary-container px-2 py-0.5 text-xs font-semibold text-on-primary">
                      {t("badge_most")}
                    </span>
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-surface-navy">Micro-Farm</div>
                      <span className="text-sm font-semibold text-primary">
                        {money(PACKAGES.micro.monthlyRate)} {t("per_month")}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-steel">{t("pkg_micro_desc")}</div>
                  </button>
                </div>
              </section>

              {/* Term */}
              <section className="rounded-2xl bg-surface-canvas p-space-lg shadow-sm md:p-space-xl">
                <h2 className="mb-space-md text-headline-lg text-surface-navy">{t("rt_title")}</h2>
                <div className="grid grid-cols-2 gap-space-md">
                  {(["min", "ext"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      data-active={term === option}
                      onClick={() => setTerm(option)}
                      className="opt rounded-lg p-space-md text-center"
                    >
                      <div className="font-bold text-surface-navy">
                        {termMonths(pkg, option)} {t("months")}
                      </div>
                      <div className="text-sm text-steel">{option === "min" ? t("rt_min") : t("rt_ext")}</div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Species */}
              <section className="rounded-2xl bg-surface-canvas p-space-lg shadow-sm md:p-space-xl">
                <h2 className="mb-1 text-headline-lg text-surface-navy">{t("sp_title")}</h2>
                <p className="mb-space-md text-sm text-steel">{t("sp_sub")}</p>
                <div className="grid grid-cols-2 gap-space-md sm:grid-cols-4">
                  {SPECIES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      data-active={species === s}
                      onClick={() => setSpecies(s)}
                      className="opt rounded-lg p-space-md text-center"
                    >
                      <div className="text-sm font-semibold text-surface-navy">{s}</div>
                      <div className="text-xs text-steel">{t(SPECIES_SUB_KEY[s])}</div>
                    </button>
                  ))}
                </div>
                <p className="mt-space-md text-xs leading-relaxed text-outline">{t("sp_disclaimer")}</p>
              </section>

              {/* Options */}
              <section className="rounded-2xl bg-surface-canvas p-space-lg shadow-sm md:p-space-xl">
                <h2 className="mb-space-md text-headline-lg text-surface-navy">{t("opt_title")}</h2>
                <div className="space-y-space-md">
                  <label data-active={sparesKit} className="opt flex items-start gap-space-md rounded-lg p-space-md">
                    <input
                      type="checkbox"
                      checked={sparesKit}
                      onChange={(e) => setSparesKit(e.target.checked)}
                      className="mt-1 accent-primary"
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between gap-2">
                        <span className="font-semibold text-surface-navy">{t("opt_kit_name")}</span>
                        <span className="text-sm font-semibold text-primary">{t("opt_kit_price")}</span>
                      </div>
                      <div className="mt-1 text-sm text-steel">{t("opt_kit_desc")}</div>
                    </div>
                  </label>
                  <div className="opt flex items-start gap-space-md rounded-lg p-space-md opacity-80" style={{ cursor: "default" }}>
                    <Icon name="verified" className="mt-0.5 text-compliance-green" />
                    <div className="flex-1">
                      <div className="flex flex-wrap justify-between gap-2">
                        <span className="font-semibold text-surface-navy">{t("opt_tel_name")}</span>
                        <span className="text-sm font-semibold text-compliance-green">{t("opt_tel_inc")}</span>
                      </div>
                      <div className="mt-1 text-sm text-steel">{t("opt_tel_desc")}</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sticky summary */}
            <aside className="lg:sticky lg:top-24">
              <div className="rounded-2xl bg-surface-canvas p-space-lg shadow-lg md:p-space-xl">
                <div className="mb-1 text-sm text-steel">{t("sum_est")}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-surface-navy">{money(plan.monthlyRate)}</span>
                  <span className="text-steel">{t("sum_permonth")}</span>
                </div>
                <div className="mt-1 text-sm text-steel">
                  {money(plan.deposit)} {kaution} · {months} {t("months")} · {plan.name}
                </div>
                <button
                  type="button"
                  onClick={() => document.getElementById("leasing-package")?.scrollIntoView({ behavior: "smooth" })}
                  className="mt-1 inline-block text-sm text-primary underline"
                >
                  {t("sum_edit")}
                </button>

                <div className="mt-space-md border-t border-border-subtle pt-space-md">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-surface-navy">{t("sum_due")}</span>
                    <span className="text-2xl font-bold text-surface-navy">{money(plan.deposit)}</span>
                  </div>
                  <div className="text-sm text-steel">{t("sum_kaution_note")}</div>
                </div>

                <div className="mt-space-md space-y-1 text-sm text-steel">
                  <div className="flex justify-between gap-2">
                    <span>Aquacube Model Pro</span>
                    <span className="text-right">{plan.name}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span>{t("sum_row_species")}</span>
                    <span>{species}</span>
                  </div>
                  <div className="flex justify-between gap-2">
                    <span>{t("sum_row_rt")}</span>
                    <span>
                      {months} {t("months")}
                    </span>
                  </div>
                  {sparesKit && (
                    <div className="flex justify-between gap-2">
                      <span>{t("sum_row_kit")}</span>
                      <span>+ €1.850</span>
                    </div>
                  )}
                </div>

                <div className="mt-space-md flex gap-2 rounded p-3 text-sm text-compliance-green bg-compliance-green-bg">
                  <Icon name="stars" size={18} />
                  <span>{t("early")}</span>
                </div>

                <label className="mt-space-md flex items-start gap-2 text-xs leading-relaxed text-steel">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => {
                      setAccepted(e.target.checked);
                      if (e.target.checked) setShowHint(false);
                    }}
                    className="mt-0.5 accent-primary"
                  />
                  {/* Trusted first-party copy with links to the legal pages */}
                  <span className="[&_a]:text-primary [&_a]:underline" dangerouslySetInnerHTML={{ __html: t("cb_label") }} />
                </label>

                <button
                  type="button"
                  onClick={order}
                  disabled={loading}
                  className="mt-space-md w-full rounded bg-primary-container py-3.5 font-bold text-on-primary shadow-md transition-colors hover:bg-primary disabled:opacity-60"
                >
                  {loading ? t("busy") : t("btn_order")}
                </button>
                {showHint && <p className="mt-2 text-xs text-error">{t("hint")}</p>}
                {error && <p className="mt-2 text-xs text-error">{error}</p>}
                <p className="mt-space-md text-xs leading-relaxed text-steel">{t("fine_print")}</p>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Sign-in required — uses the shop's real Supabase login, then returns here. */}
      {authOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setAuthOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
            className="w-full max-w-md rounded-2xl bg-surface-canvas p-space-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="auth-title" className="mb-space-sm text-headline-lg text-surface-navy">
              {t("auth_title")}
            </h3>
            <p className="text-sm text-steel">{t("auth_text")}</p>
            <p className="mb-space-lg mt-2 flex flex-wrap items-center gap-1.5 text-sm text-steel">
              <Icon name="location_on" size={18} className="text-primary" />
              <span>{t("auth_country")}</span>
              <strong>
                {REGION_FLAG[region]} {tl(REGION_LABEL_KEY[region])}
              </strong>
            </p>
            <div className="space-y-space-sm">
              <Link
                href="/login?next=/leasing"
                className="block w-full rounded bg-surface-navy py-3 text-center font-semibold text-on-primary transition-colors hover:bg-surface-navy-elevated"
              >
                {t("auth_login")}
              </Link>
              <Link
                href="/login?mode=signup&next=/leasing"
                className="block w-full rounded border-2 border-surface-navy py-3 text-center font-semibold text-surface-navy transition-colors hover:bg-surface-subtle"
              >
                {t("auth_signup")}
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setAuthOpen(false)}
              aria-label="Schließen"
              className="mt-space-md w-full text-sm text-steel transition-colors hover:text-on-surface"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
