import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import MotionRoot from "@/components/MotionRoot";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://crewlogic-labs.vercel.app";
const TITLE = "CrewLogic Labs — Autonomous AI Engineering. Human Architectural Rigor.";
const DESCRIPTION =
  "CrewLogic Labs is a high-end AI & Web3 software engineering agency led by Engr. Muhammad Ansar, powered by 5 live AI agents building Web3 dApps, backend microservices, and LLM-powered automation pipelines.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s | CrewLogic Labs" },
  description: DESCRIPTION,
  keywords: [
    "CrewLogic Labs",
    "AI engineering agency",
    "Web3 development",
    "Next.js agency",
    "Solidity development",
    "AI agents",
    "Muhammad Ansar",
  ],
  authors: [{ name: "Muhammad Ansar" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "CrewLogic Labs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased dark`}
    >
      <body className="flex min-h-full flex-col bg-slate-950 text-slate-100">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition-transform focus-visible:translate-y-0"
        >
          Skip to main content
        </a>
        <MotionRoot>
          {children}
        </MotionRoot>
        <Analytics />
      </body>
    </html>
  );
}
