import { ExternalLink, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export default function MetricCard({
  title,
  icon: Icon,
  href,
  linkLabel,
  children,
}: {
  title: string;
  icon: LucideIcon;
  href?: string;
  linkLabel?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-300">{title}</h2>
      </div>

      <div className="mt-5 flex-1">{children}</div>

      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex items-center gap-1.5 border-t border-slate-800 pt-4 text-xs font-medium text-slate-400 transition-colors hover:text-cyan-400"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {linkLabel}
        </a>
      )}
    </div>
  );
}
