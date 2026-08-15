import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { serializeProduct, formatPrice } from "@/lib/utils";
import { systemSpecs, systemIncludes } from "@/lib/product-specs";
import ProductDetailActions from "@/components/store/ProductDetailActions";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = await prisma.product.findUnique({ where: { id } });

  if (!record || !record.isVisible) {
    notFound();
  }

  const product = serializeProduct(record);
  const isSystem = product.category === "System";
  const specs = systemSpecs[product.id];

  return (
    <div className="bg-off-white">
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
              <li className="text-gray-500">{product.name}</li>
            </ol>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[55%_45%]">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image || "/product-standard.jpg"} alt={product.name} className="h-full w-full object-cover" />
            </div>

            <div>
              <p className="mb-2 font-body text-xs uppercase tracking-[0.05em] text-gray-300">{product.category}</p>
              <h1 className="mb-3 text-h1 font-heading text-navy">{product.name}</h1>
              <p className="mb-6 font-mono text-2xl font-bold text-navy">{formatPrice(product.price)}</p>
              <p className="mb-8 text-body text-gray-500">{product.description}</p>

              <ProductDetailActions product={product} />

              {isSystem && specs && (
                <div className="mt-8 rounded-xl bg-white p-6 shadow-card">
                  <h2 className="mb-4 font-heading text-h4 text-navy">Specifications</h2>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between border-b border-gray-100 pb-3">
                      <dt className="text-gray-500">Power draw</dt>
                      <dd className="font-medium text-navy">{specs.power}</dd>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 pb-3">
                      <dt className="text-gray-500">Footprint</dt>
                      <dd className="font-medium text-navy">{specs.footprint}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-500">Best for</dt>
                      <dd className="font-medium text-navy">{specs.bestFor}</dd>
                    </div>
                  </dl>
                </div>
              )}

              {isSystem && (
                <div className="mt-6">
                  <h2 className="mb-3 font-heading text-h4 text-navy">What&apos;s Included</h2>
                  <ul className="space-y-2">
                    {systemIncludes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-500">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
