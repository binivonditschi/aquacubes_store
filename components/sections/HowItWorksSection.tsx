"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const steps = [
  {
    number: "01",
    title: "Set Up Your System",
    description: "Unbox, add water, and plug in. Our guided setup takes under 30 minutes. No plumbing or expertise needed.",
    image: "/how-it-works-1.jpg",
  },
  {
    number: "02",
    title: "Monitor & Grow",
    description: "Our smart sensors track water quality, temperature, and nutrients 24/7. The app alerts you when it's time to feed or harvest.",
    image: "/how-it-works-2.jpg",
  },
  {
    number: "03",
    title: "Harvest & Enjoy",
    description: "Fresh shrimp, fish, and greens ready in weeks. Harvest continuously with our rotating grow trays. Farm-to-table, literally.",
    image: "/how-it-works-3.jpg",
  },
];

export default function HowItWorksSection() {
  const containerRef = useRef(null);
  useInView(containerRef, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 80%", "end 50%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" ref={containerRef} className="section-padding bg-navy">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-teal">HOW IT WORKS</p>
          <h2 className="text-h2 text-white">Fresh Seafood in Three Simple Steps</h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 overflow-hidden lg:block">
            <motion.div className="h-full border-l-2 border-dashed border-teal/40" style={{ height: lineHeight }} />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
              >
                <div className={`overflow-hidden rounded-card ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <motion.img
                    whileInView={{ scale: [1.05, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: EASE }}
                    src={step.image}
                    alt={step.title}
                    className="aspect-[3/2] w-full object-cover"
                  />
                </div>

                <div className={i % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                  <span className="mb-2 block font-heading text-5xl font-bold text-teal/30 lg:text-6xl">{step.number}</span>
                  <h3 className="mb-4 text-h3 text-white">{step.title}</h3>
                  <p className="max-w-[480px] text-body text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
