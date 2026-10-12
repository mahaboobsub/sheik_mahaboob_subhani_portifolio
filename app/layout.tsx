import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mahaboobsubhani.vercel.app"),
  title: "Sheik Mahaboob Subhani | AI-SDE · Autonomous Agents & Full Stack",
  description: "AI-SDE specializing in RAG, Knowledge Graphs, LangGraph Multi-Agent Workflows, FastAPI & Full Stack systems.",
  openGraph: {
    title: "Sheik Mahaboob Subhani | AI-SDE Portfolio",
    description: "RAG pipelines, agentic workflows, sub-100ms Neo4j graph traversals, and full-stack systems.",
    url: "https://mahaboobsubhani.vercel.app",
    siteName: "Sheik Mahaboob Subhani Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sheik Mahaboob Subhani | AI-SDE Portfolio",
    description: "Autonomous multi-agent systems, sub-100ms Neo4j traversals, and full-stack production AI.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
