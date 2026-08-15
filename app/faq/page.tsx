"use client";

import { useRef, useState, useMemo } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ─── FAQ data ─── */
const faqData = [
  {
    category: "General",
    items: [
      { q: "What is Aquacubes?", a: "Aquacubes is a smart indoor aquaculture system that lets you grow fresh seafood and vegetables at home using aquaponics technology. Our systems combine fish farming with hydroponic gardening in a closed-loop, sustainable ecosystem." },
      { q: "How much space do I need?", a: "The Standard system fits on a countertop (60×40cm). The Pro requires a dedicated table (120×60cm). The Enterprise needs approximately 2×1 meters of floor space." },
      { q: "Is it safe for children and pets?", a: "Yes. All electrical components are fully sealed and water-safe. The tank has a secure lid. We recommend ages 8+ with adult supervision for setup." },
    ],
  },
  {
    category: "Setup & Installation",
    items: [
      { q: "How long does setup take?", a: "Most customers complete setup in 20-30 minutes. The system arrives mostly assembled. Just add water, plug in, and follow the guided setup in our mobile app." },
      { q: "Do I need any plumbing?", a: "No plumbing required. All water connections are built-in and sealed. Just fill the tank with tap water and the system handles the rest." },
      { q: "What tools do I need?", a: "None. Everything you need is included in the box. A simple screwdriver is provided for any minor assembly." },
    ],
  },
  {
    category: "Maintenance",
    items: [
      { q: "How much maintenance is required?", a: "Minimal. The automated system handles water quality, temperature, and feeding schedules. You'll spend about 10 minutes per week checking the app and feeding. Monthly filter cleaning takes 15 minutes." },
      { q: "How often do I need to clean the system?", a: "The pre-filter should be rinsed monthly. A full system clean is recommended every 6 months and takes about 30 minutes. The app will remind you." },
      { q: "What happens when I go on vacation?", a: "The automated feeding system can handle up to 2 weeks. For longer trips, we recommend our automatic feeder add-on or asking a friend to top up food." },
    ],
  },
  {
    category: "Shipping & Returns",
    items: [
      { q: "How much is shipping?", a: "Free shipping on all orders within the EU. Express shipping (2-3 days) is available for €29." },
      { q: "How long does delivery take?", a: "Standard shipping: 5-7 business days within the EU. Express: 2-3 business days. Enterprise systems may require 10-14 days for specialized delivery." },
      { q: "What is your return policy?", a: "30-day money-back guarantee. If you're not satisfied, return your system for a full refund. We cover return shipping. The system must be in original condition." },
      { q: "Do you ship outside the EU?", a: "Currently we ship to all EU countries plus the UK, Switzerland, and Norway. We're working on expanding to more regions." },
    ],
  },
  {
    category: "Technical",
    items: [
      { q: "What can I grow?", a: "Fish: tilapia, barramundi, shrimp. Plants: lettuce, basil, spinach, kale, herbs, and leafy greens. We're constantly adding supported species through app updates." },
      { q: "How much electricity does it use?", a: "Standard: ~50W (similar to a laptop). Pro: ~100W. Enterprise: ~250W. All systems use energy-efficient LED grow lights and low-power pumps." },
      { q: "Is the app available for my phone?", a: "Yes. The Aquacubes app is available for iOS (13+) and Android (8+). You can also access your dashboard via any web browser." },
      { q: "What happens if the power goes out?", a: "The system has a 4-hour battery backup for critical functions. The fish will be fine for 24+ hours without power as long as the tank isn't overstocked." },
    ],
  },
  {
    category: "Warranty",
    items: [
      { q: "What warranty do you offer?", a: "All systems come with a 2-year warranty covering manufacturing defects and component failures. Extended warranties are available at checkout." },
      { q: "What isn't covered by warranty?", a: "Damage from misuse, accidents, unauthorized modifications, or neglect (e.g., not cleaning filters). Consumable parts like grow sponges and nutrients are not covered." },
    ],
  },
];

const categoryTabs = ["All", "General", "Setup & Installation", "Maintenance", "Shipping & Returns", "Technical", "Warranty"];

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
            SUPPORT
          </motion.p>
          <motion.h1
            custom={0.15}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-6 text-h1 text-white"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            custom={0.3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mx-auto mb-8 max-w-[500px] text-body text-gray-300"
          >
            Find answers to common questions about Aquacubes systems, shipping, returns, and more.
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
              placeholder="Search FAQs..."
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
        <h2 className="mb-4 text-h2 text-navy">Still Have Questions?</h2>
        <p className="mx-auto mb-8 max-w-[500px] text-body text-navy/70">
          Our support team is here to help. Reach out and we&apos;ll get back to you within 24 hours.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-button bg-navy px-8 py-3 font-body text-sm font-medium text-white transition-all hover:bg-navy-light hover:scale-[1.02] active:scale-[0.98]"
        >
          Contact Us
        </Link>
      </motion.div>
    </section>
  );
}
