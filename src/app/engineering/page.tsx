import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NexusChatWidget from "@/components/NexusChatWidget";
import AgentToolsHost from "@/components/tools/AgentToolsHost";
import AgentGrid from "@/components/AgentGrid";
import CaseStudies from "@/components/CaseStudies";
import BuildCadence from "@/components/BuildCadence";
import EngineeringServices from "@/components/EngineeringServices";

export const metadata: Metadata = {
  title: "Custom Engineering — CrewLogic Labs",
  description:
    "Smart contract development, security audits, and custom full-stack builds — the engineering team and real case studies behind CrewLogic Labs' Custom Engineering service line.",
};

export default function EngineeringPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-950 font-sans">
      <Navbar />
      <main id="main-content" className="flex-1">
        <section className="px-4 pb-4 pt-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
              Custom Engineering
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              Blockchain, Security, and Full-Stack Builds — Not Templates
            </h1>
            <p className="mt-4 text-slate-400">
              CrewLogic Labs&apos; second service line: custom smart contracts, security
              audits, and production full-stack systems, scoped and quoted directly. The
              team and the real, shipped proof behind it are below.
            </p>
          </div>
        </section>
        <AgentGrid />
        <CaseStudies track="engineering" />
        <BuildCadence />
        <EngineeringServices />
      </main>
      <Footer />
      <NexusChatWidget />
      <AgentToolsHost />
    </div>
  );
}
