"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="section-padding bg-navy">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-[600px] px-6 text-center lg:px-10"
      >
        <h2 className="mb-4 text-h2 text-white">Join the Aquacubes Community</h2>
        <p className="mb-8 text-body text-gray-300">Get growing tips, exclusive offers, and early access to new products.</p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-3 rounded-card bg-teal/10 py-4"
          >
            <svg className="h-6 w-6 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-body text-sm font-medium text-teal">You&apos;re in! Welcome to the community.</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 rounded-xl bg-white/10 px-4 py-3 font-body text-sm text-white placeholder-gray-300 outline-none transition-all duration-300 focus:bg-white/20 focus:ring-2 focus:ring-teal/50"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="rounded-xl bg-teal px-8 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-teal-dark"
            >
              Subscribe
            </motion.button>
          </form>
        )}

        <p className="mt-4 font-body text-xs text-gray-300">No spam, ever. Unsubscribe anytime.</p>
      </motion.div>
    </section>
  );
}
