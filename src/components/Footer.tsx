import Link from "next/link";
import { ExternalLink, Mail, Terminal } from "lucide-react";
import { SITE } from "@/lib/data";
import { GITHUB_PROFILE_URL } from "@/lib/github";

const QUICK_LINKS = [
  { href: "/#leadership", label: "Leadership" },
  { href: "/#squad", label: "Squad" },
  { href: "/#case-studies", label: "Case Studies" },
  { href: "/#terminal", label: "Terminal" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

const SOCIALS = [
  { href: "https://www.linkedin.com/in/muhammad-ansar-402641178", label: "LinkedIn" },
  { href: GITHUB_PROFILE_URL, label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 font-mono text-xs font-bold text-emerald-400">
                {"</>"}
              </span>
              <span className="text-base font-semibold text-slate-100">
                {SITE.name}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-slate-400">
              {SITE.tagline}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Connect
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-emerald-400"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {SITE.email}
                </a>
              </li>
              {SOCIALS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 sm:flex-row">
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <Terminal className="h-3.5 w-3.5" />
            &copy; {new Date().getFullYear()} {SITE.name}. All rights
            reserved.
          </p>
          <p className="text-xs text-muted">
            Human-led. Agent-powered. Built in {SITE.location}.
          </p>
        </div>
      </div>
    </footer>
  );
}
