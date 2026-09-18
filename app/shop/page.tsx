import Link from "next/link";
import { getPlans, planButtonStyle } from "@/lib/plans";
import Newsletter from "@/components/sections/Newsletter";
import content from "@/content/shop.json";

export default function Shop() {
  const plans = getPlans();

  return (
    <div className="bg-white">
      <section className="border-b border-black/10 bg-slate-50 pb-14 pt-[140px] shadow-[0_10px_12px_-10px_rgba(0,0,0,0.15)]">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          <nav aria-label="Breadcrumb">
            <ol className="mb-4 flex items-center gap-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="text-teal transition-colors hover:text-teal-dark">Home</Link>
              </li>
              <li>/</li>
              <li className="text-gray-300">Shop</li>
            </ol>
          </nav>

          <h1 className="text-h1 font-heading text-navy">{content.title}</h1>
          <p className="mt-3 max-w-xl font-body text-base text-gray-500">
            {content.subtitle}
          </p>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white py-16 shadow-[0_10px_12px_-10px_rgba(0,0,0,0.15)]">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Link
                key={plan.id}
                href={`/shop/${plan.id}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
              >
                {plan.badge && (
                  <span className="absolute right-6 top-6 rounded-full bg-coral px-3 py-1 font-body text-xs font-semibold text-navy">
                    {plan.badge}
                  </span>
                )}

                <h2 className="font-heading text-xl font-bold uppercase text-navy underline decoration-2 underline-offset-4">
                  {plan.name}
                </h2>
                <p className="mt-2 text-sm text-navy/80">{plan.tagline}</p>
                <p className="mt-1 text-xs text-gray-400">Best for: {plan.bestFor}</p>

                <p className="mt-4 font-heading text-3xl font-bold text-navy">
                  {plan.price}
                  {plan.priceSuffix && <span className="text-lg font-medium text-gray-400">{plan.priceSuffix}</span>}
                </p>
                <p className="mt-1 text-xs text-gray-400">{plan.terms}</p>

                <p className="mt-4 border-t border-black/10 pt-4 text-sm text-gray-500">{plan.description}</p>

                <div className="mt-6">
                  <span
                    className={`block w-full rounded-button py-3 text-center font-body text-sm font-medium uppercase transition-colors ${planButtonStyle[plan.id].outline}`}
                  >
                    {plan.buttonText}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-teal shadow-[0_0_12px_rgba(43,94,141,0.6)] transition-all duration-500 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
