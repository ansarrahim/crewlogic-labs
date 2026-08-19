"use client";

import { motion } from "framer-motion";
import { ExternalLink, FolderGit2, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { CEO } from "@/lib/data";
import { GITHUB_PROFILE_URL } from "@/lib/github";
import Reveal from "@/components/Reveal";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function LeadershipSection() {
  return (
    <section id="leadership" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Human Leadership
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            The Architect Behind the Crew
          </h2>
          <p className="mt-4 text-slate-400">
            Every autonomous engineering decision is grounded in verified,
            human-led technical judgment.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <Reveal className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 lg:col-span-2">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-lg font-bold text-emerald-400">
                MA
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-100">
                  {CEO.name}
                </h3>
                <p className="text-sm text-cyan-400">{CEO.title}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <a
                href={CEO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-cyan-400"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                LinkedIn
              </a>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-cyan-400"
              >
                <FolderGit2 className="h-3.5 w-3.5" />
                GitHub
              </a>
            </div>

            <div className="mt-6 flex items-start gap-3 text-sm text-slate-400">
              <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <span>{CEO.education}</span>
            </div>

            <div className="mt-6">
              <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted">
                <ShieldCheck className="h-3.5 w-3.5" />
                Certifications
              </p>
              <ul className="divide-y divide-slate-800 border-t border-slate-800">
                {CEO.certifications.map((cert) => (
                  <li key={cert} className="py-2.5 text-sm text-slate-300">
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted">
                Core Specialties
              </p>
              <ul className="divide-y divide-slate-800 border-t border-slate-800">
                {CEO.specialties.map((spec) => (
                  <li key={spec} className="py-2.5 text-sm text-slate-300">
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="flex flex-col justify-center rounded-2xl border border-slate-800 bg-slate-900/50 p-8 lg:col-span-3"
          >
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-slate-100">
                The 70/30 Engineering Rule
              </h3>
            </div>
            <p className="mb-8 text-sm leading-relaxed text-slate-400">
              I run a hybrid delivery model — AI tooling accelerates
              implementation at machine speed, while I direct the
              architecture, review every change, and decide what ships.
            </p>

            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200">
                    Automated Code &amp; Test Execution
                  </span>
                  <span className="font-mono font-semibold text-emerald-400">
                    70%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "70%" }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.15 }}
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_12px_rgba(184,147,90,0.6)]"
                  />
                </div>
                <p className="mt-1.5 text-xs text-muted">
                  AI-accelerated implementation, directed and reviewed by me line-by-line
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200">
                    Strategic Architecture, Security &amp; QA
                  </span>
                  <span className="font-mono font-semibold text-cyan-400">
                    30%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "30%" }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.25 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 shadow-[0_0_12px_rgba(184,147,90,0.6)]"
                  />
                </div>
                <p className="mt-1.5 text-xs text-muted">
                  Owned directly by {CEO.name}, human-in-the-loop
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
