"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { SITE, STACK_NEEDED_OPTIONS } from "@/lib/data";
import Reveal from "@/components/Reveal";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      stack: String(formData.get("stack") ?? ""),
      details: String(formData.get("details") ?? ""),
    };

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error ?? "Something went wrong — please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Couldn't send your message — check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Get In Touch
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Scope Your Project
          </h2>
          <p className="mt-4 text-slate-400">
            Tell us what you&apos;re building — a human architect reviews every
            submission before any agent is deployed.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <Reveal className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 lg:col-span-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, ease: EASE_OUT, delay: 0.1 }}
                  className="flex h-full flex-col items-center justify-center py-12 text-center"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.15 }}
                  >
                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  </motion.div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-100">
                    Proposal received
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-slate-400">
                    Thanks for reaching out. {SITE.name} will respond directly
                    to your email with next steps.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-emerald-500/60"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-emerald-500/60"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="stack"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                    >
                      Stack Needed
                    </label>
                    <select
                      id="stack"
                      name="stack"
                      required
                      defaultValue=""
                      className="w-full rounded-lg border border-slate-700 bg-slate-950/60 px-3.5 py-2.5 text-sm text-slate-100 outline-none focus:border-emerald-500/60"
                    >
                      <option value="" disabled>
                        Select a domain
                      </option>
                      {STACK_NEEDED_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="details"
                      className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      required
                      rows={5}
                      placeholder="Tell us about your project, timeline, and goals..."
                      className="w-full resize-none rounded-lg border border-slate-700 bg-slate-950/60 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-emerald-500/60"
                    />
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300"
                      >
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-[background-color,transform] active:scale-[0.97] hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    {isSubmitting ? "Sending..." : "Submit Proposal"}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-4 lg:col-span-2">
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-[border-color,transform] active:scale-[0.98] hover:border-emerald-500/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Email
                </p>
                <p className="text-sm font-medium text-slate-100">
                  {SITE.email}
                </p>
              </div>
            </a>

            <a
              href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-[border-color,transform] active:scale-[0.98] hover:border-cyan-500/40"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Phone
                </p>
                <p className="text-sm font-medium text-slate-100">
                  {SITE.phone}
                </p>
              </div>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/60 text-slate-300">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                  Location
                </p>
                <p className="text-sm font-medium text-slate-100">
                  {SITE.location}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
