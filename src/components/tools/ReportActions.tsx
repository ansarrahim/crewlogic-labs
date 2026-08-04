"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { downloadTextFile } from "@/lib/report";

export default function ReportActions({ filename, content }: { filename: string; content: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can fail without permissions — download still works.
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy Report"}
      </button>
      <button
        type="button"
        onClick={() => downloadTextFile(filename, content)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-emerald-500/50 hover:text-emerald-400"
      >
        <Download className="h-3.5 w-3.5" />
        Download
      </button>
    </div>
  );
}
