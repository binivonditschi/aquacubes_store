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
    <section className="relative w-full border-b border-black/10 pt-20 shadow-[0_10px_12px_-10px_rgba(0,0,0,0.15)] lg:pt-24">
      <div className="relative flex h-[50vh] min-h-[420px] w-full items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/intro.mp4"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/50" />

        <motion.div
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center px-6 text-center"
        >
          <motion.h1
            custom={0.1}
            variants={fadeUp}
            className="font-tesla text-4xl font-semibold tracking-tight text-white [text-shadow:0_2px_16px_rgb(0_0_0_/_45%)] sm:text-5xl lg:text-6xl"
          >
            Aquacubes
          </motion.h1>

          <motion.p
            custom={0.25}
            variants={fadeUp}
            className="font-tesla mt-3 text-base text-white/90 [text-shadow:0_1px_8px_rgb(0_0_0_/_45%)] sm:text-lg"
          >
            Smart Aquaculture, at Home
          </motion.p>

          <motion.div custom={0.4} variants={fadeUp} className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shop"
              className="font-tesla inline-block rounded-full bg-navy px-7 py-2.5 text-sm font-medium text-white shadow-lg transition-colors hover:bg-navy-light"
            >
              Order Now
            </Link>
            <a
              href="#how-it-works"
              className="font-tesla inline-block rounded-full bg-white/95 px-7 py-2.5 text-sm font-medium text-navy shadow-lg backdrop-blur transition-colors hover:bg-white"
            >
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
