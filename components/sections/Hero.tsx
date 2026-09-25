"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import content from "@/content/home.json";
import AccountMenu from "@/components/store/AccountMenu";

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
  const { hero } = content;

  return (
    <section className="relative w-full border-b border-black/10 shadow-[0_10px_12px_-10px_rgba(0,0,0,0.15)]">
      <div className="relative flex h-[90svh] min-h-[560px] w-full items-center justify-center overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={hero.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={hero.logo}
          alt="Aquacubes"
          className="absolute left-2 top-0 h-36 w-auto brightness-0 invert sm:left-4 sm:h-44 lg:left-6 lg:top-2 lg:h-48"
        />

        <div className="absolute right-4 top-6 z-20 sm:right-6 flex items-center gap-2 lg:right-10 lg:top-8">
          <AccountMenu variant="dark" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center px-6 text-center"
        >
          <motion.p
            custom={0.05}
            variants={fadeUp}
            className="font-sans mt-10 text-xs sm:mt-15 sm:text-sm font-semibold uppercase tracking-wide text-amber-400 sm:text-base"
          >
            {hero.tagline}
          </motion.p>

          <motion.h1
            custom={0.1}
            variants={fadeUp}
            className="font-sans mt-3 max-w-4xl break-words uppercase text-3xl font-extrabold leading-tight tracking-tight text-white [text-shadow:0_2px_16px_rgb(0_0_0_/_45%)] sm:text-5xl lg:text-6xl"
          >
            {hero.title}
          </motion.h1>

          <motion.p
            custom={0.25}
            variants={fadeUp}
            className="font-sans mt-4 max-w-xl text-base text-white/90 [text-shadow:0_1px_8px_rgb(0_0_0_/_45%)] sm:text-xl"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div custom={0.45} variants={fadeUp} className="mt-10 flex flex-col items-center gap-3 sm:mt-15">
            <Link
              href="/shop"
              className="font-sans inline-block rounded-full bg-navy px-8 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-navy-light"
            >
              {hero.primaryButtonText}
            </Link>
            <span className="font-sans text-sm text-white/70">{hero.leasingText}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
