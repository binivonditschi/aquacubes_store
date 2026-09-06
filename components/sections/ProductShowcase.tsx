"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { systemSpecs } from "@/lib/product-specs";
import type { Product } from "@/lib/types";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function ProductShowcase({ products }: { products: Product[] }) {
  return (
    <section className="section-padding border-b border-black/10 bg-slate-50 shadow-[0_10px_12px_-10px_rgba(0,0,0,0.15)]">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-h2 text-navy">Choose Your Aquacubes System</h2>
          <p className="mx-auto max-w-[500px] text-body text-gray-500">
            From restaurants to large scale commercial operations &mdash; we&apos;ve got you covered./b
            Aquacubes installations are fully customizable and can be deployed at scale, making them suitable for a variety of project sizes, locations and applications.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product, i) => {
            const isEnterprise = i === products.length - 1;
            const specs = systemSpecs[product.id];
            return (
              <motion.div
                key={product.id}
                variants={staggerChild}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
              >
                {i === 1 && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-coral px-3 py-1 font-body text-xs font-semibold text-navy">
                    Most Popular
                  </span>
                )}
                <Link href={`/shop/${product.id}`} className="block p-5 pb-0">
                  <div className="relative aspect-[4/3] w-2/3 mx-auto overflow-hidden rounded-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image || "/product-standard.jpg"}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <Link href={`/shop/${product.id}`}>
                    <h3 className="mb-2 font-heading text-lg font-semibold text-navy transition-colors hover:text-teal">{product.name}</h3>
                  </Link>
                  <p className="mb-4 text-sm text-gray-500">{product.description}</p>
                  {specs && (
                    <p className="mb-4 font-mono text-xs text-gray-300">
                      {specs.power} &middot; {specs.footprint}
                    </p>
                  )}
                  {isEnterprise ? (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href="/contact"
                        className="block w-full rounded-button bg-coral py-3 text-center font-body text-sm font-medium text-navy transition-colors hover:bg-coral-dark"
                      >
                        Contact Sales
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href={`/shop/${product.id}`}
                        className="block w-full rounded-button bg-teal py-3 text-center font-body text-sm font-medium text-white transition-colors hover:bg-teal-dark"
                      >
                        Order Now
                      </Link>
                    </motion.div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-teal shadow-[0_0_12px_rgba(43,94,141,0.6)] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
