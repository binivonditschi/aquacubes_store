"use client";

import { Fragment } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import content from "@/content/home.json";
import { planButtonStyle } from "@/lib/plans";

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const staggerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const MotionLink = motion.create(Link);

const { productShowcase } = content;
const plans = productShowcase.plans.map((plan) => ({
  ...plan,
  buttonHref: `/shop/${plan.id}`,
  buttonStyle: planButtonStyle[plan.id].outline,
}));

export default function ProductShowcase() {
  return (
    <section className="section-padding border-b border-black/10 shadow-[0_10px_12px_-10px_rgba(0,0,0,0.15)]" style={{ backgroundColor: "#f6f6f6" }}>
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-h1 uppercase text-navy">{productShowcase.title}</h2>
          <p className="mx-auto max-w-[500px] text-body text-gray-500">
            {productShowcase.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {plans.map((plan) => (
            <MotionLink
              key={plan.id}
              href={plan.buttonHref}
              variants={staggerChild}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            >
              {plan.badge && (
                <span className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-coral px-4 py-1 font-body text-xs font-semibold text-navy">
                  {plan.badge}
                </span>
              )}
              <h3 className="mb-2 font-heading text-xl font-bold uppercase text-navy underline decoration-2 underline-offset-4">
                {plan.name}
              </h3>
              <p className="mb-3 text-sm text-navy/80">{plan.tagline}</p>
              <p className="mb-4 text-xs text-gray-400">Best for: {plan.bestFor}</p>

              <p className="mb-1 font-heading text-3xl font-bold text-navy">
                {plan.price}
                {plan.priceSuffix && <span className="text-lg font-medium text-gray-400">{plan.priceSuffix}</span>}
              </p>
              <p className="mb-4 text-xs text-gray-400">{plan.terms}</p>

              <div className="mb-4 border-t border-black/10 pt-4">
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>

              <span
                className={`mt-auto block w-full rounded-button py-3 text-center font-body text-sm font-medium uppercase transition-colors ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </span>
            </MotionLink>
          ))}
        </motion.div>

        <p className="mt-20 text-left text-sm font-medium text-black">
          {productShowcase.earlyBirdNote}
        </p>

        <div className="grid grid-cols-1 gap-6 text-left sm:grid-cols-2">
          <div>
            <p className="mb-1 text-sm font-bold text-black">{productShowcase.contactTeam.label}</p>
            <p className="text-sm text-black">{productShowcase.contactTeam.value}</p>
          </div>
          <div>
            <p className="mb-1 text-sm font-bold text-black">{productShowcase.contactSales.label}</p>
            <p className="text-sm text-black">{productShowcase.contactSales.value}</p>
          </div>
        </div>

        <div className="mt-6 text-left text-xs text-black">
          <p className="mb-1 font-bold">{productShowcase.orderingNotes.title}</p>
          {productShowcase.orderingNotes.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="my-12 bg-white py-10">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          <hr className="mx-auto my-15 w-64 border-t border-[#89e6aa]" />

          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-sm text-gray-500">{productShowcase.delivery.label}</p>
              <p className="mb-2 text-lg font-bold text-black">{productShowcase.delivery.regions}</p>
              <p className="max-w-xl text-sm text-gray-500">
                {productShowcase.delivery.description}
              </p>
            </div>
            <Link
              href="/contact"
              className="whitespace-nowrap rounded-full border-2 border-[#89e6aa] px-6 py-3 text-center font-body text-sm font-medium text-black transition-colors hover:bg-[#89e6aa]"
            >
              {productShowcase.delivery.buttonText}
            </Link>
          </div>

          <hr className="mx-auto my-15 w-64 border-t border-[#89e6aa]" />
        </div>
      </div>

      <div className="bg-white py-10">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase leading-none tracking-wide text-teal">
                {productShowcase.technology.eyebrow}
              </p>
              <h3 className="mb-2 text-h1 font-extrabold uppercase text-navy">{productShowcase.technology.title}</h3>
              <div className="mb-8 h-0.5 w-10 bg-navy" />

              <div className="relative overflow-visible">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={productShowcase.technology.image} alt="Aquacubes system" className="w-full" />
              </div>
            </div>

            <div>
              <p className="mt-28 text-body text-gray-500">{productShowcase.technology.description}</p>
              <div className="divide-y-2 divide-white overflow-hidden rounded-xl">
                {productShowcase.technology.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between gap-6 px-4 py-3 text-sm"
                    style={{ backgroundColor: "#f2f2f2" }}
                  >
                    <span className="text-navy/70">{spec.label}</span>
                    <span className="text-right text-navy">{spec.value}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://calculat.ok.kimi.link"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full rounded-button border-2 border-teal py-3 text-center font-body text-sm font-medium uppercase text-teal transition-colors hover:bg-teal hover:text-white"
              >
                Calculate How Many Cubes You Need
              </a>
            </div>
          </div>

          <hr className="mx-auto mt-16 w-64 border-t border-[#89e6aa] lg:mt-20" />
        </div>
      </div>

      <div className="mt-8 w-full bg-white py-6">
        <div className="flex flex-wrap items-center px-6 text-xs font-semibold uppercase tracking-wide text-navy/70 sm:text-sm lg:px-10">
          {productShowcase.valueProps.map((prop, i) => (
            <Fragment key={prop}>
              {i > 0 && <span>&bull;</span>}
              <span className={i === 0 ? "px-0 ml-0 sm:px-4 sm:ml-16" : "px-0 sm:px-6"}>
                {prop}
              </span>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="bg-off-white py-10">
        <div className="mx-auto max-w-content px-6 lg:px-10">
          <div className="mt-10 rounded-2xl bg-off-white p-8 lg:p-12">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-teal">
                  {productShowcase.exploreFeatures.eyebrow}
                </p>
                <h3 className="mb-4 text-h2 font-extrabold text-navy">{productShowcase.exploreFeatures.title}</h3>
                <div className="mb-4 h-0.5 w-10 bg-navy" />

                <p className="mb-4 text-body text-gray-600">{productShowcase.exploreFeatures.description}</p>
                <ul className="mb-4 list-disc space-y-1 pl-5 text-sm text-gray-600">
                  {productShowcase.exploreFeatures.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <p className="text-body text-gray-600">{productShowcase.exploreFeatures.closing}</p>
              </div>

              <div className="mx-auto aspect-[9/16] w-full max-w-xs overflow-hidden rounded-2xl bg-off-white">
                <video
                  className="h-full w-full object-cover"
                  src={productShowcase.exploreFeatures.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
