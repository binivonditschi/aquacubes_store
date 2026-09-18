"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Leaf, Lightbulb, Users, type LucideIcon } from "lucide-react";
import content from "@/content/about.json";

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

const iconMap: Record<string, LucideIcon> = {
  leaf: Leaf,
  lightbulb: Lightbulb,
  users: Users,
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
          {content.hero.eyebrow.toUpperCase()}
        </motion.p>
        <motion.h1
          custom={0.15}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-6 max-w-[800px] text-display text-white"
        >
          {content.hero.title}
        </motion.h1>
        <motion.p
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[600px] text-body text-[#94A3B8]"
        >
          {content.hero.description}
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
            <h2 className="mb-6 text-h2 text-navy">{content.story.title}</h2>
            <div className="space-y-4 text-body text-gray-500">
              {content.story.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-flex items-center rounded-button border-2 border-navy px-6 py-3 font-body text-sm font-medium text-navy transition-all hover:bg-navy hover:text-white"
              >
                {content.story.buttonText}
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
              src={content.story.image}
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

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-h2 text-navy"
        >
          {content.values.title}
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {content.values.items.map((value) => {
            const Icon = iconMap[value.icon];
            return (
              <motion.div key={value.title} variants={staggerChild} className="text-center">
                <div className="mb-4 inline-flex items-center justify-center">
                  <Icon className="h-12 w-12 text-teal" strokeWidth={1.5} />
                </div>
                <h4 className="mb-3 font-heading text-h4 text-navy">{value.title}</h4>
                <p className="text-body text-gray-500">{value.description}</p>
              </motion.div>
            );
          })}
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
        <h2 className="mb-4 text-h2 text-white">{content.cta.title}</h2>
        <p className="mx-auto mb-8 max-w-[500px] text-body text-white/80">{content.cta.description}</p>
        <Link
          href="/shop"
          className="inline-flex items-center rounded-button bg-navy px-8 py-3 font-body text-sm font-medium text-white transition-all hover:bg-navy-light hover:scale-[1.02] active:scale-[0.98]"
        >
          {content.cta.buttonText}
        </Link>
      </motion.div>
    </section>
  );
}
