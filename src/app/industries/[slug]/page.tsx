import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NexusChatWidget from "@/components/NexusChatWidget";
import AutomationTemplates from "@/components/AutomationTemplates";
import Reveal from "@/components/Reveal";
import { INDUSTRIES } from "@/lib/data";

export async function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) return { title: "Industry Not Found" };
  return {
    title: `Automation ${industry.eyebrow} — CrewLogic Labs`,
    description: industry.headline,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) notFound();

  return (
    <div className="flex flex-1 flex-col bg-slate-950 font-sans">
      <Navbar />
      <main id="main-content" className="flex-1">
        <section className="px-4 pb-4 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/industries"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-emerald-400"
            >
              <ArrowLeft className="h-4 w-4" />
              All industries
            </Link>

            <Reveal className="mt-8 text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                {industry.eyebrow}
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                {industry.headline}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">{industry.intro}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 space-y-3">
              {industry.painPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm leading-relaxed text-slate-400"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  {point}
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section id="templates" className="bg-slate-900/20 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
                Built for This Specifically
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                Tested live against real APIs before they were listed — not diagrams.
              </p>
            </Reveal>
            <AutomationTemplates templateIds={industry.templateIds} />
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center">
            <p className="text-sm text-slate-400">
              Not exactly your situation? Every automation is built to be adapted.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
              >
                Get a Free Audit
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/automations"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
              >
                See All Automations
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
