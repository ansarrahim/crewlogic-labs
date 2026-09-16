import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NexusChatWidget from "@/components/NexusChatWidget";
import Reveal from "@/components/Reveal";
import { INDUSTRIES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Automation by Industry — CrewLogic Labs",
  description:
    "The same real n8n automations, pitched at the specific problems each industry actually has — salons, retail, agencies, real estate, hospitality, and SaaS.",
};

export default function IndustriesPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-950 font-sans">
      <Navbar />
      <main id="main-content" className="flex-1">
        <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,theme(colors.slate.800)_1px,transparent_0)] bg-[size:32px_32px] opacity-60"
          />
          <div className="mx-auto max-w-7xl">
            <Reveal className="mx-auto mb-14 max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                Industries We Serve
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                The Same Real Automations, Aimed at Your Actual Problem
              </h1>
              <p className="mt-4 text-slate-400">
                Every template is real and tested either way — this just picks the two
                that fit your business fastest.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRIES.map((industry, i) => (
                <Reveal key={industry.slug} delay={i * 0.06}>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition-[border-color,transform] active:scale-[0.99] hover:border-emerald-500/40 hover:-translate-y-0.5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                      <industry.icon className="h-5 w-5" />
                    </div>
                    <h2 className="mt-4 text-base font-semibold leading-snug text-slate-100">
                      {industry.name}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">
                      {industry.headline}
                    </p>
                    <span className="mt-5 flex items-center gap-1 border-t border-slate-800 pt-4 text-xs font-medium text-muted transition-colors group-hover:text-emerald-400">
                      See what fits
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <NexusChatWidget />
    </div>
  );
}
