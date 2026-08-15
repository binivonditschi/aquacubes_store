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
  "Agreement to Terms",
  "Use of Services",
  "Purchases and Payments",
  "Shipping and Delivery",
  "Returns and Refunds",
  "Warranty",
  "Intellectual Property",
  "Limitation of Liability",
  "User Content",
  "Termination",
  "Governing Law",
  "Changes to Terms",
  "Contact",
];

/* ═══════════════════ TERMS PAGE ═══════════════════ */
export default function Terms() {
  return (
    <div>
      <HeaderSection />
      <TermsContent />
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
          Terms of Service
        </motion.h1>
        <motion.p
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-body text-gray-300"
        >
          Last updated: December 1, 2024
        </motion.p>
      </div>
    </section>
  );
}

/* ── Section 2 — Terms Content ── */
function TermsContent() {
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

          {/* 1. Agreement to Terms */}
          <TermsSection id="section-1" title="1. Agreement to Terms">
            <p>
              By accessing or using the Aquacubes website, mobile application, and products (collectively, the &ldquo;Services&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, you may not use our Services.
            </p>
          </TermsSection>

          {/* 2. Use of Services */}
          <TermsSection id="section-2" title="2. Use of Services">
            <ul className="list-disc space-y-2 pl-5">
              <li>You must be at least 18 years old to purchase our products</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You agree not to misuse our systems or attempt unauthorized access</li>
              <li>Aquaculture systems must be used in accordance with all local regulations</li>
            </ul>
          </TermsSection>

          {/* 3. Purchases and Payments */}
          <TermsSection id="section-3" title="3. Purchases and Payments">
            <ul className="list-disc space-y-2 pl-5">
              <li>All prices are in Euros (&euro;) and include VAT where applicable</li>
              <li>Payment is processed via Stripe, PayPal, or iDEAL</li>
              <li>Orders are confirmed via email upon successful payment</li>
              <li>We reserve the right to refuse or cancel orders at our discretion</li>
            </ul>
          </TermsSection>

          {/* 4. Shipping and Delivery */}
          <TermsSection id="section-4" title="4. Shipping and Delivery">
            <ul className="list-disc space-y-2 pl-5">
              <li>Delivery estimates are provided at checkout and are not guaranteed</li>
              <li>Risk of loss transfers upon delivery to the shipping address</li>
              <li>You must inspect products upon delivery and report damage within 48 hours</li>
            </ul>
          </TermsSection>

          {/* 5. Returns and Refunds */}
          <TermsSection id="section-5" title="5. Returns and Refunds">
            <ul className="list-disc space-y-2 pl-5">
              <li>30-day money-back guarantee on all systems</li>
              <li>Products must be returned in original condition with all components</li>
              <li>Refunds are processed within 5-7 business days of receiving the return</li>
              <li>Shipping costs for returns are covered by Aquacubes</li>
            </ul>
          </TermsSection>

          {/* 6. Warranty */}
          <TermsSection id="section-6" title="6. Warranty">
            <ul className="list-disc space-y-2 pl-5">
              <li>All systems include a 2-year limited warranty against manufacturing defects</li>
              <li>Warranty covers repair or replacement at our discretion</li>
              <li>Excludes damage from misuse, accidents, unauthorized modifications, or neglect</li>
              <li>Consumable parts (grow sponges, nutrients) are not covered</li>
            </ul>
          </TermsSection>

          {/* 7. Intellectual Property */}
          <TermsSection id="section-7" title="7. Intellectual Property">
            <ul className="list-disc space-y-2 pl-5">
              <li>All content, designs, and technology are the property of Aquacubes B.V.</li>
              <li>You may not copy, modify, or distribute our intellectual property</li>
              <li>The Aquacubes name, logo, and product designs are registered trademarks</li>
            </ul>
          </TermsSection>

          {/* 8. Limitation of Liability */}
          <TermsSection id="section-8" title="8. Limitation of Liability">
            <ul className="list-disc space-y-2 pl-5">
              <li>Aquacubes is not liable for indirect, incidental, or consequential damages</li>
              <li>Our total liability shall not exceed the amount paid for the product</li>
              <li>We are not responsible for outcomes related to home aquaculture (e.g., fish health)</li>
            </ul>
          </TermsSection>

          {/* 9. User Content */}
          <TermsSection id="section-9" title="9. User Content">
            <ul className="list-disc space-y-2 pl-5">
              <li>You retain ownership of content you submit (reviews, photos)</li>
              <li>You grant us a license to use submitted content for marketing</li>
              <li>We may remove content that violates our guidelines</li>
            </ul>
          </TermsSection>

          {/* 10. Termination */}
          <TermsSection id="section-10" title="10. Termination">
            <ul className="list-disc space-y-2 pl-5">
              <li>We may suspend or terminate your account for violations of these terms</li>
              <li>You may close your account at any time via your account settings</li>
            </ul>
          </TermsSection>

          {/* 11. Governing Law */}
          <TermsSection id="section-11" title="11. Governing Law">
            <ul className="list-disc space-y-2 pl-5">
              <li>These terms are governed by the laws of the Netherlands</li>
              <li>Disputes shall be resolved in the courts of Amsterdam</li>
            </ul>
          </TermsSection>

          {/* 12. Changes to Terms */}
          <TermsSection id="section-12" title="12. Changes to Terms">
            <ul className="list-disc space-y-2 pl-5">
              <li>We may update these terms at any time</li>
              <li>Continued use constitutes acceptance of updated terms</li>
              <li>Significant changes will be notified via email</li>
            </ul>
          </TermsSection>

          {/* 13. Contact */}
          <TermsSection id="section-13" title="13. Contact">
            <p>
              For questions about these terms, contact{" "}
              <a href="mailto:legal@aquacubes.com" className="text-teal hover:underline">legal@aquacubes.com</a>.
            </p>
          </TermsSection>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Terms Section sub-component ── */
function TermsSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-8 scroll-mt-8">
      <h2 className="mb-4 font-heading text-h2 text-navy">{title}</h2>
      <div className="space-y-3 text-body leading-[1.7] text-gray-500">
        {children}
      </div>
    </div>
  );
}
