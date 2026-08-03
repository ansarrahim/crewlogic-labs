"use client";

import { useState } from "react";
import { Menu, Terminal, X } from "lucide-react";
import { SITE } from "@/lib/data";

const NAV_LINKS = [
  { href: "#leadership", label: "Leadership" },
  { href: "#squad", label: "Squad" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#terminal", label: "Terminal" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 font-mono text-sm font-bold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.35)]">
            {"</>"}
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-100">
            {SITE.name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-400 transition-colors hover:text-emerald-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-colors hover:bg-emerald-400"
          >
            <Terminal className="h-4 w-4" />
            Scope Project
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="text-slate-300 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-800 bg-slate-950/95 px-4 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-900 hover:text-emerald-400"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950"
            >
              <Terminal className="h-4 w-4" />
              Scope Project
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
