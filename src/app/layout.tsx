import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="flex min-h-full flex-col bg-slate-950 text-slate-100">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
