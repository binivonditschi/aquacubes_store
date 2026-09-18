"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import content from "@/content/how-it-works.json";

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

type Step = (typeof content.steps)[number];

/* ═══════════════════ HOW IT WORKS PAGE ═══════════════════ */
export default function HowItWorks() {
  return (
    <div>
      <HeroSection />
      {content.steps.map((step, i) => (
        <StepSection key={step.number} step={step} index={i} />
      ))}
      <ComparisonTable />
    </div>
  );
}

/* ── Section 1 — Hero ── */
function HeroSection() {
  return (
    <section className="bg-navy pb-20 pt-40">
      <div className="mx-auto max-w-content px-6 text-center lg:px-10">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-4 font-mono text-xs uppercase tracking-[0.1em] text-teal"
        >
          {content.hero.eyebrow.toUpperCase()}
        </motion.p>
        <motion.h1
          custom={0.15}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-6 max-w-[700px] text-h1 text-white"
        >
          {content.hero.title}
        </motion.h1>
        <motion.p
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[500px] text-body text-gray-300"
        >
          {content.hero.description}
        </motion.p>
      </div>
    </section>
  );
}

/* ── Step Section ── */
function StepSection({ step, index }: { step: Step; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const isReversed = index % 2 === 1;

  return (
    <section ref={ref} className={`section-padding ${index % 2 === 0 ? "bg-off-white" : "bg-white"}`}>
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${isReversed ? "lg:[direction:rtl]" : ""}`}
        >
          {/* Image */}
          <div className={`overflow-hidden rounded-card-lg ${isReversed ? "lg:[direction:ltr]" : ""}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={step.image}
              alt={step.title}
              className="aspect-[3/2] w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className={isReversed ? "lg:[direction:ltr]" : ""}>
            <span className="mb-2 block font-heading text-5xl font-bold text-teal/20 lg:text-6xl">
              {step.number}
            </span>
            <h2 className="mb-4 text-h2 text-navy">{step.title}</h2>
            <div className="mb-6 space-y-4">
              {step.paragraphs.map((p, i) => (
                <p key={i} className="text-body text-gray-500">{p}</p>
              ))}
            </div>

            <span className="mb-6 inline-block rounded-pill bg-teal/10 px-4 py-2 font-body text-sm font-medium text-teal">
              {step.timeline}
            </span>

            <ul className="mt-4 space-y-2">
              {step.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-body-sm text-gray-500">
                  <Check className="h-4 w-4 shrink-0 text-teal" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Comparison Table ── */
function ComparisonTable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-navy">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center text-h2 text-white"
        >
          {content.comparison.title}
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="overflow-hidden rounded-card"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-navy-light">
            <div className="px-6 py-4 font-heading text-sm font-semibold uppercase tracking-wider text-gray-300">Factor</div>
            <div className="px-6 py-4 font-heading text-sm font-semibold uppercase tracking-wider text-teal">Aquacubes</div>
            <div className="px-6 py-4 font-heading text-sm font-semibold uppercase tracking-wider text-gray-300">Traditional</div>
          </div>

          {/* Table Rows */}
          {content.comparison.rows.map((row, i) => (
            <motion.div
              key={row.factor}
              variants={staggerChild}
              className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-navy" : "bg-navy-light"}`}
            >
              <div className="px-6 py-4 font-body text-sm text-white">{row.factor}</div>
              <div className="px-6 py-4 font-body text-sm font-medium text-teal">{row.aquacubes}</div>
              <div className="px-6 py-4 font-body text-sm text-gray-300">{row.traditional}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link
            href="/shop"
            className="inline-flex items-center rounded-button bg-teal px-8 py-3 font-body text-sm font-medium text-white transition-all hover:bg-teal-dark hover:scale-[1.02] active:scale-[0.98]"
          >
            {content.comparison.buttonText}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
