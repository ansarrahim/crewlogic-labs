"use client";

import { FormEvent, useState } from "react";
import { Terminal } from "lucide-react";
import { AGENTS, CEO, SITE } from "@/lib/data";
import Reveal from "@/components/Reveal";

type Line = {
  type: "input" | "output";
  text: string;
};

const COMMANDS = ["help", "squad", "ceo", "web3", "security", "contact", "clear"] as const;

function runCommand(raw: string): string[] {
  const cmd = raw.trim().toLowerCase();

  switch (cmd) {
    case "help":
      return [
        "Available commands:",
        "  help      - list available commands",
        "  squad     - list the 5 CrewLogic AI agents",
        "  ceo       - show founder & leadership profile",
        "  web3      - show Web3 / blockchain capabilities",
        "  security  - show security & QA posture",
        "  contact   - show contact channels",
        "  clear     - clear the terminal",
      ];
    case "squad":
      return [
        "Loading virtual engineering squad...",
        ...AGENTS.map((a) => `  [${a.status.split(" ")[0]}] ${a.name.padEnd(12)} — ${a.role}`),
      ];
    case "ceo":
      return [
        `${CEO.name} — ${CEO.title}`,
        `  Education     : ${CEO.education}`,
        `  Certifications: ${CEO.certifications.join(", ")}`,
        `  Specialties   :`,
        ...CEO.specialties.map((s) => `    - ${s}`),
      ];
    case "web3": {
      const solis = AGENTS.find((a) => a.id === "solis-33")!;
      return [
        `${solis.name} — ${solis.role}`,
        `  Stack: ${solis.stack.join(", ")}`,
        "  Capabilities:",
        ...solis.capabilities.map((c) => `    - ${c}`),
      ];
    }
    case "security": {
      const sentinel = AGENTS.find((a) => a.id === "sentinel-sec")!;
      return [
        `${sentinel.name} — ${sentinel.role}`,
        `  Stack: ${sentinel.stack.join(", ")}`,
        "  Capabilities:",
        ...sentinel.capabilities.map((c) => `    - ${c}`),
      ];
    }
    case "contact":
      return [
        `Email    : ${SITE.email}`,
        `Phone    : ${SITE.phone}`,
        `Location : ${SITE.location}`,
      ];
    case "":
      return [];
    default:
      return [`command not found: ${raw}`, `type 'help' for a list of commands`];
  }
}

const WELCOME: Line[] = [
  { type: "output", text: `${SITE.name} CLI v1.0.0 — type 'help' to get started.` },
];

export default function CLITerminal() {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = input;
    setInput("");

    if (value.trim().toLowerCase() === "clear") {
      setLines([]);
      return;
    }

    const output = runCommand(value);
    setLines((prev) => [
      ...prev,
      { type: "input", text: value },
      ...output.map((text): Line => ({ type: "output", text })),
    ]);
  }

  return (
    <section id="terminal" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            Interactive Terminal
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Query the Crew Directly
          </h2>
          <p className="mt-4 text-slate-400">
            Try <code className="rounded bg-slate-800 px-1.5 py-0.5 text-emerald-400">squad</code>,{" "}
            <code className="rounded bg-slate-800 px-1.5 py-0.5 text-emerald-400">ceo</code>, or{" "}
            <code className="rounded bg-slate-800 px-1.5 py-0.5 text-emerald-400">help</code>.
          </p>
        </Reveal>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-black shadow-[0_0_40px_rgba(16,185,129,0.1)]">
          <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/60 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-amber-500/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
            <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-slate-500">
              <Terminal className="h-3.5 w-3.5" />
              crewlogic@labs:~
            </span>
          </div>

          <div className="h-80 overflow-y-auto p-4 font-mono text-sm">
            {lines.map((line, i) => (
              <div
                key={i}
                className={
                  line.type === "input"
                    ? "flex gap-2 text-slate-100"
                    : "whitespace-pre-wrap text-slate-400"
                }
              >
                {line.type === "input" && (
                  <span className="text-emerald-400">
                    crewlogic@labs:~$
                  </span>
                )}
                <span>{line.text}</span>
              </div>
            ))}

            <form onSubmit={handleSubmit} className="mt-1 flex items-center gap-2">
              <span className="text-emerald-400">crewlogic@labs:~$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal command input"
                placeholder="type a command..."
                className="flex-1 bg-transparent text-slate-100 outline-none placeholder:text-slate-600"
              />
              <span className="animate-cursor-blink h-4 w-2 bg-emerald-400" />
            </form>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {COMMANDS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setInput(c)}
              className="rounded-md border border-slate-800 bg-slate-900/60 px-3 py-1.5 font-mono text-xs text-slate-400 transition-[color,border-color,transform] active:scale-95 hover:border-emerald-500/40 hover:text-emerald-400"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
