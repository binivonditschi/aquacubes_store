import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import ProductDetailActions from "@/components/store/ProductDetailActions";

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = await prisma.product.findUnique({ where: { id } });

  if (!record || !record.isVisible) {
    notFound();
  }

  const product = serializeProduct(record);

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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
