"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import Icon from "@/components/b2b/Icon";
import { useT } from "@/lib/i18n";
import dict from "@/content/i18n/landing.json";

export default function Newsletter() {
  const t = useT(dict);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user?.email) setEmail(data.session.user.email);
      const fullName = data.session?.user?.user_metadata?.full_name as string | undefined;
      if (fullName) setName(fullName);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(t("nl_err"));
      }
    } catch {
      setError(t("nl_err"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-surface px-margin py-space-2xl md:px-margin-tablet lg:px-margin-desktop">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-4xl flex-col items-center gap-space-lg rounded-2xl bg-surface-canvas p-space-lg shadow-sm md:flex-row md:p-space-xl"
      >
        <div className="flex-1 text-center md:text-left">
          <div className="mb-space-xs text-label-technical font-semibold uppercase text-primary">{t("nl_eyebrow")}</div>
          <h2 className="mb-space-xs text-headline-lg text-surface-navy">{t("nl_title")}</h2>
          <p className="text-body-md text-steel">{t("nl_desc")}</p>
        </div>

        <div className="w-full md:w-auto md:min-w-[360px]">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center gap-2 rounded bg-compliance-green-bg px-space-md py-3.5 text-body-md font-semibold text-compliance-green"
            >
              <Icon name="check_circle" size={20} />
              {t("nl_ok")}
            </motion.div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("nl_placeholder")}
                  required
                  className="flex-1 rounded bg-surface-subtle px-space-md py-3 text-body-md text-surface-navy shadow-sm outline-none placeholder:text-steel focus:ring-2 focus:ring-primary/40"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded bg-primary-container px-space-lg py-3 text-body-md font-bold text-on-primary shadow-md transition-colors hover:bg-primary disabled:opacity-60"
                >
                  {loading ? t("nl_busy") : t("nl_btn")}
                </button>
              </form>
              {error && <p className="mt-2 text-body-sm text-error">{error}</p>}
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
