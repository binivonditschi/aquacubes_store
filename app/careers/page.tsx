"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Heart, Sprout, Users, Clock, Fish, ArrowRight } from "lucide-react";

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

/* ─── Benefits data ─── */
const benefits = [
  { icon: Globe, title: "Flexible Work", description: "Hybrid office/remote. Work where you're most productive." },
  { icon: Heart, title: "Health & Wellness", description: "Comprehensive health insurance, mental health support, gym allowance." },
  { icon: Sprout, title: "Learning Budget", description: "€2,000/year for courses, conferences, and professional development." },
  { icon: Users, title: "Team Events", description: "Monthly team dinners, quarterly offsites, annual company retreat." },
  { icon: Clock, title: "30 Days PTO", description: "Generous vacation policy plus public holidays." },
  { icon: Fish, title: "Free Seafood", description: "Every team member gets a free Aquacubes system and fresh harvests." },
];

/* ─── Job positions data ─── */
const positions = [
  { id: 1, title: "Senior Frontend Engineer", department: "Engineering", location: "Amsterdam / Remote", type: "Full-time", description: "We're looking for an experienced frontend engineer to lead the development of our customer-facing web applications. You'll work with React, TypeScript, and modern tooling to build exceptional user experiences." },
  { id: 2, title: "Embedded Systems Engineer", department: "Engineering", location: "Amsterdam", type: "Full-time", description: "Join our hardware team to develop firmware for our smart aquaculture systems. Experience with IoT, sensors, and real-time systems required." },
  { id: 3, title: "Product Designer", department: "Design", location: "Amsterdam", type: "Full-time", description: "Shape the future of our products from concept to launch. You'll work on both the physical product and the digital app experience." },
  { id: 4, title: "Aquaculture Specialist", department: "Biology", location: "Amsterdam", type: "Full-time", description: "Lead our biological research efforts to optimize growing conditions for fish and plants in our systems." },
  { id: 5, title: "Customer Success Manager", department: "Operations", location: "Remote EU", type: "Full-time", description: "Ensure our customers achieve their growing goals. Build relationships, provide guidance, and gather feedback." },
  { id: 6, title: "Supply Chain Coordinator", department: "Operations", location: "Amsterdam", type: "Full-time", description: "Manage our global supply chain, ensuring timely delivery of high-quality components and products." },
];

const departments = ["All", "Engineering", "Design", "Operations", "Biology"];

/* ═══════════════════ CAREERS PAGE ═══════════════════ */
export default function Careers() {
  return (
    <div>
      <HeroSection />
      <CultureBenefits />
      <OpenPositions />
      <CTASection />
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
          JOIN US
        </motion.p>
        <motion.h1
          custom={0.15}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-6 max-w-[700px] text-h1 text-white"
        >
          Build the Future of Food with Us
        </motion.h1>
        <motion.p
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-8 max-w-[550px] text-body text-gray-300"
        >
          We&apos;re a diverse team of engineers, biologists, designers, and food enthusiasts working to transform how the world eats.
        </motion.p>
        <motion.div
          custom={0.45}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <a
            href="#positions"
            className="inline-flex items-center rounded-button bg-teal px-8 py-3 font-body text-sm font-medium text-navy transition-all hover:bg-teal-dark hover:scale-[1.02] active:scale-[0.98]"
          >
            View Open Positions
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 2 — Culture & Benefits ── */
function CultureBenefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-off-white">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 overflow-hidden rounded-card-lg"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/careers-culture.jpg"
            alt="Aquacubes team culture"
            className="max-h-[400px] w-full object-cover"
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={staggerChild}
              className="rounded-card bg-white p-6 shadow-card"
            >
              <benefit.icon className="mb-4 h-8 w-8 text-teal" strokeWidth={1.5} />
              <h4 className="mb-2 font-heading text-h4 text-navy">{benefit.title}</h4>
              <p className="text-body-sm text-gray-500">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 3 — Open Positions ── */
function OpenPositions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeDept, setActiveDept] = useState("All");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredPositions = activeDept === "All"
    ? positions
    : positions.filter((p) => p.department === activeDept);

  return (
    <section id="positions" ref={ref} className="section-padding bg-white">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 text-h2 text-navy"
        >
          Open Positions
        </motion.h2>

        {/* Department Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8 flex flex-wrap gap-2"
        >
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`rounded-pill px-4 py-2 font-body text-sm font-medium transition-all ${
                activeDept === dept
                  ? "bg-navy text-white"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {dept}
            </button>
          ))}
        </motion.div>

        {/* Job Listings */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-3"
        >
          {filteredPositions.map((job) => (
            <motion.div
              key={job.id}
              variants={staggerChild}
              className="rounded-lg border border-gray-100 bg-white transition-colors hover:border-teal hover:bg-off-white"
            >
              <button
                onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                className="flex w-full flex-col items-start justify-between gap-4 p-5 text-left sm:flex-row sm:items-center"
              >
                <div className="flex-1">
                  <h4 className="font-body text-base font-semibold text-navy">{job.title}</h4>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-pill bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">
                    {job.department}
                  </span>
                  <span className="text-sm text-gray-500">{job.location}</span>
                  <span className="text-sm text-gray-500">{job.type}</span>
                  <ArrowRight className={`h-4 w-4 text-teal transition-transform ${expandedId === job.id ? "rotate-90" : ""}`} />
                </div>
              </button>
              {expandedId === job.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-100 px-5 pb-5 pt-4"
                >
                  <p className="mb-4 text-body-sm text-gray-500">{job.description}</p>
                  <a
                    href={`mailto:careers@aquacubes.com?subject=Application: ${encodeURIComponent(job.title)}`}
                    className="inline-flex items-center rounded-button bg-teal px-6 py-2 font-body text-sm font-medium text-navy transition-all hover:bg-teal-dark"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 4 — CTA ── */
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
        <h2 className="mb-4 text-h2 text-navy">Don&apos;t See the Right Fit?</h2>
        <p className="mx-auto mb-8 max-w-[500px] text-body text-navy/70">
          We&apos;re always looking for exceptional people. Send us your CV and tell us why you&apos;d be a great addition.
        </p>
        <a
          href="mailto:careers@aquacubes.com"
          className="inline-flex items-center rounded-button bg-navy px-8 py-3 font-body text-sm font-medium text-white transition-all hover:bg-navy-light hover:scale-[1.02] active:scale-[0.98]"
        >
          Send Your CV
        </a>
      </motion.div>
    </section>
  );
}
