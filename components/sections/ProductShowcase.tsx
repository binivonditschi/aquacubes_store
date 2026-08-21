"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/store/useCart";
import { formatPrice } from "@/lib/utils";
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

export default function ProductShowcase({ products, addOns }: { products: Product[]; addOns: Product[] }) {
  const addItem = useCart((s) => s.addItem);

  return (
    <section className="section-padding bg-off-white">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-teal">OUR SYSTEMS</p>
          <h2 className="mb-4 text-h2 text-navy">Choose Your Aquacubes System</h2>
          <p className="mx-auto max-w-[500px] text-body text-gray-500">
            From home enthusiasts to commercial operations &mdash; we&apos;ve got you covered.
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
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image || "/product-standard.jpg"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-1 font-heading text-lg font-semibold text-navy">{product.name}</h3>
                  <p className="mb-3 font-mono text-lg font-bold text-navy">{formatPrice(product.price)}</p>
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
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image ?? undefined })}
                      className="w-full rounded-button bg-teal py-3 font-body text-sm font-medium text-white transition-colors hover:bg-teal-dark"
                    >
                      Add to Cart
                    </motion.button>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-teal shadow-[0_0_12px_rgba(43,94,141,0.6)] transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </motion.div>

        {addOns.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-10"
          >
            <h3 className="mb-6 text-center font-heading text-lg font-semibold text-navy">Popular Accessories</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {addOns.map((addon) => (
                <motion.div
                  key={addon.id}
                  whileHover={{ y: -4, boxShadow: "0 8px 25px rgba(0,0,0,0.08)" }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4 rounded-card bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={addon.image || "/addon-seedlings.jpg"} alt={addon.name} className="h-16 w-16 rounded-button object-cover" />
                  <div className="flex-1">
                    <h4 className="font-body text-sm font-medium text-navy">{addon.name}</h4>
                    <p className="font-mono text-sm font-bold text-navy">{formatPrice(addon.price)}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addItem({ id: addon.id, name: addon.name, price: addon.price, image: addon.image ?? undefined })}
                    className="rounded-button bg-teal px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-teal-dark"
                  >
                    Add
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div className="text-center" whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
          <Link href="/shop" className="inline-flex items-center gap-2 font-body text-sm font-medium text-teal transition-colors hover:text-teal-dark">
            View All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
