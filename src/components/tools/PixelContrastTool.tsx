"use client";

import { useMemo, useRef, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { computeContrast, parseHexColor } from "@/lib/contrast";
import ReportActions from "@/components/tools/ReportActions";
import { buildContrastReport } from "@/lib/report";
import { trackUsage } from "@/lib/track-usage-client";

function PassBadge({ pass, label }: { pass: boolean; label: string }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium ${
        pass
          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
          : "border-rose-500/30 bg-rose-500/10 text-rose-300"
      }`}
    >
      {pass ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
      {label}
    </div>
  );
}

export default function PixelContrastTool() {
  const [foreground, setForeground] = useState("#e2e8f0");
  const [background, setBackground] = useState("#0f172a");
  const hasTrackedRef = useRef(false);

  const result = useMemo(() => computeContrast(foreground, background), [foreground, background]);
  const fgValid = parseHexColor(foreground) !== null;
  const bgValid = parseHexColor(background) !== null;

  function trackFirstInteraction() {
    if (hasTrackedRef.current) return;
    hasTrackedRef.current = true;
    trackUsage("pixel-ux");
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-slate-400">
        Real WCAG 2.x contrast math, computed live as you type — the same formula used by
        accessibility auditing tools.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Text (foreground)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={fgValid ? foreground : "#ffffff"}
              onChange={(e) => {
                trackFirstInteraction();
                setForeground(e.target.value);
              }}
              className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-slate-800 bg-transparent"
            />
            <input
              type="text"
              value={foreground}
              onChange={(e) => {
                trackFirstInteraction();
                setForeground(e.target.value);
              }}
              className="w-full rounded-lg border border-slate-800 bg-black px-3 py-2 font-mono text-sm text-slate-100 outline-none focus:border-emerald-500/60 focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">
            Background
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bgValid ? background : "#000000"}
              onChange={(e) => {
                trackFirstInteraction();
                setBackground(e.target.value);
              }}
              className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-slate-800 bg-transparent"
            />
            <input
              type="text"
              value={background}
              onChange={(e) => {
                trackFirstInteraction();
                setBackground(e.target.value);
              }}
              className="w-full rounded-lg border border-slate-800 bg-black px-3 py-2 font-mono text-sm text-slate-100 outline-none focus:border-emerald-500/60 focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            />
          </div>
        </div>
      </div>

      <div
        className="flex h-24 items-center justify-center rounded-xl border border-slate-800 text-lg font-semibold"
        style={{
          backgroundColor: bgValid ? background : "#000000",
          color: fgValid ? foreground : "#ffffff",
        }}
      >
        The quick brown fox jumps
      </div>

      {result ? (
        <div className="space-y-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-center">
            <p className="text-3xl font-bold text-slate-100">{result.ratio.toFixed(2)}:1</p>
            <p className="text-xs text-muted">contrast ratio</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <PassBadge pass={result.normalAA} label="AA — Normal text" />
            <PassBadge pass={result.normalAAA} label="AAA — Normal text" />
            <PassBadge pass={result.largeAA} label="AA — Large text" />
            <PassBadge pass={result.largeAAA} label="AAA — Large text" />
          </div>
          <div className="flex justify-end">
            <ReportActions
              filename="pixel-ux-contrast-report.txt"
              content={buildContrastReport(foreground, background, result)}
            />
          </div>
        </div>
      ) : (
        <p className="text-sm text-amber-400">Enter two valid hex colors (e.g. #1e293b).</p>
      )}
    </div>
  );
}
