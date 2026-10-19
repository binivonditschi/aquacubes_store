import Link from "next/link";
import { getPlans } from "@/lib/plans";
import PlanCard from "@/components/b2b/PlanCard";
import Newsletter from "@/components/sections/Newsletter";
import content from "@/content/shop.json";

export default function Shop() {
  const plans = getPlans();

  return (
    <div className="bg-surface">
      <section className="relative overflow-hidden bg-surface-subtle px-margin py-space-2xl md:px-margin-tablet lg:px-margin-desktop">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <nav aria-label="Breadcrumb">
            <ol className="mb-space-md flex items-center gap-2 text-body-sm text-steel">
              <li>
                <Link href="/" className="text-primary transition-colors hover:underline">Startseite</Link>
              </li>
              <li>/</li>
              <li>Shop</li>
            </ol>
          </nav>
          <div className="mb-space-xs text-label-technical font-semibold uppercase text-primary">{content.eyebrow}</div>
          <h1 className="text-headline-xl-mobile text-surface-navy md:text-headline-xl">{content.title}</h1>
          <p className="mt-space-sm max-w-2xl text-body-lg text-on-surface-variant">{content.subtitle}</p>
        </div>
      </section>

      <section className="px-margin py-space-3xl md:px-margin-tablet lg:px-margin-desktop">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-space-lg lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
