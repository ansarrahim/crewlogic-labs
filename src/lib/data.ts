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
  bio: "I design and direct every project on this site — CrewLogic Labs, CertiProof, and PulseQueue — working hands-on with AI coding tools as a force multiplier, from architecture through production deployment.",
  linkedinUrl: "https://www.linkedin.com/in/muhammad-ansar-402641178",
  education: "B.S. in Software Engineering, University of Malakand, Pakistan",
  specialties: [
    "Full-Stack Web Architecture (Next.js / Node.js)",
    "Web3 & Smart Contracts (Solidity / Web3.js)",
    "AI Systems Integration (OpenAI / Claude APIs, Python Automation)",
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
