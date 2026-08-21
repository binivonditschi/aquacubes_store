"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ─── Bubble component for floating animation ─── */
function Bubble({ size, left, duration, delay }: { size: number; left: string; duration: number; delay: number }) {
  return (
    <div
      className="absolute bottom-0 rounded-full bg-teal/20"
      style={{
        width: size,
        height: size,
        left,
        animation: `floatBubble ${duration}s linear ${delay}s infinite`,
      }}
    />
  );
}

/* ═══════════════════ 404 PAGE ═══════════════════ */
export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Inject bubble animation keyframes
    const style = document.createElement("style");
    style.textContent = `
      @keyframes floatBubble {
        0% { transform: translateY(0); opacity: 0; }
        10% { opacity: 0.2; }
        90% { opacity: 0.2; }
        100% { transform: translateY(-100vh); opacity: 0; }
      }
      @keyframes fishFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-navy px-6">
      {/* Floating Bubbles */}
      {mounted && (
        <>
          <Bubble size={12} left="10%" duration={8} delay={0} />
          <Bubble size={16} left="25%" duration={10} delay={2} />
          <Bubble size={10} left="45%" duration={7} delay={4} />
          <Bubble size={14} left="65%" duration={9} delay={1} />
          <Bubble size={8} left="80%" duration={6} delay={3} />
          <Bubble size={12} left="90%" duration={8} delay={5} />
        </>
      )}

      <div className="relative z-10 text-center">
        {/* 404 Code */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative mx-auto mb-6"
        >
          <span
            className="font-heading font-bold text-teal/30"
            style={{ fontSize: "clamp(6rem, 12vw, 10rem)", lineHeight: 1 }}
          >
            404
          </span>

          {/* Fish SVG Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ animation: "fishFloat 3s ease-in-out infinite" }}
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Tank outline */}
              <rect x="20" y="20" width="80" height="80" rx="8" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.3" />
              <line x1="20" y1="30" x2="100" y2="30" stroke="#FFFFFF" strokeWidth="2" opacity="0.3" />
              {/* Water line */}
              <path d="M22 50 Q40 45 60 50 Q80 55 98 50" stroke="#00D4AA" strokeWidth="1.5" fill="none" opacity="0.5" />
              {/* Fish body */}
              <ellipse cx="58" cy="62" rx="16" ry="10" fill="#00D4AA" opacity="0.9" />
              {/* Fish tail */}
              <path d="M42 62 L34 54 L34 70 Z" fill="#00D4AA" opacity="0.9" />
              {/* Fish eye */}
              <circle cx="66" cy="60" r="2.5" fill="#0A2540" />
              <circle cx="67" cy="59" r="0.8" fill="#FFFFFF" />
              {/* Confused bubbles */}
              <circle cx="72" cy="52" r="2" fill="#FFFFFF" opacity="0.4" />
              <circle cx="76" cy="48" r="1.5" fill="#FFFFFF" opacity="0.3" />
              {/* Plant */}
              <path d="M82 82 Q78 70 82 60 Q86 70 82 82" stroke="#00D4AA" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M85 82 Q90 72 86 64 Q82 72 85 82" stroke="#00D4AA" strokeWidth="1.5" fill="none" opacity="0.6" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-4 text-h1 text-white"
        >
          Page Not Found
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mx-auto mb-8 max-w-[420px] text-body text-gray-300"
        >
          Looks like this page swam away. The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex items-center rounded-button bg-teal px-8 py-3 font-body text-sm font-medium text-white transition-all hover:bg-teal-dark hover:scale-[1.02] active:scale-[0.98]"
          >
            Go Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center rounded-button border-2 border-white px-8 py-3 font-body text-sm font-medium text-white transition-all hover:bg-white hover:text-navy"
          >
            Shop Aquacubes
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="text-center"
        >
          <p className="mb-3 text-body-sm text-gray-300">Or try these:</p>
          <div className="flex flex-wrap items-center justify-center gap-1 text-sm">
            <Link href="/shop" className="text-teal transition-colors hover:underline">Shop</Link>
            <span className="text-gray-500">&middot;</span>
            <Link href="/faq" className="text-teal transition-colors hover:underline">FAQ</Link>
            <span className="text-gray-500">&middot;</span>
            <Link href="/contact" className="text-teal transition-colors hover:underline">Contact</Link>
            <span className="text-gray-500">&middot;</span>
            <Link href="/how-it-works" className="text-teal transition-colors hover:underline">Support</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
