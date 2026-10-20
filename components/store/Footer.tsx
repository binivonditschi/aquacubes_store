"use client";

import Link from "next/link";
import Icon from "@/components/b2b/Icon";
import { useT } from "@/lib/i18n";
import { openCookieSettings } from "./CookieConsent";
import content from "@/content/footer.json";
import dict from "@/content/i18n/landing.json";

type Key = keyof (typeof dict)["de"];

const socialIcons: Record<string, string> = {
  linkedin:
    "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z",
  facebook:
    "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z",
};

const linkClass = "transition-colors hover:text-primary-fixed";

export default function Footer() {
  const t = useT(dict);
  const { contact } = content;

  return (
    <footer className="w-full bg-surface-navy pb-space-xl pt-space-2xl text-on-primary">
      <div className="mx-auto max-w-7xl px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="grid grid-cols-1 gap-space-md pb-space-xl min-[420px]:grid-cols-2 lg:grid-cols-4">
          {content.badges.map((badge) => (
            <div key={badge.icon} className="flex items-center gap-space-sm rounded-xs bg-surface-navy-elevated p-space-md">
              <Icon name={badge.icon} className="text-primary-fixed" />
              <div>
                <div className="text-label-technical text-primary-fixed">
                  {"titleKey" in badge ? t(badge.titleKey as Key) : badge.title}
                </div>
                <div className="text-body-sm text-secondary-fixed-dim">
                  {"textKey" in badge ? t(badge.textKey as Key) : badge.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="py-space-lg">
          <div className="mb-space-xs text-body-md font-semibold text-primary-fixed">{content.brand}</div>
          <div className="max-w-4xl text-body-sm leading-relaxed text-secondary-fixed-dim">{content.companyDetails}</div>
        </div>

        {/* Trusted first-party copy (bold lead-in span) */}
        <div
          className="rounded-xs bg-surface-navy-elevated/70 p-space-md text-label-legal leading-relaxed text-secondary-fixed-dim"
          dangerouslySetInnerHTML={{ __html: t("ft_legal") }}
        />

        <div className="grid grid-cols-1 gap-space-xl border-t border-surface-navy-elevated py-space-lg md:grid-cols-3">
          <div>
            <div className="mb-space-sm text-body-md font-semibold text-primary-fixed">{t("ft_contact_h")}</div>
            <div className="space-y-1.5 text-body-sm text-secondary-fixed-dim">
              <div>
                {t("ft_email_l")} <a className={linkClass} href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
              <div>
                {t("ft_biz_l")} {contact.businessName}
              </div>
              <div>
                {t("ft_addr_l")} {contact.address} {t("ft_addr_v")}
              </div>
              <div>
                {t("ft_phone_l")} <a className={linkClass} href={contact.phoneHref}>{contact.phone}</a>
              </div>
              <div>
                {t("ft_wa_l")}{" "}
                <a className={linkClass} href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
                  {t("ft_wa_v")}
                </a>
              </div>
            </div>
            <div className="mt-space-md flex items-center gap-space-sm">
              {content.social.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-navy-elevated text-secondary-fixed-dim transition-colors hover:bg-primary-container hover:text-primary-fixed"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={socialIcons[social.id]} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {content.columns.map((column) => (
            <div key={column.titleKey}>
              <div className="mb-space-sm text-body-md font-semibold text-primary-fixed">{t(column.titleKey as Key)}</div>
              <nav className="flex flex-col gap-y-1.5 text-body-sm text-secondary-fixed-dim">
                {column.links.map((link) => (
                  <Link key={link.key} href={link.href} className={linkClass}>
                    {t(link.key as Key)}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <nav className="flex flex-wrap gap-x-space-lg gap-y-space-xs border-t border-surface-navy-elevated py-space-md text-body-sm text-secondary-fixed-dim">
          <button type="button" onClick={openCookieSettings} className={linkClass}>
            {t("ft_cookie")}
          </button>
        </nav>

        <div className="flex flex-col items-center justify-between gap-space-sm pt-space-lg text-label-legal text-secondary-fixed-dim sm:flex-row">
          <div>
            © {new Date().getFullYear()} {content.copyright}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-space-md gap-y-1">
            {content.seals.map((seal) => (
              <span key={seal}>{seal}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
