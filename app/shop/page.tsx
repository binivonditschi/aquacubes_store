import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { serializeProduct, formatPrice } from "@/lib/utils";
import { systemSpecs } from "@/lib/product-specs";
import AddToCartButton from "@/components/store/AddToCartButton";
import Newsletter from "@/components/sections/Newsletter";

export default async function Shop() {
  const allProducts = await prisma.product.findMany({
    where: { isVisible: true },
    orderBy: { position: "asc" },
  });
  const systems = allProducts.filter((p) => p.category === "System").map(serializeProduct);

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

          <h1 className="text-h1 font-heading text-navy">Shop Aquacubes</h1>
          <p className="mt-3 max-w-xl font-body text-base text-gray-500">
            Three system sizes, built for different spaces. Every system ships complete and ready to run.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10 bg-white py-16 shadow-[0_10px_12px_-10px_rgba(0,0,0,0.15)]">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {systems.map((product, i) => {
              const specs = systemSpecs[product.id];
              const isEnterprise = i === systems.length - 1;
              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                >
                  {i === 1 && (
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-coral px-3 py-1 font-body text-xs font-semibold text-navy">
                      Most Popular
                    </span>
                  )}

                  <div className="p-5 pb-0">
                    <Link href={`/shop/${product.id}`} className="relative mx-auto block aspect-[4/3] w-2/3 overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image || "/product-standard.jpg"}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </Link>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <Link href={`/shop/${product.id}`}>
                      <h2 className="font-heading text-h4 text-navy">{product.name}</h2>
                    </Link>
                    <p className="mt-1 font-mono text-lg font-bold text-navy">{formatPrice(product.price)}</p>
                    <p className="mt-2 text-sm text-gray-500">{product.description}</p>

                    {specs && (
                      <p className="mt-4 font-mono text-xs text-gray-300">
                        {specs.power} &middot; {specs.footprint}
                      </p>
                    )}

                    <div className="mt-5">
                      {isEnterprise ? (
                        <Link
                          href="/contact"
                          className="block w-full rounded-button bg-coral py-3 text-center font-body text-sm font-medium text-navy transition-colors hover:bg-coral-dark"
                        >
                          Contact Sales
                        </Link>
                      ) : (
                        <AddToCartButton
                          product={product}
                          className="w-full rounded-button bg-navy py-3 font-body text-sm font-medium text-white transition-colors hover:bg-navy-light disabled:opacity-50"
                        >
                          Order Now
                        </AddToCartButton>
                      )}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-teal shadow-[0_0_12px_rgba(43,94,141,0.6)] transition-all duration-500 group-hover:w-full" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
