import Navbar from "@/components/store/Navbar";
import ProductGrid from "@/components/store/ProductGrid";
import CartDrawer from "@/components/store/CartDrawer";
import Footer from "@/components/store/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="px-6 py-24 md:px-12 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
                New Collection 2025
              </p>
              <h1 className="text-5xl font-light tracking-tight text-foreground mb-6">
                Objects for mindful living
              </h1>
              <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
                Aquacubes curates essential pieces for the modern home. 
                Each product is selected for its material honesty, functional beauty, 
                and quiet presence in your daily rituals.
              </p>
            </div>
          </div>
        </section>

        <ProductGrid />
      </main>
      <CartDrawer />
      <Footer />
    </>
  );
}
