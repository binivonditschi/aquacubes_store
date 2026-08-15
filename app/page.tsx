import { prisma } from "@/lib/prisma";
import { serializeProduct } from "@/lib/utils";
import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import StatsBand from "@/components/sections/StatsBand";
import FaqAccordion from "@/components/sections/FaqAccordion";
import Newsletter from "@/components/sections/Newsletter";

export default async function Home() {
  const allProducts = await prisma.product.findMany({
    where: { isVisible: true },
    orderBy: { position: "asc" },
  });
  const products = allProducts.filter((p) => p.category === "System").map(serializeProduct);
  const addOns = allProducts.filter((p) => p.category === "Add-on").map(serializeProduct);

  return (
    <div>
      <Hero />
      <ProductShowcase products={products} addOns={addOns} />
      <HowItWorksSection />
      <StatsBand />
      <FaqAccordion />
      <Newsletter />
    </div>
  );
}
