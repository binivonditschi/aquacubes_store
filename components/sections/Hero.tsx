"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Truck, Shield, Award } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const heroTextReveal = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.3 } },
};

const heroWordReveal = {
  hidden: { opacity: 0, y: 40, rotateX: -20 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: EASE } },
};

const floatAnim = (delay: number) => ({
  y: [0, -8, 0],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay },
});

const headlineWords = ["Grow", "Your", "Own", "Premium", "Seafood", "at", "Home"];

export default function Hero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, 80]);
  const imageScale = useTransform(scrollY, [0, 500], [1, 1.05]);

  return (
    <section className="relative min-h-[100dvh] bg-off-white">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-8 px-6 pt-32 lg:grid-cols-[55%_45%] lg:items-center lg:gap-12 lg:px-10 lg:pt-28">
        <div className="flex flex-col justify-center py-8 lg:min-h-[100dvh] lg:py-0">
          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-4 font-mono text-xs uppercase tracking-[0.1em] text-teal"
          >
            AQUACUBES &mdash; SMART AQUACULTURE
          </motion.p>

          <motion.h1
            variants={heroTextReveal}
            initial="hidden"
            animate="visible"
            className="mb-6 max-w-[600px] text-display text-navy"
            style={{ perspective: 1000 }}
          >
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                variants={heroWordReveal}
                className="mr-[0.25em] inline-block"
                style={{ transformOrigin: "bottom center" }}
              >
                {word === "Seafood" ? (
                  <span className="relative inline-block">
                    {word}
                    <span className="absolute bottom-1 left-0 h-[6px] w-full bg-teal/40" />
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            custom={0.6}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-8 max-w-[480px] text-body text-gray-500"
          >
            The world&apos;s most advanced indoor aquaculture system. Fresh shrimp, fish, and greens &mdash; grown sustainably in your living room.
          </motion.p>

          <motion.div custom={0.8} variants={fadeUp} initial="hidden" animate="visible" className="mb-10 flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/shop" className="inline-block rounded-button bg-teal px-6 py-3 font-body text-sm font-medium text-navy transition-colors hover:bg-teal-dark">
                Shop Now
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href="#how-it-works"
                className="inline-block rounded-button border-2 border-navy px-6 py-3 font-body text-sm font-medium text-navy transition-all hover:bg-navy hover:text-white"
              >
                See How It Works
              </a>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="flex flex-wrap gap-4">
            {[
              { icon: Truck, label: "Free Shipping" },
              { icon: Shield, label: "30-Day Guarantee" },
              { icon: Award, label: "EU Certified" },
            ].map((badge) => (
              <motion.div key={badge.label} variants={staggerChild} className="flex items-center gap-2">
                <badge.icon className="h-4 w-4 text-teal" />
                <span className="font-body text-xs text-gray-500">{badge.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.5 }} className="relative">
          <motion.div className="relative overflow-hidden rounded-card-lg" style={{ y: imageY, scale: imageScale }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-system.jpg"
              alt="Aquacubes smart aquaculture system in modern living room"
              className="aspect-[4/3] w-full object-cover lg:aspect-auto lg:h-[85vh]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, ...floatAnim(0) }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute left-4 top-[15%] rounded-card bg-navy px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
          >
            <p className="font-heading text-2xl font-bold text-white">Up to 90%</p>
            <p className="mt-0.5 font-body text-xs text-gray-300">Water Savings</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, ...floatAnim(1.3) }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="absolute bottom-[20%] left-4 rounded-card bg-navy px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
          >
            <p className="font-heading text-2xl font-bold text-white">10kg/m&sup3;</p>
            <p className="mt-0.5 font-body text-xs text-gray-300">Production Density</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, ...floatAnim(2.6) }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="absolute bottom-[10%] right-4 rounded-card bg-navy px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
          >
            <p className="font-heading text-2xl font-bold text-white">24/7</p>
            <p className="mt-0.5 font-body text-xs text-gray-300">Automated Monitoring</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
