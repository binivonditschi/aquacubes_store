"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Set Up Your System",
    description: "Unbox, add water, and plug in. Our guided setup takes under 30 minutes. No plumbing or expertise needed.",
  },
  {
    number: "02",
    title: "Monitor & Grow",
    description: "Our smart sensors track water quality, temperature, and nutrients 24/7. The app alerts you when it's time to feed or harvest.",
  },
  {
    number: "03",
    title: "Harvest & Enjoy",
    description: "Fresh shrimp, fish, and greens ready in weeks. Harvest continuously with our rotating grow trays. Farm-to-table, literally.",
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-padding border-b border-black/10 bg-slate-100 shadow-[0_10px_12px_-10px_rgba(0,0,0,0.15)]">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-h2 text-navy">Fresh Seafood in Three Simple Steps</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8"
        >
          {steps.map((step, i) => (
            <motion.div key={step.number} variants={staggerChild}>
              <div className="mb-6 flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-teal/30 bg-white font-mono text-sm font-semibold text-teal">
                  {step.number}
                </span>
                {i < steps.length - 1 && (
                  <div className="hidden h-px flex-1 bg-gradient-to-r from-teal/30 to-transparent md:block" />
                )}
              </div>
              <h3 className="mb-3 text-h3 text-navy">{step.title}</h3>
              <p className="max-w-[380px] text-body text-gray-500">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
