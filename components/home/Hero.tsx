import Link from "next/link";
import Icon from "@/components/b2b/Icon";
import content from "@/content/home.json";

export default function Hero() {
  const { hero, announcement } = content;

  return (
    <>
      <section className="bg-surface-navy px-margin py-space-sm text-on-primary md:px-margin-tablet lg:px-margin-desktop">
        <div className="mx-auto flex max-w-7xl items-center justify-center text-body-sm">
          <span className="font-medium text-accent-aquamarine">{announcement}</span>
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface-subtle px-margin py-space-2xl md:px-margin-tablet md:py-space-3xl lg:px-margin-desktop">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-tertiary/10 blur-2xl" />

        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-space-xl lg:grid-cols-12">
          <div className="flex flex-col lg:col-span-7">
            <div className="mb-space-md flex flex-wrap items-center gap-space-xs">
              <span className="inline-flex items-center gap-1.5 rounded-xs bg-accent-cyan-light px-space-sm py-1 text-label-technical font-semibold text-tertiary">
                <Icon name="autorenew" size={15} />
                {hero.badges[0]}
              </span>
              <span className="rounded-xs bg-surface-container px-space-sm py-1 text-label-technical text-steel">
                {hero.badges[1]}
              </span>
            </div>

            <h1 className="mb-space-md text-display-hero-mobile text-surface-navy md:text-display-hero">
              {hero.title} <span className="text-primary">{hero.titleHighlight}</span>
            </h1>
            <p className="mb-space-lg max-w-2xl text-body-lg text-on-surface-variant">{hero.description}</p>

            <div className="mb-space-lg rounded-lg bg-surface-canvas p-space-md shadow-sm">
              <div className="flex flex-col justify-between gap-space-sm sm:flex-row sm:items-center">
                <div>
                  <div className="text-label-technical uppercase text-steel">{hero.pricing.label}</div>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-label-numeric-lg text-surface-navy">{hero.pricing.price}</span>
                    <span className="text-body-md text-on-surface-variant">{hero.pricing.suffix}</span>
                  </div>
                </div>
                <div className="rounded-xs bg-surface-subtle p-space-sm text-body-sm text-steel">
                  <span className="font-medium text-surface-navy">{hero.pricing.depositStrong}</span>{" "}
                  {hero.pricing.depositText}
                </div>
              </div>
            </div>

            <div className="mb-space-lg flex flex-col items-stretch gap-space-md sm:flex-row sm:items-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-space-xs rounded bg-primary-container px-space-lg py-3.5 text-body-md font-bold text-on-primary shadow-md transition-all hover:bg-primary"
              >
                <Icon name="shopping_cart_checkout" size={20} />
                <span>{hero.primaryButtonText}</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-space-sm text-label-technical uppercase text-steel sm:grid-cols-4">
              {hero.trust.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <Icon name={item.icon} size={18} className="text-primary" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl bg-surface-canvas p-space-lg shadow-xl">
              <div className="mb-space-sm flex items-center justify-between">
                <span className="text-label-technical font-bold text-primary">{hero.card.eyebrow}</span>
                <span className="inline-flex items-center gap-1 rounded-xs bg-compliance-green-bg px-2 py-0.5 text-label-technical text-compliance-green">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-compliance-green" />
                  {hero.card.status}
                </span>
              </div>
              <div className="relative mb-space-md aspect-square w-full overflow-hidden rounded-lg bg-surface-subtle">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="h-full w-full object-contain p-4" src={hero.card.image} alt={hero.card.imageAlt} />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-surface-navy/90 px-3 py-1.5 text-body-sm text-on-primary shadow backdrop-blur-sm">
                  <span className="font-semibold text-accent-aquamarine">{hero.card.dimensions.length}</span> Länge ×{" "}
                  <span className="font-semibold text-accent-aquamarine">{hero.card.dimensions.width}</span> Breite ×{" "}
                  <span className="font-semibold text-accent-aquamarine">{hero.card.dimensions.height}</span> Höhe
                </div>
              </div>
              <div className="grid grid-cols-3 gap-space-sm text-center">
                {hero.card.stats.map((stat) => (
                  <div key={stat.label} className="rounded-xs bg-surface-subtle p-space-sm">
                    <div
                      className={`text-label-numeric-lg leading-none ${stat.highlight ? "text-primary" : "text-surface-navy"}`}
                    >
                      {stat.value}
                    </div>
                    <div className="mt-1 text-label-technical uppercase text-steel">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-canvas px-margin py-space-lg shadow-sm md:px-margin-tablet lg:px-margin-desktop">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-space-md lg:flex-row">
          <div className="flex flex-col items-center gap-space-md text-center sm:flex-row sm:text-left">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent-cyan-light text-primary">
              <Icon name="local_shipping" size={28} />
            </div>
            <div>
              <div className="text-label-technical uppercase text-steel">{content.delivery.label}</div>
              <div className="mt-0.5 text-headline-md text-surface-navy">{content.delivery.regions}</div>
              <div className="mt-0.5 text-body-sm text-steel">{content.delivery.description}</div>
            </div>
          </div>
          <a
            href="#customs-consult"
            className="inline-flex shrink-0 items-center gap-1.5 rounded bg-surface-subtle px-space-md py-2.5 text-body-md font-semibold text-surface-navy transition-colors hover:bg-surface-container"
          >
            <Icon name="public" size={18} />
            <span>{content.delivery.buttonText}</span>
          </a>
        </div>
      </section>
    </>
  );
}
