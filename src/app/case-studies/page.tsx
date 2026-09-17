import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NexusChatWidget from "@/components/NexusChatWidget";
import Reveal from "@/components/Reveal";
import CaseStudiesIndex from "@/components/CaseStudiesIndex";

export const metadata: Metadata = {
  title: "Case Studies — CrewLogic Labs",
  description:
    "Every automation and custom engineering project CrewLogic Labs has shipped, real and verifiable — smart contracts, AI pipelines, and production full-stack builds.",
};

export default function CaseStudiesIndexPage() {
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
            <Reveal className="mx-auto mb-10 max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Case Studies
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                Every Project We&apos;ve Shipped, in One Place
              </h1>
              <p className="mt-4 text-slate-400">
                Real automation and custom engineering delivery — filter by track to see the
                depth behind either side of the business.
              </p>
            </Reveal>

            <CaseStudiesIndex />
          </div>
        </section>
      </main>
      <Footer />
      <NexusChatWidget />
    </div>
  );
}
