"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(end: number, duration: number = 1.5, start: boolean = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, start]);

  return count;
}

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useCountUp(value, 1.5, isInView);
  const finished = count >= value;

  return (
    <div ref={ref} className="text-center">
      <motion.div
        animate={finished ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="font-display text-5xl font-bold text-navy lg:text-6xl"
      >
        {count}
        {suffix}
      </motion.div>
      <div className="mt-1 font-body text-sm font-medium uppercase tracking-[0.05em] text-navy/80">{label}</div>
    </div>
  );
}

const stats = [
  { value: 2, suffix: "", label: "Year Warranty" },
  { value: 30, suffix: "", label: "Day Guarantee" },
  { value: 40, suffix: "%", label: "Avg. Food Cost Savings" },
  { value: 0, suffix: "", label: "Pesticides or Antibiotics" },
];

export default function StatsBand() {
  return (
    <section className="bg-teal py-16 lg:py-20">
      <div className="mx-auto max-w-content px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-8 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
