"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Leaf, Lightbulb, Users } from "lucide-react";

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
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

/* ═══════════════════ ABOUT PAGE ═══════════════════ */
export default function About() {
  return (
    <div>
      <HeroSection />
      <OurStory />
      <MissionValues />
      <CTABanner />
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
          ABOUT AQUACUBES
        </motion.p>
        <motion.h1
          custom={0.15}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-6 max-w-[800px] text-display text-white"
        >
          Growing the Future of Food
        </motion.h1>
        <motion.p
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[600px] text-body text-[#94A3B8]"
        >
          We&apos;re on a mission to make sustainable seafood accessible at home. Aquacubes combines closed-loop aquaculture with nature&apos;s wisdom, so anyone can grow fresh, healthy food without a farm.
        </motion.p>
      </div>
    </section>
  );
}

/* ── Section 2 — Our Story ── */
function OurStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-off-white">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-h2 text-navy">Our Story</h2>
            <div className="space-y-4 text-body text-gray-500">
              <p>
                Aquacubes started with a simple question: why should growing your own fresh seafood and greens require a farm? We design closed-loop aquaculture systems that fit in a home, a classroom, or a small commercial kitchen.
              </p>
              <p>
                Every system is built to handle the hard parts automatically — water quality, temperature, feeding schedules — so you can focus on the harvest.
              </p>
            </div>
            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center rounded-button border-2 border-navy px-6 py-3 font-body text-sm font-medium text-navy transition-all hover:bg-navy hover:text-white"
              >
                Shop Systems
              </Link>
            </div>
          </motion.div>

          {/* Right - Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/about-facility.jpg"
              alt="Aquacubes R&D facility"
              className="w-full rounded-card-lg object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Section 3 — Mission & Values ── */
function MissionValues() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We believe food production should give back more than it takes. Every Aquacubes system uses 90% less water and zero chemicals.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Technology should serve nature, not replace it. Our smart sensors work with biological processes, not against them.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Food connects people. We're building a global community of home aquaculturists who share knowledge, harvests, and stories.",
    },
  ];

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-h2 text-navy"
        >
          What We Believe
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={staggerChild}
              className="text-center"
            >
              <div className="mb-4 inline-flex items-center justify-center">
                <value.icon className="h-12 w-12 text-teal" strokeWidth={1.5} />
              </div>
              <h4 className="mb-3 font-heading text-h4 text-navy">{value.title}</h4>
              <p className="text-body text-gray-500">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 4 — CTA Banner ── */
function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="section-padding bg-teal">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-content px-6 text-center lg:px-10"
      >
        <h2 className="mb-4 text-h2 text-white">Ready to Start Growing?</h2>
        <p className="mx-auto mb-8 max-w-[500px] text-body text-white/80">
          Join the food revolution. Your first harvest is closer than you think.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center rounded-button bg-navy px-8 py-3 font-body text-sm font-medium text-white transition-all hover:bg-navy-light hover:scale-[1.02] active:scale-[0.98]"
        >
          Shop Now
        </Link>
      </motion.div>
    </section>
  );
}
