"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import content from "@/content/home.json";

const { newsletter } = content;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section className="section-padding border-b border-black/10 bg-white shadow-[0_10px_12px_-10px_rgba(0,0,0,0.15)]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-[600px] px-6 text-center lg:px-10"
      >
        <h2 className="mb-4 font-heading text-2xl font-bold uppercase text-black sm:text-3xl">{newsletter.title}</h2>
        <p className="mb-8 text-body text-gray-500">{newsletter.description}</p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-3 rounded-full bg-[#38b6ff]/10 py-4"
          >
            <svg className="h-6 w-6 text-[#38b6ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-body text-sm font-medium text-[#38b6ff]">{newsletter.successMessage}</span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={newsletter.placeholder}
              required
              className="flex-1 rounded-full border-0 bg-gray-200 px-5 py-3 font-body text-sm text-navy placeholder-gray-500 outline-none transition-all duration-300 focus:ring-2 focus:ring-[#38b6ff]/50"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="rounded-full bg-[#38b6ff] px-8 py-3 font-body text-sm font-medium text-white transition-colors hover:brightness-95"
            >
              {newsletter.buttonText}
            </motion.button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
