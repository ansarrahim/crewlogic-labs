# CrewLogic Labs

**Autonomous AI Engineering. Human Architectural Rigor.**

Live: **https://crewlogic-labs.vercel.app**

The official platform for CrewLogic Labs — an AI & Web3 software engineering agency led by
Engr. Muhammad Ansar (CEO & Lead Systems Architect), powered by a virtual squad of 5
specialized AI agents. Every agent on this site is a real, working feature — not a mockup.

## The Squad — 5 Live Agents

| Agent | Role | What it actually does |
|---|---|---|
| **NEXUS-AI** | Lead AI & Systems Automation Engineer | A real LLM-backed chat widget (Gemini 2.5 Flash), grounded in this company's real data — ask it about the squad, the CEO, or your project idea. |
| **SENTINEL-SEC** | Lead QA & Security Audit Engineer | A client-side static-analysis scanner — paste code and get real findings on hardcoded secrets, injection patterns, and unsafe DOM writes. |
| **SOLIS-33** | Lead Smart Contract & Web3 Engineer | A heuristic Solidity analyzer — paste a contract and get real checks for reentrancy, `tx.origin` auth, unchecked low-level calls, and missing access control. |
| **STACK-CORE** | Lead Full-Stack Web Architect | A live, server-side URL status checker — real HTTP status, response time, and TLS certificate inspection (with SSRF protections). |
| **PIXEL-UX** | Lead Product & UI/UX Designer | A live WCAG 2.x contrast-ratio calculator — real relative-luminance math, computed as you type. |

Try them at [/](https://crewlogic-labs.vercel.app) under "Virtual Engineering Squad."

## Also on the site

- **Leadership** — the CEO's background and the 70/30 Engineering Rule (70% AI-executed
  implementation, 30% human architecture/security/QA).
- **[/projects](https://crewlogic-labs.vercel.app/projects)** — a portfolio page that pulls
  live from the GitHub REST API (cached, revalidated hourly) instead of a hardcoded list.
- **Terminal** — a CLI-style command interface (`help`, `squad`, `ceo`, `web3`, `security`,
  `contact`) for exploring the company.
- **Contact** — a project-scoping form.

## Tech stack

- **Framework:** Next.js 16 (App Router, Turbopack, React 19)
- **Styling:** Tailwind CSS v4
- **AI:** Google Gemini API (`@google/genai`) for NEXUS-AI
- **Icons:** lucide-react
- **Deployment:** Vercel

## Security notes

- The Gemini API key lives only in server-side environment variables — never committed, never
  sent to the client.
- The chat and status-check APIs are rate-limited per IP.
- The status-check endpoint blocks requests to private/loopback/link-local addresses (including
  cloud metadata IPs) before making outbound requests.
- Standard security headers are set site-wide (`X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`).

## Getting started locally

```bash
npm install
cp .env.example .env.local   # then add your GEMINI_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Get a free Gemini API key at [Google AI Studio](https://aistudio.google.com/apikey) — no
credit card required for the free tier.

## Deploy

```bash
npx vercel deploy --prod
```

Set `GEMINI_API_KEY` in your Vercel project's environment variables (Production) for the live
chat to work.
