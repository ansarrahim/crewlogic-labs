import type { LucideIcon } from "lucide-react";
import {
  Bot,
  Cpu,
  Layers,
  Network,
  ShieldCheck,
} from "lucide-react";

export const SITE = {
  name: "CrewLogic Labs",
  tagline: "Autonomous AI Engineering. Human Architectural Rigor.",
  email: "ansarrahim789@gmail.com",
  phone: "+92 343 1722842",
  location: "Islamabad, Pakistan",
};

export const CEO = {
  name: "Muhammad Ansar",
  title: "CEO & Lead Systems Architect",
  linkedinUrl: "https://www.linkedin.com/in/muhammad-ansar-402641178",
  education: "B.S. in Software Engineering, University of Malakand, Pakistan",
  specialties: [
    "Full-Stack Web Architecture (Next.js / Node.js)",
    "Web3 & Smart Contracts (Solidity / Web3.js)",
    "AI Systems Integration (OpenAI / Claude APIs, Python Automation)",
    "Workflow Automation & Integrations (n8n, Docker, REST API Orchestration)",
  ],
  certifications: [
    "Meta Python Professional",
    "Generative AI Prompt Engineering",
    "Aspire Fellows Program",
  ],
};

export type Agent = {
  id: string;
  name: string;
  role: string;
  domain: string;
  stack: string[];
  capabilities: string[];
  status: string;
  icon: LucideIcon;
};

export const AGENTS: Agent[] = [
  {
    id: "nexus-ai",
    name: "NEXUS-AI",
    role: "Lead AI & Systems Automation Engineer",
    domain: "AI / LLM Workflows & RAG Systems",
    stack: ["OpenAI API", "Claude API", "LangChain", "RAG Pipelines", "Python", "FastAPI", "ChromaDB"],
    capabilities: [
      "Multi-step LLM workflow orchestration",
      "Custom chatbots",
      "Automated data pipelines",
      "Async API backends",
    ],
    status: "ONLINE • 24/7 Processing Engine",
    icon: Bot,
  },
  {
    id: "solis-33",
    name: "SOLIS-33",
    role: "Lead Smart Contract & Web3 Engineer",
    domain: "Blockchain & Decentralized Systems",
    stack: ["Solidity", "Ethereum", "Polygon", "Web3.js", "Hardhat", "IPFS"],
    capabilities: [
      "Tamper-proof smart contract architecture",
      "On-chain asset verification",
      "dApp integration",
      "Security immutability",
    ],
    status: "ONLINE • On-Chain Audit Ready",
    icon: Network,
  },
  {
    id: "stack-core",
    name: "STACK-CORE",
    role: "Lead Full-Stack Web Architect",
    domain: "Enterprise Full-Stack Web Architecture",
    stack: ["Next.js (App Router)", "React.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"],
    capabilities: [
      "Server Components",
      "REST / GraphQL microservices",
      "Schema optimization",
      "Production CI/CD pipelines",
    ],
    status: "ONLINE • 99.9% Uptime SLA",
    icon: Layers,
  },
  {
    id: "pixel-ux",
    name: "PIXEL-UX",
    role: "Lead Product & UI/UX Designer",
    domain: "UI/UX & Design Systems",
    stack: ["Tailwind CSS", "Framer Motion", "Design Systems", "Web3 & AI Dashboards"],
    capabilities: [
      "Converting engineering specs into modern UI",
      "Interactive, accessible interfaces",
      "Glassmorphic component libraries",
      "Design token systems",
    ],
    status: "ONLINE • Active Design Tokens",
    icon: Cpu,
  },
  {
    id: "sentinel-sec",
    name: "SENTINEL-SEC",
    role: "Lead QA & Security Audit Engineer",
    domain: "Security Auditing & Code Verification",
    stack: ["Slither", "Pytest", "Jest", "OWASP Compliance", "Static Analysis"],
    capabilities: [
      "Automated unit / integration test suites",
      "Smart contract vulnerability scans",
      "Secret key leak protection",
      "Zero-vulnerability enforcement",
    ],
    status: "ONLINE • Zero Vulnerability Enforcement",
    icon: ShieldCheck,
  },
];

export type CaseStudy = {
  id: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  metric: string;
  problem: string;
  approach: string[];
  outcomes: string[];
  liveUrl?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "lead-score-api",
    title: "Lead Score API — a Trained Model, Not a Prompt",
    category: "Data Science / Machine Learning",
    description:
      "Scores inbound leads by conversion likelihood in milliseconds, trained on ~9,200 real leads with measured accuracy — the first project here written in Python instead of TypeScript.",
    stack: ["Python", "FastAPI", "scikit-learn", "pandas", "Vercel"],
    metric: "82.2% accuracy, 0.888 ROC-AUC",
    problem:
      "Everything else here calls an AI API per request — great for unstructured tasks like drafting a reply, wasteful for a decision made thousands of times a day like \"is this lead worth a callback.\" That's a training problem, not a prompting problem.",
    approach: [
      "NEXUS-AI trains a gradient boosting classifier on a real public lead-conversion dataset (~9,200 leads from an online education company's marketing campaigns), deliberately excluding any column a sales rep would only fill in after contact so nothing leaks into the training signal.",
      "SENTINEL-SEC evaluates it against a logistic regression baseline on a held-out test split before shipping either one, so the reported accuracy is measured, not asserted.",
      "STACK-CORE serves it through FastAPI on Vercel's Python runtime — a genuinely different backend stack from the other five projects, proving the Python/ML toolchain independently of the Next.js one.",
    ],
    outcomes: [
      "82.2% accuracy and a 0.888 ROC-AUC on a real held-out test set — both reproducible by running the training script fresh, not hand-picked from a lucky run.",
      "Scores a lead in milliseconds with zero per-request API cost, versus the latency and price of an LLM call for the same yes/no decision.",
      "Pairs directly with the n8n AI Lead Auto-Responder: score first, then only spend an AI-drafted reply on the leads actually worth one.",
    ],
    liveUrl: "https://lead-score-api-three.vercel.app",
  },
  {
    id: "framekit",
    title: "Framekit — Metered Image API with Real Billing",
    category: "Product / SaaS Engineering",
    description:
      "A real subscription product: sign up, get an API key, call an endpoint, get back a rendered PNG card. Free and Pro tiers, real Stripe Checkout, real webhooks, real usage metering — not a static pricing page bolted onto a demo.",
    stack: ["Next.js", "TypeScript", "Postgres (Neon + Drizzle)", "Upstash Redis", "Stripe"],
    metric: "A real paying-customer lifecycle",
    problem:
      "Every other project here proves engineering depth, but none of them prove I can ship something a stranger would actually subscribe to and pay for — accounts, metered access, and a subscription that upgrades and downgrades correctly, not just a checkout button that goes nowhere.",
    approach: [
      "STACK-CORE splits state deliberately: Postgres (Neon + Drizzle) is the system of record for users and API keys, while Redis handles sessions and usage counters — the same hybrid production billing systems actually use, not infra for its own sake.",
      "API keys are hashed at rest and shown once at creation, matching real key-management practice, and every request is checked against a live monthly quota before it's allowed to render.",
      "SENTINEL-SEC wires Stripe Checkout and the Customer Portal to a signature-verified webhook handler, so subscribing and cancelling both flow through the same real event pipeline Stripe sends in production.",
    ],
    outcomes: [
      "Verified the entire lifecycle live: real payment with Stripe's test card, webhook-driven upgrade to Pro (100 → 5,000 renders/mo), then cancellation through the real Customer Portal, webhook-driven downgrade back to Free.",
      "Three card templates (OG image, stat card, quote card) render server-side via next/og — no headless browser, no design tool in the loop.",
      "Runs in Stripe test mode on purpose: this is a portfolio piece, not a live business, so no real charges — but every part of the billing pipeline is real.",
    ],
    liveUrl: "https://framekit-mauve.vercel.app",
  },
  {
    id: "codewrapped",
    title: "CodeWrapped — Shareable GitHub Year-in-Review",
    category: "Growth / Product Engineering",
    description:
      "Enter any GitHub username and get an animated, shareable wrap of their coding year — and because the share link's own preview image is generated per-user, the growth loop is built into the URL itself.",
    stack: ["Next.js", "TypeScript", "GitHub GraphQL API", "Upstash Redis", "Framer Motion"],
    metric: "The link is the share",
    problem:
      "A technically impressive tool doesn't guarantee a visit — it has to give a stranger a reason to click and, ideally, a reason to repost. Most portfolio pieces optimize for 'is this well engineered,' not 'does anyone actually want this.'",
    approach: [
      "PIXEL-UX designs a Spotify-Wrapped-style slide sequence — big numbers, bold gradients, story-style progress bars — built around instant personal payoff rather than a dashboard of stats.",
      "STACK-CORE pulls every number from GitHub's real GraphQL contribution data and caches results in Redis, so repeat and popular lookups are instant without burning API quota.",
      "The result page's Open Graph image is generated per-username at request time, so pasting the link into X, LinkedIn, or Discord shows that person's actual card inline — the share loop lives in the URL, not a download button.",
    ],
    outcomes: [
      "A 'coder personality' label (Weekend Warrior, The Specialist, Consistency Machine) is derived from real thresholds on the same data — never arbitrary or decorative.",
      "Sharing the link is the distribution mechanism: no separate export step, no 'download and repost' friction.",
      "Zero-activity or nonexistent usernames get an honest empty/error state instead of a fabricated result.",
    ],
    liveUrl: "https://codewrapped-amber.vercel.app",
  },
  {
    id: "pulsequeue",
    title: "PulseQueue — Live Distributed Job Queue Platform",
    category: "Backend / Distributed Systems",
    description:
      "A real durable job queue you can watch work — submit a job and see it flow queued, processing, retried with exponential backoff, or permanently dead-lettered, live.",
    stack: ["Next.js", "TypeScript", "Upstash QStash", "Upstash Redis", "Vercel"],
    metric: "Real retries, real DLQ",
    problem:
      "Most portfolio demos fake distributed-systems behavior with client-side timers. That doesn't prove anything about how someone reasons about queues, retries, backoff, or failure recovery — the things that actually break in production backend systems.",
    approach: [
      "STACK-CORE architects the queue on Upstash QStash — a genuinely durable HTTP message queue — instead of simulating retry logic client-side, so backoff and delivery guarantees are real, not scripted.",
      "A 'Chaos Mode' toggle makes the worker endpoint intentionally fail on a random subset of jobs, letting QStash's own retry engine react exactly as it would to a real outage.",
      "SENTINEL-SEC hardens the worker callback with QStash signature verification and idempotent job-state updates, so a forged or duplicated delivery can't corrupt job state.",
    ],
    outcomes: [
      "Visitors watch a real message queue retry, back off, and dead-letter a job in real time — not a mocked animation.",
      "A dead-letter queue panel reads directly from QStash's own DLQ API, with one-click replay.",
      "The architecture (durable queue + stateless worker + idempotent callback) is the same shape used by production job systems at scale.",
    ],
    liveUrl: "https://pulsequeue-chi.vercel.app",
  },
  {
    id: "cert-verify",
    title: "Immutable Blockchain Certificate Verification System",
    category: "Web3 / Blockchain",
    description:
      "A tamper-proof, on-chain credential verification platform issuing and validating certificates as cryptographically signed assets — eliminating forgery and manual verification overhead.",
    stack: ["Solidity", "Polygon", "Web3.js", "Next.js", "Node.js", "MongoDB"],
    metric: "100% on-chain integrity",
    liveUrl: "https://certiproof-orcin.vercel.app",
    problem:
      "Institutions issuing certificates (degrees, training completions, compliance credentials) rely on manual verification — PDFs, email confirmations, phone calls — that's slow and easy to forge.",
    approach: [
      "SOLIS-33 designs a Solidity contract that mints each certificate as a signed on-chain record on Polygon, keeping gas costs low for high issuance volume.",
      "STACK-CORE builds the issuer dashboard and public verification portal in Next.js, with a Node.js API layer bridging MongoDB (metadata) and the chain (proof of authenticity).",
      "SENTINEL-SEC audits the contract for reentrancy, access control, and upgrade-path risks before anything touches mainnet.",
    ],
    outcomes: [
      "Any certificate can be verified in seconds by checking the on-chain record — no email or phone call needed.",
      "Forged certificates are cryptographically impossible to pass verification.",
      "Issuers keep a familiar dashboard while the trust layer runs on-chain underneath.",
    ],
  },
  {
    id: "multi-agent-ai",
    title: "Multi-Agent Conversational AI & Workflow Automation Engine",
    category: "AI / Automation",
    description:
      "An orchestrated fleet of LLM agents handling conversational support, task routing, and backend automation across multiple business workflows with minimal human intervention.",
    stack: ["OpenAI API", "Claude API", "Python", "LangChain"],
    metric: "24/7 autonomous processing",
    problem:
      "Support and operations teams spend most of their time on repetitive triage — routing tickets, answering the same questions, and re-keying data between systems.",
    approach: [
      "NEXUS-AI designs a LangChain-orchestrated pipeline where a router agent classifies each incoming request and hands it to a specialist agent (support, data-entry, or escalation).",
      "Each specialist agent is grounded in the business's actual documentation via RAG, so answers stay accurate instead of hallucinating.",
      "A FastAPI backend exposes the pipeline as an async service that existing tools (helpdesk, CRM) call over a simple webhook.",
    ],
    outcomes: [
      "Routine requests get handled without a human in the loop, day or night.",
      "Escalations reach a human with full context already attached, instead of starting cold.",
      "The same architecture extends to new workflows by adding a specialist agent, not rebuilding the pipeline.",
    ],
  },
  {
    id: "enterprise-portal",
    title: "Scalable Next.js / Node.js Enterprise Microservice Portal",
    category: "Full-Stack Architecture",
    description:
      "A production-grade internal portal built on server components and a microservice backend, engineered for high concurrency, schema-optimized data flow, and continuous deployment.",
    stack: ["Next.js", "Node.js", "TypeScript", "MongoDB", "Vercel"],
    metric: "99.9% uptime SLA",
    problem:
      "Growing teams outgrow spreadsheets and ad-hoc internal tools, but a full custom platform often takes months and becomes hard to maintain.",
    approach: [
      "STACK-CORE architects the portal on Next.js App Router with server components, keeping data-fetching close to the source and the client bundle small.",
      "Backend logic is split into focused Node.js microservices, each with its own MongoDB schema optimized for its access pattern instead of one shared monolith schema.",
      "SENTINEL-SEC wires up CI/CD with automated test suites so every deploy is verified before it reaches production.",
    ],
    outcomes: [
      "The portal handles concurrent internal usage without the slowdowns of a monolithic legacy tool.",
      "New microservices ship independently, without redeploying the whole platform.",
      "Continuous deployment means fixes and features reach the team in hours, not release cycles.",
    ],
  },
];

export const STACK_NEEDED_OPTIONS = [
  "AI Automation",
  "Web3 / Solidity",
  "Full-Stack Next.js",
  "Security Audit",
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

// Intentionally empty — add real client testimonials here as they come in.
// Do not populate with placeholder/fake names; the Testimonials component
// renders an honest "coming soon" state when this array is empty.
export const TESTIMONIALS: Testimonial[] = [];

export type AutomationTemplate = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  price: string;
  setupTime: string;
  features: string[];
};

export const AUTOMATION_TEMPLATES: AutomationTemplate[] = [
  {
    id: "ai-lead-autoresponder",
    title: "AI Lead Auto-Responder",
    tagline: "Every inbound lead gets a real reply in seconds — day or night.",
    description:
      "A webhook-triggered n8n workflow: a lead comes in from your contact form, an AI model drafts a warm, on-brand reply, and it's sent automatically — before your team even sees the notification.",
    stack: ["n8n", "Gemini AI", "Resend"],
    price: "$149",
    setupTime: "~10 min setup",
    features: [
      "Drops into any form or CRM that can call a webhook",
      "AI-drafted reply — not a canned template, actually reads the lead's message",
      "Full workflow JSON + step-by-step setup guide, yours to keep and modify",
    ],
  },
  {
    id: "review-sentiment-alert",
    title: "Review Sentiment Alert",
    tagline: "Know about a bad review the moment it lands, not weeks later.",
    description:
      "A new customer review comes in, AI classifies it positive, neutral, or negative and summarizes the core complaint. Negative reviews trigger an instant alert email so you can respond before it becomes a public problem.",
    stack: ["n8n", "Gemini AI", "Resend"],
    price: "$179",
    setupTime: "~10 min setup",
    features: [
      "Works with any review source that can send a webhook (Google, Yelp, in-house forms)",
      "AI sentiment classification plus a one-line summary of what went wrong",
      "Only pings you on negative reviews — no alert fatigue on the good ones",
    ],
  },
  {
    id: "new-order-sync",
    title: "New Order Sync",
    tagline: "One order, three things done automatically — logged, confirmed, flagged if it's a big one.",
    description:
      "A new order hits the webhook, gets validated and enriched, logged to your Airtable base as a system of record, and the customer gets a confirmation email. Orders above a threshold you set also trigger a VIP alert to your team.",
    stack: ["n8n", "Airtable", "Resend"],
    price: "$199",
    setupTime: "~15 min setup",
    features: [
      "Airtable as a lightweight CRM/inventory log — no separate database needed",
      "Configurable VIP threshold alerts your team to high-value orders instantly",
      "Built-in validation catches malformed orders before they hit your records",
    ],
  },
];
