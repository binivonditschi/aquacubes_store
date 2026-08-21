"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
};

export default function Hero() {
  return (
    <section className="bg-off-white px-6 pb-16 pt-36 lg:min-h-[100dvh] lg:px-10 lg:pt-40">
      <div className="mx-auto flex w-full flex-col items-center gap-12 lg:w-[80%] lg:flex-row lg:justify-between lg:gap-16">
        {/* Left — copy */}
        <div className="flex w-full flex-col justify-center lg:w-[480px] lg:shrink-0">
          <div className="mx-auto w-full max-w-[480px] lg:mx-0">
            <motion.p
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-5 font-mono text-xs uppercase tracking-[0.1em] text-teal"
            >
              Smart Aquaculture, at Home
            </motion.p>

            <motion.h1
              custom={0.25}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-8 font-serif text-[3rem] leading-[1.05] tracking-tight text-navy sm:text-[4rem] lg:text-[5.5rem]"
            >
              Fish Farming,
              <br />
              Made Easy
            </motion.h1>

            <motion.p
              custom={0.4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-10 max-w-[420px] text-lg text-gray-500"
            >
              Making it safe and easy for people and businesses to get fresh organic fish — without any antibiotics or mercury.
            </motion.p>

            <motion.div
              custom={0.55}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/shop"
                className="inline-block rounded-button bg-teal px-6 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-teal-dark"
              >
                Shop Now
              </Link>
              <a
                href="#how-it-works"
                className="inline-block rounded-button border-2 border-navy px-6 py-3 font-body text-sm font-medium text-navy transition-all hover:bg-navy hover:text-white"
              >
                See How It Works
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right — video */}
        <div className="flex w-full flex-col items-center gap-4 lg:w-[480px] lg:shrink-0">
          <div className="relative aspect-[3/4] w-full max-w-[480px] overflow-hidden rounded-card-lg">
            <video
              className="absolute inset-0 h-full w-full object-cover object-bottom"
              src="/hero-video.mp4"
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              controlsList="nodownload noplaybackrate nofullscreen"
            />
          </div>
          <div className="w-full max-w-[480px] text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-navy/60">
              Designed in Germany
            </p>
            <div className="ml-auto mt-2 h-px w-16 bg-navy/25" />
          </div>
        </div>
      </div>
    </section>
  );
}
