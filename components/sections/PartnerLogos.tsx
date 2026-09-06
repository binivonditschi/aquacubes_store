"use client";

import { motion } from "framer-motion";
import { Waves, Building2, Sun, Store, Sailboat, type LucideIcon } from "lucide-react";

const partners: { name: string; icon: LucideIcon }[] = [
  { name: "DE", icon: Waves },
  { name: "CH", icon: Building2 },
  { name: "NO", icon: Sun },
  { name: "DK", icon: Store },
  { name: "SE", icon: Sailboat },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function PartnerLogos() {
  return (
    <section className="border-b border-black/10 bg-[#f2f2f2] py-14 shadow-[0_10px_12px_-10px_rgba(0,0,0,0.15)]">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8"
        >
          {partners.map(({ name, icon: Icon }) => (
            <motion.div key={name} variants={staggerChild} className="flex flex-col items-center gap-2 text-navy/60">
              <Icon className="h-7 w-7" strokeWidth={1.5} />
              <span className="font-heading text-base font-medium">{name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
