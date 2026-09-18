"use client";

import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import content from "@/content/faq.json";

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const faqData = content.categories;
const categoryTabs = ["All", ...faqData.map((c) => c.category)];

/* ═══════════════════ FAQ PAGE ═══════════════════ */
export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    let data = faqData;
    if (activeCategory !== "All") {
      data = data.filter((c) => c.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
          ),
        }))
        .filter((cat) => cat.items.length > 0);
    }
    return data;
  }, [activeCategory, searchQuery]);

  const totalResults = filteredData.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy pb-16 pt-40">
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
            className="mb-6 text-h1 text-white"
          >
            {content.hero.title}
          </motion.h1>
          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mb-8 max-w-[500px] text-body text-gray-300"
          >
            {content.hero.description}
          </motion.p>

          {/* Search */}
          <motion.div
            custom={0.45}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="relative mx-auto max-w-[480px]"
          >
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={content.hero.searchPlaceholder}
              className="w-full rounded-button border border-gray-100/20 bg-white/10 py-3 pl-12 pr-4 font-body text-sm text-white outline-none transition-all placeholder:text-gray-300 focus:border-teal focus:ring-[3px] focus:ring-teal-glow"
            />
          </motion.div>
          {searchQuery && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-sm text-gray-300"
            >
              {totalResults} result{totalResults !== 1 ? "s" : ""} found
            </motion.p>
          )}
        </div>
      </section>

      {/* Accordion */}
      <section className="section-padding bg-off-white">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex flex-wrap gap-2"
          >
            {categoryTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`rounded-pill px-4 py-2 font-body text-sm font-medium transition-all ${
                  activeCategory === tab
                    ? "bg-navy text-white"
                    : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {filteredData.map((category) => (
              <div key={category.category}>
                {activeCategory === "All" && !searchQuery && (
                  <h3 className="mb-4 font-heading text-lg font-semibold text-navy">{category.category}</h3>
                )}
                <div className="space-y-2">
                  {category.items.map((item, i) => {
                    const key = `${category.category}-${i}`;
                    const isOpen = openIndex === key;
                    return (
                      <div
                        key={key}
                        className={`overflow-hidden rounded-card bg-white shadow-card transition-all ${
                          isOpen ? "border-l-[3px] border-teal" : ""
                        }`}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : key)}
                          className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-gray-50"
                        >
                          <span className="pr-4 font-body text-sm font-medium text-navy">{item.q}</span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-5 w-5 shrink-0 text-gray-300" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <div className="border-t border-gray-100 px-5 pb-5 pt-3">
                                <p className="text-sm leading-relaxed text-gray-500">{item.a}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </div>
  );
}

/* ── CTA Section ── */
function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="bg-teal py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-content px-6 text-center lg:px-10"
      >
        <h2 className="mb-4 text-h2 text-white">{content.cta.title}</h2>
        <p className="mx-auto mb-8 max-w-[500px] text-body text-white/80">{content.cta.description}</p>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-button bg-navy px-8 py-3 font-body text-sm font-medium text-white transition-all hover:bg-navy-light hover:scale-[1.02] active:scale-[0.98]"
        >
          {content.cta.buttonText}
        </Link>
      </motion.div>
    </section>
  );
}
