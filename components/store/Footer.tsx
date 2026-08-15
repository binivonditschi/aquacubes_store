"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const footerColumns = [
  {
    title: "Shop",
    links: [{ label: "All Products", href: "/shop" }],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "How It Works", href: "/how-it-works" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Legal Notice", href: "/impressum" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function SocialIcon({ href, children }: { href: string; children: ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="text-gray-300 transition-colors duration-200 hover:text-teal"
    >
      {children}
    </motion.a>
  );
}

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="bg-navy"
    >
      <div className="mx-auto max-w-content px-6 py-16 lg:px-10 lg:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6"
        >
          <motion.div variants={itemVariants} className="col-span-2 lg:col-span-2">
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="32" height="32" rx="6" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
                <path d="M12 28c0-8 6-14 8-16 2 2 8 8 8 16" stroke="#00D4AA" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <circle cx="20" cy="14" r="2" fill="#00D4AA" />
              </svg>
              <span className="font-heading text-xl font-bold text-white">Aquacubes</span>
            </Link>
            <p className="mb-6 max-w-[240px] text-sm text-gray-300">Smart aquaculture for everyone</p>
            <div className="flex gap-4">
              <SocialIcon href="https://instagram.com">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://twitter.com">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
              <SocialIcon href="https://linkedin.com">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SocialIcon>
            </div>
          </motion.div>

          {footerColumns.map((column) => (
            <motion.div key={column.title} variants={itemVariants}>
              <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.05em] text-white">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-sm text-gray-300 transition-all duration-200 hover:translate-x-1 hover:text-teal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div variants={itemVariants}>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-[0.05em] text-white">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="mailto:info@aquacubes.eu" className="transition-colors hover:text-teal">
                  info@aquacubes.eu
                </a>
              </li>
              <li>
                <a href="tel:+4948347320613" className="transition-colors hover:text-teal">
                  +49 48 347320 613
                </a>
              </li>
              <li className="text-gray-300">Heide, DE</li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-lighter pt-8 lg:flex-row">
          <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} Aquacubes. All rights reserved.</p>
          <div className="flex items-center gap-3 text-gray-300">
            <svg className="h-6 w-10" viewBox="0 0 40 26" fill="none">
              <rect width="40" height="26" rx="4" fill="#F7F9FC" />
              <circle cx="15" cy="13" r="6" fill="#EB001B" opacity="0.8" />
              <circle cx="25" cy="13" r="6" fill="#F79E1B" opacity="0.8" />
            </svg>
            <svg className="h-6 w-10" viewBox="0 0 40 26" fill="none">
              <rect width="40" height="26" rx="4" fill="#F7F9FC" />
              <text x="8" y="17" fill="#003087" fontSize="10" fontWeight="bold">Pay</text>
              <text x="22" y="17" fill="#0070E0" fontSize="10" fontWeight="bold">Pal</text>
            </svg>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
