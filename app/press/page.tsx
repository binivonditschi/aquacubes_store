"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Download, FileImage, FileText, BookOpen, Newspaper } from "lucide-react";

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

/* ─── Press kit resources ─── */
const resources = [
  { icon: FileImage, title: "Logo Pack", description: "PNG, SVG, and EPS versions of the Aquacubes logo in all color variants.", cta: "Download ZIP" },
  { icon: FileText, title: "Product Images", description: "High-resolution product photography of all systems.", cta: "Download ZIP" },
  { icon: BookOpen, title: "Brand Guidelines", description: "Logo usage, color palette, typography, and do's/don'ts.", cta: "Download PDF" },
  { icon: Newspaper, title: "Fact Sheet", description: "Company overview, key stats, leadership bios, milestones.", cta: "Download PDF" },
];

/* ─── Press releases data ─── */
const pressReleases = [
  {
    id: 1,
    title: "Aquacubes Raises €5M Series A to Expand Smart Aquaculture Across Europe",
    date: "December 15, 2024",
    excerpt: "Amsterdam-based aquaculture technology company Aquacubes has secured €5 million in Series A funding led by Green Ventures Capital...",
    tag: "Funding",
  },
  {
    id: 2,
    title: "Aquacubes Launches Enterprise System for Commercial Aquaculture",
    date: "October 3, 2024",
    excerpt: "The new Aquacubes Enterprise brings professional-grade indoor aquaculture to restaurants, schools, and small farms...",
    tag: "Product Launch",
  },
  {
    id: 3,
    title: "Aquacubes Partners with University of Wageningen on Aquaculture Research",
    date: "August 22, 2024",
    excerpt: "Joint research initiative will explore next-generation aquaponics systems and sustainable feed alternatives...",
    tag: "Partnership",
  },
  {
    id: 4,
    title: "Aquacubes Achieves B Corp Certification",
    date: "June 10, 2024",
    excerpt: "Certification recognizes the company's commitment to environmental and social responsibility...",
    tag: "Sustainability",
  },
];

/* ─── Media coverage data ─── */
const publications = ["TechCrunch", "Wired", "Dezeen", "Food & Wine", "Fast Company", "The Guardian"];

const quotes = [
  { text: "“Aquacubes is making sustainable seafood accessible to everyone, and it's brilliant.”", source: "TechCrunch" },
  { text: "“The most elegantly designed home aquaculture system we've ever tested.”", source: "Wired" },
  { text: "“A genuine game-changer for urban food production.”", source: "Dezeen" },
];

/* ═══════════════════ PRESS PAGE ═══════════════════ */
export default function Press() {
  return (
    <div>
      <HeroSection />
      <PressKit />
      <PressReleases />
      <MediaCoverage />
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
          PRESS &amp; MEDIA
        </motion.p>
        <motion.h1
          custom={0.15}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 text-h1 text-white"
        >
          Aquacubes in the News
        </motion.h1>
        <motion.p
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-8 max-w-[550px] text-body text-gray-300"
        >
          For press inquiries, interviews, and media assets, contact our communications team.
        </motion.p>
        <motion.div
          custom={0.45}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-4"
        >
          <button className="inline-flex items-center gap-2 rounded-button border-2 border-white px-6 py-3 font-body text-sm font-medium text-white transition-all hover:bg-white hover:text-navy">
            <Download className="h-4 w-4" />
            Download Press Kit (PDF)
          </button>
          <a href="mailto:press@aquacubes.com" className="text-teal transition-colors hover:underline">
            press@aquacubes.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 2 — Press Kit ── */
function PressKit() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="section-padding bg-off-white">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 text-h2 text-navy"
        >
          Media Resources
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {resources.map((resource) => (
            <motion.div
              key={resource.title}
              variants={staggerChild}
              className="rounded-card bg-white p-6 shadow-card"
            >
              <resource.icon className="mb-4 h-10 w-10 text-teal" strokeWidth={1.5} />
              <h4 className="mb-2 font-heading text-h4 text-navy">{resource.title}</h4>
              <p className="mb-4 text-body-sm text-gray-500">{resource.description}</p>
              <button className="inline-flex items-center gap-1 font-body text-sm font-medium text-teal transition-colors hover:text-teal-dark">
                <Download className="h-4 w-4" />
                {resource.cta}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 3 — Press Releases ── */
function PressReleases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="section-padding bg-white">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 text-h2 text-navy"
        >
          Press Releases
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-4"
        >
          {pressReleases.map((release) => (
            <motion.article
              key={release.id}
              variants={staggerChild}
              className="rounded-lg border-l-4 border-teal bg-white p-5 shadow-card transition-colors hover:bg-off-white"
            >
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <span className="rounded-pill bg-teal/10 px-3 py-1 text-xs font-medium text-teal">
                  {release.tag}
                </span>
                <span className="text-sm text-gray-300">{release.date}</span>
              </div>
              <h3 className="mb-2 font-heading text-base font-semibold text-navy">{release.title}</h3>
              <p className="text-body-sm text-gray-500">{release.excerpt}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 4 — Media Coverage ── */
function MediaCoverage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="section-padding bg-off-white">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center text-h2 text-navy"
        >
          As Seen In
        </motion.h2>

        {/* Publication Logos */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 flex flex-wrap items-center justify-center gap-8 lg:gap-16"
        >
          {publications.map((pub) => (
            <motion.span
              key={pub}
              variants={staggerChild}
              className="font-heading text-lg font-semibold text-gray-300 transition-colors hover:text-navy lg:text-xl"
            >
              {pub}
            </motion.span>
          ))}
        </motion.div>

        {/* Quote Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto max-w-[700px] text-center"
        >
          <div className="relative min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeQuote}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="mb-4 text-h3 italic text-gray-500">{quotes[activeQuote].text}</p>
                <p className="font-body text-sm font-medium text-gray-300">
                  &mdash; {quotes[activeQuote].source}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveQuote(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === activeQuote ? "w-6 bg-teal" : "bg-gray-300 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
