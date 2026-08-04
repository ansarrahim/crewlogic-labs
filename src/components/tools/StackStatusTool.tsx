"use client";

import { FormEvent, useState } from "react";
import { AlertTriangle, CheckCircle2, Gauge, Loader2, Lock, Server, ShieldCheck, XCircle } from "lucide-react";
import ReportActions from "@/components/tools/ReportActions";
import { buildStatusReport } from "@/lib/report";

type StatusResult = {
  statusCode: number;
  statusText: string;
  responseTimeMs: number;
  server: string | null;
  contentType: string | null;
  tls: { valid: boolean; issuer: string | null; validTo: string | null; daysRemaining: number | null } | null;
  securityHeaders: { name: string; present: boolean }[];
};

export default function StackStatusTool() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<StatusResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!url.trim() || isLoading) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/system-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      setResult(data as StatusResult);
    } catch {
      setError("Couldn't reach the status-check service — try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const isHealthy = result && result.statusCode >= 200 && result.statusCode < 400;

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">
        Enter a URL for a real, live check — response time, HTTP status, and TLS certificate
        info, fetched server-side right now.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="example.com or https://example.com"
          className="flex-1 rounded-lg border border-slate-800 bg-black px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-emerald-500/60"
        />
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gauge className="h-4 w-4" />}
          Check Status
        </button>
      </form>

      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-3">
          <div
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
              isHealthy
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-amber-500/30 bg-amber-500/10 text-amber-300"
            }`}
          >
            {isHealthy ? (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            ) : (
              <AlertTriangle className="h-4 w-4 shrink-0" />
            )}
            <span className="font-mono font-semibold">
              {result.statusCode} {result.statusText}
            </span>
            <span className="ml-auto text-xs text-slate-400">{result.responseTimeMs}ms</span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <Server className="h-3.5 w-3.5" />
                Server
              </p>
              <p className="text-slate-300">{result.server ?? "Not disclosed"}</p>
              <p className="mt-2 text-xs text-slate-500">{result.contentType ?? "Unknown content-type"}</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm">
              <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                <Lock className="h-3.5 w-3.5" />
                TLS Certificate
              </p>
              {result.tls ? (
                <>
                  <p className={result.tls.valid ? "text-emerald-400" : "text-amber-400"}>
                    {result.tls.valid ? "Valid" : "Not verified"}
                  </p>
                  {result.tls.issuer && (
                    <p className="mt-1 text-xs text-slate-500">Issued by {result.tls.issuer}</p>
                  )}
                  {result.tls.daysRemaining !== null && (
                    <p className="mt-1 text-xs text-slate-500">
                      Expires in {result.tls.daysRemaining} days
                    </p>
                  )}
                </>
              ) : (
                <p className="text-slate-500">No TLS (http) or check unavailable</p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <ShieldCheck className="h-3.5 w-3.5" />
              Security Headers
            </p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {result.securityHeaders.map((h) => (
                <div
                  key={h.name}
                  className={`flex items-center gap-2 text-xs ${h.present ? "text-emerald-400" : "text-slate-500"}`}
                >
                  {h.present ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 shrink-0 text-slate-600" />
                  )}
                  <span className="font-mono">{h.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <ReportActions
              filename="stack-core-status-report.txt"
              content={buildStatusReport(url.trim(), result)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
