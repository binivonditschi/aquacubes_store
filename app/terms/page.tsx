"use client";

import { useRef, Fragment } from "react";
import { motion, useInView } from "framer-motion";
import content from "@/content/terms.json";

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const tocItems = content.sections.map((s) => s.title.replace(/^\d+\.\s*/, ""));

function renderParagraph(text: string, email: string) {
  const withEmail = text.split("{{email}}");
  return withEmail.map((chunk, i) => (
    <Fragment key={i}>
      {chunk}
      {i < withEmail.length - 1 && (
        <a href={`mailto:${email}`} className="text-teal hover:underline">
          {email}
        </a>
      )}
    </Fragment>
  ));
}

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
          {content.hero.eyebrow.toUpperCase()}
        </motion.p>
        <motion.h1
          custom={0.15}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-4 text-h1 text-white"
        >
          {content.hero.title}
        </motion.h1>
        <motion.p
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-body text-gray-300"
        >
          {content.hero.lastUpdated}
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

          {content.sections.map((section, i) => (
            <TermsSection key={section.title} id={`section-${i + 1}`} title={section.title}>
              {section.paragraphs?.map((p, j) => <p key={j}>{renderParagraph(p, content.contactEmail)}</p>)}
              {section.list && (
                <ul className="list-disc space-y-2 pl-5">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </TermsSection>
          ))}
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
