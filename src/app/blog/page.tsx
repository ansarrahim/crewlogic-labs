import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NexusChatWidget from "@/components/NexusChatWidget";
import Reveal from "@/components/Reveal";
import { BLOG_POSTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — CrewLogic Labs",
  description:
    "Real notes from building the automations in this catalog — what broke, why we made the calls we made, and what we'd do differently.",
};

export default function BlogIndexPage() {
  return (
    <div className="flex flex-1 flex-col bg-slate-950 font-sans">
      <Navbar />
      <main id="main-content" className="flex-1">
        <section className="px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Reveal className="mx-auto mb-14 max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">
                Blog
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
                Notes From Building This Catalog
              </h1>
              <p className="mt-4 text-slate-400">
                What actually broke, why we made the calls we made, and what we'd do
                differently — not marketing copy about hypothetical automations.
              </p>
            </Reveal>

            <div className="space-y-6">
              {BLOG_POSTS.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.08}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition-[border-color,transform] active:scale-[0.99] hover:border-emerald-500/40"
                  >
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="mt-3 text-xl font-semibold leading-snug text-slate-100">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 flex items-center gap-1 text-xs font-medium text-emerald-400 transition-colors">
                      Read the post
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
