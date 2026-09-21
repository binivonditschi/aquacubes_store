import Hero from "@/components/sections/Hero";
import ProductShowcase from "@/components/sections/ProductShowcase";
import WhyAquacubes from "@/components/sections/WhyAquacubes";
import { motion } from "framer-motion";
import { NewsletterForm, LeadForm } from "@/components/embeds";
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
      <Newsletter />
    </div>
  );
}
      {/* Newsletter section — your design, embed handles the form */}
      <section className="section-padding border-b border-black/10 bg-white shadow-[0_10px_12px_-10px_rgba(0,0,0,0.15)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-[600px] px-6 text-center lg:px-10"
        >
          <h2 className="mb-4 font-heading text-2xl font-bold uppercase text-black sm:text-3xl">
            {newsletter.title}
          </h2>
          <p className="mb-8 text-body text-gray-500">{newsletter.description}</p>
          <NewsletterForm />
        </motion.div>
      </section>

      {/* Lead capture — maybe in the footer or a "Get a demo" block */}
      <section className="section-padding bg-gray-50">
        <div className="mx-auto max-w-[600px] px-6">
          <LeadForm />
        </div>
      </section>
    </>
  );
}
