import { mockProducts } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/store/Navbar";
import CartDrawer from "@/components/store/CartDrawer";
import Footer from "@/components/store/Footer";
import ProductPurchaseSelector from "@/components/store/ProductPurchaseSelector";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = mockProducts.find((p) => p.id === id);

  if (!product) return notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 py-12 md:px-12">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </Link>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">
                {product.category}
              </p>
              <h1 className="text-3xl font-medium tracking-tight text-foreground mb-4">
                {product.name}
              </h1>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              <ProductPurchaseSelector product={product} />
            </div>
          </div>
        </div>
      </main>
      <CartDrawer />
      <Footer />
    </>
  );
}
