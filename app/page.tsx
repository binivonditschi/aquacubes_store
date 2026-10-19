import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing";
import RoiCalculator from "@/components/home/RoiCalculator";
import Technology from "@/components/home/Technology";
import Process from "@/components/home/Process";
import Supporters from "@/components/home/Supporters";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <div className="flex w-full flex-col text-on-surface">
      <Hero />
      <Pricing />
      <RoiCalculator />
      <Technology />
      <Process />
      <Newsletter />
      <Supporters />
    </div>
  );
}
