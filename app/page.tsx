import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import WhyAquacubes from "@/components/sections/WhyAquacubes";
import { motion } from "framer-motion";
import Newsletter from "@/components/Newsletter";
import content from "@/content/home.json";

const { newsletter } = content;

export default function HomePage() {
  return (
    <>

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductShowcase />
      <WhyAquacubes />
      <NewsletterForm />
    </div>
  );
}
     
