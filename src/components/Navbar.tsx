"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Terminal, X } from "lucide-react";
import { SITE } from "@/lib/data";

const NAV_LINKS = [
  { href: "/#leadership", label: "Leadership" },
  { href: "/#squad", label: "Squad" },
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/#terminal", label: "Terminal" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

const SECTION_IDS = ["leadership", "squad", "case-studies", "terminal", "contact"];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [observedSection, setObservedSection] = useState<string | null>(null);
  const activeSection = pathname === "/" ? observedSection : null;

  // Scroll-spy: highlight whichever homepage section is currently in view,
  // so the nav always answers "where am I?" — not just "where can I go?"
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setObservedSection(mostVisible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  function isActive(href: string) {
    return href.startsWith("/#") && href.slice(2) === activeSection;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 font-mono text-sm font-bold text-emerald-400 shadow-[0_0_15px_rgba(184,147,90,0.35)]">
            {"</>"}
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-100">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "true" : undefined}
              className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
                isActive(link.href) ? "text-emerald-400" : "text-slate-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_20px_rgba(184,147,90,0.35)] transition-[background-color,transform] active:scale-95 hover:bg-emerald-400"
          >
            <Terminal className="h-4 w-4" />
            Scope Project
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="-m-2 p-2 text-slate-300 transition-transform active:scale-90 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden border-t border-slate-800 bg-slate-950/95 md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 pb-6 pt-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut", delay: i * 0.03 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "true" : undefined}
                    className={`block rounded-md px-2 py-2.5 text-sm font-medium hover:bg-slate-900 hover:text-emerald-400 ${
                      isActive(link.href) ? "bg-slate-900 text-emerald-400" : "text-slate-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18, ease: "easeOut", delay: NAV_LINKS.length * 0.03 }}
              >
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-transform active:scale-95"
                >
                  <Terminal className="h-4 w-4" />
                  Scope Project
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
