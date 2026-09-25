"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Fish, ShieldCheck, Cpu, type LucideIcon } from "lucide-react";
import content from "@/content/home.json";

const iconMap: Record<string, LucideIcon> = {
  fish: Fish,
  shield: ShieldCheck,
  cpu: Cpu,
};

const { whyAquacubes } = content;

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function WhyAquacubes() {
  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: "#061326" }}>
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 gap-8 border-b border-white/10 pb-12 md:grid-cols-3"
        >
          {whyAquacubes.features.map((feature, i) => {
            const Icon = iconMap[feature.id];
            return (
              <motion.div
                key={feature.id}
                variants={staggerChild}
                className={`flex items-start gap-4 md:pl-6 ${i > 0 ? "md:border-l md:border-white/10" : ""}`}
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border"
                  style={{ borderColor: feature.iconColor, color: feature.iconColor }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="mb-1 font-heading text-base font-semibold" style={{ color: "#deedfb" }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm" style={{ color: "#deedfb" }}>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="pt-12"
        >
          <h2 className="mb-2 text-h2 font-bold" style={{ color: "#deedfb" }}>
            {whyAquacubes.inspireTitle}
          </h2>
          <div className="mb-6 h-0.5 w-10 bg-white" />
          <p className="mb-6 max-w-md text-body" style={{ color: "#deedfb" }}>
            {whyAquacubes.inspireText}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-teal px-6 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-teal-dark"
            >
              {whyAquacubes.primaryButtonText}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-teal/50 px-6 py-3 text-sm font-medium text-teal transition-colors hover:bg-teal/10"
            >
              {whyAquacubes.secondaryButtonText}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
