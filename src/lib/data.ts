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
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cert-verify",
    title: "Immutable Blockchain Certificate Verification System",
    category: "Web3 / Blockchain",
    description:
      "A tamper-proof, on-chain credential verification platform issuing and validating certificates as cryptographically signed assets — eliminating forgery and manual verification overhead.",
    stack: ["Solidity", "Polygon", "Web3.js", "Next.js", "Node.js", "MongoDB"],
    metric: "100% on-chain integrity",
  },
  {
    id: "multi-agent-ai",
    title: "Multi-Agent Conversational AI & Workflow Automation Engine",
    category: "AI / Automation",
    description:
      "An orchestrated fleet of LLM agents handling conversational support, task routing, and backend automation across multiple business workflows with minimal human intervention.",
    stack: ["OpenAI API", "Claude API", "Python", "LangChain"],
    metric: "24/7 autonomous processing",
  },
  {
    id: "enterprise-portal",
    title: "Scalable Next.js / Node.js Enterprise Microservice Portal",
    category: "Full-Stack Architecture",
    description:
      "A production-grade internal portal built on server components and a microservice backend, engineered for high concurrency, schema-optimized data flow, and continuous deployment.",
    stack: ["Next.js", "Node.js", "TypeScript", "MongoDB", "Vercel"],
    metric: "99.9% uptime SLA",
  },
];

export const STACK_NEEDED_OPTIONS = [
  "AI Automation",
  "Web3 / Solidity",
  "Full-Stack Next.js",
  "Security Audit",
] as const;
