import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CrewLogic Labs — Autonomous AI Engineering. Human Architectural Rigor.",
  description:
    "CrewLogic Labs is a high-end AI & Web3 software engineering agency led by Muhammad Ansar, powered by an autonomous virtual workforce of 5 specialized AI engineers building Web3 dApps, backend microservices, and LLM-powered automation pipelines.",
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
      </body>
    </html>
  );
}
