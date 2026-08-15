import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { serializeProduct, formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/store/AddToCartButton";
import Newsletter from "@/components/sections/Newsletter";

const systemSpecs: Record<string, { power: string; footprint: string; bestFor: string }> = {
  standard: { power: "50W", footprint: "Countertop, 60 × 40cm", bestFor: "First-time growers" },
  pro: { power: "100W", footprint: "Tabletop, 120 × 60cm", bestFor: "Serious home growers" },
  enterprise: { power: "250W", footprint: "Floor-standing, ~2 × 1m", bestFor: "Restaurants, schools, farms" },
};

export default async function Shop() {
  const allProducts = await prisma.product.findMany({
    where: { isVisible: true },
    orderBy: { position: "asc" },
  });
  const systems = allProducts.filter((p) => p.category === "System").map(serializeProduct);
  const addOns = allProducts.filter((p) => p.category === "Add-on").map(serializeProduct);

  return (
    <div className="bg-off-white">
      <section className="pb-10 pt-[120px]">
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

          <h1 className="text-h1 font-heading text-navy">Shop Aquacubes</h1>
          <p className="mt-3 max-w-xl font-body text-base text-gray-500">
            Three system sizes, built for different spaces. Every system ships complete and ready to run.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {systems.map((product, i) => {
              const specs = systemSpecs[product.id];
              const isEnterprise = i === systems.length - 1;
              return (
                <div
                  key={product.id}
                  className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                >
                  {i === 1 && (
                    <div className="bg-coral py-1.5 text-center font-body text-xs font-semibold text-white">
                      Most Popular
                    </div>
                  )}
                  <Link href={`/shop/${product.id}`} className="relative aspect-[4/3] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.image || "/product-standard.jpg"} alt={product.name} className="h-full w-full object-cover" />
                  </Link>

                  <div className="flex flex-1 flex-col p-6">
                    <Link href={`/shop/${product.id}`}>
                      <h2 className="font-heading text-h4 text-navy">{product.name}</h2>
                    </Link>
                    <p className="mt-1 font-mono text-lg font-bold text-navy">{formatPrice(product.price)}</p>
                    <p className="mt-2 text-sm text-gray-500">{product.description}</p>

                    {specs && (
                      <dl className="mt-4 space-y-1.5 border-t border-gray-100 pt-4 text-xs">
                        <div className="flex justify-between gap-2">
                          <dt className="text-gray-300">Power draw</dt>
                          <dd className="font-medium text-navy">{specs.power}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-gray-300">Footprint</dt>
                          <dd className="text-right font-medium text-navy">{specs.footprint}</dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-gray-300">Best for</dt>
                          <dd className="text-right font-medium text-navy">{specs.bestFor}</dd>
                        </div>
                      </dl>
                    )}

                    <div className="mt-5">
                      {isEnterprise ? (
                        <Link
                          href="/contact"
                          className="block w-full rounded-button bg-coral py-3 text-center font-body text-sm font-medium text-white transition-colors hover:bg-coral-dark"
                        >
                          Contact Sales
                        </Link>
                      ) : (
                        <AddToCartButton
                          product={product}
                          className="w-full rounded-button bg-teal py-3 font-body text-sm font-medium text-navy transition-colors hover:bg-teal-dark disabled:opacity-50"
                        >
                          Add to Cart
                        </AddToCartButton>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {addOns.length > 0 && (
        <section className="pb-20">
          <div className="mx-auto max-w-content px-6 lg:px-10">
            <h2 className="mb-6 font-heading text-h3 text-navy">Accessories &amp; Consumables</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {addOns.map((addon) => (
                <div key={addon.id} className="flex items-center gap-4 rounded-card bg-white p-4 shadow-card">
                  <Link href={`/shop/${addon.id}`} className="flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={addon.image || "/addon-seedlings.jpg"} alt={addon.name} className="h-16 w-16 rounded-button object-cover" />
                  </Link>
                  <div className="flex-1">
                    <Link href={`/shop/${addon.id}`}>
                      <h3 className="font-body text-sm font-medium text-navy">{addon.name}</h3>
                    </Link>
                    <p className="font-mono text-sm font-bold text-navy">{formatPrice(addon.price)}</p>
                  </div>
                  <AddToCartButton
                    product={addon}
                    className="rounded-button bg-teal px-3 py-2 text-xs font-medium text-navy transition-colors hover:bg-teal-dark disabled:opacity-50"
                  >
                    Add
                  </AddToCartButton>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
    </div>
  );
}
