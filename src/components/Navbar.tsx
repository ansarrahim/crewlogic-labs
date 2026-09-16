"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Blocks, ChevronDown, Code2, Menu, Sparkles, Terminal, X } from "lucide-react";
import { SITE } from "@/lib/data";

const SERVICES_DROPDOWN = [
  {
    href: "/automations",
    icon: Blocks,
    label: "Automation Templates",
    body: "5 tested n8n workflows, ready to buy",
  },
  {
    href: "/industries",
    icon: Sparkles,
    label: "Browse by Industry",
    body: "Find the automations built for your business",
  },
  {
    href: "/engineering",
    icon: Code2,
    label: "Custom Engineering",
    body: "Smart contracts, audits, full-stack builds",
  },
];

const NAV_LINKS = [
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

const SECTION_IDS = ["case-studies", "contact"];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [observedSection, setObservedSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = pathname === "/" ? observedSection : null;
  const servicesRef = useRef<HTMLDivElement>(null);

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

  // The floating pill sits over page content rather than a solid bar, so it
  // gets a slight elevation lift once the page has scrolled — otherwise it
  // reads as floating over nothing at the very top of the page.
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the Services dropdown on an outside click — hover-only dropdowns
  // are unreliable on touch devices, so this is click-to-open/close instead.
  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function isActive(href: string) {
    return href.startsWith("/#") && href.slice(2) === activeSection;
  }

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8">
      <motion.div
        animate={{
          boxShadow: scrolled
            ? "0 12px 32px -8px rgba(26,23,18,0.18)"
            : "0 2px 10px -4px rgba(26,23,18,0.08)",
        }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between rounded-full border border-slate-800 bg-slate-900/95 px-4 backdrop-blur-md sm:px-6"
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 font-mono text-sm font-bold text-emerald-400">
            {"</>"}
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-100">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          <div ref={servicesRef} className="relative">
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              aria-expanded={servicesOpen}
              className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-emerald-400 ${
                servicesOpen ? "text-emerald-400" : "text-slate-400"
              }`}
            >
              Services
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                  style={{ transformOrigin: "top left" }}
                  className="absolute left-0 top-full mt-3 w-72 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-lg"
                >
                  {SERVICES_DROPDOWN.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setServicesOpen(false)}
                      className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-slate-800"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-100">{item.label}</p>
                        <p className="mt-0.5 text-xs text-slate-400">{item.body}</p>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-[background-color,transform] active:scale-95 hover:bg-emerald-400"
          >
            <Terminal className="h-4 w-4" />
            Book a Consult
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
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/95 shadow-lg backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-3">
              <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-widest text-muted">
                Services
              </p>
              {SERVICES_DROPDOWN.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut", delay: i * 0.03 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-full px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-emerald-400"
                  >
                    <item.icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="my-1 border-t border-slate-800" />
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.18,
                    ease: "easeOut",
                    delay: (SERVICES_DROPDOWN.length + i) * 0.03,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "true" : undefined}
                    className={`block rounded-full px-3 py-2.5 text-sm font-medium hover:bg-slate-800 hover:text-emerald-400 ${
                      isActive(link.href) ? "bg-slate-800 text-emerald-400" : "text-slate-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.18,
                  ease: "easeOut",
                  delay: (SERVICES_DROPDOWN.length + NAV_LINKS.length) * 0.03,
                }}
              >
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-transform active:scale-95"
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
