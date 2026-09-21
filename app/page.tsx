import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import WhyAquacubes from "@/components/sections/WhyAquacubes";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductShowcase />
      <WhyAquacubes />
      <Newsletter />
    </div>
  );
}
