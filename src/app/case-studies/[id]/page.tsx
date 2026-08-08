import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ExternalLink, Gauge, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NexusChatWidget from "@/components/NexusChatWidget";
import { CASE_STUDIES } from "@/lib/data";

export async function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ id: study.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const study = CASE_STUDIES.find((s) => s.id === id);
  if (!study) return { title: "Case Study Not Found" };
  return {
    title: study.title,
    description: study.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const study = CASE_STUDIES.find((s) => s.id === id);
  if (!study) notFound();

  return (
    <div className="flex flex-1 flex-col bg-slate-950 font-sans">
      <Navbar />
      <main id="main-content" className="flex-1">
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/#case-studies"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-emerald-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to case studies
            </Link>

            <span className="mt-8 block text-xs font-semibold uppercase tracking-widest text-cyan-400">
              {study.category}
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              {study.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-slate-400">{study.description}</p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-slate-700 bg-slate-900/60 px-2.5 py-1 text-xs text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
                <Gauge className="h-4 w-4" />
                {study.metric}
              </div>
              {study.liveUrl && (
                <a
                  href={study.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-200"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Live Demo
                </a>
              )}
            </div>

            <div className="mt-12 border-t border-slate-800 pt-10">
              <h2 className="text-lg font-semibold text-slate-100">The Problem</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{study.problem}</p>
            </div>

            <div className="mt-10">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-100">
                <Layers className="h-4 w-4 text-cyan-400" />
                Our Approach
              </h2>
              <ul className="mt-4 space-y-3">
                {study.approach.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-slate-400">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900 font-mono text-[11px] text-emerald-400">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-100">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                What This Achieves
              </h2>
              <ul className="mt-4 space-y-2">
                {study.outcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-slate-400">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center">
              <p className="text-sm text-slate-400">
                Have something similar in mind?
              </p>
              <Link
                href="/#contact"
                className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
              >
                Scope Your Project
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <NexusChatWidget />
    </div>
  );
}
