"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Droplets, ShieldCheck, Leaf, Recycle } from "lucide-react";

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

/* ─── CountUp hook ─── */
function useCountUp(end: number, duration: number = 1.5, start: boolean = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(undefined);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, start]);

  return count;
}

/* ─── Stat Card ─── */
function StatCard({ value, suffix, label, icon: Icon, delay }: { value: number; suffix: string; label: string; icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useCountUp(value, 1.5, isInView);

  return (
    <motion.div
      ref={ref}
      variants={staggerChild}
      className="rounded-card bg-white p-8 text-center shadow-card"
    >
      <div className="mb-4 inline-flex items-center justify-center">
        <Icon className="h-10 w-10 text-teal" strokeWidth={1.5} />
      </div>
      <div className="mb-2 font-display text-2xl font-bold text-navy">
        {count}
        {suffix}
      </div>
      <p className="text-body-sm text-gray-500">{label}</p>
    </motion.div>
  );
}

/* ═══════════════════ SUSTAINABILITY PAGE ═══════════════════ */
export default function Sustainability() {
  return (
    <div>
      <HeroSection />
      <ImpactMetrics />
      <SustainablePractices />
      <CarbonCommitment />
      <CTASection />
    </div>
  );
}

/* ── Section 1 — Hero ── */
function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sustainability-hero.jpg"
          alt="Sustainable aquaculture facility"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" />
      </div>
      <div className="relative pb-24 pt-48">
        <div className="mx-auto max-w-content px-6 text-center lg:px-10">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-4 font-mono text-xs uppercase tracking-[0.1em] text-teal"
          >
            SUSTAINABILITY
          </motion.p>
          <motion.h1
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mb-6 max-w-[800px] text-display text-white"
          >
            Growing Better, Not Just Bigger
          </motion.h1>
          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-[550px] text-body text-gray-300"
          >
            Every Aquacubes system is designed with the planet in mind. From materials to water use to shipping, we measure our impact and constantly improve.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ── Section 2 — Impact Metrics ── */
function ImpactMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const stats = [
    { value: 90, suffix: "%", label: "Less Water Used", icon: Droplets },
    { value: 0, suffix: "", label: "Pesticides Used", icon: ShieldCheck },
    { value: 85, suffix: "%", label: "Lower Carbon Footprint", icon: Leaf },
    { value: 100, suffix: "%", label: "Recyclable Packaging", icon: Recycle },
  ];

  return (
    <section ref={ref} className="section-padding bg-off-white">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-h2 text-navy"
        >
          Our Impact
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} delay={0} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 3 — Sustainable Practices ── */
function SustainablePractices() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const practices = [
    {
      title: "90% Less Water",
      body: "Our closed-loop recirculating system uses just 10% of the water traditional aquaculture requires. Every drop is filtered, oxygenated, and reused.",
      side: "left",
    },
    {
      title: "Zero Chemical Inputs",
      body: "Nature does the work. Beneficial bacteria convert fish waste into plant nutrients. No pesticides, no antibiotics, no synthetic fertilizers. Ever.",
      side: "right",
    },
    {
      title: "Made in the EU",
      body: "All Aquacubes systems are designed, manufactured, and assembled in Germany. Shorter supply chains mean fewer emissions and support for local industry.",
      side: "left",
    },
  ];

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="space-y-20">
          {practices.map((practice, i) => (
            <motion.div
              key={practice.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className={`grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                practice.side === "right" ? "lg:[direction:rtl]" : ""
              }`}
            >
              <div className={practice.side === "right" ? "lg:[direction:ltr]" : ""}>
                <h2 className="mb-4 text-h2 text-teal">{practice.title}</h2>
                <p className="text-body text-gray-500">{practice.body}</p>
              </div>
              <div className={practice.side === "right" ? "lg:[direction:ltr]" : ""}>
                <div className="flex h-48 items-center justify-center rounded-card-lg bg-off-white">
                  <Droplets className="h-20 w-20 text-teal/20" strokeWidth={1} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 4 — Carbon Commitment ── */
function CarbonCommitment() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const commitments = [
    {
      title: "Built to Last",
      description: "Every system is designed for repair and reuse, not replacement — fewer parts end up in landfill.",
      icon: "target",
    },
    {
      title: "Responsible Materials",
      description: "We choose components and packaging that minimize environmental impact, from manufacturing through delivery.",
      icon: "refresh",
    },
    {
      title: "Closed-Loop by Design",
      description: "No chemical inputs, minimal water waste — the system does the environmental work automatically.",
      icon: "globe",
    },
  ];

  return (
    <section ref={ref} className="section-padding bg-navy">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-h2 text-white"
        >
          Our Carbon Commitment
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {commitments.map((commitment) => (
            <motion.div
              key={commitment.title}
              variants={staggerChild}
              className="rounded-card bg-navy-light p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal/10">
                <Leaf className="h-5 w-5 text-teal" />
              </div>
              <h4 className="mb-2 font-heading text-h4 text-white">{commitment.title}</h4>
              <p className="text-body-sm text-gray-300">{commitment.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 5 — CTA ── */
function CTASection() {
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
        <h2 className="mb-4 text-h2 text-navy">Be Part of the Solution</h2>
        <p className="mx-auto mb-8 max-w-[500px] text-body text-navy/70">
          Every harvest you grow at home is a step toward a more sustainable food system.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center rounded-button bg-navy px-8 py-3 font-body text-sm font-medium text-white transition-all hover:bg-navy-light hover:scale-[1.02] active:scale-[0.98]"
        >
          Get Your System
        </Link>
      </motion.div>
    </section>
  );
}
