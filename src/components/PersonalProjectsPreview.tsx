"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, FolderGit2, GitFork, Star } from "lucide-react";
import type { GithubRepo } from "@/lib/github";
import { GITHUB_PROFILE_URL } from "@/lib/github";
import { CEO } from "@/lib/data";
import Reveal from "@/components/Reveal";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export default function PersonalProjectsPreview({ repos }: { repos: GithubRepo[] }) {
  if (repos.length === 0) return null;

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Personal Projects
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            The Real Work Behind {CEO.name}
          </h2>
          <p className="mt-4 text-slate-400">
            Pulled live from GitHub — the same engineering that builds CrewLogic
            Labs&apos; automations and custom systems, in the open.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {repos.slice(0, 3).map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-emerald-500/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    <FolderGit2 className="h-4 w-4" />
                  </div>
                  <h3 className="font-mono text-sm font-bold text-slate-100">{repo.name}</h3>
                </div>
                <ExternalLink className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-emerald-400" />
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-400">
                {repo.description ?? "No description provided."}
              </p>

              <div className="mt-5 flex items-center gap-4 border-t border-slate-800 pt-4 text-xs text-muted">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" />
                  {repo.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="h-3.5 w-3.5" />
                  {repo.forks_count}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
          >
            GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
