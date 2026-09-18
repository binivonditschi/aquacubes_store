"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Facebook, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import content from "@/content/footer.json";

const iconMap: Record<string, LucideIcon> = {
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
};

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
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/40 hover:text-[#38b6ff]"
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
      style={{ backgroundColor: "#061326" }}
    >
      <div className="mx-auto max-w-content px-6 py-16 lg:px-10 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <Link href="/" className="inline-flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={content.logo} alt="Aquacubes" className="h-40 w-auto brightness-0 invert" />
          </Link>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-3"
        >
          {content.columns.map((column) => (
            <motion.div key={column.title} variants={itemVariants}>
              <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.05em] text-white">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="inline-block text-sm text-white/70 transition-all duration-200 hover:translate-x-1 hover:text-[#38b6ff]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div variants={itemVariants}>
            <h3 className="mb-4 font-heading text-sm font-bold uppercase tracking-[0.05em] text-white">
              {content.contact.title}
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                Email:{" "}
                <a href={`mailto:${content.contact.email}`} className="transition-colors hover:text-[#38b6ff]">
                  {content.contact.email}
                </a>
              </li>
              <li>{content.contact.businessNameLabel}</li>
              <li>{content.contact.businessName}</li>
              <li>{content.contact.address}</li>
              <li>
                Phone:{" "}
                <a href={`tel:${content.contact.phone}`} className="transition-colors hover:text-[#38b6ff]">
                  {content.contact.phone}
                </a>
              </li>
              <li>{content.contact.whatsapp}</li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:justify-end">
          <div className="flex items-center gap-3">
            {content.social.map((social) => {
              const Icon = iconMap[social.id];
              return (
                <SocialIcon key={social.id} href={social.href}>
                  <Icon className="h-4 w-4" />
                </SocialIcon>
              );
            })}
          </div>
        </div>

        <p className="mt-4 text-right text-sm text-white/50">
          {new Date().getFullYear()} {content.copyrightSuffix}
        </p>
      </div>
    </motion.footer>
  );
}
