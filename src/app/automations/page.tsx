import type { Metadata } from "next";
import Link from "next/link";
import { Bot, MessageSquareWarning, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NexusChatWidget from "@/components/NexusChatWidget";
import AutomationTemplates from "@/components/AutomationTemplates";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Automation Templates — CrewLogic Labs",
  description:
    "Ready-to-deploy n8n workflow templates for lead response, review monitoring, and order sync — real automations, tested live, not diagrams.",
};

const HOW_IT_WORKS = [
  {
    icon: Bot,
    title: "You get the real workflow",
    body: "Not a mockup — the actual n8n workflow JSON, tested end-to-end against real APIs before it's sold.",
  },
  {
    icon: MessageSquareWarning,
    title: "Plug in your own accounts",
    body: "Import it into your n8n instance, connect your own AI/email/Airtable credentials, and it's yours — no ongoing fee to us.",
  },
  {
    icon: ShoppingCart,
    title: "Point your systems at it",
    body: "Each template exposes a webhook URL. Wire your existing form, CRM, or storefront to call it and the automation runs itself.",
  },
];

export default function AutomationsPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-950 font-sans">
      <Navbar />
      <main id="main-content" className="flex-1">
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Automation Templates
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                n8n Workflows Built to Run, Not Just Demo
              </h1>
              <p className="mt-4 text-slate-400">
                Three self-contained automations for small and local businesses — an AI lead
                responder, a review sentiment alert, and an order sync pipeline. Each one was
                built and verified live against real AI, email, and database APIs before it was
                listed here.
              </p>
            </div>

            <AutomationTemplates />

            <Reveal className="mx-auto mt-20 max-w-4xl">
              <h2 className="text-center text-2xl font-bold tracking-tight text-slate-100">
                How It Works
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {HOW_IT_WORKS.map((step) => (
                  <div key={step.title} className="text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10">
                      <step.icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-slate-100">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="mx-auto mt-14 max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/50 p-6 text-center">
              <p className="text-sm text-slate-400">
                Want one of these, a bundle, or something custom built for your workflow?
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400"
                >
                  Get in Touch
                </Link>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-100 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
                >
                  Email Directly
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <NexusChatWidget />
    </div>
  );
}
