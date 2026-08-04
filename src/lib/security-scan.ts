export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type Finding = {
  line: number;
  severity: Severity;
  message: string;
};

type Rule = {
  pattern: RegExp;
  severity: Severity;
  message: string;
};

const RULES: Rule[] = [
  {
    pattern: /\b(api[_-]?key|secret|token|password|passwd|pwd)\s*[:=]\s*["'][A-Za-z0-9_\-/+=.]{8,}["']/i,
    severity: "critical",
    message: "Possible hardcoded credential — move this to an environment variable.",
  },
  {
    pattern: /AKIA[0-9A-Z]{16}/,
    severity: "critical",
    message: "This looks like an AWS access key ID — rotate it immediately if real.",
  },
  {
    pattern: /-----BEGIN (RSA |EC )?PRIVATE KEY-----/,
    severity: "critical",
    message: "A private key appears to be embedded directly in source code.",
  },
  {
    pattern: /\beval\s*\(/,
    severity: "high",
    message: "eval() executes arbitrary strings as code — a common injection vector.",
  },
  {
    pattern: /(SELECT|INSERT|UPDATE|DELETE)[^;\n]*['"]\s*\+\s*\w+/i,
    severity: "high",
    message: "Possible SQL injection via string concatenation — use parameterized queries.",
  },
  {
    pattern: /child_process|exec\s*\([^)]*\+/,
    severity: "high",
    message: "Possible command injection via string concatenation into a shell command.",
  },
  {
    pattern: /\.innerHTML\s*=\s*(?!["'`][^$]*["'`]\s*;?$)/,
    severity: "medium",
    message: "Assigning dynamic content to innerHTML can enable XSS — prefer textContent or sanitize first.",
  },
  {
    pattern: /document\.write\s*\(/,
    severity: "medium",
    message: "document.write() with dynamic input is a known XSS vector.",
  },
  {
    pattern: /console\.log\([^)]*\b(password|secret|token|apiKey|api_key)\b/i,
    severity: "low",
    message: "Logging a sensitive-looking variable — avoid leaking secrets to logs.",
  },
  {
    pattern: /Access-Control-Allow-Origin['"]?\s*[:=]\s*['"]\*['"]/,
    severity: "medium",
    message: "Wildcard CORS origin — restrict to known origins if this handles authenticated requests.",
  },
  {
    pattern: /\/\/\s*(TODO|FIXME).*(security|vuln|auth|password)/i,
    severity: "info",
    message: "Security-related TODO left in code.",
  },
];

export function scanCode(code: string): Finding[] {
  const findings: Finding[] = [];
  const lines = code.split("\n");

  lines.forEach((line, index) => {
    for (const rule of RULES) {
      if (rule.pattern.test(line)) {
        findings.push({ line: index + 1, severity: rule.severity, message: rule.message });
      }
    }
  });

  const order: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
  return findings.sort((a, b) => order[a.severity] - order[b.severity] || a.line - b.line);
}
