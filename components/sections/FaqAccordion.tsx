"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const faqData = [
  {
    q: "How much space does Aquacubes need?",
    a: "The Standard system fits on a countertop (60×40cm). The Pro requires a dedicated table or stand (120×60cm). The Enterprise system needs approximately 2×1 meters of floor space.",
  },
  {
    q: "What can I grow with Aquacubes?",
    a: "Shrimp, tilapia, barramundi, and various leafy greens including lettuce, basil, spinach, and kale. We're constantly expanding our supported species list through firmware updates.",
  },
  {
    q: "How much maintenance is required?",
    a: "Minimal. The automated system handles water quality, feeding schedules, and temperature. You'll spend about 10 minutes per week feeding and checking the app. Monthly filter cleaning takes 15 minutes.",
  },
  {
    q: "Is it safe for children and pets?",
    a: "Absolutely. All electrical components are sealed and water-safe. The tank has a secure lid. We recommend the system for ages 8+ with adult supervision for setup.",
  },
  {
    q: "What's the power consumption?",
    a: "The Standard uses approximately 50W (similar to a laptop). The Pro uses 100W, and the Enterprise 250W. All systems use energy-efficient LED grow lights and low-power pumps.",
  },
  {
    q: "What happens if something goes wrong?",
    a: "Our 24/7 monitoring alerts you immediately via the app. Our support team is available 7 days a week. All systems come with a 2-year warranty and 30-day money-back guarantee.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section-padding bg-off-white">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[40%_60%] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.1em] text-teal">FAQ</p>
            <h2 className="mb-4 text-h2 text-navy">Got Questions?</h2>
            <p className="mb-6 text-body text-gray-500">
              Everything you need to know about Aquacubes. Can&apos;t find what you&apos;re looking for?
            </p>
            <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 font-body text-sm font-medium text-teal transition-colors hover:text-teal-dark">
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="space-y-3">
            {faqData.map((faq, i) => (
              <motion.div
                key={i}
                variants={staggerChild}
                className="overflow-hidden rounded-card bg-white shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
              >
                <button onClick={() => toggle(i)} className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-gray-50/50">
                  <span className="pr-4 font-body text-sm font-medium text-navy">{faq.q}</span>
                  <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                    <ChevronDown className="h-5 w-5 shrink-0 text-gray-300" />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="border-t border-gray-100 px-5 pb-5 pt-3">
                        <p className="text-sm leading-relaxed text-gray-500">{faq.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
