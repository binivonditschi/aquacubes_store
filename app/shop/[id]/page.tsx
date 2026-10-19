import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/b2b/Icon";
import { getPlan, getPlans, isPurchasable, planToProduct } from "@/lib/plans";
import ProductDetailActions from "@/components/store/ProductDetailActions";
import content from "@/content/shop.json";

export function generateStaticParams() {
  return getPlans().map((plan) => ({ id: plan.id }));
}

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plan = getPlan(id);

  if (!plan) {
    notFound();
  }

  const purchasable = isPurchasable(plan);

  return (
    <div className="bg-surface-subtle px-margin py-space-2xl md:px-margin-tablet lg:px-margin-desktop">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-space-lg" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-body-sm text-steel">
            <li>
              <Link href="/" className="text-primary transition-colors hover:underline">Startseite</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/shop" className="text-primary transition-colors hover:underline">Shop</Link>
            </li>
            <li>/</li>
            <li>{plan.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-space-lg lg:grid-cols-12">
          <div className="rounded-2xl bg-surface-canvas p-space-lg shadow-sm md:p-space-xl lg:col-span-7">
            <div className="mb-space-sm flex items-center justify-between gap-2">
              <span className="text-label-technical font-bold uppercase text-primary">{plan.eyebrow}</span>
              <span className="rounded-xs bg-accent-cyan-light px-2 py-0.5 text-body-sm font-bold text-primary">
                {plan.sizeBadge}
              </span>
            </div>
            <h1 className="mb-1 text-headline-xl-mobile text-surface-navy md:text-headline-xl">{plan.name}</h1>
            <p className="mb-space-lg text-body-lg text-on-surface-variant">{plan.description}</p>

            <h2 className="mb-space-sm text-headline-md text-surface-navy">{content.detail.includesTitle}</h2>
            <ul className="space-y-space-sm text-body-md text-on-surface">
              {plan.features.map((feature) => (
                <li key={feature.text} className="flex items-start gap-2">
                  <Icon name={feature.icon} size={20} className="mt-0.5 text-primary" />
                  <span>
                    {"strong" in feature && feature.strong && <strong>{feature.strong} </strong>}
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-24 rounded-2xl bg-surface-canvas p-space-lg shadow-xl md:p-space-xl">
              <div className="mb-space-lg rounded-lg bg-surface-container-low p-space-md">
                <div className="flex items-baseline gap-1">
                  <span className="text-label-numeric-lg text-primary">{plan.price}</span>
                  <span className="text-body-md font-semibold text-surface-navy">{plan.priceSuffix}</span>
                </div>
                <div className="mt-1 text-label-legal text-steel">{plan.terms}</div>
              </div>

              {purchasable ? (
                <ProductDetailActions product={planToProduct(plan, 0)} />
              ) : (
                <a
                  href={plan.contactHref ?? "/kontakt"}
                  className="block w-full rounded bg-surface-navy py-3.5 text-center text-body-md font-bold text-on-primary shadow-sm transition-colors hover:bg-surface-navy-elevated"
                >
                  {plan.buttonText}
                </a>
              )}

              {plan.footnote && (
                <div className="mt-2 text-center text-label-legal font-semibold text-compliance-green">{plan.footnote}</div>
              )}

              <div className="mt-space-lg flex flex-col gap-space-sm border-t border-border-subtle pt-space-md text-body-sm text-steel">
                {content.detail.trust.map((item) => (
                  <div key={item.text} className="flex items-center gap-2">
                    <Icon name={item.icon} size={18} className="text-primary" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
