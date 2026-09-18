import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getPlan, getPlans, isPurchasable, planToProduct, planButtonStyle } from "@/lib/plans";
import { systemIncludes } from "@/lib/product-specs";
import ProductDetailActions from "@/components/store/ProductDetailActions";

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
    <div className="bg-white">
      <section className="pb-20 pt-[120px]">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="text-teal transition-colors hover:text-teal-dark">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/shop" className="text-teal transition-colors hover:text-teal-dark">Shop</Link>
              </li>
              <li>/</li>
              <li className="text-gray-500">{plan.name}</li>
            </ol>
          </nav>

          <div className="mx-auto max-w-xl rounded-2xl border border-black/10 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <h1 className="font-heading text-2xl font-bold uppercase text-navy underline decoration-2 underline-offset-4">
              {plan.name}
            </h1>
            <p className="mt-2 text-sm text-navy/80">{plan.tagline}</p>
            <p className="mt-1 text-xs text-gray-400">Best for: {plan.bestFor}</p>

            <p className="mt-4 font-heading text-3xl font-bold text-navy">
              {plan.price}
              {plan.priceSuffix && <span className="text-lg font-medium text-gray-400">{plan.priceSuffix}</span>}
            </p>
            <p className="mt-1 text-xs text-gray-400">{plan.terms}</p>

            <p className="mt-4 border-t border-black/10 pt-4 text-sm text-gray-500">{plan.description}</p>

            <ul className="mt-4 space-y-2">
              {systemIncludes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6">
              {purchasable ? (
                <ProductDetailActions
                  product={planToProduct(plan, 0)}
                  colorClassName={planButtonStyle[plan.id].solid}
                />
              ) : (
                <Link
                  href="/contact"
                  className={`block w-full rounded-button py-3.5 text-center font-body text-sm font-medium transition-colors ${planButtonStyle[plan.id].outline}`}
                >
                  Contact Sales
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
