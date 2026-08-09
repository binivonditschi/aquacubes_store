import { mockProducts } from "@/lib/data";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const visibleProducts = mockProducts.filter((p) => p.isVisible).sort((a, b) => a.position - b.position);

  return (
    <section className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-3">
          <h2 className="text-3xl font-medium tracking-tight text-foreground">Collection</h2>
          <p className="max-w-md text-base text-muted-foreground">
            Thoughtfully selected pieces for mindful living. Each item is chosen for its material honesty and quiet beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
