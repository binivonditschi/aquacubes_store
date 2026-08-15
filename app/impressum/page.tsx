"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const tocItems = [
  "Provider Information",
  "Contact",
  "Commercial Register Entry",
  "VAT Identification Number",
  "Disclaimer — Liability for Content",
  "Disclaimer — Liability for Links",
  "Copyright",
];

export default function Impressum() {
  return (
    <div>
      <HeaderSection />
      <ImpressumContent />
    </div>
  );
}

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
          Legal Notice (Impressum)
        </motion.h1>
        <motion.p
          custom={0.3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-body text-gray-300"
        >
          Information pursuant to &sect; 5 TMG (German Telemedia Act)
        </motion.p>
      </div>
    </section>
  );
}

function ImpressumContent() {
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
          <nav className="mb-10 rounded-card bg-gray-50 p-6">
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-navy">
              Table of Contents
            </h3>
            <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {tocItems.map((item, i) => (
                <li key={i}>
                  <a href={`#section-${i + 1}`} className="text-body-sm text-gray-500 transition-colors hover:text-teal">
                    {i + 1}. {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ImpressumSection id="section-1" title="1. Provider Information">
            <p>Information pursuant to &sect; 5 TMG (German Telemedia Act):</p>
            <p className="mt-2">
              Aquacubes &mdash; a brand of Moina GmbH<br />
              Markt 5<br />
              25746 Heide<br />
              Germany
            </p>
            <p className="mt-2">Represented by: Biniam Samuel</p>
          </ImpressumSection>

          <ImpressumSection id="section-2" title="2. Contact">
            <p>
              Phone: <a href="tel:+4948347320613" className="text-teal hover:underline">+49 48 347320 613</a><br />
              Mobile: <a href="tel:+4915781371194" className="text-teal hover:underline">+49 157 8137 1194</a><br />
              Email: <a href="mailto:info@aquacubes.eu" className="text-teal hover:underline">info@aquacubes.eu</a>
            </p>
          </ImpressumSection>

          <ImpressumSection id="section-3" title="3. Commercial Register Entry">
            <p>
              Entered in the Commercial Register.<br />
              Register court: Amtsgericht Pinneberg<br />
              Register number: HRB 144462 PI
            </p>
          </ImpressumSection>

          <ImpressumSection id="section-4" title="4. VAT Identification Number">
            <p>
              VAT identification number pursuant to &sect; 27a of the German VAT Act (UStG): to be added.
            </p>
          </ImpressumSection>

          <ImpressumSection id="section-5" title="5. Disclaimer — Liability for Content">
            <p>
              The contents of our pages were created with the greatest possible care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content on these pages in accordance with general laws pursuant to &sect; 7 (1) TMG. However, pursuant to &sect;&sect; 8 to 10 TMG, we as a service provider are not obligated to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general law remain unaffected. However, liability in this regard is only possible from the point in time at which a specific infringement becomes known. Upon becoming aware of any such infringements, we will remove this content immediately.
            </p>
          </ImpressumSection>

          <ImpressumSection id="section-6" title="6. Disclaimer — Liability for Links">
            <p>
              Our website contains links to external third-party websites over whose content we have no influence. Therefore, we cannot accept any liability for this external content. The respective provider or operator of the linked pages is always responsible for their content. The linked pages were checked for possible legal violations at the time of linking. No illegal content was identifiable at the time of linking. However, permanent monitoring of the content of linked pages is unreasonable without concrete evidence of a legal violation. Upon becoming aware of any legal violations, we will remove such links immediately.
            </p>
          </ImpressumSection>

          <ImpressumSection id="section-7" title="7. Copyright">
            <p>
              The content and works created by the site operators on these pages are subject to German copyright law. Duplication, processing, distribution, and any form of exploitation outside the limits of copyright law require the written consent of the respective author or creator. Downloads and copies of this site are permitted for private, non-commercial use only. Insofar as the content on this site was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, please notify us accordingly. Upon becoming aware of any legal violations, we will remove such content immediately.
            </p>
            <p className="mt-4 text-body-sm text-gray-300">Source: Disclaimer by eRecht24</p>
          </ImpressumSection>
        </motion.div>
      </div>
    </section>
  );
}

function ImpressumSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-8 scroll-mt-8">
      <h2 className="mb-4 font-heading text-h2 text-navy">{title}</h2>
      <div className="space-y-3 text-body leading-[1.7] text-gray-500">{children}</div>
    </div>
  );
}
