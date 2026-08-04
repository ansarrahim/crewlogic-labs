"use client";

import { useState } from "react";
import { ScanSearch } from "lucide-react";
import { scanSolidity, type Finding } from "@/lib/solidity-scan";
import FindingsList from "@/components/tools/FindingsList";
import ReportActions from "@/components/tools/ReportActions";
import { buildFindingsReport } from "@/lib/report";
import { trackUsage } from "@/lib/track-usage-client";

const SAMPLE = `pragma solidity ^0.8.0;

contract Vault {
    mapping(address => uint256) public balances;

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount);
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success);
        balances[msg.sender] -= amount;
    }

    function setOwner(address newOwner) public {
        owner = newOwner;
    }
}`;

export default function SolisContractTool() {
  const [code, setCode] = useState("");
  const [findings, setFindings] = useState<Finding[] | null>(null);

  function handleScan() {
    setFindings(scanSolidity(code));
    trackUsage("solis-33");
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">
        Paste a Solidity contract. This runs real heuristic checks — reentrancy patterns,
        tx.origin auth, unchecked low-level calls, missing access control — entirely in your
        browser. This is a heuristic linter, not a full audit tool like Slither.
      </p>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste Solidity contract code here..."
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
          Analyze Contract
        </button>
        <button
          type="button"
          onClick={() => setCode(SAMPLE)}
          className="text-xs text-slate-500 underline decoration-dotted underline-offset-4 hover:text-slate-300"
        >
          Load sample vulnerable contract
        </button>
      </div>

      {findings && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Results
            </p>
            <ReportActions
              filename="solis-33-contract-report.txt"
              content={buildFindingsReport("SOLIS-33 Contract Analysis", findings)}
            />
          </div>
          <FindingsList findings={findings} />
        </div>
      )}
    </div>
  );
}
