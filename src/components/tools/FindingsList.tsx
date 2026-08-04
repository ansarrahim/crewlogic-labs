import { AlertTriangle, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import type { Finding, Severity } from "@/lib/security-scan";

const SEVERITY_STYLES: Record<Severity, { icon: typeof ShieldAlert; className: string; label: string }> = {
  critical: { icon: ShieldAlert, className: "border-rose-500/30 bg-rose-500/10 text-rose-300", label: "CRITICAL" },
  high: { icon: AlertTriangle, className: "border-orange-500/30 bg-orange-500/10 text-orange-300", label: "HIGH" },
  medium: { icon: AlertTriangle, className: "border-amber-500/30 bg-amber-500/10 text-amber-300", label: "MEDIUM" },
  low: { icon: Info, className: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300", label: "LOW" },
  info: { icon: Info, className: "border-slate-700 bg-slate-900 text-slate-400", label: "INFO" },
};

export default function FindingsList({ findings }: { findings: Finding[] }) {
  if (findings.length === 0) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
        <CheckCircle2 className="h-4 w-4 shrink-0" />
        No issues found by these heuristics — that doesn&apos;t guarantee it&apos;s bug-free, but nothing obvious stood out.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {findings.map((finding, i) => {
        const style = SEVERITY_STYLES[finding.severity];
        const Icon = style.icon;
        return (
          <div
            key={i}
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${style.className}`}
          >
            <Icon className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-wide">
                {style.label}
                <span className="text-slate-500">line {finding.line}</span>
              </div>
              <p className="mt-0.5 leading-relaxed">{finding.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
