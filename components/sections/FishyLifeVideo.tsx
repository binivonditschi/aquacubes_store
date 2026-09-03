"use client";

import { motion } from "framer-motion";

export default function FishyLifeVideo() {
  return (
    <section className="border-b border-black/10 bg-white py-16 shadow-[0_10px_12px_-10px_rgba(0,0,0,0.15)] lg:py-20">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-h2 text-navy">The Fishy Life</h2>
          <p className="mx-auto mt-3 max-w-[500px] text-body text-gray-500">
            A closer look at what everyday life with an Aquacubes system looks like.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
        >
          <video
            className="h-full w-full object-cover"
            src="/fishy-life.mp4"
            controls
            playsInline
            preload="metadata"
          />
        </motion.div>
      </div>
    </section>
  );
}
