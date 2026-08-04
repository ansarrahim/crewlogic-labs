"use client";

import { useState } from "react";
import { ScanSearch } from "lucide-react";
import { scanCode, type Finding } from "@/lib/security-scan";
import FindingsList from "@/components/tools/FindingsList";
import ReportActions from "@/components/tools/ReportActions";
import { buildFindingsReport } from "@/lib/report";
import { trackUsage } from "@/lib/track-usage-client";

const SAMPLE = `const apiKey = "REPLACE_ME_supersecretvalue1234567890";

function renderUserBio(bio) {
  document.getElementById("bio").innerHTML = bio;
}

function runQuery(userInput) {
  const query = "SELECT * FROM users WHERE name = '" + userInput + "'";
  db.execute(query);
}`;

export default function SentinelScanTool() {
  const [code, setCode] = useState("");
  const [findings, setFindings] = useState<Finding[] | null>(null);

  function handleScan() {
    setFindings(scanCode(code));
    trackUsage("sentinel-sec");
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">
        Paste a code snippet below. This runs real static-analysis heuristics — hardcoded
        secrets, injection patterns, unsafe DOM writes — entirely in your browser. Nothing you
        paste leaves this page.
      </p>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste JavaScript / TypeScript code here..."
        rows={10}
        spellCheck={false}
        className="w-full resize-none rounded-xl border border-slate-800 bg-black p-3 font-mono text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-emerald-500/60"
      />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleScan}
          disabled={!code.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-[background-color,transform] active:scale-[0.97] hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ScanSearch className="h-4 w-4" />
          Scan Code
        </button>
        <button
          type="button"
          onClick={() => setCode(SAMPLE)}
          className="text-xs text-slate-500 underline decoration-dotted underline-offset-4 hover:text-slate-300"
        >
          Load sample vulnerable code
        </button>
      </div>

      {findings && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Results
            </p>
            <ReportActions
              filename="sentinel-sec-scan-report.txt"
              content={buildFindingsReport("SENTINEL-SEC Security Scan", findings)}
            />
          </div>
          <FindingsList findings={findings} />
        </div>
      )}
    </div>
  );
}
