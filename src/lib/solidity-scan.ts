import type { Finding, Severity } from "@/lib/security-scan";

export type { Finding, Severity };

type Rule = {
  pattern: RegExp;
  severity: Severity;
  message: string;
};

const LINE_RULES: Rule[] = [
  {
    pattern: /pragma solidity\s*\^/,
    severity: "low",
    message: "Floating pragma — lock to an exact compiler version before deploying to production.",
  },
  {
    pattern: /tx\.origin/,
    severity: "high",
    message: "tx.origin for authorization is vulnerable to phishing via malicious intermediate contracts — use msg.sender.",
  },
  {
    pattern: /selfdestruct\s*\(/i,
    severity: "medium",
    message: "selfdestruct found — confirm this path is restricted to a trusted admin.",
  },
  {
    pattern: /keccak256\([^)]*block\.timestamp/,
    severity: "high",
    message: "block.timestamp used as a randomness source is predictable and miner-manipulable.",
  },
  {
    pattern: /\.call\{[^}]*\}\([^)]*\)|\.call\(/,
    severity: "medium",
    message: "Low-level .call() found — verify the return value is checked (require/if on success).",
  },
];

const SENSITIVE_FN_NAME = /^(withdraw|mint|burn|setOwner|transferOwnership|pause|unpause|upgrade|selfdestruct)/i;

function findFunctionBlocks(code: string): { start: number; end: number; header: string }[] {
  const blocks: { start: number; end: number; header: string }[] = [];
  const fnRegex = /function\s+\w+\s*\([^)]*\)[^{;]*\{/g;
  let match: RegExpExecArray | null;

  while ((match = fnRegex.exec(code))) {
    const braceStart = match.index + match[0].length - 1;
    let depth = 1;
    let i = braceStart + 1;
    while (i < code.length && depth > 0) {
      if (code[i] === "{") depth++;
      else if (code[i] === "}") depth--;
      i++;
    }
    blocks.push({ start: match.index, end: i, header: match[0] });
  }

  return blocks;
}

function lineOf(code: string, charIndex: number): number {
  return code.slice(0, charIndex).split("\n").length;
}

export function scanSolidity(code: string): Finding[] {
  const findings: Finding[] = [];
  const lines = code.split("\n");

  lines.forEach((line, index) => {
    for (const rule of LINE_RULES) {
      if (rule.pattern.test(line)) {
        findings.push({ line: index + 1, severity: rule.severity, message: rule.message });
      }
    }
  });

  try {
    const blocks = findFunctionBlocks(code);
    for (const block of blocks) {
      const body = code.slice(block.start, block.end);

      const nameMatch = block.header.match(/function\s+(\w+)/);
      const fnName = nameMatch?.[1] ?? "";
      const isPublicish = /\b(public|external)\b/.test(block.header);
      const hasModifierGuard = /\b(onlyOwner|onlyAdmin|onlyRole|private|internal)\b/.test(block.header);
      if (isPublicish && !hasModifierGuard && SENSITIVE_FN_NAME.test(fnName)) {
        findings.push({
          line: lineOf(code, block.start),
          severity: "medium",
          message: `Function "${fnName}" looks sensitive (public/external) but has no visible access-control modifier — verify only authorized callers can invoke it.`,
        });
      }

      const callMatch = /\.call\{[^}]*\}\(|\.call\(|\.transfer\(|\.send\(/.exec(body);
      if (callMatch) {
        const callIndex = block.start + callMatch.index;
        const afterCall = body.slice(callMatch.index + callMatch[0].length);
        const stateWriteMatch = /\b\w+(\[[^\]]+\])?\s*[-+]?=\s*[^=]/.exec(afterCall);
        if (stateWriteMatch) {
          findings.push({
            line: lineOf(code, callIndex),
            severity: "high",
            message: `Possible reentrancy in "${fnName || "this function"}": a state update happens after an external call — apply the checks-effects-interactions pattern or a reentrancy guard.`,
          });
        }
      }
    }
  } catch {
    // Heuristic parsing is best-effort; skip block-level checks on malformed input.
  }

  const order: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
  return findings.sort((a, b) => order[a.severity] - order[b.severity] || a.line - b.line);
}
