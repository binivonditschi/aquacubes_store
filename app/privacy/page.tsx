"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

/* ─── TOC items ─── */
const tocItems = [
  "Introduction",
  "Information We Collect",
  "How We Use Your Information",
  "Sharing Your Information",
  "Data Security",
  "Your Rights",
  "Cookies",
  "Third-Party Services",
  "Children's Privacy",
  "Changes to This Policy",
  "Contact Us",
];

/* ═══════════════════ PRIVACY PAGE ═══════════════════ */
export default function Privacy() {
  return (
    <div>
      <HeaderSection />
      <PolicyContent />
    </div>
  );
}

/* ── Section 1 — Header ── */
function HeaderSection() {
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
          LEGAL
        </motion.p>
        <motion.h1
          custom={0.15}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-4 text-h1 text-white"
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-body text-gray-300"
        >
          Last updated: August 2026
        </motion.p>
      </div>
    </section>
  );
}

/* ── Section 2 — Policy Content ── */
function PolicyContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="section-padding bg-off-white">
      <div className="mx-auto max-w-text-content px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-card-lg bg-white p-8 shadow-card lg:p-12"
        >
          {/* Table of Contents */}
          <nav className="mb-10 rounded-card bg-gray-50 p-6">
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-navy">
              Table of Contents
            </h3>
            <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {tocItems.map((item, i) => (
                <li key={i}>
                  <a
                    href={`#section-${i + 1}`}
                    className="text-body-sm text-gray-500 transition-colors hover:text-teal"
                  >
                    {i + 1}. {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* 1. Introduction */}
          <PolicySection id="section-1" title="1. Introduction">
            <p>
              Aquacubes B.V. (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our products and services.
            </p>
          </PolicySection>

          {/* 2. Information We Collect */}
          <PolicySection id="section-2" title="2. Information We Collect">
            <ul className="list-disc space-y-2 pl-5">
              <li><strong className="text-navy">Personal Information:</strong> Name, email address, phone number, shipping address, billing information</li>
              <li><strong className="text-navy">Order Information:</strong> Order history and status, linked to your email address (no account or password required)</li>
              <li><strong className="text-navy">Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong className="text-navy">Usage Data:</strong> Pages visited, time spent, features used, app interaction data</li>
              <li><strong className="text-navy">Aquaculture Data:</strong> System performance data, sensor readings (anonymized and used for product improvement)</li>
            </ul>
          </PolicySection>

          {/* 3. How We Use Your Information */}
          <PolicySection id="section-3" title="3. How We Use Your Information">
            <ul className="list-disc space-y-2 pl-5">
              <li>Process orders and payments</li>
              <li>Provide customer support</li>
              <li>Improve our products and services</li>
              <li>Send transactional emails and marketing communications (with consent)</li>
              <li>Ensure system security and prevent fraud</li>
            </ul>
          </PolicySection>

          {/* 4. Sharing Your Information */}
          <PolicySection id="section-4" title="4. Sharing Your Information">
            <p>
              We do not sell your personal information. We may share data with:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Our payment processor (Mollie)</li>
              <li>Shipping providers</li>
              <li>Analytics providers (anonymized)</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </PolicySection>

          {/* 5. Data Security */}
          <PolicySection id="section-5" title="5. Data Security">
            <p>
              We use industry-standard encryption (SSL/TLS) and security measures. Your payment information is processed by PCI-compliant third parties and never stored on our servers.
            </p>
          </PolicySection>

          {/* 6. Your Rights */}
          <PolicySection id="section-6" title="6. Your Rights">
            <p>Under GDPR, you have the right to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
          </PolicySection>

          {/* 7. Cookies */}
          <PolicySection id="section-7" title="7. Cookies">
            <p>
              We use essential cookies for site functionality and analytics cookies to improve our service. You can manage cookie preferences in your browser settings.
            </p>
          </PolicySection>

          {/* 8. Third-Party Services */}
          <PolicySection id="section-8" title="8. Third-Party Services">
            <p>
              Our site uses a trusted third-party payment processor (Mollie) to handle transactions. This service has its own privacy policy.
            </p>
          </PolicySection>

          {/* 9. Children's Privacy */}
          <PolicySection id="section-9" title="9. Children's Privacy">
            <p>
              Our services are not directed at children under 16. We do not knowingly collect data from children.
            </p>
          </PolicySection>

          {/* 10. Changes to This Policy */}
          <PolicySection id="section-10" title="10. Changes to This Policy">
            <p>
              We may update this policy periodically. Changes will be posted on this page with an updated date.
            </p>
          </PolicySection>

          {/* 11. Contact Us */}
          <PolicySection id="section-11" title="11. Contact Us">
            <p>
              For privacy-related questions, contact us at{" "}
              <a href="mailto:privacy@aquacubes.com" className="text-teal hover:underline">privacy@aquacubes.com</a>{" "}
              or:
            </p>
            <p className="mt-2">
              Aquacubes B.V.<br />
              Hamburg, Germany
            </p>
          </PolicySection>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Policy Section sub-component ── */
function PolicySection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-8 scroll-mt-8">
      <h2 className="mb-4 font-heading text-h2 text-navy">{title}</h2>
      <div className="space-y-3 text-body leading-[1.7] text-gray-500">
        {children}
      </div>
    </div>
  );
}
