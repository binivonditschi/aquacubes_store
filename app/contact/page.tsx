"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Youtube, CheckCircle } from "lucide-react";

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

/* ═══════════════════ CONTACT PAGE ═══════════════════ */
export default function Contact() {
  return (
    <div>
      <HeroSection />
      <ContactFormAndInfo />
      <MapSection />
    </div>
  );
}

/* ── Section 1 — Hero ── */
function HeroSection() {
  return (
    <section className="bg-navy pb-16 pt-40">
      <div className="mx-auto max-w-content px-6 text-center lg:px-10">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-4 font-mono text-xs uppercase tracking-[0.1em] text-teal"
        >
          GET IN TOUCH
        </motion.p>
        <motion.h1
          custom={0.15}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-6 text-h1 text-white"
        >
          We&apos;d Love to Hear From You
        </motion.h1>
        <motion.p
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-[550px] text-body text-gray-300"
        >
          Whether you have a question about your system, need technical support, or want to explore a partnership, our team is here to help.
        </motion.p>
      </div>
    </section>
  );
}

/* ── Section 2 — Contact Form + Info ── */
function ContactFormAndInfo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="section-padding bg-off-white">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[60%_40%] lg:gap-12">
          {/* Left — Contact Form */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="rounded-card-lg bg-white p-8 shadow-card lg:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="mb-4 h-16 w-16 text-success" />
                  <h3 className="mb-2 text-h3 text-navy">Message Sent!</h3>
                  <p className="text-body text-gray-500">We&apos;ll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-5">
                    <motion.div variants={staggerChild}>
                      <label className="mb-1.5 block font-body text-sm font-medium text-gray-700">Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full rounded-button border border-gray-100 bg-white px-4 py-3 font-body text-sm text-navy outline-none transition-all placeholder:text-gray-300 focus:border-teal focus:ring-[3px] focus:ring-teal-glow"
                      />
                    </motion.div>

                    <motion.div variants={staggerChild}>
                      <label className="mb-1.5 block font-body text-sm font-medium text-gray-700">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-button border border-gray-100 bg-white px-4 py-3 font-body text-sm text-navy outline-none transition-all placeholder:text-gray-300 focus:border-teal focus:ring-[3px] focus:ring-teal-glow"
                      />
                    </motion.div>

                    <motion.div variants={staggerChild}>
                      <label className="mb-1.5 block font-body text-sm font-medium text-gray-700">Subject</label>
                      <select className="w-full rounded-button border border-gray-100 bg-white px-4 py-3 font-body text-sm text-navy outline-none transition-all focus:border-teal focus:ring-[3px] focus:ring-teal-glow">
                        <option>General Inquiry</option>
                        <option>Technical Support</option>
                        <option>Sales</option>
                        <option>Partnership</option>
                        <option>Other</option>
                      </select>
                    </motion.div>

                    <motion.div variants={staggerChild}>
                      <label className="mb-1.5 block font-body text-sm font-medium text-gray-700">Order Number</label>
                      <input
                        type="text"
                        placeholder="AC-2024-XXXXX (if applicable)"
                        className="w-full rounded-button border border-gray-100 bg-white px-4 py-3 font-body text-sm text-navy outline-none transition-all placeholder:text-gray-300 focus:border-teal focus:ring-[3px] focus:ring-teal-glow"
                      />
                    </motion.div>

                    <motion.div variants={staggerChild}>
                      <label className="mb-1.5 block font-body text-sm font-medium text-gray-700">Message *</label>
                      <textarea
                        required
                        rows={6}
                        placeholder="How can we help?"
                        className="w-full resize-none rounded-button border border-gray-100 bg-white px-4 py-3 font-body text-sm text-navy outline-none transition-all placeholder:text-gray-300 focus:border-teal focus:ring-[3px] focus:ring-teal-glow"
                      />
                    </motion.div>

                    <motion.div variants={staggerChild}>
                      <button
                        type="submit"
                        className="w-full rounded-button bg-teal px-6 py-3.5 font-body text-sm font-medium text-white transition-all hover:bg-teal-dark hover:scale-[1.01] active:scale-[0.98]"
                      >
                        Send Message
                      </button>
                    </motion.div>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right — Contact Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {/* Email */}
            <motion.div variants={staggerChild} className="rounded-card bg-white p-6 shadow-card">
              <div className="mb-3 flex items-center gap-3">
                <Mail className="h-5 w-5 text-teal" />
                <h4 className="font-heading text-h4 text-navy">Email</h4>
              </div>
              <div className="space-y-1 text-body-sm">
                <p><span className="text-gray-500">General</span> <a href="mailto:info@aquacubes.eu" className="text-teal hover:underline">info@aquacubes.eu</a></p>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div variants={staggerChild} className="rounded-card bg-white p-6 shadow-card">
              <div className="mb-3 flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal" />
                <h4 className="font-heading text-h4 text-navy">Phone</h4>
              </div>
              <p className="text-body-sm text-navy">+49 48 347320 613</p>
              <p className="text-body-sm text-gray-500">Mon-Fri, 9:00-18:00 CET</p>
            </motion.div>

            {/* Office */}
            <motion.div variants={staggerChild} className="rounded-card bg-white p-6 shadow-card">
              <div className="mb-3 flex items-center gap-3">
                <MapPin className="h-5 w-5 text-teal" />
                <h4 className="font-heading text-h4 text-navy">Office</h4>
              </div>
              <div className="text-body-sm text-gray-500">
                <p className="text-navy font-medium">Moina GmbH</p>
                <p>Markt 5</p>
                <p>25746 Heide</p>
                <p>Germany</p>
              </div>
            </motion.div>

            {/* Social */}
            <motion.div variants={staggerChild} className="rounded-card bg-white p-6 shadow-card">
              <h4 className="mb-4 font-heading text-h4 text-navy">Follow Us</h4>
              <div className="flex gap-4">
                {[Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-gray-300 transition-colors hover:text-teal"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Section 3 — Map ── */
function MapSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="h-[400px] w-full bg-gray-100"
    >
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=9.08%2C54.19%2C9.11%2C54.21&layer=mapnik&marker=54.1955%2C9.0967"
        className="h-full w-full border-0"
        title="Aquacubes Office Location"
      />
    </motion.section>
  );
}
